document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize header
        const headerSection = new HeaderSection('header-section');
        headerSection.init();

        // Initialize hero with partners context
        const heroSection = new HeroSection('hero-section');
        await heroSection.init('sponsors');

        // Initialize partners section
        const partnersSection = new PartnersSection('partners-section');
        console.log('Partners section initialized');
        await partnersSection.init();
        console.log('Partners data loaded:', partnersSection.data);

        // Initialize footer
        const footerSection = new FooterSection('footer-section');
        footerSection.init();
    } catch (error) {
        console.error('Error initializing page:', error);
    }
});