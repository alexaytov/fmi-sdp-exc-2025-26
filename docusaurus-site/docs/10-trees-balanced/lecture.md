---
title: "Лекция"
sidebar_position: 1
slug: lecture
tags: [trees, binary-trees, bst, balanced-trees, avl, red-black, data-structures, cpp]
---

import InfoBox from '@site/src/components/InfoBoxes/InfoBox';
import WarningBox from '@site/src/components/InfoBoxes/WarningBox';
import SuccessBox from '@site/src/components/InfoBoxes/SuccessBox';
import WhyBox from '@site/src/components/InfoBoxes/WhyBox';
import LearningObjectives from '@site/src/components/LearningObjectives';
import CollapsibleSection from '@site/src/components/CollapsibleSection';
import ComparisonBox from '@site/src/components/Comparison/ComparisonBox';
import Grid from '@site/src/components/Grid/Grid';
import Card from '@site/src/components/Grid/Card';

# Trees, Binary Trees, BSTs и Balanced Trees: Представяне и Основни Операции

<LearningObjectives
  objectives={[
    "Разберете tree структурите и техните класификации",
    "Представете trees в паметта използвайки linked structures",
    "Имплементирайте core BST операции",
    "Анализирайте time и space complexity на BST операциите",
    "Приложете BSTs за решаване на практически проблеми"
  ]}
/>

---

## 1. Въведение и Мотивация

<WhyBox title="Защо дърветата са важни?">

Когато datasets растат в size и complexity, традиционните **linear структури** като arrays и linked lists разкриват своите ограничения:

- **Arrays:** Бърз random access, но insertions/deletions включват shifting на елементи
- **Linked Lists:** Ефективни insertions/deletions, но бавен element access

**Trees** преодоляват тези ограничения! Като **йерархични, nonlinear структури**, дърветата свързват nodes по начини, които позволяват **ефективен достъп, insertion и deletion—без memory shifts**.

</WhyBox>

### 1.1. Performance Comparison

<InfoBox title="Logarithmic vs Linear Performance">

**Ключова идея:**
Милион-елементно linear search: **до 1 милион проверки**
Balanced tree search: **само около 20 проверки**!

| Dataset Size | Linear Search | Balanced Tree Search |
|--------------|---------------|---------------------|
| 1,000 | 1,000 операции | **10 операции** |
| 1,000,000 | 1,000,000 операции | **20 операции** |
| 1,000,000,000 | 1,000,000,000 операции | **30 операции** |

</InfoBox>

<SuccessBox title="Предимства на Balanced Trees">

В **balanced trees**, search, insertion и deletion могат да се извършат в **O(log n)** време!

Това е **драматично подобрение** спрямо O(n) на linear structures.

</SuccessBox>

### 1.2. Real-World Applications

<Grid columns={2}>
  <Card title="File Systems">
    **Директорни структури** са tree-shaped

    Навигацията е бърза благодарение на йерархичната организация
  </Card>
  <Card title="Database Indices">
    **B-trees и B+ trees** за бързи lookups в огромни datasets

    Използвани в MySQL, PostgreSQL, MongoDB
  </Card>
  <Card title="Document Object Model">
    **HTML страници като дървета**

    Позволява ефективна манипулация на елементи
  </Card>
  <Card title="Machine Learning">
    **Decision trees** за classification

    Random forests комбинират множество дървета
  </Card>
</Grid>

---

## 2. Преговор: Pointers, Dynamic Memory и Recursion

### 2.1. Pointers и Dynamic Memory

<InfoBox title="Основи на Pointer">

**Pointers** позволяват на nodes да референцират други nodes.

**Dynamic memory** (`new`, `delete`) позволява на trees да растат/свиват at runtime.

**Null pointers** маркират празни children (leaves).

</InfoBox>

```cpp
// Заделяне на памет за node
Node* newNode = new Node(42);

// Използване
std::cout << newNode->data << std::endl;

// Освобождаване
delete newNode;
newNode = nullptr;  // Важно!
```

### 2.2. Structs и Node Representation

```cpp
struct TreeNode {
    int data;
    TreeNode *left, *right;

    // Constructor
    TreeNode(int val) : data(val), left(nullptr), right(nullptr) {}
};
```

<SuccessBox title="Използване на -> Operator">

- Използвайте `->` за достъп до members чрез pointer
- `node->data` е equivalent на `(*node).data`

</SuccessBox>

