---
title: "Упражнения"
sidebar_position: 2
slug: exercises
tags: [trees, binary-trees, bst, balanced-trees, avl, recursion, cpp, exercises]
---

import InfoBox from '@site/src/components/InfoBoxes/InfoBox';
import WarningBox from '@site/src/components/InfoBoxes/WarningBox';
import SuccessBox from '@site/src/components/InfoBoxes/SuccessBox';
import WhyBox from '@site/src/components/InfoBoxes/WhyBox';
import CollapsibleSection from '@site/src/components/CollapsibleSection';
import Grid from '@site/src/components/Grid/Grid';
import Card from '@site/src/components/Grid/Card';
import ComparisonBox from '@site/src/components/Comparison/ComparisonBox';
import ExerciseCard from '@site/src/components/Exercise/ExerciseCard';
import ProgressTracker from '@site/src/components/Exercise/ProgressTracker';

# Упражнения: Дървета и Двоични Дървета за Търсене

<ProgressTracker />

---

<InfoBox title="Цел на Упражненията">

Прогресивен набор от 30 упражнения, които покриват:
- Основни дефиниции и терминология на дърветата
- BST свойства и операции
- Имплементация на insertion, search и deletion
- Tree traversal техники
- Complexity analysis
- Balanced trees и реални приложения

**Приблизително време:** 4-6 часа

</InfoBox>

---

## Основно Ниво (Лесни Задачи)

<ExerciseCard
  difficulty="easy"
  timeEstimate="10 min"
  tags={["practice", "exercise"]}
>

### Задача 1: Дефиниция на дърво

**Задача:** Дефинирайте какво прави една структура от данни "дърво" и обяснете защо дърветата се считат за нелинейни структури от данни.


<CollapsibleSection title="Решение" icon="✅">

<SuccessBox title="Решение">

**Дърво** е йерархична структура от данни, която се състои от:
- **Nodes (възли)** свързани чрез **edges (ребра)**
- **Един root node** (коренен възел) на върха
- **Няма cycles** (затворени вериги)
- Всеки node (освен root) има точно **един parent**

**Защо е нелинейна?**

Дърветата са **нелинейни**, защото:
- Елементите **не са подредени последователно** в паметта
- От един node можем да достигнем **множество други nodes** (children)
- За разлика от **линейните структури** (масиви, linked lists), където всеки елемент има **един predecessor и един successor**

**Пример за визуализация:**
```
        50
       /  \
      30   70
     /  \
    20  40
```

В този случай от node 50 можем да достигнем както 30, така и 70 - това е нелинейна организация!

</SuccessBox>

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="easy"
  timeEstimate="10 min"
  tags={["practice", "exercise"]}
>

### Задача 2: Терминология на дървета

**Задача:** Дадено е дървовиден възел със стойност 50, лявото му дете е 30, а дясното му дете е 70. Определете кои от следните твърдения са верни:

a) 30 е родител на 50
b) 30 и 70 са братя и сестри
c) 50 е коренен възел
d) Ако 30 няма деца, то е лист


<CollapsibleSection title="Решение" icon="✅">

<SuccessBox title="Решение">

**Верни твърдения:** **b, c, d**

**Обяснения:**

a) ❌ **Невярно** - 50 е родител на 30, не обратното
b) ✅ **Вярно** - 30 и 70 са siblings (братя и сестри), защото имат общ parent (50)
c) ✅ **Вярно** - 50 е root node, ако не е посочен друг parent
d) ✅ **Вярно** - Node без children се нарича **leaf node**

**Визуализация:**
```
     50  ← root
    /  \
   30  70  ← siblings
```

</SuccessBox>

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="easy"
  timeEstimate="10 min"
  tags={["practice", "exercise"]}
>

### Задача 3: Дефиниция на структура за възел

**Задача:** Попълнете следната C++ struct дефиниция за възел на двоично дърво, който съхранява цели числа:

```cpp
struct TreeNode {
    int _______;
    TreeNode* _______;
    TreeNode* _______;
};
```


<CollapsibleSection title="Решение" icon="✅">

<SuccessBox title="Решение">

```cpp
struct TreeNode {
    int data;         // или value, key и т.н.
    TreeNode* left;   // Pointer към лявото дете
    TreeNode* right;  // Pointer към дясното дете
};
```

**С Constructor:**

```cpp
struct TreeNode {
    int data;
    TreeNode* left;
    TreeNode* right;

    // Constructor за лесно създаване
    TreeNode(int val) : data(val), left(nullptr), right(nullptr) {}
};

// Използване:
TreeNode* root = new TreeNode(50);
root->left = new TreeNode(30);
root->right = new TreeNode(70);
```

**Ключови моменти:**
- `data` съхранява стойността на node-а
- `left` и `right` са pointers към children
- Инициализираме pointers към `nullptr` за празни children

</SuccessBox>

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="easy"
  timeEstimate="10 min"
  tags={["practice", "exercise"]}
>

### Задача 4: Изчисляване на сложност

**Задача:** Изчислете колко сравнения са необходими в най-лошия случай, за да намерите елемент в балансирано BST, съдържащо 1,000 елемента. Покажете работата си.


<CollapsibleSection title="Решение" icon="✅">

<SuccessBox title="Решение">

**Отговор:** **10 сравнения** (или по-точно ⌈log₂(1000)⌉ = 10)

**Изчисление:**

В **балансирано BST**, операциите имат **O(log n)** сложност, където:
- n = брой елементи
- log е logarithm с основа 2

За 1,000 елемента:
```
Height = ⌈log₂(1000)⌉
       = ⌈9.97⌉
       = 10
```

**Защо?**

При всяко сравнение в BST:
- Ако key < current, иди наляво
- Ако key > current, иди надясно
- Ако key == current, намерен!

Във всяка стъпка **елиминираме половината от останалите nodes**, като в binary search в масив.

**Сравнение:**
- **Linear search в масив:** 1,000 сравнения (worst case)
- **BST search (balanced):** 10 сравнения (worst case)

