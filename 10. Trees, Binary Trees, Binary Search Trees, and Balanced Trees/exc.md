# Tree Data Structures: Progressive Exercise Set

## Foundation Level (Easy)

**Exercise 1 [EASY]**: Define what makes a data structure a "tree" and explain why trees are considered non-linear data structures.

**Exercise 2 [EASY]**: Given a tree node with value 50, its left child is 30, and its right child is 70. Identify which of the following statements are true:
- a) 30 is the parent of 50
- b) 30 and 70 are siblings
- c) 50 is the root node
- d) If 30 has no children, it is a leaf node

**Exercise 3 [EASY]**: Complete the following C++ struct definition for a binary tree node that stores integer data:
```cpp
struct TreeNode {
    int _______;
    TreeNode* _______;
    TreeNode* _______;
};
```

**Exercise 4 [EASY]**: Calculate how many comparisons are needed in the worst case to find an element in a balanced BST containing 1,000 elements. Show your work.

**Exercise 5 [EASY]**: For the following sequence of values inserted into an initially empty BST: 50, 30, 70, 20, 40
Draw the resulting tree structure.

**Exercise 6 [EASY]**: Given a pointer `TreeNode* root`, write the base case for a recursive tree function that checks if the tree is empty.

**Exercise 7 [EASY]**: Match each traversal type with its visiting order:
- Inorder: _______
- Preorder: _______
- Postorder: _______

Options: (Root, Left, Right), (Left, Root, Right), (Left, Right, Root)

**Exercise 8 [EASY]**: True or False: In a Binary Search Tree, all values in the left subtree must be less than the root, and all values in the right subtree must be greater than the root. Explain why this property is important.

## Basic Application Level (Easy-Medium)

**Exercise 9 [EASY-MEDIUM]**: Write a recursive function in C++ to count the total number of nodes in a binary tree:
```cpp
int countNodes(TreeNode* root) {
    // Your code here
}
```

**Exercise 10 [EASY-MEDIUM]**: Given the BST property, explain why an inorder traversal of a BST produces values in ascending order. Provide a simple example with a 3-node tree.

**Exercise 11 [MEDIUM]**: Implement a search function for a BST that returns true if a value exists and false otherwise:
```cpp
bool search(Node* root, int key) {
    // Your code here
}
```

**Exercise 12 [MEDIUM]**: For a tree with height h, what is the:
- Minimum number of nodes possible?
- Maximum number of nodes possible?
Express your answers in terms of h and explain your reasoning.

**Exercise 13 [MEDIUM]**: Given this sequence of insertions into a BST: 10, 5, 15, 3, 7, 12, 20
- Draw the resulting tree
- Show the output of an inorder traversal
- Show the output of a preorder traversal

**Exercise 14 [MEDIUM]**: Identify which of the following binary trees is a valid BST. Explain why invalid trees fail the BST property:
```
Tree A:     Tree B:     Tree C:
    10          10          10
   /  \        /  \        /  \
  5   15      5   15      5   15
 / \          / \  / \       /
3   7        2  6 12 20     12
```

## Intermediate Analysis (Medium)

**Exercise 15 [MEDIUM]**: Complete the insertion function for a BST. Fill in the missing conditions:
```cpp
Node* insert(Node* root, int key) {
    if (!root) return new Node(key);
    if (___________) 
        root->left = insert(root->left, key);
    else if (___________)
        root->right = insert(root->right, key);
    return root;
}
```

**Exercise 16 [MEDIUM]**: Explain why a BST that receives data in sorted order degenerates into a linked list. What is the time complexity of searching in such a degenerate tree?

**Exercise 17 [MEDIUM]**: Write a function to find the minimum value in a BST:
```cpp
Node* minValue(Node* node) {
    // Your code here
}
```
Explain why your approach works based on the BST property.

**Exercise 18 [MEDIUM]**: Given a BST with values {15, 10, 20, 8, 12, 17, 25}, show step-by-step how to delete the node with value 10. Which value replaces it and why?

**Exercise 19 [MEDIUM]**: Calculate the height of the following tree. Then determine if it is balanced (height difference between left and right subtrees ≤ 1 for all nodes):
```
        50
       /  \
      30   70
     /    /  \
   20   60   80
   /         \
  10         90
```

**Exercise 20 [MEDIUM-HARD]**: Implement a function to find the maximum value in a BST without using recursion:
```cpp
int findMax(Node* root) {
    // Your iterative code here
}
```

## Advanced Operations (Hard)

**Exercise 21 [HARD]**: Implement the complete deletion function for a BST that handles all three cases (leaf, one child, two children):
```cpp
Node* deleteNode(Node* root, int key) {
    // Your complete implementation here
}
```

**Exercise 22 [HARD]**: Write a function to determine if a binary tree is a valid BST. Note: Checking only immediate children is insufficient!
```cpp
bool isValidBST(TreeNode* root) {
    // Hint: You may need a helper function with min/max bounds
}
```

**Exercise 23 [HARD]**: Given an array representation of a complete binary tree: [10, 5, 15, 3, 7, 12, 20]
- Write a function to access the right child of the node at index i
- Convert this to a linked structure representation
- Compare space efficiency of both representations

**Exercise 24 [HARD]**: Analyze the time complexity of building a BST from n elements:
- When elements arrive in random order
- When elements arrive in sorted order
- Explain the difference and why it matters

**Exercise 25 [HARD]**: Implement a function that finds the kth smallest element in a BST (where k=1 returns the smallest element):
```cpp
int kthSmallest(Node* root, int k) {
    // Your code here
}
```

**Exercise 26 [HARD]**: Write a function to find the lowest common ancestor (LCA) of two nodes in a BST:
```cpp
Node* lowestCommonAncestor(Node* root, int n1, int n2) {
    // Your code here
}
```

## Application & Synthesis (Hard)

**Exercise 27 [HARD]**: Design a simple in-memory phone book using a BST where names are keys and phone numbers are values. Implement:
- Insert a contact
- Search for a contact
- Delete a contact
- Print all contacts in alphabetical order

**Exercise 28 [HARD]**: Compare and contrast the following operations on an array of n sorted elements vs. a balanced BST of n elements:
- Search
- Insert new element while maintaining order
- Delete an element
Create a table showing time complexities and explain which structure you'd choose for different use cases.

**Exercise 29 [HARD]**: Given this scenario: You need to process a stream of 1,000,000 integers where you frequently need to:
1. Insert new values
2. Find the median value
3. Delete specific values

Would you use a BST? Why or why not? If yes, what modifications might improve performance? If no, what alternative would you suggest?

**Exercise 30 [HARD]**: Implement a tree sort algorithm that:
1. Takes an array of integers
2. Builds a BST from the array
3. Performs inorder traversal to output sorted elements
```cpp
void treeSort(int arr[], int n) {
    // Your implementation here
}
```
Analyze the best-case and worst-case time complexity of your implementation.

---

**Answer Key Note**: These exercises progress from basic terminology and simple operations through complex implementations and real-world applications. Students should attempt exercises sequentially, as later problems build on concepts from earlier ones. Instructors can use these to assess understanding at multiple levels throughout the course unit.