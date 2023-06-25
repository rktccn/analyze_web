<template>
  <el-menu
    default-active='1'
    class='aside'
  >
    <el-menu-item index='1' @click="router.push({name:'AssociationRule'})">
      <span>关联规则</span>
    </el-menu-item>

    <el-menu-item index='2' @click="router.push({name:'Clustering'})">
      <span>聚类分析</span>
    </el-menu-item>

    <el-menu-item index='3' @click="router.push({name:'Classification'})">
      <span>分类分析</span>
    </el-menu-item>

    <el-menu-item index='4' @click="router.push({name:'Regression'})">
      <span>回归分析</span>
    </el-menu-item>
  </el-menu>

</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()


</script>

<style lang='scss' scoped>
.aside {
  height: 100%;
  color: #fff;
  border-radius: 25px;
}

.el-menu {
  border-right: none;
}

.el-menu-item {
  border-radius: 15px;

  .is-active{
    background-color: red;
  }
}
</style>
