import { motion } from 'motion/react'
import styles from './Vision.module.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const revealLine = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

const items = [
  'Agents can inspect failures',
  'Agents can retry safely',
  'Agents can operate Hivemind itself',
]

export default function Vision() {
  return (
    <motion.section
      className={styles.vision}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <div className={styles.inner}>
        <motion.div className={styles.label} variants={fadeUp}>
          <span className="section-label">Future Vision</span>
        </motion.div>

        <motion.h2 className={styles.bigHeading} variants={revealLine}>
          A system that can
        </motion.h2>
        <motion.h2 className={`${styles.bigHeading} ${styles.bigHeadingAccent}`} variants={revealLine}>
          improve itself.
        </motion.h2>

        <motion.p className={styles.lead} variants={fadeUp}>
          Because everything is exposed via the CLI:
        </motion.p>

        <div className={styles.statements}>
          {items.map((item, i) => (
            <motion.div key={i} className={styles.statement} variants={revealLine}>
              <span className={styles.arrow}>&rarr;</span>
              <span className={styles.text}>{item}</span>
            </motion.div>
          ))}
        </div>

        <motion.p className={styles.tagline} variants={fadeUp}>
          Hivemind isn't just agent-friendly. It's <strong>agent-operable</strong>.
        </motion.p>
      </div>
    </motion.section>
  )
}
