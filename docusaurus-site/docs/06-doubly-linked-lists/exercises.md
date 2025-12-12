---
title: "Упражнения"
sidebar_position: 2
slug: exercises
tags: [linked-lists, iterators, memory-management, cpp, exercises]
---

import CollapsibleSection from '@site/src/components/CollapsibleSection';
import ExerciseCard from '@site/src/components/Exercise/ExerciseCard';
import ProgressTracker from '@site/src/components/Exercise/ProgressTracker';

# Упражнения: C++ Списъци, Итератори и Управление на Паметта

<ProgressTracker />

---

## Лесни Упражнения (Основни Концепции)

<ExerciseCard
  difficulty="easy"
  timeEstimate="10 min"
  tags={["practice", "exercise"]}
>

### Задача 1: Разлики между еднопосочен и двусвързан списък

**Какви са основните разлики между еднопосочен списък (singly linked list) и двусвързан списък (doubly linked list)?**


<CollapsibleSection title="Решение" icon="✅">

**Отговор:**
- **Еднопосочен списък:** Всеки възел има само един указател `next` към следващия елемент. Може да се обхожда само в една посока (напред).
- **Двусвързан списък:** Всеки възел има два указателя - `prev` към предишния и `next` към следващия елемент. Може да се обхожда в двете посоки.
- **Памет:** Двусвързаният списък заема повече памет заради допълнителния указател.
- **Операции:** Двусвързаният списък позволява по-ефективно изтриване на елемент при известен указател.

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="easy"
  timeEstimate="10 min"
  tags={["practice", "exercise"]}
>

### Задача 2: Оператори за динамична памет в C++

**В C++, кои оператори се използват за заделяне и освобождаване на динамична памет?**

a) `malloc` и `free`
b) `new` и `delete`
c) `alloc` и `dealloc`
d) `create` и `destroy`


<CollapsibleSection title="Решение" icon="✅">

**Отговор:** b) `new` и `delete`

В C++ използваме `new` за заделяне на динамична памет и `delete` за освобождаването ѝ. За масиви използваме `new[]` и `delete[]`.

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="easy"
  timeEstimate="10 min"
  tags={["practice", "exercise"]}
>

### Задача 3: Изтичане на памет (Memory Leak)

**Какво е изтичане на памет (memory leak)? Опишете с едно изречение.**


<CollapsibleSection title="Решение" icon="✅">

**Отговор:** Изтичане на памет е ситуация, при която програмата заделя динамична памет, но не я освобождава след използването ѝ, което води до натрупване на неизползвана памет.

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="easy"
  timeEstimate="10 min"
  tags={["practice", "exercise"]}
>

### Задача 4: Съдържание на възел в двусвързан списък

**Какво съдържа всеки възел в двусвързан списък?**


<CollapsibleSection title="Решение" icon="✅">

**Отговор:** Всеки възел съдържа:
- **Данни** (стойността, която се съхранява)
- **Указател `prev`** към предишния възел
- **Указател `next`** към следващия възел

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="easy"
  timeEstimate="10 min"
  tags={["practice", "exercise"]}
>

### Задача 5: Добра практика след delete

**Какво винаги трябва да правите след извикване на `delete` на указател като добра практика?**

```cpp
int* ptr = new int(10);
delete ptr;
// Какво трябва да следва?
```


<CollapsibleSection title="Решение" icon="✅">

**Отговор:**
```cpp
ptr = nullptr;
```

След `delete` винаги задавайте указателя на `nullptr`. Това предотвратява използването на "висящ" указател (dangling pointer) и прави грешките по-лесни за откриване.

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="easy"
  timeEstimate="10 min"
  tags={["practice", "exercise"]}
>

### Задача 6: Каква е времевата сложност O() за добавяне на елемент в края...

**Каква е времевата сложност O() за добавяне на елемент в края на двусвързан списък, когато имате указател към tail?**


<CollapsibleSection title="Решение" icon="✅">

**Отговор:** `O(1)` - константно време.

