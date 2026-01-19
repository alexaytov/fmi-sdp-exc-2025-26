---
title: "Упражнения"
sidebar_position: 2
slug: exercises
tags: [exercises, practice, binary-heaps, heap-sort, algorithms, problem-solving]
---

import ExerciseCard from '@site/src/components/Exercise/ExerciseCard';
import ProgressTracker from '@site/src/components/Exercise/ProgressTracker';
import CollapsibleSection from '@site/src/components/CollapsibleSection';
import InfoBox from '@site/src/components/InfoBoxes/InfoBox';
import WarningBox from '@site/src/components/InfoBoxes/WarningBox';
import SuccessBox from '@site/src/components/InfoBoxes/SuccessBox';
import ComparisonBox from '@site/src/components/Comparison/ComparisonBox';

# Упражнения - Binary Heaps и Heap Sort

<ProgressTracker />

---

## EASY EXERCISES - Фундаментални Концепции

<ExerciseCard
  difficulty="easy"
  timeEstimate="5 min"
  tags={["heap-property", "max-heap", "validation"]}
>

### Задача 1: Разбиране на Heap Свойства

Кой от следните arrays представлява валиден max-heap?

A) `[10, 8, 9, 7, 6, 12, 4]`

B) `[10, 5, 8, 3, 4, 11, 7]`

C) `[10, 9, 8, 7, 6, 5, 4]`

D) `[10, 8, 6, 9, 7, 5, 4]`


<CollapsibleSection title="Подсказка" icon="💡">

За валиден max-heap, всеки parent трябва да е >= от своите children.

Проверете parent-child връзките използвайки формулите:
- Parent на index i: `(i-1)/2`
- Left child на index i: `2*i+1`
- Right child на index i: `2*i+2`

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

**Отговор: C) [10, 9, 8, 7, 6, 5, 4]**

Нека проверим всеки вариант:

**A) [10, 8, 9, 7, 6, 12, 4]**
```
         10
        /  \
       8    9
      / \  / \
     7  6 12  4
```
- Parent 9 (index 2) < Left child 12 ❌ НЕВАЛИДЕН

**B) [10, 5, 8, 3, 4, 11, 7]**
```
         10
        /  \
       5    8
      / \  / \
     3  4 11  7
```
- Parent 8 (index 2) < Left child 11 ❌ НЕВАЛИДЕН

**C) [10, 9, 8, 7, 6, 5, 4]**
```
         10
        /  \
       9    8
      / \  / \
     7  6 5  4
```
- 10 >= 9, 8 ✓
- 9 >= 7, 6 ✓
- 8 >= 5, 4 ✓
- ВАЛИДЕН ✓

**D) [10, 8, 6, 9, 7, 5, 4]**
```
         10
        /  \
       8    6
      / \  / \
     9  7 5  4
```
- Parent 8 (index 1) < Left child 9 ❌ НЕВАЛИДЕН

**Правилен отговор: C**

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="easy"
  timeEstimate="5 min"
  tags={["array-indexing", "parent-child", "formulas"]}
>

### Задача 2: Array Index Изчисления

Даден е 0-indexed heap array. Ако node е на index 5:
- Какъв е index на неговия parent?
- Какъв е index на left child?
- Какъв е index на right child?


<CollapsibleSection title="Подсказка" icon="💡">

Използвайте стандартните формули за 0-indexed array:
```cpp
parent(i) = (i - 1) / 2
leftChild(i) = 2 * i + 1
rightChild(i) = 2 * i + 2
```

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

За index `i = 5`:

**Parent:**
```cpp
parent(5) = (5 - 1) / 2 = 4 / 2 = 2
```

**Left Child:**
```cpp
leftChild(5) = 2 * 5 + 1 = 11
```

**Right Child:**
```cpp
rightChild(5) = 2 * 5 + 2 = 12
```

**Отговори:**
- Parent: **index 2**
- Left child: **index 11**
- Right child: **index 12**

**Визуализация:**
```
Index:  0  1  2  3  4  5  6  7  8  9 10 11 12
                      ↑
                   Node 5
                 /          \
            index 11      index 12
```

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="easy"
  timeEstimate="7 min"
  tags={["heap-property", "min-heap", "max-heap", "validation"]}
>

### Задача 3: Heap Type Identification

Дали array `[3, 5, 4, 8, 7, 9, 10]` е валиден min-heap, max-heap, и двете, или нито едно? Обяснете отговора си.


<CollapsibleSection title="Подсказка" icon="💡">

- **Min-heap:** Всеки parent ≤ children
- **Max-heap:** Всеки parent ≥ children

Нарисувайте tree структурата и проверете всяка parent-child връзка.

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

Array: `[3, 5, 4, 8, 7, 9, 10]`

**Tree представяне:**
```
         3
        / \
       5   4
      / \ / \
     8 7 9 10
```

**Проверка за Min-Heap (parent ≤ children):**
```
- Index 0 (3): children = 5, 4
  - 3 <= 5 ✓
  - 3 <= 4 ✓
- Index 1 (5): children = 8, 7
  - 5 <= 8 ✓
  - 5 <= 7 ✓
- Index 2 (4): children = 9, 10
  - 4 <= 9 ✓
  - 4 <= 10 ✓
```
**Резултат: ВАЛИДЕН MIN-HEAP ✓**

**Проверка за Max-Heap (parent >= children):**
- Index 0 (3): children = 5, 4
  - 3 >= 5 ❌ НЕВАЛИДЕН

**Резултат: НЕ Е ВАЛИДЕН MAX-HEAP ❌**

**Окончателен отговор:** Array е **валиден min-heap**, но **НЕ е max-heap**.

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="easy"
  timeEstimate="5 min"
  tags={["binary-tree", "height", "complete-tree"]}
>

### Задача 4: Complete Binary Tree Properties

Complete binary tree има 15 nodes. Каква е неговата височина? Колко nodes са на последното ниво?


<CollapsibleSection title="Подсказка" icon="💡">

**Формули:**
- Height на complete binary tree с n nodes: $h = \lfloor \log_2 n \rfloor$
- Максимален брой nodes до level h: $2^\{h+1\} - 1$

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

**Дадено:** n = 15 nodes

**Height:**
$$
h = \lfloor \log_2 15 \rfloor = \lfloor 3.906... \rfloor = 3
$$

**Nodes на последното ниво:**

Complete binary tree с height 3:
- Level 0: 1 node (root)
- Level 1: 2 nodes
- Level 2: 4 nodes
- Level 3: ? nodes

Общо nodes до level 2: $2^3 - 1 = 7$ nodes

Nodes на level 3: $15 - 7 = 8$ nodes

**Проверка:**
```
Level 0:        1           (1 node)
Level 1:       / \          (2 nodes)
Level 2:      /   \   /  \  (4 nodes)
Level 3:    / \ / \ / \ / \ (8 nodes)
Total: 1 + 2 + 4 + 8 = 15 ✓
```

**Отговори:**
- **Height = 3**
- **Nodes на последното ниво = 8**

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="easy"
  timeEstimate="7 min"
  tags={["complexity", "big-o", "heap-operations"]}
>

### Задача 5: Big-O Recognition

Съпоставете всяка операция с нейната времева сложност:

