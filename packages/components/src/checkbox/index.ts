import { withInstall } from '../utils/with-install'
import WeuiCheckboxComponent from './checkbox.vue'
import WeuiCheckboxGroupComponent from './checkbox-group.vue'

export const WeuiCheckbox = withInstall(WeuiCheckboxComponent, 'WeuiCheckbox')
export const WeuiCheckboxGroup = withInstall(WeuiCheckboxGroupComponent, 'WeuiCheckboxGroup')
export type { WeuiCheckboxProps, WeuiCheckboxEmits } from './checkbox.vue'
export type { WeuiCheckboxGroupProps, WeuiCheckboxGroupEmits } from './checkbox-group.vue'
