# HalfScreenDialog 半屏弹窗

从底部滑出的半屏弹窗，用于展示较丰富的内容或引导操作。支持声明式和命令式两种调用方式。

本页完整复现 [WeUI 官方示例](https://github.com/Tencent/weui/blob/master/src/example/half-screen-dialog/half-screen-dialog.html) 的**五种样式**，一一对应：

| 官方样式 | 官方类名 | 本页`variant` |
| --- | --- | --- |
| 样式一 | `weui-half-screen-dialog` | `default`（默认） |
| 样式二 | `weui-half-screen-dialog weui-bottom-fixed-opr-page` | `bottomFixed` |
| 样式三 | `weui-half-screen-dialog weui-half-screen-dialog_large` | `large` |
| 样式四 | `weui-half-screen-dialog` + 协议勾选 | `default` + 插槽 |
| 样式五 | `weui-half-screen-dialog weui-half-screen-dialog_grab` | `grab` |

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  HalfScreenDialog,
  type HalfScreenDialogButton,
  type HalfScreenDialogAction,
} from 'weui-uniapp-design'

/* ---------- 状态：每个 demo 独立 ref ---------- */

// 官方五种样式：show1 ~ show5 仅供「样式一」~「样式五」使用，
// 顶部汇总按钮与各样式自己的按钮共用同一批 ref，便于对照官方示例。
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)

// 其余每个 demo 使用独立 ref，避免多个示例共用一个 visible 导致同时弹出多个弹窗
const showBasic = ref(false)
const showSingle = ref(false)
const showThree = ref(false)
const showNoMaskClose = ref(false)
const showNoMask = ref(false)
const showBtnWrap = ref(false)
const showCustomSlot = ref(false)

/* ---------- 数据 ---------- */

// 官方示例中的同一张头像（base64 内联，避免额外资源请求）
const avatar =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII='

// 三按钮：含警告按钮，演示按 type 分支处理
const threeButtons: HalfScreenDialogButton[] = [
  { label: '取消' },
  { label: '确定' },
  { label: '删除', type: 'warn' },
]

/* ---------- 打开弹窗 ---------- */

/**
 * demo 的visible ref 登记表。
 *
 * 模板表达式里的 ref 会被 Vue 的 setupState proxy 自动解包成布尔值，
 * 传进函数后 ref.value = true 会抛
 * "Cannot create property 'value' on boolean 'false'"。
 * 把 ref 收进普通对象再取属性则不会被解包。
 */
const demoRefs = {
  style1: show1,
  style2: show2,
  style3: show3,
  style4: show4,
  style5: show5,
  basic: showBasic,
  single: showSingle,
  three: showThree,
  noMaskClose: showNoMaskClose,
  noMask: showNoMask,
  btnWrap: showBtnWrap,
  customSlot: showCustomSlot,
}

type DemoRefKey = keyof typeof demoRefs

/** 打开指定样式的弹窗，汇总按钮与各样式自己的按钮共用同一批 ref */
const openStyle = (style: 1 | 2 | 3 | 4 | 5) => {
  demoRefs[`style${style}` as DemoRefKey].value = true
}

const openDemo = (key: DemoRefKey) => {
  demoRefs[key].value = true
}

/* ---------- 事件回调 ---------- */

/** 底部按钮点击：按索引区分确认与取消 */
const onButtonTap = (btn: HalfScreenDialogButton, index: number) => {
  if (index === 1) {
    console.log('确认：', btn.label)
    return
  }
  console.log('取消：', btn.label)
}

/** 文件操作按钮：警告按钮需二次确认，单独分支 */
const onFileAction = (btn: HalfScreenDialogButton, index: number) => {
  if (btn.type === 'warn') {
    console.log('删除文件，需二次确认：', btn.label)
    return
  }

  if (index === 1) {
    console.log('确认操作：', btn.label)
    return
  }

  console.log('已取消')
}

/** 头部操作点击：按操作类型分派 */
const onActionTap = (action: HalfScreenDialogAction, index: number) => {
  console.log('头部操作：', action.type ?? 'icon', action.text, index)
}

/** 附加操作点击：不关闭弹窗，仅回退上一步 */
const onAttachmentTap = () => {
  console.log('附加操作：返回上一步')
}

