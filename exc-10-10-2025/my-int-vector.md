# Задача 1: Създаване на MyIntVector (Опростена версия за int)

Ще създадем клас `MyIntVector`, който работи като `std::vector`, но е опростен само за `int`. Тази версия поправя оригиналната задача, като въвежда "Правилото на петте" (Rule of Five), което е модерният стандарт в C++ за ефективно управление на ресурси.[1][2]

***

## Част 1: Правилно управление на паметта (Rule of Five)

### Стъпка 1: Структура, Default Конструктор и Деструктор

Започваме с основната структура и първите две правила от "Правилото на петте".[1]

```cpp
#include <iostream>
#include <stdexcept>
#include <utility> // For std::swap and std::move

class MyIntVector {
private:
    int* data;
    size_t size_;
    size_t capacity_;
    
    // Helper method for swap, needed for copy-and-swap
    void swap(MyIntVector& other) noexcept {
        using std::swap;
        swap(data, other.data);
        swap(size_, other.size_);
        swap(capacity_, other.capacity_);
    }

public:
    // 1. Default Constructor
    MyIntVector() : data(nullptr), size_(0), capacity_(0) {}

    // 2. Destructor
    ~MyIntVector() {
        delete[] data;
    }
};
```

**Какво прави този код:**

- `data`, `size_`, `capacity_`: Основните членове за управление на състоянието[1]
- `MyIntVector()`: Инициализира празен вектор[1]
- `~MyIntVector()`: Освобождава заделената памет[1]
- `swap()`: Помощна private функция, която ефективно разменя съдържанието на два вектора[3][4]

**Тест код за Стъпка 1:**

```cpp
int main() {
    {
        MyIntVector vec;
        std::cout << "Vector created.\n";
    } // vec is destroyed here
    std::cout << "Vector destroyed.\n";
    return 0;
}
```

***

### Стъпка 2: Copy Конструктор (Rule of Five, Част 3/5)

Имплементираме конструктор за дълбоко копиране.[1]

```cpp
// Add to public section:
public:
    // 3. Copy Constructor
    MyIntVector(const MyIntVector& other)
        : size_(other.size_), capacity_(other.capacity_) {
        
        data = new int[capacity_];
        for (size_t i = 0; i < size_; ++i) {
            data[i] = other.data[i];
        }
    }
```

**Какво прави този код:**

- Създава дълбоко копие на other вектора[1]
- Заделя нова, независима памет и копира всички елементи в нея[1]

**Тест код за Стъпка 2:**

```cpp
int main() {
    MyIntVector vec1;
    // vec1.push_back(10); // Will add later
    
    MyIntVector vec2 = vec1; // Copy Constructor called
    std::cout << "Vector copied successfully.\n";
    
    return 0;
}
```

***

### Стъпка 3: Copy Assignment Оператор (Rule of Five, Част 4/5)

Имплементираме operator= за копиране, използвайки идиома copy-and-swap.[4][3]

```cpp
// Add to public section:
public:
    // 4. Copy Assignment (copy-and-swap)
    MyIntVector& operator=(const MyIntVector& other) {
        if (this != &other) {
            MyIntVector temp(other); // 1. Copy (uses Copy Constructor)
            swap(temp);              // 2. Swap contents
        }
        return *this;
    } // 3. 'temp' is destroyed here, taking old memory
```

**Какво прави този код:**

- Използва copy-and-swap идиома[3][4]
- `MyIntVector temp(other)`: Създава временно копие[3]
- `swap(temp)`: Разменя вътрешното състояние (указателите) на this и temp[3]
- Когато temp напусне обхвата, неговият деструктор се извиква и освобождава паметта, която преди принадлежеше на this[4]
- Това е безопасно при изключения (exception-safe)[4][3]

**Тест код за Стъпка 3:**

```cpp
int main() {
    MyIntVector vec1;
    MyIntVector vec2;
    // vec1.push_back(10); // Will add later
    
    vec2 = vec1; // Copy Assignment called
    std::cout << "Copy assignment works.\n";
    
    return 0;
}
```

***

### Стъпка 4: Move Конструктор (Rule of Five, Част 5/5)

