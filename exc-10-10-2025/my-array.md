# Задача: Създаване на собствена имплементация на статичен масив (Static Array)

Ще създадем клас `StaticArray<T, N>`, който работи като `std::array`, но изграден от нулата.[^1][^2]

***

## Част 1: Базова имплементация

### Стъпка 1: Създаване на template структура

Започнете с template и основната структура на класа:[^2][^1]

```cpp
#include <iostream>
#include <stdexcept>

template<typename T, size_t N>
class StaticArray {
private:
    T data[N];  // C-style array that stores elements
    
public:
    // Methods will go here
};
```

**Какво прави този код:**

- `template<typename T, size_t N>` - дефинира T като тип и N като размер[^1]
- `T data[N]` - вътрешен масив, който съхранява елементите[^2]

**Тест код за Стъпка 1:**

```cpp
int main() {
    StaticArray<int, 5> arr;
    std::cout << "Array created successfully!\n";
    return 0;
}
```


***

### Стъпка 2: Добавяне на size() метод

Създайте метод, който връща размера на масива:[^3]

```cpp
// Add this inside the public section:
size_t size() const {
    return N;
}
```

**Какво прави този код:**

- `const` след метода означава, че методът не променя данните[^4][^3]
- Връща размера N на масива

**Тест код за Стъпка 2:**

```cpp
int main() {
    StaticArray<int, 5> arr;
    std::cout << "Array size: " << arr.size() << std::endl;
    return 0;
}
```


***

### Стъпка 3: Добавяне на operator[] за достъп без проверка

Имплементирайте оператор `[]` за достъп до елементи:[^5][^6]

```cpp
// Add these methods:
T& operator[](size_t index) {
    return data[index];
}

const T& operator[](size_t index) const {
    return data[index];
}
```

**Какво прави този код:**

- `operator[]` - overload на оператора `[]`[^6][^5]
- `T&` връща reference към елемента (позволява промяна)[^7]
- Двете версии - една за non-const обекти, друга за const[^3]

**Тест код за Стъпка 3:**

```cpp
int main() {
    StaticArray<int, 5> arr;
    
    // Set values
    arr[^0] = 10;
    arr[^1] = 20;
    arr[^2] = 30;
    
    // Print values
    std::cout << "arr[^0] = " << arr[^0] << std::endl;
    std::cout << "arr[^1] = " << arr[^1] << std::endl;
    std::cout << "arr[^2] = " << arr[^2] << std::endl;
    
    return 0;
}
```


***

### Стъпка 4: Добавяне на at() метод с проверка

Създайте метод `at()`, който проверява дали индексът е валиден:

```cpp
// Add these methods:
T& at(size_t index) {
    if (index >= N) {
        throw std::out_of_range("Index out of bounds");
    }
    return data[index];
}

const T& at(size_t index) const {
    if (index >= N) {
        throw std::out_of_range("Index out of bounds");
    }
    return data[index];
}
```

**Какво прави този код:**

- Проверява дали индексът е валиден (`index >= N`)
- Хвърля `std::out_of_range` exception ако индексът е невалиден
- По-безопасен от `operator[]`

**Тест код за Стъпка 4:**

```cpp
int main() {
    StaticArray<int, 5> arr;
    arr[^0] = 100;
    
    try {
        std::cout << "arr.at(0) = " << arr.at(0) << std::endl;
        std::cout << "arr.at(10) = " << arr.at(10) << std::endl; // Error
    } catch (const std::out_of_range& e) {
        std::cout << "Exception caught: " << e.what() << std::endl;
    }
    
    return 0;
}
```


***

### Стъпка 5: Добавяне на front() метод

Създайте метод за достъп до първия елемент:

```cpp
// Add these methods:
T& front() {
    return data[^0];
}

const T& front() const {
    return data[^0];
}
```

**Какво прави този код:**

- Връща reference към първия елемент (`data`)
- Две версии - const и non-const[^3]

**Тест код за Стъпка 5:**

```cpp
int main() {
    StaticArray<int, 5> arr;
    arr[^0] = 111;
    arr[^1] = 222;
    
    std::cout << "First element: " << arr.front() << std::endl;
    
    arr.front() = 999;
    std::cout << "After modification: " << arr.front() << std::endl;
    
    return 0;
}
```


***

### Стъпка 6: Добавяне на back() метод

Създайте метод за достъп до последния елемент:

```cpp
// Add these methods:
T& back() {
    return data[N - 1];
}

const T& back() const {
    return data[N - 1];
}
```

**Какво прави този код:**

