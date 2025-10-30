#include <iostream>
#include <stdexcept> // За std::out_of_range
#include <iterator>  // За std::reverse_iterator
#include <algorithm> // За std::sort в тестовия код

class IntArrayDynamic {
private:
    int* data;           // Масив с фиксиран размер (алоциран динамично)
    size_t array_size;   // Размера на масива (фиксиран след създаване)

public:
    // Конструктор, който приема размера (фиксиран за целия живот на обекта)
    IntArrayDynamic(size_t size) : array_size(size) {
        if (size > 0) {
            data = new int[size];
            // Инициализираме с 0
            for (size_t i = 0; i < size; ++i) {
                data[i] = 0;
            }
        } else {
            data = nullptr;
        }
    }

    // Copy constructor
    IntArrayDynamic(const IntArrayDynamic& other) : array_size(other.array_size) {
        if (array_size > 0) {
            data = new int[array_size];
            for (size_t i = 0; i < array_size; ++i) {
                data[i] = other.data[i];
            }
        } else {
            data = nullptr;
        }
    }

    // Copy assignment operator
    IntArrayDynamic& operator=(const IntArrayDynamic& other) {
        if (this != &other) {
            // Освобождаваме старата памет
            delete[] data;
            
            array_size = other.array_size;
            if (array_size > 0) {
                data = new int[array_size];
                for (size_t i = 0; i < array_size; ++i) {
                    data[i] = other.data[i];
                }
            } else {
                data = nullptr;
            }
        }
        return *this;
    }

    // Move constructor
    IntArrayDynamic(IntArrayDynamic&& other) noexcept 
        : data(other.data), array_size(other.array_size) {
        other.data = nullptr;
        other.array_size = 0;
    }

    // Move assignment operator
    IntArrayDynamic& operator=(IntArrayDynamic&& other) noexcept {
        if (this != &other) {
            delete[] data; // Освобождаваме старата памет
            data = other.data;
            array_size = other.array_size;
            other.data = nullptr;
            other.array_size = 0;
        }
        return *this;
    }

    // Destructor
    ~IntArrayDynamic() {
        delete[] data;
    }

    // Метод за размера
    size_t size() const {
        return array_size;
    }

    // Оператор [] за достъп без проверка
    int& operator[](size_t index) {
        return data[index];
    }

    const int& operator[](size_t index) const {
        return data[index];
    }

    // at() метод с проверка
    int& at(size_t index) {
        if (index >= array_size) {
            throw std::out_of_range("Index out of bounds");
        }
        return data[index];
    }

    const int& at(size_t index) const {
        if (index >= array_size) {
            throw std::out_of_range("Index out of bounds");
        }
        return data[index];
    }

    // front() метод
    int& front() {
        if (array_size == 0) {
            throw std::runtime_error("Array is empty");
        }
        return data[0];
    }

    const int& front() const {
        if (array_size == 0) {
            throw std::runtime_error("Array is empty");
        }
        return data[0];
    }

    // back() метод
    int& back() {
        if (array_size == 0) {
            throw std::runtime_error("Array is empty");
        }
        return data[array_size - 1];
    }

    const int& back() const {
        if (array_size == 0) {
            throw std::runtime_error("Array is empty");
        }
        return data[array_size - 1];
    }

    // fill() метод
    void fill(const int& value) {
        for (size_t i = 0; i < array_size; ++i) {
            data[i] = value;
        }
    }

    // empty() метод
    bool empty() const {
        return array_size == 0;
    }

    // Iterator поддръжка
    using iterator = int*;
    using const_iterator = const int*;

    iterator begin() {
        return data;
    }

    const_iterator begin() const {
        return data;
    }

    iterator end() {
        return data + array_size;
    }

    const_iterator end() const {
        return data + array_size;
    }

    const_iterator cbegin() const {
        return data;
    }

    const_iterator cend() const {
        return data + array_size;
    }

