# Form 表单容器

用于组织表单内容区域，统一承载标题、描述、控件、提示与操作按钮，是表单内容区的根容器。常配合 `cell-group`、`input`、`checkbox` 等组件使用。

<script setup lang="ts">
import { ref } from 'vue'

const checkboxValues = ref(['1'])
const switchValue = ref(false)
const switchValue2 = ref(true)
const switchValue3 = ref(true)
const textareaValue = ref('')
const selectValue = ref('1')
const selectAfterValue = ref('1')
const radioValue = ref('1')
</script>

## 基础表单结构

通过 `title` 设定表单标题，`desc` 设定描述文字，`footer` 插槽放置提示文字、操作按钮与底部链接等区域。表单页由头部区域、控件区域、提示区域、操作区域和底部信息区域组成。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-form title="表单结构" desc="展示表单页面的信息结构样式，分别由头部区域/控件区域/提示区域/操作区域和底部信息区域组成。">
      <div class="weui-cells__group weui-cells__group_form">
        <div class="weui-cells__title">表单组标题</div>
        <div class="weui-cells">
          <label class="weui-cell weui-cell_active">
            <div class="weui-cell__hd"><span class="weui-label">微信号</span></div>
            <div class="weui-cell__bd"><input class="weui-input" placeholder="填写本人微信号"/></div>
          </label>
          <label class="weui-cell weui-cell_active">
            <div class="weui-cell__hd"><span class="weui-label">昵称</span></div>
            <div class="weui-cell__bd"><input class="weui-input" placeholder="填写本人微信号的昵称"/></div>
          </label>
          <label class="weui-cell weui-cell_active">
            <div class="weui-cell__hd"><span class="weui-label">联系电话</span><div class="weui-cell__desc">副标题</div></div>
            <div class="weui-cell__bd"><input class="weui-input" placeholder="填写绑定的电话号码" type="number" pattern="[0-9]*"/></div>
          </label>
          <label class="weui-cell weui-cell_active weui-cell_primary">
            <div class="weui-cell__hd"><span class="weui-label" lang="en">verification address</span></div>
            <div class="weui-cell__bd"><textarea class="weui-textarea" placeholder="input your address" rows="3"></textarea></div>
          </label>
        </div>
      </div>
      <template #footer>
        <div class="weui-form__tips-area"><p class="weui-form__tips">表单页提示，居中对齐</p></div>
        <div class="weui-form__opr-area"><a role="button" disabled aria-disabled="true" class="weui-btn weui-btn_primary weui-btn_disabled" href="javascript:">确定</a></div>
        <div class="weui-form__tips-area"><p class="weui-form__tips">表单页提示，居中对齐</p></div>
        <div class="weui-form__extra-area">
          <div class="weui-footer">
            <p class="weui-footer__links"><a class="weui-footer__link">底部链接文本</a></p>
            <p class="weui-footer__text">Copyright &copy; 2008-2025 weui.io</p>
          </div>
        </div>
      </template>
    </weui-form>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-form title="表单结构" desc="展示表单页面的信息结构样式，分别由头部区域/控件区域/提示区域/操作区域和底部信息区域组成。">
    <div class="weui-cells__group weui-cells__group_form">
      <div class="weui-cells__title">表单组标题</div>
      <div class="weui-cells">
        <label class="weui-cell weui-cell_active">
          <div class="weui-cell__hd"><span class="weui-label">微信号</span></div>
          <div class="weui-cell__bd"><input class="weui-input" placeholder="填写本人微信号" /></div>
        </label>
        <label class="weui-cell weui-cell_active">
          <div class="weui-cell__hd"><span class="weui-label">昵称</span></div>
          <div class="weui-cell__bd"><input class="weui-input" placeholder="填写本人微信号的昵称" /></div>
        </label>
        <label class="weui-cell weui-cell_active">
          <div class="weui-cell__hd"><span class="weui-label">联系电话</span><div class="weui-cell__desc">副标题</div></div>
          <div class="weui-cell__bd"><input class="weui-input" placeholder="填写绑定的电话号码" type="number" pattern="[0-9]*" /></div>
        </label>
        <label class="weui-cell weui-cell_active weui-cell_primary">
          <div class="weui-cell__hd"><span class="weui-label" lang="en">verification address</span></div>
          <div class="weui-cell__bd"><textarea class="weui-textarea" placeholder="input your address" rows="3"></textarea></div>
        </label>
      </div>
    </div>
    <template #footer>
      <div class="weui-form__tips-area">
        <p class="weui-form__tips">表单页提示，居中对齐</p>
      </div>
      <div class="weui-form__opr-area">
        <a role="button" disabled aria-disabled="true" class="weui-btn weui-btn_primary weui-btn_disabled" href="javascript:">确定</a>
      </div>
      <div class="weui-form__tips-area">
        <p class="weui-form__tips">表单页提示，居中对齐</p>
      </div>
      <div class="weui-form__extra-area">
        <div class="weui-footer">
          <p class="weui-footer__links"><a class="weui-footer__link">底部链接文本</a></p>
          <p class="weui-footer__text">Copyright &copy; 2008-2025 weui.io</p>
        </div>
      </div>
    </template>
  </weui-form>
