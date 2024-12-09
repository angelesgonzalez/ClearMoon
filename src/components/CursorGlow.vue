<template>
  <div></div>
</template>

<script>
export default {
  name: "CursorGlow",
  mounted() {
    // Track mouse movement
    window.addEventListener("mousemove", (e) => {
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);

      if (hoveredElement?.classList.contains("hover-illuminate")) {
        const rect = hoveredElement.getBoundingClientRect();

        // Calculate cursor position relative to the hovered element
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Apply a radial gradient based on the cursor's position
        hoveredElement.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(175, 62, 255, 0.3), transparent 70%)`;
        hoveredElement.style.transition = "background 0.1s ease-out";
      }
    });

    // Reset the glow effect when leaving an element
    window.addEventListener("mouseout", (e) => {
      if (e.target.classList.contains("hover-illuminate")) {
        e.target.style.background = "none";
      }
    });
  },
};
</script>

<style scoped>
/* No specific styling is needed in this component */
</style>
