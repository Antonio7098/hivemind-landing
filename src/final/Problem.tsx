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
  'Hide execution state behind interaction',
  'Blur intent with execution',
  'Break down under retries or parallelism',
  'Leave humans to reconcile unintended changes',
]

const problemsFiltered = [
  'Modify code opaquely',
  'Hide context and execution state',
  'Break under retries and parallelism',
  'Assume humans will clean up the mess',
]

const questions = [
  'What exactly happened?',
  'Why did it happen?',
  'Can I undo this safely?',
  'Can I trust it to run again?',
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
          <span className="section-label">The Real Problem</span>
          <h2 className="section-heading">AI AGENTS ARE POWERFUL — AND DANGEROUS AT SCALE</h2>
        </motion.div>

        <div className={styles.cascade}>
          <div className={styles.col}>
            <motion.p className={styles.lead} variants={slideLeft}>Giving one agent autonomy is easy. Coordinating many agents is where systems fail:</motion.p>
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
            <motion.p className={styles.lead} variants={slideRight}>When things go wrong, you're left asking:</motion.p>
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
          They work well in isolation. <strong>They don't scale cleanly.</strong>
        </motion.p>
      </div>
    </motion.section>
  )
}
