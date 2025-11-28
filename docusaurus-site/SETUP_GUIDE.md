# 🚀 Docusaurus Educational Platform - Setup & Usage Guide

## 📋 Table of Contents
1. [Initial Setup](#initial-setup)
2. [Project Structure](#project-structure)
3. [Available Components](#available-components)
4. [Creating Content](#creating-content)
5. [AI Prompt Guide](#ai-prompt-guide)
6. [Development](#development)
7. [Deployment](#deployment)

---

## 🎯 Initial Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

The project is already initialized. To start:

```bash
cd docusaurus-site
npm install
npm start
```

This will start a development server at `http://localhost:3000`

---

## 📁 Project Structure

```
docusaurus-site/
├── docs/                          # Markdown files for lectures
│   ├── 01-complexity/
│   │   ├── lecture.md            # Lecture content
│   │   └── exercises.md          # Exercise problems
│   ├── 02-arrays/
│   └── ...
├── src/
│   ├── components/               # React components
│   │   ├── InfoBoxes/           # Info, Warning, Success boxes
│   │   ├── CollapsibleSection/  # Expandable sections
│   │   ├── Comparison/          # Side-by-side comparisons
│   │   ├── Grid/                # Grid layout & cards
│   │   ├── Exercise/            # Exercise cards & progress
│   │   └── LearningObjectives/  # Learning goals component
│   ├── css/
│   │   └── custom.css           # Global custom styles
│   └── pages/                    # Custom pages
├── static/                       # Static assets (images, files)
├── docusaurus.config.ts         # Site configuration
└── sidebars.ts                  # Sidebar structure
```

---

## 🧩 Available Components

### 1. **InfoBox Variants**

```jsx
import InfoBox from '@site/src/components/InfoBoxes/InfoBox';
import WarningBox from '@site/src/components/InfoBoxes/WarningBox';
import SuccessBox from '@site/src/components/InfoBoxes/SuccessBox';
import WhyBox from '@site/src/components/InfoBoxes/WhyBox';

// In markdown:
<InfoBox title="Important Info">
  This is important information about the topic.
</InfoBox>

<WarningBox title="Watch Out!">
  Common mistake to avoid...
</WarningBox>

<SuccessBox title="Best Practice">
  Always do this...
</SuccessBox>

<WhyBox title="Why is this important?">
  Explanation of motivation...
</WhyBox>
```

### 2. **CollapsibleSection**

```jsx
import CollapsibleSection from '@site/src/components/CollapsibleSection';

<CollapsibleSection title="Hint" icon="💡" defaultOpen={false}>
  Think about the edge cases...
</CollapsibleSection>
```

### 3. **ComparisonBox**

```jsx
import ComparisonBox from '@site/src/components/Comparison/ComparisonBox';

<ComparisonBox
  wrong={{
    title: "Wrong Approach",
    content: <pre><code>{`int result = a + b * c;  // Wrong order`}</code></pre>
  }}
  correct={{
    title: "Correct Approach",
    content: <pre><code>{`int result = (a + b) * c;  // Correct`}</code></pre>
  }}
/>
```

### 4. **Grid & Card**

```jsx
import Grid from '@site/src/components/Grid/Grid';
import Card from '@site/src/components/Grid/Card';

<Grid columns={2} gap="medium">
  <Card title="Advantages">
    - Fast insertion
    - Dynamic size
  </Card>
  <Card title="Disadvantages">
    - Slow search
    - Extra memory
  </Card>
</Grid>
```

### 5. **LearningObjectives**

```jsx
import LearningObjectives from '@site/src/components/LearningObjectives';

<LearningObjectives
  objectives={[
    "Understand BST structure and properties",
    "Implement insert, search, and delete operations",
    "Analyze time and space complexity"
  ]}
/>
```

### 6. **ExerciseCard & ProgressTracker**

```jsx
import ExerciseCard from '@site/src/components/Exercise/ExerciseCard';
import ProgressTracker from '@site/src/components/Exercise/ProgressTracker';

// At the top of exercises page
<ProgressTracker
  exercises={['ex1', 'ex2', 'ex3', 'ex4', 'ex5']}
/>

// Individual exercises
<ExerciseCard
  id="ex1"
  difficulty="easy"
  number={1}
  question={<p>What is the time complexity of BST search?</p>}
  answer={<p>O(log n) for balanced trees, O(n) worst case</p>}
/>
```

---

## ✍️ Creating Content

### Lecture Template

Create `docs/09-binary-search-trees/lecture.md`:

```markdown
---
title: "Binary Search Trees"
sidebar_position: 9
tags: [trees, data-structures, algorithms]
---

import InfoBox from '@site/src/components/InfoBoxes/InfoBox';
import WarningBox from '@site/src/components/InfoBoxes/WarningBox';
import LearningObjectives from '@site/src/components/LearningObjectives';
import CollapsibleSection from '@site/src/components/CollapsibleSection';
import ComparisonBox from '@site/src/components/Comparison/ComparisonBox';
import Grid from '@site/src/components/Grid/Grid';
import Card from '@site/src/components/Grid/Card';

# Binary Search Trees

<LearningObjectives
  objectives={[
    "Understand BST structure",
    "Implement core operations",
    "Analyze complexity"
  ]}
/>

## Introduction

<InfoBox title="What is a BST?">
A Binary Search Tree is a node-based binary tree data structure with the property:
- Left child < Parent
- Right child > Parent
</InfoBox>

## Implementation

```cpp
struct Node {
    int data;
    Node* left;
    Node* right;
};
```

<CollapsibleSection title="Hint for Implementation" icon="💡">
Always check for nullptr before accessing node properties!
</CollapsibleSection>

## Comparison

<ComparisonBox
  wrong={{
    title: "Incorrect Insert",
    content: <pre><code>{`void insert(int val) {
  root->data = val;  // Overwrites root!
}`}</code></pre>
  }}
  correct={{
    title: "Correct Insert",
    content: <pre><code>{`void insert(Node*& node, int val) {
  if (!node) {
    node = new Node(val);
    return;
  }
  if (val < node->data)
    insert(node->left, val);
  else
    insert(node->right, val);
}`}</code></pre>
  }}
/>
```

### Exercise Template

Create `docs/09-binary-search-trees/exercises.md`:

```markdown
---
title: "BST Exercises"
sidebar_position: 9.1
---

import ExerciseCard from '@site/src/components/Exercise/ExerciseCard';
import ProgressTracker from '@site/src/components/Exercise/ProgressTracker';

# Binary Search Trees - Exercises

<ProgressTracker
  exercises={['bst-ex1', 'bst-ex2', 'bst-ex3', 'bst-ex4', 'bst-ex5']}
/>

## Easy Exercises

<ExerciseCard
  id="bst-ex1"
  difficulty="easy"
  number={1}
  question={<>
    <p>What property must a Binary Search Tree satisfy?</p>
  </>}
  answer={<>
    <p><strong>Answer:</strong> For every node:</p>
    <ul>
      <li>All values in left subtree &lt; node value</li>
      <li>All values in right subtree &gt; node value</li>
    </ul>
  </>}
/>

## Medium Exercises

<ExerciseCard
  id="bst-ex2"
  difficulty="medium"
  number={2}
  question={<>
    <p>Implement a function to find the minimum value in a BST.</p>
  </>}
  answer={<>
    <p><strong>Answer:</strong></p>
    <pre><code>{`int findMin(Node* root) {
  while (root->left != nullptr) {
    root = root->left;
  }
  return root->data;
}`}</code></pre>
    <p>Time Complexity: O(h) where h is height</p>
  </>}
/>
```

---

## 🤖 AI Prompt Guide

### Prompt for AI to Generate Lecture

```
Create a Docusaurus markdown lecture about [TOPIC].

Requirements:
1. Use frontmatter with title, sidebar_position, and tags
2. Import necessary components at the top
3. Start with LearningObjectives component (3-5 objectives)
4. Use InfoBox for important concepts
5. Use WarningBox for common mistakes
6. Use CollapsibleSection for hints or optional content
7. Use ComparisonBox to show correct vs incorrect approaches
8. Include code blocks with proper syntax highlighting (cpp, python, etc.)
9. Use Grid and Card for organizing related information
10. Write in Bulgarian language

Structure:
- Introduction (with motivation)
- Theoretical concepts (with examples)
- Implementation details
- Common pitfalls
- Best practices
- Summary

Example components to use:
- <InfoBox title="...">content</InfoBox>
- <Warning Box title="...">content</WarningBox>
- <CollapsibleSection title="..." icon="💡">content</CollapsibleSection>
- <ComparisonBox wrong={{...}} correct={{...}} />
- <Grid columns={2}><Card>...</Card></Grid>
```

### Prompt for AI to Generate Exercises

```
Create Docusaurus markdown exercises for [TOPIC].

Requirements:
1. Use frontmatter with title and sidebar_position
2. Import ExerciseCard and ProgressTracker
3. Add ProgressTracker at top with all exercise IDs
4. Create 8-10 exercises with mix of difficulties (easy/medium/hard)
5. Each exercise should have:
   - Unique ID (e.g., "topic-ex1")
   - Difficulty level
   - Clear question
   - Detailed answer with explanation
6. Write in Bulgarian language

Structure:
- ProgressTracker component
- Easy exercises section (3-4 exercises)
- Medium exercises section (3-4 exercises)
- Hard exercises section (2-3 exercises)

Example:
<ExerciseCard
  id="unique-id"
  difficulty="easy|medium|hard"
  number={1}
  question={<p>Question text here</p>}
  answer={<p>Answer with code examples if needed</p>}
/>
```

---

## 💻 Development

### Running Development Server

```bash
npm start
```

### Building for Production

```bash
npm run build
```

### Testing Build Locally

```bash
npm run serve
```

### Adding New Component

1. Create component in `src/components/ComponentName/`
2. Create `index.tsx` and `styles.module.css`
3. Export from `index.tsx`
4. Import in markdown files

---

## 🚀 Deployment

### GitHub Pages

1. Update `docusaurus.config.ts`:
```ts
url: 'https://yourusername.github.io',
baseUrl: '/your-repo-name/',
organizationName: 'yourusername',
projectName: 'your-repo-name',
```

2. Deploy:
```bash
GIT_USER=yourusername npm run deploy
```

### Other Platforms

- **Netlify**: Connect GitHub repo, build command: `npm run build`, publish directory: `build`
- **Vercel**: Import project, framework preset: Docusaurus
- **Static hosting**: Upload contents of `build/` directory

---

## 🎨 Customization

### Theme Colors

Edit `src/css/custom.css`:

```css
:root {
  --ifm-color-primary: #2196F3;
  --ifm-color-primary-dark: #1976D2;
  /* ... */
}
```

### Adding Fonts

Edit `docusaurus.config.ts` to add Google Fonts or local fonts.

### Custom Components

Create new components in `src/components/` following the existing pattern.

---

## 📚 Resources

- [Docusaurus Documentation](https://docusaurus.io/)
- [MDX Documentation](https://mdxjs.com/)
- [React Documentation](https://react.dev/)

---

## ✅ Checklist for New Topic

- [ ] Create folder in `docs/`
- [ ] Create `lecture.md` with proper frontmatter
- [ ] Create `exercises.md` with ProgressTracker
- [ ] Add imports for all needed components
- [ ] Write LearningObjectives
- [ ] Add code examples with syntax highlighting
- [ ] Use appropriate InfoBoxes
- [ ] Create 8-10 exercises with mixed difficulty
- [ ] Test locally with `npm start`
- [ ] Check responsive design on mobile
- [ ] Verify all links work
- [ ] Build and deploy

---

**Happy Teaching! 🎓**
