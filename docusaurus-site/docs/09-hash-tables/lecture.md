---
title: "Лекция"
sidebar_position: 1
slug: lecture
tags: [hash-tables, hash-functions, cryptography, data-structures, cpp, security]
---

import InfoBox from '@site/src/components/InfoBoxes/InfoBox';
import WarningBox from '@site/src/components/InfoBoxes/WarningBox';
import SuccessBox from '@site/src/components/InfoBoxes/SuccessBox';
import WhyBox from '@site/src/components/InfoBoxes/WhyBox';
import LearningObjectives from '@site/src/components/LearningObjectives';
import QuickSummary from '@site/src/components/QuickSummary';
import CollapsibleSection from '@site/src/components/CollapsibleSection';
import ComparisonBox from '@site/src/components/Comparison/ComparisonBox';
import Grid from '@site/src/components/Grid/Grid';
import Card from '@site/src/components/Grid/Card';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Hash Таблици и Криптографски Hash Функции

<QuickSummary>

**Ключови познания от тази лекция:**

- **Hash функции**: Трансформират данни от произволен размер в фиксиран размер "отпечатък" (digest), който служи като уникален идентификатор
- **Криптографски свойства**: Детерминизъм, необратимост, устойчивост на колизии - критични за сигурността на системите
- **Hash таблици**: Структура от данни, която осигурява O(1) средна сложност за търсене, вмъкване и изтриване
- **Колизии**: Стратегии за разрешаване включват separate chaining (отворено адресиране) и linear/quadratic probing (затворено адресиране)
- **Практически приложения**: Съхранение на пароли, верификация на файлове, blockchain, malware detection, data deduplication

</QuickSummary>

<LearningObjectives
  objectives={[
    "Дефинирайте криптографски hash функции и обяснете техните ключови свойства",
    "Идентифицирайте приложения в реалния свят на криптографски hash функции",
    "Разбирате дизайна на hash таблици и стратегиите за разрешаване на колизии",
    "Имплементирайте hash таблици с различни методи за разрешаване на колизии в C++",
    "Оценявайте и оптимизирайте производителността на hash таблици"
  ]}
/>

---

## 1. Въведение и Мотивация

### Защо Hash Функциите са Важни?

<Grid columns={2}>
<Card title="🎬 Netflix и Интегритет на Файловете">

Когато изтегляте филм от Netflix, приложението получава криптографски hash (цифров отпечатък) на файла. Вашето устройство изчислява hash след изтеглянето и го сравнява - ако дори един бит е променен (корупция или tamper), hash-овете ще се различават и приложението ще знае, че файлът е несигурен.

</Card>

<Card title="🔐 Съхранение на Пароли">

Уебсайтовете **никога** не съхраняват вашата истинска парола. Те съхраняват hash (едностранен, необратим резултат) на паролата ви. Когато се логвате, вашият вход се хешира и се сравнява. Дори ако атакуващи откраднат базата данни, те не могат да възстановят оригиналната парола, защото hash-овете не могат да бъдат обърнати.

</Card>
</Grid>

<WhyBox title="Основният Проблем">

Hash функциите адресират две съвременни компютърни нужди:
- **Бързо търсене**: Картографиране на данни (като потребителско име) към location за съхранение мигновено
- **Интегритет на данните**: Детектиране на всякакви неразрешени промени в данни/файлове

Вие ги преживявате ежедневно:
- Логване в уебсайтове (паролата ви остава тайна)
- Изтегляне на софтуер (системата валидира файла)
- Търсене в контакти или социални мрежи (мигновени резултати благодарение на hash таблици)

</WhyBox>

---

## 2. Необходими Предварителни Знания

### Масиви и Свързани Списъци

<ComparisonBox
  left={{
    title: "Масиви (Arrays)",
    content: `
- **Достъп**: O(1) - бърз, директен достъп
- **Размер**: Фиксиран
- **Памет**: Контигуозна (последователна)
- **Предимство**: Константно време за достъп по индекс
    `
  }}
  right={{
    title: "Свързани Списъци (Linked Lists)",
    content: `
- **Достъп**: O(n) - бавно търсене
- **Размер**: Динамичен
- **Памет**: Разпръсната
- **Предимство**: Гъвкав размер, лесно вмъкване изтриване
    `
  }}
/>

<SuccessBox title="Hash Таблиците - Най-доброто от Двата Свята">

**Hash таблиците** комбинират скоростта на масивите и гъвкавостта на свързаните списъци чрез хеширане!

</SuccessBox>

### Битови Операции

Използват се в hash функции за смесване и модулни оптимизации:

```cpp
// Основни битови операции
int a = 5;      // 0101
int b = 3;      // 0011

int and_result = a & b;    // AND:  0001 = 1
int or_result = a | b;     // OR:   0111 = 7
int xor_result = a ^ b;    // XOR:  0110 = 6
int not_result = ~a;       // NOT:  1010 (зависи от размера)
int left = a << 1;         // LEFT SHIFT:  1010 = 10
int right = a >> 1;        // RIGHT SHIFT: 0010 = 2
```

