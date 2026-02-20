import { motion } from 'motion/react'
import styles from './CoreMessage.module.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
}

const lineReveal = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

export default function CoreMessage() {
  return (
    <motion.section
      className={styles.coreMessage}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
    >
      <div className={styles.inner}>
        <motion.span className="section-label" variants={fadeUp}>Core Message</motion.span>
        
        <motion.h2 className={styles.heading} variants={fadeUp}>
          Ideas flow freely.<br />
          <span className={styles.headingAccent}>Execution must be deterministic.</span>
        </motion.h2>

        <div className={styles.split}>
          <motion.div className={styles.col} variants={lineReveal}>
            <h3 className={styles.colTitle}>Intent</h3>
            <ul className={styles.list}>
              <li>Flexible</li>
              <li>Exploratory</li>
              <li>Creative</li>
            </ul>
          </motion.div>

          <div className={styles.divider}>
            <div className={styles.dividerLine} />
          </div>

          <motion.div className={`${styles.col} ${styles.colAccent}`} variants={lineReveal}>
            <h3 className={styles.colTitle}>Execution</h3>
            <ul className={styles.list}>
              <li>Constrained</li>
              <li>Observable</li>
              <li>Undoable</li>
            </ul>
          </motion.div>
        </div>

        <motion.p className={styles.conclusion} variants={fadeUp}>
          This is how you increase agent autonomy <strong>without sacrificing safety, correctness, or trust.</strong>
        </motion.p>
      </div>
    </motion.section>
  )
}
