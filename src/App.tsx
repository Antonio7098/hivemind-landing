import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import ThemeSwitcher from './components/ThemeSwitcher'
import Hero from './components/Hero'
import TargetAudience from './components/TargetAudience'
import Subhero from './components/Subhero'
import Problem from './components/Problem'
import Insight from './components/Insight'
import WhatIs from './components/WhatIs'
import Principles from './components/Principles'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Comparison from './components/Comparison'
import Vision from './components/Vision'
import CTA from './components/CTA'
import Footer from './components/Footer'
import HivemindDocs from './HivemindDocs'

function LandingPage() {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
      <main>
        <Hero />
        <TargetAudience />
        <Subhero />
        <Problem />
        <Insight />
        <WhatIs />
        <Principles />
        <HowItWorks />
        <Features />
        <Comparison />
        <Vision />
        <CTA />
        <Footer />
      </main>
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/docs/*" element={<HivemindDocs />} />
        <Route path="/*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}
