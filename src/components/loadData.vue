<template>
  <div class='load_data-statics'>
    <el-row :gutter='16'>
      <!--数据条数展示-->
      <el-col :span='8'>
        <div class='statistic-card'>
          <el-statistic :value='data?.count ?? 0'>
            <template #title>
              <div style='display: inline-flex; align-items: center'>
                样本数量
              </div>
            </template>

            <template #prefix>
              <el-icon :size='28' color='#73C0DE'>
                <BarChartFilled/>
              </el-icon>
            </template>
          </el-statistic>
        </div>
      </el-col>

      <!--数据特征数量展示-->
      <el-col :span='8'>
        <div class='statistic-card'>
          <el-statistic :value='data?.columns?.length ?? 0'>
            <template #title>
              <div style='display: inline-flex; align-items: center'>
                特征数量
              </div>
            </template>

            <template #prefix>
              <el-icon :size='28' color='#FAC858'>
                <AccountTreeRound/>
              </el-icon>
            </template>
          </el-statistic>
        </div>
      </el-col>
    </el-row>
  </div>

  <div class='load-data_table block'>
    <div style='height: 400px'>
      <el-auto-resizer v-if='data.data'>
        <template #default='{ height, width }'>
          <el-table-v2
              :columns='data.columns'
              :data='data.data'
              :width='width'
              :height='height'
              fixed
          />
        </template>
      </el-auto-resizer>
      <el-empty v-else></el-empty>
    </div>
  </div>
</template>

<script setup>
import {BarChartFilled, AccountTreeRound} from '@vicons/material'

const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {
        data: [],
        columns: [],
        count: 0
      }
    }
  }
})


</script>

<style lang='scss' scoped>

.load_data-statics {
  margin-bottom: 20px;
  margin-top: 20px;


  :global(h2#card-usage ~ .example .example-showcase) {
    background-color: var(--el-fill-color) !important;
  }

  .el-statistic {
    --el-statistic-content-font-size: 28px;
  }

  .el-statistic__prefix {
    vertical-align: middle;
  }

  .statistic-card {
    padding: 20px;
    border-radius: 16px;
    background-color: var(--el-bg-color-overlay);

    ::v-deep(.el-statistic__prefix) {
      vertical-align: middle;
      opacity: 0.8;
    }
  }
}

.load-data_table {
  //padding: 20px;
  //border-radius: 16px;
  //background-color: #fff;
}
</style>
