import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { isCutoffPassed } from '@/lib/utils'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' })
}

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  try {
    // Enforce order cutoff
    if (isCutoffPassed()) {
      return NextResponse.json(
        { error: 'Orders are closed for today. Come back before 9pm.' },
        { status: 400 }
      )
    }

    const { totalCents, items } = await req.json()

    if (!totalCents || typeof totalCents !== 'number' || totalCents < 50) {
      return NextResponse.json({ error: 'Invalid order amount.' }, { status: 400 })
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items in order.' }, { status: 400 })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        source: 'arepas-y-mas',
        item_count: items.length.toString(),
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (err: unknown) {
    console.error('create-intent error:', err)
    return NextResponse.json({ error: 'Failed to initialize payment.' }, { status: 500 })
  }
}
