class HeroSection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.data = null;
    }

    async init(pageContext = 'home', options = {}) {
        try {
            const response = await fetch('/scripts/data/hero.json');
            const data = await response.json();
            this.data = {
                ...data[pageContext],
                ...options // Allow overriding default settings
            };
            this.render();
            this.handleResize();
            window.addEventListener('resize', () => this.handleResize());
        } catch (error) {
            console.error('Error loading hero data:', error);
        }
    }

    handleResize() {
        // Adjust hero height for mobile devices to account for browser UI
        if (window.innerWidth <= 768) {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
    }

    render() {
        if (!this.container || !this.data) return;

        this.container.innerHTML = `
            <div class="hero__background">
                <img src="/assets/images/2024-compressed/_ECA0989.jpg" alt="Hero background">
            </div>
            <div class="container hero__container">
                <div class="hero__content">
                    <h1 class="hero__title">
                        ${this.data.title.split('\n').join('<br>')}
                    </h1>
                    <p class="hero__text">${this.data.description}</p>
                    ${this.data.button && !this.data.hideButton ? `
                        <a href="${this.data.button.link}" class="button button--dark">
                            ${this.data.button.text}
                        </a>
                    ` : ''}
                </div>
            </div>
        `;

        // Add overlay class to container
        this.container.classList.add('hero--overlay');
    }
} 