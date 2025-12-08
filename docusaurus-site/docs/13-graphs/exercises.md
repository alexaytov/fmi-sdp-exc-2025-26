---
sidebar_position: 2
title: "Упражнения"
slug: exercises
tags: [exercises, practice, graphs, bfs, dfs, adjacency-matrix, adjacency-list]
---

import InfoBox from '@site/src/components/InfoBoxes/InfoBox';
import WarningBox from '@site/src/components/InfoBoxes/WarningBox';
import SuccessBox from '@site/src/components/InfoBoxes/SuccessBox';
import CollapsibleSection from '@site/src/components/CollapsibleSection';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ExerciseCard from '@site/src/components/Exercise/ExerciseCard';
import ProgressTracker from '@site/src/components/Exercise/ProgressTracker';

# Упражнения: Представяне и Алгоритми на Графи

<ProgressTracker />

---

<InfoBox title="Информация за упражненията">

Този набор от упражнения покрива:
- Терминология и основни понятия на графите
- Представяне чрез матрица и списък на съседство
- BFS (Breadth-First Search) и DFS (Depth-First Search) алгоритми
- Анализ на сложност и избор на представяне
- Практически приложения - цикли, компоненти, най-кратки пътища

**Общо упражнения:** 21 задачи в 5 нива на сложност

</InfoBox>

---

## Лесни упражнения (EASY)

Фундаментални концепции и базови разбирания

<ExerciseCard difficulty="easy">

### Терминология на Графите

Дефинирайте следните термини със свои думи и дайте пример от реалния свят за всеки:

- **Връх (Vertex)**
- **Ребро (Edge)**
- **Степен (Degree)**
- **Съседство (Adjacency)**

<CollapsibleSection title="Отговор" icon="✅">

**Дефиниции:**

1. **Връх (Vertex):**
   - **Дефиниция**: Основна единица в графа, представяща обект или точка
   - **Пример**: Потребител в социална мрежа, град на карта, компютър в мрежа

2. **Ребро (Edge):**
   - **Дефиниция**: Връзка или отношение между два върха
   - **Пример**: Приятелство между потребители, път между градове, кабел между компютри

3. **Степен (Degree):**
   - **Дефиниция**: Броят ребра, свързани с даден връх
   - **Пример**: Брой приятели на потребител, брой пътища излизащи от град

4. **Съседство (Adjacency):**
   - **Дефиниция**: Два върха са съседни ако има ребро между тях
   - **Пример**: Два града са съседни ако има директен път между тях

</CollapsibleSection>

</ExerciseCard>

<ExerciseCard difficulty="easy">

### Класификация на Графи

За всеки сценарий, идентифицирайте дали графът трябва да бъде:
- **Насочен** или **Ненасочен**
- **Теглен** или **Нетеглен**

**Сценарии:**

a) Twitter follow relationships (A следи B не означава че B следи A)

b) Разстояние между градове на карта

c) Facebook приятелства

d) Еднопосочни улици в град с времена за трафик

<CollapsibleSection title="Отговор" icon="✅">

**Отговори:**

**a) Twitter follows:**
- **Насочен** - follow връзката е едностранна
- **Нетеглен** - или се следва или не

**b) Разстояние между градове:**
- **Ненасочен** - разстоянието е двупосочно (от A до B = от B до A)
- **Теглен** - теглото е разстоянието в km

**c) Facebook приятелства:**
- **Ненасочен** - приятелството е двустранно
- **Нетеглен** - или сте приятели или не

**d) Еднопосочни улици:**
- **Насочен** - улиците са еднопосочни
- **Теглен** - теглото е времето за преминаване

</CollapsibleSection>

</ExerciseCard>

<ExerciseCard difficulty="easy">

### Четене на Матрица на Съседство

Дадена е следната матрица на съседство за ненасочен граф с върхове \{0, 1, 2, 3\}:

```
  0 1 2 3
0 0 1 1 0
1 1 0 0 1
2 1 0 0 1
3 0 1 1 0
```

**Въпроси:**

a) Изброете всички ребра в графа

b) Каква е степента на връх 1?

c) Кои върхове са съседни на връх 2?

<CollapsibleSection title="Отговор" icon="✅">

**Отговори:**

**a) Списък на ребрата:**

За ненасочен граф четем само горната триъгълна част (избягваме дублиране):
- (0, 1) - има 1 на позиция [0][1]
- (0, 2) - има 1 на позиция [0][2]
- (1, 3) - има 1 на позиция [1][3]
- (2, 3) - има 1 на позиция [2][3]

**Общо: 4 ребра**

**b) Степен на връх 1:**

Броим 1-ците в ред 1 или колона 1:
- Ред 1: [1, 0, 0, 1] → две единици
- **Степен(1) = 2**

Връх 1 е свързан с върхове 0 и 3.

**c) Съседи на връх 2:**

Проверяваме ред 2:
- [1, 0, 0, 1]
- Позиция [2][0] = 1 → връх 0 е съсед
- Позиция [2][3] = 1 → връх 3 е съсед

**Съседи на 2: \{0, 3\}**

</CollapsibleSection>

</ExerciseCard>

<ExerciseCard difficulty="easy">

### Избор на STL Контейнер

Съпоставете всеки C++ STL контейнер с неговото най-добро приложение в имплементации на графи:

**Контейнери:**
- `vector<vector<int>>`
- `map<int, list<int>>`
- `unordered_set<int>`
- `priority_queue<pair<int,int>>`

**Приложения:**
- A) Съхраняване на посетени върхове при обхождане
- B) Матрица на съседство за малки графи
- C) Списък на съседство с гъвкави ID-та на върхове
- D) Имплементиране на Dijkstra's алгоритъм

<CollapsibleSection title="Отговор" icon="✅">

**Правилни съответствия:**

1. **`vector<vector<int>>` → B) Матрица на съседство за малки графи**
   - 2D vector е идеален за матрица на съседство
   - Добър за последователни ID-та (0, 1, 2, ...)

2. **`map<int, list<int>>` → C) Списък на съседство с гъвкави ID-та**
   - Map позволява произволни ID-та на върхове
   - List е ефективен за dynamic insert/delete

