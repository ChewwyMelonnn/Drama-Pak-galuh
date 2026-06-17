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
    console.log('=== SOUNDBOARD INITIALIZATION START ===');
    console.log('Current URL:', window.location.href);
    console.log('DOM Ready State:', document.readyState);
    
    try {
        audioPlayer = document.getElementById('audioPlayer');
        soundboard = document.querySelector('.soundboard');
        trackNameDisplay = document.querySelector('.track-name');
        timeSlider = document.getElementById('timeSlider');
        timeDisplay = document.querySelector('.time');
        stopButton = document.getElementById('stopButton');
        
        console.log('Searching for elements...');
        console.log('- audioPlayer:', audioPlayer ? '✓ Found' : '✗ NOT FOUND');
        console.log('- soundboard:', soundboard ? '✓ Found' : '✗ NOT FOUND');
        console.log('- trackNameDisplay:', trackNameDisplay ? '✓ Found' : '✗ NOT FOUND');
        console.log('- timeSlider:', timeSlider ? '✓ Found' : '✗ NOT FOUND');
        console.log('- timeDisplay:', timeDisplay ? '✓ Found' : '✗ NOT FOUND');
        console.log('- stopButton:', stopButton ? '✓ Found' : '✗ NOT FOUND');
        
        // Check if all elements exist
        if (!audioPlayer || !soundboard || !trackNameDisplay || !timeSlider || !timeDisplay || !stopButton) {
            console.error('ERROR: One or more required HTML elements not found!');
            console.error('Please make sure HTML file has all required elements.');
            return false;
        }
        
        console.log('✓ All HTML elements found successfully!');
        
        // Initialize soundboard buttons
        console.log('Initializing soundboard with', SOUNDS.length, 'sounds...');
        initializeSoundboard();
        updateSliderBackground();
        attachEventListeners();
        
        console.log('✓ Soundboard initialized successfully!');
        console.log('=== SOUNDBOARD INITIALIZATION COMPLETE ===\n');
        return true;
    } catch (error) {
        console.error('FATAL ERROR during initialization:', error);
        console.error('Stack:', error.stack);
        return false;
    }
}

// ============================================
// INITIALIZE SOUNDBOARD
// ============================================
function initializeSoundboard() {
    console.log('Creating', SOUNDS.length, 'sound buttons...');
    
    if (!soundboard) {
        console.error('ERROR: soundboard element not available!');
        return;
    }
    
    // Clear existing buttons
    soundboard.innerHTML = '';
    
    SOUNDS.forEach((sound, index) => {
        try {
            const button = document.createElement('button');
            button.className = 'sound-button';
            button.textContent = sound.name;
            button.dataset.index = index;
            button.dataset.file = sound.file;
            button.title = sound.name; // Tooltip
            button.setAttribute('type', 'button');

            button.addEventListener('click', () => playSound(sound, button));
            soundboard.appendChild(button);
            console.log('Button created:', index + 1, '-', sound.name);
        } catch (error) {
            console.error('Error creating button for sound:', sound.name, error);
        }
    });
    
    console.log('✓ Total buttons created:', soundboard.children.length);
}

// ============================================
// PLAY SOUND
// ============================================
function playSound(sound, button) {
    console.log('\n>>> PLAY SOUND: ' + sound.name);
    console.log('File path:', sound.file);
    
    try {
        // Jika sound yang sama sedang diputar, hentikan
        if (audioPlayer.src === sound.file && !audioPlayer.paused) {
            console.log('Sound already playing - stopping...');
            stopSound();
            return;
        }

        // Hentikan sound yang sebelumnya
        audioPlayer.pause();
        if (currentPlayingButton) {
            currentPlayingButton.classList.remove('playing');
        }

        // Set source dan mainkan
        console.log('Setting audio source...');
        audioPlayer.src = sound.file;
        
        const playPromise = audioPlayer.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('✓ Audio playing successfully');
            }).catch(error => {
                console.error('✗ Error playing audio:', error.message);
                console.error('Error name:', error.name);
                console.error('File path:', sound.file);
                console.log('Possible reasons:');
                console.log('1. File does not exist at:', sound.file);
                console.log('2. CORS issue (if file is from different domain)');
                console.log('3. Browser autoplay policy issue');
                console.log('4. Audio format not supported by browser');
                alert('❌ Cannot play sound: ' + sound.name + '\n\nFile: ' + sound.file + '\n\nPlease check if the file exists in the sounds folder.');
            });
        }

        // Update UI
        currentPlayingButton = button;
        button.classList.add('playing');
        trackNameDisplay.textContent = sound.name;
        stopButton.disabled = false;
        console.log('✓ UI updated');
    } catch (error) {
        console.error('Error in playSound function:', error);
    }
}

// ============================================
// STOP SOUND
// ============================================
function stopSound() {
    console.log('>>> STOP SOUND');
    
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
    console.log('✓ Sound stopped');
}

// ============================================
// ATTACH EVENT LISTENERS
// ============================================
function attachEventListeners() {
    console.log('Attaching event listeners...');
    
    try {
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
            console.log('>>> Audio ended');
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
        
        console.log('✓ Event listeners attached');
    } catch (error) {
        console.error('Error attaching event listeners:', error);
    }
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
    if (timeSlider) {
        const value = (timeSlider.value - timeSlider.min) / (timeSlider.max - timeSlider.min) * 100;
        timeSlider.style.setProperty('--value', value + '%');
    }
}

// ============================================
// START APPLICATION
// ============================================
console.log('Script loaded - waiting for DOM...');

if (document.readyState === 'loading') {
    console.log('Document is loading - adding DOMContentLoaded listener');
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded event triggered');
        initializeApp();
    });
} else {
    console.log('Document already loaded - initializing immediately');
    setTimeout(() => {
        initializeApp();
    }, 100);
}

// Also add a window load event as backup
window.addEventListener('load', () => {
    console.log('Window load event triggered');
    if (soundboard && soundboard.children.length === 0) {
        console.log('Soundboard is empty, reinitializing...');
        initializeApp();
    }
});