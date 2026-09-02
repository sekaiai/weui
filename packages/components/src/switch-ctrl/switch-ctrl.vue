<template>
  <label :class="rootClass" v-bind="$attrs">
    <div class="weui-cell__bd">{{ label }}</div>
    <div class="weui-cell__ft">
      <!-- #ifdef H5 -->
      <span v-if="cp" class="weui-switch-cp">
        <input
          class="weui-switch-cp__input"
          type="checkbox"
          :checked="modelValue"
          :disabled="disabled"
          @change="onChange"
        />
        <div class="weui-switch-cp__box"></div>
      </span>
      <input
        v-else
        class="weui-switch"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        @change="onChange"
      />
      <!-- #endif -->
      <!-- #ifndef H5 -->
      <switch
        :checked="modelValue"
        :disabled="disabled"
        @change="onChange"
      />
      <!-- #endif -->
    </div>
  </label>
</template>

<script lang="ts">
export default {
  name: 'WeuiSwitch',
  inheritAttrs: false,
  options: {
    styleIsolation: 'apply-shared',
    addGlobalClass: true,
  },
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

export interface WeuiSwitchProps {
  modelValue?: boolean
  label?: string
  disabled?: boolean
  cp?: boolean
  extClass?: string
}

export interface WeuiSwitchEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}

const props = withDefaults(defineProps<WeuiSwitchProps>(), {
  modelValue: false,
  label: '',
  disabled: false,
  cp: false,
})

const emit = defineEmits<WeuiSwitchEmits>()

const rootClass = computed(() => {
  const classes: string[] = ['weui-cell', 'weui-cell_active', 'weui-cell_switch']
  if (props.extClass) classes.push(props.extClass)
  return classes
})

const onChange = (event: Event & { detail?: { value?: boolean } }) => {
  const checked = event.detail?.value ?? (event.target as HTMLInputElement | null)?.checked ?? false
  emit('update:modelValue', checked)
  emit('change', checked)
}
</script>
