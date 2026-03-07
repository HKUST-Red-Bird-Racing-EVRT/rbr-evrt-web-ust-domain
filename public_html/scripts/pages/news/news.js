class NewsSection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.categories = [
            { id: 'all', text: 'View All', active: true },
            { id: 'upcoming', text: 'Upcoming Events' },
            { id: 'passed', text: 'Passed Events' },
            { id: 'team', text: 'Team News' },
            { id: 'highlights', text: 'Team Highlights' },
            { id: 'results', text: 'Race Results' },
        ];
        this.articles = [];
    }

    init() {
        // Fetch blog posts data
        fetch('/scripts/data/blog-posts.json')
            .then(response => response.json())
            .then(data => {
                this.articles = data.posts;
                this.render();
            })
            .catch(error => {
                console.error('Error loading blog posts:', error);
                this.articles = [];
                this.render();
            });
    }

    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="container">
                <div class="news__content">
                    <aside class="news__sidebar">
                        <h3>Blog Categories</h3>
                        <ul class="news__categories">
                            ${this.categories.map(category => `
                                <li>
                                    <a href="#${category.id}" 
                                       class="news__category ${category.active ? 'news__category--active' : ''}"
                                       data-category="${category.id}">
                                        ${category.text}
                                    </a>
                                </li>
                            `).join('')}
                        </ul>
                    </aside>

                    <div class="news__grid">
                        ${this.articles.length ? 
                            this.articles.map(article => this.renderArticle(article)).join('') :
                            '<p class="news__empty">No articles available at the moment.</p>'
                        }
                    </div>
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    renderArticle(article) {
        return `
            <article class="blog-card" onclick="window.location.href='/pages/blog-detail.html?id=${article.title.replace(/\s+/g, '-').toLowerCase()}'">
                <div class="blog-card__image">
                    <img src="${article.image}" 
                         alt="${article.title}"
                         onerror="this.src='/assets/images/favicon.png'"
                         loading="lazy">
                </div>
                <div class="blog-card__content">
                    <span class="blog-card__category">${article.category}</span>
                    <h2 class="blog-card__title">${article.title}</h2>
                    <p class="blog-card__description">${article.description}</p>
                    <div class="blog-card__meta">
                        <span>${article.date}</span>
                        <span>•</span>
                        <span>${article.readTime}</span>
                    </div>
                </div>
            </article>
        `;
    }

    filterPosts(category) {
        const newsGrid = this.container.querySelector('.news__grid');
        if (!newsGrid) return;

        if (category === 'all') {
            newsGrid.innerHTML = this.articles.length ? 
                this.articles.map(article => this.renderArticle(article)).join('') :
                '<p class="news__empty">No articles available at the moment.</p>';
        } else {
            const filteredArticles = this.articles.filter(article => 
                article.category.toLowerCase() === category.toLowerCase()
            );
            newsGrid.innerHTML = filteredArticles.length ?
                filteredArticles.map(article => this.renderArticle(article)).join('') :
                '<p class="news__empty">No articles available in this category.</p>';
        }
    }

    attachEventListeners() {
        const categoryLinks = this.container.querySelectorAll('.news__category');
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterPosts(e.target.dataset.category);
                
                // Update active state
                categoryLinks.forEach(l => l.classList.remove('news__category--active'));
                e.target.classList.add('news__category--active');
            });
        });
    }
} 