Когато имаме указател към `tail`, можем директно да добавим новия елемент и да актуализираме само няколко указателя, независимо от размера на списъка.

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="easy"
  timeEstimate="10 min"
  tags={["practice", "exercise"]}
>

### Задача 7: Кое от следните ще причини изтичане на памет?

**Кое от следните ще причини изтичане на памет?**

```cpp
// Опция A:
int* ptr = new int(5);
delete ptr;

// Опция B:
int* ptr = new int(5);
ptr = new int(10);
delete ptr;

// Опция C:
int* ptr = new int(5);
ptr = nullptr;
```


<CollapsibleSection title="Решение" icon="✅">

**Отговор:** Опция B и Опция C причиняват изтичане на памет.

- **Опция A:** Правилна - паметта се освобождава.
- **Опция B:** Грешна - първата заделена памет (5) изтича, защото указателят се презаписва преди да бъде освободена.
- **Опция C:** Грешна - заделената памет изтича, защото губим указателя без да освободим паметта.

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="easy"
  timeEstimate="10 min"
  tags={["practice", "exercise"]}
>

### Задача 8: Каква е основната роля на итератор в C++?

**Каква е основната роля на итератор в C++?**


<CollapsibleSection title="Решение" icon="✅">

**Отговор:** Итераторът предоставя унифициран начин за обхождане на елементите на различни контейнери, скривайки детайлите на вътрешната им структура. Това позволява писането на общ код, който работи с масиви, списъци, вектори и др., без да се налага промяна при смяна на типа контейнер.

</CollapsibleSection>

</ExerciseCard>

---

## Средни Упражнения


<ExerciseCard
  difficulty="easy"
  timeEstimate="10 min"
  tags={["practice", "exercise"]}
>

### Задача 9: Допълнете следния код за правилно освобождаване на масив:

**Допълнете следния код за правилно освобождаване на масив:**

```cpp
int* arr = new int[10];
// Използвайте масива...
// Напишете правилния код за освобождаване тук:
```


<CollapsibleSection title="Решение" icon="✅">

**Отговор:**
```cpp
delete[] arr;
arr = nullptr;
```

Важно е да използвате `delete[]` (не просто `delete`) за масиви, защото той освобождава цялата заделена памет за всички елементи.

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["practice", "exercise"]}
>

### Задача 10: Какво ще се случи в следния код?

**Какво ще се случи в следния код?**

```cpp
struct Node {
    int data;
    Node* next;
    Node* prev;
};

Node* n = new Node();
n->data = 42;
// Програмата приключва без delete
```


<CollapsibleSection title="Решение" icon="✅">

**Отговор:** Ще има **изтичане на памет**. Заделената памет за възела не се освобождава преди приключване на програмата. Правилният код трябва да включва:

```cpp
delete n;
n = nullptr;
```

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["practice", "exercise"]}
>

### Задача 11: Намерете грешката в тази функция за премахване на възел от д...

**Намерете грешката в тази функция за премахване на възел от двусвързан списък:**

```cpp
void removeNode(Node* node) {
    node->prev->next = node->next;
    node->next->prev = node->prev;
    // Какво липсва?
}
```


<CollapsibleSection title="Решение" icon="✅">

**Отговор:** Липсва `delete node;`

След актуализиране на указателите, трябва да освободим паметта за премахнатия възел:

```cpp
void removeNode(Node* node) {
    node->prev->next = node->next;
    node->next->prev = node->prev;
    delete node; // Освобождаване на паметта
}
```

**Допълнително:** Функцията не проверява дали `prev` или `next` са `nullptr`, което може да доведе до грешка при премахване на първия или последния елемент.

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["practice", "exercise"]}
>

### Задача 12: Имплементирайте метод за добавяне на елемент в началото на д...

**Имплементирайте метод за добавяне на елемент в началото на двусвързан списък:**

```cpp
class DoublyLinkedList {
private:
    Node* head;
    Node* tail;
public:
    void addFront(int value) {
        // Вашата имплементация тук
    }
};
```


<CollapsibleSection title="Решение" icon="✅">

