const path = require('path');
const fs = require('fs-extra');
const matter = require('gray-matter');

/**
 * Reveal.js Slides Plugin for Docusaurus
 *
 * This plugin scans for slides.md files in the docs directory,
 * converts them to standalone reveal.js HTML presentations,
 * and makes slides data available globally for navigation components.
 *
 * Also exports a function to generate navbar items automatically.
 */

/**
 * Synchronously scan for slides.md files and return metadata
 * Used by docusaurus.config.ts to generate navbar items
 */
function getSlidesForNavbar(docsPath) {
  const slides = [];

  if (!fs.existsSync(docsPath)) {
    return slides;
  }

  const entries = fs.readdirSync(docsPath, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const match = entry.name.match(/^(\d+)-(.+)$/);
    if (!match) continue;

    const lectureNumber = parseInt(match[1], 10);
    const lectureSlug = match[2];
    const slidePath = path.join(docsPath, entry.name, 'slides.md');

    if (!fs.existsSync(slidePath)) continue;

    try {
      const fileContent = fs.readFileSync(slidePath, 'utf8');
      const { data: frontmatter } = matter(fileContent);

      slides.push({
        lectureNumber,
        lectureSlug,
        lectureTitle: frontmatter.title || 'Untitled Lecture',
      });
    } catch (error) {
      console.error(`Error reading slides for ${entry.name}:`, error.message);
    }
  }

  return slides.sort((a, b) => a.lectureNumber - b.lectureNumber);
}

module.exports = function revealSlidesPlugin(context, options) {
  return {
    name: 'reveal-slides-plugin',

    /**
     * Scan docs directory for slides.md files and extract metadata
     */
    async loadContent() {
      const docsDir = path.join(context.siteDir, 'docs');
      const slides = [];

      // Check if docs directory exists
      if (!fs.existsSync(docsDir)) {
        console.warn('[reveal-slides-plugin] docs/ directory not found');
        return { slides };
      }

      // Scan for XX-topic-name directories
      const entries = fs.readdirSync(docsDir, { withFileTypes: true });

      for (const entry of entries) {
        if (!entry.isDirectory()) continue;

        // Match directories like 01-topic, 02-another-topic, etc.
        const match = entry.name.match(/^(\d+)-(.+)$/);
        if (!match) continue;

        const lectureNumber = parseInt(match[1], 10);
        const lectureSlug = match[2];
        const slidePath = path.join(docsDir, entry.name, 'slides.md');

        // Check if slides.md exists
        if (!fs.existsSync(slidePath)) continue;

        try {
          // Parse frontmatter and content
          const fileContent = fs.readFileSync(slidePath, 'utf8');
          const { data: frontmatter, content: markdown } = matter(fileContent);

          slides.push({
            lectureNumber,
            lectureSlug,
            lectureTitle: frontmatter.title || 'Untitled Lecture',
            theme: frontmatter.theme || 'white',
            highlightTheme: frontmatter.highlightTheme || 'github',
            transition: frontmatter.transition || 'slide',
            controls: frontmatter.controls !== false,
            progress: frontmatter.progress !== false,
            slideNumber: frontmatter.slideNumber !== false,
            slidePath,
            markdown,
            frontmatter
          });

          console.log(`✓ Found slides: ${entry.name}`);
        } catch (error) {
          console.error(`✗ Error processing slides in ${entry.name}:`, error.message);
        }
      }

      // Sort by lecture number
      slides.sort((a, b) => a.lectureNumber - b.lectureNumber);

      console.log(`[reveal-slides-plugin] Found ${slides.length} slide deck(s)`);

      return { slides };
    },

    /**
     * Make slides data available globally and generate HTML files
     *
     * Generates reveal.js HTML files in static folder.
     * No Docusaurus routes - slides are pure static files.
     */
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData(content);

      // Generate slides in static folder so Docusaurus copies them
      const staticSlidesDir = path.join(context.siteDir, 'static', 'slides');
      fs.ensureDirSync(staticSlidesDir);

      console.log('[reveal-slides-plugin] Generating reveal.js presentations...');

      for (const slide of content.slides) {
        try {
          const html = generateRevealHTML(slide, context.siteConfig.baseUrl);

          // Create a directory for each slide with index.html
          const slideDir = path.join(staticSlidesDir, slide.lectureSlug);
          fs.ensureDirSync(slideDir);

          const outputPath = path.join(slideDir, 'index.html');
          fs.writeFileSync(outputPath, html);
          console.log(`✓ Generated: /slides/${slide.lectureSlug}/`);
        } catch (error) {
          console.error(`✗ Failed to generate slides for ${slide.lectureSlug}:`, error.message);
        }
      }

      console.log(`[reveal-slides-plugin] Generated ${content.slides.length} presentation(s)`);
    },

    /**
     * Watch slides.md files for hot reload in dev mode
     */
    getPathsToWatch() {
      return [path.join(context.siteDir, 'docs', '**', 'slides.md')];
    },
  };
};

/**
 * Generate standalone reveal.js HTML from slide data
 */
