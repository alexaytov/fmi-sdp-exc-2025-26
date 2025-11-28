# Educational Exercises: Linear Data Structures, Arrays, and Binary Search in C++

## EASY LEVEL

**Exercise 1 [EASY]:** What is a data structure? In your own words, explain why choosing the right data structure matters in programming.

**Exercise 2 [EASY]:** True or False: In an array, all elements must be of the same data type. Explain your answer.

**Exercise 3 [EASY]:** Given the array `int numbers[5] = {10, 20, 30, 40, 50};`, what is the value of `numbers[2]`?

**Exercise 4 [EASY]:** What does "contiguous memory allocation" mean in the context of arrays? Why is this important?

**Exercise 5 [EASY]:** If you create an array with `int grades[100];`, can you later change its size to 150 during program execution? Why or why not?

**Exercise 6 [EASY]:** What is the time complexity (Big O notation) for accessing an element in an array by its index? Explain why.

**Exercise 7 [EASY]:** In object-oriented programming, what does "encapsulation" mean? Give an example related to arrays.

**Exercise 8 [EASY]:** True or False: Binary search works on both sorted and unsorted arrays. Explain your answer.

**Exercise 9 [EASY]:** In the array `{2, 4, 6, 8, 10, 12, 14}`, if you're searching for the value 10 using binary search, what is the first middle index that will be checked?

**Exercise 10 [EASY]:** What is the purpose of a constructor in a C++ class?

## MEDIUM LEVEL

**Exercise 11 [MEDIUM]:** Write a C++ code snippet to declare and initialize an array of 7 doubles representing daily temperatures. Include code to print all temperatures.

**Exercise 12 [MEDIUM]:** Explain the difference between these two array declarations in C++:
```cpp
int arr1[10];
int* arr2 = new int[10];
```
What are the memory management implications of each?

**Exercise 13 [MEDIUM]:** Given the formula `address = base_address + (index × element_size)`, calculate the memory address of the element at index 5 in an integer array if the base address is 1000 and each integer occupies 4 bytes.

**Exercise 14 [MEDIUM]:** In a custom array class, why is it important to implement bounds checking in the `get()` and `set()` methods? What could happen without it?

**Exercise 15 [MEDIUM]:** Trace through a binary search for the value 17 in the sorted array `{3, 7, 11, 17, 23, 31, 39, 47}`. Show the values of `low`, `high`, and `mid` at each step.

**Exercise 16 [MEDIUM]:** Compare the maximum number of comparisons needed for linear search versus binary search in an array of 1,024 elements. Show your calculations.

**Exercise 17 [MEDIUM]:** Write a C++ function signature (header only) for a binary search function that searches for a target string in a sorted vector of strings. Include appropriate const qualifiers and return type.

**Exercise 18 [MEDIUM]:** Explain what a "deep copy" means in the context of the copy constructor for a custom array class. Why is it necessary?

**Exercise 19 [MEDIUM]:** What is the purpose of the destructor in the `CustomArray` class? What would happen if you forgot to implement it?

**Exercise 20 [MEDIUM]:** In binary search, why is `mid = low + (high - low) / 2` preferred over `mid = (low + high) / 2`?

## HARD LEVEL

**Exercise 21 [HARD]:** Implement a complete C++ member function `void CustomArray::reverse()` that reverses the elements in the array in-place (without creating a new array). Consider time and space complexity.

**Exercise 22 [HARD]:** Design and implement a C++ function that uses binary search to find the **first occurrence** of a target value in a sorted array that may contain duplicates. For example, in `{1, 2, 2, 2, 3, 4}`, searching for 2 should return index 1.

**Exercise 23 [HARD]:** Analyze the time complexity of the following operation: You have an unsorted array of n elements, and you want to search for a value using binary search. Include the time needed to sort the array first. When does this approach become worthwhile compared to just using linear search?

**Exercise 24 [HARD]:** Write a C++ template class `ResizableArray<T>` that extends the concept of `CustomArray` by adding a `resize(size_t newCapacity)` method. The method should handle both growing and shrinking the array while preserving existing elements. Consider memory efficiency and exception safety.

**Exercise 25 [HARD]:** Implement a modified binary search function that finds the insertion position for a target value in a sorted array (where the value should be inserted to maintain sorted order, even if it's not currently in the array). Return the index where insertion should occur.

**Exercise 26 [HARD]:** Consider a scenario where you need to frequently insert elements into a sorted array while maintaining sort order. Calculate and explain the amortized time complexity for n insertions. Would binary search still be beneficial here? Suggest an alternative data structure that might be more appropriate.

**Exercise 27 [HARD]:** Debug and fix this buggy binary search implementation:
```cpp
int binarySearch(const vector<int>& arr, int target) {
    int low = 0;
    int high = arr.size();
    while (low < high) {
        int mid = (low + high) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid;
        else high = mid;
    }
    return -1;
}
```
Identify all errors and explain why each fix is necessary.

**Exercise 28 [HARD]:** Implement the `operator=` (assignment operator) for the `CustomArray` class with full exception safety. Ensure that if memory allocation fails during assignment, the original object remains unchanged (strong exception guarantee).

**Exercise 29 [HARD]:** Design a C++ class `SortedArray` that maintains elements in sorted order automatically. Implement methods for insertion, deletion, and search. Analyze the time complexity of each operation and explain the trade-offs compared to an unsorted array.

**Exercise 30 [HARD]:** Write a comprehensive comparison (at least 300 words) discussing when to use arrays versus other data structures (linked lists, dynamic arrays like `std::vector`, hash tables) for different real-world applications. Include specific examples such as: real-time systems, database indexing, text editors, and social media feeds. Consider factors like access patterns, modification frequency, memory constraints, and performance requirements.

---

**Answer Key Available Upon Request**

These exercises progress from basic conceptual understanding through practical implementation to advanced problem-solving and critical analysis, ensuring comprehensive mastery of arrays, object-oriented implementation, and binary search algorithms in C++.