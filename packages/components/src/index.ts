import type { App } from 'vue'
import { WeuiButton } from './button'
import { WeuiOverlayHost } from './overlay-host'
import type { WeuiButtonProps, WeuiButtonEmits } from './button'

const components = [WeuiButton, WeuiOverlayHost]

const install = (app: App): void => {
  components.forEach((component) => {
    component.install?.(app)
  })
}

export default { install }

export { WeuiButton, WeuiOverlayHost }
export type { WeuiButtonProps, WeuiButtonEmits }