- Връща reference към последния елемент (`data[N - 1]`)
- `N - 1` защото индексирането започва от 0

**Тест код за Стъпка 6:**

```cpp
int main() {
    StaticArray<int, 5> arr;
    arr[^0] = 10;
    arr[^4] = 50;
    
    std::cout << "First: " << arr.front() << std::endl;
    std::cout << "Last: " << arr.back() << std::endl;
    
    return 0;
}
```


***

### Стъпка 7: Добавяне на fill() метод

Създайте метод, който попълва целия масив с една стойност:

```cpp
// Add this method:
void fill(const T& value) {
    for (size_t i = 0; i < N; ++i) {
        data[i] = value;
    }
}
```

**Какво прави този код:**

- `const T& value` - приема стойността по reference (по-ефективно)[^7]
- Loop, който присвоява тази стойност на всички елементи

**Тест код за Стъпка 7:**

```cpp
int main() {
    StaticArray<int, 5> arr;
    
    arr.fill(42);
    
    std::cout << "After fill(42): ";
    for (size_t i = 0; i < arr.size(); ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```


***

### Стъпка 8: Добавяне на empty() метод

Проверка дали масивът е празен:

```cpp
// Add this method:
bool empty() const {
    return N == 0;
}
```

**Какво прави този код:**

- Връща `true` ако N е 0, иначе `false`
- Полезно за generic код[^3]

**Тест код за Стъпка 8:**

```cpp
int main() {
    StaticArray<int, 5> arr1;
    StaticArray<int, 0> arr2;
    
    std::cout << "arr1.empty(): " << (arr1.empty() ? "Yes" : "No") << std::endl;
    std::cout << "arr2.empty(): " << (arr2.empty() ? "Yes" : "No") << std::endl;
    
    return 0;
}
```


***

### Пълен тест за базовата имплементация:

```cpp
int main() {
    std::cout << "=== BASIC IMPLEMENTATION TESTS ===\n\n";
    
    // Create array
    StaticArray<int, 5> arr;
    std::cout << "Test 1: Array created\n";
    std::cout << "Size: " << arr.size() << std::endl;
    std::cout << "Empty: " << (arr.empty() ? "Yes" : "No") << "\n\n";
    
    // Fill array manually
    std::cout << "Test 2: Manual filling\n";
    arr[^0] = 1;
    arr[^1] = 2;
    arr[^2] = 3;
    arr[^3] = 4;
    arr[^4] = 5;
    
    std::cout << "Elements: ";
    for (size_t i = 0; i < arr.size(); ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << "\n\n";
    
    // Test at() method
    std::cout << "Test 3: at() method\n";
    try {
        std::cout << "arr.at(2) = " << arr.at(2) << std::endl;
        std::cout << "arr.at(10) = " << arr.at(10) << std::endl;
    } catch (const std::out_of_range& e) {
        std::cout << "Exception: " << e.what() << "\n\n";
    }
    
    // Test front() and back()
    std::cout << "Test 4: front() and back()\n";
    std::cout << "Front: " << arr.front() << std::endl;
    std::cout << "Back: " << arr.back() << "\n\n";
    
    // Test fill()
    std::cout << "Test 5: fill() method\n";
    arr.fill(99);
    std::cout << "After fill(99): ";
    for (size_t i = 0; i < arr.size(); ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << "\n\n";
    
    std::cout << "=== ALL BASIC TESTS COMPLETED ===\n";
    
    return 0;
}
```


***

## Част 2: Напреднали функционалности

### Стъпка 9: Добавяне на iterator поддръжка

**Обяснение:** Iterators позволяват да използваме класа с range-based for loops и STL algorithms.[^2]

**Код за копиране (добавете в public секцията):**

```cpp
// Iterator types
using iterator = T*;
using const_iterator = const T*;

// Begin iterator
iterator begin() {
    return data;
}

const_iterator begin() const {
    return data;
}

// End iterator
iterator end() {
    return data + N;
}

const_iterator end() const {
    return data + N;
}

// Const iterators
const_iterator cbegin() const {
    return data;
}

const_iterator cend() const {
    return data + N;
}
```

**Защо работи това:**

- Използваме pointers като iterators[^2]
- `data` сочи към началото на масива
- `data + N` сочи след края на масива

**Тест код за Стъпка 9:**

```cpp
int main() {
    StaticArray<int, 5> arr;
    arr.fill(0);
    arr[^0] = 10;
    arr[^1] = 20;
    arr[^2] = 30;
    arr[^3] = 40;
    arr[^4] = 50;
    
    std::cout << "Range-based for loop: ";
    for (const auto& elem : arr) {
        std::cout << elem << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```


