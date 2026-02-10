import { motion } from 'motion/react'
import { useTheme } from '../contexts/ThemeContext'
import styles from './Problem.module.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

const problemsDefault = [
  'Modify your code in opaque ways',
  'Hide context and reasoning',
  'Break when things go wrong',
  'Collapse under parallelism',
  'Assume you\'ll clean up the mess',
]

const problemsFiltered = [
  'Modify code opaquely',
  'Hide context and execution state',
  'Break under retries and parallelism',
  'Assume humans will clean up the mess',
]

const questions = [
  'What changed?',
  'Why did it change?',
  'Can I undo this safely?',
  'Can I trust it next time?',
]

export default function Problem() {
  const { style } = useTheme()
  const isFiltered = style === 'filtered'
  const problems = isFiltered ? problemsFiltered : problemsDefault

  return (
    <motion.section
      className={styles.problem}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
    >
      <div className={styles.inner}>
        <motion.div className={styles.header} variants={fadeUp}>
          <span className="section-label">The Problem</span>
          <h2 className="section-heading">AI AGENTS ARE POWERFUL — AND DANGEROUS</h2>
        </motion.div>

        <div className={styles.cascade}>
          <div className={styles.col}>
            <motion.p className={styles.lead} variants={slideLeft}>Today's AI coding tools:</motion.p>
            {problems.map((item, i) => (
              <motion.div
                key={i}
                className={styles.chip}
                variants={slideLeft}
                custom={i}
              >
                <span className={styles.dash}>—</span>
                {item}
              </motion.div>
            ))}
          </div>

          <div className={styles.col}>
            <motion.p className={styles.lead} variants={slideRight}>When they fail, you're left guessing:</motion.p>
            {questions.map((q, i) => (
              <motion.div
                key={i}
                className={styles.question}
                variants={slideRight}
                custom={i}
              >
                <span className={styles.qMark}>?</span>
                {q}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p className={styles.punchline} variants={fadeUp}>
          They work great… <strong>until they don't.</strong>
        </motion.p>
      </div>
    </motion.section>
  )
}
