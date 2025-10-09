# Задача: Създаване на собствена имплементация на свързан списък (Linked List)

Ще създадем клас `LinkedList<T>`, който имплементира едносвързан списък (singly linked list).[^1][^2][^3]

***

## Част 1: Базова имплементация

### Стъпка 1: Създаване на Node структура

Първо създайте структурата Node, която представлява един елемент от списъка:[^3][^1]

```cpp
#include <iostream>
#include <stdexcept>

template<typename T>
struct Node {
    T data;           // Data stored in the node
    Node<T>* next;    // Pointer to the next node
    
    // Constructor
    Node(const T& value) : data(value), next(nullptr) {}
};
```

**Какво прави този код:**

- `T data` - съхранява стойността на node[^3]
- `Node<T>* next` - pointer към следващия node[^1][^3]
- `next(nullptr)` - инициализира next като nullptr (край на списъка)

**Тест код за Стъпка 1:**

```cpp
int main() {
    Node<int>* node1 = new Node<int>(10);
    Node<int>* node2 = new Node<int>(20);
    
    node1->next = node2;
    
    std::cout << "Node1 data: " << node1->data << std::endl;
    std::cout << "Node2 data: " << node2->data << std::endl;
    std::cout << "Node1 points to Node2: " << (node1->next == node2 ? "Yes" : "No") << std::endl;
    
    delete node1;
    delete node2;
    
    return 0;
}
```


***

### Стъпка 2: Създаване на LinkedList клас с head pointer

Създайте класа LinkedList с head pointer:[^2][^1]

```cpp
template<typename T>
class LinkedList {
private:
    Node<T>* head;    // Pointer to first node
    size_t size_;     // Number of elements
    
public:
    // Constructor will go here
};
```

**Какво правят тези променливи:**

- `head` - pointer към първия node в списъка[^2][^1]
- `size_` - брой елементи в списъка

**Тест код за Стъпка 2:**

```cpp
int main() {
    LinkedList<int> list;
    std::cout << "LinkedList class created!\n";
    return 0;
}
```


***

### Стъпка 3: Конструктор по подразбиране

Създайте конструктор, който инициализира празен списък:[^1]

```cpp
// Add in public section:
LinkedList() : head(nullptr), size_(0) {}
```

**Какво прави този код:**

- Инициализира `head` като `nullptr` (празен списък)[^1]
- Инициализира `size_` като 0

**Тест код за Стъпка 3:**

```cpp
int main() {
    LinkedList<int> list;
    std::cout << "Empty LinkedList created successfully!\n";
    return 0;
}
```


***

### Стъпка 4: Деструктор

Създайте деструктор за освобождаване на паметта:[^1]

```cpp
// Add this destructor:
~LinkedList() {
    clear();  // We will implement clear() later
}
```

**Забележка:** Ще имплементираме `clear()` по-късно.

***

### Стъпка 5: size() и empty() методи

Добавете методи за проверка на размер:

```cpp
// Add these methods:
size_t size() const {
    return size_;
}

bool empty() const {
    return head == nullptr;
}
```

**Тест код за Стъпка 5:**

```cpp
int main() {
    LinkedList<int> list;
    
    std::cout << "Size: " << list.size() << std::endl;
    std::cout << "Empty: " << (list.empty() ? "Yes" : "No") << std::endl;
    
    return 0;
}
```


***

### Стъпка 6: push_front() метод

Добавете метод за вмъкване в началото на списъка:[^2][^1]

```cpp
// Add this method:
void push_front(const T& value) {
    // Create new node
    Node<T>* newNode = new Node<T>(value);
    
    // Point new node to current head
    newNode->next = head;
    
    // Update head to new node
    head = newNode;
    
    // Increment size
    size_++;
}
```

**Какво прави този код:**

- Създава нов node[^1]
- Новият node сочи към текущия head[^2]
- head се обновява да сочи към новия node
- Най-бърза операция - O(1)[^2]

**Тест код за Стъпка 6:**

