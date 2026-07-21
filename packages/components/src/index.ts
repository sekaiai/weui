import type { App } from 'vue'

// 基础组件
import { WeuiButton } from './button'
import { WeuiBadge } from './badge'
import { WeuiIcon } from './icon'
import { WeuiLoading } from './loading'
import { WeuiArticle } from './article'
import { WeuiFlex, WeuiFlexItem } from './flex'
import { WeuiFooter } from './footer'
import { WeuiProgress } from './progress'
import { WeuiLoadmore } from './loadmore'

// 布局容器
import { WeuiCell, WeuiCellGroup } from './cell'
import { WeuiGrid, WeuiGridItem } from './grid'
import { WeuiPanel } from './panel'
import { WeuiMediaBox } from './media-box'
import { WeuiList } from './list'
import { WeuiForm } from './form'
import { WeuiPreview } from './preview'
import { WeuiAgree } from './agree'

// 表单输入
import { WeuiInput } from './input'
import { WeuiTextarea } from './textarea'
import { WeuiCheckbox, WeuiCheckboxGroup } from './checkbox'
import { WeuiSearchbar } from './searchbar'
import { WeuiUploader } from './uploader'
import { WeuiSwitch } from './switch-ctrl'
import { WeuiSelect } from './select'
import { WeuiRadio, WeuiRadioGroup } from './radio'

// 表单容器
import { WeuiFormGroup } from './form-group'
import { WeuiFormControl } from './form-control'
import { WeuiFormTips } from './form-tips'
import { WeuiFormOpr } from './form-opr'
import { WeuiFormExtra } from './form-extra'

// 操作反馈
import { WeuiOverlayHost } from './overlay-host'
import { WeuiActionsheet, Actionsheet } from './actionsheet'
import { WeuiDialog, Dialog } from './dialog'
import { WeuiHalfScreenDialog, HalfScreenDialog } from './half-screen-dialog'
import { WeuiToptips, Toptips } from './toptips'
import { WeuiToast, Toast } from './toast'
import { WeuiPicker, Picker } from './picker'
import { WeuiGallery, Gallery } from './gallery'
import { WeuiSlideview } from './slideview'

// 导航
import { WeuiNavbar, WeuiNavbarItem } from './navbar'
import { WeuiTabbar, WeuiTabbarItem } from './tabbar'
import { WeuiSteps } from './steps'

// 展示
import { WeuiMsg } from './msg'

// 类型导出 — 基础组件
import type { WeuiButtonProps, WeuiButtonEmits } from './button'
import type { WeuiBadgeProps } from './badge'
import type { WeuiIconProps } from './icon'
import type { WeuiLoadingProps } from './loading'
import type { WeuiArticleProps } from './article'
import type { WeuiFlexProps, WeuiFlexDirection, WeuiFlexWrap, WeuiFlexJustify, WeuiFlexAlign, WeuiFlexItemProps } from './flex'
import type { WeuiFooterProps, FooterLink } from './footer'
import type { WeuiProgressProps } from './progress'
import type { WeuiLoadmoreProps } from './loadmore'

// 类型导出 — 布局容器
import type { WeuiCellProps, WeuiCellEmits, WeuiCellVariant, WeuiCellGroupProps, WeuiCellGroupVariant } from './cell'
import type { WeuiGridProps, WeuiGridItemProps, WeuiGridItemEmits } from './grid'
import type { WeuiPanelProps, WeuiPanelEmits } from './panel'
import type { WeuiMediaBoxProps, WeuiMediaBoxEmits, WeuiMediaBoxType } from './media-box'
import type { WeuiListProps } from './list'
import type { WeuiFormProps } from './form'
import type { WeuiPreviewProps, WeuiPreviewEmits, PreviewItem, PreviewButton } from './preview'

// 类型导出 — 表单输入
import type { WeuiInputProps, WeuiInputEmits } from './input'
import type { WeuiTextareaProps, WeuiTextareaEmits } from './textarea'
import type { WeuiCheckboxProps, WeuiCheckboxGroupProps, WeuiCheckboxGroupEmits } from './checkbox'
import type { WeuiSearchbarProps, WeuiSearchbarEmits } from './searchbar'
import type { WeuiUploaderProps, WeuiUploaderEmits, UploaderFile } from './uploader'
import type { WeuiAgreeProps, WeuiAgreeEmits } from './agree'
import type { WeuiSwitchProps, WeuiSwitchEmits } from './switch-ctrl'
import type { WeuiSelectProps, WeuiSelectEmits } from './select'
import type { WeuiRadioProps, WeuiRadioGroupProps } from './radio'

