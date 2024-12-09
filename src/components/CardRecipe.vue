<template>
  <div class="container flex flex-col items-start p-6 rounded-[18px]">
    <div class="p-4">
      <h3 class="text-sm font-semibold opacity-60">Today's recipe</h3>
    </div>
    <div
      class="flex w-full h-[219px] items-center rounded-[18px] overflow-hidden">
      <img
        src="src/assets/dummy-recipe.png"
        alt="Delicious waffle with fruits"
        class="w-full h-auto object-cover" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CardRecipe",
};
</script>

<style></style>
