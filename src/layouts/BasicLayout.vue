<template>
  <div>
    <a-layout :class="['layout', device]">
      <a-drawer
        placement="left"
        v-if="isMobile()"
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

      <sider-menu
        v-else-if="isSideMenu()"
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :collapsible="true"
      ></sider-menu>

      <a-layout>
          <GlobalHeader
            :mode="layoutMode"
            :menus="menus"
            :theme="navTheme"
            :collapsed="collapsed"
            :device="device"
            @toggle="toggle"
          />

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
import { triggerWindowResizeEvent } from '@/utils/util'
import { mapState, mapActions } from 'vuex'
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
    ...mapActions(['setSidebar']),
    /**
     * 侧边栏显示或隐藏
     */
    toggle () {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
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
