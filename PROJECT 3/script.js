const video = document.getElementById('video');
const timestamp = document.getElementById('timestamp');
const play = document.getElementById('play');
const stop1 = document.getElementById('stop');
const progress = document.getElementById('progress');
const volumeControl = document.getElementById('volume'); 
const volumeIcon = document.getElementById('volume-icon');

function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updatePlayIcon() {
    if (video.paused) {
        play.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        play.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
}

function updateProgress() {
    const progressValue = (video.currentTime / video.duration) * 100;
    progress.value = progressValue;
    const minutes = Math.floor(video.currentTime / 60);
    const seconds = Math.floor(video.currentTime % 60);
    timestamp.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function setVideoProgress() {
    const value = progress.value;
    const time = (value / 100) * video.duration;
    video.currentTime = time;
}

function stopVideo() {
    video.pause();
    video.currentTime = 0;
    progress.value = 0;
    timestamp.textContent = '00:00';
}

video.addEventListener('click', toggleVideoStatus);  // Corrected function name here
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);  // Corrected function name here

stop1.addEventListener('click', stopVideo);

progress.addEventListener('input', setVideoProgress);

volumeControl.addEventListener('input', (e) => {
    const volume = e.target.value;
    video.volume = volume;
    if (volume == 0) {
        volumeIcon.className = 'fa-solid fa-volume-xmark';
    } else if (volume <= 0.5) {
        volumeIcon.className = 'fa-solid fa-volume-low';
    } else {
        volumeIcon.className = 'fa-solid fa-volume-high';
    }
});

volumeIcon.addEventListener('click', () => {
    if (video.volume > 0) {
        video.volume = 0;
        volumeControl.value = 0;
        volumeIcon.className = 'fa-solid fa-volume-xmark';
    } else {
        video.volume = 1;
        volumeControl.value = 1;
        volumeIcon.className = 'fa-solid fa-volume-high';
    }
});
