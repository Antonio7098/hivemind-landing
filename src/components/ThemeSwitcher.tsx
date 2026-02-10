import { useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useTheme, type StyleType } from '../contexts/ThemeContext'
import styles from './ThemeSwitcher.module.css'

const themes: { value: StyleType; label: string }[] = [
  { value: 'industrial', label: 'Industrial' },
  { value: 'filtered', label: 'Filtered' },
  { value: 'obsidian', label: 'Obsidian' },
  { value: 'signal', label: 'Signal' },
  { value: 'ember', label: 'Ember' },
]

export default function ThemeSwitcher() {
  const { style, setStyle } = useTheme()
  const navRef = useRef<HTMLElement>(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const activeBtn = nav.querySelector(`[data-variant="${style}"]`) as HTMLButtonElement | null
    if (activeBtn) {
      setIndicator({ left: activeBtn.offsetLeft, width: activeBtn.offsetWidth })
    }
  }, [style])

  useEffect(() => {
    function handleResize() {
      const nav = navRef.current
      if (!nav) return
      const activeBtn = nav.querySelector(`[data-variant="${style}"]`) as HTMLButtonElement | null
      if (activeBtn) {
        setIndicator({ left: activeBtn.offsetLeft, width: activeBtn.offsetWidth })
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [style])

  function handleKeyDown(e: React.KeyboardEvent) {
    const currentIndex = themes.findIndex(t => t.value === style)
    let next: number | undefined
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      next = (currentIndex + 1) % themes.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      next = (currentIndex - 1 + themes.length) % themes.length
    }
    if (next !== undefined) {
      setStyle(themes[next].value)
    }
  }

  return (
    <nav
      ref={navRef}
      className={styles.switcher}
      role="tablist"
      aria-label="Design variation"
      onKeyDown={handleKeyDown}
    >
      {themes.map(theme => (
        <button
          key={theme.value}
          className={`${styles.tab} ${style === theme.value ? styles.active : ''}`}
          role="tab"
          aria-selected={style === theme.value}
          data-variant={theme.value}
          onClick={() => setStyle(theme.value)}
        >
          {theme.label}
        </button>
      ))}
      <motion.span
        className={styles.indicator}
        animate={{ left: indicator.left, width: indicator.width }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    </nav>
  )
}
