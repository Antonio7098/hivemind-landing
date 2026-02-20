import { motion } from 'motion/react'
import styles from './Governors.module.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const agentTasks = [
  'Execute',
  'Verify',
  'Cross-check each other',
]

const humanTasks = [
  'Define objectives',
  'Set constraints',
  'Provide direction',
]

export default function Governors() {
  return (
    <motion.section
      className={styles.governors}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
    >
      <div className={styles.inner}>
        <motion.div className={styles.header} variants={fadeUp}>
          <span className="section-label">From Gatekeepers to Governors</span>
          <h2 className={styles.heading}>
            Human-in-the-loop
            <span className={styles.strike}>doesn't scale</span>
          </h2>
        </motion.div>

        <div className={styles.transform}>
          <motion.div className={styles.oldWay} variants={slideLeft}>
            <div className={styles.wayLabel}>Old Model</div>
            <div className={styles.wayTitle}>Gatekeepers</div>
            <p className={styles.wayDesc}>Every action needs approval. Humans are bottlenecks.</p>
            <div className={styles.bottleneck}>
              <span className={styles.x}>×</span>
              <span>Click to approve</span>
            </div>
            <div className={styles.bottleneck}>
              <span className={styles.x}>×</span>
              <span>Review every diff</span>
            </div>
            <div className={styles.bottleneck}>
              <span className={styles.x}>×</span>
              <span>Manual reconciliation</span>
            </div>
          </motion.div>

          <motion.div className={styles.arrow} variants={fadeUp}>
            <span>→</span>
          </motion.div>

          <motion.div className={styles.newWay} variants={slideRight}>
            <div className={styles.wayLabel}>New Model</div>
            <div className={styles.wayTitle}>Governors</div>
            <p className={styles.wayDesc}>Architecture enforces boundaries. Humans set strategy.</p>
            <div className={styles.flows}>
              <span className={styles.check}>✓</span>
              <span>Observable execution</span>
            </div>
            <div className={styles.flows}>
              <span className={styles.check}>✓</span>
              <span>Reversible by default</span>
            </div>
            <div className={styles.flows}>
              <span className={styles.check}>✓</span>
              <span>Autonomous at scale</span>
            </div>
          </motion.div>
        </div>

        <div className={styles.layers}>
          <motion.div className={styles.layer} variants={fadeUp}>
            <div className={styles.layerLabel}>Execution Layer</div>
            <div className={styles.layerContent}>
              {agentTasks.map((task, i) => (
                <span key={i} className={styles.agentTask}>Agents {task}</span>
              ))}
            </div>
          </motion.div>

          <motion.div className={styles.layerConnector} variants={fadeUp}>
            <div className={styles.connectorLine} />
            <span className={styles.connectorLabel}>governed by</span>
            <div className={styles.connectorLine} />
          </motion.div>

          <motion.div className={`${styles.layer} ${styles.layerHuman}`} variants={fadeUp}>
            <div className={styles.layerLabel}>Strategic Layer</div>
            <div className={styles.layerContent}>
              {humanTasks.map((task, i) => (
                <span key={i} className={styles.humanTask}>Humans {task}</span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div className={styles.punchline} variants={fadeUp}>
          <strong>Not every action needs approval.</strong>
          <br />
          But every action must be <span className={styles.accent}>observable</span> and <span className={styles.accent}>reversible</span>.
        </motion.div>

        <motion.div className={styles.resolution} variants={fadeUp}>
          Governance moves up a layer.
        </motion.div>
      </div>
    </motion.section>
  )
}
