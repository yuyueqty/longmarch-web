<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="filter-container clearfix">
        <el-input v-model="listQuery.fuzzySearch" clearable :placeholder="$t('jobInfo.beanName')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          {{ $t('table.search') }}
        </el-button>
        <el-button v-permission="['job:schedule:create']" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          {{ $t('table.add') }}
        </el-button>
        <el-button v-permission="['job:schedule:delete']" :disabled="batchDeleteButtonStatus" class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="handleDelete()">
          {{ $t('table.batchDelete') }}
        </el-button>
        <el-button v-permission="['job:schedule:run']" :disabled="batchDeleteButtonStatus" class="filter-item" style="margin-left: 10px;" type="success" @click="handleRun()">
          {{ $t('table.batchRun') }}
        </el-button>
        <el-button v-permission="['job:schedule:pause']" :disabled="batchDeleteButtonStatus" class="filter-item" style="margin-left: 10px;" type="info" @click="handlePause()">
          {{ $t('table.batchPause') }}
        </el-button>
        <el-button v-permission="['job:schedule:resume']" :disabled="batchDeleteButtonStatus" class="filter-item" style="margin-left: 10px;" type="warning" @click="handleResume()">
          {{ $t('table.batchResume') }}
        </el-button>
        <el-button v-permission="['job:schedule:reset']" :disabled="batchDeleteButtonStatus" class="filter-item" style="margin-left: 10px;" type="primary" @click="handleReset()">
          {{ $t('table.batchReset') }}
        </el-button>
      </div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        highlight-current-row
        style="width: 100%;"
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item :label="$t('jobInfo.beanName')">
                <span>{{ props.row.beanName }}</span>
              </el-form-item>
              <el-form-item :label="$t('jobInfo.methodName')">
                <span>{{ props.row.methodName }}</span>
              </el-form-item>
              <el-form-item :label="$t('jobInfo.params')">
                <span>{{ props.row.params }}</span>
              </el-form-item>
              <el-form-item :label="$t('jobInfo.count')">
                <span>{{ props.row.count }}</span>
              </el-form-item>
              <el-form-item :label="$t('jobInfo.cronExpression')">
                <span>{{ props.row.cronExpression }}</span>
              </el-form-item>
              <el-form-item :label="$t('jobInfo.createTime')">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column :label="$t('jobInfo.remark')">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('jobInfo.status')" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | dictFirst(dictionary.style_dict)">
              <span>{{ scope.row.status | dictFirst(dictionary.job_status_dict) }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="checkPermission(['job:schedule:update', 'job:schedule:delete', 'job:schedule:run', 'job:schedule:pause', 'job:schedule:resume', 'job:schedule:reset', 'job:log:show'])" :label="$t('table.actions')" width="600px" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-permission="['job:schedule:update']" class="filter-item" style="margin-left: 10px;" type="primary" @click="handleUpdate(row)">
              {{ $t('table.edit') }}
            </el-button>
            <el-button v-permission="['job:schedule:delete']" class="filter-item" style="margin-left: 10px;" type="danger" @click="handleDelete(row)">
              {{ $t('table.delete') }}
            </el-button>
            <el-button v-permission="['job:schedule:run']" class="filter-item" style="margin-left: 10px;" type="success" @click="handleRun(row)">
              {{ $t('table.jobRun') }}
            </el-button>
            <el-button v-if="row.status" v-permission="['job:schedule:pause']" class="filter-item" style="margin-left: 10px;" type="info" @click="handlePause(row)">
              {{ $t('table.jobPause') }}
            </el-button>
            <el-button v-if="!row.status" v-permission="['job:schedule:resume']" class="filter-item" style="margin-left: 10px;" type="warning" @click="handleResume(row)">
              {{ $t('table.jobResume') }}
            </el-button>
            <el-button v-permission="['job:schedule:reset']" class="filter-item" style="margin-left: 10px;" type="primary" @click="handleReset(row)">
              {{ $t('table.reset') }}
            </el-button>
            <el-button v-permission="['job:log:show']" class="filter-item" style="margin-left: 10px;" type="danger" @click="handleJobLog(row)">
              {{ $t('table.jobLog') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
    </el-card>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="80px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('jobInfo.beanName')" prop="beanName">
          <el-input v-model="temp.beanName" :disabled="dialogStatus==='update'" />
        </el-form-item>
        <el-form-item :label="$t('jobInfo.methodName')" prop="methodName">
          <el-input v-model="temp.methodName" />
        </el-form-item>
        <el-form-item :label="$t('jobInfo.params')" prop="params">
          <el-input v-model="temp.params" />
        </el-form-item>
        <el-form-item :label="$t('jobInfo.cronExpression')" prop="cronExpression">
          <el-input v-model="temp.cronExpression" />
        </el-form-item>
        <el-form-item :label="$t('jobInfo.remark')" prop="remark">
          <el-input v-model="temp.remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import checkPermission from '@/utils/permission'
import { searchSchedule, create, update, remove, run, resume, pause, reset } from '@/api/JobApi'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'

export default {
  name: 'RoleManage',
  components: { Pagination },
  directives: { waves, permission },
  filters: {
    dictFirst(status, dict) {
      const _status = status === true ? 1 : 0
      const statusMap = {}
      dict.forEach(item => {
        statusMap[item.value] = item.label
      })
      return statusMap[_status]
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
        fuzzySearch: undefined
      },
      ids: [],
      temp: {
        id: null,
        beanName: null,
        methodName: null,
        params: null,
        cronExpression: null,
        count: 0,
        status: 0,
        remark: null
      },
      dialogFormVisible: false,
      dialogStatus: 'create',
      textMap: {
        update: '编辑任务',
        create: '添加任务'
      },
      rules: {
        beanName: [{ required: true, message: 'bean name is required', trigger: 'blur' }],
        methodName: [{ required: true, message: 'method name is required', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['dictionary']),
    batchDeleteButtonStatus() {
      return this.ids.length <= 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    checkPermission,
    getList() {
      this.listLoading = true
      searchSchedule(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: null,
        beanName: null,
        methodName: null,
        params: null,
        cronExpression: null,
        count: 0,
        status: 0,
        remark: null
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.checkStrictly = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.checkStrictly = false
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          create(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.checkStrictly = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.checkStrictly = false
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          update(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '【删除任务】操作，是否继续? ')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            const _ids = row !== undefined ? [row.id] : this.ids.map(obj => {
              return obj.id
            })
            remove(_ids).then(() => {
              done()
              this.getList()
              instance.confirmButtonLoading = false
            })
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'success',
          message: '操作完成'
        })
      })
    },
    handleRun(row) {
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '【立即执行任务】操作，是否继续? ')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            const _ids = row !== undefined ? [row.id] : this.ids.map(obj => {
              return obj.id
            })
            run(_ids).then(() => {
              done()
              this.getList()
              instance.confirmButtonLoading = false
            })
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'success',
          message: '操作完成'
        })
      })
    },
    handlePause(row) {
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '【暂停任务】操作，是否继续? ')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            const _ids = row !== undefined ? [row.id] : this.ids.map(obj => {
              return obj.id
            })
            pause(_ids).then(() => {
              done()
              this.getList()
              instance.confirmButtonLoading = false
            })
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'success',
          message: '操作完成'
        })
      })
    },
    handleReset(row) {
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '【重置任务】操作，是否继续? ')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            const _ids = row !== undefined ? [row.id] : this.ids.map(obj => {
              return obj.id
            })
            reset(_ids).then(() => {
              done()
              this.getList()
              instance.confirmButtonLoading = false
            })
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'success',
          message: '操作完成'
        })
      })
    },
    handleResume(row) {
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '【恢复任务】操作，是否继续? ')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            const _ids = row !== undefined ? [row.id] : this.ids.map(obj => {
              return obj.id
            })
            resume(_ids).then(() => {
              done()
              this.getList()
              instance.confirmButtonLoading = false
            })
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'success',
          message: '操作完成'
        })
      })
    },
    handleJobLog(row) {
      this.$router.push({ name: 'JoblogManage', query: { jobId: row.id }})
    },
    handleSelectionChange(val) {
      this.ids = val
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
