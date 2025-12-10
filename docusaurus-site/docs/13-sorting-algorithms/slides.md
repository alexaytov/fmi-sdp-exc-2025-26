---
title: Сортиращи Алгоритми
theme: white
highlightTheme: github
transition: slide
controls: true
progress: true
slideNumber: true
---

# 🔢 Sorting Algorithms

## Comparison and Analysis

**Лекция 13** • Структури от Данни и Програмиране

---

## 📋 Съдържание

🎯 **Simple Sorts (Bubble, Selection, Insertion)**

⚡ **Efficient Sorts (Merge, Quick, Heap)**

📊 **Complexity Comparison**

🔍 **Special Purpose Sorts**

💡 **When to Use What**

Note:
Сортирането е една от най-изучаваните задачи в компютърните науки!

---

<!-- .slide: data-background="#e7f3ff" -->

# 🎯 Част 1

## Simple Sorting Algorithms

---

## Bubble Sort

**Идея:** Сравнявай съседни елементи, размени ако не са подредени

```cpp
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}
```

**Complexity:**
- Best: O(n) - вече сортиран
- Average/Worst: O(n²)
- Space: O(1)
- Stable: ✅

Note:
Bubble sort е прост, но неефективен за големи масиви!

---

## Selection Sort

**Идея:** Намери min/max, премести го на правилното място

```cpp
void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr[i], arr[minIdx]);
    }
}
```

**Complexity:**
- Best/Average/Worst: O(n²)
- Space: O(1)
- Stable: ❌

Note:
Selection sort прави минимум размени, но винаги е O(n²)!

---

## Insertion Sort

**Идея:** Построява сортиран масив един елемент наведнъж

```cpp
void insertionSort(vector<int>& arr) {
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
```

**Complexity:**
- Best: O(n) - почти сортиран
- Average/Worst: O(n²)
- Space: O(1)
- Stable: ✅

Note:
Insertion sort е отличен за малки масиви или почти сортирани данни!

---

<!-- .slide: data-background="#e8f5e9" -->

# Част 2

## Merge Sort

---

## Merge Sort Algorithm

**Идея:** Divide and Conquer - раздели, сортирай, обедини

```cpp
void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> temp(right - left + 1);
    int i = left, j = mid + 1, k = 0;

    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j])
            temp[k++] = arr[i++];
        else
            temp[k++] = arr[j++];
    }

    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];

    for (i = 0; i < k; i++)
        arr[left + i] = temp[i];
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}
```

Note:
Merge sort е stable и гарантирано O(n log n)!

---

## Merge Sort Example

```
Original: [38, 27, 43, 3]

Divide:
       [38, 27, 43, 3]
      /              \
  [38, 27]          [43, 3]
  /     \           /     \
[38]   [27]       [43]   [3]

Merge:
[27, 38]          [3, 43]
      \              /
       [3, 27, 38, 43]
```

**Complexity:**
- All cases: O(n log n)
- Space: O(n)
- Stable: ✅

Note:
Merge sort е предсказуем и ефективен!

---

<!-- .slide: data-background="#fff3e0" -->

# Част 3

## Quick Sort

---

## Quick Sort Algorithm

**Идея:** Избери pivot, раздели около него, сортирай рекурсивно

```cpp
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
```

Note:
Quick sort е много бърз на практика благодарение на cache locality!

---

## Quick Sort Pivot Selection

**Стратегии:**
1. **First/Last element** - прост, но лош за сортирани данни
2. **Random** - избягва worst case
3. **Median-of-three** - по-добър pivot
4. **Median-of-medians** - гарантирано O(n log n)

```cpp
// Median-of-three
int medianOfThree(vector<int>& arr, int low, int high) {
    int mid = low + (high - low) / 2;
    if (arr[low] > arr[mid]) swap(arr[low], arr[mid]);
    if (arr[low] > arr[high]) swap(arr[low], arr[high]);
    if (arr[mid] > arr[high]) swap(arr[mid], arr[high]);
    return mid;
}
```

**Complexity:**
- Best/Average: O(n log n)
- Worst: O(n²) - рядко с random pivot
- Space: O(log n)
- Stable: ❌

Note:
Изборът на pivot е критичен за производителността!

---

<!-- .slide: data-background="#f3e5f5" -->

# Част 4

## Heap Sort

---

## Heap Sort (Recap)

```cpp
void heapSort(vector<int>& arr) {
    int n = arr.size();

    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    // Extract elements one by one
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}
```

**Complexity:**
- All cases: O(n log n)
- Space: O(1)
- Stable: ❌

Note:
Heap sort гарантира O(n log n) без допълнителна памет!

---

<!-- .slide: data-background="#e0f2f1" -->

# Част 5

## Special Purpose Sorts

---

## Counting Sort

**За integers с известен range**

