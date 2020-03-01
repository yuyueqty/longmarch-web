<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="filter-container clearfix">
        <el-button class="filter-item" style="float: right;margin-left: 2%;" @click="getList">
          {{ $t('tagsView.refresh') }}
        </el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column :label="$t('onlineUserInfo.username')">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('onlineUserInfo.host')">
          <template slot-scope="scope">
            <span>{{ scope.row.host }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('onlineUserInfo.sessionId')">
          <template slot-scope="scope">
            <span>{{ scope.row.sessionId }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('onlineUserInfo.timeout')">
          <template slot-scope="scope">
            <span>{{ scope.row.timeout }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('onlineUserInfo.startTimestamp')">
          <template slot-scope="scope">
            <span>{{ scope.row.startTimestamp }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('onlineUserInfo.lastAccessTime')">
          <template slot-scope="scope">
            <span>{{ scope.row.lastAccessTime }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="checkPermission(['sys:kickout:onlineuser'])" fixed="right" :label="$t('table.actions')">
          <template slot-scope="{row}">
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="kickOutUser(row.username)">
              {{ $t('table.kickOutUser') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import { onlineUsers, kickOutUser } from '@/api/SysOnlineUser'

export default {
  name: 'OnlineUserManage',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    checkPermission,
    getList() {
      this.listLoading = true
      onlineUsers().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    kickOutUser(username) {
      kickOutUser(username).then(response => {
        this.getList()
        this.$notify({
          title: '成功',
          message: '踢出成功',
          type: 'success',
          duration: 2000
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
    width: 50%;
  }
</style>