### 2.3. Recursion Fundamentals

<WhyBox title="Защо Recursion е естествена за Trees?">

**Trees са рекурсивни по природа:** всяко subtree е само по себе си tree!

Почти всички tree операции (traversal, insertion, deletion) са изразени рекурсивно.

</WhyBox>

```cpp
// Пример: Compute tree height рекурсивно
int height(TreeNode* node) {
    // Base case: празно дърво
    if (node == nullptr) return 0;

    // Recursive case
    int leftHeight = height(node->left);
    int rightHeight = height(node->right);

    return 1 + std::max(leftHeight, rightHeight);
}
```

---

## 3. Tree Structures и Терминология

### 3.1. Основни Дефиниции

<InfoBox title="Tree Terminology">

**Основни концепции:**
- **Tree:** Колекция от nodes, свързани в йерархия (no cycles, един root)
- **Root:** Най-горният node (без parent)
- **Parent/Child:** Parent се свързва към child чрез edge
- **Siblings:** Nodes със същия parent
- **Leaf:** Node без children
- **Internal node:** Нито root, нито leaf
- **Subtree:** Всеки node плюс всички негови descendants
- **Height:** Най-дългият път от node до leaf
- **Depth:** Разстоянието от root до конкретен node

</InfoBox>

### 3.2. Binary Trees

<InfoBox title="Какво е Binary Tree?">

**Binary tree:** Всеки node има **най-много два children** (left/right).

**Видове Binary Trees:**

</InfoBox>

<Grid columns={3}>
  <Card title="Full Binary Tree">
    Всеки node има **0 или 2 children**

    Няма nodes с точно 1 child
  </Card>
  <Card title="Complete Binary Tree">
    Всички levels са **пълни освен възможно най-долното**

    Запълнено **отляво надясно**
  </Card>
  <Card title="Balanced Binary Tree">
    Left и right subtree heights **се различават с най-много 1**

    Важно за performance!
  </Card>
</Grid>

### 3.3. Binary Search Tree (BST) Invariant

<InfoBox title="BST Property - Най-важното правило!">

**За всеки node:**
- Всички стойности в **left subtree** са **< node value**
- Всички стойности в **right subtree** са **> node value**

**Това свойство е рекурсивно вярно за всички descendants!**

</InfoBox>

**Визуален пример:**

```
        50
       /  \
      30   70
     / \   / \
    20 40 60 80
```

✅ **Valid BST:**
- Node 50: left (20, 30, 40) < 50 < right (60, 70, 80)
- Node 30: left (20) < 30 < right (40)
- Node 70: left (60) < 70 < right (80)

<WarningBox title="Често Срещана Грешка!">

**Не е достатъчно да проверите само immediate children!**

BST invariant важи **рекурсивно за всички descendants**.

```
Пример за невалиден BST:

    10
   /  \
  5    15
      /  \
     6   20

Грешка: 6 < 10, но е в right subtree на 10!
```

</WarningBox>

---

## 4. Memory Representation на Trees

### 4.1. Linked Structure (Pointers)

<InfoBox title="Най-често използвана в C++">

**Flexible и dynamic** - най-популярният подход за BST implementation.

</InfoBox>

```cpp
struct Node {
    int data;
    Node* left;
    Node* right;

    Node(int val) : data(val), left(nullptr), right(nullptr) {}
};

// Създаване на nodes
Node* root = new Node(50);
root->left = new Node(30);
root->right = new Node(70);
root->left->left = new Node(20);
root->left->right = new Node(40);
```

<SuccessBox title="Предимства">

- **Flexible shape** - може да бъде всякаква форма
- Nodes са **dynamically created**
- Subtrees могат да растат/свиват **independently**
- **Естествено** за recursive operations

</SuccessBox>

### 4.2. Array Representation

<InfoBox title="Подходящ за Complete Trees">

**Root** на index 0:
- **Left child:** `2i + 1`
- **Right child:** `2i + 2`
- **Parent:** `(i - 1) / 2`

</InfoBox>

```cpp
// Array representation на binary tree
int tree[100];

// Root
tree[0] = 50;

// Children на root
tree[1] = 30;  // Left child:  2*0+1 = 1
tree[2] = 70;  // Right child: 2*0+2 = 2

// Children на node 1 (30)
tree[3] = 20;  // Left child:  2*1+1 = 3
tree[4] = 40;  // Right child: 2*1+2 = 4
```