**Отговор:**
```cpp
void addFront(int value) {
    Node* newNode = new Node(value);

    if (head) { // Ако списъкът не е празен
        newNode->next = head;
        head->prev = newNode;
        head = newNode;
    } else { // Ако списъкът е празен
        head = newNode;
        tail = newNode;
    }
}
```

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["practice", "exercise"]}
>

### Задача 13: Какво е RAII и как помага за предотвратяване на изтичане на ...

**Какво е RAII и как помага за предотвратяване на изтичане на памет? Дайте пример.**


<CollapsibleSection title="Решение" icon="✅">

**Отговор:** **RAII (Resource Acquisition Is Initialization)** е идиом в C++, при който ресурсите (като памет) се придобиват в конструктора на обекта и автоматично се освобождават в деструктора му.

**Пример:**
```cpp
class SafeArray {
private:
    int* data;
    size_t size;
public:
    SafeArray(size_t n) : size(n) {
        data = new int[n]; // Заделяне в конструктора
    }

    ~SafeArray() {
        delete[] data; // Автоматично освобождаване в деструктора
    }
    // ... други методи ...
};
```

Когато `SafeArray` излезе от обхват, деструкторът автоматично освобождава паметта.

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["practice", "exercise"]}
>

### Задача 14: Допълнете класа итератор за прост масив:

**Допълнете класа итератор за прост масив:**

```cpp
template<typename T>
class ArrayIterator {
private:
    T* current;
public:
    ArrayIterator(T* ptr) : current(ptr) {}

    T& operator*() const {
        // Вашият код тук
    }

    ArrayIterator& operator++() {
        // Вашият код тук
    }

    bool operator!=(const ArrayIterator& other) const {
        // Вашият код тук
    }
};
```


<CollapsibleSection title="Решение" icon="✅">

**Отговор:**
```cpp
T& operator*() const {
    return *current; // Връща референция към текущия елемент
}

ArrayIterator& operator++() {
    ++current; // Премества указателя напред
    return *this;
}

bool operator!=(const ArrayIterator& other) const {
    return current != other.current; // Сравнява указателите
}
```

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["practice", "exercise"]}
>

### Задача 15: Обяснете защо този код има изтичане на памет и го поправете:

**Обяснете защо този код има изтичане на памет и го поправете:**

```cpp
void processData() {
    int* data = new int[100];
    for (int i = 0; i < 100; i++) {
        data[i] = i * 2;
    }
    if (data[50] > 100) {
        return; // Ранно връщане
    }
    delete[] data;
}
```


<CollapsibleSection title="Решение" icon="✅">

**Проблем:** При ранно връщане (`return`), `delete[] data` никога не се изпълнява, което води до изтичане на памет.

**Решение 1 - добавяне на delete преди return:**
```cpp
void processData() {
    int* data = new int[100];
    for (int i = 0; i < 100; i++) {
        data[i] = i * 2;
    }
    if (data[50] > 100) {
        delete[] data; // Освобождаване преди връщане
        return;
    }
    delete[] data;
}
```

**Решение 2 - използване на RAII (по-добро):**
```cpp
void processData() {
    std::unique_ptr<int[]> data = std::make_unique<int[]>(100);
    for (int i = 0; i < 100; i++) {
        data[i] = i * 2;
    }
    if (data[50] > 100) {
        return; // Паметта се освобождава автоматично
    }
    // Паметта се освобождава автоматично и тук
}
```

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["practice", "exercise"]}
>

### Задача 16: Какви са трите основни типа smart pointers в C++ и кога бихт...

**Какви са трите основни типа smart pointers в C++ и кога бихте използвали всеки?**


<CollapsibleSection title="Решение" icon="✅">

**Отговор:**
- **`std::unique_ptr`:** Ексклузивна собственост. Използвайте когато само един обект трябва да притежава ресурса. Не може да се копира, само да се премести с `std::move`.
- **`std::shared_ptr`:** Споделена собственост чрез reference counting. Използвайте когато множество обекти трябва да споделят ресурса. Паметта се освобождава, когато последният `shared_ptr` бъде унищожен.
- **`std::weak_ptr`:** "Слаба" референция към `shared_ptr`, която не увеличава reference count. Използвайте за прекъсване на циклични зависимости между `shared_ptr` обекти.

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["practice", "exercise"]}
>

