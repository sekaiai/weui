<template>
  <div class="page">
    <div class="page__hd">
      <span class="page__title">表单</span>
      <span class="page__desc">Form · CellGroup · Input · Textarea · Select · Radio · Checkbox · Switch · Agree · Searchbar · Uploader</span>
    </div>

    <div class="page__bd">
      <!-- 基础表单 -->
      <div class="demo-section">
        <div class="demo-section__title">基础表单</div>
        <weui-form title="表单标题" desc="请填写以下信息">
          <weui-cell-group form>
            <weui-cells form>
              <weui-cell label="姓名" active><weui-input v-model="form.name" placeholder="请输入姓名" /></weui-cell>
              <weui-cell label="手机号" active><weui-input v-model="form.phone" type="number" placeholder="请输入手机号" /></weui-cell>
              <weui-cell label="密码" active><weui-input v-model="form.password" type="password" placeholder="请输入密码" /></weui-cell>
              <weui-cell label="可清除" active><weui-input v-model="form.clear" clearable placeholder="输入后点右侧清除" /></weui-cell>
              <weui-cell label="禁用" active><weui-input v-model="form.disabled" disabled placeholder="不可编辑" /></weui-cell>
            </weui-cells>
          </weui-cell-group>

          <weui-cell-group form>
            <weui-cells title="多行文本" form>
              <weui-cell active>
                <weui-textarea v-model="form.bio" :maxlength="50" placeholder="请输入个人简介" />
              </weui-cell>
            </weui-cells>
          </weui-cell-group>

          <weui-cell-group form>
            <weui-cells title="选择" form>
              <weui-select v-model="form.city" placeholder="请选择城市">
                <option value="bj">北京</option>
                <option value="sh">上海</option>
                <option value="gz">广州</option>
                <option value="sz">深圳</option>
              </weui-select>
            </weui-cells>
          </weui-cell-group>

          <weui-radio-group v-model="form.gender" title="性别">
            <weui-radio value="male" label="男" />
            <weui-radio value="female" label="女" />
          </weui-radio-group>

          <weui-checkbox-group v-model="form.hobby" title="爱好">
            <weui-checkbox value="sport" label="运动" />
            <weui-checkbox value="music" label="音乐" />
            <weui-checkbox value="read" label="阅读" />
          </weui-checkbox-group>

          <weui-cell-group form>
            <weui-cells form>
              <weui-switch v-model="form.notice" label="接收通知" />
              <weui-agree v-model="form.agree">我已阅读并同意《用户协议》</weui-agree>
            </weui-cells>
          </weui-cell-group>

          <template #opr>
            <div class="weui-btn-area">
              <weui-button type="primary" display="block" @click="submit">提交</weui-button>
            </div>
          </template>
        </weui-form>
      </div>

      <!-- CellGroup 分组容器 -->
      <div class="demo-section">
        <div class="demo-section__title">CellGroup 分组容器</div>
        <p class="demo-note">weui-cell-group 是表单/列表的外层分组容器，内部再嵌套 weui-cells。form 模式会套用 weui-cells__group_form 样式，常用于把多个 cells 归入同一视觉分组。</p>
        <weui-cell-group form>
          <weui-cells title="基础信息" form>
            <weui-cell label="姓名" active><weui-input v-model="group.name" placeholder="请输入姓名" /></weui-cell>
            <weui-cell label="手机号" active><weui-input v-model="group.phone" type="number" placeholder="请输入手机号" /></weui-cell>
          </weui-cells>
          <weui-cells title="备注" form>
            <weui-cell active>
              <weui-textarea v-model="group.bio" :maxlength="50" placeholder="请输入备注" />
            </weui-cell>
          </weui-cells>
          <weui-cells form>
            <weui-switch v-model="group.push" label="开启推送" />
          </weui-cells>
        </weui-cell-group>
      </div>

      <!-- Searchbar -->
      <div class="demo-section">
        <div class="demo-section__title">Searchbar 搜索栏</div>
        <weui-searchbar v-model="keyword" placeholder="搜索" @search="onSearch" />
        <div style="height: 12px" />
        <weui-searchbar v-model="keyword2" mode="outlined" search-button-text="搜索" placeholder="带搜索按钮" @search="onSearch" />
        <div class="result-text" v-if="lastSearch">最近搜索：{{ lastSearch }}</div>
      </div>

      <!-- Uploader -->
      <div class="demo-section">
        <div class="demo-section__title">Uploader 上传</div>
        <weui-cells title="图片上传" form>
          <weui-uploader v-model="files" title="图片" :max-count="4" @select="log('select')" @delete="log('delete')" />
        </weui-cells>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface UploaderFile {
  url: string
  id?: string | number
  status?: 'uploading' | 'done' | 'fail'
  [key: string]: unknown
}

const form = ref({
  name: '',
  phone: '',
  password: '',
  clear: '',
  disabled: '不可编辑的内容',
  bio: '',
  city: '',
  gender: 'male',
  hobby: ['sport'] as string[],
  notice: true,
  agree: false,
})

const keyword = ref('')
const keyword2 = ref('')
const lastSearch = ref('')

const group = ref({
  name: '',
  phone: '',
  bio: '',
  push: true,
})
const files = ref<UploaderFile[]>([])

const onSearch = (value: string) => {
  lastSearch.value = value
  console.log('[Searchbar] search', value)
}
const submit = () => console.log('[Form] submit', form.value)
const log = (msg: string) => console.log('[Uploader]', msg)
</script>

<style scoped>
.result-text {
  margin-top: 8px;
  font-size: 14px;
  color: #576b95;
}
.demo-note {
  margin: 0 0 12px;
  font-size: 13px;
  line-height: 1.6;
  color: #888;
}
</style>
