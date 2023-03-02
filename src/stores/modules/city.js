import { getCityAll } from "@/service";
import { defineStore } from "pinia";

export const useCityStore = defineStore("city", {
  state: () => ({
    allCities: {},

    currentCity: { cityName: "广州" },
  }),
  actions: {
    async fetchAllCitiesData() {
      const res = await getCityAll();
      this.allCities = res.data;
    },
  },
});
