---
title: "Упражнения"
sidebar_position: 2
slug: exercises
tags: [exercises, practice, complexity, big-o, testing, double-precision, cpp]
---

import ExerciseCard from '@site/src/components/Exercise/ExerciseCard';
import ProgressTracker from '@site/src/components/Exercise/ProgressTracker';
import CollapsibleSection from '@site/src/components/CollapsibleSection';
import InfoBox from '@site/src/components/InfoBoxes/InfoBox';

# Упражнения - Complexity, Big-O, Testing и Double Precision

<ProgressTracker />

---

## Базни Упражнения (Основни Концепции)

### Задача 1: Типове Computational Complexity

<ExerciseCard
  difficulty="easy"
  timeEstimate="5 min"
  tags={["complexity", "theory", "basics"]}
>

Какви са двата основни типа computational complexity, обсъдени в лекцията? Опишете накратко какво измерва всеки.

</ExerciseCard>

<CollapsibleSection title="✅ Решение" icon="✅">

**Отговор:**
- **Time Complexity (Времева сложност):** Измерва колко време (брой операции) отнема алгоритъмът в зависимост от размера на входа.
- **Space Complexity (Пространствена сложност):** Измерва колко памет използва алгоритъмът в зависимост от размера на входа.

</CollapsibleSection>

---

### Задача 2: Big-O параметър 'n'

<ExerciseCard
  difficulty="easy"
  timeEstimate="5 min"
  tags={["big-o", "notation", "theory"]}
>

В Big-O нотация, когато казваме, че алгоритъм е O(n), какво представлява 'n'?

</ExerciseCard>

<CollapsibleSection title="✅ Решение" icon="✅">

**Отговор:** 'n' представлява **размера на входа** (input size). Например:
- Брой елементи в масив
- Дължина на стринг
- Брой nodes в дърво

</CollapsibleSection>

---

### Задача 3: Big-O константи и членове от по-нисък ред

<ExerciseCard
  difficulty="easy"
  timeEstimate="5 min"
  tags={["big-o", "simplification"]}
>

Вярно или Невярно: В Big-O нотация запазваме константните фактори и членовете от по-нисък ред когато изразяваме сложността.

</ExerciseCard>

<CollapsibleSection title="✅ Решение" icon="✅">

**Отговор:** **Невярно**

В Big-O нотация **отхвърляме**:
- Константни фактори: `5n → O(n)`
- Членове от по-нисък ред: `n² + n → O(n²)`

Big-O описва **асимптотичното поведение** при големи n.

</CollapsibleSection>

---

### Задача 4: Съпоставяне на Big-O класове

<ExerciseCard
  difficulty="easy"
  timeEstimate="5 min"
  tags={["big-o", "complexity-classes"]}
>

Съпоставете всеки Big-O клас със скоростта му на растеж:

- O(1)
- O(log n)
- O(n)
- O(n²)

**Опции:** Constant, Linear, Quadratic, Logarithmic

</ExerciseCard>

<CollapsibleSection title="✅ Решение" icon="✅">

**Отговор:**
- **O(1)** → Constant (Константна)
- **O(log n)** → Logarithmic (Логаритмична)
- **O(n)** → Linear (Линейна)
- **O(n²)** → Quadratic (Квадратична)

**Ред на растеж (от най-бърз към най-бавен):**
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)

</CollapsibleSection>

---

### Задача 5: IEEE 754 double размер

<ExerciseCard
  difficulty="easy"
  timeEstimate="5 min"
  tags={["double-precision", "ieee-754", "cpp"]}
>

Според IEEE 754, колко bits използва `double` в C++?

a) 32 bits
b) 64 bits
c) 128 bits
d) 16 bits

</ExerciseCard>

<CollapsibleSection title="✅ Решение" icon="✅">

**Отговор:** **b) 64 bits**

`double` в C++ е 64-bit floating-point число според IEEE 754 standard:
- 1 bit за sign (знак)
- 11 bits за exponent
- 52 bits за mantissa (fraction)

</CollapsibleSection>

---

### Задача 6: C++ функции за NaN и Inf

<ExerciseCard
  difficulty="easy"
  timeEstimate="5 min"
  tags={["cpp", "cmath", "nan", "inf"]}
>

Кой C++ header file съдържа функции като `std::isnan()` и `std::isinf()`?

