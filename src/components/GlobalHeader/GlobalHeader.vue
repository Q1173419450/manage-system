<template>
<transition name="showHeader">
  <div v-if="visible" class="header-animat">
    <a-layout-header
      v-if='visible'
      :class="[fixedHeader && 'ant-header-fixedHeader', sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed', ]"
      :style="{ padding: '0' }"
    >
      <div v-if="mode === 'sidemenu'" class="header">
        <a-icon v-if="device==='mobile'" class="trigger" :type="collapsed ? 'menu-fold' : 'menu-unfold'" @click="toggle"/>
        <a-icon v-else class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggle"/>
      </div>
    </a-layout-header>
  </div>
</transition>
</template>

<script>
// import Logo from '../tools/Logo'
import { mixin } from '@/utils/mixin'
export default {
  name: 'GlobalHeader',
  components: {
    // Logo
  },
  mixins: [mixin],
  props: {
    mode: {
      type: String,
      default: 'sidemenu'
    },
    menus: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    device: {
      type: String,
      required: false,
      default: 'desktop'
    }
  },
  data () {
    return {
      visible: true,
      oldScrollTop: 0
    }
  },
  mounted () {
    // console.log('-------- header -----')
    // console.log(this.sidebarOpened)
    // document.body.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  methods: {
    // handleScroll () {
    //   if (!this.autoHideHeader) {
    //     return
    //   }

    //   const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
    //   if (!this.trcking) {
    //     this.trcking = true
    //     requestAnimationFrame(() => {
    //       if (this.oldScrollTop > scrollTop) {
    //         this.visible = true
    //       } else if (scrollTop > 300 && this.visible) {
    //         this.visible = false
    //       } else if (scrollTop < 300 && !this.visible) {
    //         this.visible = true
    //       }
    //       this.oldScrollTop = scrollTop
    //       this.trcking = false
    //     })
    //   }
    // },
    toggle () {
      this.$emit('toggle')
    }
  },
  beforeDestroy () {
    // document.body.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>

<style lang='less' scoped>
.header-animat{
  position: relative;
  z-index: 2;
}
.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter, .showHeader-leave-to {
  opacity: 0;
}
</style>
