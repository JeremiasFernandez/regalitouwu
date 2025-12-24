const heart = document.getElementById("heart");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("close");
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
let isPlaying = false;

// Set volume lower
bgMusic.volume = 0.3;

// Try to play music when user first interacts
const playMusic = () => {
  if (!isPlaying) {
    bgMusic.play().then(() => {
      isPlaying = true;
      musicToggle.classList.remove("paused");
    }).catch(() => {
      // Autoplay blocked, user will need to click button
      isPlaying = false;
      musicToggle.classList.add("paused");
    });
  }
};

const openLetter = () => {
  overlay.hidden = false;
  overlay.classList.add("open");
  playMusic(); // Try to start music when opening letter
};

const closeLetter = () => {
  overlay.hidden = true;
  overlay.classList.remove("open");
};

heart.addEventListener("click", openLetter);
closeBtn.addEventListener("click", closeLetter);
overlay.addEventListener("click", (ev) => {
  if (ev.target === overlay) closeLetter();
});

document.addEventListener("keydown", (ev) => {
  if (ev.key === "Escape" && !overlay.hidden) closeLetter();
});

// Music toggle button
musicToggle.addEventListener("click", () => {
  if (isPlaying) {
    bgMusic.pause();
    isPlaying = false;
    musicToggle.classList.add("paused");
    musicToggle.setAttribute("aria-label", "Reproducir música");
  } else {
    bgMusic.play().then(() => {
      isPlaying = true;
      musicToggle.classList.remove("paused");
      musicToggle.setAttribute("aria-label", "Pausar música");
    }).catch(err => {
      console.log("No se pudo reproducir:", err);
    });
  }
});

// Try to play on first user interaction
const startOnInteraction = () => {
  playMusic();
  document.removeEventListener("click", startOnInteraction);
};
document.addEventListener("click", startOnInteraction);

// Try to autoplay music on page load
window.addEventListener("load", () => {
  playMusic();
});

// Gift box interaction
const giftBox = document.getElementById("giftBox");
const giftContent = document.getElementById("giftContent");
const closeGift = document.getElementById("closeGift");

giftBox.addEventListener("click", () => {
  giftBox.style.display = "none";
  giftContent.hidden = false;
});

closeGift.addEventListener("click", () => {
  giftContent.hidden = true;
  giftBox.style.display = "block";
});

// Book page turning
const bookPageFront = document.getElementById("bookPageFront");
const bookPageBack = document.getElementById("bookPageBack");
const nextPageBtn = document.getElementById("nextPageBtn");
const prevPageBtn = document.getElementById("prevPageBtn");

let currentPage = 1;

nextPageBtn.addEventListener("click", () => {
  bookPageFront.hidden = true;
  bookPageBack.hidden = false;
  currentPage = 2;
});

prevPageBtn.addEventListener("click", () => {
  bookPageBack.hidden = true;
  bookPageFront.hidden = false;
  currentPage = 1;
});