```cpp
void countingSort(vector<int>& arr, int maxVal) {
    vector<int> count(maxVal + 1, 0);
    vector<int> output(arr.size());

    // Count occurrences
    for (int num : arr)
        count[num]++;

    // Cumulative count
    for (int i = 1; i <= maxVal; i++)
        count[i] += count[i - 1];

    // Build output
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }

    arr = output;
}
```

**Complexity:**
- Time: O(n + k) - k е range
- Space: O(k)
- Stable: ✅

Note:
Counting sort е линеен, но изисква известен range!

---

## Radix Sort

**Сортира digit by digit**

```cpp
void radixSort(vector<int>& arr) {
    int maxNum = *max_element(arr.begin(), arr.end());

    for (int exp = 1; maxNum / exp > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
}
```

**Complexity:**
- Time: O(d * (n + k)) - d е digits
- Space: O(n + k)
- Stable: ✅

**Използва се за:**
- Сортиране на strings
- Големи integers
- Fixed-length data

Note:
Radix sort е ефективен за фиксирана дължина на данните!

---

<!-- .slide: data-background="#e8eaf6" -->

# Обобщение

---

## Sorting Algorithms Comparison

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| **Bubble** | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| **Selection** | O(n²) | O(n²) | O(n²) | O(1) | ❌ |
| **Insertion** | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| **Merge** | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ |
| **Quick** | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ |
| **Heap** | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ |
| **Counting** | O(n+k) | O(n+k) | O(n+k) | O(k) | ✅ |
| **Radix** | O(d(n+k)) | O(d(n+k)) | O(d(n+k)) | O(n+k) | ✅ |

Note:
Няма "най-добър" алгоритъм - зависи от контекста!

---

## When to Use What?

**Small arrays (n < 10):**
- Insertion Sort

**General purpose:**
- Quick Sort (default choice)
- Merge Sort (guaranteed O(n log n))

**Memory constrained:**
- Heap Sort (O(1) space)

**Stable sort needed:**
- Merge Sort
- Timsort (Python default)

**Known range/pattern:**
- Counting Sort
- Radix Sort

Note:
Изборът на алгоритъм зависи от изискванията!

---

## STL Sorting

```cpp
#include <algorithm>

vector<int> arr = {5, 2, 8, 1, 9};

// Introsort (Hybrid: Quick + Heap + Insertion)
sort(arr.begin(), arr.end());

// Stable sort (Merge sort based)
stable_sort(arr.begin(), arr.end());

// Partial sort (Heap sort based)
partial_sort(arr.begin(), arr.begin() + 3, arr.end());

// Custom comparator
sort(arr.begin(), arr.end(), greater<int>());

// Sort complex objects
struct Person {
    string name;
    int age;
};
vector<Person> people;
sort(people.begin(), people.end(),
     [](const Person& a, const Person& b) {
         return a.age < b.age;
     });
```

Note:
STL sort е оптимизиран и използва hybrid approach!

---

## Stability Matters

**Stable:** Запазва относителния ред на равни елементи

```
Original:
[{Alice, 25}, {Bob, 30}, {Charlie, 25}]

Sort by age (stable):
[{Alice, 25}, {Charlie, 25}, {Bob, 30}]
                ↑ Редът е запазен

Sort by age (unstable):
[{Charlie, 25}, {Alice, 25}, {Bob, 30}]
                ↑ Редът е променен
```

**Stable sorts:** Bubble, Insertion, Merge, Counting, Radix
**Unstable sorts:** Selection, Quick, Heap

Note:
Stability е важна при multi-key сортиране!

---

## За Изпита

✅ **Complexity table** - ЗАДЪЛЖИТЕЛНА!

✅ **Stable vs Unstable**

✅ **Best/Average/Worst cases**

✅ **Space complexity**

✅ **Кога какъв алгоритъм**

Note:
Тази таблица е ЗАДЪЛЖИТЕЛНА за изпита!

---

## Допълнителни Ресурси

**Sorting Algorithms:**
- [Sorting Algorithms - GeeksforGeeks](https://www.geeksforgeeks.org/sorting-algorithms/)
- [std::sort - cppreference](https://en.cppreference.com/w/cpp/algorithm/sort)

**Visualizations:**
- [Sorting Algorithms Visualizations](https://www.toptal.com/developers/sorting-algorithms)
- [VisuAlgo - Sorting](https://visualgo.net/en/sorting)

**Practice:**
- [LeetCode - Sorting Problems](https://leetcode.com/tag/sorting/)

Note:
Визуализациите помагат да разберете как работят алгоритмите!

---

<!-- .slide: data-background="#4caf50" -->

# Благодаря за Вниманието!

## Въпроси? 🎓

**Следваща лекция:** Bit Operations

Note:
Време за въпроси!
