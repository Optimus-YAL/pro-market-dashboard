import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
        active: "bg-surface-elevated text-accent border border-accent/20",
        bullish: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
        bearish: "bg-red-500/10 text-red-500 border border-red-500/20",
        caution: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
        neutral: "bg-surface-elevated text-text-muted border border-white/10",
        high: "bg-red-500/10 text-red-500 border border-red-500/20",
        medium: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
        low: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  dot,
  pulse,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { dot?: boolean; pulse?: boolean }) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
        children: (
          <>
            {dot && (
              <span className={cn("mr-1.5 h-1.5 w-1.5 rounded-full bg-current", pulse && "animate-pulse")} />
            )}
            {props.children}
          </>
        )
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
