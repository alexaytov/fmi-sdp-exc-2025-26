---
title: "Лекция"
sidebar_position: 1
slug: lecture
tags: [binary-heaps, heap-sort, data-structures, algorithms, sorting, priority-queue, cpp]
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

# Binary Heaps и Heap Sort

<QuickSummary>

**📋 Най-важно за изпита:**

### Heap Property (ЗАДЪЛЖИТЕЛНО!)

**Max-Heap:** Всеки parent ≥ своите children (root = max)
**Min-Heap:** Всеки parent ≤ своите children (root = min)

```
Max-Heap:               Min-Heap:
     50                     10
    /  \                   /  \
   30   40                20   15
  / \  / \               / \  / \
 10 20 15 35            30 40 35 50
```

### Array Representation - Формули

```cpp
// 0-indexed array:
parent(i) = (i - 1) / 2
leftChild(i) = 2 * i + 1
rightChild(i) = 2 * i + 2
```

### Heap Операции

| Операция | Сложност | Описание |
|----------|----------|----------|
| **Sift-Down (Heapify)** | O(log n) | Премества елемент надолу |
| **Sift-Up** | O(log n) | Премества елемент нагоре |
| **Insert** | O(log n) | Добавя елемент в края, sift-up |
| **Extract Max/Min** | O(log n) | Премахва root, sift-down |
| **Build Heap** | **O(n)** ⚠️ | Floyd's bottom-up |
| **Peek** | O(1) | Връща root |

### Sift-Down (Heapify) Код

```cpp
void siftDown(vector<int>& heap, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && heap[left] > heap[largest])
        largest = left;

    if (right < n && heap[right] > heap[largest])
        largest = right;

    if (largest != i) {
        swap(heap[i], heap[largest]);
        siftDown(heap, n, largest);  // Recursive
    }
}
```

### Build Heap - Floyd's O(n) Метод

```cpp
void buildHeap(vector<int>& arr) {
    int n = arr.size();

    // Започни от последния parent, sift-down до root
    for (int i = n / 2 - 1; i >= 0; i--) {
        siftDown(arr, n, i);
    }
}
// Защо O(n)? Повечето nodes са листа (0 swaps)
// Само няколко nodes близо до root правят повече swaps
```

### Heap Sort Алгоритъм

**Phase 1:** Build max-heap - **O(n)**
**Phase 2:** Extract max n пъти - **O(n log n)**

```cpp
void heapSort(vector<int>& arr) {
    int n = arr.size();

    // Phase 1: Build max-heap
    buildHeap(arr);

    // Phase 2: Extract elements
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);      // Move max to end
        siftDown(arr, i, 0);       // Re-heapify
    }
}
```

### Heap Sort Сложност (КРИТИЧНО!)

| Характеристика | Стойност |
|----------------|----------|
| **Best Case** | O(n log n) |
| **Average Case** | O(n log n) |
| **Worst Case** | O(n log n) |
| **Space** | **O(1)** (in-place) |
| **Stable** | ❌ No |

### Сравнение с Други Алгоритми

| Алгоритъм | Time (worst) | Space | Stable | Predictable |
|-----------|--------------|-------|--------|-------------|
| **Heap Sort** | O(n log n) | O(1) | ❌ | ✅ |
| **Merge Sort** | O(n log n) | O(n) | ✅ | ✅ |
| **Quick Sort** | O(n²) | O(log n) | ❌ | ❌ |
| **Insertion Sort** | O(n²) | O(1) | ✅ | ❌ |

### Priority Queue Приложение

**Operations с Binary Heap:**
```cpp
// Max Priority Queue
void insert(int key) {
    heap.push_back(key);
    siftUp(heap.size() - 1);  // O(log n)
}

int extractMax() {
    int max = heap[0];
    heap[0] = heap.back();
    heap.pop_back();
    siftDown(0);              // O(log n)
    return max;
}

int peek() { return heap[0]; }  // O(1)
```

### Ключови Формули

- **Complete tree height:** $h = \\lfloor \\log_2 n \\rfloor$
- **Max nodes на level h:** $2^h$
- **Total nodes в complete tree:** $2^\{h+1\} - 1$
- **Build heap complexity:** $\\sum_\{h=0\}^\{\\log n\} \\frac\{n\}\{2^\{h+1\}\} \\cdot h = O(n)$

