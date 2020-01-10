const getters = {
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name
}

export default getters
