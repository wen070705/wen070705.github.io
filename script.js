const quests = {
  zhizhang: {
    icon: "⌂",
    state: "第一站 · Origin",
    title: "Zhi-Zhang · 智账",
    cn: "我的第一段完整开发实践。从基础的程序员三件套出发，学习怎样把一个想法真正做成项目。",
    en: "My first complete building experience—a starting point for learning how an idea becomes a working project.",
    href: "https://github.com/wen070705/Zhi-zhang-smart-accounting-"
  },
  grove: {
    icon: "🌱",
    state: "当前任务 · Active Quest",
    title: "Visionary Grove · 绘梦花园",
    cn: "让每一个奇思妙想生根发芽。这是花园中的第一条正式路径，也是一项仍在持续成长的实践。",
    en: "A place where every imaginative idea can take root and grow—my first featured path, still evolving.",
    href: "https://github.com/wen070705/Visionary-Grove"
  },
  lianli: {
    icon: "✦",
    state: "第三站 · Fieldwork",
    title: "Lianli Xiaozhan · 连理小站",
    cn: "把技术带进真实场景：识别病虫害，理解植物的状态，让模型服务于看得见的需求。",
    en: "Taking technology into the field by identifying pests and plant diseases and connecting models with visible needs.",
    href: "https://github.com/wen070705/lianlixiaozhan"
  }
};

const dialog = document.querySelector("#quest-dialog");
const dialogLink = dialog.querySelector(".dialog-link");

document.querySelectorAll("[data-quest]").forEach((node) => {
  node.addEventListener("click", () => {
    const quest = quests[node.dataset.quest];
    dialog.querySelector(".dialog-icon").textContent = quest.icon;
    dialog.querySelector(".dialog-state").textContent = quest.state;
    dialog.querySelector("#dialog-title").textContent = quest.title;
    dialog.querySelector(".dialog-cn").textContent = quest.cn;
    dialog.querySelector(".dialog-en").textContent = quest.en;
    if (quest.href) {
      dialogLink.href = quest.href;
      dialogLink.hidden = false;
    } else {
      dialogLink.hidden = true;
    }
    dialog.showModal();
  });
});

dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) dialog.close();
});

const seasonLabels = {
  spring: "春日里，小骑士守护发芽的种子与盛开的花朵",
  summer: "夏日里，小骑士乘木船穿过盛开的荷塘",
  autumn: "秋日里，小骑士登上山顶眺望红色枫林",
  winter: "冬日里，小骑士踩着单板从雪山高速冲下"
};
const seasonScenes = document.querySelector(".season-scenes");
const requestedSeason = new URLSearchParams(location.search).get("season");
if (requestedSeason && seasonLabels[requestedSeason]) {
  document.body.dataset.season = requestedSeason;
  seasonScenes.setAttribute("aria-label", seasonLabels[requestedSeason]);
  document.querySelectorAll("[data-set-season]").forEach((item) => item.setAttribute("aria-pressed", String(item.dataset.setSeason === requestedSeason)));
}

document.querySelectorAll("[data-set-season]").forEach((button) => {
  button.addEventListener("click", () => {
    document.body.dataset.season = button.dataset.setSeason;
    seasonScenes.setAttribute("aria-label", seasonLabels[button.dataset.setSeason]);
    document.querySelectorAll("[data-set-season]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    resetParticles();
  });
});

const hero = document.querySelector(".hero");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let pointerX = 0;
let pointerY = 0;

hero.addEventListener("pointermove", (event) => {
  if (prefersReducedMotion.matches) return;
  const bounds = hero.getBoundingClientRect();
  pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
  pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
  hero.style.setProperty("--scene-x", `${pointerX * -14}px`);
  hero.style.setProperty("--scene-y", `${pointerY * -9}px`);
  hero.style.setProperty("--actor-x", `${pointerX * 20}px`);
  hero.style.setProperty("--actor-y", `${pointerY * 14}px`);
});

hero.addEventListener("pointerleave", () => {
  pointerX = 0;
  pointerY = 0;
  hero.style.setProperty("--scene-x", "0px");
  hero.style.setProperty("--scene-y", "0px");
  hero.style.setProperty("--actor-x", "0px");
  hero.style.setProperty("--actor-y", "0px");
});

const canvas = document.querySelector(".season-canvas");
const context = canvas.getContext("2d");
let particles = [];
let canvasWidth = 0;
let canvasHeight = 0;
let heroVisible = true;

function resizeSeasonCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvasWidth = hero.clientWidth;
  canvasHeight = hero.clientHeight;
  canvas.width = Math.round(canvasWidth * ratio);
  canvas.height = Math.round(canvasHeight * ratio);
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  resetParticles();
}

