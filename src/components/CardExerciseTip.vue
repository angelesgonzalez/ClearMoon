<template>
  <div class="container flex flex-col items-start p-6">
    <!-- Title -->
    <div class="p-4">
      <h3 class="text-sm font-semibold opacity-60">Move with Purpose</h3>
    </div>

    <!-- Exercise Image -->
    <div
      v-if="image"
      class="flex w-full h-[219px] items-center rounded-[18px] overflow-hidden">
      <img
        :src="image.urls.regular"
        :alt="image.alt_description"
        class="w-full h-auto object-cover rounded-[18px]" />
    </div>
  </div>
</template>
<script>
import { searchImages } from "/services/api.js";
export default {
  name: "CardExerciseTip",
  data() {
    return {
      images: null,
    };
  },
  async mounted() {
    // Buscar una imagen relacionada
    try {
      const results = await searchImages("yoga");
      if (results.length > 0) {
        this.image = results[0]; // primera imagen
        console.log("Imagen seleccionada:", this.image);
      } else {
        console.error("No se encontraron imágenes.");
      }
    } catch (error) {
      console.error("Error al buscar la imagen:", error);
    }
  },
};
</script>
<style>
.exerciseTip {
  height: 273px;
}
</style>
