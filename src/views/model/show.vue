<template>
  <div class="app-container">
    <el-header>{{ this.model.modelName }} <span>{{ new Date(this.model.lastModifyDate).toLocaleDateString("en-US") }}</span> </el-header>
    <el-main>
      <section class="about">
        <span>模型介绍：</span>
        {{ this.model.modelAbout }}
      </section>

      <section class="experiments">
        <span>实验记录：</span>
        <chart
          :options="plot"
          group="radiance"
          theme="macarons"
          ref="c2"
          @click="onCheckpoint"
          auto-resize
        />
      </section>
    </el-main>
  </div>
</template>

<script>
import { getModel } from '@/api/model'
import { getExperiments } from '@/api/experiment'
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'

export default {
  components: {
    chart: ECharts
  },
  data() {
    return {
      model: '',
      experiments: '',
      plot: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        xAxis: {
          type: 'category',
          data: [],
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '性能数据',
          data: [],
          type: 'line'
        }]
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      this.fetchData(this.$route.query.id)
    }
  },
  methods: {
    async fetchData(id) {
      let data = (await getModel(id)).data
      this.model = data
      data = (await getExperiments(id)).data

      data.sort((a, b) => {
        if (a.epoch > b.epoch) return 1
        return 0
      })

      this.experiments = data

      data.forEach(experiment => {
        this.plot.xAxis.data.push(experiment.epoch)
        this.plot.series[0].data.push(experiment.result)
      })
    },
    onCheckpoint(param) {
      const experiment = this.experiments.find(experiment => experiment.epoch === parseInt(param.name))
      const url = `http://127.0.0.1:8080/download?url=${experiment.checkpoint}`
      window.open(url)
    }
  }
}
</script>

<style scoped>
.el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: left;
    line-height: 60px;
}
.el-header span {
  font-size: 8px;
}
section {
  margin-top: 20px;
  font-size: 14px;
  color: #333;
}
</style>