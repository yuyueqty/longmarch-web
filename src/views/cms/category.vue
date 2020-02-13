<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col v-if="checkPermission(['cms:category:create', 'cms:category:update', 'cms:category:delete'])" :span="8">
        <el-card class="box-card">
          <div class="grid-content bg-purple">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-width="80px">
              <el-form-item :label="$t('categoryInfo.categoryName')" prop="categoryName">
                <el-input v-model="temp.categoryName" />
              </el-form-item>
              <el-form-item :label="$t('categoryInfo.upMenus')">
                <el-cascader
                  v-model="selectedPids"
                  clearable
                  expand-trigger="hover"
                  change-on-select
                  :options="list"
                  :props="{ value: 'id', label: 'categoryName' }"
                  @change="handleChange"
                />
              </el-form-item>
              <el-form-item :label="$t('categoryInfo.remark')" prop="remark">
                <el-input v-model="temp.remark" />
              </el-form-item>
              <el-form-item :label="$t('categoryInfo.icon')" prop="icon">
                <el-input v-model="temp.icon" />
              </el-form-item>
              <el-form-item :label="$t('categoryInfo.redirectUrl')" prop="redirectUrl">
                <el-input v-model="temp.redirectUrl" />
              </el-form-item>
              <el-form-item :label="$t('categoryInfo.status')">
                <el-radio-group v-model="temp.status">
                  <el-radio-button v-for="item in dictionary.status_dict" :key="item.value" :label="item.value">{{ item.label }}</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item :label="$t('categoryInfo.sort')" prop="sort">
                <el-input-number v-model="temp.sort" :min="1" :max="10000" @change="handleChange3" />
              </el-form-item>
            </el-form>
            <div>
              <el-button v-if="dialogStatus=='create'" v-permission="['cms:category:create']" type="primary" @click="createData">
                {{ $t('table.add') }}
              </el-button>
              <el-button v-else v-permission="['cms:category:update']" type="primary" @click="updateData(temp)">
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
              <el-table-column :label="$t('categoryInfo.categoryName')">
                <template slot-scope="scope">
                  <span>{{ scope.row.categoryName }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('categoryInfo.remark')">
                <template slot-scope="scope">
                  <span>{{ scope.row.remark }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('categoryInfo.status')" align="center">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.status | dictFirst(dictionary.style_dict)">
                    <span>{{ scope.row.status | dictFirst(dictionary.status_dict) }}</span>
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column v-if="checkPermission(['cms:category:create', 'cms:category:update', 'cms:category:delete'])" :label="$t('table.actions')" align="center" class-name="small-padding fixed-width" width="200px">
                <template slot-scope="{row}">
                  <el-button v-permission="['cms:category:create']" type="text" @click="handleCreateChildren(row)">
                    {{ $t('table.addChildren') }}
                  </el-button>
                  <el-button v-permission="['cms:category:update']" class="filter-item" style="margin-left: 10px;" type="text" @click="handleUpdate(row)">
                    {{ $t('table.edit') }}
                  </el-button>
                  <el-button v-permission="['cms:category:delete']" class="filter-item" style="margin-left: 10px;" type="text" @click="handleDelete(row)">
                    {{ $t('table.delete') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import checkPermission from '@/utils/permission'
import { treeList, create, update, remove, getPIds } from '@/api/Category'
import waves from '@/directive/waves'
import { mapGetters } from 'vuex'

export default {
  name: 'PermissionManage',
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
      list: [],
      listLoading: true,
      ids: [],
      dialogStatus: 'create',
      temp: {
        id: null,
        parentId: null,
        categoryName: null,
        redirectUrl: null,
        icon: null,
        sort: 1,
        status: 1,
        remark: null
      },
      rules: {
        categoryName: [{ required: true, message: '请填写分类名称', trigger: 'blur' }]
      },
      selectedPids: []
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
        sort: 1,
        status: 1,
        remark: null
      }
    },
    handleCreateChildren(row) {
      getPIds(row.id).then(response => {
        this.dialogStatus = 'create'
        this.resetTemp()
        this.selectedPids = response.data
        this.selectedPids.push(row.id)
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.parentId = this.selectedPids[this.selectedPids.length - 1]
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
      getPIds(row.id).then(response => {
        this.temp = Object.assign({}, row)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
          if (response.data.length === 1 && response.data[0] === row.id) {
            this.selectedPids = []
          } else {
            this.selectedPids = response.data
          }
        })
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.parentId = this.selectedPids[this.selectedPids.length - 1]
          update(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
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
    },
    handleDelete(row) {
      this.$confirm('【删除分类】操作，是否继续?', '提示', {
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
    handleChange3(value) {
      this.temp.sort = value
    }
  }
}
</script>
