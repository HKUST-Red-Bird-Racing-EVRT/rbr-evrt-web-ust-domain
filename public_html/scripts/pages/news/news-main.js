document.addEventListener('DOMContentLoaded', () => {
    // Initialize header
    const headerSection = new HeaderSection('header-section');
    headerSection.init();

    // Initialize hero
    const heroSection = new HeroSection('hero-section');
    heroSection.init("news");

    // Initialize news section
    const newsSection = new NewsSection('news-section');
    newsSection.init();

    // Initialize footer
    const footerSection = new FooterSection('footer-section');
    footerSection.init();
}); 