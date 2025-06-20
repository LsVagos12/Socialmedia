const volumeSlider = document.getElementById("volumeSlider");
volumeSlider.addEventListener("input", () => {
  music.volume = volumeSlider.value;
});
