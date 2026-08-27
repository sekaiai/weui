import type { App } from 'vue'
import { withInstall } from './utils/with-install'

// 基础组件
import ButtonComponent from './button/button.vue'
import BadgeComponent from './badge/badge.vue'
import IconComponent from './icon/icon.vue'
import LoadingComponent from './loading/loading.vue'
import ArticleComponent from './article/article.vue'
import FlexComponent from './flex/flex.vue'
import FlexItemComponent from './flex/flex-item.vue'
import FooterComponent from './footer/footer.vue'
import ProgressComponent from './progress/progress.vue'
import LoadmoreComponent from './loadmore/loadmore.vue'

// 布局容器
import CellComponent from './cell/cell.vue'
import CellGroupComponent from './cell/cell-group.vue'
import CellsComponent from './cells/cells.vue'
import GridComponent from './grid/grid.vue'
import GridItemComponent from './grid/grid-item.vue'
import PanelComponent from './panel/panel.vue'
import MediaBoxComponent from './media-box/media-box.vue'
import FormComponent from './form/form.vue'
import PreviewComponent from './preview/preview.vue'
import AgreeComponent from './agree/agree.vue'

// 表单输入
import InputComponent from './input/input.vue'
import TextareaComponent from './textarea/textarea.vue'
import CheckboxComponent from './checkbox/checkbox.vue'
import CheckboxGroupComponent from './checkbox/checkbox-group.vue'
import SearchbarComponent from './searchbar/searchbar.vue'
import UploaderComponent from './uploader/uploader.vue'
import SwitchComponent from './switch-ctrl/switch-ctrl.vue'
import SelectComponent from './select/select.vue'
import RadioComponent from './radio/radio.vue'
import RadioGroupComponent from './radio/radio-group.vue'

// 操作反馈
import OverlayHostComponent from './overlay-host/overlay-host.vue'
import ActionsheetComponent from './actionsheet/actionsheet.vue'
import { Actionsheet } from './actionsheet/actionsheet'
import DialogComponent from './dialog/dialog.vue'
import { Dialog } from './dialog/dialog'
import HalfScreenDialogComponent from './half-screen-dialog/half-screen-dialog.vue'
import { HalfScreenDialog } from './half-screen-dialog/half-screen-dialog'
import ToptipsComponent from './toptips/toptips.vue'
import { Toptips } from './toptips/toptips'
import ToastComponent from './toast/toast.vue'
import { Toast } from './toast/toast'
import PickerComponent from './picker/picker.vue'
import { Picker } from './picker/picker'
import GalleryComponent from './gallery/gallery.vue'
import { Gallery } from './gallery/gallery'
import SlideviewComponent from './slideview/slideview.vue'

// 导航
import NavbarComponent from './navbar/navbar.vue'
import NavbarItemComponent from './navbar/navbar-item.vue'
import TabbarComponent from './tabbar/tabbar.vue'
import TabbarItemComponent from './tabbar/tabbar-item.vue'
import StepsComponent from './steps/steps.vue'

// 展示
import MsgComponent from './msg/msg.vue'

