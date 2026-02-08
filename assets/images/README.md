# 📸 AuctionsTable Images Directory

This folder contains all locally hosted images for the AuctionsTable project.

## 📁 Folder Structure

```
images/
├── hero/              (3 images)  - Large banner images for hero carousel
├── categories/        (8 images)  - Category icons/thumbnails
├── auctions/          (7 images)  - Active auction item images
├── completed/         (5 images)  - Completed auction item images
└── icons/             (0 images)  - Reserved for favicons, logos, etc.
```

---

## 📊 Image Inventory

### Hero Section (`hero/`)
- **hero-1.jpg** - Luxury auction hall banner (1920x900px)
- **hero-2.jpg** - Rare collectibles banner (1920x900px)
- **hero-3.jpg** - Online bidding banner (1920x900px)

### Categories (`categories/`)
- **electronics.jpg** - Electronics category icon (300x300px)
- **art.jpg** - Art & Paintings category icon (300x300px)
- **real-estate.jpg** - Real Estate category icon (300x300px)
- **vehicles.jpg** - Vehicles category icon (300x300px)
- **jewelry.jpg** - Jewelry category icon (300x300px)
- **watches.jpg** - Watches category icon (300x300px)
- **fashion.jpg** - Fashion category icon (300x300px)
- **antiques.jpg** - Antiques category icon (300x300px)

### Auction Items (`auctions/`)
- **vintage-camera.jpg** - Vintage Leica camera (600x400px)
- **leica-camera-modal.jpg** - Leica camera detail for modal (800x500px)
- **abstract-painting.jpg** - Abstract oil painting (600x400px)
- **diamond-ring.jpg** - Diamond ring photo (600x400px)
- **classic-car.jpg** - Classic Ferrari 275 GTB (600x400px)
- **signed-guitar.jpg** - Signed Fender Stratocaster (600x400px)
- **sculpture.jpg** - Bronze sculpture (600x400px)

### Completed Auctions (`completed/`)
- **rolex-watch.jpg** - Rolex Daytona 1969 (500x350px)
- **wine-collection.jpg** - Chateau Lafite collection (500x350px)
- **nft-art.jpg** - Digital NFT art (500x350px)
- **jordan-jersey.jpg** - Signed Jordan basketball jersey (500x350px)
- **baseball-glove.jpg** - Vintage baseball memorabilia (500x350px)

### Icons (`icons/`)
Reserved for:
- favicon.ico
- logo.svg
- social media icons
- brand marks

---

## 🎯 Download Information

All images were downloaded on **February 9, 2026** using the `download-images.ps1` script.

### Sources
- **Unsplash** - Free high-quality stock photos
- **Google Images** - Various auction item photos
- **WatchSwiss** - Luxury watch photography

---

## 📐 Image Specifications

| Category | Resolution | File Format | Use Case |
|----------|-----------|-------------|----------|
| Hero | 1920x900 | JPG | Full-width carousel banners |
| Categories | 300x300 | JPG | Circular category cards |
| Auctions | 600x400 | JPG | Grid auction item cards |
| Auctions Modal | 800x500 | JPG | Detailed item modals |
| Completed | 500x350 | JPG | Carousel completed items |

---

## 🔄 Updating Images

To replace or add images:

1. **Add new image** to the appropriate folder
2. **Update HTML** file with new `src` path:
   ```html
   <img src="assets/images/<folder>/<filename>" alt="description" />
   ```
3. **For modal images** in `data-img` attributes:
   ```html
   data-img="assets/images/<folder>/<filename>"
   ```

---

## ✅ Current Status

- ✅ **23 images** downloaded and organized  
- ✅ All images locally hosted (not external URLs)
- ✅ HTML updated with local paths
- ✅ Reduced external dependencies
- ✅ Faster page loads (no external CDN delay)

---

## 📝 Notes

- After local setup, the website is fully self-contained
- Smaller GitHub repository size
- All images are free-to-use (Unsplash + public domain)
- Images can be swapped easily without code changes
- Responsive sizes for different breakpoints

---

**Last Updated:** February 9, 2026
