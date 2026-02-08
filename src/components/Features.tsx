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
  { title: 'TaskFlows', aside: 'not prompts', desc: 'Deterministic execution plans instead of ad-hoc chats. Define once, replay forever.', hero: true },
  { title: 'Scoped parallel agents', desc: 'Run agents in parallel without stepping on each other. Isolation by design.' },
  { title: 'Checkpointed execution', desc: 'Incremental commits for diffs, undo, and retries.' },
  { title: 'Event-native architecture', desc: 'Pause, resume, replay, debug — by design.', hero: true },
  { title: 'CLI-first interface', desc: 'If it works, it works headlessly. The UI is just a projection.' },
  { title: 'Runtime adapters', desc: 'Use Claude Code, Codex, OpenCode, Gemini — or swap later.' },
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
          <span className="section-label">Key Features</span>
          <h2 className="section-heading">DESIGNED FOR REAL-WORLD DEVELOPMENT</h2>
        </motion.div>

        <div className={styles.grid}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              className={`${styles.card} ${f.hero ? styles.cardHero : ''}`}
              variants={fadeUp}
            >
              <div className={styles.cardTop}>
                <h3>{f.title}</h3>
                {f.aside && <span className={styles.aside}>{f.aside}</span>}
              </div>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
