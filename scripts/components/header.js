class HeaderSection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.data = {
            logo: {
                image: "/assets/images/logo.png",
                alt: "Red Bird Racing Logo",
                link: "/"
            },
            navigation: [
                { text: "About Us", link: "/pages/about.html" },
                { text: "Our Team", link: "/pages/team.html" },
                { text: "News", link: "/pages/news.html" },
                { text: "Our Partners", link: "/pages/partners.html" },
                { text: "Photo Gallery", link: "/pages/gallery.html" }
            ]
        };
        this.isMenuOpen = false;
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        const mobileNav = document.querySelector('.nav__mobile');
        const toggleBtn = document.querySelector('.nav__toggle');
        
        if (this.isMenuOpen) {
            mobileNav.classList.add('nav__mobile--open');
            toggleBtn.classList.add('nav__toggle--open');
            document.body.style.overflow = 'hidden';
        } else {
            mobileNav.classList.remove('nav__mobile--open');
            toggleBtn.classList.remove('nav__toggle--open');
            document.body.style.overflow = '';
        }
    }

    attachEventListeners() {
        const toggleBtn = document.querySelector('.nav__toggle');
        toggleBtn.addEventListener('click', () => this.toggleMenu());
    }

    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="header__container">
                <a href="${this.data.logo.link}" class="logo">
                    <img src="${this.data.logo.image}" alt="${this.data.logo.alt}" class="logo__image">
                </a>
                
                <nav class="nav">
                    <ul class="nav__list">
                        ${this.data.navigation.map(item => `
                            <li><a href="${item.link}">${item.text}</a></li>
                        `).join('')}
                    </ul>

                    <button class="nav__toggle" aria-label="Toggle menu">
                        <span class="nav__toggle-icon"></span>
                    </button>

                    <div class="nav__mobile">
                        <ul class="nav__mobile-list">
                            ${this.data.navigation.map(item => `
                                <li><a href="${item.link}">${item.text}</a></li>
                            `).join('')}
                        </ul>
                    </div>
                </nav>
            </div>
        `;
    }
} 