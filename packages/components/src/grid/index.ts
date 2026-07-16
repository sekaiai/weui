import type { App } from 'vue'
import WeuiGrid from './grid.vue'
import WeuiGridItem from './grid-item.vue'

WeuiGrid.install = (app: App) => {
  app.component(WeuiGrid.name || 'WeuiGrid', WeuiGrid)
}

WeuiGridItem.install = (app: App) => {
  app.component(WeuiGridItem.name || 'WeuiGridItem', WeuiGridItem)
}

export { WeuiGrid, WeuiGridItem }
export type { WeuiGridProps } from './grid.vue'
export type { WeuiGridItemProps, WeuiGridItemEmits } from './grid-item.vue'