### Big O Нотация

<InfoBox title="Времева Сложност - Припомняне">

- **O(1)**: Константно време (масиви, идеални hash таблици)
- **O(log n)**: Логаритмично време (балансирани дървета)
- **O(n)**: Линейно време (свързани списъци или hash таблици с много колизии)
- **O(n²)**: Квадратично време (вложени цикли)

**Цел**: Hash таблици с ефективни hash функции и нисък load factor приближават **O(1)** средна сложност!

</InfoBox>

---

## 3. Криптографски Hash Функции: Основни Концепции

### Дефиниция

<InfoBox title="Какво е Hash Функция?">

**Криптографска hash функция** трансформира вход с произволен размер в **фиксиран размер** "digest" (напр., 256 бита), който действа като уникален отпечатък (fingerprint).

```
Input (произволен размер) → Hash Function → Output (фиксиран размер)
"Hello World" → SHA-256 → "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"
```

</InfoBox>

### Ключови Криптографски Свойства

<Grid columns={2}>
<Card title="1️⃣ Детерминизъм">

**Същият вход винаги дава същия изход**

```cpp
hash("password123") = "xyz..."
hash("password123") = "xyz..." // Винаги същото!
```

</Card>

<Card title="2️⃣ Необратимост (One-way)">

**Не може да се възстанови входът от hash**

```
hash("secret") → "abc123..."
"abc123..." → ??? (невъзможно!)
```

</Card>

<Card title="3️⃣ Avalanche Effect">

**Малка промяна във входа → радикално различен изход**

```
hash("password") → "7c6a..."
hash("Password") → "9f2b..." // Напълно различно!
```

</Card>

<Card title="4️⃣ Устойчивост на Колизии">

**Трудно е да се намерят два входа със същия hash**

```
hash(A) = hash(B) // Почти невъзможно!
```

</Card>

<Card title="5️⃣ Pre-image Resistance">

**Даден изход, невъзможно е да се намери входът**

```
Даден: hash = "abc123..."
Намери: input такъв че hash(input) = "abc123..."
// Изчислително невъзможно!
```

</Card>

<Card title="6️⃣ Second Pre-image Resistance">

**Даден вход, трудно е да се намери друг вход със същия hash**

```
Даден: input1
Намери: input2 ≠ input1 такъв че
        hash(input1) = hash(input2)
// Много трудно!
```

</Card>
</Grid>

### Атаки с Колизии и Birthday Paradox

<WarningBox title="Защо Колизиите са Опасни?">

**Колизии**: Два различни входа произвеждат същия hash - опасно за сигурността!

```cpp
hash("document1.pdf") = "abc123..."
hash("fake_document.pdf") = "abc123..." // КОЛИЗИЯ!
```

Ако атакуващ може да създаде фалшив документ със същия hash, той може да го подмени без да бъде забелязан!

</WarningBox>

<InfoBox title="Birthday Paradox">

Колизиите стават вероятни след около **2^(n/2)** опита, където **n** е броят output битове.

**Пример:**
- SHA-256: 256 бита → колизия след ~2^128 опита (практически невъзможно)
- MD5: 128 бита → колизия след ~2^64 опита (практически възможно с днешни компютри!)

**Затова се нуждаем от SHA-256/SHA-3**: По-дълги изходи и по-сложна математика за да устоят на атаки.

</InfoBox>

### Често Използвани Алгоритми

| Алгоритъм  | Размер на Изход | Сигурност | Забележки   |
|------------|-----------------|-----------|-------------|
| **MD5**    | 128 бита        | ❌ Компрометиран   | **НЕ използвайте** |
| **SHA-1**  | 160 бита        | ❌ Компрометиран   | **НЕ използвайте** |
| **SHA-256** | 256 бита       | ✅ Силна   | Широко използван (Bitcoin, SSL) |
| **SHA-3**  | 224-512 бита    | ✅ Силна   | Най-нов стандарт |

<WarningBox title="Важно!">

**Никога не използвайте MD5 или SHA-1 за криптографски цели!** Те са компрометирани и атакуващи могат да намерят колизии. Използвайте **SHA-256** или **SHA-3**.

</WarningBox>

---

## 4. Приложения на Криптографски Hash Функции в Реалния Свят

### 1. Верификация на Интегритет на Данни (File Verification)

<Grid columns={2}>
<Card title="Как работи?">

```bash
# 1. Изтегляте Linux ISO файл
wget ubuntu-22.04.iso

# 2. Изчислявате hash
sha256sum ubuntu-22.04.iso

# 3. Сравнявате с публикувания hash
# Ако съвпадат → файлът е неповреден ✅
# Ако не съвпадат → файлът е корумпиран/подменен ❌
```

</Card>

<Card title="Защо е важно?">

- Детектира корупция при изтегляне
- Открива tamper/manipulation
- Гарантира автентичност на софтуера

**Използва се от:**
- Linux дистрибуции
- Software vendors
- Security updates

</Card>
</Grid>

### 2. Съхранение и Автентикация на Пароли