a) `<limits>`
b) `<cmath>`
c) `<iostream>`
d) `<algorithm>`

</ExerciseCard>

<CollapsibleSection title="✅ Решение" icon="✅">

**Отговор:** **b) `<cmath>`**

```cpp
#include <cmath>

double x = 0.0 / 0.0;
if (std::isnan(x)) {
    std::cout << "x is NaN" << std::endl;
}
```

</CollapsibleSection>

---

### Задача 7: NaN (Not a Number)

<ExerciseCard
  difficulty="easy"
  timeEstimate="5 min"
  tags={["nan", "floating-point"]}
>

Какво означава NaN и дайте един пример за операция, която произвежда NaN.

</ExerciseCard>

<CollapsibleSection title="✅ Решение" icon="✅">

**NaN** означава **"Not a Number"** (Не е число)

**Примери за операции, които произвеждат NaN:**
- `0.0 / 0.0`
- `sqrt(-1.0)`
- `std::numeric_limits<double>::quiet_NaN()`
- `Inf - Inf`
- `0.0 * Inf`

</CollapsibleSection>

---

### Задача 8: Arrange-Act-Assert Testing Pattern

<ExerciseCard
  difficulty="easy"
  timeEstimate="5 min"
  tags={["testing", "aaa-pattern", "best-practices"]}
>

Какви са трите стъпки в Arrange-Act-Assert (A-A-A) testing pattern?

</ExerciseCard>

<CollapsibleSection title="✅ Решение" icon="✅">

1. **Arrange (Подготовка):** Настройте test data и prerequisites
2. **Act (Действие):** Извикайте функцията или метода, който тествате
3. **Assert (Проверка):** Проверете дали резултатът е очакваният

**Пример:**
```cpp
// Arrange
std::vector<int> arr = {1, 2, 3};

// Act
int sum = calculateSum(arr);

// Assert
assert(sum == 6);
```

</CollapsibleSection>

---

## Лесно-Средни Упражнения

### Задача 9: Анализ на код с два цикъла

<ExerciseCard
  difficulty="easy-medium"
  timeEstimate="10 min"
  tags={["complexity", "loops", "analysis"]}
>

Каква е времевата сложност на следния код фрагмент?

```cpp
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        doSomething();
    }
}
```

</ExerciseCard>

<CollapsibleSection title="💡 Подсказка" icon="💡">

Броете общо колко пъти се извиква `doSomething()`.

</CollapsibleSection>

<CollapsibleSection title="✅ Решение" icon="✅">

**Времева сложност:** O(n²)

**Обяснение:**
- Външният цикъл се изпълнява n пъти
- За всяка итерация на външния цикъл, вътрешният цикъл се изпълнява n пъти
- Общо: n × n = n² извиквания на `doSomething()`

</CollapsibleSection>

---

### Задача 10: Логаритмичен цикъл

<ExerciseCard
  difficulty="easy-medium"
  timeEstimate="10 min"
  tags={["complexity", "logarithmic", "loops"]}
>

Каква е времевата сложност на следния код?

```cpp
for (int i = 1; i < n; i *= 2) {
    doSomething();
}
```

</ExerciseCard>

<CollapsibleSection title="💡 Подсказка" icon="💡">

Колко пъти можете да удвоявате 1 преди да достигнете n?

</CollapsibleSection>

<CollapsibleSection title="✅ Решение" icon="✅">

**Времева сложност:** O(log n)

**Обяснение:**
- i приема стойности: 1, 2, 4, 8, 16, ..., n
- Това са степени на 2: 2⁰, 2¹, 2², 2³, ..., 2^k ≥ n
- k = log₂(n)
- Броят итерации е log₂(n)

</CollapsibleSection>

---

### Задача 11: Създаване на тест case

<ExerciseCard
  difficulty="easy-medium"
  timeEstimate="15 min"
  tags={["testing", "unit-test", "cpp"]}
>

Напишете проста функция `max(int a, int b)`, която връща по-голямото от две числа, заедно с тест case използвайки assert statements.

</ExerciseCard>

<CollapsibleSection title="✅ Решение" icon="✅">

