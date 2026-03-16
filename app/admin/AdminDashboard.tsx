'use client'

import { useState } from 'react'
import { DbOrderWithItems, OrderStatus } from '@/types/supabase'
import { formatCents } from '@/lib/utils'
import { PRODUCTS } from '@/lib/constants'
import Badge from '@/components/ui/Badge'

const STATUS_LABELS: Record<OrderStatus, string> = {
  paid: 'Paid',
  ready: 'Ready',
  picked_up: 'Picked up',
}

const STATUS_BADGE: Record<OrderStatus, 'yellow' | 'green' | 'gray'> = {
  paid: 'yellow',
  ready: 'green',
  picked_up: 'gray',
}

function CookSummary({ orders }: { orders: DbOrderWithItems[] }) {
  const totals: Record<string, number> = {}

  for (const order of orders) {
    for (const item of order.order_items) {
      totals[item.product_id] = (totals[item.product_id] ?? 0) + item.quantity
    }
  }

  return (
    <div className="bg-[#2D6A4F] rounded-2xl p-6 text-white mb-8">
      <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-lora)' }}>
        What to cook tomorrow
      </h2>
      <p className="text-white/60 text-sm mb-6">Based on {orders.length} paid order{orders.length !== 1 ? 's' : ''}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PRODUCTS.map((p) => (
          <div key={p.id} className="bg-white/10 rounded-xl p-4">
            <p className="text-white/70 text-sm">{p.name}</p>
            <p className="text-4xl font-bold mt-1">{totals[p.id] ?? 0}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function OrderRow({ order, onStatusChange }: { order: DbOrderWithItems; onStatusChange: (id: string, status: OrderStatus) => void }) {
  const [updating, setUpdating] = useState(false)

  async function toggleStatus() {
    const next: Record<OrderStatus, OrderStatus> = {
      paid: 'ready',
      ready: 'picked_up',
      picked_up: 'paid',
    }
    setUpdating(true)
    await fetch('/api/admin/orders/status', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: order.id, status: next[order.status] }),
    })
    onStatusChange(order.id, next[order.status])
    setUpdating(false)
  }

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 border border-black/5 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-[#1A1A1A]">{order.customer_name}</p>
          <Badge variant={STATUS_BADGE[order.status]}>{STATUS_LABELS[order.status]}</Badge>
        </div>
        <p className="text-sm text-[#1A1A1A]/50 mt-0.5">{order.customer_email}</p>
        <ul className="mt-2 text-sm text-[#1A1A1A]/70 space-y-0.5">
          {order.order_items.map((item) => {
            const product = PRODUCTS.find((p) => p.id === item.product_id)
            return (
              <li key={item.id}>
                {item.quantity}× {product?.name ?? item.product_id}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="flex items-center gap-4 sm:flex-col sm:items-end">
        <p className="font-bold text-[#1A1A1A]">{formatCents(order.total_cents)}</p>
        <button
          onClick={toggleStatus}
          disabled={updating}
          className="text-xs font-semibold text-[#2D6A4F] hover:text-[#235840] transition-colors disabled:opacity-50"
        >
          {updating ? 'Updating...' : 'Mark next →'}
        </button>
      </div>
    </div>
  )
}

export default function AdminDashboard({
  orders: initialOrders,
  batchDate,
}: {
  orders: DbOrderWithItems[]
  batchDate: string
}) {
  const [orders, setOrders] = useState(initialOrders)

  function handleStatusChange(id: string, status: OrderStatus) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
  }

  const dateLabel = new Date(batchDate + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-[#FDFAF4] pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-lora)' }}>
            Admin
          </h1>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="text-sm text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors">
              Log out
            </button>
          </form>
        </div>
        <p className="text-[#1A1A1A]/60 mb-8">
          Batch for <span className="font-semibold text-[#1A1A1A]">{dateLabel}</span>
        </p>

        <CookSummary orders={orders} />

        <h2 className="text-xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'var(--font-lora)' }}>
          All orders ({orders.length})
        </h2>

        {orders.length === 0 ? (
          <div className="text-center py-16 text-[#1A1A1A]/40">
            <p className="text-4xl mb-4">🫙</p>
            <p className="font-semibold">No orders yet for this batch.</p>
            <p className="text-sm mt-1">Orders placed before 9pm will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} onStatusChange={handleStatusChange} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
