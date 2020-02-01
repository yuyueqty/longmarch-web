<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <el-button style="margin-left: 10px;" type="success" @click="submitForm">
          发布
        </el-button>
        <router-link :to="'/cms/article'">
          <el-button>返回</el-button>
        </router-link>
      </sticky>
      <div class="createPost-main-container">
        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item prop="title">
              <MDinput v-model="postForm.title" required>
                标题
              </MDinput>
            </el-form-item>
            <el-form-item prop="content">
              <Tinymce ref="editor" v-model="postForm.content" />
            </el-form-item>
            <el-form-item label="文章封面图片" prop="imageUrl">
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
            <el-form-item label="文章外链（文章转载源地址）">
              <el-input v-model="postForm.sourceUrl" placeholder="请输外链地址 http://www.baidu.com">
                <template slot="prepend">Http://</template>
              </el-input>
            </el-form-item>
            <el-form-item label="文章摘要（新写文章为空时，会自动生成摘要）">
              <el-input
                v-model="postForm.summary"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="文章分类" class="postInfo-container-item">
              <el-cascader
                v-model="categoryIds"
                clearable
                expand-trigger="hover"
                change-on-select
                :options="categoryList"
                :props="{ value: 'id', label: 'categoryName' }"
                @change="handleChange"
              />
            </el-form-item>
            <el-form-item label="文章发布状态" class="postInfo-container-item">
              <el-select v-model="postForm.publishStatus" class="filter-item">
                <el-option v-for="item in dictionary.publish_status_dict" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="推荐文章" class="postInfo-container-item">
              <el-checkbox v-model="isRecommend" />
            </el-form-item>
            <el-form-item label="标签（多个标签用逗号分隔）">
              <el-input
                v-model="postForm.label"
                type="textarea"
                :rows="2"
                placeholder="请输入标签"
              />
            </el-form-item>
            <el-form-item label="文章作者（默认为当前登录用户）" class="postInfo-container-item">
              <el-input v-model="postForm.author" type="text" autosize placeholder="请输入文章作者" />
            </el-form-item>
            <el-form-item label="文章定时发布时间" class="postInfo-container-item">
              <el-date-picker v-model="postForm.publishTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择发布时间" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky'
import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'
import { show, create, loadCategory } from '@/api/Article'
const defaultForm = {
  publishStatus: 1,
  publishTime: parseTime(new Date())
}

export default {
  name: 'ArticleDetail',
  components: { Tinymce, MDinput, Sticky },
  filters: {
    dictFirst(status, dict) {
      const statusMap = {}
      dict.forEach(item => {
        statusMap[item.value] = item.label
      })
      return statusMap[status]
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      isRecommend: false,
      categoryList: [],
      categoryIds: [],
      rules: {

      },
      uploadActionUrl: process.env.VUE_APP_BASE_API + '/file/upload',
      tempRoute: {}
    }
  },
  computed: {
    ...mapGetters(['dictionary', 'name'])
  },
  created() {
    this.postForm.author = this.name
    loadCategory().then((response) => {
      this.categoryList = response.data
    })
    if (this.$route.params && this.$route.params.id) {
      this.loadArticle(this.$route.params.id)
    }
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    loadArticle(id) {
      show(id).then(response => {
        this.postForm = response.data
        this.categoryIds = response.pIds
        this.isRecommend = this.postForm.recommend === 2
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      if (this.postForm.title === undefined || this.postForm.title === '') {
        this.$message({
          message: '请别忘了填写文章标题',
          type: 'warning'
        })
        return
      }
      if (this.postForm.content === undefined || this.postForm.content === '') {
        this.$message({
          message: '请别忘了填写文章内容',
          type: 'warning'
        })
        return
      }
      if (this.categoryIds.length === 0) {
        this.$message({
          message: '请别忘了选择文章分类',
          type: 'warning'
        })
        return
      }
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.postForm.categoryId = this.categoryIds[this.categoryIds.length - 1]
          this.postForm.recommend = this.isRecommend === true ? 2 : 1
          create(this.postForm).then((response) => {
            this.$notify({
              title: '成功',
              message: '发布文章成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({ name: 'CreateArticle' })
          })
        }
      })
    },
    handleChange(value) {
      this.categoryIds = value
    },
    handlePictureCardPreview(response, file, fileList) {
      this.postForm.imageUrl = response.data.url
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