**Огромна разлика!** 🚀

</SuccessBox>

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="easy"
  timeEstimate="10 min"
  tags={["practice", "exercise"]}
>

### Задача 5: Построяване на BST

**Задача:** За следната последователност от стойности, вмъкнати в първоначално празно BST: **50, 30, 70, 20, 40**

Нарисувайте получената структура на дървото.


<CollapsibleSection title="Решение" icon="✅">

<SuccessBox title="Решение">

**Стъпка по стъпка вмъкване:**

```
Стъпка 1: Insert 50 (root)
    50

Стъпка 2: Insert 30 (30 < 50, иди наляво)
    50
   /
  30

Стъпка 3: Insert 70 (70 > 50, иди надясно)
    50
   /  \
  30   70

Стъпка 4: Insert 20 (20 < 50, иди наляво; 20 < 30, иди наляво)
    50
   /  \
  30   70
 /
20

Стъпка 5: Insert 40 (40 < 50, иди наляво; 40 > 30, иди надясно)
    50
   /  \
  30   70
 /  \
20  40
```

**Финално дърво:**
```
        50
       /  \
      30   70
     /  \
    20  40
```

**Проверка на BST property:**
- Node 50: left (20, 30, 40) < 50 < right (70) ✓
- Node 30: left (20) < 30 < right (40) ✓
- Всички nodes удовлетворяват BST свойството!

</SuccessBox>

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="easy"
  timeEstimate="10 min"
  tags={["practice", "exercise"]}
>

### Задача 6: Базов случай за рекурсия

**Задача:** Дадено е `TreeNode* root`, напишете базовия случай за рекурсивна функция за дърво, която проверява дали дървото е празно.


<CollapsibleSection title="Решение" icon="✅">

<SuccessBox title="Решение">

```cpp
// Базов случай: проверка за празно дърво
if (root == nullptr) {
    return; // или return 0, false, и т.н. според нуждите
}
```

**Примери в различни контексти:**

**1. Traversal функция:**
```cpp
void inorder(TreeNode* root) {
    if (root == nullptr) return;  // Base case

    inorder(root->left);
    std::cout << root->data << " ";
    inorder(root->right);
}
```

**2. Count nodes функция:**
```cpp
int countNodes(TreeNode* root) {
    if (root == nullptr) return 0;  // Base case

    return 1 + countNodes(root->left) + countNodes(root->right);
}
```

**3. Search функция:**
```cpp
bool search(TreeNode* root, int key) {
    if (root == nullptr) return false;  // Base case: not found
    if (root->data == key) return true; // Base case: found

    // Recursive case
    if (key < root->data) return search(root->left, key);
    else return search(root->right, key);
}
```

**Ключов момент:**
Винаги **първо проверявайте за `nullptr`** преди да използвате `root->` за избягване на segmentation fault!

</SuccessBox>

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["practice", "exercise"]}
>

### Задача 7: Типове обхождане на дървета

**Задача:** Съпоставете всеки тип обхождане с неговия ред на посещение:

- **Inorder:** _______
- **Preorder:** _______
- **Postorder:** _______

**Опции:** (Root, Left, Right), (Left, Root, Right), (Left, Right, Root)


<CollapsibleSection title="Решение" icon="✅">

<SuccessBox title="Решение">

- **Inorder:** **(Left, Root, Right)** → Произвежда sorted output за BST!
- **Preorder:** **(Root, Left, Right)** → Полезно за копиране на структурата
- **Postorder:** **(Left, Right, Root)** → Полезно за изтриване на дърво

**Визуален пример:**

```
Tree:      4
          / \
         2   6
        / \ / \
       1  3 5  7
```

**Изходи:**
- **Inorder:** 1 2 3 **4** 5 6 7 (sorted!)
- **Preorder:** **4** 2 1 3 6 5 7 (root first)
- **Postorder:** 1 3 2 5 7 6 **4** (root last)

**Code примери:**

```cpp
void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);       // Left
    cout << root->data << " "; // Root
    inorder(root->right);      // Right
}

void preorder(TreeNode* root) {
    if (!root) return;
    cout << root->data << " "; // Root
    preorder(root->left);      // Left
    preorder(root->right);     // Right
}

void postorder(TreeNode* root) {
    if (!root) return;
    postorder(root->left);     // Left
    postorder(root->right);    // Right
    cout << root->data << " "; // Root
}
```

</SuccessBox>

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["practice", "exercise"]}
>

### Задача 8: Свойства на BST

**Задача:** Вярно или Невярно: В BST всички стойности в лявото поддърво трябва да бъдат по-малки от корена, а всички стойности в дясното поддърво трябва да бъдат по-големи от корена. Обяснете защо това свойство е важно.


<CollapsibleSection title="Решение" icon="✅">

<SuccessBox title="Решение">

**Отговор: ВЯРНО** ✅

**BST Property (Invariant):**

За **всеки node** в BST:
- **Left subtree:** Всички стойности **< node.data**
- **Right subtree:** Всички стойности **> node.data**

Това свойство е **рекурсивно** - важи за **всяко поддърво**!

**Защо е важно?**

<Grid columns={2}>
  <Card title="🔍 Ефективно търсене">
    **Binary search в дървото:**
    - При всяка стъпка **елиминираме половината** от възлите
    - **O(log n)** complexity вместо O(n)
  </Card>
  <Card title="📊 Sorted output">
    **Inorder traversal:**
    - Произвежда **sorted последователност**
    - Полезно за sorting и range queries
  </Card>
</Grid>

**Пример за валиден BST:**
```
        8
       / \
      3   10
     / \    \
    1   6   14
       / \  /
      4  7 13

Проверка на 8:
- Left subtree: {1, 3, 4, 6, 7} < 8 ✓
- Right subtree: {10, 13, 14} > 8 ✓
```

**Пример за невалиден BST:**
```
        10
       /  \
      5   15
         /  \
        6   20

Грешка: 6 < 10, но е в right subtree на 10! ❌
```

