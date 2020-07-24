<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="Author" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.openId }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Readings" align="center">
        <template slot-scope="scope">
          <img style="margin-top: -10px;border-radius: 100px;width: 50px; height: 50px;" :src="scope.row.avatar" class="avatar">
        </template>
      </el-table-column>
      <el-table-column label="Readings" align="center">
        <template slot-scope="scope">
          {{ scope.row.country }}
        </template>
      </el-table-column>
      <el-table-column label="Readings" align="center">
        <template slot-scope="scope">
          {{ scope.row.province }}
        </template>
      </el-table-column>
      <el-table-column label="Readings" align="center">
        <template slot-scope="scope">
          {{ scope.row.city }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Date">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.gender }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/DouyinFans'

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
