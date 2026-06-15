import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useTranslation } from '@/i18n'

const UF9Logo3D = lazy(() => import('@/components/ui/UF9Logo3D'))

export function ShareholderHero() {
  const { t, locale } = useTranslation()
  const useCjkHeadlineScale = locale.startsWith('zh') || locale.startsWith('ja') || locale.startsWith('ko')

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20">
      {/* Background effects - dark mode only */}
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(230,0,0,0.12),transparent)]" />
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(230,0,0,0.08),transparent)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-red-500/5 rounded-full blur-3xl hidden dark:block" />

      <div className="relative container-main">
        <div className="flex flex-col lg:flex-row gap-0 items-center max-w-4xl mx-auto">
          {/* Left — Content */}
          <div className="space-y-8 text-center lg:text-left lg:flex-7">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`${useCjkHeadlineScale ? 'text-5xl md:text-6xl lg:text-7xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold font-display leading-tight`}
            >
              {t('shareholderHero.title1')}
              <img src="/uf9_text_color.png" alt="UF9" className="inline-block h-[1em] align-baseline" />
              <br />
              <span className="text-foreground">{t('shareholderHero.title3')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0 text-justify"
            >
              {t('shareholderHero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <Button variant="primary" size="lg" rounded="full" className="group" asChild>
                <a href="https://uf9asia.com/en/home" target="_blank" rel="noopener noreferrer">
                  {t('shareholderHero.cta')}
                  <TrendingUp size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outline" size="lg" rounded="full" asChild>
                <a href="https://uf9asia.com/en/home" target="_blank" rel="noopener noreferrer">
                  {t('shareholderHero.ctaSecondary')}
                </a>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base text-faint-foreground italic"
            >
              {t('shareholderHero.tagline')}
            </motion.p>
          </div>

          {/* Right — 3D Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex relative h-80 lg:h-96 lg:flex-none lg:w-80 items-center justify-center"
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <img src="/uf9.png" alt="UF9" className="h-24 w-auto opacity-50" />
                </div>
              }
            >
              <UF9Logo3D className="w-full h-full" />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
