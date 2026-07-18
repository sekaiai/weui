# Button 按钮

按钮用于触发一个操作，如提交表单、打开对话框等。支持多种类型、尺寸、显示模式及加载/禁用状态。

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const clickResult = ref('')
const onClick = () => {
  clickResult.value = `点击了按钮（${new Date().toLocaleTimeString()}）`
}

// 验证码按钮状态
const vcodeInput = ref('')
const vcodeCounting = ref(false)
const vcodeSeconds = ref(60)
const vcodeMessage = ref('')
let vcodeTimer: ReturnType<typeof setInterval> | null = null

const onSendVcode = () => {
  if (vcodeCounting.value) return
  vcodeMessage.value = '验证码已发送'
  vcodeCounting.value = true
  vcodeSeconds.value = 60
  vcodeTimer = setInterval(() => {
    vcodeSeconds.value--
    if (vcodeSeconds.value <= 0) {
      vcodeCounting.value = false
      vcodeSeconds.value = 60
      if (vcodeTimer) {
        clearInterval(vcodeTimer)
        vcodeTimer = null
      }
    }
  }, 1000)
}

onUnmounted(() => {
  if (vcodeTimer) clearInterval(vcodeTimer)
})

// 半透明按钮遮罩层
const overlayVisible = ref(false)
const onOverlayCancel = () => {
  overlayVisible.value = false
  clickResult.value = '取消了半透明按钮操作'
}
const onOverlayConfirm = () => {
  overlayVisible.value = false
  clickResult.value = '确认了半透明按钮操作'
}
</script>

## 基础用法

通过 `type` 设置按钮类型：`primary` 主操作、`default` 次要操作、`warn` 警告操作。

