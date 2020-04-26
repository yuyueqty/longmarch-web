<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="filter-container clearfix">
        <el-button class="filter-item" style="float: right;margin-left: 2%;" @click="$router.push({name:'GzhUserManage'})">
          {{ $t('table.goBack') }}<i class="el-icon-arrow-right" />
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
        <!-- <el-table-column :label="$t('GzhFenweiTag.id')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column :label="$t('GzhFenweiTag.gzhId')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.gzhId }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('GzhFenweiTag.openId')" align="center" width="280">
          <template slot-scope="scope">
            <span>{{ scope.row.openId }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhFenweiTag.fieldId')" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.fieldId | dictFirst(dictionary.style_dict)">
              <span>{{ scope.row.fieldId | dictFirst(dictionary.fw_field_dict) }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhFenweiTag.name')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhFenweiTag.content')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhFenweiTag.rank')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.rank }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhFenweiTag.score')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.score }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column v-if="checkPermission(['wx:gzhfenweitag:update', 'wx:wx_gzh_fenwei_tag:delete'])" fixed="right" :label="$t('table.actions')" width="200px" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-permission="['wx:gzhfenweitag:update']" class="filter-item" style="margin-left: 10px;" type="primary" @click="handleUpdate(row)">
              {{ $t('table.edit') }}
            </el-button>
            <el-button v-permission="['wx:gzhfenweitag:delete']" class="filter-item" style="margin-left: 10px;" type="danger" @click="deleteData(row)">
              {{ $t('table.delete') }}
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
    </el-card>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="80px" style="width: 500px; margin-left:50px;">
        <el-form-item :label="$t('GzhFenweiTag.id')">
          <el-input v-model="temp.id" />
        </el-form-item>
        <el-form-item :label="$t('GzhFenweiTag.gzhId')">
          <el-input v-model="temp.gzhId" />
        </el-form-item>
        <el-form-item :label="$t('GzhFenweiTag.openId')">
          <el-input v-model="temp.openId" />
        </el-form-item>
        <el-form-item :label="$t('GzhFenweiTag.fieldId')">
          <el-input v-model="temp.fieldId" />
        </el-form-item>
        <el-form-item :label="$t('GzhFenweiTag.name')">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item :label="$t('GzhFenweiTag.content')">
          <el-input v-model="temp.content" />
        </el-form-item>
        <el-form-item :label="$t('GzhFenweiTag.rank')">
          <el-input v-model="temp.rank" />
        </el-form-item>
        <el-form-item :label="$t('GzhFenweiTag.score')">
          <el-input v-model="temp.score" />
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
import { fetchList, create, update, remove, changeStatus } from '@/api/GzhFenweiTagApi'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
// import RaddarChart from './components/RaddarChart'

export default {
  name: 'GzhFenweiTagManage',
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
      list: [],
      ids: [],
      total: 0,
      listLoading: true,
      listQuery: {
        current: 1
      },
      temp: {
        id: undefined,
        gzhId: undefined,
        openId: undefined,
        fieldId: undefined,
        name: undefined,
        content: undefined,
        rank: undefined,
        score: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined
      },
      dialogFormVisible: false,
      dialogStatus: 'create',
      textMap: {
        update: '编辑公众号粉丝分维解析标签',
        create: '添加公众号粉丝分维解析标签'
      },
      rules: {
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
    /** 检查权限 **/
    checkPermission,
    /** 获取列表 **/
    getList() {
      this.listLoading = true
      this.listQuery.openId = this.$route.params.openId
      fetchList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    /** 过滤器 **/
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    /** 排序 **/
    sortChange(data) {
      const { prop, order } = data
      if (prop !== null && order !== null) {
        this.listQuery.prop = prop
        this.listQuery.order = order
        this.handleFilter()
      }
    },
    /** 初始化属性值 **/
    resetTemp() {
      this.temp = {
        id: undefined,
        gzhId: undefined,
        openId: undefined,
        fieldId: undefined,
        name: undefined,
        content: undefined,
        rank: undefined,
        score: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined
      }
    },
    /** 创建前置处理 **/
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /** 创建逻辑 **/
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
    /** 更新前置处理 **/
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /** 更新逻辑 **/
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
    /** 删除逻辑 **/
    deleteData(row) {
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
    /** 多选触发操作 **/
    handleSelectionChange(selectionIds) {
      this.ids = selectionIds
    },
    /** 开关式触发操作 **/
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
    /** 循环无刷新改变数据 **/
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
