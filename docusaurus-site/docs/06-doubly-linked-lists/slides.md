---
title: Двусвързан Списък, Iterator и Управление на Паметта
theme: white
highlightTheme: github
transition: slide
controls: true
progress: true
slideNumber: true
---

# 🔗 Двусвързан Списък

## Iterator и Memory Management

**Лекция 6** • Структури от Данни и Програмиране

---

## 📋 Съдържание

🎯 **Структура на Двусвързан Списък**

🔄 **Операции insert/delete**

🔍 **Iterator с Bidirectional Support**

💾 **Memory Management**

🛠️ **Valgrind и AddressSanitizer**

Note:
Двусвързаните списъци добавят гъвкавост с движение в двете посоки.

---

<!-- .slide: data-background="#e7f3ff" -->

# 🎯 Част 1

## Двусвързан Списък - Структура

---

## Node Структура

```cpp
struct Node {
    int data;
    Node* prev;  // Към предишния възел
    Node* next;  // Към следващия възел

    Node(int val) : data(val), prev(nullptr), next(nullptr) {}
};
```

**Две връзки вместо една!**

Note:
Двата указателя позволяват движение напред и назад.

---

## Едносвързан vs Двусвързан

| Характеристика | Едносвързан | Двусвързан |
|----------------|-------------|------------|
| **Указатели** | next | prev + next |
| **Памет** | data + 1 ptr | data + 2 ptr |
| **Обхождане** | Само напред | Напред + назад |
| **Изтриване** | Нужен prev | Лесно с current |

Note:
Двусвързаният списък използва повече памет, но дава допълнителна функционалност.

---

## Класова Структура

```cpp
class DoublyLinkedList {
private:
    Node* head;  // Първи възел
    Node* tail;  // Последен възел (важно!)
    int size;

public:
    DoublyLinkedList() : head(nullptr), tail(nullptr), size(0) {}
    ~DoublyLinkedList();

    void push_front(int value);
    void push_back(int value);
    void remove(Node* node);
    void traverse_forward();
    void traverse_backward();
};
```

Note:
Tail указателят е критичен за O(1) операции в края!

---

<!-- .slide: data-background="#e8f5e9" -->

# Част 2

## Операции

---

## Push Back (O(1))

```cpp
void push_back(int value) {
    Node* newNode = new Node(value);

    if (!tail) {  // Празен списък
        head = tail = newNode;
    } else {
        tail->next = newNode;
        newNode->prev = tail;
        tail = newNode;
    }
    size++;
}
```

Note:
С tail указател операцията е константна!

---

## Push Front (O(1))

```cpp
void push_front(int value) {
    Node* newNode = new Node(value);

    if (!head) {  // Празен списък
        head = tail = newNode;
    } else {
        newNode->next = head;
        head->prev = newNode;
        head = newNode;
    }
    size++;
}
```

Note:
Добавянето в началото е също O(1).

---

## Изтриване на Възел (O(1))

```cpp
void remove(Node* node) {
    if (!node) return;

    // Актуализация на prev връзка
    if (node->prev) {
        node->prev->next = node->next;
    } else {
        head = node->next;  // Изтриваме head
    }

    // Актуализация на next връзка
    if (node->next) {
        node->next->prev = node->prev;
    } else {
        tail = node->prev;  // Изтриваме tail
    }

    delete node;  // КРИТИЧНО!
    size--;
}
```

Note:
С два указателя можем да изтриваме директно без търсене!

---

## Обхождане

<div class="columns">
<div class="column left">

**Напред:**
```cpp
void traverse_forward() {
    Node* current = head;
    while (current) {
        cout << current->data << " ";
        current = current->next;
    }
}
```

</div>
<div class="column right">

**Назад:**
```cpp
void traverse_backward() {
    Node* current = tail;
    while (current) {
        cout << current->data << " ";
        current = current->prev;
    }
}
```

</div>
</div>

Note:
Двупосочното обхождане е уникално за DLL!

---

<!-- .slide: data-background="#fff3e0" -->

# Част 3

## Iterator Pattern

---

## Bidirectional Iterator

```cpp
class Iterator {
private:
    Node* current;

public:
    Iterator(Node* node) : current(node) {}

    int& operator*() const {
        return current->data;
    }

    // Напред
    Iterator& operator++() {
        if (current) current = current->next;
        return *this;
    }

    // Назад - специфично за DLL!
    Iterator& operator--() {
        if (current) current = current->prev;
        return *this;
    }

    bool operator!=(const Iterator& other) const {
        return current != other.current;
    }
};
```

Note:
Operator-- е възможен само благодарение на prev указателя!

---

## Използване на Iterator

```cpp
// begin() и end()
Iterator begin() { return Iterator(head); }
Iterator end() { return Iterator(nullptr); }

// Обхождане напред
for (auto it = list.begin(); it != list.end(); ++it) {
    cout << *it << " ";
}

// Обхождане назад
auto it = list.end();
--it;  // Последен елемент
while (it != list.begin()) {
    cout << *it << " ";
    --it;
}
```

