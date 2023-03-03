import { defineStore } from "pinia";
// import hyRequest from "@/service/request/index";
import {
  getHomeHotSuggests,
  getHomeCategories,
  getHomeHouselist,
} from "@/service";

export const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: [],

    currentPage: 1,
    houselist: [],
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests();
      this.hotSuggests = res.data;
    },
    async fetchCategoriesData() {
      const res = await getHomeCategories();
      this.categories = res.data;
    },
    async fetchHouselistData() {
      const res = await getHomeHouselist(this.currentPage);
      this.houselist.push(...res.data);
      this.currentPage++;
    },
  },
});
