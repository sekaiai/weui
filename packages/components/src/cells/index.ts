import { withInstall } from '../utils/with-install'
import WeuiCellsComponent from './cells.vue'

export const WeuiCells = withInstall(WeuiCellsComponent, 'WeuiCells')
export type { WeuiCellsProps } from './cells.vue'