### Задача 17: Имплементирайте функция за броене на елементите в двусвързан...

**Имплементирайте функция за броене на елементите в двусвързан списък:**

```cpp
int countElements(Node* head) {
    // Вашата имплементация тук
}
```


<CollapsibleSection title="Решение" icon="✅">

**Отговор:**
```cpp
int countElements(Node* head) {
    int count = 0;
    Node* current = head;

    while (current != nullptr) {
        count++;
        current = current->next;
    }

    return count;
}
```

Времева сложност: `O(n)`, където n е броят елементи в списъка.

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["practice", "exercise"]}
>

### Задача 18: Напишете деструктор за двусвързан списък, който правилно осв...

**Напишете деструктор за двусвързан списък, който правилно освобождава всички възли:**

```cpp
class DoublyLinkedList {
private:
    Node* head;
    Node* tail;
public:
    ~DoublyLinkedList() {
        // Вашата имплементация тук
    }
};
```


<CollapsibleSection title="Решение" icon="✅">

**Отговор:**
```cpp
~DoublyLinkedList() {
    Node* current = head;
    while (current != nullptr) {
        Node* next_node = current->next;
        delete current;
        current = next_node;
    }
    head = nullptr;
    tail = nullptr;
}
```

Обхождаме целия списък и изтриваме всеки възел. Важно е да запазим `next` указателя преди да изтрием текущия възел.

</CollapsibleSection>

</ExerciseCard>

---

## Трудни Упражнения


<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["practice", "exercise"]}
>

### Задача 19: Имплементирайте метод `insert`, който добавя нов елемент сле...

**Имплементирайте метод `insert`, който добавя нов елемент след дадена итераторна позиция:**

```cpp
template<typename T>
class DoublyLinkedList {
public:
    class Iterator {
        Node* current;
        // ... iterator methods ...
    };

    void insertAfter(Iterator position, T value) {
        // Вашата имплементация тук
    }
};
```


<CollapsibleSection title="Решение" icon="✅">

**Отговор:**
```cpp
void insertAfter(Iterator position, T value) {
    if (!position.current) return; // Проверка за валидност

    Node* newNode = new Node(value);
    Node* next = position.current->next;

    // Свързване на новия възел
    newNode->prev = position.current;
    newNode->next = next;

    // Актуализиране на съседните възли
    position.current->next = newNode;

    if (next) {
        next->prev = newNode;
    } else {
        // Ако вмъкваме след последния елемент
        tail = newNode;
    }
}
```

**Забележка:** Необходим е достъп до `current` от итератора, което изисква или `friend` декларация, или публичен getter.

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["practice", "exercise"]}
>

### Задача 20: Анализирайте следния код и идентифицирайте всички проблеми, ...

**Анализирайте следния код и идентифицирайте всички проблеми, свързани с паметта:**

```cpp
class DataManager {
    int* buffer;
    int size;
public:
    DataManager(int n) {
        size = n;
        buffer = new int[size];
    }

    void resize(int newSize) {
        buffer = new int[newSize];
        size = newSize;
    }

    DataManager(const DataManager& other) {
        size = other.size;
        buffer = other.buffer;
    }
};
```


<CollapsibleSection title="Решение" icon="✅">

**Проблеми:**
1. **Липсва деструктор:** Няма `~DataManager()` за освобождаване на `buffer`.
2. **Memory leak в `resize()`:** Старата памет не се освобождава преди заделянето на нова.
3. **Shallow copy в copy constructor:** `buffer = other.buffer` просто копира указателя, не прави deep copy на данните.
4. **Липсва copy assignment operator:** Няма `operator=` за правилно копиране.
5. **Липсва move constructor и move assignment:** За ефективно преместване на ресурси.

