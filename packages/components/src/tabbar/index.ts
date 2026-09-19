import { withInstall } from '../utils/with-install'
import WeuiTabbarComponent from './tabbar.vue'
import WeuiTabbarItemComponent from './tabbar-item.vue'

export const WeuiTabbar = withInstall(WeuiTabbarComponent, 'WeuiTabbar')
export const WeuiTabbarItem = withInstall(WeuiTabbarItemComponent, 'WeuiTabbarItem')
export type { WeuiTabbarProps } from './tabbar.vue'
export type { WeuiTabbarItemProps, WeuiTabbarItemEmits } from './tabbar-item.vue'
