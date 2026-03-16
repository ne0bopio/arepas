'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useCart } from '@/hooks/useCart'
import { formatCents, getTomorrowLabel } from '@/lib/utils'
import { CustomerInfo } from '@/types'
import Button from '@/components/ui/Button'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// --- Inner checkout form (needs Stripe context from Elements) ---

function CheckoutForm({
  clientSecret,
  customer,
  onSubmit,
  loading,
}: {
  clientSecret: string
  customer: CustomerInfo
  onSubmit: (e: React.FormEvent) => void
  loading: boolean
}) {
  const stripe = useStripe()
  const elements = useElements()

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <PaymentElement
        options={{
          layout: 'tabs',
        }}
      />
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!stripe || !elements || loading || !customer.name || !customer.email}
      >
        {loading ? 'Processing...' : 'Place order & pay'}
      </Button>
      <p className="text-xs text-center text-[#1A1A1A]/40 flex items-center justify-center gap-1">
        🔒 Secured by Stripe. Your card details are never stored.
      </p>
    </form>
  )
}

// --- Main checkout page ---

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalCents, clear } = useCart()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [customer, setCustomer] = useState<CustomerInfo>({ name: '', email: '', phone: '' })

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.replace('/order')
    }
  }, [items, router])

  // Create PaymentIntent on mount
  useEffect(() => {
    if (items.length === 0) return
    fetch('/api/checkout/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ totalCents, items }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.clientSecret) setClientSecret(data.clientSecret)
        else setError(data.error ?? 'Failed to initialize payment.')
      })
      .catch(() => setError('Failed to connect. Please try again.'))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!clientSecret) return

    // We need access to stripe & elements — this is handled inside CheckoutForm
    // This outer handler triggers the Elements submit via a custom approach below
  }

  async function handleStripeSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe not loaded')

      // Confirm payment client-side
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements: undefined as any, // elements accessed via hook inside CheckoutForm
        confirmParams: {
          return_url: `${window.location.origin}/order/confirmation`,
        },
        redirect: 'if_required',
      })

      if (stripeError) {
        setError(stripeError.message ?? 'Payment failed.')
        setLoading(false)
        return
      }

      if (paymentIntent?.status === 'succeeded') {
        // Confirm order server-side
        const res = await fetch('/api/orders/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            customer,
            items: items.map((i) => ({
              product_id: i.product.id,
              quantity: i.quantity,
              unit_price_cents: i.product.price_cents,
            })),
            totalCents,
          }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error ?? 'Order confirmation failed.')

        clear()
        router.push(`/order/confirmation?orderId=${data.orderId}`)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) return null

  return (
    <div className="min-h-screen bg-[#FDFAF4] pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h1
          className="text-4xl font-bold text-[#1A1A1A] mb-2"
          style={{ fontFamily: 'var(--font-lora)' }}
        >
          Checkout
        </h1>
        <p className="text-[#1A1A1A]/60 mb-10">
          Order for{' '}
          <span className="font-semibold text-[#1A1A1A]">{getTomorrowLabel()}</span>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: customer info + payment */}
          <div className="lg:col-span-3 space-y-8">
            {/* Customer info */}
            <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm space-y-4">
              <h2
                className="font-bold text-lg text-[#1A1A1A]"
                style={{ fontFamily: 'var(--font-lora)' }}
              >
                Your details
              </h2>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A]/70 mb-1" htmlFor="name">
                  Full name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={customer.name}
                  onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
                  className="w-full border border-black/15 rounded-xl px-4 py-3 text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#F5A623] bg-white"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A]/70 mb-1" htmlFor="email">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={customer.email}
                  onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))}
                  className="w-full border border-black/15 rounded-xl px-4 py-3 text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#F5A623] bg-white"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A]/70 mb-1" htmlFor="phone">
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
                  className="w-full border border-black/15 rounded-xl px-4 py-3 text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#F5A623] bg-white"
                  placeholder="+1 555 000 0000"
                />
              </div>
            </div>

            {/* Pickup info */}
            <div className="bg-[#2D6A4F]/5 rounded-2xl p-6 border border-[#2D6A4F]/10">
              <h2 className="font-bold text-[#2D6A4F] mb-2">Pickup location</h2>
              <p className="text-sm text-[#1A1A1A]/70">
                {/* TODO: Replace with Carlos's real pickup address */}
                123 Main St, Your City
                <br />
                Pickup available from 8am – 11am on {getTomorrowLabel()}
              </p>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
              <h2
                className="font-bold text-lg text-[#1A1A1A] mb-6"
                style={{ fontFamily: 'var(--font-lora)' }}
              >
                Payment
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-[#C0392B]/10 border border-[#C0392B]/20 rounded-xl text-sm text-[#C0392B]">
                  {error}
                </div>
              )}

              {clientSecret ? (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        colorPrimary: '#F5A623',
                        fontFamily: 'Inter, sans-serif',
                        borderRadius: '12px',
                      },
                    },
                  }}
                >
                  <StripeCheckoutForm
                    customer={customer}
                    items={items}
                    totalCents={totalCents}
                    loading={loading}
                    setLoading={setLoading}
                    setError={setError}
                    onSuccess={(orderId) => {
                      clear()
                      router.push(`/order/confirmation?orderId=${orderId}`)
                    }}
                  />
                </Elements>
              ) : error ? null : (
                <div className="flex items-center justify-center py-8 text-[#1A1A1A]/40 text-sm">
                  <span className="animate-pulse">Loading payment form...</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm sticky top-24">
              <h2
                className="font-bold text-lg text-[#1A1A1A] mb-4"
                style={{ fontFamily: 'var(--font-lora)' }}
              >
                Order summary
              </h2>
              <ul className="space-y-3 mb-4">
                {items.map((item) => (
                  <li key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-[#1A1A1A]/70">
                      {item.quantity}× {item.product.name}
                    </span>
                    <span className="font-semibold">
                      {formatCents(item.product.price_cents * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-black/5 pt-4 flex justify-between items-center">
                <span className="font-bold text-[#1A1A1A]">Total</span>
                <span className="font-bold text-xl text-[#1A1A1A]">{formatCents(totalCents)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Stripe form component that has access to elements hook ---

import { CartItem } from '@/types'

function StripeCheckoutForm({
  customer,
  items,
  totalCents,
  loading,
  setLoading,
  setError,
  onSuccess,
}: {
  customer: CustomerInfo
  items: CartItem[]
  totalCents: number
  loading: boolean
  setLoading: (v: boolean) => void
  setError: (v: string | null) => void
  onSuccess: (orderId: string) => void
}) {
  const stripe = useStripe()
  const elements = useElements()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError(null)

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message ?? 'Payment form error.')
      setLoading(false)
      return
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/order/confirmation` },
      redirect: 'if_required',
    })

    if (confirmError) {
      setError(confirmError.message ?? 'Payment failed.')
      setLoading(false)
      return
    }

    if (paymentIntent?.status === 'succeeded') {
      try {
        const res = await fetch('/api/orders/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            customer,
            items: items.map((i) => ({
              product_id: i.product.id,
              quantity: i.quantity,
              unit_price_cents: i.product.price_cents,
            })),
            totalCents,
          }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error ?? 'Order confirmation failed.')
        onSuccess(data.orderId)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to save order.')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement options={{ layout: 'tabs' }} />
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!stripe || !elements || loading || !customer.name || !customer.email}
      >
        {loading ? 'Processing...' : `Pay ${formatCents(totalCents)} & place order`}
      </Button>
      <p className="text-xs text-center text-[#1A1A1A]/40 flex items-center justify-center gap-1">
        🔒 Secured by Stripe. Your card details are never stored.
      </p>
    </form>
  )
}
