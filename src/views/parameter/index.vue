<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane :label="$t('parameterInfo.sysParams')" name="sys_params">
        <el-form ref="dataForm" :model="parameterObj" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-input v-model="parameterObj.paramId" type="hidden" />
          <el-form-item :label="$t('parameterInfo.title')" prop="title">
            <el-input v-model="parameterObj.paramValue.title" />
          </el-form-item>
          <el-form-item :label="$t('parameterInfo.url')" prop="url">
            <el-input v-model="parameterObj.paramValue.url" />
          </el-form-item>
          <el-form-item :label="$t('parameterInfo.keywords')" prop="keywords">
            <el-input v-model="parameterObj.paramValue.keywords" />
          </el-form-item>
          <el-form-item :label="$t('parameterInfo.description')" prop="description">
            <el-input v-model="parameterObj.paramValue.description" />
          </el-form-item>
          <el-form-item :label="$t('parameterInfo.code')" prop="code">
            <el-input v-model="parameterObj.paramValue.code" />
          </el-form-item>
          <el-form-item :label="$t('parameterInfo.copyright')" prop="copyright">
            <el-input v-model="parameterObj.paramValue.copyright" />
          </el-form-item>
          <el-form-item :label="$t('parameterInfo.logo')" prop="logo">
            <el-upload
              class="avatar-uploader"
              :action="uploadActionUrl"
              :show-file-list="false"
              :with-credentials="true"
              :on-success="handlePictureCardPreviewLogo"
            >
              <img v-if="parameterObj.paramValue.logo" style="width: 200px; height: 80px" :src="parameterObj.paramValue.logo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item :label="$t('parameterInfo.headImgUrl')" prop="headImgUrl">
            <el-upload
              class="avatar-uploader"
              :action="uploadActionUrl"
              :show-file-list="false"
              :with-credentials="true"
              :on-success="handlePictureCardPreviewHeadImgUrl"
            >
              <img v-if="parameterObj.paramValue.headImgUrl" style="margin-top: 6px;border-radius: 100px;width: 100px; height: 100px" :src="parameterObj.paramValue.headImgUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button v-permission="['sys:parameter:update']" type="primary" @click="updateData('dataForm')">{{ $t('parameterInfo.buttonName') }}</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane :label="$t('parameterInfo.qiniuUpload')" name="qiniu_upload">
        <el-form ref="dataForm" :model="parameterObj" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-input v-model="parameterObj.paramId" type="hidden" />
          <el-form-item :label="$t('parameterInfo.bucket')" prop="bucket">
            <el-input v-model="parameterObj.paramValue.bucket" />
          </el-form-item>
          <el-form-item :label="$t('parameterInfo.secretKey')" prop="secretKey">
            <el-input v-model="parameterObj.paramValue.secretKey" />
          </el-form-item>
          <el-form-item :label="$t('parameterInfo.accessKey')" prop="accessKey">
            <el-input v-model="parameterObj.paramValue.accessKey" />
          </el-form-item>
          <el-form-item :label="$t('parameterInfo.downloadUrl')" prop="downloadUrl">
            <el-input v-model="parameterObj.paramValue.downloadUrl" />
          </el-form-item>
          <el-form-item :label="$t('parameterInfo.fileMaxSize')" prop="fileMaxSize">
            <el-input v-model="parameterObj.paramValue.fileMaxSize" />
          </el-form-item>
          <el-form-item :label="$t('parameterInfo.expireSeconds')" prop="expireSeconds">
            <el-input v-model="parameterObj.paramValue.expireSeconds" />
          </el-form-item>
          <el-form-item>
            <el-button v-permission="['sys:parameter:update']" type="primary" @click="updateData('dataForm')">{{ $t('parameterInfo.buttonName') }}</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane :label="$t('parameterInfo.defaultSet')" name="default_user_role">
        <el-form ref="dataForm" :model="parameterObj" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-input v-model="parameterObj.paramId" type="hidden" />
          <!-- <el-input v-model="parameterObj.paramValue.roleId" type="hidden" />
          <el-form-item :label="$t('parameterInfo.roleId')" prop="roleId">
            <el-input v-model="parameterObj.paramValue.roleId" />
          </el-form-item>
          <el-form-item :label="$t('parameterInfo.roleName')" prop="roleName">
            <el-input v-model="parameterObj.paramValue.roleName" />
          </el-form-item> -->
          <!-- <el-input v-model="parameterObj.paramValue.roleId" type="hidden" /> -->
          <el-form-item :label="$t('parameterInfo.roleName')" prop="roleName">
            <el-select v-model="parameterObj.paramValue.roleId" placeholder="请选择">
              <el-option
                v-for="item in roles"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button v-permission="['sys:parameter:update']" type="primary" @click="updateData('dataForm')">{{ $t('parameterInfo.buttonName') }}</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import { getByParameterName, update } from '@/api/SysParameter'
import { mapGetters } from 'vuex'

export default {
  name: 'ParameterManage',
  directives: { permission },
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
      activeName: 'sys_params',
      parameterObj: {
        paramId: null,
        paramName: null,
        paramValue: {},
        remark: null
      },
      uploadActionUrl: process.env.VUE_APP_BASE_API + '/file/upload',
      rules: {
        // title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      roles: [
        {
          value: '1',
          label: '管理员组'
        }, {
          value: '2',
          label: '普通用户组'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['dictionary'])
  },
  created() {
    this.getByParameterName(this.activeName)
  },
  methods: {
    getByParameterName(parameterName) {
      getByParameterName(parameterName).then(response => {
        this.parameterObj = response.data || {}
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.parameterObj.paramValue = JSON.stringify(this.parameterObj.paramValue)
          this.activeName = this.parameterObj.paramName
          update(this.parameterObj).then(() => {
            this.parameterObj.paramValue = JSON.parse(this.parameterObj.paramValue)
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
    handleClick(tab, event) {
      const key = tab.$options.propsData.name
      this.getByParameterName(key)
    },
    handlePictureCardPreviewLogo(response, file, fileList) {
      this.parameterObj.paramValue.logo = response.data.url
    },
    handlePictureCardPreviewHeadImgUrl(response, file, fileList) {
      this.parameterObj.paramValue.headImgUrl = response.data.url
    }
  }
}
</script>
