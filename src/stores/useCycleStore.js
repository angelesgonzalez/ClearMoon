import { defineStore } from "pinia";

export const useCycleStore = defineStore("cycleStore", {
  state: () => ({
    lastPeriodDate: localStorage.getItem("lastPeriodDate") || null,
    mood: localStorage.getItem("mood") || null,
  }),
  getters: {
    isOnboardingComplete: (state) => !!state.lastPeriodDate,
    dayOfCycle: (state) => {
      if (!state.lastPeriodDate) return 0;
      const today = new Date();
      const startDate = new Date(state.lastPeriodDate);
      const differenceInTime = today - startDate;
      const differenceInDays = Math.floor(
        differenceInTime / (1000 * 60 * 60 * 24)
      );
      return (differenceInDays % 28) + 1;
    },
    currentPhase: (state) => {
      const day = state.dayOfCycle;
      if (day >= 1 && day <= 5) return "Menstrual";
      if (day >= 6 && day <= 13) return "Follicular";
      if (day === 14) return "Ovulation";
      if (day >= 15 && day <= 28) return "Luteal";
      return "Unknown";
    },
  },
  actions: {
    setCycleData({ lastPeriodDate, mood }) {
      this.lastPeriodDate = lastPeriodDate;
      this.mood = mood;

      // Save to localStorage
      localStorage.setItem("lastPeriodDate", lastPeriodDate);
      localStorage.setItem("mood", mood);
    },
    resetCycleData() {
      this.lastPeriodDate = null;
      this.mood = null;

      // Clear from localStorage
      localStorage.removeItem("lastPeriodDate");
      localStorage.removeItem("mood");
    },
  },
});
