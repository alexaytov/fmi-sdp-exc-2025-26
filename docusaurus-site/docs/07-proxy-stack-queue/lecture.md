---
title: "Лекция"
sidebar_position: 1
slug: lecture
tags: [design-patterns, proxy, stack, queue, adapters, cpp]
---

import InfoBox from '@site/src/components/InfoBoxes/InfoBox';
import WarningBox from '@site/src/components/InfoBoxes/WarningBox';
import SuccessBox from '@site/src/components/InfoBoxes/SuccessBox';
import WhyBox from '@site/src/components/InfoBoxes/WhyBox';
import LearningObjectives from '@site/src/components/LearningObjectives';
import QuickSummary from '@site/src/components/QuickSummary';
import CollapsibleSection from '@site/src/components/CollapsibleSection';
import ComparisonBox from '@site/src/components/Comparison/ComparisonBox';
import Grid from '@site/src/components/Grid/Grid';
import Card from '@site/src/components/Grid/Card';

# Design Pattern: Proxy и Структури от Данни Stack и Queue

<QuickSummary>

**📋 Най-важно за изпита:**

### Proxy Design Pattern

**Дефиниция:** Предоставя заместител (placeholder) за друг обект, за да контролира достъпа до него.

**Структура:**
```cpp
// Subject Interface
class Image {
public:
    virtual void display() = 0;
    virtual ~Image() = default;
};

// RealSubject
class RealImage : public Image {
private:
    string filename;
public:
    RealImage(string file) : filename(file) {
        loadFromDisk();  // Скъпа операция
    }
    void display() override { /* показване */ }
};

// Proxy
class ProxyImage : public Image {
private:
    string filename;
    RealImage* realImage;
public:
    ProxyImage(string file) : filename(file), realImage(nullptr) {}

    void display() override {
        if (realImage == nullptr) {
            realImage = new RealImage(filename);  // Lazy loading
        }
        realImage->display();
    }

    ~ProxyImage() { delete realImage; }
};
```

**Видове Proxies:**
| Тип | Цел | Пример |
|-----|-----|--------|
| **Virtual Proxy** | Lazy initialization | Зареждане на изображение при нужда |
| **Remote Proxy** | Локален представител на отдалечен обект | RPC, REST API клиент |
| **Protection Proxy** | Контрол на достъпа | Проверка на права преди операция |
| **Smart Proxy** | Допълнителна логика | Кеширане, логване, reference counting |

### Stack - LIFO (Last-In, First-Out)

**Основни операции (всички O(1)):**
```cpp
push(element)   // Добавя на върха
pop()           // Премахва и връща горния елемент
top()           // Връща горния елемент без да го премахва
isEmpty()       // Проверява дали е празен
size()          // Връща броя елементи
```

**Имплементация с масив:**
```cpp
class ArrayStack {
private:
    int* arr;
    int top;       // Индекс на върха
    int capacity;

public:
    ArrayStack(int cap) : capacity(cap), top(-1) {
        arr = new int[capacity];
    }

    void push(int x) {
        if (top >= capacity - 1) {
            // Stack overflow
            return;
        }
        arr[++top] = x;
    }

    int pop() {
        if (top < 0) {
            // Stack underflow
            return -1;
        }
        return arr[top--];
    }

    int peek() {
        if (top < 0) return -1;
        return arr[top];
    }

    bool isEmpty() { return top == -1; }

    ~ArrayStack() { delete[] arr; }
};
```

**Имплементация със свързан списък:**
```cpp
class LinkedStack {
private:
    struct Node {
        int data;
        Node* next;
        Node(int val) : data(val), next(nullptr) {}
    };
    Node* top;

public:
    LinkedStack() : top(nullptr) {}

    void push(int x) {
        Node* newNode = new Node(x);
        newNode->next = top;
        top = newNode;
    }

    int pop() {
        if (!top) return -1;
        int value = top->data;
        Node* temp = top;
        top = top->next;
        delete temp;
        return value;
    }

    int peek() {
        if (!top) return -1;
        return top->data;
    }

    bool isEmpty() { return top == nullptr; }

    ~LinkedStack() {
        while (top) {
            Node* temp = top;
            top = top->next;
            delete temp;
        }
    }
};
```

### Queue - FIFO (First-In, First-Out)

**Основни операции (всички O(1)):**
```cpp
enqueue(element)  // Добавя в края
dequeue()         // Премахва и връща предния елемент
front()           // Връща предния елемент без да го премахва
isEmpty()         // Проверява дали е празна
size()            // Връща броя елементи
```

