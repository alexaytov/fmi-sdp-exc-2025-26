# Claude Code Instructions - FMI SDP Course

Инструкции за работа с курса по Структури от Данни и Програмиране.

## Структура на Проекта

```
fmi-sdp-exc-2025-26/
├── docusaurus-site/              # Активен Docusaurus сайт
│   ├── docs/                     # Лекционни материали
│   │   ├── XX-topic-name/
│   │   │   ├── _category_.json
│   │   │   ├── lecture.md
│   │   │   ├── exercises.md
│   │   │   └── slides.md       # Опционална презентация
│   ├── src/components/          # React компоненти
│   └── docusaurus.config.ts    # Конфигурация
└── .github/workflows/           # GitHub Actions
```

## Създаване на Нови Лекции

### Naming Convention
- Директория: `XX-topic-name` (напр. `11-hash-tables`, `12-graphs`)
- Файлове: `_category_.json`, `lecture.md`, `exercises.md`, `slides.md` (опционална)

### 1. _category_.json

```json
{
  "label": "XX. Заглавие на Лекцията",
  "position": XX,
  "collapsed": false,
  "link": {
    "type": "generated-index",
    "description": "Кратко описание"
  }
}
```

### 2. lecture.md структура

```markdown
---
title: "Лекция"
sidebar_position: 1
slug: lecture
tags: [tag1, tag2, data-structures, cpp]
---

import InfoBox from '@site/src/components/InfoBoxes/InfoBox';
import WarningBox from '@site/src/components/InfoBoxes/WarningBox';
import SuccessBox from '@site/src/components/InfoBoxes/SuccessBox';
import WhyBox from '@site/src/components/InfoBoxes/WhyBox';
import LearningObjectives from '@site/src/components/LearningObjectives';
import QuickSummary from '@site/src/components/QuickSummary';
import CollapsibleSection from '@site/src/components/CollapsibleSection';
import ComparisonBox from '@site/src/components/Comparison/ComparisonBox';
import Grid from '@site/src/components/Grid/Grid';
import Card from '@site/src/components/Grid/Card';
import ViewSlidesButton from '@site/src/components/ViewSlidesButton';

# Заглавие на Лекцията

<ViewSlidesButton lectureSlug="topic-name" />

<QuickSummary>

**Ключови познания:**
- Точка 1
- Точка 2

</QuickSummary>

<LearningObjectives objectives={["Цел 1", "Цел 2"]} />

---

[Съдържание]

---

## Допълнителни Ресурси

### Онлайн Туториали
- [Ресурс](url) - Описание

### Видео Лекции
- [Видео](url) - Описание

### Практически Задачи
- [Platform](url) - Описание
```

### 3. exercises.md структура

**🎯 Zero Config Approach** - НЕ задавай `id` и `exercises` props!

```markdown
---
sidebar_position: 2
title: "Упражнения"
tags: [exercises, practice]
---

import ExerciseCard from '@site/src/components/Exercise/ExerciseCard';
import ProgressTracker from '@site/src/components/Exercise/ProgressTracker';
import CollapsibleSection from '@site/src/components/CollapsibleSection';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Упражнения: Тема

<ProgressTracker />

---

## Лесни упражнения (EASY)

<ExerciseCard difficulty="easy">

### Заглавие на задачата

Описание...

<CollapsibleSection title="Решение" icon="✅">

```cpp
// Код
```

**Обяснение:** ...

</CollapsibleSection>

</ExerciseCard>
```

**5 нива на сложност:**
1. **EASY** - Фундаментални концепции (5-15 мин)
2. **EASY-MEDIUM** - Изграждане на разбиране (15-25 мин)
3. **MEDIUM** - Приложение (25-40 мин)
4. **MEDIUM-HARD** - Напреднали концепции (40-60 мин)
5. **HARD** - Комплексни проблеми (60+ мин)

