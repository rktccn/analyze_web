<template>
  <div>
  <span class='title'>
    回归分析
  </span>
    <el-button type='primary' @click="getData">导入数据</el-button>
    <load-data :data="originData"></load-data>
    <div class='main block'>
      <el-row :gutter='20'>
        <el-col :span='18'>
          <v-chart class='chart' :option='option' autoresize :key='regressionValue.id'/>
        </el-col>
        <el-col :span='6'>
          <el-text>回归方法</el-text>
          <br/>
          <el-select v-model='regressionValue' class='m-2' placeholder='Select' size='large' @change="getData">
            <el-option
                v-for='item in regressionMethod'
                :label='item.label'
                :value='item.value'
            />
          </el-select>

          <pre>{{ functionEquation }}</pre>
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
import {} from 'echarts/components'
import {use} from 'echarts/core'
import {computed, ref} from 'vue'
import * as echarts from 'echarts'
import * as ecStat from 'echarts-stat'
import {getRegressionData} from "@/apis";

use([
  CanvasRenderer,
  ScatterChart
])

// 原始数据
const originData = ref({
  data: [],
  columns: [],
  count: 0
})

// 散点数据
const scatterData = ref({
      symbolSize: 12,
      data: [],
      type: 'scatter'
    }
)

// 回归数据
const regressionData = ref({
  data: [],
  type: 'line',
  showSymbol: false,
})

// 函数方程式
const functionEquation = ref('')


// 回归方式选择
const regressionMethod = ref([{
  label: '线性回归',
  value: 0
}, {
  label: '多项式回归',
  value: 1
}, {
  label: 'RANSAC',
  value: 2
}])

const regressionValue = ref(0)

const option = computed(() => {
  return {
    title: {
      text: '散点图',
      left: 'center'
    },
    xAxis: {
      name: 'x',
      minorTick: {
        show: true
      },
      minorSplitLine: {
        show: true
      }
    },
    yAxis: {},
    series: [scatterData.value, regressionData.value],
  }
})

const getData = () => {

  getRegressionData(regressionValue.value).then(res => {
    originData.value.columns = [{
      dataKey: 'xAxis',
      key: 'xAxis',
      title: '横坐标',
      width: 150
    }, {
      dataKey: 'yAxis',
      key: 'yAxis',
      title: '纵坐标',
      width: 150
    }]

    originData.value.data = res.data.map((item, index) => {
      return {
        xAxis: item[0],
        yAxis: item[1],
        id: index
      }
    })

    originData.value.count = res.data.length

    scatterData.value = {
      symbolSize: 8,
      data: res.data,
      type: 'scatter'
    }

    generateRegressionData(res.coef, res.intercept)
  })
}

// 线性/RANSAC回归
const linearRegression = (coef, intercept) => {
  functionEquation.value = `y = ${coef}x + ${intercept}`
  return (x) => {
    return [x, x * coef + intercept]
  }
}

// 多项式回归
const polynomialRegression = (coef, intercept) => {
  const a = coef[0], b = coef[1], c = coef[2], d = coef[3]
  functionEquation.value = `y = ${a} + ${b}x + ${c}x^2 + ${d}x^3`
  return (x) => {
    return [x, a + b * x + c * Math.pow(x, 2) + d * Math.pow(x, 3) + intercept]
  }
}

// 生成回归数据
const generateRegressionData = (coef, intercept) => {
  regressionData.value.data = []
  if (regressionValue.value === 0 || regressionValue.value === 2) {
    for (let i = -4; i <= 5; i += 0.1) {
      regressionData.value.data.push(linearRegression(coef, intercept)(i))
    }
  } else if (regressionValue.value === 1) {
    for (let i = -4; i <= 5; i += 0.1) {
      regressionData.value.data.push(polynomialRegression(coef, intercept)(i))
    }
  }
}

</script>

<style lang='scss' scoped></style>
