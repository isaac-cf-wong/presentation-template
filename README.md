# Presentation Template 🎯

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Reveal.js](https://img.shields.io/badge/reveal.js-5.x-orange.svg)](https://revealjs.com/)
[![CI](https://github.com/isaac-cf-wong/presentation-template/actions/workflows/ci.yml/badge.svg)](https://github.com/isaac-cf-wong/presentation-template/actions/workflows/ci.yml)
[![Publish](https://github.com/isaac-cf-wong/presentation-template/actions/workflows/publish.yml/badge.svg)](https://isaac-cf-wong.github.io/presentation-template/)
[![pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit)](https://github.com/pre-commit/pre-commit)
[![cspell](https://img.shields.io/badge/cspell-checked-brightgreen)](https://cspell.org/)

> **⚠️ Experimental Template Disclaimer**
>
> This presentation template is currently in **experimental stage** and is built with GitHub Copilot assistance.
> While functional, it has not been fully tested in all environments and scenarios. Use at your own discretion for production presentations.
> Feedback and contributions are welcome to help improve stability and features.

A modern, responsive presentation template built with [reveal.js](https://revealjs.com/) that helps you create stunning HTML presentations with ease.

## ✨ Features

- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Beautiful Themes** - Multiple built-in themes and easy customization
- 🔄 **Smooth Transitions** - Elegant slide transitions and animations
- 📝 **Markdown Support** - Write slides in Markdown for faster content creation
- 🖼️ **Media Rich** - Support for images, videos, code syntax highlighting
- 📊 **Interactive Elements** - Charts, diagrams, and interactive content
- 🎤 **Speaker Notes** - Built-in speaker notes for presentations
- 📤 **Export Options** - Export to PDF or host anywhere
- 🔧 **Plugin System** - Extensible with reveal.js plugins

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Create Your Presentation

1. **Use this template:**

   - Click the "Use this template" button on GitHub
   - Create a new repository from this template
   - Clone your new repository:

   ```console
   git clone https://github.com/YOUR-USERNAME/YOUR-PRESENTATION-NAME.git
   cd YOUR-PRESENTATION-NAME
   ```

2. **Install dependencies:**

   ```console
   npm install
   ```

3. **Start the development server:**

   ```console
   npm start
   ```

   This will start a development server with live reload at `http://localhost:8000`

4. **Build for production:**

   ```console
   npm run build
   ```

   This creates an optimized version in the `dist/` folder ready for deployment.

5. **Run tests:**

   ```console
   npm test
   ```

## 📁 Project Structure

```console
presentation-template/
├── index.html              # Main presentation file
├── css/
│   ├── theme/              # Custom themes
│   └── reveal.css          # Core reveal.js styles
├── js/
│   ├── reveal.js           # Reveal.js library
│   └── plugins/            # Reveal.js plugins
├── images/                 # Presentation images
├── slides/                 # Individual slide files (optional)
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🎨 Customization

### Themes

Available built-in themes: `black` (default), `white`, `league`, `beige`, `sky`, `night`, `serif`, `simple`, `solarized`

To change the theme, modify the CSS import in `index.html`:

```html
<link rel="stylesheet" href="css/theme/black.css" />
```

### Custom Styling

1. Create a new CSS file in `css/theme/`
2. Import it in your `index.html`
3. Override reveal.js variables and styles as needed

## 📝 Creating Slides

Reveal.js supports multiple ways to create slides including HTML sections, Markdown, and external slide files.

For detailed examples and syntax, see the [reveal.js documentation](https://revealjs.com/).

## 🎮 Controls

- **Navigation**: Arrow keys, space bar, or on-screen controls
- **Fullscreen**: Press `F` to toggle fullscreen mode
- **Speaker View**: Press `S` to open speaker notes view
- **Overview**: Press `ESC` to see slide overview
- **Pause**: Press `B` or `.` to pause/blackout
- **Help**: Press `?` to see all keyboard shortcuts

## 📤 Export & Deployment

### Export to PDF

1. Add `?print-pdf` to your presentation URL
2. Open the print dialog (`Ctrl+P`/`Cmd+P`)
3. Select "Save as PDF"

### Deploy to GitHub Pages

1. Push your presentation to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main` or `master`)
4. Your presentation will be available at `https://username.github.io/repository-name`

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build command to `npm run build` (if using build process)
3. Set publish directory to root or build output
4. Deploy automatically on every push

## 🧪 Testing

This template includes comprehensive testing infrastructure to ensure quality and performance:

### Available Tests

- **Unit Tests**: JavaScript functionality validation with Jest
- **Integration Tests**: Presentation structure and accessibility testing
- **Performance Tests**: Lighthouse CI for performance, accessibility, and SEO validation
- **Pre-commit Hooks**: Code quality enforcement (spelling, formatting, linting)

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Generate test coverage report
npm run test:coverage

# Run Lighthouse performance audit
npm run lighthouse

# Run pre-commit hooks manually
npm run precommit
```

### Continuous Integration

The repository includes GitHub Actions workflows that automatically:

- ✅ **Test** presentation structure and functionality
- ✅ **Validate** HTML, CSS, and JavaScript quality
- ✅ **Check** accessibility compliance (WCAG 2.1)
- ✅ **Audit** performance metrics with Lighthouse
- ✅ **Verify** cross-browser compatibility

### Test Configuration

- **Jest Config**: `jest.config.js` - Unit testing configuration
- **Lighthouse Config**: `lighthouserc.js` - Performance testing thresholds
- **Pre-commit Config**: `.pre-commit-config.yaml` - Code quality hooks

### Quality Standards

The testing suite enforces:

- **Performance**: 80%+ Lighthouse score
- **Accessibility**: 90%+ compliance (strict WCAG standards)
- **Best Practices**: 80%+ score for modern web standards
- **SEO**: 80%+ search engine optimization
- **Code Coverage**: 70%+ test coverage threshold

## ⚡ Build System

This template uses **Gulp** as the build system while maintaining familiar npm script interfaces:

### Available Commands

```bash
# Development
npm start          # Start development server with live reload
npm run dev        # Same as npm start

# Production
npm run build      # Build optimized files to dist/
npm run serve:dist # Serve the built version

# Testing & Quality
npm test           # Run all tests
npm run test:watch # Run tests in watch mode
npm run lint       # Run linting checks
```

### Build Process

The build system:

- 🧹 **Cleans** the `dist/` directory
- 📁 **Copies** all presentation files (HTML, CSS, JS, images)
- 📦 **Bundles** reveal.js dependencies
- ✅ **Optimizes** for production deployment

### Under the Hood

- **Gulp 5.x** - Modern build system with ES6+ support
- **gulp-connect** - Development server with live reload
- **Jest** - JavaScript testing framework
- **Lighthouse CI** - Performance and accessibility auditing

## 🔧 Configuration

Reveal.js can be configured by modifying the initialization options in `index.html`. Key options include:

```javascript
Reveal.initialize({
  controls: true, // Display controls
  progress: true, // Show progress bar
  center: true, // Vertical centering
  transition: "slide", // Transition style (none/fade/slide/convex/concave/zoom)
  transitionSpeed: "default", // Transition speed (default/fast/slow)
  hash: true, // Add slide number to URL
  // ... other options
});
```

For complete configuration options, see the [reveal.js documentation](https://revealjs.com/config/).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [reveal.js](https://revealjs.com/) - The amazing presentation framework
- [Hakim El Hattab](https://github.com/hakimel) - Creator of reveal.js
- All the contributors who have helped improve this template

## 📧 Support

If you have any questions or need help:

- 📖 Check the [reveal.js documentation](https://revealjs.com/)
- 🐛 [Report issues](https://github.com/isaac-cf-wong/presentation-template/issues)
- 💬 [Start a discussion](https://github.com/isaac-cf-wong/presentation-template/discussions)

---

⭐ **If you found this template helpful, please give it a star!** ⭐
