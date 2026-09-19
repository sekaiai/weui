import { withInstall } from '../utils/with-install'
import WeuiProgressComponent from './progress.vue'

export const WeuiProgress = withInstall(WeuiProgressComponent, 'WeuiProgress')
export type { WeuiProgressProps, WeuiProgressEmits } from './progress.vue'
