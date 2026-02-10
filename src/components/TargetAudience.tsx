import { useTheme } from '../contexts/ThemeContext'
import styles from './TargetAudience.module.css'

export default function TargetAudience() {
  const { style } = useTheme()

  if (style !== 'filtered') {
    return null
  }

  return (
    <section className={styles.targetAudience}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Who Hivemind Is For (and Who It Isn't)</h2>

        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.subheading}>Hivemind is for:</h3>
            <ul className={styles.list}>
              <li className={styles.item}>Engineers running non-trivial changes across real codebases</li>
              <li className={styles.item}>Long-running or parallel agent workflows</li>
              <li className={styles.item}>Situations where failure must be diagnosable and reversible</li>
              <li className={styles.item}>Anyone who needs to <em>trust</em> automation, not babysit it</li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.subheading}>Hivemind is not for:</h3>
            <ul className={styles.list}>
              <li className={styles.item}>One-shot prompt → code workflows</li>
              <li className={styles.item}>Exploratory "vibe coding"</li>
              <li className={styles.item}>Auto-merging AI output without review</li>
              <li className={styles.item}>Throwaway demos where correctness doesn't matter</li>
            </ul>
          </div>
        </div>

        <p className={styles.note}>
          If this sounds heavy — <strong>good</strong>. That's exactly the filter we want.
        </p>
      </div>
    </section>
  )
}
