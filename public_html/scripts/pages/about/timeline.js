class TimelineSection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.milestones = [];
    }

    async init() {
        try {
            const response = await fetch('/scripts/data/timeline.json');
            const data = await response.json();
            this.milestones = data.milestones;
            this.render();
        } catch (error) {
            console.error('Error loading timeline data:', error);
        }
    }
    
    createTimelinePoints() {
        return this.milestones
            .map((_, index) => this.createPoint(index))
            .join('');
    }

    createPoint(index) {
        return `<div class="timeline__point" style="top: ${index * 25}%"></div>`;
    }

    createTimelineItems() {
        return this.milestones
            .map(item => this.createItem(item))
            .join('');
    }

    createItem({ year, title, description }) {
        return `
            <div class="timeline__item">
                <div class="timeline__year">${year}</div>
                <h3 class="timeline__title">${title}</h3>
                <p class="timeline__description">${description}</p>
            </div>
        `;
    }

    createTemplate() {
        return `
            <div class="container">
                <div class="timeline__header">
                    <h2>Key Milestones of Red Bird Racing</h2>
                    <p>Explore the remarkable journey of Red Bird Racing. Discover our key achievements and milestones since 2017.</p>
                </div>
                <div class="timeline__middle">
                    ${this.createTimelinePoints()}
                </div>
                <div class="timeline__content">
                    ${this.createTimelineItems()}
                </div>
            </div>
        `;
    }

    render() {
        this.container.innerHTML = this.createTemplate();
    }
}

// Usage
const timeline = new TimelineSection('timeline');
timeline.init(); 