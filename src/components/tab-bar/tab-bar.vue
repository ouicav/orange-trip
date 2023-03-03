<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#de8347" route>
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <!-- 默认插槽 -->
          <template #default>
            <span>{{ item.text }}</span>
          </template>
          <!-- 具名插槽 -->
          <template #icon>
            <img
              v-if="currentIndex !== index"
              :src="getAssetURL(item.image)"
              alt=""
            />
            <img v-else :src="getAssetURL(item.imageActive)" alt="" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import { tabbarData } from "@/assets/data/tabbar.js";
import { getAssetURL } from "@/utils/load_assets";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

getAssetURL();

const route = useRoute();

// 通过索引实现点击切换样式
// 监听路由改变时,找到对应的索引,设置currentIndex
const currentIndex = ref(0);
watch(route, newRoute => {
  const index = tabbarData.findIndex(item => item.path === newRoute.path);
  if (index === -1) return;
  currentIndex.value = index;
});
</script>

<style lang="less" scoped>
// 定位到底部
.tab-bar {
  img {
    height: 26px;
  }
}
</style>