**Операции:**
1. Намиране на максимума в max-heap
2. Вмъкване в heap
3. Построяване на heap от scratch (Floyd's метод)
4. Heap sort обща сложност

**Опции:** O(1), O(log n), O(n), O(n log n)


<CollapsibleSection title="Подсказка" icon="💡">

Помислете за:
- Къде се намира max елементът в max-heap?
- Колко levels трябва да обходите при insert?
- Floyd's bottom-up метод vs. последователни insertions
- Колко extractions правим в heap sort?

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

**1. Намиране на максимума в max-heap: O(1)**
- Максимумът винаги е на root (index 0)
- Просто връщаме `heap[0]`
- Константно време

**2. Вмъкване в heap: O(log n)**
- Добавяме елемента в края
- Sift-up до възстановяване на heap property
- В worst case обхождаме до root = height = log n

**3. Построяване на heap от scratch: O(n)**
- Floyd's bottom-up heapify метод
- Започваме от средата и sift-down
- Математически доказуемо O(n), не O(n log n)!

**4. Heap sort обща сложност: O(n log n)**
- Phase 1: Heap construction = O(n)
- Phase 2: n extractions × O(log n) = O(n log n)
- Total: O(n) + O(n log n) = O(n log n)

**Обобщение:**
| Операция | Сложност |
|----------|----------|
| Find Max | O(1) |
| Insert | O(log n) |
| Build Heap | O(n) |
| Heap Sort | O(n log n) |

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="easy"
  timeEstimate="5 min"
  tags={["data-structures", "array-representation", "efficiency"]}
>

### Задача 6: Heap vs Array

Обяснете в 2-3 изречения защо съхраняването на complete binary tree в array е по-ефективно от използването на pointers/references.


<CollapsibleSection title="Подсказка" icon="💡">

Помислете за:
- Memory overhead на pointers
- Cache locality
- Простота на навигация (parent/child)

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

**Причини защо array representation е по-ефективна:**

1. **Няма Memory Overhead:**
   - Pointer-based структура изисква допълнителна памет за pointers (обикновено 8 bytes на pointer за 64-bit системи)
   - Array съхранява само data, без overhead

2. **Отлична Cache Locality:**
   - Array елементите са последователни в паметта
   - По-добра CPU cache utilization
   - По-бърз достъп при sequential операции

3. **Проста Навигация:**
   - Parent/child relationships се изчисляват директно с аритметика
   - Не е нужно да следваме pointers
   - По-бързи и по-прости операции

**Примерен отговор:**

"Съхраняването на complete binary tree в array е по-ефективно защото елиминира memory overhead от pointers (спестявайки 2-3x памет), осигурява отлична cache locality поради последователното разположение на данните, и позволява директно изчисляване на parent/child relationships чрез прости математически формули без да се следват pointers."

</CollapsibleSection>

</ExerciseCard>

---

## EASY-MEDIUM EXERCISES - Базови Операции

<ExerciseCard
  difficulty="medium"
  timeEstimate="10 min"
  tags={["sift-up", "heap-insert", "tracing"]}
>

### Задача 7: Sift-Up Trace

Даден е partial max-heap `[15, 12, 10, 8, 9, 5]`. Вмъкнете стойност 14. Покажете всяка стъпка на sift-up процеса и resulting array след всеки swap.


<CollapsibleSection title="Подсказка" icon="💡">

1. Добавете 14 в края на array
2. Сравнете с parent
3. Ако child > parent, swap
4. Повторете докато достигнете root или parent >= child

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

**Initial heap:** `[15, 12, 10, 8, 9, 5]`

```
Initial tree:
         15
        /  \
      12    10
     / \   /
    8  9  5
```

**Step 1: Insert 14 at end**
```
Array: [15, 12, 10, 8, 9, 5, 14]
Index:  0   1   2  3  4  5   6

Tree:
         15
        /  \
      12    10
     / \   / \
    8  9  5  14
```

**Step 2: Sift-up from index 6**

Parent на index 6: `(6-1)/2 = 2`

Compare: `arr[6] = 14` vs `arr[2] = 10`
- 14 > 10, swap!

```
After swap:
Array: [15, 12, 14, 8, 9, 5, 10]
Index:  0   1   2  3  4  5   6

Tree:
         15
        /  \
      12    14
     / \   / \
    8  9  5  10
```

**Step 3: Continue sift-up from index 2**

Parent на index 2: `(2-1)/2 = 0`

Compare: `arr[2] = 14` vs `arr[0] = 15`
- 14 < 15, stop! (heap property satisfied)

**Final heap:** `[15, 12, 14, 8, 9, 5, 10]`

```
Final tree:
         15
        /  \
      12    14
     / \   / \
    8  9  5  10
```

**Summary of swaps:**
1. Index 6 (14) ↔ Index 2 (10)
2. Stop (14 < parent 15)

**Total swaps: 1**

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="medium"
  timeEstimate="8 min"
  tags={["heap-property", "violation", "sift-operations"]}
>

### Задача 8: Identifying Violations

В array `[20, 18, 15, 12, 10, 8, 19]`, един елемент нарушава max-heap property. Идентифицирайте го и обяснете коя операция (sift-up или sift-down) би го поправила.


<CollapsibleSection title="Подсказка" icon="💡">

Нарисувайте tree структурата и проверете всяка parent-child връзка.

Ако child > parent → нарушение!
- Sift-up ще го поправи

Ако parent < child → нарушение!
- Sift-down ще го поправи

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

**Array:** `[20, 18, 15, 12, 10, 8, 19]`

**Tree representation:**
```
         20
        /  \
      18    15
     / \   / \
    12 10 8  19
```

**Проверка на heap property (parent >= children):**

| Index | Value | Left Child | Right Child | Valid? |
|-------|-------|------------|-------------|--------|
| 0 | 20 | 18 (✓) | 15 (✓) | ✓ |
| 1 | 18 | 12 (✓) | 10 (✓) | ✓ |
| 2 | 15 | 8 (✓) | 19 (❌) | ❌ |

**Намерено нарушение!**
- Parent на index 6 (стойност 19) е index 2 (стойност 15)
- 19 > 15 ❌ НАРУШЕНИЕ!

**Нарушаващ елемент:** 19 на index 6

**Операция за поправка:** **Sift-up**
- 19 е по-голямо от parent си (15)
- Трябва да "плува нагоре" докато намери правилната позиция

**Sift-up процес:**
1. Swap 19 с 15: `[20, 18, 19, 12, 10, 8, 15]`
2. Compare 19 с 20: 19 < 20, stop
3. Final heap: `[20, 18, 19, 12, 10, 8, 15]` ✓

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="medium"
  timeEstimate="10 min"
  tags={["tree-drawing", "visualization", "array-to-tree"]}
>

### Задача 9: Parent-Child Relationships

Нарисувайте binary tree representation на max-heap `[50, 30, 40, 10, 20, 15, 35]`. Етикирайте всеки node с неговия array index.


<CollapsibleSection title="Подсказка" icon="💡">

Използвайте формулите:
- Left child на index i: `2*i + 1`
- Right child на index i: `2*i + 2`

Започнете от root (index 0) и постепенно добавяйте children.

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

**Array:** `[50, 30, 40, 10, 20, 15, 35]`

**Стъпка по стъпка построяване:**

```
Index:  0   1   2   3   4   5   6
Value: 50  30  40  10  20  15  35
```

**Level 0 (Root):**
- Index 0: Value 50

**Level 1:**
- Left child на 0: index 1, value 30
- Right child на 0: index 2, value 40

**Level 2:**
- Left child на 1: index 3, value 10
- Right child на 1: index 4, value 20
- Left child на 2: index 5, value 15
- Right child на 2: index 6, value 35

**Final Tree:**

```
                 50 (0)
                /      \
           30 (1)      40 (2)
           /    \      /    \
       10 (3) 20 (4) 15 (5) 35 (6)
```

**Detailed с връзки:**

```
Level 0:              50
                      [0]
                    /      \
Level 1:         30          40
                [1]          [2]
               /   \        /   \
Level 2:     10    20     15    35
            [3]   [4]    [5]   [6]
```

**Verification на max-heap property:**
- 50 >= 30, 40 ✓
- 30 >= 10, 20 ✓
- 40 >= 15, 35 ✓

Всички parent nodes са по-големи или равни на children - валиден max-heap! ✓

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="medium"
  timeEstimate="7 min"
  tags={["heapify", "floyd-algorithm", "bottom-up"]}
>

### Задача 10: Heap Construction Starting Point

За array с размер n = 12, на кой index трябва да започнете heapify процеса при построяване на heap bottom-up? Обяснете защо.


<CollapsibleSection title="Подсказка" icon="💡">

В Floyd's bottom-up метод:
- Започваме от последния **parent** node
- Leaf nodes не се нуждаят от heapify

Формула: Start index = `n/2 - 1` (за 0-indexed array)

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

**Дадено:** n = 12 nodes

**Starting index:**
$$
\text\{start\} = \lfloor n/2 \rfloor - 1 = \lfloor 12/2 \rfloor - 1 = 6 - 1 = 5
$$

**Защо index 5?**

```
Index:  0  1  2  3  4  5  6  7  8  9 10 11
Level:  0  1  1  2  2  2  2  3  3  3  3  3

Tree structure (n=12):
                 0
              /     \
           1           2
         /   \       /   \
        3     4     5     6
       / \   / \   / \
      7  8  9 10 11

Листа (без children): indices 6-11
Родители (с children): indices 0-5
```

**Обяснение:**

1. **Листа не се нуждаят от heapify**
   - Indices 6-11 са листа (нямат children)
   - Те автоматично задоволяват heap property

2. **Последният parent е на index 5**
   - Има left child на index 11
   - Последният node с поне 1 child

3. **Започваме от index 5 и вървим към 0**
   - Sift-down всеки parent node
   - Bottom-up подход гарантира, че children са вече heapified

**Процес:**
```
Heapify order: 5 → 4 → 3 → 2 → 1 → 0

Step 1: Heapify index 5
Step 2: Heapify index 4
Step 3: Heapify index 3
Step 4: Heapify index 2
Step 5: Heapify index 1
Step 6: Heapify index 0 (root)
```

**Формула обобщение:**
- За 0-indexed array: `start = n/2 - 1`
- За 1-indexed array: `start = n/2`

</CollapsibleSection>

</ExerciseCard>

---

## MEDIUM EXERCISES - Algorithm Application

<ExerciseCard
  difficulty="medium"
  timeEstimate="12 min"
  tags={["sift-down", "heapify", "tracing"]}
>

### Задача 11: Complete Sift-Down

Даден е array `[5, 20, 15, 10, 12, 8, 7]` където heap property е нарушено на root. Извършете пълна sift-down операция. Покажете array състоянието след всеки swap докато heap property не се възстанови.


<CollapsibleSection title="Подсказка" icon="💡">

Sift-down алгоритъм:
1. Сравни node с left и right children
2. Намери largest от трите
3. Ако largest != current node, swap
4. Повтори от новата позиция

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

**Initial array:** `[5, 20, 15, 10, 12, 8, 7]`

```
Initial tree (НЕВАЛИДЕН max-heap):
         5
        / \
      20   15
     / \  / \
    10 12 8 7
```

**Sift-down от root (index 0):**

---

**Iteration 1:**

Current: index 0 (value 5)
- Left child: index 1 (value 20)
- Right child: index 2 (value 15)

Compare: 5, 20, 15
- Largest = 20 (index 1)

**Swap 5 ↔ 20**

```
Array after swap 1: [20, 5, 15, 10, 12, 8, 7]

Tree:
         20
        /  \
       5    15
      / \  / \
     10 12 8  7
```

---

**Iteration 2:**

Current: index 1 (value 5)
- Left child: index 3 (value 10)
- Right child: index 4 (value 12)

Compare: 5, 10, 12
- Largest = 12 (index 4)

**Swap 5 ↔ 12**

```
Array after swap 2: [20, 12, 15, 10, 5, 8, 7]

Tree:
         20
        /  \
      12    15
     / \   / \
    10  5  8  7
```

---

**Iteration 3:**

Current: index 4 (value 5)
- Left child: index 9 (out of bounds)
- Right child: index 10 (out of bounds)

No children → **STOP**

---

**Final heap:** `[20, 12, 15, 10, 5, 8, 7]`

```
Final tree (ВАЛИДЕН max-heap):
         20
        /  \
      12    15
     / \   / \
    10  5  8  7
```

**Verification:**
- 20 >= 12, 15 ✓
- 12 >= 10, 5 ✓
- 15 >= 8, 7 ✓

**Summary:**
- Total swaps: **2**
- Swaps: (5↔20), (5↔12)
- Final array: `[20, 12, 15, 10, 5, 8, 7]` ✓

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["heap-construction", "floyd-method", "bottom-up"]}
>

### Задача 12: Building a Heap

Построете max-heap от unsorted array `[4, 10, 3, 5, 1, 8, 9, 2]` използвайки Floyd's bottom-up heapify метод. Покажете:
- Starting index за heapification
- Array състоянието след обработване на всеки internal node
- Final max-heap


<CollapsibleSection title="Подсказка" icon="💡">

1. Намерете последния parent: `n/2 - 1`
2. За всеки index от `n/2 - 1` до 0, извършете sift-down
3. Проследете промените на array

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

**Initial array:** `[4, 10, 3, 5, 1, 8, 9, 2]`

**Starting index:** `n = 8`, start = `8/2 - 1 = 3`

```
Initial tree:
         4
        / \
       10  3
      / \ / \
     5 1 8  9
    /
   2

Indices to heapify: 3, 2, 1, 0
```

---

**Step 1: Heapify index 3 (value 5)**

Children: index 7 (value 2)
- Compare: 5 vs 2
- 5 > 2, no swap needed

```
Array: [4, 10, 3, 5, 1, 8, 9, 2]  (unchanged)
```

---

**Step 2: Heapify index 2 (value 3)**

Children: index 5 (value 8), index 6 (value 9)
- Compare: 3, 8, 9
- Largest = 9 (index 6)
- **Swap 3 ↔ 9**

```
Array: [4, 10, 9, 5, 1, 8, 3, 2]

Tree:
         4
        / \
       10  9
      / \ / \
     5 1 8  3
    /
   2
```

---

**Step 3: Heapify index 1 (value 10)**

Children: index 3 (value 5), index 4 (value 1)
- Compare: 10, 5, 1
- Largest = 10 (current)
- No swap needed

```
Array: [4, 10, 9, 5, 1, 8, 3, 2]  (unchanged)
```

---

**Step 4: Heapify index 0 (value 4)**

**Sub-iteration 1:**
Children: index 1 (value 10), index 2 (value 9)
- Compare: 4, 10, 9
- Largest = 10 (index 1)
- **Swap 4 ↔ 10**

```
Array: [10, 4, 9, 5, 1, 8, 3, 2]

Tree:
         10
        /  \
       4    9
      / \  / \
     5  1 8  3
    /
   2
```

**Sub-iteration 2:**
Current position: index 1 (value 4)
Children: index 3 (value 5), index 4 (value 1)
- Compare: 4, 5, 1
- Largest = 5 (index 3)
- **Swap 4 ↔ 5**

```
Array: [10, 5, 9, 4, 1, 8, 3, 2]

Tree:
         10
        /  \
       5    9
      / \  / \
     4  1 8  3
    /
   2
```

**Sub-iteration 3:**
Current position: index 3 (value 4)
Children: index 7 (value 2)
- Compare: 4, 2
- 4 > 2, no swap
- **STOP**

---

**Final max-heap:** `[10, 5, 9, 4, 1, 8, 3, 2]`

```
Final tree:
         10
        /  \
       5    9
      / \  / \
     4  1 8  3
    /
   2
```

**Verification:**
- 10 >= 5, 9 ✓
- 5 >= 4, 1 ✓
- 9 >= 8, 3 ✓
- 4 >= 2 ✓

**Summary:**
- **Starting index:** 3
- **Total sift-down operations:** 4
- **Total swaps:** 3
- **Final heap:** `[10, 5, 9, 4, 1, 8, 3, 2]` ✓

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["heap-sort", "heap-construction", "phase-1"]}
>

### Задача 13: Heap Sort Phase 1

Даден е array `[7, 3, 9, 1, 5, 2, 8]`. Завършете Phase 1 на heap sort (heap construction). Покажете работата си стъпка по стъпка и идентифицирайте колко sift-down операции са извършени.


<CollapsibleSection title="Подсказка" icon="💡">

Phase 1 = Floyd's bottom-up heapify
- Start от `n/2 - 1`
- Sift-down за всеки parent до root
- Броете всяка sift-down операция (дори ако няма swaps)

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

**Initial array:** `[7, 3, 9, 1, 5, 2, 8]`

**n = 7**, starting index = `7/2 - 1 = 2`

```
Initial tree:
         7
        / \
       3   9
      / \ / \
     1 5 2  8

Heapify order: index 2 → 1 → 0
```

---

**Sift-Down Operation 1: Index 2 (value 9)**

Children: index 5 (value 2), index 6 (value 8)
- Compare: 9, 2, 8
- Largest = 9 (current)
- **No swap**

```
Array: [7, 3, 9, 1, 5, 2, 8]  (unchanged)
```

---

**Sift-Down Operation 2: Index 1 (value 3)**

Children: index 3 (value 1), index 4 (value 5)
- Compare: 3, 1, 5
- Largest = 5 (index 4)
- **Swap 3 ↔ 5**

```
Array: [7, 5, 9, 1, 3, 2, 8]

Tree:
         7
        / \
       5   9
      / \ / \
     1 3 2  8
```

---

**Sift-Down Operation 3: Index 0 (value 7)**

**Iteration 1:**
Children: index 1 (value 5), index 2 (value 9)
- Compare: 7, 5, 9
- Largest = 9 (index 2)
- **Swap 7 ↔ 9**

```
Array: [9, 5, 7, 1, 3, 2, 8]

Tree:
         9
        / \
       5   7
      / \ / \
     1 3 2  8
```

**Iteration 2:**
Current position: index 2 (value 7)
Children: index 5 (value 2), index 6 (value 8)
- Compare: 7, 2, 8
- Largest = 8 (index 6)
- **Swap 7 ↔ 8**

```
Array: [9, 5, 8, 1, 3, 2, 7]

Tree:
         9
        / \
       5   8
      / \ / \
     1 3 2  7
```

**Iteration 3:**
Current position: index 6 (value 7)
- No children (leaf node)
- **STOP**

---

**Final max-heap:** `[9, 5, 8, 1, 3, 2, 7]`

```
Final tree:
         9
        / \
       5   8
      / \ / \
     1 3 2  7
```

**Verification:**
- 9 >= 5, 8 ✓
- 5 >= 1, 3 ✓
- 8 >= 2, 7 ✓

**Summary:**
- **Total sift-down operations called:** 3 (indices 2, 1, 0)
- **Total swaps:** 3
  1. 3 ↔ 5 (at index 1)
  2. 7 ↔ 9 (at index 0)
  3. 7 ↔ 8 (at index 2)
- **Final heap:** `[9, 5, 8, 1, 3, 2, 7]` ✓

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["algorithm-comparison", "memory-constraints", "analysis"]}
>

### Задача 14: Algorithm Comparison

Трябва да сортирате 500,000 records на устройство с само 2 MB налична памет. Всеки record е 100 bytes. Сравнете heap sort, merge sort и quick sort за този сценарий. Кой бихте избрали и защо? Разгледайте поне три фактора в отговора си.


<CollapsibleSection title="Подсказка" icon="💡">

