import { motion } from 'motion/react'
import styles from './Governors.module.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
}

const items = [
  'Agents execute.',
  'Agents verify.',
  'Agents cross-check each other.',
  'Humans define objectives, constraints, and direction.',
]

export default function Governors() {
  return (
    <motion.section
      className={styles.governors}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
    >
      <div className={styles.inner}>
        <motion.span className="section-label" variants={fadeUp}>From Gatekeepers to Governors</motion.span>
        
        <motion.h2 className={styles.heading} variants={fadeUp}>
          Human-in-the-loop does not scale.
        </motion.h2>

        <motion.h2 className={`${styles.heading} ${styles.headingAccent}`} variants={fadeUp}>
          Hivemind replaces tactical approval with architectural control.
        </motion.h2>

        <div className={styles.items}>
          {items.map((item, i) => (
            <motion.p key={i} className={styles.item} variants={fadeUp}>
              {item}
            </motion.p>
          ))}
        </div>

        <motion.p className={styles.conclusion} variants={fadeUp}>
          Not every action needs approval. <strong>But every action must be observable and reversible.</strong>
        </motion.p>

        <motion.p className={styles.punchline} variants={fadeUp}>
          Governance moves up a layer.
        </motion.p>
      </div>
    </motion.section>
  )
}