***

### Стъпка 10: Reverse iterators

**Обяснение:** Reverse iterators позволяват итерация от край към начало.

**Код за копиране (добавете `#include <iterator>` в началото и тези методи в класа):**

```cpp
// Reverse iterator types
using reverse_iterator = std::reverse_iterator<iterator>;
using const_reverse_iterator = std::reverse_iterator<const_iterator>;

// Reverse begin
reverse_iterator rbegin() {
    return reverse_iterator(end());
}

const_reverse_iterator rbegin() const {
    return const_reverse_iterator(end());
}

// Reverse end
reverse_iterator rend() {
    return reverse_iterator(begin());
}

const_reverse_iterator rend() const {
    return const_reverse_iterator(begin());
}

// Const reverse iterators
const_reverse_iterator crbegin() const {
    return const_reverse_iterator(end());
}

const_reverse_iterator crend() const {
    return const_reverse_iterator(begin());
}
```

**Тест код за Стъпка 10:**

```cpp
int main() {
    StaticArray<int, 5> arr;
    arr[^0] = 1;
    arr[^1] = 2;
    arr[^2] = 3;
    arr[^3] = 4;
    arr[^4] = 5;
    
    std::cout << "Normal: ";
    for (const auto& elem : arr) {
        std::cout << elem << " ";
    }
    std::cout << std::endl;
    
    std::cout << "Reversed: ";
    for (auto it = arr.rbegin(); it != arr.rend(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```


***

### Стъпка 11: Swap метод

**Обяснение:** Swap разменя съдържанието на два масива.

**Код за копиране:**

```cpp
void swap(StaticArray<T, N>& other) {
    for (size_t i = 0; i < N; ++i) {
        T temp = data[i];
        data[i] = other.data[i];
        other.data[i] = temp;
    }
}
```

**Тест код за Стъпка 11:**

```cpp
int main() {
    StaticArray<int, 3> arr1;
    StaticArray<int, 3> arr2;
    
    arr1[^0] = 1; arr1[^1] = 2; arr1[^2] = 3;
    arr2[^0] = 10; arr2[^1] = 20; arr2[^2] = 30;
    
    std::cout << "Before swap:\n";
    std::cout << "arr1: " << arr1[^0] << " " << arr1[^1] << " " << arr1[^2] << std::endl;
    std::cout << "arr2: " << arr2[^0] << " " << arr2[^1] << " " << arr2[^2] << std::endl;
    
    arr1.swap(arr2);
    
    std::cout << "After swap:\n";
    std::cout << "arr1: " << arr1[^0] << " " << arr1[^1] << " " << arr1[^2] << std::endl;
    std::cout << "arr2: " << arr2[^0] << " " << arr2[^1] << " " << arr2[^2] << std::endl;
    
    return 0;
}
```


***

### Стъпка 12: Оператор == (равенство)

**Обяснение:** Проверява дали два масива имат еднакви елементи.[^5][^6]

**Код за копиране:**

```cpp
bool operator==(const StaticArray<T, N>& other) const {
    for (size_t i = 0; i < N; ++i) {
        if (data[i] != other.data[i]) {
            return false;
        }
    }
    return true;
}
```

**Тест код за Стъпка 12:**

```cpp
int main() {
    StaticArray<int, 3> arr1;
    StaticArray<int, 3> arr2;
    StaticArray<int, 3> arr3;
    
    arr1[^0] = 1; arr1[^1] = 2; arr1[^2] = 3;
    arr2[^0] = 1; arr2[^1] = 2; arr2[^2] = 3;
    arr3[^0] = 1; arr3[^1] = 2; arr3[^2] = 9;
    
    std::cout << "arr1 == arr2: " << (arr1 == arr2 ? "true" : "false") << std::endl;
    std::cout << "arr1 == arr3: " << (arr1 == arr3 ? "true" : "false") << std::endl;
    
    return 0;
}
```


***

### Стъпка 13: Оператор != (неравенство)

**Обяснение:** Проверява дали два масива са различни.[^5]

**Код за копиране:**

```cpp
bool operator!=(const StaticArray<T, N>& other) const {
    return !(*this == other);
}
```

**Тест код за Стъпка 13:**

```cpp
int main() {
    StaticArray<int, 3> arr1;
    StaticArray<int, 3> arr2;
    
    arr1[^0] = 1; arr1[^1] = 2; arr1[^2] = 3;
    arr2[^0] = 1; arr2[^1] = 2; arr2[^2] = 9;
    
    std::cout << "arr1 != arr2: " << (arr1 != arr2 ? "true" : "false") << std::endl;
    
    return 0;
}
```


