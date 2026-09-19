import { withInstall } from '../utils/with-install'
import WeuiFooterComponent from './footer.vue'

export const WeuiFooter = withInstall(WeuiFooterComponent, 'WeuiFooter')
export type { WeuiFooterProps, FooterLink } from './footer.vue'