</template>
```
:::

## 输入框状态

通过 `weui-cell_readonly` / `weui-cell_disabled` 类名设置输入框的只读与禁用状态。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-form title="输入框状态">
      <div class="weui-cells__group weui-cells__group_form">
        <div class="weui-cells">
          <label class="weui-cell weui-cell_active weui-cell_readonly">
            <div class="weui-cell__hd"><span class="weui-label">EMail</span></div>
            <div class="weui-cell__bd"><input class="weui-input" placeholder="请输入EMail" value="1234567" readonly/></div>
          </label>
          <label class="weui-cell weui-cell_active weui-cell_disabled">
            <div class="weui-cell__hd"><span class="weui-label">微信号</span></div>
            <div class="weui-cell__bd"><input class="weui-input" placeholder="请输入微信号" value="WeUI" disabled/></div>
          </label>
        </div>
      </div>
      <template #footer>
        <div class="weui-form__opr-area"><a role="button" class="weui-btn weui-btn_primary" href="javascript:">确定</a></div>
      </template>
    </weui-form>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-form title="输入框状态">
    <div class="weui-cells__group weui-cells__group_form">
      <div class="weui-cells">
        <label class="weui-cell weui-cell_active weui-cell_readonly">
          <div class="weui-cell__hd"><span class="weui-label">EMail</span></div>
          <div class="weui-cell__bd"><input class="weui-input" placeholder="请输入EMail" value="1234567" readonly /></div>
        </label>
        <label class="weui-cell weui-cell_active weui-cell_disabled">
          <div class="weui-cell__hd"><span class="weui-label">微信号</span></div>
          <div class="weui-cell__bd"><input class="weui-input" placeholder="请输入微信号" value="WeUI" disabled /></div>
        </label>
      </div>
    </div>
    <template #footer>
      <div class="weui-form__opr-area">
        <a role="button" class="weui-btn weui-btn_primary" href="javascript:">确定</a>
      </div>
    </template>
  </weui-form>
</template>
```
:::

## 验证码表单

