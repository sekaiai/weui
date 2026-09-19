import { withInstall } from '../utils/with-install'
import WeuiToptipsComponent from './toptips.vue'

export const WeuiToptips = withInstall(WeuiToptipsComponent, 'WeuiToptips')
export { Toptips } from './toptips'
export type { WeuiToptipsProps, WeuiToptipsEmits, ToptipsType } from './toptips.vue'
export type { ToptipsShowOptions } from './toptips'
