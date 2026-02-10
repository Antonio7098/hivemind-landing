import { motion } from 'motion/react'
import styles from './Insight.module.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const pillars = [
  { label: 'Explicit boundaries', angle: -72 },
  { label: 'Deterministic execution', angle: -36 },
  { label: 'Observable state', angle: 0 },
  { label: 'Reversible actions', angle: 36 },
  { label: 'Human governance', angle: 72 },
]

export default function Insight() {
  return (
    <motion.section
      className={styles.insight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
    >
      <motion.div className={styles.top} variants={fadeUp}>
        <span className="section-label">The Insight</span>
        <h2 className={styles.heading}>
          The problem isn't intelligence —<br />
          <span className={styles.headingAccent}>it's orchestration</span>
        </h2>
        <p className={styles.lead}>Agents don't fail because they aren't smart enough.</p>
        <p className={styles.lead}>They fail because autonomy is scaled <strong>without structure</strong>.</p>
      </motion.div>

      <div className={styles.hub}>
        <motion.div className={styles.center} variants={scaleIn}>
          <span className={styles.centerLabel}>At scale,</span>
          <span className={styles.centerSub}>agents need</span>
        </motion.div>

        <div className={styles.spokes}>
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              className={styles.spoke}
              variants={scaleIn}
            >
              <div className={styles.spokeConnector} />
              <div className={styles.pillar}>{p.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.p className={styles.resolution} variants={fadeUp}>
        <strong>Hivemind provides the structure that makes autonomy scalable.</strong>
      </motion.p>
    </motion.section>
  )
}
