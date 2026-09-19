import { withInstall } from '../utils/with-install'
import WeuiNavbarComponent from './navbar.vue'
import WeuiNavbarItemComponent from './navbar-item.vue'

export const WeuiNavbar = withInstall(WeuiNavbarComponent, 'WeuiNavbar')
export const WeuiNavbarItem = withInstall(WeuiNavbarItemComponent, 'WeuiNavbarItem')
export type { WeuiNavbarProps } from './navbar.vue'
export type { WeuiNavbarItemProps, WeuiNavbarItemEmits } from './navbar-item.vue'
