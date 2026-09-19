import { withInstall } from '../utils/with-install'
import WeuiPanelComponent from './panel.vue'

export const WeuiPanel = withInstall(WeuiPanelComponent, 'WeuiPanel')
export type { WeuiPanelProps, WeuiPanelEmits } from './panel.vue'
