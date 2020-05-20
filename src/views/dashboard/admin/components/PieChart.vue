<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { openid } from '@/api/GzhFenweiTagApi'

export default {
  name: 'PieChart',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart2()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    showTag(openId, user) {
      openid(openId).then(response => {
        this.initChart(response.data, user)
      })
    },
    initChart(data, user) {
      this.chart = echarts.init(this.$el, 'macarons')
      const info = '用户：' + user.nickname + '  营销标签：' + (user.fenWeiTags === null ? '无' : user.fenWeiTags)
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: data.names
        },
        calculable: true,
        series: [
          {
            name: info,
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: data.tags,
            animationEasing: 'cubicInOut',
            animationDuration: 600
          }
        ]
      })
    },
    initChart2() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['有魄力、敢于冒险、追求事业成功', '喜欢对事情作出评价', '善于推陈出新']
        },
        calculable: true,
        series: [
          {
            name: '用户：画地为牢 性别：男 地区：-- 行业：交友',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: 320, name: '有魄力、敢于冒险、追求事业成功' },
              { value: 240, name: '喜欢对事情作出评价' },
              { value: 149, name: '善于推陈出新' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 600
          }
        ]
      })
    }
  }
}
</script>
