# 📸 How to Add Khushi's Real Photos

Welcome, Ujjwal! This folder is where you can put the real photos for the scrapbook.

## 🚀 Easy 3-Step Guide:

### 1. Copy your photos into this folder:
Place your image files directly inside:
`public/photos/`

For example:
- `first-meet.jpg`
- `cafe-date.jpg`
- `sunset-smile.jpg`
- `diwali-memory.jpg`

---

### 2. Update `src/content.js`:
Open `src/content.js` and locate the `photos` list around line 55:

```javascript
  photos: [
    {
      id: 1,
      src: '/photos/first-meet.jpg',
      caption: 'The day we first met ✨',
      date: 'March 2024',
    },
    {
      id: 2,
      src: '/photos/cafe-date.jpg',
      caption: 'That rainy afternoon laugh',
      date: 'July 2024',
    },
    // add as many or as few as you like!
  ],
```

---

### 3. Tips for the best look:
- **Aspect ratio**: Square (1:1) or vertical portrait (3:4 or 4:5) photos look stunning in Polaroid frames.
- **File size**: JPG or PNG files between 200KB and 2MB load smoothly on phones.
- **Captions**: Handwritten font will display your words under each Polaroid.
- **Live Preview in Browser**: You can also click the **"📸 Personalise / Preview Photos"** button directly on the website to test out photos from your device before editing any code!
