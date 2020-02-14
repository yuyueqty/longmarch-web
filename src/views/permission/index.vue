<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="filter-container clearfix">
        <el-button v-permission="['sys:permission:create']" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          {{ $t('table.add') }}
        </el-button>
      </div>
      <el-table
        :data="list"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column :label="$t('permissionInfo.permissionName')" width="160px">
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
        <el-table-column :label="$t('routeInfo.icon')" align="center">
          <template slot-scope="scope">
            <span><svg-icon :icon-class="scope.row.icon" /></span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('routeInfo.sort')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.sort }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="checkPermission(['sys:permission:update'])" :label="$t('permissionInfo.status')" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="changeSwitch($event, scope.row.id)"
            />
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('permissionInfo.status')" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | dictFirst(dictionary.style_dict)">
              <span>{{ scope.row.status | dictFirst(dictionary.status_dict) }}</span>
            </el-tag>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('permissionInfo.createTime')" align="center" width="160px">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="checkPermission(['sys:permission:update', 'sys:permission:delete'])" fixed="right" :label="$t('table.actions')" align="center" class-name="small-padding fixed-width" width="200px">
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
    </el-card>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="80px" style="width: 560px; margin-left:15px;">
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
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('permissionInfo.permissionName')" prop="permissionName">
              <el-input v-model="temp.permissionName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('permissionInfo.permissionString')" prop="permissionString">
              <el-input v-model="temp.permissionString" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="14">
            <el-form-item :label="$t('permissionInfo.type')">
              <el-radio-group v-model="temp.type">
                <el-radio-button v-for="item in dictionary.perm_dict" :key="item.value" :label="item.value">{{ item.label }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="$t('permissionInfo.status')">
              <el-radio-group v-model="temp.status">
                <el-radio-button v-for="item in dictionary.status_dict" :key="item.value" :label="item.value">{{ item.label }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-if="temp.type !== 2">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('routeInfo.hidden')" prop="hidden">
                <el-radio-group v-model="temp.hidden">
                  <el-radio-button v-for="item in dictionary.hidden_dict" :key="item.value" :label="item.value">{{ item.label }}</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('routeInfo.cache')" prop="cache">
                <el-radio-group v-model="temp.cache">
                  <el-radio-button v-for="item in dictionary.cache_dict" :key="item.value" :label="item.value">{{ item.label }}</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item :label="$t('routeInfo.path')" prop="path">
                <el-input v-model="temp.path" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('routeInfo.title')" prop="title">
                <el-input v-model="temp.title" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('routeInfo.icon')" prop="icon">
                <el-input v-model="temp.icon" placeholder="请输入内容">
                  <template slot="prepend">
                    <el-button @click="centerDialogVisible = true">
                      <svg-icon :icon-class="temp.icon?temp.icon:'search'" />
                    </el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-dialog
            width="80%"
            title="Icons"
            :visible.sync="centerDialogVisible"
            append-to-body
          >
            <div class="icons-container">
              <el-tabs type="border-card">
                <el-tab-pane label="Icons">
                  <div v-for="item of svgIcons" :key="item" @click="handleClipboard(generateIconCode(item),$event)">
                    <el-tooltip placement="top">
                      <div slot="content">
                        {{ generateIconCode(item) }}
                      </div>
                      <div class="icon-item">
                        <svg-icon :icon-class="item" class-name="disabled" />
                        <span>{{ item }}</span>
                      </div>
                    </el-tooltip>
                  </div>
                </el-tab-pane>
                <!-- <el-tab-pane label="Element-UI Icons">
                  <div v-for="item of elementIcons" :key="item" @click="handleClipboard(generateElementIconCode(item),$event)">
                    <el-tooltip placement="top">
                      <div slot="content">
                        {{ generateElementIconCode(item) }}
                      </div>
                      <div class="icon-item">
                        <i :class="'el-icon-' + item" />
                        <span>{{ item }}</span>
                      </div>
                    </el-tooltip>
                  </div>
                </el-tab-pane> -->
              </el-tabs>
            </div>
          </el-dialog>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('routeInfo.name')" prop="name">
                <el-input v-model="temp.name" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('routeInfo.component')" prop="component">
                <el-input v-model="temp.component" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('routeInfo.redirect')" prop="redirect">
                <el-input v-model="temp.redirect" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('routeInfo.sort')" prop="sort">
                <el-input-number v-model="temp.sort" :min="1" :max="10000" @change="handleChange3" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
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
import { treeList, create, update, remove, changeStatus } from '@/api/SysPermission'
import waves from '@/directive/waves'
import { mapGetters } from 'vuex'
import clipboard from '@/utils/clipboard'
import svgIcons from './svg-icons'
import elementIcons from './element-icons'

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
      num: 0,
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
      centerDialogVisible: false,
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
      permsList: [],
      svgIcons,
      elementIcons
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
        this.list = response.data.permissionTrees
        this.permsList = response.data.permsList
        this.listLoading = false
      })
    },
    resetTemp() {
      this.temp = {
        id: null,
        parentId: 0,
        permissionName: null,
        permissionString: null,
        description: null,
        type: 1,
        status: 1,
        hidden: 0,
        cache: 1,
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
          // this.temp.sort = this.num
          create(this.temp).then(() => {
            // this.list.unshift(this.temp)
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
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.permsIds = row.pids.split(',').map((id, index) => {
        return parseInt(id)
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.parentIds = this.permsIds.join()
          tempData.parentId = this.permsIds[this.permsIds.length - 1]
          // tempData.sort = this.num
          update(tempData).then(() => {
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
      this.$confirm('【删除权限】操作，是否继续?', '提示', {
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
      this.permsIds = value
    },
    handleChange3(value) {
      this.temp.sort = value
    },
    changeSwitch($event, id) {
      const o = { id: id, status: $event }
      this.$confirm('【修改权限状态】操作，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        changeStatus(o).then(() => {
          this.recursionLoop(id, o.status)
        })
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).catch(() => {
        this.recursionLoop(this.list, id, o.status === 1 ? 0 : 1)
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },
    recursionLoop(list, id, status) {
      for (const v of list) {
        if (v.id === id) {
          v.status = status
          break
        } else {
          if (v.children && v.children.length > 0) {
            this.recursionLoop(v.children, id, status)
          }
        }
      }
    },
    generateIconCode(symbol) {
      // return `<svg-icon icon-class="${symbol}" />`
      return symbol
    },
    generateElementIconCode(symbol) {
      return `<i class="el-icon-${symbol}" />`
    },
    handleClipboard(text, event) {
      this.temp.icon = text
      this.centerDialogVisible = false
      clipboard(text, event)
    }
  }
}
</script>
<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
