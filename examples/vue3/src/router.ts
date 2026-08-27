import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('./views/Home.vue'), meta: { title: '概览 Home' } },
  { path: '/basic', name: 'basic', component: () => import('./views/Basic.vue'), meta: { title: '基础组件' } },
  { path: '/cell', name: 'cell', component: () => import('./views/Cell.vue'), meta: { title: '列表 / 面板 / 宫格' } },
  { path: '/form', name: 'form', component: () => import('./views/Form.vue'), meta: { title: '表单' } },
  { path: '/navbar', name: 'navbar', component: () => import('./views/Navbar.vue'), meta: { title: 'Navbar' } },
  { path: '/tabbar', name: 'tabbar', component: () => import('./views/Tabbar.vue'), meta: { title: 'Tabbar' } },
  { path: '/steps', name: 'steps', component: () => import('./views/Steps.vue'), meta: { title: 'Steps' } },
  { path: '/actionsheet', name: 'actionsheet', component: () => import('./views/Actionsheet.vue'), meta: { title: 'Actionsheet' } },
  { path: '/dialog', name: 'dialog', component: () => import('./views/Dialog.vue'), meta: { title: 'Dialog' } },
  { path: '/half-screen-dialog', name: 'half-screen-dialog', component: () => import('./views/HalfScreenDialog.vue'), meta: { title: 'HalfScreenDialog' } },
  { path: '/toast', name: 'toast', component: () => import('./views/Toast.vue'), meta: { title: 'Toast / Toptips' } },
  { path: '/picker', name: 'picker', component: () => import('./views/Picker.vue'), meta: { title: 'Picker' } },
  { path: '/gallery', name: 'gallery', component: () => import('./views/Gallery.vue'), meta: { title: 'Gallery / Slideview' } },
  { path: '/msg', name: 'msg', component: () => import('./views/Msg.vue'), meta: { title: 'Msg' } },
]

export const navGroups: { title: string; items: { path: string; label: string }[] }[] = [
  {
    title: '入门',
    items: [{ path: '/', label: '概览 Home' }],
  },
  {
    title: '基础组件',
    items: [
      { path: '/basic', label: '按钮 / 徽章 / 图标 …' },
      { path: '/cell', label: '列表 / 面板 / 宫格' },
    ],
  },
  {
    title: '表单',
    items: [{ path: '/form', label: '输入 / 选择 / 上传' }],
  },
  {
    title: '导航',
    items: [
      { path: '/navbar', label: 'Navbar 选项卡' },
      { path: '/tabbar', label: 'Tabbar 底部导航' },
      { path: '/steps', label: 'Steps 步骤条' },
    ],
  },
  {
    title: '操作反馈',
    items: [
      { path: '/actionsheet', label: 'Actionsheet' },
      { path: '/dialog', label: 'Dialog' },
      { path: '/half-screen-dialog', label: 'HalfScreenDialog' },
      { path: '/toast', label: 'Toast / Toptips' },
      { path: '/picker', label: 'Picker' },
      { path: '/gallery', label: 'Gallery / Slideview' },
    ],
  },
  {
    title: '结果页',
    items: [{ path: '/msg', label: 'Msg' }],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
