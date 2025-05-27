class FooterSection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.data = {
            logo: {
                image: "/assets/images/logo.png",
                alt: "Red Bird Racing Logo",
                link: "/"
            },
            contact: {
                address: {
                    label: "Address:",
                    text: "The Hong Kong University of Science and Technology, <br>Clear Water Bay, <br>Kowloon, <br>Hong Kong",
                    link: "https://maps.app.goo.gl/sFrP1ztGPWXhz1fM8"
                },
                info: {
                    label: "Contact:",
                    email: "redbirdracinghkustevrt@gmail.com",
                    link: "mailto:redbirdracinghkustevrt@gmail.com"
                }
            },
            social: [
                { icon: "fa-brands fa-facebook", link: "https://www.facebook.com/HKUST-Red-Bird-Racing-EVRT-102382105550032/", label: "Facebook" },
                { icon: "fa-brands fa-instagram", link: "https://www.instagram.com/red.bird.racing_hkust/", label: "Instagram" },
                { icon: "fa-brands fa-linkedin", link: "https://hk.linkedin.com/company/hkust-red-bird-racing-evrt", label: "LinkedIn" },
                { icon: "fa-brands fa-youtube", link: "https://www.youtube.com/@hkustredbirdracingevrt305", label: "YouTube" }
            ],
            legal: {
                copyright: "© 2024 HKUST Red Bird Racing (EVRT). All rights reserved.",
            }
        };
    }

    init() {
        this.render();
    }

    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="container">
                <div class="footer__content">
                    <div class="footer__logo">
                        <a href="${this.data.logo.link}">
                            <img src="${this.data.logo.image}" alt="${this.data.logo.alt}" class="logo__image">
                        </a>
                    </div>

                    <div class="footer__info">
                        <div class="footer__address">
                            <p>${this.data.contact.address.label}</p>
                            <a href="${this.data.contact.address.link}">${this.data.contact.address.text}</a>
                        </div>
                        <div class="footer__contact">
                            <p>${this.data.contact.info.label}</p>
                            <a href="${this.data.contact.info.link}">${this.data.contact.info.email}</a>
                        </div>
                    </div>

                    <div class="footer__social">
                        ${this.data.social
                            .map(item => `
                                <a href="${item.link}" aria-label="${item.label}">
                                    <i class="${item.icon}"></i>
                                </a>
                            `)
                            .join('')}
                    </div>
                </div>

                <div class="footer__bottom">
                    <p class="footer__copyright">${this.data.legal.copyright}</p>
                </div>
            </div>
        `;
    }
} 