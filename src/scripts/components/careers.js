/**
 * Careers Component
 * Handles job listing interactions and animations
 */

class Careers {
  constructor() {
    this.init();
  }

  init() {
    this.setupGlobalFunctions();
    this.setupAnimations();
  }

  toggleJobDetails(jobId) {
    const detailsElement = document.getElementById(`job-details-${jobId}`);
    const chevronElement = document.getElementById(`chevron-${jobId}`);
    const chevronMobileElement = document.getElementById(`chevron-${jobId}-mobile`);
    
    if (detailsElement) {
      const isHidden = detailsElement.classList.contains('hidden');
      
      if (isHidden) {
        // Show details
        detailsElement.classList.remove('hidden');
        detailsElement.style.maxHeight = '0px';
        detailsElement.style.opacity = '0';
        
        // Animate in
        requestAnimationFrame(() => {
          detailsElement.style.transition = 'all 0.3s ease-in-out';
          detailsElement.style.maxHeight = detailsElement.scrollHeight + 'px';
          detailsElement.style.opacity = '1';
        });
        
        // Rotate chevrons (both desktop and mobile)
        if (chevronElement) chevronElement.style.transform = 'rotate(180deg)';
        if (chevronMobileElement) chevronMobileElement.style.transform = 'rotate(180deg)';
      } else {
        // Hide details
        detailsElement.style.maxHeight = '0px';
        detailsElement.style.opacity = '0';
        
        // Rotate chevrons back
        if (chevronElement) chevronElement.style.transform = 'rotate(0deg)';
        if (chevronMobileElement) chevronMobileElement.style.transform = 'rotate(0deg)';
        
        // Hide after animation
        setTimeout(() => {
          detailsElement.classList.add('hidden');
        }, 300);
      }
    }
  }

  shareJob(jobId) {
    const jobTitle = this.getJobTitle(jobId);
    const url = `${window.location.origin}${window.location.pathname}#careers`;
    
    if (navigator.share) {
      navigator.share({
        title: `${jobTitle} at BrainGnosis`,
        text: `Check out this opportunity at BrainGnosis: ${jobTitle}`,
        url: url
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url).then(() => {
        this.showToast('Job link copied to clipboard!');
      }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        this.showToast('Job link copied to clipboard!');
      });
    }
  }

  getJobTitle(jobId) {
    const jobTitles = {
      'ui-developer': 'UI Developer',
      'cloud-developer': 'Cloud Developer'
    };
    return jobTitles[jobId] || 'Position';
  }

  showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-neutral-900 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform translate-y-full opacity-0 transition-all duration-300';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.transform = 'translateY(full)';
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  setupAnimations() {
    // Add scroll animations for job cards
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe job cards when they're added to the DOM
    setTimeout(() => {
      const jobCards = document.querySelectorAll('.job-card');
      jobCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
      });
    }, 100);
  }

  setupGlobalFunctions() {
    // Make functions globally available for onclick handlers
    window.toggleJobDetails = (jobId) => this.toggleJobDetails(jobId);
    window.shareJob = (jobId) => this.shareJob(jobId);
  }
}

export default Careers;