结合 `weui-cell_vcode` 与 `weui-vcode-btn` 实现验证码输入，配合 `Agree` 组件展示协议勾选。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-form title="验证码" desc="验证手机号样式">
      <div class="weui-cells__group weui-cells__group_form">
        <div class="weui-cells">
          <label class="weui-cell weui-cell_active">
            <div class="weui-cell__hd"><span class="weui-label">手机号</span></div>
            <div class="weui-cell__bd"><input class="weui-input" type="number" placeholder="请输入手机号" value="12345678907"/></div>
          </label>
          <div class="weui-cell weui-cell_active weui-cell_vcode">
            <div class="weui-cell__hd"><span class="weui-label">验证码</span></div>
            <div class="weui-cell__bd weui-flex">
              <input class="weui-input" type="number" placeholder="输入验证码" maxlength="6"/>
              <button class="weui-vcode-btn">获取验证码</button>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="weui-form__tips-area">
          <weui-agree>阅读并同意<a href="javascript:">《相关条款》</a></weui-agree>
        </div>
        <div class="weui-form__opr-area"><a role="button" class="weui-btn weui-btn_primary" href="javascript:">确定</a></div>
      </template>
    </weui-form>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-form title="验证码" desc="验证手机号样式">
    <div class="weui-cells__group weui-cells__group_form">
      <div class="weui-cells">
        <label class="weui-cell weui-cell_active">
          <div class="weui-cell__hd"><span class="weui-label">手机号</span></div>
          <div class="weui-cell__bd"><input class="weui-input" type="number" placeholder="请输入手机号" value="12345678907" /></div>
        </label>
        <div class="weui-cell weui-cell_active weui-cell_vcode">
          <div class="weui-cell__hd"><span class="weui-label">验证码</span></div>
          <div class="weui-cell__bd weui-flex">
            <input class="weui-input" type="number" placeholder="输入验证码" maxlength="6" />
            <button class="weui-vcode-btn">获取验证码</button>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="weui-form__tips-area">
        <weui-agree>阅读并同意<a href="javascript:">《相关条款》</a></weui-agree>
      </div>
      <div class="weui-form__opr-area">
        <a role="button" class="weui-btn weui-btn_primary" href="javascript:">确定</a>
      </div>
    </template>
  </weui-form>
</template>
```
:::

## 复选框表单

通过 `CheckboxGroup` 与 `Checkbox` 组件展示多项选择，`footer` 插槽放置操作按钮与协议文本。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-form title="复选框样式展示">
      <div class="weui-cells__group weui-cells__group_form">
        <div class="weui-cells">
          <weui-checkbox-group v-model="checkboxValues">
            <weui-checkbox value="1" label="standard is dealt for u." checked />
            <weui-checkbox value="2" label="standard is dealicient for u." />
          </weui-checkbox-group>
        </div>
      </div>
      <template #footer>
        <div class="weui-form__opr-area"><a role="button" class="weui-btn weui-btn_primary" href="javascript:">下一步</a></div>
        <div class="weui-form__tips-area">
          <p class="weui-form__tips">点击下一步即表示<a class="weui-link" href="javascript:">同意用户协议</a></p>
        </div>
      </template>
    </weui-form>
  </div>
</div>

::: details 查看代码
```vue
<script setup>
import { ref } from 'vue'

const checkboxValues = ref(['1'])
</script>

<template>
  <weui-form title="复选框样式展示">
    <div class="weui-cells__group weui-cells__group_form">
      <div class="weui-cells">
        <weui-checkbox-group v-model="checkboxValues">
          <weui-checkbox value="1" label="standard is dealt for u." checked />
          <weui-checkbox value="2" label="standard is dealicient for u." />
        </weui-checkbox-group>
      </div>
    </div>
    <template #footer>
      <div class="weui-form__opr-area">
        <a role="button" class="weui-btn weui-btn_primary" href="javascript:">下一步</a>
      </div>
      <div class="weui-form__tips-area">
        <p class="weui-form__tips">
          点击下一步即表示<a class="weui-link" href="javascript:">同意用户协议</a>
        </p>
      </div>
    </template>
  </weui-form>
</template>
```
:::

## 单选列表

通过 `RadioGroup` 与 `Radio` 组件展示单选列表，`v-model` 绑定当前选中值。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-form title="单选样式展示">
      <div class="weui-cells__group weui-cells__group_form">
        <div class="weui-cells">
          <weui-radio-group v-model="radioValue">
            <weui-radio value="1" label="选项一" />
            <weui-radio value="2" label="选项二" />
            <weui-radio value="3" label="选项三" />
          </weui-radio-group>
        </div>
      </div>
      <template #footer>
        <div class="weui-form__opr-area"><a role="button" class="weui-btn weui-btn_primary" href="javascript:">确定</a></div>
      </template>
    </weui-form>
  </div>
  <p style="margin-top: 8px; color: #576b95;">选中值：{{ radioValue }}</p>
</div>

::: details 查看代码
```vue
<template>
  <weui-form title="单选样式展示">
    <div class="weui-cells__group weui-cells__group_form">
      <div class="weui-cells">
        <weui-radio-group v-model="radioValue">
          <weui-radio value="1" label="选项一" />
          <weui-radio value="2" label="选项二" />
          <weui-radio value="3" label="选项三" />
        </weui-radio-group>
      </div>
    </div>
    <template #footer>
      <div class="weui-form__opr-area">
        <a role="button" class="weui-btn weui-btn_primary" href="javascript:">确定</a>
      </div>
    </template>
  </weui-form>
