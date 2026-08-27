# weui-uniapp-design uni-app 组件使用指南

## 前置条件

在使用组件前，确保 uni-app 项目已满足以下条件：

1. **安装依赖**：`pnpm add weui-uniapp-design weui`
2. **引入 WeUI CSS**：在 `App.vue` 的 `<style>` 中或 `main.ts` 中引入 `import 'weui/dist/style/weui.css'`。组件自身的补充样式位于 SFC `<style>`，会随 easycom 组件由 uni-app 自动编译。
3. **挂载 OverlayHost**：在根组件模板中放置 `<weui-overlay-host />`（弹层组件依赖）
4. **支持 Sass**：目标工程需安装 `sass` 依赖
5. **easycom 配置**：在 `pages.json` 中添加（见项目 README）

组件通过 easycom 自定义规则自动解析，标签名遵循 `weui-<name>` 格式。

推荐使用发布包提供的稳定子路径：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^weui-(.*)": "weui-uniapp-design/uni-app/$1.vue"
    }
  }
}
```

不要在 uni-app 页面中从 `weui-uniapp-design` 根入口导入 Vue 3 产物；命令式弹层 API 也使用 `weui-uniapp-design/uni-app` 子入口。

生成的每个 uni-app Vue 组件都包含 `options: { virtualHost: true }`，用于统一启用虚拟节点宿主；该配置由构建转换器自动注入，业务页面不需要手动补写。

---

## 基础组件

### `<weui-button>` 按钮

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'primary' \| 'default' \| 'warn'` | `'default'` | 视觉类型 |
| size | `'default' \| 'medium' \| 'mini' \| 'xmini'` | `'default'` | 尺寸 |
| display | `'block' \| 'inline'` | — | block 占满宽度，inline 行内排列 |
| cell | `boolean` | `false` | 行按钮模式 |
| disabled | `boolean` | `false` | 禁用 |
| loading | `boolean` | `false` | 加载中 |
| icon | `string` | — | cell 模式的图片地址 |
| vcode | `boolean` | `false` | 验证码按钮模式 |
| overlay | `boolean` | `false` | 半透明背景适配 |
| marginReset | `boolean` | `false` | mini/xmini 取消水平居中 |
| openType | `string` | — | 小程序开放能力（share/getPhoneNumber 等） |

**Events**：`click`

**Slots**：`default`（内容）、`icon`（cell 模式图标区）

**示例**：
```html
<weui-button type="primary">确定</weui-button>
<weui-button type="warn" loading>删除中</weui-button>
<weui-button size="mini" type="primary">小按钮</weui-button>
<weui-button cell icon="/img/icon.svg">行按钮</weui-button>
```

**平台差异**：`openType` 仅小程序生效，H5 忽略；`loading` 态下默认 slot 文字仍显示（WeUI 规范）

---

### `<weui-badge>` 徽章

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| content | `string` | `''` | 徽章内容；空字符串显示为红点 |
| extClass | `string` | — | 扩展类名 |
| ariaLabel | `string` | — | 无障碍标签 |

**示例**：
```html
<weui-badge content="99+" />
<weui-badge content="新" />
<weui-badge content="" />  <!-- 红点模式 -->
```

---

### `<weui-icon>` 图标

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `string` | **必填** | WeUI 内置图标名 |
| size | `number \| string` | — | 尺寸，数字为 px |
| color | `string` | — | 颜色 |
| msg | `boolean` | `false` | 消息页大图标样式 |
| extClass | `string` | — | 业务自定义扩展类名 |

**示例**：
```html
<weui-icon type="success" size="64" color="#07C160" />
<weui-icon type="warn" msg />
```

---

### `<weui-loading>` 加载

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| size | `number` | `20` | 尺寸 px |
| color | `string` | `'#999'` | 文字颜色 |
| text | `string` | — | 加载文字 |
| transparent | `boolean` | `false` | 透明背景 |

**Slots**：`default`（覆盖 text）

**示例**：
```html
<weui-loading text="加载中" />
<weui-loading size="40" transparent>
  正在识别...
</weui-loading>
```

---

### `<weui-article>` 文章容器

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| extClass | `string` | — | 扩展类名 |

**Slots**：`default`（文章内容）

---

### `<weui-flex>` / `<weui-flex-item>` 弹性布局

