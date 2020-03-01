<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="filter-container clearfix">
        <el-tag type="danger">
          {{ $t('tableInfo.tableName') }}：{{ tableName }}
        </el-tag>
        <el-button class="filter-item" style="float: right;margin-left: 2%;" @click="$router.push({name:'GeneratorTable'})">
          {{ $t('table.goBack') }}<i class="el-icon-arrow-right" />
        </el-button>
        <el-button class="filter-item" type="primary" style="float: right;margin-left: 2%;" @click="batchSaveGenerator">
          {{ $t('table.batchSave') }}
        </el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column fixed="left" :label="$t('columnInfo.columnName')" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.columnName }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column :label="$t('columnInfo.columnType')" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.columnType }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="字段描述" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.comment }}</span>
          </template>
        </el-table-column>
        <el-table-column label="页面展示">
          <template slot-scope="{row}">
            <el-input v-model="row.remark" :value="row.remark" />
          </template>
        </el-table-column>
        <el-table-column label="默认值" width="80px">
          <template slot-scope="{row}">
            <el-input v-model="row.defaultValue" :value="row.defaultValue" />
          </template>
        </el-table-column>
        <el-table-column label="必须" align="center" width="50px">
          <template slot-scope="{row}">
            <el-checkbox v-model="row.notNull" />
          </template>
        </el-table-column>
        <el-table-column label="列表" align="center" width="50px">
          <template slot-scope="{row}">
            <el-checkbox v-model="row.listShow" />
          </template>
        </el-table-column>
        <el-table-column label="表单" align="center" width="50px">
          <template slot-scope="{row}">
            <el-checkbox v-model="row.formShow" />
          </template>
        </el-table-column>
        <el-table-column label="排序" align="center" width="50px">
          <template slot-scope="{row}">
            <el-checkbox v-model="row.orderBy" />
          </template>
        </el-table-column>
        <!-- <el-table-column label="参数" align="center" width="50px">
          <template slot-scope="{row}">
            <el-checkbox v-model="row.parameter" />
          </template>
        </el-table-column> -->
        <el-table-column label="表单类型" align="center" width="120px">
          <template slot-scope="{row}">
            <el-select v-model="row.formType" clearable placeholder="请选择">
              <el-option
                v-for="item in formTypeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="查询类型" align="center" width="120px">
          <template slot-scope="{row}">
            <el-select v-model="row.queryType" clearable placeholder="请选择">
              <el-option
                v-for="item in queryTypeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="关联字典" align="center" width="120px">
          <template slot-scope="{row}">
            <el-select v-model="row.dictCode" clearable placeholder="请选择">
              <el-option
                v-for="item in dictCodeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('table.actions')" width="50px" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button v-permission="['sys:generator:create']" type="success" icon="el-icon-check" circle @click="saveData(row)" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import { tableColumns, saveGenerator, batchSaveGenerator } from '@/api/GeneratorApi'
import { loadDictionaryCode } from '@/api/SysDictionary'

export default {
  name: 'ColumnManage',
  directives: { permission },
  data() {
    return {
      // 表单类型（input, textarea, radio, checkbox, date）
      list: [],
      tableName: null,
      dictCodeOption: [],
      formTypeOption: [{
        value: 'input',
        label: '文本框'
      }, {
        value: 'textarea',
        label: '文本域'
      }, {
        value: 'radio',
        label: '单选框'
      }, {
        value: 'option',
        label: '下拉框'
      }, {
        value: 'checkbox',
        label: '多选框'
      }, {
        value: 'date',
        label: '日期框'
      }, {
        value: 'uplaod',
        label: '上传框'
      }],
      queryTypeOption: [{
        value: 'eq',
        label: '='
      }, {
        value: 'date',
        label: 'Between'
      }, {
        value: 'like',
        label: 'Like'
      }]
    }
  },
  created() {
    this.tableName = this.$route.params.tableName
    this.getList()
    this.loadDictionaryCode()
  },
  methods: {
    getList() {
      this.listLoading = true
      tableColumns(this.tableName).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    saveData(row) {
      if (row.remark === undefined || row.remark === '') {
        row.remark = row.comment
      }
      saveGenerator(row).then(response => {
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    batchSaveGenerator() {
      const newList = this.list.map(row => {
        if (row.remark === null || row.remark === undefined || row.remark === '') {
          row.remark = row.comment
        }
        return row
      })
      batchSaveGenerator(newList).then(response => {
        this.$notify({
          title: '成功',
          message: '批量保存成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    loadDictionaryCode() {
      loadDictionaryCode().then(response => {
        this.dictCodeOption = response.data
      })
    }
  }
}
</script>

<style>

</style>

