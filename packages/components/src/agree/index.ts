import type { App } from 'vue'
import WeuiAgree from './agree.vue'

WeuiAgree.install = (app: App) => {
  app.component(WeuiAgree.name!, WeuiAgree)
}

export { WeuiAgree }
export type { WeuiAgreeProps, WeuiAgreeEmits } from './agree.vue'
