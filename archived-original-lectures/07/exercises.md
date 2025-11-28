# Educational Exercises: Design Patterns (Proxy) and Data Structures (Stack & Queue)

## **Foundational Exercises (EASY)**

**Exercise 1 [EASY]: Basic Concept Recognition**
What is the primary purpose of the Proxy design pattern?
a) To create multiple instances of an object
b) To provide a surrogate or placeholder for another object to control access to it
c) To sort data efficiently
d) To combine multiple objects into one

**Exercise 2 [EASY]: LIFO vs FIFO Identification**
Match the following operations to the correct data structure principle:
- Last element added is the first one removed: ______
- First element added is the first one removed: ______

**Exercise 3 [EASY]: Stack Operations**
List the three core operations of a stack data structure and briefly describe what each does.

**Exercise 4 [EASY]: Queue Operations**
What happens when you perform the following operations on an empty queue?
```cpp
std::queue<int> q;
q.push(10);
q.push(20);
q.push(30);
```
What will `q.front()` return?

**Exercise 5 [EASY]: Proxy Types Recognition**
Match each proxy type to its primary use case:
- Virtual Proxy: ______
- Protection Proxy: ______
- Remote Proxy: ______

Options: A) Access control and security, B) Lazy initialization, C) Representing remote objects locally

**Exercise 6 [EASY]: Memory Management Basics**
What is the correct way to allocate and deallocate a dynamic array of 10 integers in C++?

**Exercise 7 [EASY]: Real-World Analogy**
Which real-world scenario best represents a stack?
a) A line at a grocery store checkout
b) A stack of plates where you can only take from the top
c) A highway with multiple lanes
d) A circular running track

---

## **Basic Application Exercises (EASY-MEDIUM)**

**Exercise 8 [EASY-MEDIUM]: Trace Stack Operations**
Given the following operations on an empty stack, what will be the final output?
```cpp
Stack s;
s.push(5);
s.push(10);
s.push(15);
cout << s.pop() << endl;
s.push(20);
cout << s.top() << endl;
cout << s.pop() << endl;
```

**Exercise 9 [EASY-MEDIUM]: Queue State Tracking**
Starting with an empty queue, perform these operations and show the queue state after each:
```
enqueue(100)
enqueue(200)
dequeue()
enqueue(300)
enqueue(400)
dequeue()
```
What elements remain, and in what order?

**Exercise 10 [MEDIUM]: Circular Array Logic**
In a circular queue with capacity 5, if `front = 3`, `rear = 1`, and `size = 4`, where will the next element be inserted? Show the calculation using modulo arithmetic.

---

## **Intermediate Concept Exercises (MEDIUM)**

**Exercise 11 [MEDIUM]: Proxy Pattern Implementation**
Design a `LoggingProxy` class for a `Calculator` interface with a `calculate(int a, int b, string operation)` method. The proxy should log all calculations before delegating to the real calculator. Provide pseudocode or C++ class declarations.

**Exercise 12 [MEDIUM]: STL Adapter Analysis**
Explain why `std::stack` and `std::queue` are called "container adapters." What underlying containers can they use, and how does this demonstrate the Adapter pattern?

**Exercise 13 [MEDIUM]: Implementation Comparison**
Compare array-based and linked-list-based stack implementations:
- Memory usage characteristics
- Performance of push/pop operations
- Scenarios where each is preferable

**Exercise 14 [MEDIUM]: Stack Application - Expression Evaluation**
How would you use a stack to check if parentheses are balanced in an expression like `"((a + b) * (c - d))"`? Describe the algorithm in pseudocode.

**Exercise 15 [MEDIUM]: Queue Application - Task Scheduling**
A printer queue receives print jobs. Design a simple system using `std::queue` that:
- Accepts new print jobs
- Processes jobs in order
- Shows which job is currently printing
Provide the C++ class interface.

---

## **Advanced Application Exercises (MEDIUM-HARD)**

**Exercise 16 [MEDIUM-HARD]: Virtual Proxy Implementation**
Implement a `LazyDatabaseProxy` class that delays database connection until the first query is executed. Include:
```cpp
class IDatabase {
public:
    virtual void connect() = 0;
    virtual string query(string sql) = 0;
    virtual ~IDatabase() {}
};
```
Provide complete C++ code for `RealDatabase` and `LazyDatabaseProxy` classes.

