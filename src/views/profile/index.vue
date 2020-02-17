<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <!-- <el-tab-pane label="最新文章" name="ArticleTimeline">
                <ArticleTimeline />
              </el-tab-pane> -->
              <el-tab-pane label="登录日志" name="LoginLogTimeline">
                <LoginLogTimeline />
              </el-tab-pane>
              <el-tab-pane label="操作日志" name="OperateTimeline">
                <OperateTimeline />
              </el-tab-pane>
              <!-- <el-tab-pane label="Account" name="account">
                <account :user="user" />
              </el-tab-pane> -->
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
// import Activity from './components/Activity'
import LoginLogTimeline from './components/LoginLogTimeline'
import OperateTimeline from './components/OperateTimeline'
// import ArticleTimeline from './components/ArticleTimeline'
// import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, LoginLogTimeline, OperateTimeline },
  data() {
    return {
      user: {},
      activeTab: 'LoginLogTimeline'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        email: 'admin@test.com',
        avatar: this.avatar
      }
    }
  }
}
</script>
