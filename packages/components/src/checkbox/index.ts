import type { App } from 'vue'
import WeuiCheckbox from './checkbox.vue'
import WeuiCheckboxGroup from './checkbox-group.vue'

WeuiCheckbox.install = (app: App) => {
  app.component(WeuiCheckbox.name || 'WeuiCheckbox', WeuiCheckbox)
}

WeuiCheckboxGroup.install = (app: App) => {
  app.component(WeuiCheckboxGroup.name || 'WeuiCheckboxGroup', WeuiCheckboxGroup)
}

export { WeuiCheckbox, WeuiCheckboxGroup }
export type { WeuiCheckboxProps } from './checkbox.vue'
export type { WeuiCheckboxGroupProps, WeuiCheckboxGroupEmits } from './checkbox-group.vue'
