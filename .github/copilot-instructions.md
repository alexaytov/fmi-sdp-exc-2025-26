# GitHub Copilot Instructions - FMI SDP Course

## Project Context

This is a Data Structures and Algorithms course repository using Docusaurus for lecture materials.

**Live Site**: https://alexaytov.github.io/fmi-sdp-exc-2025-26/

## Project Structure

```
docusaurus-site/
├── docs/                     # Lecture materials
│   ├── XX-topic-name/
│   │   ├── _category_.json
│   │   ├── lecture.md
│   │   └── exercises.md
├── src/components/          # React components
└── docusaurus.config.ts    # Configuration
```

## Creating New Lectures

### Directory Naming
- Format: `XX-topic-name` (e.g., `11-hash-tables`)
- Use lowercase with hyphens

### Required Files

1. **_category_.json**
```json
{
  "label": "XX. Lecture Title",
  "position": XX,
  "collapsed": false,
  "link": {
    "type": "generated-index",
    "description": "Brief description"
  }
}
```

2. **lecture.md** - Main lecture content
3. **exercises.md** - Practice exercises

### Frontmatter Template

**lecture.md**:
```yaml
---
title: "Лекция"
sidebar_position: 1
slug: lecture
tags: [topic, data-structures, cpp, algorithms]
---
```

**exercises.md**:
```yaml
---
title: "Упражнения"
sidebar_position: 2
slug: exercises
tags: [exercises, practice, topic]
---
```

### Available React Components

Always import at the top of markdown files:

```jsx
import InfoBox from '@site/src/components/InfoBoxes/InfoBox';
import WarningBox from '@site/src/components/InfoBoxes/WarningBox';
import SuccessBox from '@site/src/components/InfoBoxes/SuccessBox';
import WhyBox from '@site/src/components/InfoBoxes/WhyBox';
import LearningObjectives from '@site/src/components/LearningObjectives';
import CollapsibleSection from '@site/src/components/CollapsibleSection';
import ComparisonBox from '@site/src/components/Comparison/ComparisonBox';
import Grid from '@site/src/components/Grid/Grid';
import Card from '@site/src/components/Grid/Card';
import ExerciseCard from '@site/src/components/Exercise/ExerciseCard';
import ProgressTracker from '@site/src/components/Exercise/ProgressTracker';
```

### Component Usage

**Learning Objectives** (start of lecture):
```jsx
<LearningObjectives
  objectives={[
    "Objective 1",
    "Objective 2"
  ]}
/>
```

**Info Boxes**:
```jsx
<InfoBox title="Title">
Content here
</InfoBox>

<SuccessBox title="Success">
Positive content
</SuccessBox>

<WarningBox title="Warning">
Important warnings
</WarningBox>

<WhyBox title="Why is this important?">
Motivation and reasoning
</WhyBox>
```

**Collapsible Sections**:
```jsx
<CollapsibleSection title="Title" icon="🎯">
Collapsible content
</CollapsibleSection>
```

**Grid Layout**:
```jsx
<Grid columns={2}>
  <Card title="Card 1">
  Content 1
  </Card>
  <Card title="Card 2">
  Content 2
  </Card>
</Grid>
```

**Exercise Cards**:
```jsx
<ExerciseCard
  difficulty="easy"
  timeEstimate="15 min"
  tags={["arrays", "basics"]}
>
Problem description
</ExerciseCard>
```

**Progress Tracker** (in exercises.md):
```jsx
<ProgressTracker
  exercises={[
    { id: 1, difficulty: "easy" },
    { id: 2, difficulty: "medium" },
    { id: 3, difficulty: "hard" }
  ]}
/>
```

## Content Guidelines

### Language
- **Bulgarian** for content and explanations
- **English** for code, technical terms, and code comments
- Component props use English

### Code Blocks
Use language-specific syntax highlighting:

