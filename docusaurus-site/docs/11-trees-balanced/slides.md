---
title: Балансирани Дървета - AVL и Red-Black Trees
theme: white
highlightTheme: github
transition: slide
controls: true
progress: true
slideNumber: true
---

# ⚖️ Balanced Trees

## AVL и Red-Black Trees

**Лекция 11** • Структури от Данни и Програмиране

---

## 📋 Съдържание

🎯 **Защо Балансиране?**

🔄 **AVL Trees**

🔴 **Red-Black Trees**

⚙️ **Rotations**

📊 **Comparison**

Note:
Балансираните дървета гарантират O(log n) за всички операции!

---

<!-- .slide: data-background="#e7f3ff" -->

# 🎯 Част 1

## Защо Балансиране?

---

## Проблемът с BST

```
Сортиран вход: 1, 2, 3, 4, 5

       1
        \
         2
          \
           3
            \
             4
              \
               5

Height = 5 = O(n)  ❌
```

**Проблем:** Изродено дърво → O(n) операции

Note:
Без балансиране BST може да стане списък!

---

## Решението: Self-Balancing Trees

**Цел:** Автоматично поддържане на height ≈ log n

**Популярни имплементации:**
- **AVL Trees** - strict balancing
- **Red-Black Trees** - relaxed balancing
- **B-Trees** - за databases
- **Splay Trees** - self-adjusting

Note:
Самобалансиращите се дървета гарантират логаритмична височина!

---

<!-- .slide: data-background="#e8f5e9" -->

# Част 2

## AVL Trees

---

## AVL Tree Definition

**Balance Factor:** `BF = height(left) - height(right)`

**AVL Property:** За всеки възел: `-1 ≤ BF ≤ 1`

```
Балансиран AVL:        Небалансиран:
       4                     4
      / \                   /
     2   6                 2
    / \                   /
   1   3                 1

BF(4) = 0              BF(4) = 2  ❌
BF(2) = 0              BF(2) = 1
```

Note:
AVL е стриктно балансирано - разликата в height е максимум 1!

---

## Node Structure

```cpp
struct Node {
    int key;
    int height;  // За изчисляване на BF
    Node* left;
    Node* right;

    Node(int k) : key(k), height(1),
                  left(nullptr), right(nullptr) {}
};

int height(Node* node) {
    return node ? node->height : 0;
}

int getBalance(Node* node) {
    return node ? height(node->left) - height(node->right) : 0;
}
```

Note:
Съхраняваме height в всеки възел за бързо изчисляване на BF!

---

## Rotations - Основа на Балансирането

**Четири случая:**
1. **Left-Left (LL)** → Right Rotation
2. **Right-Right (RR)** → Left Rotation
3. **Left-Right (LR)** → Left + Right Rotation
4. **Right-Left (RL)** → Right + Left Rotation

Note:
Ротациите възстановяват баланса, запазвайки BST свойството!

---

## Right Rotation (LL Case)

```
Before:              After:
    z                  y
   /                  / \
  y        →         x   z
 /
x

Code:
Node* rightRotate(Node* z) {
    Node* y = z->left;
    Node* T2 = y->right;

    y->right = z;
    z->left = T2;

    z->height = max(height(z->left), height(z->right)) + 1;
    y->height = max(height(y->left), height(y->right)) + 1;

    return y;  // New root
}
```

Note:
Right rotation "издига" лявото дете нагоре!

---

## AVL Insert

```cpp
Node* insert(Node* node, int key) {
    // 1. BST insert
    if (!node) return new Node(key);

    if (key < node->key)
        node->left = insert(node->left, key);
    else if (key > node->key)
        node->right = insert(node->right, key);
    else
        return node;

    // 2. Update height
    node->height = 1 + max(height(node->left),
                          height(node->right));

    // 3. Check balance
    int balance = getBalance(node);

    // 4. Fix imbalance with rotations
    // LL Case
    if (balance > 1 && key < node->left->key)
        return rightRotate(node);

    // RR Case
    if (balance < -1 && key > node->right->key)
        return leftRotate(node);

    // LR Case
    if (balance > 1 && key > node->left->key) {
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }

    // RL Case
    if (balance < -1 && key < node->right->key) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }

    return node;
}
```

Note:
Три стъпки: BST insert, update height, fix balance!

---

<!-- .slide: data-background="#fff3e0" -->

# Част 3

## Red-Black Trees

---

## Red-Black Properties

**Цветове:** Всеки възел е RED или BLACK

