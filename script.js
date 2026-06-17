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

let audioPlayer = null;
let soundboard = null;
let trackNameDisplay = null;
let timeSlider = null;
let timeDisplay = null;
let stopButton = null;

let currentPlayingButton = null;
let isSliderDragging = false;

// ============================================
// INITIALIZE APP
// ============================================
function initializeApp() {
    console.log('Initializing soundboard app...');
    
    audioPlayer = document.getElementById('audioPlayer');
    soundboard = document.querySelector('.soundboard');
    trackNameDisplay = document.querySelector('.track-name');
    timeSlider = document.getElementById('timeSlider');
    timeDisplay = document.querySelector('.time');
    stopButton = document.getElementById('stopButton');
    
    // Check if all elements exist
    if (!audioPlayer || !soundboard || !trackNameDisplay || !timeSlider || !timeDisplay || !stopButton) {
        console.error('ERROR: One or more required HTML elements not found!');
        console.error('audioPlayer:', audioPlayer);
        console.error('soundboard:', soundboard);
        console.error('trackNameDisplay:', trackNameDisplay);
        console.error('timeSlider:', timeSlider);
        console.error('timeDisplay:', timeDisplay);
        console.error('stopButton:', stopButton);
        return;
    }
    
    console.log('All HTML elements found successfully!');
    
    // Initialize soundboard buttons
    initializeSoundboard();
    updateSliderBackground();
    attachEventListeners();
    
    console.log('Soundboard initialized successfully!');
}

// ============================================
// INITIALIZE SOUNDBOARD
// ============================================
function initializeSoundboard() {
    console.log('Creating sound buttons... Total sounds:', SOUNDS.length);
    
    SOUNDS.forEach((sound, index) => {
        const button = document.createElement('button');
        button.className = 'sound-button';
        button.textContent = sound.name;
        button.dataset.index = index;
        button.dataset.file = sound.file;
        button.title = sound.name; // Tooltip

        button.addEventListener('click', () => playSound(sound, button));
        soundboard.appendChild(button);
    });
    
    console.log('Sound buttons created:', soundboard.children.length);
}

// ============================================
// PLAY SOUND
// ============================================
function playSound(sound, button) {
    console.log('Playing sound:', sound.name);
    
    // Jika sound yang sama sedang diputar, hentikan
    if (audioPlayer.src === sound.file && !audioPlayer.paused) {
        console.log('Sound already playing, stopping...');
        stopSound();
        return;
    }

    // Hentikan sound yang sebelumnya
    audioPlayer.pause();
    if (currentPlayingButton) {
        currentPlayingButton.classList.remove('playing');
    }

    // Set source dan mainkan
    audioPlayer.src = sound.file;
    
    audioPlayer.play().then(() => {
        console.log('Sound playing successfully:', sound.name);
    }).catch(error => {
        console.error('Error playing sound:', error);
        console.error('File path:', sound.file);
        alert('Error: Cannot play sound.\n\nFile: ' + sound.file + '\n\nMake sure the file exists in the sounds folder.');
    });

    // Update UI
    currentPlayingButton = button;
    button.classList.add('playing');
    trackNameDisplay.textContent = sound.name;
    stopButton.disabled = false;
}

// ============================================
// STOP SOUND
// ============================================
function stopSound() {
    console.log('Stopping sound');
    
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    if (currentPlayingButton) {
        currentPlayingButton.classList.remove('playing');
    }
    currentPlayingButton = null;
    trackNameDisplay.textContent = 'No sound playing';
    timeSlider.value = 0;
    updateSliderBackground();
    timeDisplay.textContent = '0:00 / 0:00';
    stopButton.disabled = true;
}

// ============================================
// ATTACH EVENT LISTENERS
// ============================================
function attachEventListeners() {
    console.log('Attaching event listeners...');
    
    // Update progress bar
    audioPlayer.addEventListener('timeupdate', () => {
        if (audioPlayer.duration && !isSliderDragging) {
            const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            timeSlider.value = percent;
            updateSliderBackground();
            updateTimeDisplay();
        }
    });

    // Slider interaction
    timeSlider.addEventListener('input', (e) => {
        if (audioPlayer.duration) {
            const percent = parseFloat(e.target.value);
            audioPlayer.currentTime = (percent / 100) * audioPlayer.duration;
            updateSliderBackground();
            updateTimeDisplay();
        }
    });

    timeSlider.addEventListener('mousedown', () => {
        isSliderDragging = true;
    });

    timeSlider.addEventListener('mouseup', () => {
        isSliderDragging = false;
    });

    timeSlider.addEventListener('touchstart', () => {
        isSliderDragging = true;
    });

    timeSlider.addEventListener('touchend', () => {
        isSliderDragging = false;
    });

    // Stop button
    stopButton.addEventListener('click', stopSound);

    // Sound ended
    audioPlayer.addEventListener('ended', () => {
        if (currentPlayingButton) {
            currentPlayingButton.classList.remove('playing');
        }
        currentPlayingButton = null;
        trackNameDisplay.textContent = 'No sound playing';
        timeSlider.value = 0;
        updateSliderBackground();
        timeDisplay.textContent = '0:00 / 0:00';
        stopButton.disabled = true;
    });
    
    console.log('Event listeners attached successfully!');
}

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
// UPDATE SLIDER BACKGROUND
// ============================================
function updateSliderBackground() {
    const value = (timeSlider.value - timeSlider.min) / (timeSlider.max - timeSlider.min) * 100;
    timeSlider.style.setProperty('--value', value + '%');
}

// ============================================
// START APPLICATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Starting initialization');
    initializeApp();
});

// Also try immediate initialization in case DOM is already loaded
if (document.readyState === 'loading') {
    console.log('Document is still loading...');
} else {
    console.log('Document already loaded - Initializing immediately');
    initializeApp();
}