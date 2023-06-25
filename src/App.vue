<template>
  <div class='common-layout'>
    <el-container>
      <el-header class='header' height='80px'><h1 class='header_title'>数据分析</h1></el-header>
      <el-container>
        <el-aside width='220px' class='aside'>
          <a-side/>
        </el-aside>
        <el-main class='main_view'>
          <el-scrollbar>
            <router-view v-slot="{ Component, route }">
              <transition name="zoom-out" mode="out-in">
                <component :is="Component" :key="route.path"/>
              </transition>
            </router-view>
            <div class='main-footer'></div>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import ASide from '@/components/ASide.vue'

const route = useRoute()

</script>

<style lang='scss'>
.common-layout {
  height: 100vh;
  overflow: hidden;

  .el-container {
    height: 100%;
  }

  .header {
    background-color: #fff;
  }

  .header_title {
    color: #409eff;
    font-size: 24px;
    font-weight: 700;
    margin: 0;
    padding: 8px 12px;
    letter-spacing: 2px;
  }

  .aside, .main_view {
    padding: 18px 12px;
  }

  .main_view {
    padding-top: 26px;

    .chart {
      height: 480px;
    }

    .main-footer {
      height: 120px;
    }

    .title {
      font-size: 24px;
      font-weight: 700;
      padding: 8px 12px;
      letter-spacing: 2px;
    }

    .block {
      margin-top: 12px;
      padding: 20px;
      background-color: #fff;
      border-radius: 25px;
    }
  }
}


.zoom-out-enter-from {
  opacity: 0;
  transform: scale(1.3);
}

.zoom-out-enter-to,
.zoom-out-leave-from {
  opacity: 1;
  transform: scale(1);
}

.zoom-out-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.zoom-out-enter-active {
  transition: all 0.15s;
  transition-timing-function: cubic-bezier(
          0.19,
          1,
          0.22,
          1
  ); /* easeOutExpo */
}

.zoom-out-leave-active {
  transition: all 0.15s;

  transition-timing-function: cubic-bezier(
          0.95,
          0.05,
          0.795,
          0.035
  ); /* easeInExpo */
}
</style>
