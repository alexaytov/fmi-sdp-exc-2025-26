# Binary Search Trees: Progressive Exercise Set

## **EASY LEVEL - Foundational Concepts**

**Exercise 1 [EASY]:** Which of the following statements correctly describes the Binary Search Tree (BST) property?
- A) All left children must be leaf nodes
- B) For any node, all values in its left subtree are less than the node's value, and all values in its right subtree are greater
- C) The tree must be perfectly balanced
- D) Parent nodes always have exactly two children

**Exercise 2 [EASY]:** Given the following tree, identify whether it is a valid BST:
```
    10
   /  \
  5    15
 / \   / \
3  7  12 20
```
Answer: Yes or No, and explain why.

**Exercise 3 [EASY]:** What is the output of an inorder traversal of the BST in Exercise 2? Write the sequence of values.

**Exercise 4 [EASY]:** In the following C++ TreeNode structure, identify what each member represents:
```cpp
class TreeNode {
public:
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};
```

**Exercise 5 [EASY]:** Which traversal method (inorder, preorder, or postorder) would produce a sorted sequence of values from a BST?

**Exercise 6 [EASY]:** If you insert the values 5, 3, 7, 1, 9 in that order into an initially empty BST, draw the resulting tree structure.

---

## **EASY-MEDIUM LEVEL - Basic Operations**

**Exercise 7 [EASY-MEDIUM]:** Complete the missing base case in this search function:
```cpp
node* search(node* root, int key) {
    // Fill in the base case here
    if (key < root->key)
        return search(root->left, key);
    else
        return search(root->right, key);
}
```

**Exercise 8 [EASY-MEDIUM]:** What is the time complexity of searching for a value in a balanced BST with n nodes? What about in a completely skewed (unbalanced) BST?

**Exercise 9 [EASY-MEDIUM]:** Given this BST, trace the path taken when searching for the value 12:
```
    15
   /  \
  10   20
 / \   / \
5  12 18 25
```

**Exercise 10 [EASY-MEDIUM]:** Identify which of the following sequences would create a skewed BST if inserted in order:
- A) 5, 3, 7, 2, 8
- B) 1, 2, 3, 4, 5
- C) 4, 2, 6, 1, 3
- D) 10, 5, 15, 3, 7

---

## **MEDIUM LEVEL - Implementation & Analysis**

**Exercise 11 [MEDIUM]:** Write the iterative version of the BST search function (the lecture showed recursive). Your function should return a pointer to the node if found, or nullptr if not found.

**Exercise 12 [MEDIUM]:** Consider this insertion sequence into an empty BST: 50, 30, 70, 20, 40, 60, 80. 
- a) Draw the resulting tree
- b) What is the height of this tree?
- c) How many leaf nodes does it have?

**Exercise 13 [MEDIUM]:** Explain what would happen if you try to delete a node with value 30 from this BST. Which case (leaf, one child, two children) applies?
```
    50
   /  \
  30   70
 / \
20 40
```

**Exercise 14 [MEDIUM]:** Implement a function `findMax()` that returns the maximum value in a BST:
```cpp
node* findMax(node* root) {
    // Your implementation here
}
```

**Exercise 15 [MEDIUM]:** Debug this faulty insertion function. Identify and fix the error:
```cpp
node* insert(node* root, int key) {
    if (!root) return new node{key, nullptr, nullptr};
    if (key < root->key)
        insert(root->left, key);  // Bug here
    else
        insert(root->right, key); // Bug here
    return root;
}
```

---

## **MEDIUM-HARD LEVEL - Complex Operations**

**Exercise 16 [MEDIUM-HARD]:** Implement a function to count the total number of nodes in a BST:
```cpp
int countNodes(node* root) {
    // Your implementation here
}
```

**Exercise 17 [MEDIUM-HARD]:** Given the following BST, manually perform the deletion of node 50 (which has two children) using the inorder successor method. Show each step:
```
      50
     /  \
   30    70
  / \   / \
20 40 60 80
       \
       65
```

**Exercise 18 [MEDIUM-HARD]:** Write a function that determines whether a binary tree is a valid BST. Consider that you need to check the BST property for ALL nodes, not just immediate children:
```cpp
bool isValidBST(node* root, int minVal, int maxVal) {
    // Your implementation here
}
```

---

## **HARD LEVEL - Advanced Applications & Analysis**

**Exercise 19 [HARD]:** Analyze the space complexity of the recursive insertion function. If you insert n elements into a BST:
- a) What is the space complexity in the best case (balanced tree)?
- b) What is the space complexity in the worst case (skewed tree)?
- c) Explain why the space complexity differs between these cases.

**Exercise 20 [HARD]:** Implement a function to find the kth smallest element in a BST without using extra space for storage (hint: use inorder traversal with a counter):
```cpp
void kthSmallestHelper(node* root, int k, int& count, int& result) {
    // Your implementation here
}

int kthSmallest(node* root, int k) {
    int count = 0;
    int result = -1;
    kthSmallestHelper(root, k, count, result);
    return result;
}
```

**Exercise 21 [HARD]:** Given a BST and two values k1 and k2 (where k1 < k2), write a function that prints all keys in the range [k1, k2] in sorted order. Optimize your solution to avoid visiting nodes outside the range:
```cpp
void printRange(node* root, int k1, int k2) {
    // Your implementation here
}
```

**Exercise 22 [HARD]:** Memory Management Challenge: Write a function to delete an entire BST and free all allocated memory. Use postorder traversal to ensure child nodes are deleted before parent nodes:
```cpp
void deleteBST(node*& root) {
    // Your implementation here
}
```

**Exercise 23 [HARD]:** Consider a scenario where you need to build a balanced BST from a sorted array of n elements. Write a function that constructs a height-balanced BST from the sorted array in O(n) time:
```cpp
node* sortedArrayToBST(int arr[], int start, int end) {
    // Your implementation here
}
```

**Exercise 24 [HARD]:** Complexity Analysis Problem: You have three data structures containing n sorted elements:
- A sorted array
- A sorted linked list  
- A balanced BST

For each structure, determine the time complexity for:
- a) Searching for a specific element
- b) Inserting a new element while maintaining sorted order
- c) Deleting an element while maintaining sorted order

Create a comparison table and explain which structure is best for which scenarios.

**Exercise 25 [HARD]:** Design Challenge: You're building an autocomplete system for a search engine that needs to:
- Store millions of words efficiently
- Support fast prefix searches (finding all words starting with "abc")
- Handle frequent insertions of new words
- Minimize memory usage

Would a standard BST be appropriate? If not, what modifications or alternative tree structures would you suggest, and why? Consider discussing Tries, Ternary Search Trees, or self-balancing BSTs in your answer.

---

## **Answer Key Notes**

These exercises progress from basic concept recognition through implementation to complex analysis and design decisions. Students should be able to:
- Identify and verify BST properties (Exercises 1-5)
- Trace and predict tree operations (Exercises 6-10)
- Implement basic functions (Exercises 11-15)
- Handle complex scenarios like deletion (Exercises 16-18)
- Analyze complexity and design solutions (Exercises 19-25)

The difficulty progression ensures students build confidence while being challenged to apply concepts in increasingly sophisticated ways.