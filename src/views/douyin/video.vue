<template>
  <div class="app-container">
    <vue-waterfall-easy ref="waterfall" height="150vh" :imgs-arr="imgsArr" @scrollReachBottom="getList">
      <div slot-scope="props" class="img-info">
        <p class="some-info">
          <el-tag effect="dark">{{ props.value.isReviewed?'已审核':'未审核' }}</el-tag>
          <el-tag effect="dark" type="success">{{ props.value.isTop?'已置顶':'未置顶' }}</el-tag>
          <el-button type="danger" icon="el-icon-delete" circle @click.stop="deleteVideo(props.value.itemId)" />
        </p>
        <p class="some-info">
          <el-badge :value="props.value.statistics.commentCount" :max="999" class="item">
            <el-button size="mini">评论数</el-button>
          </el-badge>
          <el-badge :value="props.value.statistics.diggCount" :max="999" class="item">
            <el-button size="mini">点赞数</el-button>
          </el-badge>
          <el-badge :value="props.value.statistics.downloadCount" :max="999" class="item" type="primary">
            <el-button size="mini">下载数</el-button>
          </el-badge>
        </p>
        <p class="some-info">
          <el-badge :value="props.value.statistics.playCount" :max="999" class="item" type="primary">
            <el-button size="mini">播放数</el-button>
          </el-badge>
          <el-badge :value="props.value.statistics.forwardCount" :max="999" class="item" type="warning">
            <el-button size="mini">转发数</el-button>
          </el-badge>
          <el-badge :value="props.value.statistics.shareCount" :max="999" class="item" type="warning">
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
      group: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList(this.listQuery).then(response => {
        if (response.data != null) {
          this.listQuery.cursor++
          response.data.map(item => {
            item['src'] = item.cover
            item['href'] = item.shareUrl
            item['info'] = item.title
            this.imgsArr = this.imgsArr.concat(item)
            this.group++
          })
        } else {
          this.$refs.waterfall.waterfallOver()
          return
        }
      })
    },
    deleteVideo(itemId) {
      const videoDeleteBody = { 'itemId': itemId }
      videoDelete(videoDeleteBody).then(response => {
        this.getList()
      })
    }
  }
}
</script>

<style>
  .some-info {
    padding-left: 15px;
  }
</style>
