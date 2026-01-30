class PostsSection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.data = null;
    }

    async init() {
        try {
            const response = await fetch('/scripts/data/blog-posts.json');
            this.data = await response.json();
            this.render();
        } catch (error) {
            console.error('Error loading posts:', error);
        }
    }

    renderPost(post) {
        return `
            <article class="post-card" onclick="window.location.href='/pages/blog-detail.html?id=${post.title.replace(/\s+/g, '-').toLowerCase()}'">
                <div class="post-card__image">
                    <img src="${post.image}" 
                         alt="${post.title}"
                         loading="lazy"
                         onerror="this.src='/assets/images/favicon.png'">
                </div>
                <div class="post-card__content">
                    <div class="post-card__meta">
                        <span class="post-card__category">${post.category}</span>
                        <span class="post-card__read-time">${post.readTime}</span>
                    </div>
                    <h3 class="post-card__title">${post.title}</h3>
                    <p class="post-card__description">${post.description}</p>
                    <div class="post-card__footer">
                        <a href="#" class="post-card__link">Read more <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </article>
        `;
    }

    render() {
        if (!this.container || !this.data) return;

        this.container.innerHTML = `
            <div class="container">
                <div class="posts__header">
                    <div class="posts__header-content">
                        <h2>Latest News</h2>
                        <p>Our latest updates and achievements.</p>
                    </div>
                    <a href="/pages/news.html" class="button button--outline">View all</a>
                </div>
                <div class="posts__grid">
                    ${this.data.posts.slice(0, 4).map(post => this.renderPost(post)).join('')}
                </div>
            </div>
        `;
    }
}
