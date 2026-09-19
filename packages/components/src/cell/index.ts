import { withInstall } from '../utils/with-install'
import WeuiCellComponent from './cell.vue'
import WeuiCellGroupComponent from './cell-group.vue'

export const WeuiCell = withInstall(WeuiCellComponent, 'WeuiCell')
export const WeuiCellGroup = withInstall(WeuiCellGroupComponent, 'WeuiCellGroup')
export type { WeuiCellProps, WeuiCellEmits } from './cell.vue'
export type { WeuiCellGroupProps } from './cell-group.vue'
