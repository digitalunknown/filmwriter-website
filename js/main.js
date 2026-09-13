import { createShader } from "./patrik-shader.webgl.js";

const canvas = document.getElementById("hero-shader");
const veil = document.querySelector(".hero-veil");

function coverLargeViewport() {
  if (!canvas) return;

  if (!window.matchMedia("(max-width: 860px)").matches) {
    canvas.style.top = "";
    canvas.style.height = "";
    if (veil) {
      veil.style.top = "";
      veil.style.height = "";
    }
    return;
  }

  const height = `${Math.round(window.innerHeight)}px`;
  const topBleed = Math.round(window.visualViewport?.offsetTop ?? 0);
  canvas.style.top = topBleed ? `-${topBleed}px` : "0px";
  canvas.style.height = height;
  if (veil) {
    veil.style.top = canvas.style.top;
    veil.style.height = height;
  }
}

function refreshOverlayBars() {
  if (window.scrollY > 2) return;
  const x = window.scrollX;
  window.scrollTo(x, 1);
  window.scrollTo(x, 0);
}

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

coverLargeViewport();
requestAnimationFrame(() => {
  coverLargeViewport();
  refreshOverlayBars();
});
window.addEventListener("resize", coverLargeViewport);
window.visualViewport?.addEventListener("resize", coverLargeViewport);
window.visualViewport?.addEventListener("scroll", coverLargeViewport);

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
