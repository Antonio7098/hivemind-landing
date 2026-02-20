import { motion } from 'motion/react'
import styles from './WhatIs.module.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

export default function WhatIs() {
  return (
    <motion.section
      className={styles.whatIs}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
    >
      <motion.div className={styles.header} variants={fadeUp}>
        <span className="section-label">What Is Hivemind?</span>
        <h2 className="section-heading">A CONTROL PLANE FOR AGENTIC ENGINEERING</h2>
      </motion.div>

      <div className={styles.split}>
        <motion.div className={`${styles.pane} ${styles.not}`} variants={slideLeft}>
          <div className={styles.paneInner}>
            <h3 className={styles.paneTitle}>
              Hivemind is <em>not</em>
            </h3>
            <ul className={styles.list}>
              <li>
                <span className={styles.xMark}>&times;</span>
                <span>a chatbot</span>
              </li>
              <li>
                <span className={styles.xMark}>&times;</span>
                <span>an IDE replacement</span>
              </li>
              <li>
                <span className={styles.xMark}>&times;</span>
                <span>a model host</span>
              </li>
            </ul>
          </div>
        </motion.div>

        <div className={styles.splitDivider}>
          <div className={styles.splitLine} />
        </div>

        <motion.div className={`${styles.pane} ${styles.yes}`} variants={slideRight}>
          <div className={styles.paneInner}>
            <h3 className={styles.paneTitle}>
              Hivemind <em>is</em>
            </h3>
            <ul className={styles.list}>
              <li>
                <span className={styles.checkMark}>&rarr;</span>
                <span>A task orchestration system for autonomous agents</span>
              </li>
              <li>
                <span className={styles.checkMark}>&rarr;</span>
                <span>A governance and safety layer over execution</span>
              </li>
              <li>
                <span className={styles.checkMark}>&rarr;</span>
                <span>An event-native engine for large-scale AI coordination</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      <motion.p className={styles.summary} variants={fadeUp}>
        It coordinates agents the way distributed systems coordinate services: <strong>with plans, state, events, and rules.</strong>
      </motion.p>
    </motion.section>
  )
}
