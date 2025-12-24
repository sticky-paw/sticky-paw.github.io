window.addEventListener("load", () => {
  document.body.classList.add("is-loaded");
});

const avatarTrigger = document.getElementById("avatar-trigger");
const rainbowToggle = document.getElementById("rainbow-toggle");
const rickrollTrigger = document.getElementById("rickroll-trigger");
const rickrollModal = document.getElementById("rickroll-modal");
const rickrollFrame = document.getElementById("rickroll-frame");
let eggTimer;

if (avatarTrigger) {
  avatarTrigger.addEventListener("click", () => {
    document.body.classList.add("show-egg");
    clearTimeout(eggTimer);
    eggTimer = setTimeout(() => {
      document.body.classList.remove("show-egg");
    }, 1800);
  });
}

if (rainbowToggle) {
  rainbowToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("rainbow-mode");
  });
}

const rickrollBase = "https://www.youtube.com/embed/IJtQe-9B89A";
const rickrollOrigin = "https://stickypaw.net";

function openRickroll() {
  if (!rickrollModal || !rickrollFrame) {
    return;
  }
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    playsinline: "1",
    rel: "0",
    start: "43",
    origin: rickrollOrigin,
  });
  rickrollFrame.src = `${rickrollBase}?${params.toString()}`;
  rickrollModal.classList.add("is-open");
  rickrollModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeRickroll() {
  if (!rickrollModal || !rickrollFrame) {
    return;
  }
  rickrollModal.classList.remove("is-open");
  rickrollModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  rickrollFrame.src = "";
}

if (rickrollTrigger) {
  rickrollTrigger.addEventListener("click", openRickroll);
}

if (rickrollModal) {
  rickrollModal.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.close === "true") {
      closeRickroll();
    }
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeRickroll();
  }
});
