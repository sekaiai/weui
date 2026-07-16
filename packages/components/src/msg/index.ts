import type { App } from 'vue'
import WeuiMsg from './msg.vue'

WeuiMsg.install = (app: App) => {
  app.component(WeuiMsg.name || 'WeuiMsg', WeuiMsg)
}

export { WeuiMsg }
export type { WeuiMsgProps, WeuiMsgEmits, MsgButton } from './msg.vue'
