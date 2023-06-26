<template>
  <div>
  <span class='title'>
    关联规则
  </span>
    <el-button type='primary' @click="getData">导入数据</el-button>
    <load-data :data="originData"></load-data>
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
            <el-slider v-model='support' show-input :min='0.1' :max='1' :step='0.01'/>
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
import VChart from 'vue-echarts'
import {computed, ref} from 'vue'
import {getOriginData, getHeatMapData} from "@/apis";
import LoadData from '@/components/loadData.vue'
import {debounce} from "@/utils/tools";


use([
  CanvasRenderer,
  HeatmapChart,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  TitleComponent
])

// 原始数据
const originData = ref({
  data: [],
  columns: [],
  count: 0
})
// 热力图数据
const heatMapData = ref({
  data: [],
  xAxis: [],
  yAxis: []
})

// 置信度
const confidenceValue = ref(0.5)
const confidence = computed({
  get: () => confidenceValue.value,
  set: (value) => {
    confidenceValue.value = value
    debounce(getChangeData, 500)()
  }
})

// 支持度
const supportValue = ref(0.5)
const support = computed({
  get: () => supportValue.value,
  set: (value) => {
    supportValue.value = value
    debounce(getChangeData, 500)()
  }
})

const option = computed(() => {
  return {
    title: {
      text: '关联热力图',
      left: 'center',
      top: 'bottom'
    },
    tooltip: {
      position: 'top',
      formatter: function (params) {
        return (
            heatMapData.value.xAxis[params.value[0]] +
            '-' +
            heatMapData.value.yAxis[params.value[1]] +
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
      // TODO:修改数据源
      data: heatMapData.value.xAxis,
      splitArea: {
        show: true
      }
    },
    yAxis: {
      type: 'category',
      // TODO:修改数据源
      data: heatMapData.value.yAxis,
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
        data: heatMapData.value.data,
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
  }
})


// 获取可变数据
const getChangeData = () => {
  getHeatMapData(confidence.value, support.value).then(res => {
    console.log(res)
    heatMapData.value.data = res.data.map(function (item) {
      return [item[1], item[0], item[2].toFixed(2) || '-']
    })
    heatMapData.value.xAxis = res.xAxis
    heatMapData.value.yAxis = res.yAxis
  })
}

const getData = () => {
  getOriginData(0).then(res => {
    console.log(res)
    originData.value.data = res.data
    originData.value.columns = res.columns
    originData.value.count = res.count
  })

  getChangeData()
}

</script>

<style lang='scss' scoped>
.main {
  height: 480px;
}
</style>
