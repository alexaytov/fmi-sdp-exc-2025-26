# Exercises: C++ Lists, Iterators, and Memory Management

## Easy Exercises (Foundational Concepts)

**Exercise 1 [EASY]**: What are the main differences between a singly linked list and a doubly linked list?

**Exercise 2 [EASY]**: In C++, which operators are used to allocate and deallocate dynamic memory?
a) `malloc` and `free`
b) `new` and `delete`
c) `alloc` and `dealloc`
d) `create` and `destroy`

**Exercise 3 [EASY]**: What is a memory leak? Describe in one sentence.

**Exercise 4 [EASY]**: What does each node in a doubly linked list contain?

**Exercise 5 [EASY]**: What should you always do after calling `delete` on a pointer as a good practice?
```cpp
int* ptr = new int(10);
delete ptr;
// What should come next?
```

**Exercise 6 [EASY]**: What is the time complexity O() for adding an element to the end of a doubly linked list when you have a pointer to the tail?

**Exercise 7 [EASY]**: Which of the following will cause a memory leak?
```cpp
// Option A:
int* ptr = new int(5);
delete ptr;

// Option B:
int* ptr = new int(5);
ptr = new int(10);
delete ptr;

// Option C:
int* ptr = new int(5);
ptr = nullptr;
```

**Exercise 8 [EASY]**: What is the primary role of an iterator in C++?

## Easy-Medium Exercises

**Exercise 9 [EASY-MEDIUM]**: Complete the following code to properly deallocate an array:
```cpp
int* arr = new int[10];
// Use the array...
// Write the correct deallocation code here:
```

**Exercise 10 [EASY-MEDIUM]**: What will happen in the following code?
```cpp
struct Node {
    int data;
    Node* next;
    Node* prev;
};

Node* n = new Node();
n->data = 42;
// Program ends without delete
```

**Exercise 11 [EASY-MEDIUM]**: Identify the error in this doubly linked list node removal function:
```cpp
void removeNode(Node* node) {
    node->prev->next = node->next;
    node->next->prev = node->prev;
    // What's missing?
}
```

**Exercise 12 [MEDIUM]**: Implement a method to add an element at the beginning of a doubly linked list:
```cpp
class DoublyLinkedList {
private:
    Node* head;
    Node* tail;
public:
    void addFront(int value) {
        // Your implementation here
    }
};
```

## Medium Exercises

**Exercise 13 [MEDIUM]**: What is RAII and how does it help prevent memory leaks? Provide an example.

**Exercise 14 [MEDIUM]**: Complete the iterator class for a simple array:
```cpp
template<typename T>
class ArrayIterator {
private:
    T* current;
public:
    ArrayIterator(T* ptr) : current(ptr) {}
    
    T& operator*() const {
        // Your code here
    }
    
    ArrayIterator& operator++() {
        // Your code here
    }
    
    bool operator!=(const ArrayIterator& other) const {
        // Your code here
    }
};
```

**Exercise 15 [MEDIUM]**: Explain why this code has a memory leak and fix it:
```cpp
void processData() {
    int* data = new int[100];
    for (int i = 0; i < 100; i++) {
        data[i] = i * 2;
    }
    if (data[50] > 100) {
        return; // Early return
    }
    delete[] data;
}
```

**Exercise 16 [MEDIUM]**: What are the three main types of smart pointers in C++ and when would you use each?

**Exercise 17 [MEDIUM]**: Implement a function to count the number of elements in a doubly linked list:
```cpp
int countElements(Node* head) {
    // Your implementation here
}
```

**Exercise 18 [MEDIUM]**: Write a destructor for a doubly linked list that properly deallocates all nodes:
```cpp
class DoublyLinkedList {
private:
    Node* head;
    Node* tail;
public:
    ~DoublyLinkedList() {
        // Your implementation here
    }
};
```

## Medium-Hard Exercises

**Exercise 19 [MEDIUM-HARD]**: Implement an `insert` method that adds a new element after a given iterator position:
```cpp
template<typename T>
class DoublyLinkedList {
public:
    class Iterator {
        Node* current;
        // ... iterator methods ...
    };
    
    void insertAfter(Iterator position, T value) {
        // Your implementation here
    }
};
```

**Exercise 20 [MEDIUM-HARD]**: Analyze the following code and identify all memory-related issues:
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

**Exercise 21 [MEDIUM-HARD]**: Implement a bidirectional iterator for a doubly linked list with both `operator++` and `operator--`:
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
        // Implement all necessary operators
    };
};
```

## Hard Exercises

**Exercise 22 [HARD]**: Implement a complete doubly linked list with exception-safe insertion. Ensure no memory leaks occur even when exceptions are thrown:
```cpp
template<typename T>
class SafeDoublyLinkedList {
    // Implement with exception safety guarantees
};
```

**Exercise 23 [HARD]**: Consider a scenario where you have circular references using `std::shared_ptr`. Explain the problem and provide a solution using `std::weak_ptr`:
```cpp
class Node {
public:
    std::shared_ptr<Node> next;
    std::shared_ptr<Node> prev;
    int data;
};
// How would you fix potential memory leaks in a circular structure?
```

**Exercise 24 [HARD]**: Using Valgrind or a similar tool conceptually, analyze this program and describe what memory issues would be reported:
```cpp
void complexFunction() {
    int* arr1 = new int[50];
    int* arr2 = new int[100];
    
    for (int i = 0; i < 50; i++) {
        arr1[i] = i;
    }
    
    arr1 = arr2; // Reassignment
    
    delete[] arr2;
}

int main() {
    for (int i = 0; i < 1000; i++) {
        complexFunction();
    }
    return 0;
}
```

**Exercise 25 [HARD]**: Design and implement a memory-efficient doubly linked list that uses sentinel nodes (dummy head and tail) to simplify boundary conditions:
```cpp
template<typename T>
class SentinelDoublyLinkedList {
    // Implement with sentinel nodes
};
```

**Exercise 26 [HARD]**: Create a custom iterator that can traverse a doubly linked list and automatically skip elements that satisfy a given predicate:
```cpp
template<typename T, typename Predicate>
class FilteringIterator {
    // Implement filtered iteration
};
```

**Exercise 27 [HARD]**: Implement a move constructor and move assignment operator for a doubly linked list to support efficient resource transfer:
```cpp
template<typename T>
class DoublyLinkedList {
public:
    DoublyLinkedList(DoublyLinkedList&& other) noexcept {
        // Implement move constructor
    }
    
    DoublyLinkedList& operator=(DoublyLinkedList&& other) noexcept {
        // Implement move assignment
    }
};
```

**Exercise 28 [HARD]**: Design a memory pool allocator for doubly linked list nodes to reduce allocation overhead and fragmentation:
```cpp
template<typename T>
class NodePool {
    // Implement custom memory pool for Node allocation
};
```

---

**Note**: These exercises progress from basic understanding of concepts to advanced implementation challenges, covering all key topics from the lecture: doubly linked lists, iterators, memory management, smart pointers, and RAII principles.