3. **`unordered_set<int>` → A) Съхраняване на посетени върхове**
   - O(1) проверка дали връх е посетен
   - Ефективен за visited tracking

4. **`priority_queue<pair<int,int>>` → D) Dijkstra's алгоритъм**
   - Нужна е priority queue за Dijkstra
   - Съхранява \{distance, vertex\} и винаги взема минималното

**Обяснение:**

- **vector**: Бърз достъп, подходящ за плътни структури
- **map**: Flexible keys, добър за sparse data
- **unordered_set**: Fast lookup для visited checks
- **priority_queue**: Needed за greedy algorithms като Dijkstra

</CollapsibleSection>

</ExerciseCard>

<ExerciseCard difficulty="easy">

### Анализ на Пространствена Сложност

Граф има **100 върха** и **200 ребра**.

**Въпроси:**

a) Колко памет (в брой integer клетки) използва матрица на съседство?

b) Колко памет използва списък на съседство?

c) Кое представяне е по-ефективно за този граф?

<CollapsibleSection title="Отговор" icon="✅">

**Анализ:**

**a) Матрица на съседство:**

- Размер: V × V = 100 × 100 = **10,000 integer клетки**
- За ненасочен граф все пак 10,000 (макар да половината са дублирани)

**b) Списък на съседство:**

- Върхове: V = 100 (масив с 100 списъка)
- Ребра: Всяко ребро се съхранява 2 пъти (ненасочен граф)
- Общо записи: 2E = 2 × 200 = **400 integer записа**
- + V за самите указатели към списъците ≈ **500 integer клетки**

**c) Сравнение:**

| Представяне | Памет |
|-------------|-------|
| Матрица | 10,000 клетки |
| Списък | ~500 клетки |

**Отговор: Списъкът на съседство е ~20 пъти по-ефективен!**

**Защо?**

Графът е **разреден**:
- Максимални ребра: 100 × 99 / 2 = 4,950
- Актуални ребра: 200
- Плътност: 200 / 4,950 ≈ 4%

За разредени графи (&lt;10-15% плътност) списъкът винаги е по-добър!

</CollapsibleSection>

</ExerciseCard>

---

## Лесни-Средни упражнения (EASY-MEDIUM)

Изграждане на разбиране и приложение на концепциите

<ExerciseCard difficulty="easy-medium">

### Четене на Код - Списък на Съседство

Какво извежда следният код?

```cpp
map<int, list<int>> adj;
adj[1] = {2, 3};
adj[2] = {1, 4};
adj[3] = {1};
adj[4] = {2};

for (int n : adj[2]) {
    cout << n << " ";
}
```

<CollapsibleSection title="Отговор" icon="✅">

**Отговор:**

Кодът извежда: **`1 4`**

**Обяснение:**

1. Създаваме map с ключ int и стойност `list<int>`
2. `adj[2] = {1, 4}` - връх 2 има съседи 1 и 4
3. Итерираме през съседите на връх 2
4. Извеждаме всеки съсед

**Граф структура:**

```
1 --- 2 --- 4
 \   /
   3
```

Връх 2 е свързан с върхове 1 и 4.

</CollapsibleSection>

</ExerciseCard>

<ExerciseCard difficulty="easy-medium">

### Създаване на Матрица на Съседство

Напишете C++ код за създаване на матрица на съседство за **насочен граф** с **4 върха** и следните ребра:

`(0→1), (0→2), (1→2), (2→3), (3→1)`

<CollapsibleSection title="Решение" icon="✅">

**Решение:**

```cpp
#include <vector>
#include <iostream>
using namespace std;

int main() {
    int n = 4;  // Брой върхове
    vector<vector<int>> adjMatrix(n, vector<int>(n, 0));

    // Добавяне на ребра (насочени!)
    adjMatrix[0][1] = 1;  // 0 → 1
    adjMatrix[0][2] = 1;  // 0 → 2
    adjMatrix[1][2] = 1;  // 1 → 2
    adjMatrix[2][3] = 1;  // 2 → 3
    adjMatrix[3][1] = 1;  // 3 → 1

    // Отпечатване на матрицата
    cout << "Матрица на съседство:" << endl;
    cout << "  0 1 2 3" << endl;
    for (int i = 0; i < n; i++) {
        cout << i << " ";
        for (int j = 0; j < n; j++) {
            cout << adjMatrix[i][j] << " ";
        }
        cout << endl;
    }

    return 0;
}
```

**Изход:**

```
Матрица на съседство:
  0 1 2 3
0 0 1 1 0
1 0 0 1 0
2 0 0 0 1
3 0 1 0 0
```

**Важно:**

За **насочен граф** добавяме само едно ребро (не и обратното):
- `adjMatrix[u][v] = 1` означава ребро от u към v
- НЕ добавяме `adjMatrix[v][u] = 1`

За **ненасочен граф** бихме добавили и двете!

</CollapsibleSection>

</ExerciseCard>

<ExerciseCard difficulty="easy-medium">

### Завършване на Имплементацията

Попълнете липсващия код за добавяне на ребро в списък на съседство за **теглен, ненасочен граф**:

```cpp
class WeightedGraph {
    map<int, list<pair<int, int>>> adj; // vertex -> {neighbor, weight}
public:
    void addEdge(int u, int v, int weight) {
        // ВАШИЯТ КОД ТУК
    }
};
```

<CollapsibleSection title="Решение" icon="✅">

**Решение:**

```cpp
class WeightedGraph {
    map<int, list<pair<int, int>>> adj; // vertex -> {neighbor, weight}
public:
    void addEdge(int u, int v, int weight) {
        // За ненасочен граф добавяме и двете посоки
        adj[u].push_back({v, weight});
        adj[v].push_back({u, weight});
    }

    // Помощна функция за отпечатване
    void printGraph() {
        for (auto& [vertex, neighbors] : adj) {
            cout << vertex << " -> ";
            for (auto& [neighbor, weight] : neighbors) {
                cout << "(" << neighbor << ", " << weight << ") ";
            }
            cout << endl;
        }
    }
};
```

**Обяснение:**

