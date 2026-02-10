import { motion } from 'motion/react'
import styles from './FAQ.module.css'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const faqs = [
  {
    question: 'Why not just use Cursor or Windsurf?',
    answer: `Cursor and Windsurf are excellent IDE-based AI tools. They are optimized for interactive development, fast local iteration, human-in-the-loop control, and single-session workflows. They shine when a human is actively steering.

They do not provide system-level orchestration for agents: no deterministic, replayable execution model; no global notion of task flows; no explicit retry semantics; no coordination across many autonomous agents; no governance layer over long-running or parallel execution.

They scale human productivity. They do not scale agent autonomy.`
  },
  {
    question: 'Are diffs, undo, and worktrees unique to Hivemind?',
    answer: `No. Editors already support diffs, undo, and worktrees.

Hivemind's difference is where those guarantees live. In Hivemind: reversibility is a system invariant; diffs are first-class execution artifacts; undo and replay work across tasks, agents, and time — not just inside an editor session.`
  },
  {
    question: 'Is Hivemind slower?',
    answer: `At the start: often, yes. At the end: almost always, no.

Hivemind prevents unintended changes, reduces retry thrash, makes failures diagnosable, and enables safe parallelisation. At scale, it is faster because you spend less time fixing what agents did wrong — and more time running them in parallel, safely.`
  },
  {
    question: 'Can I use Cursor or Windsurf alongside Hivemind?',
    answer: `Yes — but not inside Hivemind. They are IDEs, not CLI tools.

Many teams use IDE tools for exploration, and Hivemind for structured, autonomous execution. They solve different layers of the problem.`
  },
  {
    question: 'Is Hivemind for vibe coding?',
    answer: `No.

Hivemind is for autonomous agent workflows, parallel execution, multi-repo coordination, and situations where mistakes are expensive.

If you want fast experimentation with minimal structure, IDE tools are better. If you want autonomy at scale, Hivemind exists.`
  },
  {
    question: 'Who is Hivemind for?',
    answer: `Engineers and teams who ask:
• Can I explain exactly what happened?
• Can I replay or undo this safely?
• Can multiple agents run in parallel without chaos?
• Can I trust this system to run again tomorrow?

If those questions matter, Hivemind is for you.`
  },
]

export default function FAQ() {
  return (
    <motion.section
      className={styles.faq}
      id="faq"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
    >
      <div className={styles.inner}>
        <motion.div className={styles.header} variants={fadeUp}>
          <span className="section-label">FAQ</span>
          <h2 className="section-heading">WHY NOT CURSOR / WINDSURF?</h2>
        </motion.div>

        <div className={styles.accordion}>
          {faqs.map((faq, i) => (
            <motion.details
              key={i}
              className={styles.item}
              variants={fadeUp}
            >
              <summary className={styles.question}>
                <span>{faq.question}</span>
                <span className={styles.chevron}>+</span>
              </summary>
              <div className={styles.answer}>
                {faq.answer.split('\n\n').map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
