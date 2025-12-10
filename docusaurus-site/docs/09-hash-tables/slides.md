---
title: Hash Таблици и Криптографски Hash Функции
theme: white
highlightTheme: github
transition: slide
controls: true
progress: true
slideNumber: true
---

# 🔐 Hash Tables

## Криптографски Hash Функции

**Лекция 9** • Структури от Данни и Програмиране

---

## 📋 Съдържание

🎯 **Hash Functions Basics**

🔐 **Криптографски Свойства**

📊 **Hash Tables Structure**

⚡ **Collision Resolution**

💡 **Applications**

Note:
Hash таблиците осигуряват O(1) средна сложност за търсене!

---

<!-- .slide: data-background="#e7f3ff" -->

# 🎯 Част 1

## Hash Functions

---

## Какво е Hash Function?

**Дефиниция:** Функция, която картографира данни с произволен размер към фиксиран размер

```
Input (any size) → Hash Function → Output (fixed size)
"Hello World" → hash() → 5d41402abc4b...
```

**Свойства:**
- Детерминизъм - същият вход дава същия изход
- Еднопосочност - не може да се обърне
- Avalanche effect - малка промяна → различен hash

Note:
Hash функциите са фундаментални за много системи!

---

## Криптографски Hash Функции

| Алгоритъм | Размер | Сигурност | Използване |
|-----------|--------|-----------|------------|
| **MD5** | 128 bits | ❌ Компрометиран | НЕ използвай |
| **SHA-1** | 160 bits | ❌ Компрометиран | НЕ използвай |
| **SHA-256** | 256 bits | ✅ Силна | Bitcoin, SSL |
| **SHA-3** | 224-512 bits | ✅ Силна | Нов стандарт |

Note:
MD5 и SHA-1 НЕ трябва да се използват за криптография!

---

## Свойства на Hash Functions

<div class="columns">
<div class="column left">

**Детерминизъм:**
```cpp
hash("password") = "xyz..."
hash("password") = "xyz..."
// Винаги същото!
```

**One-way:**
```
hash("secret") → "abc123"
"abc123" → ??? (невъзможно!)
```

</div>
<div class="column right">

**Avalanche Effect:**
```
hash("password") → "7c6a..."
hash("Password") → "9f2b..."
// Напълно различно!
```

**Collision Resistance:**
```
hash(A) = hash(B)
// Почти невъзможно!
```

</div>
</div>

Note:
Тези свойства правят hash функциите подходящи за сигурност.

---

<!-- .slide: data-background="#e8f5e9" -->

# Част 2

## Hash Tables

---

## Какво е Hash Table?

**Структура от данни:** key → value mapping с O(1) средна сложност

**Как работи:**
```
Key → Hash Function → Index → Value

"alice" → hash("alice") % size → 3 → "Alice Smith"
```

**Компоненти:**
- Array за съхранение
- Hash function
- Collision resolution strategy

Note:
Hash таблиците комбинират скоростта на масивите с гъвкавостта!

---

## Hash Table Structure

```cpp
class HashTable {
private:
    static const int SIZE = 100;
    struct Node {
        string key;
        int value;
        Node* next;
    };
    Node* table[SIZE];

    int hash(string key) {
        int sum = 0;
        for (char c : key) sum += c;
        return sum % SIZE;
    }

public:
    HashTable() {
        for (int i = 0; i < SIZE; i++)
            table[i] = nullptr;
    }

    void insert(string key, int value);
    int search(string key);
    void remove(string key);
};
```

Note:
Масив от указатели към Node-ове за separate chaining.

---

## Hash Functions - Simple Examples

**Division Method:**
```cpp
int hash(int key) {
    return key % TABLE_SIZE;
}
```

**String Hash (djb2):**
```cpp
unsigned long hash(string str) {
    unsigned long hash = 5381;
    for (char c : str)
        hash = ((hash << 5) + hash) + c;
    return hash % TABLE_SIZE;
}
```

Note:
Добрата hash функция разпределя ключовете равномерно!

---

<!-- .slide: data-background="#fff3e0" -->

# Част 3

## Collision Resolution

---

## Какво е Collision?

**Проблем:** Два различни ключа → същия индекс

```
hash("alice") = 3
hash("bob") = 3
// Collision!
```

**Решения:**
1. Separate Chaining (отворено адресиране)
2. Open Addressing (затворено адресиране)

Note:
Колизиите са неизбежни - нуждаем се от стратегия за справяне!

---

## Separate Chaining

**Идея:** Всяка позиция е свързан списък

```cpp
void insert(string key, int value) {
    int index = hash(key);
    Node* newNode = new Node{key, value, nullptr};

    if (!table[index]) {
        table[index] = newNode;
    } else {
        // Добави в края на списъка
        Node* current = table[index];
        while (current->next)
            current = current->next;
        current->next = newNode;
    }
}
```

**Complexity:**
- Best: O(1)
- Worst: O(n) - всички в един bucket

Note:
Separate chaining е прост и ефективен метод!

---

## Open Addressing - Linear Probing

**Идея:** При колизия, търси следваща свободна позиция

