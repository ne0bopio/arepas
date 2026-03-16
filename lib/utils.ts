import { CUTOFF_HOUR } from '@/lib/constants'

/** Format cents as a USD price string, e.g. 350 → "$3.50" */
export function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}

/** Returns the date for tomorrow's batch as a YYYY-MM-DD string */
export function getTomorrowDate(): string {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
}

/** Returns a human-friendly date string for tomorrow, e.g. "Tuesday, March 16" */
export function getTomorrowLabel(): string {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

/** The timezone Carol operates in — all cutoff logic uses this */
const TIMEZONE = 'America/New_York'

/** Returns the current hour in Carol's timezone */
function getLocalHour(): number {
  return parseInt(
    new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false, timeZone: TIMEZONE }).format(new Date()),
    10
  )
}

/** Returns true if the daily order cutoff has passed (default: 9pm) */
export function isCutoffPassed(): boolean {
  return getLocalHour() >= CUTOFF_HOUR
}

/** Returns milliseconds until tonight's cutoff, or null if already passed */
export function msUntilCutoff(): number | null {
  const now = new Date()
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  })
  const parts = formatter.formatToParts(now)
  const get = (type: string) => parts.find(p => p.type === type)?.value ?? '0'
  const localNow = new Date(`${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`)
  const cutoff = new Date(localNow)
  cutoff.setHours(CUTOFF_HOUR, 0, 0, 0)
  if (localNow >= cutoff) return null
  return cutoff.getTime() - localNow.getTime()
}

/** Clamps a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