**Без това свойство:**
- Губим O(log n) search
- Inorder traversal не е sorted
- Деградира до обикновено binary tree

</SuccessBox>

</CollapsibleSection>

</ExerciseCard>

---

## Основно Приложение (Лесно-Средно)

<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["practice", "exercise"]}
>

### Задача 9: Преброяване на възли

**Задача:** Напишете рекурсивна функция в C++, за да преброите общия брой възли в двоично дърво:

```cpp
int countNodes(TreeNode* root) {
    // Вашият код тук
}
```


<CollapsibleSection title="Решение" icon="✅">

<SuccessBox title="Решение">

```cpp
int countNodes(TreeNode* root) {
    // Base case: празно дърво
    if (root == nullptr) {
        return 0;
    }

    // Recursive case:
    // 1 (текущ node) + count от left + count от right
    return 1 + countNodes(root->left) + countNodes(root->right);
}
```

**Обяснение:**

**Рекурсивна логика:**
1. Ако node е `nullptr` → връщай 0 (няма nodes)
2. Иначе: **1 (текущия node)** + count от left subtree + count от right subtree

**Trace пример:**

```
Tree:      4
          / \
         2   6
        /   / \
       1   5   7

countNodes(4):
  = 1 + countNodes(2) + countNodes(6)
  = 1 + [1 + countNodes(1) + countNodes(null)] + [1 + countNodes(5) + countNodes(7)]
  = 1 + [1 + 1 + 0] + [1 + 1 + 1]
  = 1 + 2 + 3
  = 6 nodes
```

**Complexity:**
- **Time:** O(n) - посещаваме всеки node веднъж
- **Space:** O(h) - recursion depth, където h е height на дървото

**Алтернативна iterative версия (с queue - BFS):**

```cpp
int countNodesIterative(TreeNode* root) {
    if (root == nullptr) return 0;

    std::queue<TreeNode*> q;
    q.push(root);
    int count = 0;

    while (!q.empty()) {
        TreeNode* current = q.front();
        q.pop();
        count++;

        if (current->left) q.push(current->left);
        if (current->right) q.push(current->right);
    }

    return count;
}
```

</SuccessBox>

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["practice", "exercise"]}
>

### Задача 10: Свойства на inorder обхождането

**Задача:** Дадено е BST свойството, обяснете защо inorder обхождането на BST произвежда стойности във възходящ ред. Предоставете прост пример с 3-възлово дърво.


<CollapsibleSection title="Решение" icon="✅">

<SuccessBox title="Решение">

**Защо Inorder → Sorted Output?**

**Inorder traversal order:** **Left → Root → Right**

**BST property:** **Left < Root < Right**

**Комбинирайки двете:**
1. Първо посещаваме **left subtree** (всички стойности < root)
2. След това посещаваме **root**
3. Накрая посещаваме **right subtree** (всички стойности > root)

Резултатът е **naturally sorted sequence**!

**Пример с 3-node BST:**

```
Tree:    5
        / \
       3   7
```

**Inorder traversal:**
```cpp
inorder(5):
    inorder(3):              // Visit left subtree
        inorder(null)        // Left of 3
        print 3              // Root
        inorder(null)        // Right of 3
    print 5                  // Visit root
    inorder(7):              // Visit right subtree
        inorder(null)        // Left of 7
        print 7              // Root
        inorder(null)        // Right of 7

Output: 3 5 7  (sorted!)
```

**По-сложен пример:**

```
Tree:        8
            / \
           3   10
          / \    \
         1   6   14
            / \
           4   7

Inorder: 1 3 4 6 7 8 10 14  (ascending order!)
```

**Обяснение:**
- Започваме с **най-левия node** (1) - най-малката стойност
- Рекурсивно обхождаме **left → root → right**
- Завършваме с **най-десния node** (14) - най-голямата стойност

**Code:**
```cpp
void inorder(TreeNode* root) {
    if (root == nullptr) return;

    inorder(root->left);           // All values < root
    std::cout << root->data << " "; // Current value
    inorder(root->right);          // All values > root
}
```

**Приложение:** Този property прави BST отличен за **tree sort** алгоритъм!

</SuccessBox>

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["practice", "exercise"]}
>

### Задача 11: Имплементация на търсене

**Задача:** Имплементирайте функция за търсене в BST, която връща true, ако стойността съществува, и false в противен случай:

```cpp
bool search(Node* root, int key) {
    // Вашият код тук
}
```


<CollapsibleSection title="Решение" icon="✅">

<SuccessBox title="Решение">

**Рекурсивна версия:**

```cpp
bool search(Node* root, int key) {
    // Base case 1: празно дърво - not found
    if (root == nullptr) {
        return false;
    }

    // Base case 2: намерен key!
    if (root->key == key) {
        return true;
    }

    // Recursive cases: search left или right
    if (key < root->key) {
        return search(root->left, key);  // Search left
    } else {
        return search(root->right, key); // Search right
    }
}
```

**Итеративна версия (по-ефективна за памет):**

```cpp
bool searchIterative(Node* root, int key) {
    while (root != nullptr) {
        if (root->key == key) {
            return true;  // Found!
        }

        if (key < root->key) {
            root = root->left;  // Go left
        } else {
            root = root->right; // Go right
        }
    }

    return false;  // Not found
}
```

**Trace пример:**

```
Tree:        8
            / \
           3   10
          / \    \
         1   6   14

Search for 6:
Step 1: At 8, 6 < 8 → go left
Step 2: At 3, 6 > 3 → go right
Step 3: At 6, 6 == 6 → FOUND! Return true

Search for 5:
Step 1: At 8, 5 < 8 → go left
Step 2: At 3, 5 > 3 → go right
Step 3: At 6, 5 < 6 → go left
Step 4: At nullptr → NOT FOUND! Return false
```

**Complexity:**
- **Time:**
  - Balanced tree: **O(log n)**
  - Skewed tree: **O(n)**
