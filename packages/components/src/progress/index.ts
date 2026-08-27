import type { App } from 'vue'
import WeuiProgress from './progress.vue'

WeuiProgress.install = (app: App) => {
  app.component(WeuiProgress.name || 'WeuiProgress', WeuiProgress)
}

export { WeuiProgress }
export type { WeuiProgressProps, WeuiProgressEmits } from './progress.vue'
