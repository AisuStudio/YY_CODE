/* Schatzy hero slider — crossfades the .hero-slider__slide images in a track. */
(function () {
  document.querySelectorAll('.hero-slider__track').forEach(function (track) {
    var slides = track.querySelectorAll('.hero-slider__slide');
    if (slides.length < 2) return;
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove('is-active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('is-active');
    }, 4000);
  });
})();
