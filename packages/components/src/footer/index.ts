import type { App } from 'vue'
import WeuiFooter from './footer.vue'

WeuiFooter.install = (app: App) => {
  app.component(WeuiFooter.name || 'WeuiFooter', WeuiFooter)
}

export { WeuiFooter }
export type { WeuiFooterProps, FooterLink } from './footer.vue'
