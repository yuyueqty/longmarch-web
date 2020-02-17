<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of list" :key="index" :timestamp="item.operateTime" placement="top">
        <el-card>
          <h4>{{ item.busType }}</h4>
          <p>{{ item.operateType }}</p>
          <div class="editor-container">
            <json-editor ref="jsonEditor" v-model="item.operateDetail" />
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import JsonEditor from '@/components/JsonEditor'
import { fetchList } from '@/api/SysOperateLog'

export default {
  components: { JsonEditor },
  data() {
    return {
      list: [{ busType: 'busType', operateType: 'operateType', operateDetail: [{}], operateTime: '2020-02-16' }]
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
        this.list = response.data.records.map(item => {
          item.operateDetail = JSON.parse(item.operateDetail)
          return item
        })
      })
    },
    jsonParse(jsonData) {
      return JSON.parse(jsonData)
    }
  }
}
</script>

<style scoped>
.editor-container{
  position: relative;
  height: 100%;
}
</style>
