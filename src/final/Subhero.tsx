import { motion } from 'motion/react'
import { useTheme } from '../contexts/ThemeContext'
import styles from './Subhero.module.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const line = {
  hidden: { opacity: 0, y: 40, skewY: 2 },
  visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
}

export default function Subhero() {
  const { style } = useTheme()
  const isFiltered = style === 'filtered'

  return (
    <motion.section
      className={styles.subhero}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
    >
      <div className={styles.inner}>
        {isFiltered ? (
          <>
            <motion.p className={styles.quiet} variants={line}>
              Most AI coding tools are designed for
            </motion.p>
            <motion.p className={styles.quiet} variants={line}>
              interactive, single-agent sessions.
            </motion.p>
            <motion.div className={styles.divider} variants={line} />
            <motion.p className={styles.loud} variants={line}>
              Hivemind is designed for
            </motion.p>
            <motion.p className={styles.emphasis} variants={line}>
              Scaling autonomous agents — safely, predictably, and at system level.
            </motion.p>
          </>
        ) : (
          <>
            <motion.p className={styles.quiet} variants={line}>
              Most AI coding tools are designed for
            </motion.p>
            <motion.p className={styles.quiet} variants={line}>
              interactive, single-agent sessions.
            </motion.p>
            <motion.div className={styles.divider} variants={line} />
            <motion.p className={styles.loud} variants={line}>
              Hivemind is designed for
            </motion.p>
            <motion.p className={styles.emphasis} variants={line}>
              Scaling autonomous agents — safely, predictably, and at system level.
            </motion.p>
          </>
        )}
      </div>
    </motion.section>
  )
}
