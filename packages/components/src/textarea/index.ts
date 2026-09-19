import { withInstall } from '../utils/with-install'
import WeuiTextareaComponent from './textarea.vue'

export const WeuiTextarea = withInstall(WeuiTextareaComponent, 'WeuiTextarea')
export type { WeuiTextareaProps, WeuiTextareaEmits } from './textarea.vue'
