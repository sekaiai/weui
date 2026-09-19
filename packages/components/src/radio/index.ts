import { withInstall } from '../utils/with-install'
import WeuiRadioComponent from './radio.vue'
import WeuiRadioGroupComponent from './radio-group.vue'

export const WeuiRadio = withInstall(WeuiRadioComponent, 'WeuiRadio')
export const WeuiRadioGroup = withInstall(WeuiRadioGroupComponent, 'WeuiRadioGroup')
export type { WeuiRadioProps, WeuiRadioEmits } from './radio.vue'
export type { WeuiRadioGroupProps, WeuiRadioGroupEmits } from './radio-group.vue'
