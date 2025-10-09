## Задача 2: Собствен клас MyVector (имитира std::vector)

**Цел:** Създай клас `MyVector<T>`, който имитира `std::vector` с динамичен размер.[^5][^1]

### Стъпки за имплементация:

**Стъпка 1: Дефиниране на template класа с член-променливи**

```cpp
template<typename T>
class MyVector {
private:
    T* data;              // Указател към динамичен масив
    size_t capacity_;     // Капацитет на масива
    size_t size_;         // Текущ брой елементи
    
public:
    // Конструктори и методи ще добавим
};
```

**Стъпка 2: Конструктор, деструктор и Rule of Three**

```cpp
MyVector() : data(nullptr), capacity_(0), size_(0) {}

MyVector(size_t cap) : capacity_(cap), size_(0) {
    data = new T[capacity_];
}

~MyVector() {
    delete[] data;
}

// Copy constructor
MyVector(const MyVector& other) : capacity_(other.capacity_), size_(other.size_) {
    data = new T[capacity_];
    for (size_t i = 0; i < size_; ++i) {
        data[i] = other.data[i];
    }
}
```

**Стъпка 3: Добави operator[] за достъп**

```cpp
T& operator[](size_t index) {
    return data[index];
}

const T& operator[](size_t index) const {
    return data[index];
}
```

**Стъпка 4: Добави методи за размер и капацитет**

```cpp
size_t size() const {
    return size_;
}

size_t capacity() const {
    return capacity_;
}

bool empty() const {
    return size_ == 0;
}
```

**Стъпка 5: Добави метод за преоразмеряване**

```cpp
void reserve(size_t new_capacity) {
    if (new_capacity <= capacity_) return;
    
    T* new_data = new T[new_capacity];
    for (size_t i = 0; i < size_; ++i) {
        new_data[i] = data[i];
    }
    
    delete[] data;
    data = new_data;
    capacity_ = new_capacity;
}
```

**Стъпка 6: Добави push_back() метод**

```cpp
void push_back(const T& value) {
    if (size_ == capacity_) {
        size_t new_capacity = (capacity_ == 0) ? 1 : capacity_ * 2;
        reserve(new_capacity);
    }
    data[size_++] = value;
}
```

**Стъпка 7: Добави pop_back() и clear() методи**

```cpp
void pop_back() {
    if (size_ > 0) {
        --size_;
    }
}

void clear() {
    size_ = 0;
}
```

**Стъпка 8: Добави front() и back() методи**

```cpp
T& front() {
    return data[0];
}

T& back() {
    return data[size_ - 1];
}
```

**Стъпка 9: Тестване на класа**

```cpp
int main() {
    MyVector<int> vec;
    
    vec.push_back(10);
    vec.push_back(20);
    vec.push_back(30);
    
    std::cout << "Size: " << vec.size() << std::endl;
    std::cout << "Capacity: " << vec.capacity() << std::endl;
    std::cout << "Front: " << vec.front() << std::endl;
    std::cout << "Back: " << vec.back() << std::endl;
    
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i] << " ";
    }
    
    return 0;
}
```

**Бонус стъпка 10: Добави итератори (по-напреднало)**

```cpp
T* begin() { return data; }
T* end() { return data + size_; }
const T* begin() const { return data; }
const T* end() const { return data + size_; }
```