<InfoBox title="Сигурно Съхранение на Пароли">

**❌ ЛОШО (никога не правете това!):**
```sql
CREATE TABLE users (
    username VARCHAR(50),
    password VARCHAR(50)  -- Plaintext! МНОГО ЛОШО!
);
```

**✅ ДОБРО:**
```sql
CREATE TABLE users (
    username VARCHAR(50),
    password_hash VARCHAR(64),  -- Само hash!
    salt VARCHAR(32)            -- Random salt за всеки потребител
);
```

**Процес на регистрация:**
```cpp
string password = "MySecurePass123";
string salt = generate_random_salt();  // Генерира random данни
string hash = sha256(password + salt); // Hash от парола + salt

// Съхранява само hash и salt, НЕ паролата!
save_to_database(username, hash, salt);
```

**Процес на login:**
```cpp
string entered_password = get_user_input();
string stored_hash = get_from_database(username, "password_hash");
string stored_salt = get_from_database(username, "salt");

string computed_hash = sha256(entered_password + stored_salt);

if (computed_hash == stored_hash) {
    login_success();
} else {
    login_failed();
}
```

</InfoBox>

<WhyBox title="Защо Salt?">

**Salt** предотвратява **rainbow table атаки**!

**Без salt:**
- Атакуващ предварително изчислява hash-ове за милиони популярни пароли
- Съхранява ги в "rainbow table"
- При breach, мигновено намира пароли чрез lookup

**Със salt:**
- Всеки потребител има различен salt
- `hash("password123" + "salt1")` ≠ `hash("password123" + "salt2")`
- Rainbow tables стават безполезни!

</WhyBox>

### 3. Цифрови Подписи (Digital Signatures)

<CollapsibleSection title="Как работят цифровите подписи?" icon="🔏">

1. **Подписване на съобщение:**
   ```
   Message → Hash → Encrypt with Private Key → Digital Signature
   ```

2. **Верификация на подпис:**
   ```
   Message → Hash → Compare with Decrypted Signature (using Public Key)
   ```

**Приложения:**
- SSL/TLS сертификати (HTTPS)
- Code signing (Windows, macOS apps)
- Email encryption (PGP)
- Legal документи

**Защо hash преди подписване?**
- Hash е малък (256 бита vs. MB за документ)
- Encryption е бавна за големи файлове
- Hash гарантира integrity + non-repudiation

</CollapsibleSection>

### 4. Blockchain и Разпределени Книги (Distributed Ledgers)

<InfoBox title="Blockchain Architecture">

```
Block 1                    Block 2                    Block 3
┌─────────────────┐        ┌─────────────────┐        ┌─────────────────┐
│ Prev: 0000...   │   ┌───>│ Prev: abc123... │   ┌───>│ Prev: def456... │
│ Data: Tx1, Tx2  │   │    │ Data: Tx3, Tx4  │   │    │ Data: Tx5, Tx6  │
│ Hash: abc123... │───┘    │ Hash: def456... │───┘    │ Hash: ghi789... │
└─────────────────┘        └─────────────────┘        └─────────────────┘
```

**Как работи tamper detection?**

1. Всеки блок съдържа hash на предишния блок
2. Ако се промени Block 2:
   - Hash на Block 2 се променя
   - Block 3 все още съдържа стария hash
   - **Веригата се "чупи"** → tamper е очевиден!

**Защо е мощен?**
- Immutable records
- Децентрализиран (няма single point of failure)
- Transparent (всеки може да провери веригата)

**Приложения:**
- Cryptocurrency (Bitcoin, Ethereum)
- Supply chain tracking
- Digital identity
- Voting systems

</InfoBox>

### 5. Malware Detection и Antivirus Системи

<Grid columns={2}>
<Card title="Signature-based Detection">

**Традиционен метод:**
```cpp
// Изчисли hash на файл
string file_hash = sha256(read_file("suspicious.exe"));

// Провери срещу база данни с известен malware
if (malware_db.contains(file_hash)) {
    quarantine_file();
}
```

**Предимства:**
- ✅ Много бърз
- ✅ 100% точност за известен malware

**Недостатъци:**
- ❌ Не открива нови variant-и
- ❌ Може да се заобиколи с малки промени

</Card>

<Card title="Fuzzy Hashing">

**Съвременен метод:**

Използва **ssdeep** (context-triggered piecewise hashing):
```bash
# Изчислява fuzzy hash
ssdeep malware_v1.exe
# Output: 3:ABC123:DEF456

ssdeep malware_v2.exe
# Output: 3:ABC124:DEF457
# ^ Много близо! Вероятно variant
```

**Предимства:**
- ✅ Открива similar-но malware
- ✅ Устойчив на малки промени

**Използва се за:**
- Variant detection
- Forensic analysis

</Card>
</Grid>

### 6. Data Deduplication и Indexing

<InfoBox title="Cloud Storage Deduplication">

**Проблем:** Милиони потребители качват същите файлове (напр., популярна песен)

