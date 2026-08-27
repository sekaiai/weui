import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const releaseTag = process.env.RELEASE_TAG
if (!releaseTag || !/^v\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(releaseTag)) {
  throw new Error(`Invalid release tag: ${releaseTag ?? '<missing>'}`)
}

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const manifest = JSON.parse(await readFile(resolve(packageRoot, 'package.json'), 'utf-8'))
if (releaseTag !== `v${manifest.version}`) {
  throw new Error(`Release tag ${releaseTag} does not match package version ${manifest.version}`)
}

console.log(`Release version verified: ${releaseTag}`)
