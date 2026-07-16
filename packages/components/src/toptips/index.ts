import type { App } from 'vue'
import WeuiToptips from './toptips.vue'

WeuiToptips.install = (app: App) => {
  app.component(WeuiToptips.name || 'WeuiToptips', WeuiToptips)
}

export { WeuiToptips }
export { Toptips } from './toptips'
export type { WeuiToptipsProps, WeuiToptipsEmits, ToptipsType } from './toptips.vue'
export type { ToptipsShowOptions } from './toptips'
