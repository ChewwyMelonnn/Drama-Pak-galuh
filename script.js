// ============================================
// SOUNDBOARD CONFIGURATION
// ============================================
// Tambahkan sound yang ingin Anda gunakan di sini
// Format: { name: 'Nama Sound', file: 'path-ke-file-di-folder-sounds' }
const SOUNDS = [
    { name: 'kiichan', file: 'sounds/Kiichan Babalik Sa yo cover.mp3' },
    { name: 'tiny little adiantum', file: 'sounds/Tiny Little Adiantum.mp3' },
    { name: 'broken hearth', file: 'sounds/Rixton Me and My Broken Heart Official Video.mp3' },
    { name: 'boone', file: 'sounds/Benson Boone In the Stars Official Lyric Video.mp3' },
    { name: 'Sound 5', file: 'sounds/sound5.mp3' },
    { name: 'Sound 6', file: 'sounds/sound6.mp3' },
    { name: 'Sound 7', file: 'sounds/sound7.mp3' },
    { name: 'Sound 8', file: 'sounds/sound8.mp3' },
];

const audioPlayer = document.getElementById('audioPlayer');
const soundboard = document.querySelector('.soundboard');
const trackNameDisplay = document.querySelector('.track-name');
const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');
const timeDisplay = document.querySelector('.time');

let currentPlayingButton = null;

// ============================================
// INITIALIZE SOUNDBOARD
// ============================================
function initializeSoundboard() {
    SOUNDS.forEach((sound, index) => {
        const button = document.createElement('button');
        button.className = 'sound-button';
        button.textContent = sound.name;
        button.dataset.index = index;
        button.dataset.file = sound.file;

        button.addEventListener('click', () => playSound(sound, button));
        soundboard.appendChild(button);
    });
}

// ============================================
// PLAY SOUND
// ============================================
function playSound(sound, button) {
    // Jika sound yang sama sedang diputar, hentikan
    if (audioPlayer.src === sound.file && !audioPlayer.paused) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        if (currentPlayingButton) {
            currentPlayingButton.classList.remove('playing');
        }
        currentPlayingButton = null;
        trackNameDisplay.textContent = 'No sound playing';
        return;
    }

    // Hentikan sound yang sebelumnya
    audioPlayer.pause();
    if (currentPlayingButton) {
        currentPlayingButton.classList.remove('playing');
    }

    // Set source dan mainkan
    audioPlayer.src = sound.file;
    audioPlayer.play().catch(error => {
        console.error('Error playing sound:', error);
        alert('Error: Cannot play sound. Make sure the file exists at: ' + sound.file);
    });

    // Update UI
    currentPlayingButton = button;
    button.classList.add('playing');
    trackNameDisplay.textContent = sound.name;
}

// ============================================
// UPDATE PROGRESS BAR
// ============================================
audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progress.style.width = percent + '%';
        updateTimeDisplay();
    }
});

// ============================================
// UPDATE TIME DISPLAY
// ============================================
function updateTimeDisplay() {
    const current = formatTime(audioPlayer.currentTime);
    const duration = formatTime(audioPlayer.duration);
    timeDisplay.textContent = `${current} / ${duration}`;
}

// ============================================
// FORMAT TIME
// ============================================
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// ============================================
// PROGRESS BAR CLICK
// ============================================
progressBar.addEventListener('click', (e) => {
    if (audioPlayer.duration) {
        const rect = progressBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = x / rect.width;
        audioPlayer.currentTime = percent * audioPlayer.duration;
    }
});

// ============================================
// SOUND ENDED
// ============================================
audioPlayer.addEventListener('ended', () => {
    if (currentPlayingButton) {
        currentPlayingButton.classList.remove('playing');
    }
    currentPlayingButton = null;
    trackNameDisplay.textContent = 'No sound playing';
    progress.style.width = '0%';
    timeDisplay.textContent = '0:00 / 0:00';
});

// ============================================
// START APPLICATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeSoundboard();
});
