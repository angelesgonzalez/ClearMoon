<template class="bg-black">
  <ParticlesBackground></ParticlesBackground>

  <div
    class="bg-black text-white flex flex-col items-center justify-center w-screen min-h-screen overflow-x-hidden">
    <!-- Header -->
    <Header class="mt-3 mb-4"></Header>

    <!-- Main Content -->
    <div
      class="grid grid-cols-1 md:grid-cols-[auto,auto,auto] max-w-screen-lg w-full main gap-4 items-center justify-center">
      <!-- Left Column -->
      <div class="flex flex-col h-full md:order-1 order-2 gap-4 w-[360px]">
        <CardTodayTip />
        <CardRecipe />
      </div>

      <!-- Middle Column -->
      <div class="flex flex-col h-full order-1 md:order-2 w-[360px]">
        <PhaseTracker></PhaseTracker>
      </div>

      <!-- Right Column -->
      <div class="flex flex-col h-full md:order-2 order-3 gap-4 w-[360px]">
        <CardExerciseTip />
        <CardLogMood />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "src/components/Header.vue";
import PhaseTracker from "src/components/PhaseTracker.vue";
import CardTodayTip from "src/components/CardTodayTip.vue";
import CardExerciseTip from "src/components/CardExerciseTip.vue";
import CardRecipe from "src/components/CardRecipe.vue";
import CardLogMood from "src/components/CardLogMood.vue";
import ParticlesBackground from "src/components/ParticlesBackground.vue";
import CursorGlow from "src/components/CursorGlow.vue";

export default {
  name: "Home",
  mounted() {},
  components: {
    Header,
    PhaseTracker,
    CardTodayTip,
    CardExerciseTip,
    CardRecipe,
    CardLogMood,
    ParticlesBackground,
    CursorGlow,
  },
};
</script>

<style>
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Ensure it's non-interactive */
  background: radial-gradient(
      circle,
      transparent,
      transparent,
      rgba(255, 255, 255, 0.1)
    ),
    url("");
  z-index: 1;
}

.main {
  position: relative;
  z-index: 2;
}
</style>
