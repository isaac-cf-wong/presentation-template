# Videos Directory

This directory contains video files for your presentation.

## Recommended Formats

- **MP4**: Best compatibility across browsers and devices
- **WebM**: Good compression, modern browsers
- **OGV**: Open source alternative

## Recommended Settings

- **Resolution**: 1280x720 (720p) or 1920x1080 (1080p)
- **Frame rate**: 30fps for presentations
- **Bitrate**: 2-5 Mbps for good quality/size balance
- **Duration**: Keep videos short (30-60 seconds) for presentations

## Usage in Slides

```html
<!-- Basic video -->
<video controls>
  <source src="videos/sample-video.mp4" type="video/mp4" />
  <source src="videos/sample-video.webm" type="video/webm" />
  Your browser does not support the video tag.
</video>

<!-- Auto-play video (muted for browser policies) -->
<video autoplay muted loop>
  <source src="videos/background-video.mp4" type="video/mp4" />
</video>

<!-- Video as slide background -->
<section
  data-background-video="videos/background-video.mp4"
  data-background-video-loop
  data-background-video-muted
>
  <h2>Content over video</h2>
</section>
```

## Sample Files Needed

For a complete template demonstration:

- `sample-video.mp4` - A short demo video

## Optimization Tips

- Keep file sizes reasonable (under 10MB for web presentations)
- Use video compression tools to reduce file size
- Consider hosting large videos externally (YouTube, Vimeo) and embedding
- Provide multiple formats for better browser compatibility
- Always include fallback content for accessibility

## External Video Embedding

```html
<!-- YouTube embed -->
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  frameborder="0"
  allowfullscreen
>
</iframe>

<!-- Vimeo embed -->
<iframe
  src="https://player.vimeo.com/video/VIDEO_ID"
  width="560"
  height="315"
  frameborder="0"
  allowfullscreen
>
</iframe>
```
