# Graph Representation and Algorithms - Exercise Set

## Foundation Exercises (EASY)

**Exercise 1 [EASY]: Graph Terminology**
Define the following terms in your own words and provide a real-world example for each:
- Vertex
- Edge
- Degree
- Adjacency

**Exercise 2 [EASY]: Graph Classification**
For each scenario, identify whether the graph should be:
- Directed or Undirected
- Weighted or Unweighted

a) Twitter follow relationships (A follows B doesn't mean B follows A)
b) Distance between cities on a map
c) Facebook friendships
d) One-way streets in a city with traffic congestion times

**Exercise 3 [EASY]: Reading Adjacency Matrix**
Given this adjacency matrix for an undirected graph with vertices \{0, 1, 2, 3\}:
```
  0 1 2 3
0 0 1 1 0
1 1 0 0 1
2 1 0 0 1
3 0 1 1 0
```
a) List all edges in the graph
b) What is the degree of vertex 1?
c) Which vertices are adjacent to vertex 2?

**Exercise 4 [EASY]: STL Container Selection**
Match each C++ STL container with its best use case in graph implementations:
- `vector<vector<int>>`
- `map<int, list<int>>`
- `unordered_set<int>`
- `priority_queue<pair<int,int>>`

Use cases:
A) Storing visited vertices in traversal
B) Adjacency matrix for small graphs
C) Adjacency list with flexible vertex IDs
D) Implementing Dijkstra's algorithm

**Exercise 5 [EASY]: Space Complexity Analysis**
A graph has 100 vertices and 200 edges.
a) How much space (in terms of integer cells) does an adjacency matrix use?
b) How much space does an adjacency list use?
c) Which representation is more space-efficient for this graph?

## Building Understanding (EASY-MEDIUM)

**Exercise 6 [EASY-MEDIUM]: Code Reading - Adjacency List**
What does this code output?
```cpp
map<int, list<int>> adj;
adj[1] = \{2, 3\};
adj[2] = \{1, 4\};
adj[3] = \{1\};
adj[4] = \{2\};

for (int n : adj[2]) {
    cout << n << " ";
}
```

**Exercise 7 [EASY-MEDIUM]: Building an Adjacency Matrix**
Write C++ code to create an adjacency matrix for a directed graph with 4 vertices and these edges: (0→1), (0→2), (1→2), (2→3), (3→1)

**Exercise 8 [MEDIUM]: Complete the Implementation**
Fill in the missing code to add an edge to an adjacency list representation for a weighted, undirected graph:

```cpp
class WeightedGraph {
    map<int, list<pair<int, int>>> adj; // vertex -> {neighbor, weight}
public:
    void addEdge(int u, int v, int weight) {
        // YOUR CODE HERE
    }
};
```

**Exercise 9 [MEDIUM]: BFS Trace**
Given this graph represented as an adjacency list:
```
0: [1, 2]
1: [0, 3, 4]
2: [0, 4]
3: [1]
4: [1, 2]
```
Trace the BFS algorithm starting from vertex 0. Show:
a) The order vertices are visited
b) The contents of the queue after each dequeue operation
c) The BFS tree (parent relationships)

**Exercise 10 [MEDIUM]: DFS vs BFS**
For the same graph in Exercise 9:
a) Trace DFS starting from vertex 0 (assume neighbors are visited in ascending order)
b) Compare the visiting order with BFS
c) Explain why the orders differ

## Application and Analysis (MEDIUM)

**Exercise 11 [MEDIUM]: Representation Selection**
For each scenario, choose the best graph representation (adjacency matrix or list) and justify your choice:

a) A complete graph with 50 vertices (every pair connected)
b) A social network with 1 million users where each user has an average of 200 friends
c) A small game board (10×10) where each cell connects to adjacent cells
d) A sparse citation network with 10,000 papers and 15,000 citations

**Exercise 12 [MEDIUM]: Bug Hunt**
Find and fix the bug in this BFS implementation:
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

**Exercise 13 [MEDIUM]: Implementing Edge Existence Check**
Implement a function `bool hasEdge(int u, int v)` for both adjacency matrix and adjacency list representations. Compare their time complexities.

