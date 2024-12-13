<template>
  <!-- Div-1 -->
  <div
    class="bg-customPurpleCards text-white p-6 rounded-lg max-w-sm shadow-lg container h-[273px] flex flex-col items-start gap-[60px] self-stretch px-[17px] pt-[18px] pb-[28.34px] pl-[18px]">
    <h3 class="text-sm font-semibold opacity-60">Today's Boost</h3>
    <!-- Div-2 -->
    <div class="flex w-[325px] flex-col items-start gap-4">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none">
          <g clip-path="url(#clip0_8_582)">
            <path
              d="M17.83 26.921C22.8508 26.921 26.921 22.8508 26.921 17.83C26.921 12.8092 22.8508 8.73901 17.83 8.73901C12.8092 8.73901 8.73901 12.8092 8.73901 17.83C8.73901 22.8508 12.8092 26.921 17.83 26.921Z"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M31.8301 17.83H35.3301"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M0.330078 17.83H3.83008"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M17.8301 31.83V35.33"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M17.8301 0.329987V3.82999"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M17.8301 31.83V35.33"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M17.8301 0.329987V3.82999"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M7.93106 27.729L5.45605 30.204"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M30.204 5.45599L27.729 7.93099"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M7.93106 27.729L5.45605 30.204"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M30.204 5.45599L27.729 7.93099"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M7.93106 7.93099L5.45605 5.45599"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M30.204 30.204L27.729 27.729"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M7.93106 7.93099L5.45605 5.45599"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M30.204 30.204L27.729 27.729"
              stroke="#9E75F0"
              stroke-width="0.66"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_8_582">
              <rect width="35.66" height="35.66" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <!-- Content Section -->
      <div>
        <h4 class="text-xl font-bold mb-2">{{ modelResponseTitle }}</h4>
        <p class="text-gray-400">{{ modelResponseBody }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { useSearchStore } from "src/stores/useSearchStore.js";
import { getModelResponse } from "/services/api.js";

export default {
  name: "CardTodayTip",
  data() {
    return {
      modelResponseTitle: "Loading...", // Default text while data loads
      modelResponseBody: "Please wait while we fetch your tip.",
      exerciseQuery: "",
      recipeQuery: "",
    };
  },
  mounted() {
    this.fetchModelResponse();
  },
  methods: {
    async fetchModelResponse() {
      const searchStore = useSearchStore(); // Instancia del store
      const cyclePhase = "Follicular";
      const mood = "Energetic";
      let inputText = `
      Generate a tip for the ClearMoon app based on the user’s cycle: ${cyclePhase} phase and mood ${mood} (if included).

Provide:
	1.	A title encapsulated in double quotes (”) with a maximum of 36 characters (including spaces), written to be engaging and uplifting.
	2.	A body encapsulated in double quotes (”) with a maximum of 132 characters (including spaces), written in an empathetic, fun, and personal tone.
	3.	Make sure to name what’s the title and what’s the body.
		4.	Recipe Labels: Create labels for searching a recipe related to the prompt, encapsulated in double quotes (”), and prefix them with “Recipe:”.
	5.	Exercise Labels: Create labels for finding an exercise image related to the prompt, encapsulated in double quotes (”), and prefix them with “Exercise:”.`;

      try {
        const response = await getModelResponse(
          "Qwen/Qwen2.5-Coder-32B-Instruct",
          inputText
        );

        // Assuming response text is stored in `response.generated_text`
        const generatedText = response[0].generated_text;
        // Step 1: Extract Title
        const titleMatch = generatedText.match(/Title:\s*"(.*?)"/);
        this.modelResponseTitle = titleMatch
          ? titleMatch[1]
          : "Title not found";

        // Step 2: Extract Body
        const bodyMatch = generatedText.match(/Body:\s*"(.*?)"/);
        this.modelResponseBody = bodyMatch ? bodyMatch[1] : "Body not found";

        // // Debugging
        // console.log("Extracted Title:", this.modelResponseTitle);
        // console.log("Extracted Body:", this.modelResponseBody);

        // Update the store
        searchStore.updateModelResponse(
          this.modelResponseTitle,
          this.modelResponseBody
        );
      } catch (error) {
        console.error("Error fetching model response:", error);
      }
    },
  },
};
</script>

<style></style>
