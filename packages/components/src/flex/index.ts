import { withInstall } from '../utils/with-install'
import WeuiFlexComponent from './flex.vue'
import WeuiFlexItemComponent from './flex-item.vue'

export const WeuiFlex = withInstall(WeuiFlexComponent, 'WeuiFlex')
export const WeuiFlexItem = withInstall(WeuiFlexItemComponent, 'WeuiFlexItem')
export type {
  WeuiFlexProps,
  WeuiFlexDirection,
  WeuiFlexWrap,
  WeuiFlexJustify,
  WeuiFlexAlign,
} from './flex.vue'
export type { WeuiFlexItemProps } from './flex-item.vue'