```cpp
// For adjacency matrix
class MatrixGraph {
    vector<vector<int>> adj;
public:
    bool hasEdge(int u, int v) {
        // YOUR CODE HERE
    }
};

// For adjacency list
class ListGraph {
    map<int, list<int>> adj;
public:
    bool hasEdge(int u, int v) {
        // YOUR CODE HERE
    }
};
```

**Exercise 14 [MEDIUM-HARD]: Connected Components**
Write a function that uses DFS to count the number of connected components in an undirected graph represented as an adjacency list:

```cpp
int countComponents(const map<int, list<int>>& graph) {
    // YOUR CODE HERE
}
```

Test with this graph:
```
0: [1]
1: [0, 2]
2: [1]
3: [4]
4: [3]
5: []
```
Expected output: 3 components

## Advanced Application (HARD)

**Exercise 15 [HARD]: Shortest Path with BFS**
Implement a function that finds the shortest path between two vertices in an unweighted graph using BFS. The function should return both the distance and the actual path.

```cpp
pair<int, vector<int>> shortestPath(
    const map<int, list<int>>& graph, 
    int start, 
    int end
) {
    // Return {distance, path}
    // If no path exists, return {-1, {}}
    // YOUR CODE HERE
}
```

**Exercise 16 [HARD]: Cycle Detection**
Implement a function using DFS that detects if an undirected graph contains a cycle. Explain your approach and why DFS is suitable for this problem.

```cpp
bool hasCycle(const map<int, list<int>>& graph) {
    // YOUR CODE HERE
}
```

**Exercise 17 [HARD]: Bipartite Graph Check**
Write a function that determines if a graph is bipartite (can be colored with two colors such that no adjacent vertices have the same color). Use BFS for your implementation.

```cpp
bool isBipartite(const map<int, list<int>>& graph, int start) {
    // YOUR CODE HERE
}
```

**Exercise 18 [HARD]: Conversion Between Representations**
Implement two conversion functions:
```cpp
// Convert adjacency matrix to adjacency list
map<int, list<int>> matrixToList(const vector<vector<int>>& matrix) {
    // YOUR CODE HERE
}

// Convert adjacency list to adjacency matrix
vector<vector<int>> listToMatrix(const map<int, list<int>>& adjList, int n) {
    // YOUR CODE HERE
}
```

**Exercise 19 [HARD]: Graph Diameter**
The diameter of a graph is the longest shortest path between any two vertices. Implement a function to calculate the diameter of a connected, undirected graph.

```cpp
int graphDiameter(const map<int, list<int>>& graph) {
    // Hint: Run BFS from each vertex
    // YOUR CODE HERE
}
```

**Exercise 20 [HARD]: Memory-Efficient Graph Implementation**
Design and implement a graph class that automatically switches between adjacency matrix and adjacency list based on graph density. Include:
- Constructor that accepts an edge list
- Automatic representation selection based on edge count
- Methods: `addEdge()`, `removeEdge()`, `hasEdge()`, `getNeighbors()`
- Explanation of your density threshold decision

```cpp
class AdaptiveGraph {
    // YOUR DESIGN HERE
public:
    AdaptiveGraph(vector<pair<int,int>> edges, int numVertices);
    void addEdge(int u, int v);
    void removeEdge(int u, int v);
    bool hasEdge(int u, int v);
    vector<int> getNeighbors(int v);
};
```

---

## Bonus Challenge [HARD]

**Exercise 21 [HARD]: Multi-Source BFS**
Implement a modified BFS that starts from multiple source vertices simultaneously. This is useful in scenarios like finding nearest hospital from any point in a city.

```cpp
map<int, int> multiSourceBFS(
    const map<int, list<int>>& graph,
    const vector<int>& sources
) {
    // Return map: vertex -> distance to nearest source
    // YOUR CODE HERE
}
```

---

**Assessment Notes:**
- Exercises 1-5: Test basic understanding and terminology
- Exercises 6-10: Ensure students can read and trace code
- Exercises 11-14: Apply concepts to choose appropriate structures
- Exercises 15-21: Synthesize knowledge to solve complex problems