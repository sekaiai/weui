import { withInstall } from '../utils/with-install'
import WeuiDialogComponent from './dialog.vue'

export const WeuiDialog = withInstall(WeuiDialogComponent, 'WeuiDialog')
export { Dialog } from './dialog'
export type { WeuiDialogProps, WeuiDialogEmits, DialogButton } from './dialog.vue'
export type { DialogShowOptions, DialogAlertOptions, DialogConfirmOptions, DialogShowResult } from './dialog'
