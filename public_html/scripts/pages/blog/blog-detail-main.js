document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize header
        const headerSection = new HeaderSection('header-section');
        headerSection.init();

        // Get post ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');

        // Initialize blog detail section
        const blogDetailSection = new BlogDetailSection('blog-detail-section');
        blogDetailSection.init(postId);
    } catch (error) {
        console.error('Error initializing page:', error);
    }
}); 