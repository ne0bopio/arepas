import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createSupabaseServer } from '@/lib/supabase/server'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' })
}

// Stripe requires the raw body for signature verification
// App Router reads the raw body via req.text() — no config needed

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: unknown) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent

    // Check if order already exists (may have been created via /api/orders/confirm)
    const supabase = await createSupabaseServer()
    const { data: existing } = await supabase
      .from('orders')
      .select('id')
      .eq('stripe_payment_id', paymentIntent.id)
      .single()

    if (!existing) {
      // Edge case: payment succeeded but confirm route didn't run — log for manual review
      console.warn(
        `Webhook: payment ${paymentIntent.id} succeeded but no order found. Manual review needed.`
      )
      // TODO: Send alert email to Carol for manual follow-up
    }
  }

  return NextResponse.json({ received: true })
}