- **Space:**
  - Recursive: O(h) за call stack
  - Iterative: **O(1)** ✓ (по-добра!)

**Защо работи?**

BST property гарантира, че:
- Ако key < current, всички nodes в right subtree са > key → skip right!
- Ако key > current, всички nodes в left subtree са < key → skip left!

Това позволява **binary search** на дървото!

</SuccessBox>

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="medium"
  timeEstimate="15 min"
  tags={["practice", "exercise"]}
>

### Задача 12: Анализ на височината на дървото

**Задача:** За дърво с височина h, какъв е:
- Минималният възможен брой възли?
- Максималният възможен брой възли?

Изразете отговорите си чрез h и обяснете своите разсъждения.


<CollapsibleSection title="Решение" icon="✅">

<SuccessBox title="Решение">

**1. Минимален брой възли: h + 1**

**Обяснение:**
- Skewed tree (linked list shape)
- Всяко ниво има **точно 1 node**
- Height = h → h + 1 nodes (включително root)

**Пример за h = 3:**
```
1           Level 0 (root)
 \
  2         Level 1
   \
    3       Level 2
     \
      4     Level 3

Height = 3, Nodes = 4 = h + 1
```

**2. Максимален брой възли: 2^(h+1) - 1**

**Обяснение:**
- Complete binary tree (пълно на всяко ниво)
- Всяко ниво i има **2^i nodes**
- Total = 2^0 + 2^1 + 2^2 + ... + 2^h = **2^(h+1) - 1**

**Пример за h = 2:**
```
      1           Level 0: 2^0 = 1 node
     / \
    2   3         Level 1: 2^1 = 2 nodes
   / \ / \
  4  5 6  7       Level 2: 2^2 = 4 nodes

Height = 2, Nodes = 7 = 2^3 - 1 = 2^(h+1) - 1
```

**Формули:**

| Характеристика | Формула | Пример (h=3) |
|---------------|---------|--------------|
| **Min nodes** | h + 1 | 4 |
| **Max nodes** | 2^(h+1) - 1 | 15 |

**Обратната връзка:**

Ако имаме **n nodes**:
- **Best case height (balanced):** h = log₂(n)
- **Worst case height (skewed):** h = n - 1

**Защо е важно?**

- **Balanced trees** имат **O(log n) operations**
- **Skewed trees** имат **O(n) operations**
- **Height drives performance!**

**Визуализация:**

```
Min nodes (h=3):    Max nodes (h=3):
1                         1
 \                      /   \
  2                    2     3
   \                  / \   / \
    3                4  5  6   7
     \              / \ / \ / \ / \
      4            8 9 10 11 12 13 14 15

4 nodes             15 nodes
```

</SuccessBox>

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["practice", "exercise"]}
>

### Задача 13: Построяване и обхождане на BST

**Задача:** Дадена е следната последователност от вмъквания в BST: **10, 5, 15, 3, 7, 12, 20**

- Нарисувайте полученото дърво
- Покажете изхода на inorder обхождане
- Покажете изхода на preorder обхождане


<CollapsibleSection title="Решение" icon="✅">

<SuccessBox title="Решение">

**1. Построяване на BST:**

```
Insert последователност: 10, 5, 15, 3, 7, 12, 20

Стъпка 1: Insert 10 (root)
    10

Стъпка 2: Insert 5 (5 < 10, left)
    10
   /
  5

Стъпка 3: Insert 15 (15 > 10, right)
    10
   /  \
  5   15

Стъпка 4: Insert 3 (3 < 10, left; 3 < 5, left)
    10
   /  \
  5   15
 /
3

Стъпка 5: Insert 7 (7 < 10, left; 7 > 5, right)
    10
   /  \
  5   15
 / \
3   7

Стъпка 6: Insert 12 (12 > 10, right; 12 < 15, left)
    10
   /  \
  5   15
 / \  /
3  7 12

Стъпка 7: Insert 20 (20 > 10, right; 20 > 15, right)
    10
   /  \
  5   15
 / \  / \
3  7 12 20
```

**Финално дърво:**
```
        10
       /  \
      5   15
     / \  / \
    3  7 12 20
```

**2. Inorder Traversal (Left → Root → Right):**

```cpp
void inorder(Node* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->key << " ";
    inorder(root->right);
}
```

**Trace:**
```
inorder(10):
  inorder(5):
    inorder(3): print 3
    print 5
    inorder(7): print 7
  print 10
  inorder(15):
    inorder(12): print 12
    print 15
    inorder(20): print 20
```

**Inorder output:** **3 5 7 10 12 15 20** (sorted! ✓)

**3. Preorder Traversal (Root → Left → Right):**

```cpp
void preorder(Node* root) {
    if (!root) return;
    cout << root->key << " ";
    preorder(root->left);
    preorder(root->right);
}
```

**Trace:**
```
preorder(10):
  print 10
  preorder(5):
    print 5
    preorder(3): print 3
    preorder(7): print 7
  preorder(15):
    print 15
    preorder(12): print 12
    preorder(20): print 20
```

**Preorder output:** **10 5 3 7 15 12 20**

**Сравнение:**

| Traversal | Output | Забележка |
|-----------|--------|-----------|
| **Inorder** | 3 5 7 10 12 15 20 | Sorted! Полезно за printing в ред |
| **Preorder** | 10 5 3 7 15 12 20 | Root first. Полезно за copy tree |

</SuccessBox>

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["practice", "exercise"]}
>

### Задача 14: Валидация на BST

**Задача:** Определете кое от следните двоични дървета е валидно BST. Обяснете защо невалидните дървета не отговарят на BST свойството:

```
Дърво A:     Дърво B:     Дърво C:
    10          10          10
   /  \        /  \        /  \
  5   15      5   15      5   15
 / \          / \  / \       /
3   7        2  6 12 20     12
```


<CollapsibleSection title="Решение" icon="✅">

<SuccessBox title="Решение">

**Дърво A: ✅ ВАЛИДЕН BST**

```
    10
   /  \
  5   15
 / \
3   7
```