**Circular Queue с масив:**
```cpp
class CircularQueue {
private:
    int* arr;
    int front, rear;
    int capacity;
    int count;

public:
    CircularQueue(int cap) : capacity(cap), front(0), rear(-1), count(0) {
        arr = new int[capacity];
    }

    void enqueue(int x) {
        if (count >= capacity) return;  // Queue full

        rear = (rear + 1) % capacity;   // Circular wrap
        arr[rear] = x;
        count++;
    }

    int dequeue() {
        if (count == 0) return -1;      // Queue empty

        int value = arr[front];
        front = (front + 1) % capacity; // Circular wrap
        count--;
        return value;
    }

    int getFront() {
        if (count == 0) return -1;
        return arr[front];
    }

    bool isEmpty() { return count == 0; }
    int size() { return count; }

    ~CircularQueue() { delete[] arr; }
};
```

**Имплементация със свързан списък:**
```cpp
class LinkedQueue {
private:
    struct Node {
        int data;
        Node* next;
        Node(int val) : data(val), next(nullptr) {}
    };
    Node* front;
    Node* rear;

public:
    LinkedQueue() : front(nullptr), rear(nullptr) {}

    void enqueue(int x) {
        Node* newNode = new Node(x);
        if (rear) {
            rear->next = newNode;
        } else {
            front = newNode;  // Първи елемент
        }
        rear = newNode;
    }

    int dequeue() {
        if (!front) return -1;

        int value = front->data;
        Node* temp = front;
        front = front->next;
        if (!front) rear = nullptr;  // Последен елемент

        delete temp;
        return value;
    }

    int getFront() {
        if (!front) return -1;
        return front->data;
    }

    bool isEmpty() { return front == nullptr; }

    ~LinkedQueue() {
        while (front) {
            Node* temp = front;
            front = front->next;
            delete temp;
        }
    }
};
```

### STL Adapter Pattern

**std::stack - адаптер над deque по подразбиране:**
```cpp
#include <stack>

std::stack<int> s;
s.push(10);           // Добавя
s.push(20);
s.top();              // 20
s.pop();              // Премахва 20
s.empty();            // false
s.size();             // 1

// Може да се базира на различен контейнер:
std::stack<int, std::vector<int>> s_vec;
std::stack<int, std::list<int>> s_list;
```

**std::queue - адаптер над deque по подразбиране:**
```cpp
#include <queue>

std::queue<int> q;
q.push(10);           // Добавя в края
q.push(20);
q.front();            // 10
q.pop();              // Премахва 10
q.empty();            // false
q.size();             // 1

// Може да се базира на различен контейнер:
std::queue<int, std::list<int>> q_list;
```

### Сравнение: Array vs List Implementation

| Критерий | Array-based | List-based |
|----------|-------------|------------|
| **Памет** | Фиксиран капацитет | Динамична, само нужното |
| **Overflow/Underflow** | Възможен overflow | Само underflow (празна) |
| **Cache locality** | Отлична | Лоша |
| **Реализация** | По-проста | По-сложна (pointer management) |
| **Resize** | Нужна реалокация | Не е нужна |

### Приложения

**Stack:**
- Function call stack (рекурсия)
- Undo/Redo функционалност
- Парсване на изрази (infix → postfix)
- Backtracking (DFS)
- Балансиране на скоби

**Queue:**
- Task scheduling (CPU, printer)
- Buffering (keyboard, network)
- BFS (Breadth-First Search)
- Cache replacement (FIFO)
- Handling requests (server)

### Често Срещани Грешки

```cpp
// ❌ Stack overflow без проверка
void push(int x) {
    arr[++top] = x;  // Ако top >= capacity - buffer overflow!
}

// ✅ С проверка
void push(int x) {
    if (top >= capacity - 1) return;
    arr[++top] = x;
}

// ❌ Circular queue: Забравяне на modulo
rear = rear + 1;  // Ще излезе извън границите!

// ✅ С modulo
rear = (rear + 1) % capacity;

// ❌ Queue: Не актуализираме rear при dequeue на последния
front = front->next;  // rear остава да сочи към изтрит възел!

// ✅ Правилно
front = front->next;
if (!front) rear = nullptr;
```

### Сложност на Операциите

| Операция | Stack (Array) | Stack (List) | Queue (Circular) | Queue (List) |
|----------|---------------|--------------|------------------|--------------|
| push/enqueue | **O(1)** | **O(1)** | **O(1)** | **O(1)** |
| pop/dequeue | **O(1)** | **O(1)** | **O(1)** | **O(1)** |
| top/front | **O(1)** | **O(1)** | **O(1)** | **O(1)** |
| isEmpty | **O(1)** | **O(1)** | **O(1)** | **O(1)** |
| Памет | O(capacity) | O(size) | O(capacity) | O(size) |

