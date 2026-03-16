import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'
import { OrderStatus } from '@/types/supabase'

const VALID_STATUSES: OrderStatus[] = ['paid', 'ready', 'picked_up']

export async function PATCH(req: NextRequest) {
  try {
    const { orderId, status } = await req.json()

    if (!orderId || !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
    }

    const supabase = await createSupabaseServer()

    // Verify admin is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }

    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)

    if (error) {
      console.error('Status update error:', error)
      return NextResponse.json({ error: 'Failed to update status.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('admin status route error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
