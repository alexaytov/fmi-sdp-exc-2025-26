// Решения на упражненията
const solutions = {
    ex1: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Отговор:</strong> <code>top()</code> връща <strong>7</strong></p>
        <p><strong>Проследяване:</strong></p>
        <pre><code>1. push(5)  → Stack: [5]
2. push(3)  → Stack: [5, 3]
3. pop()    → Stack: [5]       (премахнахме 3)
4. push(7)  → Stack: [5, 7]
5. top()    → връща 7          (без да премахва)
6. pop()    → Stack: [5]       (премахнахме 7)</code></pre>
        <p>Операцията <code>top()</code> (стъпка 5) връща 7, защото 7 е на върха на стека в този момент.</p>
    </div>`,
    
    ex2: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>LIFO (Last In, First Out)</strong> означава, че последният добавен елемент е първият, който се премахва - като стек чинии.</p>
        <p><strong>Защо е подходящ за Shunting Yard:</strong></p>
        <ul>
            <li>При обработка на оператори, най-скоро добавеният оператор (с най-висок приоритет) трябва да се обработи първи</li>
            <li>Скобите се "затварят" в обратен ред - последната отворена скоба се затваря първа</li>
            <li>Позволява да "отлагаме" оператори и да ги извикваме в правилния ред според приоритета</li>
            <li>Естествено моделира вложената структура на математическите изрази</li>
        </ul>
    </div>`,
    
    ex3: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>От най-нисък към най-висок приоритет:</strong></p>
        <ol>
            <li><code>+</code> и <code>-</code> (приоритет 1)</li>
            <li><code>*</code> и <code>/</code> (приоритет 2)</li>
            <li><code>^</code> (приоритет 3 - най-висок)</li>
        </ol>
        <p><strong>Обобщение:</strong> <code>+ = - < * = / < ^</code></p>
    </div>`,
    
    ex4: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <ul>
            <li>a) <code>3 + 4</code> → <strong>Инфиксна</strong> (операторът е между операндите)</li>
            <li>b) <code>3 4 +</code> → <strong>RPN/Постфиксна</strong> (операторът е след операндите)</li>
            <li>c) <code>5 2 * 3 +</code> → <strong>RPN/Постфиксна</strong></li>
            <li>d) <code>(2 + 3) * 4</code> → <strong>Инфиксна</strong> (със скоби)</li>
        </ul>
    </div>`,
    
    ex5: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>RPN израз:</strong> <code>5 3 +</code></p>
        <p><strong>Стъпки:</strong></p>
        <pre><code>1. Прочитаме 5  → push в стека
   Stack: [5]

2. Прочитаме 3  → push в стека
   Stack: [5, 3]

3. Прочитаме +  → pop два операнда (3 и 5)
                → изчисляваме 5 + 3 = 8
                → push резултата
   Stack: [8]

<strong>Краен резултат: 8</strong></code></pre>
    </div>`,
    
    ex6: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Израз:</strong> <code>12 + 34 * 5</code></p>
        <p><strong>Токени в ред на обработка:</strong></p>
        <pre><code>["12", "+", "34", "*", "5"]</code></pre>
        <p><strong>Обяснение:</strong> Всяко число се третира като отделен токен, операторите също са отделни токени.</p>
    </div>`,
    
    ex7: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Ляво-асоциативни оператори</strong> се изпълняват отляво надясно:</p>
        <ul>
            <li>Пример: <code>10 - 3 - 2 = (10 - 3) - 2 = 7 - 2 = 5</code></li>
            <li>Оператори: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code></li>
        </ul>
        <p><strong>Дясно-асоциативни оператори</strong> се изпълняват отдясно наляво:</p>
        <ul>
            <li>Пример: <code>2 ^ 3 ^ 2 = 2 ^ (3 ^ 2) = 2 ^ 9 = 512</code></li>
            <li>Оператор: <code>^</code> (степенуване)</li>
        </ul>
    </div>`,
    
    ex8: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Без скоби:</strong> <code>2 + 3 * 4 = 2 + 12 = 14</code></p>
        <p>Умножението има по-висок приоритет, затова се изпълнява първо.</p>
        <p><strong>Със скоби:</strong> <code>(2 + 3) * 4 = 5 * 4 = 20</code></p>
        <p>Скобите <strong>принуждават</strong> събирането да се изпълни първо, независимо от приоритета.</p>
        <p><strong>Роля на скобите:</strong> Променят естествения ред на изпълнение, задавайки експлицитна подредба.</p>
    </div>`,
    
    ex9: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Инфикс:</strong> <code>A + B</code></p>
        <table class="solution-table">
            <tr><th>Токен</th><th>Стек</th><th>Изход</th></tr>
            <tr><td>A</td><td>[]</td><td>[A]</td></tr>
            <tr><td>+</td><td>[+]</td><td>[A]</td></tr>
            <tr><td>B</td><td>[+]</td><td>[A, B]</td></tr>
            <tr><td>(край)</td><td>[]</td><td>[A, B, +]</td></tr>
        </table>
        <p><strong>RPN:</strong> <code>A B +</code></p>
    </div>`,
    
    ex10: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>RPN:</strong> <code>2 3 + 4 *</code></p>
        <pre><code>1. 2     → Stack: [2]
2. 3     → Stack: [2, 3]
3. +     → 2+3=5, Stack: [5]
4. 4     → Stack: [5, 4]
5. *     → 5*4=20, Stack: [20]

<strong>Резултат: 20</strong></code></pre>
        <p>Това е еквивалентно на <code>(2 + 3) * 4 = 20</code></p>
    </div>`,
    
    ex11: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Инфикс:</strong> <code>2 + 3 * 4</code></p>
        <table class="solution-table">
            <tr><th>Токен</th><th>Стек</th><th>Изход</th><th>Обяснение</th></tr>
            <tr><td>2</td><td>[]</td><td>[2]</td><td>Число в изхода</td></tr>
            <tr><td>+</td><td>[+]</td><td>[2]</td><td>+ в стека</td></tr>
            <tr><td>3</td><td>[+]</td><td>[2, 3]</td><td>Число в изхода</td></tr>
            <tr><td>*</td><td>[+, *]</td><td>[2, 3]</td><td>* има по-висок приоритет от +</td></tr>
            <tr><td>4</td><td>[+, *]</td><td>[2, 3, 4]</td><td>Число в изхода</td></tr>
            <tr><td>(край)</td><td>[]</td><td>[2, 3, 4, *, +]</td><td>Изваждаме всички</td></tr>
        </table>
        <p><strong>RPN:</strong> <code>2 3 4 * +</code></p>
        <p><strong>Обяснение:</strong> * се обработва преди +, защото има по-висок приоритет (2 срещу 1).</p>
    </div>`,
    
    ex12: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <pre><code>1. push(10)  → Stack: [10]
2. push(20)  → Stack: [10, 20]
3. push(30)  → Stack: [10, 20, 30]
4. pop()     → Stack: [10, 20]      (премахнахме 30)
5. top()     → връща 20             (без да премахва)

<strong>Крайно състояние: Stack: [10, 20]</strong>
<strong>top() връща: 20</strong></code></pre>
    </div>`,
    
    ex13: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Инфикс:</strong> <code>(A + B) * C</code></p>
        <table class="solution-table">
            <tr><th>Токен</th><th>Стек</th><th>Изход</th></tr>
            <tr><td>(</td><td>[(]</td><td>[]</td></tr>
            <tr><td>A</td><td>[(]</td><td>[A]</td></tr>
            <tr><td>+</td><td>[(, +]</td><td>[A]</td></tr>
            <tr><td>B</td><td>[(, +]</td><td>[A, B]</td></tr>
            <tr><td>)</td><td>[]</td><td>[A, B, +]</td></tr>
            <tr><td>*</td><td>[*]</td><td>[A, B, +]</td></tr>
            <tr><td>C</td><td>[*]</td><td>[A, B, +, C]</td></tr>
            <tr><td>(край)</td><td>[]</td><td>[A, B, +, C, *]</td></tr>
        </table>
        <p><strong>RPN:</strong> <code>A B + C *</code></p>
    </div>`,
    
    ex14: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Инфикс:</strong> <code>A + B * C - D</code></p>
        <table class="solution-table">
            <tr><th>Токен</th><th>Стек</th><th>Изход</th></tr>
            <tr><td>A</td><td>[]</td><td>[A]</td></tr>
            <tr><td>+</td><td>[+]</td><td>[A]</td></tr>
            <tr><td>B</td><td>[+]</td><td>[A, B]</td></tr>
            <tr><td>*</td><td>[+, *]</td><td>[A, B]</td></tr>
            <tr><td>C</td><td>[+, *]</td><td>[A, B, C]</td></tr>
            <tr><td>-</td><td>[-]</td><td>[A, B, C, *, +]</td></tr>
            <tr><td>D</td><td>[-]</td><td>[A, B, C, *, +, D]</td></tr>
            <tr><td>(край)</td><td>[]</td><td>[A, B, C, *, +, D, -]</td></tr>
        </table>
        <p><strong>RPN:</strong> <code>A B C * + D -</code></p>
    </div>`,
    
    ex15: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Инфикс:</strong> <code>10 - 3 - 2</code></p>
        <p><strong>RPN:</strong> <code>10 3 - 2 -</code></p>
        <p><strong>Изчисление с лява асоциативност:</strong></p>
        <pre><code>10 3 - 2 -
= (10 - 3) - 2
= 7 - 2
= 5</code></pre>
        <p><strong>Ако беше дясна асоциативност:</strong></p>
        <pre><code>10 - (3 - 2)
= 10 - 1
= 9</code></pre>
        <p>Лявата асоциативност обработва операторите отляво надясно, което е естественото поведение за изваждане.</p>
    </div>`,
    
    ex16: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>RPN:</strong> <code>15 3 / 2 +</code></p>
        <pre><code>1. 15    → Stack: [15]
2. 3     → Stack: [15, 3]
3. /     → 15/3=5, Stack: [5]
4. 2     → Stack: [5, 2]
5. +     → 5+2=7, Stack: [7]

<strong>Резултат: 7</strong></code></pre>
    </div>`,
    
    ex17: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Проблем:</strong> <code>3 + 4 5 *</code> е <strong>инфиксна нотация</strong>, не RPN!</p>
        <p>В RPN операторите трябва да са <strong>след</strong> операндите.</p>
        <p><strong>Правилни RPN варианти:</strong></p>
        <ul>
            <li><code>3 4 5 * +</code> → (3 + (4 * 5)) = 3 + 20 = 23</li>
            <li><code>3 4 + 5 *</code> → ((3 + 4) * 5) = 7 * 5 = 35</li>
        </ul>
    </div>`,
    
    ex18: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Инфикс:</strong> <code>((A + B) * C)</code></p>
        <table class="solution-table">
            <tr><th>Токен</th><th>Стек</th><th>Изход</th></tr>
            <tr><td>(</td><td>[(]</td><td>[]</td></tr>
            <tr><td>(</td><td>[(, (]</td><td>[]</td></tr>
            <tr><td>A</td><td>[(, (]</td><td>[A]</td></tr>
            <tr><td>+</td><td>[(, (, +]</td><td>[A]</td></tr>
            <tr><td>B</td><td>[(, (, +]</td><td>[A, B]</td></tr>
            <tr><td>)</td><td>[(]</td><td>[A, B, +]</td></tr>
            <tr><td>*</td><td>[(, *]</td><td>[A, B, +]</td></tr>
            <tr><td>C</td><td>[(, *]</td><td>[A, B, +, C]</td></tr>
            <tr><td>)</td><td>[]</td><td>[A, B, +, C, *]</td></tr>
        </table>
        <p><strong>RPN:</strong> <code>A B + C *</code></p>
        <p>Вложените скоби се обработват от вътре навън.</p>
    </div>`,
    
    ex19: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Инфикс:</strong> <code>2 ^ 3 ^ 2</code></p>
        <p><strong>RPN:</strong> <code>2 3 2 ^ ^</code></p>
        <p><strong>Изчисление:</strong></p>
        <pre><code>2 3 2 ^ ^
1. Stack: [2]
2. Stack: [2, 3]
3. Stack: [2, 3, 2]
4. ^ → 3^2=9, Stack: [2, 9]
5. ^ → 2^9=512, Stack: [512]

<strong>Резултат: 512</strong></code></pre>
        <p>Дясната асоциативност прави степенуването да се изчислява отдясно наляво: 2^(3^2) = 2^9 = 512</p>
    </div>`,
    
    ex20: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Инфикс:</strong> <code>A * B + C / D</code></p>
        <table class="solution-table">
            <tr><th>Токен</th><th>Стек</th><th>Изход</th></tr>
            <tr><td>A</td><td>[]</td><td>[A]</td></tr>
            <tr><td>*</td><td>[*]</td><td>[A]</td></tr>
            <tr><td>B</td><td>[*]</td><td>[A, B]</td></tr>
            <tr><td>+</td><td>[+]</td><td>[A, B, *]</td></tr>
            <tr><td>C</td><td>[+]</td><td>[A, B, *, C]</td></tr>
            <tr><td>/</td><td>[+, /]</td><td>[A, B, *, C]</td></tr>
            <tr><td>D</td><td>[+, /]</td><td>[A, B, *, C, D]</td></tr>
            <tr><td>(край)</td><td>[]</td><td>[A, B, *, C, D, /, +]</td></tr>
        </table>
        <p><strong>RPN:</strong> <code>A B * C D / +</code></p>
        <p>* и / имат еднакъв приоритет и са ляво-асоциативни, затова се обработват отляво надясно.</p>
    </div>`,
    
    ex21: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Инфикс:</strong> <code>3 + 4 * 2 / (1 - 5)</code></p>
        <p><strong>RPN:</strong> <code>3 4 2 * 1 5 - / +</code></p>
        <p><strong>Кратки стъпки:</strong></p>
        <ol>
            <li>3 → изход</li>
            <li>+ → стек</li>
            <li>4 → изход</li>
            <li>* → стек (по-висок от +)</li>
            <li>2 → изход</li>
            <li>/ → изваждаме *, добавяме / (еднакъв приоритет)</li>
            <li>( → стек</li>
            <li>1 → изход</li>
            <li>- → стек</li>
            <li>5 → изход</li>
            <li>) → изваждаме до (</li>
            <li>Край → изваждаме всички</li>
        </ol>
    </div>`,
    
    ex22: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Израз:</strong> <code>-3 + 4 * -5</code></p>
        <p><strong>Анализ:</strong></p>
        <ul>
            <li>Първият <code>-</code> е <strong>унарен</strong> (в началото на израза)</li>
            <li>Вторият <code>-</code> е <strong>унарен</strong> (след оператора *)</li>
            <li>Няма <strong>бинарен</strong> минус в този израз</li>
        </ul>
        <p><strong>Правило:</strong> Минус е унарен, ако е:</p>
        <ul>
            <li>В началото на израза</li>
            <li>След лява скоба</li>
            <li>След друг оператор</li>
        </ul>
    </div>`,
    
    ex23: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Инфикс:</strong> <code>A + B * C + D</code></p>
        <table class="solution-table">
            <tr><th>Токен</th><th>Стек с оператори</th><th>Изходна опашка</th></tr>
            <tr><td>A</td><td>[]</td><td>[A]</td></tr>
            <tr><td>+</td><td>[+]</td><td>[A]</td></tr>
            <tr><td>B</td><td>[+]</td><td>[A, B]</td></tr>
            <tr><td>*</td><td>[+, *]</td><td>[A, B]</td></tr>
            <tr><td>C</td><td>[+, *]</td><td>[A, B, C]</td></tr>
            <tr><td>+</td><td>[+]</td><td>[A, B, C, *, +]</td></tr>
            <tr><td>D</td><td>[+]</td><td>[A, B, C, *, +, D]</td></tr>
            <tr><td>(край)</td><td>[]</td><td>[A, B, C, *, +, D, +]</td></tr>
        </table>
        <p><strong>RPN:</strong> <code>A B C * + D +</code></p>
    </div>`,
    
    ex24: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <pre><code>function evaluateRPN(tokens):
    create empty stack
    
    for each token in tokens:
        if token is a number:
            push token onto stack
        else if token is an operator:
            // Проверка за грешки
            if stack.size() < 2:
                throw error "Insufficient operands"
            
            pop b from stack
            pop a from stack
            
            // Проверка за деление на нула
            if token == '/' and b == 0:
                throw error "Division by zero"
            
            result = applyOperator(token, a, b)
            push result onto stack
        else:
            throw error "Invalid token"
    
    // Проверка в края
    if stack.size() != 1:
        throw error "Invalid expression"
    
    return stack.top()</code></pre>
    </div>`,
    
    ex25: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Инфикс:</strong> <code>3 + 4 * 2 / (1 - 5) ^ 2 ^ 3</code></p>
        <p><strong>RPN:</strong> <code>3 4 2 * 1 5 - 2 3 ^ ^ / +</code></p>
        <p><strong>Изчисление:</strong></p>
        <pre><code>3 4 2 * 1 5 - 2 3 ^ ^ / +

Стъпки:
1. Stack: [3, 4, 2]
2. * → 4*2=8, Stack: [3, 8]
3. Stack: [3, 8, 1, 5]
4. - → 1-5=-4, Stack: [3, 8, -4]
5. Stack: [3, 8, -4, 2, 3]
6. ^ → 2^3=8, Stack: [3, 8, -4, 8]
7. ^ → -4^8=65536, Stack: [3, 8, 65536]
8. / → 8/65536≈0.0001220703, Stack: [3, 0.0001220703]
9. + → 3+0.0001220703≈3.0001220703

<strong>Резултат: 3.0001220703125</strong></code></pre>
    </div>`,
    
    ex26: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Израз:</strong> <code>-3 * (4 + -5)</code></p>
        <p><strong>Токенизация с унарни оператори:</strong></p>
        <pre><code>["u-", "3", "*", "(", "4", "+", "u-", "5", ")"]</code></pre>
        <p><strong>RPN:</strong> <code>3 u- 4 5 u- + *</code></p>
        <p><strong>Обяснение:</strong></p>
        <ul>
            <li>Първият минус е унарен (начало на израза) → <code>u-</code></li>
            <li>Вторият минус е унарен (след +) → <code>u-</code></li>
            <li>Унарните оператори имат най-висок приоритет</li>
        </ul>
        <p><strong>Изчисление:</strong> <code>(-3) * (4 + (-5)) = (-3) * (-1) = 3</code></p>
    </div>`,
    
    ex27: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <pre><code class="language-cpp">// Сигнатура
std::vector&lt;std::string&gt; infixToRPN(const std::string& expression);

// Подход за имплементация:

1. Токенизация:
   - Парсиране символ по символ
   - Разпознаване на числа (включително с плаваща запетая)
   - Идентификация на оператори (+, -, *, /, ^)
   - Обработка на скоби (, )
   - Връщане на std::vector&lt;std::string&gt; с токените

2. Таблици с метаданни:
   std::map&lt;char, int&gt; precedence;  // Приоритети
   std::map&lt;char, bool&gt; rightAssoc; // Асоциативност

3. Shunting Yard алгоритъм:
   - std::stack&lt;std::string&gt; operatorStack
   - std::vector&lt;std::string&gt; output
   - За всеки токен: приложи правилата
   
4. Грешни условия:
   - Несъответстващи скоби (stack.top() != '(' при ')')
   - Невалидни символи (не число, не оператор, не скоба)
   - Празен израз
   - Невалидна последователност (два оператора подред)</code></pre>
    </div>`,
    
    ex28: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Входен израз:</strong> <code>2 * 3 + 4</code></p>
        <p><strong>Грешен изход на студента:</strong> <code>2 3 4 + *</code></p>
        <p><strong>Правилен изход:</strong> <code>2 3 * 4 +</code></p>
        <p><strong>Грешка в логиката:</strong></p>
        <p>Студентът вероятно <strong>НЕ извади</strong> оператора * от стека, когато срещна оператора +.</p>
        <p><strong>Правилно поведение:</strong></p>
        <ol>
            <li>Когато срещнем +, трябва да изваждаме оператори от стека докато:</li>
            <li>Стекът не е празен И</li>
            <li>Върхът не е '(' И</li>
            <li>Върхът има по-висок ИЛИ равен приоритет (при лява асоциативност)</li>
        </ol>
        <p>* има по-висок приоритет от +, затова трябва да се извади и добави към изхода преди +.</p>
    </div>`,
    
    ex29: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Функция shouldPop():</strong></p>
        <pre><code class="language-cpp">bool shouldPop(const std::string& stackTop, 
               const std::string& incoming) {
    // Не изваждаме лява скоба
    if (stackTop == "(") return false;
    
    int stackPrec = getPrecedence(stackTop);
    int incomingPrec = getPrecedence(incoming);
    
    // За дясно-асоциативни оператори (^):
    // Изваждаме САМО ако stackPrec > incomingPrec
    if (isRightAssociative(incoming)) {
        return stackPrec > incomingPrec;
    }
    
    // За ляво-асоциативни:
    // Изваждаме ако stackPrec >= incomingPrec
    return stackPrec >= incomingPrec;
}</code></pre>
        <p><strong>Ключова разлика:</strong> За дясно-асоциативни използваме <code>&gt;</code>, не <code>&gt;=</code></p>
    </div>`,
    
    ex30: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Инфикс:</strong> <code>((15 / (7 - (1 + 1))) * 3) - (2 + (1 + 1))</code></p>
        <p><strong>RPN:</strong> <code>15 7 1 1 + - / 3 * 2 1 1 + + -</code></p>
        <p><strong>Изчисление стъпка по стъпка:</strong></p>
        <pre><code>1. 1+1=2
2. 7-2=5
3. 15/5=3
4. 3*3=9
5. 1+1=2
6. 2+2=4
7. 9-4=5

<strong>Краен резултат: 5</strong></code></pre>
    </div>`,
    
    ex31: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <p><strong>Разширение за функции:</strong></p>
        <p><strong>1. Токенизация:</strong></p>
        <ul>
            <li>Разпознаване на имена на функции (sin, cos, max, etc.)</li>
            <li>Третиране на скобите след функция като специални</li>
            <li>Обработка на запетаи за аргументи</li>
        </ul>
        <p><strong>2. Конверсия:</strong></p>
        <ul>
            <li>Функцията се третира като оператор с висок приоритет</li>
            <li>При затваряща скоба, извадете всички до отварящата</li>
            <li>Добавете функцията в изхода след аргументите</li>
        </ul>
        <p><strong>3. Изчисляване:</strong></p>
        <ul>
            <li>При функция, извадете нужния брой аргументи</li>
            <li>Приложете функцията (std::sin, std::max, etc.)</li>
            <li>Върнете резултата в стека</li>
        </ul>
        <p><strong>Пример:</strong></p>
        <pre><code>Инфикс: sin(30) + 2
Токени: ["sin", "(", "30", ")", "+", "2"]
RPN:    ["30", "sin", "2", "+"]
Резултат: 0.5 + 2 = 2.5</code></pre>
    </div>`,
    
    ex32: `<div class="solution-box">
        <h4>✅ Решение</h4>
        <pre><code class="language-cpp">class ExpressionParser {
private:
    std::map&lt;char, int&gt; precedence;
    std::map&lt;char, bool&gt; rightAssoc;
    
    // Помощни функции
    bool isNumber(const std::string& token);
    bool isOperator(char c);
    int getPrecedence(char op);
    bool isRightAssociative(char op);
    
public:
    ExpressionParser();  // Конструктор - инициализира таблиците
    
    // Главни методи
    std::vector&lt;std::string&gt; tokenize(const std::string& expr);
    std::vector&lt;std::string&gt; infixToRPN(
        const std::vector&lt;std::string&gt;& tokens);
    double evaluateRPN(
        const std::vector&lt;std::string&gt;& rpn);
    
    // Цялостна обработка
    double evaluate(const std::string& expression) {
        auto tokens = tokenize(expression);
        auto rpn = infixToRPN(tokens);
        return evaluateRPN(rpn);
    }
};</code></pre>
    </div>`
};
