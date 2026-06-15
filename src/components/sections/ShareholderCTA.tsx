import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Clock, Eye, X, ChevronLeft, ChevronRight, Download } from 'lucide-react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import { useTranslation } from '@/i18n'
import { siteConfig } from '@/constants/site-config'

const trustBadges = [Shield, Clock, Eye]

function Lightbox({ images, index, onClose }: { images: string[]; index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index)

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose, prev, next])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X size={24} />
      </button>

      {/* Page indicator */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-mono">
        {current + 1} / {images.length}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); prev() }}
        className="absolute left-2 md:left-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`Page ${current + 1}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); next() }}
        className="absolute right-2 md:right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <ChevronRight size={28} />
      </button>
    </motion.div>
  )
}

function PdfCarousel({ label, dir, pages, downloadUrl, downloadLabel }: { label: string; dir: string; pages: number; downloadUrl: string; downloadLabel: string }) {
  const images = Array.from({ length: pages }, (_, i) => `${dir}/${i + 1}.png`)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
        <div className="px-5 py-3 border-b border-border/50 bg-muted/30 flex items-center justify-between">
          <span className="font-medium text-sm">{label}</span>
          <a
            href={downloadUrl}
            download
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-red-500 hover:text-brand-red-400 transition-colors"
          >
            <Download size={14} />
            {downloadLabel}
          </a>
        </div>
        <Splide
          options={{
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '1rem',
            pagination: true,
            arrows: true,
            autoplay: true,
            interval: 3000,
            padding: '1rem',
            breakpoints: {
              768: { perPage: 1 },
              1024: { perPage: 2 },
            },
          }}
          aria-label={label}
        >
          {images.map((src, i) => (
            <SplideSlide key={i}>
              <img
                src={src}
                alt={`${label} - Page ${i + 1}`}
                className="w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                loading="lazy"
                onClick={() => setLightboxIndex(i)}
              />
            </SplideSlide>
          ))}
        </Splide>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox images={images} index={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>
    </>
  )
}

export function ShareholderCTA() {
  const { t, locale } = useTranslation()

  const pdf = siteConfig.pdf.shareholder[locale]

  return (
    <section className="relative py-14 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(230,0,0,0.08),transparent)] hidden dark:block" />

      <div className="relative container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-cjk mb-4">
            {t('shareholderCTA.heading')} <span className="text-gradient-red">{t('shareholderCTA.headingHighlight')}</span>
          </h2>
          <p className="text-muted-foreground text-xl mb-10">
            {t('shareholderCTA.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <PdfCarousel label={t('shareholderCTA.shareholderPdf')} dir={pdf.dir} pages={pdf.pages} downloadUrl={pdf.file} downloadLabel={t('shareholderCTA.downloadPdf')} />
        </motion.div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6">
          {trustBadges.map((Icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center gap-2 text-base text-muted-foreground"
            >
              <Icon size={16} className="text-brand-red-400" />
              {t(`shareholderCTA.badges.${i}`)}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
