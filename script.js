
/* ==========================
   MAMA'S BIRTHDAY WEBSITE
   Customize everything here
========================== */

// 1. SECRET PASSWORD
const SECRET_CODE = "MAMA";

// 2. YOUR PHOTOS + HANDWRITTEN MEMORIES
// Change the captions to match your real memories.
const memories = [
  {
    photo: "photos/memory1.jpg",
    title: "Our Beautiful Beginning ♡",
    message: "MAMA, namma story start aana andha days enakku innum special. Un kooda irukkura ovvoru moment-um en heart-la irukkum.",
  },
  {
    photo: "photos/memory2.jpg",
    title: "My Favourite Smile 💗",
    message: "Un smile paatha enakku automatically happiness vandhudum. Indha photo paakumbodhellam enakku unna innum konjam extra-ah love panna thonum.",
  },
  {
    photo: "photos/memory3.jpg",
    title: "A Little Moment, A Big Memory 🌙",
    message: "Indha moment evlo simple-ah irundhaalum, un kooda share pannadhunaala enakku priceless. I wish I could relive it again.",
  },
  {
    photo: "photos/memory4.jpg",
    title: "My Favourite Person ❤️",
    message: "MAMA, nee en life-la irukkuradhe oru beautiful feeling. Namma innum neraya memories create pannanum.",
  }
];

// 3. CREATE PHOTO GALLERY
const gallery = document.getElementById("memoryGallery");

memories.forEach((memory, index) => {
  const card = document.createElement("article");
  card.className = "memory-card";

  const image = document.createElement("img");
  image.src = memory.photo;
  image.alt = memory.title;
  image.loading = "lazy";

  // If a photo is missing, show a helpful message.
  image.onerror = () => {
    image.alt = "Add your photo: " + memory.photo;
    image.style.aspectRatio = "4 / 3";
    image.style.objectFit = "contain";
    image.style.padding = "20px";
    image.style.color = "#ffffff";
    image.style.fontSize = "12px";
  };

  const title = document.createElement("h3");
  title.textContent = memory.title;

  const message = document.createElement("p");
  message.textContent = memory.message;

  const number = document.createElement("div");
  number.className = "memory-number";
  number.textContent =
    "MEMORY " + String(index + 1).padStart(2, "0") + " ♡";

  card.append(image, title, message, number);
  gallery.appendChild(card);
});

// 4. UNLOCK WEBSITE
const lockScreen = document.getElementById("lockScreen");
const mainWebsite = document.getElementById("mainWebsite");
const secretInput = document.getElementById("secretCode");
const errorMessage = document.getElementById("errorMessage");

function unlockWebsite() {
  if (secretInput.value.trim().toUpperCase() !== SECRET_CODE.toUpperCase()) {
    errorMessage.textContent =
      "Oops! Wrong secret word, my love. Try again 💗";
    secretInput.value = "";
    secretInput.focus();
    return;
  }

  errorMessage.textContent = "";
  lockScreen.classList.add("hidden");
  mainWebsite.classList.remove("hidden");
    // Background song play
  const song = document.getElementById("loveSong");
  const musicBtn = document.getElementById("musicBtn");

  song.volume = 0.7;

  song.play()
    .then(() => {
      musicBtn.textContent = "♫ Pause Our Song";
    })
    .catch((error) => {
      console.error("Song error:", error);
      musicBtn.textContent = "♫ Tap to Play Our Song";
    });

  window.scrollTo(0, 0);
}

  // Start the birthday song after the user's click.
  playSong();
  window.scrollTo(0, 0);

document.getElementById("unlockBtn")
  .addEventListener("click", unlockWebsite);

secretInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") unlockWebsite();
});

// 5. BACKGROUND MUSIC
const song = document.getElementById("loveSong");
const musicBtn = document.getElementById("musicBtn");

async function playSong() {
  try {
    await song.play();
    musicBtn.textContent = "♫ Pause Our Song";
  } catch (error) {
    musicBtn.textContent = "♫ Tap to Play Our Song";
  }
}

musicBtn.addEventListener("click", () => {
  if (song.paused) {
    playSong();
  } else {
    song.pause();
    musicBtn.textContent = "♫ Play Our Song";
  }
});

song.addEventListener("ended", () => {
  musicBtn.textContent = "♫ Play Our Song";
});

// 6. OPEN / CLOSE LOVE LETTER
const letterBtn = document.getElementById("letterBtn");
const letter = document.getElementById("loveLetter");

letterBtn.addEventListener("click", () => {
  const opening = letter.classList.contains("hidden");

  letter.classList.toggle("hidden");
  letterBtn.textContent = opening
    ? "Close My Love Letter ♡"
    : "Open My Love Letter";

  if (opening) {
    setTimeout(() => {
      letter.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 100);
  }
});

// 7. TWINKLING NIGHT SKY
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let animationFrame;

function resizeStars() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  stars = Array.from({ length: 140 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 1.5 + 0.3,
    opacity: Math.random(),
    speed: Math.random() * 0.015 + 0.003
  }));
}

function animateStars() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  stars.forEach((star) => {
    star.opacity += star.speed;

    if (star.opacity >= 1 || star.opacity <= 0.15) {
      star.speed *= -1;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 220, 246, ${star.opacity})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#e8baff";
    ctx.fill();
  });

  ctx.shadowBlur = 0;
  animationFrame = requestAnimationFrame(animateStars);
}

resizeStars();
animateStars();

window.addEventListener("resize", resizeStars);

// Stop the animation if the page is hidden.
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    cancelAnimationFrame(animationFrame);
  } else {
    cancelAnimationFrame(animationFrame);
    animateStars();
  }
});
