import { access, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const typesRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../dist/vue3/types')

for (const filePath of await findDeclarationFiles(typesRoot)) {
  const source = await readFile(filePath, 'utf-8')
  const specifiers = new Set(
    [...source.matchAll(/(?:from\s+|import\()(['"])(\.\.?\/[^'"]+)\1/g)]
      .map((match) => match[2]),
  )
  let transformed = source

  for (const specifier of specifiers) {
    const target = resolve(dirname(filePath), specifier)
    const extension = extname(specifier)
    const replacement = extension === '.vue' && await exists(`${target}.d.ts`)
      ? `${specifier}.js`
      : !extension && await exists(`${target}.d.ts`)
        ? `${specifier}.js`
        : !extension && await exists(join(target, 'index.d.ts'))
          ? `${specifier}/index.js`
          : null
    if (!replacement) continue
    transformed = transformed.replaceAll(`'${specifier}'`, `'${replacement}'`)
      .replaceAll(`"${specifier}"`, `"${replacement}"`)
  }

  if (transformed !== source) await writeFile(filePath, transformed, 'utf-8')
}

async function findDeclarationFiles(root) {
  const files = []
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const filePath = join(root, entry.name)
    if (entry.isDirectory()) files.push(...await findDeclarationFiles(filePath))
    else if (entry.isFile() && entry.name.endsWith('.d.ts')) files.push(filePath)
  }
  return files
}

async function exists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}
