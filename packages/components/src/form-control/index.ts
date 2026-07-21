import type { App } from 'vue'
import WeuiFormControl from './form-control.vue'

WeuiFormControl.install = (app: App) => {
  app.component(WeuiFormControl.name!, WeuiFormControl)
}

export { WeuiFormControl }
export type { WeuiFormControlProps } from './form-control.vue'