### Важни Точки за Изпита

✅ **Build heap е O(n), НЕ O(n log n)** - Floyd's bottom-up метод
✅ **Heap sort е in-place** - O(1) auxiliary space
✅ **Heap sort е unstable** - относителната подредба не се запазва
✅ **Root винаги е max/min** - O(1) достъп до екстремна стойност
✅ **Height = log n** - всички операции са O(log n) или по-добри

</QuickSummary>

<LearningObjectives
  objectives={[
    "Разбиране на структурата и свойствата на binary heaps (max-heap и min-heap)",
    "Имплементиране на heap операции (insert, delete, heapify)",
    "Анализиране на heap sort алгоритъма и неговата сложност O(n log n)",
    "Сравняване на heap sort с други sorting алгоритми",
    "Прилагане на heaps в priority queues и реални приложения"
  ]}
/>

---

## Въведение и Мотивация

### Защо ефективното сортиране е важно?

Сортирането е фундаментална операция в computer science, основа за задачи от data processing и analytics до system design. Изборът на sorting алгоритъм силно влияе върху скоростта и ресурсната ефективност на системата.

<WhyBox title="Защо Heap Sort?">

**Heap sort** се отличава като оптимален и предвидим алгоритъм, гарантиращ **O(n log n)** performance в **worst, average и best cases**.

За разлика от:
- **Quick sort** - може да деградира до O(n²) в worst case
- **Merge sort** - изисква допълнителна памет O(n)

Heap sort е **надежден** и **in-place** - използва само O(1) допълнително space.

</WhyBox>

Логаритмичният фактор в heap sort идва от **binary heap** структурата: височината на heap расте само логаритмично с броя елементи, което позволява ефективно движение и сравняване на елементи.

### Реални Приложения на Heaps

<Grid columns={2}>
  <Card title="🚀 Priority Queues">
    Използвани в операционни системи, бази данни и мрежи - където системата трябва винаги да обработва елемента с най-висок приоритет (job scheduling, packet routing).
  </Card>

  <Card title="🗺️ Shortest-Path Алгоритми">
    Алгоритми като Dijkstra's за GPS routing и networking разчитат на heap-based priority queues за бърз избор на следващия node.
  </Card>

  <Card title="📊 Top-K Queries">
    Data analytics, financial monitoring и media ranking (например намиране на top-10 YouTube videos) ефективно извличат крайни стойности чрез heaps.
  </Card>

  <Card title="⚙️ Resource-Constrained Environments">
    Heap sort's in-place свойство го прави идеален в среди с ограничена памет - embedded или real-time системи.
  </Card>
</Grid>

---

## Prerequisite Recap

### Complete Binary Trees & Array Representation

<InfoBox title="Основни Концепции">

**Complete Binary Tree:** Всички нива са пълни освен евентуално последното, което е запълнено от ляво надясно.

**Височина:** За n nodes, height ≈ log₂ n - това поддържа операциите бързи (O(log n)).

**Array Representation:** Не са нужни pointers! Nodes са подредени така, че parent/child връзките се изчисляват лесно:

</InfoBox>

```cpp
// За 0-indexed array:
int parent(int i) { return (i - 1) / 2; }
int leftChild(int i) { return 2 * i + 1; }
int rightChild(int i) { return 2 * i + 2; }
```

<CollapsibleSection title="🎯 Пример: Array Representation" icon="🎯">

Нека разгледаме heap: `[10, 8, 7, 4, 3, 2, 1]`

```
        10
       /  \
      8    7
     / \  / \
    4  3 2  1

Index:  0  1  2  3  4  5  6
Value: 10  8  7  4  3  2  1

- Parent на index 4 (value 3): (4-1)/2 = 1 (value 8) ✓
- Left child на index 1 (value 8): 2*1+1 = 3 (value 4) ✓
- Right child на index 1 (value 8): 2*1+2 = 4 (value 3) ✓
```

</CollapsibleSection>

### Big-O Нотация - Припомняне

