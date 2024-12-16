<template>
  <div class="container flex flex-col items-start p-6 h-full w-full">
    <div class="p-4">
      <h3 class="text-sm font-semibold opacity-60">Today's move:</h3>
      <span>{{ title }}</span>
    </div>

    <div
      v-if="image"
      class="flex w-full h-full items-center rounded-[18px] overflow-hidden">
      <img
        :src="image.urls.regular"
        :alt="image.alt_description || 'Exercise image'"
        class="w-full h-auto object-cover rounded-[18px]" />
    </div>

    <!-- No Image Found -->
    <div
      v-else
      class="flex items-center justify-center w-full h-[219px] bg-gray-200 rounded-[18px]">
      <img
        src="src/assets/dummy-image.png"
        alt="Exercise image"
        class="w-full h-auto object-cover rounded-[18px]" />
    </div>
  </div>
</template>

<script>
import { searchImages } from "/services/api.js";
import { useSearchStore } from "src/stores/useSearchStore.js";

export default {
  name: "CardExerciseTip",
  data() {
    return {
      image: null,
      isLoading: true,
      error: null,
      title: null, // Título de la etiqueta seleccionada
    };
  },
  computed: {
    unsplashLabels() {
      const searchStore = useSearchStore();
      return searchStore.unsplashLabels || [];
    },
  },
  watch: {
    unsplashLabels: {
      immediate: true,
      handler(newLabels) {
        if (newLabels.length) {
          this.fetchImage(newLabels[0]);
        } else {
          this.fetchImage("Yoga"); // Etiqueta predeterminada
        }
      },
    },
  },
  methods: {
    async fetchImage(label) {
      try {
        this.title = label; // Actualiza el título con la etiqueta actual
        console.log("Etiqueta usada para buscar imágenes:", label);

        // Busqueda usando la etiqueta
        const results = await searchImages(label);
        if (results.length > 0) {
          this.image = results[0];
          console.log("Imagen seleccionada:", this.image);
        } else {
          this.error = "No se encontraron imágenes.";
          console.warn(this.error);
        }
      } catch (error) {
        console.error("Error al buscar la imagen:", error);
        this.error = "Hubo un problema al cargar la imagen.";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
.exerciseTip {
  height: 273px;
}
</style>
