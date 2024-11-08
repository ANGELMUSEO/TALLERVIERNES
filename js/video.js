function playVideo(button) {
  const container = button.parentElement;
  const video = container.querySelector('video');
  
  button.style.display = 'none';
  video.play();
}