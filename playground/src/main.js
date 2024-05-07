import { createApp } from 'vue'
import Vue2 from 'vue2'
import { isVue2 } from 'vue-demi'

import APP from './App.vue'

import {
  VeCheckbox,
  VeCheckboxGroup,
  VeContextmenu,
  VeDropdown,
  VeIcon,
  VeLoading,
  VeLocale,
  VePagination,
  VeRadio,
  VeSelect,
  FanTable
} from 'vue-fantable/packages/index.js'
// } from 'vue-fantable/libs/main.js'

// 设置当前环境
window.env = process.env.NODE_ENV === 'development' ? 'dev' : 'pro'

/*
dev mode
1、生产环境使用已发布的样式文件，参考 theme-switch-mixins.js
*/

const docTheme = 'default'
if (docTheme === 'dark') {
  import('@P/theme-dark/index.less')
} else {
  import('@P/theme-default/index.less')
}

const Comps = [
  VeCheckbox,
  VeCheckboxGroup,
  VeContextmenu,
  VeDropdown,
  VeIcon,
  VePagination,
  VeRadio,
  VeSelect,
  FanTable
]

if (isVue2) {
  Comps.forEach(comp => {
    Vue2.use(comp)
  })
  Vue2.prototype.$veLoading = VeLoading
  Vue2.prototype.$veLocale = VeLocale
  // eslint-disable-next-line no-new
  new Vue2({
    el: '#app',
    render: (h) => h(APP)
  })
} else {
  const app = createApp(APP)
  app.config.globalProperties.$veLoading = VeLoading
  app.config.globalProperties.$veLocale = VeLocale
  Comps.forEach(comp => {
    app.use(comp)
  })
  app.mount('#app')
}