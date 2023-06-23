<template>
  <span class='title'>
    分类分析
  </span>
  <el-button type='primary'>导入数据</el-button>
  <load-data></load-data>
  <div class='main block'>
    <el-row :gutter='20'>
      <el-col :span='18'>
        <v-chart class='chart' :option='option' autoresize />
      </el-col>
      <el-col :span='6' style='padding:0 30px;'>
        <div style='display: flex;justify-content: space-between'>设置最大深度
          <el-input-number v-model='maxDepth'></el-input-number>
        </div>
        <br />
        <div style='display: flex;justify-content: space-between'>设置最小叶子节点数
          <el-input-number v-model='minLeaf'></el-input-number>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { TreeChart } from 'echarts/charts'
import {
  TooltipComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { ref } from 'vue'
import LoadData from '@/components/loadData.vue'

use([
  TreeChart,
  TooltipComponent,
  CanvasRenderer
])

const data = {
  name: 'root',
  children: [
    {
      name: '分类1',
      children: [
        { name: '叶子节点1' },
        { name: '叶子节点2' },
        {
          name: '叶子节点3',
          children: [
            { name: '叶子节点3-1' },
            { name: '叶子节点3-2' },
            { name: '叶子节点3-3' }
          ]
        }
      ]
    },
    {
      name: '分类2',
      children: [
        {
          name: '叶子节点4',
          children: [{ name: '叶子节点5' }]
        }
      ]
    }
  ]
}

const option = ref({
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [
      {
        type: 'tree',
        data: [data],
        left: '2%',
        right: '2%',
        top: '8%',
        bottom: '20%',
        symbol: 'emptyCircle',
        orient: 'vertical',
        expandAndCollapse: true,
        label: {
          position: 'top',
          rotate: 0,
          verticalAlign: 'middle',
          align: 'right',
          fontSize: 24
        },
        leaves: {
          label: {
            position: 'bottom',
            rotate: 0,
            verticalAlign: 'middle',
            align: 'left'
          }
        },
        animationDurationUpdate: 750
      }
    ]
  }
)

const maxDepth = ref(5)
const minLeaf = ref(1)

</script>

<style lang='scss' scoped></style>