<Grid columns={2}>
  <Card title="Linked Structure">
    ✅ Flexible shape
    ✅ Dynamic size
    ❌ Pointers needed
    ❌ Memory overhead
  </Card>
  <Card title="Array Representation">
    ✅ No pointers needed
    ✅ Direct indexing
    ❌ Fixed size
    ❌ Wastes space in sparse trees
  </Card>
</Grid>

---

## 5. Tree Traversal: Foundation за BST Operations

Traversal е **посещението на всеки node** в specific order. Критично за searching, printing, copying и др.

### 5.1. Inorder Traversal (Left → Root → Right)

<InfoBox title="Най-важен за BST!">

**BSTs:** Inorder traversal произвежда nodes в **ascending order**!

Това е уникално свойство на BST.

</InfoBox>

```cpp
void inorder(TreeNode* root) {
    if (root == nullptr) return;  // Base case

    inorder(root->left);              // Visit left subtree
    std::cout << root->data << " ";   // Visit root
    inorder(root->right);             // Visit right subtree
}
```

**Пример:**

```
Tree:        50
            /  \
           30   70
          / \   / \
         20 40 60 80

Inorder output: 20 30 40 50 60 70 80  (sorted! ✓)
```

### 5.2. Други Traversals

<Grid columns={3}>
  <Card title="Preorder">
    **Root → Left → Right**

    ```cpp
    void preorder(TreeNode* root) {
        if (!root) return;
        cout << root->data << " ";
        preorder(root->left);
        preorder(root->right);
    }
    ```

    **Използване:** Copy tree structure
  </Card>
  <Card title="Inorder" highlight>
    **Left → Root → Right**

    ```cpp
    void inorder(TreeNode* root) {
        if (!root) return;
        inorder(root->left);
        cout << root->data << " ";
        inorder(root->right);
    }
    ```

    **Използване:** Sorted output за BST
  </Card>
  <Card title="Postorder">
    **Left → Right → Root**

    ```cpp
    void postorder(TreeNode* root) {
        if (!root) return;
        postorder(root->left);
        postorder(root->right);
        cout << root->data << " ";
    }
    ```

    **Използване:** Delete tree (deallocate)
  </Card>
</Grid>

---

## 6. Core BST Operations

### 6.1. Insertion Operation

<InfoBox title="Алгоритъм за Insertion">

**Принцип:** Navigate downward от root, comparing на всяка стъпка.
1. Go **left** за по-малки стойности
2. Go **right** за по-големи стойности
3. Insert на **NULL позицията**

</InfoBox>

```cpp
Node* insert(Node* root, int key) {
    // Base case: празно дърво или намерена позиция
    if (root == nullptr) {
        return new Node(key);
    }

    // Recursive insertion
    if (key < root->data) {
        root->left = insert(root->left, key);
    } else if (key > root->data) {
        root->right = insert(root->right, key);
    }
    // Ако key == root->data, можем да игнорираме (no duplicates)

    return root;
}
```

<SuccessBox title="BST Invariant">

Винаги е **запазен**, тъй като всеки descendant е constrained от recursive comparisons!

</SuccessBox>

### 6.2. Search Operation

<InfoBox title="Подобно на Binary Search в Arrays">

**Complexity:**
- **Balanced tree:** O(log n)
- **Worst case (skewed):** O(n)

</InfoBox>

```cpp
bool search(Node* root, int key) {
    // Base case: празно дърво или намерен key
    if (root == nullptr) return false;
    if (root->data == key) return true;

    // Recursive search
    if (key < root->data) {
        return search(root->left, key);
    } else {
        return search(root->right, key);
    }
}

// Итеративна версия (по-ефективна за stack)
bool searchIterative(Node* root, int key) {
    while (root != nullptr) {
        if (root->data == key) return true;
        if (key < root->data) root = root->left;
        else root = root->right;
    }
    return false;
}
```

### 6.3. Deletion Operation

<InfoBox title="Най-сложната операция - Три случая">

1. **Node is a leaf** (no children)
2. **Node has one child**
3. **Node has two children** (най-сложен!)

</InfoBox>

<CollapsibleSection title="Case 1: Leaf Node" icon="🍃" defaultOpen={true}>

**Най-прост случай:** Просто delete и update pointer към `nullptr`.

```cpp
// В deletion функцията
if (root->left == nullptr && root->right == nullptr) {
    delete root;
    return nullptr;
}
```

