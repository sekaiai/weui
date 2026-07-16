import type { App } from 'vue'
import WeuiDialog from './dialog.vue'

WeuiDialog.install = (app: App) => {
  app.component(WeuiDialog.name || 'WeuiDialog', WeuiDialog)
}

export { WeuiDialog }
export { Dialog } from './dialog'
export type { WeuiDialogProps, WeuiDialogEmits, DialogButton } from './dialog.vue'
export type { DialogShowOptions, DialogAlertOptions, DialogConfirmOptions, DialogShowResult } from './dialog'
