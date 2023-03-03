<template>
  <div class="home">
    <!-- 首页标题 -->
    <home-nav-bar />
    <!-- 首页导航图片 -->
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <!-- 搜索框 -->
    <home-search-box></home-search-box>
    <!-- 分类 -->
    <home-categories></home-categories>

    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar :start-date="'09.19'" :end-date="'09.20'"></search-bar>
    </div>
    <!-- 首页内容 -->
    <home-content></home-content>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useHomeStore } from "@/stores/modules/home";
import HomeNavBar from "./cpns/home-nav-bar.vue";
import HomeSearchBox from "./cpns/home-search-box.vue";
import HomeCategories from "./cpns/home-categories.vue";
import HomeContent from "./cpns/home-content.vue";
import { computed } from "@vue/reactivity";
import searchBar from "@/components/search-bar/search-bar.vue";

import useScroll from "@/hooks/useScroll";

// import hyRequest from "@/service/request/index";

// 发送网络请求
const homeStore = useHomeStore();
homeStore.fetchHotSuggestData();
homeStore.fetchCategoriesData();
homeStore.fetchHouselistData();

// 加载更多
/* useScroll(() => {
  homeStore.fetchHouselistData();
}); */
const { isReachBottom, scrollTop } = useScroll();
watch(isReachBottom, newValue => {
  if (newValue) {
    homeStore.fetchHouselistData().then(() => {
      isReachBottom.value = false;
    });
  }
});

// 搜索框显示的控制
/* const isShowSearchBar = ref(false);
watch(scrollTop, newTop => {
  isShowSearchBar.value = newTop > 100;
}); */

// 计算属性写法
// 定义的可响应式数据,依赖另外一个可响应式的数据,那么可以使用计算属性(computed)
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 360;
});
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 60px;

  .banner {
    img {
      width: 100%;
    }
  }
  .search-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
  }
}
</style>