</QuickSummary>

<LearningObjectives
  objectives={[
    "Опишете Proxy Design Pattern и неговите случаи на употреба",
    "Обяснете структурите от данни stack и queue, включително техните основни операции",
    "Имплементирайте stack и queue в C++ с масиви, свързани списъци и STL",
    "Анализирайте как stack и queue функционират като adapter patterns в C++",
    "Приложете proxy и adapter принципи в практически програмни сценарии"
  ]}
/>

---

## 1. Въведение и Мотивация

<WhyBox title="Защо са важни Design Patterns?">

**Design patterns** са доказани, преизползваеми решения на често срещани проблеми в софтуерния дизайн. Те ни спестяват време, като ни позволяват да използваме колективния опит на индустрията, вместо да изобретяваме колелото отново.

Днес ще разгледаме:
- **Proxy Pattern** - за контролиран достъп до обекти
- **Stack & Queue** - фундаментални структури от данни
- **Adapter Pattern** - как STL използва адаптери за stack и queue

</WhyBox>

### Защо Design Patterns подобряват поддръжката?

<SuccessBox title="Ползи от Design Patterns">

- Предоставят **общ речник** за разработчиците (напр. "Нека използваме Proxy тук")
- Водят до по-структуриран, разбираем и разширяем код
- Въплъщават принципи като **Open/Closed Principle** (отворен за разширение, затворен за модификация)
- Намаляват бъговете чрез използване на добре тествани подходи

</SuccessBox>

---

## 2. Преговор: C++ OOP и Концепции за Памет

### 2.1. Ключови OOP Характеристики

<InfoBox title="Основни OOP Концепции в C++">

**Класове:** Чертежи за обекти, капсулиращи данни (член променливи) и поведение (член методи).

```cpp
class Car {
private:
    string brand;
public:
    void setBrand(string b) { brand = b; }
    string getBrand() { return brand; }
};
```

**Интерфейси (Абстрактни класове):** C++ използва абстрактни класове с чисто виртуални функции (`= 0`) за дефиниране на контракти.

```cpp
class Drawable {
public:
    virtual void draw() = 0; // Чисто виртуална функция
};
```

**Наследяване:** Позволява на класовете да наследяват свойства и методи, насърчавайки преизползването на код.

```cpp
class Car : public Vehicle {
    // Car наследява от Vehicle
};
```

</InfoBox>

### 2.2. Показалци и Динамично Управление на Паметта

<Grid columns={2}>
  <Card title="Показалци (Pointers)">
    - Променливи, съхраняващи адреси на памет
    - Необходими за работа с динамично заделена памет

    ```cpp
    int x = 10;
    int* ptr = &x;
    cout << *ptr; // 10
    ```
  </Card>
  <Card title="Динамична Памет">
    - `new`: Заделя памет в heap
    - `delete`: Освобождава заделена памет

    ```cpp
    int* arr = new int[5];
    // ... използване ...
    delete[] arr;
    ```
  </Card>
</Grid>

<WarningBox title="Внимание с Паметта!">

Динамичната памет е критична за структури от данни като свързани списъци, които трябва да растат или свиват по време на изпълнение. Винаги освобождавайте паметта, която сте заделили!

</WarningBox>

---

## 3. Proxy Design Pattern

### 3.1. Дефиниция и Намерение

<InfoBox title="Какво е Proxy Pattern?">

**Proxy Pattern** предоставя **заместител или placeholder** за друг обект, за да контролира достъпа до него.

**Намерение:** Да добави ниво на индиректност между клиент и реалния обект, позволявайки допълнителна логика без да променя кода на клиента или основната функционалност на реалния обект.

</InfoBox>

### 3.2. Основни Роли в Proxy Pattern

```cpp
// Subject Interface
class Image {
public:
    virtual void display() = 0;
    virtual ~Image() = default;
};

// RealSubject
class RealImage : public Image {
private:
    string filename;
    void loadFromDisk() {
        cout << "Loading " << filename << endl;
    }
public:
    RealImage(string file) : filename(file) {
        loadFromDisk();
    }
    void display() override {
        cout << "Displaying " << filename << endl;
    }
};

// Proxy
class ProxyImage : public Image {
private:
    string filename;
    RealImage* realImage;
public:
    ProxyImage(string file) : filename(file), realImage(nullptr) {}

    void display() override {
        if (realImage == nullptr) {
            realImage = new RealImage(filename); // Lazy loading
        }
        realImage->display();
    }

    ~ProxyImage() { delete realImage; }
};
```