<Grid columns={2}>
  <Card title="O(1) - Constant">
    Константно време - array access, heap peek
  </Card>

  <Card title="O(log n) - Logarithmic">
    Логаритмично време - heap операции (sift-up, sift-down)
  </Card>

  <Card title="O(n) - Linear">
    Линейно време - heap construction (bottom-up)
  </Card>

  <Card title="O(n log n) - Linearithmic">
    Най-бързото за comparison-based sorting
  </Card>
</Grid>

<WarningBox title="Избягвайте O(n²)">

За големи datasets, O(n²) алгоритми (bubble sort, insertion sort) са непрактични!

</WarningBox>

---

## Binary Heaps: Основни Концепции

### Heap Дефиниция и Свойства

<InfoBox title="Heap Property (локално правило)">

**Max-Heap:** Всеки parent ≥ своите children (root е максималният елемент)

**Min-Heap:** Всеки parent ≤ своите children (root е минималният елемент)

Това означава, че max/min елементът винаги е на върха, което прави извличането бързо - O(1).

</InfoBox>

<ComparisonBox
  wrong={{
    title: "Max-Heap",
    content: `
\`\`\`
     50
    /  \\
   30   40
  / \\  / \\
 10 20 15 35

Array: [50, 30, 40, 10, 20, 15, 35]
Root = Maximum value
\`\`\``
  }}
  correct={{
    title: "Min-Heap",
    content: `
\`\`\`
     10
    /  \\
   20   15
  / \\  / \\
 30 40 35 50

Array: [10, 20, 15, 30, 40, 35, 50]
Root = Minimum value
\`\`\``
  }}
/>

### Core Heap Операции

#### 1. Sift-Down (Heapify/Percolate-Down)

<InfoBox title="Sift-Down">

Използва се след премахване или по време на heap construction.

**Процес:**
1. Сравни node с неговите children
2. Swap с по-големия child (за max-heap)
3. Повтори докато heap property е възстановено

**Сложност:** O(log n)

</InfoBox>

```cpp
void siftDown(vector<int>& heap, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    // Провери дали left child е по-голям
    if (left < n && heap[left] > heap[largest])
        largest = left;

    // Провери дали right child е по-голям
    if (right < n && heap[right] > heap[largest])
        largest = right;

    // Ако largest не е root, swap и продължи sift-down
    if (largest != i) {
        swap(heap[i], heap[largest]);
        siftDown(heap, n, largest);
    }
}
```

<CollapsibleSection title="🔍 Trace Example: Sift-Down" icon="🔍">

Имаме нарушен max-heap: `[5, 20, 15, 10, 12, 8, 7]`

```
Initial:     5
           /   \
         20    15
        / \   / \
       10 12 8  7

Step 1: Compare 5 with children (20, 15)
        Largest = 20, swap(5, 20)

After:      20
           /   \
          5    15
         / \   / \
        10 12 8  7

Step 2: Compare 5 with children (10, 12)
        Largest = 12, swap(5, 12)

Final:      20
           /   \
         12    15
        / \   / \
       10  5 8  7

Array: [20, 12, 15, 10, 5, 8, 7] ✓ Valid max-heap!
```

</CollapsibleSection>

#### 2. Sift-Up (Percolate-Up)

<InfoBox title="Sift-Up">

Използва се при добавяне на елементи.

**Процес:**
1. Добави елемента в края
2. Сравни с parent
3. Swap ако heap property е нарушено
4. Повтори докато достигнеш root или property е възстановено

**Сложност:** O(log n)

</InfoBox>

```cpp
void siftUp(vector<int>& heap, int i) {
    int parent = (i - 1) / 2;

    // Продължи докато не сме на root и parent е по-малък
    while (i > 0 && heap[parent] < heap[i]) {
        swap(heap[i], heap[parent]);
        i = parent;
        parent = (i - 1) / 2;
    }
}

void insert(vector<int>& heap, int value) {
    heap.push_back(value);
    siftUp(heap, heap.size() - 1);
}
```

#### 3. Построяване на Heap от Unsorted Array

<SuccessBox title="Floyd's Bottom-Up Heapify - O(n) не O(n log n)!">

Вместо да вмъкваме елементи един по един (O(n log n)), можем да построим heap за O(n) време!

**Как?**
- Започни от последния parent (n/2 - 1) и sift-down към root
- Повечето nodes са близо до leaves (малко swaps), само няколко са близо до root (повече swaps)
- Общата цена е линейна!

