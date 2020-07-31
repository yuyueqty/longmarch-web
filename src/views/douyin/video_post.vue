<template>
  <div>
    <el-form
      ref="elForm"
      :model="formData"
      :rules="rules"
      size="medium"
      label-width="100px"
      label-position="left"
    >
      <el-row>
        <el-form-item label="" prop="field113">
          <p>发布小视频</p>
          <p>1、视频时长不超过60s，30s内的竖屏小视频推荐效果最佳</p>
          <p>2、无水印、高清晰度的视频效果更佳</p>
        </el-form-item>
        <el-form-item label="" prop="file">
          <el-upload
            ref="file"
            :file-list="filefileList"
            :action="fileAction"
            :with-credentials="true"
            :before-upload="fileBeforeUpload"
            :on-success="fileSuccessUpload"
            list-type="picture-card"
            accept="video/*"
          >
            <i class="el-icon-plus" />
            <div slot="tip" class="el-upload__tip">只能上传不超过 300MB 的video/*文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="" prop="videoId">
          <el-input v-model="formData.videoId" type="text" disabled />
        </el-form-item>
        <el-form-item label="" prop="text">
          <el-input
            v-model="formData.text"
            type="textarea"
            placeholder="请输入视频描述"
            :autosize="{minRows: 4, maxRows: 4}"
            :style="{width: '100%'}"
          />
        </el-form-item>
      </el-row>
      <el-form-item size="large">
        <el-button type="success" icon="el-icon-s-promotion" @click="submitForm">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { videoCreate } from '@/api/DouyinVideo'

export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        videoId: '',
        text: ''
        // poiId: '',
        // poiName: '',
        // microAppUrl: '',
        // microAppTitle: '',
        // articleId: '',
        // articleTitle: '',
        // atUsers: '',
        // microAppId: '',
        // timelinessLabel: '',
        // gameContent: '',
        // gameId: '',
        // timelinessKeyword: ''
      },
      rules: {
        field113: [],
        field114: []
      },
      fileAction: 'http://localhost:8081/lmapi/videoUpload',
      filefileList: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
        videoCreate(this.formData).then(response => {
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
          this.$router.push({ name: 'DouyinVideoManage' })
        })
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    fileBeforeUpload(file) {
      const isRightSize = file.size / 1024 / 1024 < 300
      if (!isRightSize) {
        this.$message.error('文件大小超过 300MB')
      }
      const isAccept = new RegExp('video/*').test(file.type)
      if (!isAccept) {
        this.$message.error('应该选择video/*类型的文件')
      }
      return isRightSize && isAccept
    },
    fileSuccessUpload(response, file, fileList) {
      console.log(response.data.video.video_id)
      this.formData.videoId = response.data.video.video_id
    }
  }
}

</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}

</style>
