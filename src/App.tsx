import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'

// Final page components (now the default)
import FinalHero from './final/Hero'
import FinalHeroDetail from './final/HeroDetail'
import FinalSubhero from './final/Subhero'
import FinalProblem from './final/Problem'
import FinalInsight from './final/Insight'
import FinalCoreMessage from './final/CoreMessage'
import FinalWhatIs from './final/WhatIs'
import FinalGovernors from './final/Governors'
import FinalPrinciples from './final/Principles'
import FinalHowItWorks from './final/HowItWorks'
import FinalFeatures from './final/Features'
import FinalComparison from './final/Comparison'
import FinalVision from './final/Vision'
import FinalCTA from './final/CTA'
import FinalFAQ from './final/FAQ'
import FinalFooter from './final/Footer'
import HivemindDocs from './HivemindDocs'

function FinalLandingPage() {
  return (
    <ThemeProvider>
      <main data-theme="industrial">
        <FinalHero />
        <FinalHeroDetail />
        <FinalSubhero />
        <FinalProblem />
        <FinalInsight />
        <FinalCoreMessage />
        <FinalWhatIs />
        <FinalGovernors />
        <FinalPrinciples />
        <FinalHowItWorks />
        <FinalFeatures />
        <FinalComparison />
        <FinalVision />
        <FinalCTA />
        <FinalFAQ />
        <FinalFooter />
      </main>
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/docs/*" element={<HivemindDocs />} />
        {/* Theme variations */}
        <Route path="/industrial" element={<FinalLandingPage />} />
        <Route path="/signal" element={<FinalLandingPage />} />
        <Route path="/filtered" element={<FinalLandingPage />} />
        {/* Default route */}
        <Route path="/*" element={<FinalLandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}
