import type { App } from 'vue'
import WeuiHalfScreenDialog from './half-screen-dialog.vue'

WeuiHalfScreenDialog.install = (app: App) => {
  app.component(WeuiHalfScreenDialog.name || 'WeuiHalfScreenDialog', WeuiHalfScreenDialog)
}

export { WeuiHalfScreenDialog }
export { HalfScreenDialog } from './half-screen-dialog'
export type { WeuiHalfScreenDialogProps, WeuiHalfScreenDialogEmits, HalfScreenDialogButton } from './half-screen-dialog.vue'
export type { HalfScreenDialogShowOptions, HalfScreenDialogShowResult } from './half-screen-dialog'
