<template>
  <header class="flex flex-col items-center justify-start pt-8 text-white">
    <!-- Glowing Text -->
    <div class="relative">
      <!-- Glow Effect -->
      <span
        class="absolute inset-0 font-exceptional font-bold text-white text-2xl"
        id="logoBottom">
        ClearMoon
      </span>
      <!-- Readable Text -->
      <span class="relative font-exceptional font-bold text-2xl">
        ClearMoon
      </span>
    </div>
    <!-- Subtitle -->
    <p class="mt-2 text-lg text-gray-400">Feeling Good, Every Phase</p>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style>
/* Glow Animation Keyframes */

#logoBottom {
  animation: glow-move 2s infinite alternate;
  filter: blur(8px);
  opacity: 80%;
}

@keyframes glow-move {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(-2px, 2px);
  }
}
</style>
