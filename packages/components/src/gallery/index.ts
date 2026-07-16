import type { App } from 'vue'
import WeuiGallery from './gallery.vue'

WeuiGallery.install = (app: App) => {
  app.component(WeuiGallery.name || 'WeuiGallery', WeuiGallery)
}

export { WeuiGallery }
export type { WeuiGalleryProps, WeuiGalleryEmits } from './gallery.vue'