**Правилна имплементация:**
```cpp
class DataManager {
    int* buffer;
    int size;
public:
    DataManager(int n) : size(n), buffer(new int[n]) {}

    ~DataManager() { delete[] buffer; }

    void resize(int newSize) {
        int* newBuffer = new int[newSize];
        int copySize = std::min(size, newSize);
        for (int i = 0; i < copySize; i++) {
            newBuffer[i] = buffer[i];
        }
        delete[] buffer;
        buffer = newBuffer;
        size = newSize;
    }

    DataManager(const DataManager& other) : size(other.size) {
        buffer = new int[size];
        for (int i = 0; i < size; i++) {
            buffer[i] = other.buffer[i];
        }
    }

    DataManager& operator=(const DataManager& other) {
        if (this != &other) {
            delete[] buffer;
            size = other.size;
            buffer = new int[size];
            for (int i = 0; i < size; i++) {
                buffer[i] = other.buffer[i];
            }
        }
        return *this;
    }
};
```

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["practice", "exercise"]}
>

### Задача 21: Имплементирайте двупосочен итератор за двусвързан списък с `...

**Имплементирайте двупосочен итератор за двусвързан списък с `operator++` и `operator--`:**

```cpp
template<typename T>
class DoublyLinkedList {
    struct Node {
        T data;
        Node* prev;
        Node* next;
    };

    class Iterator {
    private:
        Node* current;
    public:
        // Имплементирайте всички необходими оператори
    };
};
```


<CollapsibleSection title="Решение" icon="✅">

**Отговор:**
```cpp
class Iterator {
private:
    Node* current;
public:
    Iterator(Node* node) : current(node) {}

    // Достъп до стойността
    T& operator*() const {
        return current->data;
    }

    // Преместване напред (префикс)
    Iterator& operator++() {
        if (current) current = current->next;
        return *this;
    }

    // Преместване назад (префикс)
    Iterator& operator--() {
        if (current) current = current->prev;
        return *this;
    }

    // Преместване напред (постфикс)
    Iterator operator++(int) {
        Iterator temp = *this;
        ++(*this);
        return temp;
    }

    // Преместване назад (постфикс)
    Iterator operator--(int) {
        Iterator temp = *this;
        --(*this);
        return temp;
    }

    // Сравнение
    bool operator==(const Iterator& other) const {
        return current == other.current;
    }

    bool operator!=(const Iterator& other) const {
        return current != other.current;
    }
};
```

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["practice", "exercise"]}
>

### Задача 22: Имплементирайте пълен двусвързан списък с exception-safe вмъ...

**Имплементирайте пълен двусвързан списък с exception-safe вмъкване. Гарантирайте, че няма изтичане на памет дори при хвърляне на изключения.**


<CollapsibleSection title="Решение" icon="✅">

**Отговор:** Ключът е да използваме RAII и да заделим паметта така, че ако възникне изключение, всичко да се освободи автоматично:

```cpp
template<typename T>
class SafeDoublyLinkedList {
private:
    struct Node {
        T data;
        std::unique_ptr<Node> next; // Автоматично управление
        Node* prev; // Raw pointer назад (не притежава)

        Node(const T& val) : data(val), next(nullptr), prev(nullptr) {}
    };

    std::unique_ptr<Node> head;
    Node* tail;

public:
    SafeDoublyLinkedList() : head(nullptr), tail(nullptr) {}

    void add(const T& value) {
        auto newNode = std::make_unique<Node>(value);

        if (tail) {
            newNode->prev = tail;
            tail->next = std::move(newNode);
            tail = tail->next.get();
        } else {
            tail = newNode.get();
            head = std::move(newNode);
        }
    }
};
```

Използването на `unique_ptr` гарантира автоматично освобождаване при изключения.

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["practice", "exercise"]}
>

### Задача 23: Разгледайте сценарий с циклични референции използвайки `std:...

**Разгледайте сценарий с циклични референции използвайки `std::shared_ptr`. Обяснете проблема и предоставете решение с `std::weak_ptr`:**

```cpp
class Node {
public:
    std::shared_ptr<Node> next;
    std::shared_ptr<Node> prev;
    int data;
};
```


<CollapsibleSection title="Решение" icon="✅">