```cpp
#include <cassert>
#include <iostream>

int max(int a, int b) {
    return (a > b) ? a : b;
}

void testMax() {
    // Arrange, Act, Assert pattern

    // Test 1: a > b
    assert(max(5, 3) == 5);

    // Test 2: b > a
    assert(max(2, 7) == 7);

    // Test 3: a == b
    assert(max(4, 4) == 4);

    // Test 4: negative numbers
    assert(max(-3, -5) == -3);

    // Test 5: mixed signs
    assert(max(-2, 3) == 3);

    std::cout << "All tests passed!" << std::endl;
}

int main() {
    testMax();
    return 0;
}
```

</CollapsibleSection>

---

### Задача 12: NaN сравнение

<ExerciseCard
  difficulty="easy-medium"
  timeEstimate="10 min"
  tags={["nan", "floating-point", "comparison"]}
>

Напишете код, който проверява дали double променлива `x` е NaN **без** да използвате `std::isnan()`. Обяснете защо това работи.

</ExerciseCard>

<CollapsibleSection title="💡 Подсказка" icon="💡">

Помислете за свойството на NaN при сравнения със себе си.

</CollapsibleSection>

<CollapsibleSection title="✅ Решение" icon="✅">

```cpp
#include <iostream>

bool isNaN(double x) {
    return x != x;  // NaN е единственото число != себе си
}

int main() {
    double nan = 0.0 / 0.0;
    double regular = 5.0;

    std::cout << "nan is NaN: " << isNaN(nan) << std::endl;     // true
    std::cout << "5.0 is NaN: " << isNaN(regular) << std::endl;  // false

    return 0;
}
```

**Обяснение:** Според IEEE 754 standard, NaN е единственото число, което **НЕ Е равно на себе си**. Всяко сравнение включващо NaN връща false, включително `NaN == NaN`.

</CollapsibleSection>

---

## Средни Упражнения

### Задача 13: Сравнение на сложности

<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["complexity", "comparison", "analysis"]}
>

Подредете следните функции по ред на растеж (от най-бавна към най-бърза):

- f(n) = n²
- g(n) = n log n
- h(n) = 2ⁿ
- k(n) = n!
- m(n) = √n

</ExerciseCard>

<CollapsibleSection title="✅ Решение" icon="✅">

**Ред от най-бърза към най-бавна:**

1. **√n** - Sublinear
2. **n log n** - Linearithmic
3. **n²** - Quadratic
4. **2ⁿ** - Exponential
5. **n!** - Factorial (най-бавна)

**Визуално (за n = 10):**
- √10 ≈ 3
- 10 log₂ 10 ≈ 33
- 10² = 100
- 2¹⁰ = 1,024
- 10! = 3,628,800

</CollapsibleSection>

---

### Задача 14: Edge cases в тестване

<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["testing", "edge-cases", "best-practices"]}
>

Напишете comprehensive test cases за функция `divide(double a, double b)`, която дели две числа. Включете edge cases.

</ExerciseCard>

<CollapsibleSection title="✅ Решение" icon="✅">

```cpp
#include <cassert>
#include <cmath>
#include <limits>

double divide(double a, double b) {
    return a / b;
}

void testDivide() {
    const double INF = std::numeric_limits<double>::infinity();
    const double EPSILON = 1e-9;

    // Normal cases
    assert(std::abs(divide(10.0, 2.0) - 5.0) < EPSILON);
    assert(std::abs(divide(7.0, 2.0) - 3.5) < EPSILON);

    // Division by zero
    assert(std::isinf(divide(1.0, 0.0)));  // Inf
    assert(std::isnan(divide(0.0, 0.0)));  // NaN

    // Negative numbers
    assert(divide(-10.0, 2.0) == -5.0);
    assert(divide(10.0, -2.0) == -5.0);
    assert(divide(-10.0, -2.0) == 5.0);

    // Very small numbers
    assert(divide(1e-300, 1e-200) < 1e-90);

    // Infinity cases
    assert(std::isnan(divide(INF, INF)));  // Inf/Inf = NaN
    assert(divide(5.0, INF) == 0.0);       // 5/Inf = 0
    assert(std::isinf(divide(INF, 2.0)));  // Inf/2 = Inf

    std::cout << "All divide tests passed!" << std::endl;
}
```

</CollapsibleSection>

---

### Задача 15: Рекурсивна сложност

<ExerciseCard
  difficulty="medium"
  timeEstimate="20 min"
  tags={["complexity", "recursion", "analysis"]}
>

Анализирайте времевата сложност на следната рекурсивна функция:

```cpp
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}
```