1. **`pair<int, int>`**: Първият int е съсед, вторият е тегло
2. **push_back(\{v, weight\})**: Добавяме съседа v с тегло към списъка на u
3. **Ненасочен**: Добавяме и двете посоки (u→v и v→u)

**Пример за използване:**

```cpp
WeightedGraph g;
g.addEdge(0, 1, 5);   // Ребро 0-1 с тегло 5
g.addEdge(0, 2, 3);   // Ребро 0-2 с тегло 3
g.addEdge(1, 2, 2);   // Ребро 1-2 с тегло 2

g.printGraph();
```

**Изход:**

```
0 -> (1, 5) (2, 3)
1 -> (0, 5) (2, 2)
2 -> (0, 3) (1, 2)
```

**За насочен граф:**

Само първият ред:
```cpp
adj[u].push_back({v, weight});  // Само u → v
```

</CollapsibleSection>

</ExerciseCard>

<ExerciseCard difficulty="easy-medium">

### Проследяване на BFS

Даден е следният граф представен като списък на съседство:

```
0: [1, 2]
1: [0, 3, 4]
2: [0, 4]
3: [1]
4: [1, 2]
```

Проследете BFS алгоритъма започвайки от връх 0. Покажете:

a) Редът на посещаване на върховете

b) Съдържанието на опашката след всяка dequeue операция

c) BFS дървото (parent връзки)

<CollapsibleSection title="Решение" icon="✅">

**Граф структура:**

```
    0
   / \
  1   2
 / \   \
3   4---+
```

**Проследяване на BFS от връх 0:**

| Стъпка | Dequeue | Queue след dequeue | Enqueue | Visited | Output |
|--------|---------|-------------------|---------|---------|--------|
| Init | - | [0] | 0 | {0} | - |
| 1 | 0 | [] | 1, 2 | {0,1,2} | 0 |
| 2 | 1 | [2] | 3, 4 | {0,1,2,3,4} | 0, 1 |
| 3 | 2 | [3, 4] | - (4 вече посетен) | {0,1,2,3,4} | 0, 1, 2 |
| 4 | 3 | [4] | - | {0,1,2,3,4} | 0, 1, 2, 3 |
| 5 | 4 | [] | - | {0,1,2,3,4} | 0, 1, 2, 3, 4 |

**a) Ред на посещаване:**

**0 → 1 → 2 → 3 → 4**

**b) Queue след всяка dequeue:**

1. След dequeue 0: `[1, 2]`
2. След dequeue 1: `[2, 3, 4]`
3. След dequeue 2: `[3, 4]`
4. След dequeue 3: `[4]`
5. След dequeue 4: `[]`

**c) BFS дърво (parent връзки):**

```
Parent relationships:
0 → parent: null (start)
1 → parent: 0
2 → parent: 0
3 → parent: 1
4 → parent: 1

Визуализация:
       0
      / \
     1   2
    / \
   3   4
```

**Забележки:**

- Връх 4 е достъпен от 1 и 2, но се посещава първо от 1 (защото 1 е в опашката преди 2)
- Parent на връх 4 е 1 (първият, който го добави в queue)

</CollapsibleSection>

</ExerciseCard>

<ExerciseCard difficulty="easy-medium">

### DFS vs BFS Сравнение

За същия граф от предишната задача:

```
0: [1, 2]
1: [0, 3, 4]
2: [0, 4]
3: [1]
4: [1, 2]
```

a) Проследете DFS започвайки от връх 0 (предполагайте че съседите се посещават в нарастващ ред)

b) Сравнете реда на посещаване с BFS

c) Обяснете защо редовете се различават

<CollapsibleSection title="Решение" icon="✅">

**a) DFS проследяване от връх 0:**

**Рекурсивен DFS:**

```
DFS(0):
  visited[0] = true, output 0
  DFS(1):  // първи съсед на 0
    visited[1] = true, output 1
    DFS(3):  // първи невидян съсед на 1 (0 е видян)
      visited[3] = true, output 3
      // 3 няма невидени съседи
    DFS(4):  // втори невидян съсед на 1
      visited[4] = true, output 4
      // 4 има съсед 2, но той не е видян
      DFS(2):
        visited[2] = true, output 2
        // 2 няма невидени съседи
  // Връщане, 2 е вече видян
```

**Ред на посещаване: 0 → 1 → 3 → 4 → 2**

**b) Сравнение с BFS:**

| Алгоритъм | Ред на посещаване |
|-----------|-------------------|
| BFS | 0 → 1 → 2 → 3 → 4 |
| DFS | 0 → 1 → 3 → 4 → 2 |

**c) Защо се различават:**

<Tabs>
<TabItem value="bfs-explanation" label="BFS Обяснение" default>

**BFS - Ниво по ниво:**

- Използва **опашка** (FIFO - First In, First Out)
- Посещава всички върхове на **едно ниво** преди да премине към следващото
- **Ниво 0**: 0
- **Ниво 1**: 1, 2 (директни съседи на 0)
- **Ниво 2**: 3, 4 (директни съседи на 1 и 2)

**Поведение:**
1. Започва от 0
2. Посещава всички съседи на 0 (1 и 2) преди да продължи
3. После посещава техните съседи (3 и 4)

</TabItem>
<TabItem value="dfs-explanation" label="DFS Обяснение">

**DFS - В дълбочина:**

- Използва **стек** (LIFO - Last In, First Out) или рекурсия
- Отива **колкото е възможно по-дълбоко** по един път преди да се върне назад
- Следва един клон до края преди да пробва друг

**Поведение:**
1. Започва от 0
2. Избира първия съсед 1
3. От 1 избира първия невидян съсед 3
4. От 3 се връща към 1, избира 4
5. От 4 стига до 2
6. Връх 2 се посещава последен, макар да е директен съсед на 0!

</TabItem>
<TabItem value="visual" label="Визуално Сравнение">

**BFS - Слой по слой:**

```
       0           ← Ниво 0
      / \
     1   2         ← Ниво 1
    / \
   3   4           ← Ниво 2
```

Ред: 0 → (1, 2) → (3, 4)

**DFS - Дълбочина първо:**

```
0 → 1 → 3
    ↓
    4 → 2
```

Ред: 0 → 1 → 3 (back) → 4 → 2