**Проверка:**
- Node 10: left {3, 5, 7} < 10 < right {15} ✓
- Node 5: left {3} < 5 < right {7} ✓
- Node 15: no children ✓

**Всички nodes удовлетворяват BST property!**

---

**Дърво B: ✅ ВАЛИДЕН BST**

```
    10
   /  \
  5   15
 / \  / \
2  6 12 20
```

**Проверка:**
- Node 10: left {2, 5, 6} < 10 < right {12, 15, 20} ✓
- Node 5: left {2} < 5 < right {6} ✓
- Node 15: left {12} < 15 < right {20} ✓

**Всички nodes удовлетворяват BST property!**

---

**Дърво C: ❌ НЕВАЛИДЕН BST**

```
    10
   /  \
  5   15
     /
    12
```

**Проблем:**

Node **12** е в **right subtree на 10**, което означава, че трябва да е **> 10** ✓

НО! Node **12** е също в **left subtree на 15**, което означава, че трябва да е **< 15** ✓

**Но също така** node 12 е в **LEFT child на root node 5**?

Всъщност, нека прецизираме представянето:

```
Дърво C (правилна интерпретация):
    10
   /  \
  5   15
     /
    12
```

Ако 12 е left child на 15, това **Е ВАЛИДНО**:
- 12 > 10 ✓
- 12 < 15 ✓

**Възможна интерпретация с грешка:**

```
    10
   /  \
  5   15
 /
12   (грешка: 12 като left child на 5)
```

Ако 12 е left child на 5:
- 12 > 5, но е в left subtree! ❌
- **Violation на BST property**

**Ключов урок:**

BST property трябва да е **рекурсивно вярно** за **всички descendants**, не само immediate children!

**Проверка на BST (code):**

```cpp
bool isValidBST(TreeNode* root, long min = LONG_MIN, long max = LONG_MAX) {
    if (root == nullptr) return true;

    // Проверка на текущия node
    if (root->val <= min || root->val >= max) {
        return false;
    }

    // Рекурсивна проверка с constraints
    return isValidBST(root->left, min, root->val) &&
           isValidBST(root->right, root->val, max);
}
```

</SuccessBox>

</CollapsibleSection>

</ExerciseCard>

---

## Междинен Анализ (Средно Ниво)

<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["practice", "exercise"]}
>

### Задача 15: Пълна функция за вмъкване

**Задача:** Попълнете функцията за вмъкване в BST. Попълнете липсващите условия:

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


<CollapsibleSection title="Решение" icon="✅">

<SuccessBox title="Решение">

```cpp
Node* insert(Node* root, int key) {
    if (!root) return new Node(key);

    if (key < root->key)              // Condition 1
        root->left = insert(root->left, key);
    else if (key > root->key)         // Condition 2
        root->right = insert(root->right, key);
    // else: duplicate key, можем да игнорираме или handle

    return root;
}
```

**Обяснение:**

**Condition 1:** `key < root->key`
- Ако новата стойност е **по-малка** от текущия node
- Вмъкни в **left subtree**

**Condition 2:** `key > root->key`
- Ако новата стойност е **по-голяма** от текущия node
- Вмъкни в **right subtree**

**Handling duplicates (optional):**

**Option A: Ignore duplicates**
```cpp
Node* insert(Node* root, int key) {
    if (!root) return new Node(key);

    if (key < root->key)
        root->left = insert(root->left, key);
    else if (key > root->key)
        root->right = insert(root->right, key);
    // else: key == root->key, do nothing

    return root;
}
```

**Option B: Allow duplicates (consistent placement)**
```cpp
Node* insert(Node* root, int key) {
    if (!root) return new Node(key);

    if (key <= root->key)  // <= вместо <
        root->left = insert(root->left, key);
    else
        root->right = insert(root->right, key);

    return root;
}
```

**Пълен пример с struct:**

```cpp
struct Node {
    int key;
    Node *left, *right;

    Node(int k) : key(k), left(nullptr), right(nullptr) {}
};

Node* insert(Node* root, int key) {
    // Base case: празна позиция
    if (root == nullptr) {
        return new Node(key);
    }

    // Recursive insertion
    if (key < root->key) {
        root->left = insert(root->left, key);
    } else if (key > root->key) {
        root->right = insert(root->right, key);
    }
    // Duplicate: игнорираме

    return root;
}

// Използване:
int main() {
    Node* root = nullptr;
    root = insert(root, 50);
    root = insert(root, 30);
    root = insert(root, 70);
    root = insert(root, 20);
    root = insert(root, 40);

    // Tree:
    //      50
    //     /  \
    //    30   70
    //   /  \
    //  20  40
}
```

</SuccessBox>

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["practice", "exercise"]}
>

### Задача 16: Проблем с дегенерация

**Задача:** Обяснете защо BST, което получава данни в сортиран ред, дегенерира в свързан списък. Каква е времевата сложност на търсенето в такова дегенерирало дърво?


<CollapsibleSection title="Решение" icon="✅">

<WarningBox title="Решение: Degeneracy Problem">

**Защо се случва дегенерация?**

Когато вмъкваме данни в **сортиран ред** (ascending или descending), BST винаги добавя nodes на **същата страна**.

**Пример: Insert 1, 2, 3, 4, 5**

```
Стъпка 1: Insert 1 (root)
1

Стъпка 2: Insert 2 (2 > 1, go right)
1
 \
  2

Стъпка 3: Insert 3 (3 > 1, go right; 3 > 2, go right)
1
 \
  2
   \
    3

Стъпка 4: Insert 4
1
 \
  2
   \
    3
     \
      4

Стъпка 5: Insert 5
1
 \
  2
   \
    3
     \
      4
       \
        5
```

**Резултат: Skewed tree (linked list)!**

**Защо е проблем?**

