import type { App } from 'vue'
import WeuiSteps from './steps.vue'

WeuiSteps.install = (app: App) => {
  app.component(WeuiSteps.name || 'WeuiSteps', WeuiSteps)
}

export { WeuiSteps }
export type { WeuiStepsProps, StepItem } from './steps.vue'