**weui-flex Props**：

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| direction | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'` | `'row'` | 主轴方向 |
| wrap | `'nowrap' \| 'wrap' \| 'wrap-reverse'` | `'nowrap'` | 换行 |
| justify | `'start' \| 'end' \| 'center' \| 'between' \| 'around' \| 'evenly'` | `'start'` | 主轴对齐 |
| align | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'` | `'center'` | 交叉轴对齐 |
| extClass | `string` | — | 扩展类名 |

**weui-flex-item Props**：

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| extClass | `string` | — | 扩展类名 |
| flex | `number` | — | 自定义 flex 值（默认 1） |

**示例**：
```html
<weui-flex justify="between">
  <weui-flex-item>左</weui-flex-item>
  <weui-flex-item>右</weui-flex-item>
</weui-flex>
```

---

### `<weui-footer>` 页脚

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| text | `string` | — | 底部文字 |
| links | `FooterLink[]` | — | `[{ text, url }]` 链接列表 |
| fixed | `boolean` | `false` | 固定在底部 |

**Slots**：`default`（完全自定义）

**示例**：
```html
<weui-footer text="© 2024 Company" :links="[{ text: '关于', url: '/about' }]" />
```

---

### `<weui-progress>` 进度条

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| percent | `number` | **必填** | 0-100 |
| showInfo | `boolean` | `true` | 显示百分比文字 |
| showOperation | `boolean` | `true` | 显示取消按钮 |
| cancelText | `string` | `'取消'` | 取消按钮辅助文字 |
| strokeWidth | `number` | — | 进度条高度 px |
| activeColor | `string` | — | 激活色 |
| backgroundColor | `string` | — | 背景色 |
| extClass | `string` | — | 扩展类名 |

**Events**：`cancel`

**Slots**：`operation`（自定义取消按钮）

**示例**：
```html
<weui-progress :percent="60" active-color="#07C160" />
<weui-progress :percent="80" :show-info="false" stroke-width="4" />
```

---

### `<weui-loadmore>` 加载更多

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'default' \| 'line' \| 'dot'` | `'default'` | 模式 |
| text | `string` | `'正在加载'` | 文字 |
| showText | `boolean` | `true` | 显示文字 |
| extClass | `string` | — | 扩展类名 |

**示例**：
```html
<weui-loadmore />                           <!-- 加载中 -->
<weui-loadmore type="line" text="暂无更多" />  <!-- 分割线 -->
<weui-loadmore type="dot" />                 <!-- 三个点 -->
```

---

## 布局容器

### `<weui-cell>` 单元格

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | `''` | 标题 |
| label | `string` | — | 左侧标签 |
| subtitle | `string` | — | 副标题 |
| value | `string` | `''` | 右侧值 |
| desc | `string` | — | 描述文字 |
| icon | `string` | — | WeUI 图标名或图片 URL |
| footer | `string` | `''` | 右侧底部文字 |
| access | `boolean \| string` | `false` | 普通访问箭头（字符串作导航目标） |
| link | `boolean \| string` | `false` | 链接样式和访问箭头（字符串作导航目标） |
| url | `string` | `''` | 导航 URL |
| vcode | `boolean` | `false` | 验证码 cell |
| warn | `boolean` | `false` | 警告样式 |
| uploader | `boolean` | `false` | 上传器样式 |
| readonly | `boolean` | `false` | 只读 |
| disabled | `boolean` | `false` | 禁用 |
| primary | `boolean` | `false` | 顶部对齐 |
| wrap | `boolean` | `false` | 文字换行 |
| select | `boolean` | `false` | 选择器样式 |
| selectBefore | `boolean` | `false` | 前置选择器 |
| selectAfter | `boolean` | `false` | 后置选择器 |
| active | `boolean` | `false` | 强制激活态 |
| hover | `boolean` | `true` | hover 效果 |
| inline | `boolean` | `true` | 水平排列 |
| hasHeader/Body/Footer | `boolean` | `true` | 显示各区域 |
| extClass | `string` | — | 根元素扩展类名 |
| iconClass | `string` | — | 左侧区域 class |
| bodyClass | `string` | — | 主体区域 class |
| footerClass | `string` | — | 底部区域 class |
| ariaRole | `string` | — | aria-role |
| isSwipe | `boolean` | `false` | 左滑删除 |
| swipeText | `string` | `'删除'` | 滑动按钮文字 |
| swipeType | `'default' \| 'warn'` | `'warn'` | 滑动按钮样式 |

**Events**：`click`、`navigate`、`navigate-error`、`swipe-click`

**Slots**：`icon`、`title`、`subtitle`、`default`、`footer`

**平台差异**：H5 用 `<a>` 导航，小程序用 `<navigator>` 导航

**示例**：
```html
<!-- 带箭头 -->
<weui-cell title="设置" access />
<!-- 导航 -->
<weui-cell title="详情" link="/pages/detail/detail" value="查看" />
<!-- 表单型 -->
<weui-cell title="姓名" value="张三" />
<!-- 左滑删除 -->
<weui-cell title="消息" is-swipe swipe-text="删除" @swipe-click="onDelete" />
```

---

### `<weui-cell-group>` 单元格组

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| form | `boolean` | `false` | 表单型组 |
| primary | `boolean` | `false` | 反色表单样式，需与 `form` 一起使用 |
| extClass | `string` | — | 扩展类名 |
| ariaRole | `string` | — | 根元素 aria-role |

**Slots**：`default`

`CellGroup` 是纯分组外壳（边界规则见 SKILL.md「uni-app 复合组件构建约束」），渲染 `.weui-cells__group` 和 `default` slot，不负责标题、提示或 `.weui-cells` 主体，也不再接受 `title`、`footer`、`radio`、`checkbox`。

**示例**：
```html
<weui-cell-group form primary>
  <weui-cells title="个人信息">
    <weui-cell title="姓名" value="张三" />
    <weui-cell title="手机" value="138****1234" />
  </weui-cells>
