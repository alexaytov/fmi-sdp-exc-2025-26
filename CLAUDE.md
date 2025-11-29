# Claude Code Instructions - FMI SDP Course

Този файл съдържа инструкции за работа с курса по Структури от Данни и Програмиране чрез Claude Code.

## Структура на Проекта

```
fmi-sdp-exc-2025-26/
├── docusaurus-site/              # Активен Docusaurus сайт
│   ├── docs/                     # Лекционни материали
│   │   ├── 01-complexity-big-o/
│   │   │   ├── _category_.json
│   │   │   ├── lecture.md
│   │   │   └── exercises.md
│   │   ├── 02-compiler-optimizations/
│   │   └── ...
│   ├── src/                      # React компоненти
│   │   └── components/
│   └── docusaurus.config.ts     # Конфигурация
├── archived-original-lectures/   # Архив на оригинални файлове
└── .github/workflows/           # GitHub Actions за deployment

```

## Създаване на Нови Лекции от Текст

### Стъпка 1: Подготовка на материала

Когато получите текст за нова лекция (lecture.md или exc.md):

1. **Анализирайте структурата** на съществуващите лекции
2. **Идентифицирайте номера** на лекцията (например 11, 12, и т.н.)
3. **Определете темата** на лекцията

### Стъпка 2: Създаване на директория

```bash
# Формат на директорията: XX-topic-name
cd docusaurus-site/docs
mkdir XX-topic-name
```

Примери на naming convention:
- `11-hash-tables`
- `12-graphs-introduction`
- `13-graph-algorithms`

### Стъпка 3: Създаване на _category_.json

```json
{
  "label": "XX. Заглавие на Лекцията",
  "position": XX,
  "collapsed": false,
  "link": {
    "type": "generated-index",
    "description": "Кратко описание на темата"
  }
}
```

### Стъпка 4: Конвертиране на lecture.md

Създайте `lecture.md` със следната структура:

```markdown
---
title: "Лекция"
sidebar_position: 1
slug: lecture
tags: [tag1, tag2, tag3, data-structures, cpp]
---

import InfoBox from '@site/src/components/InfoBoxes/InfoBox';
import WarningBox from '@site/src/components/InfoBoxes/WarningBox';
import SuccessBox from '@site/src/components/InfoBoxes/SuccessBox';
import WhyBox from '@site/src/components/InfoBoxes/WhyBox';
import LearningObjectives from '@site/src/components/LearningObjectives';
import CollapsibleSection from '@site/src/components/CollapsibleSection';
import ComparisonBox from '@site/src/components/Comparison/ComparisonBox';
import Grid from '@site/src/components/Grid/Grid';
import Card from '@site/src/components/Grid/Card';

# Заглавие на Лекцията

<LearningObjectives
  objectives={[
    "Цел 1",
    "Цел 2",
    "Цел 3",
    "Цел 4"
  ]}
/>

---

[Съдържание на лекцията тук]

---

## Допълнителни Ресурси

### Онлайн Туториали

- [Линк 1](url) - Описание
- [Линк 2](url) - Описание

### Видео Лекции

- [Линк 1](url) - Описание

### Книги и Статии

- Книга/статия 1 - Описание

### Практически Задачи

- [Platform](url) - Описание
```

### Стъпка 5: Конвертиране на exercises.md

Създайте `exercises.md` със следната структура:

