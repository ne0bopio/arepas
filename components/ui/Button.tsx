import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            primary:
              'bg-[#F5A623] text-[#1A1A1A] hover:bg-[#e09515] focus-visible:ring-[#F5A623]',
            secondary:
              'bg-[#2D6A4F] text-white hover:bg-[#235840] focus-visible:ring-[#2D6A4F]',
            ghost:
              'bg-transparent text-[#1A1A1A] border border-[#1A1A1A]/20 hover:bg-[#1A1A1A]/5 focus-visible:ring-[#1A1A1A]',
            danger:
              'bg-[#C0392B] text-white hover:bg-[#a93226] focus-visible:ring-[#C0392B]',
          }[variant],
          {
            sm: 'text-sm px-4 py-2',
            md: 'text-base px-6 py-3',
            lg: 'text-lg px-8 py-4',
          }[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
