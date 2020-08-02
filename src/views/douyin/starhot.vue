<template>
  <div class="app-container">
    <el-card class="box-card">
      <!-- <aside>
        1. 使用说明
      </aside> -->
      <div slot="header" class="filter-container clearfix">
        <aside>
          {{ data.hot_list_description }} 达人热榜更新时间：{{ data.hot_list_update_timestamp | formatTime }}
        </aside>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="starHotList(1)">
          星图指数榜
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="starHotList(2)">
          涨粉指数榜
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="starHotList(3)">
          性价比指数榜
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="starHotList(4)">
          种草指数榜
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="starHotList(5)">
          精选指数榜
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="starHotList(6)">
          传播指数榜
        </el-button>
      </div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        highlight-current-row
        style="width: 100%;"
        @row-click="starAuthorScoreV2"
      >
        <el-table-column label="大人昵称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.nick_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="抖音号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.unique_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标签" align="center">
          <template slot-scope="scope">
            <el-tag
              v-for="item in scope.row.tags"
              :key="item"
              :type="item"
              effect="dark"
            >
              {{ item }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="粉丝数" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.follower }}</span>
          </template>
        </el-table-column>
        <el-table-column label="热榜排名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.rank }}</span>
          </template>
        </el-table-column>
        <el-table-column label="热榜指数" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.score }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="dialogTag">
      <aside>达人昵称：{{ star.nick_name }}，达人指数更新时间戳：{{ star.update_timestamp | formatTime }}</aside>
      <el-badge :value="star.growth_score" class="item">
        <el-button size="small">涨粉指数</el-button>
      </el-badge>
      <el-badge :value="star.spread_score" class="item">
        <el-button size="small">传播指数</el-button>
      </el-badge>
      <el-badge :value="star.cooperation_score" class="item" type="primary">
        <el-button size="small">合作指数</el-button>
      </el-badge>
      <el-badge :value="star.shop_score" class="item" type="warning">
        <el-button size="small">种草指数</el-button>
      </el-badge>
      <el-badge :value="star.star_score" class="item">
        <el-button size="small">星图指数</el-button>
      </el-badge>
      <el-badge :value="star.cp_score" class="item" type="primary">
        <el-button size="small">性价比指数</el-button>
      </el-badge>
    </el-dialog>
  </div>
</template>
<script>
import { starHotListGet, starAuthorScoreV2Get } from '@/api/DouyinStarHot'

export default {
  data() {
    return {
      chart: null,
      tableKey: 0,
      data: {},
      list: [],
      star: {},
      listLoading: true,
      dialogTag: false,
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
    this.starHotList(1)
  },
  methods: {
    starHotList(hotListType) {
      this.imgsArr = []
      starHotListGet(hotListType).then(response => {
        this.data = response.data
        this.list = response.data.list
        this.listLoading = false
      })
    },
    starAuthorScoreV2(row, event, column) {
      starAuthorScoreV2Get(row.unique_id).then(response => {
        this.dialogTag = true
        this.star = response.data
      })
    }
  }
}
</script>
<style>
  .item {
    padding-left: 10px;
  }
</style>