/** maskClosable=false 时，底部按钮是唯一关闭路径 */
const onAcknowledge = (btn: HalfScreenDialogButton) => {
  console.log('已确认：', btn.label)
}

/** 插槽内按钮需自行处理并手动关闭 visible */
const onCustomSlotConfirm = () => {
  showCustomSlot.value = false
}

/* ---------- 样式四：协议勾选 ---------- */

const agreeTerms = ref(false)
const agreeIdentity = ref(false)

/** 协议是否全部勾选 —— 决定主操作按钮的文案与能否提交 */
const allAgreed = computed(() => agreeTerms.value && agreeIdentity.value)

/** 底部按钮：主操作带前置校验，未勾选协议时拦截提交 */
const onAgreeButtonTap = (btn: HalfScreenDialogButton, index: number) => {
  if (index === 0) {
    console.log('返回')
    return
  }

  if (!allAgreed.value) {
    console.log('提交被拦截：尚未勾选全部协议')
    return
  }

  console.log('提交成功：', btn.label)
}

/* ---------- 命令式调用 ---------- */

/** index >= 0 表示点了按钮，index === -1 表示点遮罩关闭 */
const onImperative = async () => {
  const result = await HalfScreenDialog.show({
    title: '提示',
    subtitle: '命令式调用',
    content: '是否确认提交？',
    buttons: [{ label: '取消' }, { label: '确定' }],
  })

  if (result.index < 0) {
    console.log('点遮罩关闭')
    return
  }

  console.log('点击了按钮：', result.button?.label, result.index)
}
</script>

<weui-overlay-host />

## 官方示例：五种样式

对应官方页面的「样式一」到「样式五」五个按钮。

<div class="demo-block vp-raw">
  <div class="demo-row">
    <weui-button type="default" @click="openStyle(1)">样式一</weui-button>
    <weui-button type="default" @click="openStyle(2)">样式二</weui-button>
    <weui-button type="default" @click="openStyle(3)">样式三</weui-button>
    <weui-button type="default" @click="openStyle(4)">样式四</weui-button>
    <weui-button type="default" @click="openStyle(5)">样式五</weui-button>
  </div>
</div>

## 样式一：标准头部（左右操作 + 标题副标题）

官方结构为 `__hd__side`（关闭）+ `__hd__main`（标题/副标题）+ `__hd__side`（操作组），
操作组内含图标按钮与文字链接。内容区可放任意自定义内容。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="openStyle(1)">样式一</weui-button>
  <weui-half-screen-dialog
    v-model:visible="show1"
    title="标题"
    subtitle="副标题"
    :header-actions="[
      { text: '搜索', icon: 'weui-icon-search' },
      { text: '更多', icon: 'weui-icon-more' },
      { text: '完成', type: 'link' },
    ]"
    @actiontap="onActionTap"
  >
    <div style="text-align: center; padding: 24px 0;">可放自定义内容</div>
  </weui-half-screen-dialog>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">样式一</weui-button>

  <weui-half-screen-dialog
    v-model:visible="show"
    title="标题"
    subtitle="副标题"
    :header-actions="[
      { text: '搜索', icon: 'weui-icon-search' },
      { text: '更多', icon: 'weui-icon-more' },
      { text: '完成', type: 'link' },
    ]"
    @actiontap="onActionTap"
  >
    <div style="text-align: center; padding: 24px 0;">可放自定义内容</div>
  </weui-half-screen-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { HalfScreenDialogAction } from 'weui-uniapp-design'

const show = ref(false)

