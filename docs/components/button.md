# Button 按钮

[WeUI 官方 Button 文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)

按钮用于触发页面操作。组件按 WeUI 的标准按钮、行按钮与底部悬浮操作区设计实现；主按钮的宽度会随内容增长，最长两行，`block` 才会填满容器。

<script setup lang="ts">
import { onUnmounted, ref } from 'vue'

const clickResult = ref('')
const overlayVisible = ref(false)
const bottomFixedVisible = ref(false)
const vcode = ref('')
const vcodeCounting = ref(false)
const vcodeSeconds = ref(60)
let vcodeTimer: ReturnType<typeof setInterval> | undefined

const onClick = (message: string) => {
  clickResult.value = message
}

const sendVcode = () => {
  if (vcodeCounting.value) return

  vcodeCounting.value = true
  vcodeSeconds.value = 59
  vcodeTimer = setInterval(() => {
    if (vcodeSeconds.value <= 1) {
      vcodeCounting.value = false
      vcodeSeconds.value = 60
      clearInterval(vcodeTimer)
      vcodeTimer = undefined
      return
    }
    vcodeSeconds.value -= 1
  }, 1000)
}

onUnmounted(() => clearInterval(vcodeTimer))
</script>

## 基础用法

`type` 提供 `primary`、`default` 与 `warn` 三种官方视觉类型。默认宽度适应内容；使用 `display="block"` 填满父容器，使用 `display="inline"` 在同一行排列。

## 局部样式

原生 `style`、`class` 与 `ext-class` 都绑定到实际的 `<button>`，可直接调整业务布局：

