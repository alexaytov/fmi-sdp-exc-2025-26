# 🤖 AI Prompt Templates for Content Generation

This document contains ready-to-use prompts for AI to generate educational content using the Docusaurus template system.

---

## 📝 Lecture Generation Prompt

### Full Prompt Template

```
Generate a comprehensive Docusaurus markdown lecture about [TOPIC NAME] in C++ data structures and algorithms.

**Context:**
This is for a university-level course on data structures. Students have knowledge of basic C++ programming.

**Format Requirements:**

1. **Frontmatter** (at the very top):
```yaml
---
title: "[Descriptive Title in Bulgarian]"
sidebar_position: [number]
tags: [tag1, tag2, tag3]
---
```

2. **Component Imports** (right after frontmatter):
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
```

3. **Content Structure:**

# [Title]

<LearningObjectives
  objectives={[
    "Objective 1",
    "Objective 2",
    "Objective 3",
    "Objective 4"
  ]}
/>

## 1. Въведение и Мотивация

<WhyBox title="Защо е важно [topic]?">
Explain the importance and real-world applications...
</WhyBox>

[Introduction text...]

## 2. Теоретични Основи

<InfoBox title="Дефиниция">
Clear definition of the concept...
</InfoBox>

[Theory explanation...]

## 3. Имплементация

```cpp
// Well-commented C++ code example
class DataStructure {
    // Implementation
};
```

<WarningBox title="Често Срещани Грешки">
- Common mistake 1
- Common mistake 2
</WarningBox>

## 4. Сравнение на Подходи

<ComparisonBox
  wrong={{
    title: "Неправилен Подход",
    content: <pre><code>{`// Incorrect code
int wrong() {
    return 0;
}`}</code></pre>
  }}
  correct={{
    title: "Правилен Подход",
    content: <pre><code>{`// Correct code
int correct() {
    return 1;
}`}</code></pre>
  }}
/>

## 5. Предимства и Недостатъци

<Grid columns={2}>
  <Card title="Предимства">
    - Advantage 1
    - Advantage 2
  </Card>
  <Card title="Недостатъци">
    - Disadvantage 1
    - Disadvantage 2
  </Card>
</Grid>

## 6. Напреднали Теми

<CollapsibleSection title="Допълнителна Информация" icon="💡" defaultOpen={false}>
Advanced content that's optional...
</CollapsibleSection>

## 7. Добри Практики

<SuccessBox title="Препоръки">
- Best practice 1
- Best practice 2
- Best practice 3
</SuccessBox>

## 8. Резюме

Summary of key points...

**Component Usage Guidelines:**
- Use InfoBox for definitions, key concepts
- Use WarningBox for common mistakes, pitfalls
- Use SuccessBox for best practices, recommendations
- Use WhyBox for motivation, real-world applications
- Use CollapsibleSection for hints, optional deep dives
- Use ComparisonBox to show correct vs incorrect code
- Use Grid+Card for organized lists of pros/cons, features

**Language:** Write entirely in Bulgarian
**Code:** All code examples in C++ with comments in English
**Tone:** Educational, clear, encouraging
**Length:** Comprehensive but concise (aim for 2000-3000 words)
```

---

## 🎯 Exercise Generation Prompt

### Full Prompt Template

```
Generate a complete set of practice exercises for [TOPIC NAME] in Docusaurus markdown format.

**Format Requirements:**

1. **Frontmatter:**
```yaml
---
title: "[Topic] - Упражнения"
sidebar_position: [number.1]
---
```

2. **Component Imports:**
```jsx
import ExerciseCard from '@site/src/components/Exercise/ExerciseCard';
import ProgressTracker from '@site/src/components/Exercise/ProgressTracker';
```

3. **Content Structure:**

# [Topic] - Упражнения

<ProgressTracker
  exercises={['ex1', 'ex2', 'ex3', 'ex4', 'ex5', 'ex6', 'ex7', 'ex8', 'ex9', 'ex10']}
/>

## Лесни Упражнения

<ExerciseCard
  id="ex1"
  difficulty="easy"
  number={1}
  question={<>
    <p>Clear, specific question...</p>
  </>}
  answer={<>
    <p><strong>Отговор:</strong></p>
    <p>Detailed explanation...</p>
    <pre><code>{`// Code if applicable
int solution() {
    return 42;
}`}</code></pre>
  </>}
/>

[Repeat for exercises 2-4]

## Средни Упражнения

<ExerciseCard
  id="ex5"
  difficulty="medium"
  number={5}
  question={<>
    <p>More complex question requiring implementation...</p>
  </>}
  answer={<>
    <p><strong>Отговор:</strong></p>
    <p>Step-by-step solution...</p>
    <pre><code>{`// Complete implementation
class Solution {
    // ...
};`}</code></pre>
    <p><strong>Времева сложност:</strong> O(n)</p>
    <p><strong>Пространствена сложност:</strong> O(1)</p>
  </>}
/>

[Repeat for exercises 6-8]

