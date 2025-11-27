# Compiler Optimizations, Locality, Containers, and Arrays in C++ - Exercise Set

## Easy Exercises (Foundational Concepts)

**Exercise 1 [EASY]:** What is a pointer in C++? Write a code snippet that declares an integer variable `x` with value 42, creates a pointer to `x`, and uses the pointer to change the value to 100.

**Exercise 2 [EASY]:** Multiple Choice: Which memory region is used for local variables in a function?
- A) Heap
- B) Stack
- C) Data segment
- D) Code segment

**Exercise 3 [EASY]:** Define spatial locality in your own words and provide a simple example of code that demonstrates good spatial locality.

**Exercise 4 [EASY]:** What is the difference between call-by-value and call-by-reference in C++? When would you prefer to use `const&` for function parameters?

**Exercise 5 [EASY]:** Declare and initialize a C++ array of 5 integers with the values {10, 20, 30, 40, 50}. Write code to print the third element.

**Exercise 6 [EASY]:** Which compiler optimization flag would you use for debugging, and why?
- A) -O0
- B) -O1
- C) -O2
- D) -O3

**Exercise 7 [EASY]:** True or False: `std::vector` stores its elements in contiguous memory locations, just like a raw C++ array.

**Exercise 8 [EASY]:** What is constant folding? Give an example of a statement where the compiler can perform constant folding.

## Easy-Medium Exercises (Building Understanding)

**Exercise 9 [EASY-MEDIUM]:** Explain the difference between temporal locality and spatial locality. Provide a code example that demonstrates temporal locality.

**Exercise 10 [EASY-MEDIUM]:** Compare `std::array` and raw C++ arrays. List two advantages of `std::array` over raw arrays.

**Exercise 11 [EASY-MEDIUM]:** What happens when you access an element outside the bounds of a raw C++ array (e.g., `arr[100]` when the array has only 10 elements)? Why is this dangerous?

**Exercise 12 [EASY-MEDIUM]:** Write a function that takes a `std::vector<int>` by constant reference and returns the sum of all its elements. Explain why passing by constant reference is preferred over passing by value for this function.

**Exercise 13 [EASY-MEDIUM]:** What is dead code elimination? Provide a code snippet where the compiler could remove dead code, and explain what would be removed.

## Medium Exercises (Application and Analysis)

**Exercise 14 [MEDIUM]:** Compare the memory layout and cache performance characteristics of `std::vector`, `std::list`, and `std::map`. For which operations would each container perform best?

**Exercise 15 [MEDIUM]:** Write two versions of a function that multiplies all elements in an integer array by 2: one with sequential access and one with strided access (stride = 10). Explain which version will have better cache performance and why.

```cpp
void multiply_sequential(int* arr, int size);
void multiply_strided(int* arr, int size, int stride);
```

**Exercise 16 [MEDIUM]:** Explain what loop unrolling is and why it can improve performance. Write a simple loop that sums an array, then show what the loop might look like after the compiler unrolls it by a factor of 4.

**Exercise 17 [MEDIUM]:** Given the following code, identify at least three optimizations a compiler might apply at `-O3` level:

```cpp
int calculate(int x) {
    const int multiplier = 10;
    int result = x * multiplier + 5 * 2;
    int unused = x + 100;
    return result;
}
```

**Exercise 18 [MEDIUM]:** You need to store 10,000 integers and frequently iterate through all of them to perform calculations. Would you choose `std::vector` or `std::list`? Justify your answer based on data locality and performance characteristics.

**Exercise 19 [MEDIUM]:** What is Common Subexpression Elimination (CSE)? Given the following code, show how a compiler might optimize it using CSE:

```cpp
int a = x * y + z;
int b = x * y + w;
int c = x * y + 5;
```

**Exercise 20 [MEDIUM]:** Explain the concept of cache lines and cache misses. Why does strided access with a large stride value lead to poor performance?

## Medium-Hard Exercises (Advanced Application)

**Exercise 21 [MEDIUM-HARD]:** Using Compiler Explorer (godbolt.org), write a simple function that adds two arrays element-wise. Compile it with `-O0` and `-O3`. Describe at least three differences you observe in the generated assembly code.

```cpp
void add_arrays(int* a, int* b, int* result, int n) {
    for (int i = 0; i < n; i++) {
        result[i] = a[i] + b[i];
    }
}
```

**Exercise 22 [MEDIUM-HARD]:** Explain what the `__restrict` keyword does and why it enables more aggressive compiler optimizations. Provide an example where using `__restrict` would make a significant performance difference.

**Exercise 23 [MEDIUM-HARD]:** Design a small benchmark to measure the performance difference between iterating through a `std::vector<int>` sequentially versus iterating through a `std::list<int>`. Explain the expected results based on data locality principles.

**Exercise 24 [MEDIUM-HARD]:** Analyze the following matrix multiplication code. Identify the locality issues and suggest a modification that would improve cache performance:

```cpp
void matrix_multiply(int** A, int** B, int** C, int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            for (int k = 0; k < n; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
}
```

**Exercise 25 [MEDIUM-HARD]:** What is loop invariant code motion? Given the following loop, identify the loop-invariant computation and show how a compiler would optimize it:

```cpp
for (int i = 0; i < n; i++) {
    arr[i] = arr[i] * (x + y + z);
}
```

## Hard Exercises (Complex Analysis and Problem-Solving)

**Exercise 26 [HARD]:** Implement a performance-critical function that processes a large dataset (1 million integers). Compare three implementations: using raw arrays, `std::vector`, and `std::list`. Measure and explain the performance differences, considering compiler optimizations, memory layout, and cache behavior.

**Exercise 27 [HARD]:** Explain the concept of vectorization (SIMD). Write a function that adds two arrays of floats, compile it with `-O3 -march=native`, and analyze the assembly output on Compiler Explorer. Can you identify SIMD instructions? What conditions must be met for the compiler to vectorize a loop?

**Exercise 28 [HARD]:** Design a data structure for a game that needs to:
- Store 100,000 game entities
- Frequently iterate through all entities to update their positions
- Occasionally insert/remove entities from arbitrary positions

Justify your container choice based on locality, memory overhead, and operation performance. Discuss the trade-offs involved.

**Exercise 29 [HARD]:** Analyze the following code for cache performance. Calculate (approximately) how many cache lines would be accessed if the cache line size is 64 bytes and `int` is 4 bytes:

```cpp
// Matrix is 1024x1024, stored in row-major order
void process_matrix_columns(int matrix[1024][1024]) {
    for (int col = 0; col < 1024; col++) {
        for (int row = 0; row < 1024; row++) {
            matrix[row][col] *= 2;
        }
    }
}
```

How would you restructure this code to improve cache performance?

**Exercise 30 [HARD]:** Implement and analyze a cache-oblivious matrix transpose algorithm. Compare its performance characteristics with a naive implementation, explaining how cache blocking improves locality. Use Compiler Explorer to examine how different optimization levels affect both implementations.

---

## Answer Key Highlights (For Instructor)

**Key Concepts to Assess:**
- Understanding of memory model (stack, heap, data segment)
- Spatial vs. temporal locality
- Container characteristics and trade-offs
- Compiler optimization techniques and when they apply
- Cache behavior and its impact on performance
- Ability to analyze and predict performance based on memory access patterns
- Practical use of tools like Compiler Explorer
- Critical thinking about data structure selection