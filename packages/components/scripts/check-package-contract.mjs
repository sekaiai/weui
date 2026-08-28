import { execFileSync } from 'node:child_process'
import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import ts from 'typescript'
import { build } from 'vite'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = resolve(packageRoot, '../..')
const manifest = JSON.parse(await readFile(join(packageRoot, 'package.json'), 'utf-8'))
const rootExport = manifest.exports['.']
const ssrExport = manifest.exports['./ssr']

assert(Object.keys(rootExport)[0] === 'types', 'exports["."].types must precede import')
assert(Object.keys(ssrExport)[0] === 'types', 'exports["./ssr"].types must precede import')
assert(manifest.type === 'module', 'package must declare ESM module identity')

const packageReadme = await readFile(join(packageRoot, 'README.md'), 'utf-8')
const rootReadme = await readFile(join(repoRoot, 'README.md'), 'utf-8')
assert(packageReadme === rootReadme, 'package README must match the repository README')

const packOutput = JSON.parse(execFileSync(
  'npm',
  ['pack', '--json', '--dry-run', '--ignore-scripts'],
  { cwd: packageRoot, encoding: 'utf-8' },
))
// npm 10 returns an array, while npm 12 returns an object keyed by package
// name. Normalize both shapes so the release contract is version-agnostic.
const packResult = Array.isArray(packOutput)
  ? packOutput[0]
  : packOutput.files
    ? packOutput
    : packOutput[manifest.name] ?? Object.values(packOutput).find((value) => value?.files)
assert(packResult && Array.isArray(packResult.files), 'npm pack returned an unsupported JSON shape')
const packedFiles = new Set(packResult.files.map((file) => file.path))
for (const requiredFile of [
  'README.md',
  'LICENSE',
  'dist/vue3/index.mjs',
  'dist/vue3/index.css',
  'dist/vue3/ssr.mjs',
  'dist/vue3/types/index.d.ts',
  'dist/uni-app/index.ts',
  'dist/uni-app/switch.vue',
]) {
  assert(packedFiles.has(requiredFile), `packed tarball is missing ${requiredFile}`)
}

const entryPath = resolve(packageRoot, rootExport.import)
const ssrEntryPath = resolve(packageRoot, ssrExport.import)
const entrySource = await readFile(entryPath, 'utf-8')
const ssrEntrySource = await readFile(ssrEntryPath, 'utf-8')
assert(/^import\s+['"]\.\/index\.css['"];?/m.test(entrySource), 'default entry must import index.css')
assert(!/^import\s+['"].+\.css['"];?/m.test(ssrEntrySource), 'SSR entry must not import CSS')
await import(pathToFileURL(ssrEntryPath).href)
await checkTypeScriptConsumer()
await checkTreeShaking(entryPath)

console.log('Package contract verified: files, CSS entries, ESM import, types, and tree-shaking.')

async function checkTypeScriptConsumer() {
  const tempRoot = await mkdtemp(join(tmpdir(), 'weui-package-contract-'))
  try {
    const nodeModules = join(tempRoot, 'node_modules')
    await mkdir(nodeModules)
    await symlink(packageRoot, join(nodeModules, manifest.name), 'dir')
    await symlink(resolve(packageRoot, 'node_modules/vue'), join(nodeModules, 'vue'), 'dir')

    execFileSync(
      process.execPath,
      ['--input-type=module', '--eval', `import '${manifest.name}/ssr'`],
      { cwd: tempRoot, stdio: 'pipe' },
    )

    const consumerPath = join(tempRoot, 'consumer.ts')
    await writeFile(
      consumerPath,
      `import { WeuiButton, type WeuiButtonProps } from '${manifest.name}'\n`
        + `import { WeuiCell } from '${manifest.name}/ssr'\n`
        + 'const props: WeuiButtonProps = { type: \'primary\' }\n'
        + 'void WeuiButton\nvoid WeuiCell\nvoid props\n',
      'utf-8',
    )

    for (const moduleResolution of [
      ts.ModuleResolutionKind.Bundler,
      ts.ModuleResolutionKind.Node16,
      ts.ModuleResolutionKind.NodeNext,
    ]) {
      const moduleKind = moduleResolution === ts.ModuleResolutionKind.Bundler
        ? ts.ModuleKind.ESNext
        : ts.ModuleKind.NodeNext
      const program = ts.createProgram([consumerPath], {
        module: moduleKind,
        moduleResolution,
        noEmit: true,
        skipLibCheck: false,
        strict: true,
        target: ts.ScriptTarget.ES2022,
      })
      const errors = ts.getPreEmitDiagnostics(program)
        .filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error)
      assert(errors.length === 0, formatDiagnostics(errors))
    }
  } finally {
    await rm(tempRoot, { recursive: true, force: true })
  }
}

async function checkTreeShaking(entryPath) {
  const namedSize = await bundleSize(
    `import { WeuiButton } from '${entryPath}'; console.log(WeuiButton)`,
  )
  const fullSize = await bundleSize(
    `import WeuiDesignVue from '${entryPath}'; console.log(WeuiDesignVue)`,
  )

  assert(
    namedSize < fullSize * 0.5,
    `named import is not tree-shaken (${namedSize} bytes vs ${fullSize} bytes)`,
  )
}

async function bundleSize(source) {
  const result = await build({
    configFile: false,
    logLevel: 'silent',
    plugins: [{
      name: 'weui-contract-consumer',
      resolveId(id) {
        return id === 'virtual:consumer' ? id : null
      },
      load(id) {
        return id === 'virtual:consumer' ? source : null
      },
    }],
    build: {
      minify: true,
      rollupOptions: {
        input: 'virtual:consumer',
        external: ['vue'],
      },
      write: false,
    },
  })
  const outputs = Array.isArray(result) ? result : [result]
  return outputs.flatMap((output) => output.output)
    .filter((item) => item.type === 'chunk')
    .reduce((size, chunk) => size + Buffer.byteLength(chunk.code), 0)
}

function formatDiagnostics(diagnostics) {
  if (diagnostics.length === 0) return ''
  return ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCanonicalFileName: (fileName) => fileName,
    getCurrentDirectory: () => packageRoot,
    getNewLine: () => '\n',
  })
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}
