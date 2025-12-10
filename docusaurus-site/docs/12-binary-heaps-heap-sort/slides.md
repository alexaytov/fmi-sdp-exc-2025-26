---
title: Binary Heaps и Heap Sort
theme: white
highlightTheme: github
transition: slide
controls: true
progress: true
slideNumber: true
---

# 📊 Binary Heaps

## Heap Sort Algorithm

**Лекция 12** • Структури от Данни и Програмиране

---

## 📋 Съдържание

🎯 **Heap Property**

🏗️ **Heap Structure**

⬆️ **Heapify Operations**

📈 **Heap Sort**

💡 **Priority Queue**

Note:
Heaps са перфектни за priority queues и heap sort!

---

<!-- .slide: data-background="#e7f3ff" -->

# 🎯 Част 1

## Heap Property

---

## Какво е Heap?

**Complete Binary Tree** със специално свойство

**Max Heap:** Parent ≥ Children
```
      100
     /   \
   80     90
  / \    /
 40  60 50
```

**Min Heap:** Parent ≤ Children
```
       10
     /   \
   20     15
  / \    /
 40  60 30
```

Note:
Heap е дърво, но НЕ е BST - няма свойството left < root < right!

---

## Array Representation

**Complete Binary Tree → Array**

```
      100
     /   \
   80     90
  / \    /
 40  60 50

Array: [100, 80, 90, 40, 60, 50]
Index:   0   1   2   3   4   5
```

**Формули:**
- Parent(i) = (i-1) / 2
- Left(i) = 2*i + 1
- Right(i) = 2*i + 2

Note:
Array представянето прави heap много ефективен за памет!

---

## Heap Property (Formally)

**Max Heap:**
```
arr[parent(i)] ≥ arr[i]  за всички i > 0
```

**Min Heap:**
```
arr[parent(i)] ≤ arr[i]  за всички i > 0
```

**Complete Tree:** Всички нива са пълни освен последното (което е запълнено отляво надясно)

Note:
Тези свойства гарантират ефективни операции!

---

<!-- .slide: data-background="#e8f5e9" -->

# Част 2

## Heapify Operations

---

## Heapify Down (Sift Down)

**Цел:** Премести елемент надолу до правилната позиция

```cpp
void heapifyDown(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    // Намери най-големия от трите
    if (left < n && arr[left] > arr[largest])
        largest = left;

    if (right < n && arr[right] > arr[largest])
        largest = right;

    // Ако не е правилно, размени и продължи
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapifyDown(arr, n, largest);
    }
}
```

**Complexity: O(log n)**

Note:
Heapify down е основна операция за поддържане на heap свойството!

---

## Heapify Up (Sift Up)

**Цел:** Премести елемент нагоре до правилната позиция

```cpp
void heapifyUp(vector<int>& arr, int i) {
    int parent = (i - 1) / 2;

    // Ако текущият е по-голям от parent, размени
    if (i > 0 && arr[i] > arr[parent]) {
        swap(arr[i], arr[parent]);
        heapifyUp(arr, parent);
    }
}
```

**Използва се при:** Insert в heap

**Complexity: O(log n)**

Note:
Heapify up "бубулира" елемента нагоре докато намери правилното му място!

---

## Build Heap

**От unsorted array → Max Heap**

```cpp
void buildHeap(vector<int>& arr) {
    int n = arr.size();

    // Heapify всички non-leaf nodes
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapifyDown(arr, n, i);
    }
}
```

**Complexity: O(n)** - не е O(n log n)!

**Защо O(n)?** Повечето nodes са близо до листата → малка височина

Note:
Удивително, build heap е линейна операция!

---

<!-- .slide: data-background="#fff3e0" -->

# Част 3

## Heap Operations

---

## Insert

```cpp
void insert(vector<int>& heap, int value) {
    // 1. Добави в края
    heap.push_back(value);

    // 2. Heapify up
    heapifyUp(heap, heap.size() - 1);
}
```

**Steps:**
```
Insert 95:

Before:      100        After:     100
            /   \                 /   \
          80    90              95    90
         / \                   / \
        40  60                80  60
                             /
                            40

Step 1: Add → Step 2: Heapify up
```

**Complexity: O(log n)**

Note:
Insert винаги добавя в края и после heapify up!

---

## Extract Max (Delete)

```cpp
int extractMax(vector<int>& heap) {
    if (heap.empty()) return -1;

    // 1. Запази корена (max)
    int max = heap[0];

    // 2. Премести последния на корена
    heap[0] = heap.back();
    heap.pop_back();

    // 3. Heapify down от корена
    if (!heap.empty())
        heapifyDown(heap, heap.size(), 0);

    return max;
}
```

**Complexity: O(log n)**

Note:
Extract винаги премества последния елемент на корена и heapify down!

---

## Heap Operations Summary

| Operation | Complexity |
|-----------|------------|
| **Build Heap** | O(n) |
| **Insert** | O(log n) |
| **Extract Max** | O(log n) |
| **Get Max** | O(1) |
| **Heapify** | O(log n) |
| **Space** | O(n) |

