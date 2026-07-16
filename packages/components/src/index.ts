import type { App } from 'vue'
import { WeuiButton } from './button'
import { WeuiOverlayHost } from './overlay-host'
import { WeuiActionsheet } from './actionsheet'
import type { WeuiButtonProps, WeuiButtonEmits } from './button'
import type { OverlayItem } from './overlay-host'
import type { WeuiActionsheetProps, WeuiActionsheetEmits, ActionsheetItem } from './actionsheet'

const components = [WeuiButton, WeuiOverlayHost, WeuiActionsheet]

const install = (app: App): void => {
  components.forEach((component) => {
    component.install?.(app)
  })
}

export default { install }

export { WeuiButton, WeuiOverlayHost, WeuiActionsheet }
export type { WeuiButtonProps, WeuiButtonEmits, OverlayItem, WeuiActionsheetProps, WeuiActionsheetEmits, ActionsheetItem }
