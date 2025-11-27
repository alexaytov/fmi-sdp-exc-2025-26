# Educational Exercises: Complexity, Big-O, Testing, and Double Precision in C++

## Easy Exercises (Foundational Concepts)

**Exercise 1 [EASY]:** What are the two main types of computational complexity discussed in the lecture? Briefly describe what each measures.

**Exercise 2 [EASY]:** In Big-O notation, when we say an algorithm is O(n), what does 'n' represent?

**Exercise 3 [EASY]:** True or False: In Big-O notation, we keep constant factors and lower-order terms when expressing complexity.

**Exercise 4 [EASY]:** Match each Big-O complexity class with its growth rate description:
- O(1)
- O(log n)
- O(n)
- O(n²)

Options: Constant, Linear, Quadratic, Logarithmic

**Exercise 5 [EASY]:** According to IEEE 754, how many bits does a `double` use in C++?
a) 32 bits
b) 64 bits
c) 128 bits
d) 16 bits

**Exercise 6 [EASY]:** Which C++ header file contains functions like `std::isnan()` and `std::isinf()`?
a) `<limits>`
b) `<cmath>`
c) `<iostream>`
d) `<algorithm>`

**Exercise 7 [EASY]:** What does NaN stand for, and give one example of an operation that produces NaN.

**Exercise 8 [EASY]:** What are the three steps in the Arrange-Act-Assert (A-A-A) testing pattern?

## Easy-Medium Exercises (Basic Application)

**Exercise 9 [EASY-MEDIUM]:** Determine the Big-O time complexity of the following code snippet:
```cpp
for (int i = 0; i < n; i++) {
    std::cout << arr[i] << std::endl;
}
```

**Exercise 10 [EASY-MEDIUM]:** What is the result of the following C++ expression?
```cpp
double result = 1.0 / 0.0;
```
Is it: a) NaN, b) Positive Infinity, c) Negative Infinity, d) 0.0

**Exercise 11 [EASY-MEDIUM]:** Why should you avoid using direct equality comparison (`==`) with floating-point numbers? What approach should you use instead?

**Exercise 12 [EASY-MEDIUM]:** List three types of edge cases you should always test when validating an algorithm.

**Exercise 13 [EASY-MEDIUM]:** Determine the Big-O time complexity:
```cpp
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        sum += arr[i][j];
    }
}
```

## Medium Exercises (Intermediate Analysis)

**Exercise 14 [MEDIUM]:** Analyze the time complexity of this code:
```cpp
for (int i = 0; i < n; i++) {
    for (int j = i; j < n; j++) {
        std::cout << arr[i] + arr[j] << std::endl;
    }
}
```
Explain your reasoning step by step.

**Exercise 15 [MEDIUM]:** What is the output of this C++ code, and why?
```cpp
double x = 0.0 / 0.0;
if (x == x) {
    std::cout << "Equal" << std::endl;
} else {
    std::cout << "Not equal" << std::endl;
}
```

**Exercise 16 [MEDIUM]:** Design a comprehensive set of test cases for a function that finds the maximum value in an array of doubles. Include normal cases, edge cases, and special floating-point cases.

**Exercise 17 [MEDIUM]:** Explain why binary search has O(log n) time complexity. Walk through how the input size changes with each iteration.

**Exercise 18 [MEDIUM]:** What is the space complexity of the following recursive function? Explain your answer.
```cpp
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
```

**Exercise 19 [MEDIUM]:** Write a C++ code snippet that properly checks if two double values are approximately equal using a tolerance-based comparison with epsilon = 1e-9.

**Exercise 20 [MEDIUM]:** Consider Bubble Sort with best-case input (already sorted array). Even though it's O(n²) worst-case, what optimization could reduce its best-case complexity to O(n)? Describe the modification.

## Medium-Hard Exercises (Advanced Application)

**Exercise 21 [MEDIUM-HARD]:** Analyze the time complexity of this recursive binary search implementation:
```cpp
int binarySearch(int arr[], int left, int right, int target) {
    if (right >= left) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] > target)
            return binarySearch(arr, left, mid - 1, target);
        return binarySearch(arr, mid + 1, right, target);
    }
    return -1;
}
```
Provide the recurrence relation and explain how it simplifies to the final Big-O.

**Exercise 22 [MEDIUM-HARD]:** Debug this code that's supposed to calculate the average of an array of doubles. Identify potential floating-point issues and suggest improvements:
```cpp
double calculateAverage(double arr[], int size) {
    double sum = 0.0;
    for (int i = 0; i < size; i++) {
        sum += arr[i];
    }
    return sum / size;
}
```

**Exercise 23 [MEDIUM-HARD]:** Compare the time complexities of these two approaches to finding duplicates in an array:
- Approach A: Nested loops comparing each element with every other element
- Approach B: Sort the array first, then scan for adjacent duplicates

Which is more efficient for large n, and why?

## Hard Exercises (Complex Analysis and Synthesis)

**Exercise 24 [HARD]:** Analyze the time and space complexity of Merge Sort. Provide the recurrence relation, explain the merge process complexity, and derive the final O(n log n) complexity using the Master Theorem or recursion tree method.

**Exercise 25 [HARD]:** Design a comprehensive testing strategy for a numerical integration function (like the trapezoidal rule) that operates on doubles. Your strategy should include:
- Unit tests for correctness
- Performance tests for efficiency
- Tests for floating-point edge cases (NaN, Inf, signed zeros)
- Stress tests
Specify at least 8 distinct test cases with justification.

**Exercise 26 [HARD]:** Consider this scenario: You're implementing a financial application that calculates compound interest over many years. Explain the potential floating-point precision issues that could arise and propose a robust implementation strategy that minimizes accumulated rounding errors.

**Exercise 27 [HARD]:** Implement and analyze a function that detects whether a floating-point calculation has "gone wrong" (produced NaN or Inf). Your implementation should:
```cpp
bool isValidCalculation(double result);
```
Then, write a wrapper function that safely performs division and returns a status indicating whether the result is valid, infinite, or NaN.

**Exercise 28 [HARD]:** Given the following algorithm sketch, determine its time complexity and explain whether it can be optimized:
```
Algorithm: Find all pairs in array with sum equal to target
1. For each element i from 0 to n-1:
2.     For each element j from i+1 to n-1:
3.         If arr[i] + arr[j] == target:
4.             Add pair to result
```
Then, propose an O(n) or O(n log n) alternative using appropriate data structures.

**Exercise 29 [HARD]:** Explain why Quick Sort's worst-case complexity is O(n²) despite its average case being O(n log n). Design a test case that would trigger this worst-case behavior in a naive Quick Sort implementation (always choosing the first element as pivot). Then, explain how random pivot selection or median-of-three helps avoid this.

**Exercise 30 [HARD]:** Consider catastrophic cancellation in floating-point arithmetic. Analyze this formula for computing the roots of a quadratic equation:
```
x = (-b ± sqrt(b² - 4ac)) / (2a)
```
Explain when this formula might lose precision due to floating-point arithmetic, and propose an alternative formulation that's numerically stable for the problematic cases.

---

**Answer Key Available Upon Request**

These exercises progress from basic recall and recognition (Easy) through application and analysis (Medium) to synthesis and evaluation (Hard), ensuring comprehensive coverage of the lecture material while building skills systematically.