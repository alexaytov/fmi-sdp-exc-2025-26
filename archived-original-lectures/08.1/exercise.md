# Educational Exercises: Cryptographic Hash Functions and Hash Tables

## **EASY LEVEL: Foundational Concepts**

### Exercise 1 [EASY]: Understanding Hash Function Purpose
**Question:** List three everyday situations where hash functions are used. For each, explain whether it uses cryptographic or non-cryptographic hashing and why.

---

### Exercise 2 [EASY]: Hash Function Properties - Multiple Choice
**Question:** Which property ensures that the same input always produces the same hash output?
- A) Collision resistance
- B) Deterministic
- C) Avalanche effect
- D) Pre-image resistance

---

### Exercise 3 [EASY]: Big O Notation Recognition
**Question:** What is the ideal time complexity for searching in a hash table?
- A) O(n²)
- B) O(n log n)
- C) O(n)
- D) O(1)

---

### Exercise 4 [EASY]: Load Factor Calculation
**Question:** A hash table has 100 slots and contains 75 elements. Calculate the load factor. Is this considered high, low, or moderate?

---

### Exercise 5 [EASY]: Identifying Hash Algorithms
**Question:** Match each hash algorithm to its security status:
1. MD5
2. SHA-256
3. SHA-1
4. SHA-3

Options: A) Broken - do not use, B) Strong - widely used, C) Strong - latest standard

---

## **EASY-MEDIUM LEVEL: Basic Application**

### Exercise 6 [EASY-MEDIUM]: Simple Hash Function Computation
**Question:** Given the hash function `h(x) = x % 11`, compute the hash values for the following keys: 23, 45, 67, 89. Which keys will collide?

---

### Exercise 7 [EASY-MEDIUM]: Avalanche Effect Demonstration
**Question:** Explain why changing "password" to "Password" (capitalizing one letter) should produce a completely different hash in a cryptographic hash function. What property is this demonstrating?

---

### Exercise 8 [EASY-MEDIUM]: Password Storage Scenario
**Question:** A website stores user passwords as follows:
- Option A: Plaintext passwords in database
- Option B: Hash of passwords in database
- Option C: Hash(password + salt) in database

Rank these options from least to most secure and explain why Option C is superior to Option B.

---

## **MEDIUM LEVEL: Applying Concepts**

### Exercise 9 [MEDIUM]: Collision Resolution Strategy Selection
**Question:** You're designing a hash table for a spell-checker that will store 50,000 English words. The table has 60,013 slots (a prime number). 
- Calculate the expected load factor.
- Would you recommend separate chaining or linear probing? Justify your answer with at least three specific reasons.

---

### Exercise 10 [MEDIUM]: Linear Probing Trace
**Question:** Given a hash table of size 7 using linear probing with `h(x) = x % 7`, insert the following keys in order: 10, 22, 31, 4, 15, 28, 17.
- Show the state of the table after each insertion.
- Identify where collisions occurred and how they were resolved.

---

### Exercise 11 [MEDIUM]: Birthday Paradox Application
**Question:** A hash function produces 64-bit outputs. Approximately how many hash computations would you need before having a 50% chance of finding a collision? Explain your reasoning using the birthday paradox principle.

---

### Exercise 12 [MEDIUM]: Hash Function Design for Strings
**Question:** Design a hash function for strings that would be suitable for a hash table (not cryptographic). Your function should:
- Process each character
- Produce reasonably uniform distribution
- Be efficient to compute

Write pseudocode and explain why you made your design choices.

---

## **MEDIUM-HARD LEVEL: Analysis and Problem-Solving**

### Exercise 13 [MEDIUM-HARD]: Clustering Analysis
**Question:** A hash table using linear probing shows this distribution pattern:
```
Slots: [_, _, X, X, X, X, X, _, _, _, X, _, _, _]
```
- Explain what clustering is and why it's problematic.
- Calculate the average number of probes needed to find an empty slot from position 2.
- How would quadratic probing help this situation?

---

### Exercise 14 [MEDIUM-HARD]: Separate Chaining Performance
**Question:** A hash table with separate chaining has 1000 slots and 5000 elements.
- Calculate the load factor.
- What is the expected average chain length if elements are uniformly distributed?
- In the worst case (poor hash function), all elements hash to the same slot. What would the time complexity be for search operations?