**Проблем:** Ако два възела се сочат взаимно чрез `shared_ptr`, reference count никога не достига нула и паметта никога не се освобождава.

**Решение:** Използвайте `weak_ptr` за едната връзка:

```cpp
class Node {
public:
    std::shared_ptr<Node> next;  // Силна референция напред
    std::weak_ptr<Node> prev;    // Слаба референция назад
    int data;

    Node(int val) : data(val) {}
};
```

Така `next` притежава следващия възел, но `prev` само наблюдава предишния, без да го притежава. Това прекъсва цикличната зависимост.

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["practice", "exercise"]}
>

### Задача 24: Използвайки Valgrind концептуално, анализирайте тази програм...

**Използвайки Valgrind концептуално, анализирайте тази програма:**

```cpp
void complexFunction() {
    int* arr1 = new int[50];
    int* arr2 = new int[100];

    for (int i = 0; i < 50; i++) {
        arr1[i] = i;
    }

    arr1 = arr2; // Презаписване
    delete[] arr2;
}

int main() {
    for (int i = 0; i < 1000; i++) {
        complexFunction();
    }
    return 0;
}
```


<CollapsibleSection title="Решение" icon="✅">

**Valgrind би докладвал:**
- **Memory leak:** 50 * sizeof(int) * 1000 = 200,000 байта изтичат, защото `arr1` се презаписва без да се освободи първата заделена памет.
- **Invalid free/delete:** `arr2` се освобождава два пъти - веднъж чрез `delete[] arr2` и втори път когато `arr1` (който вече сочи към същата памет) би трябвало да се освободи (но това не се случва в кода).

**Поправка:**
```cpp
void fixedFunction() {
    int* arr1 = new int[50];
    int* arr2 = new int[100];

    for (int i = 0; i < 50; i++) {
        arr1[i] = i;
    }

    delete[] arr1; // Освобождаване преди презаписване
    delete[] arr2;
}
```

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["practice", "exercise"]}
>

### Задача 25: Проектирайте memory-efficient двусвързан списък, който изпол...

**Проектирайте memory-efficient двусвързан списък, който използва sentinel nodes (фиктивни head и tail) за опростяване на граничните условия.**


<CollapsibleSection title="Решение" icon="✅">

**Отговор:**
```cpp
template<typename T>
class SentinelDoublyLinkedList {
private:
    struct Node {
        T data;
        Node* prev;
        Node* next;
        Node() : prev(nullptr), next(nullptr) {} // Sentinel конструктор
        Node(const T& val) : data(val), prev(nullptr), next(nullptr) {}
    };

    Node* sentinel_head; // Фиктивен head (не съдържа данни)
    Node* sentinel_tail; // Фиктивен tail (не съдържа данни)

public:
    SentinelDoublyLinkedList() {
        sentinel_head = new Node();
        sentinel_tail = new Node();
        sentinel_head->next = sentinel_tail;
        sentinel_tail->prev = sentinel_head;
    }

    ~SentinelDoublyLinkedList() {
        Node* current = sentinel_head->next;
        while (current != sentinel_tail) {
            Node* next = current->next;
            delete current;
            current = next;
        }
        delete sentinel_head;
        delete sentinel_tail;
    }

    void add(const T& value) {
        Node* newNode = new Node(value);
        Node* last = sentinel_tail->prev;

        // Вмъкване преди sentinel_tail
        newNode->prev = last;
        newNode->next = sentinel_tail;
        last->next = newNode;
        sentinel_tail->prev = newNode;
    }

    // Предимство: не се налагат проверки за nullptr при add/remove
};
```

Sentinel nodes опростяват логиката, защото винаги има "предишен" и "следващ" елемент.

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["practice", "exercise"]}
>

### Задача 26: Създайте custom iterator, който автоматично прескача елемент...

**Създайте custom iterator, който автоматично прескача елементи, удовлетворяващи даден предикат.**


<CollapsibleSection title="Решение" icon="✅">