</weui-cell-group>
```

---

### `<weui-cells>`

**weui-cells**：完整 Cells 容器，支持 `title`、`tips`、`form`、`radio`、`checkbox`、`after-title` 语义属性，以及 `title`、`default`、`tips` slots；Vue 模板中使用 kebab-case，例如 `<weui-cells after-title>`。

**示例**：
```html
<weui-cells title="列表标题" tips="这是底部提示" form>
  <weui-cell title="行1" />
  <weui-cell title="行2" />
</weui-cells>
```

---

### `<weui-grid>` / `<weui-grid-item>` 九宫格

**weui-grid**：`extClass` prop + `default` slot

**weui-grid-item Props**：

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| icon | `string` | — | 图标 URL/base64 |
| label | `string` | — | 文字 |
| url | `string` | — | 跳转链接 |
| extClass | `string` | — | 扩展类名 |

**Events**：`click`、`navigate`

**Slots**：`icon`、`label`、`default`

**平台差异**：H5 端 `navigate` 事件需自行处理跳转，非 H5 自动 `uni.navigateTo`

**示例**：
```html
<weui-grid>
  <weui-grid-item icon="/img/icon1.png" label="功能1" url="/pages/func1" />
  <weui-grid-item icon="/img/icon2.png" label="功能2" url="/pages/func2" />
</weui-grid>
```

---

### `<weui-panel>` 面板

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | — | 头部标题 |
| type | `'default' \| 'access'` | `'default'` | access 模式加箭头 |
| footerText | `string` | — | 底部更多文字 |
| footerHref | `string` | `'javascript:void(0);'` | 底部链接 |
| extClass | `string` | — | 扩展类名 |

**Events**：`footer-click`

**Slots**：`header`、`default`、`footer`

**示例**：
```html
<weui-panel title="图文列表" type="access" footer-text="查看更多" @footer-click="onMore">
  <weui-media-box thumb="/img/thumb.jpg" title="标题" desc="描述" />
</weui-panel>
```

---

### `<weui-media-box>` 媒体列表

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'text' \| 'cells'` | `'text'` | 模式 |
| thumb | `string` | — | 缩略图 |
| title | `string` | — | 标题 |
| desc | `string` | — | 描述 |
| href | `string` | — | 链接（非 cells 模式） |
| extClass | `string` | — | 扩展类名 |

**Events**：`click`（无 href 时）

**Slots**：`hd`、`default`

**示例**：
```html
<weui-media-box
  type="text"
  thumb="/img/avatar.png"
  title="标题"
  desc="描述文字"
/>
```

---

### `<weui-form>` 表单容器

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | — | 标题 |
| desc | `string` | — | 描述 |
| bottomFixed | `boolean` | `false` | 底部悬浮 |
| extClass | `string` | — | 扩展类名 |

**Slots**：`default`、`title`、`desc`、`tips`、`opr`、`tips-b`、`extra`

> **uni-app 平台限制**：Form 的 `.weui-form__bd`、`.weui-form__text-area`、`.weui-form__control-area`、`.weui-form__ft`、双 `.weui-form__tips-area`、`.weui-form__opr-area` 和 `.weui-form__extra-area` 使用内联结构生成，不依赖 Form 子组件的内部自动引入。`default` 始终渲染到 control-area，底部区域固定按 `tips → opr → tips-b → extra` 顺序使用 `v-if` 渲染。

