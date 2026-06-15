import { useCallback, useRef } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"
import { useTheme } from '@/components/useTheme'

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { resolvedTheme, toggleTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleToggle = useCallback(() => {
    if (!buttonRef.current) return

    if (
      typeof document === "undefined" ||
      !("startViewTransition" in document)
    ) {
      toggleTheme()
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(toggleTheme)
    })

    const ready = transition?.ready
    if (ready && typeof ready.then === "function") {
      ready.then(() => {
        const button = buttonRef.current
        if (!button) return

        const { top, left, width, height } = button.getBoundingClientRect()

        const x = left + width / 2
        const y = top + height / 2

        const maxRadius = Math.hypot(
          Math.max(left, window.innerWidth - left),
          Math.max(top, window.innerHeight - top)
        )

        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        )
      })
    }
  }, [toggleTheme, duration])

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      className={cn(className)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      {...props}
    >
      {isDark ? <Sun /> : <Moon />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
