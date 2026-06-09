# Image to PDF Converter

A premium, beautiful, and modern web application for converting JPG, PNG, and WEBP images to PDF documents. Built with HTML, CSS, JavaScript, and the jsPDF library.

**This website was created by Pragati Sahayak Company**

![Image to PDF Converter](screenshot.png)

## Features

- **Multiple Image Support**: Upload and convert multiple JPG, PNG, and WEBP images into a single PDF
- **Drag & Drop Interface**: Beautiful upload box with intuitive drag-and-drop functionality
- **Image Preview Grid**: Visual preview of selected images with individual remove buttons
- **Smooth Animations**: GSAP-powered scroll reveal animations and hover effects
- **Glassmorphism Design**: Modern glass-like cards with backdrop blur effects
- **Gradient Backgrounds**: Eye-catching gradient backgrounds and text effects
- **Mobile Responsive**: Fully responsive design that works on all devices
- **Loading Animation**: Visual feedback during PDF conversion with progress bar
- **Success Notification**: Beautiful modal with download button after conversion
- **Secure Processing**: All processing happens locally in the browser - no server uploads
- **Particle Animation**: Interactive background particle system

## Main Sections

1. **Hero Section**: Attractive landing area with call-to-action buttons
2. **Upload Section**: Drag-and-drop file upload with image preview
3. **Features Section**: Six feature cards highlighting key capabilities
4. **How It Works**: Three-step explanation of the conversion process
5. **FAQ Section**: Accordion-style frequently asked questions
6. **Footer**: Complete with navigation links and social icons

## Technologies Used

- **HTML5**: Semantic markup structure
- **Tailwind CSS v4**: Utility-first CSS framework for styling
- **JavaScript (ES6+)**: Core functionality and interactivity
- **jsPDF**: Client-side PDF generation library
- **GSAP**: Animation library for scroll reveals and interactions
- **Lucide Icons**: Modern icon library
- **Canvas API**: Particle animation background

## File Structure

```
image-to-pdf-converter/
├── index.html          # Main HTML file with all content
├── style.css           # Not used - styles are in index.html
├── script.js           # Not used - scripts are in index.html
└── README.md           # Project documentation
```

*Note: All CSS and JavaScript are embedded in index.html for simplicity and single-file deployment.*

## How to Use

1. **Upload Images**: Click the upload box or drag and drop your images (JPG, PNG, WEBP)
2. **Preview**: Review your images in the preview grid
3. **Remove**: Click the X button on any image to remove it
4. **Convert**: Click "Convert to PDF" button
5. **Download**: After conversion completes, click "Download PDF" to save your file

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Installation

No installation required! Simply open `index.html` in any modern web browser.

### Local Development

1. Clone or download this repository
2. Open `index.html` in your browser
3. Start converting images!

### Web Deployment

Upload `index.html` to any web hosting service:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting provider

## Customization

### Colors
The color scheme is defined in the Tailwind CSS configuration within `index.html`:

```css
@theme {
    --color-primary: #6366f1;
    --color-secondary: #ec4899;
    --color-accent: #06b6d4;
    --color-bg-dark: #0f0f1a;
}
```

### Particle Animation
Adjust particle settings in the JavaScript:
- `particleCount`: Number of particles (default: 25)
- `connectionDistance`: Distance for line connections (default: 100)
- `maxConnections`: Max connections per particle (default: 3)

## Performance

- Images processed locally in browser
- No server uploads required
- Optimized animations with requestAnimationFrame
- Lazy loading with scroll reveal animations

## Privacy & Security

- All image processing happens client-side
- No images uploaded to any server
- No data collection or tracking
- Complete privacy guaranteed

## License

This project is open source and available under the MIT License.

## Credits

- [jsPDF](https://github.com/parallax/jsPDF) - PDF generation library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [GSAP](https://greensock.com/gsap/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Icon library

## Support

For issues or feature requests, please open an issue on the project repository.

---

Made with ❤️ by **Pragati Sahayak** for everyone who needs to convert images to PDF quickly and securely.