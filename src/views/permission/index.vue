<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.fuzzySearch" :placeholder="$t('permissionInfo.permissionName')" style="width: 200px;" class="filter-item" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        {{ $t('table.search') }}
      </el-button> -->
      <el-button v-permission="['sys:permission:create']" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
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
      <el-table-column :label="$t('permissionInfo.permissionName')">
        <template slot-scope="scope">
          <span>{{ scope.row.permissionName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('permissionInfo.permissionString')">
        <template slot-scope="scope">
          <span>{{ scope.row.permissionString }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('permissionInfo.type')" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type | dictFirst(dictionary.style_dict)">
            <span>{{ scope.row.type | dictFirst(dictionary.perm_dict) }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('permissionInfo.status')" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | dictFirst(dictionary.style_dict)">
            <span>{{ scope.row.status | dictFirst(dictionary.status_dict) }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('permissionInfo.createTime')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width" width="200px">
        <template slot-scope="{row}">
          <el-button v-permission="['sys:permission:update']" class="filter-item" style="margin-left: 10px;" type="primary" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <el-button v-permission="['sys:permission:delete']" class="filter-item" style="margin-left: 10px;" type="danger" @click="handleDelete(row)">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="80px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('permissionInfo.permissionName')" prop="permissionName">
          <el-input v-model="temp.permissionName" :disabled="dialogStatus==='update'" />
        </el-form-item>
        <el-form-item :label="$t('permissionInfo.permissionString')" prop="permissionString">
          <el-input v-model="temp.permissionString" :disabled="dialogStatus==='update'" />
        </el-form-item>
        <el-form-item :label="$t('permissionInfo.description')" prop="description">
          <el-input v-model="temp.description" />
        </el-form-item>
        <el-form-item :label="$t('permissionInfo.type')">
          <el-select v-model="temp.type" class="filter-item">
            <el-option v-for="item in dictionary.perm_dict" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('permissionInfo.status')">
          <el-select v-model="temp.status" class="filter-item">
            <el-option v-for="item in dictionary.status_dict" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('permissionInfo.upMenus')">
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
import { treeList, create, update, remove, getPIds } from '@/api/SysPermission'
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
        update: '编辑权限',
        create: '添加权限'
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
        this.permsList = response.permsList
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
    },
    handleChange(value) {
      this.permsIds = value
    }
  }
}
</script>