```cpp
int main() {
    LinkedList<int> list;
    
    list.push_front(30);
    list.push_front(20);
    list.push_front(10);
    
    std::cout << "Added 3 elements to the front\n";
    std::cout << "Size: " << list.size() << std::endl;
    
    return 0;
}
```


***

### Стъпка 7: print() метод

Създайте метод за отпечатване на списъка:[^3][^1]

```cpp
// Add this method:
void print() const {
    if (head == nullptr) {
        std::cout << "List is empty" << std::endl;
        return;
    }
    
    Node<T>* current = head;
    while (current != nullptr) {
        std::cout << current->data << " ";
        current = current->next;
    }
    std::cout << std::endl;
}
```

**Какво прави този код:**

- Обхожда списъка от head до края[^3]
- `current->next` преминава към следващия node[^2]
- Спира когато `current` е `nullptr` (край)

**Тест код за Стъпка 7:**

```cpp
int main() {
    LinkedList<int> list;
    
    list.push_front(30);
    list.push_front(20);
    list.push_front(10);
    
    std::cout << "List contents: ";
    list.print();
    
    return 0;
}
```


***

### Стъпка 8: push_back() метод

Добавете метод за вмъкване в края на списъка:[^4][^5]

```cpp
// Add this method:
void push_back(const T& value) {
    // Create new node
    Node<T>* newNode = new Node<T>(value);
    
    // If list is empty, new node becomes head
    if (head == nullptr) {
        head = newNode;
        size_++;
        return;
    }
    
    // Traverse to the last node
    Node<T>* current = head;
    while (current->next != nullptr) {
        current = current->next;
    }
    
    // Link the last node to new node
    current->next = newNode;
    size_++;
}
```

**Какво прави този код:**

- Ако списъкът е празен, новият node става head[^4]
- Иначе обхожда до последния node[^5]
- Свързва последния node към новия node
- По-бавна операция - O(N)[^2]

**Тест код за Стъпка 8:**

```cpp
int main() {
    LinkedList<int> list;
    
    list.push_back(10);
    list.push_back(20);
    list.push_back(30);
    
    std::cout << "After push_back: ";
    list.print();
    
    std::cout << "Size: " << list.size() << std::endl;
    
    return 0;
}
```


***

### Стъпка 9: front() метод

Добавете метод за достъп до първия елемент:[^1]

```cpp
// Add these methods:
T& front() {
    if (head == nullptr) {
        throw std::runtime_error("List is empty");
    }
    return head->data;
}

const T& front() const {
    if (head == nullptr) {
        throw std::runtime_error("List is empty");
    }
    return head->data;
}
```

**Тест код за Стъпка 9:**

```cpp
int main() {
    LinkedList<int> list;
    
    list.push_back(100);
    list.push_back(200);
    
    std::cout << "Front element: " << list.front() << std::endl;
    
    list.front() = 999;
    std::cout << "After modification: " << list.front() << std::endl;
    
    return 0;
}
```


***

### Стъпка 10: back() метод

Добавете метод за достъп до последния елемент:

```cpp
// Add these methods:
T& back() {
    if (head == nullptr) {
        throw std::runtime_error("List is empty");
    }
    
    Node<T>* current = head;
    while (current->next != nullptr) {
        current = current->next;
    }
    return current->data;
}

const T& back() const {
    if (head == nullptr) {
        throw std::runtime_error("List is empty");
    }
    
    Node<T>* current = head;
    while (current->next != nullptr) {
        current = current->next;
    }
    return current->data;
}
```

**Тест код за Стъпка 10:**

```cpp
int main() {
    LinkedList<int> list;
    
    list.push_back(10);
    list.push_back(20);
    list.push_back(30);
    
    std::cout << "Front: " << list.front() << std::endl;
    std::cout << "Back: " << list.back() << std::endl;
    
    return 0;
}
```


***

### Стъпка 11: pop_front() метод

Премахва първия елемент:[^1][^2]

```cpp
// Add this method:
void pop_front() {
    if (head == nullptr) {
        return;  // Nothing to remove
    }
    
    // Save the old head
    Node<T>* oldHead = head;
    
    // Move head to next node
    head = head->next;
    
    // Delete old head
    delete oldHead;
    
    // Decrement size
    size_--;
}
```

