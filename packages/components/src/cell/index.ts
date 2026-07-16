import type { App } from 'vue'
import WeuiCell from './cell.vue'
import WeuiCellGroup from './cell-group.vue'

WeuiCell.install = (app: App) => {
  app.component(WeuiCell.name || 'WeuiCell', WeuiCell)
}

WeuiCellGroup.install = (app: App) => {
  app.component(WeuiCellGroup.name || 'WeuiCellGroup', WeuiCellGroup)
}

export { WeuiCell, WeuiCellGroup }
export type { WeuiCellProps, WeuiCellEmits, WeuiCellVariant } from './cell.vue'
export type { WeuiCellGroupProps, WeuiCellGroupVariant } from './cell-group.vue'
