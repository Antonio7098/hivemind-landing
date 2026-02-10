import { motion } from 'motion/react'
import { useTheme } from '../contexts/ThemeContext'
import styles from './Comparison.module.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const rows = [
  ['Session-based', 'System-driven'],
  ['Human-steered', 'Agent-autonomous'],
  ['Implicit execution', 'Explicit execution'],
  ['Hard to replay', 'Fully replayable'],
]

export default function Comparison() {
  const { style } = useTheme()
  const isFiltered = style === 'filtered'
  const leftHeader = isFiltered ? 'Interactive AI tools' : 'Interactive AI tools'
  const rightHeader = 'Hivemind'

  return (
    <motion.section
      className={styles.comparison}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
    >
      <div className={styles.inner}>
        <motion.div className={styles.header} variants={fadeUp}>
          <span className="section-label">Differentiation</span>
          <h2 className="section-heading">HOW HIVEMIND IS DIFFERENT</h2>
        </motion.div>

        <div className={styles.table}>
          {/* Column headers */}
          <div className={`${styles.cell} ${styles.colHeaderOld}`}>{leftHeader}</div>
          <div className={styles.dividerCell} />
          <div className={`${styles.cell} ${styles.colHeaderNew}`}>{rightHeader}</div>

          {/* Paired rows */}
          {rows.map(([typical, hivemind], i) => (
            <motion.div key={i} className={styles.row} variants={slideIn}>
              <div className={`${styles.cell} ${styles.cellOld}`}>
                <span className={styles.strikethrough}>{typical}</span>
              </div>
              <div className={styles.dividerCell}>
                <div className={styles.dividerDot} />
              </div>
              <div className={`${styles.cell} ${styles.cellNew}`}>
                <span className={styles.highlight}>{hivemind}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
