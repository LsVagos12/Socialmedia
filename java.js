const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const clickSound = document.getElementById("clickSound");
const hoverSound = document.getElementById("hoverSound");
const playlist = document.getElementById("playlist");

function toggleMusic() {
  const bars = document.querySelectorAll('.bar');
  if (music.paused) {
    music.play();
    musicBtn.textContent = "🔇 Stop Musik";
    bars.forEach(bar => bar.style.animationPlayState = 'running');
  } else {
    music.pause();
    musicBtn.textContent = "🔊 Putar Musik";
    bars.forEach(bar => bar.style.animationPlayState = 'paused');
  }
}

const volumeSlider = document.getElementById("volumeSlider");
if (volumeSlider) {
  volumeSlider.addEventListener("input", () => {
    music.volume = volumeSlider.value;
  });
}

// MANAGEMENT SISTEM HOVER, SOUNDS, DAN GERAKAN MAGNETIK RADIAL GLOW
document.querySelectorAll(".link-container a").forEach((link) => {
  setTimeout(() => { link.classList.add("show"); }, 100);

  link.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.style.setProperty("--x", x + "px");
    this.style.setProperty("--y", y + "px");
  });

  link.addEventListener("mouseenter", function() {
    if(hoverSound) {
      hoverSound.currentTime = 0;
      hoverSound.volume = 0.15;
      hoverSound.play().catch(()=>{});
    }
  });

  link.addEventListener("click", function () {
    if(clickSound) {
      clickSound.currentTime = 0;
      clickSound.play().catch(()=>{});
    }
  });
});

// CUSTOM NEON CURSOR PELACAK (PC)
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
  if (cursor) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }
});

document.querySelectorAll('a, button, select, input, .music-button, .dark-mode-toggle').forEach(elem => {
  elem.addEventListener('mouseenter', () => document.body.classList.add('hover-active'));
  elem.addEventListener('mouseleave', () => document.body.classList.remove('hover-active'));
});

// TS PARTICLES: INTEGRASI KLIK MELEDAK ADAPTIF DI HALAMAN UTAMA
if (typeof tsParticles !== 'undefined') {
  tsParticles.load("tsparticles", {
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
      number: { value: 50 },
      color: { value: ["#a855f7", "#00ffea", "#ff0077", "#00ff00", "#eab308"] },
      shape: { type: "circle" },
      opacity: { value: 0.4 },
      size: { value: 3 },
      move: { enable: true, speed: 1.5 },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        repulse: { distance: 80 },
        push: { quantity: 6 },
      },
    },
    detectRetina: true,
  });

  // TS PARTICLES KEDUA: EFEK ZARAH MENGAPUNG DI LOADING SCREEN
  tsParticles.load("loading-particles", {
    fullScreen: { enable: false },
    particles: {
      number: { value: 40 },
      color: { value: "#a855f7" },
      shape: { type: "circle" },
      opacity: { value: 0.3, random: true },
      size: { value: 2.5, random: true },
      move: { enable: true, speed: 0.8, direction: "top", random: true },
    }
  });
}

// LOGIKA UTAMA PERUBAHAN TOTAL TEMA BERDASARKAN PLAYLIST LAGU
function updateThemeByMusic(trackName) {
  document.body.classList.remove("theme-samurai", "theme-minimalist", "theme-hacker", "theme-gothic", "theme-luxury");

  if (trackName.includes("NUMERA UNO")) {
    document.body.classList.add("theme-hacker");
    document.body.style.backgroundImage = 'url("YT.png")';
  } else if (trackName.includes("stan lofi")) {
    document.body.classList.add("theme-gothic");
    document.body.style.backgroundImage = 'url("YT.png")';
  } else if (trackName.includes("That Girl")) {
    document.body.classList.add("theme-luxury");
    document.body.style.backgroundImage = 'url("my_app_background.jpg")';
  } else if (trackName.includes("Intense Love")) {
    document.body.classList.add("theme-samurai");
    document.body.style.backgroundImage = 'url("YT.png")';
  } else if (trackName.includes("Way Back Home") || trackName.includes("Tada Koe")) {
    document.body.classList.add("theme-minimalist");
    document.body.style.backgroundImage = 'url("my_app_background.jpg")';
  }
}

