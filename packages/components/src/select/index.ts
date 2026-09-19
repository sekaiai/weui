import { withInstall } from '../utils/with-install'
import WeuiSelectComponent from './select.vue'

export const WeuiSelect = withInstall(WeuiSelectComponent, 'WeuiSelect')
export type { WeuiSelectProps, WeuiSelectEmits } from './select.vue'