**Naive решение:**
```cpp
// Съхрани всеки файл отделно
store("user1/song.mp3");  // 5 MB
store("user2/song.mp3");  // 5 MB
store("user3/song.mp3");  // 5 MB
// Общо: 15 MB за същия файл!
```

**Hash-based deduplication:**
```cpp
string hash1 = sha256(read("user1/song.mp3"));
string hash2 = sha256(read("user2/song.mp3"));

if (hash1 == hash2) {
    // Същият файл! Съхрани само веднъж
    store_once("global_storage/song.mp3");
    create_reference("user1/song.mp3" → "global_storage/song.mp3");
    create_reference("user2/song.mp3" → "global_storage/song.mp3");
}
// Общо: 5 MB + малко metadata!
```

**Ползи:**
- Спестява огромно количество пространство
- По-бърз backup
- Намалени разходи

**Използва се от:**
- Dropbox, Google Drive
- Enterprise backup системи
- Git (version control)

</InfoBox>

---

## 5. Hash Таблици: Теория и Механика

### Какво е Hash Таблица?

<InfoBox title="Дефиниция">

**Hash Таблица** = **Масив** + **Hash Функция**

```
        Hash Function
Key → h(key) = index → [0] [1] [2] [3] [4] [5] [6] ...
                         ↓           ↓       ↓
                      Value1      Value2  Value3
```

**Компоненти:**
1. **Масив**: Съхранява елементите (slots/buckets)
2. **Hash Function**: Картографира ключ към индекс в масива

</InfoBox>

<WhyBox title="Защо са Бързи?">

**Директен достъп като масив, но с arbitrary ключове!**

```cpp
// Обикновен масив - само integer индекси
array[5] = value;  // O(1)

// Hash таблица - произволни ключове!
hash_table["john.doe@email.com"] = user_data;  // O(1) average!
hash_table["product_XYZ"] = product_info;      // O(1) average!
```

**Алтернативите:**
- **Linked List**: O(n) търсене
- **Binary Search Tree**: O(log n) търсене (балансирано)
- **Hash Table**: **O(1)** средна сложност! 🚀

</WhyBox>

### Структура на Hash Таблица

```cpp
// Simplified hash table structure
template<typename K, typename V>
class HashTable {
private:
    struct Entry {
        K key;
        V value;
        bool occupied;
    };

    vector<Entry> table;
    int capacity;     // Размер на масива
    int size;         // Брой елементи

    // Hash function
    int hash(const K& key) {
        // Преобразува key в индекс [0, capacity)
        return hash_function(key) % capacity;
    }

public:
    void insert(const K& key, const V& value);
    V search(const K& key);
    void remove(const K& key);
};
```

### Hash Function за Hash Таблици

<SuccessBox title="Изисквания за Добра Hash Функция">

1. **Бърза за изчисляване**: O(1) време
2. **Uniform distribution**: Елементите се разпределят равномерно
3. **Детерминистична**: Същият key винаги дава същия index
4. **Минимизира колизии**: Различни keys рядко водят до същия index

</SuccessBox>

**Примери:**

<Tabs>
<TabItem value="int" label="Integer Keys" default>

```cpp
// За integer keys - прост modulo
int hash_int(int key, int table_size) {
    return key % table_size;
}

// По-добре: използвай prime number за table_size
int hash_int_prime(int key, int table_size) {
    // table_size трябва да е просто число!
    return key % table_size;
}

// Примери:
hash_int(42, 11) = 42 % 11 = 9
hash_int(53, 11) = 53 % 11 = 9  // Колизия!
```

**Защо prime numbers?**
- По-добро разпределение
- По-малко колизии
- Добре работи с линеен probing

</TabItem>

<TabItem value="string" label="String Keys">

```cpp
// Polynomial rolling hash за strings
int hash_string(const string& key, int table_size) {
    int hash = 0;
    int prime = 31;  // Често използван prime multiplier

    for (char c : key) {
        hash = (hash * prime + c) % table_size;
    }

    return hash;
}

// Пример:
// hash("abc") = ((0*31 + 'a')*31 + 'b')*31 + 'c'
//             = ((97)*31 + 98)*31 + 99
//             = (3007 + 98)*31 + 99
//             = 96254
```

**Алтернативи:**
- `prime = 31` (popular choice)
- `prime = 33` (используется в Java)
- `prime = 37, 41, 43...`

</TabItem>

<TabItem value="composite" label="Composite Objects">

```cpp
struct Person {
    string name;
    int age;
    string email;
};

// Hash за composite object
int hash_person(const Person& p, int table_size) {
    // Комбинира hash-овете на полетата
    int h1 = hash_string(p.name, INT_MAX);
    int h2 = p.age;
    int h3 = hash_string(p.email, INT_MAX);

    // XOR combination
    int combined = h1 ^ h2 ^ h3;

    return combined % table_size;
}

// Алтернативен метод: multiply-and-add
int hash_person_alt(const Person& p, int table_size) {
    int hash = 17;  // Произволно начално число
    hash = hash * 31 + hash_string(p.name, INT_MAX);
    hash = hash * 31 + p.age;
    hash = hash * 31 + hash_string(p.email, INT_MAX);
    return hash % table_size;
}
```

