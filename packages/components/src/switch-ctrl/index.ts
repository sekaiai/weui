import { withInstall } from '../utils/with-install'
import WeuiSwitchComponent from './switch-ctrl.vue'

export const WeuiSwitch = withInstall(WeuiSwitchComponent, 'WeuiSwitch')
export type { WeuiSwitchProps, WeuiSwitchEmits } from './switch-ctrl.vue'
