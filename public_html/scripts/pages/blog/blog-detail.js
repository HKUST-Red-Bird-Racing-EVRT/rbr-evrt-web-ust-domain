class BlogDetailSection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.post = null;
    }

    async init(postId, pageContext = 'news', options = {}) {
        // Fetch blog posts data
        const urlParams = new URLSearchParams({
            page: 'blog-posts',
            context: encodeURIComponent(pageContext)
        });

        data = null;

        try {
            const response = await fetch(`/api/get_json_data.php?${urlParams}`);

            data = await response.json();
        } catch (error) {
            console.error('Error loading teams:', error);
            data = null;
        }
        
        // Find the matching post
        const post = data.posts.find(p => 
            p.title.replace(/\s+/g, '-').toLowerCase() === postId
        );
        this.post = post;
        this.render();
    }

    render() {
        if (!this.container || !this.post) return;

        this.container.innerHTML = `
            <div class="container">
                <div class="blog-detail">
                    <div class="blog-detail__header">
                        <div class="blog-detail__meta">
                            <span class="blog-detail__category">${this.post.category}</span>
                            <span class="blog-detail__date">${this.post.date}</span>
                            <span class="blog-detail__read-time">${this.post.readTime}</span>
                        </div>
                        <h1 class="blog-detail__title">${this.post.title}</h1>
                    </div>
                    
                    <div class="blog-detail__image">
                        <img src="${this.post.image}" 
                             alt="${this.post.title}"
                             onerror="this.src='/assets/images/favicon.png'">
                    </div>
                    
                    <div class="blog-detail__content">
                        ${this.post.content}
                    </div>
                    
                    <div class="blog-detail__footer">
                        <a href="javascript:history.back()" class="button button--outline">
                            <i class="fas fa-arrow-left"></i> Back
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
} 