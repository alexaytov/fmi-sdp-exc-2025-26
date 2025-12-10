---
title: Списъци, Итератори и Управление на Паметта в C++
theme: white
highlightTheme: github
transition: slide
controls: true
progress: true
slideNumber: true
---

# 🔗 Списъци и Итератори

## Управление на Паметта в C++

**Лекция 5** • Структури от Данни и Програмиране

---

## 📋 Съдържание

🎯 **Свързани Списъци - Основи**

🔄 **Едносвързани vs Двусвързани Списъци**

🔍 **Iterator Pattern**

💾 **Memory Management**

🛠️ **Инструменти за Откриване на Leaks**

✨ **Smart Pointers**

Note:
Днес ще изучим свързаните списъци, iterator pattern-а и как да управляваме паметта правилно в C++.

---

<!-- .slide: data-background="#e7f3ff" -->

# 🎯 Част 1

## Защо Свързани Списъци?

---

## Масиви vs Списъци

<div class="columns">
<div class="column left">

**Масиви:**
- ✅ Бърз достъп O(1)
- ✅ Кеш ефективност
- ❌ Фиксиран/скъп resize
- ❌ Скъпо вмъкване в средата

</div>
<div class="column right">

**Списъци:**
- ✅ Ефективно вмъкване O(1)
- ✅ Динамичен размер
- ❌ Бавен достъп O(n)
- ❌ Повече памет (pointers)

</div>
</div>

Note:
Всяка структура има своите предимства. Избирайте според нуждите на задачата.

---

## Структура на Възел

**Едносвързан:**
```cpp
struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};
```

**Двусвързан:**
```cpp
struct Node {
    int data;
    Node* prev;  // Към предишния
    Node* next;  // Към следващия
    Node(int val) : data(val), prev(nullptr), next(nullptr) {}
};
```

Note:
Двусвързаният списък има два пъти повече pointers, но позволява движение и назад.

---

<!-- .slide: data-background="#e8f5e9" -->

# Част 2

## Едносвързани Списъци

---

## Структура и Операции

```cpp
class LinkedList {
private:
    Node* head;
    Node* tail;  // Опционално за O(1) push_back
    int size;

public:
    LinkedList() : head(nullptr), tail(nullptr), size(0) {}

    void push_front(int value) {
        Node* newNode = new Node(value);
        newNode->next = head;
        head = newNode;
        if (!tail) tail = head;  // Първи елемент
        size++;
    }
};
```

Note:
Head и tail указателите са критични за ефективни операции в началото и края.

---

## Обхождане на Списъка

```cpp
void traverse() {
    Node* current = head;
    while (current != nullptr) {
        cout << current->data << " ";
        current = current->next;
    }
    cout << endl;
}
```

**Времева сложност: O(n)**

Note:
Трябва да посетим всеки възел един по един - няма директен достъп като в масивите.

---

## Вмъкване в Края

```cpp
void push_back(int value) {
    Node* newNode = new Node(value);

    if (!head) {  // Празен списък
        head = tail = newNode;
    } else {
        tail->next = newNode;
        tail = newNode;
    }
    size++;
}
```

**С tail указател: O(1)**
**Без tail указател: O(n)** - трябва да обходим до края

Note:
Tail указателят прави огромна разлика в ефективността на push_back!

---

## Изтриване

```cpp
void remove(int value) {
    if (!head) return;

    // Специален случай: изтриване на head
    if (head->data == value) {
        Node* temp = head;
        head = head->next;
        delete temp;
        size--;
        return;
    }

    // Търсене и изтриване
    Node* current = head;
    while (current->next && current->next->data != value) {
        current = current->next;
    }

    if (current->next) {
        Node* temp = current->next;
        current->next = temp->next;
        delete temp;
        size--;
    }
}
```

Note:
Изтриването изисква намиране на предишния възел - нужно е обхождане.

---

<!-- .slide: data-background="#fff3e0" -->

# Част 3

## Двусвързани Списъци

---

## Предимства на DLL

**Двупосочна навигация:**
```cpp
// Напред
current = current->next;

// Назад
current = current->prev;
```

**По-лесно изтриване:**
```cpp
void remove(Node* node) {
    if (node->prev) node->prev->next = node->next;
    else head = node->next;

    if (node->next) node->next->prev = node->prev;
    else tail = node->prev;

    delete node;
}
```

**Сложност: O(1)** ако имаме указател към възела

Note:
С prev указател можем да изтриваме директно без да търсим предишния възел!

---

## Вмъкване в DLL

