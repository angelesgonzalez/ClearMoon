<template>
  <canvas ref="particlesCanvas" class="absolute top-0 left-0 w-full h-full z-0"></canvas>
</template>

<script>
export default {
  name: "ParticlesBackground",
  mounted() {
    this.initializeParticles();
  },
  methods: {
    initializeParticles() {
      const canvas = this.$refs.particlesCanvas;
      const ctx = canvas.getContext("2d");

      // Resize canvas
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = [];
      const numParticles = 100;

      // Create particles
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2,
          dx: (Math.random() - 0.5) * 1, // Increased speed (moderate)
          dy: (Math.random() - 0.5) * 1, // Increased speed (moderate)
        });
      }

      // Animation function
      const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
          ctx.fill();

          // Update particle position
          particle.x += particle.dx;
          particle.y += particle.dy;

          // Bounce particles off the edges
          if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;
        });

        requestAnimationFrame(animateParticles);
      };

      animateParticles();

      // Handle window resize
      window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    },
  },
};
</script>

<style scoped>
/* Canvas takes full-screen space */
canvas {
  pointer-events: none; /* Ensure particles don't block interaction */
}
</style>