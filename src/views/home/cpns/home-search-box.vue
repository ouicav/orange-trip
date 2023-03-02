<template>
  <div class="search-box">
    <!-- 定位部分 -->
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="section date-range" @click="showCalender = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDate }}</span>
        </div>
        <div class="stay">共{{ stayCount }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDate }}</span>
        </div>
      </div>
    </div>
    <!-- 日历选择 -->
    <van-calendar
      v-model:show="showCalender"
      @confirm="onConfirm"
      type="range"
      color="#FA842B"
      :show-confirm="false"
    />

    <!-- 价格与人数 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

    <!-- 热门建议 -->
    <div class="section hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div
          class="item"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color,
          }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!-- 搜索按钮 -->
    <div class="section search-btn">
      <button class="btn" @click="searchBtnClick">开始搜索</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCityStore } from "@/stores/modules/city";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { formatMonthDay, getDiffDays } from "@/utils/format_date";
import { useHomeStore } from "@/stores/modules/home";

const router = useRouter();

// 位置/城市
const cityClick = () => {
  router.push("/city");
};

const positionClick = () => {
  navigator.geolocation.getCurrentPosition(
    res => {
      console.log("获取位置成功:", res);
    },
    err => {
      console.log("获取位置失败:", err);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    }
  );
};

// 当前城市
const cityStore = useCityStore();
const { currentCity } = storeToRefs(cityStore);

// 日期范围处理
// 当前日期
const nowDate = new Date();
const startDate = ref(formatMonthDay(nowDate));
// 在原来日期基础上加一天
const tomorrowDate = new Date();
tomorrowDate.setDate(nowDate.getDate() + 1);
const endDate = ref(formatMonthDay(tomorrowDate));

// 停留日期计算
const stayCount = ref(getDiffDays(nowDate, tomorrowDate));

const showCalender = ref(false);

// 选择日期
const onConfirm = value => {
  // 选择好日期
  const selectStartDate = value[0];
  const selectEndDate = value[1];
  startDate.value = formatMonthDay(selectStartDate);
  endDate.value = formatMonthDay(selectEndDate);
  stayCount.value = getDiffDays(selectStartDate, selectEndDate);

  // 隐藏日历
  showCalender.value = false;
};

// 热门建议
const homeStore = useHomeStore();
const { hotSuggests } = storeToRefs(homeStore);

// 按钮点击
const searchBtnClick = () => {
  router.push({
    path: "/search",
    query: {
      startDate,
      endDate,
      currentCity,
    },
  });
};
</script>

<style lang="less" scoped>
.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;

  .city {
    flex: 1;
    color: #333;
    font-size: 15px;
  }
  .position {
    width: 74px;
    display: flex;
    align-items: center;

    .text {
      position: relative;
      top: 1.5px;
      font-size: 12px;
      color: #666;
    }

    img {
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }
  }
}

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}

.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.price-counter {
  .start {
    border-right: 1px solid var(--line-color);
  }
}

.hot-suggests {
  margin: 10px 0;
  height: auto;
  .item {
    font-size: 12px;
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    line-height: 1;
  }
}

.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
    border-color: #fff;
  }
}
</style>
