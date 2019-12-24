<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-drawer
        placement="left"
        :wrapClassName="`drawer-sider ${navTheme}`"
        :closable="false"
        :visible="collapsed"
        @close="drawerClose"
      >
        <sider-menu
          mode='inline'
          :menus='menus'
          :theme='navTheme'
          :collapsed='false'
          :collapsible='true'
          @menuSelect='menuSelect'
        ></sider-menu>
      </a-drawer>

      <a-layout>
        <a-layout-header style="background: #fff; padding: 0" >
          <GlobalHeader />
        </a-layout-header>

        <!-- contnet -->
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>

        <!-- footer -->
        <a-layout-footer style="text-align: center">
          <GlobalFooter />
        </a-layout-footer>

      </a-layout>
    </a-layout>
    <SettingDrawer />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mixin, mixinDevice } from '@/utils/mixin'
import config from '@/config/defaultSetting'

import GlobalHeader from '@/components/GlobalHeader'
import GlobalFooter from '@/components/GlobalFooter'
import SiderMenu from '@/components/Menu/SubMenu'
import SettingDrawer from '../components/SettingDrawer'

export default {
  name: 'BasicLayout',
  mixins: [mixin, mixinDevice],
  data () {
    return {
      production: config.production,
      collapsed: false,
      menus: []
    }
  },
  components: {
    GlobalHeader,
    GlobalFooter,
    SiderMenu,
    SettingDrawer
  },
  created () {
    this.menus = this.mainMenu.find(item => item.path === '/').children
    this.collapsed = !this.sidebarOpened
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    })
  },
  methods: {
    menuSelect () {
      if (!this.isDesktop()) {
        this.collapsed = false
      }
    },
    drawerClose () {
      this.collapsed = false
    }
  }
}
</script>

<style lang='less'>
@import url('../components/global.less');
  /* .logo {
    height: 64px;
    line-height: 64px;
    text-align: center;
    overflow: hidden;
    color: #fff;
  } */
  /*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
