import type { App } from 'vue'
import WeuiArticle from './article.vue'

WeuiArticle.install = (app: App) => {
  app.component(WeuiArticle.name || 'WeuiArticle', WeuiArticle)
}

export { WeuiArticle }
export type { WeuiArticleProps } from './article.vue'
