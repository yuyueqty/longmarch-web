<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="filter-container clearfix">
        <el-tag type="danger">
          {{ $t('tableInfo.tableName') }}：{{ tableName }}
        </el-tag>
        <el-button class="filter-item" style="margin-left: 50%;" @click="$router.push({name:'GeneratorTable'})">
          {{ $t('table.goBack') }}<i class="el-icon-arrow-right" />
        </el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column :label="$t('columnInfo.columnName')">
          <template slot-scope="scope">
            <span>{{ scope.row.columnName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('columnInfo.columnType')">
          <template slot-scope="scope">
            <span>{{ scope.row.columnType }}</span>
          </template>
        </el-table-column>
        <!-- <el-form-item label="字段描述" prop="username">
          <el-input v-model="temp.username" />
        </el-form-item> -->
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { tableColumns } from '@/api/GeneratorApi'

export default {
  name: 'ColumnManage',
  data() {
    return {
      list: [],
      tableName: null
    }
  },
  created() {
    this.tableName = this.$route.params.tableName
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      tableColumns(this.tableName).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>

<style>

</style>