</CollapsibleSection>

<CollapsibleSection title="Case 2: One Child" icon="👨‍👦">

**Replace node с неговия child.**

```cpp
// Ако няма left child
if (root->left == nullptr) {
    Node* temp = root->right;
    delete root;
    return temp;
}

// Ако няма right child
if (root->right == nullptr) {
    Node* temp = root->left;
    delete root;
    return temp;
}
```

</CollapsibleSection>

<CollapsibleSection title="Case 3: Two Children" icon="👨‍👩‍👦">

**Стъпки:**
1. Намерете **inorder successor** (smallest в right subtree)
2. Replace node със successor
3. Recursively delete successor

**Защо inorder successor?** Защото е **следващата по-голяма стойност**, което **запазва BST property**!

```cpp
Node* minValue(Node* node) {
    while (node->left != nullptr) {
        node = node->left;
    }
    return node;
}

Node* deleteNode(Node* root, int key) {
    if (root == nullptr) return root;

    // Find the node
    if (key < root->data) {
        root->left = deleteNode(root->left, key);
    } else if (key > root->data) {
        root->right = deleteNode(root->right, key);
    } else {
        // Node found!

        // Case 1 & 2: Leaf or one child
        if (root->left == nullptr) {
            Node* temp = root->right;
            delete root;
            return temp;
        }
        if (root->right == nullptr) {
            Node* temp = root->left;
            delete root;
            return temp;
        }

        // Case 3: Two children
        Node* temp = minValue(root->right);  // Inorder successor
        root->data = temp->data;             // Copy value
        root->right = deleteNode(root->right, temp->data);  // Delete successor
    }

    return root;
}
```

</CollapsibleSection>

<WarningBox title="Memory Management">

**Винаги `delete` removed nodes в C++!**

Внимавайте за:
- **Memory leaks** (забравени `delete`)
- **Dangling pointers** (използване след `delete`)

</WarningBox>

---

## 7. Complexity Analysis

<InfoBox title="BST Operations Time Complexity">

| Operation | Best/Average (Balanced) | Worst (Skewed) |
|-----------|------------------------|----------------|
| **Search** | O(log n) | O(n) |
| **Insertion** | O(log n) | O(n) |
| **Deletion** | O(log n) | O(n) |
| **Traversal** | O(n) | O(n) |
| **Space** | O(n) | O(n) |

**Ключов фактор:** Tree **height** определя performance!

</InfoBox>

<ComparisonBox
  wrong={{
    title: "❌ Degenerate BST (Skewed)",
    content: (
      <div>
        <pre>{`
Sorted insertion: 1, 2, 3, 4, 5

1
 \\
  2
   \\
    3
     \\
      4
       \\
        5

Height = n
All operations: O(n)
        `}</pre>
        <p className="text-red-600">Деградира до linked list!</p>
      </div>
    )
  }}
  correct={{
    title: "✅ Balanced BST",
    content: (
      <div>
        <pre>{`
Balanced insertion: 3, 1, 5, 2, 4

     3
    / \\
   1   5
    \\ /
    2 4

Height = log n
All operations: O(log n)
        `}</pre>
        <p className="text-green-600">Optimal performance!</p>
      </div>
    )
  }}
/>

---

## 8. Защо Balanced Trees са Важни

### 8.1. The Degeneracy Problem

<WarningBox title="Проблемът с Degeneration">

Ако данните пристигат в **sorted или almost-sorted ред**, BST може да стане **linked list**.

Това води до:
- **Драматично по-бавни операции** - O(n) instead of O(log n)
- **Губене на всички предимства** на tree structure

</WarningBox>

### 8.2. Self-Balancing Trees

<InfoBox title="Решението">

**Production системите изискват predictably бързи операции** дори на unpredictable данни.

**Self-balancing trees** (AVL, Red-Black):
- Извършват **rotations** или "tree surgery" след updates
- Запазват tree height на **O(log n)**
- **Гарантират O(log n) operations** независимо от input order

</InfoBox>

### 8.3. Популярни Self-Balancing Trees

<Grid columns={2}>
  <Card title="AVL Trees">
    **Strict balancing:**
    - Height difference ≤ 1 за всеки node
    - **Faster searches** (more balanced)
    - Slower insertions (more rotations)

    **Използване:** Когато search е critical
  </Card>
  <Card title="Red-Black Trees">
    **Relaxed balancing:**
    - Nodes са червени или черни
    - По-малко rotations
    - **Faster insertions**

    **Използване:** C++ STL (`std::map`, `std::set`)
  </Card>