</ExerciseCard>

<CollapsibleSection title="💡 Подсказка" icon="💡">

Нарисувайте дървото на рекурсивните извиквания за малко n (напр. n=5).

</CollapsibleSection>

<CollapsibleSection title="✅ Решение" icon="✅">

**Времева сложност:** O(2ⁿ) - експоненциална

**Обяснение:**

Всяко извикване прави 2 рекурсивни извиквания:
```
                    fib(5)
                   /      \
              fib(4)      fib(3)
             /     \      /     \
        fib(3)  fib(2) fib(2) fib(1)
        /   \    /  \   /  \
     fib(2) fib(1) ...
```

- Височината на дървото: n
- Брой nodes: приблизително 2ⁿ
- **Много неефективно!** За n=40 → милиарди извиквания

**По-добро решение с memoization: O(n)**

```cpp
int fibMemo(int n, std::vector<int>& memo) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    memo[n] = fibMemo(n-1, memo) + fibMemo(n-2, memo);
    return memo[n];
}
```

</CollapsibleSection>

---

### Задача 16: Floating-point precision проблеми

<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["floating-point", "precision", "comparison"]}
>

Обяснете защо `0.1 + 0.2 == 0.3` може да върне `false` в C++. Как да сравняваме floating-point numbers коректно?

</ExerciseCard>

<CollapsibleSection title="✅ Решение" icon="✅">

**Проблем:** Много десетични дроби **не могат да бъдат представени точно** в binary floating-point.

```cpp
#include <iostream>
#include <iomanip>

int main() {
    double a = 0.1 + 0.2;
    double b = 0.3;

    std::cout << std::setprecision(20);
    std::cout << "a = " << a << std::endl;  // 0.30000000000000004441
    std::cout << "b = " << b << std::endl;  // 0.29999999999999998890
    std::cout << "a == b: " << (a == b) << std::endl;  // false!

    return 0;
}
```

**Правилен начин за сравнение:**

```cpp
bool almostEqual(double a, double b, double epsilon = 1e-9) {
    return std::abs(a - b) < epsilon;
}

// Използване:
if (almostEqual(0.1 + 0.2, 0.3)) {
    std::cout << "Equal (with tolerance)" << std::endl;
}
```

</CollapsibleSection>

---

## Средно-Трудни Упражнения

### Задача 17: Master Theorem приложение

<ExerciseCard
  difficulty="medium-hard"
  timeEstimate="20 min"
  tags={["complexity", "master-theorem", "recurrence"]}
>

Използвайки Master Theorem, определете времевата сложност на:

```cpp
void algorithm(int n) {
    if (n <= 1) return;
    algorithm(n/2);
    algorithm(n/2);
    // O(n) работа тук
    for (int i = 0; i < n; i++) {
        // constant work
    }
}
```

</ExerciseCard>

<CollapsibleSection title="💡 Подсказка" icon="💡">

Master Theorem: T(n) = aT(n/b) + f(n)

Идентифицирайте a, b и f(n).

</CollapsibleSection>

<CollapsibleSection title="✅ Решение" icon="✅">

**Рекурентно уравнение:** T(n) = 2T(n/2) + O(n)

**Master Theorem параметри:**
- a = 2 (два рекурсивни извиквания)
- b = 2 (делим на 2)
- f(n) = O(n) (линейна работа)

**Сравнение:**
- n^(log_b a) = n^(log_2 2) = n^1 = n
- f(n) = n

Тъй като f(n) = Θ(n^(log_b a)), прилагаме **Case 2**:

**T(n) = Θ(n log n)**

**Примери с такава сложност:**
- Merge Sort
- Quick Sort (average case)
- Heap Sort

</CollapsibleSection>

---

### Задача 18: Test-Driven Development (TDD)

<ExerciseCard
  difficulty="medium-hard"
  timeEstimate="30 min"
  tags={["testing", "tdd", "implementation"]}
>

Следвайки TDD принципа (Red-Green-Refactor), имплементирайте функция `binarySearch` с comprehensive test suite.

Стъпки:
1. Напишете тестове първо (те ще fail)
2. Имплементирайте минимален код да минат
3. Refactor за по-добър дизайн

</ExerciseCard>

<CollapsibleSection title="✅ Решение" icon="✅">

