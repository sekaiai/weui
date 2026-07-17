/**
 * uni-app 全局 API 类型声明（最小集）
 *
 * 组件库仅声明实际使用的 uni.* API。
 * 在 uni-app 项目中消费时，由 @dcloudio/types 提供完整类型。
 */
declare const uni: {
  navigateTo(options: {
    url: string
    success?: (res: unknown) => void
    fail?: (err: unknown) => void
    complete?: () => void
  }): void
  redirectTo(options: {
    url: string
    success?: (res: unknown) => void
    fail?: (err: unknown) => void
    complete?: () => void
  }): void
  navigateBack(options?: {
    delta?: number
    success?: (res: unknown) => void
    fail?: (err: unknown) => void
    complete?: () => void
  }): void
  showToast(options: {
    title: string
    icon?: 'success' | 'error' | 'none' | 'loading'
    duration?: number
    mask?: boolean
  }): void
  hideToast(): void
  showLoading(options: { title: string; mask?: boolean }): void
  hideLoading(): void
  chooseImage(options: {
    count?: number
    success?: (res: {
      tempFilePaths: string[]
      tempFiles: Array<{ path: string; size: number }>
    }) => void
    fail?: (err: { errMsg: string }) => void
    complete?: () => void
  }): void
  chooseFile(options: {
    count?: number
    success?: (res: {
      tempFilePaths: string[]
      tempFiles: Array<{ path: string; size: number }>
    }) => void
    fail?: (err: { errMsg: string }) => void
    complete?: () => void
  }): void
}
