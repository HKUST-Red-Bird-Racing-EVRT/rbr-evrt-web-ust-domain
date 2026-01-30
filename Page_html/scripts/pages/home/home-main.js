document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize header
        const headerSection = new HeaderSection('header-section');
        headerSection.init();

        // Initialize hero with home context
        const heroSection = new HeroSection('hero-section');
        await heroSection.init('home');

        // Initialize posts section
        const postsSection = new PostsSection('posts-section');
        await postsSection.init();

        // Initialize footer
        const footerSection = new FooterSection('footer-section');
        footerSection.init();
    } catch (error) {
        console.error('Error initializing page:', error);
    }
}); 