import { Github } from 'lucide-react'
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

/* Mobile top cluster: horizontal line of hexagons */
const mobileCells: [number, number][] = [
  [0, 0], [1, 0], [2, 0], [3, 0], [4, 0],
  [0, 1], [1, 1], [2, 1], [3, 1],
  [1, 2], [2, 2],
]

export default function Hero() {
  const rightPaths = honeycombPaths(0, 0, 28, rightCells)
  const leftPaths = honeycombPaths(0, 0, 24, leftCells)
  const mobilePaths = honeycombPaths(0, 0, 22, mobileCells)

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
      <svg
        className={`${styles.honeycomb} ${styles.honeycombMobile}`}
        viewBox="-10 0 220 80"
        fill="none"
        aria-hidden="true"
      >
        {mobilePaths.map((d, i) => (
          <path
            key={i}
            d={d}
            className={styles.hexCell}
            style={{ animationDelay: `${0.5 + i * 0.08}s` }}
          />
        ))}
      </svg>

      <div className={styles.heroInner}>
        <h1 className={styles.title}>Hivemind</h1>
        <p className={styles.subtitle}>
          Scale agent autonomy — without losing control.
        </p>
        <p className={styles.description}>
          A local-first control plane for coordinating AI agents on real codebases.
        </p>
        <div className={styles.cta}>
          <a href="https://github.com/Antonio7098/Hivemind" className="btn btn-primary btn-circular" target="_blank" rel="noopener noreferrer" aria-label="View on GitHub">
            <Github size={20} />
          </a>
          <a href="/docs" className="btn btn-secondary">Read the docs</a>
        </div>
      </div>
      <div className={styles.decoration} aria-hidden="true" />
    </section>
  )
}
