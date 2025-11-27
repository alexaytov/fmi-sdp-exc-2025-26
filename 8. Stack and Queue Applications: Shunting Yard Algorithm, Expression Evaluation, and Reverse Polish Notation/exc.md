# Stack and Queue Applications: Shunting Yard Algorithm - Practice Exercises

## Easy Exercises (Foundational Concepts)

**Exercise 1 [EASY]: Stack and Queue Basics**
Given the following sequence of operations on an empty stack: `push(5), push(3), pop(), push(7), top(), pop()`, what value is returned by the `top()` operation?

**Exercise 2 [EASY]: LIFO vs FIFO**
Explain in your own words why a stack uses LIFO (Last In, First Out) ordering and why this property makes it suitable for the Shunting Yard algorithm.

**Exercise 3 [EASY]: Operator Precedence**
Rank the following operators from lowest to highest precedence: `^`, `+`, `*`, `-`, `/`

**Exercise 4 [EASY]: Infix vs RPN Recognition**
Identify which of the following expressions are in infix notation and which are in RPN (postfix):
- a) `3 + 4`
- b) `3 4 +`
- c) `5 2 * 3 +`
- d) `(2 + 3) * 4`

**Exercise 5 [EASY]: Simple RPN Evaluation**
Evaluate the RPN expression `5 3 +` step by step, showing the stack contents after each operation.

**Exercise 6 [EASY]: Basic Tokenization**
List all the tokens in the expression `12 + 34 * 5` in the order they would be processed.

**Exercise 7 [EASY]: Associativity Concept**
What is the difference between left-associative and right-associative operators? Give one example of each from the lecture.

**Exercise 8 [EASY]: Parentheses Purpose**
Why does the expression `2 + 3 * 4` evaluate to 14, but `(2 + 3) * 4` evaluates to 20? Explain the role of parentheses.

## Easy-Medium Exercises (Application of Basic Concepts)

**Exercise 9 [EASY-MEDIUM]: Simple Infix to RPN Conversion**
Convert the infix expression `A + B` to RPN notation. Show your work step by step with stack and output queue states.

**Exercise 10 [EASY-MEDIUM]: RPN Evaluation with Multiple Operations**
Evaluate the RPN expression `2 3 + 4 *` showing the stack state after each token is processed.

**Exercise 11 [EASY-MEDIUM]: Precedence in Action**
Convert the infix expression `2 + 3 * 4` to RPN. Explain why the multiplication operator is processed before addition.

**Exercise 12 [EASY-MEDIUM]: Stack Operations Trace**
Given the operations `push(10), push(20), push(30), pop(), top()`, what is the final state of the stack and what value does `top()` return?

## Medium Exercises (Intermediate Problem-Solving)

**Exercise 13 [MEDIUM]: Infix to RPN with Parentheses**
Convert the infix expression `(A + B) * C` to RPN notation. Show the operator stack and output queue at each step.

**Exercise 14 [MEDIUM]: Multiple Operators**
Convert `A + B * C - D` to RPN. Show all intermediate steps with stack and queue contents.

**Exercise 15 [MEDIUM]: Associativity Challenge**
Convert `10 - 3 - 2` to RPN, then evaluate it. Explain how left-associativity affects the result (compare to what would happen if subtraction were right-associative).

**Exercise 16 [MEDIUM]: RPN Evaluation with Division**
Evaluate the RPN expression `15 3 / 2 +` showing each step. What is the final result?

**Exercise 17 [MEDIUM]: Error Detection**
Identify what is wrong with the following RPN expression: `3 + 4 5 *`. How would you fix it?

**Exercise 18 [MEDIUM]: Nested Parentheses**
Convert the infix expression `((A + B) * C)` to RPN. Trace through the algorithm showing how nested parentheses are handled.

**Exercise 19 [MEDIUM]: Right Associativity**
Convert `2 ^ 3 ^ 2` to RPN, properly handling the right-associativity of exponentiation. Then evaluate the RPN expression.

**Exercise 20 [MEDIUM]: Mixed Precedence**
Convert the infix expression `A * B + C / D` to RPN. Show how operators of equal precedence are handled.

## Medium-Hard Exercises (Complex Applications)

**Exercise 21 [MEDIUM-HARD]: Complex Expression Conversion**
Convert the infix expression `3 + 4 * 2 / (1 - 5)` to RPN. Show complete traces of the operator stack and output queue.

**Exercise 22 [MEDIUM-HARD]: Unary Operator Identification**
In the expression `-3 + 4 * -5`, identify which minus signs are unary and which are binary. Explain how you determined this.

**Exercise 23 [MEDIUM-HARD]: Algorithm Simulation**
Given the expression `A + B * C + D`, manually simulate the Shunting Yard algorithm. Create a table showing: Current Token | Operator Stack | Output Queue for each step.

**Exercise 24 [MEDIUM-HARD]: Evaluation with Error Checking**
Write pseudocode for an RPN evaluator that includes error checking for insufficient operands and malformed expressions.

## Hard Exercises (Advanced Problem-Solving)

**Exercise 25 [HARD]: Wikipedia Classic Example**
Convert the complete expression `3 + 4 * 2 / (1 - 5) ^ 2 ^ 3` to RPN following all rules for precedence, associativity, and parentheses. Then evaluate the RPN expression to get the final numerical result.

**Exercise 26 [HARD]: Unary Operator Handling**
Design an algorithm modification to handle the expression `-3 * (4 + -5)` where both unary negations must be correctly identified and processed. Show the complete conversion to RPN.

**Exercise 27 [HARD]: C++ Implementation Design**
Write a detailed C++ function signature and describe the implementation approach for `std::vector<std::string> infixToRPN(const std::string& expression)`. Include how you would handle tokenization, operator precedence, and error conditions.

**Exercise 28 [HARD]: Debugging Challenge**
A student's Shunting Yard implementation produces `2 3 4 + *` for the input `2 * 3 + 4`. Identify the bug in their algorithm logic and explain the correct behavior.

**Exercise 29 [HARD]: Right Associativity Implementation**
Explain in detail how the `shouldPop()` function in the Shunting Yard algorithm must be modified to correctly handle right-associative operators like exponentiation. Provide the logic condition.

**Exercise 30 [HARD]: Complex Nested Expression**
Convert and evaluate: `((15 / (7 - (1 + 1))) * 3) - (2 + (1 + 1))`. Show complete RPN conversion with all intermediate steps, then evaluate the RPN to find the final answer.

**Exercise 31 [HARD]: Function Extension Design**
Design an extension to the Shunting Yard algorithm to handle function calls like `sin(30)` or `max(3, 5, 7)`. Describe how you would modify the tokenization, conversion, and evaluation stages.

**Exercise 32 [HARD]: Comprehensive Implementation**
Write a complete C++ class `ExpressionParser` that includes:
- Tokenization method
- Infix to RPN conversion method
- RPN evaluation method
- Error handling for mismatched parentheses and invalid expressions
Include the class definition with all necessary data members and method signatures.

---

## Answer Key Guidelines

For instructors, answers should verify:
- **Easy exercises**: Basic understanding of stack/queue operations, notation types, and precedence rules
- **Medium exercises**: Ability to trace the algorithm, handle multiple operators, and understand associativity
- **Hard exercises**: Complete algorithm simulation, handling edge cases, unary operators, and implementation details

Students should show their work, particularly stack and queue states during conversions, to demonstrate understanding of the algorithm's mechanics.