**示例**：
```html
<weui-form
  title="表单结构"
  desc="展示表单页面的信息结构样式，分别由头部区域、控件区域、提示区域、操作区域和底部信息区域组成。"
>
  <template #default>
    <weui-cell-group form>
      <weui-cells>
        <weui-cell label="微信号">
          <weui-input placeholder="填写本人微信号" />
        </weui-cell>
        <weui-cell label="昵称">
          <weui-input placeholder="填写本人微信号的昵称" />
        </weui-cell>
        <weui-cell label="联系电话">
          <weui-input type="number" placeholder="填写绑定的电话号码" />
        </weui-cell>
      </weui-cells>
    </weui-cell-group>
  </template>
  <template #tips>表单页提示，居中对齐</template>
  <template #opr>
    <weui-button type="primary" display="block">确定</weui-button>
  </template>
  <template #tips-b>表单页提示，居中对齐</template>
  <template #extra>
    <div class="weui-footer">Copyright © weui.io</div>
  </template>
</weui-form>
```

Form 的 `title`、`desc`、`tips`、`opr`、`tips-b`、`extra` 只填充对应固定节点；`default` 是唯一的控件区域内容入口。Form 是唯一的表单结构组件，不需要额外的 Form 容器组件。

Form 中的普通 Cells 控件区统一使用 `CellGroup(form) → Cells`；CheckboxGroup 和 RadioGroup 已经自带分组与 Cells 结构，不需要额外包裹 CellGroup。

---

### `<weui-preview>` 信息预览

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string` | — | 标题 |
| headerLabel | `string` | — | 头部标签 |
| items | `PreviewItem[]` | `[]` | `[{ label, value }]` |
| buttons | `PreviewButton[]` | `[]` | `[{ text, type?, url? }]` |
| extClass | `string` | — | 扩展类名 |

**Events**：`buttontap`

**Slots**：`header`、`default`、`footer`

**示例**：
```html
<weui-preview
  title="订单详情"
  :items="[{ label: '订单号', value: '123456' }, { label: '金额', value: '¥99.00' }]"
  :buttons="[{ text: '返回', type: 'default' }, { text: '确认', type: 'primary' }]"
  @buttontap="onButtonTap"
/>
```

---

### `<weui-agree>` 协议勾选

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `boolean` | `false` | v-model |
| disabled | `boolean` | `false` | 禁用 |
| warn | `boolean` | `false` | 警告 + 抖动动画 |
| animate | `boolean` | `false` | 触发抖动 |
| extClass | `string` | — | 扩展类名 |

**Events**：`update:modelValue`、`change`

**Slots**：`default`（协议文字）

**示例**：
```html
<weui-agree v-model="agreed">
  已阅读并同意<a href="/terms">《用户协议》</a>
</weui-agree>
```

---

## 表单输入

### `<weui-input>` 输入框

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string` | `''` | v-model |
| placeholder | `string` | — | 占位文字 |
| type | `'text' \| 'number' \| 'idcard' \| 'digit' \| 'password' \| 'safe-password' \| 'nickname'` | `'text'` | 输入类型 |
| disabled | `boolean` | `false` | 禁用 |
| readonly | `boolean` | `false` | 只读 |
| maxlength | `number` | `140` | 最大长度，-1 不限制 |
| clearable | `boolean` | `false` | 清除按钮 |
| focus | `boolean` | `false` | 聚焦 |
| confirmType | `'send' \| 'search' \| 'next' \| 'go' \| 'done'` | `'done'` | 键盘确认按钮 |
| extClass | `string` | — | 扩展类名 |

**Events**：`update:modelValue`、`focus`、`blur`、`confirm`、`clear`、`keyboardheightchange`

**平台差异**：`safe-password`/`nickname` 仅小程序；H5 端 `password` 降级为原生 `type="password"`；`focus` 在 H5 端通过 `ref.focus()` 实现

**示例**：
```html
<weui-input v-model="phone" type="number" placeholder="请输入手机号" clearable />
<weui-input v-model="pwd" type="password" placeholder="请输入密码" />
```

---

