// header.js
class HeaderSection {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.isMenuOpen = false;
      this.init();
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
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => this.toggleMenu());
      }
    }
  
    init() {
      this.attachEventListeners();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeaderSection('header-container');
});