// SOUNDBOARD CONFIGURATION
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

// DOM Elements
const audioPlayer = document.getElementById('audioPlayer');
const soundboardContainer = document.querySelector('.soundboard');
const trackNameElement = document.querySelector('.track-name');
const timeSliderElement = document.getElementById('timeSlider');
const timeDisplayElement = document.querySelector('.time');
const stopButtonElement = document.getElementById('stopButton');

let currentButton = null;
let isDragging = false;

// Create and render all sound buttons
function renderButtons() {
    soundboardContainer.innerHTML = '';
    
    SOUNDS.forEach((sound) => {
        const btn = document.createElement('button');
        btn.className = 'sound-button';
        btn.textContent = sound.name;
        btn.onclick = () => handlePlayClick(sound, btn);
        soundboardContainer.appendChild(btn);
    });
}

// Handle play button click
function handlePlayClick(sound, button) {
    // If same sound is playing, stop it
    if (audioPlayer.src === sound.file && !audioPlayer.paused) {
        stopAudio();
        return;
    }
    
    // Stop previous sound
    audioPlayer.pause();
    
    // Remove playing class from previous button
    if (currentButton) {
        currentButton.classList.remove('playing');
    }
    
    // Set new audio source and play
    audioPlayer.src = sound.file;
    audioPlayer.play().catch(err => {
        alert('Cannot play: ' + sound.name + '\nFile: ' + sound.file);
    });
    
    // Update UI
    currentButton = button;
    button.classList.add('playing');
    trackNameElement.textContent = sound.name;
    stopButtonElement.disabled = false;
}

// Stop audio
function stopAudio() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    
    if (currentButton) {
        currentButton.classList.remove('playing');
    }
    
    currentButton = null;
    trackNameElement.textContent = 'No sound playing';
    timeSliderElement.value = 0;
    updateSliderGradient();
    timeDisplayElement.textContent = '0:00 / 0:00';
    stopButtonElement.disabled = true;
}

// Format seconds to mm:ss
function formatTime(seconds) {
    if (!isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Update time display
function updateTimeDisplay() {
    const current = formatTime(audioPlayer.currentTime);
    const duration = formatTime(audioPlayer.duration);
    timeDisplayElement.textContent = `${current} / ${duration}`;
}

// Update slider gradient
function updateSliderGradient() {
    const value = (timeSliderElement.value - timeSliderElement.min) / (timeSliderElement.max - timeSliderElement.min) * 100;
    timeSliderElement.style.setProperty('--value', value + '%');
}

// Audio time update listener
audioPlayer.addEventListener('timeupdate', () => {
    if (!isDragging) {
        timeSliderElement.value = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
        updateSliderGradient();
        updateTimeDisplay();
    }
});

// Slider input listener
timeSliderElement.addEventListener('input', () => {
    if (audioPlayer.duration) {
        audioPlayer.currentTime = (timeSliderElement.value / 100) * audioPlayer.duration;
        updateSliderGradient();
        updateTimeDisplay();
    }
});

// Slider drag listeners
timeSliderElement.addEventListener('mousedown', () => { isDragging = true; });
timeSliderElement.addEventListener('mouseup', () => { isDragging = false; });
timeSliderElement.addEventListener('touchstart', () => { isDragging = true; });
timeSliderElement.addEventListener('touchend', () => { isDragging = false; });

// Stop button listener
stopButtonElement.addEventListener('click', stopAudio);

// Audio ended listener
audioPlayer.addEventListener('ended', () => {
    if (currentButton) {
        currentButton.classList.remove('playing');
    }
    currentButton = null;
    trackNameElement.textContent = 'No sound playing';
    timeSliderElement.value = 0;
    updateSliderGradient();
    timeDisplayElement.textContent = '0:00 / 0:00';
    stopButtonElement.disabled = true;
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderButtons);
} else {
    renderButtons();
}