### `<weui-textarea>` 多行输入

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string` | `''` | v-model |
| placeholder | `string` | — | 占位文字 |
| rows | `number` | `3` | 行数 |
| maxlength | `number` | `200` | 最大长度 |
| showCount | `boolean` | `true` | 字数统计 |
| label | `string` | — | 标签 |
| disabled | `boolean` | `false` | 禁用 |
| warn | `boolean` | `false` | 警告样式 |
| primary | `boolean` | `false` | 顶部对齐 |
| vertical | `boolean` | `false` | 垂直布局 |
| extClass | `string` | — | 扩展类名 |

**Events**：`update:modelValue`、`change`

**示例**：
```html
<weui-textarea v-model="desc" placeholder="请输入描述" :maxlength="500" />
```

---

### `<weui-checkbox>` / `<weui-checkbox-group>` 复选框

**weui-checkbox Props**：

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | `string` | **必填** | 标识值 |
| label | `string` | `''` | 显示文字 |
| disabled | `boolean` | `false` | 禁用 |
| checked | `boolean` | `false` | 独立模式选中态 |
| extClass | `string` | — | 扩展类名 |

**weui-checkbox-group Props**：

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string[]` | `[]` | 选中值数组 |
| disabled | `boolean` | `false` | 全部禁用 |
| title | `string` | — | 组标题 |
| tips | `string` | — | 底部提示；`#tips` 可自定义 |
| form | `boolean` | `false` | 表单组 |
| extClass | `string` | — | 扩展类名 |

**Events**：`update:modelValue`、`change`

**Slots**：`title`、`default`、`tips`

**示例**：
```html
<weui-checkbox-group v-model="selected" title="多选">
  <weui-checkbox value="1" label="选项 A" />
  <weui-checkbox value="2" label="选项 B" />
</weui-checkbox-group>
```

---

### `<weui-radio>` / `<weui-radio-group>` 单选框

**weui-radio Props**：

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | `string` | **必填** | 选项值 |
| label | `string` | — | 标签 |
| disabled | `boolean` | `false` | 禁用 |
| extClass | `string` | — | 扩展类名 |

**weui-radio-group Props**：

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string` | `''` | 当前选中值 |
| disabled | `boolean` | `false` | 全部禁用 |
| title | `string` | — | 组标题 |
| tips | `string` | — | 底部提示；`#tips` 可自定义 |
| form | `boolean` | `false` | 表单组 |
| extClass | `string` | — | 扩展类名 |

**Events**：`update:modelValue`、`change`

**Slots**：`title`、`default`、`tips`

**示例**：
```html
<weui-radio-group v-model="gender" title="性别">
  <weui-radio value="male" label="男" />
  <weui-radio value="female" label="女" />
</weui-radio-group>
```

---

### `<weui-searchbar>` 搜索栏

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string` | `''` | 搜索词 |
| placeholder | `string` | `'搜索'` | 占位文字 |
| cancelText | `string` | `'取消'` | 取消按钮文字 |
| focus | `boolean` | `false` | 自动聚焦 |
| searchButtonText | `string` | — | 搜索按钮文字 |
| mode | `'filled' \| 'filled-grey' \| 'outlined' \| 'homepage'` | `'filled'` | 视觉模式 |
| words | `string` | `''` | 搜索词前缀（filled/filled-grey） |
| showBackButton | `boolean` | `false` | 返回按钮 |
| homepageText | `string` | `''` | 首页文字（homepage） |
| showCamera | `boolean` | `true` | 拍照入口（homepage） |
| extClass | `string` | — | 扩展类名 |

**Events**：`focus`、`blur`、`confirm`、`cancel`、`clear`、`search`、`back`、`camera`

**示例**：
```html
<weui-searchbar v-model="keyword" @search="onSearch" @cancel="onCancel" />
<weui-searchbar v-model="kw" mode="homepage" homepage-text="搜索商品" show-camera />
```

---

### `<weui-uploader>` 上传

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| files | `UploaderFile[]` | `[]` | `[{ url, status?, statusText? }]` |
| title | `string` | — | 标题 |
| tips | `string` | — | 提示文字 |
| count | `number` | `9` | 最大数量 |
| showHeader | `boolean` | `true` | 显示头部 |
| accept | `'image' \| 'file'` | `'image'` | 文件类型 |
| extClass | `string` | — | 扩展类名 |

**Events**：`select`、`select-fail`、`preview`、`delete`、`exceed`

**平台差异**：H5 用 `input[type=file]`，非 H5 用 `uni.chooseImage/File`；非 H5 支持"长按删除"

**示例**：
```html
<weui-uploader
  :files="images"
  title="上传图片"
  tips="最多9张"
  @select="onSelect"
  @delete="onDelete"
  @preview="onPreview"
