import type { Draw } from './Canvas'
import type { Project } from '../data/cv'

let inkRgb = '236, 235, 230'
export const setInk = (rgb: string) => {
  if (rgb) inkRgb = rgb
}
const ink = (a: number) => `rgba(${inkRgb}, ${a})`

// Undulating ribbons of light, bent toward the pointer.
export const flowLines: Draw = (ctx, w, h, t, p) => {
  const lines = Math.round(Math.min(70, w / 18))
  ctx.lineWidth = 1
  for (let i = 0; i < lines; i++) {
    const k = i / lines
    const base = h * (0.18 + 0.64 * k)
    ctx.beginPath()
    for (let x = 0; x <= w; x += 8) {
      const u = x / w
      const pull = Math.exp(-(((u - p.x) * 4) ** 2)) * (p.y - 0.5) * h * 0.35
      const y =
        base +
        Math.sin(u * 5 + t * 0.45 + k * 6) * h * 0.06 +
        Math.sin(u * 11 - t * 0.3 + k * 2) * h * 0.02 +
        pull * Math.sin(k * Math.PI)
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    const g = ctx.createLinearGradient(0, 0, w, 0)
    const a = 0.08 + 0.5 * Math.sin(k * Math.PI) ** 6
    g.addColorStop(0, ink(0))
    g.addColorStop(0.35, ink(a))
    g.addColorStop(0.65, ink(a * 0.6))
    g.addColorStop(1, ink(0))
    ctx.strokeStyle = g
    ctx.stroke()
  }
}

// Concentric network: a central identity node with deployments pulsing on orbits.
const rings: Draw = (ctx, w, h, t) => {
  const cx = w / 2
  const cy = h / 2
  const R = Math.min(w, h) * 0.42
  ctx.lineWidth = 1
  for (let r = 1; r <= 5; r++) {
    ctx.strokeStyle = ink(0.12 + r * 0.03)
    ctx.beginPath()
    ctx.arc(cx, cy, (R * r) / 5, 0, Math.PI * 2)
    ctx.stroke()
  }
  const nodes = 200
  for (let i = 0; i < nodes; i++) {
    const ring = 1 + (i % 5)
    const ang = (i * 2.399963) + t * (0.05 + 0.02 * (5 - ring))
    const rr = (R * ring) / 5
    const x = cx + Math.cos(ang) * rr
    const y = cy + Math.sin(ang) * rr
    const pulse = (Math.sin(t * 2 - i * 0.37) + 1) / 2
    ctx.fillStyle = ink(0.25 + pulse * 0.75)
    ctx.fillRect(x - 1, y - 1, 2, 2)
    if (pulse > 0.985) {
      ctx.strokeStyle = ink(0.5)
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.35)
  glow.addColorStop(0, ink(0.9))
  glow.addColorStop(0.1, ink(0.35))
  glow.addColorStop(1, ink(0))
  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(cx, cy, R * 0.35, 0, Math.PI * 2)
  ctx.fill()
}

// Workspaces as tilted orbits with assistants travelling along them.
const orbit: Draw = (ctx, w, h, t) => {
  const cx = w / 2
  const cy = h / 2
  const R = Math.min(w, h) * 0.4
  for (let i = 0; i < 9; i++) {
    const tilt = (i / 9) * Math.PI + t * 0.04
    const sq = 0.28 + 0.06 * Math.sin(i)
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(tilt)
    ctx.strokeStyle = ink(0.16)
    ctx.beginPath()
    ctx.ellipse(0, 0, R, R * sq, 0, 0, Math.PI * 2)
    ctx.stroke()
    const a = t * (0.4 + i * 0.05) + i
    const x = Math.cos(a) * R
    const y = Math.sin(a) * R * sq
    const g = ctx.createRadialGradient(x, y, 0, x, y, 14)
    g.addColorStop(0, ink(1))
    g.addColorStop(1, ink(0))
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, 14, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
  ctx.fillStyle = ink(0.95)
  ctx.beginPath()
  ctx.arc(cx, cy, 3, 0, Math.PI * 2)
  ctx.fill()
}

// [C#, JavaScript] pairs in the spirit of the banking-form logic the transpiler handled.
const SAMPLES: [string, string][] = [
  ['public static decimal Total(IEnumerable<Item> items) => items.Sum(i => i.Price);', 'export const total = (items) => items.reduce((s, i) => s + i.price, 0);'],
  ['var adults = people.Where(p => p.Age >= 18).ToList();', 'const adults = people.filter((p) => p.age >= 18);'],
  ['string name = user?.Name ?? "anonymous";', "const name = user?.name ?? 'anonymous';"],
  ['foreach (var row in rows) { Validate(row); }', 'for (const row of rows) { validate(row); }'],
  ['public bool IsValid => !string.IsNullOrWhiteSpace(Iban);', 'get isValid() { return !!this.iban?.trim(); }'],
  ['var total = lines.Select(l => l.Qty * l.Price).Sum();', 'const total = lines.map((l) => l.qty * l.price).reduce((a, b) => a + b, 0);'],
  ['if (amount > Limit) throw new InvalidOperationException("Limit exceeded");', "if (amount > this.limit) throw new Error('Limit exceeded');"],
  ['var byBranch = accounts.GroupBy(a => a.BranchId);', 'const byBranch = groupBy(accounts, (a) => a.branchId);'],
  ['public async Task<Account> LoadAsync(int id) => await _repo.GetAsync(id);', 'async load(id) { return await this.repo.get(id); }'],
  ['var label = $"{customer.FirstName} {customer.LastName}";', 'const label = `${customer.firstName} ${customer.lastName}`;'],
  ['var match = items.FirstOrDefault(i => i.Id == id);', 'const match = items.find((i) => i.id === id) ?? null;'],
  ['decimal rate = Math.Round(principal * 0.0425m / 12, 2);', 'const rate = Math.round((principal * 0.0425) / 12 * 100) / 100;'],
  ['public enum Status { Draft, Signed, Rejected }', 'export const Status = { Draft: 0, Signed: 1, Rejected: 2 };'],
  ['var recent = forms.OrderByDescending(f => f.Created).Take(10);', 'const recent = [...forms].sort((a, b) => b.created - a.created).slice(0, 10);'],
  ['var isWeekend = date.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday;', 'const isWeekend = [0, 6].includes(date.getDay());'],
  ['private readonly Dictionary<string, Rule> _rules = new();', 'private readonly rules = new Map();'],
]
const GAP = '    '

// Deterministic per (row, sweep) so a row keeps one sample for a whole pass, then draws a new one.
const hash = (a: number, b: number) => {
  let x = Math.imul(a ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul(b + 0x632be5ab, 0xc2b2ae35)
  x ^= x >>> 15
  x = Math.imul(x, 0x2c1b3c6d)
  return (x ^ (x >>> 12)) >>> 0
}

// Rows of code glyphs resolving from C# into JavaScript.
const glyphs: Draw = (ctx, w, h, t) => {
  const size = Math.max(11, Math.min(16, w / 48))
  ctx.font = `${size}px "Fira Code Variable", monospace`
  ctx.textBaseline = 'top'
  const cols = Math.floor(w / (size * 0.62))
  const rows = Math.floor(h / (size * 1.5))
  for (let r = 0; r < rows; r++) {
    const phase = t * 0.25 + r * 0.035
    const sweep = (phase % 1.6) - 0.3
    const seed = hash(r, Math.floor(phase / 1.6))
    const [cs, js] = SAMPLES[seed % SAMPLES.length]
    const width = Math.max(cs.length, js.length)
    const srcLine = cs.padEnd(width) + GAP
    const outLine = js.padEnd(width) + GAP
    const offset = (seed >>> 8) % srcLine.length
    const cursor = Math.floor(sweep * cols)
    for (let c = 0; c < cols; c++) {
      const done = c < cursor
      const ch = (done ? outLine : srcLine)[(c + offset) % srcLine.length]
      const edge = c === cursor
      if (!edge && ch === ' ') continue
      const x = c * size * 0.62
      const y = r * size * 1.5
      ctx.fillStyle = edge ? ink(1) : done ? ink(0.62) : ink(0.14)
      if (edge) ctx.fillRect(x, y, size * 0.6, size * 1.1)
      else ctx.fillText(ch, x, y)
    }
  }
}

// A self-attention matrix with heads drifting over it.
const attention: Draw = (ctx, w, h, t) => {
  const n = 18
  const s = Math.min(w, h) * 0.78
  const cell = s / n
  const ox = (w - s) / 2
  const oy = (h - s) / 2
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      const v =
        Math.exp(-(((i - j - 2 - 2 * Math.sin(t * 0.6 + i * 0.3)) / 2.2) ** 2)) * 0.9 +
        (i === j ? 0.5 : 0) +
        0.06 * (Math.sin(i * 12.9 + j * 78.2 + t) + 1)
      ctx.fillStyle = ink(Math.min(1, 0.04 + v))
      ctx.fillRect(ox + j * cell + 1, oy + i * cell + 1, cell - 2, cell - 2)
    }
  }
  ctx.strokeStyle = ink(0.2)
  ctx.strokeRect(ox - 0.5, oy - 0.5, s + 1, s + 1)
}

export const projectVisuals: Record<Project['visual'], Draw> = { rings, orbit, glyphs, attention }
