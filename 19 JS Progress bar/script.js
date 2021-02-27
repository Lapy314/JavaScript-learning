const progressBars = document.querySelectorAll(".progress-width");

progressBars.forEach(progressBar => {
  progressBar.style.width = `${progressBar.dataset.percent}%`;
});