Note:
Iterator pattern-ът прави кода по-чист и универсален.

---

<!-- .slide: data-background="#ffebee" -->

# Част 4

## Memory Management

---

## Деструктор

```cpp
~DoublyLinkedList() {
    Node* current = head;
    while (current) {
        Node* next_node = current->next;  // Запазваме!
        delete current;
        current = next_node;
    }
    head = nullptr;
    tail = nullptr;
}
```

**⚠️ Критично:** Запазвайте next преди delete!

Note:
Без правилен деструктор ще имате memory leak!

---

## Copy Constructor (Deep Copy)

```cpp
DoublyLinkedList(const DoublyLinkedList& other)
    : head(nullptr), tail(nullptr), size(0) {
    Node* current = other.head;
    while (current) {
        push_back(current->data);  // Нови възли!
        current = current->next;
    }
}
```

**Deep Copy** създава напълно независимо копие!

Note:
Shallow copy би довел до double-delete и undefined behavior.

---

## Assignment Operator

```cpp
DoublyLinkedList& operator=(const DoublyLinkedList& other) {
    if (this != &other) {  // Self-assignment check!
        clear();  // Изчистваме старите данни

        Node* current = other.head;
        while (current) {
            push_back(current->data);
            current = current->next;
        }
    }
    return *this;
}
```

**Rule of Three:** Деструктор, Copy Constructor, Assignment

Note:
Ако имплементирате един, трябва да имплементирате и трите!

---

<!-- .slide: data-background="#e0f2f1" -->

# Част 5

## Tools for Memory Debugging

---

## Valgrind

```bash
# Компилиране
g++ -g -o program program.cpp

# Стартиране
valgrind --leak-check=full \
         --show-leak-kinds=all \
         --track-origins=yes \
         ./program
```

**Output при leak:**
```
==12345== definitely lost: 200 bytes in 5 blocks
==12345== at operator new(unsigned long)
==12345== by DoublyLinkedList::push_back()
```

Note:
Valgrind е мощен, но забавя изпълнението значително.

---

## AddressSanitizer

```bash
# Компилиране с ASan
g++ -fsanitize=address -g -o program program.cpp

# Стартиране
./program
```

**Открива:**
- Memory leaks
- Use-after-free
- Buffer overflow
- Double-delete

Note:
ASan е по-бърз от Valgrind - отличен за development!

---

## Smart Pointers

```cpp
#include <memory>

// unique_ptr
std::unique_ptr<Node> ptr = std::make_unique<Node>(10);

// shared_ptr
std::shared_ptr<Node> ptr1 = std::make_shared<Node>(42);
std::shared_ptr<Node> ptr2 = ptr1;  // Ref count = 2

// weak_ptr
std::weak_ptr<Node> wptr = ptr1;
```

**Модерен C++:** Автоматично управление на паметта!

Note:
Smart pointers елиминират повечето memory management проблеми.

---

<!-- .slide: data-background="#e8eaf6" -->

# Обобщение

---

## Сложност на Операциите

| Операция | С head/tail | Без tail |
|----------|-------------|----------|
| **Push Front** | O(1) | O(1) |
| **Push Back** | **O(1)** | O(n) |
| **Delete Node** | **O(1)** | **O(1)** |
| **Search** | O(n) | O(n) |
| **Traverse** | O(n) | O(n) |

Note:
Tail указателят прави огромна разлика!

---

## Ключови Изводи

**Структура:**
- Два указателя: prev и next
- Head и tail pointers
- Двупосочно обхождане

**Предимства:**
- O(1) изтриване с указател
- Обхождане в двете посоки
- Гъвкави операции

**Недостатъци:**
- Повече памет (2 pointers)
- По-сложна имплементация
- Повече указатели за управление

Note:
Двусвързаните списъци са по-сложни, но по-мощни от едносвързаните.

---

## Най-добри Практики

✅ **Rule of Three** - деструктор, copy constructor, assignment

✅ **Deep copy** винаги

✅ **Self-assignment check** в assignment operator

✅ **Запазвайте next** преди delete

✅ **nullptr проверки** навсякъде

✅ **Valgrind/ASan** за debugging

✅ **Smart pointers** в модерен C++

Note:
Следването на тези практики предотвратява повечето бъгове.

---

## Допълнителни Ресурси

**Doubly Linked Lists:**
- [GeeksforGeeks - Doubly Linked List](https://www.geeksforgeeks.org/data-structures/linked-list/doubly-linked-list/)
- [std::list - C++ Reference](https://en.cppreference.com/w/cpp/container/list)

**Memory Tools:**
- [Valgrind Manual](https://valgrind.org/docs/manual/quick-start.html)
- [AddressSanitizer](https://github.com/google/sanitizers/wiki/AddressSanitizer)

Note:
Практиката е ключова - имплементирайте собствен DLL!

---

<!-- .slide: data-background="#4caf50" -->

# Благодаря за Вниманието!

## Въпроси? 🎓

**Следваща лекция:** Proxy Design Pattern, Stack & Queue

Note:
Време за въпроси!