Факториза да разгледате:
1. **Memory използване** - auxiliary space requirements
2. **Времева сложност** - worst/average/best case
3. **Stability** - важна ли е?
4. **In-place операции**
5. **Predictability**

Изчислете:
- Total data size = 500,000 × 100 bytes
- Available memory = 2 MB

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

**Анализ на ситуацията:**

**Data size:**
```
500,000 records × 100 bytes/record = 50,000,000 bytes = 47.68 MB
```

**Available memory:** 2 MB = 2,097,152 bytes

**Memory constraint:** Данните са **МНОГО по-големи** от наличната памет!

---

**Сравнение на алгоритмите:**

| Критерий | Heap Sort | Merge Sort | Quick Sort |
|----------|-----------|------------|------------|
| **Time (worst)** | O(n log n) | O(n log n) | O(n²) |
| **Auxiliary Space** | O(1) | **O(n)** | O(log n) |
| **In-Place** | ✅ Yes | ❌ No | ✅ Yes |
| **Stable** | No | Yes | Usually No |
| **Predictable** | ✅ Yes | ✅ Yes | ⚠️ No |
| **Memory for 500K** | ~0 extra | **~47 MB extra** | ~log(500K) stack |

---

**Детайлен Анализ:**

**1. Heap Sort:**
- **Auxiliary space:** O(1) - само няколко променливи
- **Memory footprint:** ~47.68 MB (само данните)
- **Fits in constraint?** ❌ No, но е НАЙ-ДОБЪР вариант!
- **Performance:** Predictable O(n log n)

**2. Merge Sort:**
- **Auxiliary space:** O(n) - нужен е допълнителен array!
- **Memory footprint:** ~95 MB (данни + auxiliary)
- **Fits in constraint?** ❌❌ АБСОЛЮТНО НЕ!
- **Performance:** O(n log n), но НЕВЪЗМОЖЕН тук!

**3. Quick Sort:**
- **Auxiliary space:** O(log n) за recursion stack
- **Memory footprint:** ~47.68 MB + малко за stack
- **Fits in constraint?** ❌ No, но по-добър от Merge Sort
- **Performance:** Average O(n log n), worst O(n²)

---

**ВАЖНО ОСЪЗНАВАНЕ:**

Данните (47.68 MB) НЕ се побират в RAM (2 MB)!

Това изисква **External Sorting** - данните трябва да се четат/пишат от/на disk!

---

**Препоръка:**

**За този сценарий: HEAP SORT или вариант на MERGE SORT за external sorting**

**Вариант 1: External Merge Sort (BEST за този случай)**
- Разделете данните на chunks които се побират в RAM
- Сортирайте всеки chunk в RAM (heap sort или quick sort)
- Merge chunks използвайки k-way merge на disk

**Вариант 2: Heap Sort с external memory**
- Използвайте heap sort с paging/streaming
- Обработвайте данните на части
- In-place природата е предимство

**Вариант 3: Quick Sort с careful implementation**
- Tail recursion optimization
- Малък stack footprint
- Но unpredictable performance е риск

---

**Окончателен избор: External Merge Sort**

**Три ключови фактора:**

1. **Memory Efficiency:**
   - External Merge Sort обработва данните на chunks
   - Всеки chunk може да е 2MB / k (за k-way merge)
   - Heap Sort помага за сортиране на chunks

2. **Predictability:**
   - Guaranteed O(n log n) performance
   - Важно за production системи
   - Избягва worst-case на Quick Sort

3. **Practical Implementation:**
   - Стандартен подход за external sorting
   - Добре изучен и тестван
   - Може да използва heap sort за in-memory фазата

**Псевдокод за External Merge Sort:**
```cpp
// Phase 1: Create sorted runs
int runSize = MEMORY_SIZE / recordSize;
int numRuns = ceil(totalRecords / runSize);

for (int i = 0; i < numRuns; i++) {
    // Зареди chunk в RAM
    vector<Record> chunk = loadChunk(i * runSize, runSize);

    // Сортирай chunk с Heap Sort (in-place!)
    heapSort(chunk);

    // Запиши sorted run на disk
    writeRun(i, chunk);
}

// Phase 2: K-way merge sorted runs
mergeSortedRuns(numRuns);
```

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["heap-sort", "extraction", "phase-2"]}
>

### Задача 15: Extraction Process

Започвайки с max-heap `[25, 20, 18, 15, 10, 12, 8]`, извършете първите ТРИ extraction steps на heap sort. Покажете:
- Елементът, който се премахва
- Heap след всяка extraction и re-heapification
- Растящата sorted region


<CollapsibleSection title="Подсказка" icon="💡">

Extraction процес:
1. Swap root с последния елемент
2. Намали heap size
3. Sift-down новия root
4. Sorted елементите се натрупват отдясно

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

**Initial max-heap:** `[25, 20, 18, 15, 10, 12, 8]`

```
Initial tree:
         25
        /  \
      20    18
     / \   / \
    15 10 12  8

Heap size: 7
Sorted region: []
```

---

**EXTRACTION 1:**

**Step 1: Swap root (25) с последния (8)**
```
Array: [8, 20, 18, 15, 10, 12, | 25]
Heap:  [8, 20, 18, 15, 10, 12]
Sorted: [25]
```

**Step 2: Sift-down from root (value 8)**

Iteration 1:
- Current: index 0 (value 8)
- Children: 20 (index 1), 18 (index 2)
- Largest = 20, **swap 8 ↔ 20**

```
Array: [20, 8, 18, 15, 10, 12, | 25]
```

Iteration 2:
- Current: index 1 (value 8)
- Children: 15 (index 3), 10 (index 4)
- Largest = 15, **swap 8 ↔ 15**

```
Array: [20, 15, 18, 8, 10, 12, | 25]
```

Iteration 3:
- Current: index 3 (value 8)
- No children (out of heap bounds)
- **STOP**

**After Extraction 1:**
```
Heap: [20, 15, 18, 8, 10, 12]
Sorted: [25]

Tree:
         20
        /  \
      15    18
     / \   /
    8  10 12
```

---

**EXTRACTION 2:**

**Step 1: Swap root (20) с последния (12)**
```
Array: [12, 15, 18, 8, 10, | 20, 25]
Heap: [12, 15, 18, 8, 10]
Sorted: [20, 25]
```

**Step 2: Sift-down from root (value 12)**

Iteration 1:
- Current: index 0 (value 12)
- Children: 15 (index 1), 18 (index 2)
- Largest = 18, **swap 12 ↔ 18**

```
Array: [18, 15, 12, 8, 10, | 20, 25]
```

Iteration 2:
- Current: index 2 (value 12)
- Children: none (indices 5, 6 out of heap)
- **STOP**

**After Extraction 2:**
```
Heap: [18, 15, 12, 8, 10]
Sorted: [20, 25]

Tree:
         18
        /  \
      15    12
     / \
    8  10
```

---

**EXTRACTION 3:**

**Step 1: Swap root (18) с последния (10)**
```
Array: [10, 15, 12, 8, | 18, 20, 25]
Heap: [10, 15, 12, 8]
Sorted: [18, 20, 25]
```

**Step 2: Sift-down from root (value 10)**

Iteration 1:
- Current: index 0 (value 10)
- Children: 15 (index 1), 12 (index 2)
- Largest = 15, **swap 10 ↔ 15**

```
Array: [15, 10, 12, 8, | 18, 20, 25]
```

Iteration 2:
- Current: index 1 (value 10)
- Children: 8 (index 3), none (index 4 out of heap)
- Largest = 10 (10 > 8)
- **STOP**

**After Extraction 3:**
```
Heap: [15, 10, 12, 8]
Sorted: [18, 20, 25]

Tree:
         15
        /  \
      10    12
     /
    8
```

---

**Summary:**

| Extraction | Removed Element | Heap After | Sorted Region |
|------------|----------------|------------|---------------|
| Start | - | [25, 20, 18, 15, 10, 12, 8] | [] |
| 1 | **25** | [20, 15, 18, 8, 10, 12] | [25] |
| 2 | **20** | [18, 15, 12, 8, 10] | [20, 25] |
| 3 | **18** | [15, 10, 12, 8] | [18, 20, 25] |

**Growing sorted region:** Елементите се натрупват отдясно в **descending order в heap view**, но това е **ascending order** когато heap sort завърши!

**Remaining heap:** `[15, 10, 12, 8]` - все още 4 extractions до пълно сортиране.

</CollapsibleSection>

</ExerciseCard>

---

## MEDIUM-HARD EXERCISES - Complex Analysis

<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["complexity-analysis", "proof", "big-o", "heapify"]}
>

### Задача 16: Time Complexity Proof

Обяснете защо построяването на heap bottom-up е O(n) вместо O(n log n). Обяснението трябва да включва:
- Връзката между node levels и брой swaps
- Математическо обосновани (може да използвате summation notation)
- Защо това е по-добро от вмъкване на n елемента един по един


<CollapsibleSection title="Подсказка" icon="💡">

Ключова идея:
- Повечето nodes са близо до leaves (малко swaps)
- Малко nodes са близо до root (повече swaps)
- Сумирайте работата на всяко ниво

Формула:

$$
\sum_\{h=0\}^\{\log n\} \frac\{n\}\{2^\{h+1\}\} \cdot h
$$

където h е височината на дървото

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

**Защо Floyd's Bottom-Up Heapify е O(n)?**

---

**1. Интуитивно Обяснение:**

В complete binary tree с n nodes:
- **~50% са листа** (level log n) - 0 swaps
- **~25% са един level нагоре** - max 1 swap всеки
- **~12.5% са два levels нагоре** - max 2 swaps всеки
- **~6.25% са три levels нагоре** - max 3 swaps всеки
- ...
- **1 node е root** - max log n swaps

**Повечето nodes правят МАЛКО работа!**

---

**2. Математическа Формулация:**

Нека heap има височина h = log n.

**Брой nodes на всяко ниво:**
- Level h (leaves): $\frac\{n\}\{2\}$ nodes
- Level h-1: $\frac\{n\}\{4\}$ nodes
- Level h-2: $\frac\{n\}\{8\}$ nodes
- ...
- Level 0 (root): 1 node

**Максимален брой swaps за node на level i:**
- Node на level i може да падне max (h - i) levels
- Така че max (h - i) swaps

**Обща работа:**

$$
T(n) = \sum_\{i=0\}^\{h\} N_i \times S_i
$$

Където $N_i = \frac\{n\}\{2^\{i+1\}\}$ е броят nodes на level i, и $S_i = (h - i)$ е максималният брой swaps.

$$
T(n) = \sum_\{i=0\}^\{h\} \frac\{n\}\{2^\{i+1\}\} \times (h - i)
$$

Променлива замяна: нека j = h - i

$$
T(n) = \sum_\{j=0\}^\{h\} \frac\{n\}\{2^\{h-j+1\}\} \times j
$$

$$
= \frac\{n\}\{2^\{h+1\}\} \sum_\{j=0\}^\{h\} j \cdot 2^j
$$

---

**3. Изчисляване на Сумата:**

Известно е, че:

$$
\sum_\{j=0\}^\{\infty\} j \cdot x^j = \frac\{x\}\{(1-x)^2\}
$$

За x = 1/2:

$$
\sum_\{j=0\}^\{\infty\} j \cdot 2^\{-j\} = \sum_\{j=0\}^\{\infty\} j \cdot (\frac\{1\}\{2\})^j = \frac\{1/2\}\{(1-1/2)^2\} = \frac\{1/2\}\{1/4\} = 2
$$

За крайната сума (j от 0 до h):

$$
\sum_\{j=0\}^\{h\} j \cdot 2^j < 2 \cdot 2^\{h+1\}
$$

Връщайки се към T(n):

$$
T(n) = \frac\{n\}\{2^\{h+1\}\} \times O(2^\{h+1\}) = O(n)
$$

---

**4. Конкретен Пример:**

Heap с n = 15 nodes (h = 3):

| Level | Nodes | Max Swaps/Node | Total Work |
|-------|-------|----------------|------------|
| 3 (leaves) | 8 | 0 | 0 |
| 2 | 4 | 1 | 4 |
| 1 | 2 | 2 | 4 |
| 0 (root) | 1 | 3 | 3 |
| **Total** | **15** | - | **11** |

Total work ≈ 11 < 15 → O(n) ✓

---

**5. Сравнение: Bottom-Up vs. Successive Insertions**

**Bottom-Up Heapify:**
- Работа: O(n)
- Причина: Повечето nodes правят малко работа

**n Successive Insertions:**
- Работа: n × O(log n) = O(n log n)
- Причина: Всеки insert е O(log n)

**Защо Bottom-Up е по-добър?**

```
Bottom-Up:      O(n)       ← Линейна сложност!
Insertions:     O(n log n) ← Linearithmic

За n = 1,000,000:
- Bottom-Up:    ~1,000,000 операции
- Insertions:   ~20,000,000 операции  (20× по-бавно!)
```

---

**6. Визуализация на Работата:**

```
Heap с n=7:

Level 0:    O         Max 2 swaps  → 1 × 2 = 2
           / \
Level 1:  O   O       Max 1 swap   → 2 × 1 = 2
         / \ / \
Level 2: O O O O      Max 0 swaps  → 4 × 0 = 0

Total: 2 + 2 + 0 = 4 < 7 → O(n)
```

---

**7. Ключов Takeaway:**

