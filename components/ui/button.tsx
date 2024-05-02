import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50, tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-white text-slate-500 border-slate-200 border-2 border-b-4 hover:bg-slate-100 active:border-b-2",
        defaultOutline: "",
        primary: "bg-moneyconf-gold text-moneyconf-blue border-moneyconf-blue border-2 border-b-4 hover:bg-fin-lit-gold/80 active:border-b-2",
        primaryOutline: "bg-white text-moneyconf-gold",
        secondary: "bg-moneyconf-blue text-white border-moneyconf-blue hover:bg-fin-lit-blue/80 border-b-4 active:border-b-0",
        lessonCompleted: "bg-moneyconf-gold text-moneyconf-blue border-moneyconf-blue",
        lessonUnlocked: "bg-moneyconf-green text-moneyconf-blue border-moneyconf-blue",
        lessonLocked: "bg-moneyconf-grey text-moneyconf-blue border-moneyconf-blue"
      },
      size: {
        default: "h-14 px-11 py-2",
      },
      shape: {
        default: "rounded-xl",
        round: "rounded-full",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