```cpp
void insert(string key, int value) {
    int index = hash(key);

    while (table[index] != nullptr) {
        index = (index + 1) % SIZE;  // Linear probing
    }

    table[index] = new Node{key, value, nullptr};
}
```

**Проблем:** Clustering - групи заети клетки

Note:
Linear probing е прост, но води до clustering.

---

## Open Addressing - Quadratic Probing

**Идея:** Използва квадратични стъпки

```cpp
int probe(int index, int attempt) {
    return (index + attempt * attempt) % SIZE;
}

void insert(string key, int value) {
    int index = hash(key);
    int attempt = 0;

    while (table[probe(index, attempt)] != nullptr) {
        attempt++;
    }

    table[probe(index, attempt)] = new Node{key, value};
}
```

**Предимство:** По-малко clustering

Note:
Quadratic probing намалява clustering, но може да не намери свободно място.

---

## Load Factor

**Дефиниция:** λ = n / m
- n = брой елементи
- m = размер на таблицата

**Препоръки:**
- Separate chaining: λ < 1.0
- Open addressing: λ < 0.7

**Resizing:**
```cpp
if (load_factor() > 0.7) {
    resize();  // Удвой размера и rehash
}
```

Note:
Ниският load factor гарантира добра производителност!

---

<!-- .slide: data-background="#f3e5f5" -->

# Част 4

## Applications

---

## Password Storage

```cpp
// ❌ ГРЕШНО - plain text
database["alice"] = "password123"

// ✅ ПРАВИЛНО - hashed + salted
string salt = generateRandomSalt();
string hash = SHA256(password + salt);
database["alice"] = {hash, salt};

// Проверка при login:
string inputHash = SHA256(inputPassword + storedSalt);
if (inputHash == storedHash) {
    // Успешен login
}
```

Note:
Никога не съхранявайте пароли в plain text!

---

## File Integrity Verification

```bash
# Изтегляне на файл
wget ubuntu-22.04.iso

# Изчисляване на hash
sha256sum ubuntu-22.04.iso

# Сравняване с публикувания hash
# Ако съвпадат → файлът е неповреден ✅
# Ако не съвпадат → файлът е корумпиран/подменен ❌
```

Note:
Hash функциите откриват дори 1-битова промяна!

---

## Blockchain

```cpp
struct Block {
    string data;
    string prevHash;
    string hash;
    int nonce;

    string calculateHash() {
        return SHA256(data + prevHash + to_string(nonce));
    }

    void mineBlock(int difficulty) {
        string target(difficulty, '0');
        while (hash.substr(0, difficulty) != target) {
            nonce++;
            hash = calculateHash();
        }
    }
};
```

Note:
Blockchain използва hash-ове за криптографска сигурност!

---

## Caching

```cpp
class Cache {
    unordered_map<string, string> cache;

public:
    string get(string url) {
        if (cache.find(url) != cache.end()) {
            return cache[url];  // Cache hit - O(1)
        }

        string data = fetchFromNetwork(url);  // Slow
        cache[url] = data;
        return data;
    }
};
```

Note:
Hash таблиците са перфектни за caching с O(1) достъп!

---

<!-- .slide: data-background="#e8eaf6" -->

# Обобщение

---

## Сложност на Операциите

| Операция | Average | Worst |
|----------|---------|-------|
| **Search** | O(1) | O(n) |
| **Insert** | O(1) | O(n) |
| **Delete** | O(1) | O(n) |

**Worst case:** Всички ключове в един bucket

**Best case:** Перфектно разпределение

Note:
Добрата hash функция и нисък load factor осигуряват O(1) средна сложност!

---

## Ключови Изводи

**Hash Functions:**
- Детерминизъм, one-way, avalanche effect
- SHA-256/SHA-3 за криптография
- MD5/SHA-1 са компрометирани

**Hash Tables:**
- O(1) средна сложност
- Collision resolution: chaining vs probing
- Load factor определя производителността

**Applications:**
- Password storage
- Caching
- Blockchain
- File integrity

Note:
Hash таблиците са една от най-важните структури от данни!

---

## STL Containers

```cpp
#include <unordered_map>

unordered_map<string, int> map;

map["alice"] = 25;
map["bob"] = 30;

cout << map["alice"];  // O(1) average

// Итериране
for (auto& pair : map) {
    cout << pair.first << ": " << pair.second;
}
```

**unordered_map** vs **map**:
- unordered_map: O(1) average, hash table
- map: O(log n), red-black tree

Note:
В production код използвайте STL контейнерите!

---

## Допълнителни Ресурси

**Hash Tables:**
- [Hash Table - GeeksforGeeks](https://www.geeksforgeeks.org/hashing-data-structure/)
- [std::unordered_map - cppreference](https://en.cppreference.com/w/cpp/container/unordered_map)

**Cryptography:**
- [SHA-256 Explained](https://en.wikipedia.org/wiki/SHA-2)
- "Applied Cryptography" by Bruce Schneier

Note:
Практиката е ключова - имплементирайте собствена hash table!

---

<!-- .slide: data-background="#4caf50" -->

# Благодаря за Вниманието!

## Въпроси? 🎓

**Следваща лекция:** Binary Search Trees

Note:
Време за въпроси!
