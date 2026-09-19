import { withInstall } from '../utils/with-install'
import WeuiStepsComponent from './steps.vue'

export const WeuiSteps = withInstall(WeuiStepsComponent, 'WeuiSteps')
export type { WeuiStepsProps, StepItem } from './steps.vue'
