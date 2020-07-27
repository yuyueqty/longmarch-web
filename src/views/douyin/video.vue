<template>
  <div class="app-container">
    <el-row>
      <el-col v-for="item in list" :key="item.itemId" :span="8">
        <el-card :body-style="{ padding: '10px' }">
          <img :src="item.cover" class="image">
          <div style="padding: 14px;">
            <span>{{ item.title }}</span>
            <div style="padding: 10px;">
              <el-tag
                :key="item.isReviewed"
                type="success"
                effect="dark"
              >
                {{ item.isReviewed?'审核通过':'审核失败' }}
              </el-tag>
              <el-tag
                :key="item.isTop"
                type="danger"
                effect="dark"
              >
                {{ item.isTop?'已置顶':'未置顶' }}
              </el-tag>
            </div>
            <div class="bottom clearfix">
              <el-badge :value="item.statistics.commentCount" class="item">
                <el-button size="small">评论数</el-button>
              </el-badge>
              <el-badge :value="item.statistics.diggCount" class="item">
                <el-button size="small">点赞数</el-button>
              </el-badge>
              <el-badge :value="item.statistics.downloadCount" class="item" type="primary">
                <el-button size="small">下载数</el-button>
              </el-badge>
              <el-badge :value="item.statistics.forwardCount" class="item" type="warning">
                <el-button size="small">转发数</el-button>
              </el-badge>
              <el-badge :value="item.statistics.playCount" class="item" type="warning">
                <el-button size="small">播放数</el-button>
              </el-badge>
              <el-badge :value="item.statistics.shareCount" class="item" type="warning">
                <el-button size="small">分享数</el-button>
              </el-badge>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from '@/api/DouyinVideo'

export default {
  name: 'ExportZip',
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      listQuery: {
        count: 10,
        cursor: 0
      }
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
    }
  }
}
</script>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }

  .item {
    margin-top: 10px;
    margin-right: 40px;
  }

  .el-col-8 {
    padding: 20px;
    /* height: 450px; */
  }
</style>