</TabItem>
</Tabs>

**Ключови разлики:**

| Аспект | BFS | DFS |
|--------|-----|-----|
| Структура | Queue (FIFO) | Stack/Recursion (LIFO) |
| Стратегия | Широчина | Дълбочина |
| Памет | O(ширина) | O(дълбочина) |
| Първо посещава | Съседи на текущо ниво | Далечни възли по пътя |

</CollapsibleSection>

</ExerciseCard>

---

## Средни упражнения (MEDIUM)

Приложение и анализ на концепциите

<ExerciseCard difficulty="medium">

### Избор на Представяне

За всеки сценарий, изберете най-доброто представяне на граф (**матрица на съседство** или **списък на съседство**) и обосновете избора си:

**Сценарии:**

a) Пълен граф с 50 върха (всяка двойка е свързана)

b) Социална мрежа с 1 милион потребители, средно 200 приятели на потребител

c) Малка игрална дъска (10×10) където всяка клетка се свързва с съседните клетки

d) Sparse citation network с 10,000 статии и 15,000 цитирания

<CollapsibleSection title="Решение" icon="✅">

**Анализ:**

<Tabs>
<TabItem value="scenario-a" label="a) Пълен граф - 50 върха" default>

**Избор: Матрица на съседство ✅**

**Обосновка:**

- **Пълен граф**: Всеки връх е свързан с всички останали
- Максимални ребра: (50 × 49) / 2 = 1,225 ребра
- **Плътност**: 100%!

**Сравнение на паметта:**

| Представяне | Памет |
|-------------|-------|
| Матрица | 50² = 2,500 клетки |
| Списък | 50 + 2×1,225 = 2,500 записа |

**Заключение:**
- Матрицата използва същата памет, но дава O(1) проверка за ребро
- Списъкът не печели нищо при пълен граф

</TabItem>
<TabItem value="scenario-b" label="b) Социална мрежа - 1M потребители">

**Избор: Списък на съседство ✅**

**Обосновка:**

- **V** = 1,000,000 потребители
- **E** ≈ 1,000,000 × 200 / 2 = 100,000,000 ребра
- Максимални ребра: (10⁶ × (10⁶-1)) / 2 ≈ 5 × 10¹¹
- **Плътност**: 100M / 500B ≈ 0.02%

**Сравнение на паметта:**

| Представяне | Памет |
|-------------|-------|
| Матрица | 10¹² клетки = 1TB (невъзможно!) |
| Списък | 1M + 200M записа ≈ 800MB |

**Заключение:**
- Матрицата е **абсолютно непрактична**
- Списъкът е единственият разумен избор

</TabItem>
<TabItem value="scenario-c" label="c) Игрална дъска 10×10">

**Избор: Матрица на съседство ✅**

**Обосновка:**

- **V** = 100 клетки
- **E** ≈ 180 ребра (всяка вътрешна клетка → 4 съседа)
- Средна степен: 3.6 (ъгли 2, крайни 3, вътрешни 4)
- **Плътност**: 180 / 4,950 ≈ 3.6%

**Защо матрица?**

1. **Малък граф**: 100×100 = 10,000 клетки е съвсем управляемо
2. **Геометрична структура**: Често проверяваме "има ли път между (i,j) и (k,l)?"
3. **O(1) достъп**: Идеален за grid-based алгоритми (A*, Dijkstra)
4. **Лесна имплементация**: `grid[x][y]` е естествено

**Забележка:**
За 100×100 или по-големи дъски списъкът става по-добър!

</TabItem>
<TabItem value="scenario-d" label="d) Citation network - 10K статии">

**Избор: Списък на съседство ✅**

**Обосновка:**

- **V** = 10,000 статии
- **E** = 15,000 цитирания
- Максимални ребра: (10,000 × 9,999) / 2 ≈ 50,000,000
- **Плътност**: 15,000 / 50M ≈ 0.03%

**Сравнение на паметта:**

| Представяне | Памет |
|-------------|-------|
| Матрица | 100,000,000 клетки = 400MB |
| Списък | 10,000 + 30,000 записа ≈ 160KB |

**Заключение:**
- Списъкът е **~2500 пъти по-ефективен**
- Типичен sparse graph сценарий

</TabItem>
</Tabs>

**Обобщение:**

| Сценарий | Избор | Плътност | Причина |
|----------|-------|----------|---------|
| a) Пълен граф 50 | Матрица | 100% | Всички ребра присъстват |
| b) Social 1M | Списък | 0.02% | Огромен sparse граф |
| c) Grid 10×10 | Матрица | 3.6% | Малък + чести проверки |
| d) Citations 10K | Списък | 0.03% | Sparse граф |

**Правило на палеца:**
- Плътност &gt; 10-15%? → Матрица
- Плътност &lt; 10%? → Списък
- Малък граф (&lt;1000 върха) + чести проверки? → Матрица

</CollapsibleSection>

</ExerciseCard>

<ExerciseCard difficulty="medium">

### Намиране на Грешки в BFS

Намерете и поправете грешката в тази BFS имплементация:

```cpp
void BFS(const map<int, list<int>>& graph, int start) {
    queue<int> q;
    unordered_set<int> visited;
    q.push(start);

    while (!q.empty()) {
        int v = q.front(); q.pop();
        visited.insert(v);
        cout << v << " ";

        for (int nbr : graph.at(v)) {
            if (!visited.count(nbr)) {
                q.push(nbr);
            }
        }
    }
}
```

<CollapsibleSection title="Решение" icon="✅">

**Грешка: Върхът се маркира като посетен СЛЕД dequeue вместо ПРЕДИ enqueue!**

**Проблем:**

Ако няколко върха имат общ съсед, той ще бъде добавен в опашката **многократно**:

```
Граф:    0
        / \
       1   2

BFS(0):
1. Dequeue 0, visited={0}, queue=[]
2. Check neighbor 1: not visited → push(1), queue=[1]
3. Check neighbor 2: not visited → push(2), queue=[1,2]
4. Dequeue 1, visited={0,1}, queue=[2]
5. Check neighbor 0: visited → skip
6. Check neighbor 2: NOT VISITED YET! → push(2), queue=[2,2]  ❌
7. Dequeue 2, visited={0,1,2}
8. Dequeue 2 AGAIN! ❌
```

