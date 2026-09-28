const quests = {
  grove: {
    icon: "🌱",
    state: "当前任务 · Active Quest",
    title: "Visionary Grove · 绘梦花园",
    cn: "让每一个奇思妙想生根发芽。这是花园中的第一条正式路径，也是一项仍在持续成长的实践。",
    en: "A place where every imaginative idea can take root and grow—my first featured path, still evolving.",
    href: "https://github.com/wen070705/Visionary-Grove"
  },
  graph: {
    icon: "◌",
    state: "探索区域 · Research Frontier",
    title: "Graph Foundation Models · 图基础模型",
    cn: "我正在学习模型如何理解节点、关系与结构，并期待把分散的连接变成可以迁移的知识。",
    en: "I am exploring how models understand nodes, relations, and structure—and turn connections into transferable knowledge."
  },
  medical: {
    icon: "✦",
    state: "学习区域 · Learning Path",
    title: "Medical Imaging · 医学影像",
    cn: "医学影像让算法面对真实而重要的问题。这条路径关注表征、识别与可信的临床价值。",
    en: "Medical imaging brings algorithms closer to meaningful real-world problems: representation, recognition, and trustworthy clinical value."
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