```cpp
#include <vector>
#include <cassert>
#include <iostream>

// Step 1: Write tests FIRST (will fail initially)
void testBinarySearch() {
    std::vector<int> arr = {1, 3, 5, 7, 9, 11, 13};

    // Test: element exists in middle
    assert(binarySearch(arr, 7) == 3);

    // Test: element at beginning
    assert(binarySearch(arr, 1) == 0);

    // Test: element at end
    assert(binarySearch(arr, 13) == 6);

    // Test: element doesn't exist
    assert(binarySearch(arr, 4) == -1);
    assert(binarySearch(arr, 0) == -1);
    assert(binarySearch(arr, 15) == -1);

    // Test: empty array
    std::vector<int> empty;
    assert(binarySearch(empty, 5) == -1);

    // Test: single element
    std::vector<int> single = {5};
    assert(binarySearch(single, 5) == 0);
    assert(binarySearch(single, 3) == -1);

    std::cout << "All binary search tests passed!" << std::endl;
}

// Step 2: Implement to pass tests
int binarySearch(const std::vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;  // Avoid overflow

        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;  // Not found
}

// Step 3: Refactor if needed (code is already clean)

int main() {
    testBinarySearch();
    return 0;
}
```

**TDD Benefits:**
- Тестовете документират expected behavior
- Предотвратява regression bugs
- Насърчава modular design

</CollapsibleSection>

---

### Задача 19: Space complexity анализ

<ExerciseCard
  difficulty="medium-hard"
  timeEstimate="20 min"
  tags={["complexity", "space", "memory"]}
>

Анализирайте space complexity (auxiliary space) на следните алгоритми:

a) Iterative factorial
b) Recursive factorial
c) Merge sort
d) Quick sort

</ExerciseCard>

<CollapsibleSection title="✅ Решение" icon="✅">

**a) Iterative Factorial**
```cpp
int factorialIterative(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
```
**Space complexity: O(1)** - използва само константен брой променливи

---

**b) Recursive Factorial**
```cpp
int factorialRecursive(int n) {
    if (n <= 1) return 1;
    return n * factorialRecursive(n-1);
}
```
**Space complexity: O(n)** - call stack с n frames

---

**c) Merge Sort**
```cpp
void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = (left + right) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid+1, right);
        merge(arr, left, mid, right);  // Needs temporary array
    }
}
```
**Space complexity: O(n)** - temporary array за merge + O(log n) stack

---

**d) Quick Sort**
```cpp
void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi-1);
        quickSort(arr, pi+1, high);
    }
}
```
**Space complexity:**
- **Best/Average: O(log n)** - balanced recursion depth
- **Worst: O(n)** - unbalanced (all elements on one side)

</CollapsibleSection>

---

### Задача 20: Floating-point denormalized numbers

<ExerciseCard
  difficulty="medium-hard"
  timeEstimate="25 min"
  tags={["floating-point", "ieee-754", "advanced"]}
>

Обяснете какво са denormalized (subnormal) numbers в IEEE 754. Защо съществуват и какви са performance implications?

</ExerciseCard>

<CollapsibleSection title="✅ Решение" icon="✅">

**Denormalized (Subnormal) Numbers:**

Нормални floating-point числа имат implicit leading 1:
- Mantissa: 1.xxxxx × 2^exponent
- Минимално нормално double: ~2.2 × 10^-308

**Проблем:** Голям gap между 0 и минималното нормално число!

**Решение:** Denormalized numbers попълват този gap
- Когато exponent = 0 (all zeros)
- Implicit leading bit е **0** (не 1)
- Format: 0.xxxxx × 2^(-1022)

**Пример:**
```cpp
#include <iostream>
#include <limits>
#include <cmath>

int main() {
    double min_normal = std::numeric_limits<double>::min();
    double denormal = min_normal / 2.0;

    std::cout << "Min normal: " << min_normal << std::endl;
    std::cout << "Denormal: " << denormal << std::endl;
    std::cout << "Is denormal: " << std::fpclassify(denormal) == FP_SUBNORMAL << std::endl;
}
```

**Performance Implications:**
- ⚠️ **МНОГО ПО-БАВНИ** - hardware често не ги оптимизира
- Може да са **10-100x по-бавни** от нормални числа
- Някои системи ги handle-ват със software emulation
- Причина за неочаквани performance проблеми

