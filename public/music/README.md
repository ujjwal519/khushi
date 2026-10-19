# 🎵 Background Music Guide

The website includes a floating music toggle button in the bottom-right corner. It is disabled by default and will NEVER autoplay.

## How to add your own background music:

1. **Place your audio file** here in this folder:
   `public/music/`
   (Recommended format: `.mp3` or `.m4a`, e.g. `gentle-piano.mp3`)

2. **Open `src/content.js`** and set:
   ```javascript
   musicEnabled: true,
   musicSrc: '/music/gentle-piano.mp3',
   ```

3. **Audio Guidelines**:
   - Use gentle, royalty-free instrumental piano or acoustic guitar music.
   - Recommended volume is low and soothing (the site sets a gentle 30% baseline).
   - Audio will only play when Khushi taps the music button.
