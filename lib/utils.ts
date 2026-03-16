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

/** Returns true if the daily order cutoff has passed (default: 9pm) */
export function isCutoffPassed(): boolean {
  const now = new Date()
  return now.getHours() >= CUTOFF_HOUR
}

/** Returns milliseconds until tonight's cutoff, or null if already passed */
export function msUntilCutoff(): number | null {
  const now = new Date()
  const cutoff = new Date()
  cutoff.setHours(CUTOFF_HOUR, 0, 0, 0)
  if (now >= cutoff) return null
  return cutoff.getTime() - now.getTime()
}

/** Clamps a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
