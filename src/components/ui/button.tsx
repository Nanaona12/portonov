import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        hero: "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-[0_0_30px_hsl(var(--primary-glow)/0.6)] hover:scale-105 transform transition-all duration-300",
        glass: "glass text-foreground hover:bg-card-glass/80 hover:shadow-[0_8px_32px_hsl(var(--primary)/0.3)] hover:scale-105 transform transition-all duration-300",
        floating: "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-[0_20px_40px_-12px_hsl(var(--primary)/0.3)] hover:shadow-[0_25px_50px_-12px_hsl(var(--primary)/0.5)] hover:scale-110 hover:-translate-y-2 transform transition-all duration-500",
        outline: "border border-card-border glass hover:bg-card-glass/60 hover:border-primary/50 text-foreground hover:text-primary transition-all duration-300",
        ghost: "hover:bg-card-glass/40 hover:text-primary transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-lg font-semibold",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