    // Reverse iterators
    using reverse_iterator = std::reverse_iterator<iterator>;
    using const_reverse_iterator = std::reverse_iterator<const_iterator>;

    reverse_iterator rbegin() {
        return reverse_iterator(end());
    }

    const_reverse_iterator rbegin() const {
        return const_reverse_iterator(end());
    }

    reverse_iterator rend() {
        return reverse_iterator(begin());
    }

    const_reverse_iterator rend() const {
        return const_reverse_iterator(begin());
    }

    const_reverse_iterator crbegin() const {
        return const_reverse_iterator(end());
    }

    const_reverse_iterator crend() const {
        return const_reverse_iterator(begin());
    }

    // Swap метод
    void swap(IntArrayDynamic& other) {
        std::swap(data, other.data);
        std::swap(array_size, other.array_size);
    }

    // Оператор == (равенство)
    bool operator==(const IntArrayDynamic& other) const {
        if (array_size != other.array_size) {
            return false;
        }
        for (size_t i = 0; i < array_size; ++i) {
            if (data[i] != other.data[i]) {
                return false;
            }
        }
        return true;
    }

    // Оператор != (неравенство)
    bool operator!=(const IntArrayDynamic& other) const {
        return !(*this == other);
    }

    // Оператор < (по-малко) - Lexicographical сравнение
    bool operator<(const IntArrayDynamic& other) const {
        size_t min_size = std::min(array_size, other.array_size);
        for (size_t i = 0; i < min_size; ++i) {
            if (data[i] < other.data[i]) return true;
            if (data[i] > other.data[i]) return false;
        }
        return array_size < other.array_size;
    }

    // Други оператори за сравнение
    bool operator<=(const IntArrayDynamic& other) const {
        return !(other < *this);
    }

    bool operator>(const IntArrayDynamic& other) const {
        return other < *this;
    }

    bool operator>=(const IntArrayDynamic& other) const {
        return !(*this < other);
    }

    // data_ptr() метод
    int* data_ptr() {
        return data;
    }

    const int* data_ptr() const {
        return data;
    }

    // max_size() метод
    size_t max_size() const {
        return array_size;
    }

    // Допълнителни методи специфични за integers
    
    // Метод за намиране на сумата на всички елементи
    int sum() const {
        int total = 0;
        for (size_t i = 0; i < array_size; ++i) {
            total += data[i];
        }
        return total;
    }

    // Метод за намиране на най-малкия елемент
    int min() const {
        if (array_size == 0) {
            throw std::runtime_error("Array is empty");
        }
        int minimum = data[0];
        for (size_t i = 1; i < array_size; ++i) {
            if (data[i] < minimum) {
                minimum = data[i];
            }
        }
        return minimum;
    }

    // Метод за намиране на най-големия елемент
    int max() const {
        if (array_size == 0) {
            throw std::runtime_error("Array is empty");
        }
        int maximum = data[0];
        for (size_t i = 1; i < array_size; ++i) {
            if (data[i] > maximum) {
                maximum = data[i];
            }
        }
        return maximum;
    }

    // Метод за проверка дали всички елементи са положителни
    bool all_positive() const {
        for (size_t i = 0; i < array_size; ++i) {
            if (data[i] <= 0) {
                return false;
            }
        }
        return true;
    }

    // Метод за броене на елементи с определена стойност
    size_t count(int value) const {
        size_t counter = 0;
        for (size_t i = 0; i < array_size; ++i) {
            if (data[i] == value) {
                counter++;
            }
        }
        return counter;
    }

    // Метод за добавяне на елемент в края (push_back) - НЕ ПОДДЪРЖАН
    void push_back(int /* value */) {
        throw std::runtime_error("push_back not supported - array size is fixed");
    }

    // Метод за премахване на последния елемент (pop_back) - НЕ ПОДДЪРЖАН
    void pop_back() {
        throw std::runtime_error("pop_back not supported - array size is fixed");
    }
};