/>
```

---

### `<weui-switch>` 开关

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `boolean` | `false` | v-model |
| label | `string` | `''` | 标签 |
| disabled | `boolean` | `false` | 禁用 |
| cp | `boolean` | `false` | 品牌色样式 |
| extClass | `string` | — | 扩展类名 |

**Events**：`update:modelValue`、`change`

**示例**：
```html
<weui-switch v-model="enabled" label="开启通知" cp />
```

---

### `<weui-select>` 下拉选择

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | `string` | `''` | v-model |
| placeholder | `string` | — | 占位选项 |
| disabled | `boolean` | `false` | 禁用 |
| before | `boolean` | `false` | 前置选择器 |
| after | `boolean` | `false` | 后置选择器 |
| label | `string` | — | 标签 |
| extClass | `string` | — | 扩展类名 |

**Events**：`update:modelValue`、`change`

**Slots**：`default`（`<option>` 元素）

**示例**：
```html
<weui-select v-model="city" placeholder="请选择城市">
  <option value="bj">北京</option>
  <option value="sh">上海</option>
</weui-select>
```

---

## 表单容器

---

## 操作反馈

### `<weui-overlay-host>` 弹层宿主 ⚠️

**必须**在根组件模板中放置，所有命令式弹层（Dialog/Toast/Toptips/Actionsheet/Picker/HalfScreenDialog/Gallery）依赖此组件渲染。

```html
<!-- App.vue -->
<template>
  <view>
    <router-view />
    <weui-overlay-host />
  </view>
</template>
```

---

### `<weui-dialog>` 对话框

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| visible | `boolean` | `false` | v-model |
| title | `string` | — | 标题 |
| content | `string` | — | 内容文字 |
| buttons | `DialogButton[]` | `[]` | `[{ label, type? }]` |
| maskClosable | `boolean` | `true` | 点击遮罩关闭 |
| mask | `boolean` | `true` | 显示遮罩 |
| extClass | `string` | — | 扩展类名 |
| btnWrap | `boolean` | `false` | 按钮纵向排列 |

**Events**：`update:visible`、`buttontap`、`close`

**Slots**：`title`、`default`、`footer`

**命令式 API**：
- `Dialog.show(options)` → `Promise<{ button, index }>`（遮罩关闭时 button 为 undefined，index 为 -1）
- `Dialog.alert(options)` → `Promise<void>`
- `Dialog.confirm(options)` → `Promise<boolean>`

**示例**：
```html
<!-- 声明式 -->
<weui-dialog v-model:visible="show" title="提示" content="确认删除？"
  :buttons="[{ label: '取消', type: 'default' }, { label: '删除', type: 'warn' }]"
  @buttontap="onButton" />