---

### Exercise 15 [MEDIUM-HARD]: Code Debugging - Linear Probing
**Question:** The following C++ code for linear probing has a bug that can cause an infinite loop:
```cpp
int findSlot(int key) {
    int index = hash(key);
    while (table[index] != EMPTY && table[index] != key) {
        index = (index + 1) % tableSize;
    }
    return index;
}
```
- Identify the scenario that causes the infinite loop.
- Explain how to fix it.
- What data structure element is missing to prevent this issue?

---

## **HARD LEVEL: Advanced Applications**

### Exercise 16 [HARD]: File Deduplication System Design
**Question:** Design a file deduplication system for a cloud storage service that handles 1 million files.
- Choose an appropriate cryptographic hash function and justify your choice.
- Explain your hash table design including:
  - Initial table size and why
  - Collision resolution strategy
  - Load factor threshold for resizing
- Calculate the probability of a hash collision (false positive) with your chosen hash function.
- Describe how you would handle the rare case of a true collision (different files, same hash).

---

### Exercise 17 [HARD]: Implementing Quadratic Probing
**Question:** Write complete C++ code for a hash table class using quadratic probing that includes:
- Insert, search, and delete operations
- Proper tombstone handling for deletions
- Dynamic resizing when load factor exceeds 0.7
- A hash function suitable for integer keys

Include comments explaining how your delete operation ensures future searches still work correctly.

---

### Exercise 18 [HARD]: Cryptographic Security Analysis
**Question:** Consider three scenarios:
1. Storing 10 million passwords with MD5 hashing (no salt)
2. Storing 10 million passwords with SHA-256 (no salt)
3. Storing 10 million passwords with SHA-256 + unique salt per password

For each scenario:
- Estimate the time an attacker with 1 billion hash computations/second would need to crack a random 8-character alphanumeric password using brute force.
- Explain why rainbow tables work against scenarios 1 and 2 but not 3.
- Calculate the storage requirement for the salt database in scenario 3 (assume 128-bit salts).

---

### Exercise 19 [HARD]: Performance Optimization Challenge
**Question:** You've implemented a hash table for a real-time gaming leaderboard with 100,000 players. Initial testing shows:
- Insert: 0.5ms average
- Search: 2.0ms average (unacceptable for real-time needs)
- Current load factor: 0.9
- Collision resolution: Linear probing

Develop a comprehensive optimization strategy:
- Diagnose the likely performance bottlenecks
- Propose at least three specific optimizations with expected impact
- Calculate the new expected search time if you resize to load factor 0.5
- Discuss trade-offs of your proposed changes (memory vs. speed)

---

### Exercise 20 [HARD]: Blockchain Integration Application
**Question:** You're designing a simplified blockchain for academic transcripts where each block contains:
- Student records (multiple per block)
- Timestamp
- Hash of previous block
- Nonce (for mining)

Design and explain:
1. The complete hashing scheme for each block (what gets hashed, in what order)
2. Why tampering with a past record would be detected
3. How you'd implement "mining" (finding a hash with leading zeros)
4. Write pseudocode for the validation function that checks blockchain integrity
5. Calculate: If your hash function is SHA-256 and mining requires 4 leading zero bits, what's the expected number of hash attempts needed per block?

---

## **Answer Key Guidance**

**For Instructors:** 
- Exercises 1-5: Assess basic comprehension of concepts
- Exercises 6-8: Test application of simple formulas and reasoning
- Exercises 9-12: Require multi-step problem solving and design decisions
- Exercises 13-15: Demand analytical thinking and debugging skills
- Exercises 16-20: Evaluate synthesis, system design, and advanced implementation capabilities

**Grading Rubric Suggestions:**
- Easy: Focus on correctness and basic understanding
- Medium: Evaluate reasoning quality and justification
- Hard: Assess creativity, completeness, and depth of analysis

---

**Total Exercises: 20**
**Difficulty Distribution:** 5 Easy, 4 Easy-Medium, 4 Medium, 3 Medium-Hard, 4 Hard