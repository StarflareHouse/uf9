import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 cursor-pointer hover:scale-[1.03] active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-red-600 text-white hover:shadow-[0_8px_25px_rgba(230,0,0,0.35)] hover:brightness-110',
        secondary:
          'border-2 border-brand-red-500 text-brand-red-400 hover:bg-brand-red-500/10',
        gold: 'bg-brand-red-600 text-white font-bold hover:shadow-[0_8px_25px_rgba(230,0,0,0.35)] hover:brightness-110',
        ghost: 'text-muted-foreground hover:text-foreground hover:bg-foreground/5',
        outline:
          'border border-brand-red-500/30 bg-transparent text-brand-red-400 hover:border-brand-red-500/60 hover:bg-brand-red-500/5',
      },
      size: {
        sm: 'px-4 py-2 text-base rounded-lg',
        md: 'px-6 py-3 text-lg rounded-xl',
        lg: 'px-8 py-4 text-xl rounded-xl',
        icon: 'size-10 rounded-lg',
      },
      rounded: {
        default: '',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      rounded: 'default',
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  children: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button }
