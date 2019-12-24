import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSetting'

// 蚂蚁样式
// import {
//   Button,
//   Layout,
//   Icon,
//   Drawer,
//   Radio,
//   Menu,
//   Form,
//   Input,
//   Select,
//   LocaleProvider,
//   Dropdown,
//   DatePicker
// } from 'ant-design-vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

// Vue.use(Button)
// Vue.use(Layout)
// Vue.use(Icon)
// Vue.use(Drawer)
// Vue.use(Radio)
// Vue.use(Menu)
// Vue.use(Form)
// Vue.use(Input)
// Vue.use(Select)
// Vue.use(LocaleProvider)
// Vue.use(Dropdown)
// Vue.use(DatePicker)
Vue.use(Antd)

Vue.use(VueStorage, config.storageOptions)