<Grid columns={3}>
  <Card title="1. Subject">
    **Интерфейс**

    Дефинира общите операции за реалния обект и proxy
  </Card>
  <Card title="2. RealSubject">
    **Реален Обект**

    Компонентът, който извършва основната работа
  </Card>
  <Card title="3. Proxy">
    **Заместител**

    Обвива RealSubject и добавя допълнителна логика
  </Card>
</Grid>

### 3.3. Видове Proxies

<CollapsibleSection title="1. Virtual Proxy (Виртуален Proxy)" icon="🔄" defaultOpen={true}>

**Цел:** Отлага създаването на обекти или зареждането на скъпи ресурси до момента, когато са абсолютно необходими (lazy initialization).

**Пример:** Зареждане на голям файл с изображение само когато се показва на екрана, а не при стартиране на програмата.

```cpp
// Примерът по-горе с ProxyImage е Virtual Proxy
```

</CollapsibleSection>

<CollapsibleSection title="2. Remote Proxy (Отдалечен Proxy)" icon="🌐">

**Цел:** Действа като локален представител на обект, намиращ се в различно адресно пространство (напр. на отдалечен сървър).

**Пример:** Локален proxy обект управлява мрежовата комуникация с реална услуга на отдалечен сървър.

</CollapsibleSection>

<CollapsibleSection title="3. Protection Proxy (Защитен Proxy)" icon="🔒">

**Цел:** Контролира достъпа до реалния обект въз основа на разрешения, автентикация или роли.

**Пример:** Proxy за база данни проверява потребителските credentials преди да позволи изпълнението на заявки.

</CollapsibleSection>

<CollapsibleSection title="4. Smart Proxy (Интелигентен Proxy)" icon="💡">

**Цел:** Добавя допълнителна функционалност като кеширане на резултати, логване на извиквания на методи или управление на жизнения цикъл на обекти.

**Пример:** Caching proxy за уеб API съхранява предишни отговори, за да избегне излишни мрежови заявки.

</CollapsibleSection>

### 3.4. Предимства и Ограничения

<Grid columns={2}>
  <Card title="✅ Предимства">
    - **Контролиран достъп** до обекти
    - **Подобрена производителност** (виртуални proxies)
    - **Повишена сигурност** (protection proxies)
    - **Прозрачност** за клиента
    - **Разделяне на отговорностите**
  </Card>
  <Card title="⚠️ Ограничения">
    - **Повишена сложност** на кода
    - **Леко забавяне** от допълнително извикване
    - **Поддръжка** при промени в интерфейса
  </Card>
</Grid>

---

## 4. Структури от Данни: Stack и Queue

### 4.1. Stack - LIFO Принцип

<InfoBox title="Дефиниция на Stack">

**Stack** е линейна структура от данни, която следва принципа **LIFO (Last-In, First-Out)**.

**Аналогия:** Стек от чинии - можете да добавяте или премахвате само от върха.

</InfoBox>

**Основни Операции (всички O(1)):**

```cpp
// Основни операции на Stack
push(element)  // Добавя елемент на върха
pop()          // Премахва и връща горния елемент
top()          // Връща горния елемент без да го премахва
isEmpty()      // Проверява дали стекът е празен
size()         // Връща броя елементи
```

<WhyBox title="Типични Приложения на Stack">

- **Function Call Stack:** Управление на извиквания на функции и локални променливи
- **Undo/Redo функционалност:** Съхраняване на състояния за връщане назад
- **Expression Evaluation:** Парсване на математически изрази (напр. infix към postfix)
- **Backtracking алгоритми:** Depth-First Search (DFS) често използва stack

</WhyBox>

### 4.2. Queue - FIFO Принцип

<InfoBox title="Дефиниция на Queue">

**Queue** е линейна структура от данни, която следва принципа **FIFO (First-In, First-Out)**.

**Аналогия:** Опашка от хора, чакащи за обслужване - първият в опашката е първият обслужен.

</InfoBox>

**Основни Операции (всички O(1)):**

```cpp
// Основни операции на Queue
enqueue(element) // Добавя елемент в края на опашката
dequeue()        // Премахва и връща предния елемент
front()          // Връща предния елемент без да го премахва
isEmpty()        // Проверява дали опашката е празна
size()           // Връща броя елементи
```

<WhyBox title="Типични Приложения на Queue">

