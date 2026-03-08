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
                       class="partner-card__link"
                       title="Visit ${partner.name}">
                        <img src="${partner.logo}" 
                             alt="${partner.name} logo"
                             onerror="this.parentElement.innerHTML='<span class=\\'partner-card__fallback\\'>${partner.name}</span>'">
                    </a>
                </div>
            </div>
        `;
    }

    renderTierSection(tier, partners) {
        const tierPartners = partners.filter(partner => partner.tier === tier);
        if (tierPartners.length === 0) return '';

        return `
            <div class="partners__tier">
                <h2 class="partners__tier-title">${tier} Partners</h2>
                <div class="partners__grid partners__grid--${tier.toLowerCase()}">
                    ${tierPartners.map(partner => this.renderPartnerCard(partner)).join('')}
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
                
                <div class="partners__cta">
                    <div class="partners__cta-content">
                        <h2 class="partners__cta-slogan">Join our Journey</h2>
                        <p class="partners__cta-text">Partner with the next generation of engineering talent. Your support fuels innovation, learning, and world-class competition.</p>
                        <a href="mailto:redbirdracinghkustevrt@gmail.com" class="button button--dark partners__cta-button">
                            Become a Sponsor <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                    <div class="partners__cta-image">
                        <img src="/assets/images/2024-compressed/D3S_4912.jpg" 
                             alt="Red Bird Racing Team"
                             loading="lazy">
                    </div>
                </div>
            </div>
        `;
    }
}