</template>
```
:::

## 底部悬浮表单

通过 `ext-class="weui-bottom-fixed-opr-page"` 使操作按钮区域悬浮于底部，适用于按钮需要持续可见的场景。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-form title="底部悬浮表单" desc="底部悬浮表单样式" ext-class="weui-bottom-fixed-opr-page">
      <div class="weui-cells__group weui-cells__group_form">
        <div class="weui-cells">
          <label class="weui-cell weui-cell_active">
            <div class="weui-cell__hd"><span class="weui-label">手机号</span></div>
            <div class="weui-cell__bd"><input class="weui-input" type="number" placeholder="请输入手机号"/></div>
          </label>
        </div>
      </div>
      <template #footer>
        <div class="weui-form__tips-area">
          <weui-agree>阅读并同意<a href="javascript:">《相关条款》</a></weui-agree>
        </div>
        <div class="weui-form__opr-area">
          <a role="button" class="weui-btn weui-btn_primary" href="javascript:">确定</a>
        </div>
      </template>
    </weui-form>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-form title="底部悬浮表单" desc="底部悬浮表单样式" ext-class="weui-bottom-fixed-opr-page">
    <div class="weui-cells__group weui-cells__group_form">
      <div class="weui-cells">
        <label class="weui-cell weui-cell_active">
          <div class="weui-cell__hd"><span class="weui-label">手机号</span></div>
          <div class="weui-cell__bd"><input class="weui-input" type="number" placeholder="请输入手机号" /></div>
        </label>
      </div>
    </div>
    <template #footer>
      <div class="weui-form__tips-area">
        <weui-agree>阅读并同意<a href="javascript:">《相关条款》</a></weui-agree>
      </div>
      <div class="weui-form__opr-area">
        <a role="button" class="weui-btn weui-btn_primary" href="javascript:">确定</a>
      </div>
    </template>
  </weui-form>
</template>
```
:::

## 跳转列表项

使用 `weui-cell_access` 类实现可点击跳转的列表项。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-form title="跳转列表项">
      <div class="weui-cells__group weui-cells__group_form">
        <div class="weui-cells">
          <a class="weui-cell weui-cell_access" href="javascript:">
            <div class="weui-cell__bd"><p>cell standard</p></div>
            <div class="weui-cell__ft"></div>
          </a>
          <a class="weui-cell weui-cell_access" href="javascript:">
            <div class="weui-cell__bd"><p>cell standard</p></div>
            <div class="weui-cell__ft"></div>
          </a>
        </div>
      </div>
    </weui-form>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-form title="跳转列表项">
    <div class="weui-cells__group weui-cells__group_form">
      <div class="weui-cells">
        <a class="weui-cell weui-cell_access" href="javascript:">
          <div class="weui-cell__bd"><p>cell standard</p></div>
          <div class="weui-cell__ft"></div>
        </a>
        <a class="weui-cell weui-cell_access" href="javascript:">
          <div class="weui-cell__bd"><p>cell standard</p></div>
          <div class="weui-cell__ft"></div>
        </a>
      </div>
    </div>
  </weui-form>
