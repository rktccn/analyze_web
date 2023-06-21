<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header" height="80px"><h1 class="header_title">数据分析</h1></el-header>
      <el-container>
        <el-aside width="220px" class="aside">
          <a-side/>
        </el-aside>
        <el-main class="main">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>


import ASide from "@/components/ASide.vue";
</script>

<style lang="scss">
.common-layout {
  height: 100vh;

  .el-container {
    height: 100%;
  }

  .header {
    background-color: #fff;
  }

  .header_title {
    color: #7FC6D8;
    font-size: 24px;
    font-weight: 700;
    margin: 0;
    padding: 8px 12px;
    letter-spacing: 2px;
  }

  .aside, .main {
    padding: 18px 12px;
  }

  .main {
    .title {
      font-size: 24px;
      font-weight: 700;
      padding: 8px 12px;
      letter-spacing: 2px;
    }
  }
}

</style>
