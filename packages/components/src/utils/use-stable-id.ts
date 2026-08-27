import { getCurrentInstance } from 'vue'

const counters = new WeakMap<object, number>()

export const useStableId = (prefix: string): string => {
  const appContext = getCurrentInstance()?.appContext
  if (!appContext) return `${prefix}0`

  const current = counters.get(appContext) ?? 0
  counters.set(appContext, current + 1)
  return `${prefix}${current}`
}
