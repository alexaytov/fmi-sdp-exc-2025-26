# Sorting Algorithms in C++: Exercise Set
## Progressive Difficulty: Easy → Medium → Hard

---

## **EASY EXERCISES** (Foundational Concepts)

### Exercise 1 [EASY]: Basic Terminology
Which of the following statements about sorting is TRUE?
- A) A stable sort always runs faster than an unstable sort
- B) A stable sort preserves the relative order of equal elements
- C) An in-place sort always uses O(n) extra space
- D) All sorting algorithms have O(n²) worst-case complexity

---

### Exercise 2 [EASY]: Big-O Recognition
What is the time complexity of the following code snippet?
```cpp
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        arr[i] += arr[j];
    }
}
```
- A) O(n)
- B) O(n²)
- C) O(n log n)
- D) O(2n)

---

### Exercise 3 [EASY]: Swap Operation
Complete the following code to swap two elements in an array:
```cpp
void swapElements(int arr[], int i, int j) {
    // Write your code here
}
```

---

### Exercise 4 [EASY]: Algorithm Identification
Which sorting algorithm is described by: "Find the minimum element from the unsorted portion and place it at the beginning"?
- A) Bubble Sort
- B) Selection Sort
- C) Insertion Sort
- D) Merge Sort

---

### Exercise 5 [EASY]: Binary Search Benefit
If you have 1,000,000 sorted elements, approximately how many comparisons does binary search require in the worst case?
- A) 10
- B) 20
- C) 100
- D) 500,000

---

### Exercise 6 [EASY]: Bubble Sort Trace
Trace ONE pass of bubble sort on the array `[5, 2, 8, 1]`. Show the array state after each comparison/swap.

---

### Exercise 7 [EASY]: Algorithm Properties
Match each property to the correct algorithm:
1. Insertion Sort
2. Selection Sort
3. Bubble Sort

Properties:
- A) Not stable
- B) Adaptive (fast on nearly-sorted data)
- C) Always performs the same number of comparisons

---

### Exercise 8 [EASY]: Space Complexity
Which of the following algorithms uses O(n) auxiliary space?
- A) Bubble Sort
- B) Selection Sort
- C) Merge Sort
- D) Insertion Sort

---

## **EASY-MEDIUM EXERCISES** (Basic Implementation & Analysis)

### Exercise 9 [EASY-MEDIUM]: Bubble Sort Implementation
Implement an optimized version of bubble sort that stops early if no swaps occur in a pass.
```cpp
void bubbleSortOptimized(int arr[], int n) {
    // Your code here
}
```

---

### Exercise 10 [EASY-MEDIUM]: Complexity Analysis
For an array of size n=100:
- How many comparisons does Selection Sort make in the worst case?
- How many swaps does Selection Sort make in the worst case?

---

### Exercise 11 [EASY-MEDIUM]: Insertion Sort on Nearly-Sorted Data
Explain why insertion sort performs well (O(n)) on an array that is already sorted or nearly sorted. What specific characteristic makes it adaptive?

---

### Exercise 12 [EASY-MEDIUM]: Code Debugging
The following selection sort implementation has a bug. Identify and fix it:
```cpp
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n; ++i) {
        int minIdx = i;
        for (int j = i+1; j < n; ++j)
            if (arr[j] < arr[minIdx])
                minIdx = j;
        // Missing something here?
    }
}
```

---

## **MEDIUM EXERCISES** (Algorithm Implementation & Comparison)

### Exercise 13 [MEDIUM]: Complete Insertion Sort
Implement insertion sort for a vector of integers and test it on the array `[12, 11, 13, 5, 6]`. Show the array state after each insertion.
```cpp
void insertionSort(std::vector<int>& arr) {
    // Your code here
}
```

---

### Exercise 14 [MEDIUM]: Algorithm Selection
For each scenario, recommend the BEST sorting algorithm and justify your choice:
1. Sorting 20 elements for a simple calculator app
2. Sorting 1 million customer records where stability is required
3. Sorting integers in range 0-100 with n=10,000
4. Sorting data on an embedded system with only 2KB of RAM

---

### Exercise 15 [MEDIUM]: Merge Function Implementation
Implement the `merge` function used in merge sort that combines two sorted subarrays:
```cpp
void merge(std::vector<int>& arr, int left, int mid, int right) {
    // Your code here
}
```

---

### Exercise 16 [MEDIUM]: Stability Analysis
Given the array of pairs (value, original_index): `[(3,0), (1,1), (3,2), (2,3)]`

After sorting by value using:
1. Selection Sort
2. Insertion Sort

Show the final array for each algorithm. Which maintains stability?

---

### Exercise 17 [MEDIUM]: Custom Comparator with std::sort
Write code using `std::sort` to sort a vector of Student objects by grade (descending), and by name (ascending) if grades are equal:
```cpp
struct Student {
    std::string name;
    int grade;
};

// Your sorting code here
```

---

### Exercise 18 [MEDIUM]: Counting Sort Implementation
Implement counting sort for an array of integers in the range [0, k]:
```cpp
void countingSort(std::vector<int>& arr, int k) {
    // Your code here
    // Assume all elements are in range [0, k]
}
```

---

