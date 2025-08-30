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
    
    console.log('BrainGnosis website initialized successfully');
  }
}

// Initialize the application
new App();