**Последствия:**
- Върховете се обработват многократно
- Неефективност O(V+E) става O(V²+E)
- Възможен infinite loop при грешки

**Правилна имплементация:**

```cpp
void BFS(const map<int, list<int>>& graph, int start) {
    queue<int> q;
    unordered_set<int> visited;

    // Маркираме като посетен ВЕДНАГА при добавяне в опашката!
    visited.insert(start);
    q.push(start);

    while (!q.empty()) {
        int v = q.front(); q.pop();
        cout << v << " ";

        for (int nbr : graph.at(v)) {
            if (!visited.count(nbr)) {
                visited.insert(nbr);  // ✅ Маркираме ПРЕДИ push!
                q.push(nbr);
            }
        }
    }
}
```

**Ключови промени:**

1. **Ред 6**: `visited.insert(start)` - маркираме началния връх ПРЕДИ цикъла
2. **Ред 15**: `visited.insert(nbr)` - маркираме ПРЕДИ `push(nbr)`

**Защо работи:**

- Когато добавим връх в опашката, той е "резервиран" за обработка
- Други върхове няма да го добавят повторно
- Гарантира O(V+E) сложност

**Общо правило:**

> **BFS Правило**: Маркирай като visited при enqueue, не при dequeue!

</CollapsibleSection>

</ExerciseCard>

<ExerciseCard difficulty="medium">

### Проверка за Наличие на Ребро

Имплементирайте функция `bool hasEdge(int u, int v)` за **матрица на съседство** и **списък на съседство**. Сравнете времевите им сложности.

```cpp
// За матрица на съседство
class MatrixGraph {
    vector<vector<int>> adj;
public:
    bool hasEdge(int u, int v) {
        // ВАШИЯТ КОД ТУК
    }
};

// За списък на съседство
class ListGraph {
    map<int, list<int>> adj;
public:
    bool hasEdge(int u, int v) {
        // ВАШИЯТ КОД ТУК
    }
};
```

<CollapsibleSection title="Решение" icon="✅">

**Решение:**

<Tabs>
<TabItem value="matrix" label="Матрица на Съседство" default>

```cpp
class MatrixGraph {
    vector<vector<int>> adj;
    int n;  // брой върхове
public:
    MatrixGraph(int vertices) : n(vertices) {
        adj.resize(n, vector<int>(n, 0));
    }

    void addEdge(int u, int v) {
        if (u >= 0 && u < n && v >= 0 && v < n) {
            adj[u][v] = 1;
            adj[v][u] = 1;  // За ненасочен граф
        }
    }

    bool hasEdge(int u, int v) {
        // Проверка за валидност
        if (u < 0 || u >= n || v < 0 || v >= n) {
            return false;
        }

        // Директен достъп до клетка
        return adj[u][v] == 1;
    }
};
```

**Времева сложност: O(1)**

**Обяснение:**
- Директен достъп до позиция [u][v]
- Константно време независимо от размера на графа

</TabItem>
<TabItem value="list" label="Списък на Съседство">

```cpp
class ListGraph {
    map<int, list<int>> adj;
public:
    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);  // За ненасочен граф
    }

    bool hasEdge(int u, int v) {
        // Проверка дали връх u съществува
        if (adj.find(u) == adj.end()) {
            return false;
        }

        // Търсене на v в списъка на съседи на u
        const list<int>& neighbors = adj[u];

        for (int neighbor : neighbors) {
            if (neighbor == v) {
                return true;
            }
        }

        return false;
    }

    // Алтернативна имплементация със std::find
    bool hasEdge_v2(int u, int v) {
        if (adj.find(u) == adj.end()) {
            return false;
        }

        const list<int>& neighbors = adj[u];
        return find(neighbors.begin(), neighbors.end(), v) != neighbors.end();
    }
};
```

**Времева сложност: O(degree(u)) ≈ O(V) worst case**

**Обяснение:**
- Трябва да итерираме през всички съседи на u
- Worst case: връх с много съседи
- Best case: O(1) ако е първи съсед

</TabItem>
<TabItem value="comparison" label="Сравнение">

**Сравнителна таблица:**

| Операция | Матрица | Списък |
|----------|---------|--------|
| hasEdge() | **O(1)** | O(degree) ≈ O(V) |
| addEdge() | O(1) | O(1) |
| Памет | O(V²) | O(V+E) |

**Кога е важно hasEdge():**

**Матрицата печели когато:**
- ✅ Често проверяваме за конкретни ребра
- ✅ Алгоритми с много edge queries
- ✅ Плътни графи

**Списъкът е по-добър когато:**
- ✅ Рядко проверяваме за ребра
- ✅ Повече обхождаме съседите
- ✅ Разредени графи

**Оптимизация за списък:**

Ако `hasEdge()` е критична операция, използвайте `unordered_set` вместо `list`:

```cpp
map<int, unordered_set<int>> adj;

bool hasEdge(int u, int v) {
    if (adj.find(u) == adj.end()) return false;
    return adj[u].count(v) > 0;  // O(1) средно!
}
```

Компромис: Малко повече памет за много по-бърза проверка!

</TabItem>
</Tabs>

</CollapsibleSection>

</ExerciseCard>

---

## Средни-Трудни упражнения (MEDIUM-HARD)

Напреднало приложение и експериментиране

<ExerciseCard difficulty="medium-hard">

### Преброяване на Свързани Компоненти

Напишете функция, която използва DFS за преброяване на броя свързани компоненти в ненасочен граф представен като списък на съседство:

```cpp
int countComponents(const map<int, list<int>>& graph) {
    // ВАШИЯТ КОД ТУК
}
```

**Тест:**

```
Граф:
0: [1]
1: [0, 2]
2: [1]
3: [4]
4: [3]
5: []

Очакван резултат: 3 компоненти
```

<CollapsibleSection title="Решение" icon="✅">

**Решение:**

