import { withInstall } from '../utils/with-install'
import WeuiPreviewComponent from './preview.vue'

export const WeuiPreview = withInstall(WeuiPreviewComponent, 'WeuiPreview')
export type { WeuiPreviewProps, WeuiPreviewEmits, PreviewItem, PreviewButton } from './preview.vue'
