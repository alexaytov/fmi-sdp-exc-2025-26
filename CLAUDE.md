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

<ProgressTracker />

---

## Задача 1: Терминология на Графите

<ExerciseCard
  difficulty="easy"
  timeEstimate="15 min"
  tags={["theory", "terminology"]}
>

Дефинирайте следните термини...

</ExerciseCard>

---

## Задача 2: Класификация на Графи

<ExerciseCard
  difficulty="medium"
  timeEstimate="20 min"
>

За всеки сценарий...

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

9. **ExerciseCard и ProgressTracker** - Автоматична система за проследяване на прогреса

   **✨ ZERO-CONFIG РЕШЕНИЕ С REACT CONTEXT (Декември 2025)**

   Системата за упражнения е напълно автоматична и използва **React Context API** за централизирано управление на състоянието. **НЕ е нужна ръчна конфигурация!**

   **🎯 Препоръчан Workflow (Zero Config):**

   ```jsx
   # Упражнения - Графи

   <ProgressTracker />

   ---

   ### Задача 1: Терминология на Графите

   <ExerciseCard
     difficulty="easy"
     timeEstimate="15 min"
     tags={["theory", "terminology"]}
   >

   Дефинирайте следните термини...

   </ExerciseCard>
   ```

   **Как работи автоматичната система:**

   1. **ExerciseProvider Context**: Всички MDX страници се обвиват автоматично с `<ExerciseProvider>` чрез Docusaurus theme swizzling (`src/theme/MDXContent/index.tsx`)

   2. **Автоматична регистрация**: `ExerciseCard` автоматично се регистрира в Context при mount:
      - Търси най-близкото предходно H2/H3 заглавие
      - Извлича заглавието: "Задача 1: Терминология на Графите"
      - Премахва префикса → "Терминология на Графите"
      - Транслитерира на английски → "Terminologiya na Grafite"
      - Конвертира в kebab-case → `"terminologiya-na-grafite"`
      - Генерира storage ключ: `${pathname}_exercise_terminologiya-na-grafite`

   3. **ProgressTracker**: Автоматично чете от Context и показва прогреса - **НЕ е нужен `exercises` prop!**

   4. **LocalStorage**: Прогресът се съхранява автоматично в browser LocalStorage

   **⚠️ КРИТИЧНО: Избягване на Infinite Loops**

   При работа с Context и useEffect hooks, **трябва да внимаваш за infinite loops!**

   **❌ ГРЕШНО (Infinite Loop):**
   ```jsx
   const context = useExerciseContext();

   useEffect(() => {
     context.registerExercise(difficulty, id);
   }, [difficulty, context]); // ❌ context обект като dependency!
   ```

   **Проблем:** Context обектът се променя при всяка промяна на `exercises` array-а → useEffect се изпълнява → registerExercise → exercises се променят → loop!

   **✅ ПРАВИЛНО (Destructure Functions):**
   ```jsx
   const context = useExerciseContext();
   const { registerExercise, unregisterExercise, getStorageKey } = context;

   useEffect(() => {
     registerExercise(difficulty, id);
     return () => unregisterExercise(id);
   }, [difficulty, registerExercise, unregisterExercise]); // ✅ Стабилни функции!
   ```

   **Защо работи:** Функциите са мemoized с `useCallback` със стабилни dependencies, така че те НЕ се променят при всяко re-render.

   **⚠️ ВАЖНИ ПРАВИЛА:**

   1. **НЕ използвай context обект като dependency** - винаги destructure функциите!
   2. **НЕ съхранявай pathname в state** - използвай `getPathname()` callback вместо това
   3. **Memoize context value** с `useMemo` за да намалиш ненужните re-renders
   4. **Използвай useCallback** за функции в Context с празен/стабилен dependency array

   **🏗️ Архитектура:**

   ```
   MDXContent (wrapper)
   └── ExerciseProvider (Context)
       ├── exercises: ExerciseInfo[]
       ├── registerExercise(difficulty, id)
       ├── unregisterExercise(id)
       └── getStorageKey(id)
           │
           ├── ProgressTracker (чете от Context)
           │   └── Показва: X/Y completed, percentage
           │
           └── ExerciseCard (регистрира се в Context)
               ├── Auto-extracts heading
               ├── Auto-generates semantic ID
               ├── Registers with Context
               └── Saves completion to LocalStorage
   ```

   **💡 Best Practices:**

   - **НЕ задавай `exercises` prop на ProgressTracker** - автоматично!
   - **НЕ задавай `id` prop на ExerciseCard** - автоматично!
   - **Пиши стабилни заглавия** - променянето на заглавие променя ID
   - **Използвай описателни заглавия на български**
   - **Destructure функции от Context** - избягвай infinite loops!

   **⚠️ Backward Compatibility:**
   - Може да задаваш `id` prop ръчно (за миграция на стари exercises)
   - Ако `id` е зададен, той ще се използва вместо auto-generated

   **🔧 Troubleshooting:**

   - **"useExerciseContext must be used within ExerciseProvider"**: Изчисти `.docusaurus` cache
   - **"Maximum update depth exceeded"**: Проверете дали използвате context обект като dependency вместо destructured функции
   - **Прогресът не се актуализира**: Проверете дали `window.dispatchEvent(new Event('exerciseProgressChanged'))` се извиква след промяна

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

