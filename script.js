// DOM Elements
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const scoreContainer = document.getElementById('score-container');
const finalScoreElement = document.getElementById('final-score');
const totalQuestionsElement = document.getElementById('total-questions');
const levelSelector = document.getElementById('level');
const subjectSelector = document.getElementById('subject');

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  scoreContainer.classList.add('hide');
  questionContainer.classList.remove('hide');
  quizScore = 0;
  document.getElementById('right-answers').innerText = quizScore;

  const subject = subjectSelector.value;
  const level = levelSelector.value;

  shuffledQuestions = questionBank[subject][level].sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.innerText = answer.text;
    btn.classList.add('btn');
    if (answer.correct) btn.dataset.correct = answer.correct;
    btn.addEventListener('click', selectAnswer);
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selected = e.target;
  const correct = selected.dataset.correct === 'true';
  setStatusClass(document.body, correct);

  Array.from(answerButtons.children).forEach(btn => {
    setStatusClass(btn, btn.dataset.correct === 'true');
    btn.disabled = true;
  });

  if (correct) {
    quizScore++;
    document.getElementById('right-answers').innerText = quizScore;
  }

  if (currentQuestionIndex + 1 < shuffledQuestions.length) {
    nextButton.classList.remove('hide');
  } else {
    showFinalScore();
  }
}

function showFinalScore() {
  questionContainer.classList.add('hide');
  scoreContainer.classList.remove('hide');
  finalScoreElement.innerText = quizScore;
  totalQuestionsElement.innerText = shuffledQuestions.length;
  startButton.innerText = 'Restart';
  startButton.classList.remove('hide');
}

function setStatusClass(el, correct) {
  clearStatusClass(el);
  el.classList.add(correct ? 'correct' : 'wrong');
}

function clearStatusClass(el) {
  el.classList.remove('correct');
  el.classList.remove('wrong');
}

