import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const packDir = resolve(process.cwd(), '..', '..', 'local-packages')

mkdirSync(packDir, { recursive: true })
console.log(`Local package output: ${packDir}`)
