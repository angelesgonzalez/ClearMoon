<template>
  <div
    id="PhaseContainer"
    class="relative p-8 rounded-2xl flex flex-col justify-between items-center bg-card bg-customPurpleCards h-full">
    <!-- Inner Content -->
    <div class="flex flex-col items-center gap-2 justify-center flex-grow">
      <p class="text-lg text-white opacity-80">You’re in the</p>
      <!-- Glow Effect for Phase -->
      <div class="relative">
        <!-- Glow Text (Behind) -->
        <h1
          class="absolute inset-0 text-5xl font-bold font-exceptional text-white opacity-60 blur-sm glow-text">
          {{ currentPhase }}
        </h1>
        <!-- Main Text (Above) -->
        <h1 class="relative text-5xl font-bold font-exceptional text-white">
          {{ currentPhase }}
        </h1>
      </div>
      <p class="text-lg text-white opacity-80">phase</p>
      <p class="text-lg text-white">Day {{ dayOfCycle }} in your cycle</p>
      <!-- Phase Description -->
      <p class="text-center text-white mt-6 opacity-80">
        {{ phaseDescription }}
      </p>
    </div>

    <!-- Button -->
    <button
      class="bg-gray-500 bg-opacity-30 text-white px-6 py-2 rounded-full hover:bg-gray-600"
      @click="editCycle">
      Edit last cycle
    </button>
  </div>
</template>

<script>
import { useCycleStore } from "../stores/useCycleStore.js";

export default {
  name: "PhaseTracker",
  computed: {
    // Access data directly from the store
    dayOfCycle() {
      return useCycleStore().dayOfCycle;
    },
    currentPhase() {
      return useCycleStore().currentPhase;
    },
    phaseDescription() {
      const phases = [
        { name: "Menstrual", description: "Your reset phase." },
        {
          name: "Follicular",
          description:
            "Hormones are rising, energy is building, and you’re primed for fresh starts.",
        },
        {
          name: "Ovulation",
          description:
            "The peak of fertility, characterized by high energy and vitality.",
        },
        {
          name: "Luteal",
          description: "Hormones stabilize, promoting focus and productivity.",
        },
      ];
      const phase = phases.find((p) => p.name === this.currentPhase);
      return phase ? phase.description : "No description available.";
    },
  },
  methods: {
    editCycle() {
      this.$router.push("/onboarding");
    },
  },
};
</script>

<style>
#PhaseContainer,
.container {
  border: 1px solid transparent; /* Border base */
  border-radius: 20px; /* Rounded corners */
  background: linear-gradient(#13111f, #13111f) padding-box,
    /* Inner background */
      linear-gradient(270deg, hsla(251, 16%, 20%, 1), hsla(251, 19%, 54%, 1))
      border-box; /* Gradient border */
}
</style>