<Grid columns={2}>
  <Card title="❌ Degenerate BST">
    **Height = n**

    ```
    1
     \
      2
       \
        3
         \
          4
           \
            5
    ```

    - Search: **O(n)**
    - Insert: **O(n)**
    - Delete: **O(n)**
  </Card>
  <Card title="✅ Balanced BST">
    **Height = log n**

    ```
         3
        / \
       2   4
      /     \
     1       5
    ```

    - Search: **O(log n)**
    - Insert: **O(log n)**
    - Delete: **O(log n)**
  </Card>
</Grid>

**Search Complexity в Degenerate Tree:**

**Времева сложност:** **O(n)**

**Защо?**
- Трябва да проверим **всеки node** в worst case
- Същото като търсене в **unsorted linked list**
- **Губим всички предимства на BST!**

**Пример: Search for 5 в degenerate tree:**
```
Start at 1 → go right
At 2 → go right
At 3 → go right
At 4 → go right
At 5 → FOUND!

Total comparisons: 5 (= n)
```

**В balanced BST за същите 5 nodes:**
```
Start at 3 → 5 > 3, go right
At 4 → 5 > 4, go right
At 5 → FOUND!

Total comparisons: 3 (= log₂ 5 ≈ 2.3, rounded up)
```

**Решение:**

**Self-balancing trees:**
- **AVL Trees:** Strict balancing (rotations)
- **Red-Black Trees:** Relaxed balancing
- **Guarantee:** O(log n) независимо от input order!

**Визуална сравнение:**

| Input Order | Naive BST | AVL/Red-Black BST |
|-------------|-----------|-------------------|
| Random | O(log n) avg | O(log n) guaranteed |
| Sorted | **O(n) worst** | O(log n) guaranteed |
| Reverse sorted | **O(n) worst** | O(log n) guaranteed |

**Ключов извод:**

Naive BST без balancing е **unsuitable за production** системи, където input order е **непредсказуем**!

</WarningBox>

</CollapsibleSection>

</ExerciseCard>

---

<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["practice", "exercise"]}
>

### Задача 17: Намиране на минимална стойност

**Задача:** Напишете функция, за да намерите минималната стойност в BST:

```cpp
Node* minValue(Node* node) {
    // Вашият код тук
}
```

Обяснете защо вашият подход работи, базирайки се на BST свойството.


<CollapsibleSection title="Решение" icon="✅">

<SuccessBox title="Решение">

**Iterative Solution (по-ефективна):**

```cpp
Node* minValue(Node* node) {
    // Празно дърво
    if (node == nullptr) {
        return nullptr;
    }

    // Отиваме най-наляво възможното
    while (node->left != nullptr) {
        node = node->left;
    }

    return node;
}
```

**Recursive Solution:**

```cpp
Node* minValueRecursive(Node* node) {
    // Base case: празно дърво
    if (node == nullptr) {
        return nullptr;
    }

    // Base case: no left child → current е min
    if (node->left == nullptr) {
        return node;
    }

    // Recursive case: търсим в left subtree
    return minValueRecursive(node->left);
}
```

**Обяснение (защо работи):**

**BST Property:**
- Всички nodes в **left subtree** са **< current node**
- Всички nodes в **right subtree** са **> current node**

**Следствие:**
- **Най-малката стойност** е винаги в **крайната лява позиция**
- Просто следваме **left pointers** до края!

**Визуален пример:**

```
Tree:        8
            / \
           3   10
          / \    \
         1   6   14
            / \  /
           4  7 13

minValue(8):
  8 → left to 3
  3 → left to 1
  1 → left is nullptr → MINIMUM!

Result: 1
```

**Complexity:**
- **Time:** O(h), където h е height
  - Balanced: O(log n)
  - Skewed: O(n)
- **Space:**
  - Iterative: **O(1)** ✓
  - Recursive: O(h)

**Dual function: Maximum value**

```cpp
Node* maxValue(Node* node) {
    if (node == nullptr) return nullptr;

    // Отиваме най-надясно възможното
    while (node->right != nullptr) {
        node = node->right;
    }

    return node;
}
```

**Връщане на стойността (вместо node):**

```cpp
int minValueInt(Node* node) {
    if (node == nullptr) {
        throw std::runtime_error("Empty tree!");
    }

    while (node->left != nullptr) {
        node = node->left;
    }

    return node->key;
}
```

**Използване:**

```cpp
Node* minNode = minValue(root);
if (minNode != nullptr) {
    std::cout << "Minimum value: " << minNode->key << std::endl;
} else {
    std::cout << "Empty tree" << std::endl;
}
```

**Важно приложение:**

Тази функция е **критична за deletion operation** когато node има two children (намираме inorder successor)!

</SuccessBox>

</CollapsibleSection>

</ExerciseCard>

---

## Напреднали Операции (Трудно Ниво)

<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["practice", "exercise"]}
>

### Задача 18: Пълна функция за изтриване

**Задача:** Имплементирайте пълната функция за изтриване в BST, която обработва всички три случая (лист, едно дете, две деца):

```cpp
Node* deleteNode(Node* root, int key) {
    // Вашата пълна имплементация тук
}
```


<CollapsibleSection title="Решение" icon="✅">

<SuccessBox title="Решение">

**Complete Deletion Implementation:**

```cpp
struct Node {
    int key;
    Node *left, *right;
    Node(int k) : key(k), left(nullptr), right(nullptr) {}
};

// Helper function: намери минималния node (най-ляв)
Node* minValue(Node* node) {
    while (node->left != nullptr) {
        node = node->left;
    }
    return node;
}

Node* deleteNode(Node* root, int key) {
    // Base case: празно дърво
    if (root == nullptr) {
        return nullptr;
    }

    // Намери node-а за изтриване
    if (key < root->key) {
        // Key е в left subtree
        root->left = deleteNode(root->left, key);
    } else if (key > root->key) {
        // Key е в right subtree
        root->right = deleteNode(root->right, key);
    } else {
        // Node намерен! Обработваме трите случая:

        // CASE 1: Node без children (leaf)
        if (root->left == nullptr && root->right == nullptr) {
            delete root;
            return nullptr;
        }

        // CASE 2a: Node с само right child
        if (root->left == nullptr) {
            Node* temp = root->right;
            delete root;
            return temp;
        }

        // CASE 2b: Node с само left child
        if (root->right == nullptr) {
            Node* temp = root->left;
            delete root;
            return temp;
        }

        // CASE 3: Node с TWO children
        // Намираме inorder successor (min в right subtree)
        Node* successor = minValue(root->right);

        // Копираме successor data в current node
        root->key = successor->key;

        // Изтриваме successor (той има най-много едно дете)
        root->right = deleteNode(root->right, successor->key);
    }

    return root;
}
```

