# C++ Data Structures & Memory Management: Exercise Set

## Easy Exercises (Foundational Concepts)

**Exercise 1 [EASY]:** Multiple Choice - What is the primary advantage of using a linked list over an array?
A) Faster random access to elements
B) Better cache locality
C) Dynamic size that can grow or shrink at runtime
D) Lower memory overhead per element

**Exercise 2 [EASY]:** True/False - In a singly linked list, the last node's `next` pointer should point to the first node to complete the list.

**Exercise 3 [EASY]:** Fill in the blank - In C++, a pointer stores the __________ of another variable.

**Exercise 4 [EASY]:** Multiple Choice - What does the array indexing operation `arr[3]` translate to using pointer arithmetic?
A) `*(arr - 3)`
B) `*(arr + 3)`
C) `&(arr + 3)`
D) `arr->3`

**Exercise 5 [EASY]:** Short Answer - What is the difference between a `struct` and a `class` in C++ regarding default member access?

**Exercise 6 [EASY]:** Code Identification - Identify the error in this node creation code:
```cpp
struct Node {
    int data;
    Node* next;
};
Node* head = new Node();
head->data = 10;
// ... program continues ...
// Program ends without cleanup
```

**Exercise 7 [EASY]:** Multiple Choice - What is the time complexity of accessing an element by index in a singly linked list?
A) O(1)
B) O(log n)
C) O(n)
D) O(n²)

**Exercise 8 [EASY]:** True/False - A doubly linked list node contains pointers to both the next and previous nodes.

**Exercise 9 [EASY]:** Short Answer - What value should pointer members be initialized to when creating a new node?

**Exercise 10 [EASY]:** Multiple Choice - Which operation is typically O(1) for both arrays and linked lists?
A) Search for an element
B) Access by index
C) Insert at head
D) Traverse all elements

## Medium Exercises (Application & Analysis)

**Exercise 11 [MEDIUM]:** Code Writing - Write a function to traverse a singly linked list and count the number of nodes:
```cpp
struct Node {
    int data;
    Node* next;
};

int countNodes(Node* head) {
    // Your implementation here
}
```

**Exercise 12 [MEDIUM]:** Problem Analysis - Explain why deleting a node at the tail of a singly linked list (without a tail pointer) is O(n), while the same operation in a doubly linked list (with a tail pointer) is O(1).

**Exercise 13 [MEDIUM]:** Code Debugging - Find and fix all bugs in this doubly linked list insertion function:
```cpp
void insertAtHead(Node** head, int value) {
    Node* newNode = new Node();
    newNode->data = value;
    newNode->next = *head;
    *head = newNode;
}
```
(Hint: This is supposed to work for a doubly linked list)

**Exercise 14 [MEDIUM]:** Design Question - What is the purpose of the Iterator design pattern, and what problem does it solve in the context of data structures?

**Exercise 15 [MEDIUM]:** Code Implementation - Implement the dereference operator (`operator*`) and inequality operator (`operator!=`) for a singly linked list iterator:
```cpp
template <typename T>
class SinglyLinkedListIterator {
private:
    Node<T>* current_;
public:
    SinglyLinkedListIterator(Node<T>* ptr) : current_(ptr) {}
    
    // Implement these two operators
    T& operator*() const {
        // Your code here
    }
    
    bool operator!=(const SinglyLinkedListIterator<T>& other) const {
        // Your code here
    }
};
```

**Exercise 16 [MEDIUM]:** Multiple Choice - What is a memory leak?
A) When a program uses too much memory
B) When dynamically allocated memory is not freed after it's no longer needed
C) When a pointer points to invalid memory
D) When memory allocation fails

**Exercise 17 [MEDIUM]:** Short Answer - Explain the difference between `std::unique_ptr` and `std::shared_ptr` in terms of ownership semantics.

**Exercise 18 [MEDIUM]:** Code Analysis - Will this code cause a memory leak? Explain why or why not:
```cpp
void processData() {
    int* data = new int[100];
    // Process data...
    if (errorCondition) {
        return; // Early return on error
    }
    delete[] data;
}
```

**Exercise 19 [MEDIUM]:** Comparison Question - Complete the following table comparing operations:

| Operation | Array | Singly Linked List | Doubly Linked List (with tail ptr) |
|-----------|-------|-------------------|-------------------------------------|
| Insert at tail | ? | ? | ? |
| Delete at head | ? | ? | ? |
| Random access | ? | ? | ? |

