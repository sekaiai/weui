import { withInstall } from '../utils/with-install'
import WeuiActionsheetComponent from './actionsheet.vue'

export const WeuiActionsheet = withInstall(WeuiActionsheetComponent, 'WeuiActionsheet')
export { Actionsheet } from './actionsheet'
export type { WeuiActionsheetProps, WeuiActionsheetEmits, ActionsheetItem } from './actionsheet.vue'
export type { ActionsheetShowOptions, ActionsheetShowResult } from './actionsheet'
