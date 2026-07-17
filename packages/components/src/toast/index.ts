import type { App } from 'vue'
import WeuiToast from './toast.vue'

WeuiToast.install = (app: App) => {
  app.component(WeuiToast.name || 'WeuiToast', WeuiToast)
}

export { WeuiToast }
export { Toast } from './toast'
export type { WeuiToastProps, WeuiToastEmits, ToastType } from './toast.vue'
export type { ToastShowOptions } from './toast'