**Отговор:**
```cpp
template<typename T, typename Predicate>
class FilteringIterator {
private:
    Node* current;
    Node* end;
    Predicate pred;

    void advance() {
        while (current != end && pred(current->data)) {
            current = current->next;
        }
    }

public:
    FilteringIterator(Node* start, Node* end_node, Predicate p)
        : current(start), end(end_node), pred(p) {
        advance(); // Прескачаме нежеланите елементи в началото
    }

    T& operator*() const {
        return current->data;
    }

    FilteringIterator& operator++() {
        if (current != end) {
            current = current->next;
            advance(); // Прескачаме нежелани елементи
        }
        return *this;
    }

    bool operator!=(const FilteringIterator& other) const {
        return current != other.current;
    }
};

// Пример: прескачане на отрицателни числа
auto it = FilteringIterator<int, auto>(
    list.begin(), list.end(),
    [](int x) { return x < 0; }
);
```

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["practice", "exercise"]}
>

### Задача 27: Имплементирайте move constructor и move assignment operator ...

**Имплементирайте move constructor и move assignment operator за двусвързан списък:**

```cpp
template<typename T>
class DoublyLinkedList {
public:
    DoublyLinkedList(DoublyLinkedList&& other) noexcept {
        // Имплементирайте move constructor
    }

    DoublyLinkedList& operator=(DoublyLinkedList&& other) noexcept {
        // Имплементирайте move assignment
    }
};
```


<CollapsibleSection title="Решение" icon="✅">

**Отговор:**
```cpp
// Move constructor
DoublyLinkedList(DoublyLinkedList&& other) noexcept
    : head(other.head), tail(other.tail) {
    // "Крадем" ресурсите от other
    other.head = nullptr;
    other.tail = nullptr;
}

// Move assignment
DoublyLinkedList& operator=(DoublyLinkedList&& other) noexcept {
    if (this != &other) {
        // Освобождаваме собствените ресурси
        Node* current = head;
        while (current) {
            Node* next = current->next;
            delete current;
            current = next;
        }

        // "Крадем" ресурсите от other
        head = other.head;
        tail = other.tail;
        other.head = nullptr;
        other.tail = nullptr;
    }
    return *this;
}
```

Move семантиката позволява ефективно трансфериране на ресурси без копиране.

</CollapsibleSection>

</ExerciseCard>

---


<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["practice", "exercise"]}
>

### Задача 28: Проектирайте memory pool allocator за възли на двусвързан сп...

**Проектирайте memory pool allocator за възли на двусвързан списък за намаляване на overhead и фрагментация.**


<CollapsibleSection title="Решение" icon="✅">

**Отговор:**
```cpp
template<typename T>
class NodePool {
private:
    struct Node {
        T data;
        Node* prev;
        Node* next;
    };

    struct Chunk {
        Node nodes[64]; // Блок от 64 възела
        bool used[64];
        Chunk* next;

        Chunk() : next(nullptr) {
            for (int i = 0; i < 64; i++) used[i] = false;
        }
    };

    Chunk* chunks;

public:
    NodePool() : chunks(new Chunk()) {}

    ~NodePool() {
        while (chunks) {
            Chunk* next = chunks->next;
            delete chunks;
            chunks = next;
        }
    }

    Node* allocate() {
        Chunk* current = chunks;
        while (current) {
            for (int i = 0; i < 64; i++) {
                if (!current->used[i]) {
                    current->used[i] = true;
                    return &current->nodes[i];
                }
            }
            if (!current->next) {
                current->next = new Chunk();
            }
            current = current->next;
        }
        return nullptr;
    }

    void deallocate(Node* node) {
        Chunk* current = chunks;
        while (current) {
            if (node >= current->nodes &&
                node < current->nodes + 64) {
                int index = node - current->nodes;
                current->used[index] = false;
                return;
            }
            current = current->next;
        }
    }
};
```

Memory pool намалява броя системни алокации и подобрява cache locality.

</CollapsibleSection>

</ExerciseCard>

---

**Забележка:** Тези упражнения преминават от основно разбиране на концепциите до напреднали имплементации, покривайки всички ключови теми от лекцията: двусвързани списъци, итератори, управление на паметта, smart pointers и RAII принципи.
