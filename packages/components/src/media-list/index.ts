import type { App } from 'vue'
import WeuiMediaList from './media-list.vue'

WeuiMediaList.install = (app: App) => {
  app.component(WeuiMediaList.name || 'WeuiMediaList', WeuiMediaList)
}

export { WeuiMediaList }
export type { WeuiMediaListProps, WeuiMediaListEmits, MediaListItem } from './media-list.vue'
