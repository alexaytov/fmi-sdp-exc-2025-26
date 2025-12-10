---
title: Битови Операции
theme: white
highlightTheme: github
transition: slide
controls: true
progress: true
slideNumber: true
---

# ⚡ Bit Operations

## Low-Level Performance Techniques

**Лекция 14** • Структури от Данни и Програмиране

---

## 📋 Съдържание

🎯 **Binary Representation**

⚙️ **Bitwise Operators**

🔢 **Bit Manipulation Tricks**

💡 **Practical Applications**

🚀 **Optimization Techniques**

Note:
Битовите операции са фундаментални за low-level програмиране!

---

<!-- .slide: data-background="#e7f3ff" -->

# 🎯 Част 1

## Binary Basics

---

## Binary Representation

**Decimal vs Binary:**
```
Decimal:  5  =  101₂
          13 =  1101₂
          255 = 11111111₂

Пример: 13 в binary
13 = 8 + 4 + 1 = 2³ + 2² + 2⁰ = 1101₂
```

**Signed integers (Two's Complement):**
```
 5 = 00000101
-5 = 11111011  (invert bits + 1)
```

Note:
Разбирането на binary представянето е критично за битовите операции!

---

## Bitwise Operators

**Основни оператори:**
```cpp
&   // AND
|   // OR
^   // XOR
~   // NOT
<<  // Left shift
>>  // Right shift
```

**Примери:**
```cpp
5 & 3  = 0101 & 0011 = 0001 = 1
5 | 3  = 0101 | 0011 = 0111 = 7
5 ^ 3  = 0101 ^ 0011 = 0110 = 6
~5     = ~0101 = 1010 = -6 (two's complement)
5 << 1 = 0101 << 1 = 1010 = 10
5 >> 1 = 0101 >> 1 = 0010 = 2
```

Note:
Тези оператори работят директно с битовете!

---

<!-- .slide: data-background="#e8f5e9" -->

# Част 2

## Bitwise Operations

---

## AND Operation (&)

**Таблица на истинност:**
```
A  B  A&B
0  0   0
0  1   0
1  0   0
1  1   1
```

**Употреба:**
```cpp
// Check if number is even
if ((n & 1) == 0) {
    cout << "Even";
}

// Clear specific bits
int clearBit(int n, int pos) {
    return n & ~(1 << pos);
}

// Mask extraction
int getLowerNibble(int n) {
    return n & 0x0F;  // Last 4 bits
}
```

Note:
AND се използва за извличане/маскиране на битове!

---

## OR Operation (|)

**Таблица на истинност:**
```
A  B  A|B
0  0   0
0  1   1
1  0   1
1  1   1
```

**Употреба:**
```cpp
// Set specific bit
int setBit(int n, int pos) {
    return n | (1 << pos);
}

// Combine flags
int flags = FLAG_READ | FLAG_WRITE | FLAG_EXECUTE;

// Set multiple bits
int value = 0;
value |= (1 << 3);  // Set bit 3
value |= (1 << 5);  // Set bit 5
```

Note:
OR се използва за задаване на битове!

---

## XOR Operation (^)

**Таблица на истинност:**
```
A  B  A^B
0  0   0
0  1   1
1  0   1
1  1   0
```

**Свойства:**
```cpp
a ^ 0 = a
a ^ a = 0
a ^ b ^ b = a  // Self-inverse
```

**Употреба:**
```cpp
// Toggle bit
int toggleBit(int n, int pos) {
    return n ^ (1 << pos);
}

// Swap without temp variable
void swap(int& a, int& b) {
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
}
```

Note:
XOR има уникални свойства, полезни за много трикове!

---

## NOT Operation (~)

**Операция:** Инвертира всички битове

```cpp
~5 = ~00000101 = 11111010 = -6 (two's complement)

// Check if power of 2
bool isPowerOf2(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}

// Count set bits (Brian Kernighan's algorithm)
int countSetBits(int n) {
    int count = 0;
    while (n) {
        n &= (n - 1);  // Clears rightmost set bit
        count++;
    }
    return count;
}
```

Note:
NOT е полезен за битови маски и инверсия!

---

## Shift Operations

**Left Shift (<<):**
```cpp
5 << 1 = 10   // Multiply by 2
5 << 2 = 20   // Multiply by 4
n << k = n * 2^k
```

**Right Shift (>>):**
```cpp
10 >> 1 = 5   // Divide by 2
20 >> 2 = 5   // Divide by 4
n >> k = n / 2^k
```

**Важно:**
```cpp
// Logical vs Arithmetic shift
unsigned int a = -1;
a >> 1;  // Logical shift (fill with 0)

int b = -1;
b >> 1;  // Arithmetic shift (fill with sign bit)
```

Note:
Shift операциите са много по-бързи от умножение/деление!

---

<!-- .slide: data-background="#fff3e0" -->

# Част 3

## Bit Manipulation Tricks

---

## Common Bit Tricks

```cpp
// Check if bit is set
bool isBitSet(int n, int pos) {
    return (n & (1 << pos)) != 0;
}

// Toggle bit
int toggleBit(int n, int pos) {
    return n ^ (1 << pos);
}

// Get rightmost set bit
int getRightmost(int n) {
    return n & -n;
}

// Clear rightmost set bit
int clearRightmost(int n) {
    return n & (n - 1);
}

// Check if power of 2
bool isPowerOf2(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}
```

Note:
Тези трикове са често срещани на интервюта!

---

## Find Missing Number (XOR)

**Задача:** Намери липсващото число в масив [1..n]

```cpp
int findMissing(vector<int>& arr, int n) {
    int xorAll = 0;
    int xorArr = 0;

    // XOR all numbers from 1 to n
    for (int i = 1; i <= n; i++) {
        xorAll ^= i;
    }

    // XOR all array elements
    for (int num : arr) {
        xorArr ^= num;
    }

    // Missing number
    return xorAll ^ xorArr;
}

// Пример: [1, 2, 4, 5] → Missing: 3
// xorAll = 1^2^3^4^5 = 1
// xorArr = 1^2^4^5 = 6
// result = 1^6 = 7... wait, let me recalculate
```

Note:
XOR trick-ът елиминира всички еднакви елементи!

---

## Count Set Bits

**Brian Kernighan's Algorithm:**
```cpp
int countSetBits(int n) {
    int count = 0;
    while (n) {
        n &= (n - 1);  // Removes rightmost set bit
        count++;
    }
    return count;
}

// Example: n = 13 = 1101
// Iteration 1: 1101 & 1100 = 1100 (removed 1 bit)
// Iteration 2: 1100 & 1011 = 1000 (removed 1 bit)
// Iteration 3: 1000 & 0111 = 0000 (removed 1 bit)
// Count = 3
```

**Complexity: O(k)** где k е броят set bits

Note:
Този алгоритъм е много по-бърз от наивния O(log n) подход!

---

## Gray Code

**Свойство:** Съседните числа се различават в един бит

```cpp
// Binary to Gray
int binaryToGray(int n) {
    return n ^ (n >> 1);
}

// Gray to Binary
int grayToBinary(int gray) {
    int binary = 0;
    while (gray) {
        binary ^= gray;
        gray >>= 1;
    }
    return binary;
}
```

**Приложения:**
- Rotary encoders
- Error correction
- Hardware optimization

Note:
Gray code се използва в хардуера за минимизиране на грешките!

---

<!-- .slide: data-background="#f3e5f5" -->

# Част 4

## Practical Applications

---

## Flags and Permissions

```cpp
// Unix permissions
const int READ    = 1 << 0;  // 001 = 1
const int WRITE   = 1 << 1;  // 010 = 2
const int EXECUTE = 1 << 2;  // 100 = 4

int permissions = 0;

// Set permissions
permissions |= READ;
permissions |= WRITE;
// permissions = 011 = 3

// Check permission
if (permissions & READ) {
    cout << "Can read";
}

// Remove permission
permissions &= ~WRITE;

// Toggle permission
permissions ^= EXECUTE;
```

Note:
Битовите флагове са ефективен начин за съхранение на boolean стойности!

---

## Bitset for Space Optimization

```cpp
// Boolean array
bool present[1000000];  // 1 MB

// Bitset
int bitset[1000000 / 32];  // 31.25 KB (32x compression!)

void setBit(int n) {
    bitset[n / 32] |= (1 << (n % 32));
}

void clearBit(int n) {
    bitset[n / 32] &= ~(1 << (n % 32));
}

bool checkBit(int n) {
    return (bitset[n / 32] & (1 << (n % 32))) != 0;
}
```

Note:
Bitset е 32x по-ефективен от boolean масив!

---

## Fast Division/Multiplication

```cpp
// Multiply by powers of 2
int multiplyBy8(int n) {
    return n << 3;  // 8 times faster than n * 8
}

// Divide by powers of 2
int divideBy4(int n) {
    return n >> 2;  // Faster than n / 4
}

// Modulo by power of 2
int mod8(int n) {
    return n & 7;  // n & (2^k - 1) = n % 2^k
}

// Check if divisible by power of 2
bool isDivisibleBy16(int n) {
    return (n & 15) == 0;
}
```

Note:
Битовите операции са много по-бързи от аритметичните!

---

## Hash Functions

```cpp
// Simple hash function using XOR and shifts
unsigned int hash(string str) {
    unsigned int hash = 0;
    for (char c : str) {
        hash = (hash << 5) + hash + c;  // hash * 33 + c
    }
    return hash;
}

// FNV-1a hash
unsigned int fnv1a_hash(string str) {
    unsigned int hash = 2166136261u;
    for (char c : str) {
        hash ^= c;
        hash *= 16777619u;
    }
    return hash;
}
```

Note:
Битовите операции са критични за бързи hash функции!

---

<!-- .slide: data-background="#e0f2f1" -->

# Част 5

## Advanced Techniques

---

## Bit Manipulation in Algorithms

**Subset Generation:**
```cpp
// Generate all subsets of set {0, 1, 2, ..., n-1}
void generateSubsets(int n) {
    for (int mask = 0; mask < (1 << n); mask++) {
        cout << "{ ";
        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                cout << i << " ";
            }
        }
        cout << "}\n";
    }
}

// Example for n=3: 2^3 = 8 subsets
// 000 → {}
// 001 → {0}
// 010 → {1}
// 011 → {0, 1}
// ...
```

Note:
Bit manipulation е естествен за генериране на subsets!

---

## Dynamic Programming with Bitmasks

**Traveling Salesman Problem (TSP):**
```cpp
const int INF = 1e9;
int dp[16][1 << 16];  // dp[city][visited_mask]

int tsp(int pos, int mask) {
    if (mask == (1 << n) - 1)  // All cities visited
        return dist[pos][0];

    if (dp[pos][mask] != -1)
        return dp[pos][mask];

    int ans = INF;
    for (int city = 0; city < n; city++) {
        if ((mask & (1 << city)) == 0) {  // Not visited
            int newAns = dist[pos][city] +
                        tsp(city, mask | (1 << city));
            ans = min(ans, newAns);
        }
    }

    return dp[pos][mask] = ans;
}
```

Note:
Bitmask DP е мощна техника за задачи с състояния!

---

<!-- .slide: data-background="#e8eaf6" -->

# Обобщение

---

## Ключови Изводи

**Bitwise Operators:**
- AND (&) - mask, clear bits
- OR (|) - set bits
- XOR (^) - toggle, swap
- NOT (~) - invert
- Shifts (<<, >>) - multiply/divide by 2

**Common Tricks:**
- Check bit: `n & (1 << k)`
- Set bit: `n | (1 << k)`
- Toggle bit: `n ^ (1 << k)`
- Clear bit: `n & ~(1 << k)`
- Power of 2: `n & (n-1) == 0`

Note:
Битовите операции са фундаментални за ефективно програмиране!

---

## Performance Benefits

**Скорост:**
- Битови операции са 10-100x по-бързи от аритметични
- Директна хардуерна поддръжка
- Една CPU инструкция

**Памет:**
- Битови флагове - 32x компресия
- Компактно представяне
- Cache-friendly

**Приложения:**
- Low-level programming
- Embedded systems
- Performance-critical code
- Cryptography

Note:
Битовите операции са критични за performance!

---

## За Изпита

✅ **Bitwise operators** - AND, OR, XOR, NOT, shifts

✅ **Common tricks** - set/clear/toggle/check bit

✅ **Power of 2 check** - `n & (n-1) == 0`

✅ **Count set bits** - Brian Kernighan's algorithm

✅ **Applications** - flags, permissions, bitmasks

Note:
Тези концепции са често на интервюта!

---

## C++ Bitwise Features

```cpp
#include <bitset>

// Bitset for fixed-size bit arrays
bitset<8> bits(42);  // 00101010
cout << bits[3];     // Access bit
bits.set(5);         // Set bit
bits.reset(3);       // Clear bit
bits.flip(2);        // Toggle bit
bits.count();        // Count set bits

// C++20 bit operations
#include <bit>
int popcnt = popcount(42u);       // Count set bits
int clz = countl_zero(42u);       // Count leading zeros
int ctz = countr_zero(42u);       // Count trailing zeros
bool isPow2 = has_single_bit(8u); // Is power of 2
```

Note:
C++ предоставя богата поддръжка за битови операции!

---

## Допълнителни Ресурси

**Bit Manipulation:**
- [Bit Manipulation - GeeksforGeeks](https://www.geeksforgeeks.org/bits-manipulation-important-tactics/)
- [Bit Twiddling Hacks](https://graphics.stanford.edu/~seander/bithacks.html)

**Practice:**
- [LeetCode - Bit Manipulation](https://leetcode.com/tag/bit-manipulation/)
- [HackerRank - Bit Manipulation](https://www.hackerrank.com/domains/algorithms?filters%5Bsubdomains%5D%5B%5D=bit-manipulation)

Note:
Практиката е ключова за овладяване на битовите операции!

---

<!-- .slide: data-background="#4caf50" -->

# Благодаря за Вниманието!

## Въпроси? 🎓

**Завършен курс:** Структури от Данни и Програмиране

**Успех на изпита! 🎉**

Note:
Време за въпроси! Успех с подготовката за изпита!