</TabItem>
</Tabs>

### Load Factor (Коефициент на Натоварване)

<InfoBox title="Дефиниция">

**Load Factor** = (Брой елементи) / (Размер на таблицата)

```
α = n / m

където:
- n = брой елементи в таблицата
- m = capacity (брой slots)
```

</InfoBox>

<Grid columns={2}>
<Card title="Нисък Load Factor (α &lt; 0.5)">

**Характеристики:**
- ✅ Много малко колизии
- ✅ Бързи операции
- ❌ Похабена памет

**Пример:**
```
Elements: 50
Capacity: 200
α = 50/200 = 0.25
```

</Card>

<Card title="Висок Load Factor (α &gt; 0.75)">

**Характеристики:**
- ❌ Много колизии
- ❌ Бавни операции
- ✅ Ефективна памет

**Пример:**
```
Elements: 180
Capacity: 200
α = 180/200 = 0.9
```

</Card>
</Grid>

<SuccessBox title="Best Practice">

**Оптимален Load Factor: 0.5 - 0.75**

**Dynamic Resizing:**
```cpp
void insert(const K& key, const V& value) {
    // Провери load factor
    double load_factor = (double)size / capacity;

    if (load_factor > 0.75) {
        resize(capacity * 2);  // Удвои размера
    }

    // Вмъкни елемента
    // ...
}
```

**Resizing процес (Rehashing):**
1. Създай нова таблица с 2x capacity
2. За всеки елемент от старата таблица:
   - Изчисли нов index с новия capacity
   - Вмъкни в новата таблица
3. Замени старата таблица с новата

**Amortized сложност:** O(1) за insertion (макар че понякога е O(n) за rehashing)

</SuccessBox>

---

**(Продължава в следващата част...)**

## 6. Стратегии за Разрешаване на Колизии

### Какво са Колизии?

<WarningBox title="Проблемът с Колизиите">

**Колизия** = Два различни ключа се картографират към същия index!

```cpp
hash("John") = 5
hash("Jane") = 5  // КОЛИЗИЯ!
```

**Защо се случват?**
- Безкрайно много възможни keys
- Ограничен брой slots в таблицата
- **Pigeonhole Principle**: Ако имаш повече keys от slots, колизии са неизбежни

</WarningBox>

**Два основни подхода:**
1. **Closed Hashing (Open Addressing)** - търси друг slot в същия масив
2. **Open Hashing (Separate Chaining)** - съхранява множество елементи в списък за всеки slot

---

### A) Closed Hashing (Open Addressing)

При колизия, търси **следващия свободен slot** в масива.

#### 1. Linear Probing

<InfoBox title="Концепция">

При колизия на index `i`, провери последователно:
```
i, i+1, i+2, i+3, ... (с wrap-around в края)
```

</InfoBox>

**C++ Implementation:**

```cpp
template<typename K, typename V>
class HashTableLinearProbing {
private:
    struct Entry {
        K key;
        V value;
        bool occupied;
        bool deleted;  // Tombstone за deletion
    };

    vector<Entry> table;
    int capacity;
    int size;

    int hash(const K& key) {
        return hash_function(key) % capacity;
    }

public:
    HashTableLinearProbing(int cap = 101) : capacity(cap), size(0) {
        table.resize(capacity);
        for (auto& entry : table) {
            entry.occupied = false;
            entry.deleted = false;
        }
    }

    void insert(const K& key, const V& value) {
        int index = hash(key);
        int probe = 0;

        // Linear probing
        while (table[index].occupied && !table[index].deleted) {
            if (table[index].key == key) {
                // Key вече съществува, update value
                table[index].value = value;
                return;
            }

            // Probe следващия slot
            index = (index + 1) % capacity;
            probe++;

            if (probe >= capacity) {
                throw runtime_error("Hash table is full!");
            }
        }

        // Намерен свободен slot
        table[index].key = key;
        table[index].value = value;
        table[index].occupied = true;
        table[index].deleted = false;
        size++;
    }

    V* search(const K& key) {
        int index = hash(key);
        int probe = 0;

        while (probe < capacity) {
            if (!table[index].occupied && !table[index].deleted) {
                // Празен slot, key не съществува
                return nullptr;
            }

            if (table[index].occupied && table[index].key == key) {
                // Намерен!
                return &table[index].value;
            }

            // Продължи probing
            index = (index + 1) % capacity;
            probe++;
        }

        return nullptr;
    }

    void remove(const K& key) {
        int index = hash(key);
        int probe = 0;

        while (probe < capacity) {
            if (!table[index].occupied && !table[index].deleted) {
                return;  // Key не съществува
            }

            if (table[index].occupied && table[index].key == key) {
                // Намерен! Маркирай като deleted (tombstone)
                table[index].deleted = true;
                table[index].occupied = false;
                size--;
                return;
            }

            index = (index + 1) % capacity;
            probe++;
        }
    }
};
```

<CollapsibleSection title="Пример: Linear Probing Insertion" icon="📋">