```cpp
#include <map>
#include <list>
#include <unordered_set>
#include <iostream>
using namespace std;

// Helper function за DFS обхождане на една компонента
void DFS_component(
    const map<int, list<int>>& graph,
    int v,
    unordered_set<int>& visited
) {
    visited.insert(v);

    // Ако върхът няма съседи (изолиран)
    if (graph.find(v) == graph.end()) {
        return;
    }

    // Обхождаме всички съседи
    for (int neighbor : graph.at(v)) {
        if (!visited.count(neighbor)) {
            DFS_component(graph, neighbor, visited);
        }
    }
}

int countComponents(const map<int, list<int>>& graph) {
    unordered_set<int> visited;
    int componentCount = 0;

    // Извличаме всички върхове от графа
    unordered_set<int> allVertices;
    for (const auto& [vertex, neighbors] : graph) {
        allVertices.insert(vertex);
        for (int neighbor : neighbors) {
            allVertices.insert(neighbor);
        }
    }

    // Стартираме DFS от всеки непосетен връх
    for (int v : allVertices) {
        if (!visited.count(v)) {
            DFS_component(graph, v, visited);
            componentCount++;  // Нова компонента!
        }
    }

    return componentCount;
}

// Тестова функция
int main() {
    map<int, list<int>> graph;
    graph[0] = {1};
    graph[1] = {0, 2};
    graph[2] = {1};
    graph[3] = {4};
    graph[4] = {3};
    graph[5] = {};  // Изолиран връх

    int components = countComponents(graph);
    cout << "Брой свързани компоненти: " << components << endl;

    return 0;
}
```

**Изход:**

```
Брой свързани компоненти: 3
```

**Обяснение:**

**Компоненти:**
1. **Компонента 1**: {0, 1, 2}
   - 0-1-2 са свързани
2. **Компонента 2**: {3, 4}
   - 3-4 са свързани
3. **Компонента 3**: {5}
   - 5 е изолиран връх

**Как работи:**

1. **Извличаме всички върхове**: Итерираме през графа и добавяме всички върхове в `allVertices`

2. **DFS от всеки непосетен връх**:
   - Ако връх не е посетен → нова компонента
   - DFS маркира всички върхове в тази компонента

3. **Броене**: Всяко извикване на DFS от непосетен връх = +1 компонента

**Времева сложност:**

- **O(V + E)**: Всеки връх и ребро се посещава веднъж

**Пространствена сложност:**

- **O(V)**: За visited set и recursion stack

**Приложения:**

- Преброяване на острови в grid
- Социални мрежи - групи приятели
- Network connectivity анализ

</CollapsibleSection>

</ExerciseCard>

---

## Трудни упражнения (HARD)

Комплексен анализ и решаване на проблеми

<ExerciseCard difficulty="hard">

### Най-кратък път с BFS

Имплементирайте функция, която намира най-краткия път между два върха в нетеглен граф използвайки BFS. Функцията трябва да върне както разстоянието, така и действителния път.

```cpp
pair<int, vector<int>> shortestPath(
    const map<int, list<int>>& graph,
    int start,
    int end
) {
    // Върни pair with distance and path
    // Ако няма път, върни -1 и празен vector
    // ВАШИЯТ КОД ТУК
}
```

<CollapsibleSection title="Решение" icon="✅">

**Решение:**

```cpp
#include <map>
#include <list>
#include <vector>
#include <queue>
#include <unordered_map>
#include <unordered_set>
#include <algorithm>
#include <iostream>
using namespace std;

pair<int, vector<int>> shortestPath(
    const map<int, list<int>>& graph,
    int start,
    int end
) {
    // Проверка за валидност
    if (graph.find(start) == graph.end()) {
        return {-1, {}};
    }

    // Ако старт == край
    if (start == end) {
        return {0, {start}};
    }

    // BFS setup
    queue<int> q;
    unordered_set<int> visited;
    unordered_map<int, int> parent;  // За реконструкция на пътя

    q.push(start);
    visited.insert(start);
    parent[start] = -1;  // Началният няма parent

    // BFS търсене
    while (!q.empty()) {
        int v = q.front();
        q.pop();

        // Намерихме крайната точка!
        if (v == end) {
            // Реконструкция на пътя
            vector<int> path;
            int current = end;

            while (current != -1) {
                path.push_back(current);
                current = parent[current];
            }

            // Обръщаме пътя (от край към старт → от старт към край)
            reverse(path.begin(), path.end());

            int dist = path.size() - 1;
            return {dist, path};
        }

        // Обхождаме съседите
        if (graph.find(v) != graph.end()) {
            for (int neighbor : graph.at(v)) {
                if (!visited.count(neighbor)) {
                    visited.insert(neighbor);
                    parent[neighbor] = v;
                    q.push(neighbor);
                }
            }
        }
    }

    // Не е намерен път
    return {-1, {}};
}

// Тестова функция
int main() {
    map<int, list<int>> graph;
    graph[0] = {1, 2};
    graph[1] = {0, 3, 4};
    graph[2] = {0, 4};
    graph[3] = {1, 5};
    graph[4] = {1, 2, 5};
    graph[5] = {3, 4};

    auto [dist, path] = shortestPath(graph, 0, 5);

    if (dist == -1) {
        cout << "Няма път!" << endl;
    } else {
        cout << "Най-кратко разстояние: " << dist << endl;
        cout << "Път: ";
        for (int v : path) {
            cout << v << " ";
        }
        cout << endl;
    }

    return 0;
}
```

**Изход:**

```
Най-кратко разстояние: 3
Път: 0 1 3 5
```

**Обяснение:**

**Граф структура:**

```
    0---1---3
    |   |   |
    2---4---5
```

**Как работи:**

1. **BFS setup**:
   - Queue за обхождане
   - Visited set за проследяване
   - **Parent map** за записване кой връх откри текущия

2. **BFS търсене**:
   - Обхождаме ниво по ниво
   - Когато намерим `end`, спираме
   - BFS гарантира че намираме най-краткия път!

3. **Реконструкция на пътя**:
   - Започваме от `end`
   - Следваме parent pointer-ите назад до `start`
   - Обръщаме пътя за да е от старт към край

**Защо BFS намира най-краткия път:**

- BFS обхожда ниво по ниво
- Първото достигане на `end` е с минималната дистанция
- Ако има път с k ребра, BFS ще го намери преди пътища с k+1 ребра

