import { defineStore } from "pinia";
// import hyRequest from "@/service/request/index";
import { getHomeHotSuggests } from "@/service";

export const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: [],
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests();
      this.hotSuggests = res.data;
    },
  },
});
