class TeamSection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.teams = [];
    }

    async init() {
        try {
            const response = await fetch('/scripts/data/teams.json');
            const data = await response.json();
            this.teams = data.teams;
            this.render();
        } catch (error) {
            console.error('Error loading teams:', error);
        }
    }

    renderTeamCard(team) {
        return `
            <div class="team-card">
                <div class="team-card__image">
                    <img src="${team.image}" alt="${team.name}" onerror="this.src='/assets/images/favicon.png'">
                </div>
                <div class="team-card__content">
                    <h3 class="team-card__title">${team.name}</h3>
                    <p class="team-card__description">${team.description}</p>
                </div>
            </div>
        `;
    }

    render() {
        if (!this.container || !this.teams.length) return;

        this.container.innerHTML = `
            <div class="container">
                <div class="team__header">
                    <h2 class="team__title">Our Team</h2>
                    <p class="team__subtitle">Our team is made up of dedicated individuals who are passionate about racing. We have a diverse team with members from different faculties, including Engineering, Business, and Science. Different departments work together to design, build, and race our car.</p>
                </div>
                <div class="team__grid">
                    ${this.teams.map(team => this.renderTeamCard(team)).join('')}
                </div>
            </div>
        `;
    }
} 