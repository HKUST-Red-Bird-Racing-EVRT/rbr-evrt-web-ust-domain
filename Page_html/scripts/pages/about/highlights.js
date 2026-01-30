class HighlightsSection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.data = null;
    }

    async init() {
        try {
            const response = await fetch('/scripts/data/highlights.json');
            this.data = await response.json();
            this.render();
        } catch (error) {
            console.error('Error loading highlights:', error);
        }
    }

    createButton(button) {
        if (!button) return '';
        return `
            <a href="${button.url}" class="button button--dark">
                ${button.text}
            </a>
        `;
    }

    createSection(section, index) {
        return `
            <div class="highlight ${section.align === 'left' ? 'highlight--left' : 'highlight--right'}">
                <div class="highlight__content">
                    <h2>${section.title}</h2>
                    <p>${section.description}</p>
                    ${section.button ? this.createButton(section.button) : ''}
                </div>
                <div class="highlight__image">
                    <img src="${section.image}" alt="${section.title}">
                </div>
            </div>
        `;
    }

    render() {
        if (!this.container || !this.data) return;

        this.container.innerHTML = `
            <div class="container">
                ${this.data.sections.map((section, index) => 
                    this.createSection(section, index)
                ).join('')}
            </div>
        `;
    }
} 