**Какво прави този код:**

- Запазва pointer към текущия head
- Премества head към следващия node[^2]
- Изтрива стария head node
- O(1) операция[^2]

**Тест код за Стъпка 11:**

```cpp
int main() {
    LinkedList<int> list;
    
    list.push_back(10);
    list.push_back(20);
    list.push_back(30);
    
    std::cout << "Before pop_front: ";
    list.print();
    
    list.pop_front();
    
    std::cout << "After pop_front: ";
    list.print();
    
    return 0;
}
```


***

### Стъпка 12: pop_back() метод

Премахва последния елемент:[^2]

```cpp
// Add this method:
void pop_back() {
    if (head == nullptr) {
        return;  // Nothing to remove
    }
    
    // Special case: only one element
    if (head->next == nullptr) {
        delete head;
        head = nullptr;
        size_--;
        return;
    }
    
    // Traverse to second-to-last node
    Node<T>* current = head;
    while (current->next->next != nullptr) {
        current = current->next;
    }
    
    // Delete last node
    delete current->next;
    current->next = nullptr;
    
    size_--;
}
```

**Какво прави този код:**

- Проверява за специални случаи (празен или 1 елемент)
- Обхожда до предпоследния node
- Изтрива последния node
- O(N) операция[^2]

**Тест код за Стъпка 12:**

```cpp
int main() {
    LinkedList<int> list;
    
    list.push_back(10);
    list.push_back(20);
    list.push_back(30);
    
    std::cout << "Before pop_back: ";
    list.print();
    
    list.pop_back();
    
    std::cout << "After pop_back: ";
    list.print();
    
    return 0;
}
```


***

### Стъпка 13: clear() метод

Премахва всички елементи:[^1]

```cpp
// Add this method:
void clear() {
    while (head != nullptr) {
        Node<T>* temp = head;
        head = head->next;
        delete temp;
    }
    size_ = 0;
}
```

**Какво прави този код:**

- Обхожда всички nodes и ги изтрива
- Критичен за предотвратяване на memory leaks
- Използва се в деструктора

**Тест код за Стъпка 13:**

```cpp
int main() {
    LinkedList<int> list;
    
    list.push_back(10);
    list.push_back(20);
    list.push_back(30);
    
    std::cout << "Before clear - Size: " << list.size() << std::endl;
    
    list.clear();
    
    std::cout << "After clear - Size: " << list.size() << std::endl;
    std::cout << "Empty: " << (list.empty() ? "Yes" : "No") << std::endl;
    
    return 0;
}
```


***

### Стъпка 14: Copy Constructor (ВАЖЕН!)

Имплементирайте копиращ конструктор:[^1]

```cpp
// Add this constructor:
LinkedList(const LinkedList<T>& other) : head(nullptr), size_(0) {
    if (other.head == nullptr) {
        return;  // Nothing to copy
    }
    
    // Copy first node
    head = new Node<T>(other.head->data);
    size_ = 1;
    
    // Copy rest of the nodes
    Node<T>* current = head;
    Node<T>* otherCurrent = other.head->next;
    
    while (otherCurrent != nullptr) {
        current->next = new Node<T>(otherCurrent->data);
        current = current->next;
        otherCurrent = otherCurrent->next;
        size_++;
    }
}
```

**Защо е важен:**

- Без него компилаторът прави shallow copy
- Shallow copy води до double-delete crashes
- Трябва да направим deep copy на всички nodes[^1]

**Тест код за Стъпка 14:**

```cpp
int main() {
    LinkedList<int> list1;
    list1.push_back(1);
    list1.push_back(2);
    list1.push_back(3);
    
    std::cout << "list1: ";
    list1.print();
    
    // Copy constructor
    LinkedList<int> list2(list1);
    
    std::cout << "list2 (copy): ";
    list2.print();
    
    // Modify list1 to prove independence
    list1.push_back(999);
    
    std::cout << "After modifying list1:\n";
    std::cout << "list1: ";
    list1.print();
    std::cout << "list2: ";
    list2.print();
    
    return 0;
}
```