```markdown
---
title: "Упражнения"
sidebar_position: 2
slug: exercises
tags: [exercises, practice, tag1, tag2]
---

import ExerciseCard from '@site/src/components/Exercise/ExerciseCard';
import ProgressTracker from '@site/src/components/Exercise/ProgressTracker';
import CollapsibleSection from '@site/src/components/CollapsibleSection';
import InfoBox from '@site/src/components/InfoBoxes/InfoBox';

# Упражнения - Заглавие

<ProgressTracker
  exercises={[
    { id: 1, difficulty: "easy" },
    { id: 2, difficulty: "medium" },
    { id: 3, difficulty: "hard" }
  ]}
/>

---

## Задача 1: Заглавие

<ExerciseCard
  difficulty="easy"
  timeEstimate="15 min"
  tags={["arrays", "basics"]}
>

Описание на задачата

</ExerciseCard>

<CollapsibleSection title="💡 Подсказка" icon="💡">

Подсказка за решение

</CollapsibleSection>

<CollapsibleSection title="✅ Решение" icon="✅">

\`\`\`cpp
// Код на решението
\`\`\`

</CollapsibleSection>
```

### Стъпка 6: Важни Компоненти

#### Налични React Компоненти:

1. **InfoBox** - Информационни кутии
   ```jsx
   <InfoBox title="Заглавие">
   Съдържание
   </InfoBox>
   ```

2. **SuccessBox** - Успешни съобщения
   ```jsx
   <SuccessBox title="Заглавие">
   Съдържание
   </SuccessBox>
   ```

3. **WarningBox** - Предупреждения
   ```jsx
   <WarningBox title="Заглавие">
   Съдържание
   </WarningBox>
   ```

4. **WhyBox** - "Защо?" обяснения
   ```jsx
   <WhyBox title="Защо е важно?">
   Обяснение
   </WhyBox>
   ```

5. **CollapsibleSection** - Сгъваеми секции
   ```jsx
   <CollapsibleSection title="Заглавие" icon="🎯">
   Съдържание
   </CollapsibleSection>
   ```

6. **Grid и Card** - Grid layout
   ```jsx
   <Grid columns={2}>
     <Card title="Заглавие 1">
     Съдържание 1
     </Card>
     <Card title="Заглавие 2">
     Съдържание 2
     </Card>
   </Grid>
   ```

7. **ComparisonBox** - Сравнения
   ```jsx
   <ComparisonBox
     left={{ title: "Подход 1", content: "..." }}
     right={{ title: "Подход 2", content: "..." }}
   />
   ```

8. **LearningObjectives** - Цели на обучението
   ```jsx
   <LearningObjectives
     objectives={["Цел 1", "Цел 2"]}
   />
   ```

9. **ExerciseCard** - Карти за задачи
   ```jsx
   <ExerciseCard
     difficulty="easy|medium|hard"
     timeEstimate="XX min"
     tags={["tag1", "tag2"]}
   >
   Описание
   </ExerciseCard>
   ```

### Стъпка 7: Добавяне на Ресурси

**ВАЖНО**: Към края на всяка лекция добавете секция "Допълнителни Ресурси" с:

- **Онлайн Туториали**: GeeksforGeeks, TutorialsPoint, W3Schools
- **Видео Лекции**: YouTube, академични курсове
- **Визуализации**: Интерактивни инструменти
- **Практически Задачи**: LeetCode, HackerRank, CodeForces
- **Книги**: Препоръки за четене
- **Документация**: C++ reference, STL docs

Използвайте следния шаблон:

```markdown
## Допълнителни Ресурси

### Онлайн Туториали

- [Ресурс 1](url) - Кратко описание
- [Ресурс 2](url) - Кратко описание

### Визуализация и Примери

- [Tool 1](url) - Описание

### Практически Задачи

- [Platform - Topic](url) - Описание

### Книги

- "Книга 1" - Автор, глави/секции
```

### Стъпка 8: Code Snippets

Използвайте markdown code blocks с език:

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```

### Стъпка 9: Математически Формули

За математически формули използвайте LaTeX синтаксис:

**⚠️ ВАЖНО: MDX v3 LaTeX Escaping Правило**

В MDX v3 (което Docusaurus използва), **ВСИЧКИ къдрави скоби `{` и `}` в LaTeX формули ТРЯБВА да се escape-ват** с backslash (`\{` и `\}`), защото иначе MDX ги интерпретира като JSX expressions!

**✅ ПРАВИЛНО:**
```markdown
Времева сложност: $O(n \log n)$

