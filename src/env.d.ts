/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// declare module 'echarts' {
//   import * as echarts from 'echarts'
//   const echarts: echarts
//   export default echarts
// }

interface ImportMetaEnv {
  VITE_URL: string
}