if (playlist) {
  playlist.addEventListener("change", () => {
    const bars = document.querySelectorAll('.bar');
    music.src = playlist.value;
    music.play();
    musicBtn.textContent = "🔇 Stop Musik";
    bars.forEach(bar => bar.style.animationPlayState = 'running');
    updateThemeByMusic(playlist.value);
  });
}

// TOMBOL TOGGLE TEMA MANUAL (🌓) UNTUK MODE RETRO SYNTHWAVE PINK
const themeToggleBtn = document.getElementById("themeToggle");
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const hasActiveSubTheme = ["theme-samurai", "theme-minimalist", "theme-hacker", "theme-gothic", "theme-luxury"].some(cls => document.body.classList.contains(cls));
    
    if (!hasActiveSubTheme) {
      document.body.classList.toggle("dark");
      if (document.body.classList.contains("dark")) {
        document.body.style.backgroundImage = 'url("YT.png")';
      } else {
        document.body.style.backgroundImage = 'url("my_app_background.jpg")';
      }
    } else {
      alert("Kembalikan playlist lagu ke 'Intense Love OST' untuk membuka kontrol manual tombol tema!");
    }
  });
}

// ROTASI BACKGROUND 8 DETIK (Hanya berjalan di default Cyberpunk)
let currentBgIndex = 0;
setInterval(() => {
  const hasSubTheme = ["dark", "theme-samurai", "theme-minimalist", "theme-hacker", "theme-gothic", "theme-luxury"].some(cls => document.body.classList.contains(cls));
  if (!hasSubTheme) {
    if (currentBgIndex === 0) {
      document.body.style.backgroundImage = 'url("YT.png")';
      currentBgIndex = 1;
    } else {
      document.body.style.backgroundImage = 'url("my_app_background.jpg")';
      currentBgIndex = 0;
    }
  }
}, 8000);

// SISTEM DATA LIRIK KARAOKE BERJALAN
const lyricsData = {
  "Tada Koe Hitotsu - the voice rᴇmix (1).mp3": [
    { time: 1, text: "🎵 Tada Koe Hitotsu 🎵" },
    { time: 5, text: "Tsuzuku jikan no kakera o..." },
    { time: 10, text: "Atsumeteiru tada sugiru..." },
    { time: 15, text: "Noto no yuhaku ni kaku..." },
    { time: 20, text: "Kotae wa itsu..." }
  ],
  "NUMERA UNO ANTHEM  - Prod. By KANG GAYANG (Official Music Video).mp3": [
    { time: 1, text: "🎵 NUMERA UNO ANTHEM 🎵" },
    { time: 3, text: "This is Numera Uno..." },
    { time: 7, text: "Membakar bak infierno!" }
  ]
};

const lyricsContainer = document.getElementById("lyrics-container");
music.addEventListener("timeupdate", () => {
  if (!playlist) return;
  const currentTrack = playlist.value;
  const trackLyrics = lyricsData[currentTrack];
  
  if (trackLyrics) {
    const currentTime = music.currentTime;
    const currentLyric = trackLyrics.reduce((acc, lyric) => {
      if (currentTime >= lyric.time) return lyric.text;
      return acc;
    }, "🎵 Music Playing... 🎵");
    
    if (lyricsContainer && lyricsContainer.textContent !== currentLyric) {
      lyricsContainer.textContent = currentLyric;
    }
  } else {
    if (lyricsContainer) {
      lyricsContainer.textContent = music.paused ? "Muzik sedia dimainkan..." : "🎵 Music Playing... 🎵";
    }
  }
});

// Typewriter Quote Animation
const quote = document.querySelector(".quote");
const text = quote ? quote.textContent : "";
if(quote) quote.textContent = "";
let i = 0;
function typeWriter() {
  if (quote && i < text.length) {
    quote.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}

// MANAGEMENT LOADING SCREEN
window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  if(loader) {
    setTimeout(() => {
      loader.classList.add("fade-out");
      setTimeout(typeWriter, 400);
    }, 2500);
  }
});