/** 头部操作点击：按操作类型分派 */
const onActionTap = (action: HalfScreenDialogAction, index: number) => {
  console.log('头部操作：', action.type ?? 'icon', action.text, index)
}
</script>
```
:::

## 样式二：底部固定操作栏（bottomFixed）

对应官方 `.weui-bottom-fixed-opr-page`，容器附加该类名后，内容区使用
`weui-bottom-fixed-opr-page__content`（可滚动），底部使用 `weui-bottom-fixed-opr-page__tool`
（带向上渐变遮罩）。关闭图标为向下箭头，`desc` / `tips` 分别对应 `__desc` 与 `__tips`。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="openStyle(2)">样式二</weui-button>
  <weui-half-screen-dialog
    v-model:visible="show2"
    variant="bottomFixed"
    title="标题"
    desc="辅助描述内容，可根据实际需要安排"
    tips="辅助提示内容，可根据实际需要安排 Dolor adipisci quidem consequuntur similique consequuntur doloribus modi possimus sunt voluptas qui Aspernatur natus error quisquam quidem ipsa corrupti! Dignissimos quasi quis natus fugiat odio in? Mollitia molestias error earum. Dolor adipisci quidem consequuntur similique consequuntur doloribus modi possimus sunt voluptas qui Aspernatur natus error quisquam quidem ipsa corrupti! Dignissimos quasi quis natus fugiat odio in? Mollitia molestias error earum. Dolor adipisci quidem consequuntur similique consequuntur doloribus modi possimus sunt voluptas qui Aspernatur natus error quisquam quidem ipsa corrupti! Dignissimos quasi quis natus fugiat odio in? Mollitia molestias error earum."
    :header-actions="[{ text: '更多', icon: 'weui-icon-more' }]"
    :buttons="[{ label: '次要操作' }, { label: '同意下一步' }]"
    @buttontap="onButtonTap"
    @actiontap="onActionTap"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">样式二</weui-button>

  <weui-half-screen-dialog
    v-model:visible="show"
    variant="bottomFixed"
    title="标题"
    desc="辅助描述内容，可根据实际需要安排"
    tips="辅助提示内容，可根据实际需要安排……"
    :header-actions="[{ text: '更多', icon: 'weui-icon-more' }]"
    :buttons="[{ label: '次要操作' }, { label: '同意下一步' }]"
    @buttontap="onButtonTap"
    @actiontap="onActionTap"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { HalfScreenDialogButton, HalfScreenDialogAction } from 'weui-uniapp-design'

const show = ref(false)

/** 底部按钮点击：按索引区分「同意下一步」与「次要操作」 */
const onButtonTap = (btn: HalfScreenDialogButton, index: number) => {
  console.log(index === 1 ? '同意下一步' : '次要操作', btn.label)
}

/** 头部操作点击 */
const onActionTap = (action: HalfScreenDialogAction, index: number) => {
  console.log('头部操作：', action.text, index)
}
</script>
```
:::

## 样式三：大高度 + 头像 + 附加操作

对应官方 `.weui-half-screen-dialog_large`（取消 `max-height`、距顶 16px）。
头部主区域放头像与昵称，底部除按钮区外还有 `__attachment-area` 文字链接。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="openStyle(3)">样式三</weui-button>
  <weui-half-screen-dialog
    v-model:visible="show3"
    variant="large"
    :show-close="false"
    :avatar="avatar"
    nickname="昵称"
    attachment-text="附加操作"
    :buttons="[{ label: '次要操作' }, { label: '主要操作' }]"
    @buttontap="onButtonTap"
    @attachmenttap="onAttachmentTap"
  >
    <div style="text-align: center; padding: 24px 0;">可放自定义内容</div>
  </weui-half-screen-dialog>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">样式三</weui-button>

  <weui-half-screen-dialog
    v-model:visible="show"
    variant="large"
    :show-close="false"
    :avatar="avatar"
    nickname="昵称"
    attachment-text="附加操作"
    :buttons="[{ label: '次要操作' }, { label: '主要操作' }]"
    @buttontap="onButtonTap"
    @attachmenttap="onAttachmentTap"
  >
    <div style="text-align: center; padding: 24px 0;">可放自定义内容</div>
  </weui-half-screen-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { HalfScreenDialogButton } from 'weui-uniapp-design'

const show = ref(false)

// 实际项目中替换为自己的头像地址
const avatar = 'https://example.com/avatar.png'

/** 底部按钮点击：按索引区分主要与次要操作 */
const onButtonTap = (btn: HalfScreenDialogButton, index: number) => {
  console.log(index === 1 ? '主要操作' : '次要操作', btn.label)
}

