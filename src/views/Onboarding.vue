<template>
  <ParticlesBackground class=""></ParticlesBackground>
  <div class="onboarding-container bg-[#13111f] text-white min-h-screen flex">
    <!-- Left Section: Background Image -->

    <div
      class="w-1/2 hidden lg:flex items-center justify-center bg-cover bg-center"
      style="background-image: url('src/assets/onboarding-1.avif')"></div>

    <!-- Right Section: text -->
    <div class="w-full lg:w-1/2 flex flex-col justify-center items-start p-12">
      <!-- LOGO -->
      <div class="flex flex-col items-center gap-2 justify-center">
        <div class="relative">
          <!-- Glow Text -->
          <h1
            class="absolute inset-0 text-5xl font-bold text-white opacity-60 blur-sm font-exceptional">
            ClearMoon
          </h1>
          <!-- Main Text -->
          <h1 class="relative text-5xl font-bold text-white font-exceptional">
            ClearMoon
          </h1>
        </div>
      </div>
      <!-- LOGO -->

      <!-- Step 1: Last Period Date -->
      <div v-if="step === 1" class="w-full flex flex-col">
        <h2 class="text-2xl font-semibold mb-4 mt-4">
          When did your last period start?
        </h2>
        <input
          type="date"
          v-model="lastPeriodDate"
          class="p-4 rounded-lg w-full max-w-md bg-[#282442] text-white/50 focus:outline-none focus:ring focus:border-[#AF3EFF] focus:ring-1 focus:ring-[#EACCFF]/50 border-[#AF3EFF]" />
        <div class="">
          <button
            :disabled="!lastPeriodDate"
            @click="nextStep"
            class="mt-6 bg-[#AF3EFF] hover:bg-[#9E16FF] text-white py-2 px-6 rounded-full disabled:opacity-50 disabled:cursor-not-allowed">
            Next
          </button>
        </div>
      </div>

      <!-- Step 2: Mood -->
      <div v-else-if="step === 2" class="w-full">
        <h2 class="text-2xl font-semibold mb-4 mt-4">
          How are you feeling today?
        </h2>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="option in moods"
            :key="option"
            @click="setMood(option)"
            :class="[
              'py-2 px-6 rounded-full text-white',
              selectedMood === option
                ? 'bg-[#282442] border border-[#EACCFF]/50'
                : 'bg-[#282442] hover:bg-[#EACCFF]/20',
            ]">
            {{ option }}
          </button>
        </div>
        <button
          :disabled="!selectedMood"
          @click="submit"
          class="mt-6 bg-[#AF3EFF] hover:bg-[#9E16FF] text-white py-2 px-6 rounded-full disabled:opacity-50 disabled:cursor-not-allowed">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCycleStore } from "../stores/useCycleStore.js";
import ParticlesBackground from "src/components/ParticlesBackground.vue";

export default {
  data() {
    return {
      step: 1,
      lastPeriodDate: null,
      moods: [
        "Tired",
        "Energized",
        "Anxious",
        "Calm",
        "Happy",
        "Focused",
        "Grateful",
        "Frustrated",
        "Content",
      ],
      selectedMood: null,
    };
  },
  computed: {
    cycleStore() {
      return useCycleStore(); // Access cycle store
    },
  },
  methods: {
    nextStep() {
      if (this.step === 1) {
        this.step = 2;
      }
    },
    setMood(mood) {
      this.selectedMood = mood;
    },
    submit() {
      const cycleStore = useCycleStore();
      cycleStore.setCycleData({
        lastPeriodDate: this.lastPeriodDate,
        mood: this.selectedMood,
      });

      // Redirect to the next screen or homepage
      this.$router.push("/");
    },
    resetOnboarding() {
      const cycleStore = useCycleStore();
      cycleStore.resetCycleData();
      this.step = 1; // Reset to step 1
      this.lastPeriodDate = null;
      this.selectedMood = null;
    },
  },
};
</script>

<style scoped>
/* Background */
.bg-dark {
  background-color: #13111f;
}

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