**Exercise 17 [MEDIUM-HARD]: Custom Queue with Priority**
Modify a standard queue implementation to support a `priorityEnqueue()` method that inserts high-priority items at the front. Discuss how this affects the FIFO principle and implementation complexity.

**Exercise 18 [HARD]: Memory Leak Detection**
Identify and fix all memory management issues in this linked-list stack implementation:
```cpp
class Stack {
    Node* top;
public:
    Stack() { top = nullptr; }
    void push(int x) { 
        Node* n = new Node(x); 
        n->next = top; 
        top = n; 
    }
    int pop() { 
        int val = top->data; 
        top = top->next; 
        return val; 
    }
};
```

---

## **Complex Problem-Solving Exercises (HARD)**

**Exercise 19 [HARD]: Multi-Level Proxy System**
Design a proxy chain that combines:
1. A caching proxy (stores recent results)
2. A logging proxy (records all method calls)
3. A security proxy (checks permissions)

For an `APIService` with a `getData(string endpoint)` method, show:
- Class hierarchy/structure
- How requests flow through the chain
- C++ implementation skeleton with key methods

**Exercise 20 [HARD]: Stack-Based Algorithm**
Implement a function that evaluates postfix expressions using a stack:
```cpp
int evaluatePostfix(string expression);
// Example: "53+82-*" should return 24
// (5+3) * (8-2) = 8 * 6 = 48... wait, postfix is: 5 3 + 8 2 - *
```
Provide complete working C++ code with error handling.

**Exercise 21 [HARD]: Adapter Pattern Extension**
The STL `std::stack` can use `std::vector`, `std::deque`, or `std::list` as underlying containers. Implement your own `MyStack` adapter that:
- Works with any container providing `push_back()`, `pop_back()`, and `back()`
- Uses template template parameters
- Includes proper error handling for empty stack operations

**Exercise 22 [HARD]: Concurrent Queue Design**
Design a thread-safe queue that multiple threads can safely enqueue and dequeue from simultaneously. Address:
- What synchronization primitives are needed (mutexes, condition variables)?
- How to handle waiting when the queue is empty?
- Provide a C++ class declaration with critical sections identified

**Exercise 23 [HARD]: Proxy Performance Analysis**
Given a caching proxy for a slow database:
```cpp
class CachingDatabaseProxy : public IDatabase {
    map<string, string> cache;
    RealDatabase* realDB;
public:
    string query(string sql) {
        if (cache.find(sql) != cache.end()) 
            return cache[sql];
        string result = realDB->query(sql);
        cache[sql] = result;
        return result;
    }
};
```
Analyze:
- Time complexity of cached vs. uncached queries
- Space complexity as cache grows
- Suggest improvements (cache eviction policies, etc.)

**Exercise 24 [HARD]: Double-Ended Queue (Deque) Implementation**
Implement a deque (double-ended queue) that efficiently supports:
- `pushFront()`, `pushBack()`, `popFront()`, `popBack()` - all O(1)

Choose an appropriate underlying structure (circular buffer, linked list with head/tail, or other) and justify your choice. Provide complete C++ implementation.

---

## **Integration and Synthesis Exercises (HARD)**

**Exercise 25 [HARD]: Design Pattern Combination**
Create a system that uses BOTH Proxy and Adapter patterns:
- An `ImageRenderer` that uses different rendering engines (`OpenGLRenderer`, `DirectXRenderer`)
- A `VirtualProxyImageRenderer` that delays renderer initialization
- An adapter to make these renderers compatible with a unified interface

Provide UML diagrams and key code snippets showing how these patterns interact.

**Exercise 26 [HARD]: Real-World System Design**
Design a web browser's back/forward navigation system that:
- Uses stacks to manage browsing history
- Implements a protection proxy to block malicious URLs
- Uses a caching proxy to store recently visited pages
- Handles the interaction between all components

Provide:
- System architecture diagram
- Core class interfaces
- Description of how user actions (clicking back, visiting new page) flow through the system

---

## **Answer Key Notes**

*Answers would include:*
- Exercise 1: b
- Exercise 2: Stack (LIFO), Queue (FIFO)
- Exercise 4: 10
- Exercise 5: B, A, C
- Exercise 8: Output would be 15, 20, 20
- Exercise 9: Final queue contains [300, 400]
- Exercise 10: Position (1+1) % 5 = 2

*For implementation exercises (16-26), answers would include complete code solutions, explanations of design decisions, and analysis of trade-offs.*