**Практическо решение:**
```cpp
// Flush denormals to zero за performance
#include <xmmintrin.h>
_MM_SET_FLUSH_ZERO_MODE(_MM_FLUSH_ZERO_ON);
```

</CollapsibleSection>

---

## Трудни Упражнения

### Задача 21: Амортизирана complexity анализ

<ExerciseCard
  difficulty="hard"
  timeEstimate="30 min"
  tags={["complexity", "amortized", "analysis"]}
>

Анализирайте амортизираната complexity на `push_back` операцията за dynamic array (като `std::vector`), който удвоява capacity при resize.

</ExerciseCard>

<CollapsibleSection title="✅ Решение" icon="✅">

**Dynamic Array Resize Strategy:**
- Започва с capacity = 1
- Когато е пълен, удвоява capacity
- Копира всички елементи в новия по-голям array

**Анализ за n consecutive push_back:**

**Resize операции:**
- n=1: copy 1 element
- n=2: copy 2 elements
- n=4: copy 4 elements
- n=8: copy 8 elements
- ...
- Total copies: 1 + 2 + 4 + 8 + ... + n/2 = n - 1

**Amortized Analysis:**
- Total работа: n insertions + (n-1) copies
- Total: 2n - 1 операции
- Amortized cost per operation: (2n-1)/n ≈ 2
- **Amortized O(1)** per push_back!

**Детайлна таблица:**

| Операция | Capacity | Copy Cost | Cumulative |
|----------|----------|-----------|------------|
| push 1   | 1        | 0         | 0          |
| push 2   | 2        | 1         | 1          |
| push 3   | 4        | 2         | 3          |
| push 4   | 4        | 0         | 3          |
| push 5   | 8        | 4         | 7          |
| ...      | ...      | ...       | ...        |
| push n   | ~n       | ~n/2      | ~2n        |

**Average: 2n/n = 2 = O(1)**

</CollapsibleSection>

---

### Задача 22: Comprehensive тестване на математически функции

<ExerciseCard
  difficulty="hard"
  timeEstimate="40 min"
  tags={["testing", "floating-point", "comprehensive"]}
>

Имплементирайте robust test suite за функция `sqrt(double x)`, която изчислява квадратен корен. Включете:
- Normal cases
- Edge cases (0, негативни, много големи/малки числа)
- Special values (NaN, Inf)
- Precision validation

</ExerciseCard>

<CollapsibleSection title="✅ Решение" icon="✅">

```cpp
#include <cmath>
#include <cassert>
#include <limits>
#include <iostream>

// Simplified sqrt implementation (Newton's method)
double mySqrt(double x) {
    if (x < 0) return std::numeric_limits<double>::quiet_NaN();
    if (x == 0 || std::isinf(x)) return x;
    if (std::isnan(x)) return x;

    double guess = x / 2.0;
    const double epsilon = 1e-15;
    const int maxIter = 100;

    for (int i = 0; i < maxIter; i++) {
        double newGuess = (guess + x / guess) / 2.0;
        if (std::abs(newGuess - guess) < epsilon) {
            return newGuess;
        }
        guess = newGuess;
    }

    return guess;
}

void testSqrt() {
    const double epsilon = 1e-9;

    // === NORMAL CASES ===
    std::cout << "Testing normal cases..." << std::endl;
    assert(std::abs(mySqrt(4.0) - 2.0) < epsilon);
    assert(std::abs(mySqrt(9.0) - 3.0) < epsilon);
    assert(std::abs(mySqrt(2.0) - 1.414213562) < epsilon);
    assert(std::abs(mySqrt(100.0) - 10.0) < epsilon);

    // === EDGE CASES ===
    std::cout << "Testing edge cases..." << std::endl;

    // Zero
    assert(mySqrt(0.0) == 0.0);

    // Very small numbers
    assert(std::abs(mySqrt(1e-100) - 1e-50) < 1e-55);

    // Very large numbers
    assert(std::abs(mySqrt(1e100) - 1e50) < 1e45);

    // Negative numbers should return NaN
    assert(std::isnan(mySqrt(-1.0)));
    assert(std::isnan(mySqrt(-100.0)));

    // === SPECIAL VALUES ===
    std::cout << "Testing special values..." << std::endl;

    // Positive infinity
    assert(std::isinf(mySqrt(std::numeric_limits<double>::infinity())));

    // NaN input should return NaN
    assert(std::isnan(mySqrt(std::numeric_limits<double>::quiet_NaN())));

    // === PRECISION VALIDATION ===
    std::cout << "Testing precision..." << std::endl;

    // Compare with std::sqrt
    for (double x = 0.1; x < 1000.0; x *= 1.5) {
        double myResult = mySqrt(x);
        double stdResult = std::sqrt(x);
        double relativeError = std::abs(myResult - stdResult) / stdResult;
        assert(relativeError < 1e-10);  // Less than 1e-10 relative error
    }

    // === BOUNDARY CASES ===
    std::cout << "Testing boundaries..." << std::endl;

    // Smallest positive normal double
    double minNormal = std::numeric_limits<double>::min();
    assert(std::abs(mySqrt(minNormal) - std::sqrt(minNormal)) / std::sqrt(minNormal) < 1e-10);

    // Largest double
    double maxDouble = std::numeric_limits<double>::max();
    assert(std::abs(mySqrt(maxDouble) - std::sqrt(maxDouble)) / std::sqrt(maxDouble) < 1e-10);

    std::cout << "All sqrt tests passed! ✅" << std::endl;
}

int main() {
    testSqrt();
    return 0;
}
```

