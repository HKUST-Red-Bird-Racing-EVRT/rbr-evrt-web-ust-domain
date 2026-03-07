class GallerySection {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.data = null;
        this.modal = null;
        this.currentImageIndex = 0;
    }

    async init() {
        try {
            const response = await fetch('/scripts/data/gallery.json');
            this.data = await response.json();
            this.render();
            this.createModal();
            this.attachEventListeners();
        } catch (error) {
            console.error('Error loading gallery:', error);
        }
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="gallery-modal__content">
                <button class="gallery-modal__close">&times;</button>
                <button class="gallery-modal__prev"><i class="fas fa-chevron-left"></i></button>
                <button class="gallery-modal__next"><i class="fas fa-chevron-right"></i></button>
                <img src="" alt="" class="gallery-modal__image">
            </div>
        `;
        document.body.appendChild(modal);
        this.modal = modal;
    }

    attachEventListeners() {
        // Image click handlers
        const images = this.container.querySelectorAll('.gallery-item__image');
        images.forEach((img, index) => {
            img.addEventListener('click', () => this.openModal(index));
        });

        // Modal controls
        this.modal.querySelector('.gallery-modal__close').addEventListener('click', () => this.closeModal());
        this.modal.querySelector('.gallery-modal__prev').addEventListener('click', () => this.showPrevImage());
        this.modal.querySelector('.gallery-modal__next').addEventListener('click', () => this.showNextImage());
        
        // Close on background click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('gallery-modal--open')) return;
            
            switch(e.key) {
                case 'Escape': this.closeModal(); break;
                case 'ArrowLeft': this.showPrevImage(); break;
                case 'ArrowRight': this.showNextImage(); break;
            }
        });
    }

    openModal(index) {
        this.currentImageIndex = index;
        this.modal.classList.add('gallery-modal--open');
        this.updateModalImage();
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('gallery-modal--open');
        document.body.style.overflow = '';
    }

    showPrevImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.data.images.length) % this.data.images.length;
        this.updateModalImage();
    }

    showNextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.data.images.length;
        this.updateModalImage();
    }

    updateModalImage() {
        const image = this.data.images[this.currentImageIndex];
        const modalImg = this.modal.querySelector('.gallery-modal__image');
        modalImg.src = image.url;
        modalImg.alt = image.caption;
    }

    render() {
        if (!this.container || !this.data) return;

        this.container.innerHTML = `
            <div class="container">
                <div class="gallery__filters">
                    ${this.data.categories.map(category => `
                        <button 
                            class="gallery__filter ${category.id === 'all' ? 'gallery__filter--active' : ''}"
                            data-category="${category.id}"
                        >
                            ${category.name}
                        </button>
                    `).join('')}
                </div>
                <div class="gallery__grid">
                    ${this.data.images.map((image, index) => `
                        <div class="gallery-item" data-category="${image.category}">
                            <img 
                                src="${image.url}" 
                                alt="${image.caption}"
                                class="gallery-item__image"
                                loading="lazy"
                            >
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Add filter functionality
        this.attachFilterListeners();
    }

    attachFilterListeners() {
        const filters = this.container.querySelectorAll('.gallery__filter');
        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Update active filter
                filters.forEach(f => f.classList.remove('gallery__filter--active'));
                filter.classList.add('gallery__filter--active');

                // Filter images
                const category = filter.dataset.category;
                this.filterImages(category);
            });
        });
    }

    filterImages(category) {
        const items = this.container.querySelectorAll('.gallery-item');
        items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
} 