\`\`\`cpp
#include <iostream>

int main() {
    // Comments in English
    std::cout << "Hello!" << std::endl;
    return 0;
}
\`\`\`

### Mathematical Formulas
Use LaTeX syntax:

Inline: `$O(n \log n)$`

Block:
```
$$
T(n) = 2T(n/2) + O(n)
$$
```

### Links
- Internal: `/docs/category/page`
- External: Use full URLs with descriptive text

## Required Sections

### Every lecture.md must include:

1. **Title** with `<LearningObjectives>`
2. **Main Content** with appropriate components
3. **Code Examples** with C++ snippets
4. **Допълнителни Ресурси** section at the end:

```markdown
## Допълнителни Ресурси

### Онлайн Туториали

- [Resource Name](url) - Description
- [GeeksforGeeks - Topic](url) - Comprehensive tutorial

### Визуализация

- [Visualgo](url) - Interactive visualization
- [Tool Name](url) - Description

### Практически Задачи

- [LeetCode - Topic](url) - Practice problems
- [HackerRank](url) - Challenges

### Книги

- "Book Title" by Author - Relevant chapters

### C++ Reference

- [cppreference.com - Topic](url) - Official documentation
```

### Every exercises.md must include:

1. **ProgressTracker** at the top
2. **Multiple exercises** with:
   - `<ExerciseCard>` for problem statement
   - `<CollapsibleSection>` for hints
   - `<CollapsibleSection>` for solutions

## Tags Convention

Use consistent tags:
- **General**: `data-structures`, `algorithms`, `cpp`, `practice`, `exercises`
- **Topics**: `arrays`, `linked-lists`, `trees`, `graphs`, `hash-tables`, `sorting`, `searching`
- **Concepts**: `complexity`, `recursion`, `dynamic-programming`, `greedy`
- **Difficulty**: `easy`, `medium`, `hard` (in ExerciseCard)

## Best Practices

1. **Always use components** instead of plain markdown for better UX
2. **Add educational resources** at the end of each lecture
3. **Include code examples** with proper syntax highlighting
4. **Use Bulgarian** for content, English for code
5. **Test locally** before committing: `cd docusaurus-site && npm start`
6. **Follow naming conventions** strictly
7. **Add descriptive tags** for better navigation
8. **Include learning objectives** at the start
9. **Provide hints and solutions** in collapsible sections
10. **Link to external resources** for further learning

## Common Patterns

### Lecture Structure
```markdown
# Title

<LearningObjectives objectives={[...]} />

---

## 1. Introduction

<WhyBox title="Why?">
Motivation
</WhyBox>

## 2. Concepts

<InfoBox title="Definition">
Core concepts
</InfoBox>

## 3. Implementation

\`\`\`cpp
// Code example
\`\`\`

## 4. Analysis

<SuccessBox title="Complexity">
Time and space analysis
</SuccessBox>

## Допълнителни Ресурси

[Resources section]
```

### Exercise Structure
```markdown
# Exercises

<ProgressTracker exercises={[...]} />

---

## Task 1: Title

<ExerciseCard difficulty="easy" timeEstimate="15 min" tags={[...]}>
Problem description
</ExerciseCard>

<CollapsibleSection title="💡 Hint" icon="💡">
Hint content
</CollapsibleSection>

<CollapsibleSection title="✅ Solution" icon="✅">
\`\`\`cpp
// Solution code
\`\`\`
</CollapsibleSection>
```

## Testing

```bash
# Start dev server
cd docusaurus-site && npm start

# Build for production (checks for errors)
cd docusaurus-site && npm run build

# Check for broken links (happens automatically in build)
```

## Deployment

- **Automatic** via GitHub Actions on push to `main`
- **Check status**: https://github.com/alexaytov/fmi-sdp-exc-2025-26/actions
- **Live site**: https://alexaytov.github.io/fmi-sdp-exc-2025-26/

---

**Note**: These instructions are for GitHub Copilot. Always follow these patterns when creating new lecture materials or exercises.
