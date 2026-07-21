import type { App } from 'vue'
import WeuiFormTips from './form-tips.vue'

WeuiFormTips.install = (app: App) => {
  app.component(WeuiFormTips.name!, WeuiFormTips)
}

export { WeuiFormTips }
export type { WeuiFormTipsProps } from './form-tips.vue'
