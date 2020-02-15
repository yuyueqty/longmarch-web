<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="filter-container clearfix">
        <el-input v-model="listQuery.tableName" clearable :placeholder="$t('tableInfo.tableName')" style="width: 200px;" class="filter-item" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          {{ $t('table.search') }}
        </el-button>
      </div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        highlight-current-row
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item :label="$t('tableInfo.engine')">
                <span>{{ props.row.engine }}</span>
              </el-form-item>
              <el-form-item :label="$t('tableInfo.encoding')">
                <span>{{ props.row.encoding }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column :label="$t('tableInfo.tableName')">
          <template slot-scope="scope">
            <span>{{ scope.row.tableName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableInfo.comment')">
          <template slot-scope="scope">
            <span>{{ scope.row.comment }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableInfo.createTime')">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="checkPermission(['sys:role:update', 'sys:role:delete'])" fixed="right" :label="$t('table.actions')" align="center" width="300" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-permission="['sys:role:update']" class="filter-item" style="margin-left: 10px;" type="primary" @click="$router.push({name:'GeneratorColumn',params:{tableName: row.tableName}})">
              {{ $t('table.edit') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
    </el-card>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import checkPermission from '@/utils/permission'
import { tableList } from '@/api/GeneratorApi'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'

export default {
  name: 'TableManage',
  components: { Pagination },
  directives: { waves, permission },
  data() {
    return {
      tableKey: 0,
      list: null,
      ids: [],
      total: 0,
      listLoading: true,
      listQuery: {
        current: 1,
        size: 10,
        tableName: null
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    checkPermission,
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      tableList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSelectionChange(val) {
      this.ids = val
    },
    handleUpdate(row) {
      alert(row.tableName)
    }
  }
}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