</SuccessBox>

```cpp
void buildHeap(vector<int>& arr) {
    int n = arr.size();

    // Започни от последния parent и sift-down към root
    for (int i = n / 2 - 1; i >= 0; i--) {
        siftDown(arr, n, i);
    }
}
```

<CollapsibleSection title="📐 Математическо Доказателство: Защо O(n)?" icon="📐">

**Интуиция:**
- Половината nodes са листа - 0 swaps
- Четвърт от nodes са един level нагоре - max 1 swap всеки
- Осма от nodes са два levels нагоре - max 2 swaps всеки
- ...

**Формула:**

$$
T(n) = \sum_\{\{h=0\}\}^\{\{\log n\}\} \frac\{\{n\}\}\{\{2^\{\{h+1\}\}\}\} \cdot h
$$

Където h е височината и $\frac\{n\}\{2^\{h+1\}\}$ е броят nodes на този level.

**Резултат:** Сумата се сближава към O(n), не O(n log n)!

За разлика от n последователни insertions (всяко O(log n)), които биха дали O(n log n).

</CollapsibleSection>

---

## Heap Sort Алгоритъм

### Two-Phase Algorithm Overview

<InfoBox title="Heap Sort в Два Етапа">

1. **Heap Construction:** Превърни array в valid max-heap
2. **Extraction:** Многократно премахвай max (root), постави го в края, възстанови heap property

</InfoBox>

```cpp
void heapSort(vector<int>& arr) {
    int n = arr.size();

    // Phase 1: Build max-heap
    buildHeap(arr);

    // Phase 2: Extract elements один по един
    for (int i = n - 1; i > 0; i--) {
        // Премести текущия root в края
        swap(arr[0], arr[i]);

        // Sift-down намаления heap
        siftDown(arr, i, 0);
    }
}
```

### Phase 1: Heap Construction

<InfoBox title="🔨 Построяване на Heap">

**Използваме Floyd's метод:** За всеки node от средата към началото, извикай sift-down.

**Сложност:** O(n) благодарение на повечето nodes близо до leaves.

</InfoBox>

<CollapsibleSection title="🎬 Example: Build Heap from [4, 10, 3, 5, 1, 8, 9, 2]" icon="🎬">

```
Initial array: [4, 10, 3, 5, 1, 8, 9, 2]
Starting index: n/2 - 1 = 8/2 - 1 = 3

Tree representation:
         4
       /   \
      10    3
     / \   / \
    5  1  8  9
   /
  2

Step 1: i=3 (value 5)
  Left child (1) < 5, Right child (2) < 5
  No swap needed

Step 2: i=2 (value 3)
  Compare with children: 8, 9
  Swap 3 with 9
  [4, 10, 9, 5, 1, 8, 3, 2]

Step 3: i=1 (value 10)
  Compare with children: 5, 1
  10 > both, no swap

Step 4: i=0 (value 4)
  Compare with children: 10, 9
  Swap 4 with 10
  [10, 4, 9, 5, 1, 8, 3, 2]

  Now sift-down 4:
  Compare with children: 5, 1
  Swap 4 with 5
  [10, 5, 9, 4, 1, 8, 3, 2]

  4 is now leaf, stop

Final max-heap: [10, 5, 9, 4, 1, 8, 3, 2]

         10
       /   \
      5     9
     / \   / \
    4  1  8  3
   /
  2
```

</CollapsibleSection>

### Phase 2: Extraction and Re-heapify

<InfoBox title="Процес на Extraction">

1. **Swap** root (largest) с последния елемент
2. **Намали** heap size с 1
3. **Sift-down** новия root за възстановяване на heap property
4. **Повтори** n пъти

Sorted елементите се натрупват в края на array.

</InfoBox>

<CollapsibleSection title="🎯 Complete Trace: Heap Sort на [4, 2, 8, 1, 6]" icon="🎯">

