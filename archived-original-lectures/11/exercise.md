# Binary Heaps and Heap Sort: Progressive Exercise Set

## EASY EXERCISES (Foundational Concepts)

**Exercise 1 [EASY]: Understanding Heap Properties**
Which of the following arrays represents a valid max-heap?
A) [10, 8, 9, 7, 6, 5, 4]
B) [10, 5, 8, 3, 4, 6, 7]
C) [10, 9, 8, 7, 6, 5, 4]
D) [10, 8, 6, 9, 7, 5, 4]

**Exercise 2 [EASY]: Array Index Calculations**
Given a 0-indexed heap array, if a node is at index 5:
- What is the index of its parent?
- What is the index of its left child?
- What is the index of its right child?

**Exercise 3 [EASY]: Heap Type Identification**
Is the array [3, 5, 4, 8, 7, 9, 10] a valid min-heap, max-heap, both, or neither? Explain your answer.

**Exercise 4 [EASY]: Complete Binary Tree Properties**
A complete binary tree has 15 nodes. What is its height? How many nodes are at the last level?

**Exercise 5 [EASY]: Big-O Recognition**
Match each operation with its time complexity:
- Finding the maximum in a max-heap: ___
- Inserting into a heap: ___
- Building a heap from scratch: ___
- Heap sort total complexity: ___

Options: O(1), O(log n), O(n), O(n log n)

**Exercise 6 [EASY]: Heap vs Array**
Explain in 2-3 sentences why storing a complete binary tree in an array is more efficient than using pointers/references.

---

## EASY-MEDIUM EXERCISES (Basic Operations)

**Exercise 7 [EASY-MEDIUM]: Sift-Up Trace**
Given the partial max-heap [15, 12, 10, 8, 9, 5], insert the value 14. Show each step of the sift-up process and the resulting array after each swap.

**Exercise 8 [EASY-MEDIUM]: Identifying Violations**
In the array [20, 18, 15, 12, 10, 8, 14], one element violates the max-heap property. Identify it and explain which operation (sift-up or sift-down) would fix it.

**Exercise 9 [EASY-MEDIUM]: Parent-Child Relationships**
Draw the binary tree representation of the max-heap [50, 30, 40, 10, 20, 15, 35]. Label each node with its array index.

**Exercise 10 [EASY-MEDIUM]: Heap Construction Starting Point**
For an array of size n = 12, at which index should you start the heapify process when building a heap bottom-up? Explain why.

---

## MEDIUM EXERCISES (Algorithm Application)

**Exercise 11 [MEDIUM]: Complete Sift-Down**
Given the array [5, 20, 15, 10, 12, 8, 7] where the heap property is violated at the root, perform a complete sift-down operation. Show the array state after each swap until the heap property is restored.

**Exercise 12 [MEDIUM]: Building a Heap**
Build a max-heap from the unsorted array [4, 10, 3, 5, 1, 8, 9, 2] using Floyd's bottom-up heapify method. Show:
- The starting index for heapification
- The array state after processing each internal node
- The final max-heap

**Exercise 13 [MEDIUM]: Heap Sort Phase 1**
Given [7, 3, 9, 1, 5, 2, 8], complete Phase 1 of heap sort (heap construction). Show your work step-by-step and identify how many sift-down operations were performed.

**Exercise 14 [MEDIUM]: Algorithm Comparison**
You need to sort 500,000 records on a device with only 2 MB of available memory. Each record is 100 bytes. Compare heap sort, merge sort, and quick sort for this scenario. Which would you choose and why? Consider at least three factors in your answer.

**Exercise 15 [MEDIUM]: Extraction Process**
Starting with the max-heap [25, 20, 18, 15, 10, 12, 8], perform the first THREE extraction steps of heap sort. Show:
- The element removed
- The heap after each extraction and re-heapification
- The growing sorted region

---

## MEDIUM-HARD EXERCISES (Complex Analysis)

**Exercise 16 [MEDIUM-HARD]: Time Complexity Proof**
Explain why building a heap bottom-up is O(n) rather than O(n log n). Your explanation should include:
- The relationship between node levels and number of swaps
- A mathematical justification (you can use summation notation)
- Why this is better than inserting n elements one-by-one

