<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="filter-container clearfix">
        <el-input v-model="listQuery.fuzzySearch" :placeholder="$t('jobInfo.beanName')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          {{ $t('table.search') }}
        </el-button>
        <el-button class="filter-item" style="margin-left: 50%;" @click="$router.push({name:'ScheduleManage'})">
          {{ $t('table.goBack') }}<i class="el-icon-arrow-right" />
        </el-button>
      </div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item :label="$t('jobInfo.startTime')">
                <span>{{ props.row.startTime }}</span>
              </el-form-item>
              <el-form-item :label="$t('jobInfo.endTime')">
                <span>{{ props.row.endTime }}</span>
              </el-form-item>
              <el-form-item :label="$t('jobInfo.error')">
                <span>{{ props.row.error }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column :label="$t('jobInfo.beanName')">
          <template slot-scope="scope">
            <span>{{ scope.row.beanName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('jobInfo.methodName')">
          <template slot-scope="scope">
            <span>{{ scope.row.methodName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('jobInfo.params')">
          <template slot-scope="scope">
            <span>{{ scope.row.params }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('jobInfo.status')" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | dictFirst(dictionary.style_dict)">
              <span>{{ scope.row.status | dictFirst(dictionary.job_result_status_dict) }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('jobInfo.executeTime')">
          <template slot-scope="scope">
            <span>{{ scope.row.executeTime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
    </el-card>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import { searchLog } from '@/api/JobApi'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'

export default {
  name: 'RoleManage',
  components: { Pagination },
  directives: { waves, permission },
  filters: {
    dictFirst(status, dict) {
      const statusMap = {}
      dict.forEach(item => {
        statusMap[item.value] = item.label
      })
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        current: 1,
        size: 10,
        jobId: null,
        fuzzySearch: undefined
      }
    }
  },
  computed: {
    ...mapGetters(['dictionary'])
  },
  created() {
    this.listQuery.jobId = this.id = this.$route.params.jobId
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      searchLog(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
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