</template>
```
:::

## 开关

通过 `Switch` 组件实现开关列表项，支持 `v-model` 双向绑定、禁用状态和兼容模式。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-form title="开关样式展示">
      <div class="weui-cells__group weui-cells__group_form">
        <div class="weui-cells">
          <weui-switch v-model="switchValue" label="标题文字" />
          <weui-switch v-model="switchValue2" label="标题文字" disabled />
          <weui-switch v-model="switchValue3" label="兼容IE Edge的版本" cp />
        </div>
      </div>
      <template #footer>
        <div class="weui-form__opr-area"><a role="button" class="weui-btn weui-btn_primary" href="javascript:">确定</a></div>
      </template>
    </weui-form>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-form title="开关样式展示">
    <div class="weui-cells__group weui-cells__group_form">
      <div class="weui-cells">
        <weui-switch v-model="switchValue" label="标题文字" />
        <weui-switch v-model="switchValue2" label="标题文字" disabled />
        <weui-switch v-model="switchValue3" label="兼容IE Edge的版本" cp />
      </div>
    </div>
    <template #footer>
      <div class="weui-form__opr-area">
        <a role="button" class="weui-btn weui-btn_primary" href="javascript:">确定</a>
      </div>
    </template>
  </weui-form>
</template>
```
:::

## 文本域

通过 `Textarea` 组件渲染可多行输入的文本域，支持 `v-model` 双向绑定、字数统计、标签和警告状态。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-form title="文本域" desc="输入更多内容的输入区域样式展示">
      <div class="weui-cells__group weui-cells__group_form">
        <div class="weui-cells__title">问题描述</div>
        <div class="weui-cells weui-cells_form">
          <weui-textarea v-model="textareaValue" placeholder="请描述你所发生的问题" />
        </div>
      </div>
      <template #footer>
        <div class="weui-form__opr-area"><a role="button" class="weui-btn weui-btn_primary" href="javascript:">确定</a></div>
      </template>
    </weui-form>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-form title="文本域" desc="输入更多内容的输入区域样式展示">
    <div class="weui-cells__group weui-cells__group_form">
      <div class="weui-cells__title">问题描述</div>
      <div class="weui-cells weui-cells_form">
        <weui-textarea v-model="textareaValue" placeholder="请描述你所发生的问题" />
      </div>
    </div>
    <template #footer>
      <div class="weui-form__opr-area">
        <a role="button" class="weui-btn weui-btn_primary" href="javascript:">确定</a>
      </div>
    </template>
  </weui-form>
</template>
```
:::

## 选择框

通过 `Select` 组件实现原生选择框，支持 `v-model` 双向绑定和标签布局。前置选择（select-before）需使用原生 HTML 实现。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-form title="原生选择框">
      <div class="weui-cells__group weui-cells__group_form">
        <div class="weui-cells">
          <weui-select v-model="selectValue">
            <option value="1">微信号</option>
            <option value="2">QQ号</option>
            <option value="3">Email</option>
          </weui-select>
          <div class="weui-cell weui-cell_active weui-cell_select weui-cell_select-before">
            <div class="weui-cell__hd">
              <select class="weui-select" name="select2">
                <option value="1">+86</option>
                <option value="2">+80</option>
                <option value="3">+84</option>
              </select>
            </div>
            <label class="weui-cell__bd">
              <input class="weui-input" type="number" placeholder="请输入号码" value="12345678907"/>
            </label>
          </div>
          <weui-select v-model="selectAfterValue" label="国家">
            <option value="1">中国</option>
            <option value="2">美国</option>
            <option value="3">英国</option>
          </weui-select>
        </div>
      </div>
      <template #footer>
        <div class="weui-form__opr-area"><a role="button" class="weui-btn weui-btn_primary" href="javascript:">确定</a></div>
      </template>
    </weui-form>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-form title="原生选择框">
    <div class="weui-cells__group weui-cells__group_form">
      <div class="weui-cells">
        <weui-select v-model="selectValue">
          <option value="1">微信号</option>
          <option value="2">QQ号</option>
          <option value="3">Email</option>
        </weui-select>
        <div class="weui-cell weui-cell_active weui-cell_select weui-cell_select-before">
          <div class="weui-cell__hd">
            <select class="weui-select" name="select2">
              <option value="1">+86</option>
              <option value="2">+80</option>
              <option value="3">+84</option>
            </select>
          </div>
          <label class="weui-cell__bd">
            <input class="weui-input" type="number" placeholder="请输入号码" value="12345678907" />
          </label>
        </div>
        <weui-select v-model="selectAfterValue" label="国家">
          <option value="1">中国</option>
          <option value="2">美国</option>
          <option value="3">英国</option>
        </weui-select>
      </div>
    </div>
    <template #footer>
      <div class="weui-form__opr-area">
        <a role="button" class="weui-btn weui-btn_primary" href="javascript:">确定</a>
      </div>
    </template>
  </weui-form>
</template>
```
:::

