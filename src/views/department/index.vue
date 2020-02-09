<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col v-if="checkPermission(['sys:department:create', 'sys:department:update', 'sys:department:delete'])" :span="8">
        <el-card class="box-card">
          <div class="grid-content bg-purple">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-width="80px">
              <el-form-item :label="$t('departmentInfo.depName')" prop="depName">
                <el-input v-model="temp.depName" />
              </el-form-item>
              <el-form-item :label="$t('departmentInfo.upMenus')">
                <el-cascader
                  v-model="selectedPids"
                  clearable
                  expand-trigger="hover"
                  change-on-select
                  :show-all-levels="false"
                  :options="list"
                  :props="{ value: 'id', label: 'depName' }"
                  @change="handleChange"
                />
              </el-form-item>
              <el-form-item :label="$t('departmentInfo.sort')" prop="sort">
                <!-- <el-input v-model="temp.sort" /> -->
                <el-input-number v-model="num" :min="1" :max="10000" @change="handleChange3" />
              </el-form-item>
            </el-form>
            <div>
              <el-button v-if="dialogStatus=='create'" v-permission="['sys:department:create']" type="primary" @click="createData">
                {{ $t('table.add') }}
              </el-button>
              <el-button v-else v-permission="['sys:department:update']" type="primary" @click="updateData(temp)">
                {{ $t('table.edit') }}
              </el-button>
              <el-button type="warning" @click="resetForm()">
                {{ $t('table.reset') }}
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card">
          <div class="grid-content bg-purple">
            <el-table :data="list" style="width: 100%;margin-bottom: 20px;" row-key="id">
              <el-table-column :label="$t('departmentInfo.depName')" width="200px">
                <template slot-scope="scope">
                  <span>{{ scope.row.depName }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('departmentInfo.userCount')">
                <template slot-scope="scope">
                  <span><el-tag type="danger">{{ scope.row.userCount }}</el-tag></span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('departmentInfo.sort')">
                <template slot-scope="scope">
                  <span>{{ scope.row.sort }}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="checkPermission(['sys:department:create', 'sys:department:update', 'sys:department:delete'])" :label="$t('table.actions')" align="center" class-name="small-padding fixed-width" width="200px">
                <template slot-scope="{row}">
                  <!-- <el-button v-permission="['sys:department:update']" class="filter-item" style="margin-left: 10px;" type="text" @click="handleAddUsers(row)">
                    {{ $t('table.batchAddUser') }}
                  </el-button> -->
                  <el-button v-permission="['sys:department:create']" class="filter-item" style="margin-left: 10px;" type="text" @click="handleCreateChildren(row)">
                    {{ $t('table.addChildren') }}
                  </el-button>
                  <el-button v-permission="['sys:department:update']" class="filter-item" style="margin-left: 10px;" type="text" @click="handleUpdate(row)">
                    {{ $t('table.edit') }}
                  </el-button>
                  <el-button v-permission="['sys:department:delete']" class="filter-item" style="margin-left: 10px;" type="text" @click="handleDelete(row)">
                    {{ $t('table.delete') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
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
            :data="departmentUserList"
            @change="handleChange2"
          />
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
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
import { treeList, create, update, remove, handleLoadDepartmentUsers, addDepartmentUsers } from '@/api/SysDepartment'
import waves from '@/directive/waves'
import { mapGetters } from 'vuex'

export default {
  name: 'DepartmentManage',
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
      departmentUserList: [],
      checkedKeys: null,
      listQuery: {
        depId: null
      },
      tableKey: 0,
      list: [],
      listLoading: true,
      dialogFormVisible: false,
      ids: [],
      dialogStatus: 'addUsers',
      textMap: {
        addUsers: '添加部门用户'
      },
      temp: {
        id: null,
        parentId: null,
        depName: null
      },
      rules: {
        depName: [{ required: true, message: '请填写部门名称', trigger: 'blur' }]
      },
      selectedPids: [],
      num: 0
    }
  },
  computed: {
    ...mapGetters(['dictionary'])
  },
  created() {
    this.getList()
  },
  methods: {
    checkPermission,
    getList() {
      this.listLoading = true
      treeList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    resetForm() {
      this.dialogStatus = 'create'
      this.selectedPids = []
      this.resetTemp()
    },
    resetTemp() {
      this.temp = {
        id: null,
        parentId: null,
        categoryName: null,
        redirectUrl: null,
        icon: null,
        sort: null,
        status: null,
        remark: null
      }
    },
    handleCreateChildren(row) {
      this.resetForm()
      this.selectedPids = row.pids.split(',').map((id, index) => {
        return parseInt(id)
      })
      this.selectedPids.push(row.id)
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.parentIds = this.selectedPids.join()
          this.temp.parentId = this.selectedPids[this.selectedPids.length - 1]
          this.temp.sort = this.num
          create(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.getList()
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
      this.selectedPids = row.pids.split(',').map((id, index) => {
        return parseInt(id)
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.parentIds = this.selectedPids.join()
          tempData.parentId = this.selectedPids[this.selectedPids.length - 1]
          tempData.sort = this.num
          update(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.getList()
            // this.dialogFormVisible = false
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
      this.$confirm('【删除部门】操作，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const _ids = row !== undefined ? [row.id] : this.ids.map(obj => {
          return obj.id
        })
        remove(_ids).then(() => {
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSelectionChange(val) {
      this.ids = val
    },
    handleChange(value) {
      this.selectedPids = value
    },
    handleChange2(value) {
      this.checkedKeys = value
    },
    handleChange3(value) {
      this.num = value
    },
    handleLoadDepartmentUsers() {
      this.listLoading = true
      this.departmentUserList = []
      this.checkedKeys = []
      handleLoadDepartmentUsers(this.listQuery).then(response => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].checked) {
            this.checkedKeys.push(response.data[i].userId)
          }
          this.departmentUserList.push({
            key: response.data[i].userId,
            label: response.data[i].username
          })
        }
        this.listLoading = false
      })
    },
    handleAddUsers(row) {
      this.temp = Object.assign({}, row)
      this.listQuery.depId = row.id
      this.handleLoadDepartmentUsers()
      this.dialogStatus = 'addUsers'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.checkStrictly = false
      })
    },
    addUsers() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addDepartmentUsers({ depId: this.temp.id, checkedKeys: this.checkedKeys }).then(() => {
            this.getList()
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
    }
  }
}
</script>
