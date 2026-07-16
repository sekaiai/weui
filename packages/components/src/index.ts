import type { App } from 'vue'
import { WeuiButton } from './button'
import { WeuiOverlayHost } from './overlay-host'
import { WeuiActionsheet } from './actionsheet'
import { WeuiBadge } from './badge'
import { WeuiCell, WeuiCellGroup } from './cell'
import type { WeuiButtonProps, WeuiButtonEmits } from './button'
import type { OverlayItem } from './overlay-host'
import type { WeuiActionsheetProps, WeuiActionsheetEmits, ActionsheetItem } from './actionsheet'
import type { WeuiBadgeProps } from './badge'
import type { WeuiCellProps, WeuiCellEmits, WeuiCellVariant, WeuiCellGroupProps, WeuiCellGroupVariant } from './cell'

const components = [WeuiButton, WeuiOverlayHost, WeuiActionsheet, WeuiBadge, WeuiCell, WeuiCellGroup]

const install = (app: App): void => {
  components.forEach((component) => {
    component.install?.(app)
  })
}

export default { install }

export { WeuiButton, WeuiOverlayHost, WeuiActionsheet, WeuiBadge, WeuiCell, WeuiCellGroup }
export type { WeuiButtonProps, WeuiButtonEmits, OverlayItem, WeuiActionsheetProps, WeuiActionsheetEmits, ActionsheetItem, WeuiBadgeProps, WeuiCellProps, WeuiCellEmits, WeuiCellVariant, WeuiCellGroupProps, WeuiCellGroupVariant }
