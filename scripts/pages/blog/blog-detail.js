class BlogDetailSection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.post = null;
    }

    init(postData) {
        this.post = postData;
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