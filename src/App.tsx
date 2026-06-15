import './app.css'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { ThemeProvider } from '@/components/ThemeProvider'
import { LanguageProvider } from '@/i18n'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { ShareholdersPage } from '@/pages/ShareholdersPage'
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

function App() {
  const location = useLocation()

  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <ScrollReset />
          <Navbar />
          <main>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Navigate to="/shareholders" replace />} />
                <Route path="/shareholders" element={<ShareholdersPage />} />
                <Route path="/platform" element={<Navigate to="/shareholders" replace />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
