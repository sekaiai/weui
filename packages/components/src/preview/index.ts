import type { App } from 'vue'
import WeuiPreview from './preview.vue'

WeuiPreview.install = (app: App) => {
  app.component(WeuiPreview.name || 'WeuiPreview', WeuiPreview)
}

export { WeuiPreview }
export type { WeuiPreviewProps, WeuiPreviewEmits, PreviewItem, PreviewButton } from './preview.vue'