const WeuiButton = /* @__PURE__ */ withInstall(ButtonComponent, 'WeuiButton')
const WeuiBadge = /* @__PURE__ */ withInstall(BadgeComponent, 'WeuiBadge')
const WeuiIcon = /* @__PURE__ */ withInstall(IconComponent, 'WeuiIcon')
const WeuiLoading = /* @__PURE__ */ withInstall(LoadingComponent, 'WeuiLoading')
const WeuiArticle = /* @__PURE__ */ withInstall(ArticleComponent, 'WeuiArticle')
const WeuiFlex = /* @__PURE__ */ withInstall(FlexComponent, 'WeuiFlex')
const WeuiFlexItem = /* @__PURE__ */ withInstall(FlexItemComponent, 'WeuiFlexItem')
const WeuiFooter = /* @__PURE__ */ withInstall(FooterComponent, 'WeuiFooter')
const WeuiProgress = /* @__PURE__ */ withInstall(ProgressComponent, 'WeuiProgress')
const WeuiLoadmore = /* @__PURE__ */ withInstall(LoadmoreComponent, 'WeuiLoadmore')
const WeuiCell = /* @__PURE__ */ withInstall(CellComponent, 'WeuiCell')
const WeuiCellGroup = /* @__PURE__ */ withInstall(CellGroupComponent, 'WeuiCellGroup')
const WeuiCells = /* @__PURE__ */ withInstall(CellsComponent, 'WeuiCells')
const WeuiGrid = /* @__PURE__ */ withInstall(GridComponent, 'WeuiGrid')
const WeuiGridItem = /* @__PURE__ */ withInstall(GridItemComponent, 'WeuiGridItem')
const WeuiPanel = /* @__PURE__ */ withInstall(PanelComponent, 'WeuiPanel')
const WeuiMediaBox = /* @__PURE__ */ withInstall(MediaBoxComponent, 'WeuiMediaBox')
const WeuiForm = /* @__PURE__ */ withInstall(FormComponent, 'WeuiForm')
const WeuiPreview = /* @__PURE__ */ withInstall(PreviewComponent, 'WeuiPreview')
const WeuiAgree = /* @__PURE__ */ withInstall(AgreeComponent, 'WeuiAgree')
const WeuiInput = /* @__PURE__ */ withInstall(InputComponent, 'WeuiInput')
const WeuiTextarea = /* @__PURE__ */ withInstall(TextareaComponent, 'WeuiTextarea')
const WeuiCheckbox = /* @__PURE__ */ withInstall(CheckboxComponent, 'WeuiCheckbox')
const WeuiCheckboxGroup = /* @__PURE__ */ withInstall(CheckboxGroupComponent, 'WeuiCheckboxGroup')
const WeuiSearchbar = /* @__PURE__ */ withInstall(SearchbarComponent, 'WeuiSearchbar')
const WeuiUploader = /* @__PURE__ */ withInstall(UploaderComponent, 'WeuiUploader')
const WeuiSwitch = /* @__PURE__ */ withInstall(SwitchComponent, 'WeuiSwitch')
const WeuiSelect = /* @__PURE__ */ withInstall(SelectComponent, 'WeuiSelect')
const WeuiRadio = /* @__PURE__ */ withInstall(RadioComponent, 'WeuiRadio')
const WeuiRadioGroup = /* @__PURE__ */ withInstall(RadioGroupComponent, 'WeuiRadioGroup')
const WeuiOverlayHost = /* @__PURE__ */ withInstall(OverlayHostComponent, 'WeuiOverlayHost')
const WeuiActionsheet = /* @__PURE__ */ withInstall(ActionsheetComponent, 'WeuiActionsheet')
const WeuiDialog = /* @__PURE__ */ withInstall(DialogComponent, 'WeuiDialog')
const WeuiHalfScreenDialog = /* @__PURE__ */ withInstall(HalfScreenDialogComponent, 'WeuiHalfScreenDialog')
const WeuiToptips = /* @__PURE__ */ withInstall(ToptipsComponent, 'WeuiToptips')
const WeuiToast = /* @__PURE__ */ withInstall(ToastComponent, 'WeuiToast')
const WeuiPicker = /* @__PURE__ */ withInstall(PickerComponent, 'WeuiPicker')
const WeuiGallery = /* @__PURE__ */ withInstall(GalleryComponent, 'WeuiGallery')
const WeuiSlideview = /* @__PURE__ */ withInstall(SlideviewComponent, 'WeuiSlideview')
const WeuiNavbar = /* @__PURE__ */ withInstall(NavbarComponent, 'WeuiNavbar')
const WeuiNavbarItem = /* @__PURE__ */ withInstall(NavbarItemComponent, 'WeuiNavbarItem')
const WeuiTabbar = /* @__PURE__ */ withInstall(TabbarComponent, 'WeuiTabbar')
const WeuiTabbarItem = /* @__PURE__ */ withInstall(TabbarItemComponent, 'WeuiTabbarItem')
const WeuiSteps = /* @__PURE__ */ withInstall(StepsComponent, 'WeuiSteps')
const WeuiMsg = /* @__PURE__ */ withInstall(MsgComponent, 'WeuiMsg')

