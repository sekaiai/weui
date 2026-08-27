// 类型垫片（ambient module shim）
//
// weui-uniapp-design 的类型声明由组件库自身的 `build:types` 步骤生成
// （输出到 dist/vue3/types/）。在当前仓库工作区中该产物尚未构建，
// 因此这里提供一个最小垫片，让示例工程能够顺利完成类型检查与构建，
// 而不需要修改组件库本身的文件。
//
// 如果你希望获得完整的类型提示，可在组件库目录下执行：
//   pnpm --filter weui-uniapp-design build:types
declare module 'weui-uniapp-design'