**Detailed Explanation по случаи:**

**CASE 1: Leaf Node (No Children)**

```
Before:    10              After:     10
          /  \                       /
         5   15                     5
        /
       3  ← Delete

Simply: delete node, return nullptr
```

```cpp
if (root->left == nullptr && root->right == nullptr) {
    delete root;
    return nullptr;
}
```

**CASE 2: One Child**

```
Before:    10              After:     10
          /  \                       /  \
         5   15                     3   15
        /  \
       3   7  ← Delete (has one child: 3)

Replace node with its child
```

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

**CASE 3: Two Children**

```
Before:        10  ← Delete
              /  \
             5   15
            / \  / \
           3  7 12 20

Inorder successor of 10 = 12 (min в right subtree)

Step 1: Replace 10 with 12:
              12
             /  \
            5   15
           / \  / \
          3  7 12 20

Step 2: Delete original 12:
              12
             /  \
            5   15
           / \    \
          3  7    20
```

```cpp
// Намери inorder successor
Node* successor = minValue(root->right);

// Replace current със successor
root->key = successor->key;

// Delete successor
root->right = deleteNode(root->right, successor->key);
```

**Защо Inorder Successor?**

- **Inorder successor** е **следващата по-голяма стойност**
- Гарантира **BST property** след replacement
- Винаги има **най-много едно child** (right), което опростява deletion

**Alternative: Inorder Predecessor**

```cpp
// Alternative: използвайте inorder predecessor
// (max в left subtree)
Node* maxValue(Node* node) {
    while (node->right != nullptr) {
        node = node->right;
    }
    return node;
}

// В delete function за case 3:
Node* predecessor = maxValue(root->left);
root->key = predecessor->key;
root->left = deleteNode(root->left, predecessor->key);
```

**Full Example с Test:**

```cpp
#include <iostream>

// ... (Node struct и functions от горе)

void inorder(Node* root) {
    if (root == nullptr) return;
    inorder(root->left);
    std::cout << root->key << " ";
    inorder(root->right);
}

int main() {
    Node* root = nullptr;
    root = insert(root, 10);
    root = insert(root, 5);
    root = insert(root, 15);
    root = insert(root, 3);
    root = insert(root, 7);
    root = insert(root, 12);
    root = insert(root, 20);

    std::cout << "Original: ";
    inorder(root);  // 3 5 7 10 12 15 20
    std::cout << std::endl;

    root = deleteNode(root, 10);
    std::cout << "After delete 10: ";
    inorder(root);  // 3 5 7 12 15 20
    std::cout << std::endl;

    return 0;
}
```

**Complexity:**
- **Time:** O(h), където h е height
  - Balanced: O(log n)
  - Skewed: O(n)
- **Space:** O(h) за recursion stack

</SuccessBox>

</CollapsibleSection>

</ExerciseCard>

---

## Приложение и Синтез

<ExerciseCard
  difficulty="hard"
  timeEstimate="20 min"
  tags={["practice", "exercise"]}
>

### Задача 19: Приложение за телефонен указател

**Задача:** Проектирайте прост телефонен указател в паметта, използвайки BST, където имената са ключове, а телефонните номера са стойности. Имплементирайте:
- Вмъкване на контакт
- Търсене на контакт
- Изтриване на контакт
- Отпечатване на всички контакти в азбучен ред


<CollapsibleSection title="Решение" icon="✅">

<SuccessBox title="Решение">

**Complete Phone Book Implementation:**

