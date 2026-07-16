import type { App } from 'vue'
import WeuiFormPage from './form-page.vue'

WeuiFormPage.install = (app: App) => {
  app.component(WeuiFormPage.name || 'WeuiFormPage', WeuiFormPage)
}

export { WeuiFormPage }
export type { WeuiFormPageProps } from './form-page.vue'
