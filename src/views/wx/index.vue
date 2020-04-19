<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="filter-container clearfix">
        <!-- <el-form :inline="true" :model="listQuery" class="demo-form-inline">
          <el-form-item class="postInfo-container-item">
            <el-input v-model="listQuery.fuzzySearch" clearable :placeholder="$t('table.fuzzySearch')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-input v-model="listQuery.weixinNumber" />
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            {{ $t('table.search') }}
          </el-button>
        </el-form> -->
        <el-button v-permission="['wx:gzhaccount:create']" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          {{ $t('table.add') }}
        </el-button>
        <el-button v-permission="['wx:gzhaccount:delete']" :disabled="batchDeleteButtonStatus" class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="deleteData()">
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
        <el-table-column :label="$t('GzhAccount.jwid')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.jwid }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('GzhAccount.wxName')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.wxName }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column :label="$t('GzhAccount.qrcodeimg')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.qrcodeimg }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column :label="$t('GzhAccount.weixinNumber')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.weixinNumber }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('GzhAccount.weixinAppid')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.weixinAppid }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('GzhAccount.weixinAppsecret')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.weixinAppsecret }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('GzhAccount.accountType')" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.accountType | dictFirst(dictionary.style_dict)">
              <span>{{ scope.row.accountType | dictFirst(dictionary.account_type_dict) }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhAccount.authStatus')" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.authStatus | dictFirst(dictionary.style_dict)">
              <span>{{ scope.row.authStatus | dictFirst(dictionary.auth_status_dict) }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhAccount.defaultAccount')" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.defaultAccount | dictFirst(dictionary.style_dict)">
              <span>{{ scope.row.defaultAccount | dictFirst(dictionary.auth_status_dict) }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('GzhAccount.tokenGettime')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tokenGettime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhAccount.apiticket')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.apiticket }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhAccount.apiticketGettime')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.apiticketGettime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhAccount.jsapiticket')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.jsapiticket }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhAccount.jsapiticketGettime')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.jsapiticketGettime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhAccount.authType')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.authType }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhAccount.businessInfo')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.businessInfo }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhAccount.funcInfo')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.funcInfo }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhAccount.nickName')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.nickName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhAccount.headimgurl')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.headimgurl }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhAccount.token')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.token }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column :label="$t('GzhAccount.createBy')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createBy }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhAccount.createTime')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhAccount.updateBy')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.updateBy }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhAccount.updateTime')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.updateTime }}</span>
          </template>
        </el-table-column> -->
        <el-table-column v-if="checkPermission(['wx:gzhaccount:update', 'wx:wx_gzh_account:delete'])" fixed="right" :label="$t('table.actions')" width="300px" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-permission="['wx:gzhaccount:update']" class="filter-item" style="margin-left: 10px;" type="primary" @click="handleUpdate(row)">
              {{ $t('table.edit') }}
            </el-button>
            <el-button v-permission="['wx:gzhaccount:delete']" class="filter-item" style="margin-left: 10px;" type="danger" @click="deleteData(row)">
              {{ $t('table.delete') }}
            </el-button>
            <el-button v-permission="['wx:gzhaccount:delete']" class="filter-item" style="margin-left: 10px;" type="danger" @click="setDefault(row)">
              {{ $t('table.set_default') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
    </el-card>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="80px" style="width: 500px; margin-left:50px;">
        <el-form-item :label="$t('GzhAccount.jwid')">
          <el-input v-model="temp.jwid" />
        </el-form-item>
        <!-- <el-form-item :label="$t('GzhAccount.wxName')">
          <el-input v-model="temp.wxName" />
        </el-form-item> -->
        <!-- <el-form-item :label="$t('GzhAccount.loginName')">
          <el-input v-model="temp.loginName" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.loginPasswd')">
          <el-input v-model="temp.loginPasswd" />
        </el-form-item> -->
        <!-- <el-form-item :label="$t('GzhAccount.applicationType')">
          <el-input v-model="temp.applicationType" />
        </el-form-item> -->
        <!-- <el-form-item :label="$t('GzhAccount.qrcodeimg')">
          <el-upload
            class="avatar-uploader"
            :action="uploadActionUrl"
            :show-file-list="false"
            :with-credentials="true"
            :on-success="handlePictureCardPreview"
          >
            <img v-if="temp.qrcodeimg" style="margin-top: 6px;border-radius: 100px;width: 60px; height: 60px" :src="temp.qrcodeimg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item> -->
        <!-- <el-form-item :label="$t('GzhAccount.weixinNumber')">
          <el-input v-model="temp.weixinNumber" />
        </el-form-item> -->
        <el-form-item :label="$t('GzhAccount.weixinAppid')">
          <el-input v-model="temp.weixinAppid" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.weixinAppsecret')">
          <el-input v-model="temp.weixinAppsecret" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.accountType')">
          <el-input v-model="temp.accountType" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.authStatus')">
          <el-input v-model="temp.authStatus" />
        </el-form-item>
        <!-- <el-form-item :label="$t('GzhAccount.accessToken')">
          <el-input v-model="temp.accessToken" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.tokenGettime')">
          <el-input v-model="temp.tokenGettime" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.apiticket')">
          <el-input v-model="temp.apiticket" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.apiticketGettime')">
          <el-input v-model="temp.apiticketGettime" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.jsapiticket')">
          <el-input v-model="temp.jsapiticket" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.jsapiticketGettime')">
          <el-input v-model="temp.jsapiticketGettime" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.authType')">
          <el-input v-model="temp.authType" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.businessInfo')">
          <el-input v-model="temp.businessInfo" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.funcInfo')">
          <el-input v-model="temp.funcInfo" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.nickName')">
          <el-input v-model="temp.nickName" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.headimgurl')">
          <el-input v-model="temp.headimgurl" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.authorizationInfo')">
          <el-input v-model="temp.authorizationInfo" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.authorizerRefreshToken')">
          <el-input v-model="temp.authorizerRefreshToken" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.token')">
          <el-input v-model="temp.token" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.authorizationStatus')">
          <el-input v-model="temp.authorizationStatus" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.isDeleted')">
          <el-input v-model="temp.isDeleted" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.tenantId')">
          <el-input v-model="temp.tenantId" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.createBy')">
          <el-input v-model="temp.createBy" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.createTime')">
          <el-input v-model="temp.createTime" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.updateBy')">
          <el-input v-model="temp.updateBy" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.updateTime')">
          <el-input v-model="temp.updateTime" />
        </el-form-item> -->
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
import { fetchList, create, update, remove, changeStatus, setDefault } from '@/api/GzhAccountApi'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'

export default {
  name: 'GzhAccountManage',
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
        jwid: undefined,
        wxName: undefined,
        loginName: undefined,
        loginPasswd: undefined,
        applicationType: undefined,
        qrcodeimg: undefined,
        weixinNumber: undefined,
        weixinAppid: undefined,
        weixinAppsecret: undefined,
        accountType: undefined,
        authStatus: undefined,
        accessToken: undefined,
        tokenGettime: undefined,
        apiticket: undefined,
        apiticketGettime: undefined,
        jsapiticket: undefined,
        jsapiticketGettime: undefined,
        authType: undefined,
        businessInfo: undefined,
        funcInfo: undefined,
        nickName: undefined,
        headimgurl: undefined,
        authorizationInfo: undefined,
        authorizerRefreshToken: undefined,
        token: undefined,
        authorizationStatus: undefined,
        isDeleted: undefined,
        tenantId: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined
      },
      dialogFormVisible: false,
      dialogStatus: 'create',
      textMap: {
        update: '编辑系统公众号表',
        create: '添加系统公众号表'
      },
      rules: {
      },
      uploadActionUrl: process.env.VUE_APP_BASE_API + '/file/upload'
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
        jwid: undefined,
        wxName: undefined,
        loginName: undefined,
        loginPasswd: undefined,
        applicationType: undefined,
        qrcodeimg: undefined,
        weixinNumber: undefined,
        weixinAppid: undefined,
        weixinAppsecret: undefined,
        accountType: undefined,
        authStatus: undefined,
        accessToken: undefined,
        tokenGettime: undefined,
        apiticket: undefined,
        apiticketGettime: undefined,
        jsapiticket: undefined,
        jsapiticketGettime: undefined,
        authType: undefined,
        businessInfo: undefined,
        funcInfo: undefined,
        nickName: undefined,
        headimgurl: undefined,
        authorizationInfo: undefined,
        authorizerRefreshToken: undefined,
        token: undefined,
        authorizationStatus: undefined,
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
    /** 上传事件 **/
    handlePictureCardPreview(response, file, fileList) {
      this.temp.qrcodeimg = response.data.url
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
    setDefault(row) {
      setDefault(row.id).then(() => {
        this.getList()
        this.$notify({
          title: '成功',
          message: '设置成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>