**Правила:**
1. Root е BLACK
2. Всички листа (NIL) са BLACK
3. RED възел има BLACK деца
4. Всеки път от root до leaf има еднакъв брой BLACK възли

Note:
Тези правила гарантират height ≤ 2 log n!

---

## Red-Black Tree Example

```
          B(10)
         /     \
      R(5)     B(15)
     /   \     /    \
   B(3) B(7) R(12) R(17)

✅ Root е BLACK
✅ Няма два consecutive RED
✅ Всички пътища имат 2 BLACK nodes
```

Note:
Red-Black е по-relaxed от AVL - позволява height до 2 log n!

---

## RB Tree Insert

**Стъпки:**
1. BST insert като RED възел
2. Ако parent е BLACK → готово
3. Ако parent е RED → fix violations:
   - **Case 1:** Uncle е RED → recolor
   - **Case 2:** Uncle е BLACK + zig-zag → rotate
   - **Case 3:** Uncle е BLACK + zig-zig → rotate + recolor

Note:
Red-Black insert е по-сложен от AVL, но по-бърз на практика!

---

<!-- .slide: data-background="#f3e5f5" -->

# Част 4

## Comparison

---

## AVL vs Red-Black Trees

| Характеристика | AVL | Red-Black |
|----------------|-----|-----------|
| **Balance** | Strict (BF ≤ 1) | Relaxed (h ≤ 2 log n) |
| **Height** | ~1.44 log n | ~2 log n |
| **Lookup** | Faster | Slower |
| **Insert** | Slower (more rotations) | Faster |
| **Delete** | Slower | Faster |
| **Use case** | Read-heavy | Write-heavy |

Note:
AVL е по-балансирано, RB е по-бързо за промени!

---

## STL Implementations

**std::set / std::map:**
```cpp
#include <set>
#include <map>

std::set<int> s;  // Red-Black Tree
s.insert(5);
s.insert(3);
s.insert(7);

std::map<string, int> m;  // Red-Black Tree
m["alice"] = 25;
```

**Всички операции: O(log n) guaranteed!**

Note:
STL използва Red-Black Trees за set и map!

---

## When to Use What?

**AVL Trees:**
- Read-heavy workloads
- Lookup-intensive applications
- Когато търсенията са критични

**Red-Black Trees:**
- Balanced read/write
- Insert/delete-intensive
- **STL default choice**

**Regular BST:**
- Educational purposes only
- НЕ използвай в production!

Note:
В реалния свят винаги използвайте балансирани дървета!

---

<!-- .slide: data-background="#e8eaf6" -->

# Обобщение

---

## Complexity Comparison

| Operation | BST (worst) | AVL | Red-Black |
|-----------|-------------|-----|-----------|
| **Search** | O(n) | O(log n) | O(log n) |
| **Insert** | O(n) | O(log n) | O(log n) |
| **Delete** | O(n) | O(log n) | O(log n) |

**Ключова разлика:** Balanced trees **гарантират** log n!

Note:
Балансираните дървета превъзхождат обикновен BST!

---

## Ключови Изводи

**AVL Trees:**
- Strict balance: BF ≤ 1
- Height ≈ 1.44 log n
- По-бързо търсене

**Red-Black Trees:**
- Relaxed balance
- Height ≤ 2 log n
- По-бързи промени
- STL choice

**Rotations:**
- Запазват BST свойството
- Възстановяват баланса
- O(1) операция

Note:
Балансираните дървета са критични за ефективни операции!

---

## Най-добри Практики

✅ **Използвайте STL** (std::set, std::map) в production

✅ **AVL за lookup-heavy** приложения

✅ **Red-Black за balanced** workloads

✅ **Никога plain BST** в production код

✅ **Разбирайте ротациите** за интервюта

Note:
Разбирането на балансираните дървета е критично за интервюта!

---

## Допълнителни Ресурси

**Balanced Trees:**
- [AVL Trees - GeeksforGeeks](https://www.geeksforgeeks.org/avl-tree-set-1-insertion/)
- [Red-Black Trees - Introduction](https://www.geeksforgeeks.org/introduction-to-red-black-tree/)

**Visualizations:**
- [AVL Visualization](https://www.cs.usfca.edu/~galles/visualization/AVLtree.html)
- [Red-Black Visualization](https://www.cs.usfca.edu/~galles/visualization/RedBlack.html)

Note:
Визуализациите помагат да разберете ротациите!

---

<!-- .slide: data-background="#4caf50" -->

# Благодаря за Вниманието!

## Въпроси? 🎓

**Следваща лекция:** Binary Heaps & Heap Sort

Note:
Време за въпроси!