```cpp
#include <iostream>
#include <string>

struct Contact {
    std::string name;
    std::string phone;
    Contact *left, *right;

    Contact(const std::string& n, const std::string& p)
        : name(n), phone(p), left(nullptr), right(nullptr) {}
};

class PhoneBook {
private:
    Contact* root;

    // Helper: Insert
    Contact* insertHelper(Contact* node, const std::string& name, const std::string& phone) {
        if (node == nullptr) {
            return new Contact(name, phone);
        }

        if (name < node->name) {
            node->left = insertHelper(node->left, name, phone);
        } else if (name > node->name) {
            node->right = insertHelper(node->right, name, phone);
        } else {
            // Duplicate name: update phone
            node->phone = phone;
        }

        return node;
    }

    // Helper: Search
    Contact* searchHelper(Contact* node, const std::string& name) {
        if (node == nullptr || node->name == name) {
            return node;
        }

        if (name < node->name) {
            return searchHelper(node->left, name);
        } else {
            return searchHelper(node->right, name);
        }
    }

    // Helper: Find min (за deletion)
    Contact* findMin(Contact* node) {
        while (node->left != nullptr) {
            node = node->left;
        }
        return node;
    }

    // Helper: Delete
    Contact* deleteHelper(Contact* node, const std::string& name) {
        if (node == nullptr) return nullptr;

        if (name < node->name) {
            node->left = deleteHelper(node->left, name);
        } else if (name > node->name) {
            node->right = deleteHelper(node->right, name);
        } else {
            // Node found!

            // Case 1 & 2: Leaf or one child
            if (node->left == nullptr) {
                Contact* temp = node->right;
                delete node;
                return temp;
            }
            if (node->right == nullptr) {
                Contact* temp = node->left;
                delete node;
                return temp;
            }

            // Case 3: Two children
            Contact* successor = findMin(node->right);
            node->name = successor->name;
            node->phone = successor->phone;
            node->right = deleteHelper(node->right, successor->name);
        }

        return node;
    }

    // Helper: Inorder print
    void printHelper(Contact* node) {
        if (node == nullptr) return;

        printHelper(node->left);
        std::cout << node->name << ": " << node->phone << std::endl;
        printHelper(node->right);
    }

    // Helper: Cleanup
    void destroyTree(Contact* node) {
        if (node == nullptr) return;
        destroyTree(node->left);
        destroyTree(node->right);
        delete node;
    }

public:
    PhoneBook() : root(nullptr) {}

    ~PhoneBook() {
        destroyTree(root);
    }

    // 1. Insert contact
    void insert(const std::string& name, const std::string& phone) {
        root = insertHelper(root, name, phone);
        std::cout << "Added/Updated: " << name << std::endl;
    }

    // 2. Search for contact
    std::string search(const std::string& name) {
        Contact* result = searchHelper(root, name);
        if (result != nullptr) {
            return result->phone;
        }
        return "Not found";
    }

    // 3. Delete contact
    void remove(const std::string& name) {
        root = deleteHelper(root, name);
        std::cout << "Deleted: " << name << std::endl;
    }

    // 4. Print all contacts (alphabetical order)
    void printAll() {
        std::cout << "\n=== Phone Book ===" << std::endl;
        printHelper(root);
        std::cout << "==================\n" << std::endl;
    }
};

// Test program
int main() {
    PhoneBook book;

    // Insert contacts
    book.insert("Alice", "555-1234");
    book.insert("Bob", "555-5678");
    book.insert("Charlie", "555-9012");
    book.insert("David", "555-3456");
    book.insert("Eve", "555-7890");

    // Print all (should be alphabetical)
    book.printAll();

    // Search
    std::cout << "Alice's phone: " << book.search("Alice") << std::endl;
    std::cout << "Frank's phone: " << book.search("Frank") << std::endl;

    // Update
    book.insert("Alice", "555-0000");  // Update Alice's number
    std::cout << "Alice's new phone: " << book.search("Alice") << std::endl;

    // Delete
    book.remove("Bob");
    book.printAll();

    return 0;
}
```

**Output:**

```
Added/Updated: Alice
Added/Updated: Bob
Added/Updated: Charlie
Added/Updated: David
Added/Updated: Eve

=== Phone Book ===
Alice: 555-1234
Bob: 555-5678
Charlie: 555-9012
David: 555-3456
Eve: 555-7890
==================

Alice's phone: 555-1234
Frank's phone: Not found
Added/Updated: Alice
Alice's new phone: 555-0000
Deleted: Bob

=== Phone Book ===
Alice: 555-0000
Charlie: 555-9012
David: 555-3456
Eve: 555-7890
==================
```

**Features:**

1. **Insert:** O(log n) в balanced BST
2. **Search:** O(log n) в balanced BST
3. **Delete:** O(log n) в balanced BST
4. **Print all alphabetically:** O(n) чрез inorder traversal

**Improvements (Advanced):**

```cpp
// Using C++ STL map (Red-Black Tree internally)
#include <map>

class PhoneBookSTL {
private:
    std::map<std::string, std::string> contacts;

public:
    void insert(const std::string& name, const std::string& phone) {
        contacts[name] = phone;
    }

    std::string search(const std::string& name) {
        auto it = contacts.find(name);
        return (it != contacts.end()) ? it->second : "Not found";
    }

    void remove(const std::string& name) {
        contacts.erase(name);
    }

    void printAll() {
        for (const auto& [name, phone] : contacts) {
            std::cout << name << ": " << phone << std::endl;
        }
    }
};
```

**Comparison:**

| Feature | Custom BST | STL map |
|---------|-----------|---------|
| Implementation | Manual | Built-in |
| Balancing | Not guaranteed | Auto-balanced (Red-Black) |
| Complexity | O(n) worst | **O(log n) guaranteed** |
| Control | Full control | Less control |
| Learning | Educational | Production-ready |

</SuccessBox>

</CollapsibleSection>

</ExerciseCard>

---

## Съвети за Решаване

<InfoBox title="Подход към Упражненията">

**Стратегии за успех:**
- **Започнете от лесните задачи** и напредвайте постепенно
- **Нарисувайте дървета на хартия** за визуализация на структурата
- **Винаги проверявайте BST инварианта** след всяка операция
- **Тествайте с гранични случаи:** празно дърво, един възел, дегенерирано дърво
- **Trace recursive calls** на хартия за по-добро разбиране

</InfoBox>

<WarningBox title="Често Срещани Грешки">

**Избягвайте тези pitfalls:**
- Забравяне на базовия случай в рекурсивните функции
- Неправилна обработка на случая с две деца при изтриване
- Проверка само на непосредствените деца при валидиране на BST
- Пропускане на управлението на паметта (течове, висящи указатели)
- Stack overflow от дълбока рекурсия в skewed trees

</WarningBox>

<SuccessBox title="Best Practices">

**За production-quality code:**
- Използвайте **smart pointers** (`std::unique_ptr`) ако е възможно
- Имплементирайте **both recursive и iterative** версии
- **Test extensively:** edge cases, random inputs, sorted inputs
- **Visualize** дървото при debugging
- **Consider balancing** от началото за critical applications

</SuccessBox>

---

## Заключение

<WhyBox title="Ключови изводи">

След завършване на тези упражнения, трябва да можете да:

1. ✅ **Разберете BST структурата** и property
2. ✅ **Имплементирате core operations:** insert, search, delete
3. ✅ **Analyze complexity:** best/average/worst cases
4. ✅ **Recognize degeneracy** и мотивацията за balancing
5. ✅ **Apply BSTs** за real-world problems

**Следващи стъпки:**
- Изучете **AVL Trees** и **Red-Black Trees**
- Решавайте **BST problems** на LeetCode/HackerRank
- Имплементирайте **self-balancing** mechanisms
- Explore **B-trees** за database applications

</WhyBox>

---

**Край на Упражненията**
