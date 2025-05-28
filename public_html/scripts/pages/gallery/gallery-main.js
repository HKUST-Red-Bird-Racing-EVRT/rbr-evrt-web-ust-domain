document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize header
        const headerSection = new HeaderSection('header-section');
        headerSection.init();

        // Initialize hero with gallery context
        const heroSection = new HeroSection('hero-section');
        await heroSection.init('gallery');

        // Initialize gallery section
        const gallerySection = new GallerySection('gallery-section');
        await gallerySection.init();
    } catch (error) {
        console.error('Error initializing page:', error);
    }
}); 