```vue
<weui-button
  type="primary"
  style="margin-top: 40px"
  :loading="loading"
  @click="onSubmit"
>
  确定
</weui-button>
```

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="onClick('点击了主要操作')">主要操作</weui-button>
  <weui-button type="default" @click="onClick('点击了次要操作')">次要操作</weui-button>
  <weui-button type="warn" @click="onClick('点击了警示操作')">警示操作</weui-button>
  <weui-button type="primary" display="block">填满容器的主要操作</weui-button>
  <p v-if="clickResult" style="margin: 12px 0 0; color: #07c160;">{{ clickResult }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary">主要操作</weui-button>
  <weui-button type="default">次要操作</weui-button>
  <weui-button type="warn">警示操作</weui-button>
  <weui-button type="primary" display="block">填满容器的主要操作</weui-button>
</template>
```
:::

## 加载与禁用

`loading` 使用官方 `.weui-mask-loading` 结构；不传文字时展示仅加载图标，传入默认插槽则在图标右侧显示文字。加载状态保留点击能力，避免替业务擅自改变交互；需要阻止重复提交时同时设置 `disabled`。

<div class="demo-block vp-raw">
  <weui-button type="primary" loading aria-label="正在加载" />
  <weui-button type="default" loading>正在加载</weui-button>
  <weui-button type="warn" loading>正在提交</weui-button>
  <weui-button type="primary" disabled>禁用的主要操作</weui-button>
  <weui-button type="default" disabled>禁用的次要操作</weui-button>
  <weui-button type="warn" disabled>禁用的警示操作</weui-button>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" loading aria-label="正在加载" />
  <weui-button type="default" loading>正在加载</weui-button>
  <weui-button type="warn" loading disabled>正在提交</weui-button>
</template>
```
:::

## 尺寸与排列

`medium` 适合紧凑操作；`mini` 与 `xmini` 适合列表或同级操作。紧邻 mini 按钮时 WeUI 不会追加垂直间距；若放在 flex 布局中，使用 `margin-reset` 取消其自动居中。

<div class="demo-block vp-raw">
  <weui-button type="primary" size="medium">medium 按钮</weui-button>
  <p style="margin: 16px 0 8px;">
    <weui-button type="primary" size="mini">按钮</weui-button>
    <weui-button type="default" size="mini">按钮</weui-button>
    <weui-button type="warn" size="mini">按钮</weui-button>
  </p>
  <p style="margin: 8px 0 0;">
    <weui-button type="primary" size="xmini">按钮</weui-button>
    <weui-button type="default" size="xmini">按钮</weui-button>
    <weui-button type="warn" size="xmini">按钮</weui-button>
  </p>
  <p style="margin: 16px 0 0;">
    <weui-button type="default" display="inline">行内按钮</weui-button>
    <weui-button type="primary" display="inline">行内按钮</weui-button>
  </p>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" size="medium">medium 按钮</weui-button>
  <weui-button type="primary" size="mini">按钮</weui-button>
  <weui-button type="default" size="mini">按钮</weui-button>
  <weui-button type="warn" size="xmini">按钮</weui-button>
  <weui-button type="primary" display="inline">行内按钮</weui-button>
</template>
```
:::

## 半透明背景

在深色遮罩或图片背景上，`overlay` 使用 WeUI 的反色方案。该状态只改变视觉，不影响按钮的事件或禁用语义。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="overlayVisible = !overlayVisible">{{ overlayVisible ? '收起' : '查看' }}半透明按钮</weui-button>
  <div v-if="overlayVisible" style="margin-top: 16px; padding: 16px; border-radius: 8px; background: rgba(0, 0, 0, .7);">
    <weui-button type="primary" overlay>主要操作</weui-button>
    <weui-button type="default" overlay>次要操作</weui-button>
    <weui-button type="warn" overlay disabled>禁用的警示操作</weui-button>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <section class="dark-panel">
    <weui-button type="primary" overlay>主要操作</weui-button>
    <weui-button type="default" overlay>次要操作</weui-button>
    <weui-button type="warn" overlay disabled>禁用的警示操作</weui-button>
  </section>
</template>
```
:::

## 行按钮

`cell` 生成 `.weui-btn_cell`，适合列表后的明确操作项，并支持 `icon` 图片。下面以“帐号设置”为例：帐号资料继续使用 `weui-cell`，危险的退出操作作为独立行按钮，避免把它误当成普通列表项。

<div class="demo-block vp-raw">
  <weui-cells>
    <weui-cell icon="info" title="帐号与安全" footer="已设置" link />
    <weui-cell icon="success" title="登录设备管理" link />
    <weui-cell title="消息通知">
      <template #footer><weui-button type="primary" size="mini" @click="onClick('已打开通知设置')">设置</weui-button></template>
    </weui-cell>
  </weui-cells>
  <weui-button cell type="warn" @click="onClick('已提交退出当前帐号操作')">退出当前帐号</weui-button>
  <p v-if="clickResult" style="margin: 12px 0 0; color: #07c160;">{{ clickResult }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-cells>
    <weui-cell icon="info" title="帐号与安全" footer="已设置" link />
    <weui-cell icon="success" title="登录设备管理" link />
    <weui-cell title="消息通知">
      <template #footer>
        <weui-button type="primary" size="mini" @click="openNotice">设置</weui-button>
      </template>
    </weui-cell>
  </weui-cells>
  <weui-button cell type="warn" @click="signOut">退出当前帐号</weui-button>
</template>

<script setup lang="ts">
const openNotice = () => {
  // 跳转至通知设置页
}

const signOut = () => {
  // 弹出二次确认，确认后再清理登录态
}
</script>
```
:::

## 验证码按钮

`vcode` 对应 WeUI form 中的 `.weui-vcode-btn`。它只负责按钮视觉，验证码输入和倒计时由页面管理；放置于 `weui-cell vcode` 的 `#footer` 中。点击发送后，示例会立即显示“已发送(59)”并开始倒计时。

<div class="demo-block vp-raw">
  <weui-cells>
    <weui-cell vcode label="验证码">
      <weui-input v-model="vcode" placeholder="请输入验证码" type="number" />
      <template #footer>
        <weui-button vcode :disabled="vcodeCounting" @click="sendVcode">
          {{ vcodeCounting ? `已发送(${vcodeSeconds})` : '发送验证码' }}
        </weui-button>
      </template>
    </weui-cell>
  </weui-cells>
</div>

::: details 查看代码
```vue
<template>
  <weui-cells>
    <weui-cell vcode label="验证码">
      <weui-input v-model="code" type="number" placeholder="请输入验证码" />
      <template #footer>
        <weui-button vcode :disabled="counting" @click="sendVcode">
          {{ counting ? `已发送(${seconds})` : '发送验证码' }}
        </weui-button>
      </template>
    </weui-cell>
  </weui-cells>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue'

const code = ref('')
const counting = ref(false)
const seconds = ref(60)
let timer: ReturnType<typeof setInterval> | undefined

const sendVcode = () => {
  if (counting.value) return

  counting.value = true
  seconds.value = 59
  timer = setInterval(() => {
    if (seconds.value <= 1) {
      counting.value = false
      seconds.value = 60
      clearInterval(timer)
      timer = undefined
      return
    }
    seconds.value -= 1
  }, 1000)
}

onUnmounted(() => clearInterval(timer))
</script>
```
:::

## 底部悬浮操作区

底部悬浮是页面布局，不是单个按钮的状态。按照官方 DOM 使用 `.weui-bottom-fixed-opr-page`、内容区与工具区；表单场景可改用 `weui-form bottom-fixed`。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="bottomFixedVisible = !bottomFixedVisible">{{ bottomFixedVisible ? '收起' : '查看' }}底部悬浮操作区</weui-button>
  <section v-if="bottomFixedVisible" class="weui-bottom-fixed-opr-page" style="min-height: 360px; margin-top: 16px; border-radius: 8px; overflow: hidden; background: var(--weui-BG-0, #ededed);">
    <div class="weui-bottom-fixed-opr-page__content" style="padding: 24px;">这里是可滚动的页面内容；底部操作区始终独立于内容区。</div>
    <div class="weui-bottom-fixed-opr-page__tool">
      <div class="weui-bottom-fixed-opr">
        <weui-button type="primary">确认</weui-button>
        <weui-button type="default">取消</weui-button>
      </div>
    </div>
  </section>
</div>

::: details 查看代码
```vue
<template>
  <section class="weui-bottom-fixed-opr-page" style="min-height: 70vh;">
    <main class="weui-bottom-fixed-opr-page__content">页面内容</main>
    <footer class="weui-bottom-fixed-opr-page__tool">
      <div class="weui-bottom-fixed-opr">
        <weui-button type="primary">确认</weui-button>
        <weui-button type="default">取消</weui-button>
      </div>
    </footer>
  </section>
</template>
```
:::

## 微信小程序开放能力

`open-type` 只在微信小程序原生 `<button>` 上生效，例如 `share`、`getPhoneNumber`、`contact`。未声明的原生属性与事件会透传给内部 button，可直接监听小程序开放能力事件。

::: details 查看代码
```vue
<template>
  <weui-button type="primary" open-type="share">分享</weui-button>
  <weui-button type="primary" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
    获取手机号
  </weui-button>
</template>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 视觉类型 | `primary` / `default` / `warn` | `default` |
| size | 按钮尺寸 | `default` / `medium` / `mini` / `xmini` | `default` |
| display | 显示方式 | `block` / `inline` | — |
| disabled | 禁用状态 | `boolean` | `false` |
| loading | 显示加载图标 | `boolean` | `false` |
| overlay | 半透明背景样式 | `boolean` | `false` |
| cell | 行按钮样式 | `boolean` | `false` |
| icon | 行按钮左侧图片地址 | `string` | — |
| margin-reset | 取消 mini/xmini 的自动居中 | `boolean` | `false` |
| vcode | 验证码按钮样式 | `boolean` | `false` |
| open-type | 微信小程序开放能力 | `string` | — |

## Slots 与事件

| 名称 | 说明 |
| --- | --- |
| default | 按钮文字或自定义内容；标准按钮自动包裹为 `.weui-btn__inner`。 |
| icon | 行按钮的自定义左侧图标；与 `icon` attr 共同按顺序渲染。 |
| click | 点击时触发；`disabled` 时不触发。 |
