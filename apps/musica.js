let musicFiles = [];
let currentTrackIndex = 0;
const audio = new Audio();
const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById("volumeControl");


// Actualizar barra de progreso mientras suena la canción
audio.addEventListener("timeupdate", () => {
    if (progressBar) {
      progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
    }
  });
  
  // Hacer seek al mover la barra
  progressBar?.addEventListener("input", () => {
    if (audio.duration) {
      const seekTime = (progressBar.value / 100) * audio.duration;
      audio.currentTime = seekTime;
    }
  });
  
  // Control de volumen
  volumeSlider?.addEventListener("input", () => {
    audio.volume = parseFloat(volumeSlider.value);
  });


  function openMusicPlayer() {
    fetch("assets/playlist.json")
      .then(res => res.json())
      .then(data => {
        musicFiles = data;
        buildPlaylist();
        loadTrack(0);
        openWindow('musicPlayerWindow');
  
        setTimeout(() => {
          const progressBar = document.getElementById("progressBar");
          const volumeSlider = document.getElementById("volumeControl");
  
          // Eventos
          audio.addEventListener("timeupdate", () => {
            if (progressBar) {
              progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
            }
          });
  
          progressBar?.addEventListener("input", () => {
            if (audio.duration) {
              const seekTime = (progressBar.value / 100) * audio.duration;
              audio.currentTime = seekTime;
            }
          });
  
          volumeSlider?.addEventListener("input", () => {
            audio.volume = parseFloat(volumeSlider.value);
          });
        }, 100);
      });
  }

function buildPlaylist() {
  const playlist = document.getElementById('playlistSelect');
  playlist.innerHTML = '';
  musicFiles.forEach((track, index) => {
    const opt = document.createElement('option');
    opt.value = index;
    opt.textContent = track.name;
    playlist.appendChild(opt);
  });
}

function loadTrack(index) {
  currentTrackIndex = index;
  const track = musicFiles[index];
  audio.src = `assets/${track.file}`;
  document.getElementById('currentSong').textContent = track.name;
  document.getElementById('playlistSelect').value = index;
}

function loadSelectedSong() {
  const selected = document.getElementById('playlistSelect').value;
  loadTrack(Number(selected));
  playMusic();
}

function playMusic() {
  audio.play();
}

function pauseMusic() {
  audio.pause();
}

function nextMusic() {
    if (isShuffling) {
      let next;
      do {
        next = Math.floor(Math.random() * musicFiles.length);
      } while (next === currentTrackIndex && musicFiles.length > 1);
      currentTrackIndex = next;
    } else {
      currentTrackIndex = (currentTrackIndex + 1) % musicFiles.length;
    }
    loadTrack(currentTrackIndex);
    playMusic();
  }

let isShuffling = false;
let isLooping = false;

function toggleShuffle() {
  isShuffling = !isShuffling;
  alert(`Shuffle ${isShuffling ? 'activado' : 'desactivado'}`);
}

function toggleLoop() {
  isLooping = !isLooping;
  audio.loop = isLooping;
  alert(`Loop ${isLooping ? 'activado' : 'desactivado'}`);
}

// Interceptar el cierre de la ventana desde dentro de musica.js
document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.querySelector('#musicPlayerWindow .close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (!audio.paused) {
        audio.pause();
      }
    });
  }
});