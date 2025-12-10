---
title: Design Pattern Proxy, Stack и Queue
theme: white
highlightTheme: github
transition: slide
controls: true
progress: true
slideNumber: true
---

# 🎨 Proxy Pattern

## Stack & Queue Structures

**Лекция 7** • Структури от Данни и Програмиране

---

## 📋 Съдържание

🎯 **Proxy Design Pattern**

📚 **Stack - LIFO**

📬 **Queue - FIFO**

⚙️ **Имплементации**

💡 **Практически Приложения**

Note:
Днес ще изучим важен design pattern и две фундаментални структури от данни.

---

<!-- .slide: data-background="#e7f3ff" -->

# 🎯 Част 1

## Proxy Design Pattern

---

## Какво е Proxy?

**Дефиниция:** Заместител за друг обект, който контролира достъпа до него

**Цел:**
- Lazy initialization
- Access control
- Logging/caching
- Remote object representation

Note:
Proxy pattern-ът е structural design pattern, който добавя слой между клиента и реалния обект.

---

## Структура на Proxy

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
    ProxyImage(string file)
        : filename(file), realImage(nullptr) {}

    void display() override {
        if (!realImage) {
            realImage = new RealImage(filename);
        }
        realImage->display();
    }
};
```

Note:
Proxy отлага създаването на скъпия RealImage до момента на първо използване.

---

## Видове Proxies

| Тип | Цел | Пример |
|-----|-----|--------|
| **Virtual** | Lazy initialization | Image loading |
| **Remote** | Локален представител | RPC, REST API |
| **Protection** | Access control | Authentication |
| **Smart** | Допълнителна логика | Reference counting, caching |

Note:
Всеки вид proxy решава различен проблем.

---

<!-- .slide: data-background="#e8f5e9" -->

# Част 2

## Stack - LIFO

---

## Какво е Stack?

**LIFO**: Last-In, First-Out

**Метафора:** Стек с чинии - взимате от горе, добавяте отгоре

**Основни операции (всички O(1)):**
- `push(x)` - добавя елемент
- `pop()` - премахва и връща последния
- `top()` - връща последния без премахване
- `isEmpty()` - проверява дали е празен

Note:
Stack е една от най-простите и най-често използвани структури от данни.

---

## Имплементация с Масив

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

    ~ArrayStack() { delete[] arr; }
};
```

Note:
Масивът дава константен достъп, но фиксиран размер.

---

## Имплементация със Списък

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

    ~LinkedStack() {
        while (top) {
            Node* temp = top;
            top = top->next;
            delete temp;
        }
    }
};
```

Note:
Свързаният списък дава динамичен размер без реалокация.

---

## Stack Applications

**Call Stack:**
```cpp
void funcA() {
    funcB();  // Push funcB на stack
}             // Pop funcB при return

void funcB() {
    funcC();  // Push funcC
}             // Pop funcC
```

**Други приложения:**
- Undo/Redo операции
- Балансиране на скоби
- Обхождане на дърво (DFS)
- Expression evaluation

Note:
Stack е фундаментален за работата на програмите - всяка функция използва call stack!

---

<!-- .slide: data-background="#fff3e0" -->

# Част 3

## Queue - FIFO

---

## Какво е Queue?

**FIFO**: First-In, First-Out

**Метафора:** Опашка в магазин - първият влязъл е първият излязъл

**Основни операции (всички O(1)):**
- `enqueue(x)` - добавя в края
- `dequeue()` - премахва и връща от началото
- `front()` - връща първия без премахване
- `isEmpty()` - проверява дали е празна

Note:
Queue е естествена структура за моделиране на waiting lines.

---

## Circular Queue с Масив

```cpp
class CircularQueue {
private:
    int* arr;
    int front, rear;
    int capacity;
    int count;

public:
    CircularQueue(int cap)
        : capacity(cap), front(0), rear(-1), count(0) {
        arr = new int[capacity];
    }

    void enqueue(int x) {
        if (count >= capacity) return;  // Full
        rear = (rear + 1) % capacity;   // Circular!
        arr[rear] = x;
        count++;
    }

    int dequeue() {
        if (count == 0) return -1;  // Empty
        int value = arr[front];
        front = (front + 1) % capacity;  // Circular!
        count--;
        return value;
    }

    int getFront() {
        if (count == 0) return -1;
        return arr[front];
    }

