<template>
  <div :class="rootClass" v-bind="$attrs">
    <div v-if="showHeader" class="weui-uploader__hd">
      <div v-if="title" class="weui-uploader__title">{{ title }}</div>
      <div class="weui-uploader__info">{{ infoText }}</div>
    </div>

    <div class="weui-uploader__bd">
      <div class="weui-uploader__files">
        <div
          v-for="(file, index) in files"
          :key="`${file.url}-${index}`"
          :class="fileClass(file)"
          @click="handlePreview(file, index)"
          @longpress="handleDelete(file, index)"
        >
          <div class="weui-uploader__file__thumb" :style="fileStyle(file)" />
          <div
            v-if="hasStatusOverlay(file)"
            class="weui-uploader__file-content"
          >{{ resolveStatusText(file) }}</div>
          <div
            v-if="__IS_H5__"
            class="weui-uploader__file__delete"
            @click.stop="handleDelete(file, index)"
          ><i class="weui-icon-close" /></div>
        </div>
      </div>

      <div v-if="canUpload" class="weui-uploader__input-box" @click="handleChoose">
        <!-- H5：input[type=file]，由 fileInput ref 触发 -->
        <input
          v-if="__IS_H5__"
          ref="fileInput"
          type="file"
          class="weui-uploader__input"
          :accept="h5Accept"
          :multiple="count > 1"
          @click.stop
          @change="handleFileChange"
        />
        <!-- 非 H5：空 div，点击触发 uni API -->
        <div v-else class="weui-uploader__input" />
      </div>
    </div>

    <div v-if="tips" class="weui-uploader__tips">{{ tips }}</div>
    <div v-else-if="!__IS_H5__ && files.length > 0" class="weui-uploader__tips">长按图片可删除</div>

    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'WeuiUploader',
  inheritAttrs: false,
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'

export interface UploaderFile {
  /** 文件 URL（图片地址） */
  url: string
  /** 状态 */
  status?: 'loading' | 'error' | 'success'
  /** 状态文字 */
  statusText?: string
}

export interface WeuiUploaderProps {
  /** 文件列表 */
  files?: UploaderFile[]
  /** 标题 */
  title?: string
  /** 提示文字 */
  tips?: string
  /** 最大上传数 */
  count?: number
  /** 是否显示头部 */
  showHeader?: boolean
  /** 附加在根元素上的扩展类名 */
  extClass?: string
  /** 接受的文件类型：image 调用 uni.chooseImage，file 调用 uni.chooseFile */
  accept?: 'image' | 'file'
}

export interface WeuiUploaderSelectEvent {
  /** 选中文件的临时路径数组 */
  tempFilePaths: string[]
  /** 选中文件的详细信息数组 */
  tempFiles?: Array<{ path: string; size: number }>
}

export interface WeuiUploaderEmits {
  (e: 'select', event: WeuiUploaderSelectEvent): void
  (e: 'select-fail', err: { errMsg: string }): void
  (e: 'preview', file: UploaderFile, index: number): void
  (e: 'delete', file: UploaderFile, index: number): void
  (e: 'exceed', count: number): void
}

const props = withDefaults(defineProps<WeuiUploaderProps>(), {
  files: () => [],
  count: 9,
  showHeader: true,
  accept: 'image',
})

const emit = defineEmits<WeuiUploaderEmits>()

const fileInput = ref<HTMLInputElement | null>(null)

const rootClass = computed(() => {
  const classes: string[] = ['weui-uploader']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const infoText = computed(() => `${props.files.length}/${props.count}`)

// H5 端 input[accept] 映射：image → image/*，file → 不限制（undefined）
const h5Accept = computed(() => (props.accept === 'image' ? 'image/*' : undefined))

const canUpload = computed(() => props.files.length < props.count)

const fileClass = (file: UploaderFile) => {
  const classes: string[] = ['weui-uploader__file']
  if (file.status && file.status !== 'success') {
    classes.push('weui-uploader__file_status')
  }
  return classes
}

const fileStyle = (file: UploaderFile) => ({
  backgroundImage: `url("${file.url}")`,
})

const hasStatusOverlay = (file: UploaderFile) => {
  return file.status === 'loading' || file.status === 'error'
}

const resolveStatusText = (file: UploaderFile) => {
  if (file.statusText) return file.statusText
  if (file.status === 'loading') return '上传中'
  if (file.status === 'error') return '上传失败'
  return ''
}

const handleChoose = () => {
  const remaining = props.count - props.files.length
  if (remaining <= 0) {
    emit('exceed', props.count)
    return
  }
  if (__IS_H5__) {
    // H5：触发 input[type=file] 点击（@click.stop 阻止冒泡递归）
    fileInput.value?.click()
  } else {
    // 小程序/App：用 uni API
    // 项目未接入 @dcloudio/types，全局 UniNamespace 缺失，改用具名局部类型
    interface PickerRes {
      tempFilePaths: string | string[]
      tempFiles?: Array<{ tempFilePath?: string; path?: string; size?: number }>
    }
    const success = (res: PickerRes) => {
      const tempFilePaths = Array.isArray(res.tempFilePaths) ? res.tempFilePaths : [res.tempFilePaths]
      if (props.files.length + tempFilePaths.length > props.count) {
        emit('exceed', props.count)
        return
      }
      const rawFiles = Array.isArray(res.tempFiles) ? res.tempFiles : res.tempFiles ? [res.tempFiles] : []
      const tempFiles = rawFiles.map((file) => {
        const item = file as unknown as { path?: string; size?: number }
        return { path: item.path || '', size: Number(item.size) || 0 }
      })
      emit('select', { tempFilePaths, tempFiles })
    }
    const fail = (err: { errMsg: string }) => {
      emit('select-fail', err)
    }
    if (props.accept === 'image') {
      uni.chooseImage({ count: remaining, success, fail })
    } else {
      uni.chooseFile({ count: remaining, success, fail })
    }
  }
}

const handleFileChange = (event: Event) => {
  if (__IS_H5__) {
    const target = event.target as HTMLInputElement
    const files = target.files || []
    if (files.length === 0) return

    const remaining = props.count - props.files.length
    if (files.length > remaining) {
      emit('exceed', props.count)
      target.value = ''
      return
    }

    const tempFilePaths: string[] = []
    const tempFiles: Array<{ path: string; size: number }> = []
    for (let i = 0; i < files.length; i++) {
      tempFilePaths.push(URL.createObjectURL(files[i]))
      tempFiles.push({ path: tempFilePaths[i], size: files[i].size })
    }
    emit('select', { tempFilePaths, tempFiles })
    target.value = ''
  }
}

const handlePreview = (file: UploaderFile, index: number) => {
  emit('preview', file, index)
}

const handleDelete = (file: UploaderFile, index: number) => {
  emit('delete', file, index)
}
</script>

<style lang="scss">
/* WeUI npm 包不含 weui-uploader__tips（仅 weui-miniprogram 仓库有） */
.weui-uploader__tips {
  margin-top: 8px;
  padding: 0 16px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  line-height: 1.4;
}

</style>
