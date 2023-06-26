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
          <!--          <v-chart class='chart' :option='option' autoresize/>-->
          <img :src="`data:image/png;base64,${treeData}`" alt="" class="tree_img" v-if="treeData !== ''">
          <div class="block" v-else></div>
        </el-col>
        <el-col :span='6' style='padding:0 30px;'>
          <div style='display: flex;justify-content: space-between'>设置最大深度
            <el-input-number v-model='maxDepth' :min="1"></el-input-number>
          </div>
          <br/>
          <div style='display: flex;justify-content: space-between'>设置最小叶子节点数
            <el-input-number v-model='minLeaf' :min="1"></el-input-number>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue'
import LoadData from '@/components/loadData.vue'
import {getOriginData, getTreeData} from "@/apis";
import {debounce} from "@/utils/tools";


// 原始数据
const originData = ref({
  data: [],
  columns: [],
  count: 0
})

const treeData = ref('')

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

const getChangeData = () => {
  getTreeData(maxDepth.value, minLeaf.value).then(res => {
    treeData.value = res.data
  })
}

const getData = () => {
  getOriginData(2).then(res => {
    console.log(res)
    originData.value.data = res.data
    originData.value.columns = res.columns
    originData.value.count = res.count
  })

  getChangeData()
}

</script>

<style lang='scss' scoped>
.tree_img {
  width: 100%;
  height: 100%;
}

</style>