function generateRevealHTML(slide, baseUrl) {
  // Process markdown to handle reveal.js delimiters
  const processedMarkdown = processSlideMarkdown(slide.markdown);

  return `<!DOCTYPE html>
<html lang="bg">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${slide.lectureTitle} - FMI SDP</title>

    <!-- Reveal.js Core -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.4/dist/reveal.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.4/dist/theme/${slide.theme}.css">

    <!-- Code Highlighting - using highlight.js directly -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${slide.highlightTheme}.min.css">

    <!-- Custom FMI Styles -->
    <style>
        .reveal .slides {
            text-align: left;
        }
        .reveal h1 {
            font-size: 2.2em;
            text-transform: none;
        }
        .reveal h2 {
            font-size: 1.8em;
            text-transform: none;
        }
        .reveal h3 {
            font-size: 1.4em;
            text-transform: none;
        }
        .reveal p, .reveal li {
            font-size: 0.85em;
            line-height: 1.4;
        }
        .reveal pre code {
            max-height: 500px;
            font-size: 0.75em;
        }
        .reveal code {
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.9em;
        }
        .reveal {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            font-size: 32px;
        }
        .reveal ul, .reveal ol {
            margin-left: 1em;
        }
        .reveal li {
            margin-bottom: 0.4em;
        }
        .reveal table {
            font-size: 0.8em;
        }
        .reveal img {
            max-width: 70%;
            max-height: 400px;
            margin: 0.5em auto;
            display: block;
            object-fit: contain;
        }
        /* Two-column layout */
        .reveal .columns {
            display: flex;
            gap: 2em;
            align-items: center;
        }
        .reveal .column {
            flex: 1;
        }
        .reveal .column img {
            max-width: 100%;
            max-height: 450px;
            margin: 0;
        }
        .reveal .column.left {
            text-align: left;
        }
        .reveal .column.right {
            text-align: center;
        }
        /* Back to lecture button */
        .back-button {
            position: fixed;
            bottom: 10px;
            left: 10px;
            z-index: 100;
            font-size: 14px;
            color: #666;
            text-decoration: none;
            background: rgba(255,255,255,0.9);
            padding: 5px 10px;
            border-radius: 5px;
            border: 1px solid #ddd;
            transition: all 0.2s;
        }
        .back-button:hover {
            background: rgba(255,255,255,1);
            color: #333;
            border-color: #999;
        }
    </style>
</head>
<body>
    <div class="reveal">
        <div class="slides">
            ${processedMarkdown}
        </div>
    </div>

    <!-- Navigation Helper -->
    <a href="${baseUrl}docs/${slide.lectureSlug}/lecture" class="back-button">
        ← Back to Lecture
    </a>

    <!-- Reveal.js Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@5.0.4/dist/reveal.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@5.0.4/plugin/notes/notes.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@5.0.4/plugin/markdown/markdown.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@5.0.4/plugin/highlight/highlight.js"></script>

    <!-- marked library required by reveal.js markdown plugin -->
    <script src="https://cdn.jsdelivr.net/npm/marked@11.1.0/marked.min.js"></script>

    <script>
        Reveal.initialize({
            hash: true,
            history: true,
            slideNumber: ${slide.slideNumber ? "'c/t'" : "false"},
            showSlideNumber: 'all',
            transition: '${slide.transition}',
            controls: ${slide.controls},
            progress: ${slide.progress},
            center: true,
            width: 1280,
            height: 720,
            margin: 0.04,
            plugins: [ RevealMarkdown, RevealHighlight, RevealNotes ],
            markdown: {
                smartypants: false,
                gfm: true,
                breaks: false,
                pedantic: false,
                sanitize: false,
                smartLists: true
            },
            highlight: {
                highlightOnLoad: true,
                escapeHTML: false
            }
        });
    </script>
</body>
</html>`;
}

/**
 * Process slide markdown to convert to reveal.js format
 * Handles horizontal (---) and vertical (--) slide delimiters
 */
function processSlideMarkdown(markdown) {
  // Split by horizontal slides (---)
  const horizontalSlides = markdown.split(/\n---\n/);

  let html = '';

  for (const horizontalSlide of horizontalSlides) {
    if (!horizontalSlide.trim()) continue;

    // Check if this horizontal slide has vertical slides (--)
    const verticalSlides = horizontalSlide.split(/\n--\n/);

    if (verticalSlides.length > 1) {
      // Has vertical slides - wrap in section
      html += '<section>\n';
      for (const verticalSlide of verticalSlides) {
        if (!verticalSlide.trim()) continue;
        html += generateSlideSection(verticalSlide);
      }
      html += '</section>\n';
    } else {
      // Single slide
      html += generateSlideSection(horizontalSlide);
    }
  }

  return html;
}

/**
 * Generate a single <section> tag with markdown content
 * Uses data-markdown to let reveal.js handle the conversion (simpler and works!)
 */
function generateSlideSection(slideContent) {
  const trimmed = slideContent.trim();
  if (!trimmed) return '';

  // Check for slide attributes (e.g., <!-- .slide: data-background="#fff" -->)
  const attributeMatch = trimmed.match(/^<!--\s*\.slide:\s*(.+?)\s*-->/);
  let attributes = '';
  let content = trimmed;

  if (attributeMatch) {
    attributes = ' ' + attributeMatch[1];
    content = trimmed.substring(attributeMatch[0].length).trim();
  }

  // Escape any existing </script> tags in the markdown content
  const escapedContent = content.replace(/<\/script>/gi, '<\\/script>');

  // Let reveal.js handle all markdown processing with data-markdown
  return `<section${attributes} data-markdown>
<script type="text/template">
${escapedContent}
</script>
</section>\n`;
}

// Export helper function for use in docusaurus.config.ts
module.exports.getSlidesForNavbar = getSlidesForNavbar;