**Test Coverage:**
✅ Normal inputs
✅ Edge cases (0, tiny, huge)
✅ Special values (NaN, Inf)
✅ Precision validation
✅ Boundary values
✅ Error handling (negative inputs)

</CollapsibleSection>

---

### Задача 23: Worst-case vs Average-case complexity

<ExerciseCard
  difficulty="hard"
  timeEstimate="30 min"
  tags={["complexity", "analysis", "algorithms"]}
>

Анализирайте Quick Sort алгоритъма:
- Какъв е worst-case time complexity?
- Какъв е average-case time complexity?
- Защо има такава разлика?
- Как можем да го подобрим?

</ExerciseCard>

<CollapsibleSection title="✅ Решение" icon="✅">

**Quick Sort Complexity:**

**Worst Case: O(n²)**
- Случва се когато pivot винаги е най-малкият или най-големият елемент
- Например: сортиран или reverse-sorted масив с naive pivot selection
- Рекурентно: T(n) = T(n-1) + T(0) + O(n) = T(n-1) + O(n) = O(n²)

```
Worst case дърво (винаги избираме най-малкия):
     [1,2,3,4,5]
    /
   [2,3,4,5]
  /
 [3,4,5]
/
...
Height = n, работа на всяко ниво = O(n) → O(n²)
```

**Average Case: O(n log n)**
- Предполага random pivot selection или good partition
- В средно балансирани partitions
- Рекурентно: T(n) = 2T(n/2) + O(n) → O(n log n) (Master Theorem)

```
Average case дърво (добри partitions):
       [pivot]
      /       \
    n/2       n/2
   /  \      /  \
 n/4  n/4  n/4  n/4
...
Height = log n, работа на всяко ниво = O(n) → O(n log n)
```

**Защо такава разлика:**
- **Worst case:** Несбалансирани partitions → дълбоко дърво
- **Average case:** Балансирани partitions → плитко дърво
- Pivot selection е критичен!

**Подобрения:**

1. **Randomized Pivot:**
```cpp
int randomPivot = arr[rand() % (right - left + 1) + left];
// Average case почти винаги O(n log n)
```

2. **Median-of-Three:**
```cpp
int mid = (left + right) / 2;
int pivot = median(arr[left], arr[mid], arr[right]);
// Избягва worst case за sorted arrays
```

3. **Introsort (Hybrid):**
```cpp
// Start with QuickSort
// If recursion depth > 2*log(n), switch to HeapSort
// Guarantees O(n log n) worst case!
// Използва се в std::sort
```

**Comparison:**

| Algorithm | Worst | Average | Space |
|-----------|-------|---------|-------|
| Quick Sort (naive) | O(n²) | O(n log n) | O(log n) |
| Quick Sort (randomized) | O(n²) | O(n log n) | O(log n) |
| Introsort | O(n log n) | O(n log n) | O(log n) |
| Merge Sort | O(n log n) | O(n log n) | O(n) |

</CollapsibleSection>

---

:::info Забележка
Тази лекция съдържа 23 упражнения, покриващи всички нива на трудност от easy до hard. За допълнителна практика, разгледайте упражненията от следващите лекции.
:::

