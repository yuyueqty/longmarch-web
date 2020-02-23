<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <svg-icon icon-class="person" /><span>{{ $t('route.profile') }}</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <el-upload
          class="avatar-uploader"
          :action="uploadActionUrl"
          :show-file-list="false"
          :with-credentials="true"
          :on-success="handlePictureCardPreview"
        >
          <img v-if="userInfo.headImgUrl" style="margin-top: 6px;border-radius: 100px;width: 100px; height: 100px" :src="userInfo.headImgUrl" class="avatar">
        </el-upload></div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">{{ user.role | uppercaseFirst }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="userinfo" /><span>用户资料</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            <el-form ref="dataForm" :model="userInfo" label-width="60px">
              <el-form-item label="账号：">
                <span>{{ userInfo.username }}</span>
              </el-form-item>
              <el-form-item label="手机：">
                <span v-if="!isEdit">{{ userInfo.phone }}</span>
                <el-input v-if="isEdit" v-model="userInfo.phone" />
              </el-form-item>
              <el-form-item label="部门：">
                <span>{{ userInfo.dept }}</span>
              </el-form-item>
              <el-form-item label="次数：">
                <span>{{ userInfo.loginCount }}</span>
              </el-form-item>
              <el-form-item label="时间：">
                <span>{{ userInfo.lastLoginTime }}</span>
              </el-form-item>
              <el-button v-if="!isEdit" type="primary" icon="el-icon-edit" circle @click="handleUpdate()" />
              <el-button v-if="isEdit" type="success" icon="el-icon-check" circle @click="saveData()" />
            </el-form>
          </div>
        </div>
      </div>
      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="safety" /><span>安全设置</span></div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <el-button type="text" @click="dialogStatus = true">修改密码</el-button>
          </div>
        </div>
      </div>
      <el-dialog title="修改密码" :visible.sync="dialogStatus">
        <el-form ref="dataForm" :rules="rules" :model="temp" label-width="80px" style="width: 400px; margin-left:80px;">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input v-model="temp.oldPassword" type="password" />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="temp.newPassword" type="password" />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="temp.confirmPassword" type="password" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogStatus = false">
            {{ $t('table.cancel') }}
          </el-button>
          <el-button type="primary" @click="changePassword()">
            {{ $t('table.confirm') }}
          </el-button>
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import { modifyingPersonalInfo, loadPersonalInfo, modifyingPersonalPassword } from '@/api/SysCenterUser'

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          roles: ''
        }
      }
    }
  },
  data() {
    return {
      isEdit: false,
      dialogStatus: false,
      temp: {},
      userInfo: {},
      tempUserInfo: {},
      rules: {
        oldPassword: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
        newPassword: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
        confirmPassword: [{ required: true, message: '确认密码不能为空', trigger: 'blur' }]
      },
      uploadActionUrl: process.env.VUE_APP_BASE_API + '/file/upload'
    }
  },
  computed: {
    avatar() {
      return this.$store.state.avatar
    }
  },
  created() {
    loadPersonalInfo().then(response => {
      this.userInfo = response.data
    })
  },
  methods: {
    handleUpdate() {
      this.isEdit = true
      this.tempUserInfo = Object.assign({}, this.userInfo)
    },
    saveData() {
      if (this.userInfo.phone === this.tempUserInfo.phone) {
        this.isEdit = false
        return
      }
      modifyingPersonalInfo(this.userInfo).then(response => {
        this.isEdit = false
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    changePassword() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          modifyingPersonalPassword(this.temp).then(() => {
            this.dialogStatus = false
            this.$notify({
              title: '成功',
              message: '密码修改成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handlePictureCardPreview(response, file, fileList) {
      this.userInfo.headImgUrl = response.data.url
      this.$store.commit('user/SET_AVATAR', this.userInfo.headImgUrl)
      modifyingPersonalInfo(this.userInfo).then(response => {
        this.isEdit = false
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 .box-center {
   margin: 0 auto;
   display: table;
 }

 .text-muted {
   color: #777;
 }

 .user-profile {
   .user-name {
     font-weight: bold;
   }

   .box-center {
     padding-top: 10px;
   }

   .user-role {
     padding-top: 10px;
     font-weight: 400;
     font-size: 14px;
   }

   .box-social {
     padding-top: 30px;

     .el-table {
       border-top: 1px solid #dfe6ec;
     }
   }

   .user-follow {
     padding-top: 20px;
   }
 }

 .user-bio {
   margin-top: 20px;
   color: #606266;

   span {
     padding-left: 4px;
   }

   .user-bio-section {
     font-size: 14px;
     padding: 15px 0;

     .user-bio-section-header {
       border-bottom: 1px solid #dfe6ec;
       padding-bottom: 10px;
       margin-bottom: 10px;
       font-weight: bold;
     }
   }
 }
</style>
