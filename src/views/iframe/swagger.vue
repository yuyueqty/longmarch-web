<template>
  <div class="iframe-container">
    <iframe :src="url" scrolling="auto" frameborder="0" class="frame" :onload="onloaded()" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: process.env.VUE_APP_BASE_API + '/doc.html'
    }
  },
  methods: {
    onloaded() {
      if (this.loading) {
        this.loading.close()
      }
    }
  }
}
</script>

<style lang="scss">
.iframe-container {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;;
  bottom: 0px;
  .frame {
    width: 100%;
    height: 100%;
  }
}
</style>
