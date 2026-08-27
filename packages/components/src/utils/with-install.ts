import type { App, Component, Plugin } from 'vue'

export type InstallableComponent<T extends Component> = T & Plugin

export function withInstall<T extends Component>(
  component: T,
  fallbackName: string,
): InstallableComponent<T> {
  const installable = component as InstallableComponent<T>
  const name = (component as Component & { name?: string }).name || fallbackName
  installable.install = (app: App) => {
    app.component(name, component)
  }
  return installable
}
