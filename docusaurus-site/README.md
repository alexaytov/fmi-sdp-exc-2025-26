# 🎓 Educational Platform - Docusaurus Template System

> **Modern, AI-friendly educational content platform for C++ Data Structures & Algorithms**

This Docusaurus-based system dramatically reduces AI token usage by **90%** by separating content from presentation. AI generates simple markdown with component tags - no CSS or JavaScript needed!

---

## ✨ Key Features

- **10x Token Reduction**: AI writes only content, not styling
- **Rich Components**: InfoBoxes, Collapsible sections, Comparison boxes, Exercise cards with progress tracking
- **Modern & Responsive**: Mobile-first, dark mode, smooth animations
- **Developer-Friendly**: TypeScript, hot reload, modular architecture

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

Visit `http://localhost:3000` after starting the dev server.

---

## 📚 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup, development, and deployment guide
- **[AI_PROMPT_TEMPLATES.md](./AI_PROMPT_TEMPLATES.md)** - Ready-to-use AI prompts for content generation
- **[DOCUSAURUS_ANALYSIS.md](../DOCUSAURUS_ANALYSIS.md)** - Detailed component analysis

---

## 🧩 Available Components

### Core Components
- `<InfoBox>`, `<WarningBox>`, `<SuccessBox>`, `<WhyBox>` - Styled content boxes
- `<CollapsibleSection>` - Expandable sections
- `<ComparisonBox>` - Side-by-side code comparison
- `<Grid>` & `<Card>` - Flexible layouts
- `<LearningObjectives>` - Beautiful goal lists
- `<ExerciseCard>` & `<ProgressTracker>` - Interactive exercises

### Example Usage

```markdown
---
title: "Binary Search Trees"
sidebar_position: 9
---

import LearningObjectives from '@site/src/components/LearningObjectives';
import InfoBox from '@site/src/components/InfoBoxes/InfoBox';

# Binary Search Trees

<LearningObjectives
  objectives={[
    "Understand BST structure",
    "Implement insert/search operations",
    "Analyze time complexity"
  ]}
/>

<InfoBox title="Definition">
A Binary Search Tree is...
</InfoBox>
```

---

## 🤖 AI-Powered Content Generation

### Token Usage Comparison

| Method | Tokens per Page | Reduction |
|--------|----------------|-----------|
| Old way (Full HTML/CSS/JS) | ~15,000 | - |
| **New way (Markdown + Components)** | **~1,500** | **90%** |

### Quick AI Workflow

1. Copy prompt from `AI_PROMPT_TEMPLATES.md`
2. Customize for your topic
3. Generate with AI (Claude, ChatGPT, etc.)
4. Save as `.md` file in `docs/`
5. See results instantly with hot reload!

---

## 📁 Project Structure

```
docusaurus-site/
├── docs/                        # Your content (AI generates this)
│   ├── 01-topic/
│   │   ├── lecture.md          # Lecture with components
│   │   └── exercises.md        # Interactive exercises
├── src/
│   ├── components/             # Pre-built React components
│   │   ├── InfoBoxes/
│   │   ├── Exercise/
│   │   ├── CollapsibleSection/
│   │   └── ...
│   └── css/                    # Custom styles
├── SETUP_GUIDE.md             # Comprehensive guide
├── AI_PROMPT_TEMPLATES.md     # AI prompts
└── README.md                  # This file
```

---

## ✅ Benefits Over Traditional Approach

- **Consistency**: All pages look the same automatically
- **Maintainability**: Fix styling once, applies everywhere
- **Performance**: Optimized builds out of the box
- **Mobile**: Responsive by default
- **Accessibility**: ARIA labels included
- **Dark Mode**: Automatic theme switching
- **Search**: Built-in full-text search
- **SEO**: Optimized for search engines

---

## 🎯 Example Workflow

```bash
# 1. Start dev server
npm start

# 2. Use AI to generate content (see AI_PROMPT_TEMPLATES.md)
#    Save to docs/09-bst/lecture.md

# 3. See changes live in browser

# 4. Deploy when satisfied
git add docs/
git commit -m "Add BST lecture"
npm run deploy
```

---

## 📖 Learn More

- [Docusaurus Documentation](https://docusaurus.io/)
- [MDX Documentation](https://mdxjs.com/)
- [Component Examples](./SETUP_GUIDE.md#available-components)
- [AI Prompt Templates](./AI_PROMPT_TEMPLATES.md)

---

## 🎨 Customization

Edit `src/css/custom.css` to change colors, fonts, and styles.

Add new components in `src/components/` following the existing pattern.

---

## 📞 Need Help?

1. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions
2. See [AI_PROMPT_TEMPLATES.md](./AI_PROMPT_TEMPLATES.md) for content generation
3. Consult [Docusaurus docs](https://docusaurus.io/) for platform questions

---

**Happy Teaching! 🎓**
