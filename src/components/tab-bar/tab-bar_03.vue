<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#de8347">
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path" icon="home-o">
          <!-- 通过插槽实现自定义 -->
          <span>{{ item.text }}</span>
          <!-- <template #icon>
            <img
              v-if="currentIndex !== index"
              :src="getAssetURL(item.image)"
              alt=""
            />
            <img v-else :src="getAssetURL(item.imageActive)" alt="" />
          </template> -->
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { tabbarData } from "@/assets/data/tabbar.js";
import { getAssetURL } from "@/utils/load_assets";

getAssetURL();

// 通过索引实现点击切换样式
const currentIndex = ref(0);
</script>

<style lang="less" scoped>
// 定位到底部
.tab-bar {
  // 局部定义一个变量: 只针对.tab-bar子元素才生效
  // --van-tabbar-item-icon-size: 30px !important;

  // 找到类,对类中的CSS属性重写
  // :deep() 找到子组件的类, 让子组件的类也可以生效
  :deep(.van-tabbar-item__icon) {
    font-size: 24px;
  }

  img {
    height: 26px;
  }
}
</style>