```
Phase 1: Build Heap
Initial: [4, 2, 8, 1, 6]

Step 1: Heapify from i = (5/2 - 1) = 1 down to 0
  i=1 (value 2): compare with children (1, 6)
  Swap 2 with 6 → [4, 6, 8, 1, 2]

  i=0 (value 4): compare with children (6, 8)
  Swap 4 with 8 → [8, 6, 4, 1, 2]
  Sift-down 4 at i=2: no children, stop

Max-heap: [8, 6, 4, 1, 2]
         8
        / \
       6   4
      / \
     1   2

Phase 2: Extract Elements

Iteration 1:
  Swap 8 with 2 → [2, 6, 4, 1, | 8]
  Sift-down 2: swap with 6 → [6, 2, 4, 1, | 8]
  Sift-down 2: no swap → [6, 2, 4, 1, | 8]

Iteration 2:
  Swap 6 with 1 → [1, 2, 4, | 6, 8]
  Sift-down 1: swap with 4 → [4, 2, 1, | 6, 8]

Iteration 3:
  Swap 4 with 1 → [1, 2, | 4, 6, 8]
  Sift-down 1: swap with 2 → [2, 1, | 4, 6, 8]

Iteration 4:
  Swap 2 with 1 → [1, | 2, 4, 6, 8]
  Done (heap size = 1)

Final sorted: [1, 2, 4, 6, 8] ✓
```

</CollapsibleSection>

<WarningBox title="Защо Phase 2 е O(n log n)?">

Всяка extraction е O(log n) (един sift-down), и правим n extractions.

**Total:** n × O(log n) = O(n log n)

</WarningBox>

### Времева и Пространствена Сложност

<Grid columns={2}>
  <Card title="⏱️ Времева Сложност">
    **Phase 1:** O(n) - heap construction

    **Phase 2:** O(n log n) - n extractions

    **Total:** O(n) + O(n log n) = **O(n log n)**

    ✓ Worst case: O(n log n)
    ✓ Average case: O(n log n)
    ✓ Best case: O(n log n)
  </Card>

  <Card title="💾 Пространствена Сложност">
    **Auxiliary Space:** O(1)

    Алгоритъмът е **in-place**: използва само входния array и няколко extra променливи.

    За разлика от merge sort с O(n) auxiliary space!
  </Card>
</Grid>

---

## Сравнение с Други Sorting Алгоритми

### Heap Sort vs. Merge Sort

<ComparisonBox
  wrong={{
    title: "Heap Sort",
    content: `
**Плюсове:**
- O(1) auxiliary space (in-place)
- O(n log n) гарантирано
- Предвидим performance

**Минуси:**
- По-бавен на практика
- Not stable
- По-лоша cache locality
    `
  }}
  correct={{
    title: "Merge Sort",
    content: `
**Плюсове:**
- O(n log n) гарантирано
- Stable sort
- Отлична cache locality
- По-бърз на практика

**Минуси:**
- O(n) auxiliary space
- Не е in-place
    `
  }}
/>

### Heap Sort vs. Quick Sort

<ComparisonBox
  wrong={{
    title: "Heap Sort",
    content: `
**Плюсове:**
- O(n log n) във всички случаи
- Предвидимост
- In-place
- Няма worst-case degradation

**Минуси:**
- По-бавен average case
- Повече data movement
    `
  }}
  correct={{
    title: "Quick Sort",
    content: `
**Плюсове:**
- Най-бърз average case
- Отлична cache performance
- In-place (с малък stack)
- По-малко data movement

**Минуси:**
- O(n²) worst case
- Непредвидим
- Usually не е stable
    `
  }}
/>

### Stability

<WarningBox title="Heap Sort е Unstable">

**Unstable sort:** относителната позиция на равни елементи може да НЕ се запази.

**Пример:** Нека сортираме `[5a, 3, 5b, 2, 5c]` където subscripts различават равни елементи.

След heap sort, редът на 5-те може да се промени: `[2, 3, 5c, 5a, 5b]`

**Важно ли е?** Да, когато сортираме records които вече са сортирани по друг key!

</WarningBox>

### Обобщаваща Таблица

| Характеристика | Heap Sort | Merge Sort | Quick Sort |
|---------------|-----------|------------|------------|
| **Time (worst)** | O(n log n) | O(n log n) | O(n²) |
| **Time (average)** | O(n log n) | O(n log n) | O(n log n) |
| **Time (best)** | O(n log n) | O(n log n) | O(n log n) |
| **Space** | O(1) | O(n) | O(log n) stack |
| **Stable** | ❌ No | ✅ Yes | ❌ Usually No |
| **Cache Locality** | Moderate | Excellent | Good |
| **Predictability** | ✅ Гарантиран | ✅ Гарантиран | ⚠️ Input dependent |
| **Speed in Practice** | Moderate | Fast | **Fastest** (avg) |
| **In-Place** | ✅ Yes | ❌ No | ✅ Yes |