<!-- 命令式 -->
<script setup>
import { Dialog } from 'weui-uniapp-design/uni-app'
const result = await Dialog.confirm({ title: '提示', content: '确认删除？' })
if (result) { /* 确认 */ }
</script>
```

---

### `<weui-actionsheet>` 行动面板

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| visible | `boolean` | `false` | v-model |
| title | `string` | — | 标题 |
| items | `ActionsheetItem[]` | `[]` | `[{ label, tips?, warn? }]` |
| cancelText | `string` | `'取消'` | 取消文字 |
| maskClosable | `boolean` | `true` | 遮罩关闭 |
| extClass | `string` | — | 扩展类名 |

**Events**：`select`、`cancel`、`close`

**命令式 API**：`Actionsheet.show(options)` → `Promise<{ item, index }>`（取消时 item 为 null，index 为 -1）

**示例**：
```html
<script setup>
import { Actionsheet } from 'weui-uniapp-design/uni-app'
const item = await Actionsheet.show({
  title: '请选择',
  items: [{ label: '拍照' }, { label: '从相册选择' }]
})
console.log(item.index)
</script>
```

---

### `<weui-half-screen-dialog>` 半屏弹窗

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| visible | `boolean` | `false` | v-model |
| title | `string` | — | 标题 |
| subtitle | `string` | — | 副标题 |
| content | `string` | — | 内容 |
| buttons | `HalfScreenDialogButton[]` | `[]` | `[{ label, type? }]` |
| maskClosable | `boolean` | `true` | 遮罩关闭 |
| mask | `boolean` | `true` | 显示遮罩 |
| extClass | `string` | — | 扩展类名 |

**Events**：`update:visible`、`buttontap`、`close`

**Slots**：`title`、`default`、`footer`

**命令式 API**：`HalfScreenDialog.show(options)` → `Promise<{ button, index }>`（遮罩关闭时 button 为 undefined，index 为 -1）

---

### `<weui-toast>` 轻提示

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| visible | `boolean` | `false` | 显示 |
| content | `string` | `''` | 文字 |
| type | `'success' \| 'loading' \| 'warning' \| 'text'` | `'success'` | 类型 |
| duration | `number` | — | 时长 ms（0 不自动关） |
| mask | `boolean` | `true` | 透明遮罩防穿透 |
| extClass | `string` | — | 扩展类名 |

**命令式 API**：`Toast.success(content)` / `Toast.loading(content)` / `Toast.warning(content)` / `Toast.text(content)` / `Toast.hide()`

**示例**：
```html
<script setup>
import { Toast } from 'weui-uniapp-design/uni-app'
Toast.success('保存成功')
Toast.loading('加载中...')
setTimeout(() => Toast.hide(), 3000)
</script>
```

---

### `<weui-toptips>` 顶部提示

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| visible | `boolean` | `false` | 显示 |
| content | `string` | `''` | 文字 |
| duration | `number` | `2000` | 时长 ms |
| extClass | `string` | — | 扩展类名 |

**Events**：`close`

**命令式 API**：`Toptips.show(options)` / `Toptips.warn(content, duration?)`（返回 void，duration 后自动关闭，默认 2000ms）

---

### `<weui-picker>` / `<weui-picker-group>` 选择器

**weui-picker Props**：

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| visible | `boolean` | `false` | 显示 |
| columns | `PickerColumn[]` | `[]` | `[{ options: [{label, value, disabled?}], index? }]` |
| title | `string` | `''` | 标题 |
| desc | `string` | — | 标题下的描述文字 |
| showClose | `boolean` | `false` | 是否显示左上角关闭按钮；模板中写 `show-close` 即启用 |
| closeText | `string` | `'关闭'` | 关闭按钮文字 |
| cancelText | `string` | — | 旧版取消文字兼容别名；`closeText` 优先 |
| confirmText | `string` | `'确定'` | 确定文字 |
| maskClosable | `boolean` | `true` | 遮罩关闭 |
| extClass | `string` | — | 扩展类名 |

**Events**：`change`、`confirm`、`cancel`、`close`

**命令式 API**：`Picker.show(options)` → `Promise<{ action: 'confirm' | 'cancel', indexes, values }>`（取消时 indexes/values 为空数组）。options 同样支持 `desc`、`showClose`、`closeText`、`cancelText` 和 `confirmText`。

> Picker 采用 WeUI 官方半屏弹窗结构：顶部关闭按钮、标题/描述区域、列选择区域和底部主确认按钮。Picker 不复用 `HalfScreenDialog` 组件模板。

> **跨端说明**：Vue 3/H5 与 uni-app 产物均内置 `weui-picker-group` 列区域；小程序端会将列项转换为原生 `view` 节点，支持单列、多列、禁用项和触摸滚动。

**示例**：
```html
<script setup>
import { Picker } from 'weui-uniapp-design/uni-app'
const result = await Picker.show({
  title: '选择地区',
  columns: [{
    options: [
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
    ]
  }]
})
console.log(result.values) // ['beijing']
</script>
```

---

### `<weui-gallery>` 图片预览

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| visible | `boolean` | `false` | 显示 |
| src | `string` | — | 图片地址 |
| showDelete | `boolean` | `false` | 删除按钮 |
| deleteText | `string` | `'删除'` | 删除图标按钮的无障碍标签 |
| maskClosable | `boolean` | `true` | 遮罩关闭 |
| extClass | `string` | — | 扩展类名 |

**Events**：`delete`、`hide`

**平台差异**：小程序端调用 `uni.previewImage` 系统预览，H5 端自定义 UI；H5 图片区域遵循官方 WeUI 的 `.weui-gallery__img` 定位背景图结构（`background-size: contain`），避免远程图片尚未加载时布局塌陷。

**命令式 API**：`Gallery.show(options)` → `{ close, promise }`（promise: `Promise<'delete' | 'hide'>`；点击删除 resolve 'delete'，需手动调用 close() 关闭）

---

### `<weui-slideview>` 滑动操作

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| buttons | `SlideButton[]` | `[]` | `[{ text, type?, width? }]` |
| show | `boolean` | `false` | v-model 展开状态 |
| disabled | `boolean` | `false` | 禁用滑动 |
| extClass | `string` | — | 扩展类名 |

**Events**：`buttonclick`、`close`

**Slots**：`default`

**示例**：
```html
<weui-slideview :buttons="[{ text: '删除', type: 'warn' }]" @buttonclick="onDelete">
  <weui-cell title="可左滑的消息" />