/** 附加操作点击：不关闭弹窗 */
const onAttachmentTap = () => {
  console.log('返回上一步')
}
</script>
```
:::

## 样式四：头像 + 协议勾选

官方样式四与样式三同为标准容器，区别在内容区放了 `weui-form__tips__group` 协议勾选组。
通过默认插槽传入 `weui-agree` 即可。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="openStyle(4)">样式四</weui-button>
  <weui-half-screen-dialog
    v-model:visible="show4"
    :show-close="false"
    :avatar="avatar"
    nickname="昵称"
    attachment-text="附加操作"
    :buttons="[
      { label: '非主要操作' },
      { label: allAgreed ? '提交' : '请先勾选' },
    ]"
    @buttontap="onAgreeButtonTap"
    @attachmenttap="onAttachmentTap"
  >
    <div class="weui-form__tips__group">
      <div class="weui-form__tips__wrp">
        <label class="weui-agree weui-wa-hotarea">
          <input
            v-model="agreeTerms"
            type="checkbox"
            class="weui-agree__checkbox"
            @change="onAgreeChange"
          />
          <span class="weui-agree__text">阅读并同意<a href="javascript:;">《相关条款》</a></span>
        </label>
      </div>
      <div class="weui-form__tips__wrp">
        <label class="weui-agree weui-wa-hotarea">
          <input
            v-model="agreeIdentity"
            type="checkbox"
            class="weui-agree__checkbox"
            @change="onAgreeChange"
          />
          <span class="weui-agree__text">以上信息用于核对账号绑定的身份</span>
        </label>
      </div>
    </div>
  </weui-half-screen-dialog>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">样式四</weui-button>

  <weui-half-screen-dialog
    v-model:visible="show"
    :show-close="false"
    :avatar="avatar"
    nickname="昵称"
    attachment-text="附加操作"
    :buttons="[
      { label: '非主要操作' },
      { label: allAgreed ? '提交' : '请先勾选' },
    ]"
    @buttontap="onButtonTap"
    @attachmenttap="onAttachmentTap"
  >
    <div class="weui-form__tips__group">
      <div class="weui-form__tips__wrp">
        <label class="weui-agree weui-wa-hotarea">
          <input v-model="agreeTerms" type="checkbox" class="weui-agree__checkbox" />
          <span class="weui-agree__text">阅读并同意<a href="javascript:;">《相关条款》</a></span>
        </label>
      </div>
      <div class="weui-form__tips__wrp">
        <label class="weui-agree weui-wa-hotarea">
          <input v-model="agreeIdentity" type="checkbox" class="weui-agree__checkbox" />
          <span class="weui-agree__text">以上信息用于核对账号绑定的身份</span>
        </label>
      </div>
    </div>
  </weui-half-screen-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { HalfScreenDialogButton } from 'weui-uniapp-design'

const show = ref(false)

// 实际项目中替换为自己的头像地址
const avatar = 'https://example.com/avatar.png'

const agreeTerms = ref(false)
const agreeIdentity = ref(false)

/** 协议是否全部勾选 —— 决定主操作按钮的文案与能否提交 */
const allAgreed = computed(() => agreeTerms.value && agreeIdentity.value)

/** 底部按钮：主操作带前置校验，未勾选协议时拦截提交 */
const onButtonTap = (btn: HalfScreenDialogButton, index: number) => {
  if (index === 0) {
    console.log('返回')
    return
  }

  if (!allAgreed.value) {
    console.log('尚未勾选全部协议，无法提交')
    return
  }

  console.log('提交成功')
}

/** 附加操作点击：不关闭弹窗 */
const onAttachmentTap = () => {
  console.log('返回上一步')
}
</script>
```
:::

## 样式五：可下拉关闭（grab）

