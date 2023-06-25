<template>
  <div>
  <span class='title'>
    关联规则
  </span>
    <el-button type='primary' @click="getData">导入数据</el-button>
    <load-data :columns="originColumns" :data="originData"></load-data>
    <div class='main block'>
      <el-row :gutter='20' style='height: 100%;width: 100%;'>
        <el-col :span='18'>
          <v-chart class='chart' :option='option' autoresize/>
        </el-col>
        <el-col :span='6'>
          <!--支持度，置信度输入框-->
          <div class='right'>
            <el-text class='mx-1'>置信度</el-text>
            <el-slider v-model='confidence' show-input :min='0' :max='1' :step='0.01'/>
            <br/>
            <el-text class='mx-1'>支持度</el-text>
            <el-slider v-model='support' show-input :min='0' :max='1' :step='0.01'/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import {use} from 'echarts/core'
import {CanvasRenderer} from 'echarts/renderers'
import {HeatmapChart} from 'echarts/charts'
import {
  TooltipComponent,
  GridComponent,
  VisualMapComponent, TitleComponent
} from 'echarts/components'
import VChart, {THEME_KEY} from 'vue-echarts'
import {ref, provide} from 'vue'
import LoadData from '@/components/loadData.vue'

use([
  CanvasRenderer,
  HeatmapChart,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  TitleComponent
])

// 原始数据
const originData = ref([])
const originColumns = ref([])

// 置信度
const confidence = ref(0.5)
// 支持度
const support = ref(0.5)

const dataSet = ['面包', '可乐', '麦片', '牛奶', '鸡蛋']
// prettier-ignore
const data = [[0, 0, 0.7777777777777778], [0, 1, 0.4444444444444444], [0, 2, 0.4444444444444444], [0, 3, 0.4444444444444444], [0, 4, 0.2222222222222222], [1, 0, 0.4444444444444444], [1, 1, 0.6666666666666666], [1, 2, 0.1111111111111111], [1, 3, 0.4444444444444444], [1, 4, 0.0], [2, 0, 0.4444444444444444], [2, 1, 0.1111111111111111], [2, 2, 0.4444444444444444], [2, 3, 0.2222222222222222], [2, 4, 0.2222222222222222], [3, 0, 0.4444444444444444], [3, 1, 0.4444444444444444], [3, 2, 0.2222222222222222], [3, 3, 0.6666666666666666], [3, 4, 0.1111111111111111], [4, 0, 0.2222222222222222], [4, 1, 0.0], [4, 2, 0.2222222222222222], [4, 3, 0.1111111111111111], [4, 4, 0.2222222222222222]]
    .map(function (item) {
      return [item[1], item[0], item[2].toFixed(2) || '-']
    })

const option = ref({
  title: {
    text: '关联热力图',
    left: 'center',
    top: 'bottom'
  },
  tooltip: {
    position: 'top',
    formatter: function (params) {
      return (
          dataSet[params.value[0]] +
          '-' +
          dataSet[params.value[1]] +
          '：' +
          params.value[2]
      )
    }
  },
  grid: {
    height: '50%',
    top: '10%'
  },
  xAxis: {
    type: 'category',
    data: dataSet,
    splitArea: {
      show: true
    }
  },
  yAxis: {
    type: 'category',
    data: dataSet,
    splitArea: {
      show: true
    }
  },
  visualMap: {
    min: 0,
    max: 1,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '15%'
  },
  series: [
    {
      name: 'Punch Card',
      type: 'heatmap',
      data: data,
      label: {
        show: true
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
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
.main {
  height: 480px;
}
</style>