<SuccessBox title="Кога да използваме Heap Sort?">

**Избери Heap Sort когато:**
- Паметта е ограничена (embedded systems)
- Необходима е предвидимост (real-time systems)
- Worst-case гаранции са критични
- Stability не е важна

**Избери Merge Sort когато:**
- Stability е важна
- Имаш достатъчно памет
- Искаш по-добра cache performance

**Избери Quick Sort когато:**
- Average-case speed е най-важен
- Input обикновено е random
- Можеш да толерираш worst-case риска

</SuccessBox>

---

## N-ary Heaps: Разширения

### Ternary и Quaternary Heaps

<InfoBox title="K-ary Heaps">

**N-ary (k-ary) heaps:** Всеки node има k children вместо 2.

**Предимства:**
- По-малко levels (по-ниско дърво)
- Height = $\log_k n$ вместо $\log_2 n$

**Недостатъци:**
- Повече comparisons за sift операция
- По-сложна имплементация

</InfoBox>

<CollapsibleSection title="🔢 Индексиране за K-ary Heaps" icon="🔢">

**Бинарен Heap (k=2):**
```cpp
parent(i) = (i - 1) / 2
left_child(i) = 2*i + 1
right_child(i) = 2*i + 2
```

**Ternary Heap (k=3):**
```cpp
parent(i) = (i - 1) / 3
child_j(i) = 3*i + j + 1  // j ∈ {0, 1, 2}
// child_0 = 3*i + 1
// child_1 = 3*i + 2
// child_2 = 3*i + 3
```

**Quaternary Heap (k=4):**
```cpp
parent(i) = (i - 1) / 4
child_j(i) = 4*i + j + 1  // j ∈ {0, 1, 2, 3}
```

**General K-ary:**
```cpp
parent(i) = (i - 1) / k
child_j(i) = k * i + j + 1  // j in {0, 1, ..., k-1}
```

</CollapsibleSection>

<WarningBox title="Практическа Употреба">

**В практиката binary heaps са стандарта!**

N-ary heaps могат да са полезни ако:
- Cache misses са скъпи
- Специфични hardware характеристики

Но обикновено сложността не си заслужава минималното performance подобрение.

</WarningBox>

---

## Имплементация: Пълен Код

### Complete Heap Sort Implementation

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Sift-down operation за max-heap
void siftDown(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
        largest = left;

    if (right < n && arr[right] > arr[largest])
        largest = right;

    if (largest != i) {
        swap(arr[i], arr[largest]);
        siftDown(arr, n, largest);
    }
}

// Построяване на max-heap
void buildHeap(vector<int>& arr) {
    int n = arr.size();
    // Започни от последния parent
    for (int i = n / 2 - 1; i >= 0; i--) {
        siftDown(arr, n, i);
    }
}

// Heap Sort
void heapSort(vector<int>& arr) {
    int n = arr.size();

    // Phase 1: Build max-heap
    buildHeap(arr);

    // Phase 2: Extract elements
    for (int i = n - 1; i > 0; i--) {
        // Премести root в края
        swap(arr[0], arr[i]);

        // Sift-down намаления heap
        siftDown(arr, i, 0);
    }
}

// Helper function за печат
void printArray(const vector<int>& arr) {
    for (int val : arr)
        cout << val << " ";
    cout << endl;
}