// 类型导出 — 表单容器
import type { WeuiFormGroupProps } from './form-group'
import type { WeuiFormControlProps } from './form-control'
import type { WeuiFormTipsProps } from './form-tips'
import type { WeuiFormOprProps } from './form-opr'
import type { WeuiFormExtraProps } from './form-extra'

// 类型导出 — 操作反馈
import type { OverlayItem } from './overlay-host'
import type { WeuiActionsheetProps, WeuiActionsheetEmits, ActionsheetItem, ActionsheetShowOptions, ActionsheetShowResult } from './actionsheet'
import type { WeuiDialogProps, WeuiDialogEmits, DialogButton, DialogShowOptions, DialogAlertOptions, DialogConfirmOptions, DialogShowResult } from './dialog'
import type { WeuiHalfScreenDialogProps, WeuiHalfScreenDialogEmits, HalfScreenDialogButton, HalfScreenDialogShowOptions, HalfScreenDialogShowResult } from './half-screen-dialog'
import type { WeuiToptipsProps, WeuiToptipsEmits, ToptipsType, ToptipsShowOptions } from './toptips'
import type { WeuiToastProps, WeuiToastEmits, ToastType, ToastShowOptions } from './toast'
import type { WeuiPickerProps, WeuiPickerEmits, PickerColumn, PickerOption, PickerShowOptions, PickerShowResult } from './picker'
import type { WeuiGalleryProps, WeuiGalleryEmits, GalleryShowOptions } from './gallery'
import type { WeuiSlideviewProps, WeuiSlideviewEmits, SlideButton } from './slideview'

// 类型导出 — 导航
import type { WeuiNavbarProps, WeuiNavbarItemProps, WeuiNavbarItemEmits } from './navbar'
import type { WeuiTabbarProps, WeuiTabbarItemProps, WeuiTabbarItemEmits } from './tabbar'
import type { WeuiStepsProps, StepItem } from './steps'

// 类型导出 — 展示
import type { WeuiMsgProps, WeuiMsgEmits, MsgButton } from './msg'

const components = [
  // 基础组件
  WeuiButton, WeuiBadge, WeuiIcon, WeuiLoading, WeuiArticle, WeuiFlex, WeuiFlexItem, WeuiFooter, WeuiProgress, WeuiLoadmore,
  // 布局容器
  WeuiCell, WeuiCellGroup, WeuiGrid, WeuiGridItem, WeuiPanel, WeuiMediaBox, WeuiList, WeuiForm, WeuiPreview,
  // 表单输入
  WeuiInput, WeuiTextarea, WeuiCheckbox, WeuiCheckboxGroup, WeuiSearchbar, WeuiUploader, WeuiAgree, WeuiSwitch, WeuiSelect, WeuiRadio, WeuiRadioGroup,
  // 表单容器
  WeuiFormGroup, WeuiFormControl, WeuiFormTips, WeuiFormOpr, WeuiFormExtra,
  // 操作反馈
  WeuiOverlayHost, WeuiActionsheet, WeuiDialog, WeuiHalfScreenDialog, WeuiToptips, WeuiToast, WeuiPicker, WeuiGallery, WeuiSlideview,
  // 导航
  WeuiNavbar, WeuiNavbarItem, WeuiTabbar, WeuiTabbarItem, WeuiSteps,
  // 展示
  WeuiMsg,
]

const install = (app: App): void => {
  components.forEach((component) => {
    component.install?.(app)
  })
}

export default { install }

