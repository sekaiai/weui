import { withInstall } from '../utils/with-install'
import WeuiPickerComponent from './picker.vue'

export const WeuiPicker = withInstall(WeuiPickerComponent, 'WeuiPicker')
export { Picker } from './picker'
export type { WeuiPickerProps, WeuiPickerEmits, PickerColumn } from './picker.vue'
export type { PickerOption } from './picker-group.vue'
export type { PickerShowOptions, PickerShowResult } from './picker'
