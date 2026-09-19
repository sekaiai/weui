import { withInstall } from '../utils/with-install'
import WeuiArticleComponent from './article.vue'

export const WeuiArticle = withInstall(WeuiArticleComponent, 'WeuiArticle')
export type { WeuiArticleProps } from './article.vue'
