
Topic: Stack and Queue Applications: Shunting Yard Algorithm, Expression Evaluation, and Reverse Polish Notation
Description: This lecture introduces the Shunting Yard algorithm—a fundamental technique for parsing infix mathematical expressions and converting them to Reverse Polish Notation (RPN). Students explore how stacks and queues enable efficient expression evaluation, the algorithm's mechanics, and practical C++ implementations for building expression parsers and calculators.

Learning Objectives:
- Understand stack and queue data structures and their applications(By the end, students will be able to explain how stacks (LIFO) and queues (FIFO) differ, describe their basic operations, and identify when each is appropriate for solving problems.)
- Explain the Shunting Yard algorithm's purpose and methodology(Students will understand why the Shunting Yard algorithm is needed, how it converts infix notation to RPN, and the role of operator precedence and associativity.)
- Parse and evaluate mathematical expressions(Students will be able to trace through the Shunting Yard algorithm step-by-step, identify when tokens are pushed to stack or output queue, and evaluate resulting RPN expressions.)
- Implement the Shunting Yard algorithm in C++(Students will write or modify C++ code to tokenize expressions, apply the Shunting Yard algorithm, and compute numerical results from infix notation.)
- Handle operator precedence, associativity, and parentheses(Students will understand how to manage operator precedence (e.g., * before +), left/right associativity, and parenthetical grouping in expression parsing.)
$json.lectureOutline[0].sub_topics[1].properties.details
Lecture Outline:
- 1. Introduction and Motivation
Why expression parsing matters (Students should recognize that naive left-to-right evaluation fails for operator precedence; a structured algorithm is needed.),Infix vs. Reverse Polish Notation (RPN) (Students should understand that RPN requires no parentheses or precedence rules during evaluation—operators are applied to preceding operands.),Real-world applications (Students should see that this is not merely theoretical; it directly impacts software they use daily.)
- 2. Prerequisite Recap: Stack and Queue Basics
Stack operations (push, pop, peek) (Students should be able to manually trace simple stack operations and recall C++ operations (e.g., std::vector::push_back, pop_back).),Queue operations (enqueue, dequeue) (Students should understand std::queue or std::deque operations and recognize when FIFO order matters (e.g., job scheduling).),Operator precedence and associativity review (Students should recall rules and explain why 2 + 3 * 4 = 14, not 20.)
- 3. Core Concept: The Shunting Yard Algorithm
Algorithm overview and history (Students should understand the algorithm is a classic, well-established technique and grasp why it was necessary.),Tokenization: breaking expressions into tokens (Students should understand that tokenization is a preprocessing step; identify how to parse strings in C++ (std::string, istringstream, or manual iteration).),Main algorithm: processing tokens left-to-right (Students should be able to trace the algorithm step-by-step with examples like '3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3'.),Operator precedence and associativity handling (Students should understand why this step ensures correct order; manually trace a precedence-sensitive example.),Parentheses and special cases (Students should handle nested parentheses and recognize edge cases (e.g., empty expression, mismatched parens).)
- 4. Conversion: From Infix to RPN
Step-by-step example conversion (Students should manually perform the conversion, noting when tokens move to output queue and when the stack changes.),Handling operator precedence in conversion (Students should verify correctness by evaluating the resulting RPN and comparing to expected infix result.),Complex example with exponentiation and associativity (Students should observe that associativity changes the order of operations in the output queue.)
- 5. Evaluation: Computing Results from RPN
RPN evaluation using a stack (Students should trace RPN evaluation and understand why no precedence or parentheses are needed—the structure is unambiguous.),Handling binary operators and result propagation (Students should trace multiple examples and verify results match expected infix computation.),Error handling: invalid expressions (Students should identify error conditions and design defensive checks in their implementations.)
- 6. C++ Implementation Overview
Data structures: std::vector, std::stack, std::deque (Students should understand which container suits each role: stack for LIFO, deque for queue-like access and iteration.),Token representation and type identification (Students should design a simple Token structure and explain how to distinguish token types during parsing.),Precedence table and operator properties (Students should implement a precedence function getPrecedence(op) and understand why this lookup is central to the algorithm.),Main algorithm skeleton and pseudocode (Students should outline the main algorithm loop and recognize control flow patterns (if-else for token type, while loops for stack popping).)
- 7. Unary Operators and Advanced Cases
Distinguishing unary minus from binary minus (Students should recognize that context (preceding token type) determines unary vs. binary; handle unary ops specially in tokenization or during evaluation.),Handling functions like sin, cos, or sqrt if supported (Students should understand that the algorithm can be extended; note this for reference but focus on basic binary operators in this lecture.)
- 8. Examples and Case Studies
Worked example: '3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3' (Wikipedia's classic example) (Students should follow the full pipeline: tokenize → convert to RPN → evaluate, verifying the answer.),Building a simple graphing calculator (Students should understand how expression parsing enables dynamic computation; recognize the connection to graphing and parameter substitution.),Modulo operator and floating-point arithmetic (Students should test with expressions including %, and understand rounding/truncation behavior in C++.)
- 9. Activities and Student Engagement
Think-Pair-Share: tokenization strategies (Students should brainstorm and compare approaches, recognizing trade-offs between simplicity and robustness.),Guided practice: manual Shunting Yard trace (Students should complete the trace correctly and compare results with peers to verify understanding.),Quick quiz: identify operator precedence and associativity errors (Students should recognize errors in precedence handling or parenthesis matching and articulate the fix.),Coding exercise: implement tokenizer in C++ (Students should produce working code and test it with diverse inputs (negative numbers, decimals, spaces).),Collaborative debugging: fix a buggy Shunting Yard implementation (Students should trace execution mentally or with a debugger, pinpoint the bug, and justify the fix.)
- 10. Formative Assessment
Exit ticket: mini-quiz on RPN and precedence (Students submit answers. Instructor reviews to identify gaps (e.g., confusion about left-associativity or stack order).),Short problem set: diverse expressions and error cases (Students should show work, noting precedence decisions. Incorrect answers reveal misconceptions for targeted review.)
- 11. Summary and Key Takeaways
The Shunting Yard algorithm bridges human-readable infix and machine-friendly RPN (Students should internalize that this algorithm is a cornerstone of parsing in compilers and calculators.),Operator precedence and associativity are central (Students should remember to define and use precedence lookup correctly in all implementations.),Stack and queue abstractions are powerful problem-solving tools (Students should recognize that many algorithms leverage stack/queue mechanics; this lesson provides a concrete, motivating example.),C++ implementation requires careful attention to data structures and error handling (Students should practice defensive coding and testing to ensure robust calculator implementations.)
- 12. Extension and Further Learning
Extensions: variables, function calls, and trigonometric operators (Students interested in deeper study should explore how these extensions modify tokenization and precedence tables.),Relationship to recursive descent parsing and abstract syntax trees (Students should be aware that this is one of several parsing strategies and that further compiler courses explore alternatives.)

Content:
---
# Stack and Queue Applications: Shunting Yard Algorithm, Expression Evaluation, and Reverse Polish Notation

## Introduction and Motivation for Expression Parsing

### Why Expression Parsing Matters

Expression parsing is a cornerstone of computer science and programming. Humans use infix notation (e.g., `2 + 3 * 4`) intuitively, understanding operator precedence rules (“multiplication before addition”) almost unconsciously. However, **computers require explicit, structured algorithms** to determine the correct order of operations because they process expressions linearly, one token at a time, and lack innate knowledge of mathematical conventions.

**Example:**
- Naive left-to-right evaluation of `2 + 3 * 4` gives `(2 + 3) * 4 = 20`
- Mathematically correct evaluation uses precedence: `2 + (3 * 4) = 14`

If expression parsing did not exist, users would need to add parentheses everywhere to ensure correctness, making software unfriendly and error-prone.

### Infix vs. Reverse Polish Notation (RPN)

- **Infix Notation:** Operators between operands (`A + B`)
    - Human-friendly but ambiguous without precedence or parentheses
- **Reverse Polish Notation (RPN/Postfix):** Operators after operands (`A B +`)
    - No need for parentheses or precedence rules, since the order of operations is explicit

**Why RPN?**  
RPN is perfectly suited for computers because expression evaluation can be performed **left-to-right using a stack**, eliminating ambiguity and simplifying implementation.

### Real-World Applications

Every compiler, interpreter, calculator, or spreadsheet uses expression parsing. Whether evaluating `=A1 + B2 * C3` in Excel or generating machine code for `if (a > b + 1)`, **robust expression parsing is non-negotiable** for correctness and usability.

---

## Stack and Queue Basics: Prerequisite Recap

Understanding stacks and queues is foundational to the Shunting Yard algorithm and expression evaluation.

### Stack Operations (Push, Pop, Peek) – LIFO

- **Push:** Add an element to the top
- **Pop:** Remove the top element
- **Peek/Top:** View the top element without removing

**C++ Example:**
```cpp
#include <stack>
std::stack<int> s;
s.push(4); s.push(2); s.push(7);
int t = s.top(); // 7
s.pop();
```

**Key Use in Parsing:** Stack manages **temporarily stored operators** and tracks nested or pending operations.

### Queue Operations (Enqueue, Dequeue) – FIFO

- **Enqueue/Push:** Add to the back
- **Dequeue/Pop:** Remove from the front
- **Peek/Front:** View front element

**C++ Example:**
```cpp
#include <queue>
std::queue<int> q;
q.push(10); q.push(20); q.push(30);
int f = q.front(); // 10
q.pop(); // removes 10
```

**Key Use in Parsing:** Queue (often implemented with `std::deque`) collects tokens for the final output sequence.

### Operator Precedence and Associativity Review

- **Precedence:** Multiplication/division > addition/subtraction; exponentiation is higher yet
- **Associativity:** Most operators are **left-associative** (evaluate left-to-right); exponentiation is **right-associative**.

**Examples:**
- `10 - 3 - 2` → `(10 - 3) - 2 = 5`
- `2 ^ 3 ^ 2` → `2 ^ (3 ^ 2) = 512`, not `(2 ^ 3) ^ 2 = 64`

Parentheses allow temporary overriding of default rules.

---

## The Shunting Yard Algorithm: Core Concepts and Implementation

### Algorithm Overview

Developed by Edsger Dijkstra in 1961, the Shunting Yard algorithm converts infix expressions (e.g., `3 + 4 * 2`) into RPN (e.g., `3 4 2 * +`). This makes evaluation trivial for computers.

### Tokenization: Breaking Down the Expression

Before processing, the input string is **tokenized** into numbers, operators, and parentheses.

**C++ Example:**
```cpp
std::vector<std::string> tokenize(const std::string& expr) { ... }
```
- Use `std::istringstream` or character-by-character parsing to handle spaces, multi-digit numbers, decimals, etc.

### Main Algorithm Flow: Left-to-Right Processing

The algorithm maintains:
- **Operator Stack:** Temporarily stores operators and parentheses
- **Output Queue:** Collects the resulting RPN tokens

**Step-by-step rules:**
1. **Operand (Number):** Push directly to output queue
2. **Operator:**
    - While stack top has higher (or equal and left-associative) precedence, pop from stack to queue
    - Push incoming operator to stack
3. **Left Parenthesis `(`:** Push to stack (as marker)
4. **Right Parenthesis `)`:** Pop from stack to queue until matching `(` is found (discard both parentheses)
5. **At End:** Pop any remaining operators in stack to output queue

**Trace Example:**  
Infix: `3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3`  
Postfix: `3 4 2 * 1 5 - 2 3 ^ ^ / +`  

**Operator Precedence Table:**
| Operator | Precedence | Associativity |
|----------|------------|--------------|
| `+`,`-`  | 1          | Left         |
| `*`,`/`  | 2          | Left         |
| `^`      | 3          | Right        |

**C++ Skeleton:**
```cpp
for (token in tokens) {
    if (isNumber(token)) outputQueue.push(token);
    else if (isOperator(token)) {
        while (shouldPop(stack.top(), token)) {
            outputQueue.push(stack.top()); stack.pop();
        }
        stack.push(token);
    }
    else if (token == "(") stack.push(token);
    else if (token == ")") {
        while (stack.top() != "(") { outputQueue.push(stack.top()); stack.pop(); }
        stack.pop(); // pop '('
    }
}
// End: pop remaining stack
```

---

## Conversion: From Infix to RPN

### Example Walkthrough

#### Simple Example
Infix: `2 + 5 * 3 / 2`  
RPN:   `2 5 3 * 2 / +`
- Push numbers to output
- `*` and `/` have higher precedence; processed before `+`
- Evaluate as `2 + ((5 * 3) / 2)` = `2 + (15 / 2) = 9.5`

#### Complex Example: Right-Associativity
Infix: `(4 + 3 * 20) / (10 + 3 * 3 ^ 2 - 12)`
Analyzing this, note that:
- Parentheses create isolated sub-expressions
- `^` is right-associative, so `3 ^ 2 ^ 2` is `3 ^ (2 ^ 2)`

**Process tokens step-by-step, updating stack and queue as described.**

---

## Evaluation: Computing Results from RPN

### RPN (Postfix) Evaluation Algorithm

- **For each token:**
    - If it's a number, **push to stack**
    - If it's an operator, **pop required operands from stack,
      apply operator, push result back**
- **At end, stack contains exactly one number—the answer**

**C++ Example:**
```cpp
std::stack<double> st;
for (token in postfix) {
    if (isNumber(token)) st.push(token);
    else {
        double b = st.top(); st.pop();
        double a = st.top(); st.pop();
        st.push(applyOperator(token, a, b));
    }
}
return st.top();
```

**Unary Operators:** For unary minus, only pop one operand.

### Why No Precedence/Parentheses Are Needed

Since the RPN order is explicit, **operators always find their proper operands**. No need to understand precedence or associativity at evaluation time!

**Error Checking:**
- Insufficient operands on stack? Expression is malformed.
- Stack has more than one value at end? Too many operands, not enough operators.

---

## C++ Implementation Overview

### Data Structures

**`std::vector`**: Token storage  
**`std::stack`**: Operator stack  
**`std::deque`**: Output queue (or vector for list)

### Token Representation
```cpp
enum class Type { Number, Operator, LeftParen, RightParen };
struct Token { Type type; std::string str; bool unary = false; };
```

### Precedence Table
```cpp
std::map<char, int> precedence = { {'+',1}, {'-',1}, {'*',2}, {'/',2}, {'^',3} };
std::map<char, bool> rightAssoc = { {'^', true}, {'+', false}, ... };
```

### Main Algorithm Skeleton
Refer to the pseudocode and C++ examples above.

---

## Handling Unary Operators and Advanced Cases

### Distinguishing Unary from Binary Minus

- **At start, after '(', or after operator**: treat `-` as unary (negation)
    - Example: `-3`, `(-4 + 2)`, `2 * -5`
- Use a special token (e.g., `u`) for unary minus with **highest precedence, right-associative**

### Evaluation

- **Unary operator:** pop one value, negate, push result
- **Binary operator:** pop two values, apply op, push result

### Extension to Functions

- For `sin(x)`, `sqrt(x)`, etc., treat as unary operators with custom precedence or handle as special function tokens

---

## Examples and Case Studies

### Wikipedia Classic Example

Expression: `3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3`
- **Step 1:** Tokenize input
- **Step 2:** Convert to RPN using algorithm, updating operator stack and output queue step by step
- **Step 3:** Evaluate RPN using a stack; trace results

**Check:**
- Multiplication/division before addition
- Exponentiation right-associative
- Parentheses override precedence

### Graphing Calculator Idea

- Parse `f(x) = x^2 + 3`
- For each x, substitute the value, evaluate RPN, and plot (x, y)

### Modulo and Floating-Point

- Modulo (`%`) is only for integers in C++.  
- Floating-point evaluation (`2.5 + 0.1`) can have rounding errors; compare using epsilon when testing.

---

## Activities and Student Engagement

### Think-Pair-Share: Tokenization

- **Think**: Each student considers how to tokenize `-3.14 + 2 * (5 - 1)`
- **Pair**: Discuss trade-offs (simplicity, edge cases)
- **Share**: Present strategies, reinforcing understanding and communication skills

### Guided Practice: Manual Tracing

- In small groups, trace `2 + 3 * 4` using stack and queue on paper
- Peer-check answers, discuss discrepancies

### Quick Quiz

- Given an infix or step of the algorithm, ask: "What's wrong with this step?" or "Convert this correctly to RPN"

### Coding Exercise: Implement a Tokenizer

- Students write code to parse expressions into tokens, handling decimals, negatives, spaces, etc.

### Collaborative Debugging: Buggy Shunting Yard

- Instructor provides buggy code. Students trace to find logic or precedence errors, fix bugs in pairs/groups.

---

## Formative Assessment

### Exit Ticket: Mini-Quiz

- Convert `A * B + C` to RPN
- Explain why multiplication comes before addition
- What should the stack contain after processing `*` in `A * B + C`?

Instructor uses responses to clarify common misconceptions before moving forward.

### Problem Set

- Convert increasingly complex infix expressions to RPN
- Identify errors in incorrect conversions
- Show step-by-step stack and queue updates

Instructor follows up with targeted clarification on associativity, precedence, and parsing logic.

---

## Summary and Key Takeaways

- **Shunting Yard Algorithm bridges infix (human) and postfix (computer) notation, using stacks and queues.**
- **Operator precedence and associativity are critical:** Algorithm uses explicit comparison to enforce correct evaluation order.
- **Stacks and queues are powerful tools beyond parsing**, demonstrating how the right data structure simplifies complex problems.
- **Production C++ implementations demand attention to data structures, token types, precedence tables, and error handling.**
- **Thorough testing, careful validation, and robust error reporting** are essential for building reliable expression parsers and calculators.

---

## Extensions and Further Learning

- **Variables and Functions:** Extend tokenization and parsing to support variable names (`x`, `y`) and function calls (`sin(x)`, `max(1,2,3)`).
    - Requires careful tracking of tokens, argument counts, and modifications to the evaluation step.
- **Advanced Operators:** Add boolean operators, ternary (`? :`), and user-defined functions.
- **AST Construction:** Convert the Shunting Yard algorithm to produce an **Abstract Syntax Tree** for use in compilers.
- **Compare Parsing Strategies:** Study recursive descent vs. stack-based parsing.

**Further Study:**  
- Try implementing a full-featured calculator with variables and functions.
- Explore how Shunting Yard fits into the front-end of modern programming languages.
- Investigate how compilers use ASTs for optimization and code generation.

---

### References (for Further Reading)
1. Wikipedia: Shunting Yard Algorithm
2. Dijkstra, E.W., "An Algol Compiler for the x1"
3. Stack Overflow discussions on expression parsing
4. GeeksforGeeks: Shunting Yard
5. Compilers: Principles, Techniques, and Tools (Aho, Lam, Sethi, Ullman)
6. C++ Reference: std::stack, std::queue, std::deque
7. Various instructor and textbook notes on advanced parsing

---

**End of Lecture**
