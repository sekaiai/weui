import { withInstall } from '../utils/with-install'
import WeuiAgreeComponent from './agree.vue'

export const WeuiAgree = withInstall(WeuiAgreeComponent, 'WeuiAgree')
export type { WeuiAgreeProps, WeuiAgreeEmits } from './agree.vue'
