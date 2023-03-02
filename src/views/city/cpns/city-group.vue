<template>
  <div class="city-group">
    <van-index-bar
      :sticky="false"
      :index-list="indexList"
      highlight-color="var(--primary-color)"
    >
      <!-- 热门城市部分 -->
      <van-index-anchor index="热门"></van-index-anchor>
      <div class="list">
        <template v-for="(city, index) in groupData.hotCities">
          <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
        </template>
      </div>
      <!-- 第一层标题 -->
      <template v-for="(group, index) in groupData.cities" :key="index">
        <van-index-anchor :index="group.group" />
        <!-- 第二层城市名 -->
        <template v-for="(city, indey) in group.cities" :key="indey">
          <van-cell :title="city.cityName" @click="cityClick(city)" />
        </template>
      </template>
    </van-index-bar>

    <!-- <template v-for="(group, index) in groupData.cities" :key="index">
      <div class="gruop-item">
        <h2 class="title">标题:{{ group.group }}</h2>
        <div class="list">
          <template v-for="(city, indey) in group.cities" :key="indey">
            <div class="city">
              {{ city.cityName }}
            </div>
          </template>
        </div>
      </div>
    </template> -->
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useCityStore } from "@/stores/modules/city";

// 定义props
const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({}),
  },
});

// 动态映射右侧索引
const indexList = computed(() => {
  const list = props.groupData.cities.map(item => item.group);
  list.unshift("#");
  return list;
});

// 监听城市点击
const router = useRouter();
const cityStore = useCityStore();
const cityClick = city => {
  // 选中当前城市
  cityStore.currentCity = city;

  // 返回上一级
  router.back();
};
</script>

<style lang="less" scoped>
.list {
  display: flex;
  // 换行
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
  padding-right: 25px;
  .city {
    width: 70px;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
    margin: 4px 0;
  }
}
</style>
