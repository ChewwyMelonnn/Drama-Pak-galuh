# 🎵 Soundboard

Sebuah website soundboard yang minimalis dan estetik dengan desain hitam-putih. Aplikasi ini memungkinkan Anda untuk memutar berbagai sound dengan mudah.

## 🎨 Fitur

- **Desain Minimalis**: Interface yang bersih dengan warna hitam dan putih
- **Sound Player**: Menampilkan progress bar dan durasi sound
- **Responsive Design**: Bekerja baik di desktop, tablet, dan mobile
- **Custom Sound**: Mudah menambahkan sound custom
- **Long Duration Support**: Mendukung audio dengan durasi panjang
- **UI Feedback**: Visual feedback saat sound sedang diputar (animasi pulse)

## 📁 Struktur File

```
soundboard/
├── index.html          # File HTML utama
├── styles.css          # File CSS untuk styling
├── script.js           # File JavaScript untuk logic
├── README.md           # File dokumentasi ini
└── sounds/             # Folder untuk menyimpan file audio
    ├── sound1.mp3
    ├── sound2.mp3
    └── ... (tambahkan sound Anda di sini)
```

## 🚀 Cara Menggunakan

### 1. **Setup Folder Sounds**
Buat folder bernama `sounds` di direktori yang sama dengan file `index.html`:
```
soundboard/
├── index.html
├── sounds/
└── ...
```

### 2. **Tambahkan File Audio**
Letakkan file audio Anda (format `.mp3`, `.wav`, `.ogg`, dll) di folder `sounds/`:
```
sounds/
├── sound1.mp3
├── sound2.mp3
├── drama1.mp3
└── ...
```

### 3. **Customize Sound di Code**
Buka file `script.js` dan cari bagian `SOUNDBOARD CONFIGURATION` (sekitar line 1-18).

Ubah array `SOUNDS` sesuai dengan file audio yang Anda miliki:

**Sebelum:**
```javascript
const SOUNDS = [
    { name: 'Sound 1', file: 'sounds/sound1.mp3' },
    { name: 'Sound 2', file: 'sounds/sound2.mp3' },
    { name: 'Sound 3', file: 'sounds/sound3.mp3' },
    // ... dll
];
```

**Sesudah (contoh):**
```javascript
const SOUNDS = [
    { name: 'Drama Charge', file: 'sounds/drama-charge.mp3' },
    { name: 'Laugh Track', file: 'sounds/laugh.mp3' },
    { name: 'Explosion', file: 'sounds/explosion.wav' },
    { name: 'Applause', file: 'sounds/applause.ogg' },
];
```

**Penjelasan:**
- `name`: Teks yang akan ditampilkan di tombol soundboard
- `file`: Path ke file audio di folder `sounds/`

### 4. **Buka di Browser**
Buka file `index.html` di browser favorit Anda (atau gunakan local server):
```bash
# Jika menggunakan Python
python -m http.server 8000

# Jika menggunakan Node.js (http-server)
npx http-server
```

Kemudian akses `http://localhost:8000` di browser.

## 🎮 Cara Bermain

1. **Klik tombol sound** untuk memutar sound
2. **Klik tombol yang sama** untuk menghentikan sound
3. **Lihat progress bar** untuk melihat progress pemutaran
4. **Klik di progress bar** untuk melompat ke waktu tertentu
5. **Durasi total** ditampilkan di bagian bawah player

## 🛠️ Format File Audio yang Didukung

- `.mp3` (MP3 Audio)
- `.wav` (WAV Audio)
- `.ogg` (Ogg Vorbis)
- `.m4a` (MPEG-4 Audio)
- Format lain yang didukung browser

## 🎨 Kustomisasi UI

### Mengubah Warna
Edit file `styles.css`:
- Background: Ubah `#000000` menjadi warna yang diinginkan
- Text: Ubah `#ffffff` menjadi warna yang diinginkan
- Border: Ubah nilai `border: 2px solid #ffffff`

### Mengubah Ukuran Tombol
Di `styles.css`, cari `.sound-button` dan ubah nilai `minmax(120px, 1fr)`:
```css
.soundboard {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); /* Ubah 120px ke ukuran yang diinginkan */
}
```

### Mengubah Font
Edit `body` di `styles.css`:
```css
body {
    font-family: 'Nama Font Pilihan', sans-serif;
}
```

## 💡 Tips

- **Gunakan file audio berkualitas baik** untuk hasil terbaik
- **Kompres file audio** agar loading lebih cepat
- **Gunakan nama sound yang deskriptif** agar mudah diingat
- **Organize folder** dengan membuat subfolder jika memiliki banyak sound

## 📝 Contoh Konfigurasi Lengkap

```javascript
const SOUNDS = [
    // Drama Series
    { name: 'Dramatic Gasp', file: 'sounds/dramatic-gasp.mp3' },
    { name: 'Dramatic Music', file: 'sounds/dramatic-music.mp3' },
    { name: 'Plot Twist', file: 'sounds/plot-twist.mp3' },
    
    // Reactions
    { name: 'Applause', file: 'sounds/applause.mp3' },
    { name: 'Laughter', file: 'sounds/laughter.mp3' },
    { name: 'Booing', file: 'sounds/booing.mp3' },
    
    // Sound Effects
    { name: 'Explosion', file: 'sounds/explosion.mp3' },
    { name: 'Laser', file: 'sounds/laser.mp3' },
];
```

## 🐛 Troubleshooting

### Sound Tidak Muncul
- Pastikan file ada di folder `sounds/`
- Pastikan path di `script.js` sesuai dengan nama file
- Check console browser untuk error messages (tekan F12)

### Sound Tidak Bisa Diputar
- Pastikan format file didukung browser
- Coba gunakan server lokal daripada membuka file langsung
- Periksa permission folder

### Progress Bar Tidak Bergerak
- Pastikan audio file tidak corrupt
- Coba refresh halaman
- Coba dengan file audio lain

## 📄 Lisensi

Bebas digunakan untuk keperluan apapun.

---

**Dibuat dengan ❤️ untuk Drama Series Lovers**