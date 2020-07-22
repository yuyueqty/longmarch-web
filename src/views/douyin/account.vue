<template>
  <div class="app-container">
    <el-row>
      <el-col v-for="item in list" :key="item.openId" :span="8" :offset="2">
        <el-card :body-style="{ padding: '0px' }">
          <el-avatar :size="60" icon="el-icon-user-solid">
            <img :src="item.avatar">
          </el-avatar>
          <div style="padding: 20px;">
            <span>{{ item.nickname }}</span>
            <div class="bottom clearfix">
              <!-- <time class="time">{{ currentDate }}</time> -->
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from '@/api/DouyinAccount'

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
</style>
