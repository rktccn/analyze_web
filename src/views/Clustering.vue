<template>
  <div>
  <span class='title'>
    聚类分析
  </span>
    <el-button type='primary' @click="getData">导入数据</el-button>
    <load-data :columns="originColumns" :data="originData"></load-data>
    <div>
      <el-row :gutter='20'>
        <el-col :span='12'>
          <!--散点图展示-->
          <div class='main block'>
            <v-chart class='chart' :option='scatterOption' autoresize/>
          </div>
        </el-col>
        <el-col :span='12'>
          <!--聚类图展示-->
          <div class='main block' style='text-align: center'>
            <v-chart class='chart' :option='clusterOption' autoresize/>
            <span>K值设定： <el-input-number v-model='k_value' :min='1' :max='10'/></span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import LoadData from '@/components/loadData.vue'
import VChart from 'vue-echarts'

import {CanvasRenderer} from 'echarts/renderers'
import {ScatterChart} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  VisualMapComponent
} from 'echarts/components'
import {use} from 'echarts/core'
import {ref} from 'vue'

use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  ScatterChart
])

// 原始数据
const originData = ref([])
const originColumns = ref([])

const scatterOption = ref({
  title: {
    text: '散点图',
    left: 'center'
  },
  xAxis: {},
  yAxis: {},
  series: [
    {
      symbolSize: 20,
      data: [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 7.66],
        [13.4, 6.81],
        [10.0, 6.33],
        [14.0, 8.96],
        [12.5, 6.82],
        [9.15, 7.2],
        [11.5, 7.2],
        [3.03, 4.23],
        [12.2, 7.83],
        [2.02, 4.47],
        [1.05, 3.33],
        [4.05, 4.96],
        [6.03, 7.24],
        [12.0, 6.26],
        [12.0, 8.84],
        [7.08, 5.82],
        [5.02, 5.68]
      ],
      type: 'scatter'
    }
  ]
})

// 聚类图
// K值
const k_value = ref(3)
// 生成十二种不同颜色
const color = [
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc',
  '#4169E1',
  '#FF1493'
]

const clusterOption = ref({
  title: {
    text: '散点图',
    left: 'center'
  },
  color: color,
  xAxis: {},
  yAxis: {},
  series: [
    {
      symbolSize: 20,
      data: [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33]
      ],
      type: 'scatter'
    }, {
      symbolSize: 20,
      data: [
        [14.0, 7.66],
        [13.4, 6.81],
        [10.0, 6.33],
        [14.0, 8.96],
        [12.5, 6.82],
        [9.15, 7.2]
      ],
      type: 'scatter'
    }, {
      symbolSize: 20,
      data: [
        [11.5, 7.2],
        [3.03, 4.23],
        [12.2, 7.83],
        [2.02, 4.47],
        [1.05, 3.33]
      ],
      type: 'scatter'
    }, {
      symbolSize: 20,
      data: [
        [12.0, 8.84],
        [7.08, 5.82],
        [5.02, 5.68]
      ],
      type: 'scatter'
    }

  ]
})

const getData = () => {
  const generateColumns = (length = 10, prefix = 'column-', props) =>
      Array.from({length}).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: `Column ${columnIndex}`,
        width: 150
      }))

  const generateData = (
      columns,
      length = 200,
      prefix = 'row-'
  ) =>
      Array.from({length}).map((_, rowIndex) => {
        return columns.reduce(
            (rowData, column, columnIndex) => {
              rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
              return rowData
            }, {
              id: `${prefix}${rowIndex}`
              // parentId: null
            }
        )
      })

  originColumns.value = generateColumns(10)
  originData.value = generateData(originColumns.value, 1000)
}
</script>

<style lang='scss' scoped>

</style>
