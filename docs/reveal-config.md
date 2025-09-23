# Reveal.js Configuration

This file contains common reveal.js configuration options for easy customization.

## Basic Configuration

```javascript
Reveal.initialize({
  // Display controls in the bottom right corner
  controls: true,

  // Display a presentation progress bar
  progress: true,

  // Display the page number of the current slide
  slideNumber: "c/t", // current/total

  // Add the current slide number to the URL hash
  hash: true,

  // Enable keyboard shortcuts for navigation
  keyboard: true,

  // Enable the slide overview mode
  overview: true,

  // Vertical centering of slides
  center: true,

  // Enables touch navigation on devices with touch input
  touch: true,

  // Turns fragments on and off globally
  fragments: true,

  // Transition style
  transition: "slide", // none/fade/slide/convex/concave/zoom

  // Transition speed
  transitionSpeed: "default", // default/fast/slow

  // Number of slides away from the current that are visible
  viewDistance: 3,
});
```

## Advanced Options

### Auto-Slide

```javascript
// Auto-advance slides
autoSlide: 5000, // 5 seconds
autoSlideStoppable: true,
autoSlideMethod: Reveal.navigateNext
```

### Background Transitions

```javascript
// Transition style for full page slide backgrounds
backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom
```

### Math Support

```javascript
// MathJax configuration
math: {
    mathjax: 'https://cdn.jsdelivr.net/gh/mathjax/mathjax@2.7.8/MathJax.js',
    config: 'TeX-AMS_HTML-full',
    // pass other options into `MathJax.Hub.Config()`
    TeX: { Macros: { RR: "{\\bf R}" } }
}
```

### Plugins

```javascript
plugins: [
  RevealMarkdown, // Markdown support
  RevealHighlight, // Code syntax highlighting
  RevealNotes, // Speaker notes
  RevealMath.KaTeX, // Math equations
  RevealSearch, // Search functionality
  RevealZoom, // Zoom functionality
];
```

## Custom Themes

To create a custom theme:

1. Copy an existing theme from `node_modules/reveal.js/dist/theme/`
2. Modify colors, fonts, and styles
3. Save as `css/theme/custom.css`
4. Update the theme link in `index.html`

## Keyboard Shortcuts

Default shortcuts:

- `←/→` or `Space`: Navigate slides
- `↑/↓`: Navigate vertical slides
- `ESC`: Slide overview
- `S`: Speaker notes
- `F`: Fullscreen
- `B` or `.`: Blackout
- `?`: Help

## Speaker Notes

Add speaker notes to any slide:

```html
<section>
  <h2>Slide Title</h2>
  <p>Slide content</p>
  <aside class="notes">
    These are speaker notes. They're only visible in speaker view. Press 'S' to
    open speaker view.
  </aside>
</section>
```

## PDF Export

To export your presentation as PDF:

1. Add `?print-pdf` to the URL
2. Open print dialog
3. Set destination to "Save as PDF"
4. Set layout to "Landscape"
5. Save

## Performance Tips

- Optimize images (compress, appropriate sizes)
- Keep videos short and compressed
- Use lazy loading for heavy content
- Minimize custom JavaScript
- Test on target devices/browsers