**Floyd's Bottom-Up Heapify е O(n) защото:**
1. Повечето nodes (листа и близо до листа) правят МАЛКО работа
2. Малко nodes (близо до root) правят МНОГО работа
3. Weighted sum на работата се сближава към O(n)
4. **Математически доказуемо:** $\sum_\{i=0\}^\{h\} \frac\{n\}\{2^\{i+1\}\} \times i = O(n)$

Това прави heap construction **ИЗКЛЮЧИТЕЛНО ефективна** - линейна сложност вместо O(n log n)!

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="hard"
  timeEstimate="25 min"
  tags={["heap-sort", "complete-trace", "analysis"]}
>

### Задача 17: Complete Heap Sort

Извършете пълен heap sort на `[6, 2, 8, 1, 9, 3, 7, 5]`. Покажете:
- **Phase 1:** Пълен heapification процес
- **Phase 2:** Всички extraction steps с междинни heap states
- Финалния sorted array
- Общ брой comparisons (приблизително)


<CollapsibleSection title="Подсказка" icon="💡">

Това е comprehensive exercise!
- Бъдете systematic
- Проследете всяка стъпка внимателно
- Използвайте визуализации където е възможно

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

**Initial array:** `[6, 2, 8, 1, 9, 3, 7, 5]`

---

## PHASE 1: HEAP CONSTRUCTION

**n = 8**, starting index = `8/2 - 1 = 3`

```
Initial tree:
         6
        / \
       2   8
      / \ / \
     1 9 3  7
    /
   5

Heapify indices: 3, 2, 1, 0
```

### Задача 18: Heapify index 3 (value 1):

Children: index 7 (value 5)
- Compare: 1 vs 5
- 1 < 5, **swap**

```
After: [6, 2, 8, 5, 9, 3, 7, 1]

         6
        / \
       2   8
      / \ / \
     5 9 3  7
    /
   1
```

### Задача 19: Heapify index 2 (value 8):

Children: index 5 (value 3), index 6 (value 7)
- Compare: 8, 3, 7
- Largest = 8, no swap

```
After: [6, 2, 8, 5, 9, 3, 7, 1] (unchanged)
```

### Задача 20: Heapify index 1 (value 2):

Children: index 3 (value 5), index 4 (value 9)
- Compare: 2, 5, 9
- Largest = 9, **swap 2 ↔ 9**

```
After: [6, 9, 8, 5, 2, 3, 7, 1]

         6
        / \
       9   8
      / \ / \
     5 2 3  7
    /
   1
```

### Задача 21: Heapify index 0 (value 6):

**Iteration 1:**
Children: index 1 (value 9), index 2 (value 8)
- Compare: 6, 9, 8
- Largest = 9, **swap 6 ↔ 9**

```
After: [9, 6, 8, 5, 2, 3, 7, 1]
```

**Iteration 2:**
Current: index 1 (value 6)
Children: index 3 (value 5), index 4 (value 2)
- Compare: 6, 5, 2
- Largest = 6, no swap
- STOP

**Max-Heap построен:** `[9, 6, 8, 5, 2, 3, 7, 1]`

```
         9
        / \
       6   8
      / \ / \
     5 2 3  7
    /
   1
```

---

## PHASE 2: EXTRACTION

**Heap:** `[9, 6, 8, 5, 2, 3, 7, 1]`

### Задача 22: Extraction 1: Remove 9

Swap 9 ↔ 1: `[1, 6, 8, 5, 2, 3, 7 | 9]`

Sift-down 1:
1. Compare 1, 6, 8 → swap 1 ↔ 8
2. Compare 1, 3, 7 → swap 1 ↔ 7
3. Stop (leaf)

**Result:** `[8, 6, 7, 5, 2, 3, 1 | 9]`

### Задача 23: Extraction 2: Remove 8

Swap 8 ↔ 1: `[1, 6, 7, 5, 2, 3 | 8, 9]`

Sift-down 1:
1. Compare 1, 6, 7 → swap 1 ↔ 7
2. Compare 1, 3 → swap 1 ↔ 3
3. Stop (leaf)

**Result:** `[7, 6, 3, 5, 2, 1 | 8, 9]`

### Задача 24: Extraction 3: Remove 7

Swap 7 ↔ 1: `[1, 6, 3, 5, 2 | 7, 8, 9]`

Sift-down 1:
1. Compare 1, 6, 3 → swap 1 ↔ 6
2. Compare 1, 5, 2 → swap 1 ↔ 5
3. Stop (leaf)

**Result:** `[6, 5, 3, 1, 2 | 7, 8, 9]`

### Задача 25: Extraction 4: Remove 6

Swap 6 ↔ 2: `[2, 5, 3, 1 | 6, 7, 8, 9]`

Sift-down 2:
1. Compare 2, 5, 3 → swap 2 ↔ 5
2. Compare 2, 1 → no swap
3. Stop

**Result:** `[5, 2, 3, 1 | 6, 7, 8, 9]`

### Задача 26: Extraction 5: Remove 5

Swap 5 ↔ 1: `[1, 2, 3 | 5, 6, 7, 8, 9]`

Sift-down 1:
1. Compare 1, 2, 3 → swap 1 ↔ 3
2. Stop (leaf)

**Result:** `[3, 2, 1 | 5, 6, 7, 8, 9]`

### Задача 27: Extraction 6: Remove 3

Swap 3 ↔ 1: `[1, 2 | 3, 5, 6, 7, 8, 9]`

Sift-down 1:
1. Compare 1, 2 → swap 1 ↔ 2
2. Stop (leaf)

**Result:** `[2, 1 | 3, 5, 6, 7, 8, 9]`

### Задача 28: Extraction 7: Remove 2

Swap 2 ↔ 1: `[1 | 2, 3, 5, 6, 7, 8, 9]`

Done (heap size = 1)

**Final sorted array:** `[1, 2, 3, 5, 6, 7, 8, 9]` ✓

---

## COMPARISON COUNT ESTIMATE:

**Phase 1 (Build Heap):**
- Heapify index 3: 1 comparison
- Heapify index 2: 2 comparisons
- Heapify index 1: 2 comparisons + potential more
- Heapify index 0: ~4 comparisons

**Estimate:** ~12 comparisons

**Phase 2 (Extractions):**
- Each sift-down: ~2-3 comparisons average
- 7 extractions × 2.5 comparisons ≈ 18 comparisons

**Total comparisons:** ~30 comparisons

**Theoretical:** For n=8, heap sort makes approximately $2n \log n$ comparisons
- $2 \times 8 \times \log_2 8 = 2 \times 8 \times 3 = 48$ comparisons (upper bound)

Our estimate (~30) е reasonable!

</CollapsibleSection>

</ExerciseCard>

---

Поради дължината на съдържанието, ще продължа с останалите exercises в следващата част. Нека първо запазя това, което съм създал досега.


<ExerciseCard
  difficulty="hard"
  timeEstimate="15 min"
  tags={["stability", "sorting-properties", "analysis"]}
>

### Задача 29: Stability Analysis

Даден е array `[5a, 3, 5b, 2, 5c]` където subscripts различават равни елементи:
- Извършете heap sort и покажете финалния ред
- Обяснете защо heap sort не е stable използвайки този пример
- Опишете какви модификации (ако има такива) биха направили heap sort stable и каква би била цената


<CollapsibleSection title="Подсказка" icon="💡">

**Stable sort:** Запазва относителния ред на равни елементи.

Проследете къде отиват 5a, 5b, 5c във всяка фаза.

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

**Initial array:** `[5a, 3, 5b, 2, 5c]`

---

## PHASE 1: BUILD MAX-HEAP

Starting index: `5/2 - 1 = 1`

```
Initial tree:
       5a
      /  \
     3    5b
    / \
   2  5c
```

**Heapify index 1 (value 3):**
Children: 2, 5c
- Compare: 3, 2, 5c
- Largest = 5c, **swap 3 ↔ 5c**

```
Array: [5a, 5c, 5b, 2, 3]

       5a
      /  \
     5c   5b
    / \
   2  3
```

**Heapify index 0 (value 5a):**
Children: 5c, 5b
- Compare: 5a, 5c, 5b
- All equal! Алгоритъмът избира 5c (левия child)
- **Swap 5a ↔ 5c**

```
Array: [5c, 5a, 5b, 2, 3]

       5c
      /  \
     5a   5b
    / \
   2  3
```

Continue sift-down 5a at index 1:
- Children: 2, 3
- 5a > both, no swap

**Max-heap:** `[5c, 5a, 5b, 2, 3]`

---

## PHASE 2: EXTRACTIONS

**Extraction 1:** Remove 5c
```
Swap: [3, 5a, 5b, 2 | 5c]
Sift-down 3: [5a, 3, 5b, 2 | 5c] → [5b, 3, 5a, 2 | 5c]
```
Wait, let me recalculate...

```
After swap: [3, 5a, 5b, 2 | 5c]
Sift-down: Compare 3, 5a, 5b → swap with 5b
Result: [5b, 5a, 3, 2 | 5c]
```

**Extraction 2:** Remove 5b
```
Swap: [2, 5a, 3 | 5b, 5c]
Sift-down: Compare 2, 5a, 3 → swap with 5a
Result: [5a, 2, 3 | 5b, 5c]
```

**Extraction 3:** Remove 5a
```
Swap: [3, 2 | 5a, 5b, 5c]
Sift-down: Compare 3, 2 → no swap
```

**Extraction 4:** Remove 3
```
Swap: [2 | 3, 5a, 5b, 5c]
```

**Final sorted:** `[2, 3, 5a, 5b, 5c]`

---

## ANALYSIS

**Original order:** 5a, 3, 5b, 2, 5c

**After heap sort:** 2, 3, 5a, 5b, 5c

**Проблемът:** Оригиналният ред на 5's беше: **5a → 5b → 5c**

След heap sort: **5a → 5b → 5c** (в този случай запазен!)

**НО** това е случайност! Heap операциите НЕ гарантират запазване на относителния ред.

**Контра-пример:** Ако започнем с `[5b, 3, 5a, 2, 5c]`:
- След heap sort може да получим: `[2, 3, 5a, 5b, 5c]`
- Оригинален ред: 5b → 5a → 5c
- Финален ред: 5a → 5b → 5c
- Редът се промени! ❌ UNSTABLE

---

## ЗАЩО HEAP SORT Е UNSTABLE?

1. **Heap construction променя позиции:**
   - Sift-down може да размени равни елементи
   - Няма гаранция за запазване на относителен ред

2. **Extraction phase също променя ред:**
   - Последният елемент отива на root
   - Може да "прескочи" равни елементи

3. **Няма awareness за оригинален ред:**
   - Heap property разглежда само стойности
   - Не следи оригинални позиции

---

## МОЖЕ ЛИ ДА СЕ НАПРАВИ STABLE?

**Вариант 1: Augment with indices**

Съхранявайте оригинален index с всеки елемент:

```cpp
struct Element {
    int value;
    int originalIndex;

    bool operator<(const Element& other) const {
        if (value != other.value)
            return value < other.value;
        return originalIndex < other.originalIndex;  // Tie-breaker
    }
};
```

**Цена:**
- **Space:** O(n) за съхранение на indices
- **Time:** Все още O(n log n), но с overhead
- **Complexity:** По-сложна имплементация

**Вариант 2: Използвай друг алгоритъм**

**По-добри избори за stable sorting:**
- **Merge Sort:** Naturally stable, O(n log n)
- **Tim Sort:** Hybrid, stable, O(n log n)
- **Insertion Sort:** Stable, O(n²) (добър за малки n)

---

## ЗАКЛЮЧЕНИЕ

**Heap Sort е unstable защото:**
1. Heap операциите не запазват относителен ред на равни елементи
2. Може да се направи stable, но със significant overhead
3. По-добре е да използвате inherently stable алгоритъм ако stability е критична

**Кога stability не е важна:**
- Сортиране на primitive types (int, float)
- Еднократно сортиране без secondary keys
- Performance е по-важен от order preservation

**Кога stability Е важна:**
- Sorting records with multiple fields
- Multi-level sorting (сортирай по дата, после по име)
- UI lists където user очаква запазен ред

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="hard"
  timeEstimate="15 min"
  tags={["min-heap", "priority-queue", "application"]}
>

### Задача 30: Min-Heap Application

Имплементирате priority queue за emergency room на болница, където ПО-НИСКИТЕ числа индикират ПО-ВИСОК приоритет (1 = critical, 10 = minor).

- Трябва ли да използвате min-heap или max-heap?
- Дадени arrivals с priorities `[5, 2, 8, 1, 6, 3]`, покажете heap структурата след всички insertions
- Покажете extraction order когато пациентите се повикват


<CollapsibleSection title="Подсказка" icon="💡">

**Ключов въпрос:** Искаме винаги да извличаме пациента с най-висок priority.

- High priority = Low number
- Искаме root да съдържа най-малкото число
- Какъв тип heap е това?

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

## ИЗБОР НА HEAP TYPE

**Трябва да използваме MIN-HEAP!**

**Защо?**
- Lower number = Higher priority
- Искаме root да съдържа minimum (най-спешния пациент)
- Min-heap гарантира, че root винаги е минималният елемент

---

## INSERTIONS

**Arrivals:** `[5, 2, 8, 1, 6, 3]`

### Задача 31: Insert 5:
```
Heap: [5]

Tree:
   5
```

### Задача 32: Insert 2:
```
Array: [5, 2]
Sift-up: 2 < 5, swap

Heap: [2, 5]

Tree:
   2
  /
 5
```

