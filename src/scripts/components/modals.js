/**
 * Modal Component
 * Handles modal functionality for research paper abstracts
 */

class Modals {
  constructor() {
    this.abstractModal = document.getElementById('abstractModal');
    this.abstractModal2 = document.getElementById('abstractModal2');
    
    this.init();
  }

  init() {
    this.setupModalClosing();
    this.setupGlobalFunctions();
  }

  setupModalClosing() {
    // Close modals when clicking outside
    if (this.abstractModal) {
      this.abstractModal.addEventListener('click', (e) => {
        if (e.target === this.abstractModal) {
          this.toggleAbstract();
        }
      });
    }

    if (this.abstractModal2) {
      this.abstractModal2.addEventListener('click', (e) => {
        if (e.target === this.abstractModal2) {
          this.toggleAbstract2();
        }
      });
    }
  }

  toggleAbstract() {
    if (this.abstractModal) {
      this.abstractModal.classList.toggle('active');
    }
  }

  toggleAbstract2() {
    if (this.abstractModal2) {
      this.abstractModal2.classList.toggle('active');
    }
  }

  setupGlobalFunctions() {
    // Make functions globally available for onclick handlers
    window.toggleAbstract = () => this.toggleAbstract();
    window.toggleAbstract2 = () => this.toggleAbstract2();
  }
}

export default Modals;