Добавяме Move конструктор за висока ефективност. Той "краде" ресурсите.[2][1]

```cpp
// Add to public section:
public:
    // 5. Move Constructor
    MyIntVector(MyIntVector&& other) noexcept
        : data(other.data), size_(other.size_), capacity_(other.capacity_) {
        
        // Nullify 'other' so it doesn't delete the memory
        other.data = nullptr;
        other.size_ = 0;
        other.capacity_ = 0;
    }
```

**Какво прави този код:**

- Присвоява (краде) указателя data и броячите от other вектора[1]
- Не заделя нова памет и не копира елементи. Това е изключително бързо[1]
- `noexcept`: Указва, че този метод не хвърля изключения[1]
- Нулира other, така че неговият деструктор да не освободи паметта, която вече принадлежи на this[1]

**Тест код за Стъпка 4:**

```cpp
int main() {
    MyIntVector vec1;
    // vec1.push_back(10);
    
    MyIntVector vec2 = std::move(vec1); // Move Constructor called
    
    std::cout << "Move constructor works.\n";
    // Warning: vec1 is now in an empty, invalid state!
    
    return 0;
}
```

***

### Стъпка 5: Move Assignment Оператор (Rule of Five, Финал)

Допълваме "Правилото на петте" с Move Assignment оператор.[2][1]

```cpp
// Add to public section:
public:
    // 6. Move Assignment
    MyIntVector& operator=(MyIntVector&& other) noexcept {
        if (this != &other) {
            delete[] data; // 1. Release our old memory

            // 2. Steal resources from 'other'
            data = other.data;
            size_ = other.size_;
            capacity_ = other.capacity_;

            // 3. Nullify 'other'
            other.data = nullptr;
            other.size_ = 0;
            other.capacity_ = 0;
        }
        return *this;
    }
```

**Какво прави този код:**

- Подобно на Move конструктора, но първо освобождава собствените си ресурси[1]
- След това "краде" ресурсите от other[1]
- Отново, noexcept е важно за оптимизации[1]

**Тест код за Стъпка 5:**

```cpp
int main() {
    MyIntVector vec1;
    MyIntVector vec2;
    // vec1.push_back(10);
    
    vec2 = std::move(vec1); // Move Assignment called
    
    std::cout << "Move assignment works.\n";
    // Warning: vec1 is now in an empty, invalid state!
    
    return 0;
}
```

***

## Част 2: Основна функционалност

### Стъпка 6: reserve() и push_back()

Сега имплементираме основната функционалност. reserve ще използва std::move за ефективност.[1]

```cpp
// Add to public section:
public:
    size_t size() const { return size_; }
    size_t capacity() const { return capacity_; }

    void reserve(size_t new_capacity) {
        if (new_capacity <= capacity_) return;

        int* new_data = new int[new_capacity];
        
        // Move elements (for int this is = to copying,
        // but it's good practice)
        for (size_t i = 0; i < size_; ++i) {
            new_data[i] = std::move(data[i]);
        }
        
        delete[] data; // Delete old memory
        data = new_data;
        capacity_ = new_capacity;
    }

    void push_back(int value) {
        if (size_ == capacity_) {
            reserve(capacity_ == 0 ? 1 : capacity_ * 2);
        }
        data[size_++] = value;
    }
```

**Какво прави този код:**

- `reserve`: Заделя нова памет. Вместо да копира, той премества (std::move) старите елементи в новата памет[1]
- `push_back`: Проверява дали има място. Ако не, удвоява капацитета, като вика reserve, и след това добавя новия елемент[1]

**Тест код за Стъпка 6:**

```cpp
int main() {
    MyIntVector vec;
    vec.push_back(10);
    vec.push_back(20);
    vec.push_back(30);
    
    std::cout << "Size: " << vec.size() << std::endl; // 3
    std::cout << "Capacity: " << vec.capacity() << std::endl; // 4 (1 -> 2 -> 4)
    
    return 0;
}
```

***

### Стъпка 7: pop_back(), clear() и Достъп (operator[)]

Добавяме финалните методи за управление.[1]