</weui-slideview>
```

---

## 导航

### `<weui-navbar>` / `<weui-navbar-item>` 导航栏

**weui-navbar**：`extClass` prop + `default` slot

**weui-navbar-item Props**：

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| active | `boolean` | `false` | 选中 |
| extClass | `string` | — | 扩展类名 |

**Events**：`click`

**示例**：
```html
<weui-navbar>
  <weui-navbar-item :active="tab === 0" @click="tab = 0">选项一</weui-navbar-item>
  <weui-navbar-item :active="tab === 1" @click="tab = 1">选项二</weui-navbar-item>
</weui-navbar>
```

---

### `<weui-tabbar>` / `<weui-tabbar-item>` 底部导航

**weui-tabbar**：

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| fixed | `boolean` | `false` | 固定底部 |
| extClass | `string` | — | 扩展类名 |

**weui-tabbar-item Props**：

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| icon | `string` | — | 图标 URL |
| activeIcon | `string` | — | 激活图标 URL |
| text | `string` | — | 文字 |
| active | `boolean` | `false` | 选中 |
| badge | `string \| number` | — | 徽标内容 |
| showDot | `boolean` | `false` | 红点模式 |
| extClass | `string` | — | 扩展类名 |

**Events**：`click`

**Slots**：`icon`、`default`

**示例**：
```html
<weui-tabbar fixed>
  <weui-tabbar-item icon="/img/home.png" active-icon="/img/home-on.png"
    text="首页" :active="tab === 0" @click="tab = 0" />
  <weui-tabbar-item icon="/img/mine.png" active-icon="/img/mine-on.png"
    text="我的" :active="tab === 1" @click="tab = 1" badge="3" />
</weui-tabbar>
```

---

### `<weui-steps>` 步骤条

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| steps | `StepItem[]` | **必填** | `[{ title, desc? }]` |
| current | `number` | `0` | 当前步骤索引 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 方向 |
| extClass | `string` | — | 扩展类名 |

**示例**：
```html
<weui-steps :steps="[
  { title: '步骤一', desc: '描述文字' },
  { title: '步骤二', desc: '描述文字' },
  { title: '步骤三' },
]" :current="1" />
```

---

## 展示

### `<weui-msg>` 结果页

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `string` | — | 图标类型（WeUI 内置） |
| iconSize | `number` | — | 图标尺寸 px |
| title | `string` | — | 标题 |
| desc | `string` | — | 描述 |
| descPrimary | `string` | — | 次级描述 |
| buttons | `MsgButton[]` | `[]` | `[{ text, type?, url? }]` |
| tips | `string` | — | 底部提示 |
| extClass | `string` | — | 扩展类名 |

**Events**：`buttontap`

**Slots**：`icon`、`default`、`tips`、`footer`

> **uni-app 产物限制**：默认图标不会通过内部自动引入的 `weui-icon` 渲染；需要图标时请通过 `icon` slot 显式传入 `<weui-icon>`。其他外层结构和 slots 保持可用。

**示例**：
```html
<weui-msg type="success" title="操作成功" desc="内容已保存"
  :buttons="[{ text: '返回首页', type: 'primary', url: '/' }]" />
```

---

## 命令式 API 速查

所有弹层组件除了声明式用法外，均提供命令式 API，需确保已挂载 `<weui-overlay-host />`：

| API | 调用方式 | 返回值 |
|-----|---------|--------|
| `Dialog.show(options)` | 通用弹窗 | `Promise<{ button, index }>` |
| `Dialog.alert(options)` | 提示弹窗 | `Promise<void>` |
| `Dialog.confirm(options)` | 确认弹窗 | `Promise<boolean>` |
| `Actionsheet.show(options)` | 行动面板 | `Promise<{ item, index }>` |
| `HalfScreenDialog.show(options)` | 半屏弹窗 | `Promise<{ button, index }>` |
| `Toast.success/loading/warning/text(msg, duration?)` | 提示（自动排队） | `Promise<void>` |
| `Toast.hide()` | 立即关闭当前 Toast | — |
| `Toptips.show(options)` / `Toptips.warn(content, duration?)` | 顶部提示 | `void` |
| `Picker.show(options)` | 选择器 | `Promise<{ action, indexes, values }>` |
| `Gallery.show(options)` | 图片预览 | `{ close, promise }` |
