<template>
  <el-cascader
    v-model="selectIds"
    clearable
    expand-trigger="hover"
    change-on-select
    :options="list"
    @change="handleChange"
  />
</template>
<script>

export default {
  props: {
    ids: {
      type: Array,
      default: function() {
        return []
      }
      // require: true // 必填
    }
  },
  data() {
    return {
      selectIds: this.ids,
      list: [{
        value: 1,
        label: '长征集团',
        children: [
          {
            value: 2,
            label: '总经办'
          }, {
            value: 3,
            label: '人事部'
          }, {
            value: 4,
            label: '销售部'
          }
        ]
      }]
    }
  },
  created() {
    // this.selectIds = this.ids
    console.log(this.ids)
  },
  methods: {
    handleChange(value) {
      this.selectIds = value
      this.$emit('handleChange', value)
    }
  }
}
</script>