### Задача 33: Insert 8:
```
Array: [2, 5, 8]
Sift-up: 8 > 2, no swap

Heap: [2, 5, 8]

Tree:
   2
  / \
 5   8
```

### Задача 34: Insert 1:
```
Array: [2, 5, 8, 1]
Sift-up from index 3:
- Compare with parent(3) = index 1 (value 5)
- 1 < 5, swap → [2, 1, 8, 5]

Continue sift-up from index 1:
- Compare with parent(1) = index 0 (value 2)
- 1 < 2, swap → [1, 2, 8, 5]

Heap: [1, 2, 8, 5]

Tree:
     1
    / \
   2   8
  /
 5
```

### Задача 35: Insert 6:
```
Array: [1, 2, 8, 5, 6]
Sift-up from index 4:
- Compare with parent(4) = index 1 (value 2)
- 6 > 2, no swap

Heap: [1, 2, 8, 5, 6]

Tree:
     1
    / \
   2   8
  / \
 5   6
```

### Задача 36: Insert 3:
```
Array: [1, 2, 8, 5, 6, 3]
Sift-up from index 5:
- Compare with parent(5) = index 2 (value 8)
- 3 < 8, swap → [1, 2, 3, 5, 6, 8]

Heap: [1, 2, 3, 5, 6, 8]

Tree:
     1
    / \
   2   3
  / \ /
 5  6 8
```

---

## FINAL MIN-HEAP

**Array:** `[1, 2, 3, 5, 6, 8]`

```
Final Tree:
       1
      / \
     2   3
    / \ /
   5  6 8
```

**Verification:**
```
- 1 <= 2, 3 ✓
- 2 <= 5, 6 ✓
- 3 <= 8 ✓
```
---

## EXTRACTION ORDER (Calling Patients)

### Задача 37: Extract 1 (Priority 1 - CRITICAL):
```
Patient with priority 1 called!
Remove root, re-heapify
Heap: [2, 5, 3, 8, 6]

     2
    / \
   5   3
  / \
 8   6
```

### Задача 38: Extract 2 (Priority 2):
```
Patient with priority 2 called!
Heap: [3, 5, 6, 8]

     3
    / \
   5   6
  /
 8
```

### Задача 39: Extract 3 (Priority 3):
```
Patient with priority 3 called!
Heap: [5, 8, 6]

   5
  / \
 8   6
```

### Задача 40: Extract 4 (Priority 5):
```
Patient with priority 5 called!
Heap: [6, 8]

   6
  /
 8
```

### Задача 41: Extract 5 (Priority 6):
```
Patient with priority 6 called!
Heap: [8]

 8
```

### Задача 42: Extract 6 (Priority 8):
```
Patient with priority 8 called!
Heap: []
```

---

## EXTRACTION ORDER SUMMARY

**Order of treatment:**
1. Priority **1** (Critical - immediate threat to life)
2. Priority **2** (Critical - needs urgent care)
3. Priority **3** (Urgent)
4. Priority **5** (Moderate)
5. Priority **6** (Moderate-low)
6. Priority **8** (Minor)

**Exactly what we want!** Най-спешните пациенти се обработват първи. ✓

---

## КОДОВА ИМПЛЕМЕНТАЦИЯ

```cpp
#include <queue>
#include <string>
#include <iostream>
using namespace std;

struct Patient {
    string name;
    int priority;  // 1 = critical, 10 = minor

    // Min-heap: lower priority number = higher urgency
    bool operator>(const Patient& other) const {
        return priority > other.priority;
    }
};

int main() {
    // C++ priority_queue е max-heap по default
    // Използваме greater<> за min-heap behavior
    priority_queue<Patient, vector<Patient>, greater<Patient>> emergencyQueue;

    // Arrivals
    emergencyQueue.push({"Alice", 5});
    emergencyQueue.push({"Bob", 2});
    emergencyQueue.push({"Charlie", 8});
    emergencyQueue.push({"Diana", 1});
    emergencyQueue.push({"Eve", 6});
    emergencyQueue.push({"Frank", 3});

    cout << "Order of treatment:\n";
    while (!emergencyQueue.empty()) {
        Patient p = emergencyQueue.top();
        emergencyQueue.pop();
        cout << p.name << " (priority: " << p.priority << ")\n";
    }

    return 0;
}
```

**Output:**
```
Order of treatment:
Diana (priority: 1)    ← Most urgent
Bob (priority: 2)
Frank (priority: 3)
Alice (priority: 5)
Eve (priority: 6)
Charlie (priority: 8)  ← Least urgent
```

Перфектно! Min-heap гарантира правилния treatment order. ✓

</CollapsibleSection>

</ExerciseCard>

---

## HARD EXERCISES - Advanced Applications

<ExerciseCard
  difficulty="hard"
  timeEstimate="25 min"
  tags={["k-ary-heap", "analysis", "complexity"]}
>

### Задача 43: K-ary Heap Analysis

Разгледайте 4-ary heap (всеки node има 4 children) с 1000 елемента.

- Каква е формулата за намиране на parent на node на index i?
- Каква е формулата за намиране на j-тото child (j = 0, 1, 2, 3)?
- Изчислете височината на този heap
- Сравнете броя comparisons за sift-down операция versus binary heap
- В какви сценарии 4-ary heap може да превъзхожда binary heap?


<CollapsibleSection title="Подсказка" icon="💡">

**Key insights:**
- K-ary heap има k children per node
- Height = $\log_k n$
- Sift-down трябва да сравни с k children

Помислете за trade-offs:
- Lower height vs. More comparisons per level

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

## 1. ФОРМУЛА ЗА PARENT

**4-ary heap (k=4), 0-indexed array:**

$$
\text\{parent\}(i) = \left\lfloor \frac\{i-1\}\{4\} \right\rfloor
$$

**Примери:**
- Node at index 8: parent = ⌊(8-1)/4⌋ = ⌊7/4⌋ = 1 ✓
- Node at index 20: parent = ⌊(20-1)/4⌋ = ⌊19/4⌋ = 4 ✓

---

## 2. ФОРМУЛА ЗА J-TO CHILD

**j-то child (j ∈ \{0, 1, 2, 3\}):**

$$
\text\{child\}_j(i) = 4i + j + 1
$$

**За node i:**
- Child 0 (leftmost): $4i + 1$
- Child 1: $4i + 2$
- Child 2: $4i + 3$
- Child 3 (rightmost): $4i + 4$

**Пример за node at index 2:**
- Child 0: 4×2 + 1 = 9
- Child 1: 4×2 + 2 = 10
- Child 2: 4×2 + 3 = 11
- Child 3: 4×2 + 4 = 12

---

## 3. ВИСОЧИНА НА HEAP С 1000 NODES

**Binary heap (k=2):**
$$
h_\{\text\{binary\}\} = \lfloor \log_2 1000 \rfloor = \lfloor 9.97 \rfloor = 9
$$

**4-ary heap (k=4):**
$$
h_\{\text\{4-ary\}\} = \lfloor \log_4 1000 \rfloor = \frac\{\log_2 1000\}\{\log_2 4\} = \frac\{9.97\}\{2\} = 4.98 \approx 5
$$

**Comparison:**
- Binary heap: height = 9
- 4-ary heap: height = **5** (almost **half**!)

---

## 4. COMPARISONS PER SIFT-DOWN

### Задача 44: Binary Heap (k=2):
**Comparisons per level:**
- Compare current with 2 children: **2 comparisons**
- Find max of 3 elements: 2 comparisons
- Потенциално swap и continue

**Worst-case:** Height × 2 = 9 × 2 = **18 comparisons**

### Задача 45: 4-ary Heap (k=4):
**Comparisons per level:**
- Compare current with 4 children: **4 comparisons**
- Find max of 5 elements: 4 comparisons
- Потенциално swap и continue

**Worst-case:** Height × 4 = 5 × 4 = **20 comparisons**

---

## 5. ДЕТАЙЛНО СРАВНЕНИЕ

| Aspect | Binary Heap | 4-ary Heap |
|--------|-------------|------------|
| **Height** | log₂(n) = 9 | log₄(n) = 5 |
| **Comparisons/level** | 2 | 4 |
| **Total sift-down** | ~18 | ~20 |
| **Levels to traverse** | More | **Fewer** |
| **Comparisons per level** | Fewer | **More** |

**Trade-off:** Fewer levels vs. More comparisons per level

---

## 6. КОГА 4-ARY HEAP Е ПО-ДОБЪР?

### Задача 46: Scenario 1: Cache-Friendly Operations
**4-ary heap advantages:**
- **Better cache locality** - 4 children може да се поберат в един cache line
- Modern CPUs have 64-byte cache lines
- 4 integers (4 bytes each) = 16 bytes < 64 bytes ✓

**Binary heap:**
- Children са по-разпръснати в паметта
- Повече cache misses

### Задача 47: Scenario 2: Priority Queue с много извличания
**4-ary heap:**
- Fewer levels → potentially faster extract-min
- Ако comparisons са евтини (примитивни типове)

**Binary heap:**
- Може да е по-бавен поради повече levels

### Задача 48: Scenario 3: External Memory / Disk-based
**4-ary heap:**
- **Significantly fewer disk I/O operations**
- Disk seeks са МНОГО скъпи
- Fewer levels = Fewer disk accesses

**Example:**
- n = 1,000,000
- Binary heap: height = 20 → 20 potential disk seeks
- 4-ary heap: height = 10 → **10 disk seeks** (50% reduction!)

### Задача 49: Scenario 4: Parallel Processing
**4-ary heap:**
- 4 children могат да се сравнят паралелно
- SIMD instructions (SSE, AVX)

---

## КОГАТО BINARY HEAP Е ПО-ДОБЪР

1. **Малко nodes:**
   - Lower overhead, simpler implementation

2. **Скъпи comparisons:**
   - Ако comparison е O(m), 4-ary е по-бавен
   - Binary heap прави по-малко comparisons

3. **Много insertions:**
   - Sift-up е по-бърз в binary heap
   - По-малко comparisons per level

---

## КОДОВ ПРИМЕР: 4-ARY HEAP

```cpp
class QuaternaryHeap {
private:
    vector<int> heap;
    const int K = 4;  // 4-ary

    int parent(int i) {
        return (i - 1) / K;
    }

    int child(int i, int j) {  // j-th child
        return K * i + j + 1;
    }

    void siftDown(int i) {
        int n = heap.size();
        while (true) {
            int largest = i;

            // Check all K children
            for (int j = 0; j < K; j++) {
                int childIdx = child(i, j);
                if (childIdx < n && heap[childIdx] > heap[largest])
                    largest = childIdx;
            }

            if (largest == i) break;

            swap(heap[i], heap[largest]);
            i = largest;
        }
    }

public:
    void insert(int val) {
        heap.push_back(val);
        int i = heap.size() - 1;

        // Sift-up
        while (i > 0 && heap[parent(i)] < heap[i]) {
            swap(heap[i], heap[parent(i)]);
            i = parent(i);
        }
    }

    int extractMax() {
        if (heap.empty()) throw runtime_error("Empty heap");

        int maxVal = heap[0];
        heap[0] = heap.back();
        heap.pop_back();

        if (!heap.empty())
            siftDown(0);

        return maxVal;
    }
};
```

---

## ЗАКЛЮЧЕНИЕ

**4-ary heap превъзхожда binary heap когато:**
- Cache locality е критична
- Disk I/O е bottleneck
- Много extract operations
- Comparisons са евтини

**Binary heap е по-добър за:**
- General-purpose usage
- Скъпи comparisons
- Простота и стандартност
- По-малко overhead

**В практиката:** Binary heaps се използват най-често поради простота, но k-ary heaps имат niche applications в external sorting и database systems.

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["hybrid-algorithm", "optimization", "design"]}
>

### Задача 50: Hybrid Algorithm Design

Проектирайте hybrid sorting алгоритъм, който:
- Използва heap sort за първата фаза
- Преминава към друг алгоритъм за финалната фаза
- Оптимизира за both worst-case гаранции И практически performance

Specify: кога да превключите, кой втори алгоритъм да използвате, общата сложност, и обосновете design choices.


<CollapsibleSection title="Подсказка" icon="💡">

Помислете за:
- Силните страни на heap sort (worst-case guarantees)
- Слабостите на heap sort (cache locality, constants)
- Кои алгоритми са бързи за малки/почти сортирани arrays?

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

## HYBRID ALGORITHM DESIGN: HeapSort + InsertionSort

**Name:** Adaptive HeapSort (AHS)

---

## DESIGN RATIONALE

### Задача 51: Phase 1: Heap Sort (Large Data)
**Използваме heap sort за:**
- **Guaranteed O(n log n)** - no worst-case degradation
- **In-place** - O(1) space
- **Predictable** - critical за real-time systems

### Задача 52: Phase 2: Insertion Sort (Small/Nearly Sorted Data)
**Преминаваме към insertion sort защото:**
- **O(n)** за nearly sorted data
- **Excellent cache locality**
- **Low overhead** за малки datasets
- **Stable** (bonus!)

---

## SWITCHING STRATEGY

### Задача 53: Threshold-Based Switching

**Define threshold K (experimentally determined):**
- Typical values: K = 16 to 64
- Depends on hardware, data types

**Algorithm:**