**Времева сложност:**

- **O(V + E)**: BFS обхождане
- **O(V)**: Реконструкция на пътя

**Пространствена сложност:**

- **O(V)**: Queue, visited, parent

**Важни забележки:**

- ⚠️ Работи само за **нетеглени графи**!
- За теглени графи използвайте Dijkstra
- Parent map е ключът за реконструкция на пътя

</CollapsibleSection>

</ExerciseCard>

<ExerciseCard difficulty="hard">

### Откриване на Цикли

Имплементирайте функция използваща DFS, която открива дали ненасочен граф съдържа цикъл. Обяснете вашия подход и защо DFS е подходящ за този проблем.

```cpp
bool hasCycle(const map<int, list<int>>& graph) {
    // ВАШИЯТ КОД ТУК
}
```

<CollapsibleSection title="Решение" icon="✅">

**Решение:**

```cpp
#include <map>
#include <list>
#include <unordered_set>
#include <iostream>
using namespace std;

// Helper функция за DFS
bool DFS_hasCycle(
    const map<int, list<int>>& graph,
    int v,
    int parent,
    unordered_set<int>& visited
) {
    visited.insert(v);

    // Обхождаме всички съседи
    if (graph.find(v) != graph.end()) {
        for (int neighbor : graph.at(v)) {
            // Ако съседът не е посетен, рекурсивно го проверяваме
            if (!visited.count(neighbor)) {
                if (DFS_hasCycle(graph, neighbor, v, visited)) {
                    return true;  // Намерен цикъл в поддървото
                }
            }
            // Ако съседът е посетен И НЕ е parent → back edge → цикъл!
            else if (neighbor != parent) {
                return true;
            }
        }
    }

    return false;
}

bool hasCycle(const map<int, list<int>>& graph) {
    unordered_set<int> visited;

    // Извличаме всички върхове
    unordered_set<int> allVertices;
    for (const auto& [vertex, neighbors] : graph) {
        allVertices.insert(vertex);
        for (int neighbor : neighbors) {
            allVertices.insert(neighbor);
        }
    }

    // Проверяваме всяка свързана компонента
    for (int v : allVertices) {
        if (!visited.count(v)) {
            if (DFS_hasCycle(graph, v, -1, visited)) {
                return true;
            }
        }
    }

    return false;
}

// Тестова функция
int main() {
    // Тест 1: Граф БЕЗ цикъл (дърво)
    map<int, list<int>> graph1;
    graph1[0] = {1, 2};
    graph1[1] = {0};
    graph1[2] = {0};

    cout << "Граф 1 (дърво): " << (hasCycle(graph1) ? "Има цикъл" : "Няма цикъл") << endl;

    // Тест 2: Граф С цикъл
    map<int, list<int>> graph2;
    graph2[0] = {1, 2};
    graph2[1] = {0, 2};
    graph2[2] = {0, 1};

    cout << "Граф 2 (триъгълник): " << (hasCycle(graph2) ? "Има цикъл" : "Няма цикъл") << endl;

    // Тест 3: Несвързан граф с цикъл
    map<int, list<int>> graph3;
    graph3[0] = {1};
    graph3[1] = {0};
    graph3[2] = {3, 4};
    graph3[3] = {2, 4};
    graph3[4] = {2, 3};

    cout << "Граф 3 (несвързан с цикъл): " << (hasCycle(graph3) ? "Има цикъл" : "Няма цикъл") << endl;

    return 0;
}
```

**Изход:**

```
Граф 1 (дърво): Няма цикъл
Граф 2 (триъгълник): Има цикъл
Граф 3 (несвързан с цикъл): Има цикъл
```

**Обяснение:**

**Как работи:**

**Ключова идея:**

В **ненасочен граф**, цикъл съществува ако при DFS обхождане срещнем **посетен връх, който не е parent на текущия връх**.

**Защо parent е важен:**

В ненасочен граф имаме ребра в двете посоки:
```
1 -- 2

adj[1] = {2}
adj[2] = {1}
```

При DFS от 1:
1. Посещаваме 1
2. Отиваме към 2 (parent=1)
3. От 2 проверяваме съсед 1
   - 1 е посетен, НО е parent → не е цикъл, просто обратното ребро!

**Откриване на цикъл:**

```
1 -- 2
|    |
3 -- 4

DFS от 1:
1 → 2 (parent=1)
  2 → 4 (parent=2)
    4 → 3 (parent=4)
      3 → 1 (parent=3)
        1 е посетен И НЕ е parent(3) → Цикъл!
```

**Времева сложност:**

- **O(V + E)**: Всеки връх и ребро се посещава веднъж

**Пространствена сложност:**

- **O(V)**: За visited set и recursion stack

**Защо DFS е подходящ:**

✅ **Следи родител-дете връзки** естествено чрез рекурсията

✅ **Открива back edges** - ключът към откриване на цикли

✅ **Проста имплементация** за ненасочени графи

❌ BFS е по-труден защото трябва експлицитно да следим parent-и

**Важни забележки:**

1. За **насочен граф** алгоритъмът е **различен** (използваме color marking)
2. Parent параметърът е **критичен** за ненасочени графи
3. Трябва да проверим **всички компоненти** (несвързан граф)

</CollapsibleSection>

</ExerciseCard>

<ExerciseCard difficulty="hard">

### Проверка за Двуделен Граф

Напишете функция, която определя дали граф е двуделен (bipartite) - може да се оцвети с два цвята така че няма два съседни върха с един цвят. Използвайте BFS за имплементацията.

```cpp
bool isBipartite(const map<int, list<int>>& graph, int start) {
    // ВАШИЯТ КОД ТУК
}
```

<CollapsibleSection title="Решение" icon="✅">

**Решение:**

