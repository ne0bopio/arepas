import { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'green' | 'yellow' | 'red' | 'gray'
}

export default function Badge({ variant = 'green', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full',
        {
          green: 'bg-[#2D6A4F]/10 text-[#2D6A4F]',
          yellow: 'bg-[#F5A623]/10 text-[#b87b18]',
          red: 'bg-[#C0392B]/10 text-[#C0392B]',
          gray: 'bg-black/5 text-black/60',
        }[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
