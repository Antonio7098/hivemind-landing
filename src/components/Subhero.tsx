import { motion } from 'motion/react'
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
  return (
    <motion.section
      className={styles.subhero}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
    >
      <div className={styles.inner}>
        <motion.p className={styles.quiet} variants={line}>
          Most AI coding tools
        </motion.p>
        <motion.p className={styles.quiet} variants={line}>
          optimize for speed.
        </motion.p>
        <motion.div className={styles.divider} variants={line} />
        <motion.p className={styles.loud} variants={line}>
          Hivemind optimizes for
        </motion.p>
        <motion.p className={styles.emphasis} variants={line}>
          correctness, safety, and trust.
        </motion.p>
      </div>
    </motion.section>
  )
}
