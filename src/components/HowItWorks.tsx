import { motion } from 'motion/react'
import { useTheme } from '../contexts/ThemeContext'
import styles from './HowItWorks.module.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

const stepAnim = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const stepsDefault = [
  { number: '01', title: 'Plan', desc: 'Tasks and dependencies are defined up front. Parallelism is explicit and safe.' },
  { number: '02', title: 'Execute', desc: 'Agents run in isolated, scoped environments. Every action emits events.' },
  { number: '03', title: 'Verify', desc: 'Automated checks + verifier agents. Bounded retries — no infinite loops.' },
  { number: '04', title: 'Review & Merge', desc: 'Clean diffs. Explicit approvals. No surprise commits.' },
]

const stepsFiltered = [
  { number: '01', title: 'Plan', desc: 'Tasks and dependencies are defined up front. Parallelism is explicit and safe.' },
  { number: '02', title: 'Execute', desc: 'Agents run in isolated, scoped environments. Every action emits events.' },
  { number: '03', title: 'Verify', desc: 'Automated checks + verifier agents. Bounded retries — no infinite loops.' },
  { number: '04', title: 'Review & Merge', desc: 'Clean diffs. Explicit approvals. No surprise commits.' },
]

export default function HowItWorks() {
  const { style } = useTheme()
  const isFiltered = style === 'filtered'
  const steps = isFiltered ? stepsFiltered : stepsDefault

  return (
    <motion.section
      className={styles.howItWorks}
      id="how"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
    >
      <div className={styles.inner}>
        <motion.div className={styles.header} variants={fadeUp}>
          <span className="section-label">How It Works</span>
          <h2 className="section-heading">AGENT EXECUTION, DONE PROPERLY</h2>
        </motion.div>

        <div className={styles.timeline}>
          <div className={styles.connector} aria-hidden="true" />
          {steps.map((step, i) => (
            <motion.div key={step.number} className={styles.step} variants={stepAnim}>
              <div className={styles.stepDot}>
                <span className={styles.stepNum}>{step.number}</span>
              </div>
              <div className={styles.stepContent}>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className={styles.arrow} aria-hidden="true">&#8594;</div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p className={styles.footer} variants={fadeUp}>
          {isFiltered 
            ? "Every step produces artifacts you can inspect, replay, or roll back."
            : "Everything is inspectable. Everything is reversible."}
        </motion.p>
      </div>
    </motion.section>
  )
}