## **MEDIUM-HARD EXERCISES** (Advanced Implementation & Analysis)

### Exercise 19 [MEDIUM-HARD]: Merge Sort Implementation
Implement a complete recursive merge sort:
```cpp
void mergeSort(std::vector<int>& arr, int left, int right) {
    // Your code here (include merge function)
}
```

---

### Exercise 20 [MEDIUM-HARD]: Hybrid Algorithm Design
Design a hybrid sorting algorithm that:
- Uses insertion sort for arrays smaller than 10 elements
- Uses merge sort for larger arrays

Implement and explain why this might be faster than pure merge sort.

---

### Exercise 21 [MEDIUM-HARD]: Complexity Comparison
You need to sort arrays of different sizes. Fill in this table with the actual number of operations (comparisons) for each algorithm:

| Array Size | Bubble Sort | Selection Sort | Merge Sort |
|------------|-------------|----------------|------------|
| n = 10     | ?           | ?              | ?          |
| n = 100    | ?           | ?              | ?          |
| n = 1000   | ?           | ?              | ?          |

Use formulas: Bubble/Selection ≈ n²/2, Merge ≈ n log₂(n)

---

### Exercise 22 [MEDIUM-HARD]: Radix Sort Understanding
Explain step-by-step how radix sort would sort the following array of 3-digit integers:
`[170, 45, 75, 90, 802, 24, 2, 66]`

Show the array state after sorting by each digit position.

---

## **HARD EXERCISES** (Complex Applications & Optimization)

### Exercise 23 [HARD]: Bucket Sort Implementation
Implement bucket sort for floating-point numbers in the range [0.0, 1.0):
```cpp
void bucketSort(std::vector<float>& arr) {
    // Your code here
    // Use 10 buckets
    // Sort each bucket with insertion sort
}
```

---

### Exercise 24 [HARD]: Algorithm Performance Analysis
Write a benchmarking program that:
1. Tests bubble sort, insertion sort, and `std::sort` on arrays of sizes 100, 1000, 10000
2. Tests on three data distributions: random, sorted, reverse-sorted
3. Measures and displays execution time for each combination
4. Analyze and explain the results

---

### Exercise 25 [HARD]: Quicksort Partitioning
Implement the partition function for quicksort using the Lomuto partition scheme:
```cpp
int partition(std::vector<int>& arr, int low, int high) {
    // Your code here
    // Use arr[high] as pivot
    // Return the final position of the pivot
}
```
Then trace it on `[10, 7, 8, 9, 1, 5]` with pivot = 5.

---

### Exercise 26 [HARD]: Stable Quicksort
Standard quicksort is not stable. Design and implement a modification that makes it stable while maintaining O(n log n) average time complexity. Explain the trade-offs.

---

### Exercise 27 [HARD]: External Sorting Concept
You have 10GB of data to sort, but only 1GB of RAM available. Describe an algorithm using merge sort principles that could handle this scenario. Include:
1. How you'd break up the data
2. How you'd sort chunks
3. How you'd merge results
4. Space and time complexity analysis

---

### Exercise 28 [HARD]: Algorithm Selection Matrix
Create a comprehensive decision tree or flowchart that takes the following inputs:
- Array size (small <100, medium <10000, large >10000)
- Data type (integers with known range, general comparable objects)
- Memory constraints (limited, unlimited)
- Stability requirement (yes/no)
- Current data state (random, nearly sorted, reverse sorted)

And outputs the optimal sorting algorithm with justification.

---

### Exercise 29 [HARD]: Introsort Implementation Challenge
Implement a simplified version of introsort that:
1. Starts with quicksort
2. Tracks recursion depth
3. Switches to heapsort if depth exceeds 2*log₂(n)
4. Uses insertion sort for arrays smaller than 16 elements

```cpp
void introsort(std::vector<int>& arr, int begin, int end, int maxDepth) {
    // Your code here
}
```

---

### Exercise 30 [HARD]: Multi-Key Sorting Problem
You have a database of records:
```cpp
struct Record {
    std::string department;
    std::string name;
    int salary;
    int yearsOfService;
};
```

Sort by:
1. Department (ascending, alphabetically)
2. Years of service (descending)
3. Salary (descending)
4. Name (ascending)

Implement an efficient solution using `std::sort` with a custom comparator, and explain why stability matters (or doesn't) for this multi-key sort.

---

## **Answer Key Summary**

**Easy (1-8):** Test basic understanding of terminology, complexity notation, and algorithm characteristics.

**Easy-Medium (9-12):** Require basic implementation skills and ability to identify simple bugs.

**Medium (13-18):** Full implementations of simple algorithms, algorithm selection reasoning, and working with STL.

**Medium-Hard (19-22):** Complex recursive implementations, hybrid designs, detailed complexity calculations.

**Hard (23-30):** Advanced implementations (bucket sort, quicksort, introsort), performance analysis, real-world problem-solving, and multi-criteria optimization.

---

**Instructor Notes:**
- Exercises 1-8: Suitable for quizzes or warm-up activities
- Exercises 9-18: Homework assignments or lab work
- Exercises 19-26: Projects or exam questions
- Exercises 27-30: Capstone projects or advanced assessments