```cpp
void insertAfter(Node* node, int value) {
    if (!node) return;

    Node* newNode = new Node(value);

    // Свързване на новия възел
    newNode->next = node->next;
    newNode->prev = node;

    // Актуализация на съседите
    if (node->next) {
        node->next->prev = newNode;
    } else {
        tail = newNode;  // Нов последен възел
    }

    node->next = newNode;
    size++;
}
```

Note:
Четири връзки трябва да се актуализират - внимавайте с реда!

---

## Сравнение SLL vs DLL

| Характеристика | Едносвързан | Двусвързан |
|----------------|-------------|------------|
| **Памет/възел** | data + 1 ptr | data + 2 ptr |
| **Обхождане** | Само напред | Напред + назад |
| **Изтриване** | O(n) | O(1)* |
| **Сложност** | По-прост | По-сложен |

*с указател към възела

Note:
DLL използва двойно повече памет за pointers, но дава допълнителна гъвкавост.

---

<!-- .slide: data-background="#f3e5f5" -->

# Част 4

## Iterator Pattern

---

## Какво е Iterator?

**Шаблон за обхождане** на контейнер без излагане на вътрешната структура

**Ключови операции:**
- `*it` - дереференциране (достъп до стойността)
- `++it` - преминаване към следващ
- `it == other` - сравнение
- `it != other` - проверка за неравенство

Note:
Iterator pattern-ът ни позволява да работим с различни контейнери по еднакъв начин.

---

## Имплементация на Iterator

```cpp
template <typename T>
class LinkedListIterator {
private:
    Node<T>* current;

public:
    LinkedListIterator(Node<T>* ptr) : current(ptr) {}

    T& operator*() const {
        return current->data;
    }

    LinkedListIterator& operator++() {
        current = current->next;
        return *this;
    }

    bool operator!=(const LinkedListIterator& other) const {
        return current != other.current;
    }
};
```

Note:
Итераторът капсулира логиката за обхождане на списъка.

---

## Използване на Iterator

```cpp
class LinkedList {
public:
    typedef LinkedListIterator<int> iterator;

    iterator begin() { return iterator(head); }
    iterator end() { return iterator(nullptr); }
};

// Употреба:
LinkedList list;
list.push_back(1);
list.push_back(2);
list.push_back(3);

// Range-based for loop
for (auto item : list) {
    cout << item << endl;
}

// Ръчно
for (auto it = list.begin(); it != list.end(); ++it) {
    cout << *it << endl;
}
```

Note:
Range-based for loop използва begin() и end() автоматично!

---

<!-- .slide: data-background="#ffebee" -->

# Част 5

## Memory Management

---

## Деструктор - КРИТИЧЕН!

```cpp
~LinkedList() {
    Node* current = head;
    while (current != nullptr) {
        Node* next = current->next;  // Запазваме next!
        delete current;
        current = next;
    }
    head = nullptr;
    tail = nullptr;
}
```

**⚠️ ВАЖНО:** Запазвайте `next` преди `delete`!

Note:
Без правилен деструктор ще имате memory leak! Всеки възел трябва да се изтрие.

---

## Често Срещани Грешки

<div class="columns">
<div class="column left">

**❌ ГРЕШНО:**
```cpp
// Грешка 1
delete current;
current = current->next;
// Undefined behavior!

// Грешка 2
void clear() {
    head = nullptr;
}
// Memory leak!

// Грешка 3
head = other.head;
// Shallow copy!
```

</div>
<div class="column right">

**✅ ПРАВИЛНО:**
```cpp
// Правилно 1
Node* next = current->next;
delete current;
current = next;

// Правилно 2
// Използвай деструктора

// Правилно 3
// Deep copy в copy constructor
```

</div>
</div>

Note:
Тези грешки са изключително чести! Винаги запазвайте next преди delete.

---

## Copy Constructor (Deep Copy)

```cpp
LinkedList(const LinkedList& other)
    : head(nullptr), tail(nullptr), size(0) {
    Node* current = other.head;
    while (current != nullptr) {
        push_back(current->data);  // Нови възли!
        current = current->next;
    }
}
```

**Защо Deep Copy?**
- Всеки списък трябва да притежава своите възли
- Shallow copy води до double-delete
- При промяна в един списък, другият не се засяга

Note:
Deep copy създава напълно независимо копие на списъка.

---

## Assignment Operator

```cpp
LinkedList& operator=(const LinkedList& other) {
    if (this != &other) {  // Self-assignment check!
        clear();  // Изчистваме старите данни

        Node* current = other.head;
        while (current != nullptr) {
            push_back(current->data);
            current = current->next;
        }
    }
    return *this;
}
```