对应官方 `.weui-half-screen-dialog_grab`：顶部有可拖动的把手（`__hd__grab` + `__slide-icon`），
下方是导航行（`__hd__nav`）。下拉时把手随进度变高变圆，过半后显示向下箭头；
下拉超过 `dragThreshold`（默认 56px）即关闭。操作组内还支持 xmini 主色按钮。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="openStyle(5)">样式五（可下拉关闭）</weui-button>
  <weui-half-screen-dialog
    v-model:visible="show5"
    variant="grab"
    title="标题"
    :header-actions="[
      { text: '搜索', icon: 'weui-icon-search' },
      { text: '更多', icon: 'weui-icon-more' },
      { text: '完成', type: 'button' },
    ]"
    @actiontap="onActionTap"
  >
    <div style="text-align: center; padding: 24px 0;">可放自定义内容</div>
  </weui-half-screen-dialog>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">样式五（可下拉关闭）</weui-button>

  <weui-half-screen-dialog
    v-model:visible="show"
    variant="grab"
    title="标题"
    :header-actions="[
      { text: '搜索', icon: 'weui-icon-search' },
      { text: '更多', icon: 'weui-icon-more' },
      { text: '完成', type: 'button' },
    ]"
    @actiontap="onActionTap"
  >
    <div style="text-align: center; padding: 24px 0;">可放自定义内容</div>
  </weui-half-screen-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { HalfScreenDialogAction } from 'weui-uniapp-design'

const show = ref(false)

/** 头部操作点击：xmini 主色按钮「完成」会关闭弹窗 */
const onActionTap = (action: HalfScreenDialogAction, index: number) => {
  console.log('头部操作：', action.type ?? 'icon', action.text, index)

  if (action.type === 'button') {
    show.value = false
  }
}
</script>
```
:::

## 基础用法

通过 `v-model:visible` 控制显示，`title` 设置标题，`subtitle` 设置副标题，`content` 设置内容，`buttons` 配置底部按钮。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="openDemo('basic')">基础用法</weui-button>
  <weui-half-screen-dialog
    v-model:visible="showBasic"
    title="提示"
    subtitle="这是一个副标题"
    content="这是一个半屏弹窗"
    :buttons="[{ label: '取消' }, { label: '确定' }]"
    @buttontap="onButtonTap"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">基础用法</weui-button>

  <weui-half-screen-dialog
    v-model:visible="show"
    title="提示"
    subtitle="这是一个副标题"
    content="这是一个半屏弹窗"
    :buttons="[{ label: '取消' }, { label: '确定' }]"
    @buttontap="onButtonTap"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { HalfScreenDialogButton } from 'weui-uniapp-design'

const show = ref(false)

/** 底部按钮点击：按索引区分确认与取消 */
const onButtonTap = (btn: HalfScreenDialogButton, index: number) => {
  if (index === 1) {
    console.log('确认提交')
    return
  }

  console.log('取消')
}
</script>
```
:::

## 单按钮

`buttons` 仅配置一项时，按钮自动设为 primary 样式。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="openDemo('single')">单按钮</weui-button>
  <weui-half-screen-dialog
    v-model:visible="showSingle"
    title="提示"
    content="操作成功"
    :buttons="[{ label: '知道了' }]"
    @buttontap="onButtonTap"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">单按钮</weui-button>

  <!-- 单按钮时组件自动分配 primary 样式，无需手动指定 type -->
  <weui-half-screen-dialog
    v-model:visible="show"
    title="提示"
    content="操作成功"
    :buttons="[{ label: '知道了' }]"
    @buttontap="onButtonTap"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { HalfScreenDialogButton } from 'weui-uniapp-design'

const show = ref(false)

/** 唯一按钮：用户确认已读 */
const onButtonTap = (btn: HalfScreenDialogButton) => {
  console.log('已确认：', btn.label)
}
</script>
```
:::

## 三按钮（含警告）

通过 `type: 'warn'` 设置警告按钮。未指定 type 时，多按钮首个为 default，其余为 primary。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="openDemo('three')">三按钮</weui-button>
  <weui-half-screen-dialog
    v-model:visible="showThree"
    title="文件操作"
    content="请选择操作"
    :buttons="threeButtons"
    @buttontap="onFileAction"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">三按钮</weui-button>

  <weui-half-screen-dialog
    v-model:visible="show"
    title="文件操作"
    content="请选择操作"
    :buttons="threeButtons"
    @buttontap="onFileAction"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { HalfScreenDialogButton } from 'weui-uniapp-design'

const show = ref(false)

const threeButtons: HalfScreenDialogButton[] = [
  { label: '取消' },
  { label: '确定' },
  { label: '删除', type: 'warn' },
]

/** 警告按钮需二次确认，单独分支处理 */
const onFileAction = (btn: HalfScreenDialogButton, index: number) => {
  if (btn.type === 'warn') {
    console.log('删除文件，需二次确认')
    return
  }

  console.log(index === 1 ? '确认操作' : '已取消')
}
</script>
```
:::

