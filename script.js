/**
 * Image to PDF Converter - JavaScript
 * Created by Pragati Sahayak Company
 */

// ========================================
// Global Variables
// ========================================
let uploadedImages = [];
let generatedPDF = null;

// ========================================
// DOM Elements
// ========================================
const uploadBox = document.getElementById('upload-box');
const fileInput = document.getElementById('file-input');
const previewSection = document.getElementById('preview-section');
const previewGrid = document.getElementById('preview-grid');
const imageCount = document.getElementById('image-count');
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMobileMenuBtn = document.getElementById('close-mobile-menu');

// ========================================
// Initialize Application
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();
    
    // Check if jsPDF is loaded
    if (typeof window.jspdf === 'undefined') {
        console.warn('jsPDF not loaded yet, waiting...');
        setTimeout(() => {
            if (typeof window.jspdf === 'undefined') {
                showToast('PDF library loading failed. Please refresh the page.', 'error');
            }
        }, 2000);
    }
    
    // Initialize particle animation
    initParticles();
    
    // Initialize scroll reveal animations
    initScrollReveal();
    
    // Initialize event listeners
    initEventListeners();
});

// ========================================
// Particle Animation Background
// ========================================
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    const particles = [];
    const particleCount = 25;
    const connectionDistance = 100;
    const maxConnections = 3;
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    let frameCount = 0;
    function animate() {
        frameCount++;
        if (frameCount % 2 === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((particle, i) => {
                particle.update();
                particle.draw();
                
                // Draw connections
                let connections = 0;
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[j].x - particle.x;
                    const dy = particles[j].y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < connectionDistance && connections < maxConnections) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / connectionDistance)})`;
                        ctx.stroke();
                        connections++;
                    }
                }
            });
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// ========================================
// Scroll Reveal Animations (GSAP)
// ========================================
function initScrollReveal() {
    gsap.registerPlugin(ScrollTrigger);
    
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach((element, index) => {
        gsap.fromTo(element, 
            { 
                opacity: 0, 
                y: 30 
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                delay: index * 0.05
            }
        );
    });
}

// ========================================
// Event Listeners
// ========================================
function initEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }
    
    if (closeMobileMenuBtn) {
        closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
    }
    
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Upload box events
    if (uploadBox) {
        uploadBox.addEventListener('click', () => fileInput.click());
        uploadBox.addEventListener('dragover', handleDragOver);
        uploadBox.addEventListener('dragleave', handleDragLeave);
        uploadBox.addEventListener('drop', handleDrop);
    }
    
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }
    
    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', toggleFAQ);
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });
    
    // Close modals on backdrop click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal && modal.id === 'success-modal') {
                closeSuccessModal();
            }
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
}

// ========================================
// Mobile Menu Functions
// ========================================
function openMobileMenu() {
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    document.body.style.overflow = '';
}

// ========================================
// Scroll Functions
// ========================================
function scrollToConverter() {
    const converter = document.getElementById('converter');
    if (converter) {
        converter.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function smoothScroll(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ========================================
// Drag and Drop Handlers
// ========================================
function handleDragOver(e) {
    e.preventDefault();
    uploadBox.classList.add('dragover');
}

function handleDragLeave() {
    uploadBox.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    uploadBox.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
}

function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    handleFiles(files);
}

// ========================================
// File Handling
// ========================================
function handleFiles(files) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    let addedCount = 0;
    const totalFiles = files.length;
    
    files.forEach(file => {
        if (validTypes.includes(file.type)) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                // Validate image by loading it
                const testImg = new Image();
                
                testImg.onload = () => {
                    uploadedImages.push({
                        file: file,
                        src: e.target.result,
                        name: file.name,
                        width: testImg.width,
                        height: testImg.height
                    });
                    addedCount++;
                    updatePreview();
                    
                    if (addedCount === totalFiles) {
                        showToast(`${addedCount} image(s) added successfully!`);
                    }
                };
                
                testImg.onerror = () => {
                    showToast(`Error loading image: ${file.name}`, 'error');
                };
                
                testImg.src = e.target.result;
            };
            
            reader.onerror = () => {
                showToast(`Error reading file: ${file.name}`, 'error');
            };
            
            reader.readAsDataURL(file);
        } else {
            showToast(`Invalid file type: ${file.name}. Only JPG, PNG, WEBP allowed.`, 'error');
        }
    });
}

// ========================================
// Preview Management
// ========================================
function updatePreview() {
    if (uploadedImages.length === 0) {
        previewSection.classList.add('hidden');
        return;
    }
    
    previewSection.classList.remove('hidden');
    previewGrid.innerHTML = '';
    
    uploadedImages.forEach((image, index) => {
        const card = document.createElement('div');
        card.className = 'preview-card';
        card.innerHTML = `
            <img src="${image.src}" alt="${image.name}" class="w-full h-32 object-cover" loading="lazy">
            <button class="remove-btn" onclick="removeImage(${index})" title="Remove image" aria-label="Remove ${image.name}">
                <i data-lucide="x" class="w-4 h-4"></i>
            </button>
            <div class="p-2">
                <p class="text-xs text-text-secondary truncate">${image.name}</p>
            </div>
        `;
        previewGrid.appendChild(card);
    });
    
    imageCount.textContent = `${uploadedImages.length} image${uploadedImages.length !== 1 ? 's' : ''} selected`;
    
    // Reinitialize icons for new elements
    lucide.createIcons();
}

function removeImage(index) {
    uploadedImages.splice(index, 1);
    updatePreview();
}

function clearAllImages() {
    uploadedImages = [];
    updatePreview();
    if (fileInput) {
        fileInput.value = '';
    }
}

// ========================================
// PDF Conversion
// ========================================
async function convertToPDF() {
    if (uploadedImages.length === 0) {
        showToast('Please upload at least one image', 'error');
        return;
    }
    
    // Check if jsPDF is loaded
    if (typeof window.jspdf === 'undefined') {
        showToast('PDF library not loaded. Please refresh the page.', 'error');
        return;
    }
    
    showLoadingModal();
    
    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = 210;
        const pageHeight = 297;
        
        for (let i = 0; i < uploadedImages.length; i++) {
            // Update progress
            const progress = ((i + 1) / uploadedImages.length) * 100;
            updateProgress(progress, i + 1, uploadedImages.length);
            
            const image = uploadedImages[i];
            
            // Create a promise to handle image loading
            await new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                
                img.onload = () => {
                    try {
                        const imgWidth = img.width;
                        const imgHeight = img.height;
                        const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
                        const newWidth = imgWidth * ratio;
                        const newHeight = imgHeight * ratio;
                        const x = (pageWidth - newWidth) / 2;
                        const y = (pageHeight - newHeight) / 2;
                        
                        if (i > 0) {
                            pdf.addPage();
                        }
                        
                        // Determine image format
                        let format = 'JPEG';
                        if (image.file.type === 'image/png') {
                            format = 'PNG';
                        } else if (image.file.type === 'image/webp') {
                            format = 'WEBP';
                        }
                        
                        pdf.addImage(image.src, format, x, y, newWidth, newHeight);
                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                };
                
                img.onerror = () => {
                    reject(new Error(`Failed to load image: ${image.name}`));
                };
                
                img.src = image.src;
            });
            
            // Small delay for visual feedback
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        generatedPDF = pdf;
        hideLoadingModal();
        showSuccessModal();
        showToast('PDF created successfully!');
        
    } catch (error) {
        console.error('Conversion error:', error);
        hideLoadingModal();
        showToast('Error: ' + (error.message || 'Failed to convert images'), 'error');
    }
}

// ========================================
// Modal Functions
// ========================================
function showLoadingModal() {
    const modal = document.getElementById('loading-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideLoadingModal() {
    const modal = document.getElementById('loading-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    clearAllImages();
}

function updateProgress(percent, current, total) {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    if (progressBar) {
        progressBar.style.width = percent + '%';
    }
    if (progressText) {
        progressText.textContent = `Processing image ${current} of ${total}`;
    }
}

// ========================================
// PDF Download
// ========================================
function downloadPDF() {
    if (generatedPDF) {
        try {
            const timestamp = new Date().toISOString().slice(0, 10);
            generatedPDF.save(`converted-images-${timestamp}.pdf`);
            showToast('PDF downloaded successfully!');
            setTimeout(() => {
                closeSuccessModal();
            }, 500);
        } catch (error) {
            console.error('Download error:', error);
            showToast('Error downloading PDF. Please try again.', 'error');
        }
    } else {
        showToast('No PDF available. Please convert first.', 'error');
    }
}

// ========================================
// Toast Notification
// ========================================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    toast.className = 'toast show';
    
    if (type === 'error') {
        toast.classList.add('error');
    } else {
        toast.classList.remove('error');
    }
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========================================
// FAQ Accordion
// ========================================
function toggleFAQ() {
    const item = this.parentElement;
    const isActive = item.classList.contains('active');
    
    // Close all items
    document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        item.classList.add('active');
    }
}

// ========================================
// Keyboard Shortcuts
// ========================================
function handleKeyboard(e) {
    if (e.key === 'Escape') {
        closeSuccessModal();
        closeMobileMenu();
    }
    
    // Ctrl/Cmd + Enter to convert
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (uploadedImages.length > 0) {
            convertToPDF();
        }
    }
}

// ========================================
// Utility Functions
// ========================================
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global access
window.scrollToConverter = scrollToConverter;
window.scrollToSection = scrollToSection;
window.removeImage = removeImage;
window.clearAllImages = clearAllImages;
window.convertToPDF = convertToPDF;
window.downloadPDF = downloadPDF;
window.closeSuccessModal = closeSuccessModal;
window.closeMobileMenu = closeMobileMenu;