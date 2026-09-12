import { createShader } from "./patrik-shader.webgl.js";

const canvas = document.getElementById("hero-shader");

try {
  createShader(canvas, {
    theme: "dark",
    background: {
      dark: "#090909",
      light: "#f3efe6",
    },
  });
} catch (error) {
  console.error(error);
  canvas.style.background = "#090909";
}

const stage = document.querySelector(".features-stage");
const items = stage?.querySelectorAll(".feature-list li") ?? [];
const frames = stage?.querySelectorAll(".feature-visual img") ?? [];

function showFeature(id) {
  if (!stage || !id) return;
  stage.dataset.active = id;
  frames.forEach((frame) => {
    frame.classList.toggle("is-active", frame.dataset.feature === id);
  });
  items.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.feature === id);
  });
}

items.forEach((item) => {
  const reveal = () => showFeature(item.dataset.feature);
  item.addEventListener("pointerenter", reveal);
  item.addEventListener("focusin", reveal);
});
