# BrainGnosis Website

A modern, modular website for BrainGnosis - Enterprise AI Agent Platform.

## 🚀 Features

- **Modular Architecture**: Components separated for better maintainability
- **Modern CSS**: Organized stylesheets with CSS custom properties
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component-Based**: Reusable HTML components
- **Performance Optimized**: Efficient loading and caching strategies

## 📁 Project Structure

```
BrainGnosis/
├── src/
│   ├── styles/
│   │   ├── main.css              # Main stylesheet (imports all others)
│   │   ├── variables.css         # CSS custom properties
│   │   ├── base.css             # Base styles and typography
│   │   ├── layout.css           # Layout system (grid, containers)
│   │   ├── utilities.css        # Utility classes
│   │   └── components/          # Component-specific styles
│   │       ├── buttons.css
│   │       ├── cards.css
│   │       ├── header.css
│   │       └── modals.css
│   ├── scripts/
│   │   ├── main.js              # Main JavaScript entry point
│   │   ├── components/          # Component JavaScript
│   │   │   ├── navigation.js
│   │   │   └── modals.js
│   │   └── utils/               # Utility functions
│   │       └── component-loader.js
│   ├── components/
│   │   ├── header.html          # Header component
│   │   ├── sections/            # Page sections
│   │   │   ├── hero.html
│   │   │   ├── about.html
│   │   │   ├── capabilities.html
│   │   │   ├── all-sections.html
│   │   │   └── footer.html
│   │   └── modals/              # Modal components
│   │       └── research-modals.html
│   └── assets/
│       ├── images/              # All images organized by type
│       │   ├── company_logos/
│       │   ├── client_logos/
│       │   ├── demo_images/
│       │   └── web_icons/
│       └── Research/            # Research documents
├── index-new.html               # New modular main HTML file
├── index.html                   # Original monolithic file (backup)
├── package.json                 # Project configuration
└── README.md                    # This file
```

## 🛠️ Development

### Local Development

1. **Start a local server:**
   ```bash
   npm run dev
   # or
   python -m http.server 8000
   ```

2. **Open in browser:**
   ```
   http://localhost:8000/index-new.html
   ```

### Making Changes

- **Styles**: Edit files in `src/styles/`
- **JavaScript**: Edit files in `src/scripts/`
- **Components**: Edit HTML files in `src/components/`
- **Assets**: Add images to appropriate folders in `src/assets/`

## 🎨 CSS Architecture

The CSS follows a modular approach:

1. **Variables** (`variables.css`): All design tokens (colors, shadows, etc.)
2. **Base** (`base.css`): Reset, typography, and base element styles
3. **Layout** (`layout.css`): Grid systems, containers, and layout utilities
4. **Components** (`components/`): Specific component styles
5. **Utilities** (`utilities.css`): Helper classes and utilities

## 🧩 Component System

Components are loaded dynamically using the component loader system:

- Each section is a separate HTML file
- Components can be reused across pages
- Easy to maintain and update individual sections
- Better collaboration between team members

## 📱 Responsive Design

The website uses a mobile-first approach with:

- Fluid typography using `clamp()`
- Responsive grid systems
- Flexible layouts that adapt to all screen sizes
- Touch-friendly interactive elements

## 🚀 Performance

- **Modular Loading**: Components loaded as needed
- **Optimized Assets**: Images organized and optimized
- **Efficient CSS**: Minimal, well-organized stylesheets
- **Modern JavaScript**: ES6 modules for better performance

## 🔧 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## 📝 License

MIT License - see LICENSE file for details.

---

**BrainGnosis Inc.** - Making AI Smarter for Humans