### Graph Density
- **Dense:** Many edges (close to maximum possible \(\frac\{n(n-1)\}\{2\}\)).
```

**❌ ГРЕШНО** (ще предизвика React 
JSX грешка):
```markdown

### Graph Density
- **Dense:** Many edges (close to maximum possible \(\frac{n(n-1)}{2}\)).

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

**⚠️ ВАЖНО: MDX Escaping за `<<` и `>>` Символи**

В MDX, символите `<<` и `>>` се интерпретират като JSX тагове и **ТРЯБВА да се escape-ват** извън code blocks!

**✅ ПРАВИЛНО:**
```markdown
- Разредени графи (E &lt;&lt; V²)
- Битово преместване надясно (x &gt;&gt; 2)
```

**❌ ГРЕШНО:**
```markdown
- Разредени графи (E << V²)  <!-- Ще предизвика MDX грешка! -->
```

**Важно:** В markdown code blocks (обградени с \`\`\`) не е нужно escape-ване:
```markdown
\`\`\`cpp
cout << "Hello" << endl;  // Това е ОК в code block
x = x >> 2;                // Това също е ОК
\`\`\`
```

**Типична грешка:**
```
Error: Unexpected character `<` (U+003C) before name, expected a character
that can start a name, such as a letter, `$`, or `_`
```

Това означава, че има неescaped `<<` или `>>` извън code block!

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

## React Context Architecture - Exercise Tracking System

### Автоматично Генериране и Управление на Упражнения

От **декември 2025**, цялата система за упражнения е **напълно автоматична** и базирана на **React Context API**.

**🎯 Zero Config Approach:**
- **НЕ** е нужно да задаваш `id` prop на `<ExerciseCard>`
- **НЕ** е нужно да задаваш `exercises` prop на `<ProgressTracker>`
- Всичко работи автоматично чрез Context!

### Техническа Имплементация

**1. ExerciseContext.tsx** - Централизирано управление на състоянието

```typescript
interface ExerciseInfo {
  id: string;           // Semantic ID
  difficulty: string;   // easy, medium, hard
  pathname: string;     // URL path за namespace
}

interface ExerciseContextType {
  exercises: ExerciseInfo[];
  registerExercise: (difficulty: string, semanticId: string) => void;
  unregisterExercise: (id: string) => void;
  getStorageKey: (id: string) => string;
}
```

**Критични имплементационни детайли:**
- `getPathname()` е `useCallback` функция, **НЕ** state (избягва re-renders)
- `registerExercise`, `unregisterExercise`, `getStorageKey` са memoized с `useCallback`
- Context value е memoized с `useMemo`
- `transliterateBulgarian()` и `slugify()` за генериране на IDs

**2. ExerciseCard.tsx** - Автоматична регистрация

**Auto-ID Generation Flow:**
1. `useEffect` при mount търси предходно H2/H3 заглавие с DOM traversal
2. Извлича текст: "Задача 1: Терминология на Графите"
3. Премахва префикс: "Терминология на Графите"
4. `slugify()` → `"terminologiya-na-grafite"`
5. `registerExercise(difficulty, id)` - регистрация в Context
6. Cleanup: `unregisterExercise(id)` при unmount

**⚠️ КРИТИЧНО - Правилни Dependencies:**
```typescript
// ✅ ПРАВИЛНО
const { registerExercise, unregisterExercise, getStorageKey } = context;

useEffect(() => {
  registerExercise(difficulty, id);
  return () => unregisterExercise(id);
}, [difficulty, registerExercise, unregisterExercise]); // Стабилни функции
```

**3. ProgressTracker.tsx** - Автоматично показване на прогреса

```typescript
const context = useExerciseContext();

const calculateProgress = () => {
  context.exercises.forEach(exercise => {
    const key = context.getStorageKey(exercise.id);
    if (localStorage.getItem(key) === 'true') count++;
  });
};
```

- Слуша за `exerciseProgressChanged` events
- Re-calculates при промяна на `context.exercises`
- Показва процент и брой завършени упражнения

**4. MDXContent Wrapper** - Автоматично обвиване

Docusaurus theme swizzle осигурява че всички MDX страници са обвити с Context:

```typescript
// src/theme/MDXContent/index.tsx
export default function MDXContentWrapper(props: Props): React.ReactElement {
  return (
    <ExerciseProvider>
      <MDXContent {...props} />
    </ExerciseProvider>
  );
}
```

### Миграция от Старо Решение

**Ако имаш стари exercises.md файлове с `exercises` prop:**

1. **Премахни `exercises` array от ProgressTracker:**
   ```markdown
   <!-- СТАРО -->
   <ProgressTracker exercises={[...]} />

   <!-- НOВО -->
   <ProgressTracker />
   ```

2. **Премахни `id` props от ExerciseCard-ове** (опционално):
   ```markdown
   <!-- СТАРО -->
   <ExerciseCard id="terminologiya-na-grafite" difficulty="easy">

   <!-- НОВО (автоматично генериране) -->
   <ExerciseCard difficulty="easy">
   ```

3. **Изчисти Docusaurus cache:**
   ```bash
   rm -rf docusaurus-site/.docusaurus
   npm start
   ```

### Troubleshooting Common Issues

**Issue 1: "useExerciseContext must be used within ExerciseProvider"**
- **Причина:** Docusaurus cache не е актуализиран
- **Решение:** `rm -rf .docusaurus && npm start`

**Issue 2: "Maximum update depth exceeded" (Infinite Loop)**
- **Причина:** Context обект като dependency в useEffect
- **Решение:** Destructure функциите от context
- **Пример:**
  ```typescript
  // ❌ ГРЕШНО
  }, [context]);

  // ✅ ПРАВИЛНО
  const { registerExercise } = context;
  }, [registerExercise]);
  ```

**Issue 3: Прогресът не се актуализира**
- **Причина:** `exerciseProgressChanged` event не се извиква
- **Решение:** След промяна в localStorage, извикай:
  ```typescript
  window.dispatchEvent(new Event('exerciseProgressChanged'));
  ```

## Best Practices

### Exercise System Best Practices

1. **Zero Config Approach** - НЕ задавай `id` на ExerciseCard и `exercises` на ProgressTracker
2. **Destructure Context Functions** - Винаги `const { registerExercise } = context;` за да избегнеш infinite loops
3. **Стабилни заглавия** - Променянето на заглавие променя ID и губи прогрес
4. **Описателни заглавия** - Използвай ясни български заглавия за автоматичното ID generation

### General Development Best Practices

5. **Използвай React компоненти** вместо обикновен markdown за по-добър UX
6. **Добавяй ресурси** към всяка лекция (tutorials, videos, practice problems)
7. **Включвай примери** с работещ C++ код
8. **Създавай визуализации** където е възможно (диаграми, схеми)
9. **Тествай локално** преди commit (`npm start`)
10. **Следвай naming conventions** за консистентност (XX-topic-name)
11. **Добавяй tags** за по-добра навигация и search
12. **Пиши на български** за съдържанието на лекциите
13. **Използвай английски** за код, променливи и технически термини
14. **Escape LaTeX брейсове** в MDX (`\{` и `\}`)
15. **Escape comparison operators** извън code blocks (`&lt;&lt;`, `&gt;&gt;`)
16. **Изчиствай cache** при странни грешки (`rm -rf .docusaurus`)

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

**Последна актуализация**: 2 Декември 2025

## Changelog

### 2 Декември 2025
- **React Context Architecture**: Пълна миграция към Context-based решение
- **Zero Config Approach**: Премахнато нуждата от `exercises` prop и ръчни IDs
- **Infinite Loop Prevention**: Документирани критични patterns за useEffect dependencies
- **Auto-ID Generation**: Semantic IDs базирани на DOM traversal на заглавия
- **MDX Theme Swizzling**: ExerciseProvider wrapper за всички MDX страници

### 28 Ноември 2025
- Първоначална документация за auto-generated IDs
- Миграционни скриптове за semantic IDs
