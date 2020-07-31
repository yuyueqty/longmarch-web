<template>
  <div class="app-container">
    <el-button type="danger" icon="el-icon-edit" circle @click="createVideo()" />
    <el-button type="danger" icon="el-icon-search" circle @click="$router.push({ name: 'HotearchVideos' })" />
    <vue-waterfall-easy ref="waterfall" height="150vh" :imgs-arr="imgsArr" @scrollReachBottom="getList">
      <div slot-scope="props" class="img-info">
        <p class="some-info">
          <el-tag effect="dark">{{ props.value.is_reviewed?'已审核':'未审核' }}</el-tag>
          <el-tag effect="dark" type="success">{{ props.value.is_top?'已置顶':'未置顶' }}</el-tag>
          <el-button type="danger" icon="el-icon-delete" circle @click.stop.prevent="deleteVideo(props.value.item_id)" />
        </p>
        <p class="some-info">
          <el-badge :value="props.value.statistics.comment_count" :max="999" class="item">
            <el-button size="mini">评论数</el-button>
          </el-badge>
          <el-badge :value="props.value.statistics.digg_count" :max="999" class="item">
            <el-button size="mini">点赞数</el-button>
          </el-badge>
          <el-badge :value="props.value.statistics.download_count" :max="999" class="item" type="primary">
            <el-button size="mini">下载数</el-button>
          </el-badge>
        </p>
        <p class="some-info">
          <el-badge :value="props.value.statistics.play_count" :max="999" class="item" type="primary">
            <el-button size="mini">播放数</el-button>
          </el-badge>
          <el-badge :value="props.value.statistics.forward_count" :max="999" class="item" type="warning">
            <el-button size="mini">转发数</el-button>
          </el-badge>
          <el-badge :value="props.value.statistics.share_count" :max="999" class="item" type="warning">
            <el-button size="mini">分享数</el-button>
          </el-badge>
        </p>
        <p class="some-info">{{ props.value.info }}</p>
      </div>
    </vue-waterfall-easy>
  </div>
</template>

<script>
import { fetchList, videoDelete } from '@/api/DouyinVideo'
import vueWaterfallEasy from 'vue-waterfall-easy'

export default {
  name: 'ExportZip',
  components: {
    vueWaterfallEasy
  },
  data() {
    return {
      listQuery: {
        count: 10,
        cursor: 0
      },
      imgsArr: [],
      group: 0,
      has_more: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      if (this.has_more) {
        fetchList(this.listQuery).then(response => {
          this.listQuery.cursor++
          this.has_more = response.data.has_more
          response.data.list.map(item => {
            item['src'] = item.cover
            item['href'] = item.share_url
            item['info'] = item.title
            this.imgsArr = this.imgsArr.concat(item)
            this.group++
          })
        })
      } else {
        this.$refs.waterfall.waterfallOver()
        return
      }
    },
    deleteVideo(itemId) {
      const videoDeleteBody = { 'itemId': itemId }
      videoDelete(videoDeleteBody).then(response => {
        this.$router.push({ name: 'DouyinVideoManage' })
      })
    },
    createVideo() {
      this.$router.push({ name: 'DouyinVideoPost' })
    }
  }
}
</script>

<style>
  .some-info {
    padding-left: 15px;
  }
</style>