**Exercise 17 [MEDIUM-HARD]: Complete Heap Sort**
Perform a complete heap sort on [6, 2, 8, 1, 9, 3, 7, 5]. Show:
- Phase 1: Complete heapification process
- Phase 2: All extraction steps with intermediate heap states
- The final sorted array
- Total number of comparisons made (estimate)

**Exercise 18 [MEDIUM-HARD]: Stability Analysis**
Given the array [5a, 3, 5b, 2, 5c] where subscripts distinguish equal elements:
- Perform heap sort and show the final order
- Explain why heap sort is not stable using this example
- Describe what modifications (if any) could make heap sort stable and what the cost would be

**Exercise 19 [MEDIUM-HARD]: Min-Heap Application**
You're implementing a priority queue for a hospital emergency room where LOWER numbers indicate HIGHER priority (1 = critical, 10 = minor). 
- Should you use a min-heap or max-heap?
- Given arrivals with priorities [5, 2, 8, 1, 6, 3], show the heap structure after all insertions
- Show the extraction order when patients are called

---

## HARD EXERCISES (Advanced Applications)

**Exercise 20 [HARD]: K-ary Heap Analysis**
Consider a 4-ary heap (each node has 4 children) with 1000 elements.
- What is the formula for finding the parent of node at index i?
- What is the formula for finding the j-th child (j = 0, 1, 2, 3)?
- Calculate the height of this heap
- Compare the number of comparisons per sift-down operation versus a binary heap
- In what scenarios might a 4-ary heap outperform a binary heap?

**Exercise 21 [HARD]: Hybrid Algorithm Design**
Design a hybrid sorting algorithm that:
- Uses heap sort for the first phase
- Switches to another algorithm for the final phase
- Optimizes for both worst-case guarantees AND practical performance
Specify: when to switch, which second algorithm to use, the overall complexity, and justify your design choices.

**Exercise 22 [HARD]: Top-K Problem**
You need to find the top 10 values from a stream of 1 million integers, but you can only store 11 values in memory at a time.
- Design an algorithm using a heap
- Should you use a min-heap or max-heap? Why?
- Show the heap state after processing these values: [15, 8, 23, 42, 4, 16, 50, 12, 9, 31, 7, 19] (k=5 for demonstration)
- What is the time complexity?
- What is the space complexity?

**Exercise 23 [HARD]: Heap Sort Optimization**
The standard heap sort produces ascending order using a max-heap. 
- Explain why we use a max-heap for ascending order (not a min-heap)
- How would you modify heap sort to produce descending order efficiently?
- Analyze a "smart" approach: could you partially sort the array (only extracting the k largest elements)? What would be the complexity of finding the k largest elements using heap sort?
- Compare this to building a min-heap of size k. Which is better and why?

**Exercise 24 [HARD]: Real-World Implementation**
You're implementing heap sort for a real-time system with the following constraints:
- Fixed memory budget (must be truly in-place)
- Data arrives as integers in range [0, 1000]
- System must maintain responsiveness (no operation can take > 5ms)
- Data size varies from 100 to 100,000 elements

Design your implementation addressing:
- Would you use recursive or iterative sift-down? Why?
- How would you handle the responsiveness constraint?
- Should you use heap sort at all, or switch algorithms based on input size?
- What optimizations would you apply?
- Write pseudocode for your optimized sift-down function

---

## ANSWER KEY HIGHLIGHTS

**Exercise 1:** C - Each parent is greater than or equal to both children
**Exercise 2:** Parent: 2, Left child: 11, Right child: 12
**Exercise 4:** Height = 3 (since ⌊log₂(15)⌋ = 3), Last level has 8 nodes
**Exercise 10:** Start at index 5 (n//2 - 1 = 12//2 - 1 = 5)
**Exercise 19:** Min-heap (because we want to extract minimum priority value = highest urgency)
**Exercise 20:** Parent: ⌊(i-1)/4⌋; j-th child: 4i + j + 1; Height ≈ log₄(1000) ≈ 5
**Exercise 22:** Use min-heap; when stream value > heap minimum, remove min and insert new value