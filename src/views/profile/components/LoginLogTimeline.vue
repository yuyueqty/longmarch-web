<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of list" :key="index" :timestamp="item.loginTime" placement="top">
        <el-card>
          <h4>{{ item.userName }}</h4>
          <p>{{ item.ip }}</p>
          <p>{{ item.userAgent }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchList } from '@/api/SysLoginLog'

export default {
  data() {
    return {
      list: []
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList({ username: this.name }).then(response => {
        this.list = response.data.records
      })
    }
  }
}
</script>