// Question Bank with ≥10 questions per language across levels
const questionBank = {
  web: {
    easy: [
      { question: 'What does HTML stand for?', answers: [
          { text: 'Hyper Text Markup Language', correct: true },
          { text: 'HighText Machine Language', correct: false },
          { text: 'Hyper Tabular Markup Language', correct: false },
          { text: 'None', correct: false }
        ]
      },
      { question: 'Which tag is used to create a hyperlink?', answers: [
          { text: '<a>', correct: true },
          { text: '<link>', correct: false },
          { text: '<href>', correct: false },
          { text: '<hyper>', correct: false }
        ]
      },
      { question: 'Which attribute provides alt text for images?', answers: [
          { text: 'alt', correct: true },
          { text: 'title', correct: false },
          { text: 'src', correct: false },
          { text: 'text', correct: false }
        ]
      },
      { question: 'What does CSS stand for?', answers: [
          { text: 'Cascading Style Sheets', correct: true },
          { text: 'Computer Style Sheets', correct: false },
          { text: 'Creative Styles', correct: false },
          { text: 'Colorful Style Sheets', correct: false }
        ]
      },
      { question: 'Which property changes background color?', answers: [
          { text: 'background-color', correct: true },
          { text: 'color', correct: false },
          { text: 'bgcolor', correct: false },
          { text: 'background', correct: false }
        ]
      },
      { question: 'Which tag is used for ordered list?', answers: [
          { text: '<ol>', correct: true },
          { text: '<ul>', correct: false },
          { text: '<li>', correct: false },
          { text: '<list>', correct: false }
        ]
      },
      { question: 'Which tag embeds JS?', answers: [
          { text: '<script>', correct: true },
          { text: '<js>', correct: false },
          { text: '<code>', correct: false },
          { text: '<javascript>', correct: false }
        ]
      },
      { question: 'Which CSS property makes text bold?', answers: [
          { text: 'font-weight', correct: true },
          { text: 'font-style', correct: false },
          { text: 'text-weight', correct: false },
          { text: 'font-bold', correct: false }
        ]
      },
      { question: 'Which tag inserts a line break?', answers: [
          { text: '<br>', correct: true },
          { text: '<break>', correct: false },
          { text: '<lb>', correct: false },
          { text: '<hr>', correct: false }
        ]
      },
      { question: 'Which element plays video files?', answers: [
          { text: '<video>', correct: true },
          { text: '<media>', correct: false },
          { text: '<movie>', correct: false },
          { text: '<play>', correct: false }
        ]
      }
    ],
    medium: [
      { question: "'this' keyword refers to?", answers: [
          { text: 'object owning the method', correct: true },
          { text: 'global object', correct: false },
          { text: 'a class', correct: false },
          { text: 'new instance', correct: false }
        ]
      },
      { question: 'Which unit is not valid in CSS?', answers: [
          { text: 'kg', correct: true },
          { text: 'px', correct: false },
          { text: 'em', correct: false },
          { text: 'pt', correct: false }
        ]
      },
      { question: 'Default CSS position value?', answers: [
          { text: 'static', correct: true },
          { text: 'relative', correct: false },
          { text: 'absolute', correct: false },
          { text: 'fixed', correct: false }
        ]
      },
      { question: 'Method to add item at array end in JS?', answers: [
          { text: 'push()', correct: true },
          { text: 'append()', correct: false },
          { text: 'insert()', correct: false },
          { text: 'add()', correct: false }
        ]
      },
      { question: 'Which HTML5 defines navigation links?', answers: [
          { text: '<nav>', correct: true },
          { text: '<menu>', correct: false },
          { text: '<links>', correct: false },
          { text: '<navigate>', correct: false }
        ]
      },
      { question: 'CSS property used to animate?', answers: [
          { text: 'animation', correct: true },
          { text: 'transition', correct: false },
          { text: 'motion', correct: false },
          { text: 'keyframes', correct: false }
        ]
      },
      { question: 'HTTP status code 404 means?', answers: [
          { text: 'Not Found', correct: true },
          { text: 'Server Error', correct: false },
          { text: 'Forbidden', correct: false },
          { text: 'Moved Permanently', correct: false }
        ]
      },
      { question: 'z-index property does what?', answers: [
          { text: 'Controls stacking order', correct: true },
          { text: 'Sets zoom level', correct: false },
          { text: 'Resizes element', correct: false },
          { text: 'Background layer', correct: false }
        ]
      },
      { question: 'What does === operator check in JS?', answers: [
          { text: 'value and type', correct: true },
          { text: 'value only', correct: false },
          { text: 'type only', correct: false },
          { text: 'assignment', correct: false }
        ]
      },
      { question: 'Output of typeof null?', answers: [
          { text: 'object', correct: true },
          { text: 'null', correct: false },
          { text: 'undefined', correct: false },
          { text: 'boolean', correct: false }
        ]
      }
    ],
    hard: [
      { question: 'What is event bubbling?', answers: [
          { text: 'child to parent propagation', correct: true },
          { text: 'parent to child', correct: false },
          { text: 'fires once', correct: false },
          { text: 'none of above', correct: false }
        ]
      },
      { question: 'JSON.parse() does what?', answers: [
          { text: 'convert JSON string to object', correct: true },
          { text: 'stringify object', correct: false },
          { text: 'convert to XML', correct: false },
          { text: 'encode JSON', correct: false }
        ]
      },
      { question: 'Which CSS preprocessor uses .scss?', answers: [
          { text: 'Sass', correct: true },
          { text: 'Less', correct: false },
          { text: 'Stylus', correct: false },
          { text: 'PostCSS', correct: false }
        ]
      },
      { question: 'What does defer attribute do?', answers: [
          { text: 'executes script after HTML parsing', correct: true },
          { text: 'delays parsing', correct: false },
          { text: 'skips script', correct: false },
          { text: 'caches script', correct: false }
        ]
      },
      { question: 'Which responsive image tag?', answers: [
          { text: '<picture>', correct: true },
          { text: '<srcset>', correct: false },
          { text: '<img-responsive>', correct: false },
          { text: '<responsive>', correct: false }
        ]
      },
      { question: 'JavaScript closure is?', answers: [
          { text: 'function inside function', correct: true },
          { text: 'hoisting', correct: false },
          { text: 'global variables', correct: false },
          { text: 'objects defined', correct: false }
        ]
      },
      { question: 'Purpose of "use strict" in JS?', answers: [
          { text: 'stricter parsing & error handling', correct: true },
          { text: 'ignores errors', correct: false },
          { text: 'prevents loops', correct: false },
          { text: 'runs faster', correct: false }
        ]
      },
      { question: 'Medium-level web dev trick question?', answers: [
          { text: 'stacking context trick', correct: false },
          { text: 'unsupported CSS hack', correct: false },
          { text: 'unexpected bug', correct: false },
          { text: 'none listed', correct: true }
        ]
      },
      { question: 'What is DOM event delegation?', answers: [
          { text: 'handling at parent level', correct: true },
          { text: 'each child separately', correct: false },
          { text: 'stop event', correct: false },
          { text: 'prevent default', correct: false }
        ]
      },
      { question: 'Difference let vs var in JS?', answers: [
          { text: 'block vs function scope', correct: true },
          { text: 'only hoisting difference', correct: false },
          { text: 'different names', correct: false },
          { text: 'no difference', correct: false }
        ]
      }
    ]
  },
  python: {
    easy: [
      { question: 'Output of print(2 + 3)?', answers: [
          { text: '5', correct: true },
          { text: '23', correct: false },
          { text: 'None', correct: false },
          { text: '45', correct: false }
        ]
      },
      { question: 'Which keyword defines a function?', answers: [
          { text: 'def', correct: true },
          { text: 'function', correct: false },
          { text: 'fun', correct: false },
          { text: 'define', correct: false }
        ]
      },
      { question: 'How do you create a list?', answers: [
          { text: '[1, 2, 3]', correct: true },
          { text: '(1,2,3)', correct: false },
          { text: '{1,2,3}', correct: false },
          { text: '<1,2,3>', correct: false }
        ]
      },
      { question: 'Which symbol denotes comment?', answers: [
          { text: '#', correct: true },
          { text: '//', correct: false },
          { text: '<!--', correct: false },
          { text: '/*', correct: false }
        ]
      },
      { question: 'Output of len("hello")?', answers: [
          { text: '5', correct: true },
          { text: '4', correct: false },
          { text: '6', correct: false },
          { text: 'None', correct: false }
        ]
      },
      { question: 'Print on same line ends with?', answers: [
          { text: 'end', correct: true },
          { text: 'newline', correct: false },
          { text: 'sep', correct: false },
          { text: 'stop', correct: false }
        ]
      },
      { question: 'Concat two strings: "a"+"b"?', answers: [
          { text: 'ab', correct: true },
          { text: 'a b', correct: false },
          { text: 'a+b', correct: false },
          { text: 'error', correct: false }
        ]
      },
      { question: 'True or False returns which?', answers: [
          { text: 'Boolean', correct: true },
          { text: 'String', correct: false },
          { text: 'Number', correct: false },
          { text: 'None', correct: false }
        ]
      },
      { question: 'Which is float literal?', answers: [
          { text: '3.14', correct: true },
          { text: '314', correct: false },
          { text: '"3.14"', correct: false },
          { text: 'None', correct: false }
        ]
      },
      { question: 'Which function converts to integer?', answers: [
          { text: 'int()', correct: true },
          { text: 'string()', correct: false },
          { text: 'float()', correct: false },
          { text: 'num()', correct: false }
        ]
      }
    ],
    medium: [
      { question: 'What does range(5) yield?', answers: [
          { text: '0 to 4', correct: true },
          { text: '1 to 5', correct: false },
          { text: '0 to 5', correct: false },
          { text: '5 only', correct: false }
        ]
      },
      { question: 'Which loop iterates over sequence?', answers: [
          { text: 'for', correct: true },
          { text: 'while', correct: false },
          { text: 'do-while', correct: false },
          { text: 'repeat', correct: false }
        ]
      },
      { question: 'Dictionary key:value syntax?', answers: [
          { text: "{'a':1}", correct: true },
          { text: "('a',1)", correct: false },
          { text: "[‘a’,1]", correct: false },
          { text: "{a=1}", correct: false }
        ]
      },
      { question: 'What does strip() do?', answers: [
          { text: 'removes whitespace', correct: true },
          { text: 'removes newline only', correct: false },
          { text: 'removes digits', correct: false },
          { text: 'converts case', correct: false }
        ]
      },
      { question: 'Lambda creates what?', answers: [
          { text: 'anonymous function', correct: true },
          { text: 'module', correct: false },
          { text: 'class', correct: false },
          { text: 'loop', correct: false }
        ]
      },
      { question: 'Import module math', answers: [
          { text: 'import math', correct: true },
          { text: 'include math', correct: false },
          { text: 'using math', correct: false },
          { text: '#import math', correct: false }
        ]
      },
      { question: 'Open file read mode?', answers: [
          { text: 'open("file","r")', correct: true },
          { text: 'open("file","w")', correct: false },
          { text: 'file.read()', correct: false },
          { text: 'read file', correct: false }
        ]
      },
      { question: 'len({"a":1,"b":2})?', answers: [
          { text: '2', correct: true },
          { text: '1', correct: false },
          { text: 'None', correct: false },
          { text: '0', correct: false }
        ]
      },
      { question: 'Mutable sequence type?', answers: [
          { text: 'list', correct: true },
          { text: 'tuple', correct: false },
          { text: 'string', correct: false },
          { text: 'int', correct: false }
        ]
      },
      { question: 'Which comprehension syntax?', answers: [
          { text: '[x for x in range(5)]', correct: true },
          { text: '{x | x in range(5)}', correct: false },
          { text: '(x for x in range(5))', correct: false },
          { text: '<x>', correct: false }
        ]
      }
    ],
    hard: [
      { question: 'What is list slicing f[1:4]?', answers: [
          { text: 'indices 1‑3', correct: true },
          { text: 'indices 1‑4', correct: false },
          { text: '1 only', correct: false },
          { text: 'None', correct: false }
        ]
      },
      { question: 'What is a decorator?', answers: [
          { text: 'wraps function with another', correct: true },
          { text: 'list comprehension', correct: false },
          { text: 'class method', correct: false },
          { text: 'module alias', correct: false }
        ]
      },
      { question: 'PEP8 relates to what?', answers: [
          { text: 'style guide', correct: true },
          { text: 'package installer', correct: false },
          { text: 'bytecode', correct: false },
          { text: 'virtualenv', correct: false }
        ]
      },
      { question: 'Global vs local variable scope?', answers: [
          { text: 'scope difference matters', correct: true },
          { text: 'no difference', correct: false },
          { text: 'depends on type', correct: false },
          { text: 'only in loops', correct: false }
        ]
      },
      { question: 'List comprehension output type?', answers: [
          { text: 'list', correct: true },
          { text: 'tuple', correct: false },
          { text: 'set', correct: false },
          { text: 'dict', correct: false }
        ]
      },
      { question: 'What does enumerate() return?', answers: [
          { text: 'index and value pair', correct: true },
          { text: 'just value', correct: false },
          { text: 'just index', correct: false },
          { text: 'list of items', correct: false }
        ]
      },
      { question: 'Raise exception manually keyword?', answers: [
          { text: 'raise', correct: true },
          { text: 'throw', correct: false },
          { text: 'exception', correct: false },
          { text: 'error', correct: false }
        ]
      },
      { question: 'Mutable default arg pitfall?', answers: [
          { text: 'shared list across calls', correct: true },
          { text: 'works as expected', correct: false },
          { text: 'syntax error', correct: false },
          { text: 'performance improvement', correct: false }
        ]
      },
      { question: 'Generator uses which keyword?', answers: [
          { text: 'yield', correct: true },
          { text: 'return', correct: false },
          { text: 'yielding', correct: false },
          { text: 'generate', correct: false }
        ]
      },
      { question: 'Context manager keyword?', answers: [
          { text: 'with', correct: true },
          { text: 'using', correct: false },
          { text: 'context', correct: false },
          { text: 'manage', correct: false }
        ]
      }
    ]
  },
  java: {
    easy: [
      { question: 'Keyword to define class?', answers: [
          { text: 'class', correct: true },
          { text: 'Class', correct: false },
          { text: 'define', correct: false },
          { text: 'object', correct: false }
        ]
      },
      { question: 'Java entry point method?', answers: [
          { text: 'main()', correct: true },
          { text: 'start()', correct: false },
          { text: 'run()', correct: false },
          { text: 'begin()', correct: false }
        ]
      },
      { question: 'Declare variable int x = 5;, x is?', answers: [
          { text: 'variable', correct: true },
          { text: 'class', correct: false },
          { text: 'method', correct: false },
          { text: 'package', correct: false }
        ]
      },
      { question: 'Which punctuation ends statements?', answers: [
          { text: ';', correct: true },
          { text: '.', correct: false },
          { text: ',', correct: false },
          { text: ':', correct: false }
        ]
      },
      { question: 'Print to console?', answers: [
          { text: 'System.out.println()', correct: true },
          { text: 'Console.log()', correct: false },
          { text: 'echo()', correct: false },
          { text: 'print()', correct: false }
        ]
      },
      { question: 'Keyword for inheritance?', answers: [
          { text: 'extends', correct: true },
          { text: 'implements', correct: false },
          { text: 'inherits', correct: false },
          { text: 'super', correct: false }
        ]
      },
      { question: 'Which is primitive type?', answers: [
          { text: 'int', correct: true },
          { text: 'String', correct: false },
          { text: 'Array', correct: false },
          { text: 'Object', correct: false }
        ]
      },
      { question: 'Java file ends with?', answers: [
          { text: '.java', correct: true },
          { text: '.class', correct: false },
          { text: '.py', correct: false },
          { text: '.js', correct: false }
        ]
      },
      { question: 'Which loop is guaranteed at least once?', answers: [
          { text: 'do-while', correct: true },
          { text: 'while', correct: false },
          { text: 'for', correct: false },
          { text: 'if', correct: false }
        ]
      },
      { question: 'Keyword for constant value?', answers: [
          { text: 'final', correct: true },
          { text: 'const', correct: false },
          { text: 'static', correct: false },
          { text: 'constant', correct: false }
        ]
      }
    ],
    medium: [
      { question: 'What is polymorphism?', answers: [
          { text: 'ability take many forms', correct: true },
          { text: 'multiple inheritance', correct: false },
          { text: 'data hiding', correct: false },
          { text: 'method overloading', correct: false }
        ]
      },
      { question: 'Interface keyword?', answers: [
          { text: 'interface', correct: true },
          { text: 'implements', correct: false },
          { text: 'extends', correct: false },
          { text: 'class', correct: false }
        ]
      },
      { question: 'Which package contains Scanner?', answers: [
          { text: 'java.util', correct: true },
          { text: 'java.io', correct: false },
          { text: 'javax', correct: false },
          { text: 'java.lang', correct: false }
        ]
      },
      { question: 'Which exception needs catch?', answers: [
          { text: 'checked exception', correct: true },
          { text: 'runtime exception', correct: false },
          { text: 'error', correct: false },
          { text: 'all exceptions', correct: false }
        ]
      },
      { question: 'Keyword for thread start?', answers: [
          { text: 'start()', correct: true },
          { text: 'run()', correct: false },
          { text: 'init()', correct: false },
          { text: 'execute()', correct: false }
        ]
      },
      { question: 'JDK vs JRE difference?', answers: [
          { text: 'JDK includes tools, JRE runs Java', correct: true },
          { text: 'JRE has tools', correct: false },
          { text: 'JDK only runtime', correct: false },
          { text: 'No difference', correct: false }
        ]
      },
      { question: 'What is garbage collection?', answers: [
          { text: 'automatic memory management', correct: true },
          { text: 'manual memory free', correct: false },
          { text: 'stack memory cleanup', correct: false },
          { text: 'none', correct: false }
        ]
      },
      { question: 'Static keyword means?', answers: [
          { text: 'class level member', correct: true },
          { text: 'instance member', correct: false },
          { text: 'private member', correct: false },
          { text: 'abstract member', correct: false }
        ]
      },
      { question: 'What is method overloading?', answers: [
          { text: 'same name diff parameters', correct: true },
          { text: 'same signature override', correct: false },
          { text: 'overriding', correct: false },
          { text: 'none', correct: false }
        ]
      },
      { question: 'What does toString() return?', answers: [
          { text: 'string representation of object', correct: true },
          { text: 'object itself', correct: false },
          { text: 'class name', correct: false },
          { text: 'hash code', correct: false }
        ]
      }
    ],
    hard: [
      { question: 'What is abstraction?', answers: [
          { text: 'hide implementation details', correct: true },
          { text: 'encapsulation', correct: false },
          { text: 'inheritance', correct: false },
          { text: 'polymorphism', correct: false }
        ]
      },
      { question: 'What is synchronization in threads?', answers: [
          { text: 'coordinate access by multiples threads', correct: true },
          { text: 'parallel execution', correct: false },
          { text: 'thread creation', correct: false },
          { text: 'exception handling', correct: false }
        ]
      },
      { question: 'What is JIT compiler?', answers: [
          { text: 'compiles at runtime', correct: true },
          { text: 'pre‑compiles classes', correct: false },
          { text: 'interprets code', correct: false },
          { text: 'none', correct: false }
        ]
      },
      { question: 'Runtime polymorphism keyword?', answers: [
          { text: 'overriding', correct: true },
          { text: 'overloading', correct: false },
          { text: 'static binding', correct: false },
          { text: 'abstract', correct: false }
        ]
      },
      { question: 'What is reflection?', answers: [
          { text: 'inspect classes/objects at runtime', correct: true },
          { text: 'serializing objects', correct: false },
          { text: 'cloning objects', correct: false },
          { text: 'none', correct: false }
        ]
      },
      { question: 'What is serialization?', answers: [
          { text: 'convert object to byte stream', correct: true },
          { text: 'store memory', correct: false },
          { text: 'compile object', correct: false },
          { text: 'none', correct: false }
        ]
      },
      { question: 'Indicator of NPE?', answers: [
          { text: 'NullPointerException', correct: true },
          { text: 'ClassNotFound', correct: false },
          { text: 'IOException', correct: false },
          { text: 'ArrayIndexOut', correct: false }
        ]
      },
      { question: 'Difference checked vs unchecked?', answers: [
          { text: 'checked must be caught or declared', correct: true },
          { text: 'unchecked must be declared',correct: false },
          { text: 'no difference', correct: false },
          { text: 'runtime only', correct: false }
        ]
      },
      { question: 'What is interface default method?', answers: [
          { text: 'method with body in interface', correct: true },
          { text: 'abstract method', correct: false },
          { text: 'static method', correct: false },
          { text: 'private method', correct: false }
        ]
      },
      { question: 'What is JDBC used for?', answers: [
          { text: 'connect Java to databases', correct: true },
          { text: 'network comms', correct: false },
          { text: 'GUI creation', correct: false },
          { text: 'file I/O', correct: false }
        ]
      }
    ]
  }
};
