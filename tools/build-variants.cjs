// Converts tools/variants-raw.txt into src/data/variants.js
const fs = require('fs')
const lines = fs.readFileSync('tools/variants-raw.txt', 'utf8').split(/\r?\n/).filter(Boolean)
const out = {}
let cur
for (const l of lines) {
  if (l.startsWith('#')) { cur = l.slice(1).trim(); out[cur] = []; continue }
  const [name, lo, hi, note = ''] = l.split('|')
  out[cur].push([name.trim(), Number(lo), Number(hi), note.trim()])
}
const body = Object.entries(out).map(([k, t]) => `  ${JSON.stringify(k)}: {\n    source: 'CarWale', on: '2026-10-12',\n    trims: [\n${t.map((x) => '      ' + JSON.stringify(x) + ',').join('\n')}\n    ],\n  },`).join('\n')
fs.writeFileSync('src/data/variants.js', `// Trim/variant ex-showroom price ranges (₹ lakh, New Delhi), copied from CarWale model pages on the date shown.
// A trim lists min–max because it spans several fuel/gearbox versions. Other sites may differ.
// GENERATED from tools/variants-raw.txt by tools/build-variants.cjs
export const variants = {\n${body}\n}\n`)
const raw = fs.readFileSync('src/data/raw.js', 'utf8')
const unmatched = Object.keys(out).filter((n) => !raw.includes("['" + n + "', "))
console.log(Object.keys(out).length, 'models; unmatched names:', unmatched.length ? unmatched.join(', ') : 'none')
