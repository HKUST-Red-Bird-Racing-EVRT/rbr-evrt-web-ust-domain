document.addEventListener('DOMContentLoaded', () => {
    // Initialize header
    const headerSection = new HeaderSection('header-section');
    headerSection.init();

    // Initialize hero with about page context
    const heroSection = new HeroSection('hero-section');
    heroSection.init('about');

    // Initialize about sections
    const aboutSection = new AboutSection('about-section');
    aboutSection.init();

    const timelineSection = new TimelineSection('timeline-section');
    timelineSection.init();

    const highlightsSection = new HighlightsSection('highlights-section');
    highlightsSection.init();

    // Initialize footer
    const footerSection = new FooterSection('footer-section');
    footerSection.init();
}); 