***

### Стъпка 14: Оператор < (по-малко)

**Обяснение:** Lexicographical сравнение (като при речници).[^6]

**Код за копиране:**

```cpp
bool operator<(const StaticArray<T, N>& other) const {
    for (size_t i = 0; i < N; ++i) {
        if (data[i] < other.data[i]) return true;
        if (data[i] > other.data[i]) return false;
    }
    return false;
}
```

**Тест код за Стъпка 14:**

```cpp
int main() {
    StaticArray<int, 3> arr1;
    StaticArray<int, 3> arr2;
    
    arr1[^0] = 1; arr1[^1] = 2; arr1[^2] = 3;
    arr2[^0] = 1; arr2[^1] = 2; arr2[^2] = 5;
    
    std::cout << "arr1 < arr2: " << (arr1 < arr2 ? "true" : "false") << std::endl;
    std::cout << "arr2 < arr1: " << (arr2 < arr1 ? "true" : "false") << std::endl;
    
    return 0;
}
```


***

### Стъпка 15: Други оператори за сравнение

**Обяснение:** Останалите оператори се базират на вече имплементираните.[^6]

**Код за копиране:**

```cpp
bool operator<=(const StaticArray<T, N>& other) const {
    return !(other < *this);
}

bool operator>(const StaticArray<T, N>& other) const {
    return other < *this;
}

bool operator>=(const StaticArray<T, N>& other) const {
    return !(*this < other);
}
```

**Тест код за Стъпка 15:**

```cpp
int main() {
    StaticArray<int, 3> arr1;
    StaticArray<int, 3> arr2;
    
    arr1[^0] = 1; arr1[^1] = 2; arr1[^2] = 3;
    arr2[^0] = 1; arr2[^1] = 2; arr2[^2] = 3;
    
    std::cout << "arr1 <= arr2: " << (arr1 <= arr2 ? "true" : "false") << std::endl;
    std::cout << "arr1 >= arr2: " << (arr1 >= arr2 ? "true" : "false") << std::endl;
    std::cout << "arr1 > arr2: " << (arr1 > arr2 ? "true" : "false") << std::endl;
    
    return 0;
}
```


***

### Стъпка 16: data_ptr() метод

**Обяснение:** Връща pointer към вътрешния масив за C-style операции.

**Код за копиране:**

```cpp
T* data_ptr() {
    return data;
}

const T* data_ptr() const {
    return data;
}
```

**Тест код за Стъпка 16:**

```cpp
int main() {
    StaticArray<int, 5> arr;
    arr[^0] = 10;
    arr[^1] = 20;
    arr[^2] = 30;
    
    int* ptr = arr.data_ptr();
    
    std::cout << "Accessing via pointer:\n";
    for (size_t i = 0; i < arr.size(); ++i) {
        std::cout << "ptr[" << i << "] = " << ptr[i] << std::endl;
    }
    
    return 0;
}
```


***

### Стъпка 17: max_size() метод

**Обяснение:** Връща максималния възможен размер (същият като size()).

**Код за копиране:**

```cpp
size_t max_size() const {
    return N;
}
```

**Тест код за Стъпка 17:**

```cpp
int main() {
    StaticArray<int, 100> arr;
    
    std::cout << "Size: " << arr.size() << std::endl;
    std::cout << "Max size: " << arr.max_size() << std::endl;
    
    return 0;
}
```


***

### Пълен тест за цялата имплементация:

