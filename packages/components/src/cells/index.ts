import type { App } from 'vue'
import WeuiCells from './cells.vue'

WeuiCells.install = (app: App) => {
  app.component(WeuiCells.name || 'WeuiCells', WeuiCells)
}

export { WeuiCells }
export type { WeuiCellsProps } from './cells.vue'