- **Task Scheduling:** Управление на процеси или задачи, чакащи за CPU време
- **Printer Queues:** Обработка на задачи за печат в реда на пристигане
- **Buffering:** Синхронизиране на потока от данни между различни части на системата
- **Breadth-First Search (BFS):** Обхождане на графи ниво по ниво

</WhyBox>

### 4.3. Stack vs Queue: Кога Да Използвате Кой

<Grid columns={2}>
  <Card title="Stack (LIFO)">
    **Използвайте когато:**
    - Трябва да достъпвате елементи в обратен ред
    - Имплементирате undo/redo
    - Парсирате изрази с скоби
    - Използвате DFS

    **Достъп:** Последно добавеният елемент се достъпва пръв
  </Card>
  <Card title="Queue (FIFO)">
    **Използвайте когато:**
    - Трябва да обработвате елементи в реда на пристигане
    - Имплементирате fair scheduling
    - Буфериране на данни
    - Използвате BFS

    **Достъп:** Първо добавеният елемент се достъпва пръв
  </Card>
</Grid>

---

## 5. C++ Имплементации на Stack и Queue

### 5.1. Array-Based Stack

<InfoBox title="Концепция">

Използва динамичен масив и integer индекс (`top`) за проследяване на върха на стека.

**Предимства:** Прост, cache-friendly (непрекъсната памет)
**Недостатъци:** Фиксиран капацитет (ако не се resize-ва динамично)

</InfoBox>

```cpp
class ArrayStack {
private:
    int* arr;
    int top;
    int capacity;

public:
    ArrayStack(int cap) : capacity(cap), top(-1) {
        arr = new int[capacity];
    }

    void push(int x) {
        if (top >= capacity - 1) {
            cout << "Stack overflow!" << endl;
            return;
        }
        arr[++top] = x;
    }

    int pop() {
        if (top < 0) {
            cout << "Stack underflow!" << endl;
            return -1;
        }
        return arr[top--];
    }

    int peek() {
        if (top < 0) return -1;
        return arr[top];
    }

    bool isEmpty() { return top == -1; }

    ~ArrayStack() { delete[] arr; }
};
```

### 5.2. Circular Array-Based Queue

<InfoBox title="Концепция">

Масив, където "краят" се свързва обратно към "началото", за да се използва пространството ефективно. Използва `front` и `rear` показалци.

**Ключова техника:** Модулна аритметика `% capacity` за циркулярното поведение

</InfoBox>

```cpp
class CircularQueue {
private:
    int* buffer;
    int front, rear, size, capacity;

public:
    CircularQueue(int cap) : capacity(cap), size(0), front(0), rear(-1) {
        buffer = new int[capacity];
    }

    void enqueue(int x) {
        if (size == capacity) {
            cout << "Queue is full!" << endl;
            return;
        }
        rear = (rear + 1) % capacity; // Wrap-around
        buffer[rear] = x;
        size++;
    }

    int dequeue() {
        if (size == 0) {
            cout << "Queue is empty!" << endl;
            return -1;
        }
        int x = buffer[front];
        front = (front + 1) % capacity; // Wrap-around
        size--;
        return x;
    }

    int getFront() {
        if (size == 0) return -1;
        return buffer[front];
    }

    bool isEmpty() { return size == 0; }

    ~CircularQueue() { delete[] buffer; }
};
```

<SuccessBox title="Защо Циркулярна?">

Циркулярната опашка предотвратява изхабяването на пространство. Без циркулярност, при много enqueue/dequeue операции, задната част на масива би останала неизползвана.

</SuccessBox>

### 5.3. Linked List-Based Stack

```cpp
struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedListStack {
private:
    Node* top;

public:
    LinkedListStack() : top(nullptr) {}

    void push(int x) {
        Node* newNode = new Node(x);
        newNode->next = top;
        top = newNode;
    }

    int pop() {
        if (top == nullptr) {
            cout << "Stack is empty!" << endl;
            return -1;
        }
        int data = top->data;
        Node* temp = top;
        top = top->next;
        delete temp;
        return data;
    }

    int peek() {
        if (top == nullptr) return -1;
        return top->data;
    }

    bool isEmpty() { return top == nullptr; }

    ~LinkedListStack() {
        while (top != nullptr) {
            Node* temp = top;
            top = top->next;
            delete temp;
        }
    }
};
```

<Grid columns={2}>
  <Card title="✅ Предимства">
    - Динамичен размер
    - Никакъв фиксиран капацитет
    - Гъвкавост
  </Card>
  <Card title="⚠️ Недостатъци">
    - Допълнителна памет за показалци
    - Не е cache-friendly
    - Възлите могат да са разпръснати в паметта
  </Card>
</Grid>

