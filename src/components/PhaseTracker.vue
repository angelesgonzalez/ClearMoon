<template>
  <div
    id="PhaseContainer"
    class="relative p-8 rounded-2xl flex flex-col items-center gap-2 lg:gap-36 bg-card bg-customPurpleCards lg:h-[602px]">
    <!-- Inner Content -->
    <div class="flex flex-col items-center gap-2">
      <p class="text-lg text-white opacity-80">You’re in the</p>
      <h1 class="text-5xl font-bold font-exceptional text-white glow-text">
        Follicular
      </h1>
      <p class="text-lg text-white opacity-80">phase</p>
      <p class="text-lg text-white">Day 7 in your cycle</p>
      <!-- Phase Description -->
      <p class="text-center text-white mt-6">
        The follicular phase is your body’s reset. Hormones are rising, energy
        is building, and you’re primed for fresh starts.
      </p>
    </div>

    <!-- Button -->
    <button
      class="bg-gray-500 bg-opacity-30 text-white px-6 py-2 rounded-full hover:bg-gray-600">
      Edit last cycle
    </button>
  </div>
</template>

<script>
export default {
  name: "PhaseTracker",
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
  width: 360px;
  
}
</style>
