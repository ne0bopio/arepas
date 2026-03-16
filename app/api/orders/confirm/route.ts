import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { createSupabaseServer } from '@/lib/supabase/server'
import { getTomorrowDate } from '@/lib/utils'
import { CustomerInfo, OrderPayload } from '@/types'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' })
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!)
}

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  const resend = getResend()
  try {
    const body: OrderPayload = await req.json()
    const { paymentIntentId, customer, items, totalCents } = body

    if (!paymentIntentId || !customer?.name || !customer?.email || !items?.length) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    // Verify payment with Stripe — never trust client-side totals
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Payment not confirmed. Please try again.' },
        { status: 400 }
      )
    }

    if (paymentIntent.amount !== totalCents) {
      console.error(
        `Amount mismatch: Stripe=${paymentIntent.amount} client=${totalCents}`
      )
      return NextResponse.json({ error: 'Order amount mismatch.' }, { status: 400 })
    }

    const supabase = await createSupabaseServer()

    // Check for duplicate order (idempotency)
    const { data: existing } = await supabase
      .from('orders')
      .select('id')
      .eq('stripe_payment_id', paymentIntentId)
      .single()

    if (existing) {
      return NextResponse.json({ orderId: existing.id })
    }

    // Insert order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone || null,
        order_date: getTomorrowDate(),
        status: 'paid',
        stripe_payment_id: paymentIntentId,
        total_cents: totalCents,
      })
      .select('id')
      .single()

    if (orderError || !order) {
      console.error('Order insert error:', orderError)
      return NextResponse.json({ error: 'Failed to save order.' }, { status: 500 })
    }

    // Insert order items
    const { error: itemsError } = await supabase.from('order_items').insert(
      items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price_cents: item.unit_price_cents,
      }))
    )

    if (itemsError) {
      console.error('Order items insert error:', itemsError)
      // Don't fail the whole request — order exists, items are secondary
    }

    // Send confirmation email via Resend
    try {
      await resend.emails.send({
        from: 'Arepas y más <orders@arepasymas.com>', // TODO: Replace with real sending domain
        to: customer.email,
        subject: '¡Tu pedido está confirmado! 🌽',
        html: buildConfirmationEmail(customer, items, totalCents, order.id),
      })
    } catch (emailErr) {
      // Don't fail order confirmation if email fails
      console.error('Confirmation email failed:', emailErr)
    }

    return NextResponse.json({ orderId: order.id })
  } catch (err: unknown) {
    console.error('confirm order error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

function buildConfirmationEmail(
  customer: CustomerInfo,
  items: OrderPayload['items'],
  totalCents: number,
  orderId: string
): string {
  const itemsList = items
    .map((i) => `<li>${i.quantity}× product ID: ${i.product_id} — $${(i.unit_price_cents * i.quantity / 100).toFixed(2)}</li>`)
    .join('')

  return `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; color: #1A1A1A;">
      <h1 style="font-size: 28px; color: #F5A623;">¡Pedido confirmado! 🌽</h1>
      <p>Hola ${customer.name},</p>
      <p>¡Tu pedido está listo! Yo cocino todo fresco para ti mañana temprano. — Carol</p>
      <h2 style="font-size: 18px;">Lo que pediste</h2>
      <ul>${itemsList}</ul>
      <p><strong>Total: $${(totalCents / 100).toFixed(2)}</strong></p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
      <p><strong>Lugar de recogida:</strong><br/>123 Main St, Your City</p>
      <p><strong>Listo desde:</strong> 8am – 11am mañana</p>
      <p style="color: #666; font-size: 12px;">ID del pedido: ${orderId}</p>
      <p style="color: #666; font-size: 12px;">Hecha con amor by Carol. 🇨🇴</p>
    </div>
  `
}
