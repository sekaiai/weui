import { withInstall } from '../utils/with-install'
import WeuiMsgComponent from './msg.vue'

export const WeuiMsg = withInstall(WeuiMsgComponent, 'WeuiMsg')
export type { WeuiMsgProps, WeuiMsgEmits, MsgButton } from './msg.vue'
