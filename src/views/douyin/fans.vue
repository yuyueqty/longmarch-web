<template>
  <div class="app-container">
    <el-button type="primary" @click="firstPage()">第一页</el-button>
    <el-button type="primary" @click="nextPage()">下一页</el-button>
    <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="nickname">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="open_id" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.open_id }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="avatar" align="center">
        <template slot-scope="scope">
          <img style="margin-top: -10px;border-radius: 100px;width: 50px; height: 50px;" :src="scope.row.avatar" class="avatar">
        </template>
      </el-table-column>
      <el-table-column label="country" align="center">
        <template slot-scope="scope">
          {{ scope.row.country }}
        </template>
      </el-table-column>
      <el-table-column label="province" align="center">
        <template slot-scope="scope">
          {{ scope.row.province }}
        </template>
      </el-table-column>
      <el-table-column label="city" align="center">
        <template slot-scope="scope">
          {{ scope.row.city }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="gender">
        <template slot-scope="scope">
          <span>{{ scope.row.gender | genderFilter(scope.row.gender) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="firstPage()">第一页</el-button>
    <el-button type="primary" @click="nextPage()">下一页</el-button>
  </div>
</template>

<script>
import { fetchList } from '@/api/DouyinFans'

export default {
  name: 'ExportZip',
  filters: {
    genderFilter(gender) {
      if (gender === 1) {
        return '男'
      } else if (gender === 2) {
        return '女'
      } else {
        return '未知'
      }
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      hasMore: false,
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
        this.list = response.data.list
        this.hasMore = response.data.has_more
        this.listQuery.cursor = response.data.cursor
        this.listLoading = false
      })
    },
    firstPage() {
      this.listQuery.cursor = 0
      this.getList()
    },
    nextPage() {
      if (this.hasMore) {
        this.getList()
      }
    }
  }
}
</script>
