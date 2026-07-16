import type { App } from 'vue'
import { WeuiButton } from './button'
import { WeuiOverlayHost } from './overlay-host'
import { WeuiActionsheet } from './actionsheet'
import { WeuiBadge } from './badge'
import type { WeuiButtonProps, WeuiButtonEmits } from './button'
import type { OverlayItem } from './overlay-host'
import type { WeuiActionsheetProps, WeuiActionsheetEmits, ActionsheetItem } from './actionsheet'
import type { WeuiBadgeProps } from './badge'

const components = [WeuiButton, WeuiOverlayHost, WeuiActionsheet, WeuiBadge]

const install = (app: App): void => {
  components.forEach((component) => {
    component.install?.(app)
  })
}

export default { install }

export { WeuiButton, WeuiOverlayHost, WeuiActionsheet, WeuiBadge }
export type { WeuiButtonProps, WeuiButtonEmits, OverlayItem, WeuiActionsheetProps, WeuiActionsheetEmits, ActionsheetItem, WeuiBadgeProps }