```cpp
#include <algorithm> // for std::sort

int main() {
    std::cout << "=== COMPLETE IMPLEMENTATION TESTS ===\n\n";
    
    // Basic functionality
    StaticArray<int, 6> arr;
    arr[^0] = 5;
    arr[^1] = 2;
    arr[^2] = 8;
    arr[^3] = 1;
    arr[^4] = 9;
    arr[^5] = 3;
    
    std::cout << "Test 1: Initial array\n";
    for (const auto& elem : arr) {
        std::cout << elem << " ";
    }
    std::cout << "\n\n";
    
    // Sort using STL
    std::cout << "Test 2: Sorting with STL\n";
    std::sort(arr.begin(), arr.end());
    for (const auto& elem : arr) {
        std::cout << elem << " ";
    }
    std::cout << "\n\n";
    
    // Reverse iteration
    std::cout << "Test 3: Reverse iteration\n";
    for (auto it = arr.rbegin(); it != arr.rend(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << "\n\n";
    
    // Swap
    std::cout << "Test 4: Swap\n";
    StaticArray<int, 6> arr2;
    arr2.fill(99);
    
    std::cout << "Before: arr[^0]=" << arr[^0] << ", arr2[^0]=" << arr2[^0] << std::endl;
    arr.swap(arr2);
    std::cout << "After:  arr[^0]=" << arr[^0] << ", arr2[^0]=" << arr2[^0] << "\n\n";
    
    // Comparison operators
    std::cout << "Test 5: Comparison\n";
    StaticArray<int, 3> a1, a2, a3;
    a1[^0] = 1; a1[^1] = 2; a1[^2] = 3;
    a2[^0] = 1; a2[^1] = 2; a2[^2] = 3;
    a3[^0] = 1; a3[^1] = 2; a3[^2] = 9;
    
    std::cout << "a1 == a2: " << (a1 == a2) << std::endl;
    std::cout << "a1 != a3: " << (a1 != a3) << std::endl;
    std::cout << "a1 < a3: " << (a1 < a3) << std::endl;
    std::cout << "a3 > a1: " << (a3 > a1) << "\n\n";
    
    // Data pointer
    std::cout << "Test 6: data_ptr()\n";
    int* ptr = a1.data_ptr();
    std::cout << "Via pointer: ";
    for (size_t i = 0; i < 3; ++i) {
        std::cout << ptr[i] << " ";
    }
    std::cout << "\n\n";
    
    // Max size
    std::cout << "Test 7: max_size()\n";
    std::cout << "Size: " << a1.size() << ", Max: " << a1.max_size() << "\n\n";
    
    std::cout << "=== ALL TESTS COMPLETED ===\n";
    
    return 0;
}
```


***

## Обобщение на стъпките

### Базова имплементация (Стъпки 1-8):

1. Template структура и масив[^1][^2]
2. `size()` метод[^3]
3. `operator[]` за достъп[^5][^6]
4. `at()` метод с проверка
5. `front()` метод
6. `back()` метод
7. `fill()` метод
8. `empty()` метод[^3]

### Напреднала функционалност (Стъпки 9-17):

9. Iterator поддръжка[^2]
10. Reverse iterators
11. `swap()` метод
12. Оператор `==`[^6][^5]
13. Оператор `!=`[^5]
14. Оператор `<`[^6]
15. Оператори `<=`, `>`, `>=`[^6]
16. `data_ptr()` метод
17. `max_size()` метод

Всяка стъпка има собствен тест код, а всички напреднали функционалности включват готов код за директно копиране.[^1][^2][^5]

[^1]: https://www.geeksforgeeks.org/cpp/templates-cpp/

[^2]: https://www.programiz.com/cpp-programming/class-templates

[^3]: https://www.geeksforgeeks.org/cpp/const-member-functions-c/

[^4]: https://learn.microsoft.com/en-us/cpp/cpp/const-cpp?view=msvc-170

[^5]: https://www.programiz.com/cpp-programming/operator-overloading

[^6]: https://www.geeksforgeeks.org/cpp/operator-overloading-cpp/

[^7]: https://courses.cms.caltech.edu/cs11/material/cpp/donnie/cpp-ops.html

[^8]: https://www.youtube.com/watch?v=ttOM3HulFyU

[^9]: http://users.cis.fiu.edu/~weiss/Deltoid/vcstl/templates

[^10]: https://www.codeproject.com/articles/An-Idiots-Guide-to-Cplusplus-Templates-Part-1

[^11]: https://www.reddit.com/r/programming/comments/1cxbtc/an_idiots_guide_to_c_templates_part_1/

[^12]: https://www.reddit.com/r/learnprogramming/comments/cdrpqi/c_can_anybody_explain_what_is_const_doing_in_this/

[^13]: https://learn.microsoft.com/en-us/cpp/cpp/templates-cpp?view=msvc-170

[^14]: https://hsf-training.github.io/hsf-training-cpp-webpage/10-templates/index.html

[^15]: https://www.learncpp.com/cpp-tutorial/overloading-the-parenthesis-operator/

[^16]: https://stackoverflow.com/questions/751681/what-is-the-meaning-of-const-at-the-end-of-a-member-function-declaration

[^17]: https://www.w3schools.com/cpp/cpp_templates.asp

[^18]: https://stackoverflow.com/questions/4421706/what-are-the-basic-rules-and-idioms-for-operator-overloading

[^19]: https://stackoverflow.com/questions/3141087/what-is-meant-with-const-at-end-of-function-declaration

[^20]: https://www.youtube.com/watch?v=BnMnozsSPmw

