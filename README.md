# WeUI Design Vue

基于 uni-app 的 WeUI 组件库，主目标微信小程序，兼 H5。视觉与 [weui.io](https://weui.io/) 完全一致。

## 状态

v0.1.0 alpha，组件正在逐步实现中。设计规格见 [docs/superpowers/specs/](./docs/superpowers/specs/)。

## 开发

```bash
# 安装依赖
pnpm install

# 文档站
pnpm dev:docs

# 示例工程（微信小程序）
pnpm dev:example:mp

# 示例工程（H5）
pnpm dev:example:h5

# 单测
pnpm test

# 类型检查
pnpm typecheck
```

## 结构

- `packages/components/` - 组件库源码
- `examples/uni-app/` - uni-app 示例工程
- `docs/` - VitePress 文档站
