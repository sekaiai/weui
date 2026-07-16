import type { App } from 'vue'
import WeuiUploader from './uploader.vue'

WeuiUploader.install = (app: App) => {
  app.component(WeuiUploader.name || 'WeuiUploader', WeuiUploader)
}

export { WeuiUploader }
export type { WeuiUploaderProps, WeuiUploaderEmits, UploaderFile } from './uploader.vue'
