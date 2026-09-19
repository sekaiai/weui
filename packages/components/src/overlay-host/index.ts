import { withInstall } from '../utils/with-install'
import WeuiOverlayHostComponent from './overlay-host.vue'

export const WeuiOverlayHost = withInstall(WeuiOverlayHostComponent, 'WeuiOverlayHost')
export type { OverlayItem } from './overlay-host.vue'
