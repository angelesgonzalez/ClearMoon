<template>
  <!-- Div-1 -->
  <div
    class="bg-customPurpleCards text-white p-6 rounded-lg max-w-sm shadow-lg container flex flex-col items-start gap-[60px] self-stretch px-[17px] pt-[18px] pb-[28.34px] pl-[18px] flex-wrap">
    <h3 class="text-sm font-semibold opacity-60">Today's Boost</h3>
    <!-- Div-2 -->
    <div class="flex flex-col items-start gap-4">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none">
          <g clip-path="url(#clip0_8_582)">
            <path
              d="M17.83 26.921C22.8508 26.921 26.921 22.8508 26.921 17.83C26.921 12.8092 22.8508 8.73901 17.83 8.73901C12.8092 8.73901 8.73901 12.8092 8.73901 17.83C8.73901 22.8508 12.8092 26.921 17.83 26.921Z"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M31.8301 17.83H35.3301"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M0.330078 17.83H3.83008"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M17.8301 31.83V35.33"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M17.8301 0.329987V3.82999"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M17.8301 31.83V35.33"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M17.8301 0.329987V3.82999"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M7.93106 27.729L5.45605 30.204"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M30.204 5.45599L27.729 7.93099"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M7.93106 27.729L5.45605 30.204"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M30.204 5.45599L27.729 7.93099"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M7.93106 7.93099L5.45605 5.45599"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M30.204 30.204L27.729 27.729"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M7.93106 7.93099L5.45605 5.45599"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M30.204 30.204L27.729 27.729"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_8_582">
              <rect width="35.66" height="35.66" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <!-- Content Section -->
      <div>
        <h4 class="text-xl font-bold mb-2">{{ modelResponseTitle }}</h4>
        <p class="text-gray-400">{{ modelResponseBody }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useSearchStore } from "src/stores/useSearchStore.js";

export default {
  name: "CardTodayTip",
  computed: {
    modelResponseTitle() {
      return this.searchStore.modelResponseTitle;
    },
    modelResponseBody() {
      return this.searchStore.modelResponseBody;
    },
  },
  mounted() {
    this.searchStore.fetchModelResponse();
  },
  setup() {
    const searchStore = useSearchStore();
    return { searchStore };
  },
};
</script>

<style></style>
