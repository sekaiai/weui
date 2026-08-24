import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const repositoryRoot = existsSync(join(process.cwd(), 'packages'))
  ? process.cwd()
  : join(process.cwd(), '../..')
const formDocPath = join(repositoryRoot, 'docs/components/form.md')

interface DocSection {
  title: string
  body: string
}

function getSections(source: string): DocSection[] {
  const headings = [...source.matchAll(/^## (.+)$/gm)]
  return headings.map((heading, index) => {
    const start = (heading.index ?? 0) + heading[0].length
    const end = headings[index + 1]?.index ?? source.length
    return { title: heading[1], body: source.slice(start, end) }
  })
}

function countTags(source: string, pattern: RegExp): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const match of source.matchAll(pattern)) {
    const tag = match[1]
    counts[tag] = (counts[tag] ?? 0) + 1
  }
  return counts
}

function countComponents(source: string): Record<string, number> {
  return countTags(source, /<(weui-[\w-]+)\b/g)
}

function countNativeOptions(source: string): number {
  return [...source.matchAll(/<option\b/g)].length
}

function countMarker(source: string, marker: string): number {
  return source.split(marker).length - 1
}

describe('Form documentation examples', () => {
  const source = readFileSync(formDocPath, 'utf8')
  const sections = getSections(source)

  it('keeps every details example as a complete, matching Vue SFC', () => {
    const examples = sections.flatMap((section) => {
      const details = section.body.match(/::: details[^\n]*\n```vue\n([\s\S]*?)\n```/)
      if (!details) return []

      const detailsStart = section.body.indexOf('::: details')
      return [{ title: section.title, demo: section.body.slice(0, detailsStart), code: details[1] }]
    })

    expect(examples.length).toBe(13)

    for (const example of examples) {
      expect(example.code, example.title).toMatch(/<template>[\s\S]*<\/template>/)
      expect(example.code.match(/<weui-form\b/g), example.title).toHaveLength(1)
      expect(countComponents(example.code), example.title).toEqual(countComponents(example.demo))
      expect(countNativeOptions(example.code), example.title).toBe(countNativeOptions(example.demo))
      expect(countMarker(example.code, 'weui-footer'), example.title).toBe(
        countMarker(example.demo, 'weui-footer'),
      )
      expect(example.code).not.toMatch(/<template\s+#(?:control|title-content)>/)

      if (example.demo.includes('<weui-cells')) {
        expect(example.demo, example.title).toMatch(/<weui-cell-group\b[^>]*\bform\b/)
        expect(example.code, example.title).toMatch(/<weui-cell-group\b[^>]*\bform\b/)
        expect(example.code, example.title).not.toMatch(/<weui-cells\b[^>]*\bform\b/)
        expect(example.code).not.toMatch(/<weui-cell-group\b[^>]*>\s*<weui-cell\b/)
      }

      if (example.title === '复选框' || example.title === '单选框') {
        expect(example.code).not.toContain('<weui-cell-group')
      }
    }
  })

  it('defines state used by interactive Form examples', () => {
    const expectedState: Record<string, string[]> = {
      验证码: ['vcode', 'vcodeSeconds', 'vcodeTimer', 'sendVcode'],
      复选框: ['checkboxValues'],
      单选框: ['radioValue'],
      开关: ['switchValue', 'switchValue2', 'switchValue3'],
      原生选择框: ['selectValue', 'selectAfterValue'],
      模拟选择框: ['mockDate', 'mockPrefix', 'mockTicket', 'cycle'],
      文本域: ['textareaValue'],
    }

    for (const section of sections) {
      const names = expectedState[section.title]
      if (!names) continue
      const details = section.body.match(/::: details[^\n]*\n```vue\n([\s\S]*?)\n```/)
      expect(details, section.title).not.toBeNull()
      expect(details?.[1], section.title).toContain('<script setup lang="ts">')
      for (const name of names) {
        expect(details?.[1], `${section.title}: ${name}`).toMatch(new RegExp(`(?:const|let)\\s+${name}\\b`))
      }
    }
  })

  it('keeps the verification-code countdown functional in demo and code', () => {
    const section = sections.find(({ title }) => title === '验证码')
    const details = section?.body.match(/::: details[^\n]*\n```vue\n([\s\S]*?)\n```/)
    const demo = section?.body.slice(0, section.body.indexOf('::: details')) ?? ''
    const runtimeDemo = source.slice(0, source.indexOf('# Form')) + demo
    const code = details?.[1] ?? ''

    for (const marker of [
      'v-model="vcode"',
      ':disabled="vcodeSeconds > 0"',
      '@click="sendVcode"',
      'vcodeSeconds.value = 59',
      'setInterval',
      'onBeforeUnmount',
      '已发送(${vcodeSeconds})',
    ]) {
      expect(runtimeDemo, `demo is missing ${marker}`).toContain(marker)
      expect(code, `code is missing ${marker}`).toContain(marker)
    }
  })

  it('uses complete content in the fixed-slot example', () => {
    const slotsSection = source.match(/## Slots 与固定结构([\s\S]*?)(?=## 反色表单)/)?.[1]
    const example = slotsSection?.match(/```vue\n([\s\S]*?)\n```/)?.[1]

    expect(example).toBeDefined()
    for (const slot of ['title', 'desc', 'default', 'tips', 'opr', 'tips-b', 'extra']) {
      expect(example).toContain(`<template #${slot}>`)
    }
    expect(example).toContain('<weui-cell-group form>')
    expect(example).toContain('<weui-cells>')
    expect(example).toContain('<weui-input')
    expect(example).toContain('<weui-button')
  })
})
