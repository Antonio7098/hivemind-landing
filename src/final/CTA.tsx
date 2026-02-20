import { motion } from 'motion/react'
import styles from './CTA.module.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function CTA() {
  return (
    <motion.section
      className={styles.cta}
      id="waitlist"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={container}
    >
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.inner}>
        <motion.h2 className={styles.heading} variants={fadeUp}>
          Build with agents.<br />
          Scale with structure.<br />
          <span className={styles.headingAccent}>Govern without bottlenecks.</span>
        </motion.h2>
        <motion.p className={styles.desc} variants={fadeUp}>
          Hivemind isn't an AI that writes code. It's the system that makes large-scale autonomous engineering <strong>correct, observable, and governable</strong>.
        </motion.p>
        <motion.div className={styles.buttons} variants={scaleIn}>
          <a href="https://github.com/Antonio7098/Hivemind" className="btn btn-primary" target="_blank" rel="noopener noreferrer">View on GitHub</a>
          <a href="/docs" className="btn btn-secondary">Read the architecture docs</a>
        </motion.div>
      </div>
    </motion.section>
  )
}
