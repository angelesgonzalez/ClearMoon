<template>
  <div>
    <h1 class="text-8xl font-black text-stone-700">{{ title }}</h1>
    <RouterView></RouterView>
  </div>
</template>
<script>
import Home from "./views/Home.vue";

export default {
  name: "ClearMoon App",
  data() {
    return {
      title: "ClearMoon App 🌕",
    };
  },
};
</script>
<style></style>
