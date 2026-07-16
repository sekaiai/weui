import type { App } from 'vue'
import WeuiFlex from './flex.vue'
import WeuiFlexItem from './flex-item.vue'

WeuiFlex.install = (app: App) => {
  app.component(WeuiFlex.name || 'WeuiFlex', WeuiFlex)
}

WeuiFlexItem.install = (app: App) => {
  app.component(WeuiFlexItem.name || 'WeuiFlexItem', WeuiFlexItem)
}

export { WeuiFlex, WeuiFlexItem }
export type {
  WeuiFlexProps,
  WeuiFlexDirection,
  WeuiFlexWrap,
  WeuiFlexJustify,
  WeuiFlexAlign,
} from './flex.vue'
export type { WeuiFlexItemProps } from './flex-item.vue'
