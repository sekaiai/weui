import type { App } from 'vue'
import WeuiSlideview from './slideview.vue'

WeuiSlideview.install = (app: App) => {
  app.component(WeuiSlideview.name || 'WeuiSlideview', WeuiSlideview)
}

export { WeuiSlideview }
export type { WeuiSlideviewProps, WeuiSlideviewEmits, SlideButton } from './slideview.vue'
