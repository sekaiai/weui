import { withInstall } from '../utils/with-install'
import WeuiSlideviewComponent from './slideview.vue'

export const WeuiSlideview = withInstall(WeuiSlideviewComponent, 'WeuiSlideview')
export type { WeuiSlideviewProps, WeuiSlideviewEmits, SlideButton } from './slideview.vue'
