<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="filter-container clearfix">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline">
          <el-form-item :label="$t('articleInfo.publishStatus')" class="postInfo-container-item">
            <el-select v-model="listQuery.publishStatus" clearable class="filter-item">
              <el-option v-for="item in dictionary.publish_status_dict" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('articleInfo.recommend')" class="postInfo-container-item">
            <el-select v-model="listQuery.recommend" clearable class="filter-item">
              <el-option v-for="item in dictionary.recommend_dict" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('articleInfo.articleCategory')">
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
          <el-form-item :label="$t('articleInfo.title')">
            <el-input v-model="listQuery.fuzzySearch" clearable :placeholder="$t('articleInfo.title')" />
          </el-form-item>
          <el-form-item>
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
              {{ $t('table.search') }}
            </el-button>
          </el-form-item>
        </el-form>
        <el-button v-permission="['cms:article:create']" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="$router.push({name:'CreateArticle'})">
          {{ $t('table.add') }}
        </el-button>
        <el-button v-permission="['cms:article:delete']" :disabled="batchDeleteButtonStatus" class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="handleDelete()">
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
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item :label="$t('articleInfo.summary')">
                <span>{{ props.row.summary }}</span>
              </el-form-item>
              <el-form-item :label="$t('articleInfo.imageUrl')">
                <img v-if="props.row.imageUrl" style="width: 50px; height: 50px;" :src="props.row.imageUrl" class="avatar">
              </el-form-item>
              <el-form-item :label="$t('articleInfo.sourceUrl')">
                <span>{{ props.row.sourceUrl }}</span>
              </el-form-item>
              <el-form-item :label="$t('articleInfo.clicks')">
                <span>{{ props.row.clicks }}</span>
              </el-form-item>
              <el-form-item :label="$t('articleInfo.likes')">
                <span>{{ props.row.likes }}</span>
              </el-form-item>
              <el-form-item :label="$t('articleInfo.createTime')">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
              <el-form-item :label="$t('articleInfo.updateTime')">
                <span>{{ props.row.updateTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column :label="$t('articleInfo.title')" width="250px">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('articleInfo.articleCategory')">
          <template slot-scope="scope">
            <span>{{ scope.row.categoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('articleInfo.publishStatus')" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.publishStatus | dictFirst(dictionary.style_dict)">
              <span>{{ scope.row.publishStatus | dictFirst(dictionary.publish_status_dict) }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="checkPermission(['cms:article:update'])" :label="$t('articleInfo.recommend')" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.recommend"
              :active-value="1"
              :inactive-value="0"
              @change="changeSwitch($event, scope.row.id)"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('articleInfo.recommend')" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.recommend | dictFirst(dictionary.style_dict)">
              <span>{{ scope.row.recommend | dictFirst(dictionary.recommend_dict) }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('articleInfo.publishTime')" width="160px">
          <template slot-scope="scope">
            <span>{{ scope.row.publishTime }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="checkPermission(['cms:article:update', 'cms:article:delete'])" fixed="right" :label="$t('table.actions')" align="center" width="200px" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <!-- <router-link :to="{name: 'EditArticle'}">
              <el-button v-permission="['cms:article:update']" class="filter-item" style="margin-left: 10px;" type="primary">{{ $t('table.edit') }}</el-button>
            </router-link> -->
            <el-button v-permission="['cms:article:update']" class="filter-item" style="margin-left: 10px;" type="primary" @click="$router.push({name:'EditArticle',params:{id: row.id}})">
              {{ $t('table.edit') }}
            </el-button>
            <el-button v-permission="['cms:article:delete']" class="filter-item" style="margin-left: 10px;" type="danger" @click="handleDelete(row)">
              {{ $t('table.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
    </el-card>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import checkPermission from '@/utils/permission'
import { fetchList, create, update, remove, loadRoles, loadCategory, changeRecommendStatus } from '@/api/Article'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'

export default {
  name: 'ArticleManage',
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
      list: null,
      total: 0,
      listLoading: true,
      categoryList: [],
      categoryIds: [],
      listQuery: {
        current: 1,
        size: 10,
        fuzzySearch: null,
        publishStatus: null,
        recommend: null,
        categoryId: null
      },
      ids: [],
      temp: {
        id: null,
        username: null,
        password: null,
        status: null,
        headImgUrl: null,
        createTime: null,
        roleIds: null
      },
      dialogFormVisible: false,
      dialogStatus: 'create',
      textMap: {
        update: '编辑文章',
        create: '添加文章'
      },
      rules: {
        username: [{ required: true, message: 'username is required', trigger: 'blur' }]
      },
      roleList: null,
      selectedRoles: null,
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
    this.loadCategory()
  },
  methods: {
    checkPermission,
    getList() {
      this.listLoading = true
      this.listQuery.categoryId = this.categoryIds[this.categoryIds.length - 1]
      fetchList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    loadCategory() {
      loadCategory().then((response) => {
        this.categoryList = response.data
      })
    },
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: null,
        username: null,
        status: null,
        headImgUrl: null
      }
    },
    handleCreate() {
      this.selectedRoles = []
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.loadRoles()
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.roleIds = this.selectedRoles.join()
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
    handleUpdate(row) {
      this.selectedRoles = []
      if (row.roleIds && row.roleIds.split(',') && row.roleIds.split(',').length) {
        row.roleIds.split(',').forEach(item => {
          this.selectedRoles.push(Number.parseInt(item))
        })
      }
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.loadRoles()
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.roleIds = this.selectedRoles.join()
          update(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
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
    handleDelete(row) {
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '【删除文章】操作，是否继续? ')
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
              this.getList()
              instance.confirmButtonLoading = false
            })
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'success',
          message: '操作完成'
        })
      })
    },
    handleSelectionChange(val) {
      this.ids = val
    },
    loadRoles() {
      loadRoles().then(response => {
        this.roleList = response.data
      })
    },
    handlePictureCardPreview(response, file, fileList) {
      this.temp.headImgUrl = response.data.url
    },
    handleChange(value) {
      this.categoryIds = value
    },
    changeSwitch($event, id) {
      const o = { id: id, status: $event }
      this.$confirm('【修改文章推荐状态】操作，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        changeRecommendStatus(o).then(() => {
          for (const v of this.list) {
            if (v.id === id) {
              v.recommend = o.status
              break
            }
          }
        })
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }).catch(() => {
        for (const v of this.list) {
          if (v.id === id) {
            v.recommend = o.status === 1 ? 0 : 1
            break
          }
        }
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    }
  }
}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
</style>