### 5.4. Linked List-Based Queue

```cpp
class LinkedListQueue {
private:
    Node* front;
    Node* rear;

public:
    LinkedListQueue() : front(nullptr), rear(nullptr) {}

    void enqueue(int x) {
        Node* newNode = new Node(x);
        if (rear == nullptr) {
            front = rear = newNode;
            return;
        }
        rear->next = newNode;
        rear = newNode;
    }

    int dequeue() {
        if (front == nullptr) {
            cout << "Queue is empty!" << endl;
            return -1;
        }
        int data = front->data;
        Node* temp = front;
        front = front->next;
        if (front == nullptr) rear = nullptr; // Queue became empty
        delete temp;
        return data;
    }

    int getFront() {
        if (front == nullptr) return -1;
        return front->data;
    }

    bool isEmpty() { return front == nullptr; }

    ~LinkedListQueue() {
        while (front != nullptr) {
            Node* temp = front;
            front = front->next;
            delete temp;
        }
    }
};
```

<WarningBox title="Внимание при Front и Rear">

Внимателно управлявайте показалците `front` и `rear`, особено за първия и последния елемент! При dequeue на последния елемент, и двата показалеца трябва да станат `nullptr`.

</WarningBox>

---

## 6. STL Stack и Queue: Adapter Pattern в Действие

### 6.1. Какво е Container Adapter?

<InfoBox title="Container Adapters в C++ STL">

**`std::stack`** и **`std::queue`** са **container adapters** - те не имплементират структурата от данни от нулата, а **обвиват** съществуващ контейнер и предоставят ограничен интерфейс.

По подразбиране използват `std::deque`, но можете да зададете различен контейнер!

</InfoBox>

### 6.2. Използване на std::stack

```cpp
#include <stack>
#include <iostream>

int main() {
    std::stack<int> s; // Използва std::deque по подразбиране

    s.push(10);
    s.push(20);
    s.push(30);

    std::cout << "Top: " << s.top() << std::endl; // 30
    s.pop();
    std::cout << "Top: " << s.top() << std::endl; // 20
    std::cout << "Size: " << s.size() << std::endl; // 2

    return 0;
}
```

**Избор на основен контейнер:**

```cpp
std::stack<int, std::vector<int>> s_vec;  // Използва vector
std::stack<int, std::list<int>> s_list;    // Използва list
```

### 6.3. Използване на std::queue

```cpp
#include <queue>
#include <iostream>

int main() {
    std::queue<int> q; // Използва std::deque по подразбиране

    q.push(100);
    q.push(200);
    q.push(300);

    std::cout << "Front: " << q.front() << std::endl; // 100
    q.pop();
    std::cout << "Front: " << q.front() << std::endl; // 200
    std::cout << "Size: " << q.size() << std::endl; // 2

    return 0;
}
```

**Избор на основен контейнер:**

```cpp
std::queue<int, std::list<int>> q_list; // Използва list
```

### 6.4. Предимства на STL Container Adapters

<SuccessBox title="Защо да Използваме STL?">

- **Опростена имплементация:** Не управлявате показалци, масиви или памет ръчно
- **Добре тествани и оптимизирани:** Robust, ефективен код
- **Гъвкавост:** Можете да зададете основния контейнер
- **Time Complexity гаранции:** O(1) за основни операции
- **Error handling:** Вградени проверки за чести проблеми
- **Съвместимост с Adapter Pattern:** Адаптират general-purpose контейнер за специфичен интерфейс

</SuccessBox>

---

## 7. Adapter Pattern: Stack и Queue като Примери

### 7.1. Разбиране на Adapter Pattern

<InfoBox title="Какво е Adapter Pattern?">

**Adapter Pattern** е структурен design pattern, който позволява на два несъвместими интерфейса да работят заедно.

**Аналогия:** Универсален адаптер за захранване. Той не променя щепсела на лаптопа, нито контакта; просто ги прави съвместими.

</InfoBox>

**Роли:**
- **Target:** Интерфейсът, който клиентът очаква
- **Adaptee:** Съществуващият клас с несъвместим интерфейс
- **Adapter:** Класът, който имплементира Target интерфейса и обвива инстанция на Adaptee

### 7.2. std::stack и std::queue като Adapters

<Grid columns={2}>
  <Card title="Target Interface">
    **std::stack:**
    `push()`, `pop()`, `top()`

    **std::queue:**
    `push()`, `pop()`, `front()`
  </Card>
  <Card title="Adaptee">
    Основен sequence контейнер:
    - `std::deque`
    - `std::vector`
    - `std::list`

    Тези имат general методи като `push_back()`, `pop_back()`, `push_front()`, `pop_front()`
  </Card>