## 反色表单

通过 `weui-cells__group_form-primary` 类实现反色样式的表单组，适用于深色背景上的表单展示。

<div class="demo-block vp-raw">
  <div class="demo-mobile">
    <weui-form title="表单结构" desc="展示表单页面的信息结构样式">
      <div class="weui-cells__group weui-cells__group_form weui-cells__group_form-primary">
        <div class="weui-cells__title">表单组标题</div>
        <div class="weui-cells">
          <label class="weui-cell weui-cell_active">
            <div class="weui-cell__hd"><span class="weui-label">微信号</span></div>
            <div class="weui-cell__bd"><input class="weui-input" placeholder="填写本人微信号"/></div>
          </label>
          <label class="weui-cell weui-cell_active">
            <div class="weui-cell__hd"><span class="weui-label">昵称</span></div>
            <div class="weui-cell__bd"><input class="weui-input" placeholder="填写本人微信号的昵称"/></div>
          </label>
        </div>
      </div>
      <template #footer>
        <div class="weui-form__tips-area"><p class="weui-form__tips">表单页提示，居中对齐</p></div>
        <div class="weui-form__opr-area"><a role="button" disabled aria-disabled="true" class="weui-btn weui-btn_primary weui-btn_disabled" href="javascript:">确定</a></div>
        <div class="weui-form__tips-area"><p class="weui-form__tips">表单页提示，居中对齐</p></div>
        <div class="weui-form__extra-area">
          <div class="weui-footer">
            <p class="weui-footer__links"><a class="weui-footer__link">底部链接文本</a></p>
            <p class="weui-footer__text">Copyright &copy; 2008-2025 weui.io</p>
          </div>
        </div>
      </template>
    </weui-form>
  </div>
</div>

::: details 查看代码
```vue
<template>
  <weui-form title="表单结构" desc="展示表单页面的信息结构样式">
    <div class="weui-cells__group weui-cells__group_form weui-cells__group_form-primary">
      <div class="weui-cells__title">表单组标题</div>
      <div class="weui-cells">
        <label class="weui-cell weui-cell_active">
          <div class="weui-cell__hd"><span class="weui-label">微信号</span></div>
          <div class="weui-cell__bd"><input class="weui-input" placeholder="填写本人微信号" /></div>
        </label>
        <label class="weui-cell weui-cell_active">
          <div class="weui-cell__hd"><span class="weui-label">昵称</span></div>
          <div class="weui-cell__bd"><input class="weui-input" placeholder="填写本人微信号的昵称" /></div>
        </label>
      </div>
    </div>
    <template #footer>
      <div class="weui-form__tips-area"><p class="weui-form__tips">表单页提示，居中对齐</p></div>
      <div class="weui-form__opr-area"><a role="button" disabled aria-disabled="true" class="weui-btn weui-btn_primary weui-btn_disabled" href="javascript:">确定</a></div>
      <div class="weui-form__tips-area"><p class="weui-form__tips">表单页提示，居中对齐</p></div>
      <div class="weui-form__extra-area">
        <div class="weui-footer">
          <p class="weui-footer__links"><a class="weui-footer__link">底部链接文本</a></p>
          <p class="weui-footer__text">Copyright &copy; 2008-2025 weui.io</p>
        </div>
      </div>
    </template>
  </weui-form>
</template>
```
:::

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 表单标题 | `string` | — |
| desc | 表单描述 | `string` | — |
| ext-class | 附加在根元素上的扩展类名 | `string` | — |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 控件区域内容 |
| title | 自定义标题区域，替代 `title`/`desc` |
| footer | 底部区域，通常包含提示文字、操作按钮、底部链接等 |