    ~CircularQueue() { delete[] arr; }
};
```

Note:
Модулното аритметично прави масива "кръгов" - избягваме отместването на елементи!

---

## Queue със Списък

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
        if (!rear) {  // Празна опашка
            front = rear = newNode;
        } else {
            rear->next = newNode;
            rear = newNode;
        }
    }

    int dequeue() {
        if (!front) return -1;
        int value = front->data;
        Node* temp = front;
        front = front->next;
        if (!front) rear = nullptr;  // Опразнена
        delete temp;
        return value;
    }

    ~LinkedQueue() {
        while (front) {
            Node* temp = front;
            front = front->next;
            delete temp;
        }
    }
};
```

Note:
Front и rear указателите позволяват O(1) операции в двата края.

---

## Queue Applications

**BFS (Breadth-First Search):**
```cpp
void BFS(Node* root) {
    queue<Node*> q;
    q.push(root);
    while (!q.empty()) {
        Node* current = q.front();
        q.pop();
        visit(current);
        for (auto child : current->children) {
            q.push(child);
        }
    }
}
```

**Други приложения:**
- Task scheduling
- Printer queue
- Buffer management
- Streaming data

Note:
Queue е естествен за алгоритми, които обработват елементи в реда на пристигане.

---

<!-- .slide: data-background="#f3e5f5" -->

# Част 4

## Сравнение и STL

---

## Stack vs Queue

| Характеристика | Stack | Queue |
|----------------|-------|-------|
| **Принцип** | LIFO | FIFO |
| **Операции** | push/pop/top | enqueue/dequeue/front |
| **Push/Enqueue** | O(1) | O(1) |
| **Pop/Dequeue** | O(1) | O(1) |
| **Приложения** | Function calls, DFS | BFS, scheduling |

Note:
И двете структури са много ефективни с O(1) операции.

---

## STL Контейнери

**std::stack:**
```cpp
#include <stack>

std::stack<int> s;
s.push(10);
s.push(20);
cout << s.top();  // 20
s.pop();
cout << s.size();
```

**std::queue:**
```cpp
#include <queue>

std::queue<int> q;
q.push(10);
q.push(20);
cout << q.front();  // 10
q.pop();
cout << q.size();
```

Note:
В production код винаги използвайте STL контейнерите!

---

## Adapter Pattern

**Stack и Queue са adapters:**

```cpp
// stack adapter
template<typename T, typename Container = deque<T>>
class stack {
    Container c;
public:
    void push(const T& x) { c.push_back(x); }
    void pop() { c.pop_back(); }
    T& top() { return c.back(); }
};

// queue adapter
template<typename T, typename Container = deque<T>>
class queue {
    Container c;
public:
    void push(const T& x) { c.push_back(x); }
    void pop() { c.pop_front(); }
    T& front() { return c.front(); }
};
```

Note:
STL stack и queue адаптират други контейнери (deque по подразбиране).

---

<!-- .slide: data-background="#e8eaf6" -->

# Обобщение

---

## Ключови Изводи

**Proxy Pattern:**
- Контролира достъпа до обект
- Lazy initialization
- Добавя допълнителна логика

**Stack (LIFO):**
- push/pop/top - всички O(1)
- Function calls, DFS, Undo/Redo

**Queue (FIFO):**
- enqueue/dequeue/front - всички O(1)
- BFS, Scheduling, Buffers

Note:
Тези концепции са фундаментални за системното програмиране.

---

## Практически Съвети

✅ **Stack за DFS**, Queue за BFS

✅ **Circular queue** за ефективен масив-базиран queue

✅ **STL контейнери** в production код

✅ **Proxy за lazy loading** на скъпи ресурси

✅ **Adapter pattern** за унифициран интерфейс

Note:
Изборът на правилната структура прави кода ефективен и четим.

---

## Допълнителни Ресурси

**Design Patterns:**
- [Proxy Pattern - Refactoring.Guru](https://refactoring.guru/design-patterns/proxy)
- "Design Patterns" by Gang of Four

**Data Structures:**
- [std::stack - cppreference](https://en.cppreference.com/w/cpp/container/stack)
- [std::queue - cppreference](https://en.cppreference.com/w/cpp/container/queue)

Note:
Практиката е ключова - имплементирайте собствени stack и queue!

---

<!-- .slide: data-background="#4caf50" -->

# Благодаря за Вниманието!

## Въпроси? 🎓

**Следваща лекция:** Stack & Queue Applications

Note:
Време за въпроси!
