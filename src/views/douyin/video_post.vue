<template>
  <div>
    <el-row :gutter="15">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-col :span="12">
          <el-row>
            <el-col :span="24">
              <el-form-item label-width="0" prop="field113">
                <el-input
                  v-model="formData.field113"
                  type="textarea"
                  placeholder="请输入"
                  readonly
                  :autosize="{minRows: 4, maxRows: 10}"
                  :style="{width: '100%'}"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="" prop="file" required>
                <el-upload
                  ref="file"
                  :file-list="field108fileList"
                  :action="field108Action"
                  :before-upload="field108BeforeUpload"
                  list-type="picture-card"
                >
                  <i class="el-icon-plus" />
                  <div slot="tip" class="el-upload__tip">只能上传不超过 300MB 的文件</div>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="" prop="field114">
                <el-input
                  v-model="formData.field114"
                  type="textarea"
                  placeholder="请输入视频描述"
                  :autosize="{minRows: 4, maxRows: 4}"
                  :style="{width: '100%'}"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="" prop="field104">
                <el-button type="success" icon="el-icon-s-promotion" size="medium"> 发布 </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24">
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        field113: '发布小视频\n\n1、视频时长不超过60s，30s内的竖屏小视频推荐效果最佳\n\n2、无水印、高清晰度的视频效果更佳',
        file: null,
        field114: undefined,
        field104: undefined
      },
      rules: {
        field113: [],
        field114: []
      },
      field108Action: 'http://localhost:8081/lmapi/douyin/videoUpload',
      field108fileList: []
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
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    field108BeforeUpload(file) {
      const isRightSize = file.size / 1024 / 1024 < 300
      if (!isRightSize) {
        this.$message.error('文件大小超过 300MB')
      }
      return isRightSize
    }
  }
}

</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}

</style>