$$
T(n) = \begin\{cases\}
  O(1) & \text\{ако \} n = 1 \\
  2T(n/2) + O(n) & \text\{иначе\}
\end\{cases\}
$$

$$
\text\{parent\}(i) = \left\lfloor \frac\{i-1\}\{4\} \right\rfloor
$$

$$
\sum_\{i=0\}^\{h\} \frac\{n\}\{2^\{i+1\}\} \times (h - i)
$$
```

**❌ ГРЕШНО** (ще предизвика React JSX грешка):
```markdown
$$
T(n) = \begin{cases}    <!-- { без \ -->
  O(1) & \text{ако } n = 1 \\
  2T(n/2) + O(n) & \text{иначе}
\end{cases}
$$
```

**Често срещани грешки:**
- `\frac{n}{2}` ❌ → `\frac\{n\}\{2\}` ✅
- `\text{parent}` ❌ → `\text\{parent\}` ✅
- `\sum_{i=0}^{h}` ❌ → `\sum_\{i=0\}^\{h\}` ✅
- `2^{h+1}` ❌ → `2^\{h+1\}` ✅

**Типична грешка в browser console:**
```
Error: Objects are not valid as a React child (found: [object Window])
```

Това означава, че има неescaped `{` или `}` в LaTeX формула!

### Стъпка 10: Тестване локално

```bash
cd docusaurus-site
npm start
```

Отворете: http://localhost:3000

### Стъпка 11: Commit и Push

```bash
git add docusaurus-site/docs/XX-topic-name/
git commit -m "Add lecture XX: Topic Name

- Add lecture.md with comprehensive content
- Add exercises.md with practice problems
- Include educational resources
- Add interactive components

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
git push origin main
```

## Naming Conventions

### Директории
- Формат: `XX-topic-name-in-lowercase`
- Примери: `11-hash-tables`, `12-graph-algorithms`

### Файлове
- `_category_.json` - Метаданни за категорията
- `lecture.md` - Лекционен материал
- `exercises.md` - Практически задачи

### Tags
- Общи: `data-structures`, `algorithms`, `cpp`, `practice`, `exercises`
- Специфични: `hash-tables`, `graphs`, `trees`, `sorting`, и т.н.

## Best Practices

1. **Използвай компоненти** вместо обикновен markdown за по-добър UX
2. **Добавяй ресурси** към всяка лекция
3. **Включвай примери** с код
4. **Създавай визуализации** където е възможно
5. **Тествай локално** преди commit
6. **Следвай naming conventions** за консистентност
7. **Добавяй tags** за по-добра навигация
8. **Пиши на български** за съдържанието
9. **Използвай английски** за код и технически термини

## Troubleshooting

### Build Failed
```bash
cd docusaurus-site
npm run build
# Провери грешките в output-а
```

### Broken Links
- Провери че всички линкове са правилни
- Използвай относителни пътища за вътрешни линкове
- Тествай линковете локално

### Компоненти не се зареждат
- Провери import statements
- Провери че paths са правилни: `@site/src/components/...`
- Рестартирай dev server

## Deployment

Deployment е автоматичен чрез GitHub Actions:
- Push към `main` branch → автоматичен build и deploy
- Провери статус: https://github.com/alexaytov/fmi-sdp-exc-2025-26/actions
- Live site: https://alexaytov.github.io/fmi-sdp-exc-2025-26/

## Полезни Команди

```bash
# Стартиране на dev server
cd docusaurus-site && npm start

# Build за production
cd docusaurus-site && npm run build

# Serve production build локално
cd docusaurus-site && npm run serve

# Проверка за broken links
cd docusaurus-site && npm run build

# Clear cache
cd docusaurus-site && npm run clear
```

---

**Последна актуализация**: 28 Ноември 2025
