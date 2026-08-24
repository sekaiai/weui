# 表单组件封装实施记录（当前版本）

> 本文件替代早期“拆分 Form 容器”的实施计划。当前实现已收敛为单一 `WeuiForm` 组件，以下内容是最终架构记录。

## 目标

让 `WeuiForm` 在 Vue 3/H5 与 uni-app 中都提供完整、稳定且不依赖内部 easycom 的 WeUI 表单结构。

## 已确定的实现

- `packages/components/src/form/form.vue` 内联 `.weui-form`、`.weui-form__bd`、`.weui-form__text-area`、`.weui-form__control-area` 和 `.weui-form__ft`。
- 保留 props：`title`、`desc`、`bottomFixed`、`extClass`。
- 只保留 slots：`default`、`title`、`desc`、`tips`、`opr`、`tips-b`、`extra`。
- `default` 始终渲染到控件区域；底部区域固定按 `tips → opr → tips-b → extra` 顺序渲染。
- 业务表单控件、按钮和底部附加结构由调用方通过 slots 提供。
- 不保留独立 Form 区域组件，不保留旧的 Form 区域组件导出或类型导出。

## 公开 API 变更

旧的独立 Form 区域容器及其类型不再属于组件包公开 API。调用方应迁移到 `WeuiForm` 的 `default`、`tips`、`opr`、`tips-b` 和 `extra` slots。

该迁移属于 breaking change，不提供 deprecated 兼容包装器。

## 验收记录

1. Form Vitest 覆盖固定外壳、七个最终 slots、条件渲染和旧 slot 不生效。
2. uni-app 转换检查确认 Form 不含内部 WeUI 组件标签或运行时 import。
3. 组件包入口不再导出已删除的独立 Form 容器。
4. 文档、Skills、示例和生成产物均遵循单体 Form 结构。
