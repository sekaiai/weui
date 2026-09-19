import { withInstall } from '../utils/with-install'
import WeuiButtonComponent from './button.vue'

export const WeuiButton = withInstall(WeuiButtonComponent, 'WeuiButton')
export type { WeuiButtonProps, WeuiButtonEmits } from './button.vue'
