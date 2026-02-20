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
    answer: `Cursor and Windsurf are excellent interactive development environments. They optimize for individual productivity, conversational iteration, and IDE-native workflows.

Hivemind optimizes for multi-agent coordination, deterministic execution, replayability, parallel autonomy, and governance at scale.

They are not competitors. They operate at different layers. You can use both.`
  },
  {
    question: 'Are diffs, undo, and worktrees unique to Hivemind?',
    answer: `No. Modern tools support diffs and undo.

What's different is how Hivemind treats them: as first-class, structured execution artifacts; as part of a deterministic TaskFlow; as replayable system state; as components of autonomous coordination.

It's not about having diffs. It's about making them systemic.`
  },
  {
    question: 'Is Hivemind slower?',
    answer: `At first, yes. Structured systems always feel slower than improvisation.

But at scale, Hivemind is faster because parallelism is explicit, retry is automated, rollback is trivial, and humans spend less time reconciling unintended changes.

Autonomy without structure slows down over time. Autonomy with structure compounds.`
  },
  {
    question: 'Can I use Cursor or Windsurf alongside Hivemind?',
    answer: `Yes. Interactive tools are excellent for exploration. Hivemind is for coordination, execution, and governance.

Think: Explore in IDE. Scale with Hivemind.`
  },
  {
    question: 'Is Hivemind for vibe coding?',
    answer: `No.

Hivemind is for teams scaling agent autonomy, multi-repo systems, architectural enforcement, deterministic workflows, and high-assurance environments.

If you want fast, ad-hoc iteration, interactive tools are great. If you want structured autonomy at system level, that's where Hivemind fits.`
  },
  {
    question: 'Who is Hivemind for?',
    answer: `Engineers building large codebases, multi-agent systems, infrastructure platforms, safety-critical software, and long-lived systems.

If you care about autonomy, governance, reversibility, observability, and system-level scaling — you are the audience.`
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
          <h2 className="section-heading">FREQUENTLY ASKED QUESTIONS</h2>
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
