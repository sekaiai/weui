import type { App } from 'vue'
import WeuiForm from './form.vue'

WeuiForm.install = (app: App) => {
  app.component(WeuiForm.name || 'WeuiForm', WeuiForm)
}

export { WeuiForm }
export type { WeuiFormProps } from './form.vue'