**Rule of Three:** Деструктор, Copy Constructor, Assignment Operator

Note:
Ако имплементирате един от трите, трябва да имплементирате и останалите!

---

<!-- .slide: data-background="#e0f2f1" -->

# Част 6

## Инструменти за Memory Debugging

---

## Valgrind

**Най-популярният инструмент за откриване на memory leaks**

```bash
# Компилиране
g++ -g -o program program.cpp

# Стартиране с Valgrind
valgrind --leak-check=full \
         --show-leak-kinds=all \
         --track-origins=yes \
         ./program
```

**Изход при leak:**
```
==12345== HEAP SUMMARY:
==12345==   definitely lost: 200 bytes in 5 blocks
```

Note:
Valgrind е мощен, но забавя изпълнението значително.

---

## AddressSanitizer (ASan)

**По-бърза алтернатива, вградена в компилатора**

```bash
# Компилиране с ASan
g++ -fsanitize=address -g -o program program.cpp

# Стартиране (докладва грешки автоматично)
./program
```

**Предимства:**
- По-бързо от Valgrind
- Открива повече видове грешки
- Use-after-free, buffer overflow, и др.

Note:
ASan е отличен избор за development. Използвайте го активно!

---

## Smart Pointers - Модерен C++

```cpp
#include <memory>

// unique_ptr - единствена собственост
std::unique_ptr<int> ptr = std::make_unique<int>(10);
// Автоматично delete при излизане от scope

// shared_ptr - споделена собственост
std::shared_ptr<int> ptr1 = std::make_shared<int>(42);
std::shared_ptr<int> ptr2 = ptr1;  // Reference count = 2
// Delete когато последният shared_ptr бъде унищожен

// weak_ptr - слаба референция
std::weak_ptr<int> wptr = ptr1;
// Предотвратява циклични зависимости
```

Note:
Smart pointers автоматизират управлението на паметта - използвайте ги в модерен C++!

---

<!-- .slide: data-background="#e8eaf6" -->

# Обобщение

---

## Сложност на Операциите

| Операция | Масив | Списък (указател) | Списък (без) |
|----------|-------|-------------------|--------------|
| **Достъп** | O(1) | O(n) | O(n) |
| **Търсене** | O(n) | O(n) | O(n) |
| **Вмъкване (начало)** | O(n) | **O(1)** | **O(1)** |
| **Вмъкване (край)** | O(1)* | **O(1)** с tail | O(n) |
| **Изтриване** | O(n) | **O(1)** (DLL) | O(n) |

*ако има място

Note:
Списъците превъзхождат масивите при вмъкване и изтриване.

---

## Ключови Изводи

**Списъци:**
- Едносвързани - проста структура, памет-ефективни
- Двусвързани - по-гъвкави, по-лесно изтриване
- Ефективни за вмъкване/изтриване O(1)

**Iterator Pattern:**
- Унифициран начин за обхождане
- Скрива вътрешната структура
- Позволява range-based for loops

**Memory Management:**
- Rule of Three/Five
- Valgrind и ASan за debugging
- Smart pointers за модерен C++

Note:
Овладяването на тези концепции е критично за ефективно C++ програмиране.

---

## Най-добри Практики

✅ **Винаги имплементирайте деструктор** за cleanup

✅ **Rule of Three** - деструктор, copy constructor, assignment

✅ **Запазвайте next преди delete** в деструктора

✅ **Deep copy** в copy constructor

✅ **Self-assignment check** в assignment operator

✅ **Използвайте Valgrind/ASan** за debugging

✅ **Smart pointers** в модерен C++

Note:
Следването на тези практики ще предотврати повечето memory-related бъгове.

---

## Допълнителни Ресурси

**Linked Lists:**
- [Linked List - GeeksforGeeks](https://www.geeksforgeeks.org/data-structures/linked-list/)
- [std::list - C++ Reference](https://en.cppreference.com/w/cpp/container/list)

**Memory Management:**
- [Valgrind Quick Start Guide](https://valgrind.org/docs/manual/quick-start.html)
- [AddressSanitizer](https://github.com/google/sanitizers/wiki/AddressSanitizer)

**Smart Pointers:**
- [Smart Pointers - cppreference](https://en.cppreference.com/w/cpp/memory)

Note:
Практиката е ключова - имплементирайте собствен LinkedList клас!

---

<!-- .slide: data-background="#4caf50" -->

# Благодаря за Вниманието!

## Въпроси? 🎓

**Следваща лекция:** Стек и Опашка

Note:
Време за въпроси! Не се притеснявайте да питате.