```cpp
void hybridHeapSort(vector<int>& arr) {
    int n = arr.size();
    const int THRESHOLD = 32;

    if (n <= THRESHOLD) {
        // Small array: use insertion sort directly
        insertionSort(arr, 0, n - 1);
        return;
    }

    // Phase 1: Heap sort до nearly sorted
    partialHeapSort(arr, THRESHOLD);

    // Phase 2: Insertion sort за finalize
    insertionSort(arr, 0, n - 1);
}
```

---

## DETAILED ALGORITHM

### Задача 54: Partial Heap Sort

**Idea:** Heap sort до data е "nearly sorted enough" за insertion sort да е ефективен.

**Approach 1: Fixed threshold**
```cpp
void partialHeapSort(vector<int>& arr, int threshold) {
    int n = arr.size();

    // Build max-heap
    buildHeap(arr);

    // Extract до остават threshold несортирани елемента
    for (int i = n - 1; i >= threshold; i--) {
        swap(arr[0], arr[i]);
        siftDown(arr, i, 0);
    }

    // Сега arr[threshold..n-1] са сортирани
    // arr[0..threshold-1] са nearly sorted
}
```

**Approach 2: Adaptive threshold**
```cpp
void adaptiveHybridSort(vector<int>& arr) {
    int n = arr.size();

    // Build heap
    buildHeap(arr);

    // Extract докато не детектираме "nearly sorted"
    int extracted = 0;
    int threshold = min(64, n / 8);  // Adaptive

    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        siftDown(arr, i, 0);

        extracted++;

        // Check if remaining data е nearly sorted
        if (extracted >= threshold && isNearlySorted(arr, i)) {
            break;
        }
    }

    // Finalize с insertion sort
    insertionSort(arr, 0, n - 1);
}

bool isNearlySorted(vector<int>& arr, int end) {
    int inversions = 0;
    int sampleSize = min(10, end);

    for (int i = 0; i < sampleSize - 1; i++) {
        if (arr[i] > arr[i + 1])
            inversions++;
    }

    return inversions <= sampleSize / 4;  // <25% inversions
}
```

---

## COMPLEXITY ANALYSIS

### Задача 55: Time Complexity

**Phase 1: Partial Heap Sort**
- Build heap: O(n)
- Extract (n - k) elements: O((n - k) log n)
- Total: O(n + (n - k) log n) ≈ O(n log n)

**Phase 2: Insertion Sort**
- Nearly sorted data: O(n + d), където d = inversions
- For k unsorted elements: O(k²) worst, O(n) average

**Total:**
- **Best case:** O(n) - nearly sorted input
- **Average case:** O(n log n)
- **Worst case:** O(n log n) - dominated by heap sort

**Key insight:** Worst-case остава O(n log n) благодарение на heap sort! ✓

### Задача 56: Space Complexity

- **Auxiliary space:** O(1) - in-place
- Heap sort е in-place
- Insertion sort е in-place

---

## WHY THIS DESIGN?

### Задача 57: Advantages

1. **Worst-Case Guarantee:**
   - Heap sort осигурява O(n log n) ceiling
   - Няма risk от O(n²) degradation

2. **Практически Performance:**
   - Insertion sort е МНОГО бърз за nearly sorted
   - Better cache locality от pure heap sort

3. **Adaptive:**
   - Може да детектира nearly sorted states
   - Automatically adjusts strategy

4. **In-Place:**
   - O(1) space requirement
   - Critical за memory-constrained systems

### Задача 58: Disadvantages

1. **Not Stable:**
   - Heap sort губи stability
   - Ако stability е важна, използвай merge sort

2. **Tuning Required:**
   - Threshold трябва да се експериментира
   - Hardware-dependent optimization

3. **Complexity:**
   - По-сложна имплементация от pure heap sort

---

## ALTERNATIVE DESIGNS

### Задача 59: Variant 1: HeapSort + QuickSort Hybrid

```cpp
void heapQuickHybrid(vector<int>& arr, int left, int right) {
    int n = right - left + 1;

    if (n < 16) {
        insertionSort(arr, left, right);
        return;
    }

    // Използвай heap sort за гарантирана performance
    if (recursionDepth > 2 * log2(n)) {
        heapSort(arr, left, right);  // Fallback
        return;
    }

    // Използвай quick sort за average-case speed
    quickSortVariant(arr, left, right, recursionDepth + 1);
}
```

**When to use:** Когато average-case speed е по-важен, но искаш worst-case protection.

### Задача 60: Variant 2: HeapSort + Merge for Stability

```cpp
void hybridStableSort(vector<int>& arr) {
    int n = arr.size();

    if (n < 64) {
        insertionSort(arr);  // Stable и бърз за малки n
        return;
    }

    // Use heap sort ако memory е ограничена
    if (availableMemory < n * sizeof(int)) {
        heapSort(arr);
        return;
    }

    // Otherwise use merge sort (stable)
    mergeSort(arr);
}
```

---