// 类型导出 — 基础组件
import type { WeuiButtonProps, WeuiButtonEmits } from './button'
import type { WeuiBadgeProps } from './badge'
import type { WeuiIconProps } from './icon'
import type { WeuiLoadingProps } from './loading'
import type { WeuiArticleProps } from './article'
import type { WeuiFlexProps, WeuiFlexDirection, WeuiFlexWrap, WeuiFlexJustify, WeuiFlexAlign, WeuiFlexItemProps } from './flex'
import type { WeuiFooterProps, FooterLink } from './footer'
import type { WeuiProgressProps, WeuiProgressEmits } from './progress'
import type { WeuiLoadmoreProps } from './loadmore'

// 类型导出 — 布局容器
import type { WeuiCellProps, WeuiCellEmits, WeuiCellGroupProps } from './cell'
import type { WeuiCellsProps } from './cells'
import type { WeuiGridProps, WeuiGridItemProps, WeuiGridItemEmits } from './grid'
import type { WeuiPanelProps, WeuiPanelEmits } from './panel'
import type { WeuiMediaBoxProps, WeuiMediaBoxEmits, WeuiMediaBoxType } from './media-box'
import type { WeuiFormProps } from './form'
import type { WeuiPreviewProps, WeuiPreviewEmits, PreviewItem, PreviewButton } from './preview'

// 类型导出 — 表单输入
import type { WeuiInputProps, WeuiInputEmits } from './input'
import type { WeuiTextareaProps, WeuiTextareaEmits } from './textarea'
import type { WeuiCheckboxProps, WeuiCheckboxEmits, WeuiCheckboxGroupProps, WeuiCheckboxGroupEmits } from './checkbox'
import type { WeuiSearchbarProps, WeuiSearchbarEmits } from './searchbar'
import type { WeuiUploaderProps, WeuiUploaderEmits, UploaderFile } from './uploader'
import type { WeuiAgreeProps, WeuiAgreeEmits } from './agree'
import type { WeuiSwitchProps, WeuiSwitchEmits } from './switch-ctrl'
import type { WeuiSelectProps, WeuiSelectEmits } from './select'
import type { WeuiRadioProps, WeuiRadioEmits, WeuiRadioGroupProps, WeuiRadioGroupEmits } from './radio'

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
  WeuiCell, WeuiCellGroup, WeuiCells, WeuiGrid, WeuiGridItem, WeuiPanel, WeuiMediaBox, WeuiForm, WeuiPreview,
  // 表单输入
  WeuiInput, WeuiTextarea, WeuiCheckbox, WeuiCheckboxGroup, WeuiSearchbar, WeuiUploader, WeuiAgree, WeuiSwitch, WeuiSelect, WeuiRadio, WeuiRadioGroup,
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
  WeuiCell, WeuiCellGroup, WeuiCells, WeuiGrid, WeuiGridItem, WeuiPanel, WeuiMediaBox, WeuiForm, WeuiPreview,
  // 表单输入
  WeuiInput, WeuiTextarea, WeuiCheckbox, WeuiCheckboxGroup, WeuiSearchbar, WeuiUploader, WeuiAgree, WeuiSwitch, WeuiSelect, WeuiRadio, WeuiRadioGroup,
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
  WeuiProgressProps, WeuiProgressEmits,
  WeuiLoadmoreProps,
  // 布局容器
  WeuiCellProps, WeuiCellEmits, WeuiCellGroupProps,
  WeuiCellsProps,
  WeuiGridProps, WeuiGridItemProps, WeuiGridItemEmits,
  WeuiPanelProps, WeuiPanelEmits,
  WeuiMediaBoxProps, WeuiMediaBoxEmits, WeuiMediaBoxType,
  WeuiFormProps,
  WeuiPreviewProps, WeuiPreviewEmits, PreviewItem, PreviewButton,
  // 表单输入
  WeuiInputProps, WeuiInputEmits,
  WeuiTextareaProps, WeuiTextareaEmits,
  WeuiCheckboxProps, WeuiCheckboxEmits, WeuiCheckboxGroupProps, WeuiCheckboxGroupEmits,
  WeuiSearchbarProps, WeuiSearchbarEmits,
  WeuiUploaderProps, WeuiUploaderEmits, UploaderFile,
  // 表单输入
  WeuiAgreeProps, WeuiAgreeEmits,
  WeuiSwitchProps, WeuiSwitchEmits,
  WeuiSelectProps, WeuiSelectEmits,
  WeuiRadioProps, WeuiRadioEmits, WeuiRadioGroupProps, WeuiRadioGroupEmits,
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