function makeParticle(index) {
  const season = document.body.dataset.season;
  const random = (min, max) => min + Math.random() * (max - min);
  const particle = {
    x: random(0, canvasWidth),
    y: random(-canvasHeight, canvasHeight),
    size: random(3, 9),
    speed: random(.35, 1.15),
    drift: random(-.45, .45),
    phase: random(0, Math.PI * 2),
    spin: random(-.04, .04),
    rotation: random(0, Math.PI * 2),
    tone: index % 3
  };
  if (season === "winter") {
    particle.size = random(1.5, 5.5);
    particle.speed = random(1.2, 3.1);
  }
  return particle;
}

function resetParticles() {
  const count = window.innerWidth < 700 ? 28 : 54;
  particles = Array.from({ length: count }, (_, index) => makeParticle(index));
}

function drawPetal(particle, color) {
  context.save();
  context.translate(particle.x, particle.y);
  context.rotate(particle.rotation);
  context.fillStyle = color;
  context.beginPath();
  context.ellipse(0, 0, particle.size, particle.size * .55, 0, 0, Math.PI * 2);
  context.fill();
  context.restore();
}

function drawSeasonFrame(time) {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  if (!heroVisible || prefersReducedMotion.matches) {
    requestAnimationFrame(drawSeasonFrame);
    return;
  }

  const season = document.body.dataset.season;
  particles.forEach((particle) => {
    const wind = pointerX * (season === "winter" ? 2.4 : 1.1);
    particle.phase += .018;
    particle.rotation += particle.spin + pointerX * .002;
    particle.x += particle.drift + Math.sin(particle.phase) * .28 + wind;
    particle.y += particle.speed;

    if (season === "spring") {
      const colors = ["rgba(241,151,169,.72)", "rgba(255,212,220,.82)", "rgba(127,169,91,.62)"];
      drawPetal(particle, colors[particle.tone]);
    } else if (season === "summer") {
      context.fillStyle = particle.tone === 0 ? "rgba(255,255,255,.62)" : "rgba(93,171,183,.42)";
      context.beginPath();
      context.arc(particle.x, particle.y, Math.max(1, particle.size * .24), 0, Math.PI * 2);
      context.fill();
    } else if (season === "autumn") {
      const colors = ["rgba(190,63,33,.82)", "rgba(224,112,36,.8)", "rgba(244,171,53,.76)"];
      drawPetal(particle, colors[particle.tone]);
    } else {
      context.strokeStyle = particle.tone === 0 ? "rgba(255,255,255,.92)" : "rgba(183,217,239,.8)";
      context.lineWidth = particle.size * .45;
      context.beginPath();
      context.moveTo(particle.x, particle.y);
      context.lineTo(particle.x - 12 - pointerX * 10, particle.y - 5);
      context.stroke();
    }

    if (particle.y > canvasHeight + 20 || particle.x < -80 || particle.x > canvasWidth + 80) {
      Object.assign(particle, makeParticle(particle.tone));
      particle.y = -20;
      particle.x = Math.random() * canvasWidth;
    }
  });
  requestAnimationFrame(drawSeasonFrame);
}

new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; }, { threshold: .02 }).observe(hero);
window.addEventListener("resize", resizeSeasonCanvas, { passive: true });
resizeSeasonCanvas();
requestAnimationFrame(drawSeasonFrame);

const firefly = document.querySelector(".firefly");
window.addEventListener("pointermove", (event) => {
  firefly.style.left = `${event.clientX}px`;
  firefly.style.top = `${event.clientY}px`;
  firefly.style.opacity = "1";
}, { passive: true });
document.documentElement.addEventListener("mouseleave", () => { firefly.style.opacity = "0"; });

document.querySelector("#year").textContent = new Date().getFullYear();

window.addEventListener("load", () => {
  const target = location.hash && document.querySelector(location.hash);
  if (target) target.scrollIntoView({ behavior: "auto", block: "start" });
});
