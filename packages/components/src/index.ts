import type { App } from 'vue'
import { WeuiButton } from './button'
import type { WeuiButtonProps, WeuiButtonEmits } from './button'

const components = [WeuiButton]

const install = (app: App): void => {
  components.forEach((component) => {
    component.install?.(app)
  })
}

export default { install }

export { WeuiButton }
export type { WeuiButtonProps, WeuiButtonEmits }
