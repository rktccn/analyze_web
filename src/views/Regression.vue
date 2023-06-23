<template>
  <span class='title'>
    回归分析
  </span>
  <el-button type='primary'>导入数据</el-button>
  <load-data></load-data>
  <div class='main block'>
    <el-row :gutter='20'>
      <el-col :span='18'>
        <v-chart class='chart' :option='option' autoresize :key='regressionValue.id' />
      </el-col>
      <el-col :span='6'>
        <el-text>回归方法</el-text>
        <br />
        <el-select v-model='regressionValue' class='m-2' placeholder='Select' size='large'>
          <el-option
            v-for='item in regressionMethod'
            :key='item.id'
            :label='item.label'
            :value='item'
          />
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import LoadData from '@/components/loadData.vue'
import VChart from 'vue-echarts'
import { CanvasRenderer } from 'echarts/renderers'
import { ScatterChart } from 'echarts/charts'
import {} from 'echarts/components'
import { use } from 'echarts/core'
import { computed, ref } from 'vue'
import * as echarts from 'echarts'
import * as ecStat from 'echarts-stat'

use([
  CanvasRenderer,
  ScatterChart
])


// 回归方式选择
const regressionMethod = ref([{
  id: 1,
  label: '线性回归',
  value: { method: 'linear', formulaOn: 'end' }
}, {
  id: 2,
  label: '多项式回归',
  value: { method: 'polynomial', order: 3 }
}, {
  id: 3,
  label: '指数回归',
  value: { method: 'exponential' }
}])

const regressionValue = ref(regressionMethod.value[1])


echarts.registerTransform(ecStat.transform.regression)
const option = computed(() => {
  return {
    dataset: [
      {
        source: [
          [96.24, 11.35],
          [33.09, 85.11],
          [57.6, 36.61],
          [36.77, 27.26],
          [20.1, 6.72],
          [45.53, 36.37],
          [110.07, 80.13],
          [72.05, 20.88],
          [39.82, 37.15],
          [48.05, 70.5],
          [0.85, 2.57],
          [51.66, 63.7],
          [61.07, 127.13],
          [64.54, 33.59],
          [35.5, 25.01],
          [226.55, 664.02],
          [188.6, 175.31],
          [81.31, 108.68]
        ]
      },
      {
        transform: {
          type: 'ecStat:regression',
          config: regressionValue.value.value
        }
      }
    ],
    title: {
      text: '回归图',
      left: 'center',
      top: 16
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      splitNumber: 20
    },
    yAxis: {
      min: -40,
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: 'scatter',
        type: 'scatter'
      },
      {
        name: 'line',
        type: 'line',
        smooth: true,
        datasetIndex: 1,
        symbolSize: 0.1,
        symbol: 'circle',
        label: { show: true, fontSize: 16 },
        labelLayout: { dx: -20 },
        encode: { label: 2, tooltip: 1 }
      }
    ]
  }
})
</script>

<style lang='scss' scoped></style>
