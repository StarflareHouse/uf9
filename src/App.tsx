import './app.css'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { ThemeProvider } from '@/components/ThemeProvider'
import { LanguageProvider } from '@/i18n'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { FaqPage } from '@/pages/FaqPage'
import { TermsPage } from '@/pages/TermsPage'
import { PrivacyPage } from '@/pages/PrivacyPage'

function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function EmptyHomePage() {
  return null
}

function App() {
  const location = useLocation()
  const isEmptyRoute =
    location.pathname === '/' ||
    location.pathname === '/shareholders' ||
    location.pathname === '/platform'

  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <ScrollReset />
          {isEmptyRoute ? null : <Navbar />}
          <main>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<EmptyHomePage />} />
                <Route path="/shareholders" element={<Navigate to="/" replace />} />
                <Route path="/platform" element={<Navigate to="/" replace />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
              </Routes>
            </AnimatePresence>
          </main>
          {isEmptyRoute ? null : <Footer />}
          {isEmptyRoute ? null : <ScrollToTop />}
        </div>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