</Grid>

<CollapsibleSection title="AVL Tree Example" icon="⚖️">

**AVL Balance Factor:** `height(left) - height(right)`

**Allowed values:** `-1, 0, 1`

```
     Balanced (AVL):          Unbalanced:
          10                       10
         / \                      /
        5   15                   5
       / \                      /
      2   7                    2
                              /
     Balance factors:        1
     10: 0                 (violation!)
     5:  0
     15: 0
```

**Rotations** restore balance when violations occur.

</CollapsibleSection>

<CollapsibleSection title="Red-Black Tree Example" icon="🔴⚫">

**Properties:**
1. Every node е червен или черен
2. Root е черен
3. All leaves (NULL) са черни
4. Червен node има черни children
5. All paths от node до leaves имат същия брой черни nodes

```
       10(B)
      /     \
    5(R)   15(B)
   /  \    /
  2(B) 7(B) 12(R)
```

**Гарантира:** Height ≤ 2 log(n + 1)

</CollapsibleSection>

---

## 9. Practical Applications

### 9.1. In-Memory Database Index

<WhyBox title="Бърз Lookup">

**Problem:** Efficiently map keys (напр. имена) към records (напр. телефонни номера).

**Solution:** **Balanced BST** ensures O(log n) lookup и insertion.

</WhyBox>

```cpp
struct Record {
    std::string name;
    std::string phone;
};

class DatabaseIndex {
private:
    std::map<std::string, Record> index;  // Red-Black tree

public:
    void insert(const std::string& name, const Record& record) {
        index[name] = record;  // O(log n)
    }

    Record* search(const std::string& name) {
        auto it = index.find(name);  // O(log n)
        if (it != index.end()) {
            return &(it->second);
        }
        return nullptr;
    }
};
```

### 9.2. Dynamic Sorting (Tree Sort)

<InfoBox title="Tree Sort Algorithm">

1. **Insert** всички елементи в BST
2. **Inorder traversal** за sorted output

**Complexity:**
- **Balanced:** O(n log n)
- **Unbalanced:** O(n²)

</InfoBox>

```cpp
void treeSort(std::vector<int>& arr) {
    Node* root = nullptr;

    // Insert all elements (O(n log n) if balanced)
    for (int val : arr) {
        root = insert(root, val);
    }

    // Inorder traversal for sorted output
    int index = 0;
    function<void(Node*)> inorder = [&](Node* node) {
        if (node == nullptr) return;
        inorder(node->left);
        arr[index++] = node->data;
        inorder(node->right);
    };

    inorder(root);
}
```

<SuccessBox title="Кога да Използвате Tree Sort?">

- Когато данните пристигат **over time**
- Когато трябва да правите **additional queries** (медиани, ranges)
- Когато искате **online sorting** (sort as you insert)

</SuccessBox>

---

## 10. Резюме и Ключови Изводи

<InfoBox title="Основни Точки">

### BST Fundamentals:
- **BST invariant:** Left < Node < Right (рекурсивно)
- Операции: **Insert, Search, Delete, Traverse**
- **Inorder traversal** → sorted output

### Complexity:
- **Balanced trees:** O(log n) за search, insert, delete
- **Skewed trees:** O(n) - деградират до linked list
- **Height е ключов фактор** за performance

### Balanced Trees:
- **AVL Trees:** Strict balancing (fast search)
- **Red-Black Trees:** Relaxed balancing (fast insert)
- **Guarantee:** O(log n) operations независимо от input

### Applications:
- Database indexing
- File systems
- Dynamic sorting
- In-memory indices

</InfoBox>

### Често Срещани Грешки

<WarningBox title="Common Pitfalls">

1. **Ignoring balancing** → води до slow operations
2. **Incorrect deletion** с two children → използвайте inorder successor
3. **Memory leaks** → винаги `delete` nodes
4. **Failing to maintain BST invariant** → проверявайте след modifications
5. **Stack overflow** от deep recursion → използвайте iterative versions

</WarningBox>

### Best Practices

<SuccessBox title="Препоръки">

- **Always validate** BST property след updates
- **Consider balancing** от началото за large datasets
- **Write both recursive and iterative** versions
- **Carefully handle** duplicate keys и edge cases
- **Use STL** (`std::map`, `std::set`) за production code
- **Test with diverse inputs:** random, sorted, reverse-sorted

