import { useCallback, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { countryOptions, useTranslation, type Locale } from '@/i18n'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { locale, setLocale } = useTranslation()
  const activeCountry = countryOptions.find((option) => option.locale === locale) ?? countryOptions[0]

  const close = useCallback(() => setOpen(false), [])
  useOutsideClick(ref, close)

  const selectCountry = (nextLocale: Locale) => {
    setLocale(nextLocale)
    setOpen(false)
  }

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country selector: ${activeCountry.country}`}
        className={cn(
          'h-9 min-w-[6.25rem] flex items-center justify-between gap-2 px-3 rounded-full text-sm font-semibold transition-colors',
          'bg-foreground/6 border border-border-subtle/50',
          'text-muted-foreground hover:text-foreground cursor-pointer'
        )}
      >
        <span className="flex items-center gap-1.5">
          <img
            src={activeCountry.flagSrc}
            alt=""
            aria-hidden="true"
            className="h-4 w-5 rounded-[2px] object-cover shadow-sm"
          />
          <span>{activeCountry.code}</span>
        </span>
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Country"
          className={cn(
            'absolute right-0 z-50 max-h-[calc(100vh-6rem)] w-64 overflow-y-auto rounded-xl border border-border-subtle bg-background-secondary/95 p-1.5 shadow-xl shadow-shadow backdrop-blur-lg',
            'bottom-full mb-2 lg:bottom-auto lg:top-full lg:mt-2 lg:mb-0'
          )}
        >
          {countryOptions.map((option) => {
            const selected = option.locale === locale
            return (
              <button
                type="button"
                key={option.locale}
                role="option"
                aria-selected={selected}
                onClick={() => selectCountry(option.locale)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                  selected ? 'bg-brand-red-500 text-white' : 'text-muted-foreground hover:bg-foreground/6 hover:text-foreground'
                )}
              >
                <span
                  className={cn(
                    'flex h-8 w-10 shrink-0 items-center justify-center rounded-md border text-xl leading-none',
                    selected ? 'border-white/30 bg-white/15' : 'border-border-subtle bg-foreground/6'
                  )}
                  aria-hidden="true"
                >
                  <img
                    src={option.flagSrc}
                    alt=""
                    className="h-5 w-7 rounded-[2px] object-cover shadow-sm"
                    loading="lazy"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold">{option.country}</span>
                  <span className={cn('block truncate text-xs', selected ? 'text-white/75' : 'text-faint-foreground')}>
                    {option.language}
                  </span>
                </span>
                {selected && <Check className="h-4 w-4 shrink-0" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
