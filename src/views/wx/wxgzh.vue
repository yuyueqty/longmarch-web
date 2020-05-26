<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="filter-container clearfix">
        <el-button v-permission="['wx:gzhaccount:create']" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          {{ $t('table.add') }}
        </el-button>
        <aside>
          公众号必须是【已认证】号，需要将【122.51.244.159】IP加入微信公众号白名单
          <a target="_blank" class="link-type" href="https://www.yuque.com/docs/share/6f1f88cc-172b-45a3-a7b8-e1b57fe3ae74?#">白名单教程</a>
        </aside>
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
        <el-table-column :label="$t('GzhAccount.jwid')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.jwid }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('GzhAccount.fwAppid')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.fwAppid }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('GzhAccount.weixinAppid')" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.weixinAppid }}</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('GzhAccount.fwField')" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.fwField | dictFirst(dictionary.style_dict)">
              <span>{{ scope.row.fwField | dictFirst(dictionary.fw_field_dict) }}</span>
            </el-tag>
          </template>
        </el-table-column>
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
        <el-table-column v-if="checkPermission(['wx:gzhaccount:update', 'wx:wx_gzh_account:delete', 'wx:gzhaccount:setting'])" fixed="right" :label="$t('table.actions')" width="300px" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-permission="['wx:gzhaccount:update']" class="filter-item" style="margin-left: 10px;" type="primary" @click="handleUpdate(row)">
              {{ $t('table.edit') }}
            </el-button>
            <el-button v-permission="['wx:gzhaccount:delete']" class="filter-item" style="margin-left: 10px;" type="danger" @click="deleteData(row)">
              {{ $t('table.delete') }}
            </el-button>
            <el-button v-if="!row.defaultAccount" v-permission="['wx:gzhaccount:setting']" class="filter-item" style="margin-left: 10px;" type="danger" @click="setDefault(row)">
              {{ $t('table.set_default') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
    </el-card>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <aside>
        <a target="_blank" class="link-type" href="https://www.yuque.com/docs/share/196f5cc4-8fe6-4e50-8d4a-30ccc7f7eb3a?#">微信公众号【开发者ID(AppID)】和【开发者密码(AppSecret)】获取方式</a>
      </aside>
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 500px; margin-left:50px;">
        <el-form-item :label="$t('GzhAccount.jwid')">
          <el-input v-model="temp.jwid" placeholder="公众号名称" />
        </el-form-item>
        <!-- <el-form-item :label="$t('GzhAccount.fwAppid')">
          <el-input v-model="temp.fwAppid" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.fwAppsecret')">
          <el-input v-model="temp.fwAppsecret" />
        </el-form-item> -->
        <el-form-item :label="$t('GzhAccount.weixinAppid')">
          <el-input v-model="temp.weixinAppid" placeholder="微信开发者ID(AppID)" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.weixinAppsecret')">
          <el-input v-model="temp.weixinAppsecret" placeholder="微信开发者密码(AppSecret)" />
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.accountType')">
          <el-radio-group v-model="temp.accountType">
            <el-radio-button v-for="item in dictionary.account_type_dict" :key="item.value" :label="item.value">{{ item.label }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.authStatus')">
          <el-radio-group v-model="temp.authStatus">
            <el-radio-button v-for="item in dictionary.auth_status_dict" :key="item.value" :label="item.value">{{ item.label }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('GzhAccount.fwField')">
          <el-radio-group v-model="temp.fwField">
            <el-radio-button v-for="item in dictionary.fw_field_dict" :key="item.value" :label="item.value">{{ item.label }}</el-radio-button>
          </el-radio-group>
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
        fwAppid: '619125947727085568',
        fwAppsecret: '5a85862f532c43d0b089c81b4c296a07',
        weixinNumber: undefined,
        weixinAppid: undefined,
        weixinAppsecret: undefined,
        accountType: undefined,
        authStatus: undefined,
        fwField: undefined,
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
        update: '编辑微信公众号',
        create: '添加微信公众号'
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
        fwAppid: '619125947727085568',
        fwAppsecret: '5a85862f532c43d0b089c81b4c296a07',
        weixinNumber: undefined,
        weixinAppid: undefined,
        weixinAppsecret: undefined,
        accountType: 2,
        authStatus: 1,
        fwField: 4,
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
            this.getList()
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
