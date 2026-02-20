import { motion } from 'motion/react'
import styles from './HeroDetail.module.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

export default function HeroDetail() {
  return (
    <motion.section
      className={styles.heroDetail}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <div className={styles.inner}>
        <motion.div className={styles.content} variants={fadeUp}>
          <p className={styles.description}>
            AI is no longer the bottleneck. Coordination is.
            Hivemind is built for a world where agents move fast — and systems must keep up.
          </p>
        </motion.div>

        <motion.div className={styles.manifesto} variants={fadeUp}>
          <div className={styles.manifestoItem}>
            <span className={styles.manifestoLabel}>Observable</span>
            <span className={styles.manifestoDesc}>If it happened, you can see it.</span>
          </div>
          <div className={styles.manifestoDivider} />
          <div className={styles.manifestoItem}>
            <span className={styles.manifestoLabel}>Deterministic</span>
            <span className={styles.manifestoDesc}>Plans execute exactly as written.</span>
          </div>
          <div className={styles.manifestoDivider} />
          <div className={styles.manifestoItem}>
            <span className={styles.manifestoLabel}>Reversible</span>
            <span className={styles.manifestoDesc}>Every action can be undone.</span>
          </div>
          <div className={styles.manifestoDivider} />
          <div className={styles.manifestoItem}>
            <span className={styles.manifestoLabel}>Governance</span>
            <span className={styles.manifestoDesc}>Without friction.</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
