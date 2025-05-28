class HeroSection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.data = null;
        
        // Add error handling for container initialization
        if (!this.container) {
            console.error(`Container ${containerId} not found`);
            throw new Error(`Container ${containerId} not found`);
        }
    }

    async init(pageContext = 'home', options = {}) {
        const urlParams = new URLSearchParams({
            page: 'hero',
            context: encodeURIComponent(pageContext)
        });

        try {
            const response = await fetch(`/api/get_json_data.php?${urlParams}`);

            this.data = await response.json();

            this.render();
            this.handleResize();
            window.addEventListener('resize', () => this.handleResize());
            
            return this.data; // Return data for chaining
            
        } catch (error) {
            console.error('Error initializing hero section:', error);
            throw error; // Re-throw for caller handling
        }
    }

    handleResize() {
        if (window.innerWidth <= 768) {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
    }

    render() {
        if (!this.container || !this.data) {
            console.warn('Cannot render hero section - container or data missing');
            return;
        }
    
        // Split newlines and convert to array of strings
        const titleParts = this.data.title.split('\n');
        
        // Convert each part to span elements with line breaks
        const titleHtml = titleParts.map((part, index) => 
            `<span class="hero__title-line">${this.sanitizeHTML(part)}</span>${
                index < titleParts.length - 1 ? '<br>' : ''
            }`
        ).join('');
    
        this.container.innerHTML = `
            <div class="hero__background">
                <img src="/assets/images/2024-compressed/_ECA0989.jpg" alt="Hero background" loading="lazy">
            </div>
            <div class="container hero__container">
                <div class="hero__content">
                    <h1 class="hero__title">
                        ${titleHtml}
                    </h1>
                    <p class="hero__text">${this.sanitizeHTML(this.data.description)}</p>
                    ${this.renderButton()}
                </div>
            </div>
        `;
        
        // Add CSS classes
        this.container.classList.add('hero--overlay');
    }

    renderButton() {
        if (!this.data.button || this.data.hideButton) return '';
        
        return `
            <a href="${this.sanitizeURL(this.data.button.link)}" class="button button--dark">
                ${this.sanitizeHTML(this.data.button.text)}
            </a>
        `;
    }

    sanitizeHTML(str) {
        return str.replace(/[&<>"']/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            }[tag] || tag));
    }

    sanitizeURL(url) {
        try {
            new URL(url);
            return url;
        } catch {
            return '#';
        }
    }
}