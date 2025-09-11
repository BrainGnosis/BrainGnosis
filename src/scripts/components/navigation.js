/**
 * Navigation Component
 * Handles mobile menu functionality and smooth scrolling
 */

class Navigation {
  constructor() {
    this.init();
  }

  init() {
    // Wait for components to load
    setTimeout(() => {
      this.mobileMenuButton = document.getElementById('mobile-menu-button');
      this.mobileMenu = document.getElementById('mobile-menu');
      this.header = document.getElementById('header');
      
      this.setupMobileMenu();
      this.setupScrollEffect();
      this.setupSmoothScrolling();
    }, 200);
  }

  setupMobileMenu() {
    if (this.mobileMenuButton && this.mobileMenu) {
      console.log('Mobile menu setup successful');
      this.mobileMenuButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Mobile menu button clicked');
        
        const isHidden = this.mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
          // Show menu
          this.mobileMenu.classList.remove('hidden');
          this.mobileMenu.style.maxHeight = '0px';
          this.mobileMenu.style.opacity = '0';
          
          requestAnimationFrame(() => {
            this.mobileMenu.style.transition = 'all 0.3s ease-in-out';
            this.mobileMenu.style.maxHeight = this.mobileMenu.scrollHeight + 'px';
            this.mobileMenu.style.opacity = '1';
          });
          
          // Change hamburger to X
          const icon = this.mobileMenuButton.querySelector('i');
          if (icon) {
            icon.className = 'fas fa-times text-lg text-neutral-600';
          }
        } else {
          // Hide menu
          this.mobileMenu.style.maxHeight = '0px';
          this.mobileMenu.style.opacity = '0';
          
          setTimeout(() => {
            this.mobileMenu.classList.add('hidden');
          }, 300);
          
          // Change X back to hamburger
          const icon = this.mobileMenuButton.querySelector('i');
          if (icon) {
            icon.className = 'fas fa-bars text-lg text-neutral-600';
          }
        }
      });
    } else {
      console.error('Mobile menu elements not found:', {
        button: !!this.mobileMenuButton,
        menu: !!this.mobileMenu
      });
    }
  }

  setupScrollEffect() {
    if (this.header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          this.header.classList.add('scrolled');
        } else {
          this.header.classList.remove('scrolled');
        }
      });
    }
  }

  setupSmoothScrolling() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        
        if (target) {
          const headerHeight = this.header ? this.header.offsetHeight : 0;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (this.mobileMenu) {
            this.mobileMenu.classList.add('hidden');
          }
        }
      });
    });

    // Handle cross-page navigation with hash (from careers page to homepage sections)
    this.handleHashNavigation();
  }

  handleHashNavigation() {
    // Check if page loaded with a hash
    if (window.location.hash) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
          const headerHeight = this.header ? this.header.offsetHeight : 0;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }, 100); // Small delay to ensure page is fully loaded
    }
  }
}

export default Navigation;
