<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-permission="['cms:category:create']" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
    </div>
    <el-table
      :data="list"
      border
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column :label="$t('categoryInfo.categoryName')">
        <template slot-scope="scope">
          <span>{{ scope.row.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('categoryInfo.icon')">
        <template slot-scope="scope">
          <span>{{ scope.row.icon }}</span>
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
      <el-table-column :label="$t('categoryInfo.createTime')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width" width="200px">
        <template slot-scope="{row}">
          <el-button v-permission="['cms:category:update']" class="filter-item" style="margin-left: 10px;" type="primary" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <el-button v-permission="['cms:category:delete']" class="filter-item" style="margin-left: 10px;" type="danger" @click="handleDelete(row)">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="80px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('categoryInfo.categoryName')" prop="categoryName">
          <el-input v-model="temp.categoryName" :disabled="dialogStatus==='update'" />
        </el-form-item>
        <el-form-item :label="$t('categoryInfo.icon')" prop="icon">
          <el-input v-model="temp.icon" :disabled="dialogStatus==='update'" />
        </el-form-item>
        <el-form-item :label="$t('categoryInfo.remark')" prop="remark">
          <el-input v-model="temp.remark" />
        </el-form-item>
        <el-form-item :label="$t('categoryInfo.status')">
          <el-select v-model="temp.status" class="filter-item">
            <el-option v-for="item in dictionary.status_dict" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('categoryInfo.upMenus')">
          <el-cascader
            v-model="permsIds"
            clearable
            expand-trigger="hover"
            change-on-select
            :options="permsList"
            :props="{ value: 'id', label: 'permissionName' }"
            @change="handleChange"
          />
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
        parentId: null,
        permissionName: null,
        permissionString: null,
        description: null,
        type: null,
        status: null,
        createTime: null
      },
      dialogFormVisible: false,
      dialogStatus: 'create',
      textMap: {
        update: '编辑分类',
        create: '添加分类'
      },
      rules: {
        permissionName: [{ required: true, message: 'permissionName name is required', trigger: 'blur' }],
        permissionString: [{ required: true, message: 'permissionString name is required', trigger: 'blur' }]
      },
      permsIds: [7],
      permsList: []
    }
  },
  computed: {
    ...mapGetters(['dictionary'])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      treeList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        id: null,
        parentId: null,
        permissionName: null,
        permissionString: null,
        description: null,
        type: null,
        status: null,
        createTime: null
      }
    },
    handleCreate() {
      this.resetTemp()
      this.permsIds = []
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.parentId = this.permsIds[this.permsIds.length - 1]
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
        this.permsIds = []
        this.temp = Object.assign({}, row)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
          this.permsIds = response.data
        })
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.parentId = this.permsIds[this.permsIds.length - 1]
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
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '【删除权限】操作，是否继续? ')
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
    handleSelectionChange(val) {
      this.ids = val
    },
    handleChange(value) {
      this.permsIds = value
    }
  }
}
</script>
