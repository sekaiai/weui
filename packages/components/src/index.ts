import type { App } from 'vue'
import { WeuiButton } from './button'
import type { WeuiButtonProps, WeuiButtonEmits } from './button'

const components = [WeuiButton]

const install = (vue: App): void => {
  components.forEach((component) => {
    if (component.install) {
      vue.use(component as any)
    }
  })
}

export default { install }

export { WeuiButton }
export type { WeuiButtonProps, WeuiButtonEmits }
