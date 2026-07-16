import WeuiButton from './button.vue'

WeuiButton.install = (vue: any) => {
  vue.component(WeuiButton.name!, WeuiButton)
}

export { WeuiButton }
export type { WeuiButtonProps, WeuiButtonEmits } from './button.vue'