***

### Стъпка 15: Copy Assignment Operator (ВАЖЕН!)

Имплементирайте оператор за присвояване:[^1]

```cpp
// Add this operator:
LinkedList<T>& operator=(const LinkedList<T>& other) {
    if (this != &other) {  // Check for self-assignment
        // Clear current list
        clear();
        
        if (other.head == nullptr) {
            return *this;
        }
        
        // Copy first node
        head = new Node<T>(other.head->data);
        size_ = 1;
        
        // Copy rest
        Node<T>* current = head;
        Node<T>* otherCurrent = other.head->next;
        
        while (otherCurrent != nullptr) {
            current->next = new Node<T>(otherCurrent->data);
            current = current->next;
            otherCurrent = otherCurrent->next;
            size_++;
        }
    }
    return *this;
}
```

**Тест код за Стъпка 15:**

```cpp
int main() {
    LinkedList<int> list1;
    list1.push_back(10);
    list1.push_back(20);
    
    LinkedList<int> list2;
    list2.push_back(100);
    
    std::cout << "Before assignment:\n";
    std::cout << "list1: ";
    list1.print();
    std::cout << "list2: ";
    list2.print();
    
    // Assignment operator
    list2 = list1;
    
    std::cout << "After list2 = list1:\n";
    std::cout << "list2: ";
    list2.print();
    
    return 0;
}
```


***

### Пълен тест за базовата имплементация:

```cpp
int main() {
    std::cout << "=== BASIC LINKED LIST IMPLEMENTATION TEST ===\n\n";
    
    // Test 1: Creation
    std::cout << "Test 1: Creation\n";
    LinkedList<int> list;
    std::cout << "Size: " << list.size() << ", Empty: " << (list.empty() ? "Yes" : "No") << "\n\n";
    
    // Test 2: push_front and push_back
    std::cout << "Test 2: push_front and push_back\n";
    list.push_front(20);
    list.push_front(10);
    list.push_back(30);
    list.push_back(40);
    std::cout << "List: ";
    list.print();
    std::cout << "Size: " << list.size() << "\n\n";
    
    // Test 3: front and back
    std::cout << "Test 3: front() and back()\n";
    std::cout << "Front: " << list.front() << ", Back: " << list.back() << "\n\n";
    
    // Test 4: pop_front and pop_back
    std::cout << "Test 4: pop_front and pop_back\n";
    list.pop_front();
    list.pop_back();
    std::cout << "After pops: ";
    list.print();
    std::cout << "Size: " << list.size() << "\n\n";
    
    // Test 5: Copy constructor
    std::cout << "Test 5: Copy constructor\n";
    LinkedList<int> list2(list);
    std::cout << "list2 (copy): ";
    list2.print();
    list.push_back(999);
    std::cout << "After modifying list:\n";
    std::cout << "list: ";
    list.print();
    std::cout << "list2: ";
    list2.print();
    std::cout << std::endl;
    
    // Test 6: clear
    std::cout << "Test 6: clear()\n";
    list2.clear();
    std::cout << "After clear - Size: " << list2.size() << ", Empty: " << (list2.empty() ? "Yes" : "No") << "\n\n";
    
    std::cout << "=== ALL BASIC TESTS COMPLETED ===\n";
    
    return 0;
}
```


***

## Част 2: Напреднали функционалности

### Стъпка 16: Move Constructor

**Обяснение:** Прехвърля ownership на списъка без копиране.

**Код за копиране (добавете `#include <utility>` в началото):**

```cpp
LinkedList(LinkedList<T>&& other) noexcept 
    : head(other.head), size_(other.size_) {
    // Leave other in valid empty state
    other.head = nullptr;
    other.size_ = 0;
}
```

**Тест код за Стъпка 16:**

