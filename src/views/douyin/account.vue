<template>
  <div class="app-container">
    <el-row>
      <el-col v-for="item in list" :key="item.openId" :span="8" :offset="2">
        <el-card :body-style="{ padding: '0px' }">
          <img class="img_class" :src="item.avatar">
          <div style="padding: 20px;">
            <span>{{ item.nickname }}</span>
            <div class="bottom clearfix">
              <!-- <time class="time">{{ currentDate }}</time> -->
              <el-button type="text" class="button" @click="authorization">授权</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import openWindow from '@/utils/open-window'
import { fetchList, oauth } from '@/api/DouyinAccount'

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
    authorization() {
      oauth().then(response => {
        console.log(response.data)
        const url = response.data
        openWindow(url, '抖音授权', 800, 1000)
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
