<template>
  <div>
  <span class='title'>
    分类分析
  </span>
    <el-button type='primary' @click="getData">导入数据</el-button>
    <load-data :data="originData"></load-data>
    <div class='main block'>
      <el-row :gutter='20'>
        <el-col :span='18'>
          <v-chart class='chart' :option='option' autoresize/>
        </el-col>
        <el-col :span='6' style='padding:0 30px;'>
          <div style='display: flex;justify-content: space-between'>设置最大深度
            <el-input-number v-model='maxDepth'></el-input-number>
          </div>
          <br/>
          <div style='display: flex;justify-content: space-between'>设置最小叶子节点数
            <el-input-number v-model='minLeaf'></el-input-number>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import {use} from 'echarts/core'
import {CanvasRenderer} from 'echarts/renderers'
import {TreeChart} from 'echarts/charts'
import {
  TooltipComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import {computed, ref} from 'vue'
import LoadData from '@/components/loadData.vue'
import {getOriginData, getTreeData} from "@/apis";
import {debounce} from "@/utils/tools";

use([
  TreeChart,
  TooltipComponent,
  CanvasRenderer
])

// 原始数据
const originData = ref({
  data: [],
  columns: [],
  count: 0
})


const maxDepthValue = ref(5)
const maxDepth = computed({
  get: () => maxDepthValue.value,
  set: (value) => {
    maxDepthValue.value = value
    debounce(getChangeData, 500)()
  }
})
const minLeafValue = ref(1)
const minLeaf = computed({
  get: () => minLeafValue.value,
  set: (value) => {
    minLeafValue.value = value
    debounce(getChangeData, 500)()
  }
})

// 条件树数据
const treeData = ref({})

const data = {
  name: 'root',
  children: [
    {
      name: '分类1',
      children: [
        {name: '叶子节点1'},
        {name: '叶子节点2'},
        {
          name: '叶子节点3',
          children: [
            {name: '叶子节点3-1'},
            {name: '叶子节点3-2'},
            {name: '叶子节点3-3'}
          ]
        }
      ]
    },
    {
      name: '分类2',
      children: [
        {
          name: '叶子节点4',
          children: [{name: '叶子节点5'}]
        }
      ]
    }
  ]
}

const option = computed(() => {
      return {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            // TODO:修改数据源
            data: [treeData.value],
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
    }
)


const getChangeData = () => {
  getTreeData(maxDepth.value, minLeaf.value).then(res => {
    treeData.value = res.data
  })
}

const getData = () => {
  // TODO:修改数据源
  getOriginData(2).then(res => {
    console.log(res)
    originData.value.data = res.data
    originData.value.columns = res.columns
    originData.value.count = res.count
  })

  getChangeData()
}

</script>

<style lang='scss' scoped></style>
