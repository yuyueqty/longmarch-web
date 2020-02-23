<template>
  <div class="header-search">
    <svg-icon class-name="search-icon" icon-class="web" @click="openWeb" />
  </div>
</template>

<script>
import defaultSettings from '@/settings'

export default {
  name: 'HeaderSearch',
  data() {
    return {
      webUrl: defaultSettings.webUrl
    }
  },
  methods: {
    openWeb() {
      window.open(this.webUrl)
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