int main() {
    std::cout << "=== DYNAMIC INT ARRAY IMPLEMENTATION TESTS ===\n\n";

    // Create array with constructor parameter
    IntArrayDynamic arr(5);
    std::cout << "Test 1: Array created with size 5\n";
    std::cout << "Size: " << arr.size() << std::endl;
    std::cout << "Empty: " << (arr.empty() ? "Yes" : "No") << "\n\n";

    // Fill array manually
    std::cout << "Test 2: Manual filling\n";
    arr[0] = 1;
    arr[1] = 2;
    arr[2] = 3;
    arr[3] = 4;
    arr[4] = 5;

    std::cout << "Elements: ";
    for (size_t i = 0; i < arr.size(); ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << "\n\n";

    // Test at() method
    std::cout << "Test 3: at() method\n";
    try {
        std::cout << "arr.at(2) = " << arr.at(2) << std::endl;
        std::cout << "arr.at(10) = " << arr.at(10) << std::endl; // Error
    } catch (const std::out_of_range& e) {
        std::cout << "Exception: " << e.what() << "\n\n";
    }

    // Test front() and back()
    std::cout << "Test 4: front() and back()\n";
    std::cout << "Front: " << arr.front() << std::endl;
    std::cout << "Back: " << arr.back() << "\n\n";

    // Test copy constructor
    std::cout << "Test 5: Copy constructor\n";
    IntArrayDynamic arr_copy = arr;
    std::cout << "Copy elements: ";
    for (size_t i = 0; i < arr_copy.size(); ++i) {
        std::cout << arr_copy[i] << " ";
    }
    std::cout << "\n\n";

    // Test fill()
    std::cout << "Test 6: fill() method\n";
    arr.fill(99);
    std::cout << "After fill(99): ";
    for (size_t i = 0; i < arr.size(); ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << "\n\n";

    std::cout << "=== INTEGER-SPECIFIC METHODS TESTS ===\n\n";

    // Restore original values for integer-specific tests
    arr[0] = 1;
    arr[1] = 2;
    arr[2] = 3;
    arr[3] = 4;
    arr[4] = 5;

    // Test sum()
    std::cout << "Test 7: sum() method\n";
    std::cout << "Sum of elements: " << arr.sum() << "\n\n";

    // Test min() and max()
    std::cout << "Test 8: min() and max() methods\n";
    std::cout << "Minimum: " << arr.min() << std::endl;
    std::cout << "Maximum: " << arr.max() << "\n\n";

    // Test all_positive()
    std::cout << "Test 9: all_positive() method\n";
    std::cout << "All positive: " << (arr.all_positive() ? "Yes" : "No") << std::endl;
    
    arr[2] = -3; // Make one element negative
    std::cout << "After setting arr[2] = -3: " << (arr.all_positive() ? "Yes" : "No") << "\n\n";

    // Test count()
    std::cout << "Test 10: count() method\n";
    arr.fill(42);
    arr[1] = 42;
    arr[3] = 42;
    std::cout << "Count of 42: " << arr.count(42) << std::endl;
    std::cout << "Count of 100: " << arr.count(100) << "\n\n";

    std::cout << "=== FIXED SIZE ARRAY TESTS ===\n\n";

    // Test that push_back() and pop_back() are not supported
    std::cout << "Test 11: Fixed size restrictions\n";
    IntArrayDynamic fixed_arr(3);
    fixed_arr[0] = 10;
    fixed_arr[1] = 20;
    fixed_arr[2] = 30;

    std::cout << "Fixed array (size 3): ";
    for (size_t i = 0; i < fixed_arr.size(); ++i) {
        std::cout << fixed_arr[i] << " ";
    }
    std::cout << std::endl;

    // Test push_back() throws exception
    try {
        fixed_arr.push_back(40);
        std::cout << "ERROR: push_back should have thrown an exception!" << std::endl;
    } catch (const std::runtime_error& e) {
        std::cout << "push_back() correctly throws: " << e.what() << std::endl;
    }

    // Test pop_back() throws exception
    try {
        fixed_arr.pop_back();
        std::cout << "ERROR: pop_back should have thrown an exception!" << std::endl;
    } catch (const std::runtime_error& e) {
        std::cout << "pop_back() correctly throws: " << e.what() << std::endl;
    }
    std::cout << "\n\n";

    std::cout << "=== COMPLETE IMPLEMENTATION TESTS ===\n\n";

    // More comprehensive tests
    IntArrayDynamic arr_full(6);
    arr_full[0] = 5;
    arr_full[1] = 2;
    arr_full[2] = 8;
    arr_full[3] = 1;
    arr_full[4] = 9;
    arr_full[5] = 3;

    std::cout << "Test 12: Initial array\n";
    for (const auto& elem : arr_full) {
        std::cout << elem << " ";
    }
    std::cout << "\nSum: " << arr_full.sum() << ", Min: " << arr_full.min() << ", Max: " << arr_full.max() << "\n\n";

    // Sort using STL
    std::cout << "Test 13: Sorting with STL\n";
    std::sort(arr_full.begin(), arr_full.end());
    for (const auto& elem : arr_full) {
        std::cout << elem << " ";
    }
    std::cout << "\n\n";

    // Reverse iteration
    std::cout << "Test 14: Reverse iteration\n";
    for (auto it = arr_full.rbegin(); it != arr_full.rend(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << "\n\n";

    // Swap
    std::cout << "Test 15: Swap\n";
    IntArrayDynamic arr2_full(6);
    arr2_full.fill(99);

    std::cout << "Before: arr_full[0]=" << arr_full[0] << ", arr2_full[0]=" << arr2_full[0] << std::endl;
    arr_full.swap(arr2_full);
    std::cout << "After:  arr_full[0]=" << arr_full[0] << ", arr2_full[0]=" << arr2_full[0] << "\n\n";

    // Comparison operators
    std::cout << "Test 16: Comparison\n";
    IntArrayDynamic a1(3), a2(3), a3(3);
    a1[0] = 1; a1[1] = 2; a1[2] = 3;
    a2[0] = 1; a2[1] = 2; a2[2] = 3;
    a3[0] = 1; a3[1] = 2; a3[2] = 9;

    std::cout << "a1 == a2: " << (a1 == a2) << std::endl;
    std::cout << "a1 != a3: " << (a1 != a3) << std::endl;
    std::cout << "a1 < a3: " << (a1 < a3) << std::endl;
    std::cout << "a3 > a1: " << (a3 > a1) << "\n\n";

    // Data pointer
    std::cout << "Test 17: data_ptr()\n";
    int* ptr = a1.data_ptr();
    std::cout << "Via pointer: ";
    for (size_t i = 0; i < 3; ++i) {
        std::cout << ptr[i] << " ";
    }
    std::cout << "\n\n";

    // Max size
    std::cout << "Test 18: max_size()\n";
    std::cout << "Size: " << a1.size() << ", Max: " << a1.max_size() << "\n\n";

    // Test empty array edge cases
    std::cout << "Test 19: Empty array edge cases\n";
    IntArrayDynamic empty_arr(0);
    std::cout << "Empty array size: " << empty_arr.size() << std::endl;
    std::cout << "Empty array empty(): " << (empty_arr.empty() ? "Yes" : "No") << std::endl;
    
    try {
        empty_arr.front(); // Should throw
    } catch (const std::runtime_error& e) {
        std::cout << "front() on empty array: " << e.what() << std::endl;
    }
    
    try {
        empty_arr.min(); // Should throw
    } catch (const std::runtime_error& e) {
        std::cout << "min() on empty array: " << e.what() << std::endl;
    }

    std::cout << "\n=== ALL TESTS COMPLETED ===\n";

    return 0;
}