## 禁用遮罩点击

通过 `:mask-closable="false"` 禁止点击遮罩关闭，必须点击按钮。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="openDemo('noMaskClose')">禁用遮罩点击</weui-button>
  <weui-half-screen-dialog
    v-model:visible="showNoMaskClose"
    title="重要提示"
    content="请仔细阅读后再操作"
    :mask-closable="false"
    :buttons="[{ label: '我已知晓' }]"
  @buttontap="onAcknowledge"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">禁用遮罩点击</weui-button>

  <weui-half-screen-dialog
    v-model:visible="show"
    title="重要提示"
    content="请仔细阅读后再操作"
    :mask-closable="false"
    :buttons="[{ label: '我已知晓' }]"
    @buttontap="onAcknowledge"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { HalfScreenDialogButton } from 'weui-uniapp-design'

const show = ref(false)

/**
 * maskClosable=false 时，底部按钮是唯一的关闭路径，
 * 因此关闭相关的逻辑都集中在这里。
 */
const onAcknowledge = (btn: HalfScreenDialogButton) => {
  console.log('已确认：', btn.label)
}
</script>
```
:::

## 无遮罩背景

通过 `:mask="false"` 使遮罩透明（仍拦截点击）。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="openDemo('noMask')">无遮罩背景</weui-button>
  <weui-half-screen-dialog
    v-model:visible="showNoMask"
    title="提示"
    content="遮罩透明"
    :mask="false"
    :buttons="[{ label: '取消' }, { label: '确定' }]"
    @buttontap="onButtonTap"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">无遮罩背景</weui-button>

  <weui-half-screen-dialog
    v-model:visible="show"
    title="提示"
    content="遮罩透明"
    :mask="false"
    :buttons="[{ label: '取消' }, { label: '确定' }]"
    @buttontap="onButtonTap"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { HalfScreenDialogButton } from 'weui-uniapp-design'

const show = ref(false)

/** mask=false 只是背景透明，遮罩仍会拦截点击，关闭逻辑不变 */
const onButtonTap = (btn: HalfScreenDialogButton, index: number) => {
  console.log(index === 1 ? '确定' : '取消', btn.label)
}
</script>
```
:::

## 按钮垂直排列

官方在字号放大导致按钮换行时，会自动给容器加 `weui-half-screen-dialog_btn-wrap` 使按钮纵向排列。
组件已内置按按钮实际高度（> 48px）的自动判断，也可通过 `btn-wrap` 手动控制。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="openDemo('btnWrap')">按钮垂直排列</weui-button>
  <weui-half-screen-dialog
    v-model:visible="showBtnWrap"
    title="标题"
    content="按钮纵向排列"
    btn-wrap
    :buttons="[{ label: '次要操作' }, { label: '主要操作' }]"
    @buttontap="onButtonTap"
  />
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">按钮垂直排列</weui-button>

  <weui-half-screen-dialog
    v-model:visible="show"
    title="标题"
    content="按钮纵向排列"
    btn-wrap
    :buttons="[{ label: '次要操作' }, { label: '主要操作' }]"
    @buttontap="onButtonTap"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { HalfScreenDialogButton } from 'weui-uniapp-design'

const show = ref(false)

