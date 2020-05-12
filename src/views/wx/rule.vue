<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="filter-container clearfix">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="handleCreate()">
          {{ $t('table.add') }}
        </el-button>
      </div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="新标签">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-input v-model="row.newTag" class="edit-input" size="small" />
              <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
                type="warning"
                @click="saveEdit(row)"
              >
                保存
              </el-button>
              <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(row)"
              >
                取消
              </el-button>
            </template>
            <span v-else>{{ row.newTag }}</span>
          </template>
        </el-table-column>
        <el-table-column label="公众号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.gzhName }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('table.actions')" width="400px" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="confirmEdit(row)">
              编辑新标
            </el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="showRule(row)">
              编辑规则
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="编辑规则" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp">
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="ruleList"
          highlight-current-row
          style="width: 100%;"
        >
          <el-table-column label="规则编号" align="rid">
            <template slot-scope="scope">
              <span>{{ scope.row.rid }}</span>
            </template>
          </el-table-column>
          <el-table-column label="描述" align="content">
            <template slot-scope="scope">
              <span>{{ scope.row.content }}</span>
            </template>
          </el-table-column>
          <el-table-column label="评分" align="score">
            <template slot-scope="scope">
              <el-input v-model="scope.row.score" />
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="saveData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑规则" :visible.sync="dialogFormVisible2">
      <el-form ref="dataForm" :model="temp">
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="ruleList"
          highlight-current-row
          style="width: 100%;"
        >
          <el-table-column label="规则编号" align="rid">
            <template slot-scope="scope">
              <span>{{ scope.row.rid }}</span>
            </template>
          </el-table-column>
          <el-table-column label="描述" align="content">
            <template slot-scope="scope">
              <span>{{ scope.row.content }}</span>
            </template>
          </el-table-column>
          <el-table-column label="评分" align="score">
            <template slot-scope="scope">
              <el-input v-model="scope.row.score" />
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="saveData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { rules, saveRule } from '@/api/FwtagRuleApi'

export default {
  name: 'FwtagRuleApi',
  data() {
    return {
      tableKey: 0,
      list: [],
      temp: {
        id: null,
        rid: null,
        content: null,
        score: null
      },
      ruleList: [],
      listLoading: true,
      dialogFormVisible: false,
      dialogFormVisible2: false
    }
  },
  computed: {

  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      rules().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    showRule(row) {
      this.dialogFormVisible = true
      this.ruleList = row.rules
    },
    saveData() {
      saveRule(this.ruleList).then(response => {
        this.dialogFormVisible = false
      })
    },
    saveEdit(row) {
      row.rules.forEach((item, index, arr) => {
        arr[index].newTag = row.newTag
      })
      saveRule(row.rules).then(response => {
        this.dialogFormVisible = false
        row.edit = false
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      })
    },
    confirmEdit(row) {
      row.edit = true
    },
    cancelEdit(row) {
      row.edit = false
    },
    handleCreate() {
      this.dialogFormVisible2 = true
    }
  }
}
</script>
