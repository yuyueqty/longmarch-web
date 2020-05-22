<template>
  <div class="app-container">
    <el-card class="box-card">
      <!-- <aside>
        1. 使用说明
      </aside> -->
      <div slot="header" class="filter-container clearfix">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline">
          <el-form-item class="postInfo-container-item">
            <el-input v-model="listQuery.fuzzySearch" clearable :placeholder="$t('table.fuzzySearch')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item class="postInfo-container-item">
            <el-select v-model="listQuery.sex" clearable placeholder="性别">
              <el-option
                v-for="item in dictionary.sex_dict"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="postInfo-container-item">
            <el-input v-model="listQuery.country" clearable placeholder="国家" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item class="postInfo-container-item">
            <el-input v-model="listQuery.province" clearable placeholder="市区" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item class="postInfo-container-item">
            <el-input v-model="listQuery.city" clearable placeholder="城市" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            {{ $t('table.search') }}
          </el-button>
        </el-form>
        <el-button v-permission="['wx:gzhuser:sync']" :disabled="lock!==null" class="filter-item" style="margin-left: 10px;" type="primary" @click="syncWxUserInfo()">
          ①同步微信用户
        </el-button>
        <el-button v-permission="['wx:gzhuser:analyse']" :disabled="lock!==null" class="filter-item" style="margin-left: 10px;" type="primary" @click="analyseTag()">
          ②解析分维标签
        </el-button>
        <el-button v-permission="['wx:gzhuser:analyse']" :disabled="lock!==null" class="filter-item" style="margin-left: 10px;" type="primary" @click="tagAnalysis()">
          ③解析营销标签(同步微信公众号平台)
        </el-button>
        <el-button v-permission="['wx:gzhuser:analyse']" :disabled="lock!==null" class="filter-item" style="margin-left: 10px;" type="primary" @click="tagRemove()">
          ④取消用户标签(同步微信公众号平台)
        </el-button>
        <el-button v-permission="['wx:gzhuser:download']" class="filter-item" style="margin-left: 10px;" type="primary" @click="downloadWxUser()">
          {{ $t('table.downloadWxUser') }}
        </el-button>
        <el-button v-waves class="filter-item" type="warning" icon="el-icon-refresh" @click="refresh">
          刷新操作状态
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
        @row-click="showUserTag"
      >
        <!-- <el-table-column
          type="selection"
          width="55"
        /> -->
        <el-table-column :label="$t('GzhUser.headImgUrl')" align="center">
          <template slot-scope="scope">
            <img v-if="scope.row.headImgUrl" style="border-radius: 100px;width: 35px; height: 35px;" :src="scope.row.headImgUrl" class="avatar">
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhUser.nickname')" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.remark">
              {{ scope.row.remark }}（{{ scope.row.nickname }}）
            </span>
            <span v-if="!scope.row.remark">{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhUser.fenWeiTags')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.fenWeiTags }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sex" sortable="custom" :label="$t('GzhUser.sexDesc')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.sexDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="province" sortable="custom" :label="$t('GzhUser.province')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.province }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="city" sortable="custom" :label="$t('GzhUser.city')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.city }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="country" sortable="custom" :label="$t('GzhUser.country')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.country }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" sortable="custom" :label="$t('GzhUser.createTime')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="checkPermission(['wx:gzhuser:syncone', 'wx:gzhuser:analyseone'])" fixed="right" :label="$t('table.actions')" width="300px" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-permission="['wx:gzhuser:syncone']" class="filter-item" style="margin-left: 10px;" type="primary" @click="handleUpdate(row)">
              备注
            </el-button>
            <el-button v-permission="['wx:gzhuser:syncone']" class="filter-item" style="margin-left: 10px;" type="primary" @click="syncMore(row)">
              同步
            </el-button>
            <el-button v-permission="['wx:gzhuser:analyseone']" class="filter-item" style="margin-left: 10px;" type="danger" @click="analyseMore(row)">
              解析
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
    </el-card>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="80px" style="width: 500px; margin-left:50px;">
        <el-form-item :label="$t('GzhUser.nickname')">
          <el-input v-model="temp.nickname" disabled />
        </el-form-item>
        <el-form-item :label="$t('GzhUser.remark')">
          <el-input v-model="temp.remark" />
        </el-form-item>
        <el-form-item :label="$t('GzhUser.mobile')">
          <el-input v-model="temp.mobile" />
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
    <el-dialog :visible.sync="dialogTag">
      <pie-chart ref="child" height="400px" />
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTag = false">
          {{ $t('table.cancel') }}
        </el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import checkPermission from '@/utils/permission'
import { fetchList, create, update, remove, changeStatus, syncMore, refresh, tagAnalysis, analyseTag, analyseMore, syncWxUserInfo, tagRemove } from '@/api/GzhUserApi'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import PieChart from '../dashboard/admin/components/PieChart'

export default {
  name: 'GzhUserManage',
  components: { Pagination, PieChart },
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
      chart: null,
      tableKey: 0,
      list: [],
      ids: [],
      total: 0,
      listLoading: true,
      listQuery: {
        size: 20,
        current: 1
      },
      temp: {
        id: undefined,
        openId: undefined,
        nickname: undefined,
        nicknameTxt: undefined,
        remark: undefined,
        headImgUrl: undefined,
        sexDesc: undefined,
        sex: undefined,
        subscribe: undefined,
        subscribeTime: undefined,
        subscribeScene: undefined,
        mobile: undefined,
        bindStatus: undefined,
        bindTime: undefined,
        tagIds: undefined,
        fenWeiTags: undefined,
        province: undefined,
        city: undefined,
        country: undefined,
        qrScene: undefined,
        qrSceneStr: undefined,
        groupId: undefined,
        language: undefined,
        unionId: undefined,
        jwid: undefined,
        isDeleted: undefined,
        tenantId: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined
      },
      dialogTag: false,
      dialogFormVisible: false,
      dialogStatus: 'create',
      textMap: {
        update: '编辑粉丝表',
        create: '添加粉丝表'
      },
      rules: {
      },
      lock: null
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
    refresh() {
      refresh().then(response => {
        const { lock1, lock2, lock3, lock4 } = response.data
        if (lock1 !== null || lock2 !== null || lock3 !== null || lock4 !== null) {
          this.lock = 'lock'
          this.$message({
            type: 'warning',
            message: '正在进行中，请稍等...'
          })
        } else {
          this.lock = null
          this.getList()
          this.$message({
            type: 'success',
            message: '操作已完成'
          })
        }
      })
    },
    /** 获取列表 **/
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        refresh()
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
        openId: undefined,
        nickname: undefined,
        nicknameTxt: undefined,
        remark: undefined,
        headImgUrl: undefined,
        sexDesc: undefined,
        sex: undefined,
        subscribe: undefined,
        subscribeTime: undefined,
        subscribeScene: undefined,
        mobile: undefined,
        bindStatus: undefined,
        bindTime: undefined,
        tagIds: undefined,
        fenWeiTags: undefined,
        province: undefined,
        city: undefined,
        country: undefined,
        qrScene: undefined,
        qrSceneStr: undefined,
        groupId: undefined,
        language: undefined,
        unionId: undefined,
        jwid: undefined,
        isDeleted: undefined,
        tenantId: undefined,
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
    },
    /** 同步微信用户 */
    syncWxUserInfo() {
      if (this.lock !== null) {
        this.$message({
          type: 'warning',
          message: '正在同步中，请稍等...'
        })
      } else {
        const h = this.$createElement
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '【同步微信用户】操作，是否继续? ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              syncWxUserInfo().then(() => {
                this.refresh()
                done()
                instance.confirmButtonLoading = false
              })
            } else {
              done()
            }
          }
        }).then(action => {

        })
      }
    },
    /** 解析分维标签 */
    analyseTag() {
      if (this.lock !== null) {
        this.$message({
          type: 'warning',
          message: '正在解析中，请稍等...'
        })
      } else {
        const h = this.$createElement
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '【解析用户分维标签】操作，是否继续? ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              analyseTag().then(() => {
                this.refresh()
                done()
                instance.confirmButtonLoading = false
              })
            } else {
              done()
            }
          }
        }).then(action => {

        })
      }
    },
    /** 下载用户数据 */
    downloadWxUser() {
      window.open(process.env.VUE_APP_BASE_API + '/wx/gzh-user/download.xls')
    },
    /** 展示用户标签 */
    showUserTag(row, event, column) {
      if (event.label !== '操作') {
        this.dialogTag = true
        if (this.$refs.child !== undefined) {
          this.$refs.child.showTag(row.openId, row)
        }
      }
    },
    /** 二次解析用户营销标签 */
    tagAnalysis() {
      if (this.lock !== null) {
        this.$message({
          type: 'warning',
          message: '正在二次解析中，请稍等...'
        })
      } else {
        const h = this.$createElement
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '【批量解析用户运营标签】操作，是否继续? ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              tagAnalysis().then(() => {
                this.refresh()
                done()
                instance.confirmButtonLoading = false
              })
            } else {
              done()
            }
          }
        }).then(action => {

        })
      }
    },
    /** 单次同步用户 */
    syncMore(row) {
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '【同步微信用户信息】操作，是否继续? ')
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
            syncMore(_ids).then(() => {
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
    /** 单次解析用户 */
    analyseMore(row) {
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '【解析微信用户标签】操作，是否继续? ')
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
            analyseMore(_ids).then(() => {
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
    /** 取消用户标签 */
    tagRemove(row) {
      if (this.lock !== null) {
        this.$message({
          type: 'warning',
          message: '正在取消中，请稍等...'
        })
      } else {
        const h = this.$createElement
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '【批量取消用户标签】操作，是否继续? ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              tagRemove().then(() => {
                this.refresh()
                done()
                instance.confirmButtonLoading = false
              })
            } else {
              done()
            }
          }
        }).then(action => {

        })
      }
    }

  }
}
</script>
