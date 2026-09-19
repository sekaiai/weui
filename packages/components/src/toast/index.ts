import { withInstall } from '../utils/with-install'
import WeuiToastComponent from './toast.vue'

export const WeuiToast = withInstall(WeuiToastComponent, 'WeuiToast')
export { Toast } from './toast'
export type { WeuiToastProps, WeuiToastEmits, ToastType } from './toast.vue'
export type { ToastShowOptions } from './toast'
