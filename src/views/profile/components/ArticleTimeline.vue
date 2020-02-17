<template>
  <div class="block">
    <!-- <el-timeline>
      <el-timeline-item v-for="(item,index) of list" :key="index" :timestamp="item.createTime" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.summary }}</p>
          <img :src="item.imageUrl" class="image">
        </el-card>
      </el-timeline-item>
    </el-timeline> -->
    <el-col v-for="(item, index) in list" :key="index">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="item.imageUrl" class="image">
        <div style="padding: 14px;">
          <span>{{ item.title }}</span>
          <div class="bottom clearfix">
            <span>{{ currentDate }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import { fetchList } from '@/api/Article'

export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList({}).then(response => {
        this.list = response.data.records
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
    width: 50%;
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
