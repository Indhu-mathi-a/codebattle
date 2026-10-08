import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const QUESTION_BANK = [
  {
    id: 'q1', title: 'Even or Odd', difficulty: 'Easy',
    description: 'Arrange the blocks to check if a number is even or odd.',
    blocks: [
      { id: 'b1', content: 'num = int(input())' },
      { id: 'b2', content: 'if num % 2 == 0:' },
      { id: 'b3', content: '    print("Even")' },
      { id: 'b4', content: 'else:' },
      { id: 'b5', content: '    print("Odd")' }
    ],
    expectedInput: '4', expectedOutput: 'Even', points: 100, timeLimit: 120,
    hints: [
      "To check if a number is even, see if the remainder is 0 when divided by 2.",
      "Use the modulo operator (%) to get the remainder."
    ]
  },
  {
    id: 'q2', title: 'Fibonacci Series', difficulty: 'Medium',
    description: 'Print the first n terms of the Fibonacci series.',
    blocks: [
      { id: 'b1', content: 'n = int(input())' },
      { id: 'b2', content: 'a, b = 0, 1' },
      { id: 'b3', content: 'for i in range(n):' },
      { id: 'b4', content: '    print(a)' },
      { id: 'b5', content: '    a, b = b, a + b' }
    ],
    expectedInput: '5', expectedOutput: '0\n1\n1\n2\n3', points: 150, timeLimit: 180,
    hints: [
      "The next number is found by adding up the two numbers before it.",
      "Update a and b simultaneously using 'a, b = b, a + b'."
    ]
  },
  {
    id: 'q3', title: 'Number Triangle', difficulty: 'High',
    description: 'Print a right-angled number triangle of n rows.',
    blocks: [
      { id: 'b1', content: 'n = int(input())' },
      { id: 'b2', content: 'for i in range(1, n + 1):' },
      { id: 'b3', content: '    for j in range(1, i + 1):' },
      { id: 'b4', content: '        print(j, end=" ")' },
      { id: 'b5', content: '    print()' }
    ],
    expectedInput: '3', expectedOutput: '1 \n1 2 \n1 2 3 \n', points: 200, timeLimit: 240,
    hints: [
      "You need an outer loop for rows and an inner loop for the numbers in each row.",
      "The inner loop should run from 1 up to the current row number."
    ]
  },
  {
    id: 'q4', title: 'List Sum', difficulty: 'Easy',
    description: 'Calculate the total sum of all elements in a list.',
    blocks: [
      { id: 'b1', content: 'nums = [10, 20, 30]' },
      { id: 'b2', content: 'total = 0' },
      { id: 'b3', content: 'for num in nums:' },
      { id: 'b4', content: '    total += num' },
      { id: 'b5', content: 'print(total)' }
    ],
    expectedInput: '', expectedOutput: '60', points: 100, timeLimit: 120,
    hints: [
      "Create a variable called 'total' and start it at 0.",
      "Go through each number in the list and add it to 'total'."
    ]
  },
  {
    id: 'q5', title: 'Prime Check', difficulty: 'Medium',
    description: 'Check if a given number is a prime number.',
    blocks: [
      { id: 'b1', content: 'num = int(input())' },
      { id: 'b2', content: 'is_prime = True' },
      { id: 'b3', content: 'for i in range(2, num):' },
      { id: 'b4', content: '    if num % i == 0:\n        is_prime = False' },
      { id: 'b5', content: 'print(is_prime)' }
    ],
    expectedInput: '7', expectedOutput: 'True', points: 150, timeLimit: 180,
    hints: [
      "A prime number is only divisible by 1 and itself.",
      "Loop from 2 to num-1, if any number divides perfectly, it is not prime."
    ]
  },
  {
    id: 'q6', title: 'Palindrome String', difficulty: 'Medium',
    description: 'Check if a string is read the same forwards and backwards.',
    blocks: [
      { id: 'b1', content: 'text = input()' },
      { id: 'b2', content: 'reversed_text = text[::-1]' },
      { id: 'b3', content: 'if text == reversed_text:' },
      { id: 'b4', content: '    print("Yes")' },
      { id: 'b5', content: 'else:\n    print("No")' }
    ],
    expectedInput: 'madam', expectedOutput: 'Yes', points: 150, timeLimit: 180,
    hints: [
      "You need to reverse the string first to compare it.",
      "In Python, [::-1] is a quick way to reverse a string."
    ]
  },
  {
    id: 'q7', title: 'Reverse a List', difficulty: 'Easy',
    description: 'Create a new list that has the elements in reverse order.',
    blocks: [
      { id: 'b1', content: 'my_list = [1, 2, 3]' },
      { id: 'b2', content: 'rev_list = []' },
      { id: 'b3', content: 'for item in my_list:' },
      { id: 'b4', content: '    rev_list.insert(0, item)' },
      { id: 'b5', content: 'print(rev_list)' }
    ],
    expectedInput: '', expectedOutput: '[3, 2, 1]', points: 100, timeLimit: 120,
    hints: [
      "Create an empty list to store the reversed items.",
      "Use insert(0, item) to always add the new item to the very front."
    ]
  },
  {
    id: 'q8', title: 'Find Maximum', difficulty: 'Medium',
    description: 'Find the largest number in a list without using max().',
    blocks: [
      { id: 'b1', content: 'nums = [5, 12, 9, 22]' },
      { id: 'b2', content: 'largest = nums[0]' },
      { id: 'b3', content: 'for num in nums:' },
      { id: 'b4', content: '    if num > largest:' },
      { id: 'b5', content: '        largest = num\nprint(largest)' }
    ],
    expectedInput: '', expectedOutput: '22', points: 150, timeLimit: 180,
    hints: [
      "Assume the first number is the largest to start with.",
      "Compare each number to your current largest. If it's bigger, update your largest."
    ]
  },
  {
    id: 'q9', title: 'Vowel Count', difficulty: 'Easy',
    description: 'Count how many vowels are in a given string.',
    blocks: [
      { id: 'b1', content: 'text = input()' },
      { id: 'b2', content: 'count = 0' },
      { id: 'b3', content: 'for char in text:' },
      { id: 'b4', content: '    if char in "aeiouAEIOU":' },
      { id: 'b5', content: '        count += 1\nprint(count)' }
    ],
    expectedInput: 'apple', expectedOutput: '2', points: 100, timeLimit: 120,
    hints: [
      "You need a counter variable starting at 0.",
      "Check if each character exists in the string 'aeiouAEIOU'."
    ]
  },
  {
    id: 'q10', title: 'Leap Year', difficulty: 'High',
    description: 'Determine if a given year is a leap year.',
    blocks: [
      { id: 'b1', content: 'year = int(input())' },
      { id: 'b2', content: 'if year % 4 == 0:' },
      { id: 'b3', content: '    if year % 100 == 0 and year % 400 != 0:' },
      { id: 'b4', content: '        print("No")' },
      { id: 'b5', content: '    else:\n        print("Yes")\nelse:\n    print("No")' }
    ],
    expectedInput: '2024', expectedOutput: 'Yes', points: 200, timeLimit: 240,
    hints: [
      "A leap year is divisible by 4.",
      "However, if it is divisible by 100 it must ALSO be divisible by 400 to be a leap year."
    ]
  },
  {
    id: 'q11', title: 'Multiplication Table', difficulty: 'Easy',
    description: 'Print the multiplication table for a number up to 3.',
    blocks: [
      { id: 'b1', content: 'n = int(input())' },
      { id: 'b2', content: 'for i in range(1, 4):' },
      { id: 'b3', content: '    ans = n * i' },
      { id: 'b4', content: '    print(f"{n} x {i} = {ans}")' }
    ],
    expectedInput: '5', expectedOutput: '5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15', points: 100, timeLimit: 120,
    hints: [
      "Use a loop that runs from 1 to 3.",
      "Multiply the input number by the loop variable and print."
    ]
  },
  {
    id: 'q12', title: 'Celsius to Fahrenheit', difficulty: 'Easy',
    description: 'Convert temperature from Celsius to Fahrenheit.',
    blocks: [
      { id: 'b1', content: 'c = int(input())' },
      { id: 'b2', content: 'f = (c * 9/5) + 32' },
      { id: 'b3', content: 'print(f)' }
    ],
    expectedInput: '0', expectedOutput: '32.0', points: 100, timeLimit: 120,
    hints: [
      "The formula is (Celsius * 9/5) + 32.",
      "Make sure you calculate the multiplication and division before adding 32."
    ]
  },
  {
    id: 'q13', title: 'Armstrong Number', difficulty: 'High',
    description: 'Check if a 3-digit number is an Armstrong number (sum of cubes of digits equals the number).',
    blocks: [
      { id: 'b1', content: 'num = int(input())\ntemp = num' },
      { id: 'b2', content: 'total = 0' },
      { id: 'b3', content: 'while temp > 0:' },
      { id: 'b4', content: '    digit = temp % 10\n    total += digit ** 3' },
      { id: 'b5', content: '    temp //= 10\nprint(num == total)' }
    ],
    expectedInput: '153', expectedOutput: 'True', points: 200, timeLimit: 240,
    hints: [
      "Extract each digit using modulo 10.",
      "Cube the digit, add it to a total, then divide the number by 10 to remove the last digit."
    ]
  },
  {
    id: 'q14', title: 'Tuple Concatenation', difficulty: 'Medium',
    description: 'Combine two tuples into a single tuple.',
    blocks: [
      { id: 'b1', content: 't1 = (1, 2)' },
      { id: 'b2', content: 't2 = (3, 4)' },
      { id: 'b3', content: 'result = t1 + t2' },
      { id: 'b4', content: 'print(result)' }
    ],
    expectedInput: '', expectedOutput: '(1, 2, 3, 4)', points: 150, timeLimit: 180,
    hints: [
      "Tuples can be easily joined together.",
      "Just use the + operator to combine them."
    ]
  },
  {
    id: 'q15', title: 'String Length', difficulty: 'Easy',
    description: 'Find the length of a string without using the len() function.',
    blocks: [
      { id: 'b1', content: 'text = input()' },
      { id: 'b2', content: 'count = 0' },
      { id: 'b3', content: 'for char in text:' },
      { id: 'b4', content: '    count += 1' },
      { id: 'b5', content: 'print(count)' }
    ],
    expectedInput: 'hello', expectedOutput: '5', points: 100, timeLimit: 120,
    hints: [
      "Set a counter to zero.",
      "Loop through every character in the string and add 1 to the counter each time."
    ]
  },
  {
    id: 'q16', title: 'Substring Check', difficulty: 'Medium',
    description: 'Check if a specific word exists inside a larger string.',
    blocks: [
      { id: 'b1', content: 'sentence = "Python is great"' },
      { id: 'b2', content: 'word = "is"' },
      { id: 'b3', content: 'if word in sentence:' },
      { id: 'b4', content: '    print("Found")' },
      { id: 'b5', content: 'else:\n    print("Not Found")' }
    ],
    expectedInput: '', expectedOutput: 'Found', points: 150, timeLimit: 180,
    hints: [
      "Python has a very easy way to check for substrings.",
      "Use the 'in' keyword to see if the word is inside the sentence."
    ]
  },
  {
    id: 'q17', title: 'Calculate Power', difficulty: 'Medium',
    description: 'Calculate x to the power of y using a loop instead of **.',
    blocks: [
      { id: 'b1', content: 'x = 2\ny = 3' },
      { id: 'b2', content: 'result = 1' },
      { id: 'b3', content: 'for i in range(y):' },
      { id: 'b4', content: '    result *= x' },
      { id: 'b5', content: 'print(result)' }
    ],
    expectedInput: '', expectedOutput: '8', points: 150, timeLimit: 180,
    hints: [
      "To find 2 to the power of 3, you need to multiply 2 by itself 3 times.",
      "Start with a result of 1, and multiply it by x inside a loop that runs y times."
    ]
  },
  {
    id: 'q18', title: 'Count Words', difficulty: 'Medium',
    description: 'Count how many words are in a given sentence.',
    blocks: [
      { id: 'b1', content: 'sentence = "Hello world welcome"' },
      { id: 'b2', content: 'words = sentence.split()' },
      { id: 'b3', content: 'count = 0' },
      { id: 'b4', content: 'for w in words:\n    count += 1' },
      { id: 'b5', content: 'print(count)' }
    ],
    expectedInput: '', expectedOutput: '3', points: 150, timeLimit: 180,
    hints: [
      "First, break the sentence into a list of words.",
      "Use the .split() function to separate words by spaces, then count them."
    ]
  },
  {
    id: 'q19', title: 'Dictionary Sum', difficulty: 'High',
    description: 'Calculate the sum of all values in a dictionary.',
    blocks: [
      { id: 'b1', content: 'data = {"a": 10, "b": 20}' },
      { id: 'b2', content: 'total = 0' },
      { id: 'b3', content: 'for key in data:' },
      { id: 'b4', content: '    total += data[key]' },
      { id: 'b5', content: 'print(total)' }
    ],
    expectedInput: '', expectedOutput: '30', points: 200, timeLimit: 240,
    hints: [
      "You need to loop through the keys of the dictionary.",
      "For each key, get its value using data[key] and add it to the total."
    ]
  },
  {
    id: 'q20', title: 'Set Intersection', difficulty: 'Medium',
    description: 'Find common elements between two sets.',
    blocks: [
      { id: 'b1', content: 's1 = {1, 2, 3}' },
      { id: 'b2', content: 's2 = {2, 3, 4}' },
      { id: 'b3', content: 'common = s1.intersection(s2)' },
      { id: 'b4', content: 'print(sorted(list(common)))' }
    ],
    expectedInput: '', expectedOutput: '[2, 3]', points: 150, timeLimit: 180,
    hints: [
      "Sets have built-in methods for finding common items.",
      "Use the .intersection() method between the two sets."
    ]
  },
  {
    id: 'q21', title: 'Remove Duplicates', difficulty: 'Medium',
    description: 'Remove duplicate numbers from a list.',
    blocks: [
      { id: 'b1', content: 'nums = [1, 2, 2, 3]' },
      { id: 'b2', content: 'unique = []' },
      { id: 'b3', content: 'for n in nums:' },
      { id: 'b4', content: '    if n not in unique:' },
      { id: 'b5', content: '        unique.append(n)\nprint(unique)' }
    ],
    expectedInput: '', expectedOutput: '[1, 2, 3]', points: 150, timeLimit: 180,
    hints: [
      "Create a new empty list to hold the unique numbers.",
      "Before adding a number, check if it is NOT already in the new list."
    ]
  },
  {
    id: 'q22', title: 'Factorial Check', difficulty: 'Easy',
    description: 'Find the factorial of 4.',
    blocks: [
      { id: 'b1', content: 'num = 4' },
      { id: 'b2', content: 'f = 1' },
      { id: 'b3', content: 'for i in range(1, num + 1):' },
      { id: 'b4', content: '    f *= i' },
      { id: 'b5', content: 'print(f)' }
    ],
    expectedInput: '', expectedOutput: '24', points: 100, timeLimit: 120,
    hints: [
      "Start with a value of 1.",
      "Multiply it by 1, then 2, then 3, then 4."
    ]
  },
  {
    id: 'q23', title: 'FizzBuzz', difficulty: 'High',
    description: 'Print Fizz if divisible by 3, Buzz if by 5, else the number (for num=15).',
    blocks: [
      { id: 'b1', content: 'num = 15' },
      { id: 'b2', content: 'if num % 3 == 0 and num % 5 == 0:\n    print("FizzBuzz")' },
      { id: 'b3', content: 'elif num % 3 == 0:\n    print("Fizz")' },
      { id: 'b4', content: 'elif num % 5 == 0:\n    print("Buzz")' },
      { id: 'b5', content: 'else:\n    print(num)' }
    ],
    expectedInput: '', expectedOutput: 'FizzBuzz', points: 200, timeLimit: 240,
    hints: [
      "Order matters in if-else statements.",
      "Check if it is divisible by BOTH 3 and 5 first!"
    ]
  },
  {
    id: 'q24', title: 'Star Pattern', difficulty: 'Medium',
    description: 'Print a simple square of stars (2x2).',
    blocks: [
      { id: 'b1', content: 'size = 2' },
      { id: 'b2', content: 'for i in range(size):' },
      { id: 'b3', content: '    for j in range(size):' },
      { id: 'b4', content: '        print("*", end="")' },
      { id: 'b5', content: '    print()' }
    ],
    expectedInput: '', expectedOutput: '**\n**\n', points: 150, timeLimit: 180,
    hints: [
      "A square pattern needs an outer loop for rows and inner loop for columns.",
      "Print a star without a newline inside the inner loop, and a newline after."
    ]
  },
  {
    id: 'q25', title: 'Sum of Digits', difficulty: 'Easy',
    description: 'Find the sum of digits of a number (e.g., 23 -> 5).',
    blocks: [
      { id: 'b1', content: 'num = 23' },
      { id: 'b2', content: 'total = 0' },
      { id: 'b3', content: 'while num > 0:' },
      { id: 'b4', content: '    total += num % 10' },
      { id: 'b5', content: '    num //= 10\nprint(total)' }
    ],
    expectedInput: '', expectedOutput: '5', points: 100, timeLimit: 120,
    hints: [
      "Use modulo 10 to get the last digit.",
      "Add it to your total, then use integer division (// 10) to remove the last digit."
    ]
  }
];

