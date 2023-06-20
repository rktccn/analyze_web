<template>
  <el-menu
      default-active="1"
      class="aside"
      @open="handleOpen"
      @close="handleClose"
  >
    <el-menu-item index="1">
      <span>关联规则</span>
    </el-menu-item>

    <el-menu-item index="2">
      <span>聚类分析</span>
    </el-menu-item>

    <el-menu-item index="3">
      <span>分类分析</span>
    </el-menu-item>

    <el-menu-item index="4">
      <span>回归分析</span>
    </el-menu-item>
  </el-menu>

</template>

<script setup>
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}

const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

</script>

<style lang="scss" scoped>
.aside {
  height: 100%;
  color: #fff;
  border-radius: 25px;
}

.el-menu {
  border-right: none;
}

.el-menu-item{
  border-radius: 15px;
}
</style>
