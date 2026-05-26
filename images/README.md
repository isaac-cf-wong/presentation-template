# Images Directory

This directory contains images for your presentation.

## Recommended Formats

- **Photos**: JPG/JPEG (good compression for photos)
- **Graphics/Logos**: PNG (supports transparency)
- **Vector graphics**: SVG (scalable, small file size)
- **Animated**: GIF (for simple animations)

## Recommended Sizes

- **Full slide background**: 1920x1080px or 1280x720px
- **Content images**: Max 800px width for optimal loading
- **Logos**: 200x200px or smaller
- **Icons**: 64x64px or 128x128px

## Sample Files Needed

Add these sample files to demonstrate the template:

- `sample-image.jpg` - A sample photo for demo slides
- `favicon.ico` - Browser tab icon
- `logo.png` - Optional presentation logo

## Usage in Slides

```html
<!-- Standard image -->
<img src="images/sample-image.jpg" alt="Description" />

<!-- Background image -->
<section data-background="images/background.jpg">
  <!-- Logo (positioned with CSS) -->
  <img src="images/logo.png" class="logo" alt="Logo" />
</section>
```

## Optimization Tips

- Compress images before adding to keep repository size small
- Use appropriate formats for content type
- Consider using WebP for better compression (with fallbacks)
- Keep file names descriptive and lowercase with hyphens