// 组件导出
export {
  // 基础组件
  WeuiButton, WeuiBadge, WeuiIcon, WeuiLoading, WeuiArticle, WeuiFlex, WeuiFlexItem, WeuiFooter, WeuiProgress, WeuiLoadmore,
  // 布局容器
  WeuiCell, WeuiCellGroup, WeuiGrid, WeuiGridItem, WeuiPanel, WeuiMediaBox, WeuiList, WeuiForm, WeuiPreview,
  // 表单输入
  WeuiInput, WeuiTextarea, WeuiCheckbox, WeuiCheckboxGroup, WeuiSearchbar, WeuiUploader, WeuiAgree, WeuiSwitch, WeuiSelect, WeuiRadio, WeuiRadioGroup,
  // 表单容器
  WeuiFormGroup, WeuiFormControl, WeuiFormTips, WeuiFormOpr, WeuiFormExtra,
  // 操作反馈
  WeuiOverlayHost, WeuiActionsheet, Actionsheet, WeuiDialog, Dialog, WeuiHalfScreenDialog, HalfScreenDialog, WeuiToptips, Toptips, WeuiToast, Toast, WeuiPicker, Picker, WeuiGallery, Gallery, WeuiSlideview,
  // 导航
  WeuiNavbar, WeuiNavbarItem, WeuiTabbar, WeuiTabbarItem, WeuiSteps,
  // 展示
  WeuiMsg,
}

// 类型导出
export type {
  // 基础组件
  WeuiButtonProps, WeuiButtonEmits,
  WeuiBadgeProps,
  WeuiIconProps,
  WeuiLoadingProps,
  WeuiArticleProps,
  WeuiFlexProps, WeuiFlexDirection, WeuiFlexWrap, WeuiFlexJustify, WeuiFlexAlign, WeuiFlexItemProps,
  WeuiFooterProps, FooterLink,
  WeuiProgressProps,
  WeuiLoadmoreProps,
  // 布局容器
  WeuiCellProps, WeuiCellEmits, WeuiCellVariant, WeuiCellGroupProps, WeuiCellGroupVariant,
  WeuiGridProps, WeuiGridItemProps, WeuiGridItemEmits,
  WeuiPanelProps, WeuiPanelEmits,
  WeuiMediaBoxProps, WeuiMediaBoxEmits, WeuiMediaBoxType,
  WeuiListProps,
  WeuiFormProps,
  WeuiPreviewProps, WeuiPreviewEmits, PreviewItem, PreviewButton,
  // 表单输入
  WeuiInputProps, WeuiInputEmits,
  WeuiTextareaProps, WeuiTextareaEmits,
  WeuiCheckboxProps, WeuiCheckboxGroupProps, WeuiCheckboxGroupEmits,
  WeuiSearchbarProps, WeuiSearchbarEmits,
  WeuiUploaderProps, WeuiUploaderEmits, UploaderFile,
  // 表单输入
  WeuiAgreeProps, WeuiAgreeEmits,
  WeuiSwitchProps, WeuiSwitchEmits,
  WeuiSelectProps, WeuiSelectEmits,
  WeuiRadioProps, WeuiRadioGroupProps,
  // 表单容器
  WeuiFormGroupProps,
  WeuiFormControlProps,
  WeuiFormTipsProps,
  WeuiFormOprProps,
  WeuiFormExtraProps,
  // 操作反馈
  OverlayItem,
  WeuiActionsheetProps, WeuiActionsheetEmits, ActionsheetItem, ActionsheetShowOptions, ActionsheetShowResult,
  WeuiDialogProps, WeuiDialogEmits, DialogButton, DialogShowOptions, DialogAlertOptions, DialogConfirmOptions, DialogShowResult,
  WeuiHalfScreenDialogProps, WeuiHalfScreenDialogEmits, HalfScreenDialogButton, HalfScreenDialogShowOptions, HalfScreenDialogShowResult,
  WeuiToptipsProps, WeuiToptipsEmits, ToptipsType, ToptipsShowOptions,
  WeuiToastProps, WeuiToastEmits, ToastType, ToastShowOptions,
  WeuiPickerProps, WeuiPickerEmits, PickerColumn, PickerOption, PickerShowOptions, PickerShowResult,
  WeuiGalleryProps, WeuiGalleryEmits, GalleryShowOptions,
  WeuiSlideviewProps, WeuiSlideviewEmits, SlideButton,
  // 导航
  WeuiNavbarProps, WeuiNavbarItemProps, WeuiNavbarItemEmits,
  WeuiTabbarProps, WeuiTabbarItemProps, WeuiTabbarItemEmits,
  WeuiStepsProps, StepItem,
  // 展示
  WeuiMsgProps, WeuiMsgEmits, MsgButton,
}
