import { defineStore } from "pinia";
import {
  getUnsplashLabels,
  getSpoonacularLabels,
  searchImages,
  searchRecipes,
  getModelResponse,
} from "/services/api.js";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    modelResponseTitle: "",
    modelResponseBody: "",
    unsplashLabels: [],
    spoonacularLabels: [],
    image: null,
    recipe: null,
  }),
  actions: {
    updateModelResponse(title, body) {
      this.modelResponseTitle = title;
      this.modelResponseBody = body;
      console.log("El store está funcionando", this.$state);
    },

    async fetchModelResponse() {
      const cyclePhase = "Follicular";
      const mood = "Energetic";
      let inputText = `
      Generate a tip for the ClearMoon app based on the user’s cycle: ${cyclePhase} phase and mood ${mood} (if included).

Provide:
	1.	A title encapsulated in double quotes (”) with a maximum of 36 characters (including spaces), written to be engaging and uplifting.
	2.	A body encapsulated in double quotes (”) with a maximum of 132 characters (including spaces), written in an empathetic, fun, and personal tone.
	3.	Make sure to name what’s the title and what’s the body.
	4. Create recipe-related labels: Generate 3 distinct one-word labels for searching a recipe, each encapsulated in double quotes (”), and list them after "Recipe Labels:".
  5. Create exercise-related labels: Generate 3 distinct one-word labels for finding an exercise image, each encapsulated in double quotes (”), and list them after "Exercise Labels:".
  6. Ensure all outputs are combined in a single paragraph with clearly labeled sections for easy parsing.`

      try {
        const response = await getModelResponse(
          "Qwen/Qwen2.5-Coder-32B-Instruct",
          inputText
        );

        const generatedText = response[0].generated_text;
        const titleMatch = generatedText.match(/Title:\s*"(.*?)"/);
        const bodyMatch = generatedText.match(/Body:\s*"(.*?)"/);

        this.updateModelResponse(
          titleMatch ? titleMatch[1] : "Title not found",
          bodyMatch ? bodyMatch[1] : "Body not found"
        );
      } catch (error) {
        console.error("Error fetching model response:", error);
      }
    },

    async generateSearchData(body) {
      console.log("BODY RECIBIDO:", body);
      try {
        this.unsplashLabels = await getUnsplashLabels(body);
        console.log("Etiquetas para Unsplash:", this.unsplashLabels);

        this.spoonacularLabels = await getSpoonacularLabels(body);
        console.log("Etiquetas para Spoonacular:", this.spoonacularLabels);

        if (this.unsplashLabels.length > 0) {
          const images = await searchImages(this.unsplashLabels[0]);
          this.image = images.length > 0 ? images[0] : null;
        }

        if (this.spoonacularLabels.length > 0) {
          const recipes = await searchRecipes(this.spoonacularLabels[0]);
          this.recipe = recipes.length > 0 ? recipes[0] : null;
        }
      } catch (error) {
        console.error("Error generando datos de búsqueda:", error);
      }
    },
  },
});
