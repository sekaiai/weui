# 表单组件封装设计（当前版本）

> 本文已按当前实现同步。早期方案中的独立 Form 区域容器不再保留。

## 一、整体架构

`WeuiForm` 是唯一的 Form 结构组件，固定生成官方表单外壳：

```
WeuiForm
├── .weui-form
│   ├── .weui-form__bd
│   │   ├── .weui-form__text-area（由 title / desc 控制）
│   │   └── .weui-form__control-area（由 default 填充）
│   └── .weui-form__ft（由 tips / opr / tips-b / extra 控制）
```

Form 内部只使用原生节点和 slots，不依赖其他 Form 组件。这样 Vue 3/H5 和 uni-app 产物都使用同一套结构，uni-app 不需要解析组件库内部的 easycom 子组件。

## 二、固定 API

### Props

| Prop | 作用 |
|------|------|
| `title` | 标题 prop；无 `title` slot 时作为标题内容 |
| `desc` | 描述 prop；无 `desc` slot 时作为描述内容 |
| `bottomFixed` | 启用底部操作区固定布局 |
| `extClass` | 根节点上的业务自定义 class |

### Slots

| Slot | 渲染位置 |
|------|----------|
| `default` | `.weui-form__control-area`，始终渲染该区域 |
| `title` | `.weui-form__title` |
| `desc` | `.weui-form__desc` |
| `tips` | 第一个 `.weui-form__tips-area` |
| `opr` | `.weui-form__opr-area` |
| `tips-b` | 第二个 `.weui-form__tips-area` |
| `extra` | `.weui-form__extra-area` |

底部节点固定按 `tips → opr → tips-b → extra` 顺序渲染。对应 slot 不存在时，节点通过 `v-if` 移除；四个底部 slot 都不存在时不渲染 `.weui-form__ft`。

## 三、使用示例

```vue
<weui-form title="表单结构" desc="展示表单页面的信息。">
  <template #default>
    <weui-cell-group form>
      <weui-cells>
        <weui-cell label="姓名">
          <weui-input placeholder="请输入姓名" />
        </weui-cell>
      </weui-cells>
    </weui-cell-group>
  </template>
  <template #tips>提交前提示</template>
  <template #opr>
    <weui-button type="primary" display="block">提交</weui-button>
  </template>
  <template #tips-b>提交后提示</template>
  <template #extra>
    <div class="weui-footer">底部信息</div>
  </template>
</weui-form>
```

## 四、平台约束

- easycom 只保证业务页面使用的顶层组件；Form 内部不得依赖组件自动引入。
- uni-app 生成的 `form.vue` 必须保留完整外壳、默认 slot 和最终七个 slot 名称。
- 不提供 `footer`、`control` 或 `title-content` slot。
- 表单控件、按钮以及 footer 中的结构由调用方通过 slots 组合。
