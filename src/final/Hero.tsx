import { useTheme } from '../contexts/ThemeContext'
import styles from './Hero.module.css'

/* Flat-top hexagon path for a cell of given size centered at (cx, cy) */
function hexPath(cx: number, cy: number, size: number) {
  const pts: string[] = []
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6
    pts.push(`${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`)
  }
  return `M${pts.join('L')}Z`
}

/* Generate a small honeycomb cluster: hex grid offsets for flat-top hexagons */
function honeycombPaths(originX: number, originY: number, size: number, cells: [number, number][]) {
  const w = size * Math.sqrt(3)
  const h = size * 2
  return cells.map(([col, row]) => {
    const cx = originX + col * w + (row % 2 !== 0 ? w / 2 : 0)
    const cy = originY + row * (h * 0.75)
    return hexPath(cx, cy, size)
  })
}

/* Right cluster: a loose organic scatter */
const rightCells: [number, number][] = [
  [0, 0], [1, 0],
  [0, 1], [1, 1], [2, 1],
  [1, 2], [2, 2],
  [2, 3],
]

/* Left cluster: smaller, sparser — just a hint */
const leftCells: [number, number][] = [
  [0, 0], [1, 0],
  [0, 1],
  [1, 2],
]

export default function Hero() {
  const { style } = useTheme()
  const rightPaths = honeycombPaths(0, 0, 28, rightCells)
  const leftPaths = honeycombPaths(0, 0, 24, leftCells)

  const isFiltered = style === 'filtered'

  return (
    <section className={styles.hero}>
      {/* Honeycomb decorations */}
      <svg
        className={`${styles.honeycomb} ${styles.honeycombRight}`}
        viewBox="-5 -30 200 260"
        fill="none"
        aria-hidden="true"
      >
        {rightPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            className={styles.hexCell}
            style={{ animationDelay: `${0.8 + i * 0.12}s` }}
          />
        ))}
      </svg>
      <svg
        className={`${styles.honeycomb} ${styles.honeycombLeft}`}
        viewBox="-5 -25 140 200"
        fill="none"
        aria-hidden="true"
      >
        {leftPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            className={styles.hexCell}
            style={{ animationDelay: `${1.2 + i * 0.15}s` }}
          />
        ))}
      </svg>

      <div className={styles.inner}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span>Under active development</span>
        </div>
        <h1 className={styles.title}>Hivemind</h1>
        <p className={styles.subtitle}>
          Scale agent autonomy — without losing control.
        </p>
        <p className={styles.description}>
          A local-first orchestration system for AI agents working on real codebases.
          Built for <strong>deterministic execution</strong>, <strong>full observability</strong>, <strong>reversibility</strong>, and <strong>human authority</strong> at every critical boundary.
        </p>
        <div className={styles.manifesto}>
          <span>Everything observable.</span>
          <span>Everything deterministic.</span>
          <span>Everything reversible.</span>
        </div>
        {isFiltered && (
          <p className={styles.killerLine}>
            Hivemind is not about generating code faster.
            It's about making agentic work safe, inspectable, and governable.
          </p>
        )}
        <div className={styles.cta}>
          <a href="https://github.com/Antonio7098/Hivemind" className="btn btn-primary" target="_blank" rel="noopener noreferrer">View on GitHub</a>
          <a href="/docs" className="btn btn-secondary">Read the docs</a>
        </div>
      </div>
      <div className={styles.decoration} aria-hidden="true" />
    </section>
  )
}
