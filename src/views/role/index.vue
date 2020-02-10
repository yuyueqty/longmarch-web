<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="filter-container clearfix">
        <el-input v-model="listQuery.fuzzySearch" clearable :placeholder="$t('roleInfo.roleName')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          {{ $t('table.search') }}
        </el-button>
        <el-button v-permission="['sys:role:create']" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          {{ $t('table.add') }}
        </el-button>
        <el-button v-permission="['sys:role:delete']" :disabled="batchDeleteButtonStatus" class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="handleDelete()">
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
        <el-table-column :label="$t('roleInfo.roleName')">
          <template slot-scope="scope">
            <span>{{ scope.row.roleName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('roleInfo.description')">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('roleInfo.userCount')">
          <template slot-scope="scope">
            <router-link :to="{ name: 'UserManage', query: {roleId: scope.row.id} }">
              <span><el-tag type="danger">{{ scope.row.userCount }}</el-tag></span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column v-if="checkPermission(['sys:role:update'])" :label="$t('roleInfo.status')" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="changeSwitch($event, scope.row.id)"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('roleInfo.status')" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | dictFirst(dictionary.style_dict)">
              <span>{{ scope.row.status | dictFirst(dictionary.status_dict) }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('roleInfo.createTime')" width="160px">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="checkPermission(['sys:role:update', 'sys:role:delete'])" fixed="right" :label="$t('table.actions')" align="center" width="300" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-permission="['sys:role:update']" class="filter-item" style="margin-left: 10px;" type="primary" @click="handleUpdate(row)">
              {{ $t('table.edit') }}
            </el-button>
            <el-button v-permission="['sys:role:update']" class="filter-item" style="margin-left: 10px;" type="primary" @click="handleAddUsers(row)">
              {{ $t('table.batchAddUser') }}
            </el-button>
            <el-button v-permission="['sys:role:delete']" class="filter-item" style="margin-left: 10px;" type="danger" @click="handleDelete(row)">
              {{ $t('table.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
    </el-card>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="80px" style="width: 500px; margin-left:40px;">
        <el-form-item :label="$t('roleInfo.roleName')" prop="roleName">
          <el-input v-model="temp.roleName" :disabled="dialogStatus==='update'" />
        </el-form-item>
        <el-form-item :label="$t('roleInfo.description')" prop="description">
          <el-input v-model="temp.description" />
        </el-form-item>
        <el-form-item :label="$t('roleInfo.status')">
          <el-select v-model="temp.status" class="filter-item">
            <el-option v-for="item in dictionary.status_dict" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('roleInfo.dataPerm')" prop="dataPerm">
          <el-radio-group v-model="temp.dataPerm">
            <el-tooltip :content="$t('roleInfo.oneUser')" placement="top">
              <el-radio-button :label="1">个人</el-radio-button>
            </el-tooltip>
            <el-tooltip :content="$t('roleInfo.moreUser')" placement="top">
              <el-radio-button :label="2">部门</el-radio-button>
            </el-tooltip>
            <el-tooltip :content="$t('roleInfo.allUser')" placement="top">
              <el-radio-button :label="3">全部</el-radio-button>
            </el-tooltip>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="deptSelected" :label="$t('roleInfo.deptList')">
          <el-cascader
            v-model="deptIds"
            clearable
            expand-trigger="hover"
            change-on-select
            :show-all-levels="false"
            :options="deptList"
            :props="{ value: 'id', label: 'deptName' }"
            @change="deptHandleChange"
          />
        </el-form-item>
        <el-form-item :label="$t('roleInfo.permsList')">
          <el-tree ref="tree" :data="rolePermsList" :check-strictly="checkStrictly" :props="{label: 'permissionName'}" show-checkbox node-key="id" :default-checked-keys="checkedKeys" class="permission-tree" />
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible_2">
      <el-form ref="dataForm" :rules="rules" :model="temp" style="width: 100%px;">
        <div style="text-align: center">
          <el-transfer
            v-model="checkedKeys"
            style="text-align: left; display: inline-block"
            filterable
            :left-default-checked="[]"
            :right-default-checked="[]"
            :render-content="renderFunc"
            :titles="['未选择用户', '已选择用户']"
            :button-texts="['到左边', '到右边']"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            :data="roleUserList"
            @change="handleChange"
          />
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible_2 = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="addUsers()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import checkPermission from '@/utils/permission'
import { fetchList, create, update, remove, showPerms, changeStatus, handleLoadRoleUsers, addRoleUsers, treeList } from '@/api/SysRole'
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
      renderFunc(h, option) {
        return <span>{ option.label }</span>
      },
      roleUserList: [],
      username: null,
      listQuery2: {
        roleId: 1,
        username: null
      },
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
        roleName: null,
        description: null,
        dataPerm: null,
        dataPermIds: null,
        status: null,
        userCount: 0,
        createTime: null
      },
      dialogFormVisible: false,
      dialogFormVisible_2: false,
      dialogStatus: 'create',
      textMap: {
        update: '编辑角色',
        create: '添加角色',
        addUsers: '添加角色用户'
      },
      rules: {
        roleName: [{ required: true, message: 'role name is required', trigger: 'blur' }]
      },
      defaultProps: {
        id: 'id',
        children: 'children',
        label: 'permissionName'
      },
      checkStrictly: false,
      rolePermsList: null,
      deptList: [],
      deptIds: null,
      checkedKeys: null // 记录选中节点的数组
    }
  },
  computed: {
    ...mapGetters(['dictionary']),
    batchDeleteButtonStatus() {
      return this.ids.length <= 0
    },
    deptSelected() {
      return this.temp.dataPerm && this.temp.dataPerm === 2
    }
  },
  created() {
    this.getList()
    this.getDeptList()
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
    getDeptList() {
      treeList().then(response => {
        this.deptList = response.data
      })
    },
    handleLoadRoleUsers() {
      this.listLoading = true
      this.roleUserList = []
      this.checkedKeys = []
      handleLoadRoleUsers(this.listQuery2).then(response => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].checked) {
            this.checkedKeys.push(response.data[i].userId)
          }
          this.roleUserList.push({
            key: response.data[i].userId,
            label: response.data[i].username
          })
        }
        this.listLoading = false
      })
    },
    handleChange(value) {
      this.checkedKeys = value
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
        status: 0,
        userCount: 0
      }
    },
    handleCreate() {
      showPerms(-1).then(response => {
        this.resetTemp()
        this.deptIds = []
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.checkStrictly = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
          this.checkedKeys = response.data.checkedKeys
          this.rolePermsList = response.data.permissionTree
          this.checkStrictly = false
          this.getDeptList()
        })
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const checkedHalfList = this.$refs.tree.getHalfCheckedKeys()
          this.temp.checkedKeys = this.$refs.tree.getCheckedKeys().concat(checkedHalfList)
          if (this.dataPerm !== 2) {
            this.temp.dataPermIds = ''
          } else {
            this.temp.dataPermIds = this.deptIds.join()
          }
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
      showPerms(row.id).then(response => {
        this.temp = Object.assign({}, row)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.checkStrictly = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
          this.checkedKeys = response.data.checkedKeys
          this.rolePermsList = response.data.permissionTree
          this.checkStrictly = false
          this.deptIds = this.temp.dataPermIds.split(',').map((id, index) => {
            return parseInt(id)
          })
          this.getDeptList()
        })
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          const checkedHalfList = this.$refs.tree.getHalfCheckedKeys()
          tempData.checkedKeys = this.$refs.tree.getCheckedKeys().concat(checkedHalfList)
          if (tempData.dataPerm !== 2) {
            tempData.dataPermIds = ''
          } else {
            tempData.dataPermIds = this.deptIds.join()
          }
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
    handleAddUsers(row) {
      this.temp = Object.assign({}, row)
      this.listQuery2.roleId = row.id
      this.handleLoadRoleUsers()
      this.dialogStatus = 'addUsers'
      this.dialogFormVisible_2 = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.checkStrictly = false
      })
    },
    addUsers() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addRoleUsers({ id: this.temp.id, checkedKeys: this.checkedKeys }).then(() => {
            this.getList()
            this.dialogFormVisible_2 = false
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
          h('span', null, '【删除角色】操作，是否继续? ')
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
    },
    changeSwitch($event, id) {
      const o = { id: id, status: $event }
      this.$confirm('【修改角色状态】操作，是否继续?', '提示', {
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
    }
  }
}
</script>

<style>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>
