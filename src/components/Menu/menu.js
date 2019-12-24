import Menu from 'ant-design-vue/es/menu'
import Icon from 'ant-design-vue/es/icon'

const { Item, SubMenu } = Menu

export default {
  name: 'SMenu',
  props: {
    menu: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    mode: { // 水平 || 垂直
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: []
    }
  },
  computed: {
    rootSubmenuKeys: vm => {
      console.log('---- menu ----')
      console.log(vm)
      const keys = []
      vm.menu.forEach(item => {
        keys.push(item.path)
      })
      return keys
    }
  },
  mounted () {
    this.updateMenu()
  },
  watch: {
    collapsed (val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys.concat()
        this.openKeys = []
      } else {
        this.openKeys = this.cachedOpenKeys
      }
    },
    $route () {
      this.updateMenu()
    }
  },
  methods: {
    onOpenChange (openKeys) {
      if (this.mode === 'horizontal') {
        this.openKeys = openKeys
        return
      }
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },

    updateMenu () {
      console.log(this.$route)
      const routes = this.$route.matched.concat()
      const { hidden } = this.$route.meta
      if (routes.length >= 3 && hidden) {
        routes.pop()
        this.selectedKeys = [routes[routes.length - 1].path]
        console.log(this.selectedKeys)
      }
      const openKeys = []
      if (this.mode === 'inline') {
        routes.forEach(item => {
          openKeys.push(item.path)
        })
      }

      this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys)
    },

    renderItem (menu) {
      if (!menu.hidden) {
        return menu.children && !menu.hideChildInMenu ? this.renderSubMenu(menu) : this.renderMenuItem(menu)
      }
      return null
    },

    /**
     * 菜单
     * @param {*} menu
     */
    renderMenuItem (menu) {
      const target = menu.meta.target || null
      const tag = target && 'a' || 'router-link'
      const props = { to: { name: menu.name } }
      const attrs = { href: menu.path, target: menu.meta.target }

      if (menu.children && menu.hideChildInMenu) {
        menu.children.forEach(item => {
          item.meta = Object.assign(item.meta, { hidden: true })
        })
      }

      return (
        <Item {...{ key: menu.path }}>
          <tag {...{ props, attrs }}>
            { this.renderIcon(menu.meta.icon) }
            <span>{ menu.meta.title }</span>
          </tag>
        </Item>
      )
    },

    /**
     * 子菜单
     * @param {*} menu
     */
    renderSubMenu (menu) {
      console.log(menu)
      const itemArr = []
      if (!menu.hideChildInMenu) {
        menu.children.forEach(item => itemArr.push(this.renderItem(item)))
      }
      return (
        <SubMenu { ...{ key: menu.path } }>
          <span slot='title'>
            { this.renderIcon(menu.meta.icon) }
            <span>{ menu.meta.title }</span>
          </span>
          { itemArr }
        </SubMenu>
      )
    },

    /**
     * icon 渲染
     * @param {*} icon
     */
    renderIcon (icon) {
      if (icon === 'none' || icon === undefined) {
        return null
      }
      const props = {}
      typeof (icon) === 'object' ? props.component = icon : props.type = icon
      return (
        <Icon { ...{ props } } />
      )
    }
  },

  render () {
    const { mode, theme, menu } = this
    const props = {
      mode,
      theme,
      openKeys: this.openKeys
    }
    const on = {
      select: obj => {
        this.selectedKeys = obj.selectedKeys
        this.$emit('select', obj)
      },
      openChange: this.onOpenChange
    }

    const menuTree = menu.map(item => {
      if (item.hidden) {
        return null
      }

      return this.renderItem(item)
    })

    return (
      <Menu vModel={ this.selectedKeys } { ...{ props, on } }>
        { menuTree }
      </Menu>
    )
  }
}
