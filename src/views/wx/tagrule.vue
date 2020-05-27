<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="filter-container clearfix">
            <el-button
              v-permission="['wx:gzhTag:create']"
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
            <el-table-column :label="$t('GzhTag.name')" width="160">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}（{{ scope.row.wxTagId }}）</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('GzhTag.description')">
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkPermission(['wx:gzhTag:update', 'wx:gzhTag:delete'])"
              fixed="right"
              :label="$t('table.actions')"
              width="100px"
              align="center"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="{row}">
                <el-button
                  v-permission="['wx:gzhTag:update']"
                  class="filter-item"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="handleUpdate(row)"
                />
                <el-button
                  v-permission="['wx:gzhTag:delete']"
                  class="filter-item"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="deleteData(row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card class="box-card">
          <div slot="header" class="filter-container clearfix">
            <el-button
              v-permission="['wx:gzhTagRule:create']"
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
            <el-table-column :label="$t('GzhTagRule.content')" align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.rid" clearable placeholder="选择分维标签">
                  <el-option
                    v-for="item in list3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column :label="$t('GzhTagRule.rid')" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.rid" disabled />
              </template>
            </el-table-column>
            <el-table-column :label="$t('GzhTagRule.compute')" align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.compute" clearable placeholder="请选择">
                  <el-option
                    v-for="item in computeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column :label="$t('GzhTagRule.score')" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.score" />
              </template>
            </el-table-column>
            <el-table-column
              v-if="checkPermission(['wx:gzhTagRule:update', 'wx:gzhTagRule:delete'])"
              fixed="right"
              :label="$t('table.actions')"
              width="100px"
              align="center"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.id===undefined"
                  v-permission="['wx:gzhTagRule:update']"
                  class="filter-item"
                  type="success"
                  icon="el-icon-check"
                  circle
                  @click="saveData(scope.$index, scope.row)"
                />
                <el-button
                  v-if="scope.row.id!==undefined"
                  v-permission="['wx:gzhTagRule:update']"
                  class="filter-item"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="saveData(scope.$index, scope.row)"
                />
                <el-button
                  v-permission="['wx:gzhTagRule:delete']"
                  class="filter-item"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="removeData(scope.$index, scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="right"
        label-width="80px"
        style="width: 500px; margin-left:50px;"
      >
        <el-form-item :label="$t('GzhTag.name')">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item :label="$t('GzhTag.description')">
          <el-input v-model="temp.description" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import permission from '@/directive/permission/index.js'
import checkPermission from '@/utils/permission'
import { list, loadRule, create, update, remove } from '@/api/GzhTagApi'
import { removeRule, saveData, fenweiTags } from '@/api/GzhTagRuleApi'

export default {
  directives: { permission },
  data() {
    return {
      list: [],
      list2: [],
      list3: [],
      tableKey: 0,
      listLoading: true,
      dialogFormVisible: false,
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
      computeOption: [
        {
          value: 'lt',
          label: '小于'
        },
        {
          value: 'gt',
          label: '大于'
        }
      ],
      textMap: {
        update: '编辑标签',
        create: '添加标签'
      },
      dialogStatus: 'create',
      tagId: undefined
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
      list().then(response => {
        this.list = response.data
        this.list2 = response.gzhTagRuleList
        console.log(response.data)
        if (response.data.length > 0) {
          this.tagId = response.data[0].id
        }
        this.getFenweiTags(this.list2)
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
          this.tagId = row.id
          this.buildData(this.list3, this.list2)
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
          create(this.temp).then(response => {
            this.list.unshift(response.data)
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
      this.$refs['dataForm'].validate(valid => {
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
          h('span', null, '【删除标签】操作，是否继续? ')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            const _ids =
              row !== undefined
                ? [row.id]
                : this.ids.map(obj => {
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
    addLine() {
      // 添加行数
      var newValue = {
        rid: undefined,
        score: 75,
        compute: 'gt',
        content: undefined
      }
      // 添加新的行数
      this.list2.push(newValue)
      this.buildData(this.list3, this.list2)
    },
    saveData(index, row) {
      if (row.rid === undefined) {
        this.$message({
          type: 'warning',
          message: '请选择规则标签'
        })
        return
      }
      saveData(this.tagId, row).then(response => {
        this.$message({
          type: 'success',
          message: '操作完成'
        })
      })
    },
    removeData(index, row) {
      if (row.id === undefined) {
        this.list2.pop(row)
      } else {
        removeRule(row.id).then(response => {
          this.list2.pop(row)
          this.$message({
            type: 'success',
            message: '操作完成'
          })
        })
      }
    },
    changeSwitch($event, row) {
      row.compute = $event
    },
    getFenweiTags(list2) {
      fenweiTags().then(response => {
        this.list3 = response.data
        this.buildData(this.list3, list2)
      })
    },
    buildData(list1, list2) {
      for (let i = 0; i < list1.length; i++) {
        list1[i]['disabled'] = false
        for (let j = 0; j < list2.length; j++) {
          if (list1[i].value === list2[j].rid) {
            list1[i]['disabled'] = true
            break
          }
        }
      }
    }
  }
}
</script>