**Вмъкване на ключове:**

```cpp
Hash function: h(x) = x % 7
Table size: 7

Insert: 10, 22, 31, 4, 15, 28, 17

Стъпка по стъпка:

1. Insert 10:
   h(10) = 10 % 7 = 3
   [_] [_] [_] [10] [_] [_] [_]
    0   1   2   3    4   5   6

2. Insert 22:
   h(22) = 22 % 7 = 1
   [_] [22] [_] [10] [_] [_] [_]
    0   1    2   3    4   5   6

3. Insert 31:
   h(31) = 31 % 7 = 3 → COLLISION!
   Try 3: occupied
   Try 4: free → insert here
   [_] [22] [_] [10] [31] [_] [_]
    0   1    2   3    4    5   6

4. Insert 4:
   h(4) = 4 % 7 = 4 → COLLISION!
   Try 4: occupied (31)
   Try 5: free → insert here
   [_] [22] [_] [10] [31] [4] [_]
    0   1    2   3    4   5   6

5. Insert 15:
   h(15) = 15 % 7 = 1 → COLLISION!
   Try 1: occupied (22)
   Try 2: free → insert here
   [_] [22] [15] [10] [31] [4] [_]
    0   1    2    3    4   5   6

6. Insert 28:
   h(28) = 28 % 7 = 0
   [28] [22] [15] [10] [31] [4] [_]
    0    1    2    3    4   5   6

7. Insert 17:
   h(17) = 17 % 7 = 3 → COLLISION!
   Try 3: occupied (10)
   Try 4: occupied (31)
   Try 5: occupied (4)
   Try 6: free → insert here
   [28] [22] [15] [10] [31] [4] [17]
    0    1    2    3    4   5   6
```

**Забележка:** Виждаме как се формира **clustering** (съседни заети slots)!

</CollapsibleSection>

**Предимства:**
- ✅ Прост за имплементация
- ✅ Отлична cache locality (последователен достъп)
- ✅ Добра производителност при нисък load factor

**Недостатъци:**
- ❌ **Primary clustering**: Образуват се дълги вериги от заети slots
- ❌ Производителността се влошава при висок load factor
- ❌ Deletion изисква tombstones (усложнява кода)

---

#### 2. Quadratic Probing

<InfoBox title="Концепция">

При колизия на index `i`, провери с квадратичен offset:
```
i, i+1², i+2², i+3², ... (mod capacity)
i, i+1, i+4, i+9, i+16, ...
```

</InfoBox>

**Предимства над Linear Probing:**
- ✅ Намалява primary clustering
- ✅ Probe-овете са по-разпръснати

**Implementation:**

```cpp
void insert_quadratic(const K& key, const V& value) {
    int index = hash(key);
    int probe = 0;

    while (table[index].occupied && !table[index].deleted) {
        if (table[index].key == key) {
            table[index].value = value;
            return;
        }

        // Quadratic probing: i + probe²
        probe++;
        index = (hash(key) + probe * probe) % capacity;

        if (probe >= capacity) {
            throw runtime_error("Cannot find free slot!");
        }
    }

    table[index].key = key;
    table[index].value = value;
    table[index].occupied = true;
    table[index].deleted = false;
    size++;
}
```

---

#### 3. Double Hashing

<InfoBox title="Концепция">

Използва **втора hash функция** за да определи probe offset:

```
index = (h1(key) + i * h2(key)) % capacity
```

</InfoBox>

**Пример:**

```cpp
int h1(int key) {
    return key % capacity;
}

int h2(int key) {
    // h2 трябва да е != 0 и относително просто към capacity
    return 7 - (key % 7);  // Пример със 7
}

void insert_double_hash(const K& key, const V& value) {
    int index = h1(key);
    int offset = h2(key);
    int probe = 0;

    while (table[index].occupied && !table[index].deleted) {
        if (table[index].key == key) {
            table[index].value = value;
            return;
        }

        // Double hashing
        probe++;
        index = (h1(key) + probe * offset) % capacity;

        if (probe >= capacity) {
            throw runtime_error("Cannot find free slot!");
        }
    }

    table[index].key = key;
    table[index].value = value;
    table[index].occupied = true;
    size++;
}
```

**Предимства:**
- ✅ Най-добро разпределение
- ✅ Минимизира clustering

**Недостатъци:**
- ❌ По-сложна имплементация
- ❌ По-бавна (две hash изчисления)

---

### Сравнителна Таблица: Probing Strategies

| Стратегия        | Cache Locality | Clustering | Computational Cost | Най-добре при |
|-----------------|----------------|------------|-------------------|---------------|
| **Linear**      | ✅ Високо       | ❌ Високо   | ✅ Ниско           | Нисък load factor (&lt; 0.5) |
| **Quadratic**   | ⚠️ Средно      | ⚠️ Средно  | ⚠️ Средно          | Умерен load factor (0.5-0.7) |
| **Double Hash** | ❌ Ниско       | ✅ Ниско   | ❌ Високо          | Висок load factor (&gt; 0.7) |

---

