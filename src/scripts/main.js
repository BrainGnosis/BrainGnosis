/**
 * BrainGnosis Main JavaScript
 * Entry point for all JavaScript functionality
 */

import Navigation from './components/navigation.js';
import Modals from './components/modals.js';
import Careers from './components/careers.js';

class App {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    // Initialize all components
    new Navigation();
    new Modals();
    new Careers();
    
    // Initialize basic hero animations
    this.initHeroAnimations();
    
    console.log('BrainGnosis website initialized successfully');
  }

  // Simple hero animations only
  initHeroAnimations() {
    // Basic parallax effect for hero section
    const throttledScrollHandler = this.throttle(() => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.neural-particles');
      
      parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    }, 16); // ~60fps

    window.addEventListener('scroll', throttledScrollHandler);
  }

  // Performance optimization: Throttle function
  throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Initialize the application
new App();