<div class="demo-block">
  <div class="demo-row">
    <weui-button type="primary" @click="onClick">页面主操作</weui-button>
    <weui-button type="default" @click="onClick">页面次要操作</weui-button>
    <weui-button type="warn" @click="onClick">警告类操作</weui-button>
  </div>
  <p v-if="clickResult" style="margin-top: 8px; color: #07c160;">{{ clickResult }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="onClick">页面主操作</weui-button>
  <weui-button type="default" @click="onClick">页面次要操作</weui-button>
  <weui-button type="warn" @click="onClick">警告类操作</weui-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const clickResult = ref('')
const onClick = () => {
  clickResult.value = '点击了按钮'
}
</script>
```
:::

## 按钮尺寸

通过 `size` 设置按钮尺寸，提供 `default`、`medium`、`mini`、`xmini` 四种尺寸。

<div class="demo-block">
  <div class="demo-row">
    <weui-button type="primary" size="default">默认</weui-button>
    <weui-button type="primary" size="medium">中等</weui-button>
    <weui-button type="primary" size="mini">迷你</weui-button>
    <weui-button type="primary" size="xmini">超小</weui-button>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" size="default">默认</weui-button>
  <weui-button type="primary" size="medium">中等</weui-button>
  <weui-button type="primary" size="mini">迷你</weui-button>
  <weui-button type="primary" size="xmini">超小</weui-button>
</template>
```
:::

## 显示模式

通过 `display` 设置显示模式：`block` 填满父容器（块级），`inline` 行内排列。

<div class="demo-block">
  <weui-button type="primary" display="block">块级按钮</weui-button>
  <div class="demo-row" style="margin-top: 8px;">
    <weui-button type="default" display="inline">行内按钮</weui-button>
    <weui-button type="default" display="inline">行内按钮</weui-button>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" display="block">块级按钮</weui-button>
  <weui-button type="default" display="inline">行内按钮</weui-button>
  <weui-button type="default" display="inline">行内按钮</weui-button>
</template>
```
:::

## 禁用状态

`disabled` 为 `true` 时按钮不可点击，不会触发 `click` 事件。

<div class="demo-block">
  <div class="demo-row">
    <weui-button type="primary" disabled @click="onClick">禁用</weui-button>
    <weui-button type="default" disabled @click="onClick">禁用</weui-button>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" disabled>禁用</weui-button>
  <weui-button type="default" disabled>禁用</weui-button>
</template>
```
:::

## 加载状态

`loading` 为 `true` 时显示旋转加载图标，按钮仍可点击。

<div class="demo-block">
  <div class="demo-row">
    <weui-button type="primary" loading @click="onClick">加载中</weui-button>
    <weui-button type="default" loading @click="onClick">加载中</weui-button>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" loading>加载中</weui-button>
  <weui-button type="default" loading>加载中</weui-button>
</template>
```
:::

## 图标

通过 `icon` 设置图标地址，显示在文字左侧（cell 或标准模式下生效）。

<div class="demo-block">
  <weui-button type="primary" icon="https://weui.io/images/logo.png">带图标</weui-button>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" icon="https://weui.io/images/logo.png">带图标</weui-button>
</template>
```
:::

## Cell 样式按钮

`cell` 为 `true` 时渲染为通栏白底按钮（`weui-btn_cell`），常作为列表的通栏操作项，配合 `weui-cell-group` 使用。

### 配合 weui-cell-group 作为通栏操作

<div class="demo-block">
  <weui-cell-group>
    <weui-cell title="成员" value="3 人" />
    <weui-cell title="群名" value="WeUI 设计组" />
    <weui-button cell type="primary">添加成员</weui-button>
  </weui-cell-group>
</div>

### 在 cell 右侧放置操作按钮

若需在 cell 右侧放置操作按钮（非通栏），使用普通按钮配合 `size="mini"`，通过 `#footer` 插槽放入 cell：

<div class="demo-block">
  <weui-cell-group>
    <weui-cell title="设置" value="已开启">
      <template #footer>
        <weui-button type="primary" size="mini">编辑</weui-button>
      </template>
    </weui-cell>
    <weui-cell title="通知" value="已关闭">
      <template #footer>
        <weui-button type="default" size="mini">开启</weui-button>
      </template>
    </weui-cell>
  </weui-cell-group>
</div>

### 通栏 Cell 按钮类型

<div class="demo-block">
  <weui-button cell type="primary">Cell Primary</weui-button>
  <weui-button cell type="default">Cell Default</weui-button>
  <weui-button cell type="warn">Cell Warn</weui-button>
</div>

::: details 查看代码
```vue
<template>
  <!-- 配合 weui-cell-group 作为通栏操作 -->
  <weui-cell-group>
    <weui-cell title="成员" value="3 人" />
    <weui-cell title="群名" value="WeUI 设计组" />
    <weui-button cell type="primary">添加成员</weui-button>
  </weui-cell-group>

  <!-- 在 cell 右侧放置操作按钮 -->
  <weui-cell-group>
    <weui-cell title="设置" value="已开启">
      <template #footer>
        <weui-button type="primary" size="mini">编辑</weui-button>
      </template>
    </weui-cell>
    <weui-cell title="通知" value="已关闭">
      <template #footer>
        <weui-button type="default" size="mini">开启</weui-button>
      </template>
    </weui-cell>
  </weui-cell-group>

  <!-- 通栏 Cell 按钮类型 -->
  <weui-button cell type="primary">Cell Primary</weui-button>
  <weui-button cell type="default">Cell Default</weui-button>
  <weui-button cell type="warn">Cell Warn</weui-button>
</template>
```
:::

## 验证码按钮

`vcode` 为 `true` 时渲染为验证码按钮（`weui-vcode-btn`），带左侧分隔线，配合 `weui-cell` 使用：输入框放 cell 默认插槽（body 区），验证码按钮放 `#footer` 插槽。点击后启动 60 秒倒计时。

<div class="demo-block">
  <weui-cell-group>
    <weui-cell title="验证码" variant="vcode">
      <input
        v-model="vcodeInput"
        type="text"
        placeholder="请输入验证码"
        style="width: 100%; border: none; outline: none; font-size: 17px;"
      />
      <template #footer>
        <weui-button
          vcode
          :disabled="vcodeCounting"
          @click="onSendVcode"
        >
          {{ vcodeCounting ? `${vcodeSeconds}s 后重发` : '获取验证码' }}
        </weui-button>
      </template>
    </weui-cell>
  </weui-cell-group>
  <p v-if="vcodeMessage" style="margin-top: 8px; color: #07c160; font-size: 14px;">{{ vcodeMessage }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-cell-group>
    <weui-cell title="验证码" variant="vcode">
      <input
        v-model="vcodeInput"
        type="text"
        placeholder="请输入验证码"
        style="width: 100%; border: none; outline: none; font-size: 17px;"
      />
      <template #footer>
        <weui-button
          vcode
          :disabled="vcodeCounting"
          @click="onSendVcode"
        >
          {{ vcodeCounting ? `${vcodeSeconds}s 后重发` : '获取验证码' }}
        </weui-button>
      </template>
    </weui-cell>
  </weui-cell-group>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const vcodeInput = ref('')
const vcodeCounting = ref(false)
const vcodeSeconds = ref(60)
const vcodeMessage = ref('')
let timer: ReturnType<typeof setInterval> | null = null

const onSendVcode = () => {
  if (vcodeCounting.value) return
  vcodeMessage.value = '验证码已发送'
  vcodeCounting.value = true
  vcodeSeconds.value = 60
  timer = setInterval(() => {
    vcodeSeconds.value--
    if (vcodeSeconds.value <= 0) {
      vcodeCounting.value = false
      vcodeSeconds.value = 60
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }
  }, 1000)
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
```
:::

## 半透明样式

`overlay` 为 `true` 时使用半透明样式（`weui-btn_overlay`），常用于弹层（遮罩层）底部的操作按钮。

<div class="demo-block">
  <div class="demo-row">
    <weui-button type="primary" @click="overlayVisible = true">显示遮罩层</weui-button>
  </div>
  <p v-if="clickResult" style="margin-top: 8px; color: #07c160;">{{ clickResult }}</p>
</div>

<div
  v-if="overlayVisible"
  style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: flex; align-items: flex-end; z-index: 1000;"
>
  <div style="background: rgba(0,0,0,0.8); padding: 12px; width: 100%; display: flex; gap: 8px;">
    <weui-button type="default" overlay @click="onOverlayCancel">取消</weui-button>
    <weui-button type="primary" overlay @click="onOverlayConfirm">确定</weui-button>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="overlayVisible = true">显示遮罩层</weui-button>

  <div
    v-if="overlayVisible"
    style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: flex; align-items: flex-end; z-index: 1000;"
  >
    <div style="background: rgba(0,0,0,0.8); padding: 12px; width: 100%; display: flex; gap: 8px;">
      <weui-button type="default" overlay @click="onOverlayCancel">取消</weui-button>
      <weui-button type="primary" overlay @click="onOverlayConfirm">确定</weui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const overlayVisible = ref(false)
const clickResult = ref('')

const onOverlayCancel = () => {
  overlayVisible.value = false
  clickResult.value = '取消了半透明按钮操作'
}
const onOverlayConfirm = () => {
  overlayVisible.value = false
  clickResult.value = '确认了半透明按钮操作'
}
</script>
```
:::

## 微信小程序开放能力

通过 `open-type` 设置微信小程序按钮的开放能力，如 `share`、`getPhoneNumber`、`contact` 等。该能力仅在微信小程序环境中生效，浏览器中无效果。

```vue
<template>
  <weui-button type="primary" open-type="share">分享</weui-button>
  <weui-button type="primary" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
    获取手机号
  </weui-button>
</template>
```

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 按钮类型 | string | primary / default / warn | default |
| size | 按钮尺寸 | string | default / medium / mini / xmini | default |
| display | 显示模式 | string | block / inline | — |
| cell | 是否为 cell 样式按钮 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| loading | 是否加载中 | boolean | — | false |
| icon | 图标地址 | string | — | — |
| vcode | 是否为验证码按钮 | boolean | — | false |
| overlay | 是否半透明样式 | boolean | — | false |
| open-type | 微信小程序开放能力 | string | share / getPhoneNumber / contact / … | — |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击按钮时触发（禁用状态不触发） | (event: Event) |

## 微信小程序 open-type 事件

使用 `open-type` 时，以下事件由微信小程序 `<button>` 原生触发，可直接在组件上监听：

| 事件名 | 说明 |
| --- | --- |
| getphonenumber | 获取用户手机号回调 |
| getuserinfo | 获取用户信息回调 |
| contact | 客服消息回调 |
| error | 发生错误回调 |
| launchapp | 打开 APP 成功回调 |
| opensetting | 打开授权设置页回调 |
| chooseavatar | 获取用户头像回调 |
