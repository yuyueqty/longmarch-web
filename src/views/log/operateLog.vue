<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.fuzzySearch" :placeholder="$t('operateLogInfo.userName')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column :label="$t('operateLogInfo.userName')" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('operateLogInfo.busType')" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.busType }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('operateLogInfo.operateType')" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.operateType }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('operateLogInfo.operateDetail')">
        <template slot-scope="scope">
          <span>{{ scope.row.operateDetail }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('operateLogInfo.operateTime')" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.operateTime }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('table.actions')" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-permission="['sys:operatelog:show']" class="filter-item" style="margin-left: 10px;" type="primary" @click="handleUpdate(row)">
            {{ $t('table.show') }}
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('operateLogInfo.roleName')" prop="roleName">
          <el-input v-model="temp.roleName" :disabled="dialogStatus==='update'" />
        </el-form-item>
        <el-form-item :label="$t('operateLogInfo.description')" prop="description">
          <el-input v-model="temp.description" />
        </el-form-item>
        <el-form-item :label="$t('operateLogInfo.status')">
          <el-select v-model="temp.status" class="filter-item">
            <el-option v-for="item in dictionary.status_dict" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
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
import { fetchList, create, update, remove } from '@/api/SysOperateLog'
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
        fuzzySearch: undefined,
        sort: '+id'
      },
      ids: [],
      temp: {
        id: null,
        code: null,
        value: null,
        label: null,
        sort: null,
        description: null,
        status: null,
        createTime: null
      },
      dialogFormVisible: false,
      dialogStatus: 'create',
      textMap: {
        update: '编辑字典',
        create: '添加字典'
      },
      rules: {
        code: [{ required: true, message: 'code is required', trigger: 'blur' }]
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
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
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
        username: null,
        status: null
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
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
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
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
      const _ids = row !== undefined ? [row.id] : this.ids.map(obj => {
        return obj.id
      })
      remove(_ids).then(() => {
        this.getList()
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleSelectionChange(val) {
      this.ids = val
      console.log(this.ids)
    }
  }
}
</script>