### B) Open Hashing (Separate Chaining)

При колизия, съхранява **множество елементи** в списък (chain) за всеки slot.

<InfoBox title="Концепция">

Всеки slot в масива съдържа **указател към свързан списък**:

```
Hash Table:
[0] → [key1, val1] → [key5, val5] → nullptr
[1] → [key2, val2] → nullptr
[2] → nullptr
[3] → [key3, val3] → [key7, val7] → [key11, val11] → nullptr
[4] → [key4, val4] → nullptr
...
```

</InfoBox>

**C++ Implementation:**

```cpp
#include <list>
#include <vector>

template<typename K, typename V>
class HashTableChaining {
private:
    struct Entry {
        K key;
        V value;
    };

    vector<list<Entry>> table;
    int capacity;
    int size;

    int hash(const K& key) {
        return hash_function(key) % capacity;
    }

public:
    HashTableChaining(int cap = 101) : capacity(cap), size(0) {
        table.resize(capacity);
    }

    void insert(const K& key, const V& value) {
        int index = hash(key);

        // Провери дали key вече съществува в chain-а
        for (auto& entry : table[index]) {
            if (entry.key == key) {
                entry.value = value;  // Update
                return;
            }
        }

        // Добави нов entry в chain-а
        table[index].push_back(\{key, value\});
        size++;
    }

    V* search(const K& key) {
        int index = hash(key);

        // Търси в chain-а
        for (auto& entry : table[index]) {
            if (entry.key == key) {
                return &entry.value;
            }
        }

        return nullptr;  // Не е намерен
    }

    void remove(const K& key) {
        int index = hash(key);

        // Премахни от chain-а
        table[index].remove_if([&key](const Entry& e) \{
            return e.key == key;
        \});
        size--;
    }

    double load_factor() {
        return (double)size / capacity;
    }

    void print_stats() {
        int max_chain = 0;
        int empty_slots = 0;

        for (const auto& chain : table) {
            if (chain.empty()) {
                empty_slots++;
            }
            max_chain = max(max_chain, (int)chain.size());
        }

        cout << "Load Factor: " << load_factor() << endl;
        cout << "Empty Slots: " << empty_slots << "/" << capacity << endl;
        cout << "Max Chain Length: " << max_chain << endl;
    }
};
```

<CollapsibleSection title="Пример: Separate Chaining Insertion" icon="🔗">

**Вмъкване на ключове:**

```cpp
Hash function: h(x) = x % 7
Table size: 7

Insert: 10, 22, 31, 4, 15, 28, 17

1. Insert 10:
   h(10) = 3
   [0] → null
   [1] → null
   [2] → null
   [3] → [10] → null
   [4] → null
   [5] → null
   [6] → null

2. Insert 22:
   h(22) = 1
   [0] → null
   [1] → [22] → null
   [2] → null
   [3] → [10] → null
   [4] → null
   [5] → null
   [6] → null

3. Insert 31:
   h(31) = 3 → COLLISION!
   Add to chain at index 3
   [0] → null
   [1] → [22] → null
   [2] → null
   [3] → [10] → [31] → null  ← chain!
   [4] → null
   [5] → null
   [6] → null

4. Insert 4:
   h(4) = 4
   [0] → null
   [1] → [22] → null
   [2] → null
   [3] → [10] → [31] → null
   [4] → [4] → null
   [5] → null
   [6] → null

5. Insert 15:
   h(15) = 1 → COLLISION!
   Add to chain at index 1
   [0] → null
   [1] → [22] → [15] → null  ← chain!
   [2] → null
   [3] → [10] → [31] → null
   [4] → [4] → null
   [5] → null
   [6] → null

6. Insert 28:
   h(28) = 0
   [0] → [28] → null
   [1] → [22] → [15] → null
   [2] → null
   [3] → [10] → [31] → null
   [4] → [4] → null
   [5] → null
   [6] → null

7. Insert 17:
   h(17) = 3 → COLLISION!
   Add to chain at index 3
   [0] → [28] → null
   [1] → [22] → [15] → null
   [2] → null
   [3] → [10] → [31] → [17] → null  ← long chain!
   [4] → [4] → null
   [5] → null
   [6] → null
```

**Забележка:** Колизиите се обработват лесно като се добавя към chain-а!

</CollapsibleSection>

**Предимства:**
- ✅ Лесна имплементация
- ✅ Load factor може да надхвърли 1.0
- ✅ Deletion е тривиално (просто премахни от списъка)
- ✅ Устойчива на лоши hash функции

**Недостатъци:**
- ❌ Допълнителна памет за указатели
- ❌ По-лоша cache performance (разпръснати данни)
- ❌ Chain-овете могат да станат дълги при лоша hash функция

**Performance Analysis:**

| Операция | Average Case | Worst Case |
|----------|-------------|------------|
| Search   | O(1 + α)    | O(n)       |
| Insert   | O(1)        | O(n)       |
| Delete   | O(1 + α)    | O(n)       |

където **α = load factor = n/m**

**Пример:** Ако α = 2.0, средната дължина на chain е 2 елемента → все още бързо!

