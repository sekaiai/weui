// 让 vue-tsc 在模板类型检查时识别 __IS_H5__（作为 globalProperties）
// 打包插件（任务 4）会在构建时将源码中的 __IS_H5__ 替换为字面量 true/false，
// 届时模板中 v-if="__IS_H5__" 会变为 v-if="true"/v-if="false"，
// 本声明仅用于源码阶段的 vue-tsc 类型检查
import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    __IS_H5__: boolean
  }
}
