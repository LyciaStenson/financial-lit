import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50, tracking-wide text-lg font-extrabold",
  {
    variants: {
      variant: {
        default: "bg-white text-slate-500 border-slate-200 border-[3px] border-b-[5px] text-md hover:bg-slate-100 active:border-b-[3px]",
        ghost: "",
        primary: "bg-moneyconf-gold text-moneyconf-blue border-moneyconf-blue border-[3px] border-b-[5px] hover:bg-fin-lit-gold/80 active:border-b-[3px]",
        //primaryOutline: "bg-white text-moneyconf-gold",
        //secondary: "bg-moneyconf-blue text-white border-moneyconf-blue hover:bg-fin-lit-blue/80 border-b-4 active:border-b-0",
        lessonCompleted: "bg-moneyconf-gold text-moneyconf-blue border-moneyconf-blue",
        lessonUnlocked: "bg-moneyconf-green text-moneyconf-blue border-moneyconf-blue",
        lessonLocked: "bg-moneyconf-grey text-moneyconf-blue border-moneyconf-blue",
        quiz: "rounded-3xl flex items-center justify-center bg-moneyconf-grey border-[3px] border-dashed border-moneyconf-green",
        continueLocked: "bg-moneyconf-grey border-2 border-moneyconf-blue text-xl text-moneyconf-grey-dark shadow-[0_3.5px_0px_rgba(0,0,0,0.3),inset_0_5px_0px_rgb(255,255,255,0.5)]",
        continueUnlocked: "bg-moneyconf-gold border-2 border-moneyconf-blue text-xl text-moneyconf-purple shadow-[0_3.5px_0px_rgba(0,0,0,0.3),inset_0_5px_0px_rgb(255,255,255,0.5)]"
      },
      size: {
        default: "h-14 px-11 py-2",
        wide: "w-80 h-14",
        topBar: "h-[90px]",
        quiz: "w-32 h-24",
        continue: "w-96 h-11"
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