```cpp
#include <utility>

int main() {
    LinkedList<int> list1;
    list1.push_back(10);
    list1.push_back(20);
    list1.push_back(30);
    
    std::cout << "list1 size: " << list1.size() << std::endl;
    
    // Move constructor
    LinkedList<int> list2(std::move(list1));
    
    std::cout << "After move:\n";
    std::cout << "list2 size: " << list2.size() << std::endl;
    std::cout << "list2: ";
    list2.print();
    std::cout << "list1 size: " << list1.size() << " (moved-from)\n";
    
    return 0;
}
```


***

### Стъпка 17: Move Assignment Operator

**Обяснение:** Присвояване чрез прехвърляне.

**Код за копиране:**

```cpp
LinkedList<T>& operator=(LinkedList<T>&& other) noexcept {
    if (this != &other) {
        // Clear current list
        clear();
        
        // Steal resources
        head = other.head;
        size_ = other.size_;
        
        // Leave other in valid state
        other.head = nullptr;
        other.size_ = 0;
    }
    return *this;
}
```

**Тест код за Стъпка 17:**

```cpp
int main() {
    LinkedList<int> list1;
    list1.push_back(100);
    list1.push_back(200);
    
    LinkedList<int> list2;
    list2.push_back(1);
    
    std::cout << "Before move assignment:\n";
    std::cout << "list1: ";
    list1.print();
    
    list2 = std::move(list1);
    
    std::cout << "After list2 = std::move(list1):\n";
    std::cout << "list2: ";
    list2.print();
    std::cout << "list1 size: " << list1.size() << " (moved-from)\n";
    
    return 0;
}
```


***

### Стъпка 18: insert() метод (на позиция)

**Обяснение:** Вмъква елемент на произволна позиция.[^2]

**Код за копиране:**

```cpp
void insert(size_t position, const T& value) {
    if (position > size_) {
        throw std::out_of_range("Position out of bounds");
    }
    
    // Insert at beginning
    if (position == 0) {
        push_front(value);
        return;
    }
    
    // Create new node
    Node<T>* newNode = new Node<T>(value);
    
    // Traverse to position-1
    Node<T>* current = head;
    for (size_t i = 0; i < position - 1; i++) {
        current = current->next;
    }
    
    // Insert new node
    newNode->next = current->next;
    current->next = newNode;
    size_++;
}
```

**Тест код за Стъпка 18:**

```cpp
int main() {
    LinkedList<int> list;
    list.push_back(10);
    list.push_back(20);
    list.push_back(40);
    
    std::cout << "Before insert: ";
    list.print();
    
    list.insert(2, 30);  // Insert 30 at position 2
    
    std::cout << "After insert(2, 30): ";
    list.print();
    
    return 0;
}
```


***

### Стъпка 19: erase() метод (от позиция)

**Обяснение:** Премахва елемент от произволна позиция.[^2]

**Код за копиране:**

```cpp
void erase(size_t position) {
    if (position >= size_) {
        throw std::out_of_range("Position out of bounds");
    }
    
    // Erase first element
    if (position == 0) {
        pop_front();
        return;
    }
    
    // Traverse to position-1
    Node<T>* current = head;
    for (size_t i = 0; i < position - 1; i++) {
        current = current->next;
    }
    
    // Remove node at position
    Node<T>* toDelete = current->next;
    current->next = toDelete->next;
    delete toDelete;
    size_--;
}
```

**Тест код за Стъпка 19:**

```cpp
int main() {
    LinkedList<int> list;
    list.push_back(10);
    list.push_back(20);
    list.push_back(30);
    list.push_back(40);
    
    std::cout << "Before erase: ";
    list.print();
    
    list.erase(1);  // Remove element at position 1
    
    std::cout << "After erase(1): ";
    list.print();
    
    return 0;
}
```


***

### Стъпка 20: find() метод

**Обяснение:** Намира позицията на елемент (или -1 ако не съществува).

**Код за копиране:**

```cpp
int find(const T& value) const {
    Node<T>* current = head;
    int position = 0;
    
    while (current != nullptr) {
        if (current->data == value) {
            return position;
        }
        current = current->next;
        position++;
    }
    
    return -1;  // Not found
}
```

**Тест код за Стъпка 20:**