## Трудни Упражнения

<ExerciseCard
  id="ex9"
  difficulty="hard"
  number={9}
  question={<>
    <p>Challenging problem requiring deep understanding...</p>
    <pre><code>{`// Starter code or problem setup
void complexFunction() {
    // Your implementation
}`}</code></pre>
  </>}
  answer={<>
    <p><strong>Отговор:</strong></p>
    <p>Comprehensive explanation with multiple approaches...</p>
    <h4>Подход 1: Наивен</h4>
    <pre><code>{`// Naive solution`}</code></pre>
    <p>Complexity: O(n²)</p>
    <h4>Подход 2: Оптимизиран</h4>
    <pre><code>{`// Optimized solution`}</code></pre>
    <p>Complexity: O(n log n)</p>
  </>}
/>

[Repeat for exercise 10]

**Exercise Requirements:**
- Total: 10 exercises
- Easy: 4 exercises (conceptual, definitions, basic code reading)
- Medium: 4 exercises (implementation, debugging, analysis)
- Hard: 2 exercises (complex problems, optimization, design)

**Each Exercise Should Include:**
- Unique ID (ex1, ex2, etc.)
- Appropriate difficulty level
- Clear, unambiguous question
- Comprehensive answer with:
  - Explanation of the solution
  - Code examples where relevant
  - Time/space complexity analysis for algorithms
  - Common mistakes to avoid (if applicable)

**Language:** Bulgarian
**Code:** C++ with English comments
**Tone:** Challenging but supportive

**Exercise Types to Include:**
1. Multiple choice questions
2. True/False with explanation
3. Code completion
4. Bug finding and fixing
5. Implementation from scratch
6. Time complexity analysis
7. Design questions
8. Comparison of approaches
```

---

## 🔧 Customization Examples

### Example: Binary Search Trees Lecture

```
Generate a comprehensive Docusaurus markdown lecture about Binary Search Trees in C++ data structures and algorithms.

[Use the full lecture template above]

Specific topics to cover:
- BST property and definition
- Insert operation
- Search operation
- Delete operation (with three cases)
- Traversal methods (inorder, preorder, postorder)
- Time complexity analysis
- Balanced vs unbalanced trees
- Common applications

Include:
- Visualization descriptions
- Step-by-step walkthrough of insert/delete
- Common pitfalls (memory leaks, incorrect pointer updates)
- Comparison with other data structures
```

### Example: Doubly Linked Lists Exercises

```
Generate a complete set of practice exercises for Doubly Linked Lists in Docusaurus markdown format.

[Use the full exercise template above]

Specific exercise ideas:
Easy:
- Define what a doubly linked list is
- Identify parts of a node
- Compare with singly linked list
- Time complexity questions

Medium:
- Implement insert at front
- Implement delete by value
- Implement reverse traversal
- Find and fix memory leaks

Hard:
- Implement a complete doubly linked list class
- Design an LRU cache using doubly linked list
- Optimize operations for specific use cases
```

---

## 💡 Tips for Best Results

### Do's ✅
- Be specific about the topic and context
- Specify the student level (beginner, intermediate, advanced)
- Request specific sections or components you want
- Ask for multiple code examples
- Request complexity analysis for algorithms
- Specify the number of exercises and difficulty distribution

### Don'ts ❌
- Don't ask for multiple unrelated topics in one prompt
- Don't omit the component imports
- Don't forget to specify Bulgarian language
- Don't skip the frontmatter
- Don't request overly long content (keep it focused)

---

## 🎯 Quality Checklist

After AI generates content, verify:

- [ ] Frontmatter is present and correct
- [ ] All necessary components are imported
- [ ] LearningObjectives has 3-5 clear objectives
- [ ] Code blocks have proper syntax highlighting (```cpp)
- [ ] Components are properly formatted (JSX syntax)
- [ ] Exercise IDs are unique and match ProgressTracker
- [ ] Answers are comprehensive and accurate
- [ ] Language is consistent (Bulgarian with English code comments)
- [ ] No placeholder text like [INSERT HERE]
- [ ] Proper spacing and formatting

---

## 🚀 Quick Start Commands

### Generate New Lecture
1. Copy the lecture prompt template
2. Replace [TOPIC NAME] with your topic
3. Add any specific requirements
4. Run through AI
5. Save as `docs/[number]-[topic-name]/lecture.md`

### Generate New Exercises
1. Copy the exercise prompt template
2. Replace [TOPIC NAME] with your topic
3. Specify exercise count and difficulty
4. Run through AI
5. Save as `docs/[number]-[topic-name]/exercises.md`

### Iterate and Refine
If results aren't perfect:
1. Ask AI to "revise the [section name] to include [specific detail]"
2. Request "add more examples for [concept]"
3. Say "make the [difficulty] exercises more challenging"
4. Ask "expand the answer for exercise [number] with step-by-step explanation"

---

**Pro Tip:** Save successful prompts and refinements for reuse with other topics!
