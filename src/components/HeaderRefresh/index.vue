<template>
  <div class="header-search">
    <svg-icon class-name="search-icon" icon-class="refresh" @click="refresh" />
  </div>
</template>

<script>
import { refresh } from '@/api/user'
// import { router } from '@/router'

export default {
  name: 'HeaderSearch',
  data() {
    return {

    }
  },
  methods: {
    refresh() {
      refresh().then(response => {
        location.reload()
        // this.$store.commit('user/SET_AVATAR', this.userInfo.headImgUrl)
        // const { data } = response
        // const { roles, permissions, menus, dictionary, username, avatar, introduction, routes } = data
        // if (!roles || roles.length <= 0) {
        //   this.$store.commit('user/SET_ROLES', ['未授权用户'])
        // } else {
        //   this.$store.commit('user/SET_ROLES', roles)
        // }
        // this.$store.commit('user/SET_PERMISSIONS', permissions)
        // this.$store.commit('user/SET_MENUS', menus)
        // this.$store.commit('user/SET_DICTIONARY', dictionary)
        // this.$store.commit('user/SET_NAME', username)
        // this.$store.commit('user/SET_AVATAR', avatar)
        // this.$store.commit('user/SET_INTRODUCTION', introduction)
        // const hasRoutes = routes && routes.length > 0
        // if (hasRoutes) {
        //   const accessRoutes = this.$store.dispatch('permission/generateRoutes', routes)
        //   router.addRoutes(accessRoutes)
        // } else {
        //   router.push({ name: 'Profile' })
        // }
        // this.$notify({
        //   title: '成功',
        //   message: '刷新成功',
        //   type: 'success',
        //   duration: 2000
        // })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    /deep/ .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