int main() {
    vector<int> arr = {12, 11, 13, 5, 6, 7};

    cout << "Original array: ";
    printArray(arr);

    heapSort(arr);

    cout << "Sorted array: ";
    printArray(arr);

    return 0;
}
```

### Итеративна Sift-Down (за Real-Time Systems)

<InfoBox title="Защо итеративна версия?">

**Рекурсията може да е проблем в:**
- Real-time системи с stack ограничения
- Embedded systems
- Safety-critical код

**Итеративната версия:**
- Избягва stack overhead
- По-предвидимо memory използване
- Понякога по-бързо

</InfoBox>

```cpp
void siftDownIterative(vector<int>& arr, int n, int i) {
    while (true) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest])
            largest = left;

        if (right < n && arr[right] > arr[largest])
            largest = right;

        if (largest == i)
            break;

        swap(arr[i], arr[largest]);
        i = largest;
    }
}
```

---

## Priority Queue Implementation

<WhyBox title="Защо Heaps са идеални за Priority Queues?">

**Priority Queue** изисква:
- **Insert:** Добави елемент с приоритет
- **ExtractMax/Min:** Премахни елемента с най-висок/нисък приоритет
- **Peek:** Виж top елемента без да го премахваш

**Heaps предлагат:**
- Insert: O(log n)
- Extract: O(log n)
- Peek: O(1)

Идеално съотношение performance/complexity!

</WhyBox>

```cpp
template<typename T>
class MaxHeap {
private:
    vector<T> heap;

    void siftUp(int i) {
        int parent = (i - 1) / 2;
        while (i > 0 && heap[parent] < heap[i]) {
            swap(heap[i], heap[parent]);
            i = parent;
            parent = (i - 1) / 2;
        }
    }

    void siftDown(int i) {
        int n = heap.size();
        while (true) {
            int largest = i;
            int left = 2 * i + 1;
            int right = 2 * i + 2;

            if (left < n && heap[left] > heap[largest])
                largest = left;
            if (right < n && heap[right] > heap[largest])
                largest = right;

            if (largest == i) break;

            swap(heap[i], heap[largest]);
            i = largest;
        }
    }

public:
    // Вмъкване на елемент
    void insert(T value) {
        heap.push_back(value);
        siftUp(heap.size() - 1);
    }

    // Премахване на максималния елемент
    T extractMax() {
        if (heap.empty())
            throw runtime_error("Heap is empty");

        T maxVal = heap[0];
        heap[0] = heap.back();
        heap.pop_back();

        if (!heap.empty())
            siftDown(0);

        return maxVal;
    }

    // Виж максималния елемент
    T peek() const {
        if (heap.empty())
            throw runtime_error("Heap is empty");
        return heap[0];
    }

    bool isEmpty() const {
        return heap.empty();
    }

    int size() const {
        return heap.size();
    }
};
```

<CollapsibleSection title="🏥 Пример: Hospital Emergency Room Priority Queue" icon="🏥">

```cpp
struct Patient {
    string name;
    int priority;  // 1 = critical, 10 = minor

    bool operator<(const Patient& other) const {
        return priority > other.priority;  // Min-heap за по-малък = по-спешен
    }
};

