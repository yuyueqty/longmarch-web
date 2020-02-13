<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="filter-container clearfix">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline">
          <el-form-item class="postInfo-container-item">
            <el-input v-model="listQuery.fuzzySearch" clearable :placeholder="$t('dictionaryInfo.label')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item class="postInfo-container-item">
            <el-select v-model="listQuery.code" clearable placeholder="请选择字典编码">
              <el-option
                v-for="item in dictionaryCodeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            {{ $t('table.search') }}
          </el-button>
        </el-form>
        <el-button v-permission="['sys:dictionary:create']" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          {{ $t('table.add') }}
        </el-button>
        <el-button v-permission="['sys:dictionary:delete']" :disabled="batchDeleteButtonStatus" class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="handleDelete()">
          {{ $t('table.batchDelete') }}
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
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column :label="$t('dictionaryInfo.code')" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('dictionaryInfo.label')">
          <template slot-scope="scope">
            <span>{{ scope.row.label }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('dictionaryInfo.value')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.value }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('dictionaryInfo.sort')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.sort }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('dictionaryInfo.description')" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="checkPermission(['sys:dictionary:update'])" :label="$t('dictionaryInfo.status')" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="changeSwitch($event, scope.row.id)"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('dictionaryInfo.status')" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | dictFirst(dictionary.style_dict)">
              <span>{{ scope.row.status | dictFirst(dictionary.status_dict) }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('dictionaryInfo.createTime')" width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="checkPermission(['sys:dictionary:update', 'sys:dictionary:delete'])" fixed="right" :label="$t('table.actions')" width="200px" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-permission="['sys:dictionary:update']" class="filter-item" style="margin-left: 10px;" type="primary" @click="handleUpdate(row)">
              {{ $t('table.edit') }}
            </el-button>
            <el-button v-permission="['sys:dictionary:delete']" class="filter-item" style="margin-left: 10px;" type="danger" @click="handleDelete(row)">
              {{ $t('table.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
    </el-card>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="80px" style="width: 500px; margin-left:50px;">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('dictionaryInfo.code')" prop="code">
              <el-input v-model="temp.code" :disabled="dialogStatus==='update'" />
            </el-form-item>
            <el-form-item :label="$t('dictionaryInfo.label')" prop="label">
              <el-input v-model="temp.label" />
            </el-form-item>
            <el-form-item :label="$t('dictionaryInfo.status')">
              <el-radio-group v-model="temp.status">
                <el-radio-button v-for="item in dictionary.status_dict" :key="item.value" :label="item.value">{{ item.label }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('dictionaryInfo.description')" prop="description">
              <el-input v-model="temp.description" />
            </el-form-item>
            <el-form-item :label="$t('dictionaryInfo.value')" prop="value">
              <el-input v-model="temp.value" />
            </el-form-item>
            <el-form-item :label="$t('dictionaryInfo.sort')" prop="sort">
              <el-input-number v-model="temp.sort" :min="1" :max="10000" @change="handleChange3" />
            </el-form-item>
          </el-col>
        </el-row>
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
import { fetchList, create, update, remove, loadDictionaryCode, changeStatus } from '@/api/SysDictionary'
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
      dictionaryCodeList: null,
      listQuery: {
        current: 1,
        size: 10,
        fuzzySearch: undefined,
        code: null
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
    this.loadDictionaryCode()
  },
  methods: {
    checkPermission,
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    loadDictionaryCode() {
      loadDictionaryCode().then(response => {
        this.dictionaryCodeList = response.data
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
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '【删除字典】操作，是否继续? ')
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
              instance.confirmButtonLoading = false
            })
          } else {
            done()
          }
        }
      }).then(action => {
        this.getList()
        this.$message({
          type: 'success',
          message: '操作完成'
        })
      })
    },
    handleSelectionChange(val) {
      this.ids = val
      console.log(this.ids)
    },
    changeSwitch($event, id) {
      const o = { id: id, status: $event }
      this.$confirm('【修改权限状态】操作，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        changeStatus(o).then(() => {
          this.forLoop(id, o.status)
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        })
      }).catch(() => {
        this.forLoop(id, o.status === 1 ? 0 : 1)
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },
    forLoop(id, status) {
      for (const v of this.list) {
        if (v.id === id) {
          v.status = status
          break
        }
      }
    },
    handleChange3(value) {
      this.temp.sort = value
    }
  }
}
</script>
