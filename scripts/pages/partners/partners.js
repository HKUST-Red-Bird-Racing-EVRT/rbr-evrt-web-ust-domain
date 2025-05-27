class PartnersSection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.data = null;
    }

    async init() {
        try {
            const response = await fetch('/scripts/data/partners.json');
            this.data = await response.json();
            this.render();
        } catch (error) {
            console.error('Error loading partners:', error);
        }
    }

renderPartnerCard(partner) {
    return `
        <div class="partner-card partner-card--${partner.tier.toLowerCase()}">
            <div class="partner-card__image" data-name="${partner.name}">
                <a href="${partner.website}" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="partner-card__link">
                    <img src="${partner.logo}" alt="${partner.name} logo">
                </a>
            </div>
        </div>
        `;
    }

    renderTierSection(tier, partners) {
        return `
            <div class="partners__tier">
                <h2 class="partners__tier-title">${tier} Partners</h2>
                <div class="partners__grid partners__grid--${tier.toLowerCase()}">
                    ${partners
                        .filter(partner => partner.tier === tier)
                        .map(partner => this.renderPartnerCard(partner))
                        .join('')}
                </div>
            </div>
        `;
    }

    render() {
        if (!this.container || !this.data) return;

        const tiers = ['Platinum', 'Gold', 'Silver', 'Bronze'];
        
        this.container.innerHTML = `
            <div class="container">
                <div class="partners__header">
                    <h2 class="partners__title">Supporting Innovation Together</h2>
                    <p class="partners__subtitle">Meet the organizations that help make our racing dreams possible.</p>
                </div>
                ${tiers.map(tier => this.renderTierSection(tier, this.data.partners)).join('')}
            </div>
        `;
    }
}