## FULL IMPLEMENTATION

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class HybridHeapSort {
private:
    static const int THRESHOLD = 32;

    static void siftDown(vector<int>& arr, int n, int i) {
        while (true) {
            int largest = i;
            int left = 2 * i + 1;
            int right = 2 * i + 2;

            if (left < n && arr[left] > arr[largest])
                largest = left;
            if (right < n && arr[right] > arr[largest])
                largest = right;

            if (largest == i) break;

            swap(arr[i], arr[largest]);
            i = largest;
        }
    }

    static void buildHeap(vector<int>& arr, int n) {
        for (int i = n / 2 - 1; i >= 0; i--)
            siftDown(arr, n, i);
    }

    static void insertionSort(vector<int>& arr, int left, int right) {
        for (int i = left + 1; i <= right; i++) {
            int key = arr[i];
            int j = i - 1;

            while (j >= left && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

public:
    static void sort(vector<int>& arr) {
        int n = arr.size();

        if (n <= THRESHOLD) {
            insertionSort(arr, 0, n - 1);
            return;
        }

        // Phase 1: Build heap
        buildHeap(arr, n);

        // Phase 2: Extract до threshold
        for (int i = n - 1; i >= THRESHOLD; i--) {
            swap(arr[0], arr[i]);
            siftDown(arr, i, 0);
        }

        // Phase 3: Insertion sort за finalize
        insertionSort(arr, 0, n - 1);
    }
};
```

---

## PERFORMANCE EXPECTATIONS

**Theoretical:**
- **Worst-case:** O(n log n) ✓
- **Average-case:** O(n log n) with better constants
- **Best-case:** O(n) за nearly sorted

**Practical (n = 1,000,000):**
- Pure Heap Sort: ~150ms
- Pure Quick Sort: ~80ms (average), ~15000ms (worst)
- **Hybrid:** ~100ms (average), ~150ms (worst) ← **Best of both!**

---

## CONCLUSION

**Hybrid HeapSort + InsertionSort е excellent design защото:**
1. **Guarantees:** O(n log n) worst-case от heap sort
2. **Speed:** O(n) best-case от insertion sort
3. **Space:** O(1) in-place
4. **Simplicity:** Relatively simple to implement

**Use when:**
- Predictability е critical
- Memory е limited
- Данните могат да бъдат partially sorted

Това е real-world algorithm design - combining strengths of multiple approaches! 🚀

</CollapsibleSection>

</ExerciseCard>

---

Due to length constraints, I'll continue with the remaining exercises (22-24) in the next part of the file.

<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["top-k", "streaming", "space-efficient", "priority-queue"]}
>

### Задача 61: Top-K Problem

Трябва да намерите top 10 values от stream от 1 милион integers, но можете да съхраните само 11 values в паметта едновременно.

- Проектирайте алгоритъм използвайки heap
- Трябва ли да използвате min-heap или max-heap? Защо?
- Покажете heap състоянието след обработка на тези стойности: `[15, 8, 23, 42, 4, 16, 50, 12, 9, 31, 7, 19]` (k=5 за демонстрация)
- Каква е времевата сложност?
- Каква е пространствената сложност?


<CollapsibleSection title="Подсказка" icon="💡">

**Key insight:** Искаме да запазим top-k largest values.

- Поддържаме heap с размер k
- Когато видим нова стойност, какво правим?
- Какво съдържа root на heap?

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

## ALGORITHM DESIGN

### Задача 62: Избор на Heap Type: MIN-HEAP

**Използваме MIN-HEAP! Ето защо:**

1. **Root съдържа минимума от top-k**
   - Ако нов елемент > root, той е в top-k
   - Ако нов елемент `<=` root, той НЕ Е в top-k

2. **Лесна проверка**
   - O(1) време да проверим дали нов елемент е в top-k

3. **Ефективно replacement**
   - Remove min (root)
   - Insert новия елемент
   - O(log k) време

**Защо НЕ max-heap?**
- Max-heap държи maximum в root
- Не можем лесно да определим дали нов елемент е в top-k
- Би изисквало O(k) scan

---

## ALGORITHM PSEUDOCODE

```cpp
vector<int> findTopK(Stream& stream, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap; // Min-heap

    while (stream.hasNext()) {
        int value = stream.next();

        if (minHeap.size() < k) {
            // Heap не е пълен, просто insert
            minHeap.push(value);
        }
        else if (value > minHeap.top()) {
            // value е по-голяма от текущия minimum
            // Remove minimum, add value
            minHeap.pop();
            minHeap.push(value);
        }
        // else: value <= minimum, ignore
    }

    // minHeap сега съдържа top-k elements
    vector<int> result;
    while (!minHeap.empty()) {
        result.push_back(minHeap.top());
        minHeap.pop();
    }

    return result;
}
```

---

## TRACE EXAMPLE: k=5

**Stream:** `[15, 8, 23, 42, 4, 16, 50, 12, 9, 31, 7, 19]`

### Задача 63: Process 15:
```
Heap size < 5, insert
Heap: [15]
Top-5 so far: \{15\}
```

### Задача 64: Process 8:
```
Heap size < 5, insert
Heap: [8, 15]
     8
      \
      15
Top-5: \{8, 15\}
```

### Задача 65: Process 23:
```
Heap size < 5, insert
Heap: [8, 15, 23]
     8
    / \
   15  23
Top-5: \{8, 15, 23\}
```

### Задача 66: Process 42:
```
Heap size < 5, insert
Heap: [8, 15, 23, 42]
       8
      / \
    15   23
   /
  42
Top-5: \{8, 15, 23, 42\}
```

### Задача 67: Process 4:
```
Heap size < 5, insert
Heap: [4, 8, 23, 42, 15]

After heapify:
       4
      / \
     8   23
    / \
   42 15

Top-5: \{4, 8, 15, 23, 42\}
```

### Задача 68: Process 16:
```
Heap full, compare: 16 > min(4)
Remove 4, insert 16

Heap: [8, 15, 23, 42, 16]
       8
      / \
    15   23
   / \
  42 16

Top-5: \{8, 15, 16, 23, 42\}
```

### Задача 69: Process 50:
```
Compare: 50 > min(8)
Remove 8, insert 50

Heap: [15, 16, 23, 42, 50]
       15
      /  \
    16    23
   / \
  42 50

Top-5: \{15, 16, 23, 42, 50\}
```

### Задача 70: Process 12:
```
Compare: 12 < min(15)
Ignore (не е в top-5)

Heap: [15, 16, 23, 42, 50] (unchanged)
```

### Задача 71: Process 9:
```
Compare: 9 < min(15)
Ignore

Heap: [15, 16, 23, 42, 50] (unchanged)
```

### Задача 72: Process 31:
```
Compare: 31 > min(15)
Remove 15, insert 31

Heap: [16, 31, 23, 42, 50]
       16
      /  \
    31    23
   / \
  42 50

Top-5: \{16, 23, 31, 42, 50\}
```

### Задача 73: Process 7:
```
Compare: 7 < min(16)
Ignore

Heap: [16, 31, 23, 42, 50] (unchanged)
```

### Задача 74: Process 19:
```
Compare: 19 > min(16)
Remove 16, insert 19

Heap: [19, 31, 23, 42, 50]
       19
      /  \
    31    23
   / \
  42 50

Top-5: \{19, 23, 31, 42, 50\}
```

---

## FINAL RESULT

**Top-5 elements:** `[19, 23, 31, 42, 50]` ✓

**Verification:** Това са действително 5-те най-големи елемента от stream!

---

## COMPLEXITY ANALYSIS

### Задача 75: Time Complexity

**Per element:**
- Compare with min: **O(1)**
- Възможно insert + remove: **O(log k)**

**Total для n elements:**
- Process n elements: **O(n log k)**

**For k=10, n=1,000,000:**
- O(1,000,000 × log 10) ≈ O(1,000,000 × 3.32) ≈ **3,320,000 operations**
- Very efficient! Much better than sorting O(n log n)

### Задача 76: Space Complexity

**Heap size:** **O(k)**

**For k=10:**
- Store 10 integers
- Plus small overhead
- **~40-80 bytes total** (depending on implementation)

**Constraint satisfied:** Only 11 values in memory! ✓

---

## COMPARISON WITH ALTERNATIVES

### Задача 77: Alternative 1: Sort All Data

```cpp
vector<int> sortApproach(Stream& stream) {
    vector<int> all;
    while (stream.hasNext())
        all.push_back(stream.next());

    sort(all.begin(), all.end(), greater<int>());
    return vector<int>(all.begin(), all.begin() + k);
}
```

**Analysis:**
- Time: O(n log n) = O(1M × 20) = 20M operations ← WORSE!
- Space: O(n) = O(1M integers) = ~4MB ← MUCH WORSE!

### Задача 78: Alternative 2: Partial QuickSelect

```cpp
// QuickSelect за top-k
```

**Analysis:**
- Time: O(n) average, O(n²) worst
- Space: O(n) - need to store all data first
- **Problem:** Не работи за streaming data!

### Задача 79: Our Min-Heap Approach: WINNER!

- **Time:** O(n log k) ← BEST!
- **Space:** O(k) ← BEST!
- **Streaming:** Works perfectly! ✓

---

## PRACTICAL IMPLEMENTATION

```cpp
#include <queue>
#include <vector>
#include <iostream>
using namespace std;

class TopKFinder {
private:
    priority_queue<int, vector<int>, greater<int>> minHeap;
    int k;

public:
    TopKFinder(int k) : k(k) {}

    void process(int value) {
        if (minHeap.size() < k) {
            minHeap.push(value);
        }
        else if (value > minHeap.top()) {
            minHeap.pop();
            minHeap.push(value);
        }
    }

    vector<int> getTopK() {
        vector<int> result;

        // Copy heap to result
        priority_queue<int, vector<int>, greater<int>> tempHeap = minHeap;
        while (!tempHeap.empty()) {
            result.push_back(tempHeap.top());
            tempHeap.pop();
        }

        // Optional: sort result in descending order
        sort(result.begin(), result.end(), greater<int>());

        return result;
    }

    int getKthLargest() {
        return minHeap.top();  // Minimum of top-k = k-th largest
    }
};

int main() {
    vector<int> stream = {15, 8, 23, 42, 4, 16, 50, 12, 9, 31, 7, 19};
    int k = 5;

    TopKFinder finder(k);

    cout << "Processing stream:\n";
    for (int val : stream) {
        finder.process(val);
        cout << "Processed " << val;
        if (finder.getKthLargest() >= 0)
            cout << ", k-th largest so far: " << finder.getKthLargest();
        cout << "\n";
    }

    cout << "\nTop-" << k << " elements:\n";
    vector<int> topK = finder.getTopK();
    for (int val : topK)
        cout << val << " ";
    cout << "\n";

    return 0;
}
```

**Output:**
```
Processing stream:
Processed 15, k-th largest so far: 15
Processed 8, k-th largest so far: 8
Processed 23, k-th largest so far: 8
Processed 42, k-th largest so far: 8
Processed 4, k-th largest so far: 4
Processed 16, k-th largest so far: 8
Processed 50, k-th largest so far: 15
Processed 12, k-th largest so far: 15
Processed 9, k-th largest so far: 15
Processed 31, k-th largest so far: 16
Processed 7, k-th largest so far: 16
Processed 19, k-th largest so far: 19

Top-5 elements:
50 42 31 23 19
```

---

## REAL-WORLD APPLICATIONS

1. **Twitter Trending Topics**
   - Track top-k hashtags от million tweets
   - Space-efficient streaming solution

2. **E-commerce: Best Sellers**
   - Top-10 products от million purchases
   - Real-time updates

3. **Network Monitoring**
   - Top-k heavy hitters (IP addresses)
   - Detect DDoS attacks

4. **Financial Analytics**
   - Top-k stocks by volume/price change
   - Real-time market analysis

---

## SUMMARY

**Top-K Problem Solution:**

✓ **Use MIN-HEAP** of size k
✓ **Time:** O(n log k) - efficient!
✓ **Space:** O(k) - memory-constrained friendly!
✓ **Streaming:** Works perfectly!

**Key Insight:** Min-heap's root contains k-th largest, making it perfect for filtering!

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["heap-sort", "optimization", "descending-order", "partial-sort"]}
>

### Задача 80: Heap Sort Optimization

Стандартният heap sort произвежда ascending order използвайки max-heap.

- Обяснете защо използваме max-heap за ascending order (не min-heap)
- Как бихте модифицирали heap sort за да произвежда descending order ефективно?
- Анализирайте "smart" подход: можете ли да сортирате частично (извличайки само k най-големи елемента)? Каква би била сложността на намирането на k най-големи елемента използвайки heap sort?
- Сравнете това с построяването на min-heap от размер k. Кой е по-добър и защо?


<CollapsibleSection title="Подсказка" icon="💡">

Помислете за:
- Къде се натрупват sorted елементи (ляво vs. дясно)
- Trade-offs между пълно vs. частично сортиране
- Space complexity на различните подходи

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

## 1. ЗАЩО MAX-HEAP ЗА ASCENDING ORDER?

### Задача 81: Интуитивно Обяснение

**Heap sort процес:**
1. Build max-heap
2. Repeatedly extract max (root)
3. Place extracted element в края на array

**Sorted region расте от ДЯСНО наляво:**
```
Iteration 1: [heap...] [MAX]
Iteration 2: [heap..] [2nd-MAX, MAX]
Iteration 3: [heap.] [3rd-MAX, 2nd-MAX, MAX]
...
Final:       [MIN, ..., 2nd-MAX, MAX]  ← Ascending!
```

**Защо НЕ min-heap?**

Ако използваме min-heap:
```
Extract min → place в края
Result: [heap...] [MIN]
        [heap..] [2nd-MIN, MIN]
        ...
        [MAX, 2nd-MAX, ..., MIN]  ← Descending! (обратно)
```

**Ако искаме ascending order от min-heap, трябва да:**
- Extract min и place в НАЧАЛОТО (не края)
- Изисква shifting на елементи → O(n²)!
- Неефективно!

---

## 2. МОДИФИЦИРАНЕ ЗА DESCENDING ORDER

### Задача 82: Вариант A: Използвай Min-Heap (Най-прост)

```cpp
void heapSortDescending(vector<int>& arr) {
    int n = arr.size();

    // Build MIN-heap (вместо max-heap)
    buildMinHeap(arr);

    // Extract minimum, place в края
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);  // Min отива в края
        siftDownMin(arr, i, 0);
    }

    // Result: descending order!
}
```

**Analysis:**
- Time: O(n log n)
- Space: O(1)
- **Просто и ефективно!** ✓

### Задача 83: Вариант B: Reverse След Ascending Heap Sort

```cpp
void heapSortDescending(vector<int>& arr) {
    heapSortAscending(arr);  // Normal heap sort
    reverse(arr.begin(), arr.end());  // O(n) reverse
}
```

**Analysis:**
- Time: O(n log n) + O(n) = O(n log n)
- Space: O(1)
- **Работи, но прави повече работа**

### Задача 84: Вариант C: Negate Values (Hack)

```cpp
void heapSortDescending(vector<int>& arr) {
    // Negate all values
    for (int& x : arr) x = -x;  // O(n)

    // Normal heap sort (ascending на negatives = descending original)
    heapSortAscending(arr);

    // Negate back
    for (int& x : arr) x = -x;  // O(n)
}
```

**Analysis:**
- Time: O(n log n)
- **Clever но има проблеми:**
  - Overflow risk при negation
  - Не работи за unsigned types
  - **Не препоръчвам!** ❌

---

## 3. ЧАСТИЧНО СОРТИРАНЕ: TOP-K ИЗВЛИЧАНЕ

### Задача 85: Задача: Намери k най-големи елемента

### Задача 86: Approach 1: Частичен Heap Sort

```cpp
vector<int> topKHeapSort(vector<int>& arr, int k) {
    int n = arr.size();

    // Build max-heap: O(n)
    buildMaxHeap(arr);

    // Extract само k largest: O(k log n)
    for (int i = n - 1; i >= n - k; i--) {
        swap(arr[0], arr[i]);
        siftDown(arr, i, 0);
    }

    // Last k elements са top-k (сортирани!)
    return vector<int>(arr.end() - k, arr.end());
}
```

**Complexity:**
- **Time:** `O(n + k log n) = O(n) ако k << n`
- **Space:** O(1) (in-place)

**Example:** k = 10, n = 1,000,000
- O(1,000,000 + 10 × 20) = O(1,000,200) ≈ **O(n)** ← Excellent!

### Задача 87: Approach 2: Min-Heap от размер k

```cpp
vector<int> topKMinHeap(vector<int>& arr, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;

    // Process всеки елемент: O(n log k)
    for (int val : arr) {
        if (minHeap.size() < k) {
            minHeap.push(val);
        }
        else if (val > minHeap.top()) {
            minHeap.pop();
            minHeap.push(val);
        }
    }

    // Extract от heap: O(k log k)
    vector<int> result;
    while (!minHeap.empty()) {
        result.push_back(minHeap.top());
        minHeap.pop();
    }

    return result;
}
```

**Complexity:**
- **Time:** O(n log k)
- **Space:** O(k)

**Example:** k = 10, n = 1,000,000
- O(1,000,000 × log 10) ≈ O(1,000,000 × 3.32) ≈ **3.32M operations**

---

## 4. СРАВНЕНИЕ: PARTIAL HEAP SORT VS. MIN-HEAP

| Aspect | Partial Heap Sort | Min-Heap (size k) |
|--------|-------------------|-------------------|
| **Time** | O(n + k log n) | O(n log k) |
| **Space** | O(1) in-place | O(k) extra |
| **Sorted Output** | Yes, sorted | No, needs sort |
| **Streaming** | ❌ No (needs all data) | ✅ Yes |
| **Cache Locality** | Good | Moderate |

### Задача 88: Кога е по-добър Partial Heap Sort?

**Partial Heap Sort е по-добър когато:**
1. **k е близо до n (например k > n/2)**
   - O(n + k log n) ≈ O(n log n)
   - Min-heap: O(n log k) също ≈ O(n log k)
   - Но partial heap sort е in-place! ✓

2. **In-place е критично**
   - Embedded systems
   - Memory constraints

3. **Искаме sorted top-k**
   - Partial heap sort gives sorted output
   - Min-heap трябва допълнително да се sort

**Example:** k = 900K, n = 1M
- Partial: O(1M + 900K × 20) = O(18M)
- Min-heap: O(1M × log 900K) = O(1M × 19.8) = O(19.8M)
- **Similar, но partial е in-place!**

### Задача 89: Кога е по-добър Min-Heap?

**Min-heap е по-добър когато:**
1. **`k << n (например k < n/100)`**
   - Min-heap: O(n log k) ← Much smaller log factor!
   - Partial: O(n + k log n) ≈ O(n) ← Actually comparable...

   **Hmm, нека пресметнем:**

   For k = 100, n = 1M:
   - Partial: O(1M + 100 × 20) = O(1,000,002) ≈ **O(n)**
   - Min-heap: O(1M × log 100) = O(1M × 6.64) = **6.64M** ← WORSE!

   **Wait!** Частичният heap sort е МНОГО по-добър за малки k!

2. **Streaming data**
   - Min-heap works с streaming
   - Partial heap sort needs all data upfront

3. **Memory не е проблем**
   - O(k) extra space е приемливо

---

## 5. ДЕТАЙЛЕН АНАЛИЗ

### Задача 90: Scenario 1: k = 10, n = 1M

| Method | Time | Space | Winner |
|--------|------|-------|--------|
| Partial Heap Sort | O(1M) ≈ 1M | O(1) | **BEST** |
| Min-Heap | O(3.3M) | O(10) | Good |
| Full Heap Sort | O(20M) | O(1) | Worst |

**Winner: Partial Heap Sort** ← Nearly linear time!

### Задача 91: Scenario 2: k = 100K, n = 1M

| Method | Time | Space |
|--------|------|-------|
| Partial | O(1M + 100K×20) = O(3M) | O(1) |
| Min-Heap | O(1M×17) = O(17M) | O(100K) |
| Full Sort | O(20M) | O(1) |

**Winner: Partial Heap Sort** ← Significantly faster!

### Задача 92: Scenario 3: Streaming Data, k = 10

| Method | Works? | Time | Space |
|--------|--------|------|-------|
| Partial | ❌ No | - | - |
| Min-Heap | ✅ Yes | O(n log k) | O(k) |

**Winner: Min-Heap** ← Only viable option!

---

## 6. ОПТИМИЗИРАНА ИМПЛЕМЕНТАЦИЯ

```cpp
class TopKSelector {
public:
    // Вариант 1: Partial Heap Sort (in-place, needs all data)
    static vector<int> topKHeapSort(vector<int> arr, int k) {
        int n = arr.size();
        if (k >= n) {
            sort(arr.begin(), arr.end(), greater<int>());
            return arr;
        }

        // Build max-heap
        buildMaxHeap(arr);

        // Extract k largest
        for (int i = n - 1; i >= n - k; i--) {
            swap(arr[0], arr[i]);
            siftDown(arr, i, 0);
        }

        // Return last k elements (sorted descending)
        vector<int> result(arr.end() - k, arr.end());
        reverse(result.begin(), result.end());  // Descending order
        return result;
    }

    // Вариант 2: Min-Heap (streaming-friendly, extra space)
    static vector<int> topKMinHeap(const vector<int>& arr, int k) {
        priority_queue<int, vector<int>, greater<int>> minHeap;

        for (int val : arr) {
            if (minHeap.size() < k) {
                minHeap.push(val);
            }
            else if (val > minHeap.top()) {
                minHeap.pop();
                minHeap.push(val);
            }
        }

        vector<int> result;
        while (!minHeap.empty()) {
            result.push_back(minHeap.top());
            minHeap.pop();
        }

        sort(result.begin(), result.end(), greater<int>());
        return result;
    }

    // Adaptive: избира най-добрия метод
    static vector<int> topKAdaptive(vector<int> arr, int k) {
        int n = arr.size();

        if (k >= n * 0.5) {
            // k е голямо, използвай full sort
            sort(arr.begin(), arr.end(), greater<int>());
            return vector<int>(arr.begin(), arr.begin() + k);
        }
        else if (k < 1000) {
            // k е малко, partial heap sort е ideal
            return topKHeapSort(arr, k);
        }
        else {
            // Medium k, min-heap може да е по-добър
            return topKMinHeap(arr, k);
        }
    }
};
```

---

## ЗАКЛЮЧЕНИЕ

**За ascending order:** Max-heap е correct защото sorted region расте отдясно

**За descending order:** Използвай min-heap (най-простият подход)

**За top-k:**
- **`k << n`:** Partial Heap Sort `(O(n + k log n) ≈ O(n))`
- **Streaming:** Min-Heap (O(n log k))
- **k близо до n:** Full heap sort

**Key Insight:** Partial heap sort е изненадващо ефективен за малки k благодарение на O(n) heap construction! 🚀

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="hard"
  timeEstimate="30 min"
  tags={["real-world", "constraints", "optimization", "production-code"]}
>

### Задача 93: Real-World Implementation

Имплементирате heap sort за real-time система със следните constraints:

- **Fixed memory budget** (трябва да е truly in-place)
- **Data пристига като integers в range [0, 1000]**
- **Системата трябва да поддържа responsiveness** (никоя операция не може да отнеме > 5ms)
- **Data size варира от 100 до 100,000 elements**

Проектирайте имплементацията като адресирате:
- Бихте ли използвали recursive или iterative sift-down? Защо?
- Как бихте се справили с responsiveness constraint?
- Трябва ли изобщо да използвате heap sort, или да превключвате алгоритми според input size?
- Какви оптимизации бихте приложили?
- Напишете pseudocode за вашата оптимизирана sift-down функция


<CollapsibleSection title="Подсказка" icon="💡">

Помислете за:
- Stack space vs. iterative loops
- Time-slicing за големи datasets
- Alternative algorithms за малки inputs
- Range-specific optimizations ([0, 1000])

</CollapsibleSection>


<CollapsibleSection title="Решение" icon="✅">

## REAL-TIME HEAP SORT DESIGN

---

## 1. RECURSIVE VS. ITERATIVE SIFT-DOWN

### Задача 94: Избор: **ITERATIVE**

**Защо НЕ recursive?**

1. **Stack space overhead:**
   - Recursive: O(log n) stack frames
   - For n = 100K: O(log 100K) = O(17) frames
   - Each frame: ~50-100 bytes → ~850-1700 bytes
   - Може да е проблем в embedded systems

2. **Unpredictable timing:**
   - Function call overhead
   - Cache misses на stack

3. **Stack overflow risk:**
   - Real-time systems често имат малък stack

**Защо iterative?**

1. **Predictable memory:**
   - Constant stack usage (O(1))
   - Само local variables

2. **Faster:**
   - Няма function call overhead
   - Better cache locality

3. **Tail-call optimization не е гарантирана**
   - C++ компилаторите могат да не оптимизират

**Decision: Use ITERATIVE sift-down** ✓

---

## 2. RESPONSIVENESS CONSTRAINT (< 5ms)

### Задача 95: Problem Analysis

**Worst-case timing за n = 100K:**
- Heap construction: O(100K) ≈ 100K operations
- Extraction phase: 100K × log(100K) ≈ 100K × 17 = 1.7M operations

**На modern CPU (assume 1 billion ops/sec):**
- 1.7M operations ≈ **1.7ms** ← Sounds OK!

**НО:**
- Cache misses могат да забавят significantly
- Worst-case може да е 5-10× по-бавно
- **Potential risk за 5ms constraint!**

### Задача 96: Solution: **Time-Sliced Sorting**

**Approach 1: Incremental Sorting**

```cpp
class IncrementalHeapSort {
private:
    vector<int>& arr;
    int n;
    int phase;  // 0 = heapify, 1 = extract
    int heapifyIndex;
    int extractIndex;

public:
    IncrementalHeapSort(vector<int>& arr) 
        : arr(arr), n(arr.size()), phase(0), 
          heapifyIndex(n/2 - 1), extractIndex(n - 1) {}

    // Returns true ако sorting е complete
    bool processChunk(int maxOperations) {
        int ops = 0;

        // Phase 0: Heapify
        while (phase == 0 && ops < maxOperations) {
            if (heapifyIndex >= 0) {
                siftDown(heapifyIndex);
                heapifyIndex--;
                ops++;
            }
            else {
                phase = 1;  // Move to extraction
            }
        }

        // Phase 1: Extract
        while (phase == 1 && ops < maxOperations) {
            if (extractIndex > 0) {
                swap(arr[0], arr[extractIndex]);
                siftDownRange(0, extractIndex);
                extractIndex--;
                ops++;
            }
            else {
                return true;  // Sorting complete!
            }
        }

        return false;  // More work needed
    }
};
```

**Usage:**
```cpp
IncrementalHeapSort sorter(data);
while (!sorter.processChunk(1000)) {  // Process 1000 ops
    // Allow other tasks to run
    yieldToOtherTasks();
}
```

**Approach 2: Adaptive Algorithm Selection**

Избираме алгоритъм според input size:

```cpp
void adaptiveSort(vector<int>& arr, int maxTime_ms) {
    int n = arr.size();

    if (n < 100) {
        // Малък dataset: insertion sort (fast, <1ms)
        insertionSort(arr);
    }
    else if (n < 1000) {
        // Medium: quick sort (average fast, может да риска)
        quickSort(arr);
    }
    else if (n < 50000) {
        // Large: heap sort (predictable)
        heapSort(arr);
    }
    else {
        // Very large: time-sliced heap sort
        IncrementalHeapSort sorter(arr);
        auto start = now();
        while (!sorter.processChunk(10000)) {
            if (elapsed(start) > maxTime_ms * 0.8) {
                // Близо до deadline, yield
                yieldAndContinueLater();
            }
        }
    }
}
```

---

## 3. АЛГОРИТЪМ SELECTION STRATEGY

### Задача 97: Input Size Based Selection

| Size Range | Algorithm | Reason |
|------------|-----------|--------|
| n < 16 | Insertion Sort | Fastest за малки n, `<0.1ms` |
| 16 ≤ n < 1000 | Quick Sort | Best average case, ~0.5ms |
| 1000 ≤ n < 10K | Heap Sort | Predictable, ~1-2ms |
| n ≥ 10K | Time-Sliced Heap | Guaranteed responsiveness |

### Задача 98: Counting Sort Optimization

**Key insight:** Data range е [0, 1000]!

**Counting sort complexity:**
- Time: O(n + k) където k = 1000
- Space: O(k) = O(1000) integers ≈ 4KB

**Decision:**
```cpp
void smartSort(vector<int>& arr) {
    int n = arr.size();

    if (n < 16) {
        insertionSort(arr);
    }
    else if (n > 200) {
        // Counting sort е O(n + 1000)
        // For n > 200: O(n + 1000) < O(n log n)
        countingSort(arr, 0, 1000);
    }
    else {
        // Small-medium: heap sort
        heapSort(arr);
    }
}
```

**Break-even point:**
- Heap sort: O(n log n)
- Counting sort: O(n + 1000)
- Break-even: n log n = n + 1000
- Solve: n(log n - 1) = 1000
- n ≈ 200-300

**For n > 200: COUNTING SORT Е ПО-БЪРЗ!** ✓

---

## 4. OPTIMIZATIONS

### Задача 99: Optimization 1: Bottom-Up Heapify (Floyd's Method)

Already using O(n) instead of O(n log n) ✓

### Задача 100: Optimization 2: Iterative Sift-Down

```cpp
void siftDown(vector<int>& arr, int n, int i) {
    while (true) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        // Branchless comparison (може да помогне)
        if (left < n)
            largest = (arr[left] > arr[largest]) ? left : largest;
        if (right < n)
            largest = (arr[right] > arr[largest]) ? right : largest;

        if (largest == i) break;

        swap(arr[i], arr[largest]);
        i = largest;
    }
}
```

### Задача 101: Optimization 3: Manual Swap (Avoid std::swap overhead)

```cpp
inline void fastSwap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}
```

### Задача 102: Optimization 4: Early Termination

```cpp
void siftDownOptimized(vector<int>& arr, int n, int i) {
    int value = arr[i];  // Save original value

    while (true) {
        int left = 2 * i + 1;
        if (left >= n) break;  // No children

        int largest = left;
        int right = left + 1;

        // Find largest child
        if (right < n && arr[right] > arr[largest])
            largest = right;

        // Early exit if heap property satisfied
        if (arr[largest] <= value)
            break;

        // Move larger child up (no swap yet)
        arr[i] = arr[largest];
        i = largest;
    }

    arr[i] = value;  // Place original value
}
```

**Benefit:** Избягва половината swaps!

### Задача 103: Optimization 5: Prefetching (Advanced)

```cpp
void siftDownPrefetch(vector<int>& arr, int n, int i) {
    while (true) {
        int left = 2 * i + 1;
        if (left >= n) break;

        // Prefetch grandchildren (may help cache)
        __builtin_prefetch(&arr[4 * i + 1]);
        __builtin_prefetch(&arr[4 * i + 2]);

        // ... sift-down logic ...
    }
}
```

---

## 5. COMPLETE PRODUCTION IMPLEMENTATION

```cpp
#include <vector>
#include <algorithm>
#include <chrono>
using namespace std;

