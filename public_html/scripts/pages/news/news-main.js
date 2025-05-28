document.addEventListener('DOMContentLoaded', async () => {
    // Initialize header
    const headerSection = new HeaderSection('header-section');
    headerSection.init();

    // Initialize hero
    const heroSection = new HeroSection('hero-section');
    await heroSection.init("news");

    // Initialize news section
    const newsSection = new NewsSection('news-section');
    await newsSection.init();
}); 