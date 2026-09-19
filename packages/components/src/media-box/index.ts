import { withInstall } from '../utils/with-install'
import WeuiMediaBoxComponent from './media-box.vue'

export const WeuiMediaBox = withInstall(WeuiMediaBoxComponent, 'WeuiMediaBox')
export type { WeuiMediaBoxProps, WeuiMediaBoxEmits, WeuiMediaBoxType } from './media-box.vue'
