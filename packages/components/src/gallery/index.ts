import type { App } from 'vue'
import WeuiGallery from './gallery.vue'

WeuiGallery.install = (app: App) => {
  app.component(WeuiGallery.name || 'WeuiGallery', WeuiGallery)
}

export { WeuiGallery }
export { Gallery } from './gallery'
export type { WeuiGalleryProps, WeuiGalleryEmits } from './gallery.vue'
export type { GalleryShowOptions } from './gallery'
