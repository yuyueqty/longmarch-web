<template>
  <div class="app-container">
    <div><el-button type="text" class="button" @click="authorization">添加抖音账号</el-button></div>
    <el-row>
      <el-col v-for="item in list" :key="item.openId" :span="8" :offset="2">
        <el-card :body-style="{ padding: '0px' }">
          <img class="img_class" :src="item.avatar">
          <div style="padding: 20px;">
            <el-tag v-if="item.defaultAccount===1" type="danger">默认</el-tag>
            <span>{{ item.nickname }}</span>
            <span>{{ item.location }}</span>
            <span>{{ item.genderStr }}</span>
            <span>粉丝数：{{ item.fansNum }}</span>
            <span>关注数：{{ item.followingNum }}</span>
            <span>点赞数：{{ item.likeNum }}</span>
            <span>评论数：{{ item.commentNum }}</span>
            <span>分享数：{{ item.shareNum }}</span>
            <span>主页访问数：{{ item.profileNum }}</span>
            <span>视频数：{{ item.videoNum }}</span>
            <span>播放数：{{ item.videoPlayNum }}</span>
            <div class="bottom clearfix">
              <!-- <time class="time">{{ currentDate }}</time> -->
              <el-button type="text" class="button" @click="refresh(item.openId)">刷新Token</el-button>
              <el-button type="text" class="button" @click="setDefault(item.openId)">设置默认</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import openWindow from '@/utils/open-window'
import { fetchList, oauth, refreshToken, setDefault } from '@/api/DouyinAccount'

export default {
  name: 'ExportZip',
  data() {
    return {
      list: [],
      listLoading: true,
      downloadLoading: false,
      filename: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    refresh(openId) {
      refreshToken(openId).then(response => {
        console.log(response.data)
      })
    },
    authorization() {
      oauth().then(response => {
        const url = response.data
        openWindow(url, '抖音授权', 800, 900, null)
      })
    },
    setDefault(openId) {
      setDefault(openId).then(response => {
        this.getList()
      })
    }
  }
}
</script>

<style>
.img_class {
  width: 100px;
  height: 100px;
  border-radius: 100px;
}
</style>
