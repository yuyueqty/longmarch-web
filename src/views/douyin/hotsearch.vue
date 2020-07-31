<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div v-for="item in hot_sentences" :key="item.hot_level" class="text item">
              <el-link type="primary" @click="hotSearchVideos(item.sentence)">{{ item.sentence }} ({{ item.hot_level }})</el-link>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="18">
        <el-card class="box-card">
          <vue-waterfall-easy ref="waterfall" height="100vh" :imgs-arr="imgsArr" @scrollReachBottom="hotSearchVideos">
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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { hotsearchSentencesGet, hotsearchVideosGet } from '@/api/DouyinHotVideo'
import vueWaterfallEasy from 'vue-waterfall-easy'

export default {
  components: {
    vueWaterfallEasy
  },
  data() {
    return {
      hot_sentences: [],
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
    this.hotSearchSentences()
  },
  methods: {
    hotSearchSentences() {
      this.imgsArr = []
      hotsearchSentencesGet().then(response => {
        this.hot_sentences = response.data.list
      })
    },
    hotSearchVideos(hotSentence) {
      hotsearchVideosGet(hotSentence).then(response => {
        response.data.list.map(item => {
          item['src'] = item.cover
          item['href'] = item.share_url
          item['info'] = item.title
          this.imgsArr = this.imgsArr.concat(item)
          this.group++
        })
      })
    }
  }
}
</script>
