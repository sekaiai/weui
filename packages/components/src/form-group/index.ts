import type { App } from 'vue'
import WeuiFormGroup from './form-group.vue'

WeuiFormGroup.install = (app: App) => {
  app.component(WeuiFormGroup.name!, WeuiFormGroup)
}

export { WeuiFormGroup }
export type { WeuiFormGroupProps } from './form-group.vue'
