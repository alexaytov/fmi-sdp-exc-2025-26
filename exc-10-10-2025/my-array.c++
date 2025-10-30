#include <iostream>
#include <stdexcept> // За std::out_of_range
#include <iterator>  // За std::reverse_iterator
#include <algorithm> // За std::sort в тестовия код

template<typename T, size_t N>
class StaticArray {
private:
    T data[N];  // C-style array, който съхранява елементите

public:
    // Стъпка 2: Добавяне на size() метод
    size_t size() const {
        return N;
    }

    // Стъпка 3: Добавяне на operator[] за достъп без проверка
    T& operator[](size_t index) {
        return data[index];
    }

    const T& operator[](size_t index) const {
        return data[index];
    }

    // Стъпка 4: Добавяне на at() метод с проверка
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

    // Стъпка 5: Добавяне на front() метод
    T& front() {
        return data[0];
    }

    const T& front() const {
        return data[0];
    }

    // Стъпка 6: Добавяне на back() метод
    T& back() {
        return data[N - 1];
    }

    const T& back() const {
        return data[N - 1];
    }

    // Стъпка 7: Добавяне на fill() метод
    void fill(const T& value) {
        for (size_t i = 0; i < N; ++i) {
            data[i] = value;
        }
    }

    // Стъпка 8: Добавяне на empty() метод
    bool empty() const {
        return N == 0;
    }

    // Стъпка 9: Добавяне на iterator поддръжка
    using iterator = T*;
    using const_iterator = const T*;

    iterator begin() {
        return data;
    }

    const_iterator begin() const {
        return data;
    }

    iterator end() {
        return data + N;
    }

    const_iterator end() const {
        return data + N;
    }

    const_iterator cbegin() const {
        return data;
    }

    const_iterator cend() const {
        return data + N;
    }

    // Стъпка 10: Reverse iterators
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

    // Стъпка 11: Swap метод
    void swap(StaticArray<T, N>& other) {
        for (size_t i = 0; i < N; ++i) {
            // Използваме std::swap за типове, които го поддържат ефективно
            std::swap(data[i], other.data[i]); 
        }
    }

    // Стъпка 12: Оператор == (равенство)
    bool operator==(const StaticArray<T, N>& other) const {
        for (size_t i = 0; i < N; ++i) {
            if (data[i] != other.data[i]) {
                return false;
            }
        }
        return true;
    }

    // Стъпка 13: Оператор != (неравенство)
    bool operator!=(const StaticArray<T, N>& other) const {
        return !(*this == other);
    }

    // Стъпка 14: Оператор < (по-малко) - Lexicographical сравнение
    bool operator<(const StaticArray<T, N>& other) const {
        for (size_t i = 0; i < N; ++i) {
            if (data[i] < other.data[i]) return true;
            if (data[i] > other.data[i]) return false;
        }
        return false; // Еднакви са или *this не е по-малко от other
    }

    // Стъпка 15: Други оператори за сравнение
    bool operator<=(const StaticArray<T, N>& other) const {
        return !(other < *this);
    }

    bool operator>(const StaticArray<T, N>& other) const {
        return other < *this;
    }

    bool operator>=(const StaticArray<T, N>& other) const {
        return !(*this < other);
    }

    // Стъпка 16: data_ptr() метод
    T* data_ptr() {
        return data;
    }

    const T* data_ptr() const {
        return data;
    }

    // Стъпка 17: max_size() метод
    size_t max_size() const {
        return N;
    }
};

int main() {
    std::cout << "=== BASIC IMPLEMENTATION TESTS ===\n\n";

    // Create array
    StaticArray<int, 5> arr;
    std::cout << "Test 1: Array created\n";
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

    // Test fill()
    std::cout << "Test 5: fill() method\n";
    arr.fill(99);
    std::cout << "After fill(99): ";
    for (size_t i = 0; i < arr.size(); ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << "\n\n";

    std::cout << "=== ALL BASIC TESTS COMPLETED ===\n\n";

        std::cout << "=== COMPLETE IMPLEMENTATION TESTS ===\n\n";

    // Basic functionality
    StaticArray<int, 6> arr_full;
    arr_full[0] = 5;
    arr_full[1] = 2;
    arr_full[2] = 8;
    arr_full[3] = 1;
    arr_full[4] = 9;
    arr_full[5] = 3;

    std::cout << "Test 1: Initial array\n";
    for (const auto& elem : arr_full) {
        std::cout << elem << " ";
    }
    std::cout << "\n\n";

    // Sort using STL
    std::cout << "Test 2: Sorting with STL\n";
    std::sort(arr_full.begin(), arr_full.end());
    for (const auto& elem : arr_full) {
        std::cout << elem << " ";
    }
    std::cout << "\n\n";

    // Reverse iteration
    std::cout << "Test 3: Reverse iteration\n";
    for (auto it = arr_full.rbegin(); it != arr_full.rend(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << "\n\n";

    // Swap
    std::cout << "Test 4: Swap\n";
    StaticArray<int, 6> arr2_full;
    arr2_full.fill(99);

    std::cout << "Before: arr_full[0]=" << arr_full[0] << ", arr2_full[0]=" << arr2_full[0] << std::endl;
    arr_full.swap(arr2_full);
    std::cout << "After:  arr_full[0]=" << arr_full[0] << ", arr2_full[0]=" << arr2_full[0] << "\n\n";

    // Comparison operators
    std::cout << "Test 5: Comparison\n";
    StaticArray<int, 3> a1, a2, a3;
    a1[0] = 1; a1[1] = 2; a1[2] = 3;
    a2[0] = 1; a2[1] = 2; a2[2] = 3;
    a3[0] = 1; a3[1] = 2; a3[2] = 9;

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