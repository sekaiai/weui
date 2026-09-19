import { withInstall } from '../utils/with-install'
import WeuiHalfScreenDialogComponent from './half-screen-dialog.vue'

export const WeuiHalfScreenDialog = withInstall(WeuiHalfScreenDialogComponent, 'WeuiHalfScreenDialog')
export { HalfScreenDialog } from './half-screen-dialog'
export type { WeuiHalfScreenDialogProps, WeuiHalfScreenDialogEmits, HalfScreenDialogButton } from './half-screen-dialog.vue'
export type { HalfScreenDialogShowOptions, HalfScreenDialogShowResult } from './half-screen-dialog'
