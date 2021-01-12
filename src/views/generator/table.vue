<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="filter-container clearfix">
        <el-input v-model="listQuery.tableName" clearable :placeholder="$t('tableInfo.tableName')" style="width: 200px;" class="filter-item" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          {{ $t('table.search') }}
        </el-button>
      </div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        highlight-current-row
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item :label="$t('tableInfo.engine')">
                <span>{{ props.row.engine }}</span>
              </el-form-item>
              <el-form-item :label="$t('tableInfo.encoding')">
                <span>{{ props.row.encoding }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- <el-table-column
          type="selection"
          width="55"
        /> -->
        <el-table-column :label="$t('tableInfo.tableName')">
          <template slot-scope="scope">
            <span>{{ scope.row.tableName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableInfo.comment')">
          <template slot-scope="scope">
            <span>{{ scope.row.comment }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableInfo.createTime')">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="checkPermission(['sys:generator:columns', 'sys:generator:download'])" fixed="right" :label="$t('table.actions')" align="center" width="300" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-permission="['sys:generator:columns']" class="filter-item" style="margin-left: 10px;" type="primary" @click="$router.push({name:'GeneratorColumn',params:{tableName: row.tableName}})">
              {{ $t('table.config') }}
            </el-button>
            <el-button v-permission="['sys:generator:download']" class="filter-item" style="margin-left: 10px;" type="primary" @click="handleDownload(row)">
              {{ $t('table.download') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
    </el-card>
    <el-dialog title="请正系统模块名称" :visible.sync="dialogStatus">
      <el-form ref="dataForm" :model="download" label-width="80px" style="width: 400px; margin-left:80px;">
        <el-form-item label="表名" prop="tableName">
          <el-input v-model="download.tableName" disabled />
        </el-form-item>
        <el-form-item label="模块名称" prop="moduleName">
          <el-input v-model="download.moduleName" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogStatus = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="downloadData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import checkPermission from '@/utils/permission'
import { tableList } from '@/api/GeneratorApi'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { Message } from 'element-ui'
// import { downloadFile } from '@/utils/index'
// import fileDownload from 'js-file-download'

export default {
  name: 'TableManage',
  components: { Pagination },
  directives: { waves, permission },
  data() {
    return {
      tableKey: 0,
      list: null,
      ids: [],
      total: 0,
      listLoading: true,
      listQuery: {
        current: 1,
        size: 10,
        tableName: null
      },
      download: {},
      dialogStatus: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    checkPermission,
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      tableList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSelectionChange(val) {
      this.ids = val
    },
    handleUpdate(row) {
      alert(row.tableName)
    },
    handleDownload(row) {
      this.dialogStatus = true
      this.download.tableName = row.tableName
    },
    downloadData() {
      if (this.download.moduleName === undefined || this.download.moduleName === '') {
        Message({
          message: '系统模块名称不能为空',
          type: '警告！！！',
          duration: 5 * 1000
        })
      } else {
        this.dialogStatus = false
        window.open(process.env.VUE_APP_BASE_API + '/sys/generator/download?moduleName=' + this.download.moduleName + '&tableName=' + this.download.tableName)
        // window.location.href = 'http://192.168.56.1:8081/lmapi/sys/generator/download?moduleName=' + this.download.moduleName + '&tableName=' + this.download.tableName
        // download(this.download, { responseType: 'arraybuffer' }).then(response => {
        //   this.dialogStatus = false
        //   console.log(response)
        //   // downloadFile(response, this.download.tableName, 'zip')
        //   // const link = document.createElement('a')
        //   // const blob = new Blob([response])
        //   // const objectUrl = URL.createObjectURL(blob) // 创建URL
        //   // link.href = objectUrl
        //   // link.download = 'xxx.zip' // 自定义文件名
        //   // link.click() // 下载文件
        //   // URL.revokeObjectURL(objectUrl) // 释放内存
        //   fileDownload(response, 'xxx.zip')
        //   this.$notify({
        //     title: '成功',
        //     message: '下载成功',
        //     type: 'success',
        //     duration: 2000
        //   })
        // })
      }
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
    width: 50%;
  }
</style>