</Grid>

**Как работи адаптирането:**

```cpp
// std::stack делегира към adaptee
template<typename T, typename Container = std::deque<T>>
class stack {
private:
    Container c; // Adaptee
public:
    void push(const T& x) { c.push_back(x); }  // Делегира към adaptee
    void pop() { c.pop_back(); }               // Делегира към adaptee
    T& top() { return c.back(); }              // Делегира към adaptee
    bool empty() const { return c.empty(); }
    size_t size() const { return c.size(); }
};
```

<WhyBox title="Защо този подход?">

**Енкапсулация, гъвкавост, преизползваемост, използване на производителността.** Получавате специфичното поведение (LIFO/FIFO), използвайки най-ефективния основен контейнер за вашите нужди.

</WhyBox>

---

## 8. Case Studies и Code Walkthroughs

### 8.1. Case Study 1: Virtual Proxy за Зареждане на Изображения

<CollapsibleSection title="Пълен код за Virtual Proxy" icon="🖼️" defaultOpen={false}>

```cpp
#include <iostream>
#include <string>
using namespace std;

// Subject Interface
class Image {
public:
    virtual void display() = 0;
    virtual ~Image() = default;
};

// RealSubject
class RealImage : public Image {
private:
    string filename;

    void loadFromDisk() {
        cout << "Loading " << filename << " from disk..." << endl;
        // Симулация на бавно зареждане
    }

public:
    RealImage(string file) : filename(file) {
        loadFromDisk();
    }

    void display() override {
        cout << "Displaying " << filename << endl;
    }
};

// Proxy
class ProxyImage : public Image {
private:
    string filename;
    RealImage* realImage;

public:
    ProxyImage(string file) : filename(file), realImage(nullptr) {}

    void display() override {
        if (realImage == nullptr) {
            realImage = new RealImage(filename); // Lazy loading
        }
        realImage->display();
    }

    ~ProxyImage() {
        delete realImage;
    }
};

int main() {
    Image* image = new ProxyImage("large_photo.jpg");
    cout << "Application started. Image object created, but not loaded.\n";

    // Потребителят кликва, за да види изображението...
    cout << "\nUser clicks to view image:\n";
    image->display(); // Реалното изображение се зарежда САМО ТУК

    cout << "\nUser views image again:\n";
    image->display(); // Реалното изображение се преизползва

    delete image;
    return 0;
}
```

**Забележка:** "Loading image..." се появява само веднъж, при първото извикване на `display()`. Това показва lazy initialization!

</CollapsibleSection>

### 8.2. Case Study 2: Сравнение Linked-List Stack vs STL Stack

<ComparisonBox
  wrong={{
    title: "Manual Linked-List Stack",
    content: (
      <div>
        <p><strong>Предимства:</strong></p>
        <ul>
          <li>Пълен контрол</li>
          <li>Дълбоко разбиране на паметта</li>
        </ul>
        <p><strong>Недостатъци:</strong></p>
        <ul>
          <li>Ръчно управление на паметта</li>
          <li>Boilerplate код</li>
          <li>Потенциал за memory leaks</li>
        </ul>
      </div>
    )
  }}
  correct={{
    title: "STL Stack",
    content: (
      <div>
        <p><strong>Предимства:</strong></p>
        <ul>
          <li>Безопасен, оптимизиран</li>
          <li>По-малко код</li>
          <li>Използва Adapter pattern</li>
          <li>Автоматично управление на паметта</li>
        </ul>
        <p><strong>Недостатъци:</strong></p>
        <ul>
          <li>По-малко прозрачно относно имплементацията</li>
        </ul>
      </div>
    )
  }}
/>

<SuccessBox title="Кога Да Използвате Кой?">

**Почти винаги използвайте STL за production код!** Пишете ръчна имплементация само за учене или специфични low-level нужди.

</SuccessBox>

---

## 9. Резюме и Ключови Изводи

<InfoBox title="Резюме">

### Proxy Pattern:
- Действа като **surrogate** за контролиране на достъпа до `RealSubject`
- Полезен за **lazy loading, сигурност, кеширане, логване, remote access**
- Добавя индиректност, но поддържа консистентен `Subject` интерфейс

### Stack Data Structure:
- **LIFO** (Last-In, First-Out). Операции: `push`, `pop`, `top`
- Необходим за **function calls, undo/redo, expression evaluation**

### Queue Data Structure:
- **FIFO** (First-In, First-Out). Операции: `enqueue`, `dequeue`, `front`
- Необходим за **task scheduling, buffering, BFS**