---

### Кога да Използваме Коя Стратегия?

<Grid columns={2}>
<Card title="🔒 Closed Hashing (Open Addressing)">

**Използвай когато:**
- Искаш добра cache performance
- Load factor ще остане &lt; 0.7
- Memory overhead трябва да е минимален
- Keys са uniformly distributed

**Избери:**
- **Linear Probing**: за нисък load factor и прости keys
- **Quadratic/Double**: за по-висок load factor

</Card>

<Card title="🔗 Open Hashing (Separate Chaining)">

**Използвай когато:**
- Load factor може да надхвърли 1.0
- Deletion операции са чести
- Hash функцията не е перфектна
- Искаш predictable performance

**Предпочитан подход в реални имплементации:**
- Java `HashMap`
- Python `dict`
- C++ `std::unordered_map` (имплементация зависи от vendor)

</Card>
</Grid>

---

## 7. Резюме и Най-добри Практики

<SuccessBox title="Ключови Заключения">

### Криптографски vs. Non-Cryptographic Hash

| Критерий | Криптографски Hash | Hash Table Hash |
|----------|-------------------|-----------------|
| **Цел** | Сигурност, интегритет | Бързо търсене |
| **Скорост** | По-бавна (SHA-256) | Много бърза |
| **Устойчивост на колизии** | Критична | По-малко важна |
| **Примери** | SHA-256, SHA-3 | Modulo, polynomial rolling |

**Правило:** 
- ✅ Използвай SHA-256/SHA-3 за **сигурност**
- ✅ Използвай бързи, uniform hashes за **hash таблици**
- ❌ **НИКОГА** не използвай MD5/SHA-1 за криптография!

</SuccessBox>

### Best Practices за Hash Таблици

1. **Избери правилната стратегия за колизии:**
   - Low/medium load (α &lt; 0.7): Linear/Quadratic probing
   - High load (α &gt; 0.7): Separate chaining
   - Frequent deletions: Separate chaining

2. **Използвай prime numbers за capacity:**
   ```cpp
   // Добър capacity (просто число)
   int capacity = 101;  // prime
   int capacity = 1009; // prime

   // Лош capacity
   int capacity = 100;  // не е просто
   int capacity = 1000; // не е просто
   ```

3. **Имплементирай dynamic resizing:**
   ```cpp
   if (load_factor() > 0.75) {
       resize(next_prime(capacity * 2));
   }
   ```

4. **Тествай hash функцията с adversarial input:**
   ```cpp
   // Sequential keys
   hash_table.insert(0, val);
   hash_table.insert(1, val);
   hash_table.insert(2, val);
   // Провери разпределението!

   // Anagram keys
   hash_table.insert("listen", val);
   hash_table.insert("silent", val);
   // Трябва да имат различни hash-ове!
   ```

5. **Избягвай тривиални hash функции:**
   ```cpp
   // ❌ ЛОШО - всички keys отиват на един index!
   int bad_hash(int key) { return 0; }

   // ❌ ЛОШО - collision за consecutive keys
   int bad_hash2(int key) { return key / 100; }

   // ✅ ДОБРО
   int good_hash(int key) { return key % prime_capacity; }
   ```

---

## Допълнителни Ресурси

### Онлайн Туториали

- [Visualizing Hash Tables](https://www.cs.usfca.edu/~galles/visualization/OpenHash.html) - Интерактивна визуализация на hash таблици
- [GeeksforGeeks - Hashing](https://www.geeksforgeeks.org/hashing-data-structure/) - Подробни обяснения и примери
- [VisuAlgo - Hash Tables](https://visualgo.net/en/hashtable) - Анимации на различни collision strategies

### Видео Лекции

- [MIT 6.006 - Hashing](https://www.youtube.com/watch?v=0M_kIqhwbFo) - Лекция от MIT OpenCourseWare
- [Abdul Bari - Hashing Technique](https://www.youtube.com/watch?v=KyUTuwz_b7Q) - Ясни обяснения с примери

### Книги и Статии

- "Introduction to Algorithms" (CLRS), Chapter 11: Hash Tables
- "The Algorithm Design Manual" - Steven Skiena, Chapter 3
- "Cryptographic Hash Functions" - Bruce Schneier

### Практически Задачи

- [LeetCode - Hash Table Problems](https://leetcode.com/tag/hash-table/) - 200+ задачи
- [HackerRank - Hash Tables](https://www.hackerrank.com/domains/data-structures?filters%5Bsubdomains%5D%5B%5D=hash-tables) - Практически упражнения
- [Codeforces - Hashing Problems](https://codeforces.com/problemset?tags=hashing) - Състезателно програмиране

### Tools

- [Compiler Explorer](https://godbolt.org/) - Вижте assembly код за hash функции
- [OpenSSL](https://www.openssl.org/) - Command-line tools за криптографски hash-ове
- [ssdeep](https://ssdeep-project.github.io/ssdeep/) - Fuzzy hashing tool

---

**Успех с изучаването на Hash таблиците!** 🚀
