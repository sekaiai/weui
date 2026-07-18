// 平台常量，由打包插件在 transform 时替换为字面量 true/false
// - Vue 3 产物：替换为 true
// - uni-app 产物：替换为 false
declare const __IS_H5__: boolean
