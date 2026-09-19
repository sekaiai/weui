import { withInstall } from '../utils/with-install'
import WeuiUploaderComponent from './uploader.vue'

export const WeuiUploader = withInstall(WeuiUploaderComponent, 'WeuiUploader')
export type { WeuiUploaderProps, WeuiUploaderEmits, UploaderFile } from './uploader.vue'
