document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize header
        const headerSection = new HeaderSection('header-section');
        headerSection.init();

        // Initialize hero with team page context
        const heroSection = new HeroSection('hero-section');
        await heroSection.init('team');

        // Initialize team section
        const teamSection = new TeamSection('team-section');
        await teamSection.init();

        // Initialize footer
        const footerSection = new FooterSection('footer-section');
        footerSection.init();
    } catch (error) {
        console.error('Error initializing page:', error);
    }
}); 