```cpp
// Add to public section:
public:
    void pop_back() {
        if (size_ > 0) {
            --size_;
            // No need to call destructor for 'int'
        }
    }
    
    void clear() {
        size_ = 0;
        // No need to call destructors for 'int'
    }

    int& operator[](size_t index) {
        // For faster access, without bounds checking
        return data[index];
    }

    const int& operator[](size_t index) const {
        return data[index];
    }

    int& at(size_t index) {
        if (index >= size_) {
            throw std::out_of_range("Index out of bounds");
        }
        return data[index];
    }

    const int& at(size_t index) const {
        if (index >= size_) {
            throw std::out_of_range("Index out of bounds");
        }
        return data[index];
    }
```

**Какво прави този код:**

- `pop_back()`: Просто намалява брояча size_. Обектът не се трие, но ще бъде презаписан при следващ push_back[1]
- `clear()`: Нулира size_. Паметта (капацитетът) остава заделена[1]
- `operator[]`: Дава директен, бърз достъп без проверка на границите[1]
- `at()`: Дава безопасен достъп, който хвърля изключение при невалиден индекс[1]

**Тест код за Стъпка 7:**

```cpp
int main() {
    MyIntVector vec;
    vec.push_back(10);
    vec.push_back(20);
    
    std::cout << "vec[0] = " << vec[0] << std::endl;
    vec[1] = 99;
    std::cout << "vec[1] = " << vec.at(1) << std::endl;
    
    vec.pop_back();
    std::cout << "Size after pop_back: " << vec.size() << std::endl;
    
    try {
        std::cout << vec.at(1) << std::endl; // Will throw error
    } catch (const std::out_of_range& e) {
        std::cout << "Exception: " << e.what() << std::endl;
    }
    
    return 0;
}
```

***

### Пълен тест за базовата имплементация:

```cpp
int main() {
    std::cout << "=== BASIC IMPLEMENTATION TESTS ===\n\n";
    
    // Create vector
    MyIntVector vec;
    std::cout << "Test 1: Vector created\n";
    std::cout << "Size: " << vec.size() << std::endl;
    std::cout << "Capacity: " << vec.capacity() << "\n\n";
    
    // Add elements
    std::cout << "Test 2: Adding elements\n";
    vec.push_back(10);
    vec.push_back(20);
    vec.push_back(30);
    vec.push_back(40);
    vec.push_back(50);
    
    std::cout << "Size: " << vec.size() << std::endl;
    std::cout << "Capacity: " << vec.capacity() << std::endl;
    std::cout << "Elements: ";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i] << " ";
    }
    std::cout << "\n\n";
    
    // Test copy constructor
    std::cout << "Test 3: Copy constructor\n";
    MyIntVector vec2 = vec;
    std::cout << "vec2[0] = " << vec2[0] << "\n\n";
    
    // Test copy assignment
    std::cout << "Test 4: Copy assignment\n";
    MyIntVector vec3;
    vec3 = vec;
    std::cout << "vec3[0] = " << vec3[0] << "\n\n";
    
    // Test move constructor
    std::cout << "Test 5: Move constructor\n";
    MyIntVector vec4 = std::move(vec2);
    std::cout << "vec4[0] = " << vec4[0] << "\n\n";
    
    // Test move assignment
    std::cout << "Test 6: Move assignment\n";
    MyIntVector vec5;
    vec5 = std::move(vec3);
    std::cout << "vec5[0] = " << vec5[0] << "\n\n";
    
    std::cout << "=== ALL BASIC TESTS COMPLETED ===\n";
    
    return 0;
}
```

***

## Обобщение на стъпките

### Rule of Five (Стъпки 1-5):

1. Default конструктор и деструктор[1]
2. Copy конструктор (дълбоко копиране)[1]
3. Copy assignment оператор (copy-and-swap)[4][3]
4. Move конструктор (краде ресурси)[2][1]
5. Move assignment оператор (краде ресурси)[2][1]

### Основна функционалност (Стъпки 6-7):

6. `reserve()` и `push_back()` методи[1]
7. `pop_back()`, `clear()` и оператори за достъп[1]

Всяка стъпка има собствен тест код за проверка на функционалността.[1]

***