```cpp
int main() {
    LinkedList<int> list;
    list.push_back(10);
    list.push_back(20);
    list.push_back(30);
    list.push_back(40);
    
    std::cout << "List: ";
    list.print();
    
    std::cout << "find(20): " << list.find(20) << std::endl;
    std::cout << "find(30): " << list.find(30) << std::endl;
    std::cout << "find(999): " << list.find(999) << std::endl;
    
    return 0;
}
```


***

### Стъпка 21: reverse() метод

**Обяснение:** Обръща реда на елементите в списъка.

**Код за копиране:**

```cpp
void reverse() {
    Node<T>* prev = nullptr;
    Node<T>* current = head;
    Node<T>* next = nullptr;
    
    while (current != nullptr) {
        // Save next node
        next = current->next;
        
        // Reverse the link
        current->next = prev;
        
        // Move forward
        prev = current;
        current = next;
    }
    
    // Update head
    head = prev;
}
```

**Тест код за Стъпка 21:**

```cpp
int main() {
    LinkedList<int> list;
    list.push_back(10);
    list.push_back(20);
    list.push_back(30);
    list.push_back(40);
    
    std::cout << "Original: ";
    list.print();
    
    list.reverse();
    
    std::cout << "Reversed: ";
    list.print();
    
    return 0;
}
```


***

### Стъпка 22: Iterator поддръжка

**Обяснение:** Позволява използване с range-based for loops.

**Код за копиране:**

```cpp
// Simple iterator class (add to public section)
class Iterator {
private:
    Node<T>* current;
    
public:
    Iterator(Node<T>* node) : current(node) {}
    
    T& operator*() {
        return current->data;
    }
    
    Iterator& operator++() {
        current = current->next;
        return *this;
    }
    
    bool operator!=(const Iterator& other) const {
        return current != other.current;
    }
};

Iterator begin() {
    return Iterator(head);
}

Iterator end() {
    return Iterator(nullptr);
}
```

**Тест код за Стъпка 22:**

```cpp
int main() {
    LinkedList<int> list;
    list.push_back(10);
    list.push_back(20);
    list.push_back(30);
    
    std::cout << "Using range-based for: ";
    for (auto& value : list) {
        std::cout << value << " ";
    }
    std::cout << std::endl;
    
    // Modify elements
    for (auto& value : list) {
        value *= 2;
    }
    
    std::cout << "After doubling: ";
    list.print();
    
    return 0;
}
```


***

### Стъпка 23: operator[] за достъп

**Обяснение:** Позволява достъп до елементи чрез индекс (бавна операция за linked list).

**Код за копиране:**

```cpp
T& operator[](size_t index) {
    if (index >= size_) {
        throw std::out_of_range("Index out of bounds");
    }
    
    Node<T>* current = head;
    for (size_t i = 0; i < index; i++) {
        current = current->next;
    }
    
    return current->data;
}

const T& operator[](size_t index) const {
    if (index >= size_) {
        throw std::out_of_range("Index out of bounds");
    }
    
    Node<T>* current = head;
    for (size_t i = 0; i < index; i++) {
        current = current->next;
    }
    
    return current->data;
}
```

**Тест код за Стъпка 23:**

```cpp
int main() {
    LinkedList<int> list;
    list.push_back(10);
    list.push_back(20);
    list.push_back(30);
    
    std::cout << "list[^0] = " << list[^0] << std::endl;
    std::cout << "list[^1] = " << list[^1] << std::endl;
    std::cout << "list[^2] = " << list[^2] << std::endl;
    
    list[^1] = 999;
    std::cout << "After list[^1] = 999: ";
    list.print();
    
    return 0;
}
```


***

### Пълен тест за цялата имплементация:

```cpp
#include <utility>

int main() {
    std::cout << "=== COMPLETE LINKED LIST IMPLEMENTATION TEST ===\n\n";
    
    // Basic operations
    LinkedList<int> list;
    for (int i = 1; i <= 5; i++) {
        list.push_back(i * 10);
    }
    
    std::cout << "Test 1: Initial list\n";
    list.print();
    std::cout << "Size: " << list.size() << "\n\n";
    
    // Test 2: Copy semantics
    std::cout << "Test 2: Copy operations\n";
    LinkedList<int> list2(list);
    std::cout << "Copied list: ";
    list2.print();
    std::cout << std::endl;
    
    // Test 3: Move semantics
    std::cout << "Test 3: Move operations\n";
    LinkedList<int> list3(std::move(list2));
    std::cout << "Moved list size: " << list3.size() << "\n";
    std::cout << "Original list size after move: " << list2.size() << "\n\n";
    
    // Test 4: insert and erase
    std::cout << "Test 4: insert() and erase()\n";
    list.insert(2, 25);
    std::cout << "After insert(2, 25): ";
    list.print();
    
    list.erase(3);
    std::cout << "After erase(3): ";
    list.print();
    std::cout << std::endl;
    
    // Test 5: find
    std::cout << "Test 5: find()\n";
    std::cout << "Position of 25: " << list.find(25) << "\n";
    std::cout << "Position of 999: " << list.find(999) << "\n\n";
    
    // Test 6: reverse
    std::cout << "Test 6: reverse()\n";
    std::cout << "Before reverse: ";
    list.print();
    list.reverse();
    std::cout << "After reverse: ";
    list.print();
    std::cout << std::endl;
    
    // Test 7: Iterator (range-based for)
    std::cout << "Test 7: Range-based for loop\n";
    std::cout << "Elements: ";
    for (const auto& elem : list) {
        std::cout << elem << " ";
    }
    std::cout << "\n\n";
    
    // Test 8: operator[]
    std::cout << "Test 8: operator[]\n";
    std::cout << "list[^0] = " << list[^0] << "\n";
    std::cout << "list[^2] = " << list[^2] << "\n";
    list[^1] = 777;
    std::cout << "After list[^1] = 777: ";
    list.print();
    std::cout << std::endl;
    
    std::cout << "=== ALL TESTS COMPLETED ===\n";
    
    return 0;
}
```

Всички напреднали функционалности имат готов код за копиране. При linked list конструкторите и деструкторът са КРИТИЧНО важни заради динамичната памет за всеки node.[^3][^1][^2]

[^1]: https://www.geeksforgeeks.org/cpp/program-to-implement-singly-linked-list-in-c-using-class/

[^2]: https://www.geeksforgeeks.org/cpp/cpp-linked-list/

[^3]: https://www.programiz.com/dsa/linked-list

[^4]: https://www.reddit.com/r/cpp_questions/comments/wdsky3/populating_a_linked_list_using_push_back/

[^5]: https://www.geeksforgeeks.org/dsa/insert-node-at-the-end-of-a-linked-list/

[^6]: https://alf-p-steinbach.github.io/A-biggish-Cpp17-linked-lists-tutorial/

[^7]: https://stackoverflow.com/questions/22141477/simple-linked-list-in-c

[^8]: https://www.cprogramming.com/tutorial/lesson15.html

[^9]: https://codesignal.com/learn/courses/fundamental-data-structures-linked-lists-in-cpp/lessons/introduction-to-linked-lists-in-cpp

[^10]: https://stackoverflow.com/questions/28331897/singly-linked-list-push-back

[^11]: https://stackoverflow.com/questions/7718949/how-to-make-a-linked-list-in-using-structs

[^12]: https://www.youtube.com/watch?v=N6dOwBde7-M

[^13]: https://www.reddit.com/r/learnprogramming/comments/khybwi/help_me_understand_the_listnode_structure_from/

[^14]: https://www.reddit.com/r/learnprogramming/comments/90ukt2/c_linked_list/

[^15]: https://cplusplus.com/forum/beginner/253235/

[^16]: https://cplusplus.com/forum/beginner/127324/

[^17]: https://www.learn-cpp.org/en/Linked_lists

[^18]: https://gist.github.com/f9787f84d89a3294aa44e0b16e652343

[^19]: https://www.youtube.com/watch?v=IAefIA5wxDU

[^20]: https://pvs-studio.com/en/blog/terms/6684/