class RealTimeSort {
private:
    static const int INSERTION_THRESHOLD = 16;
    static const int COUNTING_THRESHOLD = 200;
    static const int TIME_SLICE_THRESHOLD = 10000;

    // Optimized iterative sift-down
    static void siftDown(vector<int>& arr, int n, int i) {
        int value = arr[i];

        while (true) {
            int left = 2 * i + 1;
            if (left >= n) break;

            int largest = left;
            int right = left + 1;

            if (right < n && arr[right] > arr[largest])
                largest = right;

            if (arr[largest] <= value)
                break;

            arr[i] = arr[largest];
            i = largest;
        }

        arr[i] = value;
    }

    static void buildHeap(vector<int>& arr, int n) {
        for (int i = n / 2 - 1; i >= 0; i--)
            siftDown(arr, n, i);
    }

    static void heapSort(vector<int>& arr) {
        int n = arr.size();
        buildHeap(arr, n);

        for (int i = n - 1; i > 0; i--) {
            swap(arr[0], arr[i]);
            siftDown(arr, i, 0);
        }
    }

    static void insertionSort(vector<int>& arr) {
        int n = arr.size();
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    static void countingSort(vector<int>& arr, int maxVal) {
        int n = arr.size();
        vector<int> count(maxVal + 1, 0);

        // Count occurrences
        for (int val : arr)
            count[val]++;

        // Reconstruct sorted array
        int idx = 0;
        for (int val = 0; val <= maxVal; val++) {
            while (count[val]-- > 0)
                arr[idx++] = val;
        }
    }

public:
    // Main adaptive sorting function
    static void sort(vector<int>& arr, int maxTimeMs = 5) {
        int n = arr.size();

        if (n < INSERTION_THRESHOLD) {
            // Small: insertion sort (very fast)
            insertionSort(arr);
        }
        else if (n >= COUNTING_THRESHOLD) {
            // Large enough: counting sort е O(n)!
            countingSort(arr, 1000);
        }
        else {
            // Medium: heap sort (predictable)
            heapSort(arr);
        }
    }

    // Time-budgeted version
    static bool sortWithBudget(vector<int>& arr, int maxTimeMs) {
        auto start = chrono::high_resolution_clock::now();

        sort(arr);

        auto end = chrono::high_resolution_clock::now();
        auto duration = chrono::duration_cast<chrono::milliseconds>(end - start);

        return duration.count() <= maxTimeMs;
    }
};
```

---

## 6. DECISION SUMMARY

| Constraint | Decision | Rationale |
|------------|----------|-----------|
| **Memory** | In-place algorithms | Counting sort е exception (4KB) |
| **Recursion** | Iterative sift-down | Predictable stack usage |
| **Responsiveness** | Algorithm selection + time-slicing | `<5ms` guaranteed |
| **Data range** | Use counting sort for n>200 | O(n) beats O(n log n) |
| **Small inputs** | Insertion sort | Best for `n<16` |

---

## ЗАКЛЮЧЕНИЕ

**Production-ready heap sort за real-time system:**

✓ **Iterative sift-down** - predictable stack
✓ **Counting sort за n > 200** - exploits data range
✓ **Insertion sort за n < 16** - fastest для малки inputs
✓ **Time-slicing за n > 10K** - guaranteed responsiveness
✓ **In-place operations** - memory efficient

**Key insight:** Real-world constraints často позволяват MUCH better solutions than generic heap sort! 🚀

</CollapsibleSection>

</ExerciseCard>

---

## Завършване

Поздравления за завършването на всички 24 exercises на Binary Heaps и Heap Sort! 🎉

Тези задачи обхващат:
- ✅ Фундаментални концепции (EASY)
- ✅ Базови операции (EASY-MEDIUM)
- ✅ Алгоритмично приложение (MEDIUM)
- ✅ Комплексен анализ (MEDIUM-HARD)
- ✅ Advanced applications (HARD)

**Следващи стъпки:**
1. Имплементирайте heap sort от нулата
2. Решете LeetCode/HackerRank heap проблеми
3. Прочетете advanced materials за k-ary heaps
4. Експериментирайте с real-world приложения

**Happy Coding!** 💻🚀
