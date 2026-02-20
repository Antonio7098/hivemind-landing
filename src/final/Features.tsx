import { motion } from 'motion/react'
import styles from './Features.module.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const features = [
  { title: 'TaskFlows, not prompts', desc: 'Deterministic execution plans instead of ad-hoc interaction.', hero: true },
  { title: 'Scoped parallel agents', desc: 'Run many agents without stepping on each other.' },
  { title: 'Checkpointed execution', desc: 'Incremental commits for diffs, replay, and rollback.' },
  { title: 'Event-native architecture', desc: 'Pause. Resume. Replay. Debug — by design.' },
  { title: 'CLI-first', desc: 'If it works, it works headlessly. The UI is a projection.' },
  { title: 'Replaceable runtimes', desc: 'Claude Code. Codex. OpenCode. Gemini. Or native.', hero: false },
]

export default function Features() {
  return (
    <motion.section
      className={styles.features}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
    >
      <div className={styles.inner}>
        <motion.div className={styles.header} variants={fadeUp}>
          <span className="section-label">Designed for System-Level Autonomy</span>
          <h2 className="section-heading">DESIGNED FOR REAL-WORLD DEVELOPMENT</h2>
        </motion.div>

        <div className={styles.grid}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              className={`${styles.card} ${f.hero ? styles.cardHero : ''}`}
              variants={fadeUp}
            >
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
