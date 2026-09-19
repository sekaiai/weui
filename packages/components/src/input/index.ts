import { withInstall } from '../utils/with-install'
import WeuiInputComponent from './input.vue'

export const WeuiInput = withInstall(WeuiInputComponent, 'WeuiInput')
export type { WeuiInputProps, WeuiInputEmits } from './input.vue'