**Всяко решение съдържа:**
- Код (пълна имплементация)
- Обяснение
- Анализ на сложност
- Предимства/Недостатъци (✅/❌)
- Практически съвети (за трудни)

## Важни Компоненти

### Налични React Компоненти

1. **InfoBox, SuccessBox, WarningBox, WhyBox** - Информационни кутии
2. **CollapsibleSection** - Сгъваеми секции
3. **Grid и Card** - Grid layout
4. **ComparisonBox** - Сравнения
5. **LearningObjectives** - Цели на обучението
6. **QuickSummary** - Бързо резюме (collapsible по подразбиране)
7. **ExerciseCard и ProgressTracker** - Zero-config система с React Context
8. **ViewSlidesButton** - Линк към презентация

### Exercise System - React Context API

**✨ ZERO-CONFIG (Декември 2025)** - Автоматична система!

**Workflow:**
```jsx
<ProgressTracker />  <!-- НЕ задавай exercises prop -->

### Задача: Терминология

<ExerciseCard difficulty="easy">  <!-- НЕ задавай id prop -->
...
</ExerciseCard>
```

**Автоматично:**
- ExerciseCard извлича заглавие от DOM (H2/H3)
- Генерира semantic ID (transliterate + slugify)
- Регистрира се в Context автоматично
- LocalStorage за прогрес
- ProgressTracker чете от Context

**⚠️ КРИТИЧНО - Избягвай Infinite Loops:**

```jsx
// ❌ ГРЕШНО
const context = useExerciseContext();
useEffect(() => {
  context.registerExercise(difficulty, id);
}, [difficulty, context]); // Context обект като dependency!

// ✅ ПРАВИЛНО
const { registerExercise, unregisterExercise } = context;
useEffect(() => {
  registerExercise(difficulty, id);
  return () => unregisterExercise(id);
}, [difficulty, registerExercise, unregisterExercise]); // Destructured функции
```

**Правила:**
1. Destructure функции от Context
2. НЕ използвай context обект като dependency
3. Memoize с `useCallback` и `useMemo`
4. `getPathname()` е callback, НЕ state

## Математически Формули и MDX Escaping

**⚠️ MDX v3 LaTeX Escaping:**

Всички `{` и `}` в LaTeX **ТРЯБВА** да се escape-ват с `\`:

```markdown
✅ ПРАВИЛНО:
Времева сложност: $O(n \log n)$

$$
T(n) = \begin\{cases\}
  O(1) & \text\{ако \} n = 1 \\
  2T(n/2) + O(n) & \text\{иначе\}
\end\{cases\}
$$

❌ ГРЕШНО:
\frac{n}{2}  → \frac\{n\}\{2\}
\sum_{i=0}^{n}  → \sum_\{i=0\}^\{n\}
```

**⚠️ MDX Escaping за `<<` и `>>`:**

```markdown
✅ ПРАВИЛНО:
Разредени графи (E &lt;&lt; V²)

❌ ГРЕШНО:
E << V²  <!-- MDX грешка! -->
```

**В code blocks НЕ е нужно escape-ване!**

## Reveal.js Презентации

### Quick Start

1. Създай `slides.md` в `docs/XX-topic-name/`
2. Добави frontmatter и слайдове
3. `npm run build:slides` (или `npm run build` за production)
4. Navbar се актуализира **автоматично**

### Базова Структура

```markdown
---
title: Заглавие
theme: white
highlightTheme: github
transition: slide
---

# Първи Слайд

Съдържание

---

# Втори Слайд

Съдържание

Note:
Speaker notes (вижда се с 'S' key)

---

<!-- .slide: data-background="#4d7e65" -->

## Слайд с цветен фон

--

### Вертикален подслайд

