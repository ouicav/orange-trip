<template>
  <div class="home">
    <!-- 首页标题 -->
    <home-nav-bar />
    <!-- 首页导航图片 -->
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-search-box></home-search-box>
  </div>
</template>

<script setup>
import { useHomeStore } from "@/stores/modules/home";
import { ref } from "vue";
import HomeNavBar from "./cpns/home-nav-bar.vue";
import homeSearchBox from "./cpns/home-search-box.vue";

// import hyRequest from "@/service/request/index";

// 发送网络请求
const homeStore = useHomeStore();
homeStore.fetchHotSuggestData();
// 1. 热门建议
/* const hotSuggests = ref([]);
hyRequest
  .get({
    url: "/home/hotSuggests",
  })
  .then(res => {
    hotSuggests.value = res.data;
  });
// 2. 热门建议
hyRequest
  .get({
    url: "/home/categories",
  })
  .then(res => {
    categories.value = res.data;
  }); */
</script>

<style lang="less" scoped>
.banner {
  img {
    width: 100%;
  }
}
</style>
