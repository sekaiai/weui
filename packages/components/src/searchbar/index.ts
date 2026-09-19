import { withInstall } from '../utils/with-install'
import WeuiSearchbarComponent from './searchbar.vue'

export const WeuiSearchbar = withInstall(WeuiSearchbarComponent, 'WeuiSearchbar')
export type { WeuiSearchbarProps, WeuiSearchbarEmits } from './searchbar.vue'
