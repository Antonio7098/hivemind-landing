import { motion } from 'motion/react'
import styles from './Principles.module.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const principles = [
  {
    num: '01',
    title: 'Observability is truth',
    desc: 'If it happened, you can see it.',
    size: 'large' as const,
  },
  {
    num: '02',
    title: 'Explicit structure beats implicit behavior',
    desc: 'Nothing is assumed. Everything is declared.',
    size: 'small' as const,
  },
  {
    num: '03',
    title: 'Reversibility is mandatory',
    desc: 'Every action can be inspected, replayed, or undone.',
    size: 'small' as const,
  },
  {
    num: '04',
    title: 'Governance over gating',
    desc: 'Humans define intent. Systems enforce boundaries.',
    size: 'small' as const,
  },
  {
    num: '05',
    title: 'Local-first and replaceable',
    desc: 'Your code stays with you. Models and runtimes can change.',
    size: 'small' as const,
  },
]

export default function Principles() {
  return (
    <motion.section
      className={styles.principles}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
    >
      <div className={styles.inner}>
        <motion.div variants={fadeUp}>
          <span className="section-label">Core Principles</span>
          <h2 className="section-heading">BUILT ON NON-NEGOTIABLE PRINCIPLES</h2>
        </motion.div>

        <div className={styles.bento}>
          {principles.map((p, i) => (
            <motion.div
              key={i}
              className={`${styles.card} ${p.size === 'large' ? styles.cardLarge : ''}`}
              variants={fadeUp}
            >
              <span className={styles.num}>{p.num}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
