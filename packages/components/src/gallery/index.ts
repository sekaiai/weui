import { withInstall } from '../utils/with-install'
import WeuiGalleryComponent from './gallery.vue'

export const WeuiGallery = withInstall(WeuiGalleryComponent, 'WeuiGallery')
export { Gallery } from './gallery'
export type { WeuiGalleryProps, WeuiGalleryEmits } from './gallery.vue'
export type { GalleryShowOptions } from './gallery'
