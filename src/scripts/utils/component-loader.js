/**
 * Component Loader Utility
 * Loads HTML components dynamically
 */

class ComponentLoader {
  static async loadComponent(elementId, componentPath) {
    try {
      const response = await fetch(componentPath);
      if (!response.ok) {
        throw new Error(`Failed to load component: ${componentPath}`);
      }
      
      const html = await response.text();
      const element = document.getElementById(elementId);
      
      if (element) {
        element.innerHTML = html;
      } else {
        console.warn(`Element with ID '${elementId}' not found`);
      }
    } catch (error) {
      console.error('Error loading component:', error);
    }
  }

  static async loadMultipleComponents(components) {
    const promises = components.map(({ elementId, componentPath }) => 
      this.loadComponent(elementId, componentPath)
    );
    
    await Promise.all(promises);
  }
}

export default ComponentLoader;
