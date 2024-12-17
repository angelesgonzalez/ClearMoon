//Importing all I need

import { defineStore } from "pinia";
import {
  searchImages,
  searchRecipes,
  getModelResponse,
} from "/services/api.js";
import { useCycleStore } from "./useCycleStore.js";

//Exporting API response and Search for the rest of components

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
    },

    //Requesting a response from HuggingFace, it sends an input with some rules and cyclePhase + Mood from users.

    async fetchModelResponse() {
      const cycleStore = useCycleStore();
      const cyclePhase = cycleStore.currentPhase || "Unknown";
      const mood = cycleStore.mood || "Neutral";

      //Prompt for the model

      const inputText = `
      Generate a tip for the ClearMoon app based on the user’s cycle: ${cyclePhase} phase and mood ${mood} (if included).

      Provide:
        1. A title encapsulated in double quotes (”) with a maximum of 36 characters (including spaces), written to be engaging and uplifting.
        2. A body encapsulated in double quotes (”) with a maximum of 132 characters (including spaces), written in an empathetic, fun, and personal tone.
        3. Make sure to name what’s the title and what’s the body.
        4. Create recipe-related labels: Generate 3 distinct one-word labels for searching a recipe, each encapsulated in double quotes (”), and list them after "Recipe Labels:".
        5. Create exercise-related labels: Generate 3 distinct one-word labels for finding an exercise image, each encapsulated in double quotes (”), and list them after "Exercise Labels:".
        6. Ensure all outputs are combined in a single paragraph with clearly labeled sections for easy parsing.`;

      try {
        const response = await getModelResponse(
          "Qwen/Qwen2.5-Coder-32B-Instruct",
          inputText
        );

        if (!response || !response[0] || !response[0].generated_text) {
          console.error("Generated text is missing from the response");
          return;
        }

        const generatedText = response[0].generated_text;
        console.log("Generated Text:", generatedText);

        // Normalising text to prevent problems
        const normalizedText = generatedText.replace(/\s+/g, " ").trim();
        console.log("Normalized Text:", normalizedText);

        // Extracting title,body, labels with regex

        const titleMatch = normalizedText.match(/Title:\s*["“”]([^"“”]*)["“”]/);
        const bodyMatch = normalizedText.match(/Body:\s*["“”]([^"“”]*)["“”]/);

        const title =
          titleMatch && titleMatch[1] ? titleMatch[1].trim() : "No Title Found";
        const body =
          bodyMatch && bodyMatch[1] ? bodyMatch[1].trim() : "No Body Found";

        console.log("Extracted Title:", title);
        console.log("Extracted Body:", body);

        // Regex - LABELS
        const recipeLabelsMatch = normalizedText.match(
          /Recipe Labels:\s*"([^"]+)"\s*"([^"]+)"\s*"([^"]+)"/
        );
        const exerciseLabelsMatch = normalizedText.match(
          /Exercise Labels:\s*"([^"]+)"\s*"([^"]+)"\s*"([^"]+)"/
        );

        const recipeLabels = recipeLabelsMatch
          ? [recipeLabelsMatch[1], recipeLabelsMatch[2], recipeLabelsMatch[3]]
          : [];
        const exerciseLabels = exerciseLabelsMatch
          ? [
              exerciseLabelsMatch[1],
              exerciseLabelsMatch[2],
              exerciseLabelsMatch[3],
            ]
          : [];

        console.log("Extracted Recipe Labels:", recipeLabels);
        console.log("Extracted Exercise Labels:", exerciseLabels);

        // Updating the store with extracted values
        this.updateModelResponse(title, body);
        this.spoonacularLabels = recipeLabels;
        this.unsplashLabels = exerciseLabels;
      } catch (error) {
        console.error("Error processing generated text:", error);
      }
    },
    // Labels sent to Unsplash to get an image + spoonacular to get a recipe

    async generateSearchData() {
      try {
        if (
          Array.isArray(this.unsplashLabels) &&
          this.unsplashLabels.length > 0
        ) {
          const images = await searchImages(this.unsplashLabels[0]);
          this.image = images.length > 0 ? images[0] : null;

          if (!this.image) {
            console.warn(
              "No images found. Label used:",
              this.unsplashLabels[0]
            );
          }
        }

        if (
          Array.isArray(this.spoonacularLabels) &&
          this.spoonacularLabels.length > 0
        ) {
          const recipes = await searchRecipes(this.spoonacularLabels[0]);
          this.recipe = recipes.length > 0 ? recipes[0] : null;

          if (!this.recipe) {
            console.warn(
              "Recipes no found. Label used:",
              this.spoonacularLabels[0]
            );
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
});