**Exercise 20 [MEDIUM]:** Code Writing - Implement a function to insert a node after a given node in a doubly linked list:
```cpp
void insertAfter(Node* prevNode, int value) {
    // Your implementation here
    // Handle edge cases
}
```

## Hard Exercises (Advanced Application & Synthesis)

**Exercise 21 [HARD]:** Implementation Challenge - Implement a complete `push_back` method for a doubly linked list class that correctly handles:
- Empty list
- Non-empty list
- Memory allocation
- Updating head, tail, and size

```cpp
template <typename T>
class DoublyLinkedList {
private:
    Node<T>* head_;
    Node<T>* tail_;
    unsigned int size_;
public:
    void push_back(const T& value) {
        // Your complete implementation here
    }
};
```

**Exercise 22 [HARD]:** Debugging Challenge - This destructor causes a memory leak. Identify the problem and provide a correct implementation:
```cpp
template <typename T>
class DoublyLinkedList {
    ~DoublyLinkedList() {
        Node<T>* current = head_;
        while (current != nullptr) {
            current = current->next;
            delete current;
        }
    }
};
```

**Exercise 23 [HARD]:** Design & Implementation - Implement a complete iterator class for a doubly linked list that supports:
- Pre-increment (++iter)
- Post-increment (iter++)
- Pre-decrement (--iter)
- Dereference (operator*)
- Equality comparison (operator==)
- Inequality comparison (operator!=)

Include the `begin()` and `end()` methods in the list class.

**Exercise 24 [HARD]:** Memory Management - Implement a proper copy constructor for a doubly linked list that performs a deep copy. Explain why a shallow copy would be problematic.

**Exercise 25 [HARD]:** Problem Solving - Write a function that detects if there's a cycle in a singly linked list without using extra memory (O(1) space complexity). Explain your algorithm.

**Exercise 26 [HARD]:** Tool Usage - Given this code with an intentional memory leak, describe the exact commands you would use with Valgrind to detect it, and explain what the output would indicate:
```cpp
void leakyFunction() {
    int* arr = new int[50];
    arr[0] = 10;
    // Oops, forgot to delete!
}

int main() {
    leakyFunction();
    return 0;
}
```

**Exercise 27 [HARD]:** Advanced Implementation - Implement the `insert` method that takes an iterator position and a value, inserting a new node before the iterator position. Handle all edge cases:
```cpp
template <typename T>
void DoublyLinkedList<T>::insert(iterator position, const T& value) {
    // Your implementation
    // Consider: empty list, insert at head, insert at end, insert in middle
}
```

**Exercise 28 [HARD]:** RAII Application - Refactor this code to use RAII principles and smart pointers to prevent memory leaks:
```cpp
class FileProcessor {
    int* buffer;
    FILE* file;
public:
    FileProcessor(const char* filename) {
        buffer = new int[1000];
        file = fopen(filename, "r");
    }
    
    void process() {
        // Processing code that might throw exceptions
        if (errorCondition) {
            throw std::runtime_error("Processing failed");
        }
    }
    
    ~FileProcessor() {
        delete[] buffer;
        fclose(file);
    }
};
```

**Exercise 29 [HARD]:** Analysis & Optimization - You have an application that needs to:
1. Frequently insert elements at both ends
2. Occasionally access the middle element
3. Traverse forward and backward
4. Minimize memory usage

Should you use an array, singly linked list, or doubly linked list? Justify your choice with complexity analysis and trade-offs.

**Exercise 30 [HARD]:** Comprehensive Problem - Design and implement a generic `reverse()` method for a doubly linked list that reverses the list in-place (without allocating new nodes). Your implementation should:
- Handle empty lists
- Handle single-node lists
- Properly update all pointers (head, tail, next, prev)
- Maintain O(n) time complexity and O(1) space complexity

```cpp
template <typename T>
void DoublyLinkedList<T>::reverse() {
    // Your implementation here
}
```

---

## Answer Key Guidelines

**Easy (1-10):** Focus on definitions, basic understanding, and recognition of fundamental concepts.

**Medium (11-20):** Require application of concepts, simple implementations, and analysis of code correctness.

**Hard (21-30):** Demand synthesis of multiple concepts, complete implementations with edge case handling, debugging complex scenarios, and making informed design decisions.