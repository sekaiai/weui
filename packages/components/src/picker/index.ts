import type { App } from 'vue'
import WeuiPicker from './picker.vue'

WeuiPicker.install = (app: App) => {
  app.component(WeuiPicker.name || 'WeuiPicker', WeuiPicker)
}

export { WeuiPicker }
export { Picker } from './picker'
export type { WeuiPickerProps, WeuiPickerEmits, PickerColumn } from './picker.vue'
export type { PickerOption } from './picker-group.vue'
export type { PickerShowOptions, PickerShowResult } from './picker'
