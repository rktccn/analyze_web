<template>
  <div>
  <span class='title'>
    聚类分析
  </span>
    <el-button type='primary' @click="getData">导入数据</el-button>
    <load-data :data="originData"></load-data>
    <div>
      <el-row :gutter='20'>
        <el-col :span='12'>
          <!--散点图展示-->
          <div class='main block' style="text-align: center">
            <v-chart class='chart' :option='scatterOption' autoresize/>
            <!--切换数据类型-->
            <el-select v-model="scatterType" class="m-2" placeholder="Select" size="large"
                       @change="getScatterDataByType"
            >
              <el-option
                  v-for="item in scatterTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span='12'>
          <!--聚类图展示-->
          <div class='main block' style='text-align: center'>
            <v-chart class='chart' :option='clusterOption' autoresize/>
            <el-select v-model="clusterType" class="m-2" placeholder="Select" size="large" @change="getClusterByType">
              <el-option
                  v-for="item in clusterTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
            <br/>
            <br/>
            <span v-if="clusterType===0">K值设定： <el-input-number v-model='k_value' :min='1' :max='10'/></span>
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
import {computed, ref} from 'vue'
import {getScatterData, getOriginData, getClusterData} from "@/apis";
import {debounce} from "@/utils/tools";

use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  ScatterChart
])

// 原始数据
const originData = ref({
  data: [],
  columns: [],
  count: 0
})

// 散点图数据
const scatterData = ref({
  scatterData: [],
  clusterData: []
})

// 数据类型（月牙，团状）
const scatterType = ref(0)
const scatterTypeOptions = [
  {
    value: 0,
    label: 'iris'
  },
  {
    value: 1,
    label: '团状'
  },
  {
    value: 2,
    label: '月牙'
  }
]

// 聚簇类型
const clusterType = ref(0)
const clusterTypeOptions = [
  {
    value: 0,
    label: 'K-means'
  },
  {
    value: 1,
    label: 'DBSCAN'
  }
]

// 切换散点图类型
const getScatterDataByType = () => {
  getScatterData(scatterType.value).then(res => {
    console.log(res)
    scatterData.value.scatterData = res.data.map(item => {
      return {
        symbolSize: 14,
        type: 'scatter',
        data: item
      }
    })
  })

  getClusterData(k_value.value, clusterType.value, scatterType.value).then(res => {
    scatterData.value.clusterData = res.data.map(item => {
      return {
        symbolSize: 14,
        type: 'scatter',
        data: item
      }
    })
  })
}


const getClusterByType = () => {
  getChangeData()
}

// K值
const k = ref(3)
const k_value = computed(
    {
      get: () => k.value,
      set: (value) => {
        k.value = value
        debounce(getChangeData, 500)()
      }
    }
)

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

const scatterOption = computed(() => {
  return {
    title: {
      text: '散点图',
      left: 'center'
    },
    color: color,
    xAxis: {},
    yAxis: {},
    series: scatterData.value.scatterData,
  }
})

// 聚类图
const clusterOption = computed(() => {
  return {
    title: {
      text: '散点图',
      left: 'center'
    },
    color: color,
    xAxis: {},
    yAxis: {},
    series: scatterData.value.clusterData
  }
})

// 获取可变数据
const getChangeData = () => {
  getClusterData(k_value.value, clusterType.value, scatterType.value).then(res => {
    scatterData.value.clusterData = res.data.map(item => {
      return {
        symbolSize: 14,
        type: 'scatter',
        data: item
      }
    })
  })
}

const getData = () => {

  // TODO:替换数据源
  getOriginData(1).then(res => {
    originData.value.data = res.data
    originData.value.columns = res.columns
    originData.value.count = res.count
  })


  getScatterData(scatterType.value).then(res => {
    console.log(res)
    scatterData.value.scatterData = res.data.map(item => {
      return {
        symbolSize: 14,
        type: 'scatter',
        data: item
      }
    })
  })
  getChangeData()
}
</script>

<style lang='scss' scoped>

</style>