Използвай `--` за вертикални слайдове
```

### Разделители

- **`---`** - Хоризонтален слайд (← →)
- **`--`** - Вертикален подслайд (↑ ↓)
- **`Note:`** - Speaker notes (само в presenter view)

### Полезни Features

**Code Highlighting:**
```markdown
\`\`\`cpp {2-3}
int main() {
    int x = 10;  // Highlighted
    int y = 20;  // Highlighted
}
\`\`\`
```

**Fragments:**
```markdown
<!-- .element: class="fragment" -->
- Появява се постепенно

<!-- .element: class="fragment fade-in" -->
- С fade ефект
```

**Двуколонен Layout:**
```markdown
<div class="columns">
<div class="column left">

### Текст

</div>
<div class="column right">

![Image](url)

</div>
</div>
```

### Keyboard Shortcuts

| Клавиш | Действие |
|--------|----------|
| **Стрелки** | Навигация |
| **S** | Speaker view |
| **F** | Fullscreen |
| **ESC** | Overview mode |
| **?** | Help |

### PDF Export

1. Добави `?print-pdf` към URL
2. Chrome → Print → Save as PDF

### Автоматична Navbar Интеграция

`reveal-slides-plugin.js` автоматично:
- Сканира `docs/*/slides.md` файлове
- Генерира HTML в `static/slides/[topic-name]/`
- Актуализира navbar dropdown
- **НЕ е нужна** ръчна конфигурация!

### Workflow

```bash
# Редактирай slides.md
code docs/XX-topic-name/slides.md

# Rebuild
npm run build:slides

# Test
# http://localhost:3000/slides/topic-name/

# Commit
git add docs/XX-topic-name/slides.md
git commit -m "Update slides for topic-name"
```

## Best Practices

### Exercise System
1. Zero Config - НЕ задавай `id` и `exercises`
2. Destructure Context функции - избягвай infinite loops
3. Стабилни заглавия - променянето променя ID
4. Описателни български заглавия

### General Development
5. Използвай React компоненти за по-добър UX
6. Добавяй ресурси към всяка лекция
7. Включвай C++ примери
8. Тествай локално (`npm start`)
9. Следвай naming conventions (XX-topic-name)
10. Escape LaTeX брейсове (`\{` и `\}`)
11. Escape `<<` и `>>` извън code blocks
12. Изчиствай cache при грешки (`rm -rf .docusaurus`)

### Reveal.js Slides
13. Кратки слайдове - една идея на слайд
14. Speaker notes - добавяй обяснения
15. Code highlighting - указвай език
16. Консистентност - следвай стила на съществуващите

## Troubleshooting

### Build Failed
```bash
cd docusaurus-site && npm run build
```

### Exercise Context Errors
- **"useExerciseContext must be used..."**: `rm -rf .docusaurus && npm start`
- **"Maximum update depth exceeded"**: Destructure функции от context
- **Прогресът не се актуализира**: Провери `exerciseProgressChanged` event

### Reveal.js Issues
- **Промените не се виждат**: `npm run build:slides`
- **Код не е оцветен**: Указвай език след \`\`\`
- **LaTeX не работи**: Escape всички `{` и `}`

## Deployment

GitHub Actions автоматично:
- Push към `main` → build и deploy
- Статус: https://github.com/alexaytov/fmi-sdp-exc-2025-26/actions
- Live: https://alexaytov.github.io/fmi-sdp-exc-2025-26/

## Полезни Команди

```bash
cd docusaurus-site

npm start              # Dev server
npm run build          # Production build
npm run build:slides   # Rebuild презентации
npm run serve          # Test production build
npm run clear          # Clear cache
```

## Changelog

### 10 Декември 2025
- Reveal.js Final Implementation с pathname:// protocol
- Static files approach в static/slides/
- Автоматична navbar интеграция

### 2 Декември 2025
- React Context Architecture за Exercise System
- Zero Config Approach - премахнати ръчни IDs
- Infinite Loop Prevention документация

### 28 Ноември 2025
- Първоначална документация
- Auto-generated semantic IDs

---

**Последна актуализация**: 12 Декември 2025