Note:
Heap операциите са много ефективни!

---

<!-- .slide: data-background="#f3e5f5" -->

# Част 4

## Heap Sort

---

## Heap Sort Algorithm

**Идея:** Build max heap, после extract max n пъти

```cpp
void heapSort(vector<int>& arr) {
    int n = arr.size();

    // 1. Build max heap - O(n)
    buildHeap(arr);

    // 2. Extract elements one by one - O(n log n)
    for (int i = n - 1; i > 0; i--) {
        // Премести current root в края
        swap(arr[0], arr[i]);

        // Heapify намаления heap
        heapifyDown(arr, i, 0);
    }
}
```

**Total Complexity: O(n log n)**

Note:
Heap sort е in-place сортиращ алгоритъм!

---

## Heap Sort Example

```
Original: [4, 10, 3, 5, 1]

Step 1: Build Max Heap
       10
      /  \
     5    3
    / \
   4   1
Array: [10, 5, 3, 4, 1]

Step 2: Swap & Heapify
[1, 5, 3, 4 | 10]  → Heapify → [5, 4, 3, 1 | 10]
[1, 4, 3 | 5, 10]  → Heapify → [4, 1, 3 | 5, 10]
[3, 1 | 4, 5, 10]  → Heapify → [3, 1 | 4, 5, 10]
[1 | 3, 4, 5, 10]

Sorted: [1, 3, 4, 5, 10]
```

Note:
Heap sort постепенно построява сортиран масив отдясно наляво!

---

## Heap Sort Properties

**Предимства:**
- ✅ O(n log n) worst case
- ✅ In-place (O(1) допълнителна памет)
- ✅ Не е adaptive (винаги O(n log n))

**Недостатъци:**
- ❌ Не е stable
- ❌ По-бавен от Quick Sort на практика
- ❌ Лош cache locality

Note:
Heap sort гарантира O(n log n), но Quick Sort е по-бърз на практика!

---

<!-- .slide: data-background="#e0f2f1" -->

# Част 5

## Priority Queue

---

## Priority Queue с Heap

**std::priority_queue:**
```cpp
#include <queue>

// Max heap (default)
priority_queue<int> pq;
pq.push(5);
pq.push(10);
pq.push(3);

cout << pq.top();  // 10
pq.pop();
cout << pq.top();  // 5

// Min heap
priority_queue<int, vector<int>, greater<int>> minPq;
minPq.push(5);
minPq.push(10);
minPq.push(3);

cout << minPq.top();  // 3
```

Note:
STL priority_queue използва heap вътрешно!

---

## Priority Queue Applications

**Task Scheduling:**
```cpp
struct Task {
    string name;
    int priority;

    bool operator<(const Task& other) const {
        return priority < other.priority;
    }
};

priority_queue<Task> taskQueue;
taskQueue.push({"Email", 2});
taskQueue.push({"Meeting", 5});
taskQueue.push({"Coffee", 1});

Task next = taskQueue.top();  // Meeting (priority 5)
```

**Други приложения:**
- Dijkstra's algorithm
- Huffman coding
- Event-driven simulation
- Load balancing

Note:
Priority queue е критична за много алгоритми!

---

<!-- .slide: data-background="#e8eaf6" -->

# Обобщение

---

## Ключови Изводи

**Heap Structure:**
- Complete binary tree
- Array representation
- Parent-child формули

**Heap Property:**
- Max heap: parent ≥ children
- Min heap: parent ≤ children

**Operations:**
- Build: O(n)
- Insert/Extract: O(log n)
- Heapify: O(log n)

**Heap Sort:**
- O(n log n) guaranteed
- In-place сортиране
- Не е stable

Note:
Heaps са мощна структура с гарантирана производителност!

---

## Sorting Algorithms Comparison

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ |

Note:
Heap sort гарантира O(n log n), но Merge Sort е stable!

---

## За Изпита

✅ **Array representation** - Parent/Left/Right формули

✅ **Heapify операции** - down vs up

✅ **Build heap** - O(n) не O(n log n)!

✅ **Heap sort** - build + extract

✅ **Priority queue** - heap приложение

Note:
Тези точки са често на изпити!

---

## Допълнителни Ресурси

**Binary Heaps:**
- [Heap Data Structure - GeeksforGeeks](https://www.geeksforgeeks.org/heap-data-structure/)
- [std::priority_queue - cppreference](https://en.cppreference.com/w/cpp/container/priority_queue)

**Visualizations:**
- [Heap Visualization](https://www.cs.usfca.edu/~galles/visualization/Heap.html)

**Practice:**
- [LeetCode - Heap Problems](https://leetcode.com/tag/heap-priority-queue/)

Note:
Практиката е ключова - имплементирайте собствен heap!

---

<!-- .slide: data-background="#4caf50" -->

# Благодаря за Вниманието!

## Въпроси? 🎓

**Следваща лекция:** Graphs

Note:
Време за въпроси!
