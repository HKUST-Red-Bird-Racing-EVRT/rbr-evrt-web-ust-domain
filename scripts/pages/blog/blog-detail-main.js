document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize header
        const headerSection = new HeaderSection('header-section');
        headerSection.init();

        // Get post ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');

        // Fetch blog posts data
        const response = await fetch('/scripts/data/blog-posts.json');
        const data = await response.json();
        
        // Find the matching post
        const post = data.posts.find(p => 
            p.title.replace(/\s+/g, '-').toLowerCase() === postId
        );

        // Initialize blog detail section
        const blogDetailSection = new BlogDetailSection('blog-detail-section');
        blogDetailSection.init(post);

        // Initialize footer
        const footerSection = new FooterSection('footer-section');
        footerSection.init();
    } catch (error) {
        console.error('Error initializing page:', error);
    }
}); 