export const useStore = create(
  persist(
    (set, get) => ({
  // User Data
  user: null, // { teamName, name, regNo }
  isAdmin: false,
  
  // Theme State
  theme: 'dark',
  
  // Game State
  questions: [], // The assigned set of questions
  currentQuestionIndex: 0,
  score: 0,
  stars: 0,
  completedQuestions: {}, // { qId: { isCorrect, points, timeTaken, hintsUsedOnQuestion } }
  
  // Hint State
  totalHintsUsed: 0, // Global hint counter (10 free)

  // Actions
  login: (userData) => {
    // Generate a sequence of questions
    const shuffledQuestions = [...QUESTION_BANK].sort(() => 0.5 - Math.random());
    set({ 
      user: userData, 
      questions: shuffledQuestions, 
      currentQuestionIndex: 0, 
      score: 0, 
      stars: 0, 
      completedQuestions: {},
      totalHintsUsed: 0
    });
  },
  
  loginAdmin: () => set({ isAdmin: true }),
  logoutAdmin: () => set({ isAdmin: false }),
  removeTeam: () => set({ user: null, score: 0, stars: 0, completedQuestions: {} }),
  
  logout: () => set({ user: null }),

  toggleTheme: () => set(state => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

  useHint: () => {
    set(state => ({ totalHintsUsed: state.totalHintsUsed + 1 }));
  },
  
  submitAnswer: (questionId, isCorrect, timeTaken, hintsUsedOnQuestion = 0, costPerPaidHint = 0) => {
    set((state) => {
      const question = state.questions.find(q => q.id === questionId);
      let pointsEarned = 0;
      let starEarned = 0;
      
      if (isCorrect) {
        pointsEarned = question.points;
        // If they used paid hints on THIS question, reduce stars for this question
        starEarned = Math.max(0, 1 - costPerPaidHint); // 1 star minus cost (which is 1 if paid hint used)
        
        // Speed bonus
        const timeRatio = timeTaken / question.timeLimit;
        if (timeRatio < 0.5) {
          pointsEarned += Math.floor(30 * (1 - timeRatio * 2));
        }
      } else {
        pointsEarned = -10; // penalty
      }
      
      return {
        score: Math.max(0, state.score + pointsEarned),
        stars: Math.max(0, state.stars + starEarned), // Prevent negative stars just in case
        completedQuestions: {
          ...state.completedQuestions,
          [questionId]: { isCorrect, points: pointsEarned, timeTaken, hintsUsedOnQuestion }
        }
      };
    });
  },
  
  nextQuestion: () => {
    set((state) => ({
      currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1)
    }));
  },
  
  goToQuestion: (index) => set({ currentQuestionIndex: index }),
  
  resetGame: () => {
    set((state) => ({
      currentQuestionIndex: 0,
      score: 0,
      stars: 0,
      completedQuestions: {},
      totalHintsUsed: 0
    }));
  }
}),
{
  name: 'codeblocks-storage',
}
));
