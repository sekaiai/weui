import { withInstall } from '../utils/with-install'
import WeuiGridComponent from './grid.vue'
import WeuiGridItemComponent from './grid-item.vue'

export const WeuiGrid = withInstall(WeuiGridComponent, 'WeuiGrid')
export const WeuiGridItem = withInstall(WeuiGridItemComponent, 'WeuiGridItem')
export type { WeuiGridProps } from './grid.vue'
export type { WeuiGridItemProps, WeuiGridItemEmits } from './grid-item.vue'
