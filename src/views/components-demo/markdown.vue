<template>
  <div class="components-container">
    <el-form ref="postForm" :model="postForm" class="form-container">
      <el-form-item label="文章封面图片">
        <el-upload
          class="avatar-uploader"
          :action="uploadActionUrl"
          :show-file-list="false"
          :with-credentials="true"
          :on-success="handlePictureCardPreview"
        >
          <img v-if="postForm.imageUrl" style="width: 300px; height: 150px" :src="postForm.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item class="postInfo-container-item">
        <el-input v-model="postForm.title">
          <template slot="prepend">标题</template>
          <template slot="append">
            <el-button type="success" @click="submitForm">保存</el-button>
          </template>
        </el-input>
      </el-form-item>
      <markdown-editor ref="editor" v-model="postForm.content" language="zh_CN" height="300px" />
    </el-form>
    <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="getHtml">
      效果预览
    </el-button>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import { create } from '@/api/Article'
import { parseTime } from '@/utils'

export default {
  name: 'MarkdownDemo',
  components: { MarkdownEditor },
  data() {
    return {
      html: '',
      postForm: {},
      uploadActionUrl: process.env.VUE_APP_BASE_API + '/file/upload'
    }
  },
  methods: {
    getHtml() {
      this.html = this.$refs.editor.getHtml()
      console.log(this.html)
    },
    submitForm() {
      if (this.postForm.title === undefined || this.postForm.title === '') {
        this.$message({
          message: '请别忘了填写文章标题',
          type: 'warning'
        })
        return
      }
      this.$refs.postForm.validate(() => {
        this.postForm.categoryId = 1
        this.postForm.publishStatus = 3
        this.postForm.publishTime = parseTime(new Date())
        this.postForm.author = '跃哥'
        this.postForm.content = this.$refs.editor.getHtml()
        create(this.postForm).then((response) => {
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          this.$router.push({ name: 'ArticleManage' })
        })
      })
    },
    handlePictureCardPreview(response, file, fileList) {
      this.postForm.imageUrl = response.data.url
    }
  }
}
</script>

<style scoped>
.editor-container{
  margin-bottom: 30px;
}
.tag-title{
  margin-bottom: 5px;
}
</style>