/** 按钮纵向排列只影响布局，不影响点击逻辑 */
const onButtonTap = (btn: HalfScreenDialogButton) => {
  console.log('点击：', btn.label)
}
</script>
```
:::

## 自定义插槽

通过 `header`、`title`、`default`、`footer`、`action` 插槽分别替换头部、头部主区域、内容区、底部按钮区与头部操作组。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="openDemo('customSlot')">自定义插槽</weui-button>
  <weui-half-screen-dialog v-model:visible="showCustomSlot">
    <template #title>
      <span>自定义标题</span>
    </template>
    <div style="text-align: center; padding: 16px 0;">
      <span style="color: #fa5151; font-size: 16px;">⚠️</span>
      <span>这是一个带图标的提示内容，可以放置更丰富的内容。</span>
    </div>
    <template #footer>
      <div class="weui-half-screen-dialog__btn-area">
        <button
          type="button"
          class="weui-btn weui-btn_primary"
          @click="onCustomSlotConfirm"
        >知道了</button>
      </div>
    </template>
  </weui-half-screen-dialog>
</div>

::: details 查看代码
```vue
<template>
  <weui-button type="primary" @click="show = true">自定义插槽</weui-button>

  <weui-half-screen-dialog v-model:visible="show">
    <template #title>
      <span>自定义标题</span>
    </template>

    <div style="text-align: center; padding: 16px 0;">可放更丰富的内容</div>

    <template #footer>
      <div class="weui-half-screen-dialog__btn-area">
        <!-- 插槽内的按钮不会触发组件的 buttontap，需自行处理并手动关闭 -->
        <button type="button" class="weui-btn weui-btn_primary" @click="onConfirm">知道了</button>
      </div>
    </template>
  </weui-half-screen-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)

/** 插槽内按钮需自行处理点击，并手动关闭 visible */
const onConfirm = () => {
  console.log('已确认')
  show.value = false
}
</script>
```
:::

## 命令式调用

通过 `HalfScreenDialog.show(options)` 命令式调用，无需在模板中声明组件。返回 `Promise<{ button, index }>`，点击按钮 resolve `{ button, index }`，点击遮罩关闭 resolve `{ button: undefined, index: -1 }`。

<div class="demo-block vp-raw">
  <weui-button type="primary" @click="onImperative">HalfScreenDialog.show</weui-button>
</div>

::: details 查看代码
```vue
<template>
  <!-- 命令式调用必须挂载 overlay-host，作为弹层的挂载容器 -->
  <weui-overlay-host />
  <weui-button type="primary" @click="showImperative">HalfScreenDialog.show</weui-button>
</template>

<script setup lang="ts">
import { HalfScreenDialog } from 'weui-uniapp-design'

/**
 * resolve 值的含义：
 * - index >= 0：点了按钮，index 是按钮索引，button 是按钮对象
 * - index === -1：点遮罩关闭，button 为 undefined
 */
