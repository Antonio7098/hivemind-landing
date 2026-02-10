import { motion } from 'motion/react'
import styles from './Footer.module.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
}

export default function Footer() {
  return (
    <motion.footer
      className={styles.footer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={container}
    >
      <div className={styles.inner}>
        <motion.p className={styles.italic} variants={fadeIn}>
          Hivemind isn't an AI that writes code.
        </motion.p>
        <motion.div className={styles.rule} variants={fadeIn} />
        <motion.p variants={fadeIn}>
          It's the system that makes large-scale agentic work <strong>correct, observable, and real</strong>.
        </motion.p>
      </div>
    </motion.footer>
  )
}
