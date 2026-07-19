/**
 * 运行时平台判断
 *
 * 组件库同时输出 Vue 3（H5）产物与 uni-app（小程序 + H5）产物。
 * __IS_H5__ 是构建时常量，在 uni-app 产物中固定为 false，无法区分
 * uni-app H5 与小程序运行时。因此需要运行时判断当前环境。
 */

interface UniSystemInfo {
  uniPlatform?: string
}

interface MiniProgramUni {
  getSystemInfoSync(): UniSystemInfo
}

/** 判断当前是否为小程序环境 */
export function isMiniProgram(): boolean {
  if (typeof uni === 'undefined') {
    return false
  }
  const u = uni as unknown as Partial<MiniProgramUni>
  if (typeof u.getSystemInfoSync !== 'function') {
    return false
  }
  try {
    const platform = u.getSystemInfoSync().uniPlatform
    // 小程序平台通常以 mp- 开头（如 mp-weixin、mp-alipay）；
    // uni-app H5 为 'h5'/'web'，Vue 3 产物无 uni，均走 UI 渲染路径。
    return Boolean(platform && platform.startsWith('mp'))
  } catch {
    return false
  }
}
