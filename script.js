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

document.querySelectorAll("[data-set-season]").forEach((button) => {
  button.addEventListener("click", () => {
    document.body.dataset.season = button.dataset.setSeason;
    document.querySelectorAll("[data-set-season]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
  });
});

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
