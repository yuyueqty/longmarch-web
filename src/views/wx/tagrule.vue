<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="filter-container clearfix">
            <el-button
              v-permission="['wx:gzhtag:create']"
              class="filter-item"
              style="margin-left: 10px;"
              type="primary"
              icon="el-icon-edit"
              @click="handleCreate"
            >{{ $t('table.add') }}</el-button>
          </div>
          <el-table
            :key="tableKey"
            v-loading="listLoading"
            :data="list"
            highlight-current-row
            style="width: 100%;"
            @selection-change="handleSelectionChange"
            @row-click="loadRule"
          >
            <el-table-column :label="$t('GzhTag.name')">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('GzhTag.wxTagId')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.wxTagId }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('GzhTag.description')">
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkPermission(['wx:gzhtag:update', 'wx:wx_gzh_tag:delete'])"
              fixed="right"
              :label="$t('table.actions')"
              width="200px"
              align="center"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="{row}">
                <el-button
                  v-permission="['wx:gzhtag:update']"
                  class="filter-item"
                  style="margin-left: 10px;"
                  type="primary"
                  @click="handleUpdate(row)"
                ><i class="el-icon-edit" /></el-button>
                <el-button
                  v-permission="['wx:gzhtag:delete']"
                  class="filter-item"
                  style="margin-left: 10px;"
                  type="danger"
                  @click="deleteData(row)"
                ><i class="el-icon-delete" /></el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.current"
            :limit.sync="listQuery.size"
            @pagination="getList"
          />
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="filter-container clearfix">
            <el-button
              v-permission="['wx:gzhtag:create']"
              class="filter-item"
              style="margin-left: 10px;"
              type="primary"
              icon="el-icon-edit"
              @click="addLine"
            >{{ $t('table.add') }}</el-button>
          </div>
          <el-table
            :key="tableKey"
            v-loading="listLoading"
            :data="list2"
            highlight-current-row
            style="width: 100%;"
            @selection-change="handleSelectionChange"
          >
            <el-table-column :label="$t('GzhTagRule.rid')" align="center">
              <template slot-scope="scope">
                <el-input v-if="dialogStatus==='create'" v-model="scope.row.rid" />
              </template>
            </el-table-column>
            <el-table-column :label="$t('GzhTagRule.content')">
              <template slot-scope="scope">
                <el-input v-model="scope.row.content" />
              </template>
            </el-table-column>
            <el-table-column :label="$t('GzhTagRule.compute')" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.compute" />
              </template>
            </el-table-column>
            <el-table-column :label="$t('GzhTagRule.score')" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.score" />
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkPermission(['wx:gzhtag:update', 'wx:wx_gzh_tag:delete'])"
              fixed="right"
              :label="$t('table.actions')"
              width="200px"
              align="center"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  v-permission="['wx:gzhtag:update']"
                  class="filter-item"
                  style="margin-left: 10px;"
                  type="primary"
                  @click="handleDelete(scope.$index, scope.row)"
                ><i class="el-icon-delete" /></el-button>
                <el-button
                  v-permission="['wx:gzhtag:delete']"
                  class="filter-item"
                  style="margin-left: 10px;"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                ><i class="el-icon-delete" /></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="right" label-width="80px" style="width: 500px; margin-left:50px;">
        <el-form-item :label="$t('GzhTag.name')">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item :label="$t('GzhTag.description')">
          <el-input v-model="temp.description" />
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
import { list, loadRule, create, update, remove } from '@/api/GzhTagApi'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  directives: { permission },
  data() {
    return {
      list: [],
      list2: [],
      tableKey: 0,
      total: 0,
      listLoading: true,
      dialogFormVisible: false,
      listQuery: {
        current: 1,
        size: 10
      },
      temp: {
        id: undefined,
        wxTagId: undefined,
        name: undefined,
        description: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined
      },
      textMap: {
        update: '编辑标签',
        create: '添加标签'
      },
      dialogStatus: 'create'
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
      list(this.listQuery).then(response => {
        this.list = response.data.records
        this.list2 = response.data.records[0].gzhTagRuleList
        this.total = response.data.total
        this.listLoading = false
      })
    },
    /** 多选触发操作 **/
    handleSelectionChange(selectionIds) {
      this.ids = selectionIds
    },
    /** 加载标签下的规则 */
    loadRule(row, event, column) {
      if (event.label !== '操作') {
        loadRule(row.id).then(response => {
          this.list2 = response.data
        })
      }
    },
    /** 初始化属性值 **/
    resetTemp() {
      this.temp = {
        id: undefined,
        wxTagId: undefined,
        name: undefined,
        description: undefined,
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
      this.$refs['dataForm'].validate(valid => {
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
    addLine() { // 添加行数
      var newValue = {
        rid: undefined,
        score: undefined,
        compute: undefined,
        content: undefined
      }
      // 添加新的行数
      this.list2.push(newValue)
    }
  }
}
</script>