```cpp
#include <map>
#include <list>
#include <queue>
#include <unordered_map>
#include <iostream>
using namespace std;

bool isBipartite(const map<int, list<int>>& graph, int start) {
    // Цветове: 0 и 1 (или A и B групи)
    unordered_map<int, int> color;
    queue<int> q;

    // Започваме със цвят 0
    color[start] = 0;
    q.push(start);

    while (!q.empty()) {
        int v = q.front();
        q.pop();

        int currentColor = color[v];
        int neighborColor = 1 - currentColor;  // Противоположен цвят

        // Обхождаме съседите
        if (graph.find(v) != graph.end()) {
            for (int neighbor : graph.at(v)) {
                // Ако съседът не е оцветен
                if (color.find(neighbor) == color.end()) {
                    color[neighbor] = neighborColor;
                    q.push(neighbor);
                }
                // Ако съседът е оцветен със същия цвят → НЕ е bipartite!
                else if (color[neighbor] == currentColor) {
                    return false;
                }
            }
        }
    }

    return true;
}

// Функция за проверка на целия граф (всички компоненти)
bool isBipartite_allComponents(const map<int, list<int>>& graph) {
    unordered_map<int, int> color;

    // Извличаме всички върхове
    unordered_set<int> allVertices;
    for (const auto& [vertex, neighbors] : graph) {
        allVertices.insert(vertex);
        for (int neighbor : neighbors) {
            allVertices.insert(neighbor);
        }
    }

    // Проверяваме всяка компонента
    for (int v : allVertices) {
        if (color.find(v) == color.end()) {
            // Започваме BFS от непосетен връх
            queue<int> q;
            color[v] = 0;
            q.push(v);

            while (!q.empty()) {
                int curr = q.front();
                q.pop();

                int currentColor = color[curr];
                int neighborColor = 1 - currentColor;

                if (graph.find(curr) != graph.end()) {
                    for (int neighbor : graph.at(curr)) {
                        if (color.find(neighbor) == color.end()) {
                            color[neighbor] = neighborColor;
                            q.push(neighbor);
                        }
                        else if (color[neighbor] == currentColor) {
                            return false;
                        }
                    }
                }
            }
        }
    }

    return true;
}

// Тестова функция
int main() {
    // Тест 1: Bipartite граф (четирибъгълник)
    map<int, list<int>> graph1;
    graph1[0] = {1, 3};
    graph1[1] = {0, 2};
    graph1[2] = {1, 3};
    graph1[3] = {0, 2};

    cout << "Граф 1 (квадрат): " << (isBipartite_allComponents(graph1) ? "Bipartite" : "НЕ е bipartite") << endl;

    // Тест 2: НЕ е bipartite (триъгълник)
    map<int, list<int>> graph2;
    graph2[0] = {1, 2};
    graph2[1] = {0, 2};
    graph2[2] = {0, 1};

    cout << "Граф 2 (триъгълник): " << (isBipartite_allComponents(graph2) ? "Bipartite" : "НЕ е bipartite") << endl;

    // Тест 3: Bipartite (дърво винаги е bipartite)
    map<int, list<int>> graph3;
    graph3[0] = {1, 2};
    graph3[1] = {0, 3};
    graph3[2] = {0, 4};

    cout << "Граф 3 (дърво): " << (isBipartite_allComponents(graph3) ? "Bipartite" : "НЕ е bipartite") << endl;

    return 0;
}
```

**Изход:**

```
Граф 1 (квадрат): Bipartite
Граф 2 (триъгълник): НЕ е bipartite
Граф 3 (дърво): Bipartite
```

**Обяснение:**

**Какво е двуделен (bipartite) граф?**

Граф е bipartite ако можем да разделим върховете на **два множества** така че:
- Всяко ребро свързва връх от едното множество с връх от другото
- **Няма ребра между върхове от едно и също множество**

**Примери:**

✅ **Bipartite:**
```
A группа: {0, 2}
B группа: {1, 3}

0 --- 1
|     |
3 --- 2
```

❌ **НЕ е bipartite:**
```
Триъгълник:
0 --- 1
 \   /
   2

Не може да се раздели на 2 групи!
```

**Как работи алгоритъмът:**

1. **Оцветяване с 2 цвята** (0 и 1)
2. **BFS обхождане**:
   - Започваме с цвят 0
   - Всеки съсед получава противоположен цвят (1 - currentColor)
3. **Проверка за конфликт**:
   - Ако срещнем съсед със същия цвят → НЕ е bipartite!

**Защо BFS?**

✅ Оцветяваме ниво по ниво

✅ Лесно проследяваме "противоположни" цветове

✅ Може да се замени с DFS, но BFS е по-интуитивен

**Времева сложност:**

- **O(V + E)**: BFS обхождане

**Приложения:**

- **Matching проблеми** (job assignment)
- **Scheduling** (конфликти на ресурси)
- **Coloring проблеми**

**Важни факти:**

- ✅ Всяко **дърво** е bipartite
- ✅ Графи без **нечетни цикли** са bipartite
- ❌ Графи с **нечетен цикъл** НЕ са bipartite

</CollapsibleSection>

</ExerciseCard>

---

## Допълнителни ресурси

<InfoBox title="Полезни ресурси за практика">

**Инструменти:**
- [Graph Online](https://graphonline.ru/en/) - Създаване и визуализация на графи
- [VisuAlgo](https://visualgo.net/en/dfsbfs) - Интерактивна визуализация на BFS/DFS
- [CS Academy Graph Editor](https://csacademy.com/app/graph_editor/) - Редактор на графи

**Практически съвети:**
- Започнете с малки примери (4-6 върха) и проследете ръчно
- Рисувайте графите преди да кодирате
- Тествайте с edge cases: празен граф, един връх, несвързани компоненти
- Използвайте debugger за да видите стека/опашката при обхождане

</InfoBox>

<SuccessBox title="Ключови точки за запомняне">

- **Матрица**: O(V²) памет, O(1) проверка, добра за плътни графи
- **Списък**: O(V+E) памет, O(V+E) обхождане, добър за разредени графи
- **BFS**: Queue, ниво по ниво, най-кратък път в нетеглени графи - O(V+E)
- **DFS**: Stack/recursion, в дълбочина, открива цикли и компоненти - O(V+E)
- **Винаги маркирайте като visited** при enqueue (BFS) или при visit (DFS)
- **Parent tracking** е ключов за реконструкция на пътища
- **Проверявайте всички компоненти** при несвързани графи

</SuccessBox>
