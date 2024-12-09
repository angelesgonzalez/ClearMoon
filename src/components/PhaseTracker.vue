<template>
  <div
    id="PhaseContainer"
    class="relative p-8 rounded-2xl flex flex-col justify-between items-center bg-card bg-customPurpleCards lg:h-[602px]">
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
      class="bg-gray-500 bg-opacity-30 text-white px-6 py-2 rounded-full hover:bg-gray-600">
      Edit last cycle
    </button>
  </div>
</template>

<script>
// 1.	Menstrual (Days 1–5)
// 2.	Follicular (Days 6–13)
// 3.	Ovulation (Day 14)
// 4.	Luteal (Days 15–28)

export default {
  name: "PhaseTracker",
  //Datos de fuera del componente (Props)
  props: {
    cycleStartDate: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      phases: [
        {
          name: "Menstrual",
          start: 1,
          end: 5,
          description: "Your reset phase.",
        },
        {
          name: "Follicular",
          start: 6,
          end: 13,
          description:
            "Hormones are rising, energy is building, and you’re primed for fresh starts.",
        },
        {
          name: "Ovulation",
          start: 14,
          end: 14,
          description:
            "The peak of fertility, characterized by high energy and vitality.",
        },
        {
          name: "Luteal",
          start: 15,
          end: 28,
          description: "Hormones stabilize, promoting focus and productivity.",
        },
      ],
    };
  },
  // Computed Properties: Calculan valores dinámicos basados en datos o props
  computed: {
    dayOfCycle() {
      const today = new Date(); //obtiene la fecha actual
      const startDate = new Date(this.cycleStartDate); //Convierte la fecha (que es un string) a formato fecha
      const differenceInTime = today - startDate; // Resta las dos fechas para saber en que dia del ciclo esta y devuelve la diferencia en milisegundos
      const differenceInDays = Math.floor(
        differenceInTime / (1000 * 60 * 60 * 24) // Convierte a dias y mathfloor asegura que es un numero entero redondeado hacia abajo. Divide por 1,000 para obtener segundos, luego por 60 para convertir en minutos, luego en 60 para horas y 24 para dias.
      );
      return (differenceInDays % 28) + 1; // Ciclo se reinicia cada 28 días. +1 asegura que el día del ciclo nunca sea 0.(6 % 28) + 1 = 7; (30 % 28) + 1 = 3;
    },
    currentPhase() {
      const day = this.dayOfCycle; // Día actual del ciclo
      const phase = this.phases.find(
        (phase) => day >= phase.start && day <= phase.end
      );
      return phase ? phase.name : "Unknown"; // Nombre de la fase actual o "Desconocido"
    },
    phaseDescription() {
      const day = this.dayOfCycle; // Día actual del ciclo
      const phase = this.phases.find(
        (phase) => day >= phase.start && day <= phase.end
      );
      return phase ? phase.description : "No description available."; // Descripción de la fase
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
  width: 360px;
}
</style>