### C++ Имплементации:
- Могат да бъдат построени ръчно с **масиви** (циркулярни за queues) или **свързани списъци**
- **STL `std::stack` и `std::queue` са мощни container adapters**

### Adapter Pattern:
- Позволява на **несъвместими интерфейси да работят заедно**
- `std::stack` и `std::queue` адаптират general-purpose контейнери (като `std::deque`) за предоставяне на специфични LIFO/FIFO интерфейси

</InfoBox>

<SuccessBox title="Добри Практики">

- Използвайте **STL контейнери**, когато е възможно - те са тествани и оптимизирани
- Разберете **trade-offs** между различните имплементации
- Винаги **освобождавайте динамично заделена памет**
- Използвайте **design patterns** за по-чист и по-поддържаем код
- Изберете подходящата структура от данни според **ordering requirements** (LIFO vs FIFO)

</SuccessBox>

---

## 10. Практически Задачи

<CollapsibleSection title="Задача 1: Имплементирайте Security Proxy" icon="🔒">

**Сценарий:** Имате `DocumentService` с метод `readDocument(string docId)`. Създайте `SecurityProxy`, който проверява дали текущият потребител има разрешение преди да извика `readDocument`.

**Задача:** Дефинирайте `IDocumentService` интерфейс, класа `RealDocumentService` и класа `SecurityProxy`.

</CollapsibleSection>

<CollapsibleSection title="Задача 2: Имплементирайте Circular Queue" icon="🔄">

**Предизвикателство:** Имплементирайте `CircularQueue` клас в C++ с методи `enqueue()`, `dequeue()`, `getFront()`, `getSize()` и `isEmpty()`.

**Фокус:** Правилно управление на `front`, `rear`, `size` и модулната аритметика за wrap-around.

</CollapsibleSection>

<CollapsibleSection title="Задача 3: Stack или Queue?" icon="🤔">

За всеки сценарий решете дали **Stack** или **Queue** е най-подходящ:

1. Управление на web browser history (back button)
2. Обработка на входящи съобщения от external система
3. Оценяване на аритметични изрази със скоби
4. Задачи, чакащи за single CPU core по fair начин
5. Съхранение на посетени nodes в Depth-First Search
6. Print jobs, изпратени към shared network printer

**Отговори:** 1-Stack, 2-Queue, 3-Stack, 4-Queue, 5-Stack, 6-Queue

</CollapsibleSection>

---

## Допълнителни Ресурси

### Stack и Queue Туториали

- [Implement Queue using Stacks - GeeksforGeeks](https://www.geeksforgeeks.org/dsa/queue-using-stacks/) - Имплементация на Queue със Stack
- [Stacks and Queues in C++ - Code of Code](https://codeofcode.org/lessons/stacks-and-queues-in-cpp/) - Основи и приложения
- [Stacks and Queues - CMU CS](https://www.cs.cmu.edu/~15122/handouts/lectures/09-stackqueue.pdf) - Академична лекция
- [Stack and Queue C++ Programs - GeeksforGeeks](https://www.geeksforgeeks.org/cpp/stack-and-queue-c-cpp-programs/) - Практически задачи

### Имплементация

- [Master Stack and Queue Implementation in C++](https://www.youtube.com/watch?v=YUMppCKrSqo) - Видео туториал
- [Stacks and Queues in C++ - CodeSignal](https://codesignal.com/learn/courses/mastering-complex-data-structures-in-cpp/lessons/stacks-and-queues-in-cpp) - С примери
- [Implementing Stack, Queue, and Deque](https://www.student-notes.net/implementing-stack-queue-and-deque-data-structures/) - Python и C++

### Приложения и Патърни

- [Stacks & Queues: Concepts and Interview Questions](https://www.nullpointerclub.com/p/stacks-queues-concepts-applications-and-interview-questions) - За интервюта
- [Understanding Stacks and Queues - Medium](https://hanisahilole.medium.com/understanding-stacks-and-queues-key-data-structures-for-real-world-problem-solving-92292c9e16b8) - Реални примери

### C++ STL

- [std::stack Reference](https://en.cppreference.com/w/cpp/container/stack) - Официална документация
- [std::queue Reference](https://en.cppreference.com/w/cpp/container/queue) - Официална документация
- [Stacks and Queues - Princeton](https://www.cs.princeton.edu/courses/archive/fall23/cos226/lectures/study/13StacksAndQueues.html) - Study guide

### Практика

- [Implement Stack using Queue](https://www.techiedelight.com/implement-stack-using-queue-data-structure/) - Обратната задача