const showImperative = async () => {
  const result = await HalfScreenDialog.show({
    title: '提示',
    subtitle: '命令式调用',
    content: '是否确认提交？',
    buttons: [{ label: '取消' }, { label: '确定' }],
  })

  if (result.index < 0) {
    console.log('点遮罩关闭')
    return
  }

  console.log('点击了按钮：', result.button?.label, result.index)
}
</script>
```
:::

## 与官方实现的差异

以下差异均为组件化封装所必需，视觉与交互与官方一致：

- **下滑动画样式**：官方把 `.weui-half-screen-dialog { transform: translateY(100%) }` 与 `_show` 写在 `example.less` 中，未随 `weui.css` 发布。组件在自身 `<style>` 中补齐了等效规则。
- **按钮类名**：官方底部按钮只使用 `weui-btn` + `weui-btn_default/_primary`，没有 `__btn` 系列类名（本仓库旧版本曾使用不存在的 `weui-half-screen-dialog__btn`），现已对齐官方。
- **显示/关闭动画**：官方用 jQuery `fadeIn/fadeOut` + class 控制，组件用 `wrapperShow`（挂载）+ `innerShow`（动画）两级状态实现等价时序。
- **无障碍**：官方通过 `aria-hidden` / `aria-modal` / `tabindex` / `focus` 管理焦点，组件在遮罩层承载这些属性，并在关闭后把焦点还给触发元素。
- **字号自适应**：官方监听 `WeixinJSBridge` 的 `menu:setfont` 判断按钮是否换行，组件改用 `ResizeObserver` 测量按钮高度（> 48px 即纵向排列），并支持 `btn-wrap` 手动覆盖。

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible (v-model) | 是否显示 | boolean | false |
| variant | 变体样式，对应官方五种样式 | 'default' \| 'bottomFixed' \| 'large' \| 'grab' | 'default' |
| title | 标题 | string | — |
| subtitle | 副标题 | string | — |
| content | 内容文字（无 default slot 时使用） | string | — |
| desc | 辅助描述（`__desc`） | string | — |
| tips | 辅助提示（`__tips`） | string | — |
| buttons | 按钮列表 | HalfScreenDialogButton[] | [] |
| header-actions | 头部右侧操作列表 | HalfScreenDialogAction[] | [] |
| attachment-text | 附加操作文字（`__attachment-area`） | string | — |
| avatar | 头部头像图片地址，设置后主区域渲染头像+昵称 | string | — |
| nickname | 昵称，配合 avatar 使用 | string | — |
| show-close | 是否显示头部关闭按钮 | boolean | true |
| close-icon | 关闭按钮图标类名 | string | 按 variant 推导 |
| draggable | 是否允许下拉关闭（仅 grab 变体生效） | boolean | true |
| drag-threshold | 下拉关闭阈值（px） | number | 56 |
| mask-closable | 点击遮罩是否关闭 | boolean | true |
| mask | 是否显示遮罩背景 | boolean | true |
| btn-wrap | 按钮是否纵向排列；不传时按按钮高度自动判断 | boolean | 自动 |
| ext-class | 自定义附加类名 | string | — |
| wrapper-class | 遮罩结构包装层的扩展类名 | string | — |
| z-index | z-index（命令式调用时由 overlay-host 注入） | number | — |

### HalfScreenDialogButton

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 按钮文字 | string | — |
| type | 按钮类型，未指定时按位置自动分配（单按钮 primary，多按钮首个 default 其余 primary） | 'default' \| 'primary' \| 'warn' | — |

### HalfScreenDialogAction

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 文字（同时作为无障碍标签） | string | — |
| icon | 图标类名，如 `weui-icon-search` | string | — |
| type | 呈现形式：`icon`=图标按钮、`link`=文字链接、`button`=xmini 按钮 | 'icon' \| 'link' \| 'button' | 'icon' |
| primary | `type=button` 时是否为主色 | boolean | true |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:visible | 显示状态变化时触发 | (value: boolean) |
| buttontap | 点击底部按钮时触发 | (button: HalfScreenDialogButton, index: number) |
| actiontap | 点击头部操作时触发 | (action: HalfScreenDialogAction, index: number) |
| attachmenttap | 点击附加操作时触发 | — |
| close | 关闭时触发 | — |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| header | 整个头部区域（替换默认头部结构） |
| title | 头部主区域 `__hd__main` 内容 |
| action | 头部右侧操作组 |
| default | 内容区域 `__bd` |
| footer | 底部区域 `__ft`（含按钮区与附加操作区） |

## 命令式 API

### HalfScreenDialog.show(options): `Promise<HalfScreenDialogShowResult>`

显示半屏弹窗，点击任意按钮后关闭并 resolve；点击遮罩关闭时 resolve `{ button: undefined, index: -1 }`。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 变体样式 | 'default' \| 'bottomFixed' \| 'large' \| 'grab' | 'default' |
| title | 标题 | string | — |
| subtitle | 副标题 | string | — |
| content | 内容文字 | string | — |
| desc | 辅助描述 | string | — |
| tips | 辅助提示 | string | — |
| buttons | 按钮列表 | HalfScreenDialogButton[] | [] |
| headerActions | 头部右侧操作列表 | HalfScreenDialogAction[] | [] |
| attachmentText | 附加操作文字 | string | — |
| avatar | 头部头像图片地址 | string | — |
| nickname | 昵称 | string | — |
| showClose | 是否显示头部关闭按钮 | boolean | true |
| closeIcon | 关闭按钮图标类名 | string | 按 variant 推导 |
| draggable | 是否允许下拉关闭 | boolean | true |
| dragThreshold | 下拉关闭阈值（px） | number | 56 |
| maskClosable | 点击遮罩是否关闭 | boolean | true |
| mask | 是否显示遮罩 | boolean | true |
| extClass | 自定义附加类名 | string | — |
| wrapperClass | 遮罩结构包装层的扩展类名 | string | — |

返回 Promise，resolve 值结构：

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| button | 被点击的按钮；遮罩关闭时为 undefined | HalfScreenDialogButton \| undefined |
| index | 被点击的按钮索引；遮罩关闭时为 -1 | number |
