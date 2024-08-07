document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('.story__videos');
  const progressButtons = document.querySelectorAll('.story__nav-progressbar');
  const progressBars = document.querySelectorAll('.story__nav-progressbar .progress');
  let currentVideoIndex = 0;
  let userInteracted = false;

  function playVideo(index) {
      // Останавливаем текущее видео
      if (videos[currentVideoIndex]) {
          videos[currentVideoIndex].pause();
          videos[currentVideoIndex].classList.remove('active');
      }

      // Воспроизводим новое видео
      currentVideoIndex = index;
      const video = videos[currentVideoIndex];
      video.classList.add('active');
      video.play();

      // Обновляем прогресс-бар
      video.addEventListener('loadedmetadata', updateProgressBar);
      updateProgressBar();
  }

  function updateProgressBar() {
      const video = videos[currentVideoIndex];
      const duration = video.duration;

      function step() {
          const currentTime = video.currentTime;
          const progress = (currentTime / duration) * 100;
          if (progressBars[currentVideoIndex]) {
              progressBars[currentVideoIndex].style.width = `${progress}%`;
          }

          if (!video.paused && !video.ended) {
              requestAnimationFrame(step);
          }
      }

      if (!isNaN(duration)) {
          requestAnimationFrame(step);
      }
  }

  // Назначаем события клика на кнопки прогресса
  progressButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => playVideo(index));
  });

  // Событие завершения видео
  videos.forEach((video, index) => {
      video.addEventListener('ended', () => {
          if (index < videos.length - 1) {
              playVideo(index + 1);
          }
      });
  });

  // Инициализация первого видео после первого взаимодействия
  document.body.addEventListener('click', () => {
      if (!userInteracted) {
          userInteracted = true;
          playVideo(0);
      }
  }, { once: true });
});