</SuccessBox>

### Следващи Стъпки

<WhyBox title="Продължете Изучаването">

1. **Study AVL Trees и Red-Black Trees** за production-ready implementations
2. **Explore B-trees и B+ trees** за disk-based databases
3. **Practice on LeetCode/HackerRank** за BST problems
4. **Implement balancing** сами за по-дълбоко разбиране
5. **Compare performance** на balanced vs unbalanced trees

</WhyBox>

---

## 11. Практически Задачи

<CollapsibleSection title="Задача 1: Complete BST Implementation" icon="💻">

Създайте пълна BST имплементация с:
- `insert(int val)`
- `search(int val)`
- `deleteNode(int val)`
- `inorder()`, `preorder()`, `postorder()`
- `height()`
- `isValidBST()`

</CollapsibleSection>

<CollapsibleSection title="Задача 2: Tree Sort Benchmark" icon="⏱️">

1. Имплементирайте tree sort
2. Сравнете с quicksort и mergesort
3. Test с:
   - Random data
   - Sorted data
   - Reverse-sorted data
4. Analyze результатите

</CollapsibleSection>

<CollapsibleSection title="Задача 3: Balance Detection" icon="⚖️">

Напишете функция `int getBalance(Node* root)` която:
- Изчислява balance factor за node
- Идентифицира unbalanced nodes
- Предлага rotations за балансиране

</CollapsibleSection>

<CollapsibleSection title="Задача 4: Range Query" icon="🔍">

Имплементирайте `vector<int> rangeQuery(Node* root, int min, int max)`:
- Връща всички стойности в [min, max]
- Използва BST property за ефективност
- Complexity: O(log n + k), където k е броят results

</CollapsibleSection>

---

## Референции

1. "Data Structures and Algorithms in C++" textbooks
### Balanced Trees Туториали

- [AVL Trees - GeeksforGeeks](https://www.geeksforgeeks.org/avl-tree-set-1-insertion/) - Insertion и балансиране
- [Red-Black Tree - Wikipedia](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree) - Детайлно обяснение
- [Self-Balancing Binary Search Trees](https://www.geeksforgeeks.org/self-balancing-binary-search-trees/) - Общ преглед
- [AVL Tree Tutorial - Programiz](https://www.programiz.com/dsa/avl-tree) - С код и визуализации

### Визуализация и Анимация

- [Visualgo - BST Visualization](https://visualgo.net/en/bst) - Интерактивна визуализация на балансиране
- [AVL Tree Visualization](https://www.cs.usfca.edu/~galles/visualization/AVLtree.html) - Стъпка по стъпка операции
- [Red-Black Tree Visualization](https://www.cs.usfca.edu/~galles/visualization/RedBlack.html) - Визуално представяне

### Имплементация

- [AVL Tree Implementation in C++](https://www.geeksforgeeks.org/avl-tree-set-2-deletion/) - Deletion операции
- [Red-Black Tree Implementation](https://www.programiz.com/dsa/red-black-tree) - Пълна имплементация
- [Balanced BST Operations](https://www.tutorialspoint.com/data_structures_algorithms/avl_tree_algorithm.htm) - Алгоритми

### C++ STL

- [std::map Documentation](https://en.cppreference.com/w/cpp/container/map) - Използва Red-Black Tree
- [std::set Documentation](https://en.cppreference.com/w/cpp/container/set) - Балансирана имплементация
- [C++ Ordered Containers](https://www.geeksforgeeks.org/cpp-stl-map/) - STL map и set

### Академични Ресурси

- [MIT OpenCourseWare - Binary Search Trees](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/) - Академични лекции
- [Stanford CS166 - Balanced Trees](https://web.stanford.edu/class/cs166/) - Advanced Data Structures

### Сравнение и Анализ

- [AVL vs Red-Black Trees](https://stackoverflow.com/questions/13852870/red-black-tree-over-avl-tree) - Stack Overflow дискусия
- [Performance Comparison](https://www.geeksforgeeks.org/red-black-tree-vs-avl-tree/) - Кога да използваме кое

### Практика

- [Balanced Tree Problems - LeetCode](https://leetcode.com/tag/tree/) - Задачи за практика
- [AVL Tree Problems](https://www.hackerrank.com/domains/data-structures?filters%5Bsubdomains%5D%5B%5D=trees) - HackerRank