int main() {
    // C++ STL priority_queue (default е max-heap)
    priority_queue<Patient> emergencyQueue;

    // Добавяне на пациенти
    emergencyQueue.push({"Alice", 5});
    emergencyQueue.push({"Bob", 2});
    emergencyQueue.push({"Charlie", 8});
    emergencyQueue.push({"Diana", 1});  // Най-критична
    emergencyQueue.push({"Eve", 6});

    cout << "Order of treatment:\n";
    while (!emergencyQueue.empty()) {
        Patient p = emergencyQueue.top();
        emergencyQueue.pop();
        cout << p.name << " (priority: " << p.priority << ")\n";
    }

    // Output:
    // Diana (priority: 1)   <- Най-спешна
    // Bob (priority: 2)
    // Alice (priority: 5)
    // Eve (priority: 6)
    // Charlie (priority: 8) <- Най-малко спешна
}
```

</CollapsibleSection>

---

## Резюме и Ключови Точки

<SuccessBox title="Основни Takeaways">

**Binary Heap:**
- Complete binary tree със heap property
- Ефективна array representation
- O(log n) операции (insert, delete)
- O(n) heap construction (Floyd's метод)

**Heap Sort:**
- O(n log n) guaranteed във всички случаи
- O(1) auxiliary space (in-place)
- Unstable sort
- Предвидим и надежден

**Приложения:**
- Priority queues
- Top-K проблеми
- Shortest path алгоритми (Dijkstra)
- Resource-constrained systems

**Избор на алгоритъм:**
- **Heap Sort:** Когато памет/предвидимост са критични
- **Merge Sort:** Когато stability е важна
- **Quick Sort:** За general-purpose, бърз average case

</SuccessBox>

<Grid columns={2}>
  <Card title="✅ Предимства">
    - Гарантирана O(n log n) сложност
    - In-place сортиране
    - Надежден и предвидим
    - Ефективна heap структура
    - Идеален за priority queues
  </Card>

  <Card title="⚠️ Недостатъци">
    - Unstable sort
    - По-бавен от Quick Sort на практика
    - По-лоша cache locality от Merge Sort
    - Повече data movement
  </Card>
</Grid>

---

## Допълнителни Ресурси

### Онлайн Туториали

- [GeeksforGeeks - Heap Sort](https://www.geeksforgeeks.org/heap-sort/) - Детайлни обяснения с примери
- [Programiz - Heap Sort Algorithm](https://www.programiz.com/dsa/heap-sort) - Интерактивни визуализации
- [TutorialsPoint - Heap Sort](https://www.tutorialspoint.com/data_structures_algorithms/heap_sort_algorithm.htm) - Стъпка по стъпка guide

### Визуализация и Примери

- [VisuAlgo - Heap](https://visualgo.net/en/heap) - Интерактивна визуализация на heap операции
- [USFCA Visualization Tool](https://www.cs.usfca.edu/~galles/visualization/Heap.html) - Heap и Heap Sort анимации
- [Algorithm Visualizer](https://algorithm-visualizer.org/brute-force/heap-sort) - Animated heap sort

### Видео Лекции

- [MIT OpenCourseWare - Heaps and Heap Sort](https://www.youtube.com/watch?v=B7hVxCmfPtM) - Академична лекция
- [Abdul Bari - Heap Sort](https://www.youtube.com/watch?v=HqPJF2L5h9U) - Детайлно обяснение

### Практически Задачи

- [LeetCode - Kth Largest Element](https://leetcode.com/problems/kth-largest-element-in-an-array/) - Използване на heaps
- [LeetCode - Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) - Priority queue application
- [HackerRank - QHEAP1](https://www.hackerrank.com/challenges/qheap1/) - Heap операции
- [CodeForces - Heap Operations](https://codeforces.com/problemset/problem/681/C) - Advanced heap problems

### Книги и Статии

- **"Introduction to Algorithms" (CLRS)** - Chapter 6: Heapsort - Математически строго обяснение
- **"Algorithm Design Manual" by Skiena** - Section 4.3: Heapsort - Практически подход
- **"Data Structures and Algorithm Analysis in C++" by Mark Allen Weiss** - Chapter 6: Priority Queues

### C++ STL Reference

- [C++ std::priority_queue](https://en.cppreference.com/w/cpp/container/priority_queue) - STL heap implementation
- [std::make_heap, std::push_heap, std::pop_heap](https://en.cppreference.com/w/cpp/algorithm/make_heap) - STL heap algorithms

---

## Exit Ticket

<InfoBox title="Самопроверка">

**Можеш ли да обясниш в 3-5 изречения:**
1. Как работи heap sort и защо е ефективен?
2. Каква е разликата между max-heap и min-heap?
3. Защо heap sort е O(n log n) във всички случаи?
4. Кога бихте избрали heap sort пред merge sort или quick sort?

</InfoBox>

<CollapsibleSection title="✅ Примерен отговор" icon="✅">

Heap sort е sorting алгоритъм, който превръща unsorted array в binary heap, след което многократно премахва largest елемент (root на max-heap) и го поставя в края на array. След всяко премахване, heap property се възстановява чрез sift-down операция.

Процесът сортира array in-place и гарантира O(n log n) performance във worst, average и best cases, което го прави по-предвидим от quicksort. Heap sort е ефективен защото изисква само constant extra space и поддържа консистентно поведение независимо от input order.

Max-heap има root като максимален елемент, докато min-heap има root като минимален. Heap sort е O(n log n) защото построяването на heap е O(n), а извличането на n елемента (всяко O(log n)) дава общо O(n log n).

Бих избрал heap sort когато паметта е ограничена (за разлика от merge sort) или когато worst-case гаранциите са критични (за разлика от quick sort), особено в embedded или real-time системи.

</CollapsibleSection>

---

**Успех с изучаването на Binary Heaps и Heap Sort!** 🚀
