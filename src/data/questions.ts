import { Question, Topic, Difficulty } from '@/types';

export const TOPICS: Topic[] = [
    'Arrays',
    'Strings',
    'Linked Lists',
    'Stacks',
    'Queues',
    'Trees',
    'Binary Search Trees',
    'Heaps',
    'Graphs',
    'Dynamic Programming',
    'Greedy',
    'Backtracking',
    'Bit Manipulation',
    'Math',
    'Sorting',
    'Searching',
    'Hashing',
    'Two Pointers',
    'Sliding Window',
    'Recursion',
];

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
    Easy: 'badge-easy',
    Medium: 'badge-medium',
    Hard: 'badge-hard',
};

export const questions: Question[] = [
    {
        "id": "1",
        "title": "Call Function With Custom Context",
        "slug": "call-function-with-custom-context",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "@param {Object} context @param {...*?} args @return {null|boolean|number|string|Array|Object}",
        "examples": [
            {
                "input": "add.callPolyfill({ a: 5 }, 7, 10)",
                "output": "22",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Call implementation\n// Enhance all functions to have the callPolyfill method.\n// The method accepts an object obj as it's first parameter\n// and any number of additional arguments.\n// The obj becomes the this context for the function.\n// The additional arguments are passed to the function\n// (that the callPolyfill method belongs on).\n\n/**\n * @param {Object} context\n * @param {...*?} args\n * @return {null|boolean|number|string|Array|Object}\n */\n// eslint-disable-next-line no-extend-native\nFunction.prototype.callPolyfill = function (context, ...args) {\n  const call = Symbol('call');\n  context[call] = this;\n  const result = context[call](...args);\n  delete context[call];\n  return result;\n};\n\nfunction add(b, c) {\n  return this.a + b + c;\n}\nconsole.log(add.callPolyfill({ a: 5 }, 7, 10)); // 22\n",
        "starterCode": {
            "javascript": "// Call Function With Custom Context\n// Arrays\n\n// Call implementation\n// Enhance all functions to have the callPolyfill method.\n// The method accepts an object obj as it's first parameter\n// and any number of additional arguments.\n// The obj becomes the this context for the function.\n// The additional arguments are passed to the function\n// (that the callPolyfill method belongs on).\n\n/**\n * @param {Object} context\n * @param {...*?} args\n * @return {null|boolean|number|string|Array|Object}\n */\n// eslint-disable-next-line no-extend-native\nFunction.prototype.callPolyfill = function (context, ...args) {\n  const call = Symbol('call');\n  context[call] = this;\n  const result = context[call](...args);\n  delete context[call];\n  return result;\n};\n\nfunction add(b, c) {\n  return this.a + b + c;\n}\nconsole.log(add.callPolyfill({ a: 5 }, 7, 10)); // 22\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 79,
        "likes": 61
    },
    {
        "id": "2",
        "title": "Cancellable Function",
        "slug": "cancellable-function",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "@param {Generator} generator @return {[Function, Promise]}",
        "examples": [
            {
                "input": "err.message)",
                "output": "logs \"Cancelled\" at t=50ms",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Sometimes you have a long-running task,\n// and you may wish to cancel it before it completes.\n// To help with this goal, write a function cancellable\n// that accepts a generator object and returns an array of two values:\n// a cancel function and a promise.\n// You may assume the generator function will only yield promises.\n// It is your function's responsibility to pass the values resolved\n// by the promise back to the generator. If the promise rejects,\n// your function should throw that error back to the generator.\n// If the cancel callback is called before the generator is done,\n// your function should throw an error back to the generator.\n// That error should be the string \"Cancelled\" (Not an Error object).\n// If the error was caught, the returned promise should resolve\n// with the next value that was yielded or returned.\n// Otherwise, the promise should reject with the thrown error.\n// No more code should be executed.\n// When the generator is done, the promise your function returned\n// should resolve the value the generator returned.\n// If, however, the generator throws an error,\n// the returned promise should reject with the error.\n\n/**\n * @param {Generator} generator\n * @return {[Function, Promise]}\n */\nconst cancellable = function (generator) {\n  let cancel;\n  const rejectPromise = new Promise((resolve, reject) => {\n    cancel = () => reject(new Error('Cancelled'));\n  });\n  const getPromise = async () => {\n    let nextObj = generator.next();\n    while (!nextObj.done) {\n      try {\n        nextObj = generator.next(await Promise.race([nextObj.value, rejectPromise]));\n      } catch (err) {\n        nextObj = generator.throw(err);\n      }\n    }\n    return nextObj.value;\n  };\n  return [cancel, getPromise()];\n};\n\nfunction * tasks() {\n  const val = yield new Promise(resolve => resolve(2 + 2));\n  yield new Promise(resolve => setTimeout(resolve, 100));\n  return val + 1;\n}\n\nconst canceledTasks = cancellable(tasks());\nsetTimeout(canceledTasks[0], 50);\ncanceledTasks[1].catch(err => console.log(err.message)); // logs \"Cancelled\" at t=50ms\n\nconst successfulTasks = cancellable(tasks());\nsuccessfulTasks[1].then(console.log); // 5\n",
        "starterCode": {
            "javascript": "// Cancellable Function\n// Arrays\n\n// Sometimes you have a long-running task,\n// and you may wish to cancel it before it completes.\n// To help with this goal, write a function cancellable\n// that accepts a generator object and returns an array of two values:\n// a cancel function and a promise.\n// You may assume the generator function will only yield promises.\n// It is your function's responsibility to pass the values resolved\n// by the promise back to the generator. If the promise rejects,\n// your function should throw that error back to the generator.\n// If the cancel callback is called before the generator is done,\n// your function should throw an error back to the generator.\n// That error should be the string \"Cancelled\" (Not an Error object).\n// If the error was caught, the returned promise should resolve\n// with the next value that was yielded or returned.\n// Otherwise, the promise should reject with the thrown error.\n// No more code should be executed.\n// When the generator is done, the promise your function returned\n// should resolve the value the generator returned.\n// If, however, the generator throws an error,\n// the returned promise should reject with the error.\n\n/**\n * @param {Generator} generator\n * @return {[Function, Promise]}\n */\nconst cancellable = function (generator) {\n  let cancel;\n  const rejectPromise = new Promise((resolve, reject) => {\n    cancel = () => reject(new Error('Cancelled'));\n  });\n  const getPromise = async () => {\n    let nextObj = generator.next();\n    while (!nextObj.done) {\n      try {\n        nextObj = generator.next(await Promise.race([nextObj.value, rejectPromise]));\n      } catch (err) {\n        nextObj = generator.throw(err);\n      }\n    }\n    return nextObj.value;\n  };\n  return [cancel, getPromise()];\n};\n\nfunction * tasks() {\n  const val = yield new Promise(resolve => resolve(2 + 2));\n  yield new Promise(resolve => setTimeout(resolve, 100));\n  return val + 1;\n}\n\nconst canceledTasks = cancellable(tasks());\nsetTimeout(canceledTasks[0], 50);\ncanceledTasks[1].catch(err => console.log(err.message)); // logs \"Cancelled\" at t=50ms\n\nconst successfulTasks = cancellable(tasks());\nsuccessfulTasks[1].then(console.log); // 5\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 64,
        "likes": 294
    },
    {
        "id": "3",
        "title": "Check If Object Instance Of Class",
        "slug": "check-if-object-instance-of-class",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "@param {*} obj @param {*} classFunction @return {boolean}",
        "examples": [
            {
                "input": "checkIfInstanceOf(new Date(), Date)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "checkIfInstanceOf(Date, Date)",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "checkIfInstanceOf(Number.NaN, Number)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "checkIfInstanceOf(5, Number)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "checkIfInstanceOf(new (class Dog extends Animal {})(), Animal)",
                "output": "true",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "on the data types that can be passed to the function.",
            "For example, the value or the class could be undefined."
        ],
        "hints": [],
        "solution": "// Write a function that checks if a given value is an instance\n// of a given class or superclass. For this problem,\n// an object is considered an instance of a given class\n// if that object has access to that class's methods.\n// There are no constraints on the data types that can be passed to the function.\n// For example, the value or the class could be undefined.\n\n/**\n * @param {*} obj\n * @param {*} classFunction\n * @return {boolean}\n */\nconst checkIfInstanceOf = function (obj, classFunction) {\n  if (obj === null || obj === undefined || typeof classFunction !== 'function') {\n    return false;\n  }\n  return Object(obj) instanceof classFunction;\n};\n\nconsole.log(checkIfInstanceOf(new Date(), Date)); // true\nconsole.log(checkIfInstanceOf(Date, Date)); // false\nconsole.log(checkIfInstanceOf(Number.NaN, Number)); // true\nconsole.log(checkIfInstanceOf(5, Number)); // true\nclass Animal {}\nconsole.log(checkIfInstanceOf(new (class Dog extends Animal {})(), Animal)); // true\n",
        "starterCode": {
            "javascript": "// Check If Object Instance Of Class\n// Arrays\n\n// Write a function that checks if a given value is an instance\n// of a given class or superclass. For this problem,\n// an object is considered an instance of a given class\n// if that object has access to that class's methods.\n// There are no constraints on the data types that can be passed to the function.\n// For example, the value or the class could be undefined.\n\n/**\n * @param {*} obj\n * @param {*} classFunction\n * @return {boolean}\n */\nconst checkIfInstanceOf = function (obj, classFunction) {\n  if (obj === null || obj === undefined || typeof classFunction !== 'function') {\n    return false;\n  }\n  return Object(obj) instanceof classFunction;\n};\n\nconsole.log(checkIfInstanceOf(new Date(), Date)); // true\nconsole.log(checkIfInstanceOf(Date, Date)); // false\nconsole.log(checkIfInstanceOf(Number.NaN, Number)); // true\nconsole.log(checkIfInstanceOf(5, Number)); // true\nclass Animal {}\nconsole.log(checkIfInstanceOf(new (class Dog extends Animal {})(), Animal)); // true\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 61,
        "likes": 545
    },
    {
        "id": "4",
        "title": "Currying",
        "slug": "currying",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "@param {Function} fn @return {Function}",
        "examples": [
            {
                "input": "obj.curriedSum(1, 2, 3, 4)",
                "output": "60",
                "explanation": "Based on code execution"
            },
            {
                "input": "obj.curriedSum(1)(2, 3, 4)",
                "output": "60",
                "explanation": "Based on code execution"
            },
            {
                "input": "obj.curriedSum(1)(2, 3)(4)",
                "output": "60",
                "explanation": "Based on code execution"
            },
            {
                "input": "obj.curriedSum(1)(2)(3)(4)",
                "output": "60",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Currying\n// Converts a function to a set of functions with a single parameter\n\n/**\n * @param {Function} fn\n * @return {Function}\n */\nconst curry = (fn) => {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    }\n    return curried.bind(this, ...args);\n  };\n};\n\nconst obj = {\n  num: 50,\n  sum: function (a, b, c, d) {\n    return this.num + a + b + c + d;\n  }\n};\nobj.curriedSum = curry(obj.sum);\nconsole.log(obj.curriedSum(1, 2, 3, 4)); // 60\nconsole.log(obj.curriedSum(1)(2, 3, 4)); // 60\nconsole.log(obj.curriedSum(1)(2, 3)(4)); // 60\nconsole.log(obj.curriedSum(1)(2)(3)(4)); // 60\n",
        "starterCode": {
            "javascript": "// Currying\n// Arrays\n\n// Currying\n// Converts a function to a set of functions with a single parameter\n\n/**\n * @param {Function} fn\n * @return {Function}\n */\nconst curry = (fn) => {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    }\n    return curried.bind(this, ...args);\n  };\n};\n\nconst obj = {\n  num: 50,\n  sum: function (a, b, c, d) {\n    return this.num + a + b + c + d;\n  }\n};\nobj.curriedSum = curry(obj.sum);\nconsole.log(obj.curriedSum(1, 2, 3, 4)); // 60\nconsole.log(obj.curriedSum(1)(2, 3, 4)); // 60\nconsole.log(obj.curriedSum(1)(2, 3)(4)); // 60\nconsole.log(obj.curriedSum(1)(2)(3)(4)); // 60\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 72,
        "likes": 107
    },
    {
        "id": "5",
        "title": "Debounce",
        "slug": "debounce",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "@param {Function} fn @param {number} t milliseconds @return {Function}",
        "examples": [
            {
                "input": "'Case debounce:', str, Date.now(",
                "output": "See console output"
            },
            {
                "input": "'Case debounce immediate - false:', str, Date.now(",
                "output": "See console output"
            },
            {
                "input": "'Case debounce immediate - true:', str, Date.now(",
                "output": "See console output"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Given a function fn and a time in milliseconds t,\n// return a debounced version of that function.\n// A debounced function is a function whose execution is delayed by t milliseconds\n// and whose execution is cancelled if it is called again within that window of time.\n// The debounced function should also receive the passed parameters.\n// For example, let's say t = 50ms, and the function was called at 30ms, 60ms, and 100ms.\n// The first 2 function calls would be cancelled, and the 3rd function call\n// would be executed at 150ms. If instead t = 35ms, The 1st call would be cancelled,\n// the 2nd would be executed at 95ms, and the 3rd would be executed at 135ms.\n\n// In the debouncing technique, no matter how many times the user fires the event,\n// the attached function will be executed only after the specified time\n// once the user stops firing the event.\n\n/**\n * @param {Function} fn\n * @param {number} t milliseconds\n * @return {Function}\n */\nconst debounce = function (fn, t) {\n  let timer;\n  return (...args) => {\n    const context = this;\n    if (timer) {\n      clearTimeout(timer);\n      timer = undefined;\n    }\n    timer = setTimeout(() => {\n      fn.apply(context, args);\n    }, t);\n  };\n};\n\nconst debounceImmediate = function (fn, t, immediate = false) {\n  let timer;\n  return function (...args) {\n    const callNow = immediate && !timer;\n    const context = this;\n    if (timer) {\n      clearTimeout(timer);\n    }\n    timer = setTimeout(() => {\n      if (!immediate) {\n        fn.apply(context, args);\n        timer = undefined;\n      }\n    }, t);\n    if (callNow) {\n      fn.apply(context, args);\n    }\n  };\n};\n\nconst imitateCalls = function (fn) {\n  let i = 0;\n  fn(`Hello${++i}`);\n  const timer = setInterval(function () {\n    if (i >= 9) {\n      clearInterval(timer);\n    }\n    fn(`Hello${++i}`);\n  }, 100);\n};\n\nconst start = Date.now();\nimitateCalls(debounce((str) => {\n  console.log('Case debounce:', str, Date.now() - start);\n}, 300)); // Hello10 logged at t = ~1200ms\nimitateCalls(debounceImmediate((str) => {\n  console.log('Case debounce immediate - false:', str, Date.now() - start);\n}, 300)); // Hello10 logged at t = ~1200ms\nimitateCalls(debounceImmediate((str) => {\n  console.log('Case debounce immediate - true:', str, Date.now() - start);\n}, 300, true)); // Hello1 logged at t = ~0ms\n",
        "starterCode": {
            "javascript": "// Debounce\n// Arrays\n\n// Given a function fn and a time in milliseconds t,\n// return a debounced version of that function.\n// A debounced function is a function whose execution is delayed by t milliseconds\n// and whose execution is cancelled if it is called again within that window of time.\n// The debounced function should also receive the passed parameters.\n// For example, let's say t = 50ms, and the function was called at 30ms, 60ms, and 100ms.\n// The first 2 function calls would be cancelled, and the 3rd function call\n// would be executed at 150ms. If instead t = 35ms, The 1st call would be cancelled,\n// the 2nd would be executed at 95ms, and the 3rd would be executed at 135ms.\n\n// In the debouncing technique, no matter how many times the user fires the event,\n// the attached function will be executed only after the specified time\n// once the user stops firing the event.\n\n/**\n * @param {Function} fn\n * @param {number} t milliseconds\n * @return {Function}\n */\nconst debounce = function (fn, t) {\n  let timer;\n  return (...args) => {\n    const context = this;\n    if (timer) {\n      clearTimeout(timer);\n      timer = undefined;\n    }\n    timer = setTimeout(() => {\n      fn.apply(context, args);\n    }, t);\n  };\n};\n\nconst debounceImmediate = function (fn, t, immediate = false) {\n  let timer;\n  return function (...args) {\n    const callNow = immediate && !timer;\n    const context = this;\n    if (timer) {\n      clearTimeout(timer);\n    }\n    timer = setTimeout(() => {\n      if (!immediate) {\n        fn.apply(context, args);\n        timer = undefined;\n      }\n    }, t);\n    if (callNow) {\n      fn.apply(context, args);\n    }\n  };\n};\n\nconst imitateCalls = function (fn) {\n  let i = 0;\n  fn(`Hello${++i}`);\n  const timer = setInterval(function () {\n    if (i >= 9) {\n      clearInterval(timer);\n    }\n    fn(`Hello${++i}`);\n  }, 100);\n};\n\nconst start = Date.now();\nimitateCalls(debounce((str) => {\n  console.log('Case debounce:', str, Date.now() - start);\n}, 300)); // Hello10 logged at t = ~1200ms\nimitateCalls(debounceImmediate((str) => {\n  console.log('Case debounce immediate - false:', str, Date.now() - start);\n}, 300)); // Hello10 logged at t = ~1200ms\nimitateCalls(debounceImmediate((str) => {\n  console.log('Case debounce immediate - true:', str, Date.now() - start);\n}, 300, true)); // Hello1 logged at t = ~0ms\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 56,
        "likes": 902
    },
    {
        "id": "6",
        "title": "Double Single Click Handler",
        "slug": "double-single-click-handler",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "Handler to handle double and single clicks (for example, from the keyboard) in different ways",
        "examples": [
            {
                "input": "'Double click'",
                "output": "See console output"
            },
            {
                "input": "'Single click'",
                "output": "See console output"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Handler to handle double and single clicks\n// (for example, from the keyboard) in different ways\n\nconst onDoubleAndSingleClick = (onDoubleClick = () => {}, onSingleClick = () => {}) => {\n  let timeout;\n  return () => {\n    if (timeout) {\n      clearTimeout(timeout);\n      timeout = null;\n      onDoubleClick();\n      return;\n    }\n\n    timeout = setTimeout(() => {\n      timeout = null;\n      onSingleClick();\n    }, 500);\n  };\n};\n\nconst handler = onDoubleAndSingleClick(\n  () => console.log('Double click'),\n  () => console.log('Single click')\n);\n\n// Double click\nhandler();\nsetTimeout(handler, 50); // Double click\n\n// Two single clicks\nsetTimeout(handler, 600); // Single click\nsetTimeout(handler, 1200); // Single click\n",
        "starterCode": {
            "javascript": "// Double Single Click Handler\n// Arrays\n\n// Handler to handle double and single clicks\n// (for example, from the keyboard) in different ways\n\nconst onDoubleAndSingleClick = (onDoubleClick = () => {}, onSingleClick = () => {}) => {\n  let timeout;\n  return () => {\n    if (timeout) {\n      clearTimeout(timeout);\n      timeout = null;\n      onDoubleClick();\n      return;\n    }\n\n    timeout = setTimeout(() => {\n      timeout = null;\n      onSingleClick();\n    }, 500);\n  };\n};\n\nconst handler = onDoubleAndSingleClick(\n  () => console.log('Double click'),\n  () => console.log('Single click')\n);\n\n// Double click\nhandler();\nsetTimeout(handler, 50); // Double click\n\n// Two single clicks\nsetTimeout(handler, 600); // Single click\nsetTimeout(handler, 1200); // Single click\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 58,
        "likes": 225
    },
    {
        "id": "7",
        "title": "Event Emitter",
        "slug": "event-emitter",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "@param {string} eventName @param {Function} callback @return {Object}",
        "examples": [
            {
                "input": "emitter.emit('onClick')",
                "output": "[99]",
                "explanation": "Based on code execution"
            },
            {
                "input": "sub.unsubscribe()",
                "output": "undefined",
                "explanation": "Based on code execution"
            },
            {
                "input": "emitter.emit('onClick')",
                "output": "[]",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Design an EventEmitter class. This interface is similar (but with some differences)\n// to the one found in Node.js or the Event Target interface of the DOM.\n// The EventEmitter should allow for subscribing to events and emitting them.\n// Your EventEmitter class should have the following two methods:\n// 1. subscribe - This method takes in two arguments:\n// the name of an event as a string and a callback function.\n// This callback function will later be called when the event is emitted.\n// An event should be able to have multiple listeners for the same event.\n// When emitting an event with multiple callbacks,\n// each should be called in the order in which they were subscribed.\n// An array of results should be returned.\n// You can assume no callbacks passed to subscribe are referentially identical.\n// The subscribe method should also return an object with an unsubscribe method\n// that enables the user to unsubscribe. When it is called,\n// the callback should be removed from the list of subscriptions and undefined should be returned.\n// 2. emit - This method takes in two arguments:\n// the name of an event as a string and an optional array of arguments\n// that will be passed to the callback(s).\n// If there are no callbacks subscribed to the given event, return an empty array.\n// Otherwise, return an array of the results of all callback calls in the order they were subscribed.\n\nclass EventEmitter {\n  constructor() {\n    this.events = {};\n  }\n\n  /**\n   * @param {string} eventName\n   * @param {Function} callback\n   * @return {Object}\n   */\n  subscribe(eventName, callback) {\n    if (!this.events[eventName]) {\n      this.events[eventName] = [];\n    }\n    this.events[eventName].push(callback);\n    return {\n      unsubscribe: () => {\n        const cbIndex = this.events[eventName].indexOf(callback);\n        if (cbIndex !== -1) {\n          this.events[eventName].splice(cbIndex, 1);\n        }\n      }\n    };\n  }\n\n  /**\n   * @param {string} eventName\n   * @param {Array} args\n   * @return {Array}\n   */\n  emit(eventName, args = []) {\n    if (!this.events[eventName]) {\n      return [];\n    }\n    return this.events[eventName].map(cbItem => cbItem(...args));\n  }\n}\n\nconst emitter = new EventEmitter();\n\nfunction onClickCallback() {\n  return 99;\n}\nconst sub = emitter.subscribe('onClick', onClickCallback);\n\nconsole.log(emitter.emit('onClick')); // [99]\nconsole.log(sub.unsubscribe()); // undefined\nconsole.log(emitter.emit('onClick')); // []\n",
        "starterCode": {
            "javascript": "// Event Emitter\n// Arrays\n\n// Design an EventEmitter class. This interface is similar (but with some differences)\n// to the one found in Node.js or the Event Target interface of the DOM.\n// The EventEmitter should allow for subscribing to events and emitting them.\n// Your EventEmitter class should have the following two methods:\n// 1. subscribe - This method takes in two arguments:\n// the name of an event as a string and a callback function.\n// This callback function will later be called when the event is emitted.\n// An event should be able to have multiple listeners for the same event.\n// When emitting an event with multiple callbacks,\n// each should be called in the order in which they were subscribed.\n// An array of results should be returned.\n// You can assume no callbacks passed to subscribe are referentially identical.\n// The subscribe method should also return an object with an unsubscribe method\n// that enables the user to unsubscribe. When it is called,\n// the callback should be removed from the list of subscriptions and undefined should be returned.\n// 2. emit - This method takes in two arguments:\n// the name of an event as a string and an optional array of arguments\n// that will be passed to the callback(s).\n// If there are no callbacks subscribed to the given event, return an empty array.\n// Otherwise, return an array of the results of all callback calls in the order they were subscribed.\n\nclass EventEmitter {\n  constructor() {\n    this.events = {};\n  }\n\n  /**\n   * @param {string} eventName\n   * @param {Function} callback\n   * @return {Object}\n   */\n  subscribe(eventName, callback) {\n    if (!this.events[eventName]) {\n      this.events[eventName] = [];\n    }\n    this.events[eventName].push(callback);\n    return {\n      unsubscribe: () => {\n        const cbIndex = this.events[eventName].indexOf(callback);\n        if (cbIndex !== -1) {\n          this.events[eventName].splice(cbIndex, 1);\n        }\n      }\n    };\n  }\n\n  /**\n   * @param {string} eventName\n   * @param {Array} args\n   * @return {Array}\n   */\n  emit(eventName, args = []) {\n    if (!this.events[eventName]) {\n      return [];\n    }\n    return this.events[eventName].map(cbItem => cbItem(...args));\n  }\n}\n\nconst emitter = new EventEmitter();\n\nfunction onClickCallback() {\n  return 99;\n}\nconst sub = emitter.subscribe('onClick', onClickCallback);\n\nconsole.log(emitter.emit('onClick')); // [99]\nconsole.log(sub.unsubscribe()); // undefined\nconsole.log(emitter.emit('onClick')); // []\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 77,
        "likes": 392
    },
    {
        "id": "8",
        "title": "Function Composition",
        "slug": "function-composition",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "@param {...Function} functions @return {Function}",
        "examples": [
            {
                "input": "obj.composedFn(4, 3)",
                "output": "16",
                "explanation": "Based on code execution"
            },
            {
                "input": "obj.composedReduceFn(4, 3)",
                "output": "16",
                "explanation": "Based on code execution"
            },
            {
                "input": "obj.pipedFn(4, 3)",
                "output": "16",
                "explanation": "Based on code execution"
            },
            {
                "input": "obj.pipedReduceFn(4, 3)",
                "output": "16",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Function composition\n// Given functions f1, f2, f3, ..., fn, return a new function fn\n// that is the function composition of the array of functions.\n// compose (from right to left)\n// pipe (from left to right)\n\n/**\n * @param {...Function} functions\n * @return {Function}\n */\nconst compose = (...functions) => {\n  if (functions.length === 0) {\n    throw new Error('Requires at least one function');\n  }\n  return function (...args) {\n    let accResult = args;\n    for (let i = functions.length - 1; i >= 0; i--) {\n      accResult = [functions[i].call(this, ...accResult)];\n    }\n    return accResult[0];\n  };\n};\n\n/**\n * @param {...Function} functions\n * @return {Function}\n */\nconst composeUsingReduce = (...functions) => {\n  if (functions.length === 0) {\n    throw new Error('Requires at least one function');\n  }\n  return function (...args) {\n    return functions.reduceRight((accArg, fn, i) => {\n      return i === functions.length - 1 ? fn.call(this, ...accArg) : fn.call(this, accArg);\n    }, args);\n  };\n};\n\n/**\n * @param {...Function} functions\n * @return {Function}\n */\nconst pipe = (...functions) => {\n  if (functions.length === 0) {\n    throw new Error('Requires at least one function');\n  }\n  return function (...args) {\n    let accResult = args;\n    for (const fn of functions) {\n      accResult = [fn.call(this, ...accResult)];\n    }\n    return accResult[0];\n  };\n};\n\n/**\n * @param {...Function} functions\n * @return {Function}\n */\nconst pipeUsingReduce = (...functions) => {\n  if (functions.length === 0) {\n    throw new Error('Requires at least one function');\n  }\n  return function (...args) {\n    return functions.reduce((accArg, fn, i) => {\n      return i === 0 ? fn.call(this, ...accArg) : fn.call(this, accArg);\n    }, args);\n  };\n};\n\nconst obj = {\n  a: 5,\n  composedFn: compose(function (x) {\n    return x + this.a;\n  }, (x, y) => 2 * x + y),\n  composedReduceFn: composeUsingReduce(function (x) {\n    return x + this.a;\n  }, (x, y) => 2 * x + y),\n  pipedFn: pipe((x, y) => 2 * x + y, function (x) {\n    return x + this.a;\n  }),\n  pipedReduceFn: pipeUsingReduce((x, y) => 2 * x + y, function (x) {\n    return x + this.a;\n  })\n};\nconsole.log(obj.composedFn(4, 3)); // 16\nconsole.log(obj.composedReduceFn(4, 3)); // 16\nconsole.log(obj.pipedFn(4, 3)); // 16\nconsole.log(obj.pipedReduceFn(4, 3)); // 16\n",
        "starterCode": {
            "javascript": "// Function Composition\n// Arrays\n\n// Function composition\n// Given functions f1, f2, f3, ..., fn, return a new function fn\n// that is the function composition of the array of functions.\n// compose (from right to left)\n// pipe (from left to right)\n\n/**\n * @param {...Function} functions\n * @return {Function}\n */\nconst compose = (...functions) => {\n  if (functions.length === 0) {\n    throw new Error('Requires at least one function');\n  }\n  return function (...args) {\n    let accResult = args;\n    for (let i = functions.length - 1; i >= 0; i--) {\n      accResult = [functions[i].call(this, ...accResult)];\n    }\n    return accResult[0];\n  };\n};\n\n/**\n * @param {...Function} functions\n * @return {Function}\n */\nconst composeUsingReduce = (...functions) => {\n  if (functions.length === 0) {\n    throw new Error('Requires at least one function');\n  }\n  return function (...args) {\n    return functions.reduceRight((accArg, fn, i) => {\n      return i === functions.length - 1 ? fn.call(this, ...accArg) : fn.call(this, accArg);\n    }, args);\n  };\n};\n\n/**\n * @param {...Function} functions\n * @return {Function}\n */\nconst pipe = (...functions) => {\n  if (functions.length === 0) {\n    throw new Error('Requires at least one function');\n  }\n  return function (...args) {\n    let accResult = args;\n    for (const fn of functions) {\n      accResult = [fn.call(this, ...accResult)];\n    }\n    return accResult[0];\n  };\n};\n\n/**\n * @param {...Function} functions\n * @return {Function}\n */\nconst pipeUsingReduce = (...functions) => {\n  if (functions.length === 0) {\n    throw new Error('Requires at least one function');\n  }\n  return function (...args) {\n    return functions.reduce((accArg, fn, i) => {\n      return i === 0 ? fn.call(this, ...accArg) : fn.call(this, accArg);\n    }, args);\n  };\n};\n\nconst obj = {\n  a: 5,\n  composedFn: compose(function (x) {\n    return x + this.a;\n  }, (x, y) => 2 * x + y),\n  composedReduceFn: composeUsingReduce(function (x) {\n    return x + this.a;\n  }, (x, y) => 2 * x + y),\n  pipedFn: pipe((x, y) => 2 * x + y, function (x) {\n    return x + this.a;\n  }),\n  pipedReduceFn: pipeUsingReduce((x, y) => 2 * x + y, function (x) {\n    return x + this.a;\n  })\n};\nconsole.log(obj.composedFn(4, 3)); // 16\nconsole.log(obj.composedReduceFn(4, 3)); // 16\nconsole.log(obj.pipedFn(4, 3)); // 16\nconsole.log(obj.pipedReduceFn(4, 3)); // 16\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 53,
        "likes": 487
    },
    {
        "id": "9",
        "title": "Map",
        "slug": "map",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "@param {Array} arr @param {Function} fn @param {Object?} thisArg @return {Array}",
        "examples": [
            {
                "input": "map([1, 2, 3], num => num * 2)",
                "output": "[ 2, 4, 6 ]",
                "explanation": "Based on code execution"
            },
            {
                "input": "map([1, 2, 3], function(num) { return this.a + num; }, { a: 10 })",
                "output": "[ 11, 12, 13 ]",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Map implementation\n\n/**\n * @param {Array} arr\n * @param {Function} fn\n * @param {Object?} thisArg\n * @return {Array}\n */\nconst map = function (arr, fn, thisArg) {\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    if (Object.hasOwn(arr, i)) {\n      result[i] = fn.call(thisArg, arr[i], i, arr);\n    }\n  }\n  return result;\n};\n\nconsole.log(map([1, 2, 3], num => num * 2)); // [ 2, 4, 6 ]\nconsole.log(map([1, 2, 3], function(num) { return this.a + num; }, { a: 10 })); // [ 11, 12, 13 ]\n",
        "starterCode": {
            "javascript": "// Map\n// Arrays\n\n// Map implementation\n\n/**\n * @param {Array} arr\n * @param {Function} fn\n * @param {Object?} thisArg\n * @return {Array}\n */\nconst map = function (arr, fn, thisArg) {\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    if (Object.hasOwn(arr, i)) {\n      result[i] = fn.call(thisArg, arr[i], i, arr);\n    }\n  }\n  return result;\n};\n\nconsole.log(map([1, 2, 3], num => num * 2)); // [ 2, 4, 6 ]\nconsole.log(map([1, 2, 3], function(num) { return this.a + num; }, { a: 10 })); // [ 11, 12, 13 ]\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 80,
        "likes": 796
    },
    {
        "id": "10",
        "title": "Memoize",
        "slug": "memoize",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "@param {Function} fn @return {Function}",
        "examples": [
            {
                "input": "memoizedFn(1, 1, 1)",
                "output": "3",
                "explanation": "Based on code execution"
            },
            {
                "input": "memoizedFn(1, 1)",
                "output": "2",
                "explanation": "Based on code execution"
            },
            {
                "input": "memoizedFn(1)",
                "output": "1",
                "explanation": "Based on code execution"
            },
            {
                "input": "memoizedFn(1, 1)",
                "output": "2",
                "explanation": "Based on code execution"
            },
            {
                "input": "memoizedFn(1, 1, 1)",
                "output": "3",
                "explanation": "Based on code execution"
            },
            {
                "input": "callCount",
                "output": "3",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "on what type of values it accepts.",
            "Inputs are considered identical if they are === to each other."
        ],
        "hints": [],
        "solution": "// Given a function fn, return a memoized version of that function.\n// A memoized function is a function that will never be called twice with the same inputs.\n// Instead, it will return a cached value.\n// fn can be any function and there are no constraints on what type of values it accepts.\n// Inputs are considered identical if they are === to each other.\n\n/**\n * @param {Function} fn\n * @return {Function}\n */\nfunction memoize(fn) {\n  const cache = new Map();\n  const result = Symbol('result');\n  return function (...args) {\n    let currentCacheLevel = cache;\n    args.forEach(arg => {\n      if (!currentCacheLevel.has(arg)) {\n        currentCacheLevel.set(arg, new Map());\n      }\n      currentCacheLevel = currentCacheLevel.get(arg);\n    });\n    if (!currentCacheLevel.has(result)) {\n      currentCacheLevel.set(result, fn(...args));\n    }\n    return currentCacheLevel.get(result);\n  };\n}\n\nlet callCount = 0;\nconst memoizedFn = memoize(function (...arr) {\n  ++callCount;\n  return arr.reduce((a, b) => a + b, 0);\n});\nconsole.log(memoizedFn(1, 1, 1)); // 3\nconsole.log(memoizedFn(1, 1)); // 2\nconsole.log(memoizedFn(1)); // 1\nconsole.log(memoizedFn(1, 1)); // 2\nconsole.log(memoizedFn(1, 1, 1)); // 3\nconsole.log(callCount); // 3\n",
        "starterCode": {
            "javascript": "// Memoize\n// Arrays\n\n// Given a function fn, return a memoized version of that function.\n// A memoized function is a function that will never be called twice with the same inputs.\n// Instead, it will return a cached value.\n// fn can be any function and there are no constraints on what type of values it accepts.\n// Inputs are considered identical if they are === to each other.\n\n/**\n * @param {Function} fn\n * @return {Function}\n */\nfunction memoize(fn) {\n  const cache = new Map();\n  const result = Symbol('result');\n  return function (...args) {\n    let currentCacheLevel = cache;\n    args.forEach(arg => {\n      if (!currentCacheLevel.has(arg)) {\n        currentCacheLevel.set(arg, new Map());\n      }\n      currentCacheLevel = currentCacheLevel.get(arg);\n    });\n    if (!currentCacheLevel.has(result)) {\n      currentCacheLevel.set(result, fn(...args));\n    }\n    return currentCacheLevel.get(result);\n  };\n}\n\nlet callCount = 0;\nconst memoizedFn = memoize(function (...arr) {\n  ++callCount;\n  return arr.reduce((a, b) => a + b, 0);\n});\nconsole.log(memoizedFn(1, 1, 1)); // 3\nconsole.log(memoizedFn(1, 1)); // 2\nconsole.log(memoizedFn(1)); // 1\nconsole.log(memoizedFn(1, 1)); // 2\nconsole.log(memoizedFn(1, 1, 1)); // 3\nconsole.log(callCount); // 3\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 69,
        "likes": 518
    },
    {
        "id": "11",
        "title": "Memoize With Time Limit",
        "slug": "memoize-with-time-limit",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "@param {number} key @return {boolean} if un-expired key already existed",
        "examples": [
            {
                "input": "'timeLimitedCache:', timeLimitedCache.set(1, 42, 1000)",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "'timeLimitedCache:', timeLimitedCache.get(1)",
                "output": "42",
                "explanation": "Based on code execution"
            },
            {
                "input": "'timeLimitedCache:', timeLimitedCache.count()",
                "output": "1",
                "explanation": "Based on code execution"
            },
            {
                "input": "'timeLimitedCacheTimeout:', timeLimitedCacheTimeout.set(1, 42, 1000)",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "'timeLimitedCacheTimeout:', timeLimitedCacheTimeout.get(1)",
                "output": "42",
                "explanation": "Based on code execution"
            },
            {
                "input": "'timeLimitedCacheTimeout:', timeLimitedCacheTimeout.count()",
                "output": "1",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Write a class that allows getting and setting key-value pairs,\n// however a time until expiration is associated with each key.\n// The class has three public methods:\n// set(key, value, duration): accepts an integer key, an integer value, and a duration in milliseconds.\n// Once the duration has elapsed, the key should be inaccessible.\n// The method should return true if the same un-expired key already exists and false otherwise.\n// Both the value and duration should be overwritten if the key already exists.\n// get(key): if an un-expired key exists, it should return the associated value.\n// Otherwise, it should return -1.\n// count(): returns the count of un-expired keys.\n\nclass TimeLimitedCache {\n  constructor() {\n    this.cache = new Map();\n  }\n\n  /**\n   * @param {number} key\n   * @return {boolean} if un-expired key already existed\n   */\n  checkAndExpireCacheByKey(key) {\n    let keyExisted = this.cache.has(key);\n    if (keyExisted && Date.now() > this.cache.get(key).expired) {\n      this.cache.delete(key);\n      keyExisted = false;\n    }\n    return keyExisted;\n  }\n\n  checkAndExpireCache() {\n    for (const key of this.cache.keys()) {\n      this.checkAndExpireCacheByKey(key);\n    }\n  }\n\n  /**\n   * @param {number} key\n   * @param {number} value\n   * @param {number} duration time until expiration in ms\n   * @return {boolean} if un-expired key already existed\n   */\n  set(key, value, duration) {\n    const keyExisted = this.checkAndExpireCacheByKey(key);\n    this.cache.set(key, {\n      value,\n      expired: duration + Date.now()\n    });\n    return keyExisted;\n  };\n\n  /**\n   * @param {number} key\n   * @return {number} value associated with key\n   */\n  get(key) {\n    return this.checkAndExpireCacheByKey(key) ? this.cache.get(key).value : -1;\n  };\n\n  /**\n   * @return {number} count of non-expired keys\n   */\n  count() {\n    this.checkAndExpireCache();\n    return this.cache.size;\n  };\n}\n\nclass TimeLimitedCacheTimeout {\n  constructor() {\n    this.cache = new Map();\n  }\n\n  /**\n   * @param {number} key\n   * @param {number} value\n   * @param {number} duration time until expiration in ms\n   * @return {boolean} if un-expired key already existed\n   */\n  set(key, value, duration) {\n    const keyExisted = this.cache.has(key);\n    if (keyExisted) {\n      clearTimeout(this.cache.get(key).timer);\n    }\n    this.cache.set(key, {\n      value,\n      timer: setTimeout(() => this.cache.delete(key), duration)\n    });\n    return keyExisted;\n  };\n\n  /**\n   * @param {number} key\n   * @return {number} value associated with key\n   */\n  get(key) {\n    return this.cache.has(key) ? this.cache.get(key).value : -1;\n  };\n\n  /**\n   * @return {number} count of non-expired keys\n   */\n  count() {\n    return this.cache.size;\n  };\n}\n\nconst timeLimitedCache = new TimeLimitedCache();\nconsole.log('timeLimitedCache:', timeLimitedCache.set(1, 42, 1000)); // false\nconsole.log('timeLimitedCache:', timeLimitedCache.get(1)); // 42\nconsole.log('timeLimitedCache:', timeLimitedCache.count()); // 1\nsetTimeout(\n  () => console.log('timeLimitedCache after 1200 ms:', timeLimitedCache.count()),\n  1200\n); // 0\n\nconst timeLimitedCacheTimeout = new TimeLimitedCacheTimeout();\nconsole.log('timeLimitedCacheTimeout:', timeLimitedCacheTimeout.set(1, 42, 1000)); // false\nconsole.log('timeLimitedCacheTimeout:', timeLimitedCacheTimeout.get(1)); // 42\nconsole.log('timeLimitedCacheTimeout:', timeLimitedCacheTimeout.count()); // 1\nsetTimeout(\n  () => console.log('timeLimitedCacheTimeout after 1200 ms:', timeLimitedCacheTimeout.count()),\n  1200\n); // 0\n",
        "starterCode": {
            "javascript": "// Memoize With Time Limit\n// Arrays\n\n// Write a class that allows getting and setting key-value pairs,\n// however a time until expiration is associated with each key.\n// The class has three public methods:\n// set(key, value, duration): accepts an integer key, an integer value, and a duration in milliseconds.\n// Once the duration has elapsed, the key should be inaccessible.\n// The method should return true if the same un-expired key already exists and false otherwise.\n// Both the value and duration should be overwritten if the key already exists.\n// get(key): if an un-expired key exists, it should return the associated value.\n// Otherwise, it should return -1.\n// count(): returns the count of un-expired keys.\n\nclass TimeLimitedCache {\n  constructor() {\n    this.cache = new Map();\n  }\n\n  /**\n   * @param {number} key\n   * @return {boolean} if un-expired key already existed\n   */\n  checkAndExpireCacheByKey(key) {\n    let keyExisted = this.cache.has(key);\n    if (keyExisted && Date.now() > this.cache.get(key).expired) {\n      this.cache.delete(key);\n      keyExisted = false;\n    }\n    return keyExisted;\n  }\n\n  checkAndExpireCache() {\n    for (const key of this.cache.keys()) {\n      this.checkAndExpireCacheByKey(key);\n    }\n  }\n\n  /**\n   * @param {number} key\n   * @param {number} value\n   * @param {number} duration time until expiration in ms\n   * @return {boolean} if un-expired key already existed\n   */\n  set(key, value, duration) {\n    const keyExisted = this.checkAndExpireCacheByKey(key);\n    this.cache.set(key, {\n      value,\n      expired: duration + Date.now()\n    });\n    return keyExisted;\n  };\n\n  /**\n   * @param {number} key\n   * @return {number} value associated with key\n   */\n  get(key) {\n    return this.checkAndExpireCacheByKey(key) ? this.cache.get(key).value : -1;\n  };\n\n  /**\n   * @return {number} count of non-expired keys\n   */\n  count() {\n    this.checkAndExpireCache();\n    return this.cache.size;\n  };\n}\n\nclass TimeLimitedCacheTimeout {\n  constructor() {\n    this.cache = new Map();\n  }\n\n  /**\n   * @param {number} key\n   * @param {number} value\n   * @param {number} duration time until expiration in ms\n   * @return {boolean} if un-expired key already existed\n   */\n  set(key, value, duration) {\n    const keyExisted = this.cache.has(key);\n    if (keyExisted) {\n      clearTimeout(this.cache.get(key).timer);\n    }\n    this.cache.set(key, {\n      value,\n      timer: setTimeout(() => this.cache.delete(key), duration)\n    });\n    return keyExisted;\n  };\n\n  /**\n   * @param {number} key\n   * @return {number} value associated with key\n   */\n  get(key) {\n    return this.cache.has(key) ? this.cache.get(key).value : -1;\n  };\n\n  /**\n   * @return {number} count of non-expired keys\n   */\n  count() {\n    return this.cache.size;\n  };\n}\n\nconst timeLimitedCache = new TimeLimitedCache();\nconsole.log('timeLimitedCache:', timeLimitedCache.set(1, 42, 1000)); // false\nconsole.log('timeLimitedCache:', timeLimitedCache.get(1)); // 42\nconsole.log('timeLimitedCache:', timeLimitedCache.count()); // 1\nsetTimeout(\n  () => console.log('timeLimitedCache after 1200 ms:', timeLimitedCache.count()),\n  1200\n); // 0\n\nconst timeLimitedCacheTimeout = new TimeLimitedCacheTimeout();\nconsole.log('timeLimitedCacheTimeout:', timeLimitedCacheTimeout.set(1, 42, 1000)); // false\nconsole.log('timeLimitedCacheTimeout:', timeLimitedCacheTimeout.get(1)); // 42\nconsole.log('timeLimitedCacheTimeout:', timeLimitedCacheTimeout.count()); // 1\nsetTimeout(\n  () => console.log('timeLimitedCacheTimeout after 1200 ms:', timeLimitedCacheTimeout.count()),\n  1200\n); // 0\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 81,
        "likes": 862
    },
    {
        "id": "12",
        "title": "Partial",
        "slug": "partial",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "@param {Function} fn @param {...*} apply @return {Function}",
        "examples": [
            {
                "input": "obj.partialSum(1, 5)",
                "output": "70",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Partial\n// Converts a function into a single function with fewer parameters\n\n/**\n * @param {Function} fn\n * @param {...*} apply\n * @return {Function}\n */\nconst partial = (fn, ...apply) => {\n  return function (...args) {\n    return fn.call(this, ...apply, ...args);\n  };\n};\n\nconst obj = {\n  num: 50,\n  sum: function (a, b, c, d) {\n    return this.num + a + b + c + d;\n  }\n};\nobj.partialSum = partial(obj.sum, 10, 4);\nconsole.log(obj.partialSum(1, 5)); // 70\n",
        "starterCode": {
            "javascript": "// Partial\n// Arrays\n\n// Partial\n// Converts a function into a single function with fewer parameters\n\n/**\n * @param {Function} fn\n * @param {...*} apply\n * @return {Function}\n */\nconst partial = (fn, ...apply) => {\n  return function (...args) {\n    return fn.call(this, ...apply, ...args);\n  };\n};\n\nconst obj = {\n  num: 50,\n  sum: function (a, b, c, d) {\n    return this.num + a + b + c + d;\n  }\n};\nobj.partialSum = partial(obj.sum, 10, 4);\nconsole.log(obj.partialSum(1, 5)); // 70\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 71,
        "likes": 799
    },
    {
        "id": "13",
        "title": "Promise All",
        "slug": "promise-all",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "@param {Array<Function>} functions @return {Promise<any>}",
        "examples": [
            {
                "input": "err.message)",
                "output": "Error",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Promise.all implementation\n// Given an array of asynchronous functions, return a new promise.\n// Each function in the array accepts no arguments and returns a promise.\n// All the promises should be executed in parallel.\n// Promise resolves:\n// When all the promises returned from functions were resolved successfully in parallel.\n// The resolved value of promise should be an array of all the resolved values\n// of promises in the same order as they were in the functions.\n// The promise should resolve when all the asynchronous functions\n// in the array have completed execution in parallel.\n// Promise rejects:\n// When any of the promises returned from functions were rejected.\n// Promise should also reject with the reason of the first rejection.\n\n/**\n * @param {Array<Function>} functions\n * @return {Promise<any>}\n */\nconst promiseAll = function (functions) {\n  if (!functions.length) {\n    return Promise.resolve([]);\n  }\n  const results = [];\n  let resolvedPromisesCount = 0;\n  return new Promise((resolve, reject) => {\n    functions.forEach((fn, i) => {\n      fn().then(res => {\n        results[i] = res;\n        if (++resolvedPromisesCount === functions.length) {\n          resolve(results);\n        }\n      }).catch(reject);\n    });\n  });\n};\n\npromiseAll([() => new Promise(resolve => resolve(42))])\n  .then(console.log); // [42]\npromiseAll([\n  () => new Promise(resolve => setTimeout(() => resolve(1), 200)),\n  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error')), 100))\n]).catch(err => console.log(err.message)); // Error\npromiseAll([\n  () => new Promise(resolve => setTimeout(() => resolve(4), 50)),\n  () => new Promise(resolve => setTimeout(() => resolve(10), 150)),\n  () => new Promise(resolve => setTimeout(() => resolve(16), 100))\n]).then(console.log); // [4, 10, 16]\n",
        "starterCode": {
            "javascript": "// Promise All\n// Arrays\n\n// Promise.all implementation\n// Given an array of asynchronous functions, return a new promise.\n// Each function in the array accepts no arguments and returns a promise.\n// All the promises should be executed in parallel.\n// Promise resolves:\n// When all the promises returned from functions were resolved successfully in parallel.\n// The resolved value of promise should be an array of all the resolved values\n// of promises in the same order as they were in the functions.\n// The promise should resolve when all the asynchronous functions\n// in the array have completed execution in parallel.\n// Promise rejects:\n// When any of the promises returned from functions were rejected.\n// Promise should also reject with the reason of the first rejection.\n\n/**\n * @param {Array<Function>} functions\n * @return {Promise<any>}\n */\nconst promiseAll = function (functions) {\n  if (!functions.length) {\n    return Promise.resolve([]);\n  }\n  const results = [];\n  let resolvedPromisesCount = 0;\n  return new Promise((resolve, reject) => {\n    functions.forEach((fn, i) => {\n      fn().then(res => {\n        results[i] = res;\n        if (++resolvedPromisesCount === functions.length) {\n          resolve(results);\n        }\n      }).catch(reject);\n    });\n  });\n};\n\npromiseAll([() => new Promise(resolve => resolve(42))])\n  .then(console.log); // [42]\npromiseAll([\n  () => new Promise(resolve => setTimeout(() => resolve(1), 200)),\n  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error')), 100))\n]).catch(err => console.log(err.message)); // Error\npromiseAll([\n  () => new Promise(resolve => setTimeout(() => resolve(4), 50)),\n  () => new Promise(resolve => setTimeout(() => resolve(10), 150)),\n  () => new Promise(resolve => setTimeout(() => resolve(16), 100))\n]).then(console.log); // [4, 10, 16]\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 78,
        "likes": 553
    },
    {
        "id": "14",
        "title": "Promise All Settled",
        "slug": "promise-all-settled",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "@param {Array<Function>} functions @return {Promise<any>}",
        "examples": [
            {
                "input": "See code",
                "output": "See code"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Promise.allSettled implementation\n// Given an array of asynchronous functions, return a new promise.\n// Each function in the array accepts no arguments and returns a promise.\n// All the promises should be executed in parallel.\n// This promise fulfills when all the input's promises settle\n// with an array of objects that describe the outcome of each promise.\n\n/**\n * @param {Array<Function>} functions\n * @return {Promise<any>}\n */\nconst promiseAllSettled = function (functions) {\n  if (!functions.length) {\n    return Promise.resolve([]);\n  }\n  const results = [];\n  let resolvedPromisesCount = 0;\n  return new Promise((resolve) => {\n    functions.forEach((fn, i) => {\n      fn().then(res => {\n        results[i] = {\n          status: 'fulfilled',\n          value: res\n        };\n        if (++resolvedPromisesCount === functions.length) {\n          resolve(results);\n        }\n      }).catch(err => {\n        results[i] = {\n          status: 'rejected',\n          reason: err\n        };\n        if (++resolvedPromisesCount === functions.length) {\n          resolve(results);\n        }\n      });\n    });\n  });\n};\n\npromiseAllSettled([() => new Promise(resolve => resolve(42))])\n  .then(console.log);\n// [ { status: 'fulfilled', value: 42 } ]\n\npromiseAllSettled([\n  () => new Promise(resolve => setTimeout(() => resolve(1), 200)),\n  () => new Promise(resolve => setTimeout(() => resolve(2), 50)),\n  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error')), 40))\n]).then(console.log);\n// [\n//   { status: 'fulfilled', value: 1 },\n//   { status: 'fulfilled', value: 2 },\n//   {\n//     status: 'rejected',\n//     reason: Error: Error\n//   }\n// ]\n\npromiseAllSettled([\n  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error1')), 100)),\n  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error2')), 200))\n]).then(console.log);\n// [\n//   {\n//     status: 'rejected',\n//     reason: Error: Error1\n//   },\n//   {\n//     status: 'rejected',\n//     reason: Error: Error2\n//   }\n// ]\n",
        "starterCode": {
            "javascript": "// Promise All Settled\n// Arrays\n\n// Promise.allSettled implementation\n// Given an array of asynchronous functions, return a new promise.\n// Each function in the array accepts no arguments and returns a promise.\n// All the promises should be executed in parallel.\n// This promise fulfills when all the input's promises settle\n// with an array of objects that describe the outcome of each promise.\n\n/**\n * @param {Array<Function>} functions\n * @return {Promise<any>}\n */\nconst promiseAllSettled = function (functions) {\n  if (!functions.length) {\n    return Promise.resolve([]);\n  }\n  const results = [];\n  let resolvedPromisesCount = 0;\n  return new Promise((resolve) => {\n    functions.forEach((fn, i) => {\n      fn().then(res => {\n        results[i] = {\n          status: 'fulfilled',\n          value: res\n        };\n        if (++resolvedPromisesCount === functions.length) {\n          resolve(results);\n        }\n      }).catch(err => {\n        results[i] = {\n          status: 'rejected',\n          reason: err\n        };\n        if (++resolvedPromisesCount === functions.length) {\n          resolve(results);\n        }\n      });\n    });\n  });\n};\n\npromiseAllSettled([() => new Promise(resolve => resolve(42))])\n  .then(console.log);\n// [ { status: 'fulfilled', value: 42 } ]\n\npromiseAllSettled([\n  () => new Promise(resolve => setTimeout(() => resolve(1), 200)),\n  () => new Promise(resolve => setTimeout(() => resolve(2), 50)),\n  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error')), 40))\n]).then(console.log);\n// [\n//   { status: 'fulfilled', value: 1 },\n//   { status: 'fulfilled', value: 2 },\n//   {\n//     status: 'rejected',\n//     reason: Error: Error\n//   }\n// ]\n\npromiseAllSettled([\n  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error1')), 100)),\n  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error2')), 200))\n]).then(console.log);\n// [\n//   {\n//     status: 'rejected',\n//     reason: Error: Error1\n//   },\n//   {\n//     status: 'rejected',\n//     reason: Error: Error2\n//   }\n// ]\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 58,
        "likes": 96
    },
    {
        "id": "15",
        "title": "Promise Any",
        "slug": "promise-any",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "@param {Array<Function>} functions @return {Promise<any>}",
        "examples": [
            {
                "input": "err.message)",
                "output": "No Promise in promiseAny was resolved",
                "explanation": "Based on code execution"
            },
            {
                "input": "err.message)",
                "output": "2",
                "explanation": "Based on code execution"
            },
            {
                "input": "error.message))",
                "output": "Error1 Error2 Error3",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Promise.any implementation\n// Given an array of asynchronous functions, return a new promise.\n// Each function in the array accepts no arguments and returns a promise.\n// Any promise resolves with the value of the first promise to fulfill.\n// If no promise was resolved any promise rejects with AggregateError\n// containing an array of rejection reasons in its errors property.\n// Any promise rejects upon receiving an empty iterable\n\n/**\n * @param {Array<Function>} functions\n * @return {Promise<any>}\n */\nconst promiseAny = function (functions) {\n  if (!functions.length) {\n    return Promise.reject(new AggregateError([], 'No Promise in promiseAny was resolved'));\n  }\n  const rejects = [];\n  let rejectedPromisesCount = 0;\n  return new Promise((resolve, reject) => {\n    functions.forEach((fn, i) => {\n      fn()\n        .then(resolve)\n        .catch(error => {\n          rejects[i] = error;\n          if (++rejectedPromisesCount === functions.length) {\n            reject(new AggregateError(rejects, 'No Promise in promiseAny was resolved'));\n          }\n        });\n    });\n  });\n};\n\npromiseAny([])\n  .catch(err => console.log(err.message)); // No Promise in promiseAny was resolved\npromiseAny([() => new Promise(resolve => resolve(42))])\n  .then(console.log); // 42\npromiseAny([\n  () => new Promise(resolve => setTimeout(() => resolve(1), 200)),\n  () => new Promise(resolve => setTimeout(() => resolve(2), 50)),\n  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error')), 40))\n]).then(console.log).catch(err => console.log(err.message)); // 2\npromiseAny([\n  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error1')), 100)),\n  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error2')), 200)),\n  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error3')), 300))\n]).then(console.log).catch(errors => errors.errors.forEach(error => console.log(error.message))); // Error1 Error2 Error3\n",
        "starterCode": {
            "javascript": "// Promise Any\n// Arrays\n\n// Promise.any implementation\n// Given an array of asynchronous functions, return a new promise.\n// Each function in the array accepts no arguments and returns a promise.\n// Any promise resolves with the value of the first promise to fulfill.\n// If no promise was resolved any promise rejects with AggregateError\n// containing an array of rejection reasons in its errors property.\n// Any promise rejects upon receiving an empty iterable\n\n/**\n * @param {Array<Function>} functions\n * @return {Promise<any>}\n */\nconst promiseAny = function (functions) {\n  if (!functions.length) {\n    return Promise.reject(new AggregateError([], 'No Promise in promiseAny was resolved'));\n  }\n  const rejects = [];\n  let rejectedPromisesCount = 0;\n  return new Promise((resolve, reject) => {\n    functions.forEach((fn, i) => {\n      fn()\n        .then(resolve)\n        .catch(error => {\n          rejects[i] = error;\n          if (++rejectedPromisesCount === functions.length) {\n            reject(new AggregateError(rejects, 'No Promise in promiseAny was resolved'));\n          }\n        });\n    });\n  });\n};\n\npromiseAny([])\n  .catch(err => console.log(err.message)); // No Promise in promiseAny was resolved\npromiseAny([() => new Promise(resolve => resolve(42))])\n  .then(console.log); // 42\npromiseAny([\n  () => new Promise(resolve => setTimeout(() => resolve(1), 200)),\n  () => new Promise(resolve => setTimeout(() => resolve(2), 50)),\n  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error')), 40))\n]).then(console.log).catch(err => console.log(err.message)); // 2\npromiseAny([\n  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error1')), 100)),\n  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error2')), 200)),\n  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error3')), 300))\n]).then(console.log).catch(errors => errors.errors.forEach(error => console.log(error.message))); // Error1 Error2 Error3\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 74,
        "likes": 165
    },
    {
        "id": "16",
        "title": "Promise Race",
        "slug": "promise-race",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "@param {Array<Function>} functions @return {Promise<any>}",
        "examples": [
            {
                "input": "err.message)",
                "output": "Error",
                "explanation": "Based on code execution"
            },
            {
                "input": "err.message)",
                "output": "4",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Promise.race implementation\n// Given an array of asynchronous functions, return a new promise.\n// Each function in the array accepts no arguments and returns a promise.\n// Race promise resolves or rejects with the first promise to settle.\n\n/**\n * @param {Array<Function>} functions\n * @return {Promise<any>}\n */\nconst promiseRace = function (functions) {\n  if (!functions.length) {\n    return new Promise(() => {});\n  }\n  return new Promise((resolve, reject) => {\n    functions.forEach(fn => {\n      fn().then(result => resolve(result)).catch(reject);\n    });\n  });\n};\n\npromiseRace([() => new Promise(resolve => resolve(42))])\n  .then(console.log); // 42\npromiseRace([\n  () => new Promise(resolve => setTimeout(() => resolve(1), 200)),\n  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error')), 40))\n]).then(console.log).catch(err => console.log(err.message)); // Error\npromiseRace([\n  () => new Promise(resolve => setTimeout(() => resolve(4), 50)),\n  () => new Promise(resolve => setTimeout(() => resolve(10), 150)),\n  () => new Promise(resolve => setTimeout(() => resolve(16), 100)),\n  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error')), 70))\n]).then(console.log).catch(err => console.log(err.message)); // 4\n",
        "starterCode": {
            "javascript": "// Promise Race\n// Arrays\n\n// Promise.race implementation\n// Given an array of asynchronous functions, return a new promise.\n// Each function in the array accepts no arguments and returns a promise.\n// Race promise resolves or rejects with the first promise to settle.\n\n/**\n * @param {Array<Function>} functions\n * @return {Promise<any>}\n */\nconst promiseRace = function (functions) {\n  if (!functions.length) {\n    return new Promise(() => {});\n  }\n  return new Promise((resolve, reject) => {\n    functions.forEach(fn => {\n      fn().then(result => resolve(result)).catch(reject);\n    });\n  });\n};\n\npromiseRace([() => new Promise(resolve => resolve(42))])\n  .then(console.log); // 42\npromiseRace([\n  () => new Promise(resolve => setTimeout(() => resolve(1), 200)),\n  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error')), 40))\n]).then(console.log).catch(err => console.log(err.message)); // Error\npromiseRace([\n  () => new Promise(resolve => setTimeout(() => resolve(4), 50)),\n  () => new Promise(resolve => setTimeout(() => resolve(10), 150)),\n  () => new Promise(resolve => setTimeout(() => resolve(16), 100)),\n  () => new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error')), 70))\n]).then(console.log).catch(err => console.log(err.message)); // 4\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 88,
        "likes": 468
    },
    {
        "id": "17",
        "title": "Promise Time Limit",
        "slug": "promise-time-limit",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "@param {Function} fn @param {number} millis @return {Function}",
        "examples": [
            {
                "input": "See code",
                "output": "See code"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Given an asynchronous function fn and a time t in milliseconds,\n// return a new time limited version of the input function.\n// fn takes arguments provided to the time limited function.\n// The time limited function should follow these rules:\n// If the fn completes within the time limit of t milliseconds,\n// the time limited function should resolve with the result.\n// If the execution of the fn exceeds the time limit,\n// the time limited function should reject with the error Time Limit Exceeded.\n\n/**\n * @param {Function} fn\n * @param {number} millis\n * @return {Function}\n */\nconst timeLimit = function (fn, millis) {\n  return function (...args) {\n    return Promise.race([\n      fn(...args),\n      new Promise((resolve, reject) => {\n        setTimeout(() => reject(new Error('Time Limit Exceeded')), millis);\n      })\n    ]);\n  };\n};\n\ntimeLimit((t) => new Promise(resolve => setTimeout(() => resolve('value'), t)), 100)(50)\n  .then(console.log); // value at t = ~50ms\ntimeLimit((t) => new Promise(resolve => setTimeout(resolve, t)), 100)(150)\n  .catch(console.log); // Error: Time Limit Exceeded at t = ~100ms\n",
        "starterCode": {
            "javascript": "// Promise Time Limit\n// Arrays\n\n// Given an asynchronous function fn and a time t in milliseconds,\n// return a new time limited version of the input function.\n// fn takes arguments provided to the time limited function.\n// The time limited function should follow these rules:\n// If the fn completes within the time limit of t milliseconds,\n// the time limited function should resolve with the result.\n// If the execution of the fn exceeds the time limit,\n// the time limited function should reject with the error Time Limit Exceeded.\n\n/**\n * @param {Function} fn\n * @param {number} millis\n * @return {Function}\n */\nconst timeLimit = function (fn, millis) {\n  return function (...args) {\n    return Promise.race([\n      fn(...args),\n      new Promise((resolve, reject) => {\n        setTimeout(() => reject(new Error('Time Limit Exceeded')), millis);\n      })\n    ]);\n  };\n};\n\ntimeLimit((t) => new Promise(resolve => setTimeout(() => resolve('value'), t)), 100)(50)\n  .then(console.log); // value at t = ~50ms\ntimeLimit((t) => new Promise(resolve => setTimeout(resolve, t)), 100)(150)\n  .catch(console.log); // Error: Time Limit Exceeded at t = ~100ms\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 72,
        "likes": 898
    },
    {
        "id": "18",
        "title": "Promisify",
        "slug": "promisify",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "Promisify implementation Implement a promisify function that turns a function using the callback pattern into a function that returns a Promise",
        "examples": [
            {
                "input": "err.message)",
                "output": "Error",
                "explanation": "Based on code execution"
            },
            {
                "input": "err.message)",
                "output": "Error",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Promisify implementation\n// Implement a promisify function that turns a function\n// using the callback pattern into a function that returns a Promise\n\nconst promisify = (fn) => {\n  return function (...args) {\n    return new Promise((resolve, reject) => {\n      function cb(err, ...results) {\n        if (err) {\n          return reject(err);\n        }\n        return resolve(results.length === 1 ? results[0] : results);\n      }\n\n      args.push(cb);\n      fn.call(this, ...args);\n    });\n  };\n};\n\nconst obj = {\n  a: 100,\n  sumAsync: function (num1, num2, callback) {\n    if (!(num1 && num2)) {\n      return callback(new Error('Error'), null);\n    }\n    return callback(null, this.a + num1 + num2);\n  },\n  sumAsyncManyResults: function (num1, num2, callback) {\n    if (!(num1 && num2)) {\n      return callback(new Error('Error'), null);\n    }\n    return callback(null, this.a + num1 + num2, num1 + num2);\n  }\n};\n\nobj.promisifiedSumAsync = promisify(obj.sumAsync);\nobj.promisifiedSumAsync(5, 10).then(console.log); // 115\nobj.promisifiedSumAsync(5, null).catch(err => console.log(err.message)); // Error\n\nobj.promisifiedSumAsyncManyResults = promisify(obj.sumAsyncManyResults);\nobj.promisifiedSumAsyncManyResults(5, 10).then(console.log); // [ 115, 15 ]\nobj.promisifiedSumAsyncManyResults(5, null).catch(err => console.log(err.message)); // Error\n",
        "starterCode": {
            "javascript": "// Promisify\n// Arrays\n\n// Promisify implementation\n// Implement a promisify function that turns a function\n// using the callback pattern into a function that returns a Promise\n\nconst promisify = (fn) => {\n  return function (...args) {\n    return new Promise((resolve, reject) => {\n      function cb(err, ...results) {\n        if (err) {\n          return reject(err);\n        }\n        return resolve(results.length === 1 ? results[0] : results);\n      }\n\n      args.push(cb);\n      fn.call(this, ...args);\n    });\n  };\n};\n\nconst obj = {\n  a: 100,\n  sumAsync: function (num1, num2, callback) {\n    if (!(num1 && num2)) {\n      return callback(new Error('Error'), null);\n    }\n    return callback(null, this.a + num1 + num2);\n  },\n  sumAsyncManyResults: function (num1, num2, callback) {\n    if (!(num1 && num2)) {\n      return callback(new Error('Error'), null);\n    }\n    return callback(null, this.a + num1 + num2, num1 + num2);\n  }\n};\n\nobj.promisifiedSumAsync = promisify(obj.sumAsync);\nobj.promisifiedSumAsync(5, 10).then(console.log); // 115\nobj.promisifiedSumAsync(5, null).catch(err => console.log(err.message)); // Error\n\nobj.promisifiedSumAsyncManyResults = promisify(obj.sumAsyncManyResults);\nobj.promisifiedSumAsyncManyResults(5, 10).then(console.log); // [ 115, 15 ]\nobj.promisifiedSumAsyncManyResults(5, null).catch(err => console.log(err.message)); // Error\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 54,
        "likes": 295
    },
    {
        "id": "19",
        "title": "Reduce",
        "slug": "reduce",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "@param {Array} arr @param {Function} fn @param {*?} init @return {*}",
        "examples": [
            {
                "input": "reduce([1, 2, 3], (acc, item",
                "output": "See console output"
            },
            {
                "input": "reduce([1, 2, 3], (acc, item",
                "output": "See console output"
            },
            {
                "input": "recursiveReduce([1, 2, 3], (acc, item",
                "output": "See console output"
            },
            {
                "input": "reduceRight([1, 2, 3], (acc, item",
                "output": "See console output"
            },
            {
                "input": "reduceRight([1, 2, 3], (acc, item",
                "output": "See console output"
            },
            {
                "input": "recursiveReduceRight([1, 2, 3], (acc, item",
                "output": "See console output"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Reduce implementation\n// Reduce Right implementation\n\n/**\n * @param {Array} arr\n * @param {Function} fn\n * @param {*?} init\n * @return {*}\n */\nconst reduce = function(arr, fn, init) {\n  let result = init;\n  let i = 0;\n  if (init === undefined) {\n    if (!arr.length) {\n      throw TypeError('Reduce of empty array with no initial value');\n    }\n    i = 1;\n    result = arr[0];\n  }\n  for (; i < arr.length; i++) {\n    result = fn(result, arr[i], i, this);\n  }\n  return result;\n};\n\n// Simplified recursive version of reduce\n/**\n * @param {Array} arr\n * @param {Function} fn\n * @param {*} init\n * @return {*}\n */\nconst recursiveReduce = function(arr, fn, init) {\n  if (!arr.length) {\n    return init;\n  }\n  const [item, ...rest] = arr;\n  return recursiveReduce(rest, fn, fn(init, item));\n};\n\n/**\n * @param {Array} arr\n * @param {Function} fn\n * @param {*?} init\n * @return {*}\n */\nconst reduceRight = function(arr, fn, init) {\n  let result = init;\n  let i = arr.length - 1;\n  if (init === undefined) {\n    if (!arr.length) {\n      throw TypeError('Reduce of empty array with no initial value');\n    }\n    i = arr.length - 2;\n    result = arr[arr.length - 1];\n  }\n  for (; i >= 0; i--) {\n    result = fn(result, arr[i], i, this);\n  }\n  return result;\n};\n\n// Simplified recursive version of reduceRight\n/**\n * @param {Array} arr\n * @param {Function} fn\n * @param {*} init\n * @return {*}\n */\nconst recursiveReduceRight = function(arr, fn, init) {\n  if (!arr.length) {\n    return init;\n  }\n  const rest = [...arr];\n  const item = rest.pop();\n  return recursiveReduceRight(rest, fn, fn(init, item));\n};\n\nconsole.log(reduce([1, 2, 3], (acc, item) => {\n  acc[item] = item + 10;\n  return acc;\n}, {})); // { '1': 11, '2': 12, '3': 13 }\nconsole.log(reduce([1, 2, 3], (acc, item) => {\n  acc += item;\n  return acc;\n})); // 6\nconsole.log(recursiveReduce([1, 2, 3], (acc, item) => {\n  acc[item] = item + 10;\n  return acc;\n}, {})); // { '1': 11, '2': 12, '3': 13 }\nconsole.log(reduceRight([1, 2, 3], (acc, item) => {\n  acc.push(item + 10);\n  return acc;\n}, [])); // [ 13, 12, 11 ]\nconsole.log(reduceRight([1, 2, 3], (acc, item) => {\n  acc += item;\n  return acc;\n})); // 6\nconsole.log(recursiveReduceRight([1, 2, 3], (acc, item) => {\n  acc.push(item + 10);\n  return acc;\n}, [])); // [ 13, 12, 11 ]\n",
        "starterCode": {
            "javascript": "// Reduce\n// Arrays\n\n// Reduce implementation\n// Reduce Right implementation\n\n/**\n * @param {Array} arr\n * @param {Function} fn\n * @param {*?} init\n * @return {*}\n */\nconst reduce = function(arr, fn, init) {\n  let result = init;\n  let i = 0;\n  if (init === undefined) {\n    if (!arr.length) {\n      throw TypeError('Reduce of empty array with no initial value');\n    }\n    i = 1;\n    result = arr[0];\n  }\n  for (; i < arr.length; i++) {\n    result = fn(result, arr[i], i, this);\n  }\n  return result;\n};\n\n// Simplified recursive version of reduce\n/**\n * @param {Array} arr\n * @param {Function} fn\n * @param {*} init\n * @return {*}\n */\nconst recursiveReduce = function(arr, fn, init) {\n  if (!arr.length) {\n    return init;\n  }\n  const [item, ...rest] = arr;\n  return recursiveReduce(rest, fn, fn(init, item));\n};\n\n/**\n * @param {Array} arr\n * @param {Function} fn\n * @param {*?} init\n * @return {*}\n */\nconst reduceRight = function(arr, fn, init) {\n  let result = init;\n  let i = arr.length - 1;\n  if (init === undefined) {\n    if (!arr.length) {\n      throw TypeError('Reduce of empty array with no initial value');\n    }\n    i = arr.length - 2;\n    result = arr[arr.length - 1];\n  }\n  for (; i >= 0; i--) {\n    result = fn(result, arr[i], i, this);\n  }\n  return result;\n};\n\n// Simplified recursive version of reduceRight\n/**\n * @param {Array} arr\n * @param {Function} fn\n * @param {*} init\n * @return {*}\n */\nconst recursiveReduceRight = function(arr, fn, init) {\n  if (!arr.length) {\n    return init;\n  }\n  const rest = [...arr];\n  const item = rest.pop();\n  return recursiveReduceRight(rest, fn, fn(init, item));\n};\n\nconsole.log(reduce([1, 2, 3], (acc, item) => {\n  acc[item] = item + 10;\n  return acc;\n}, {})); // { '1': 11, '2': 12, '3': 13 }\nconsole.log(reduce([1, 2, 3], (acc, item) => {\n  acc += item;\n  return acc;\n})); // 6\nconsole.log(recursiveReduce([1, 2, 3], (acc, item) => {\n  acc[item] = item + 10;\n  return acc;\n}, {})); // { '1': 11, '2': 12, '3': 13 }\nconsole.log(reduceRight([1, 2, 3], (acc, item) => {\n  acc.push(item + 10);\n  return acc;\n}, [])); // [ 13, 12, 11 ]\nconsole.log(reduceRight([1, 2, 3], (acc, item) => {\n  acc += item;\n  return acc;\n})); // 6\nconsole.log(recursiveReduceRight([1, 2, 3], (acc, item) => {\n  acc.push(item + 10);\n  return acc;\n}, [])); // [ 13, 12, 11 ]\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 64,
        "likes": 702
    },
    {
        "id": "20",
        "title": "Sleep",
        "slug": "sleep",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "@param {number} millis @return {Promise}",
        "examples": [
            {
                "input": "Date.now() - start)",
                "output": "~100",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Given a positive integer millis,\n// write an asynchronous function that sleeps for millis milliseconds.\n// It can resolve any value.\n\n/**\n * @param {number} millis\n * @return {Promise}\n */\nasync function sleep(millis) {\n  return new Promise(resolve => {\n    setTimeout(resolve, millis);\n  });\n}\n\nconst start = Date.now();\nsleep(100).then(() => console.log(Date.now() - start)); // ~100\n",
        "starterCode": {
            "javascript": "// Sleep\n// Arrays\n\n// Given a positive integer millis,\n// write an asynchronous function that sleeps for millis milliseconds.\n// It can resolve any value.\n\n/**\n * @param {number} millis\n * @return {Promise}\n */\nasync function sleep(millis) {\n  return new Promise(resolve => {\n    setTimeout(resolve, millis);\n  });\n}\n\nconst start = Date.now();\nsleep(100).then(() => console.log(Date.now() - start)); // ~100\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 62,
        "likes": 559
    },
    {
        "id": "21",
        "title": "Throttle",
        "slug": "throttle",
        "difficulty": "Medium",
        "topics": [
            "Arrays"
        ],
        "description": "@param {Function} fn @param {number} t milliseconds @return {Function}",
        "examples": [
            {
                "input": "'Case throttle:', str, Date.now(",
                "output": "See console output"
            },
            {
                "input": "'Case throttle immediate - false:', str, Date.now(",
                "output": "See console output"
            },
            {
                "input": "'Case throttle immediate - true:', str, Date.now(",
                "output": "See console output"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Throttling is a technique in which,\n// no matter how many times the user fires the event,\n// the attached function will be executed only once in a given time interval.\n\n/**\n * @param {Function} fn\n * @param {number} t milliseconds\n * @return {Function}\n */\nconst throttle = function (fn, t) {\n  let timer;\n  return (...args) => {\n    const context = this;\n    if (timer) {\n      return;\n    }\n    timer = setTimeout(() => {\n      fn.apply(context, args);\n      timer = undefined;\n    }, t);\n  };\n};\n\nconst throttleImmediate = function (fn, t, immediate = false) {\n  let timer;\n  return (...args) => {\n    const context = this;\n    const callNow = immediate && !timer;\n    if (!timer) {\n      timer = setTimeout(() => {\n        if (!immediate) {\n          fn.apply(context, args);\n        }\n        timer = undefined;\n      }, t);\n    }\n    if (callNow) {\n      fn.apply(context, args);\n    }\n  };\n};\n\nconst imitateCalls = function (fn) {\n  let i = 0;\n  fn(`Hello${++i}`);\n  const timer = setInterval(function () {\n    if (i >= 9) {\n      clearInterval(timer);\n    }\n    fn(`Hello${++i}`);\n  }, 100);\n};\n\nconst start = Date.now();\nimitateCalls(throttle((str) => {\n  console.log('Case throttle:', str, Date.now() - start);\n}, 500)); // Hello1 logged at t = ~500ms, Hello6 logged at t = ~1000ms\nimitateCalls(throttleImmediate((str) => {\n  console.log('Case throttle immediate - false:', str, Date.now() - start);\n}, 500)); // Hello1 logged at t = ~500ms, Hello6 logged at t = ~1000ms\nimitateCalls(throttleImmediate((str) => {\n  console.log('Case throttle immediate - true:', str, Date.now() - start);\n}, 500, true)); // Hello1 logged at t = ~0ms, Hello6 logged at t = ~500ms\n",
        "starterCode": {
            "javascript": "// Throttle\n// Arrays\n\n// Throttling is a technique in which,\n// no matter how many times the user fires the event,\n// the attached function will be executed only once in a given time interval.\n\n/**\n * @param {Function} fn\n * @param {number} t milliseconds\n * @return {Function}\n */\nconst throttle = function (fn, t) {\n  let timer;\n  return (...args) => {\n    const context = this;\n    if (timer) {\n      return;\n    }\n    timer = setTimeout(() => {\n      fn.apply(context, args);\n      timer = undefined;\n    }, t);\n  };\n};\n\nconst throttleImmediate = function (fn, t, immediate = false) {\n  let timer;\n  return (...args) => {\n    const context = this;\n    const callNow = immediate && !timer;\n    if (!timer) {\n      timer = setTimeout(() => {\n        if (!immediate) {\n          fn.apply(context, args);\n        }\n        timer = undefined;\n      }, t);\n    }\n    if (callNow) {\n      fn.apply(context, args);\n    }\n  };\n};\n\nconst imitateCalls = function (fn) {\n  let i = 0;\n  fn(`Hello${++i}`);\n  const timer = setInterval(function () {\n    if (i >= 9) {\n      clearInterval(timer);\n    }\n    fn(`Hello${++i}`);\n  }, 100);\n};\n\nconst start = Date.now();\nimitateCalls(throttle((str) => {\n  console.log('Case throttle:', str, Date.now() - start);\n}, 500)); // Hello1 logged at t = ~500ms, Hello6 logged at t = ~1000ms\nimitateCalls(throttleImmediate((str) => {\n  console.log('Case throttle immediate - false:', str, Date.now() - start);\n}, 500)); // Hello1 logged at t = ~500ms, Hello6 logged at t = ~1000ms\nimitateCalls(throttleImmediate((str) => {\n  console.log('Case throttle immediate - true:', str, Date.now() - start);\n}, 500, true)); // Hello1 logged at t = ~0ms, Hello6 logged at t = ~500ms\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 64,
        "likes": 960
    },
    {
        "id": "22",
        "title": "Binary Number With Alternating Bits",
        "slug": "binary-number-with-alternating-bits",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given a positive integer, check whether it has alternating bits: namely, if two adjacent bits will always have different values.",
        "examples": [
            {
                "input": "hasAlternatingBits(10)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "hasAlternatingBits(341)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "hasAlternatingBits(478)",
                "output": "false",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "1 <= n <= 2 ^ 31 - 1"
        ],
        "hints": [],
        "solution": "// Given a positive integer, check whether it has alternating bits: namely,\n// if two adjacent bits will always have different values.\n\n// Constraints:\n// 1 <= n <= 2 ^ 31 - 1\n\nconst hasAlternatingBits = (n) => {\n  // If true (n has alternating bits), we must have all 1s\n  // For example - 10 has alternating bits:\n  // 10 =           1010\n  // n >> 1 =       0101\n  // n ^ (n >> 1) = 1111\n  n = n ^ (n >> 1);\n  // If all 1s, n + 1 will be a power of 2 and n & (n + 1) will be 0\n  // For our example - 10:\n  // n ^ (n >> 1) =     01111\n  // n ^ (n >> 1) + 1 = 10000\n  // n & (n + 1) =      00000\n  return !(n & (n + 1));\n};\n\nconsole.log(hasAlternatingBits(10)); // true\nconsole.log(hasAlternatingBits(341)); // true\nconsole.log(hasAlternatingBits(478)); // false\n",
        "starterCode": {
            "javascript": "// Binary Number With Alternating Bits\n// Bit Manipulation\n\n// Given a positive integer, check whether it has alternating bits: namely,\n// if two adjacent bits will always have different values.\n\n// Constraints:\n// 1 <= n <= 2 ^ 31 - 1\n\nconst hasAlternatingBits = (n) => {\n  // If true (n has alternating bits), we must have all 1s\n  // For example - 10 has alternating bits:\n  // 10 =           1010\n  // n >> 1 =       0101\n  // n ^ (n >> 1) = 1111\n  n = n ^ (n >> 1);\n  // If all 1s, n + 1 will be a power of 2 and n & (n + 1) will be 0\n  // For our example - 10:\n  // n ^ (n >> 1) =     01111\n  // n ^ (n >> 1) + 1 = 10000\n  // n & (n + 1) =      00000\n  return !(n & (n + 1));\n};\n\nconsole.log(hasAlternatingBits(10)); // true\nconsole.log(hasAlternatingBits(341)); // true\nconsole.log(hasAlternatingBits(478)); // false\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 81,
        "likes": 954
    },
    {
        "id": "23",
        "title": "Binary Watch",
        "slug": "binary-watch",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "A binary watch has 4 LEDs on the top which represent the hours (0-11), and the 6 LEDs on the bottom represent the minutes (0-59). Each LED represents a zero or one, with the least significant bit on the right. Given a non-negative integer n which represents the number of LEDs that are currently on, return all possible times the watch could represent.",
        "examples": [
            {
                "input": "readBinaryWatch(0)",
                "output": "[ '0:00' ]",
                "explanation": "Based on code execution"
            },
            {
                "input": "readBinaryWatch(1)",
                "output": "['0:01', '0:02', '0:04', '0:08', '0:16', '0:32', '1:00', '2:00', '4:00', '8:00']",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// A binary watch has 4 LEDs on the top which represent the hours (0-11),\n// and the 6 LEDs on the bottom represent the minutes (0-59).\n// Each LED represents a zero or one, with the least significant bit on the right.\n// Given a non-negative integer n which represents the number of LEDs\n// that are currently on, return all possible times the watch could represent.\n\n// Note:\n// 1. The order of output does not matter.\n// 2. The hour must not contain a leading zero, for example \"01:00\" is not valid,\n// it should be \"1:00\".\n// 3. The minute must be consisted of two digits and may contain a leading zero,\n// for example \"10:2\" is not valid, it should be \"10:02\".\n\n// hamming weight\nconst countBits = (n) => {\n  let count = 0;\n\n  while (n !== 0) {\n    n &= (n - 1);\n    count++;\n  }\n\n  return count;\n};\n\nconst readBinaryWatch = (num) => {\n  const possibleTimes = [];\n\n  // For each possible time we count the number of bits in it and\n  // compare this number with the number of LEDs that are currently on\n  for (let i = 0; i < 12; i++) {\n    for (let j = 0; j < 60; j++) {\n      if (countBits(i) + countBits(j) === num) {\n        possibleTimes.push(`${i}:` + `0${j}`.slice(-2));\n      }\n    }\n  }\n\n  return possibleTimes;\n};\n\nconsole.log(readBinaryWatch(0)); // [ '0:00' ]\nconsole.log(readBinaryWatch(1));\n// ['0:01', '0:02', '0:04', '0:08', '0:16', '0:32', '1:00', '2:00', '4:00', '8:00']\n",
        "starterCode": {
            "javascript": "// Binary Watch\n// Bit Manipulation\n\n// A binary watch has 4 LEDs on the top which represent the hours (0-11),\n// and the 6 LEDs on the bottom represent the minutes (0-59).\n// Each LED represents a zero or one, with the least significant bit on the right.\n// Given a non-negative integer n which represents the number of LEDs\n// that are currently on, return all possible times the watch could represent.\n\n// Note:\n// 1. The order of output does not matter.\n// 2. The hour must not contain a leading zero, for example \"01:00\" is not valid,\n// it should be \"1:00\".\n// 3. The minute must be consisted of two digits and may contain a leading zero,\n// for example \"10:2\" is not valid, it should be \"10:02\".\n\n// hamming weight\nconst countBits = (n) => {\n  let count = 0;\n\n  while (n !== 0) {\n    n &= (n - 1);\n    count++;\n  }\n\n  return count;\n};\n\nconst readBinaryWatch = (num) => {\n  const possibleTimes = [];\n\n  // For each possible time we count the number of bits in it and\n  // compare this number with the number of LEDs that are currently on\n  for (let i = 0; i < 12; i++) {\n    for (let j = 0; j < 60; j++) {\n      if (countBits(i) + countBits(j) === num) {\n        possibleTimes.push(`${i}:` + `0${j}`.slice(-2));\n      }\n    }\n  }\n\n  return possibleTimes;\n};\n\nconsole.log(readBinaryWatch(0)); // [ '0:00' ]\nconsole.log(readBinaryWatch(1));\n// ['0:01', '0:02', '0:04', '0:08', '0:16', '0:32', '1:00', '2:00', '4:00', '8:00']\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 74,
        "likes": 672
    },
    {
        "id": "24",
        "title": "Bitwise AND Of Numbers Range",
        "slug": "bitwise-AND-of-numbers-range",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
        "examples": [
            {
                "input": "rangeBitwiseAnd(100, 126)",
                "output": "96",
                "explanation": "Based on code execution"
            },
            {
                "input": "rangeBitwiseAnd(100, 128)",
                "output": "0",
                "explanation": "Based on code execution"
            },
            {
                "input": "rangeBitwiseAndBrianKernighan(100, 126)",
                "output": "96",
                "explanation": "Based on code execution"
            },
            {
                "input": "rangeBitwiseAndBrianKernighan(100, 128)",
                "output": "0",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "0 <= left <= right <= 2 ^ 31 - 1"
        ],
        "hints": [],
        "solution": "// Given two integers left and right that represent the range [left, right],\n// return the bitwise AND of all numbers in this range, inclusive.\n\n// Constraints:\n// 0 <= left <= right <= 2 ^ 31 - 1\n\nconst rangeBitwiseAnd = (left, right) => {\n  let count = 0;\n\n  // If we look at the binary representation of numbers, we can make three observations.\n  // First, a bit will be set in the result, if this bit is set in all numbers in the range\n  // For example: 100 101 110 111 --> result of & will be 100\n  // Second, the least significant bits change the way often than the most significant\n  // For example: 100 101 110 111 --> 1**\n  // Third, if the pattern of the most significant bits is matches in the right\n  // and left numbers, then it will also match in all the numbers in the range between them\n  // For example: 101000 101001 101010 101011 101100 --> 101***\n  // So we can get rid of the right bits in the left and right numbers\n  // until they become equal or the left number becomes 0\n  while (left && left !== right) {\n    left >>= 1;\n    right >>= 1;\n    count++;\n  }\n\n  // We put the common bits back in place\n  return left << count;\n};\n\nconsole.log(rangeBitwiseAnd(100, 126)); // 96\nconsole.log(rangeBitwiseAnd(100, 128)); // 0\n\n// Brian Kernighan's algorithm\nconst rangeBitwiseAndBrianKernighan = (left, right) => {\n  // All of the above observations can be applied here as well\n  // We can even add the fourth observation: & of the range of numbers will always\n  // produce a number less than or equal to the left (the smallest) number\n  // For example: 11001 11010 11011 11100 --> 11000 (less than 11001)\n  // So we get rid of the right bits of the right number until it becomes\n  // less than or equal to the left number\n  while (right > left) {\n    // n & (n - 1) flips the least significant bit to 0\n    right &= right - 1;\n  }\n\n  return right;\n};\n\nconsole.log(rangeBitwiseAndBrianKernighan(100, 126)); // 96\nconsole.log(rangeBitwiseAndBrianKernighan(100, 128)); // 0\n",
        "starterCode": {
            "javascript": "// Bitwise AND Of Numbers Range\n// Bit Manipulation\n\n// Given two integers left and right that represent the range [left, right],\n// return the bitwise AND of all numbers in this range, inclusive.\n\n// Constraints:\n// 0 <= left <= right <= 2 ^ 31 - 1\n\nconst rangeBitwiseAnd = (left, right) => {\n  let count = 0;\n\n  // If we look at the binary representation of numbers, we can make three observations.\n  // First, a bit will be set in the result, if this bit is set in all numbers in the range\n  // For example: 100 101 110 111 --> result of & will be 100\n  // Second, the least significant bits change the way often than the most significant\n  // For example: 100 101 110 111 --> 1**\n  // Third, if the pattern of the most significant bits is matches in the right\n  // and left numbers, then it will also match in all the numbers in the range between them\n  // For example: 101000 101001 101010 101011 101100 --> 101***\n  // So we can get rid of the right bits in the left and right numbers\n  // until they become equal or the left number becomes 0\n  while (left && left !== right) {\n    left >>= 1;\n    right >>= 1;\n    count++;\n  }\n\n  // We put the common bits back in place\n  return left << count;\n};\n\nconsole.log(rangeBitwiseAnd(100, 126)); // 96\nconsole.log(rangeBitwiseAnd(100, 128)); // 0\n\n// Brian Kernighan's algorithm\nconst rangeBitwiseAndBrianKernighan = (left, right) => {\n  // All of the above observations can be applied here as well\n  // We can even add the fourth observation: & of the range of numbers will always\n  // produce a number less than or equal to the left (the smallest) number\n  // For example: 11001 11010 11011 11100 --> 11000 (less than 11001)\n  // So we get rid of the right bits of the right number until it becomes\n  // less than or equal to the left number\n  while (right > left) {\n    // n & (n - 1) flips the least significant bit to 0\n    right &= right - 1;\n  }\n\n  return right;\n};\n\nconsole.log(rangeBitwiseAndBrianKernighan(100, 126)); // 96\nconsole.log(rangeBitwiseAndBrianKernighan(100, 128)); // 0\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 75,
        "likes": 903
    },
    {
        "id": "25",
        "title": "Bitwise ORs Of Subarrays",
        "slug": "bitwise-ORs-of-subarrays",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "We have an array arr of non-negative integers. For every (contiguous) subarray sub = [arr[i], arr[i + 1], ..., arr[j]] (with i <= j), we take the bitwise OR of all the elements in sub, obtaining a result arr[i] | arr[i + 1] | ... | arr[j]. Return the number of possible results. Results that occur more than once are only counted once in the final answer",
        "examples": [
            {
                "input": "subarrayBitwiseORs([1, 1, 2])",
                "output": "3",
                "explanation": "Based on code execution"
            },
            {
                "input": "subarrayBitwiseORs([1, 21, 4, 19, 65, 123, 75, 38, 90])",
                "output": "15",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "1 <= nums.length <= 5  10 ^ 4",
            "0 <= nums[i] <= 10 ^ 9"
        ],
        "hints": [],
        "solution": "// We have an array arr of non-negative integers.\n// For every (contiguous) subarray sub = [arr[i], arr[i + 1], ..., arr[j]]\n// (with i <= j), we take the bitwise OR of all the elements in sub,\n// obtaining a result arr[i] | arr[i + 1] | ... | arr[j].\n// Return the number of possible results. Results that occur\n// more than once are only counted once in the final answer\n\n// Constraints:\n// 1 <= nums.length <= 5 * 10 ^ 4\n// 0 <= nums[i] <= 10 ^ 9\n\n// The idea is: if we know the bitwise OR of the elements from i to i + 3\n// than we can find the bitwise OR of the elements from i to i + 4:\n// OR of arr[i, i + 3] | arr[i + 4]\n// So we can keep an in-between state while iterating over the array\n// For example [1, 1, 2]:\n// We take 1 --> add it to result set --> {1}\n//           --> add it to temp set --> {1}\n//           --> iterate over current set, that is empty\n//           --> set current set to temp set --> {1}\n// now: result set == {1}, current set == {1}\n// We take 1 --> add it to result set --> {1, 1} --> {1}\n//           --> add it to temp set --> {1}\n//           --> iterate over current set --> 1 | 1\n//           --> add 1 | 1 to temp set --> {1, 1} --> {1}\n//           --> add 1 | 1 to result set --> {1, 1} --> {1}\n//           --> set current set to temp set --> {1}\n// now: result set == {1}, current set == {1}\n// We take 2 --> add it to result set --> {1, 2}\n//           --> add it to temp set --> {2}\n//           --> iterate over current set --> 1 | 2\n//           --> add 1 | 2 to temp set --> {2, 3}\n//           --> add 1 | 2 to result set --> {1, 2, 3}\n//           --> set current set to temp set --> {2, 3}\n// now: result set == {1, 2, 3}, current set == {2, 3}\n// Number of the possible results == length of result set == 3\n// Complexity time - 30 * arr.length\n// Because of constraint 0 <= nums[i] <= 10 ^ 9\n// max length of current set, when all the bits == 1 will be 30\n// max integer in current set - 111111111111111111111111111111\nconst subarrayBitwiseORs = (arr) => {\n  // Here we keep the bitwise OR of all the subarrays\n  const subarrayORs = new Set();\n  // Here we keep the state of the bitwise OR of the subarrays\n  // after each iteration\n  let current = new Set();\n\n  // We iterate over every number in the array\n  for (const num of arr) {\n    // The number is also a subarray, and it's OR equals to the number itself\n    // So we add it to the result\n    subarrayORs.add(num);\n    // We start a temp set so that we can iterate over the current ORs\n    // and perform the next ORs operations with current number\n    // And again current number is a subarray with the OR equals to the number itself\n    const temp = new Set([num]);\n\n    // We iterate over each bitwise OR in current state\n    for (const item of current) {\n      // We perform an OR operation with current number\n      const or = num | item;\n      // We add the result to our collections\n      temp.add(or);\n      subarrayORs.add(or);\n    }\n\n    current = temp;\n  }\n\n  return subarrayORs.size;\n};\n\nconsole.log(subarrayBitwiseORs([1, 1, 2])); // 3\nconsole.log(subarrayBitwiseORs([1, 21, 4, 19, 65, 123, 75, 38, 90])); // 15\n",
        "starterCode": {
            "javascript": "// Bitwise ORs Of Subarrays\n// Bit Manipulation\n\n// We have an array arr of non-negative integers.\n// For every (contiguous) subarray sub = [arr[i], arr[i + 1], ..., arr[j]]\n// (with i <= j), we take the bitwise OR of all the elements in sub,\n// obtaining a result arr[i] | arr[i + 1] | ... | arr[j].\n// Return the number of possible results. Results that occur\n// more than once are only counted once in the final answer\n\n// Constraints:\n// 1 <= nums.length <= 5 * 10 ^ 4\n// 0 <= nums[i] <= 10 ^ 9\n\n// The idea is: if we know the bitwise OR of the elements from i to i + 3\n// than we can find the bitwise OR of the elements from i to i + 4:\n// OR of arr[i, i + 3] | arr[i + 4]\n// So we can keep an in-between state while iterating over the array\n// For example [1, 1, 2]:\n// We take 1 --> add it to result set --> {1}\n//           --> add it to temp set --> {1}\n//           --> iterate over current set, that is empty\n//           --> set current set to temp set --> {1}\n// now: result set == {1}, current set == {1}\n// We take 1 --> add it to result set --> {1, 1} --> {1}\n//           --> add it to temp set --> {1}\n//           --> iterate over current set --> 1 | 1\n//           --> add 1 | 1 to temp set --> {1, 1} --> {1}\n//           --> add 1 | 1 to result set --> {1, 1} --> {1}\n//           --> set current set to temp set --> {1}\n// now: result set == {1}, current set == {1}\n// We take 2 --> add it to result set --> {1, 2}\n//           --> add it to temp set --> {2}\n//           --> iterate over current set --> 1 | 2\n//           --> add 1 | 2 to temp set --> {2, 3}\n//           --> add 1 | 2 to result set --> {1, 2, 3}\n//           --> set current set to temp set --> {2, 3}\n// now: result set == {1, 2, 3}, current set == {2, 3}\n// Number of the possible results == length of result set == 3\n// Complexity time - 30 * arr.length\n// Because of constraint 0 <= nums[i] <= 10 ^ 9\n// max length of current set, when all the bits == 1 will be 30\n// max integer in current set - 111111111111111111111111111111\nconst subarrayBitwiseORs = (arr) => {\n  // Here we keep the bitwise OR of all the subarrays\n  const subarrayORs = new Set();\n  // Here we keep the state of the bitwise OR of the subarrays\n  // after each iteration\n  let current = new Set();\n\n  // We iterate over every number in the array\n  for (const num of arr) {\n    // The number is also a subarray, and it's OR equals to the number itself\n    // So we add it to the result\n    subarrayORs.add(num);\n    // We start a temp set so that we can iterate over the current ORs\n    // and perform the next ORs operations with current number\n    // And again current number is a subarray with the OR equals to the number itself\n    const temp = new Set([num]);\n\n    // We iterate over each bitwise OR in current state\n    for (const item of current) {\n      // We perform an OR operation with current number\n      const or = num | item;\n      // We add the result to our collections\n      temp.add(or);\n      subarrayORs.add(or);\n    }\n\n    current = temp;\n  }\n\n  return subarrayORs.size;\n};\n\nconsole.log(subarrayBitwiseORs([1, 1, 2])); // 3\nconsole.log(subarrayBitwiseORs([1, 21, 4, 19, 65, 123, 75, 38, 90])); // 15\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 71,
        "likes": 621
    },
    {
        "id": "26",
        "title": "Check If A String Contains All Binary Codes Of Size K",
        "slug": "check-if-a-string-contains-all-binary-codes-of-size-k",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given a binary string s and an integer k. Return true if every binary code of length k is a substring of s. Otherwise, return false.",
        "examples": [
            {
                "input": "hasAllCodes('00110110', 2)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "hasAllCodes('0000000001011100', 4)",
                "output": "false",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "1 <= s.length <= 5  10 ^ 5",
            "s[i] is either '0' or '1'",
            "1 <= k <= 20"
        ],
        "hints": [],
        "solution": "// Given a binary string s and an integer k.\n// Return true if every binary code of length k is a substring of s.\n// Otherwise, return false.\n\n// Constraints:\n// 1 <= s.length <= 5 * 10 ^ 5\n// s[i] is either '0' or '1'\n// 1 <= k <= 20\n\n// For example, s == '00110110', k == 2\n// number of combinations will be 4\n// our mask will be 11\n// Iterations:\n// 1 --> 0 --> i + 1 >= 2 - false --> we don't add the substring to the collection\n// 2 --> 00 (0) --> i + 1 >= 2 - true --> {0}\n// 3 --> 01 (1) --> true --> {0, 1}\n// 4 --> 11 (3) --> true --> {0, 1, 3}\n// 5 --> 10 (2) --> true --> {0, 1, 3, 2} -->\n// --> the length of our collection == number of combinations == 4 --> return true\nconst hasAllCodes = (s, k) => {\n  // The number of all possible combinations is 2 ** k\n  const numberOfCombinations = 1 << k;\n  // The bitmask is all ones\n  // For example, for k == 3, the bitmask will be 111\n  const mask = numberOfCombinations - 1;\n  // Here we store the binary substrings as numbers\n  const substrings = new Set();\n  // Our current substring as a number\n  let hash = 0;\n\n  for (let i = 0; i < s.length; i++) {\n    // We construct a new substring by removing the first\n    // character and by adding the current character\n    // As we treat substrings as binary numbers\n    // we can apply bitwise operations to them\n    // The bitmask (mask) gives us the ability to control\n    // the length of the substring\n    hash = ((hash << 1) & mask) | s[i];\n    // We start constructing substrings from the first\n    // character (i == 0), so we need to make k iterations\n    // before we get a substring of the wanted length\n    if (i + 1 >= k) substrings.add(hash);\n    // If the length of our substring collection reaches the number\n    // of possible combinations, we return true\n    if (substrings.size === numberOfCombinations) return true;\n  }\n\n  // Otherwise, we return false\n  return false;\n};\n\nconsole.log(hasAllCodes('00110110', 2)); // true\nconsole.log(hasAllCodes('0000000001011100', 4)); // false\n",
        "starterCode": {
            "javascript": "// Check If A String Contains All Binary Codes Of Size K\n// Bit Manipulation\n\n// Given a binary string s and an integer k.\n// Return true if every binary code of length k is a substring of s.\n// Otherwise, return false.\n\n// Constraints:\n// 1 <= s.length <= 5 * 10 ^ 5\n// s[i] is either '0' or '1'\n// 1 <= k <= 20\n\n// For example, s == '00110110', k == 2\n// number of combinations will be 4\n// our mask will be 11\n// Iterations:\n// 1 --> 0 --> i + 1 >= 2 - false --> we don't add the substring to the collection\n// 2 --> 00 (0) --> i + 1 >= 2 - true --> {0}\n// 3 --> 01 (1) --> true --> {0, 1}\n// 4 --> 11 (3) --> true --> {0, 1, 3}\n// 5 --> 10 (2) --> true --> {0, 1, 3, 2} -->\n// --> the length of our collection == number of combinations == 4 --> return true\nconst hasAllCodes = (s, k) => {\n  // The number of all possible combinations is 2 ** k\n  const numberOfCombinations = 1 << k;\n  // The bitmask is all ones\n  // For example, for k == 3, the bitmask will be 111\n  const mask = numberOfCombinations - 1;\n  // Here we store the binary substrings as numbers\n  const substrings = new Set();\n  // Our current substring as a number\n  let hash = 0;\n\n  for (let i = 0; i < s.length; i++) {\n    // We construct a new substring by removing the first\n    // character and by adding the current character\n    // As we treat substrings as binary numbers\n    // we can apply bitwise operations to them\n    // The bitmask (mask) gives us the ability to control\n    // the length of the substring\n    hash = ((hash << 1) & mask) | s[i];\n    // We start constructing substrings from the first\n    // character (i == 0), so we need to make k iterations\n    // before we get a substring of the wanted length\n    if (i + 1 >= k) substrings.add(hash);\n    // If the length of our substring collection reaches the number\n    // of possible combinations, we return true\n    if (substrings.size === numberOfCombinations) return true;\n  }\n\n  // Otherwise, we return false\n  return false;\n};\n\nconsole.log(hasAllCodes('00110110', 2)); // true\nconsole.log(hasAllCodes('0000000001011100', 4)); // false\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 81,
        "likes": 898
    },
    {
        "id": "27",
        "title": "Convert A Number To Hexadecimal",
        "slug": "convert-a-number-to-hexadecimal",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given an integer, write an algorithm to convert it to hexadecimal. For negative integer, two’s complement method is used.",
        "examples": [
            {
                "input": "toHex(-9)",
                "output": "fffffff7",
                "explanation": "Based on code execution"
            },
            {
                "input": "toHex(26)",
                "output": "1a",
                "explanation": "Based on code execution"
            },
            {
                "input": "toHex(0)",
                "output": "0",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Given an integer, write an algorithm to convert it to hexadecimal.\n// For negative integer, two’s complement method is used.\n\n// Note:\n// 1. All letters in hexadecimal (a-f) must be in lowercase.\n// 2. The hexadecimal string must not contain extra leading 0s.\n// If the number is zero, it is represented by a single zero character '0';\n// otherwise, the first character in the hexadecimal string will not be the zero character.\n// 3. The given number is guaranteed to fit within the range of a 32-bit signed integer.\n// 4. You must not use any method provided by the library\n// which converts/formats the number to hex directly.\n\nconst toHex = (num) => {\n  const hexChars = '0123456789abcdef';\n  let hex = '';\n\n  while (num) {\n    // Every 4 bits is a hex character\n    // Every loop we take the last 4 bits and convert them to a hex character\n    // 15 - 00000000000000000000000000001111\n    // bits will be a number from 0 to 15 - the index of hex character in hexChars\n    const bits = num & 15;\n    hex = hexChars[bits] + hex;\n    // If we use >> (right shift) instead of >>> (unsigned right shift)\n    // we must also change the while condition - add an additional check for hex.length < 8\n    // in order not to get an infinite loop with negative numbers.\n    // JavaScript uses two’s complement to represent negative numbers\n    // (https://www.youtube.com/watch?v=4qH4unVtJkE).\n    // In two’s complement, the first bit on the left represents the sign,\n    // 0 is a positive number, 1 is a negative number.\n    // In case of >>, the original most significant bit will fill in the empty bit,\n    // and so the sign after bit shift will be preserved.\n    // -9 - 11111111111111111111111111110111\n    // -9 >> 4 --> 11111111111111111111111111111111 --> we get an infinite loop\n    // >>> ignores the sign and fill all the left empty positions with zero.\n    // -9 >>> 4 --> 00001111111111111111111111111111 --> we get 0 in the end\n    // So with >> the while condition looks like: while (num && hex.length < 8)\n    num = num >>> 4;\n  }\n\n  return hex || '0';\n};\n\nconsole.log(toHex(-9)); // fffffff7\nconsole.log(toHex(26)); // 1a\nconsole.log(toHex(0)); // 0\n",
        "starterCode": {
            "javascript": "// Convert A Number To Hexadecimal\n// Bit Manipulation\n\n// Given an integer, write an algorithm to convert it to hexadecimal.\n// For negative integer, two’s complement method is used.\n\n// Note:\n// 1. All letters in hexadecimal (a-f) must be in lowercase.\n// 2. The hexadecimal string must not contain extra leading 0s.\n// If the number is zero, it is represented by a single zero character '0';\n// otherwise, the first character in the hexadecimal string will not be the zero character.\n// 3. The given number is guaranteed to fit within the range of a 32-bit signed integer.\n// 4. You must not use any method provided by the library\n// which converts/formats the number to hex directly.\n\nconst toHex = (num) => {\n  const hexChars = '0123456789abcdef';\n  let hex = '';\n\n  while (num) {\n    // Every 4 bits is a hex character\n    // Every loop we take the last 4 bits and convert them to a hex character\n    // 15 - 00000000000000000000000000001111\n    // bits will be a number from 0 to 15 - the index of hex character in hexChars\n    const bits = num & 15;\n    hex = hexChars[bits] + hex;\n    // If we use >> (right shift) instead of >>> (unsigned right shift)\n    // we must also change the while condition - add an additional check for hex.length < 8\n    // in order not to get an infinite loop with negative numbers.\n    // JavaScript uses two’s complement to represent negative numbers\n    // (https://www.youtube.com/watch?v=4qH4unVtJkE).\n    // In two’s complement, the first bit on the left represents the sign,\n    // 0 is a positive number, 1 is a negative number.\n    // In case of >>, the original most significant bit will fill in the empty bit,\n    // and so the sign after bit shift will be preserved.\n    // -9 - 11111111111111111111111111110111\n    // -9 >> 4 --> 11111111111111111111111111111111 --> we get an infinite loop\n    // >>> ignores the sign and fill all the left empty positions with zero.\n    // -9 >>> 4 --> 00001111111111111111111111111111 --> we get 0 in the end\n    // So with >> the while condition looks like: while (num && hex.length < 8)\n    num = num >>> 4;\n  }\n\n  return hex || '0';\n};\n\nconsole.log(toHex(-9)); // fffffff7\nconsole.log(toHex(26)); // 1a\nconsole.log(toHex(0)); // 0\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 61,
        "likes": 425
    },
    {
        "id": "28",
        "title": "Convert Binary Number In A Linked List To Integer",
        "slug": "convert-binary-number-in-a-linked-list-to-integer",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given head which is a reference node to a singly-linked list. The value of each node in the linked list is either 0 or 1. The linked list holds the binary representation of a number. Return the decimal value of the number in the linked list.",
        "examples": [
            {
                "input": "getDecimalValue(getList([1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0]))",
                "output": "18880",
                "explanation": "Based on code execution"
            },
            {
                "input": "getDecimalValue(getList([0, 0]))",
                "output": "0",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "The Linked List is not empty.",
            "Number of nodes will not exceed 30.",
            "Each node's value is either 0 or 1."
        ],
        "hints": [],
        "solution": "// Given head which is a reference node to a singly-linked list.\n// The value of each node in the linked list is either 0 or 1.\n// The linked list holds the binary representation of a number.\n// Return the decimal value of the number in the linked list.\n\n// Constraints:\n// The Linked List is not empty.\n// Number of nodes will not exceed 30.\n// Each node's value is either 0 or 1.\n\nfunction ListNode(val, next) {\n  this.val = (val === undefined ? 0 : val);\n  this.next = (next === undefined ? null : next);\n}\n\nconst getList = (arr) => {\n  if (!arr.length) throw new Error('Array is empty.');\n\n  const head = new ListNode(arr[0]);\n  let prevNode = head;\n\n  for (let i = 1; i < arr.length; i++) {\n    prevNode.next = new ListNode(arr[i]);\n    prevNode = prevNode.next;\n  }\n\n  return head;\n};\n\nconst getDecimalValue = (head) => {\n  if (!head) return;\n\n  let num = 0;\n  let current = head;\n\n  while (current) {\n    // We start from the most significant bit\n    // So we must shift our number by one every time\n    num <<= 1;\n    // Add current value\n    // as an option: num |= current.val\n    num += current.val;\n    current = current.next;\n  }\n\n  return num;\n};\n\nconsole.log(getDecimalValue(getList([1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0]))); // 18880\nconsole.log(getDecimalValue(getList([0, 0]))); // 0\n",
        "starterCode": {
            "javascript": "// Convert Binary Number In A Linked List To Integer\n// Bit Manipulation\n\n// Given head which is a reference node to a singly-linked list.\n// The value of each node in the linked list is either 0 or 1.\n// The linked list holds the binary representation of a number.\n// Return the decimal value of the number in the linked list.\n\n// Constraints:\n// The Linked List is not empty.\n// Number of nodes will not exceed 30.\n// Each node's value is either 0 or 1.\n\nfunction ListNode(val, next) {\n  this.val = (val === undefined ? 0 : val);\n  this.next = (next === undefined ? null : next);\n}\n\nconst getList = (arr) => {\n  if (!arr.length) throw new Error('Array is empty.');\n\n  const head = new ListNode(arr[0]);\n  let prevNode = head;\n\n  for (let i = 1; i < arr.length; i++) {\n    prevNode.next = new ListNode(arr[i]);\n    prevNode = prevNode.next;\n  }\n\n  return head;\n};\n\nconst getDecimalValue = (head) => {\n  if (!head) return;\n\n  let num = 0;\n  let current = head;\n\n  while (current) {\n    // We start from the most significant bit\n    // So we must shift our number by one every time\n    num <<= 1;\n    // Add current value\n    // as an option: num |= current.val\n    num += current.val;\n    current = current.next;\n  }\n\n  return num;\n};\n\nconsole.log(getDecimalValue(getList([1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0]))); // 18880\nconsole.log(getDecimalValue(getList([0, 0]))); // 0\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 55,
        "likes": 899
    },
    {
        "id": "29",
        "title": "Counting Bits",
        "slug": "counting-bits",
        "difficulty": "Easy",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given an integer num, return an array of the number of 1's in the binary representation of every number in the range [0, num]. It is very easy to come up with a solution with run time O(32n). Can you do it in linear time O(n) and possibly in a single pass? Can you do it without using any built-in function?",
        "examples": [
            {
                "input": "countBits(5)",
                "output": "[0, 1, 1, 2, 1, 2]",
                "explanation": "Based on code execution"
            },
            {
                "input": "countBits(15)",
                "output": "[0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4]",
                "explanation": "Based on code execution"
            },
            {
                "input": "countBitsFlipLastBit(5)",
                "output": "[0, 1, 1, 2, 1, 2]",
                "explanation": "Based on code execution"
            },
            {
                "input": "countBitsFlipLastBit(15)",
                "output": "[0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "0 <= num <= 10 ^ 5"
        ],
        "hints": [],
        "solution": "// Given an integer num, return an array of the number of 1's\n// in the binary representation of every number in the range [0, num].\n// It is very easy to come up with a solution with run time O(32n).\n// Can you do it in linear time O(n) and possibly in a single pass?\n// Could you solve it in O(n) space complexity?\n// Can you do it without using any built-in function?\n\n// Constraints:\n// 0 <= num <= 10 ^ 5\n\nconst countBits = (num) => {\n  // We start from 0\n  // 0 has no bits set to 1\n  const bits = [0];\n\n  // We iterate over every number in the array\n  for (let i = 1; i <= num; i++) {\n    // We cut off the last bit of the current number (i >> 1)\n    // The number we got as a result will be less than the current number\n    // and we already counted it's bits\n    // So we take the number of it's bits from the resulting array and\n    // add 1 if the last bit of the current number is set to 1 or 0 if not (i & 1)\n    // Let's take number 1001010111 - 599, it has 6 set bits\n    // Number            10010101110 - 1198 (599 * 2) has the same number of set bits == 6\n    // Number            10010101111 - 1199 (599 * 2 + 1) has the same number of set bits + 1 == 7\n    // For example: range [0, 5]\n    // 0 --> 0 bits --> [0]\n    // 1 --> 001 --> bits[000] + 001 & 001 == bits[0] + 1 == 0 + 1 --> [0, 1]\n    // 2 --> 010 --> bits[001] + 010 & 001 == bits[1] + 0 == 1 + 0 --> [0, 1, 1]\n    // 3 --> 011 --> bits[001] + 011 & 001 == bits[1] + 1 == 1 + 1 --> [0, 1, 1, 2]\n    // 4 --> 100 --> bits[010] + 100 & 001 == bits[2] + 0 == 1 + 0 --> [0, 1, 1, 2, 1]\n    // 5 --> 101 --> bits[010] + 101 & 001 == bits[2] + 1 == 1 + 1 --> [0, 1, 1, 2, 1, 2]\n    bits.push(bits[i >> 1] + (i & 1));\n  }\n\n  return bits;\n};\n\nconsole.log(countBits(5)); // [0, 1, 1, 2, 1, 2]\nconsole.log(countBits(15)); // [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4]\n\nconst countBitsFlipLastBit = (num) => {\n  // We start from 0\n  // 0 has no bits set to 1\n  const bits = [0];\n\n  // We iterate over every number in the array\n  for (let i = 1; i <= num; i++) {\n    // The similar logic works here as well\n    // We flips the least-significant bit of the current number to 0\n    // The number we got as a result will be less than the current number\n    // and we already counted it's bits\n    // So we take the number of it's bits from the resulting array and add\n    // the bit we flipped - bits[i & (i - 1)] + 1\n    // For example: range [0, 5]\n    // 0 --> 0 bits --> [0]\n    // 1 --> bits[001 & 000] + 1 == bits[0] + 1 == 0 + 1 --> [0, 1]\n    // 2 --> bits[010 & 001] + 1 == bits[0] + 1 == 0 + 1 --> [0, 1, 1]\n    // 3 --> bits[011 & 010] + 1 == bits[2] + 1 == 1 + 1 --> [0, 1, 1, 2]\n    // 4 --> bits[100 & 011] + 1 == bits[0] + 1 == 0 + 1 --> [0, 1, 1, 2, 1]\n    // 5 --> bits[101 & 100] + 1 == bits[4] + 1 == 1 + 1 --> [0, 1, 1, 2, 1, 2]\n    bits.push(bits[i & (i - 1)] + 1);\n  }\n\n  return bits;\n};\n\nconsole.log(countBitsFlipLastBit(5)); // [0, 1, 1, 2, 1, 2]\nconsole.log(countBitsFlipLastBit(15)); // [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];\n",
        "starterCode": {
            "javascript": "// Counting Bits\n// Bit Manipulation\n\n// Given an integer num, return an array of the number of 1's\n// in the binary representation of every number in the range [0, num].\n// It is very easy to come up with a solution with run time O(32n).\n// Can you do it in linear time O(n) and possibly in a single pass?\n// Could you solve it in O(n) space complexity?\n// Can you do it without using any built-in function?\n\n// Constraints:\n// 0 <= num <= 10 ^ 5\n\nconst countBits = (num) => {\n  // We start from 0\n  // 0 has no bits set to 1\n  const bits = [0];\n\n  // We iterate over every number in the array\n  for (let i = 1; i <= num; i++) {\n    // We cut off the last bit of the current number (i >> 1)\n    // The number we got as a result will be less than the current number\n    // and we already counted it's bits\n    // So we take the number of it's bits from the resulting array and\n    // add 1 if the last bit of the current number is set to 1 or 0 if not (i & 1)\n    // Let's take number 1001010111 - 599, it has 6 set bits\n    // Number            10010101110 - 1198 (599 * 2) has the same number of set bits == 6\n    // Number            10010101111 - 1199 (599 * 2 + 1) has the same number of set bits + 1 == 7\n    // For example: range [0, 5]\n    // 0 --> 0 bits --> [0]\n    // 1 --> 001 --> bits[000] + 001 & 001 == bits[0] + 1 == 0 + 1 --> [0, 1]\n    // 2 --> 010 --> bits[001] + 010 & 001 == bits[1] + 0 == 1 + 0 --> [0, 1, 1]\n    // 3 --> 011 --> bits[001] + 011 & 001 == bits[1] + 1 == 1 + 1 --> [0, 1, 1, 2]\n    // 4 --> 100 --> bits[010] + 100 & 001 == bits[2] + 0 == 1 + 0 --> [0, 1, 1, 2, 1]\n    // 5 --> 101 --> bits[010] + 101 & 001 == bits[2] + 1 == 1 + 1 --> [0, 1, 1, 2, 1, 2]\n    bits.push(bits[i >> 1] + (i & 1));\n  }\n\n  return bits;\n};\n\nconsole.log(countBits(5)); // [0, 1, 1, 2, 1, 2]\nconsole.log(countBits(15)); // [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4]\n\nconst countBitsFlipLastBit = (num) => {\n  // We start from 0\n  // 0 has no bits set to 1\n  const bits = [0];\n\n  // We iterate over every number in the array\n  for (let i = 1; i <= num; i++) {\n    // The similar logic works here as well\n    // We flips the least-significant bit of the current number to 0\n    // The number we got as a result will be less than the current number\n    // and we already counted it's bits\n    // So we take the number of it's bits from the resulting array and add\n    // the bit we flipped - bits[i & (i - 1)] + 1\n    // For example: range [0, 5]\n    // 0 --> 0 bits --> [0]\n    // 1 --> bits[001 & 000] + 1 == bits[0] + 1 == 0 + 1 --> [0, 1]\n    // 2 --> bits[010 & 001] + 1 == bits[0] + 1 == 0 + 1 --> [0, 1, 1]\n    // 3 --> bits[011 & 010] + 1 == bits[2] + 1 == 1 + 1 --> [0, 1, 1, 2]\n    // 4 --> bits[100 & 011] + 1 == bits[0] + 1 == 0 + 1 --> [0, 1, 1, 2, 1]\n    // 5 --> bits[101 & 100] + 1 == bits[4] + 1 == 1 + 1 --> [0, 1, 1, 2, 1, 2]\n    bits.push(bits[i & (i - 1)] + 1);\n  }\n\n  return bits;\n};\n\nconsole.log(countBitsFlipLastBit(5)); // [0, 1, 1, 2, 1, 2]\nconsole.log(countBitsFlipLastBit(15)); // [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 66,
        "likes": 484
    },
    {
        "id": "30",
        "title": "Find The Difference",
        "slug": "find-the-difference",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "You are given two strings s and t. String t is generated by random shuffling string s and then add one more letter at a random position. Return the letter that was added to t.",
        "examples": [
            {
                "input": "findTheDifference('abcd', 'abcde')",
                "output": "e",
                "explanation": "Based on code execution"
            },
            {
                "input": "findTheDifference('abcdksitreafw', 'abcdwekaftrsiu')",
                "output": "u",
                "explanation": "Based on code execution"
            },
            {
                "input": "findTheDifference('', 'a')",
                "output": "a",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "0 <= s.length <= 1000",
            "t.length == s.length + 1",
            "s and t consist of lower-case English letters."
        ],
        "hints": [],
        "solution": "// You are given two strings s and t. String t is generated\n// by random shuffling string s and then add one more letter\n// at a random position. Return the letter that was added to t.\n\n// Constraints:\n// 0 <= s.length <= 1000\n// t.length == s.length + 1\n// s and t consist of lower-case English letters.\n\nconst findTheDifference = (s, t) => {\n  let letter = 0;\n\n  // Uses the fact that n ^ n will be 0\n  // We XOR all the code points from the both strings\n  // and find the difference\n  for (const c of s) {\n    letter ^= c.codePointAt(0);\n  }\n\n  for (const c of t) {\n    letter ^= c.codePointAt(0);\n  }\n\n  return String.fromCodePoint(letter);\n};\n\nconsole.log(findTheDifference('abcd', 'abcde')); // e\nconsole.log(findTheDifference('abcdksitreafw', 'abcdwekaftrsiu')); // u\nconsole.log(findTheDifference('', 'a')); // a\n",
        "starterCode": {
            "javascript": "// Find The Difference\n// Bit Manipulation\n\n// You are given two strings s and t. String t is generated\n// by random shuffling string s and then add one more letter\n// at a random position. Return the letter that was added to t.\n\n// Constraints:\n// 0 <= s.length <= 1000\n// t.length == s.length + 1\n// s and t consist of lower-case English letters.\n\nconst findTheDifference = (s, t) => {\n  let letter = 0;\n\n  // Uses the fact that n ^ n will be 0\n  // We XOR all the code points from the both strings\n  // and find the difference\n  for (const c of s) {\n    letter ^= c.codePointAt(0);\n  }\n\n  for (const c of t) {\n    letter ^= c.codePointAt(0);\n  }\n\n  return String.fromCodePoint(letter);\n};\n\nconsole.log(findTheDifference('abcd', 'abcde')); // e\nconsole.log(findTheDifference('abcdksitreafw', 'abcdwekaftrsiu')); // u\nconsole.log(findTheDifference('', 'a')); // a\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 58,
        "likes": 466
    },
    {
        "id": "31",
        "title": "Hamming Distance",
        "slug": "hamming-distance",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "The Hamming distance between two integers is the number of positions at which the corresponding bits are different. Given two integers x and y, calculate the Hamming distance.",
        "examples": [
            {
                "input": "hammingDistance(1, 4)",
                "output": "2",
                "explanation": "Based on code execution"
            },
            {
                "input": "hammingDistance(458, 29757573)",
                "output": "12",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// The Hamming distance between two integers is the number\n// of positions at which the corresponding bits are different.\n// Given two integers x and y, calculate the Hamming distance.\n\n// Note:\n// 0 ≤ x, y < 2 ^ 31\n\n// hamming weight\nconst countBits = (n) => {\n  let count = 0;\n\n  while (n !== 0) {\n    n &= (n - 1);\n    count++;\n  }\n\n  return count;\n};\n\nconst hammingDistance = (x, y) => {\n  // Gets the difference\n  const diff = x ^ y;\n  // Counts ones in the binary representation of the difference\n  return countBits(diff);\n};\n\nconsole.log(hammingDistance(1, 4)); // 2\nconsole.log(hammingDistance(458, 29757573)); // 12\n",
        "starterCode": {
            "javascript": "// Hamming Distance\n// Bit Manipulation\n\n// The Hamming distance between two integers is the number\n// of positions at which the corresponding bits are different.\n// Given two integers x and y, calculate the Hamming distance.\n\n// Note:\n// 0 ≤ x, y < 2 ^ 31\n\n// hamming weight\nconst countBits = (n) => {\n  let count = 0;\n\n  while (n !== 0) {\n    n &= (n - 1);\n    count++;\n  }\n\n  return count;\n};\n\nconst hammingDistance = (x, y) => {\n  // Gets the difference\n  const diff = x ^ y;\n  // Counts ones in the binary representation of the difference\n  return countBits(diff);\n};\n\nconsole.log(hammingDistance(1, 4)); // 2\nconsole.log(hammingDistance(458, 29757573)); // 12\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 78,
        "likes": 14
    },
    {
        "id": "32",
        "title": "Hamming Weight",
        "slug": "hamming-weight",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Write a function that takes a 32 bits unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).",
        "examples": [
            {
                "input": "hammingWeight(11)",
                "output": "3",
                "explanation": "Based on code execution"
            },
            {
                "input": "hammingWeight(4294967285)",
                "output": "30",
                "explanation": "Based on code execution"
            },
            {
                "input": "hammingWeightQuick(11)",
                "output": "3",
                "explanation": "Based on code execution"
            },
            {
                "input": "hammingWeightQuick(4294967285)",
                "output": "30",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Write a function that takes a 32 bits unsigned integer and\n// returns the number of '1' bits it has (also known as the Hamming weight).\n\n// Time complexity - O(32)\nconst hammingWeight = function(n) {\n  // Turn into an unsigned integer (just in case)\n  n = n >>> 0;\n\n  let count = 0;\n  for (let i = 0; i < 32; i++) {\n    count += n & 1;\n    n = n >> 1;\n  }\n\n  return count;\n};\n\nconsole.log(hammingWeight(11)); // 3\nconsole.log(hammingWeight(4294967285)); // 30\n\n// Time complexity - O(K), where K is the number of ones\n// present in the binary form of the given number\nconst hammingWeightQuick = function(n) {\n  // Turn into an unsigned integer (just in case)\n  n = n >>> 0;\n\n  let count = 0;\n  while (n !== 0) {\n    // n & (n - 1) flips the least-significant bit to 0\n    n = n & (n - 1);\n    count++;\n  }\n\n  return count;\n};\n\nconsole.log(hammingWeightQuick(11)); // 3\nconsole.log(hammingWeightQuick(4294967285)); // 30\n",
        "starterCode": {
            "javascript": "// Hamming Weight\n// Bit Manipulation\n\n// Write a function that takes a 32 bits unsigned integer and\n// returns the number of '1' bits it has (also known as the Hamming weight).\n\n// Time complexity - O(32)\nconst hammingWeight = function(n) {\n  // Turn into an unsigned integer (just in case)\n  n = n >>> 0;\n\n  let count = 0;\n  for (let i = 0; i < 32; i++) {\n    count += n & 1;\n    n = n >> 1;\n  }\n\n  return count;\n};\n\nconsole.log(hammingWeight(11)); // 3\nconsole.log(hammingWeight(4294967285)); // 30\n\n// Time complexity - O(K), where K is the number of ones\n// present in the binary form of the given number\nconst hammingWeightQuick = function(n) {\n  // Turn into an unsigned integer (just in case)\n  n = n >>> 0;\n\n  let count = 0;\n  while (n !== 0) {\n    // n & (n - 1) flips the least-significant bit to 0\n    n = n & (n - 1);\n    count++;\n  }\n\n  return count;\n};\n\nconsole.log(hammingWeightQuick(11)); // 3\nconsole.log(hammingWeightQuick(4294967285)); // 30\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 63,
        "likes": 338
    },
    {
        "id": "33",
        "title": "Integer Replacement",
        "slug": "integer-replacement",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given a positive integer n, you can apply one of the following operations: 1. If n is even, replace n with n / 2. 2. If n is odd, replace n with either n + 1 or n - 1. Return the minimum number of operations needed for n to become 1.",
        "examples": [
            {
                "input": "integerReplacement(15)",
                "output": "5",
                "explanation": "Based on code execution"
            },
            {
                "input": "integerReplacement(11)",
                "output": "5",
                "explanation": "Based on code execution"
            },
            {
                "input": "integerReplacement(2147483647)",
                "output": "32",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "1 <= n <= 2 ^ 31 - 1"
        ],
        "hints": [],
        "solution": "// Given a positive integer n, you can apply one of the following operations:\n// 1. If n is even, replace n with n / 2.\n// 2. If n is odd, replace n with either n + 1 or n - 1.\n// Return the minimum number of operations needed for n to become 1.\n\n// Constraints:\n// 1 <= n <= 2 ^ 31 - 1\n\nconst integerReplacement = function(n) {\n  let count = 0;\n\n  while (n !== 1) {\n    // If the number is even, divide it by 2\n    // The right shift by one is equivalent to dividing by 2\n    // We perform an unsigned right shift (>>>), because of the possibility\n    // that we can get as an argument n == 2 ** 31 - 1 (2147483647)\n    // This number is the maximum positive value for a 32-bit signed binary integer\n    // So we can exceed it on our first iteration and get a negative number\n    // as a result by a right shift (>>) on our second iteration\n    // Suppose n == 2147483647 == 01111111111111111111111111111111\n    // It is an odd number, we can add 1 (according to the task condition)\n    // to make it even, and we will get 10000000000000000000000000000000\n    // (2147483648) as a result, then we will right shift it by 1\n    // and get a negative number -1073741824 (11000000000000000000000000000000)\n    // So we will get an infinite loop, because we will never reach n == 1\n    // With an unsigned right shift we will get 01000000000000000000000000000000\n    // instead of a negative number and reach n == 1\n    // Pay attention to the most significant bit - now it is 0\n    // (more about an unsigned right shift - convert-a-number-to-hexadecimal.js)\n    if (!(n & 1)) n >>>= 1;\n    // If the number is odd, we have two possibilities: we can add 1 or subtract 1\n    // To decide when we have to add and when to subtract, we must understand, that\n    // the main operation here is dividing by 2\n    // For example, it takes only three operations (dividing) to reduce 1000 (8) to 1\n    // But if additional bits are set in the number (1001 - 9), it adds\n    // additional operations for adding or subtracting 1\n    // So the less set bits the number has the less operations we need to perform\n    // And so we have to choose the operation (add or subtract), that gives us more bits\n    // set to 0. We need to consider two cases:\n    // 1. we have a number, that ends with 01\n    // 2. we have a number, that ends with 11\n    // In the first case, it is obvious that we will get more zeros by subtracting\n    // In the second case, it is not so obvious what we should do\n    // If we look at 11 (3), we see that subtracting 1 takes less operation than adding\n    // 11 - 1 --> 10 >> 1 - 2 operations\n    // 11 + 1 --> 100 >> 1 --> 10 >> 1 - 3 operations\n    // But if we take a larger number, 1111 (15) for example, we will see, that adding is better:\n    // 1111 - 1 --> 1110 >> 1 --> 111 - 1 --> 110 >> 1 --> 11 - 1 --> 10 >> 1 - 6 operations\n    // 1111 + 1 --> 10000 >> 1 --> 1000 >> 1 --> 100 >> 1 --> 10 >> 1 - 5 operations\n    // In fact, 11 (3) is an exception to the rule\n    // There may be cases when the type of the operation doesn't matter, for example 1011 (11):\n    // It doesn't matter if we subtract 1 from 1011 (11) or add 1\n    // 1011 - 1 --> 1010 >> 1 --> 101 - 1 --> 100 >> 1 --> 10 >> 1 - 5 operations\n    // 1011 + 1 --> 1100 >> 1 --> 110 >> 1 --> 11 - 1 --> 10 >> 1 - 5 operations\n    // But the general rule is: we subtract 1 if a number equals 3 or ends with 01,\n    // and we add 1 in any other cases (actually if a number ends with 11)\n    // the condition can also be written as (n === 3 || !(n >> 1 & 1))\n    else if (n === 3 || (n & 3) === 1) n--;\n    else n++;\n    count++;\n  }\n\n  return count;\n};\n\nconsole.log(integerReplacement(15)); // 5\nconsole.log(integerReplacement(11)); // 5\nconsole.log(integerReplacement(2147483647)); // 32\n",
        "starterCode": {
            "javascript": "// Integer Replacement\n// Bit Manipulation\n\n// Given a positive integer n, you can apply one of the following operations:\n// 1. If n is even, replace n with n / 2.\n// 2. If n is odd, replace n with either n + 1 or n - 1.\n// Return the minimum number of operations needed for n to become 1.\n\n// Constraints:\n// 1 <= n <= 2 ^ 31 - 1\n\nconst integerReplacement = function(n) {\n  let count = 0;\n\n  while (n !== 1) {\n    // If the number is even, divide it by 2\n    // The right shift by one is equivalent to dividing by 2\n    // We perform an unsigned right shift (>>>), because of the possibility\n    // that we can get as an argument n == 2 ** 31 - 1 (2147483647)\n    // This number is the maximum positive value for a 32-bit signed binary integer\n    // So we can exceed it on our first iteration and get a negative number\n    // as a result by a right shift (>>) on our second iteration\n    // Suppose n == 2147483647 == 01111111111111111111111111111111\n    // It is an odd number, we can add 1 (according to the task condition)\n    // to make it even, and we will get 10000000000000000000000000000000\n    // (2147483648) as a result, then we will right shift it by 1\n    // and get a negative number -1073741824 (11000000000000000000000000000000)\n    // So we will get an infinite loop, because we will never reach n == 1\n    // With an unsigned right shift we will get 01000000000000000000000000000000\n    // instead of a negative number and reach n == 1\n    // Pay attention to the most significant bit - now it is 0\n    // (more about an unsigned right shift - convert-a-number-to-hexadecimal.js)\n    if (!(n & 1)) n >>>= 1;\n    // If the number is odd, we have two possibilities: we can add 1 or subtract 1\n    // To decide when we have to add and when to subtract, we must understand, that\n    // the main operation here is dividing by 2\n    // For example, it takes only three operations (dividing) to reduce 1000 (8) to 1\n    // But if additional bits are set in the number (1001 - 9), it adds\n    // additional operations for adding or subtracting 1\n    // So the less set bits the number has the less operations we need to perform\n    // And so we have to choose the operation (add or subtract), that gives us more bits\n    // set to 0. We need to consider two cases:\n    // 1. we have a number, that ends with 01\n    // 2. we have a number, that ends with 11\n    // In the first case, it is obvious that we will get more zeros by subtracting\n    // In the second case, it is not so obvious what we should do\n    // If we look at 11 (3), we see that subtracting 1 takes less operation than adding\n    // 11 - 1 --> 10 >> 1 - 2 operations\n    // 11 + 1 --> 100 >> 1 --> 10 >> 1 - 3 operations\n    // But if we take a larger number, 1111 (15) for example, we will see, that adding is better:\n    // 1111 - 1 --> 1110 >> 1 --> 111 - 1 --> 110 >> 1 --> 11 - 1 --> 10 >> 1 - 6 operations\n    // 1111 + 1 --> 10000 >> 1 --> 1000 >> 1 --> 100 >> 1 --> 10 >> 1 - 5 operations\n    // In fact, 11 (3) is an exception to the rule\n    // There may be cases when the type of the operation doesn't matter, for example 1011 (11):\n    // It doesn't matter if we subtract 1 from 1011 (11) or add 1\n    // 1011 - 1 --> 1010 >> 1 --> 101 - 1 --> 100 >> 1 --> 10 >> 1 - 5 operations\n    // 1011 + 1 --> 1100 >> 1 --> 110 >> 1 --> 11 - 1 --> 10 >> 1 - 5 operations\n    // But the general rule is: we subtract 1 if a number equals 3 or ends with 01,\n    // and we add 1 in any other cases (actually if a number ends with 11)\n    // the condition can also be written as (n === 3 || !(n >> 1 & 1))\n    else if (n === 3 || (n & 3) === 1) n--;\n    else n++;\n    count++;\n  }\n\n  return count;\n};\n\nconsole.log(integerReplacement(15)); // 5\nconsole.log(integerReplacement(11)); // 5\nconsole.log(integerReplacement(2147483647)); // 32\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 76,
        "likes": 358
    },
    {
        "id": "34",
        "title": "Letter Case Permutation",
        "slug": "letter-case-permutation",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given a string S, we can transform every letter individually to be lowercase or uppercase to create another string. Return a list of all possible strings we could create. You can return the output in any order.",
        "examples": [
            {
                "input": "letterCasePermutation('a1b2')",
                "output": "['a1b2', 'a1B2', 'A1b2', 'A1B2'];",
                "explanation": "Based on code execution"
            },
            {
                "input": "letterCasePermutation('12345')",
                "output": "['12345']",
                "explanation": "Based on code execution"
            },
            {
                "input": "letterCasePermutationRecursive('a1b2')",
                "output": "['a1b2', 'A1b2', 'A1B2', 'a1B2']",
                "explanation": "Based on code execution"
            },
            {
                "input": "letterCasePermutationRecursive('12345')",
                "output": "['12345']",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "S will be a string with length between 1 and 12.",
            "S will consist only of letters or digits."
        ],
        "hints": [],
        "solution": "// Given a string S, we can transform every letter individually\n// to be lowercase or uppercase to create another string.\n// Return a list of all possible strings we could create.\n// You can return the output in any order.\n\n// Constraints:\n// S will be a string with length between 1 and 12.\n// S will consist only of letters or digits.\n\nconst letterCasePermutation = (s) => {\n  const permutations = [];\n  let mask = 0;\n\n  // We know that a string must be 12 characters long at most\n  // So we can use a 32-bit integer as a bitmask\n  // We construct bitmask to distinguish between letters and digits\n  // 0 means a letter, 1 means a digit\n  // For example, 'a1b2' will have the following bitmask: 0101 == 5\n  for (const char of s) {\n    mask <<= 1;\n    if (!/[a-zA-Z]/.test(char)) mask += 1;\n  }\n\n  // We also use i as a bitmask\n  // Every iteration we add 1 to i and get a new bitmask\n  // For example for 'a1b2':\n  // Bitmasks will be 0000 0001 0010 0011 0100 0101 0110 0111 1000 1001 1010 1011 1100 1101 1110 1111\n  // We stop when i == (1 << nums.length) --> i == 10000 (or 1111 + 1)\n  for (let i = 0; i < (1 << s.length); i++) {\n    // We can have digits in our string, that we don't need to transform\n    // So we check if there is any set bits in i that also are set in mask\n    // and if there are, we skip that iteration\n    // In our example:\n    // 0000 --> 'a1b2'\n    // 0001 --> we skip the iteration\n    // 0010 --> 'a1B2'\n    // 0011 0100 0101 0110 0111 --> we skip the iterations\n    // 1000 --> 'A1b2'\n    // 1001 --> we skip the iteration\n    // 1010 --> 'A1B2'\n    // 1011 1100 1101 1110 1111 --> we skip the iterations\n    if (!(mask & i)) {\n      let permutation = '';\n\n      // For every bitmask we go through each bit\n      for (let j = s.length - 1; j >= 0; j--) {\n        // And if the bit is set and the corresponding character is a letter,\n        // we transform it to be lowercase or uppercase\n        if (i & (1 << j) && !(mask & (1 << j))) {\n          // We can toggle the case of a letter with help of a bit manipulation\n          // code point ^ (1 << 5) --> code point ^ 32\n          // For example: 'a' --> 97\n          // 97 ^ 32 == 65 == 'A'\n          // Because of the rule: if a ^ b == c, then a ^ c == b and c ^ b == a\n          // 65 ^ 32 == 97 == 'a'\n          permutation += String.fromCodePoint(s[s.length - j - 1].codePointAt(0) ^ 32);\n        // If the bit is not set or the corresponding character is a digit,\n        // we leave it as it is\n        } else {\n          permutation += s[s.length - j - 1];\n        }\n      }\n\n      permutations.push(permutation);\n    }\n  }\n\n  return permutations;\n};\n\nconsole.log(letterCasePermutation('a1b2')); // ['a1b2', 'a1B2', 'A1b2', 'A1B2'];\nconsole.log(letterCasePermutation('12345')); // ['12345']\n\n// Recursive version\nconst letterCasePermutationRecursive = function(s) {\n  const permutations = [];\n\n  const transform = (permutation, index) => {\n    permutations.push(permutation);\n\n    // We iterate over every character in the string\n    // starting from a certain index and if the character is a letter\n    // we toggle the case of the letter and split a new branch\n    // For example: 'a1b2'\n    //     a1b2\n    //   /     \\\n    // A1b2   a1B2\n    //  |\n    // A1B2\n    for (let i = index; i < permutation.length; i++) {\n      if (/[a-zA-Z]/.test(permutation[i])) {\n        const newPermutation = permutation.slice(0, i) +\n          String.fromCodePoint(permutation[i].codePointAt(0) ^ 32) +\n          permutation.slice(i + 1);\n        transform(newPermutation, i + 1);\n      }\n    }\n  };\n\n  // We start with an original string\n  transform(s, 0);\n  return permutations;\n};\n\nconsole.log(letterCasePermutationRecursive('a1b2')); // ['a1b2', 'A1b2', 'A1B2', 'a1B2']\nconsole.log(letterCasePermutationRecursive('12345')); // ['12345']\n",
        "starterCode": {
            "javascript": "// Letter Case Permutation\n// Bit Manipulation\n\n// Given a string S, we can transform every letter individually\n// to be lowercase or uppercase to create another string.\n// Return a list of all possible strings we could create.\n// You can return the output in any order.\n\n// Constraints:\n// S will be a string with length between 1 and 12.\n// S will consist only of letters or digits.\n\nconst letterCasePermutation = (s) => {\n  const permutations = [];\n  let mask = 0;\n\n  // We know that a string must be 12 characters long at most\n  // So we can use a 32-bit integer as a bitmask\n  // We construct bitmask to distinguish between letters and digits\n  // 0 means a letter, 1 means a digit\n  // For example, 'a1b2' will have the following bitmask: 0101 == 5\n  for (const char of s) {\n    mask <<= 1;\n    if (!/[a-zA-Z]/.test(char)) mask += 1;\n  }\n\n  // We also use i as a bitmask\n  // Every iteration we add 1 to i and get a new bitmask\n  // For example for 'a1b2':\n  // Bitmasks will be 0000 0001 0010 0011 0100 0101 0110 0111 1000 1001 1010 1011 1100 1101 1110 1111\n  // We stop when i == (1 << nums.length) --> i == 10000 (or 1111 + 1)\n  for (let i = 0; i < (1 << s.length); i++) {\n    // We can have digits in our string, that we don't need to transform\n    // So we check if there is any set bits in i that also are set in mask\n    // and if there are, we skip that iteration\n    // In our example:\n    // 0000 --> 'a1b2'\n    // 0001 --> we skip the iteration\n    // 0010 --> 'a1B2'\n    // 0011 0100 0101 0110 0111 --> we skip the iterations\n    // 1000 --> 'A1b2'\n    // 1001 --> we skip the iteration\n    // 1010 --> 'A1B2'\n    // 1011 1100 1101 1110 1111 --> we skip the iterations\n    if (!(mask & i)) {\n      let permutation = '';\n\n      // For every bitmask we go through each bit\n      for (let j = s.length - 1; j >= 0; j--) {\n        // And if the bit is set and the corresponding character is a letter,\n        // we transform it to be lowercase or uppercase\n        if (i & (1 << j) && !(mask & (1 << j))) {\n          // We can toggle the case of a letter with help of a bit manipulation\n          // code point ^ (1 << 5) --> code point ^ 32\n          // For example: 'a' --> 97\n          // 97 ^ 32 == 65 == 'A'\n          // Because of the rule: if a ^ b == c, then a ^ c == b and c ^ b == a\n          // 65 ^ 32 == 97 == 'a'\n          permutation += String.fromCodePoint(s[s.length - j - 1].codePointAt(0) ^ 32);\n        // If the bit is not set or the corresponding character is a digit,\n        // we leave it as it is\n        } else {\n          permutation += s[s.length - j - 1];\n        }\n      }\n\n      permutations.push(permutation);\n    }\n  }\n\n  return permutations;\n};\n\nconsole.log(letterCasePermutation('a1b2')); // ['a1b2', 'a1B2', 'A1b2', 'A1B2'];\nconsole.log(letterCasePermutation('12345')); // ['12345']\n\n// Recursive version\nconst letterCasePermutationRecursive = function(s) {\n  const permutations = [];\n\n  const transform = (permutation, index) => {\n    permutations.push(permutation);\n\n    // We iterate over every character in the string\n    // starting from a certain index and if the character is a letter\n    // we toggle the case of the letter and split a new branch\n    // For example: 'a1b2'\n    //     a1b2\n    //   /     \\\n    // A1b2   a1B2\n    //  |\n    // A1B2\n    for (let i = index; i < permutation.length; i++) {\n      if (/[a-zA-Z]/.test(permutation[i])) {\n        const newPermutation = permutation.slice(0, i) +\n          String.fromCodePoint(permutation[i].codePointAt(0) ^ 32) +\n          permutation.slice(i + 1);\n        transform(newPermutation, i + 1);\n      }\n    }\n  };\n\n  // We start with an original string\n  transform(s, 0);\n  return permutations;\n};\n\nconsole.log(letterCasePermutationRecursive('a1b2')); // ['a1b2', 'A1b2', 'A1B2', 'a1B2']\nconsole.log(letterCasePermutationRecursive('12345')); // ['12345']\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 61,
        "likes": 813
    },
    {
        "id": "35",
        "title": "Majority Element",
        "slug": "majority-element",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array. Could you solve the problem in linear time and in O(1) space?",
        "examples": [
            {
                "input": "findMajorityElement([2, 2, 1, 1, 1, 2, 2])",
                "output": "2",
                "explanation": "Based on code execution"
            },
            {
                "input": "findMajorityElement([7, 7, -5, 7, -5, 1, -5, 7, -5, -5, 7, 7, 7, 7, 7, 7])",
                "output": "7",
                "explanation": "Based on code execution"
            },
            {
                "input": "findMajorityElement([4])",
                "output": "4",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "n == nums.length",
            "1 <= n <= 5  10 ^ 4",
            "-2 ^ 31 <= nums[i] <= 2 ^ 31 - 1"
        ],
        "hints": [],
        "solution": "// Given an array nums of size n, return the majority element.\n// The majority element is the element that appears more than ⌊n / 2⌋ times.\n// You may assume that the majority element always exists in the array.\n// Could you solve the problem in linear time and in O(1) space?\n\n// Constraints:\n// n == nums.length\n// 1 <= n <= 5 * 10 ^ 4\n// -2 ^ 31 <= nums[i] <= 2 ^ 31 - 1\n\nconst findMajorityElement = (nums) => {\n  if (!nums.length) throw new Error('The array is empty');\n\n  let majorityElement = 0;\n\n  // For every bit\n  for (let i = 0; i < 32; i++) {\n    const mask = 1 << i;\n    let bitCount = 0;\n\n    // we count the number of numbers that have this bit\n    for (const num of nums) {\n      if (num & mask) bitCount++;\n    }\n\n    // If bitCount is more than n / 2, we set this bit in the result\n    if (bitCount > nums.length / 2) majorityElement |= mask;\n  }\n\n  return majorityElement;\n};\n\nconsole.log(findMajorityElement([2, 2, 1, 1, 1, 2, 2])); // 2\nconsole.log(findMajorityElement([7, 7, -5, 7, -5, 1, -5, 7, -5, -5, 7, 7, 7, 7, 7, 7])); // 7\nconsole.log(findMajorityElement([4])); // 4\n",
        "starterCode": {
            "javascript": "// Majority Element\n// Bit Manipulation\n\n// Given an array nums of size n, return the majority element.\n// The majority element is the element that appears more than ⌊n / 2⌋ times.\n// You may assume that the majority element always exists in the array.\n// Could you solve the problem in linear time and in O(1) space?\n\n// Constraints:\n// n == nums.length\n// 1 <= n <= 5 * 10 ^ 4\n// -2 ^ 31 <= nums[i] <= 2 ^ 31 - 1\n\nconst findMajorityElement = (nums) => {\n  if (!nums.length) throw new Error('The array is empty');\n\n  let majorityElement = 0;\n\n  // For every bit\n  for (let i = 0; i < 32; i++) {\n    const mask = 1 << i;\n    let bitCount = 0;\n\n    // we count the number of numbers that have this bit\n    for (const num of nums) {\n      if (num & mask) bitCount++;\n    }\n\n    // If bitCount is more than n / 2, we set this bit in the result\n    if (bitCount > nums.length / 2) majorityElement |= mask;\n  }\n\n  return majorityElement;\n};\n\nconsole.log(findMajorityElement([2, 2, 1, 1, 1, 2, 2])); // 2\nconsole.log(findMajorityElement([7, 7, -5, 7, -5, 1, -5, 7, -5, -5, 7, 7, 7, 7, 7, 7])); // 7\nconsole.log(findMajorityElement([4])); // 4\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 84,
        "likes": 181
    },
    {
        "id": "36",
        "title": "Maximum Number Of Occurrences Of A Substring",
        "slug": "maximum-number-of-occurrences-of-a-substring",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given a string s, return the maximum number of occurrences of any substring under the following rules: 1. The number of unique characters in the substring must be less than or equal to maxLetters. 2. The substring size must be between minSize and maxSize inclusive.",
        "examples": [
            {
                "input": "findMaxFrequency('aababcaabbaa', 2, 3, 4)",
                "output": "2",
                "explanation": "Based on code execution"
            },
            {
                "input": "findMaxFrequency('aabcabcab', 2, 2, 3)",
                "output": "3",
                "explanation": "Based on code execution"
            },
            {
                "input": "findMaxFrequency('abcde', 2, 3, 3)",
                "output": "0",
                "explanation": "Based on code execution"
            },
            {
                "input": "findMaxFrequencyWithMap('aababcaabbaa', 2, 3, 4)",
                "output": "2",
                "explanation": "Based on code execution"
            },
            {
                "input": "findMaxFrequencyWithMap('aabcabcab', 2, 2, 3)",
                "output": "3",
                "explanation": "Based on code execution"
            },
            {
                "input": "findMaxFrequencyWithMap('abcde', 2, 3, 3)",
                "output": "0",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "1 <= s.length <= 10 ^ 5",
            "1 <= maxLetters <= 26",
            "1 <= minSize <= maxSize <= min(26, s.length)",
            "s only contains lowercase English letters"
        ],
        "hints": [],
        "solution": "// Given a string s, return the maximum number of occurrences\n// of any substring under the following rules:\n// 1. The number of unique characters in the substring\n// must be less than or equal to maxLetters.\n// 2. The substring size must be between minSize and maxSize inclusive.\n\n// Constraints:\n// 1 <= s.length <= 10 ^ 5\n// 1 <= maxLetters <= 26\n// 1 <= minSize <= maxSize <= min(26, s.length)\n// s only contains lowercase English letters\n\n// hamming weight\nconst countBits = (n) => {\n  let count = 0;\n\n  while (n !== 0) {\n    n &= (n - 1);\n    count++;\n  }\n\n  return count;\n};\n\n// If the substring with maxSize occurs in the string\n// a certain number of times, the substring with minSize\n// occurs the same number of times. So we can ignore maxSize\n// parameter and just look for a substring with minSize\nconst findMaxFrequency = (s, maxLetters, minSize, maxSize) => {\n  // Here we will keep the number of occurrences of substrings\n  const substringMap = {};\n  let maxFrequency = 0;\n  const start = 'a'.codePointAt(0);\n\n  // We iterate over every possible substring\n  for (let i = 0; i <= s.length - minSize; i++) {\n    let mask = 0;\n    const substring = s.slice(i, i + minSize);\n\n    // We construct a mask\n    // We can use a 32-bit integer to create a mask for every\n    // substring where each bit will correspond to a letter\n    // For example: 'abcwa' --> 00000000010000000000000000000111\n    //                                   w                   cba\n    // At this point we don't care how many times every letter\n    // occurs in the substring, we want to know how many unique\n    // letters are in the substring\n    for (const char of substring) {\n      mask |= (1 << (char.codePointAt(0) - start));\n    }\n\n    // We count set bits in the mask\n    // And if the number of set bits satisfies the first rule\n    // (The number of unique characters in the substring\n    // must be less than or equal to maxLetters),\n    // we update the number occurrences in substringMap and maxFrequency\n    if (countBits(mask) <= maxLetters) {\n      substringMap[substring] = (substringMap[substring] || 0) + 1;\n      maxFrequency = Math.max(maxFrequency, substringMap[substring]);\n    }\n  }\n\n  return maxFrequency;\n};\n\nconsole.log(findMaxFrequency('aababcaabbaa', 2, 3, 4)); // 2\nconsole.log(findMaxFrequency('aabcabcab', 2, 2, 3)); // 3\nconsole.log(findMaxFrequency('abcde', 2, 3, 3)); // 0\n\nconst findMaxFrequencyWithMap = (s, maxLetters, minSize, maxSize) => {\n  // We create our first substring\n  let substring = s.slice(0, minSize);\n  // Here we will keep the number of occurrences of substrings\n  const substringMap = {};\n  // Here we will keep characters of the current substring and\n  // the numbers of their occurrences in the current substring\n  const chars = new Map();\n\n  // We iterate over every character in the first substring\n  // and add the number of its occurrences to chars map\n  for (const char of substring) {\n    if (chars.has(char)) chars.set(char, chars.get(char) + 1);\n    else chars.set(char, 1);\n  }\n\n  // We iterate over every possible substring\n  for (let i = 1; i <= s.length - minSize; i++) {\n    // We start by checking the substring we got on the previous\n    // iteration (or our first substring)\n    // If the number of unique characters in the substring satisfies\n    // the first rule, we update the number of occurrences in substringMap\n    if (chars.size <= maxLetters) {\n      substringMap[substring] = (substringMap[substring] || 0) + 1;\n    }\n\n    // Now we create a new substring\n    substring = s.slice(i, i + minSize);\n\n    // We correct the map of characters to match the new substring\n    // We remove the first character of the previous substring\n    if (chars.get(s[i - 1]) - 1 === 0) chars.delete(s[i - 1]);\n    else chars.set(s[i - 1], chars.get(s[i - 1]) - 1);\n\n    // We add the last character of the current substring\n    if (chars.has(s[i + minSize - 1])) {\n      chars.set(s[i + minSize - 1], chars.get(s[i + minSize - 1]) + 1);\n    } else {\n      chars.set(s[i + minSize - 1], 1);\n    }\n  }\n\n  // We update the number of occurrences for the last substring\n  if (chars.size <= maxLetters) {\n    substringMap[substring] = (substringMap[substring] || 0) + 1;\n  }\n\n  return Math.max(0, ...Object.values(substringMap));\n};\n\nconsole.log(findMaxFrequencyWithMap('aababcaabbaa', 2, 3, 4)); // 2\nconsole.log(findMaxFrequencyWithMap('aabcabcab', 2, 2, 3)); // 3\nconsole.log(findMaxFrequencyWithMap('abcde', 2, 3, 3)); // 0\n",
        "starterCode": {
            "javascript": "// Maximum Number Of Occurrences Of A Substring\n// Bit Manipulation\n\n// Given a string s, return the maximum number of occurrences\n// of any substring under the following rules:\n// 1. The number of unique characters in the substring\n// must be less than or equal to maxLetters.\n// 2. The substring size must be between minSize and maxSize inclusive.\n\n// Constraints:\n// 1 <= s.length <= 10 ^ 5\n// 1 <= maxLetters <= 26\n// 1 <= minSize <= maxSize <= min(26, s.length)\n// s only contains lowercase English letters\n\n// hamming weight\nconst countBits = (n) => {\n  let count = 0;\n\n  while (n !== 0) {\n    n &= (n - 1);\n    count++;\n  }\n\n  return count;\n};\n\n// If the substring with maxSize occurs in the string\n// a certain number of times, the substring with minSize\n// occurs the same number of times. So we can ignore maxSize\n// parameter and just look for a substring with minSize\nconst findMaxFrequency = (s, maxLetters, minSize, maxSize) => {\n  // Here we will keep the number of occurrences of substrings\n  const substringMap = {};\n  let maxFrequency = 0;\n  const start = 'a'.codePointAt(0);\n\n  // We iterate over every possible substring\n  for (let i = 0; i <= s.length - minSize; i++) {\n    let mask = 0;\n    const substring = s.slice(i, i + minSize);\n\n    // We construct a mask\n    // We can use a 32-bit integer to create a mask for every\n    // substring where each bit will correspond to a letter\n    // For example: 'abcwa' --> 00000000010000000000000000000111\n    //                                   w                   cba\n    // At this point we don't care how many times every letter\n    // occurs in the substring, we want to know how many unique\n    // letters are in the substring\n    for (const char of substring) {\n      mask |= (1 << (char.codePointAt(0) - start));\n    }\n\n    // We count set bits in the mask\n    // And if the number of set bits satisfies the first rule\n    // (The number of unique characters in the substring\n    // must be less than or equal to maxLetters),\n    // we update the number occurrences in substringMap and maxFrequency\n    if (countBits(mask) <= maxLetters) {\n      substringMap[substring] = (substringMap[substring] || 0) + 1;\n      maxFrequency = Math.max(maxFrequency, substringMap[substring]);\n    }\n  }\n\n  return maxFrequency;\n};\n\nconsole.log(findMaxFrequency('aababcaabbaa', 2, 3, 4)); // 2\nconsole.log(findMaxFrequency('aabcabcab', 2, 2, 3)); // 3\nconsole.log(findMaxFrequency('abcde', 2, 3, 3)); // 0\n\nconst findMaxFrequencyWithMap = (s, maxLetters, minSize, maxSize) => {\n  // We create our first substring\n  let substring = s.slice(0, minSize);\n  // Here we will keep the number of occurrences of substrings\n  const substringMap = {};\n  // Here we will keep characters of the current substring and\n  // the numbers of their occurrences in the current substring\n  const chars = new Map();\n\n  // We iterate over every character in the first substring\n  // and add the number of its occurrences to chars map\n  for (const char of substring) {\n    if (chars.has(char)) chars.set(char, chars.get(char) + 1);\n    else chars.set(char, 1);\n  }\n\n  // We iterate over every possible substring\n  for (let i = 1; i <= s.length - minSize; i++) {\n    // We start by checking the substring we got on the previous\n    // iteration (or our first substring)\n    // If the number of unique characters in the substring satisfies\n    // the first rule, we update the number of occurrences in substringMap\n    if (chars.size <= maxLetters) {\n      substringMap[substring] = (substringMap[substring] || 0) + 1;\n    }\n\n    // Now we create a new substring\n    substring = s.slice(i, i + minSize);\n\n    // We correct the map of characters to match the new substring\n    // We remove the first character of the previous substring\n    if (chars.get(s[i - 1]) - 1 === 0) chars.delete(s[i - 1]);\n    else chars.set(s[i - 1], chars.get(s[i - 1]) - 1);\n\n    // We add the last character of the current substring\n    if (chars.has(s[i + minSize - 1])) {\n      chars.set(s[i + minSize - 1], chars.get(s[i + minSize - 1]) + 1);\n    } else {\n      chars.set(s[i + minSize - 1], 1);\n    }\n  }\n\n  // We update the number of occurrences for the last substring\n  if (chars.size <= maxLetters) {\n    substringMap[substring] = (substringMap[substring] || 0) + 1;\n  }\n\n  return Math.max(0, ...Object.values(substringMap));\n};\n\nconsole.log(findMaxFrequencyWithMap('aababcaabbaa', 2, 3, 4)); // 2\nconsole.log(findMaxFrequencyWithMap('aabcabcab', 2, 2, 3)); // 3\nconsole.log(findMaxFrequencyWithMap('abcde', 2, 3, 3)); // 0\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 63,
        "likes": 12
    },
    {
        "id": "37",
        "title": "Maximum Product Of Word Lengths",
        "slug": "maximum-product-of-word-lengths",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given a string array words, return the maximum value of length(word[i]) * length(word[j]) where the two words do not share common letters. If no such two words exist, return 0.",
        "examples": [
            {
                "input": "findMaxProduct(['abcw', 'baz', 'foo', 'bar', 'xtfn', 'abcdef'])",
                "output": "16",
                "explanation": "Based on code execution"
            },
            {
                "input": "findMaxProduct(['a', 'ab', 'abc', 'd', 'cd', 'bcd', 'abcd'])",
                "output": "4",
                "explanation": "Based on code execution"
            },
            {
                "input": "findMaxProduct(['a', 'aa', 'aaa', 'aaaa'])",
                "output": "0",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "2 <= words.length <= 1000",
            "1 <= words[i].length <= 1000",
            "words[i] consists only of lowercase English letters."
        ],
        "hints": [],
        "solution": "// Given a string array words, return the maximum value of\n// length(word[i]) * length(word[j]) where the two words\n// do not share common letters. If no such two words exist, return 0.\n\n// Constraints:\n// 2 <= words.length <= 1000\n// 1 <= words[i].length <= 1000\n// words[i] consists only of lowercase English letters.\n\nconst findMaxProduct = (words) => {\n  // We can use a 32-bit integer to create a unique mask for every string\n  // where each bit will correspond to a certain letter\n  // For example: 'abcw' --> 00000000010000000000000000000111\n  //                                  w                   cba\n  const masks = {};\n  let maxProduct = 0;\n  const start = 'a'.codePointAt(0);\n\n  // For every word\n  for (let i = 0; i < words.length; i++) {\n    let mask = 0;\n\n    // we create a mask\n    for (const c of words[i]) {\n      mask |= 1 << (c.codePointAt(0) - start);\n    }\n\n    // We compare a new mask with other masks\n    for (const k of Object.keys(masks)) {\n      // And if they don't have common letters\n      if (!(masks[k] & mask)) {\n        // we calculate the product of their lengths and compare it with\n        // the max product we found earlier\n        maxProduct = Math.max(maxProduct, words[i].length * words[k].length);\n      }\n    }\n\n    masks[i] = mask;\n  }\n\n  return maxProduct;\n};\n\nconsole.log(findMaxProduct(['abcw', 'baz', 'foo', 'bar', 'xtfn', 'abcdef'])); // 16\nconsole.log(findMaxProduct(['a', 'ab', 'abc', 'd', 'cd', 'bcd', 'abcd'])); // 4\nconsole.log(findMaxProduct(['a', 'aa', 'aaa', 'aaaa'])); // 0\n",
        "starterCode": {
            "javascript": "// Maximum Product Of Word Lengths\n// Bit Manipulation\n\n// Given a string array words, return the maximum value of\n// length(word[i]) * length(word[j]) where the two words\n// do not share common letters. If no such two words exist, return 0.\n\n// Constraints:\n// 2 <= words.length <= 1000\n// 1 <= words[i].length <= 1000\n// words[i] consists only of lowercase English letters.\n\nconst findMaxProduct = (words) => {\n  // We can use a 32-bit integer to create a unique mask for every string\n  // where each bit will correspond to a certain letter\n  // For example: 'abcw' --> 00000000010000000000000000000111\n  //                                  w                   cba\n  const masks = {};\n  let maxProduct = 0;\n  const start = 'a'.codePointAt(0);\n\n  // For every word\n  for (let i = 0; i < words.length; i++) {\n    let mask = 0;\n\n    // we create a mask\n    for (const c of words[i]) {\n      mask |= 1 << (c.codePointAt(0) - start);\n    }\n\n    // We compare a new mask with other masks\n    for (const k of Object.keys(masks)) {\n      // And if they don't have common letters\n      if (!(masks[k] & mask)) {\n        // we calculate the product of their lengths and compare it with\n        // the max product we found earlier\n        maxProduct = Math.max(maxProduct, words[i].length * words[k].length);\n      }\n    }\n\n    masks[i] = mask;\n  }\n\n  return maxProduct;\n};\n\nconsole.log(findMaxProduct(['abcw', 'baz', 'foo', 'bar', 'xtfn', 'abcdef'])); // 16\nconsole.log(findMaxProduct(['a', 'ab', 'abc', 'd', 'cd', 'bcd', 'abcd'])); // 4\nconsole.log(findMaxProduct(['a', 'aa', 'aaa', 'aaaa'])); // 0\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 57,
        "likes": 67
    },
    {
        "id": "38",
        "title": "Maximum XOR Of Two Numbers In An Array",
        "slug": "maximum-XOR-of-two-numbers-in-an-array",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given an integer array nums, return the maximum result of nums[i] XOR nums[j], where 0 ≤ i ≤ j < n. Could you do this in O(n) runtime?",
        "examples": [
            {
                "input": "findMaximumXOR([3, 10, 5, 25, 2, 8])",
                "output": "28",
                "explanation": "Based on code execution"
            },
            {
                "input": "findMaximumXOR([14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70])",
                "output": "127",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "1 <= nums.length <= 2  10 ^ 4",
            "0 <= nums[i] <= 2 ^ 31 - 1"
        ],
        "hints": [],
        "solution": "// Given an integer array nums, return the maximum result\n// of nums[i] XOR nums[j], where 0 ≤ i ≤ j < n.\n// Could you do this in O(n) runtime?\n\n// Constraints:\n// 1 <= nums.length <= 2 * 10 ^ 4\n// 0 <= nums[i] <= 2 ^ 31 - 1\n\nconst findMaximumXOR = (nums) => {\n  let maxXOR = 0;\n\n  // We iterate over every bit\n  // We start from the most significant bits,\n  // because they maximize the result if we find the numbers\n  // that can give us the ability to set them\n  for (let i = 31; i >= 0; i--) {\n    // We left shift our result to make a space for the next bit\n    maxXOR <<= 1;\n    const prefixes = new Set();\n\n    // As we start from the significant bits and gradually construct\n    // our number bit by bit, we only care about the left part\n    // of each number up to the current bit\n    for (const num of nums) {\n      prefixes.add(num >> i);\n    }\n\n    // Now we iterate over every truncated number and check if there is\n    // another number in the collection that satisfies the condition:\n    // (maxXOR | 1) ^ the current number == another number in the collection\n    // If there is such a number, we can set the current bit in the result to 1\n    for (const prefix of prefixes) {\n      // Here the following rule can help us:\n      // If a ^ b == c, then a ^ c == b and c ^ b == a\n      // We take our maxXOR, add 1 (because our goal is to maximize XOR and\n      // we hope to find a number in the collection that allows us to set this bit\n      // of maxXOR to 1), and xor it with the current number we are checking\n      // The fact that we xor not only the current bit but all the bits we constructed\n      // earlier gives us confidence that the xor operation of the found number\n      // and the current number will actually result in maxXOR\n      // For example [3, 10, 5, 25, 2, 8]\n      // maxXOR = 0        --> 1 --> 11 --> 111 --> 1110 --> 11100 --> 28\n      // (maxXOR << 1) | 1 --> 1 --> 11 --> 111 --> 1111 --> 11101\n      // 00011 (3)         --> 0 --> 00 --> 000 --> 0001 --> 00011\n      // 01010 (10)        --> 0 --> 01 --> 010 --> 0101 --> 01010\n      // 00101 (5)         --> 0 --> 00 --> 001 --> 0010 --> 00101\n      // 11001 (25)        --> 1 --> 11 --> 110 --> 1100 --> 11001\n      // 00010 (2)         --> 0 --> 00 --> 000 --> 0001 --> 00010\n      // 01000 (8)         --> 0 --> 01 --> 010 --> 0100 --> 01000\n      if (prefixes.has((maxXOR | 1) ^ prefix)) {\n        // We found such a number, and we set the current bit in the result to 1\n        maxXOR += 1;\n        break;\n      }\n    }\n  }\n\n  return maxXOR;\n};\n\nconsole.log(findMaximumXOR([3, 10, 5, 25, 2, 8])); // 28\nconsole.log(findMaximumXOR([14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70])); // 127\n",
        "starterCode": {
            "javascript": "// Maximum XOR Of Two Numbers In An Array\n// Bit Manipulation\n\n// Given an integer array nums, return the maximum result\n// of nums[i] XOR nums[j], where 0 ≤ i ≤ j < n.\n// Could you do this in O(n) runtime?\n\n// Constraints:\n// 1 <= nums.length <= 2 * 10 ^ 4\n// 0 <= nums[i] <= 2 ^ 31 - 1\n\nconst findMaximumXOR = (nums) => {\n  let maxXOR = 0;\n\n  // We iterate over every bit\n  // We start from the most significant bits,\n  // because they maximize the result if we find the numbers\n  // that can give us the ability to set them\n  for (let i = 31; i >= 0; i--) {\n    // We left shift our result to make a space for the next bit\n    maxXOR <<= 1;\n    const prefixes = new Set();\n\n    // As we start from the significant bits and gradually construct\n    // our number bit by bit, we only care about the left part\n    // of each number up to the current bit\n    for (const num of nums) {\n      prefixes.add(num >> i);\n    }\n\n    // Now we iterate over every truncated number and check if there is\n    // another number in the collection that satisfies the condition:\n    // (maxXOR | 1) ^ the current number == another number in the collection\n    // If there is such a number, we can set the current bit in the result to 1\n    for (const prefix of prefixes) {\n      // Here the following rule can help us:\n      // If a ^ b == c, then a ^ c == b and c ^ b == a\n      // We take our maxXOR, add 1 (because our goal is to maximize XOR and\n      // we hope to find a number in the collection that allows us to set this bit\n      // of maxXOR to 1), and xor it with the current number we are checking\n      // The fact that we xor not only the current bit but all the bits we constructed\n      // earlier gives us confidence that the xor operation of the found number\n      // and the current number will actually result in maxXOR\n      // For example [3, 10, 5, 25, 2, 8]\n      // maxXOR = 0        --> 1 --> 11 --> 111 --> 1110 --> 11100 --> 28\n      // (maxXOR << 1) | 1 --> 1 --> 11 --> 111 --> 1111 --> 11101\n      // 00011 (3)         --> 0 --> 00 --> 000 --> 0001 --> 00011\n      // 01010 (10)        --> 0 --> 01 --> 010 --> 0101 --> 01010\n      // 00101 (5)         --> 0 --> 00 --> 001 --> 0010 --> 00101\n      // 11001 (25)        --> 1 --> 11 --> 110 --> 1100 --> 11001\n      // 00010 (2)         --> 0 --> 00 --> 000 --> 0001 --> 00010\n      // 01000 (8)         --> 0 --> 01 --> 010 --> 0100 --> 01000\n      if (prefixes.has((maxXOR | 1) ^ prefix)) {\n        // We found such a number, and we set the current bit in the result to 1\n        maxXOR += 1;\n        break;\n      }\n    }\n  }\n\n  return maxXOR;\n};\n\nconsole.log(findMaximumXOR([3, 10, 5, 25, 2, 8])); // 28\nconsole.log(findMaximumXOR([14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70])); // 127\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 68,
        "likes": 816
    },
    {
        "id": "39",
        "title": "Minimum Flips To Make A OR B Equal To C",
        "slug": "minimum-flips-to-make-a-OR-b-equal-to-c",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given 3 positives numbers a, b and c. Return the minimum flips required in some bits of a and b to make (a OR b == c) (bitwise OR operation). Flip operation consists of change any single bit 1 to 0 or change the bit 0 to 1 in their binary representation.",
        "examples": [
            {
                "input": "findMinFlips(2, 6, 5)",
                "output": "3",
                "explanation": "Based on code execution"
            },
            {
                "input": "findMinFlips(245, 120, 1290)",
                "output": "12",
                "explanation": "Based on code execution"
            },
            {
                "input": "findMinFlipsHammingWeight(2, 6, 5)",
                "output": "3",
                "explanation": "Based on code execution"
            },
            {
                "input": "findMinFlipsHammingWeight(245, 120, 1290)",
                "output": "12",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "1 <= a <= 10 ^ 9",
            "1 <= b <= 10 ^ 9",
            "1 <= c <= 10 ^ 9"
        ],
        "hints": [],
        "solution": "// Given 3 positives numbers a, b and c. Return the minimum flips required\n// in some bits of a and b to make (a OR b == c) (bitwise OR operation).\n// Flip operation consists of change any single bit 1 to 0 or change\n// the bit 0 to 1 in their binary representation.\n\n// Constraints:\n// 1 <= a <= 10 ^ 9\n// 1 <= b <= 10 ^ 9\n// 1 <= c <= 10 ^ 9\n\n// For example, a = 2, b = 6, c = 5\n// a     0010\n// b     0110\n// c     0101\n// flips 0021 --> 3\nconst findMinFlips = (a, b, c) => {\n  let mask = 1;\n  let minFlips = 0;\n\n  // We iterate over every bit\n  for (let i = 0; i < 32; i++) {\n    // We check if the bit set in c\n    // If the bit is not set in c\n    if (!(mask & c)) {\n      // We must not have this bit set either in a or in b\n      if (mask & a) minFlips += 1;\n      if (mask & b) minFlips += 1;\n    // If the bit set in c\n    } else {\n      // We must have this bit set in at list one number (a or b)\n      if (!(mask & a) && !(mask & b)) minFlips += 1;\n    }\n\n    mask = mask << 1;\n  }\n\n  return minFlips;\n};\n\nconsole.log(findMinFlips(2, 6, 5)); // 3\nconsole.log(findMinFlips(245, 120, 1290)); // 12\n\n// hamming weight\nconst countBits = (n) => {\n  let count = 0;\n\n  while (n !== 0) {\n    n &= (n - 1);\n    count++;\n  }\n\n  return count;\n};\n\n// For example, a = 2, b = 6, c = 5\n// a == 0010, b == 0110, c == 0101\n// a | b == 0110\n// (a | b) ^ c == 0110 ^ 0101 == 0011\n// 0011 + 0010 & 0110 & 0011 == 0011 + 0010 == 2 bits + 1 bit == 3 flips\nconst findMinFlipsHammingWeight = (a, b, c) => {\n  // We find the OR of a and b with no flips made\n  // We find the difference between the OR and c\n  const diff = (a | b) ^ c;\n  // Then we find out how many bits the current OR and c differ by,\n  // and we correct this number in case we need to make flips\n  // in both a and b (the case when the bit is set in a and b,\n  // but it must not be set in c)\n  return countBits(diff) + countBits(a & b & diff);\n};\n\nconsole.log(findMinFlipsHammingWeight(2, 6, 5)); // 3\nconsole.log(findMinFlipsHammingWeight(245, 120, 1290)); // 12\n",
        "starterCode": {
            "javascript": "// Minimum Flips To Make A OR B Equal To C\n// Bit Manipulation\n\n// Given 3 positives numbers a, b and c. Return the minimum flips required\n// in some bits of a and b to make (a OR b == c) (bitwise OR operation).\n// Flip operation consists of change any single bit 1 to 0 or change\n// the bit 0 to 1 in their binary representation.\n\n// Constraints:\n// 1 <= a <= 10 ^ 9\n// 1 <= b <= 10 ^ 9\n// 1 <= c <= 10 ^ 9\n\n// For example, a = 2, b = 6, c = 5\n// a     0010\n// b     0110\n// c     0101\n// flips 0021 --> 3\nconst findMinFlips = (a, b, c) => {\n  let mask = 1;\n  let minFlips = 0;\n\n  // We iterate over every bit\n  for (let i = 0; i < 32; i++) {\n    // We check if the bit set in c\n    // If the bit is not set in c\n    if (!(mask & c)) {\n      // We must not have this bit set either in a or in b\n      if (mask & a) minFlips += 1;\n      if (mask & b) minFlips += 1;\n    // If the bit set in c\n    } else {\n      // We must have this bit set in at list one number (a or b)\n      if (!(mask & a) && !(mask & b)) minFlips += 1;\n    }\n\n    mask = mask << 1;\n  }\n\n  return minFlips;\n};\n\nconsole.log(findMinFlips(2, 6, 5)); // 3\nconsole.log(findMinFlips(245, 120, 1290)); // 12\n\n// hamming weight\nconst countBits = (n) => {\n  let count = 0;\n\n  while (n !== 0) {\n    n &= (n - 1);\n    count++;\n  }\n\n  return count;\n};\n\n// For example, a = 2, b = 6, c = 5\n// a == 0010, b == 0110, c == 0101\n// a | b == 0110\n// (a | b) ^ c == 0110 ^ 0101 == 0011\n// 0011 + 0010 & 0110 & 0011 == 0011 + 0010 == 2 bits + 1 bit == 3 flips\nconst findMinFlipsHammingWeight = (a, b, c) => {\n  // We find the OR of a and b with no flips made\n  // We find the difference between the OR and c\n  const diff = (a | b) ^ c;\n  // Then we find out how many bits the current OR and c differ by,\n  // and we correct this number in case we need to make flips\n  // in both a and b (the case when the bit is set in a and b,\n  // but it must not be set in c)\n  return countBits(diff) + countBits(a & b & diff);\n};\n\nconsole.log(findMinFlipsHammingWeight(2, 6, 5)); // 3\nconsole.log(findMinFlipsHammingWeight(245, 120, 1290)); // 12\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 72,
        "likes": 871
    },
    {
        "id": "40",
        "title": "Missing Number",
        "slug": "missing-number",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array. Could you implement a solution",
        "examples": [
            {
                "input": "findMissingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])",
                "output": "8",
                "explanation": "Based on code execution"
            },
            {
                "input": "findMissingNumber([0])",
                "output": "1",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "n == nums.length",
            "1 <= n <= 10 ^ 4",
            "0 <= nums[i] <= n",
            "All the numbers of nums are unique."
        ],
        "hints": [],
        "solution": "// Given an array nums containing n distinct numbers\n// in the range [0, n], return the only number in the range\n// that is missing from the array. Could you implement a solution\n// using only O(1) extra space complexity and O(n) runtime complexity?\n\n// Constraints:\n// n == nums.length\n// 1 <= n <= 10 ^ 4\n// 0 <= nums[i] <= n\n// All the numbers of nums are unique.\n\nconst findMissingNumber = (nums) => {\n  let missingNumber = nums.length;\n\n  for (let i = 0; i < nums.length; i++) {\n    // Uses the fact that n ^ n will be 0\n    // So we XOR every number twice (as a number in nums and as an index)\n    // except the missing number (we XOR it only once as an index)\n    missingNumber ^= (i ^ nums[i]);\n  }\n\n  return missingNumber;\n};\n\nconsole.log(findMissingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8\nconsole.log(findMissingNumber([0])); // 1\n",
        "starterCode": {
            "javascript": "// Missing Number\n// Bit Manipulation\n\n// Given an array nums containing n distinct numbers\n// in the range [0, n], return the only number in the range\n// that is missing from the array. Could you implement a solution\n// using only O(1) extra space complexity and O(n) runtime complexity?\n\n// Constraints:\n// n == nums.length\n// 1 <= n <= 10 ^ 4\n// 0 <= nums[i] <= n\n// All the numbers of nums are unique.\n\nconst findMissingNumber = (nums) => {\n  let missingNumber = nums.length;\n\n  for (let i = 0; i < nums.length; i++) {\n    // Uses the fact that n ^ n will be 0\n    // So we XOR every number twice (as a number in nums and as an index)\n    // except the missing number (we XOR it only once as an index)\n    missingNumber ^= (i ^ nums[i]);\n  }\n\n  return missingNumber;\n};\n\nconsole.log(findMissingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8\nconsole.log(findMissingNumber([0])); // 1\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 58,
        "likes": 123
    },
    {
        "id": "41",
        "title": "Number Complement",
        "slug": "number-complement",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given a positive integer num, output its complement number. The complement strategy is to flip the bits of its binary representation.",
        "examples": [
            {
                "input": "findComplement(100)",
                "output": "27",
                "explanation": "Based on code execution"
            },
            {
                "input": "findComplement(967)",
                "output": "56",
                "explanation": "Based on code execution"
            },
            {
                "input": "findComplement(1)",
                "output": "0",
                "explanation": "Based on code execution"
            },
            {
                "input": "findComplementXOR(100)",
                "output": "27",
                "explanation": "Based on code execution"
            },
            {
                "input": "findComplementXOR(967)",
                "output": "56",
                "explanation": "Based on code execution"
            },
            {
                "input": "findComplementXOR(1)",
                "output": "0",
                "explanation": "Based on code execution"
            },
            {
                "input": "findComplementIterative(100)",
                "output": "27",
                "explanation": "Based on code execution"
            },
            {
                "input": "findComplementIterative(967)",
                "output": "56",
                "explanation": "Based on code execution"
            },
            {
                "input": "findComplementIterative(1)",
                "output": "0",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "The given integer num is guaranteed to fit within the range of a 32-bit signed integer.",
            "num >= 1",
            "You could assume no leading zero bit in the integer’s binary representation."
        ],
        "hints": [],
        "solution": "// Given a positive integer num, output its complement number.\n// The complement strategy is to flip the bits of its binary representation.\n\n// Constraints:\n// The given integer num is guaranteed to fit within the range of a 32-bit signed integer.\n// num >= 1\n// You could assume no leading zero bit in the integer’s binary representation.\n\nconst findComplement = (num) => {\n  // For example 100 --> 27:\n  // 100 =                              00000000000000000000000001100100\n  // mostSignificantBit =               00000000000000000000000001000000\n  // mostSignificantBit - 1 =           00000000000000000000000000111111\n  // ~num                               11111111111111111111111110011011\n  // ~num & (mostSignificantBit - 1) =  00000000000000000000000000011011\n  const mostSignificantBit = 2 ** Math.floor(Math.log2(num));\n  return ~num & (mostSignificantBit - 1);\n};\n\nconsole.log(findComplement(100)); // 27\nconsole.log(findComplement(967)); // 56\nconsole.log(findComplement(1)); // 0\n\nconst findComplementXOR = (num) => {\n  // For example 100 --> 27:\n  // 100 =                                 00000000000000000000000001100100\n  // mostSignificantBit =                  00000000000000000000000001000000\n  // mostSignificantBit << 1 =             00000000000000000000000010000000\n  // (mostSignificantBit << 1) - 1 =       00000000000000000000000001111111\n  // num ^ (mostSignificantBit << 1) - 1 = 00000000000000000000000000011011\n  const mostSignificantBit = 2 ** Math.floor(Math.log2(num));\n  return num ^ ((mostSignificantBit << 1) - 1);\n};\n\nconsole.log(findComplementXOR(100)); // 27\nconsole.log(findComplementXOR(967)); // 56\nconsole.log(findComplementXOR(1)); // 0\n\nconst findComplementIterative = (num) => {\n  // After while loop: i == ((mostSignificantBit << 1) - 1) from findComplementXOR\n  // For example 100 --> 27:\n  // 100 =     00000000000000000000000001100100\n  // i =       00000000000000000000000001111111\n  // num ^ i = 00000000000000000000000000011011\n  let i = 1;\n\n  while (i < num) {\n    i <<= 1;\n    i++;\n  }\n\n  return num ^ i;\n};\n\nconsole.log(findComplementIterative(100)); // 27\nconsole.log(findComplementIterative(967)); // 56\nconsole.log(findComplementIterative(1)); // 0\n",
        "starterCode": {
            "javascript": "// Number Complement\n// Bit Manipulation\n\n// Given a positive integer num, output its complement number.\n// The complement strategy is to flip the bits of its binary representation.\n\n// Constraints:\n// The given integer num is guaranteed to fit within the range of a 32-bit signed integer.\n// num >= 1\n// You could assume no leading zero bit in the integer’s binary representation.\n\nconst findComplement = (num) => {\n  // For example 100 --> 27:\n  // 100 =                              00000000000000000000000001100100\n  // mostSignificantBit =               00000000000000000000000001000000\n  // mostSignificantBit - 1 =           00000000000000000000000000111111\n  // ~num                               11111111111111111111111110011011\n  // ~num & (mostSignificantBit - 1) =  00000000000000000000000000011011\n  const mostSignificantBit = 2 ** Math.floor(Math.log2(num));\n  return ~num & (mostSignificantBit - 1);\n};\n\nconsole.log(findComplement(100)); // 27\nconsole.log(findComplement(967)); // 56\nconsole.log(findComplement(1)); // 0\n\nconst findComplementXOR = (num) => {\n  // For example 100 --> 27:\n  // 100 =                                 00000000000000000000000001100100\n  // mostSignificantBit =                  00000000000000000000000001000000\n  // mostSignificantBit << 1 =             00000000000000000000000010000000\n  // (mostSignificantBit << 1) - 1 =       00000000000000000000000001111111\n  // num ^ (mostSignificantBit << 1) - 1 = 00000000000000000000000000011011\n  const mostSignificantBit = 2 ** Math.floor(Math.log2(num));\n  return num ^ ((mostSignificantBit << 1) - 1);\n};\n\nconsole.log(findComplementXOR(100)); // 27\nconsole.log(findComplementXOR(967)); // 56\nconsole.log(findComplementXOR(1)); // 0\n\nconst findComplementIterative = (num) => {\n  // After while loop: i == ((mostSignificantBit << 1) - 1) from findComplementXOR\n  // For example 100 --> 27:\n  // 100 =     00000000000000000000000001100100\n  // i =       00000000000000000000000001111111\n  // num ^ i = 00000000000000000000000000011011\n  let i = 1;\n\n  while (i < num) {\n    i <<= 1;\n    i++;\n  }\n\n  return num ^ i;\n};\n\nconsole.log(findComplementIterative(100)); // 27\nconsole.log(findComplementIterative(967)); // 56\nconsole.log(findComplementIterative(1)); // 0\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 77,
        "likes": 193
    },
    {
        "id": "42",
        "title": "Number Of Steps To Reduce A Number In Binary Representation To One",
        "slug": "number-of-steps-to-reduce-a-number-in-binary-representation-to-one",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given a number s in their binary representation. Return the number of steps to reduce it to 1 under the following rules: 1. If the current number is even, you have to divide it by 2. 2. If the current number is odd, you have to add 1 to it. It's guaranteed that you can always reach to one for all testcases.",
        "examples": [
            {
                "input": "numSteps('110100011')",
                "output": "14",
                "explanation": "Based on code execution"
            },
            {
                "input": "numSteps('110100101010101111000110100100001111001010100010111010100101001010000011101')",
                "output": "115",
                "explanation": "Based on code execution"
            },
            {
                "input": "numStepsBigInt('110100011')",
                "output": "14",
                "explanation": "Based on code execution"
            },
            {
                "input": "numStepsBigInt('110100101010101111000110100100001111001010100010111010100101001010000011101')",
                "output": "115",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "1 <= s.length <= 500",
            "s consists of characters '0' or '1'",
            "s[0] == '1'"
        ],
        "hints": [],
        "solution": "// Given a number s in their binary representation.\n// Return the number of steps to reduce it to 1 under the following rules:\n// 1. If the current number is even, you have to divide it by 2.\n// 2. If the current number is odd, you have to add 1 to it.\n// It's guaranteed that you can always reach to one for all testcases.\n\n// Constraints:\n// 1 <= s.length <= 500\n// s consists of characters '0' or '1'\n// s[0] == '1'\n\nconst numSteps = (s) => {\n  if (!+s) throw new Error('The binary string does not have ones.');\n\n  let count = 0;\n  let prev = 0;\n\n  // We iterate over the binary string\n  // We start from the least significant bits\n  // We don't reduce the most significant bit\n  for (let i = s.length - 1; i > 0; i--) {\n    // We check if the current bit is 1 or 0 (s[i] ^ prev)\n    // taking into account that we could add 1 to the number to\n    // make it even on the previous iterations\n    // If the current bit is 1, that means that we have to add 1\n    // to make the number even, and we have to divide it by 2 in any case\n    // (s[i] ^ prev)            +             1\n    // For example, 110100011\n    // 110100011\n    //  11111110 prev\n    //  01011101 == 5 odd steps\n    //  11111111 == 8 even steps\n    // 8 even steps + 5 odd steps + 1 step from prev == 14 steps\n    count += (s[i] ^ prev) + 1;\n    // We store the current bit as a previous value for\n    // the next iteration taking into account carrying\n    // In fact, once we get prev == 1, we will never change it,\n    // because we will always need to carry 1\n    // (in case of the current bit == 0 we carry a new one\n    // we need to add, in case of the current bit == 1\n    // we carry the old one from the previous step)\n    prev |= s[i];\n  }\n\n  // We add prev in case there is a bit\n  // we are carrying from the previous step\n  return count + prev;\n};\n\nconsole.log(numSteps('110100011')); // 14\nconsole.log(numSteps('110100101010101111000110100100001111001010100010111010100101001010000011101')); // 115\n\nconst numStepsBigInt = (s) => {\n  if (!+s) throw new Error('The binary string does not have ones.');\n\n  let count = 0;\n  // We convert a binary string to a Big Int\n  let num = BigInt('0b' + s);\n\n  // While the number is not equal to 1\n  while (num !== 1n) {\n    // If the bit is set\n    if (num & 1n) {\n      // We need to add 1 to the number and divide it by 2\n      // So it will be two steps\n      count += 2;\n      // We add 1 to the number\n      num += 1n;\n    // If the bit is not set\n    } else {\n      // We just need to divide the number by 2\n      count++;\n    }\n    // We divide the number by 2\n    num >>= 1n;\n  }\n\n  return count;\n};\n\nconsole.log(numStepsBigInt('110100011')); // 14\nconsole.log(numStepsBigInt('110100101010101111000110100100001111001010100010111010100101001010000011101')); // 115\n",
        "starterCode": {
            "javascript": "// Number Of Steps To Reduce A Number In Binary Representation To One\n// Bit Manipulation\n\n// Given a number s in their binary representation.\n// Return the number of steps to reduce it to 1 under the following rules:\n// 1. If the current number is even, you have to divide it by 2.\n// 2. If the current number is odd, you have to add 1 to it.\n// It's guaranteed that you can always reach to one for all testcases.\n\n// Constraints:\n// 1 <= s.length <= 500\n// s consists of characters '0' or '1'\n// s[0] == '1'\n\nconst numSteps = (s) => {\n  if (!+s) throw new Error('The binary string does not have ones.');\n\n  let count = 0;\n  let prev = 0;\n\n  // We iterate over the binary string\n  // We start from the least significant bits\n  // We don't reduce the most significant bit\n  for (let i = s.length - 1; i > 0; i--) {\n    // We check if the current bit is 1 or 0 (s[i] ^ prev)\n    // taking into account that we could add 1 to the number to\n    // make it even on the previous iterations\n    // If the current bit is 1, that means that we have to add 1\n    // to make the number even, and we have to divide it by 2 in any case\n    // (s[i] ^ prev)            +             1\n    // For example, 110100011\n    // 110100011\n    //  11111110 prev\n    //  01011101 == 5 odd steps\n    //  11111111 == 8 even steps\n    // 8 even steps + 5 odd steps + 1 step from prev == 14 steps\n    count += (s[i] ^ prev) + 1;\n    // We store the current bit as a previous value for\n    // the next iteration taking into account carrying\n    // In fact, once we get prev == 1, we will never change it,\n    // because we will always need to carry 1\n    // (in case of the current bit == 0 we carry a new one\n    // we need to add, in case of the current bit == 1\n    // we carry the old one from the previous step)\n    prev |= s[i];\n  }\n\n  // We add prev in case there is a bit\n  // we are carrying from the previous step\n  return count + prev;\n};\n\nconsole.log(numSteps('110100011')); // 14\nconsole.log(numSteps('110100101010101111000110100100001111001010100010111010100101001010000011101')); // 115\n\nconst numStepsBigInt = (s) => {\n  if (!+s) throw new Error('The binary string does not have ones.');\n\n  let count = 0;\n  // We convert a binary string to a Big Int\n  let num = BigInt('0b' + s);\n\n  // While the number is not equal to 1\n  while (num !== 1n) {\n    // If the bit is set\n    if (num & 1n) {\n      // We need to add 1 to the number and divide it by 2\n      // So it will be two steps\n      count += 2;\n      // We add 1 to the number\n      num += 1n;\n    // If the bit is not set\n    } else {\n      // We just need to divide the number by 2\n      count++;\n    }\n    // We divide the number by 2\n    num >>= 1n;\n  }\n\n  return count;\n};\n\nconsole.log(numStepsBigInt('110100011')); // 14\nconsole.log(numStepsBigInt('110100101010101111000110100100001111001010100010111010100101001010000011101')); // 115\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 72,
        "likes": 709
    },
    {
        "id": "43",
        "title": "Number Of Steps To Reduce A Number To Zero",
        "slug": "number-of-steps-to-reduce-a-number-to-zero",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given a non-negative integer num, return the number of steps to reduce it to zero. If the current number is even, you have to divide it by 2, otherwise, you have to subtract 1 from it.",
        "examples": [
            {
                "input": "numberOfSteps(123)",
                "output": "12",
                "explanation": "Based on code execution"
            },
            {
                "input": "numberOfSteps(1000000)",
                "output": "26",
                "explanation": "Based on code execution"
            },
            {
                "input": "numberOfStepsImproved(123)",
                "output": "12",
                "explanation": "Based on code execution"
            },
            {
                "input": "numberOfStepsImproved(1000000)",
                "output": "26",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "0 <= num <= 10 ^ 6"
        ],
        "hints": [],
        "solution": "// Given a non-negative integer num, return the number of steps\n// to reduce it to zero. If the current number is even,\n// you have to divide it by 2, otherwise, you have to subtract 1 from it.\n\n// Constraints:\n// 0 <= num <= 10 ^ 6\n\nconst numberOfSteps = (num) => {\n  let count = 0;\n\n  while (num) {\n    // If the number is odd, subtract 1 from it\n    if (num & 1) num -= 1;\n    // If the number is even, divide it by 2\n    // The right shift by one is equivalent to dividing by 2\n    else num >>= 1;\n    count++;\n  }\n\n  return count;\n};\n\nconsole.log(numberOfSteps(123)); // 12\nconsole.log(numberOfSteps(1000000)); // 26\n\n// Reduces the number of iterations\nconst numberOfStepsImproved = (num) => {\n  if (!num) return num;\n\n  let count = 0;\n  while (num) {\n    // We reduce the number of iterations by combine two operation together\n    // If the number is odd, we need to subtract 1: + (num & 1) --> + 0 or 1\n    // Now the number is even, and we need to perform the right shift: + 1\n    count += (num & 1) + 1;\n    // And now we go to the next bit\n    num >>= 1;\n  }\n\n  // The last bit will always be 1, so the last right shift we perform\n  // is unnecessary. We can just subtract the number by 1 to reduce it to zero\n  // To fix our count we subtract 1\n  return count - 1;\n};\n\nconsole.log(numberOfStepsImproved(123)); // 12\nconsole.log(numberOfStepsImproved(1000000)); // 26\n",
        "starterCode": {
            "javascript": "// Number Of Steps To Reduce A Number To Zero\n// Bit Manipulation\n\n// Given a non-negative integer num, return the number of steps\n// to reduce it to zero. If the current number is even,\n// you have to divide it by 2, otherwise, you have to subtract 1 from it.\n\n// Constraints:\n// 0 <= num <= 10 ^ 6\n\nconst numberOfSteps = (num) => {\n  let count = 0;\n\n  while (num) {\n    // If the number is odd, subtract 1 from it\n    if (num & 1) num -= 1;\n    // If the number is even, divide it by 2\n    // The right shift by one is equivalent to dividing by 2\n    else num >>= 1;\n    count++;\n  }\n\n  return count;\n};\n\nconsole.log(numberOfSteps(123)); // 12\nconsole.log(numberOfSteps(1000000)); // 26\n\n// Reduces the number of iterations\nconst numberOfStepsImproved = (num) => {\n  if (!num) return num;\n\n  let count = 0;\n  while (num) {\n    // We reduce the number of iterations by combine two operation together\n    // If the number is odd, we need to subtract 1: + (num & 1) --> + 0 or 1\n    // Now the number is even, and we need to perform the right shift: + 1\n    count += (num & 1) + 1;\n    // And now we go to the next bit\n    num >>= 1;\n  }\n\n  // The last bit will always be 1, so the last right shift we perform\n  // is unnecessary. We can just subtract the number by 1 to reduce it to zero\n  // To fix our count we subtract 1\n  return count - 1;\n};\n\nconsole.log(numberOfStepsImproved(123)); // 12\nconsole.log(numberOfStepsImproved(1000000)); // 26\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 64,
        "likes": 805
    },
    {
        "id": "44",
        "title": "Power Of Four",
        "slug": "power-of-four",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given an integer n, return true if it is a power of four. Otherwise, return false. An integer n is a power of four, if there exists an integer x such that n == 4 ^ x. Could you solve it without loops/recursion?",
        "examples": [
            {
                "input": "isPowerOfFour(1024)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "isPowerOfFour(2048)",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "isPowerOfFour(-16)",
                "output": "false",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "-2 ^ 31 <= n <= 2 ^ 31 - 1"
        ],
        "hints": [],
        "solution": "// Given an integer n, return true if it is a power of four.\n// Otherwise, return false. An integer n is a power of four,\n// if there exists an integer x such that n == 4 ^ x.\n// Could you solve it without loops/recursion?\n\n// Constraints:\n// -2 ^ 31 <= n <= 2 ^ 31 - 1\n\nconst isPowerOfFour = (n) => {\n  if (n <= 0) return false;\n  // The left part checks if n is a power of two\n  // The right part checks if n is also a power of four\n  // 0x55555555 - 01010101010101010101010101010101\n  return !(n & (n - 1)) && !!(0x55555555 & n);\n};\n\nconsole.log(isPowerOfFour(1024)); // true\nconsole.log(isPowerOfFour(2048)); // false\nconsole.log(isPowerOfFour(-16)); // false\n",
        "starterCode": {
            "javascript": "// Power Of Four\n// Bit Manipulation\n\n// Given an integer n, return true if it is a power of four.\n// Otherwise, return false. An integer n is a power of four,\n// if there exists an integer x such that n == 4 ^ x.\n// Could you solve it without loops/recursion?\n\n// Constraints:\n// -2 ^ 31 <= n <= 2 ^ 31 - 1\n\nconst isPowerOfFour = (n) => {\n  if (n <= 0) return false;\n  // The left part checks if n is a power of two\n  // The right part checks if n is also a power of four\n  // 0x55555555 - 01010101010101010101010101010101\n  return !(n & (n - 1)) && !!(0x55555555 & n);\n};\n\nconsole.log(isPowerOfFour(1024)); // true\nconsole.log(isPowerOfFour(2048)); // false\nconsole.log(isPowerOfFour(-16)); // false\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 59,
        "likes": 487
    },
    {
        "id": "45",
        "title": "Power Of Two",
        "slug": "power-of-two",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given an integer n, return true if it is a power of two. Otherwise, return false. An integer n is a power of two, if there exists an integer x such that n == 2 ^ x. Could you solve it without loops/recursion?",
        "examples": [
            {
                "input": "isPowerOfTwo(1024)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "isPowerOfTwo(127)",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "isPowerOfTwo(-100)",
                "output": "false",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "-2 ^ 31 <= n <= 2 ^ 31 - 1"
        ],
        "hints": [],
        "solution": "// Given an integer n, return true if it is a power of two.\n// Otherwise, return false. An integer n is a power of two,\n// if there exists an integer x such that n == 2 ^ x.\n// Could you solve it without loops/recursion?\n\n// Constraints:\n// -2 ^ 31 <= n <= 2 ^ 31 - 1\n\nconst isPowerOfTwo = (n) => {\n  if (n <= 0) return false;\n  // A power of two has only one bit set in their binary representation\n  // So, if n is a power of two, n & (n - 1) will be 0\n  return !(n & (n - 1));\n};\n\nconsole.log(isPowerOfTwo(1024)); // true\nconsole.log(isPowerOfTwo(127)); // false\nconsole.log(isPowerOfTwo(-100)); // false\n",
        "starterCode": {
            "javascript": "// Power Of Two\n// Bit Manipulation\n\n// Given an integer n, return true if it is a power of two.\n// Otherwise, return false. An integer n is a power of two,\n// if there exists an integer x such that n == 2 ^ x.\n// Could you solve it without loops/recursion?\n\n// Constraints:\n// -2 ^ 31 <= n <= 2 ^ 31 - 1\n\nconst isPowerOfTwo = (n) => {\n  if (n <= 0) return false;\n  // A power of two has only one bit set in their binary representation\n  // So, if n is a power of two, n & (n - 1) will be 0\n  return !(n & (n - 1));\n};\n\nconsole.log(isPowerOfTwo(1024)); // true\nconsole.log(isPowerOfTwo(127)); // false\nconsole.log(isPowerOfTwo(-100)); // false\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 84,
        "likes": 534
    },
    {
        "id": "46",
        "title": "Prime Number Of Set Bits In Binary Representation",
        "slug": "prime-number-of-set-bits-in-binary-representation",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given two integers L and R, find the count of numbers in the range [L, R] (inclusive) having a prime number of set bits in their binary representation. (Recall that the number of set bits an integer has is the number of 1s present when written in binary. For example, 21 written in binary is 10101 which has 3 set bits. Also, 1 is not a prime.)",
        "examples": [
            {
                "input": "countPrimeSetBits(842, 888)",
                "output": "23",
                "explanation": "Based on code execution"
            },
            {
                "input": "countPrimeSetBits(1, 100000000)",
                "output": "33601854",
                "explanation": "Based on code execution"
            },
            {
                "input": "countPrimeSetBitsMemoization(842, 888)",
                "output": "23",
                "explanation": "Based on code execution"
            },
            {
                "input": "countPrimeSetBitsMemoization(1, 100000000)",
                "output": "33601854",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Given two integers L and R, find the count of numbers in the range [L, R]\n// (inclusive) having a prime number of set bits in their binary representation.\n// (Recall that the number of set bits an integer has is the number of 1s\n// present when written in binary. For example, 21 written in binary is 10101\n// which has 3 set bits. Also, 1 is not a prime.)\n\n// Note:\n// L, R will be integers L <= R in the range [1, 10 ^ 6].\n// R - L will be at most 10000.\n\nconst isPrime = (n) => {\n  for (let i = 3; i * i <= n; i += 2) {\n    if (!(n % i)) return false;\n  }\n\n  return true;\n};\n\n// hamming weight\nconst countBits = (n) => {\n  let count = 0;\n\n  while (n !== 0) {\n    n &= (n - 1);\n    count++;\n  }\n\n  return count;\n};\n\nconst countPrimeSetBits = (l, r) => {\n  // We find all the prime numbers from 1 to 31\n  // (We could find the prime numbers only from 1 to 20\n  // because of constrain: L, R will be integers L <= R in the range [1, 10 ^ 6])\n  const primes = new Set([2]);\n  for (let num = 3; num < 32; num += 2) {\n    if (isPrime(num)) primes.add(num);\n  }\n\n  let count = 0;\n\n  for (let num = l; num <= r; num++) {\n    // If the number of bits is a prime number, we increase count by one\n    if (primes.has(countBits(num))) count++;\n  }\n\n  return count;\n};\n\nconsole.time('countPrimeSetBits');\nconsole.log(countPrimeSetBits(842, 888)); // 23\nconsole.log(countPrimeSetBits(1, 100000000)); // 33601854\nconsole.timeEnd('countPrimeSetBits');\n\n// Attempt to improve countPrimeSetBits by memoization\n// But it doesn't work\n// countPrimeSetBitsMemoization is two-three times slower than countPrimeSetBits\n// It works in Python though\nconst countPrimeSetBitsMemoization = (l, r) => {\n  // We find all the prime numbers from 1 to 31\n  // (We could find the prime numbers only from 1 to 20\n  // because of constrain: L, R will be integers L <= R in the range [1, 10 ^ 6])\n  const primes = new Set([2]);\n  for (let num = 3; num < 32; num += 2) {\n    if (isPrime(num)) primes.add(num);\n  }\n\n  // We use memoization in order to reduce the number of countBits calls\n  // If we know how many bits num & (num - 1) has, we can just add 1 to this value\n  // to get the number of bits in num\n  const memo = {};\n  let count = 0;\n\n  for (let num = l; num <= r; num++) {\n    const memoKey = num & (num - 1);\n    if (memoKey in memo) memo[num] = memo[memoKey] + 1;\n    else memo[num] = countBits(num);\n\n    // If the number of bits is a prime number, we increase count by one\n    if (primes.has(memo[num])) count++;\n  }\n\n  return count;\n};\n\nconsole.time('countPrimeSetBitsMemoization');\nconsole.log(countPrimeSetBitsMemoization(842, 888)); // 23\nconsole.log(countPrimeSetBitsMemoization(1, 100000000)); // 33601854\nconsole.timeEnd('countPrimeSetBitsMemoization');\n",
        "starterCode": {
            "javascript": "// Prime Number Of Set Bits In Binary Representation\n// Bit Manipulation\n\n// Given two integers L and R, find the count of numbers in the range [L, R]\n// (inclusive) having a prime number of set bits in their binary representation.\n// (Recall that the number of set bits an integer has is the number of 1s\n// present when written in binary. For example, 21 written in binary is 10101\n// which has 3 set bits. Also, 1 is not a prime.)\n\n// Note:\n// L, R will be integers L <= R in the range [1, 10 ^ 6].\n// R - L will be at most 10000.\n\nconst isPrime = (n) => {\n  for (let i = 3; i * i <= n; i += 2) {\n    if (!(n % i)) return false;\n  }\n\n  return true;\n};\n\n// hamming weight\nconst countBits = (n) => {\n  let count = 0;\n\n  while (n !== 0) {\n    n &= (n - 1);\n    count++;\n  }\n\n  return count;\n};\n\nconst countPrimeSetBits = (l, r) => {\n  // We find all the prime numbers from 1 to 31\n  // (We could find the prime numbers only from 1 to 20\n  // because of constrain: L, R will be integers L <= R in the range [1, 10 ^ 6])\n  const primes = new Set([2]);\n  for (let num = 3; num < 32; num += 2) {\n    if (isPrime(num)) primes.add(num);\n  }\n\n  let count = 0;\n\n  for (let num = l; num <= r; num++) {\n    // If the number of bits is a prime number, we increase count by one\n    if (primes.has(countBits(num))) count++;\n  }\n\n  return count;\n};\n\nconsole.time('countPrimeSetBits');\nconsole.log(countPrimeSetBits(842, 888)); // 23\nconsole.log(countPrimeSetBits(1, 100000000)); // 33601854\nconsole.timeEnd('countPrimeSetBits');\n\n// Attempt to improve countPrimeSetBits by memoization\n// But it doesn't work\n// countPrimeSetBitsMemoization is two-three times slower than countPrimeSetBits\n// It works in Python though\nconst countPrimeSetBitsMemoization = (l, r) => {\n  // We find all the prime numbers from 1 to 31\n  // (We could find the prime numbers only from 1 to 20\n  // because of constrain: L, R will be integers L <= R in the range [1, 10 ^ 6])\n  const primes = new Set([2]);\n  for (let num = 3; num < 32; num += 2) {\n    if (isPrime(num)) primes.add(num);\n  }\n\n  // We use memoization in order to reduce the number of countBits calls\n  // If we know how many bits num & (num - 1) has, we can just add 1 to this value\n  // to get the number of bits in num\n  const memo = {};\n  let count = 0;\n\n  for (let num = l; num <= r; num++) {\n    const memoKey = num & (num - 1);\n    if (memoKey in memo) memo[num] = memo[memoKey] + 1;\n    else memo[num] = countBits(num);\n\n    // If the number of bits is a prime number, we increase count by one\n    if (primes.has(memo[num])) count++;\n  }\n\n  return count;\n};\n\nconsole.time('countPrimeSetBitsMemoization');\nconsole.log(countPrimeSetBitsMemoization(842, 888)); // 23\nconsole.log(countPrimeSetBitsMemoization(1, 100000000)); // 33601854\nconsole.timeEnd('countPrimeSetBitsMemoization');\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 86,
        "likes": 429
    },
    {
        "id": "47",
        "title": "Pseudo Palindromic Paths In A Binary Tree",
        "slug": "pseudo-palindromic-paths-in-a-binary-tree",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given a binary tree where node values are digits from 1 to 9. A path in the binary tree is said to be pseudo-palindromic if at least one permutation of the node values in the path is a palindrome. Return the number of pseudo-palindromic paths going from the root node to leaf nodes.",
        "examples": [
            {
                "input": "pseudoPalindromicPaths(getTree([2, 3, 1, 3, 1, null, 1]))",
                "output": "2",
                "explanation": "Based on code execution"
            },
            {
                "input": "pseudoPalindromicPaths(getTree([2, 1, 1, 1, 3, null, null, null, null, null, 1]))",
                "output": "1",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "The number of nodes in the tree is in the range [1, 10 ^ 5]",
            "1 <= Node.val <= 9"
        ],
        "hints": [],
        "solution": "// Given a binary tree where node values are digits from 1 to 9.\n// A path in the binary tree is said to be pseudo-palindromic\n// if at least one permutation of the node values in the path is a palindrome.\n// Return the number of pseudo-palindromic paths going from the root node to leaf nodes.\n\n// Constraints:\n// The number of nodes in the tree is in the range [1, 10 ^ 5]\n// 1 <= Node.val <= 9\n\nfunction TreeNode(val, left, right) {\n  this.val = (val === undefined ? 0 : val);\n  this.left = (left === undefined ? null : left);\n  this.right = (right === undefined ? null : right);\n}\n\nconst getTree = (arr) => {\n  if (!arr.length) throw new Error('Array is empty.');\n\n  const build = (node, index) => {\n    if (arr[index * 2 + 1] !== null && arr[index * 2 + 1] !== undefined) {\n      node.left = new TreeNode(arr[index * 2 + 1]);\n      build(node.left, index * 2 + 1);\n    }\n    if (arr[index * 2 + 2] !== null && arr[index * 2 + 2] !== undefined) {\n      node.right = new TreeNode(arr[index * 2 + 2]);\n      build(node.right, index * 2 + 2);\n    }\n  };\n\n  const root = new TreeNode(arr[0]);\n  build(root, 0);\n  return root;\n};\n\nconst pseudoPalindromicPaths = (root) => {\n  if (!root) return 0;\n  let count = 0;\n\n  // The idea is to use path as a bitmask to track\n  // how many digits in this branch have an odd frequency\n  // If there are more than one such digits, then the path\n  // is not pseudo-palindromic\n  // For example, [2, 3, 1, 3, 1, null, 1]\n  //          2\n  //        /   \\\n  //       3     1\n  //     /   \\    \\\n  //    3     1    1\n  // Possible paths:\n  // 2 -> 3 -> 3 --> 0100 -> 1100 -> 0100 --> pseudo-palindromic\n  // 2 -> 3 -> 1 --> 0100 -> 1100 -> 1110 --> not pseudo-palindromic\n  // 2 -> 1 -> 1 --> 0100 -> 0110 -> 0100 --> pseudo-palindromic\n  const dfs = (node, path = 0) => {\n    // We can use a 32-bit integer as a bitmask,\n    // because according to the constraints the values\n    // of nodes can be from 1 to 9\n    // The one means digit has an odd frequency\n    // The zero means digit has an even frequency\n    path ^= (1 << node.val);\n    // If the node doesn't have children, we can check the path\n    // If we don't have any odd digits or have only one\n    // the expression: path & (path - 1) will be 0\n    // as it flips the least-significant bit to 0\n    if (!node.left && !node.right) count += !(path & (path - 1));\n    // Otherwise, we keep constructing the path\n    if (node.left) dfs(node.left, path);\n    if (node.right) dfs(node.right, path);\n  };\n\n  dfs(root);\n  return count;\n};\n\nconsole.log(pseudoPalindromicPaths(getTree([2, 3, 1, 3, 1, null, 1]))); // 2\nconsole.log(pseudoPalindromicPaths(getTree([2, 1, 1, 1, 3, null, null, null, null, null, 1]))); // 1\n",
        "starterCode": {
            "javascript": "// Pseudo Palindromic Paths In A Binary Tree\n// Bit Manipulation\n\n// Given a binary tree where node values are digits from 1 to 9.\n// A path in the binary tree is said to be pseudo-palindromic\n// if at least one permutation of the node values in the path is a palindrome.\n// Return the number of pseudo-palindromic paths going from the root node to leaf nodes.\n\n// Constraints:\n// The number of nodes in the tree is in the range [1, 10 ^ 5]\n// 1 <= Node.val <= 9\n\nfunction TreeNode(val, left, right) {\n  this.val = (val === undefined ? 0 : val);\n  this.left = (left === undefined ? null : left);\n  this.right = (right === undefined ? null : right);\n}\n\nconst getTree = (arr) => {\n  if (!arr.length) throw new Error('Array is empty.');\n\n  const build = (node, index) => {\n    if (arr[index * 2 + 1] !== null && arr[index * 2 + 1] !== undefined) {\n      node.left = new TreeNode(arr[index * 2 + 1]);\n      build(node.left, index * 2 + 1);\n    }\n    if (arr[index * 2 + 2] !== null && arr[index * 2 + 2] !== undefined) {\n      node.right = new TreeNode(arr[index * 2 + 2]);\n      build(node.right, index * 2 + 2);\n    }\n  };\n\n  const root = new TreeNode(arr[0]);\n  build(root, 0);\n  return root;\n};\n\nconst pseudoPalindromicPaths = (root) => {\n  if (!root) return 0;\n  let count = 0;\n\n  // The idea is to use path as a bitmask to track\n  // how many digits in this branch have an odd frequency\n  // If there are more than one such digits, then the path\n  // is not pseudo-palindromic\n  // For example, [2, 3, 1, 3, 1, null, 1]\n  //          2\n  //        /   \\\n  //       3     1\n  //     /   \\    \\\n  //    3     1    1\n  // Possible paths:\n  // 2 -> 3 -> 3 --> 0100 -> 1100 -> 0100 --> pseudo-palindromic\n  // 2 -> 3 -> 1 --> 0100 -> 1100 -> 1110 --> not pseudo-palindromic\n  // 2 -> 1 -> 1 --> 0100 -> 0110 -> 0100 --> pseudo-palindromic\n  const dfs = (node, path = 0) => {\n    // We can use a 32-bit integer as a bitmask,\n    // because according to the constraints the values\n    // of nodes can be from 1 to 9\n    // The one means digit has an odd frequency\n    // The zero means digit has an even frequency\n    path ^= (1 << node.val);\n    // If the node doesn't have children, we can check the path\n    // If we don't have any odd digits or have only one\n    // the expression: path & (path - 1) will be 0\n    // as it flips the least-significant bit to 0\n    if (!node.left && !node.right) count += !(path & (path - 1));\n    // Otherwise, we keep constructing the path\n    if (node.left) dfs(node.left, path);\n    if (node.right) dfs(node.right, path);\n  };\n\n  dfs(root);\n  return count;\n};\n\nconsole.log(pseudoPalindromicPaths(getTree([2, 3, 1, 3, 1, null, 1]))); // 2\nconsole.log(pseudoPalindromicPaths(getTree([2, 1, 1, 1, 3, null, null, null, null, null, 1]))); // 1\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 73,
        "likes": 763
    },
    {
        "id": "48",
        "title": "Reverse Bits",
        "slug": "reverse-bits",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Reverse bits of a given 32 bits unsigned integer.",
        "examples": [
            {
                "input": "reverseBits(43261596)",
                "output": "964176192",
                "explanation": "Based on code execution"
            },
            {
                "input": "reverseBits(43261597)",
                "output": "3111659840",
                "explanation": "Based on code execution"
            },
            {
                "input": "reverseBits(4294967293)",
                "output": "3221225471",
                "explanation": "Based on code execution"
            },
            {
                "input": "'Start', n.toString(2)",
                "output": "Break the 32-bit into 2 blocks of 16 bits, and switch them",
                "explanation": "Based on code execution"
            },
            {
                "input": "'After 1th switch', (n >>> 0).toString(2)",
                "output": "0xff00ff00 - 11111111000000001111111100000000",
                "explanation": "Based on code execution"
            },
            {
                "input": "'After 2th switch', (n >>> 0).toString(2)",
                "output": "0xf0f0f0f0 - 11110000111100001111000011110000",
                "explanation": "Based on code execution"
            },
            {
                "input": "'After 3th switch', (n >>> 0).toString(2)",
                "output": "0xcccccccc - 11001100110011001100110011001100",
                "explanation": "Based on code execution"
            },
            {
                "input": "'After 4th switch', (n >>> 0).toString(2)",
                "output": "0xaaaaaaaa - 10101010101010101010101010101010",
                "explanation": "Based on code execution"
            },
            {
                "input": "'After 5th switch', (n >>> 0).toString(2)",
                "output": "Get unsigned integer",
                "explanation": "Based on code execution"
            },
            {
                "input": "reverseBitsDivideAndConquer(43261596)",
                "output": "964176192",
                "explanation": "Based on code execution"
            },
            {
                "input": "reverseBitsDivideAndConquer(43261597)",
                "output": "3111659840",
                "explanation": "Based on code execution"
            },
            {
                "input": "reverseBitsDivideAndConquer(4294967293)",
                "output": "3221225471",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Reverse bits of a given 32 bits unsigned integer.\n\n// Iterative approach\nconst reverseBits = function(n) {\n  let reversedNumber = 0;\n\n  for (let i = 31; i >= 0; i--) {\n    reversedNumber |= ((n & 1) << i);\n    n = n >> 1;\n  }\n\n  // Get unsigned integer\n  return reversedNumber >>> 0;\n};\n\nconsole.log(reverseBits(43261596)); // 964176192\n// 43261596 (00000010100101000001111010011100) --> 964176192 (00111001011110000010100101000000)\nconsole.log(reverseBits(43261597)); // 3111659840\n// 43261597 (00000010100101000001111010011101) --> 3111659840 (10111001011110000010100101000000)\nconsole.log(reverseBits(4294967293)); // 3221225471\n// 4294967293 (11111111111111111111111111111101) --> 3221225471 (10111111111111111111111111111111)\n\n// Divide and conquer approach\nconst reverseBitsDivideAndConquer = function(n) {\n  // console.log('Start', n.toString(2));\n\n  // Break the 32-bit into 2 blocks of 16 bits, and switch them\n  n = (n >>> 16) | (n << 16);\n  // console.log('After 1th switch', (n >>> 0).toString(2));\n\n  // 0xff00ff00 - 11111111000000001111111100000000\n  // 0x00ff00ff - 00000000111111110000000011111111\n  // Break the 32-bit into 4 blocks of 8 bits, and switch them\n  n = ((n & 0xff00ff00) >>> 8) | ((n & 0x00ff00ff) << 8);\n  // console.log('After 2th switch', (n >>> 0).toString(2));\n\n  // 0xf0f0f0f0 - 11110000111100001111000011110000\n  // 0x0f0f0f0f - 00001111000011110000111100001111\n  // Break the 32-bit into 8 blocks of 4 bits, and switch them\n  n = ((n & 0xf0f0f0f0) >>> 4) | ((n & 0x0f0f0f0f) << 4);\n  // console.log('After 3th switch', (n >>> 0).toString(2));\n\n  // 0xcccccccc - 11001100110011001100110011001100\n  // 0x33333333 - 00110011001100110011001100110011\n  // Break the 32-bit into 16 blocks of 2 bits, and switch them\n  n = ((n & 0xcccccccc) >>> 2) | ((n & 0x33333333) << 2);\n  // console.log('After 4th switch', (n >>> 0).toString(2));\n\n  // 0xaaaaaaaa - 10101010101010101010101010101010\n  // 0x55555555 - 01010101010101010101010101010101\n  // Break the 32-bit into 32 blocks of 1 bit, and switch them\n  n = ((n & 0xaaaaaaaa) >>> 1) | ((n & 0x55555555) << 1);\n  // console.log('After 5th switch', (n >>> 0).toString(2));\n\n  // Get unsigned integer\n  return n >>> 0;\n};\n\nconsole.log(reverseBitsDivideAndConquer(43261596)); // 964176192\n// 43261596 (00000010100101000001111010011100) --> 964176192 (00111001011110000010100101000000)\n// Start               00000010100101000001111010011100\n// After 1st switch    00011110100111000000001010010100\n// After 2th switch    10011100000111101001010000000010\n// After 3th switch    11001001111000010100100100100000\n// After 4th switch    00110110101101000001011010000000\n// After 5th switch    00111001011110000010100101000000\n\nconsole.log(reverseBitsDivideAndConquer(43261597)); // 3111659840\n// 43261597 (00000010100101000001111010011101) --> 3111659840 (10111001011110000010100101000000)\nconsole.log(reverseBitsDivideAndConquer(4294967293)); // 3221225471\n// 4294967293 (11111111111111111111111111111101) --> 3221225471 (10111111111111111111111111111111)\n",
        "starterCode": {
            "javascript": "// Reverse Bits\n// Bit Manipulation\n\n// Reverse bits of a given 32 bits unsigned integer.\n\n// Iterative approach\nconst reverseBits = function(n) {\n  let reversedNumber = 0;\n\n  for (let i = 31; i >= 0; i--) {\n    reversedNumber |= ((n & 1) << i);\n    n = n >> 1;\n  }\n\n  // Get unsigned integer\n  return reversedNumber >>> 0;\n};\n\nconsole.log(reverseBits(43261596)); // 964176192\n// 43261596 (00000010100101000001111010011100) --> 964176192 (00111001011110000010100101000000)\nconsole.log(reverseBits(43261597)); // 3111659840\n// 43261597 (00000010100101000001111010011101) --> 3111659840 (10111001011110000010100101000000)\nconsole.log(reverseBits(4294967293)); // 3221225471\n// 4294967293 (11111111111111111111111111111101) --> 3221225471 (10111111111111111111111111111111)\n\n// Divide and conquer approach\nconst reverseBitsDivideAndConquer = function(n) {\n  // console.log('Start', n.toString(2));\n\n  // Break the 32-bit into 2 blocks of 16 bits, and switch them\n  n = (n >>> 16) | (n << 16);\n  // console.log('After 1th switch', (n >>> 0).toString(2));\n\n  // 0xff00ff00 - 11111111000000001111111100000000\n  // 0x00ff00ff - 00000000111111110000000011111111\n  // Break the 32-bit into 4 blocks of 8 bits, and switch them\n  n = ((n & 0xff00ff00) >>> 8) | ((n & 0x00ff00ff) << 8);\n  // console.log('After 2th switch', (n >>> 0).toString(2));\n\n  // 0xf0f0f0f0 - 11110000111100001111000011110000\n  // 0x0f0f0f0f - 00001111000011110000111100001111\n  // Break the 32-bit into 8 blocks of 4 bits, and switch them\n  n = ((n & 0xf0f0f0f0) >>> 4) | ((n & 0x0f0f0f0f) << 4);\n  // console.log('After 3th switch', (n >>> 0).toString(2));\n\n  // 0xcccccccc - 11001100110011001100110011001100\n  // 0x33333333 - 00110011001100110011001100110011\n  // Break the 32-bit into 16 blocks of 2 bits, and switch them\n  n = ((n & 0xcccccccc) >>> 2) | ((n & 0x33333333) << 2);\n  // console.log('After 4th switch', (n >>> 0).toString(2));\n\n  // 0xaaaaaaaa - 10101010101010101010101010101010\n  // 0x55555555 - 01010101010101010101010101010101\n  // Break the 32-bit into 32 blocks of 1 bit, and switch them\n  n = ((n & 0xaaaaaaaa) >>> 1) | ((n & 0x55555555) << 1);\n  // console.log('After 5th switch', (n >>> 0).toString(2));\n\n  // Get unsigned integer\n  return n >>> 0;\n};\n\nconsole.log(reverseBitsDivideAndConquer(43261596)); // 964176192\n// 43261596 (00000010100101000001111010011100) --> 964176192 (00111001011110000010100101000000)\n// Start               00000010100101000001111010011100\n// After 1st switch    00011110100111000000001010010100\n// After 2th switch    10011100000111101001010000000010\n// After 3th switch    11001001111000010100100100100000\n// After 4th switch    00110110101101000001011010000000\n// After 5th switch    00111001011110000010100101000000\n\nconsole.log(reverseBitsDivideAndConquer(43261597)); // 3111659840\n// 43261597 (00000010100101000001111010011101) --> 3111659840 (10111001011110000010100101000000)\nconsole.log(reverseBitsDivideAndConquer(4294967293)); // 3221225471\n// 4294967293 (11111111111111111111111111111101) --> 3221225471 (10111111111111111111111111111111)\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 72,
        "likes": 651
    },
    {
        "id": "49",
        "title": "Single Number",
        "slug": "single-number",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. and without using extra memory?",
        "examples": [
            {
                "input": "singleNumber([4, 1, 2, 1, 2])",
                "output": "4",
                "explanation": "Based on code execution"
            },
            {
                "input": "singleNumber([-1, 10, 2, 7, 5, -100, 7, -100, -1, 5, 45, 11, 45, 10, 2])",
                "output": "11",
                "explanation": "Based on code execution"
            },
            {
                "input": "singleNumber([5])",
                "output": "5",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "1 <= nums.length <= 3  10 ^ 4",
            "-3  10 ^ 4 <= nums[i] <= 3  10 ^ 4",
            "Each element in the array appears twice except for one element",
            "which appears only once."
        ],
        "hints": [],
        "solution": "// Given a non-empty array of integers nums,\n// every element appears twice except for one. Find that single one.\n// Could you implement a solution with a linear runtime complexity\n// and without using extra memory?\n\n// Constraints:\n// 1 <= nums.length <= 3 * 10 ^ 4\n// -3 * 10 ^ 4 <= nums[i] <= 3 * 10 ^ 4\n// Each element in the array appears twice except for one element\n// which appears only once.\n\nconst singleNumber = (nums) => {\n  if (!nums.length) throw new Error('The array is empty');\n\n  // We use the fact that n ^ n will be 0\n  // We XOR all the numbers and get the single number as a result\n  return nums.reduce((singleNum, num) => singleNum ^ num, 0);\n};\n\nconsole.log(singleNumber([4, 1, 2, 1, 2])); // 4\nconsole.log(singleNumber([-1, 10, 2, 7, 5, -100, 7, -100, -1, 5, 45, 11, 45, 10, 2])); // 11\nconsole.log(singleNumber([5])); // 5\n",
        "starterCode": {
            "javascript": "// Single Number\n// Bit Manipulation\n\n// Given a non-empty array of integers nums,\n// every element appears twice except for one. Find that single one.\n// Could you implement a solution with a linear runtime complexity\n// and without using extra memory?\n\n// Constraints:\n// 1 <= nums.length <= 3 * 10 ^ 4\n// -3 * 10 ^ 4 <= nums[i] <= 3 * 10 ^ 4\n// Each element in the array appears twice except for one element\n// which appears only once.\n\nconst singleNumber = (nums) => {\n  if (!nums.length) throw new Error('The array is empty');\n\n  // We use the fact that n ^ n will be 0\n  // We XOR all the numbers and get the single number as a result\n  return nums.reduce((singleNum, num) => singleNum ^ num, 0);\n};\n\nconsole.log(singleNumber([4, 1, 2, 1, 2])); // 4\nconsole.log(singleNumber([-1, 10, 2, 7, 5, -100, 7, -100, -1, 5, 45, 11, 45, 10, 2])); // 11\nconsole.log(singleNumber([5])); // 5\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 59,
        "likes": 60
    },
    {
        "id": "50",
        "title": "Single NumberII",
        "slug": "single-numberII",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given an integer array nums where every element appears three times except for one, which appears exactly once. Find the single element and return it. Could you implement it without using extra memory?",
        "examples": [
            {
                "input": "findSingleNumber([0, 1, 0, 1, 0, 1, 99])",
                "output": "99",
                "explanation": "Based on code execution"
            },
            {
                "input": "findSingleNumber([-10, 2, 1, 6, 2, 1, 6, 2, 1, -10, 6, -8, -10])",
                "output": "-8",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "1 <= nums.length <= 3  10 ^ 4",
            "-2 ^ 31 <= nums[i] <= 2 ^ 31 - 1",
            "Each element in nums appears exactly three times except",
            "for one element which appears once."
        ],
        "hints": [],
        "solution": "// Given an integer array nums where every element appears\n// three times except for one, which appears exactly once.\n// Find the single element and return it.\n// Your algorithm should have a linear runtime complexity.\n// Could you implement it without using extra memory?\n\n// Constraints:\n// 1 <= nums.length <= 3 * 10 ^ 4\n// -2 ^ 31 <= nums[i] <= 2 ^ 31 - 1\n// Each element in nums appears exactly three times except\n// for one element which appears once.\n\nconst findSingleNumber = (nums) => {\n  if (!nums.length) throw new Error('The array is empty.');\n\n  let singleNumber = 0;\n  let mask = 1;\n\n  // We iterate over every bit\n  for (let i = 0; i < 32; i++) {\n    let count = 0;\n\n    // And we count how many numbers have this bit set to 1\n    for (const num of nums) {\n      count += num & mask;\n    }\n\n    // If the number of such numbers is not divisible by 3,\n    // it means the single number has this bit set to 1\n    if (count % 3) singleNumber |= mask;\n    mask <<= 1;\n  }\n\n  return singleNumber;\n};\n\nconsole.log(findSingleNumber([0, 1, 0, 1, 0, 1, 99])); // 99\nconsole.log(findSingleNumber([-10, 2, 1, 6, 2, 1, 6, 2, 1, -10, 6, -8, -10])); // -8\n",
        "starterCode": {
            "javascript": "// Single NumberII\n// Bit Manipulation\n\n// Given an integer array nums where every element appears\n// three times except for one, which appears exactly once.\n// Find the single element and return it.\n// Your algorithm should have a linear runtime complexity.\n// Could you implement it without using extra memory?\n\n// Constraints:\n// 1 <= nums.length <= 3 * 10 ^ 4\n// -2 ^ 31 <= nums[i] <= 2 ^ 31 - 1\n// Each element in nums appears exactly three times except\n// for one element which appears once.\n\nconst findSingleNumber = (nums) => {\n  if (!nums.length) throw new Error('The array is empty.');\n\n  let singleNumber = 0;\n  let mask = 1;\n\n  // We iterate over every bit\n  for (let i = 0; i < 32; i++) {\n    let count = 0;\n\n    // And we count how many numbers have this bit set to 1\n    for (const num of nums) {\n      count += num & mask;\n    }\n\n    // If the number of such numbers is not divisible by 3,\n    // it means the single number has this bit set to 1\n    if (count % 3) singleNumber |= mask;\n    mask <<= 1;\n  }\n\n  return singleNumber;\n};\n\nconsole.log(findSingleNumber([0, 1, 0, 1, 0, 1, 99])); // 99\nconsole.log(findSingleNumber([-10, 2, 1, 6, 2, 1, 6, 2, 1, -10, 6, -8, -10])); // -8\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 70,
        "likes": 919
    },
    {
        "id": "51",
        "title": "Single NumberIII",
        "slug": "single-numberIII",
        "difficulty": "Easy",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given an integer array nums, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in any order.",
        "examples": [
            {
                "input": "singleNumber([1, 2, 1, 3, 2, 5])",
                "output": "[3, 5]",
                "explanation": "Based on code execution"
            },
            {
                "input": "singleNumber([1, 5, -1, 10, 2, 1, 3, 2, 5, 10])",
                "output": "[-1, 3]",
                "explanation": "Based on code execution"
            },
            {
                "input": "singleNumber([-1, 0])",
                "output": "[-1, 0]",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "2 <= nums.length <= 3  10 ^ 4",
            "-2 ^ 31 <= nums[i] <= 2 ^ 31 - 1",
            "Each integer in nums will appear twice, only two integers will appear once."
        ],
        "hints": [],
        "solution": "// Given an integer array nums, in which exactly two elements appear\n// only once and all the other elements appear exactly twice.\n// Find the two elements that appear only once.\n// You can return the answer in any order.\n// Your algorithm should run in linear runtime complexity.\n// Could you implement it using only constant space complexity?\n\n// Constraints:\n// 2 <= nums.length <= 3 * 10 ^ 4\n// -2 ^ 31 <= nums[i] <= 2 ^ 31 - 1\n// Each integer in nums will appear twice, only two integers will appear once.\n\nconst singleNumber = (nums) => {\n  let xor = 0;\n  // We use the fact that n ^ n will be 0\n  // We XOR all the numbers and get the XOR of two single numbers as a result\n  // For example [1, 2, 1, 3, 2, 5] - [001, 010, 001, 011, 010, 101]\n  // XOR of all the numbers will be 110 == 011 ^ 101\n  for (const num of nums) {\n    xor ^= num;\n  }\n\n  // Now we have to find the way to separate these two single numbers\n  // We know, that in order to be set in xor the bit has to be set\n  // only in one of the single numbers. So we can use this fact.\n  // We can take any bit in xor set to 1 as a mask\n  // to divide all the numbers in the array into two groups:\n  // one that has this bit set, another that doesn't\n  // It is easy to take the least significant bit set to 1: xor & -xor\n  // In our example: the mask will be 010\n  const mask = xor & -xor;\n  let first = 0;\n\n  // So we check all the numbers and if they have this bit set\n  // we XOR these numbers and get the first single number as a result\n  // We could also XOR all the number from the second group and\n  // get the second number: else second ^= num\n  // But knowing the first number and xor of two numbers\n  // we can just XOR the first number and xor to get the second number\n  // In our example:\n  // the first group - 010 ^ 011 ^ 010 == 011 - our first number\n  // the second group - 001 ^ 001 ^ 101 == 101 or 011 ^ 110 - our second number\n  for (const num of nums) {\n    if (num & mask) first ^= num;\n  }\n\n  return [first, first ^ xor];\n};\n\nconsole.log(singleNumber([1, 2, 1, 3, 2, 5])); // [3, 5]\nconsole.log(singleNumber([1, 5, -1, 10, 2, 1, 3, 2, 5, 10])); // [-1, 3]\nconsole.log(singleNumber([-1, 0])); // [-1, 0]\n",
        "starterCode": {
            "javascript": "// Single NumberIII\n// Bit Manipulation\n\n// Given an integer array nums, in which exactly two elements appear\n// only once and all the other elements appear exactly twice.\n// Find the two elements that appear only once.\n// You can return the answer in any order.\n// Your algorithm should run in linear runtime complexity.\n// Could you implement it using only constant space complexity?\n\n// Constraints:\n// 2 <= nums.length <= 3 * 10 ^ 4\n// -2 ^ 31 <= nums[i] <= 2 ^ 31 - 1\n// Each integer in nums will appear twice, only two integers will appear once.\n\nconst singleNumber = (nums) => {\n  let xor = 0;\n  // We use the fact that n ^ n will be 0\n  // We XOR all the numbers and get the XOR of two single numbers as a result\n  // For example [1, 2, 1, 3, 2, 5] - [001, 010, 001, 011, 010, 101]\n  // XOR of all the numbers will be 110 == 011 ^ 101\n  for (const num of nums) {\n    xor ^= num;\n  }\n\n  // Now we have to find the way to separate these two single numbers\n  // We know, that in order to be set in xor the bit has to be set\n  // only in one of the single numbers. So we can use this fact.\n  // We can take any bit in xor set to 1 as a mask\n  // to divide all the numbers in the array into two groups:\n  // one that has this bit set, another that doesn't\n  // It is easy to take the least significant bit set to 1: xor & -xor\n  // In our example: the mask will be 010\n  const mask = xor & -xor;\n  let first = 0;\n\n  // So we check all the numbers and if they have this bit set\n  // we XOR these numbers and get the first single number as a result\n  // We could also XOR all the number from the second group and\n  // get the second number: else second ^= num\n  // But knowing the first number and xor of two numbers\n  // we can just XOR the first number and xor to get the second number\n  // In our example:\n  // the first group - 010 ^ 011 ^ 010 == 011 - our first number\n  // the second group - 001 ^ 001 ^ 101 == 101 or 011 ^ 110 - our second number\n  for (const num of nums) {\n    if (num & mask) first ^= num;\n  }\n\n  return [first, first ^ xor];\n};\n\nconsole.log(singleNumber([1, 2, 1, 3, 2, 5])); // [3, 5]\nconsole.log(singleNumber([1, 5, -1, 10, 2, 1, 3, 2, 5, 10])); // [-1, 3]\nconsole.log(singleNumber([-1, 0])); // [-1, 0]\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 86,
        "likes": 644
    },
    {
        "id": "52",
        "title": "Sort Integers By The Number Of 1 Bits",
        "slug": "sort-integers-by-the-number-of-1-bits",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given an integer array arr. You have to sort the integers in the array in ascending order by the number of 1's in their binary representation and in case of two or more integers have the same number of 1's you have to sort them in ascending order. Return the sorted array.",
        "examples": [
            {
                "input": "sortByBits([0, 1, 2, 3, 4, 5, 6, 7, 8])",
                "output": "[0, 1, 2, 4, 8, 3, 5, 6, 7]",
                "explanation": "Based on code execution"
            },
            {
                "input": "sortByBits([1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1])",
                "output": "[1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "1 <= arr.length <= 500",
            "0 <= arr[i] <= 10 ^ 4"
        ],
        "hints": [],
        "solution": "// Given an integer array arr. You have to sort the integers in the array\n// in ascending order by the number of 1's in their binary representation\n// and in case of two or more integers have the same number of 1's\n// you have to sort them in ascending order. Return the sorted array.\n\n// Constraints:\n// 1 <= arr.length <= 500\n// 0 <= arr[i] <= 10 ^ 4\n\n// hamming weight\nconst countBits = (n) => {\n  let count = 0;\n\n  while (n !== 0) {\n    n &= (n - 1);\n    count++;\n  }\n\n  return count;\n};\n\nconst sortByBits = function(arr) {\n  return arr.sort((a, b) => countBits(a) - countBits(b) || a - b);\n};\n\nconsole.log(sortByBits([0, 1, 2, 3, 4, 5, 6, 7, 8])); // [0, 1, 2, 4, 8, 3, 5, 6, 7]\nconsole.log(sortByBits([1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]));\n// [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]\n",
        "starterCode": {
            "javascript": "// Sort Integers By The Number Of 1 Bits\n// Bit Manipulation\n\n// Given an integer array arr. You have to sort the integers in the array\n// in ascending order by the number of 1's in their binary representation\n// and in case of two or more integers have the same number of 1's\n// you have to sort them in ascending order. Return the sorted array.\n\n// Constraints:\n// 1 <= arr.length <= 500\n// 0 <= arr[i] <= 10 ^ 4\n\n// hamming weight\nconst countBits = (n) => {\n  let count = 0;\n\n  while (n !== 0) {\n    n &= (n - 1);\n    count++;\n  }\n\n  return count;\n};\n\nconst sortByBits = function(arr) {\n  return arr.sort((a, b) => countBits(a) - countBits(b) || a - b);\n};\n\nconsole.log(sortByBits([0, 1, 2, 3, 4, 5, 6, 7, 8])); // [0, 1, 2, 4, 8, 3, 5, 6, 7]\nconsole.log(sortByBits([1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]));\n// [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 57,
        "likes": 386
    },
    {
        "id": "53",
        "title": "Subsets",
        "slug": "subsets",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.",
        "examples": [
            {
                "input": "findSubsets([1, 2, 3])",
                "output": "[[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]];",
                "explanation": "Based on code execution"
            },
            {
                "input": "findSubsets([1, 2, 3, 4])",
                "output": "[[], [4], [3], [3, 4], [2], [2, 4], [2, 3], [2, 3, 4], [1], [1, 4], [1, 3], [1, 3, 4], [1, 2],",
                "explanation": "Based on code execution"
            },
            {
                "input": "findSubsetsIterative([1, 2, 3])",
                "output": "[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]];",
                "explanation": "Based on code execution"
            },
            {
                "input": "findSubsetsIterative([1, 2, 3, 4])",
                "output": "[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3], [4], [1, 4], [2, 4], [1, 2, 4], [3, 4],",
                "explanation": "Based on code execution"
            },
            {
                "input": "findSubsetsRecursive([1, 2, 3])",
                "output": "[[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]];",
                "explanation": "Based on code execution"
            },
            {
                "input": "findSubsetsRecursive([1, 2, 3, 4])",
                "output": "// [[], [1], [2], [3], [4], [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4], [1, 2, 3], [1, 2, 4],",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "1 <= nums.length <= 10",
            "-10 <= nums[i] <= 10",
            "All the numbers of nums are unique."
        ],
        "hints": [],
        "solution": "// Given an integer array nums of unique elements,\n// return all possible subsets (the power set).\n// The solution set must not contain duplicate subsets.\n// Return the solution in any order.\n\n// Constraints:\n// 1 <= nums.length <= 10\n// -10 <= nums[i] <= 10\n// All the numbers of nums are unique.\n\nconst findSubsets = function(nums) {\n  const subsets = [];\n\n  // We use i as a bitmask\n  // Every iteration we add 1 to i and get a new bitmask\n  // For example for [1, 2, 3]:\n  // Bitmasks will be 000 001 010 011 100 101 110 111\n  // We stop when i == (1 << nums.length) --> i == 1000 (or 111 + 1)\n  for (let i = 0; i < (1 << nums.length); i++) {\n    const subset = [];\n    // For every bitmask we go through each bit\n    // And if the bit is set, we add the corresponding item to the subset\n    // In our example bitmask 000 means, that there are no items in the subset\n    // 001 --> [3], 010 --> [2], 011 --> [2, 3], 100 --> [1], 101 --> [1, 3]\n    // 110 --> [1, 2], 111 --> [1, 2, 3]\n    for (let j = nums.length - 1; j >= 0; j--) {\n      // For example, if bitmask == 110 --> [1, 2]\n      // We check 110 & 100 == 100 - it means we add 1 to the subset\n      // 110 & 010 == 010 - it means we add 2 to the sunset\n      // 110 & 001 == 000 - it means we don't add 3 to the subset\n      if (i & (1 << j)) subset.push(nums[nums.length - j - 1]);\n    }\n\n    subsets.push(subset);\n  }\n\n  return subsets;\n};\n\nconsole.log(findSubsets([1, 2, 3])); // [[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]];\nconsole.log(findSubsets([1, 2, 3, 4]));\n// [[], [4], [3], [3, 4], [2], [2, 4], [2, 3], [2, 3, 4], [1], [1, 4], [1, 3], [1, 3, 4], [1, 2],\n// [1, 2, 4], [1, 2, 3], [1, 2, 3, 4]];\n\n// Iterative version\nconst findSubsetsIterative = (nums) => {\n  // We start from the empty subset\n  const subsets = [[]];\n\n  // We take each number in nums\n  for (const num of nums) {\n    const subset = [];\n\n    // And we get new subsets by adding this number to every subset in the collection\n    // For example [1, 2, 3]:\n    // Start - [[]]\n    // We take 1 --> [] + 1 --> [1] --> [[], [1]]\n    // We take 2 --> [] + 2 --> [2], [1] + 2 --> [1, 2] --> [[], [1], [2], [1, 2]]\n    // We take 3 --> [] + 3 --> [3], [1] + 3 --> [1, 3], [2] + 3 --> [2, 3], [1, 2] + 3 --> [1, 2, 3]\n    // --> [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]\n    for (const item of subsets) {\n      subset.push([...item, num]);\n    }\n\n    subsets.push(...subset);\n  }\n\n  return subsets;\n};\n\nconsole.log(findSubsetsIterative([1, 2, 3])); // [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]];\nconsole.log(findSubsetsIterative([1, 2, 3, 4]));\n// [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3], [4], [1, 4], [2, 4], [1, 2, 4], [3, 4],\n// [1, 3, 4], [2, 3, 4], [1, 2, 3, 4]];\n\n// Recursive version\nconst findSubsetsRecursive = (nums) => {\n  const subsets = [];\n\n  const getSubset = (len, start = 0, subset = []) => {\n    // If we reach the desired length of the subset, we add the subset to the collection\n    if (subset.length === len) return subsets.push([...subset]);\n\n    // Otherwise, we get new subsets by adding to the current subset\n    // every possible number that is not in the subset yet\n    // For example [1, 2, 3]:\n    // Call with len == 0, doesn't make additional calls and\n    // adds empty array to the collection --> [[]]\n    // Call with len == 1, makes three additional calls [] -> [1], [] -> [2], [] -> [3]\n    // and add the produced subsets to the collection --> [[], [1], [2], [3]]\n    // Call with len == 2, makes three additional calls, and each of these calls\n    // makes or tries to make additional calls:\n    // So we have the following chains:\n    // [] --> [1] --> [1, 2],\n    //            --> [1, 3],\n    //    --> [2] --> [2, 3],\n    //    --> [3] --> this chain doesn't produce the result\n    // Call with len == 3:\n    // [] --> [1] --> [1, 2] --> [1, 2, 3],\n    //            --> [1, 3] --> this chain doesn't produce the result,\n    //    --> [2] --> [2, 3] --> this chain doesn't produce the result,\n    //    --> [3] --> this chain doesn't produce the result,\n    for (let i = start; i < nums.length; i++) {\n      getSubset(len, i + 1, [...subset, nums[i]]);\n    }\n  };\n\n  // For every possible length of subset we call getSubset\n  for (let i = 0; i <= nums.length; i++) {\n    getSubset(i);\n  }\n\n  return subsets;\n};\n\nconsole.log(findSubsetsRecursive([1, 2, 3])); // [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]];\nconsole.log(findSubsetsRecursive([1, 2, 3, 4]));\n// // [[], [1], [2], [3], [4], [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4], [1, 2, 3], [1, 2, 4],\n// // [1, 3, 4], [2, 3, 4], [1, 2, 3, 4]];\n",
        "starterCode": {
            "javascript": "// Subsets\n// Bit Manipulation\n\n// Given an integer array nums of unique elements,\n// return all possible subsets (the power set).\n// The solution set must not contain duplicate subsets.\n// Return the solution in any order.\n\n// Constraints:\n// 1 <= nums.length <= 10\n// -10 <= nums[i] <= 10\n// All the numbers of nums are unique.\n\nconst findSubsets = function(nums) {\n  const subsets = [];\n\n  // We use i as a bitmask\n  // Every iteration we add 1 to i and get a new bitmask\n  // For example for [1, 2, 3]:\n  // Bitmasks will be 000 001 010 011 100 101 110 111\n  // We stop when i == (1 << nums.length) --> i == 1000 (or 111 + 1)\n  for (let i = 0; i < (1 << nums.length); i++) {\n    const subset = [];\n    // For every bitmask we go through each bit\n    // And if the bit is set, we add the corresponding item to the subset\n    // In our example bitmask 000 means, that there are no items in the subset\n    // 001 --> [3], 010 --> [2], 011 --> [2, 3], 100 --> [1], 101 --> [1, 3]\n    // 110 --> [1, 2], 111 --> [1, 2, 3]\n    for (let j = nums.length - 1; j >= 0; j--) {\n      // For example, if bitmask == 110 --> [1, 2]\n      // We check 110 & 100 == 100 - it means we add 1 to the subset\n      // 110 & 010 == 010 - it means we add 2 to the sunset\n      // 110 & 001 == 000 - it means we don't add 3 to the subset\n      if (i & (1 << j)) subset.push(nums[nums.length - j - 1]);\n    }\n\n    subsets.push(subset);\n  }\n\n  return subsets;\n};\n\nconsole.log(findSubsets([1, 2, 3])); // [[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]];\nconsole.log(findSubsets([1, 2, 3, 4]));\n// [[], [4], [3], [3, 4], [2], [2, 4], [2, 3], [2, 3, 4], [1], [1, 4], [1, 3], [1, 3, 4], [1, 2],\n// [1, 2, 4], [1, 2, 3], [1, 2, 3, 4]];\n\n// Iterative version\nconst findSubsetsIterative = (nums) => {\n  // We start from the empty subset\n  const subsets = [[]];\n\n  // We take each number in nums\n  for (const num of nums) {\n    const subset = [];\n\n    // And we get new subsets by adding this number to every subset in the collection\n    // For example [1, 2, 3]:\n    // Start - [[]]\n    // We take 1 --> [] + 1 --> [1] --> [[], [1]]\n    // We take 2 --> [] + 2 --> [2], [1] + 2 --> [1, 2] --> [[], [1], [2], [1, 2]]\n    // We take 3 --> [] + 3 --> [3], [1] + 3 --> [1, 3], [2] + 3 --> [2, 3], [1, 2] + 3 --> [1, 2, 3]\n    // --> [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]\n    for (const item of subsets) {\n      subset.push([...item, num]);\n    }\n\n    subsets.push(...subset);\n  }\n\n  return subsets;\n};\n\nconsole.log(findSubsetsIterative([1, 2, 3])); // [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]];\nconsole.log(findSubsetsIterative([1, 2, 3, 4]));\n// [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3], [4], [1, 4], [2, 4], [1, 2, 4], [3, 4],\n// [1, 3, 4], [2, 3, 4], [1, 2, 3, 4]];\n\n// Recursive version\nconst findSubsetsRecursive = (nums) => {\n  const subsets = [];\n\n  const getSubset = (len, start = 0, subset = []) => {\n    // If we reach the desired length of the subset, we add the subset to the collection\n    if (subset.length === len) return subsets.push([...subset]);\n\n    // Otherwise, we get new subsets by adding to the current subset\n    // every possible number that is not in the subset yet\n    // For example [1, 2, 3]:\n    // Call with len == 0, doesn't make additional calls and\n    // adds empty array to the collection --> [[]]\n    // Call with len == 1, makes three additional calls [] -> [1], [] -> [2], [] -> [3]\n    // and add the produced subsets to the collection --> [[], [1], [2], [3]]\n    // Call with len == 2, makes three additional calls, and each of these calls\n    // makes or tries to make additional calls:\n    // So we have the following chains:\n    // [] --> [1] --> [1, 2],\n    //            --> [1, 3],\n    //    --> [2] --> [2, 3],\n    //    --> [3] --> this chain doesn't produce the result\n    // Call with len == 3:\n    // [] --> [1] --> [1, 2] --> [1, 2, 3],\n    //            --> [1, 3] --> this chain doesn't produce the result,\n    //    --> [2] --> [2, 3] --> this chain doesn't produce the result,\n    //    --> [3] --> this chain doesn't produce the result,\n    for (let i = start; i < nums.length; i++) {\n      getSubset(len, i + 1, [...subset, nums[i]]);\n    }\n  };\n\n  // For every possible length of subset we call getSubset\n  for (let i = 0; i <= nums.length; i++) {\n    getSubset(i);\n  }\n\n  return subsets;\n};\n\nconsole.log(findSubsetsRecursive([1, 2, 3])); // [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]];\nconsole.log(findSubsetsRecursive([1, 2, 3, 4]));\n// // [[], [1], [2], [3], [4], [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4], [1, 2, 3], [1, 2, 4],\n// // [1, 3, 4], [2, 3, 4], [1, 2, 3, 4]];\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 67,
        "likes": 415
    },
    {
        "id": "54",
        "title": "Sum Of Two Integers",
        "slug": "sum-of-two-integers",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given two integers a and b, return the sum of the two integers without using the operators + and -.",
        "examples": [
            {
                "input": "getSum(1487, 2444)",
                "output": "3931",
                "explanation": "Based on code execution"
            },
            {
                "input": "getSum(20, -59)",
                "output": "-39",
                "explanation": "Based on code execution"
            },
            {
                "input": "getSum(20, 0)",
                "output": "20",
                "explanation": "Based on code execution"
            },
            {
                "input": "getSumRecursive(1487, 2444)",
                "output": "3931",
                "explanation": "Based on code execution"
            },
            {
                "input": "getSumRecursive(20, -59)",
                "output": "-39",
                "explanation": "Based on code execution"
            },
            {
                "input": "getSumRecursive(20, 0)",
                "output": "20",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "-1000 <= a, b <= 1000"
        ],
        "hints": [],
        "solution": "// Given two integers a and b, return the sum\n// of the two integers without using the operators + and -.\n\n// Constraints:\n// -1000 <= a, b <= 1000\n\nconst getSum = (a, b) => {\n  // Adding numbers in binary representation works\n  // the same way as adding numbers in decimal representation\n  // For example, in decimal representation: 1487 + 2444\n  //   1 4 8 7\n  // + 2 4 4 4\n  //   3 9 3 1\n  //      1 1 - carry\n  // In binary representation: 010111001111 + 100110001100\n  //   0 1 0 1 1 1 0 0 1 1 1 1 - 1487\n  // + 1 0 0 1 1 0 0 0 1 1 0 0 - 2444\n  //   1 1 0 0 0 1 0 0 0 0 1 1 - without carrying (1487 ^ 2444)\n  //        1 1       1 1      - carry\n  //   1 1 1 1 0 1 0 1 1 0 1 1 - 3931 with carrying\n\n  // While we have bits to add\n  while (b) {\n    // We find a carry\n    // In our example:\n    // 1 iteration: carry == 010111001111 & 100110001100 == 000110001100\n    // 2 iteration: carry == 110001000011 & 001100011000 == 000000000000\n    const carry = a & b;\n\n    // We find all the bits that don't need to be carried\n    // (the sum without carrying) and we keep our sum in the variable a\n    // In our example:\n    // 1 iteration: a ^ b == 010111001111 ^ 100110001100 == 110001000011\n    // 2 iteration: a ^ b == 110001000011 ^ 001100011000 == 111101011011\n    a = a ^ b;\n\n    // We left shift the carry by one in order to add the carried bits\n    // to the a on the next iteration\n    // In our example:\n    // 1 iteration: carry << 1 == 000110001100 << 1 == 001100011000\n    // 2 iteration: carry << 1 == 000000000000 << 1 == 000000000000\n    b = carry << 1;\n  }\n\n  // When we are succeeded in adding all the carried bits,\n  // we return the result\n  return a;\n};\n\nconsole.log(getSum(1487, 2444)); // 3931\nconsole.log(getSum(20, -59)); // -39\nconsole.log(getSum(20, 0)); // 20\n\n// Recursive version\nconst getSumRecursive = (a, b) => {\n  if (b === 0) return a;\n  return getSum(a ^ b, (a & b) << 1);\n};\n\nconsole.log(getSumRecursive(1487, 2444)); // 3931\nconsole.log(getSumRecursive(20, -59)); // -39\nconsole.log(getSumRecursive(20, 0)); // 20\n",
        "starterCode": {
            "javascript": "// Sum Of Two Integers\n// Bit Manipulation\n\n// Given two integers a and b, return the sum\n// of the two integers without using the operators + and -.\n\n// Constraints:\n// -1000 <= a, b <= 1000\n\nconst getSum = (a, b) => {\n  // Adding numbers in binary representation works\n  // the same way as adding numbers in decimal representation\n  // For example, in decimal representation: 1487 + 2444\n  //   1 4 8 7\n  // + 2 4 4 4\n  //   3 9 3 1\n  //      1 1 - carry\n  // In binary representation: 010111001111 + 100110001100\n  //   0 1 0 1 1 1 0 0 1 1 1 1 - 1487\n  // + 1 0 0 1 1 0 0 0 1 1 0 0 - 2444\n  //   1 1 0 0 0 1 0 0 0 0 1 1 - without carrying (1487 ^ 2444)\n  //        1 1       1 1      - carry\n  //   1 1 1 1 0 1 0 1 1 0 1 1 - 3931 with carrying\n\n  // While we have bits to add\n  while (b) {\n    // We find a carry\n    // In our example:\n    // 1 iteration: carry == 010111001111 & 100110001100 == 000110001100\n    // 2 iteration: carry == 110001000011 & 001100011000 == 000000000000\n    const carry = a & b;\n\n    // We find all the bits that don't need to be carried\n    // (the sum without carrying) and we keep our sum in the variable a\n    // In our example:\n    // 1 iteration: a ^ b == 010111001111 ^ 100110001100 == 110001000011\n    // 2 iteration: a ^ b == 110001000011 ^ 001100011000 == 111101011011\n    a = a ^ b;\n\n    // We left shift the carry by one in order to add the carried bits\n    // to the a on the next iteration\n    // In our example:\n    // 1 iteration: carry << 1 == 000110001100 << 1 == 001100011000\n    // 2 iteration: carry << 1 == 000000000000 << 1 == 000000000000\n    b = carry << 1;\n  }\n\n  // When we are succeeded in adding all the carried bits,\n  // we return the result\n  return a;\n};\n\nconsole.log(getSum(1487, 2444)); // 3931\nconsole.log(getSum(20, -59)); // -39\nconsole.log(getSum(20, 0)); // 20\n\n// Recursive version\nconst getSumRecursive = (a, b) => {\n  if (b === 0) return a;\n  return getSum(a ^ b, (a & b) << 1);\n};\n\nconsole.log(getSumRecursive(1487, 2444)); // 3931\nconsole.log(getSumRecursive(20, -59)); // -39\nconsole.log(getSumRecursive(20, 0)); // 20\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 52,
        "likes": 853
    },
    {
        "id": "55",
        "title": "Total Hamming Distance",
        "slug": "total-hamming-distance",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "The Hamming distance between two integers is the number of positions at which the corresponding bits are different. Now your job is to find the total Hamming distance between all pairs of the given numbers.",
        "examples": [
            {
                "input": "findTotalHammingDistance([4, 14, 2])",
                "output": "6",
                "explanation": "Based on code execution"
            },
            {
                "input": "findTotalHammingDistance([10, 49, 37, 0, 107, 45, 675])",
                "output": "78",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// The Hamming distance between two integers is the number\n// of positions at which the corresponding bits are different.\n// Now your job is to find the total Hamming distance between\n// all pairs of the given numbers.\n\n// Note:\n// Elements of the given array are in the range of 0 to 10 ^ 9\n// Length of the array will not exceed 10 ^ 4.\n\nconst findTotalHammingDistance = (nums) => {\n  let mask = 1;\n  let totalHammingDistance = 0;\n\n  // We iterate over every bit\n  for (let i = 0; i <= 31; i++) {\n    let ones = 0;\n    let zeros = 0;\n\n    // For every number in the array we check if the bit is set\n    for (const num of nums) {\n      const bit = num & mask;\n      // We count how many numbers have the bit set\n      ones += (bit !== 0);\n      // and how many don't\n      zeros += (bit === 0);\n    }\n\n    // We count how many possible combinations of the numbers there can be\n    // For example: [4, 14, 2]\n    // 0100 (4)\n    // 1110 (14)\n    // 0010 (2)\n    // 1220 ones\n    // 2113 zeros\n    // 2220 == 6 - totalHammingDistance\n    // The third bit: we can have two combinations of the numbers\n    // where the bits are different --> 4 and 14, 14 and 2\n    // The second bit: 4 and 2, 14 and 2\n    // The first bit: 4 and 14, 4 and 2\n    // The zeroth bit: we don't have any combinations\n    totalHammingDistance += ones * zeros;\n    mask = mask << 1;\n  }\n\n  return totalHammingDistance;\n};\n\nconsole.log(findTotalHammingDistance([4, 14, 2])); // 6\nconsole.log(findTotalHammingDistance([10, 49, 37, 0, 107, 45, 675])); // 78\n",
        "starterCode": {
            "javascript": "// Total Hamming Distance\n// Bit Manipulation\n\n// The Hamming distance between two integers is the number\n// of positions at which the corresponding bits are different.\n// Now your job is to find the total Hamming distance between\n// all pairs of the given numbers.\n\n// Note:\n// Elements of the given array are in the range of 0 to 10 ^ 9\n// Length of the array will not exceed 10 ^ 4.\n\nconst findTotalHammingDistance = (nums) => {\n  let mask = 1;\n  let totalHammingDistance = 0;\n\n  // We iterate over every bit\n  for (let i = 0; i <= 31; i++) {\n    let ones = 0;\n    let zeros = 0;\n\n    // For every number in the array we check if the bit is set\n    for (const num of nums) {\n      const bit = num & mask;\n      // We count how many numbers have the bit set\n      ones += (bit !== 0);\n      // and how many don't\n      zeros += (bit === 0);\n    }\n\n    // We count how many possible combinations of the numbers there can be\n    // For example: [4, 14, 2]\n    // 0100 (4)\n    // 1110 (14)\n    // 0010 (2)\n    // 1220 ones\n    // 2113 zeros\n    // 2220 == 6 - totalHammingDistance\n    // The third bit: we can have two combinations of the numbers\n    // where the bits are different --> 4 and 14, 14 and 2\n    // The second bit: 4 and 2, 14 and 2\n    // The first bit: 4 and 14, 4 and 2\n    // The zeroth bit: we don't have any combinations\n    totalHammingDistance += ones * zeros;\n    mask = mask << 1;\n  }\n\n  return totalHammingDistance;\n};\n\nconsole.log(findTotalHammingDistance([4, 14, 2])); // 6\nconsole.log(findTotalHammingDistance([10, 49, 37, 0, 107, 45, 675])); // 78\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 89,
        "likes": 114
    },
    {
        "id": "56",
        "title": "XOR Operation In An Array",
        "slug": "XOR-operation-in-an-array",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given an integer n and an integer start. Define an array nums where nums[i] = start + 2*i (0-indexed) and n == nums.length. Return the bitwise XOR of all elements of nums.",
        "examples": [
            {
                "input": "xorOperation(4, 3)",
                "output": "8",
                "explanation": "Based on code execution"
            },
            {
                "input": "xorOperation(100, 6)",
                "output": "200",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "1 <= n <= 1000",
            "0 <= start <= 1000",
            "n == nums.length"
        ],
        "hints": [],
        "solution": "// Given an integer n and an integer start.\n// Define an array nums where nums[i] = start + 2*i (0-indexed) and n == nums.length.\n// Return the bitwise XOR of all elements of nums.\n\n// Constraints:\n// 1 <= n <= 1000\n// 0 <= start <= 1000\n// n == nums.length\n\nconst xorOperation = (n, start) => {\n  let xor = 0;\n\n  for (let i = 0; i < n; i++) {\n    const num = start + 2 * i;\n    xor ^= num;\n  }\n\n  return xor;\n};\n\nconsole.log(xorOperation(4, 3)); // 8\nconsole.log(xorOperation(100, 6)); // 200\n",
        "starterCode": {
            "javascript": "// XOR Operation In An Array\n// Bit Manipulation\n\n// Given an integer n and an integer start.\n// Define an array nums where nums[i] = start + 2*i (0-indexed) and n == nums.length.\n// Return the bitwise XOR of all elements of nums.\n\n// Constraints:\n// 1 <= n <= 1000\n// 0 <= start <= 1000\n// n == nums.length\n\nconst xorOperation = (n, start) => {\n  let xor = 0;\n\n  for (let i = 0; i < n; i++) {\n    const num = start + 2 * i;\n    xor ^= num;\n  }\n\n  return xor;\n};\n\nconsole.log(xorOperation(4, 3)); // 8\nconsole.log(xorOperation(100, 6)); // 200\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 66,
        "likes": 312
    },
    {
        "id": "57",
        "title": "XOR Queries Of A Subarray",
        "slug": "XOR-queries-of-a-subarray",
        "difficulty": "Medium",
        "topics": [
            "Bit Manipulation"
        ],
        "description": "Given the array arr of positive integers and the array queries where queries[i] = [Li, Ri], for each query i compute the XOR of elements from Li to Ri (that is, arr[Li] xor arr[Li+1] xor ... xor arr[Ri] ). Return an array containing the result for the given queries.",
        "examples": [
            {
                "input": "xorQueries([1, 3, 4, 8], [[0, 1], [1, 2], [0, 3], [3, 3]])",
                "output": "[2, 7, 14, 8]",
                "explanation": "Based on code execution"
            },
            {
                "input": "xorQueries([4, 8, 2, 10], [[2, 3], [1, 3], [0, 0], [0, 3]])",
                "output": "[8, 0, 4, 4];",
                "explanation": "Based on code execution"
            },
            {
                "input": "xorQueriesSegmentTree([1, 3, 4, 8], [[0, 1], [1, 2], [0, 3], [3, 3]])",
                "output": "[2, 7, 14, 8]",
                "explanation": "Based on code execution"
            },
            {
                "input": "xorQueriesSegmentTree([4, 8, 2, 10], [[2, 3], [1, 3], [0, 0], [0, 3]])",
                "output": "[8, 0, 4, 4];",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "1 <= arr.length <= 3  10 ^ 4",
            "1 <= arr[i] <= 10 ^ 9",
            "1 <= queries.length <= 3  10 ^ 4",
            "queries[i].length == 2",
            "0 <= queries[i][0] <= queries[i][1] < arr.length"
        ],
        "hints": [],
        "solution": "// Given the array arr of positive integers and the array queries where\n// queries[i] = [Li, Ri], for each query i compute the XOR of elements\n// from Li to Ri (that is, arr[Li] xor arr[Li+1] xor ... xor arr[Ri] ).\n// Return an array containing the result for the given queries.\n\n// Constraints:\n// 1 <= arr.length <= 3 * 10 ^ 4\n// 1 <= arr[i] <= 10 ^ 9\n// 1 <= queries.length <= 3 * 10 ^ 4\n// queries[i].length == 2\n// 0 <= queries[i][0] <= queries[i][1] < arr.length\n\n// The idea is to reduce time complexity from O(N * Q) to O(N + Q)\n// by calculating XOR prefix for every number in the array\nconst xorQueries = (arr, queries) => {\n  const xorPrefixes = { '-1': 0 };\n  const queriesResults = [];\n\n  // We iterate over every number in the array\n  for (let i = 0; i < arr.length; i++) {\n    // We accumulate the result of the XOR operations\n    // for numbers (adding number by number)\n    xorPrefixes[i] = xorPrefixes[i - 1] ^ arr[i];\n  }\n\n  // Now we can compute the XOR of elements in the range\n  // by xoring two prefixes from xorPrefixes that correspond to\n  // the element preceding the leftmost element\n  // and the rightmost element of the subarray\n  // We use the fact that n ^ n will be 0\n  // For example arr == [1, 3, 4, 8] and we want to find the XOR of range [2, 3]:\n  // xorPrefixes of range [0, 3] ^ xorPrefixes of range [0, 1] ==\n  // 1 ^ 3 ^ 4 ^ 8 ^ 1 ^ 3 == 4 ^ 8\n  // Full example: arr == [1, 3, 4, 8], queries == [[0, 1], [1, 2], [0, 3], [3, 3]]\n  // start --> xorPrefixes == {'-1': 0}\n  // xorPrefixes[-1] ^ arr[0] == 0 ^ 1 == 1 --> {'-1': 0, '0': 1}\n  // xorPrefixes[0] ^ arr[1] == 1 ^ 3 == 2 --> {'-1': 0, '0': 1, '1': 2}\n  // xorPrefixes[1] ^ arr[2] == 2 ^ 4 == 6 --> {'-1': 0, '0': 1, '1': 2, '2': 6}\n  // xorPrefixes[2] ^ arr[3] == 6 ^ 8 == 14 --> {'-1': 0, '0': 1, '1': 2, '2': 6, '3': 14}\n  // Queries:\n  // [0, 1] --> xorPrefixes[0 - 1] ^ xorPrefixes[1] == 0 ^ 2 == 2\n  // [1, 2] --> xorPrefixes[1 - 1] ^ xorPrefixes[2] == 1 ^ 6 == 7\n  // [0, 3] --> xorPrefixes[0 - 1] ^ xorPrefixes[3] == 0 ^ 14 == 14\n  // [3, 3] --> xorPrefixes[3 - 1] ^ xorPrefixes[3] == 6 ^ 14 == 8\n  // the result == [2, 7, 14, 8]\n  for (const query of queries) {\n    queriesResults.push(xorPrefixes[query[0] - 1] ^ xorPrefixes[query[1]]);\n  }\n\n  return queriesResults;\n};\n\nconsole.log(xorQueries([1, 3, 4, 8], [[0, 1], [1, 2], [0, 3], [3, 3]])); // [2, 7, 14, 8]\nconsole.log(xorQueries([4, 8, 2, 10], [[2, 3], [1, 3], [0, 0], [0, 3]])); // [8, 0, 4, 4];\n\n// Segment Tree\n// Time Complexity to build a segment tree O(N)\n// Time Complexity for every query O(log N)\n// Total Time Complexity O(N + Q * log N)\n// We build a segment tree of an array such that array elements are\n// leaves and internal nodes store XOR of leaves covered under them.\nclass SegmentTree {\n  constructor(arr) {\n    this.arr = arr;\n    this.arrLength = arr.length;\n    // Segment tree is represented as an array\n    this.values = [];\n    this.construct();\n  }\n\n  // Gets the middle index\n  getMiddle(left, right) {\n    return Math.floor(left + (right - left) / 2);\n  };\n\n  // Constructs a segment tree\n  // We recursively go through an array and build the tree that\n  // stores the XOR of its elements\n  // We start building the tree from the root (currentIdx == 0)\n  // The leaf nodes are the elements of the array\n  // The internal nodes stores the XOR of their subtrees\n  // For example, [1, 3, 4, 8], our tree will look like:\n  //       14\n  //     /    \\\n  //   2      12\n  //  / \\     / \\\n  // 1   3   4   8\n  // The array representation of our tree will be [14, 2, 12, 1, 3, 4, 8]\n  // We can find the children of the internal node:\n  // left child index = parent index * 2 + 1\n  // right child index = parent index * 2 + 2\n  construct(leftIdx = 0, rightIdx = this.arrLength - 1, currentIdx = 0) {\n    // We have a base case\n    // Our current array has only one element - a leaf node\n    // We add it to the tree\n    if (leftIdx === rightIdx) {\n      this.values[currentIdx] = this.arr[leftIdx];\n      return this.values[currentIdx];\n    }\n\n    // We divide our current array into two subarrays\n    // and recursively call construct method on them\n    // We xor the results of the calls and store the XOR in the tree\n    const middle = this.getMiddle(leftIdx, rightIdx);\n    this.values[currentIdx] = this.construct(leftIdx, middle, currentIdx * 2 + 1) ^\n        this.construct(middle + 1, rightIdx, currentIdx * 2 + 2);\n    return this.values[currentIdx];\n  }\n\n  // Recursively finds the XOR of the elements in the range\n  // We start from the root (currentIdx == 0)\n  // For example, [1, 3, 4, 8], our tree == [14, 2, 12, 1, 3, 4, 8], query == [1, 2]\n  //                             (leftIdx, rightIdx, currentIdx)\n  //                                         (0, 3, 0)\n  //                                    1 <= 0 && 2 >= 3 - false\n  //                                    1 > 4 || 2 < 0 - false\n  //                                   /                        \\\n  //                          (0, 1, 1)                          (2, 3, 2)\n  //                   1 <= 0 && 2 >= 1 - false                1 <= 2 && 2 >= 3 - false\n  //                   1 > 1 || 2 < 0 - false                  1 > 3 || 2 < 2 - false\n  //                   /                  \\                      /                 \\\n  //           (0, 0, 3)           (1, 1, 4)                 (2, 2, 5)        (3, 3, 6)\n  // 1 <= 0 && 2 >= 0 - false 1 <= 1 && 2 >= 1 - true 1 <= 2 && 2 >= 2 - true  1 <= 3 && 2 >= 3 - false\n  // 1 > 0 || 2 < 0 - true               |                        |            1 > 3 || 2 < 3 - true\n  //            |                        |                        |                   |\n  //        return 0                 return 3                  return 4           return 0\n  //\n  // XOR of the range == 0 ^ 3 ^ 4 ^ 0 == 7\n  _getXor(queryLeft, queryRight, leftIdx = 0, rightIdx = this.arrLength - 1, currentIdx = 0) {\n    // Our base cases\n    // We are within the query range\n    // The corresponding value of the tree array participates in the result\n    if (queryLeft <= leftIdx && queryRight >= rightIdx) return this.values[currentIdx];\n    // We are outside the query range\n    // The corresponding value of the tree array doesn't participate in the result\n    if (queryLeft > rightIdx || queryRight < leftIdx) return 0;\n\n    // We start from the root, check the conditions of our base cases\n    // If the conditions are false, we narrow the range in the tree\n    // by moving on to the root children, again check the conditions\n    // of our base cases and move on to their children and so on\n    // Then we xor the results we got from our base cases\n    const middle = this.getMiddle(leftIdx, rightIdx);\n    return this._getXor(queryLeft, queryRight, leftIdx, middle, 2 * currentIdx + 1) ^\n      this._getXor(queryLeft, queryRight, middle + 1, rightIdx, 2 * currentIdx + 2);\n  }\n\n  // Returns the XOR of the elements in the range\n  getXor(query) {\n    const [queryLeft, queryRight] = query;\n\n    // We check if the query is valid\n    if (queryLeft < 0 || queryRight >= this.arrLength || queryRight < queryLeft) {\n      throw new Error('Invalid query.');\n    }\n\n    return this._getXor(queryLeft, queryRight);\n  }\n}\n\nconst xorQueriesSegmentTree = (arr, queries) => {\n  const segmentTree = new SegmentTree(arr);\n  const queriesResults = [];\n\n  for (const query of queries) {\n    queriesResults.push(segmentTree.getXor(query));\n  }\n\n  return queriesResults;\n};\n\nconsole.log(xorQueriesSegmentTree([1, 3, 4, 8], [[0, 1], [1, 2], [0, 3], [3, 3]])); // [2, 7, 14, 8]\nconsole.log(xorQueriesSegmentTree([4, 8, 2, 10], [[2, 3], [1, 3], [0, 0], [0, 3]])); // [8, 0, 4, 4];\n",
        "starterCode": {
            "javascript": "// XOR Queries Of A Subarray\n// Bit Manipulation\n\n// Given the array arr of positive integers and the array queries where\n// queries[i] = [Li, Ri], for each query i compute the XOR of elements\n// from Li to Ri (that is, arr[Li] xor arr[Li+1] xor ... xor arr[Ri] ).\n// Return an array containing the result for the given queries.\n\n// Constraints:\n// 1 <= arr.length <= 3 * 10 ^ 4\n// 1 <= arr[i] <= 10 ^ 9\n// 1 <= queries.length <= 3 * 10 ^ 4\n// queries[i].length == 2\n// 0 <= queries[i][0] <= queries[i][1] < arr.length\n\n// The idea is to reduce time complexity from O(N * Q) to O(N + Q)\n// by calculating XOR prefix for every number in the array\nconst xorQueries = (arr, queries) => {\n  const xorPrefixes = { '-1': 0 };\n  const queriesResults = [];\n\n  // We iterate over every number in the array\n  for (let i = 0; i < arr.length; i++) {\n    // We accumulate the result of the XOR operations\n    // for numbers (adding number by number)\n    xorPrefixes[i] = xorPrefixes[i - 1] ^ arr[i];\n  }\n\n  // Now we can compute the XOR of elements in the range\n  // by xoring two prefixes from xorPrefixes that correspond to\n  // the element preceding the leftmost element\n  // and the rightmost element of the subarray\n  // We use the fact that n ^ n will be 0\n  // For example arr == [1, 3, 4, 8] and we want to find the XOR of range [2, 3]:\n  // xorPrefixes of range [0, 3] ^ xorPrefixes of range [0, 1] ==\n  // 1 ^ 3 ^ 4 ^ 8 ^ 1 ^ 3 == 4 ^ 8\n  // Full example: arr == [1, 3, 4, 8], queries == [[0, 1], [1, 2], [0, 3], [3, 3]]\n  // start --> xorPrefixes == {'-1': 0}\n  // xorPrefixes[-1] ^ arr[0] == 0 ^ 1 == 1 --> {'-1': 0, '0': 1}\n  // xorPrefixes[0] ^ arr[1] == 1 ^ 3 == 2 --> {'-1': 0, '0': 1, '1': 2}\n  // xorPrefixes[1] ^ arr[2] == 2 ^ 4 == 6 --> {'-1': 0, '0': 1, '1': 2, '2': 6}\n  // xorPrefixes[2] ^ arr[3] == 6 ^ 8 == 14 --> {'-1': 0, '0': 1, '1': 2, '2': 6, '3': 14}\n  // Queries:\n  // [0, 1] --> xorPrefixes[0 - 1] ^ xorPrefixes[1] == 0 ^ 2 == 2\n  // [1, 2] --> xorPrefixes[1 - 1] ^ xorPrefixes[2] == 1 ^ 6 == 7\n  // [0, 3] --> xorPrefixes[0 - 1] ^ xorPrefixes[3] == 0 ^ 14 == 14\n  // [3, 3] --> xorPrefixes[3 - 1] ^ xorPrefixes[3] == 6 ^ 14 == 8\n  // the result == [2, 7, 14, 8]\n  for (const query of queries) {\n    queriesResults.push(xorPrefixes[query[0] - 1] ^ xorPrefixes[query[1]]);\n  }\n\n  return queriesResults;\n};\n\nconsole.log(xorQueries([1, 3, 4, 8], [[0, 1], [1, 2], [0, 3], [3, 3]])); // [2, 7, 14, 8]\nconsole.log(xorQueries([4, 8, 2, 10], [[2, 3], [1, 3], [0, 0], [0, 3]])); // [8, 0, 4, 4];\n\n// Segment Tree\n// Time Complexity to build a segment tree O(N)\n// Time Complexity for every query O(log N)\n// Total Time Complexity O(N + Q * log N)\n// We build a segment tree of an array such that array elements are\n// leaves and internal nodes store XOR of leaves covered under them.\nclass SegmentTree {\n  constructor(arr) {\n    this.arr = arr;\n    this.arrLength = arr.length;\n    // Segment tree is represented as an array\n    this.values = [];\n    this.construct();\n  }\n\n  // Gets the middle index\n  getMiddle(left, right) {\n    return Math.floor(left + (right - left) / 2);\n  };\n\n  // Constructs a segment tree\n  // We recursively go through an array and build the tree that\n  // stores the XOR of its elements\n  // We start building the tree from the root (currentIdx == 0)\n  // The leaf nodes are the elements of the array\n  // The internal nodes stores the XOR of their subtrees\n  // For example, [1, 3, 4, 8], our tree will look like:\n  //       14\n  //     /    \\\n  //   2      12\n  //  / \\     / \\\n  // 1   3   4   8\n  // The array representation of our tree will be [14, 2, 12, 1, 3, 4, 8]\n  // We can find the children of the internal node:\n  // left child index = parent index * 2 + 1\n  // right child index = parent index * 2 + 2\n  construct(leftIdx = 0, rightIdx = this.arrLength - 1, currentIdx = 0) {\n    // We have a base case\n    // Our current array has only one element - a leaf node\n    // We add it to the tree\n    if (leftIdx === rightIdx) {\n      this.values[currentIdx] = this.arr[leftIdx];\n      return this.values[currentIdx];\n    }\n\n    // We divide our current array into two subarrays\n    // and recursively call construct method on them\n    // We xor the results of the calls and store the XOR in the tree\n    const middle = this.getMiddle(leftIdx, rightIdx);\n    this.values[currentIdx] = this.construct(leftIdx, middle, currentIdx * 2 + 1) ^\n        this.construct(middle + 1, rightIdx, currentIdx * 2 + 2);\n    return this.values[currentIdx];\n  }\n\n  // Recursively finds the XOR of the elements in the range\n  // We start from the root (currentIdx == 0)\n  // For example, [1, 3, 4, 8], our tree == [14, 2, 12, 1, 3, 4, 8], query == [1, 2]\n  //                             (leftIdx, rightIdx, currentIdx)\n  //                                         (0, 3, 0)\n  //                                    1 <= 0 && 2 >= 3 - false\n  //                                    1 > 4 || 2 < 0 - false\n  //                                   /                        \\\n  //                          (0, 1, 1)                          (2, 3, 2)\n  //                   1 <= 0 && 2 >= 1 - false                1 <= 2 && 2 >= 3 - false\n  //                   1 > 1 || 2 < 0 - false                  1 > 3 || 2 < 2 - false\n  //                   /                  \\                      /                 \\\n  //           (0, 0, 3)           (1, 1, 4)                 (2, 2, 5)        (3, 3, 6)\n  // 1 <= 0 && 2 >= 0 - false 1 <= 1 && 2 >= 1 - true 1 <= 2 && 2 >= 2 - true  1 <= 3 && 2 >= 3 - false\n  // 1 > 0 || 2 < 0 - true               |                        |            1 > 3 || 2 < 3 - true\n  //            |                        |                        |                   |\n  //        return 0                 return 3                  return 4           return 0\n  //\n  // XOR of the range == 0 ^ 3 ^ 4 ^ 0 == 7\n  _getXor(queryLeft, queryRight, leftIdx = 0, rightIdx = this.arrLength - 1, currentIdx = 0) {\n    // Our base cases\n    // We are within the query range\n    // The corresponding value of the tree array participates in the result\n    if (queryLeft <= leftIdx && queryRight >= rightIdx) return this.values[currentIdx];\n    // We are outside the query range\n    // The corresponding value of the tree array doesn't participate in the result\n    if (queryLeft > rightIdx || queryRight < leftIdx) return 0;\n\n    // We start from the root, check the conditions of our base cases\n    // If the conditions are false, we narrow the range in the tree\n    // by moving on to the root children, again check the conditions\n    // of our base cases and move on to their children and so on\n    // Then we xor the results we got from our base cases\n    const middle = this.getMiddle(leftIdx, rightIdx);\n    return this._getXor(queryLeft, queryRight, leftIdx, middle, 2 * currentIdx + 1) ^\n      this._getXor(queryLeft, queryRight, middle + 1, rightIdx, 2 * currentIdx + 2);\n  }\n\n  // Returns the XOR of the elements in the range\n  getXor(query) {\n    const [queryLeft, queryRight] = query;\n\n    // We check if the query is valid\n    if (queryLeft < 0 || queryRight >= this.arrLength || queryRight < queryLeft) {\n      throw new Error('Invalid query.');\n    }\n\n    return this._getXor(queryLeft, queryRight);\n  }\n}\n\nconst xorQueriesSegmentTree = (arr, queries) => {\n  const segmentTree = new SegmentTree(arr);\n  const queriesResults = [];\n\n  for (const query of queries) {\n    queriesResults.push(segmentTree.getXor(query));\n  }\n\n  return queriesResults;\n};\n\nconsole.log(xorQueriesSegmentTree([1, 3, 4, 8], [[0, 1], [1, 2], [0, 3], [3, 3]])); // [2, 7, 14, 8]\nconsole.log(xorQueriesSegmentTree([4, 8, 2, 10], [[2, 3], [1, 3], [0, 0], [0, 3]])); // [8, 0, 4, 4];\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 52,
        "likes": 816
    },
    {
        "id": "58",
        "title": "Coin Change",
        "slug": "coin-change",
        "difficulty": "Medium",
        "topics": [
            "Dynamic Programming"
        ],
        "description": "Write a function called coinChange which accepts two parameters: an array of denominations and a value. The function should return the number of ways you can obtain the value from the given collection of denominations. You can think of this as figuring out the number of ways to make change for a given value from a supply of coins. Use Dynamic Programming approach.",
        "examples": [
            {
                "input": "coinChangeBF([1, 5, 10, 25], 100)",
                "output": "242",
                "explanation": "Based on code execution"
            },
            {
                "input": "coinChangeTD([1, 5, 10, 25], 14511)",
                "output": "409222339",
                "explanation": "Based on code execution"
            },
            {
                "input": "coinChangeBU([1, 5, 10, 25], 14511)",
                "output": "409222339",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Write a function called coinChange which accepts two parameters:\n// an array of denominations and a value. The function should return the number\n// of ways you can obtain the value from the given collection of denominations.\n// You can think of this as figuring out the number of ways to make change\n// for a given value from a supply of coins.\n// Use Dynamic Programming approach.\n\n// Brute Force\n// Time Complexity exponential\n// Space Complexity O(1)\nfunction coinChangeBF(denominations, value) {\n  const index = denominations.length - 1;\n\n  function change(denominations, value, index) {\n    if (value < 0 || index < 0) return 0;\n    if (value === 0) return 1;\n\n    return change(denominations, value - denominations[index], index) +\n      change(denominations, value, index - 1);\n  }\n\n  return change(denominations, value, index);\n}\n\nconsole.log(coinChangeBF([1, 5, 10, 25], 100)); // 242\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\n// Time Complexity O(value * denominations.length)\n// Space Complexity O(value * denominations.length)\nfunction coinChangeTD(denominations, value) {\n  const index = denominations.length - 1;\n  const memo = {};\n\n  function change(denominations, value, index) {\n    if (value < 0 || index < 0) return 0;\n    if (value === 0) return 1;\n\n    const key = `${index}/${value}`;\n\n    if (memo[key]) return memo[key];\n\n    memo[key] = change(denominations, value - denominations[index], index) +\n      change(denominations, value, index - 1);\n\n    return memo[key];\n  }\n\n  return change(denominations, value, index);\n}\n\nconsole.log(coinChangeTD([1, 5, 10, 25], 14511)); // 409222339\n\n// Bottom-up approach - Tabulation\n// Time Complexity Complexity O(value * denominations.length)\n// Space Complexity O(value)\nfunction coinChangeBU(denominations, value) {\n  const table = Array.from({ length: value + 1 }).fill(0);\n  table[0] = 1;\n\n  for (let i = 0; i < denominations.length; i++) {\n    for (let j = denominations[i]; j <= value; j++) {\n      table[j] += table[j - denominations[i]];\n    }\n  }\n\n  return table[value];\n}\n\nconsole.log(coinChangeBU([1, 5, 10, 25], 14511)); // 409222339\n",
        "starterCode": {
            "javascript": "// Coin Change\n// Dynamic Programming\n\n// Write a function called coinChange which accepts two parameters:\n// an array of denominations and a value. The function should return the number\n// of ways you can obtain the value from the given collection of denominations.\n// You can think of this as figuring out the number of ways to make change\n// for a given value from a supply of coins.\n// Use Dynamic Programming approach.\n\n// Brute Force\n// Time Complexity exponential\n// Space Complexity O(1)\nfunction coinChangeBF(denominations, value) {\n  const index = denominations.length - 1;\n\n  function change(denominations, value, index) {\n    if (value < 0 || index < 0) return 0;\n    if (value === 0) return 1;\n\n    return change(denominations, value - denominations[index], index) +\n      change(denominations, value, index - 1);\n  }\n\n  return change(denominations, value, index);\n}\n\nconsole.log(coinChangeBF([1, 5, 10, 25], 100)); // 242\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\n// Time Complexity O(value * denominations.length)\n// Space Complexity O(value * denominations.length)\nfunction coinChangeTD(denominations, value) {\n  const index = denominations.length - 1;\n  const memo = {};\n\n  function change(denominations, value, index) {\n    if (value < 0 || index < 0) return 0;\n    if (value === 0) return 1;\n\n    const key = `${index}/${value}`;\n\n    if (memo[key]) return memo[key];\n\n    memo[key] = change(denominations, value - denominations[index], index) +\n      change(denominations, value, index - 1);\n\n    return memo[key];\n  }\n\n  return change(denominations, value, index);\n}\n\nconsole.log(coinChangeTD([1, 5, 10, 25], 14511)); // 409222339\n\n// Bottom-up approach - Tabulation\n// Time Complexity Complexity O(value * denominations.length)\n// Space Complexity O(value)\nfunction coinChangeBU(denominations, value) {\n  const table = Array.from({ length: value + 1 }).fill(0);\n  table[0] = 1;\n\n  for (let i = 0; i < denominations.length; i++) {\n    for (let j = denominations[i]; j <= value; j++) {\n      table[j] += table[j - denominations[i]];\n    }\n  }\n\n  return table[value];\n}\n\nconsole.log(coinChangeBU([1, 5, 10, 25], 14511)); // 409222339\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 73,
        "likes": 714
    },
    {
        "id": "59",
        "title": "Decode Ways",
        "slug": "decode-ways",
        "difficulty": "Medium",
        "topics": [
            "Dynamic Programming"
        ],
        "description": "A message containing letters from A-Z can be encoded into numbers using the following mapping: 'A' -> \"1\" 'B' -> \"2\" ... 'Z' -> \"26\" To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, \"11106\" can be mapped into: \"AAJF\" with the grouping (1 1 10 6) \"KJF\" with the grouping (11 10 6) Note that the grouping (1 11 06) is invalid because \"06\" cannot be mapped into 'F' since \"6\" is different from \"06\". Given a string s containing only digits, return the number of ways to decode it.",
        "examples": [
            {
                "input": "numDecodingBF('226')",
                "output": "3",
                "explanation": "Based on code execution"
            },
            {
                "input": "numDecodingBF('06')",
                "output": "0",
                "explanation": "Based on code execution"
            },
            {
                "input": "numDecodingBF('38475')",
                "output": "1",
                "explanation": "Based on code execution"
            },
            {
                "input": "numDecodingTD('226')",
                "output": "3",
                "explanation": "Based on code execution"
            },
            {
                "input": "numDecodingTD('06')",
                "output": "0",
                "explanation": "Based on code execution"
            },
            {
                "input": "numDecodingTD('38475')",
                "output": "1",
                "explanation": "Based on code execution"
            },
            {
                "input": "numDecodingTD('111111111111111111111111111111111111111111111')",
                "output": "1836311903",
                "explanation": "Based on code execution"
            },
            {
                "input": "numDecodingBU('226')",
                "output": "3",
                "explanation": "Based on code execution"
            },
            {
                "input": "numDecodingBU('06')",
                "output": "0",
                "explanation": "Based on code execution"
            },
            {
                "input": "numDecodingBU('38475')",
                "output": "1",
                "explanation": "Based on code execution"
            },
            {
                "input": "numDecodingBU('111111111111111111111111111111111111111111111')",
                "output": "1836311903",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// A message containing letters from A-Z can be encoded\n// into numbers using the following mapping:\n// 'A' -> \"1\"\n// 'B' -> \"2\"\n// ...\n// 'Z' -> \"26\"\n// To decode an encoded message, all the digits must be grouped\n// then mapped back into letters using the reverse of the mapping\n// above (there may be multiple ways). For example, \"11106\" can be mapped into:\n// \"AAJF\" with the grouping (1 1 10 6)\n// \"KJF\" with the grouping (11 10 6)\n// Note that the grouping (1 11 06) is invalid because \"06\"\n// cannot be mapped into 'F' since \"6\" is different from \"06\".\n// Given a string s containing only digits, return the number of ways to decode it.\n\n// Brute Force\n// Time Complexity O(2^n)\n// Space Complexity O(n)\nfunction numDecodingBF(s) {\n  function decode(index) {\n    if (index >= s.length) {\n      return 1;\n    }\n    if (s[index] === '0') {\n      return 0;\n    }\n    return decode(index + 1) +\n      (index === s.length - 1 || s.slice(index, index + 2) > 26 ? 0 : decode(index + 2));\n  }\n\n  return decode(0);\n}\n\nconsole.log(numDecodingBF('226')); // 3\nconsole.log(numDecodingBF('06')); // 0\nconsole.log(numDecodingBF('38475')); // 1\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\n// Time Complexity O(n)\n// Space Complexity O(n)\nfunction numDecodingTD(s) {\n  const memo = {};\n\n  function decode(index) {\n    if (index >= s.length) {\n      return 1;\n    }\n    if (memo[index] !== undefined) {\n      return memo[index];\n    }\n    if (s[index] === '0') {\n      return 0;\n    }\n    memo[index] = decode(index + 1) +\n      (index === s.length - 1 || s.slice(index, index + 2) > 26 ? 0 : decode(index + 2));\n    return memo[index];\n  }\n\n  return decode(0);\n}\n\nconsole.log(numDecodingTD('226')); // 3\nconsole.log(numDecodingTD('06')); // 0\nconsole.log(numDecodingTD('38475')); // 1\nconsole.log(numDecodingTD('111111111111111111111111111111111111111111111')); // 1836311903\n\n// Bottom-up approach - Tabulation\n// Time Complexity O(n)\n// Space Complexity O(1)\nfunction numDecodingBU(s) {\n  let prevCount = 0;\n  let currentCount = 1;\n  for (let i = s.length - 1; i >= 0; i--) {\n    let tempCount = 0;\n    if (s[i] !== '0') {\n      tempCount += currentCount;\n      if (s[i] + s[i + 1] <= 26) {\n        tempCount += prevCount;\n      }\n    }\n    prevCount = currentCount;\n    currentCount = tempCount;\n  }\n  return currentCount;\n}\n\nconsole.log(numDecodingBU('226')); // 3\nconsole.log(numDecodingBU('06')); // 0\nconsole.log(numDecodingBU('38475')); // 1\nconsole.log(numDecodingBU('111111111111111111111111111111111111111111111')); // 1836311903\n",
        "starterCode": {
            "javascript": "// Decode Ways\n// Dynamic Programming\n\n// A message containing letters from A-Z can be encoded\n// into numbers using the following mapping:\n// 'A' -> \"1\"\n// 'B' -> \"2\"\n// ...\n// 'Z' -> \"26\"\n// To decode an encoded message, all the digits must be grouped\n// then mapped back into letters using the reverse of the mapping\n// above (there may be multiple ways). For example, \"11106\" can be mapped into:\n// \"AAJF\" with the grouping (1 1 10 6)\n// \"KJF\" with the grouping (11 10 6)\n// Note that the grouping (1 11 06) is invalid because \"06\"\n// cannot be mapped into 'F' since \"6\" is different from \"06\".\n// Given a string s containing only digits, return the number of ways to decode it.\n\n// Brute Force\n// Time Complexity O(2^n)\n// Space Complexity O(n)\nfunction numDecodingBF(s) {\n  function decode(index) {\n    if (index >= s.length) {\n      return 1;\n    }\n    if (s[index] === '0') {\n      return 0;\n    }\n    return decode(index + 1) +\n      (index === s.length - 1 || s.slice(index, index + 2) > 26 ? 0 : decode(index + 2));\n  }\n\n  return decode(0);\n}\n\nconsole.log(numDecodingBF('226')); // 3\nconsole.log(numDecodingBF('06')); // 0\nconsole.log(numDecodingBF('38475')); // 1\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\n// Time Complexity O(n)\n// Space Complexity O(n)\nfunction numDecodingTD(s) {\n  const memo = {};\n\n  function decode(index) {\n    if (index >= s.length) {\n      return 1;\n    }\n    if (memo[index] !== undefined) {\n      return memo[index];\n    }\n    if (s[index] === '0') {\n      return 0;\n    }\n    memo[index] = decode(index + 1) +\n      (index === s.length - 1 || s.slice(index, index + 2) > 26 ? 0 : decode(index + 2));\n    return memo[index];\n  }\n\n  return decode(0);\n}\n\nconsole.log(numDecodingTD('226')); // 3\nconsole.log(numDecodingTD('06')); // 0\nconsole.log(numDecodingTD('38475')); // 1\nconsole.log(numDecodingTD('111111111111111111111111111111111111111111111')); // 1836311903\n\n// Bottom-up approach - Tabulation\n// Time Complexity O(n)\n// Space Complexity O(1)\nfunction numDecodingBU(s) {\n  let prevCount = 0;\n  let currentCount = 1;\n  for (let i = s.length - 1; i >= 0; i--) {\n    let tempCount = 0;\n    if (s[i] !== '0') {\n      tempCount += currentCount;\n      if (s[i] + s[i + 1] <= 26) {\n        tempCount += prevCount;\n      }\n    }\n    prevCount = currentCount;\n    currentCount = tempCount;\n  }\n  return currentCount;\n}\n\nconsole.log(numDecodingBU('226')); // 3\nconsole.log(numDecodingBU('06')); // 0\nconsole.log(numDecodingBU('38475')); // 1\nconsole.log(numDecodingBU('111111111111111111111111111111111111111111111')); // 1836311903\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 73,
        "likes": 169
    },
    {
        "id": "60",
        "title": "Fibonacci",
        "slug": "fibonacci",
        "difficulty": "Medium",
        "topics": [
            "Dynamic Programming"
        ],
        "description": "fib Write a recursive function called fib which accepts a number and returns the nth number in the Fibonacci sequence using Dynamic Programming approach. Recall that the Fibonacci sequence is the sequence of whole numbers 1, 1, 2, 3, 5, 8, ... which starts with 1 and 1, and where every number thereafter is equal to the sum of the previous two numbers.",
        "examples": [
            {
                "input": "fibBF(10)",
                "output": "55",
                "explanation": "Based on code execution"
            },
            {
                "input": "fibTD(1000)",
                "output": "4.346655768693743e+208",
                "explanation": "Based on code execution"
            },
            {
                "input": "fibTD(10000)",
                "output": "RangeError: Maximum call stack size exceeded",
                "explanation": "Based on code execution"
            },
            {
                "input": "fibTDFunc(1000)",
                "output": "4.346655768693743e+208",
                "explanation": "Based on code execution"
            },
            {
                "input": "fibTDFunc(10000)",
                "output": "RangeError: Maximum call stack size exceeded",
                "explanation": "Based on code execution"
            },
            {
                "input": "fibBU(1000)",
                "output": "4.346655768693743e+208",
                "explanation": "Based on code execution"
            },
            {
                "input": "fibBU(10000)",
                "output": "Infinity",
                "explanation": "Based on code execution"
            },
            {
                "input": "fibBUArray(10)",
                "output": "[ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ]",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// fib\n// Write a recursive function called fib which accepts a number\n// and returns the nth number in the Fibonacci sequence using Dynamic Programming approach.\n// Recall that the Fibonacci sequence is the sequence of whole numbers 1, 1, 2, 3, 5, 8, ...\n// which starts with 1 and 1, and where every number thereafter\n// is equal to the sum of the previous two numbers.\n\n// Brute Force\n// Time Complexity O(2^n)\nfunction fibBF(num) {\n  if (num < 2) return num;\n\n  return fibBF(num - 1) + fibBF(num - 2);\n}\n\nconsole.log(fibBF(10)); // 55\n\n// Dynamic Programming\n// Time Complexity O(n)\n// Space Complexity O(n)\n\n// Top-down approach - Memoization\nfunction fibTD(num, cache = {}) {\n  if (typeof cache[num] !== 'undefined') return cache[num];\n  if (num < 2) return num;\n\n  cache[num] = fibTD(num - 1, cache) + fibTD(num - 2, cache);\n\n  return cache[num];\n}\n\nconsole.log(fibTD(1000)); // 4.346655768693743e+208\n// console.log(fibTD(10000)); // RangeError: Maximum call stack size exceeded\n\n// With a memoization function (does memoization between calls)\nfunction memoize(fn) {\n  const cache = {};\n\n  return function(arg) {\n    if (typeof cache[arg] !== 'undefined') return cache[arg];\n\n    cache[arg] = fn.call(this, arg);\n\n    return cache[arg];\n  };\n}\n\nconst memFib = memoize(fibTDFunc);\n\nfunction fibTDFunc(num) {\n  if (num < 2) return num;\n\n  return memFib(num - 1) + memFib(num - 2);\n}\n\nconsole.log(fibTDFunc(1000)); // 4.346655768693743e+208\n// console.log(fibTDFunc(10000)); // RangeError: Maximum call stack size exceeded\n\n// Bottom-up approach - Tabulation\n// Space Complexity O(1)\nfunction fibBU(num) {\n  if (num < 2) return num;\n\n  let prevNumber = 0;\n  let currentNumber = 1;\n  let temp;\n\n  for (let i = 1; i < num; i++) {\n    temp = currentNumber;\n    currentNumber += prevNumber;\n    prevNumber = temp;\n  }\n\n  return currentNumber;\n}\n\nconsole.log(fibBU(1000)); // 4.346655768693743e+208\nconsole.log(fibBU(10000)); // Infinity\n\n// returns a fibonacci sequence as an array\nfunction fibBUArray(num) {\n  const numbers = [1];\n\n  for (let i = 1; i < num; i++) {\n    numbers[i] = numbers[i - 1] + (numbers[i - 2] || 0);\n  }\n\n  return numbers;\n}\n\nconsole.log(fibBUArray(10)); // [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ]\n",
        "starterCode": {
            "javascript": "// Fibonacci\n// Dynamic Programming\n\n// fib\n// Write a recursive function called fib which accepts a number\n// and returns the nth number in the Fibonacci sequence using Dynamic Programming approach.\n// Recall that the Fibonacci sequence is the sequence of whole numbers 1, 1, 2, 3, 5, 8, ...\n// which starts with 1 and 1, and where every number thereafter\n// is equal to the sum of the previous two numbers.\n\n// Brute Force\n// Time Complexity O(2^n)\nfunction fibBF(num) {\n  if (num < 2) return num;\n\n  return fibBF(num - 1) + fibBF(num - 2);\n}\n\nconsole.log(fibBF(10)); // 55\n\n// Dynamic Programming\n// Time Complexity O(n)\n// Space Complexity O(n)\n\n// Top-down approach - Memoization\nfunction fibTD(num, cache = {}) {\n  if (typeof cache[num] !== 'undefined') return cache[num];\n  if (num < 2) return num;\n\n  cache[num] = fibTD(num - 1, cache) + fibTD(num - 2, cache);\n\n  return cache[num];\n}\n\nconsole.log(fibTD(1000)); // 4.346655768693743e+208\n// console.log(fibTD(10000)); // RangeError: Maximum call stack size exceeded\n\n// With a memoization function (does memoization between calls)\nfunction memoize(fn) {\n  const cache = {};\n\n  return function(arg) {\n    if (typeof cache[arg] !== 'undefined') return cache[arg];\n\n    cache[arg] = fn.call(this, arg);\n\n    return cache[arg];\n  };\n}\n\nconst memFib = memoize(fibTDFunc);\n\nfunction fibTDFunc(num) {\n  if (num < 2) return num;\n\n  return memFib(num - 1) + memFib(num - 2);\n}\n\nconsole.log(fibTDFunc(1000)); // 4.346655768693743e+208\n// console.log(fibTDFunc(10000)); // RangeError: Maximum call stack size exceeded\n\n// Bottom-up approach - Tabulation\n// Space Complexity O(1)\nfunction fibBU(num) {\n  if (num < 2) return num;\n\n  let prevNumber = 0;\n  let currentNumber = 1;\n  let temp;\n\n  for (let i = 1; i < num; i++) {\n    temp = currentNumber;\n    currentNumber += prevNumber;\n    prevNumber = temp;\n  }\n\n  return currentNumber;\n}\n\nconsole.log(fibBU(1000)); // 4.346655768693743e+208\nconsole.log(fibBU(10000)); // Infinity\n\n// returns a fibonacci sequence as an array\nfunction fibBUArray(num) {\n  const numbers = [1];\n\n  for (let i = 1; i < num; i++) {\n    numbers[i] = numbers[i - 1] + (numbers[i - 2] || 0);\n  }\n\n  return numbers;\n}\n\nconsole.log(fibBUArray(10)); // [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ]\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 76,
        "likes": 157
    },
    {
        "id": "61",
        "title": "House Robber",
        "slug": "house-robber",
        "difficulty": "Medium",
        "topics": [
            "Dynamic Programming"
        ],
        "description": "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected, and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
        "examples": [
            {
                "input": "robBF([1, 2, 3, 1])",
                "output": "4",
                "explanation": "Based on code execution"
            },
            {
                "input": "robBF([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])",
                "output": "17",
                "explanation": "Based on code execution"
            },
            {
                "input": "robTD([1, 2, 3, 1])",
                "output": "4",
                "explanation": "Based on code execution"
            },
            {
                "input": "robTD([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])",
                "output": "17",
                "explanation": "Based on code execution"
            },
            {
                "input": "robBU([1, 2, 3, 1])",
                "output": "4",
                "explanation": "Based on code execution"
            },
            {
                "input": "robBU([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])",
                "output": "17",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "stopping you from robbing each of them",
            "is that adjacent houses have security systems connected,",
            "and it will automatically contact the police",
            "if two adjacent houses were broken into on the same night.",
            "Given an integer array nums representing the amount of money of each house,",
            "return the maximum amount of money",
            "you can rob tonight without alerting the police."
        ],
        "hints": [],
        "solution": "// You are a professional robber planning to rob houses along a street.\n// Each house has a certain amount of money stashed,\n// the only constraint stopping you from robbing each of them\n// is that adjacent houses have security systems connected,\n// and it will automatically contact the police\n// if two adjacent houses were broken into on the same night.\n// Given an integer array nums representing the amount of money of each house,\n// return the maximum amount of money\n// you can rob tonight without alerting the police.\n\n// Brute Force\n// Time Complexity O(2^n)\n// Space Complexity O(n)\nfunction robBF(nums) {\n  function find(index) {\n    if (index < 0) {\n      return 0;\n    }\n    return Math.max(find(index - 1), find(index - 2) + nums[index]);\n  }\n\n  return find(nums.length - 1);\n}\n\nconsole.log(robBF([1, 2, 3, 1])); // 4\nconsole.log(robBF([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // 17\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\n// Time Complexity O(n)\n// Space Complexity O(n)\nfunction robTD(nums) {\n  const memo = {};\n\n  function find(index) {\n    if (index < 0) {\n      return 0;\n    }\n    if (memo[index] !== undefined) {\n      return memo[index];\n    }\n    memo[index] = Math.max(find(index - 1), find(index - 2) + nums[index]);\n    return memo[index];\n  }\n\n  return find(nums.length - 1);\n}\n\nconsole.log(robTD([1, 2, 3, 1])); // 4\nconsole.log(robTD([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // 17\nconsole.log(robTD([114, 117, 207, 117, 235, 82, 90, 67, 143, 146, 53, 108, 200,\n  91, 80, 223, 58, 170, 110, 236, 81, 90, 222, 160, 165, 195, 187, 199, 114, 235, 197,\n  187, 69, 129, 64, 214, 228, 78, 188, 67, 205, 94, 205, 169, 241, 202, 144, 240\n])); // 4173\n\n// Bottom-up approach - Tabulation\n// Time Complexity O(n)\n// Space Complexity O(1)\nfunction robBU(nums) {\n  if (!nums.length) {\n    return 0;\n  }\n\n  let prev = 0;\n  let current = nums[0];\n\n  for (let i = 1; i < nums.length; i++) {\n    [current, prev] = [Math.max(current, nums[i] + prev), current];\n  }\n  return current;\n}\n\nconsole.log(robBU([1, 2, 3, 1])); // 4\nconsole.log(robBU([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // 17\nconsole.log(robBU([114, 117, 207, 117, 235, 82, 90, 67, 143, 146, 53, 108, 200,\n  91, 80, 223, 58, 170, 110, 236, 81, 90, 222, 160, 165, 195, 187, 199, 114, 235, 197,\n  187, 69, 129, 64, 214, 228, 78, 188, 67, 205, 94, 205, 169, 241, 202, 144, 240\n])); // 4173\n",
        "starterCode": {
            "javascript": "// House Robber\n// Dynamic Programming\n\n// You are a professional robber planning to rob houses along a street.\n// Each house has a certain amount of money stashed,\n// the only constraint stopping you from robbing each of them\n// is that adjacent houses have security systems connected,\n// and it will automatically contact the police\n// if two adjacent houses were broken into on the same night.\n// Given an integer array nums representing the amount of money of each house,\n// return the maximum amount of money\n// you can rob tonight without alerting the police.\n\n// Brute Force\n// Time Complexity O(2^n)\n// Space Complexity O(n)\nfunction robBF(nums) {\n  function find(index) {\n    if (index < 0) {\n      return 0;\n    }\n    return Math.max(find(index - 1), find(index - 2) + nums[index]);\n  }\n\n  return find(nums.length - 1);\n}\n\nconsole.log(robBF([1, 2, 3, 1])); // 4\nconsole.log(robBF([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // 17\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\n// Time Complexity O(n)\n// Space Complexity O(n)\nfunction robTD(nums) {\n  const memo = {};\n\n  function find(index) {\n    if (index < 0) {\n      return 0;\n    }\n    if (memo[index] !== undefined) {\n      return memo[index];\n    }\n    memo[index] = Math.max(find(index - 1), find(index - 2) + nums[index]);\n    return memo[index];\n  }\n\n  return find(nums.length - 1);\n}\n\nconsole.log(robTD([1, 2, 3, 1])); // 4\nconsole.log(robTD([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // 17\nconsole.log(robTD([114, 117, 207, 117, 235, 82, 90, 67, 143, 146, 53, 108, 200,\n  91, 80, 223, 58, 170, 110, 236, 81, 90, 222, 160, 165, 195, 187, 199, 114, 235, 197,\n  187, 69, 129, 64, 214, 228, 78, 188, 67, 205, 94, 205, 169, 241, 202, 144, 240\n])); // 4173\n\n// Bottom-up approach - Tabulation\n// Time Complexity O(n)\n// Space Complexity O(1)\nfunction robBU(nums) {\n  if (!nums.length) {\n    return 0;\n  }\n\n  let prev = 0;\n  let current = nums[0];\n\n  for (let i = 1; i < nums.length; i++) {\n    [current, prev] = [Math.max(current, nums[i] + prev), current];\n  }\n  return current;\n}\n\nconsole.log(robBU([1, 2, 3, 1])); // 4\nconsole.log(robBU([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // 17\nconsole.log(robBU([114, 117, 207, 117, 235, 82, 90, 67, 143, 146, 53, 108, 200,\n  91, 80, 223, 58, 170, 110, 236, 81, 90, 222, 160, 165, 195, 187, 199, 114, 235, 197,\n  187, 69, 129, 64, 214, 228, 78, 188, 67, 205, 94, 205, 169, 241, 202, 144, 240\n])); // 4173\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 74,
        "likes": 450
    },
    {
        "id": "62",
        "title": "House Robber2",
        "slug": "house-robber2",
        "difficulty": "Medium",
        "topics": [
            "Dynamic Programming"
        ],
        "description": "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
        "examples": [
            {
                "input": "robBF([1, 2, 3, 1])",
                "output": "4",
                "explanation": "Based on code execution"
            },
            {
                "input": "robBF([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])",
                "output": "16",
                "explanation": "Based on code execution"
            },
            {
                "input": "robTD([1, 2, 3, 1])",
                "output": "4",
                "explanation": "Based on code execution"
            },
            {
                "input": "robTD([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])",
                "output": "16",
                "explanation": "Based on code execution"
            },
            {
                "input": "robBU([1, 2, 3, 1])",
                "output": "4",
                "explanation": "Based on code execution"
            },
            {
                "input": "robBU([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])",
                "output": "16",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// You are a professional robber planning to rob houses along a street.\n// Each house has a certain amount of money stashed.\n// All houses at this place are arranged in a circle.\n// That means the first house is the neighbor of the last one.\n// Meanwhile, adjacent houses have a security system connected,\n// and it will automatically contact the police\n// if two adjacent houses were broken into on the same night.\n// Given an integer array nums representing the amount of money of each house,\n// return the maximum amount of money you can rob tonight without alerting the police.\n\n// Brute Force\n// Time Complexity O(2^n)\n// Space Complexity O(n)\nfunction robBF(nums) {\n  if (nums.length === 1) {\n    return nums[0];\n  }\n\n  function find(fromIdx, toIdx) {\n    if (fromIdx < toIdx) {\n      return 0;\n    }\n    return Math.max(find(fromIdx - 1, toIdx), find(fromIdx - 2, toIdx) + nums[fromIdx]);\n  }\n\n  return Math.max(find(nums.length - 1, 1), find(nums.length - 2, 0));\n}\n\nconsole.log(robBF([1, 2, 3, 1])); // 4\nconsole.log(robBF([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // 16\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\n// Time Complexity O(n)\n// Space Complexity O(n)\nfunction robTD(nums) {\n  if (nums.length === 1) {\n    return nums[0];\n  }\n  const memo = {};\n\n  function find(fromIdx, toIdx) {\n    if (fromIdx < toIdx) {\n      return 0;\n    }\n    const key = `${fromIdx}/${toIdx}`;\n    if (memo[key] !== undefined) {\n      return memo[key];\n    }\n    memo[key] = Math.max(find(fromIdx - 1, toIdx), find(fromIdx - 2, toIdx) + nums[fromIdx]);\n    return memo[key];\n  }\n\n  return Math.max(find(nums.length - 1, 1), find(nums.length - 2, 0));\n}\n\nconsole.log(robTD([1, 2, 3, 1])); // 4\nconsole.log(robTD([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // 16\nconsole.log(robTD([94, 40, 49, 65, 21, 21, 106, 80, 92, 81, 679, 4, 61, 6,\n  237, 12, 72, 74, 29, 95, 265, 35, 47, 1, 61, 397, 52, 72,\n  37, 51, 1, 81, 45, 435, 7, 36, 57, 86, 81, 72])); // 2926\n\n// Bottom-up approach - Tabulation\n// Time Complexity O(n)\n// Space Complexity O(1)\nfunction robBU(nums) {\n  let prev1 = 0;\n  let current1 = nums[0];\n\n  let prev2 = 0;\n  let current2 = nums[1];\n\n  for (let i = 1; i < nums.length - 1; i++) {\n    [current1, prev1] = [Math.max(current1, nums[i] + prev1), current1];\n    [current2, prev2] = [Math.max(current2, nums[i + 1] + prev2), current2];\n  }\n  return Math.max(current1 || 0, current2 || 0);\n}\n\nconsole.log(robBU([1, 2, 3, 1])); // 4\nconsole.log(robBU([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // 16\nconsole.log(robBU([94, 40, 49, 65, 21, 21, 106, 80, 92, 81, 679, 4, 61, 6,\n  237, 12, 72, 74, 29, 95, 265, 35, 47, 1, 61, 397, 52, 72,\n  37, 51, 1, 81, 45, 435, 7, 36, 57, 86, 81, 72])); // 2926\n",
        "starterCode": {
            "javascript": "// House Robber2\n// Dynamic Programming\n\n// You are a professional robber planning to rob houses along a street.\n// Each house has a certain amount of money stashed.\n// All houses at this place are arranged in a circle.\n// That means the first house is the neighbor of the last one.\n// Meanwhile, adjacent houses have a security system connected,\n// and it will automatically contact the police\n// if two adjacent houses were broken into on the same night.\n// Given an integer array nums representing the amount of money of each house,\n// return the maximum amount of money you can rob tonight without alerting the police.\n\n// Brute Force\n// Time Complexity O(2^n)\n// Space Complexity O(n)\nfunction robBF(nums) {\n  if (nums.length === 1) {\n    return nums[0];\n  }\n\n  function find(fromIdx, toIdx) {\n    if (fromIdx < toIdx) {\n      return 0;\n    }\n    return Math.max(find(fromIdx - 1, toIdx), find(fromIdx - 2, toIdx) + nums[fromIdx]);\n  }\n\n  return Math.max(find(nums.length - 1, 1), find(nums.length - 2, 0));\n}\n\nconsole.log(robBF([1, 2, 3, 1])); // 4\nconsole.log(robBF([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // 16\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\n// Time Complexity O(n)\n// Space Complexity O(n)\nfunction robTD(nums) {\n  if (nums.length === 1) {\n    return nums[0];\n  }\n  const memo = {};\n\n  function find(fromIdx, toIdx) {\n    if (fromIdx < toIdx) {\n      return 0;\n    }\n    const key = `${fromIdx}/${toIdx}`;\n    if (memo[key] !== undefined) {\n      return memo[key];\n    }\n    memo[key] = Math.max(find(fromIdx - 1, toIdx), find(fromIdx - 2, toIdx) + nums[fromIdx]);\n    return memo[key];\n  }\n\n  return Math.max(find(nums.length - 1, 1), find(nums.length - 2, 0));\n}\n\nconsole.log(robTD([1, 2, 3, 1])); // 4\nconsole.log(robTD([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // 16\nconsole.log(robTD([94, 40, 49, 65, 21, 21, 106, 80, 92, 81, 679, 4, 61, 6,\n  237, 12, 72, 74, 29, 95, 265, 35, 47, 1, 61, 397, 52, 72,\n  37, 51, 1, 81, 45, 435, 7, 36, 57, 86, 81, 72])); // 2926\n\n// Bottom-up approach - Tabulation\n// Time Complexity O(n)\n// Space Complexity O(1)\nfunction robBU(nums) {\n  let prev1 = 0;\n  let current1 = nums[0];\n\n  let prev2 = 0;\n  let current2 = nums[1];\n\n  for (let i = 1; i < nums.length - 1; i++) {\n    [current1, prev1] = [Math.max(current1, nums[i] + prev1), current1];\n    [current2, prev2] = [Math.max(current2, nums[i + 1] + prev2), current2];\n  }\n  return Math.max(current1 || 0, current2 || 0);\n}\n\nconsole.log(robBU([1, 2, 3, 1])); // 4\nconsole.log(robBU([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // 16\nconsole.log(robBU([94, 40, 49, 65, 21, 21, 106, 80, 92, 81, 679, 4, 61, 6,\n  237, 12, 72, 74, 29, 95, 265, 35, 47, 1, 61, 397, 52, 72,\n  37, 51, 1, 81, 45, 435, 7, 36, 57, 86, 81, 72])); // 2926\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 62,
        "likes": 75
    },
    {
        "id": "63",
        "title": "Jump Game",
        "slug": "jump-game",
        "difficulty": "Medium",
        "topics": [
            "Dynamic Programming"
        ],
        "description": "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.",
        "examples": [
            {
                "input": "canJumpBF([3, 0, 8, 2, 0, 0, 1])",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "canJumpBF([3, 2, 1, 0, 4])",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "canJumpTD([3, 0, 8, 2, 0, 0, 1])",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "canJumpTD([3, 2, 1, 0, 4])",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "canJumpTD([10000, ...Array.from(Array(9997).keys()).reverse(), 0])",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "canJumpTD([9997, ...Array.from(Array(9997).keys()).reverse(), 0])",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "canJumpBU([3, 0, 8, 2, 0, 0, 1])",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "canJumpBU([3, 2, 1, 0, 4])",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "canJumpBU([10000, ...Array.from(Array(9997).keys()).reverse(), 0])",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "canJumpBU([9997, ...Array.from(Array(9997).keys()).reverse(), 0])",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "canJumpGA([3, 0, 8, 2, 0, 0, 1])",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "canJumpGA([3, 2, 1, 0, 4])",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "canJumpGA([10000, ...Array.from(Array(9997).keys()).reverse(), 0])",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "canJumpGA([9997, ...Array.from(Array(9997).keys()).reverse(), 0])",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "canJumpOpt([3, 0, 8, 2, 0, 0, 1])",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "canJumpOpt([3, 2, 1, 0, 4])",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "canJumpOpt([10000, ...Array.from(Array(9997).keys()).reverse(), 0])",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "canJumpOpt([9997, ...Array.from(Array(9997).keys()).reverse(), 0])",
                "output": "false",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// You are given an integer array nums.\n// You are initially positioned at the array's first index,\n// and each element in the array represents your maximum jump length at that position.\n// Return true if you can reach the last index, or false otherwise.\n\n// Brute Force\n// Time Complexity O(2^n)\n// Space Complexity O(n)\nfunction canJumpBF(nums) {\n  function jump(index) {\n    if (index >= nums.length - 1) {\n      return true;\n    }\n    for (let i = 1; i <= nums[index]; i++) {\n      if (jump(index + i)) {\n        return true;\n      }\n    }\n    return false;\n  }\n\n  return jump(0);\n}\n\nconsole.log(canJumpBF([3, 0, 8, 2, 0, 0, 1])); // true\nconsole.log(canJumpBF([3, 2, 1, 0, 4])); // false\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\n// Time Complexity O(n)\n// Space Complexity O(n)\nfunction canJumpTD(nums) {\n  const memo = {};\n\n  function jump(index) {\n    if (memo[index] !== undefined) {\n      return memo[index];\n    }\n    if (index >= nums.length - 1) {\n      return true;\n    }\n    for (let i = nums[index]; i >= 1; i--) {\n      if (jump(index + i)) {\n        memo[index] = true;\n        return true;\n      }\n    }\n    memo[index] = false;\n    return false;\n  }\n\n  return jump(0);\n}\n\nconsole.log(canJumpTD([3, 0, 8, 2, 0, 0, 1])); // true\nconsole.log(canJumpTD([3, 2, 1, 0, 4])); // false\nconsole.log(canJumpTD([10000, ...Array.from(Array(9997).keys()).reverse(), 0])); // true\nconsole.log(canJumpTD([9997, ...Array.from(Array(9997).keys()).reverse(), 0])); // false\n\n// Bottom-up approach - Tabulation\n// Time Complexity O(n)\n// Space Complexity O(n)\nfunction canJumpBU(nums) {\n  const table = Array.from({ length: nums.length }).fill(false);\n  table[nums.length - 1] = true;\n  for (let i = nums.length - 2; i >= 0; i--) {\n    for (let j = 1; j <= nums[i]; j++) {\n      if (table[i + j]) {\n        table[i] = true;\n        break;\n      }\n    }\n  }\n  return table[0];\n}\n\nconsole.log(canJumpBU([3, 0, 8, 2, 0, 0, 1])); // true\nconsole.log(canJumpBU([3, 2, 1, 0, 4])); // false\nconsole.log(canJumpBU([10000, ...Array.from(Array(9997).keys()).reverse(), 0])); // true\nconsole.log(canJumpBU([9997, ...Array.from(Array(9997).keys()).reverse(), 0])); // false\n\n// Greedy algorithm\n// Time Complexity O(n)\n// Space Complexity O(1)\nfunction canJumpGA(nums) {\n  let maxIndex = 0;\n  for (let i = 0; i < nums.length; i++) {\n    // Keep the max index that we can reach so far\n    maxIndex = Math.max(maxIndex, nums[i] + i);\n    if (maxIndex >= nums.length - 1) {\n      return true;\n    }\n    if (nums[i] === 0 && maxIndex <= i) {\n      return false;\n    }\n  }\n  return false;\n}\n\nconsole.log(canJumpGA([3, 0, 8, 2, 0, 0, 1])); // true\nconsole.log(canJumpGA([3, 2, 1, 0, 4])); // false\nconsole.log(canJumpGA([10000, ...Array.from(Array(9997).keys()).reverse(), 0])); // true\nconsole.log(canJumpGA([9997, ...Array.from(Array(9997).keys()).reverse(), 0])); // false\n\n// Optimization (mix of tabulation + greedy ???)\n// Time Complexity O(n)\n// Space Complexity O(1)\nfunction canJumpOpt(nums) {\n  let previousIndex = nums.length - 1;\n  // Start from the end\n  for (let i = previousIndex - 1; i >= 0; i--) {\n    // Check if we can reach previous number\n    if (nums[i] + i >= previousIndex) {\n      previousIndex = i;\n    }\n  }\n  return previousIndex === 0;\n}\n\nconsole.log(canJumpOpt([3, 0, 8, 2, 0, 0, 1])); // true\nconsole.log(canJumpOpt([3, 2, 1, 0, 4])); // false\nconsole.log(canJumpOpt([10000, ...Array.from(Array(9997).keys()).reverse(), 0])); // true\nconsole.log(canJumpOpt([9997, ...Array.from(Array(9997).keys()).reverse(), 0])); // false\n",
        "starterCode": {
            "javascript": "// Jump Game\n// Dynamic Programming\n\n// You are given an integer array nums.\n// You are initially positioned at the array's first index,\n// and each element in the array represents your maximum jump length at that position.\n// Return true if you can reach the last index, or false otherwise.\n\n// Brute Force\n// Time Complexity O(2^n)\n// Space Complexity O(n)\nfunction canJumpBF(nums) {\n  function jump(index) {\n    if (index >= nums.length - 1) {\n      return true;\n    }\n    for (let i = 1; i <= nums[index]; i++) {\n      if (jump(index + i)) {\n        return true;\n      }\n    }\n    return false;\n  }\n\n  return jump(0);\n}\n\nconsole.log(canJumpBF([3, 0, 8, 2, 0, 0, 1])); // true\nconsole.log(canJumpBF([3, 2, 1, 0, 4])); // false\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\n// Time Complexity O(n)\n// Space Complexity O(n)\nfunction canJumpTD(nums) {\n  const memo = {};\n\n  function jump(index) {\n    if (memo[index] !== undefined) {\n      return memo[index];\n    }\n    if (index >= nums.length - 1) {\n      return true;\n    }\n    for (let i = nums[index]; i >= 1; i--) {\n      if (jump(index + i)) {\n        memo[index] = true;\n        return true;\n      }\n    }\n    memo[index] = false;\n    return false;\n  }\n\n  return jump(0);\n}\n\nconsole.log(canJumpTD([3, 0, 8, 2, 0, 0, 1])); // true\nconsole.log(canJumpTD([3, 2, 1, 0, 4])); // false\nconsole.log(canJumpTD([10000, ...Array.from(Array(9997).keys()).reverse(), 0])); // true\nconsole.log(canJumpTD([9997, ...Array.from(Array(9997).keys()).reverse(), 0])); // false\n\n// Bottom-up approach - Tabulation\n// Time Complexity O(n)\n// Space Complexity O(n)\nfunction canJumpBU(nums) {\n  const table = Array.from({ length: nums.length }).fill(false);\n  table[nums.length - 1] = true;\n  for (let i = nums.length - 2; i >= 0; i--) {\n    for (let j = 1; j <= nums[i]; j++) {\n      if (table[i + j]) {\n        table[i] = true;\n        break;\n      }\n    }\n  }\n  return table[0];\n}\n\nconsole.log(canJumpBU([3, 0, 8, 2, 0, 0, 1])); // true\nconsole.log(canJumpBU([3, 2, 1, 0, 4])); // false\nconsole.log(canJumpBU([10000, ...Array.from(Array(9997).keys()).reverse(), 0])); // true\nconsole.log(canJumpBU([9997, ...Array.from(Array(9997).keys()).reverse(), 0])); // false\n\n// Greedy algorithm\n// Time Complexity O(n)\n// Space Complexity O(1)\nfunction canJumpGA(nums) {\n  let maxIndex = 0;\n  for (let i = 0; i < nums.length; i++) {\n    // Keep the max index that we can reach so far\n    maxIndex = Math.max(maxIndex, nums[i] + i);\n    if (maxIndex >= nums.length - 1) {\n      return true;\n    }\n    if (nums[i] === 0 && maxIndex <= i) {\n      return false;\n    }\n  }\n  return false;\n}\n\nconsole.log(canJumpGA([3, 0, 8, 2, 0, 0, 1])); // true\nconsole.log(canJumpGA([3, 2, 1, 0, 4])); // false\nconsole.log(canJumpGA([10000, ...Array.from(Array(9997).keys()).reverse(), 0])); // true\nconsole.log(canJumpGA([9997, ...Array.from(Array(9997).keys()).reverse(), 0])); // false\n\n// Optimization (mix of tabulation + greedy ???)\n// Time Complexity O(n)\n// Space Complexity O(1)\nfunction canJumpOpt(nums) {\n  let previousIndex = nums.length - 1;\n  // Start from the end\n  for (let i = previousIndex - 1; i >= 0; i--) {\n    // Check if we can reach previous number\n    if (nums[i] + i >= previousIndex) {\n      previousIndex = i;\n    }\n  }\n  return previousIndex === 0;\n}\n\nconsole.log(canJumpOpt([3, 0, 8, 2, 0, 0, 1])); // true\nconsole.log(canJumpOpt([3, 2, 1, 0, 4])); // false\nconsole.log(canJumpOpt([10000, ...Array.from(Array(9997).keys()).reverse(), 0])); // true\nconsole.log(canJumpOpt([9997, ...Array.from(Array(9997).keys()).reverse(), 0])); // false\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 58,
        "likes": 325
    },
    {
        "id": "64",
        "title": "Jump Game2",
        "slug": "jump-game2",
        "difficulty": "Medium",
        "topics": [
            "Dynamic Programming"
        ],
        "description": "You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0]. Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where: 0 <= j <= nums[i] and i + j < n. Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].",
        "examples": [
            {
                "input": "jumpBF([3, 0, 8, 2, 0, 0, 1])",
                "output": "2",
                "explanation": "Based on code execution"
            },
            {
                "input": "jumpBF([2, 3, 0, 1, 4])",
                "output": "2",
                "explanation": "Based on code execution"
            },
            {
                "input": "jumpTD([3, 0, 8, 2, 0, 0, 1])",
                "output": "2",
                "explanation": "Based on code execution"
            },
            {
                "input": "jumpTD([2, 3, 0, 1, 4])",
                "output": "2",
                "explanation": "Based on code execution"
            },
            {
                "input": "jumpBU([3, 0, 8, 2, 0, 0, 1])",
                "output": "2",
                "explanation": "Based on code execution"
            },
            {
                "input": "jumpBU([2, 3, 0, 1, 4])",
                "output": "2",
                "explanation": "Based on code execution"
            },
            {
                "input": "jumpGA([3, 0, 8, 2, 0, 0, 1])",
                "output": "2",
                "explanation": "Based on code execution"
            },
            {
                "input": "jumpGA([2, 3, 0, 1, 4])",
                "output": "2",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// You are given a 0-indexed array of integers nums of length n.\n// You are initially positioned at nums[0].\n// Each element nums[i] represents the maximum length\n// of a forward jump from index i. In other words, if you are at nums[i],\n// you can jump to any nums[i + j] where: 0 <= j <= nums[i] and i + j < n.\n// Return the minimum number of jumps to reach nums[n - 1].\n// The test cases are generated such that you can reach nums[n - 1].\n\n// Brute Force\n// Time Complexity O(2^n)\n// Space Complexity O(n)\nfunction jumpBF(nums) {\n  function jump(index) {\n    if (index >= nums.length - 1) {\n      return 0;\n    }\n    let minCount = Infinity;\n    for (let i = 1; i <= nums[index]; i++) {\n      minCount = Math.min(minCount, jump(index + i) + 1);\n    }\n    return minCount;\n  }\n\n  return jump(0);\n}\n\nconsole.log(jumpBF([3, 0, 8, 2, 0, 0, 1])); // 2\nconsole.log(jumpBF([2, 3, 0, 1, 4])); // 2\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\n// Time Complexity O(n)\n// Space Complexity O(n)\nfunction jumpTD(nums) {\n  const memo = {};\n\n  function jump(index) {\n    if (memo[index] !== undefined) {\n      return memo[index];\n    }\n    if (index >= nums.length - 1) {\n      return 0;\n    }\n    let minCount = Infinity;\n    for (let i = nums[index]; i >= 1; i--) {\n      minCount = Math.min(minCount, jump(index + i) + 1);\n    }\n    memo[index] = minCount;\n    return minCount;\n  }\n\n  return jump(0);\n}\n\nconsole.log(jumpTD([3, 0, 8, 2, 0, 0, 1])); // 2\nconsole.log(jumpTD([2, 3, 0, 1, 4])); // 2\nconsole.log(jumpTD([5, 6, 4, 4, 6, 9, 4, 4, 7, 4, 4, 8, 2, 6, 8, 1, 5, 9, 6, 5,\n  2, 7, 9, 7, 9, 6, 9, 4, 1, 6, 8, 8, 4, 4, 2, 0, 3, 8, 5])); // 5\n\n// Bottom-up approach - Tabulation\n// Time Complexity O(n)\n// Space Complexity O(n)\nfunction jumpBU(nums) {\n  const table = Array.from({ length: nums.length }).fill(Infinity);\n  table[nums.length - 1] = 0;\n  for (let i = nums.length - 2; i >= 0; i--) {\n    for (let j = 1; j <= nums[i]; j++) {\n      table[i] = Math.min(table[i], table[i + j] + 1 || Infinity);\n    }\n  }\n  return table[0];\n}\n\nconsole.log(jumpBU([3, 0, 8, 2, 0, 0, 1])); // 2\nconsole.log(jumpBU([2, 3, 0, 1, 4])); // 2\nconsole.log(jumpBU([5, 6, 4, 4, 6, 9, 4, 4, 7, 4, 4, 8, 2, 6, 8, 1, 5, 9, 6, 5,\n  2, 7, 9, 7, 9, 6, 9, 4, 1, 6, 8, 8, 4, 4, 2, 0, 3, 8, 5])); // 5\n\n// Greedy algorithm\n// Time Complexity O(n)\n// Space Complexity O(1)\nfunction jumpGA(nums) {\n  let maxIndex = 0;\n  let currentIndex = 0;\n  let jumps = 0;\n  for (let i = 0; i < nums.length - 1; i++) {\n    maxIndex = Math.max(maxIndex, nums[i] + i);\n    if (i === currentIndex) {\n      jumps++;\n      currentIndex = maxIndex;\n    }\n  }\n  return jumps;\n}\n\nconsole.log(jumpGA([3, 0, 8, 2, 0, 0, 1])); // 2\nconsole.log(jumpGA([2, 3, 0, 1, 4])); // 2\nconsole.log(jumpGA([5, 6, 4, 4, 6, 9, 4, 4, 7, 4, 4, 8, 2, 6, 8, 1, 5, 9, 6, 5,\n  2, 7, 9, 7, 9, 6, 9, 4, 1, 6, 8, 8, 4, 4, 2, 0, 3, 8, 5])); // 5\n",
        "starterCode": {
            "javascript": "// Jump Game2\n// Dynamic Programming\n\n// You are given a 0-indexed array of integers nums of length n.\n// You are initially positioned at nums[0].\n// Each element nums[i] represents the maximum length\n// of a forward jump from index i. In other words, if you are at nums[i],\n// you can jump to any nums[i + j] where: 0 <= j <= nums[i] and i + j < n.\n// Return the minimum number of jumps to reach nums[n - 1].\n// The test cases are generated such that you can reach nums[n - 1].\n\n// Brute Force\n// Time Complexity O(2^n)\n// Space Complexity O(n)\nfunction jumpBF(nums) {\n  function jump(index) {\n    if (index >= nums.length - 1) {\n      return 0;\n    }\n    let minCount = Infinity;\n    for (let i = 1; i <= nums[index]; i++) {\n      minCount = Math.min(minCount, jump(index + i) + 1);\n    }\n    return minCount;\n  }\n\n  return jump(0);\n}\n\nconsole.log(jumpBF([3, 0, 8, 2, 0, 0, 1])); // 2\nconsole.log(jumpBF([2, 3, 0, 1, 4])); // 2\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\n// Time Complexity O(n)\n// Space Complexity O(n)\nfunction jumpTD(nums) {\n  const memo = {};\n\n  function jump(index) {\n    if (memo[index] !== undefined) {\n      return memo[index];\n    }\n    if (index >= nums.length - 1) {\n      return 0;\n    }\n    let minCount = Infinity;\n    for (let i = nums[index]; i >= 1; i--) {\n      minCount = Math.min(minCount, jump(index + i) + 1);\n    }\n    memo[index] = minCount;\n    return minCount;\n  }\n\n  return jump(0);\n}\n\nconsole.log(jumpTD([3, 0, 8, 2, 0, 0, 1])); // 2\nconsole.log(jumpTD([2, 3, 0, 1, 4])); // 2\nconsole.log(jumpTD([5, 6, 4, 4, 6, 9, 4, 4, 7, 4, 4, 8, 2, 6, 8, 1, 5, 9, 6, 5,\n  2, 7, 9, 7, 9, 6, 9, 4, 1, 6, 8, 8, 4, 4, 2, 0, 3, 8, 5])); // 5\n\n// Bottom-up approach - Tabulation\n// Time Complexity O(n)\n// Space Complexity O(n)\nfunction jumpBU(nums) {\n  const table = Array.from({ length: nums.length }).fill(Infinity);\n  table[nums.length - 1] = 0;\n  for (let i = nums.length - 2; i >= 0; i--) {\n    for (let j = 1; j <= nums[i]; j++) {\n      table[i] = Math.min(table[i], table[i + j] + 1 || Infinity);\n    }\n  }\n  return table[0];\n}\n\nconsole.log(jumpBU([3, 0, 8, 2, 0, 0, 1])); // 2\nconsole.log(jumpBU([2, 3, 0, 1, 4])); // 2\nconsole.log(jumpBU([5, 6, 4, 4, 6, 9, 4, 4, 7, 4, 4, 8, 2, 6, 8, 1, 5, 9, 6, 5,\n  2, 7, 9, 7, 9, 6, 9, 4, 1, 6, 8, 8, 4, 4, 2, 0, 3, 8, 5])); // 5\n\n// Greedy algorithm\n// Time Complexity O(n)\n// Space Complexity O(1)\nfunction jumpGA(nums) {\n  let maxIndex = 0;\n  let currentIndex = 0;\n  let jumps = 0;\n  for (let i = 0; i < nums.length - 1; i++) {\n    maxIndex = Math.max(maxIndex, nums[i] + i);\n    if (i === currentIndex) {\n      jumps++;\n      currentIndex = maxIndex;\n    }\n  }\n  return jumps;\n}\n\nconsole.log(jumpGA([3, 0, 8, 2, 0, 0, 1])); // 2\nconsole.log(jumpGA([2, 3, 0, 1, 4])); // 2\nconsole.log(jumpGA([5, 6, 4, 4, 6, 9, 4, 4, 7, 4, 4, 8, 2, 6, 8, 1, 5, 9, 6, 5,\n  2, 7, 9, 7, 9, 6, 9, 4, 1, 6, 8, 8, 4, 4, 2, 0, 3, 8, 5])); // 5\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 60,
        "likes": 788
    },
    {
        "id": "65",
        "title": "Longest Increasing Subsequence",
        "slug": "longest-increasing-subsequence",
        "difficulty": "Medium",
        "topics": [
            "Dynamic Programming"
        ],
        "description": "Given an integer array nums, return the length of the longest strictly increasing subsequence Examples: [10, 9, 2, 5, 3, 7, 101, 18] -> [2, 3, 7, 101] -> 4 [0, 1, 0, 3, 2, 3] -> [0, 1, 2, 3] -> 4 [7, 7, 7, 7] -> [7] -> 1",
        "examples": [
            {
                "input": "lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])",
                "output": "4",
                "explanation": "Based on code execution"
            },
            {
                "input": "lengthOfLIS([0, 1, 0, 3, 2, 3])",
                "output": "4",
                "explanation": "Based on code execution"
            },
            {
                "input": "lengthOfLIS([7, 7, 7, 7, 7, 7, 7])",
                "output": "1",
                "explanation": "Based on code execution"
            },
            {
                "input": "lengthOfLISTD([10, 9, 2, 5, 3, 7, 101, 18])",
                "output": "4",
                "explanation": "Based on code execution"
            },
            {
                "input": "lengthOfLISTD([0, 1, 0, 3, 2, 3])",
                "output": "4",
                "explanation": "Based on code execution"
            },
            {
                "input": "lengthOfLISTD([7, 7, 7, 7, 7, 7, 7])",
                "output": "1",
                "explanation": "Based on code execution"
            },
            {
                "input": "lengthOfLISTD(Array.from(Array(2500).keys()))",
                "output": "2500",
                "explanation": "Based on code execution"
            },
            {
                "input": "lengthOfLISBU([10, 9, 2, 5, 3, 7, 101, 18])",
                "output": "4",
                "explanation": "Based on code execution"
            },
            {
                "input": "lengthOfLISBU([0, 1, 0, 3, 2, 3])",
                "output": "4",
                "explanation": "Based on code execution"
            },
            {
                "input": "lengthOfLISBU([7, 7, 7, 7, 7, 7, 7])",
                "output": "1",
                "explanation": "Based on code execution"
            },
            {
                "input": "lengthOfLISBU(Array.from(Array(2500).keys()))",
                "output": "2500",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Given an integer array nums, return\n// the length of the longest strictly increasing subsequence\n// Examples:\n// [10, 9, 2, 5, 3, 7, 101, 18] -> [2, 3, 7, 101] -> 4\n// [0, 1, 0, 3, 2, 3] -> [0, 1, 2, 3] -> 4\n// [7, 7, 7, 7] -> [7] -> 1\n\n// Brute Force\n// Time Complexity O(2^n) - every iteration we can count with the element or without it\n// Space Complexity O(n) - max recursive stack depth\nfunction lengthOfLIS(nums) {\n  function findLIS(index, prevNum) {\n    if (index >= nums.length) {\n      return 0;\n    }\n    // If the current element greater than the previous element\n    const countWithCurrentNum = nums[index] > prevNum\n      // We can pick it\n      ? findLIS(index + 1, nums[index]) + 1\n      // Otherwise we can't pick it\n      : 0;\n    // Even if the current element greater than the previous element\n    // there is possibility that there is another subsequence\n    // longer than the current subsequence\n    const countWithoutCurrentNum = findLIS(index + 1, prevNum);\n    return Math.max(countWithoutCurrentNum, countWithCurrentNum);\n  }\n\n  return findLIS(0, -Infinity);\n}\n\nconsole.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4\nconsole.log(lengthOfLIS([0, 1, 0, 3, 2, 3])); // 4\nconsole.log(lengthOfLIS([7, 7, 7, 7, 7, 7, 7])); // 1\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\n// Time Complexity O(n^2)\n// Space Complexity O(n)\nfunction lengthOfLISTD(nums) {\n  const memo = {};\n\n  function findLIS(index, prevIndex) {\n    if (index >= nums.length) {\n      return 0;\n    }\n    if (memo[prevIndex]) {\n      return memo[prevIndex];\n    }\n    const countWithoutCurrentNum = findLIS(index + 1, prevIndex);\n    const countWithCurrentNum = (prevIndex === -1 || nums[index] > nums[prevIndex])\n      ? findLIS(index + 1, index) + 1\n      : 0;\n    memo[prevIndex] = Math.max(countWithoutCurrentNum, countWithCurrentNum);\n    return memo[prevIndex];\n  }\n\n  return findLIS(0, -1);\n}\n\nconsole.log(lengthOfLISTD([10, 9, 2, 5, 3, 7, 101, 18])); // 4\nconsole.log(lengthOfLISTD([0, 1, 0, 3, 2, 3])); // 4\nconsole.log(lengthOfLISTD([7, 7, 7, 7, 7, 7, 7])); // 1\nconsole.log(lengthOfLISTD(Array.from(Array(2500).keys()))); // 2500\n\n// Bottom-up approach - Tabulation\n// Time Complexity O(n^2)\n// Space Complexity O(n)\nfunction lengthOfLISBU(nums) {\n  const table = Array.from({ length: nums.length }).fill(1);\n  let result = 1;\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (nums[j] < nums[i]) {\n        table[i] = Math.max(table[i], table[j] + 1);\n        result = Math.max(result, table[i]);\n      }\n    }\n  }\n  return result;\n}\n\nconsole.log(lengthOfLISBU([10, 9, 2, 5, 3, 7, 101, 18])); // 4\nconsole.log(lengthOfLISBU([0, 1, 0, 3, 2, 3])); // 4\nconsole.log(lengthOfLISBU([7, 7, 7, 7, 7, 7, 7])); // 1\nconsole.log(lengthOfLISBU(Array.from(Array(2500).keys()))); // 2500\n",
        "starterCode": {
            "javascript": "// Longest Increasing Subsequence\n// Dynamic Programming\n\n// Given an integer array nums, return\n// the length of the longest strictly increasing subsequence\n// Examples:\n// [10, 9, 2, 5, 3, 7, 101, 18] -> [2, 3, 7, 101] -> 4\n// [0, 1, 0, 3, 2, 3] -> [0, 1, 2, 3] -> 4\n// [7, 7, 7, 7] -> [7] -> 1\n\n// Brute Force\n// Time Complexity O(2^n) - every iteration we can count with the element or without it\n// Space Complexity O(n) - max recursive stack depth\nfunction lengthOfLIS(nums) {\n  function findLIS(index, prevNum) {\n    if (index >= nums.length) {\n      return 0;\n    }\n    // If the current element greater than the previous element\n    const countWithCurrentNum = nums[index] > prevNum\n      // We can pick it\n      ? findLIS(index + 1, nums[index]) + 1\n      // Otherwise we can't pick it\n      : 0;\n    // Even if the current element greater than the previous element\n    // there is possibility that there is another subsequence\n    // longer than the current subsequence\n    const countWithoutCurrentNum = findLIS(index + 1, prevNum);\n    return Math.max(countWithoutCurrentNum, countWithCurrentNum);\n  }\n\n  return findLIS(0, -Infinity);\n}\n\nconsole.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4\nconsole.log(lengthOfLIS([0, 1, 0, 3, 2, 3])); // 4\nconsole.log(lengthOfLIS([7, 7, 7, 7, 7, 7, 7])); // 1\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\n// Time Complexity O(n^2)\n// Space Complexity O(n)\nfunction lengthOfLISTD(nums) {\n  const memo = {};\n\n  function findLIS(index, prevIndex) {\n    if (index >= nums.length) {\n      return 0;\n    }\n    if (memo[prevIndex]) {\n      return memo[prevIndex];\n    }\n    const countWithoutCurrentNum = findLIS(index + 1, prevIndex);\n    const countWithCurrentNum = (prevIndex === -1 || nums[index] > nums[prevIndex])\n      ? findLIS(index + 1, index) + 1\n      : 0;\n    memo[prevIndex] = Math.max(countWithoutCurrentNum, countWithCurrentNum);\n    return memo[prevIndex];\n  }\n\n  return findLIS(0, -1);\n}\n\nconsole.log(lengthOfLISTD([10, 9, 2, 5, 3, 7, 101, 18])); // 4\nconsole.log(lengthOfLISTD([0, 1, 0, 3, 2, 3])); // 4\nconsole.log(lengthOfLISTD([7, 7, 7, 7, 7, 7, 7])); // 1\nconsole.log(lengthOfLISTD(Array.from(Array(2500).keys()))); // 2500\n\n// Bottom-up approach - Tabulation\n// Time Complexity O(n^2)\n// Space Complexity O(n)\nfunction lengthOfLISBU(nums) {\n  const table = Array.from({ length: nums.length }).fill(1);\n  let result = 1;\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (nums[j] < nums[i]) {\n        table[i] = Math.max(table[i], table[j] + 1);\n        result = Math.max(result, table[i]);\n      }\n    }\n  }\n  return result;\n}\n\nconsole.log(lengthOfLISBU([10, 9, 2, 5, 3, 7, 101, 18])); // 4\nconsole.log(lengthOfLISBU([0, 1, 0, 3, 2, 3])); // 4\nconsole.log(lengthOfLISBU([7, 7, 7, 7, 7, 7, 7])); // 1\nconsole.log(lengthOfLISBU(Array.from(Array(2500).keys()))); // 2500\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 65,
        "likes": 14
    },
    {
        "id": "66",
        "title": "Maximum Subarray",
        "slug": "maximum-subarray",
        "difficulty": "Medium",
        "topics": [
            "Dynamic Programming"
        ],
        "description": "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
        "examples": [
            {
                "input": "maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])",
                "output": "6",
                "explanation": "Based on code execution"
            },
            {
                "input": "maxSubArray([-1, 0, -2])",
                "output": "0",
                "explanation": "Based on code execution"
            },
            {
                "input": "maxSubArray([-1])",
                "output": "-1",
                "explanation": "Based on code execution"
            },
            {
                "input": "maxSubArrayWithoutAdditionalSpace([-2, 1, -3, 4, -1, 2, 1, -5, 4])",
                "output": "6",
                "explanation": "Based on code execution"
            },
            {
                "input": "maxSubArrayWithoutAdditionalSpace([-1, 0, -2])",
                "output": "0",
                "explanation": "Based on code execution"
            },
            {
                "input": "maxSubArrayWithoutAdditionalSpace([-1])",
                "output": "-1",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Given an integer array nums, find the contiguous subarray\n// (containing at least one number) which has the largest sum and return its sum.\n\n// Time Complexity O(n)\n// Space Complexity O(n)\nfunction maxSubArray(nums) {\n  const subArraySum = [nums[0]];\n\n  for (let i = 1; i < nums.length; i++) {\n    subArraySum.push(Math.max(nums[i] + subArraySum[i - 1], nums[i]));\n  }\n\n  return Math.max(...subArraySum);\n}\n\nconsole.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6\nconsole.log(maxSubArray([-1, 0, -2])); // 0\nconsole.log(maxSubArray([-1])); // -1\n\n// Time Complexity O(n)\n// Space Complexity O(1)\nfunction maxSubArrayWithoutAdditionalSpace(nums) {\n  for (let i = 1; i < nums.length; i++) {\n    nums[i] = Math.max(nums[i] + nums[i - 1], nums[i]);\n  }\n\n  return Math.max(...nums);\n}\n\nconsole.log(maxSubArrayWithoutAdditionalSpace([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6\nconsole.log(maxSubArrayWithoutAdditionalSpace([-1, 0, -2])); // 0\nconsole.log(maxSubArrayWithoutAdditionalSpace([-1])); // -1\n",
        "starterCode": {
            "javascript": "// Maximum Subarray\n// Dynamic Programming\n\n// Given an integer array nums, find the contiguous subarray\n// (containing at least one number) which has the largest sum and return its sum.\n\n// Time Complexity O(n)\n// Space Complexity O(n)\nfunction maxSubArray(nums) {\n  const subArraySum = [nums[0]];\n\n  for (let i = 1; i < nums.length; i++) {\n    subArraySum.push(Math.max(nums[i] + subArraySum[i - 1], nums[i]));\n  }\n\n  return Math.max(...subArraySum);\n}\n\nconsole.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6\nconsole.log(maxSubArray([-1, 0, -2])); // 0\nconsole.log(maxSubArray([-1])); // -1\n\n// Time Complexity O(n)\n// Space Complexity O(1)\nfunction maxSubArrayWithoutAdditionalSpace(nums) {\n  for (let i = 1; i < nums.length; i++) {\n    nums[i] = Math.max(nums[i] + nums[i - 1], nums[i]);\n  }\n\n  return Math.max(...nums);\n}\n\nconsole.log(maxSubArrayWithoutAdditionalSpace([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6\nconsole.log(maxSubArrayWithoutAdditionalSpace([-1, 0, -2])); // 0\nconsole.log(maxSubArrayWithoutAdditionalSpace([-1])); // -1\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 67,
        "likes": 372
    },
    {
        "id": "67",
        "title": "Min Coin Change",
        "slug": "min-coin-change",
        "difficulty": "Medium",
        "topics": [
            "Dynamic Programming"
        ],
        "description": "Write a function called minCoinChange which accepts two parameters: an array of coins and a amount. The function should return the minimum number of coins needed to make the change. Use Dynamic Programming approach and greedy algorithm.",
        "examples": [
            {
                "input": "minCoinChangeBF([9, 6, 5, 1], 12)",
                "output": "2",
                "explanation": "Based on code execution"
            },
            {
                "input": "minCoinChangeBF([10, 25], 85)",
                "output": "4",
                "explanation": "Based on code execution"
            },
            {
                "input": "minCoinChangeTD([9, 6, 5, 1], 20000)",
                "output": "2223",
                "explanation": "Based on code execution"
            },
            {
                "input": "minCoinChangeTD([10, 25], 85)",
                "output": "4",
                "explanation": "Based on code execution"
            },
            {
                "input": "minCoinChangeBU([10, 25], 135)",
                "output": "{ coins: [ 25, 25, 25, 25, 25, 10 ], minNumberOfCoins: 6 }",
                "explanation": "Based on code execution"
            },
            {
                "input": "minCoinChangeBU([1, 5, 6, 9], 11)",
                "output": "{ coins: [ 6, 5 ], minNumberOfCoins: 2 }",
                "explanation": "Based on code execution"
            },
            {
                "input": "minCoinChangeGA([10, 25], 85)",
                "output": "[ 25, 25, 25, 10 ]",
                "explanation": "Based on code execution"
            },
            {
                "input": "minCoinChangeGA([1, 2, 5, 10, 20, 50, 100], 70)",
                "output": "[ 50, 20 ]",
                "explanation": "Based on code execution"
            },
            {
                "input": "minCoinChangeGA([1, 5, 6, 9], 11)",
                "output": "[ 9, 1, 1 ] - instead of [6, 5]",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Write a function called minCoinChange which accepts two parameters:\n// an array of coins and a amount. The function should return\n// the minimum number of coins needed to make the change.\n// Use Dynamic Programming approach and greedy algorithm.\n\n// Brute Force\n// Time Complexity exponential\nfunction minCoinChangeBF(coins, amount) {\n  if (amount === 0) return 0;\n\n  let result = Infinity;\n\n  for (const coin of coins) {\n    if (coin <= amount) {\n      const currentResult = minCoinChangeBF(coins, amount - coin);\n\n      if (currentResult !== Infinity) result = Math.min(result, currentResult + 1);\n    }\n  }\n\n  return result;\n}\n\nconsole.log(minCoinChangeBF([9, 6, 5, 1], 12)); // 2\nconsole.log(minCoinChangeBF([10, 25], 85)); // 4\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\n// Time Complexity O(amount * coins.length)\n// Space Complexity O(amount * coins.length)\nfunction minCoinChangeTD(coins, amount, memo = {}) {\n  if (amount === 0) return 0;\n\n  if (memo[amount]) return memo[amount];\n\n  let result = Infinity;\n\n  for (const coin of coins) {\n    if (coin <= amount) {\n      const currentResult = minCoinChangeTD(coins, amount - coin, memo);\n\n      if (currentResult !== Infinity) result = Math.min(result, currentResult + 1);\n    }\n  }\n\n  memo[amount] = result;\n\n  return result;\n}\nconsole.log(minCoinChangeTD([9, 6, 5, 1], 20000)); // 2223\nconsole.log(minCoinChangeTD([10, 25], 85)); // 4\n\n// Bottom-up approach - Tabulation\n// Time Complexity O(amount * coins.length)\n// Space Complexity O(amount * coins.length)\nfunction minCoinChangeBU (coins, amount) {\n  const count = Array.from({ length: amount + 1 }).fill(Infinity);\n  const usedCoins = Array.from({ length: amount + 1 }).fill(-1);\n  count[0] = 0;\n\n  for (let i = 0; i < coins.length; i++) {\n    for (let j = coins[i]; j <= amount; j++) {\n      if (count[j] > count[j - coins[i]] + 1) {\n        count[j] = count[j - coins[i]] + 1;\n        usedCoins[j] = coins[i];\n      }\n    }\n  }\n\n  if (count[amount] === Infinity) return { coins: [], minNumberOfCoins: null };\n\n  const coinsResult = [];\n  let currentIndex = amount;\n\n  while (currentIndex > 0 && usedCoins[currentIndex] !== -1) {\n    coinsResult.push(usedCoins[currentIndex]);\n    currentIndex = currentIndex - usedCoins[currentIndex];\n  }\n\n  return { coins: coinsResult, minNumberOfCoins: count[amount] };\n}\n\nconsole.log(minCoinChangeBU([10, 25], 135)); // { coins: [ 25, 25, 25, 25, 25, 10 ], minNumberOfCoins: 6 }\nconsole.log(minCoinChangeBU([1, 5, 6, 9], 11)); // { coins: [ 6, 5 ], minNumberOfCoins: 2 }\n\n// greedy algorithm\n// Time Complexity O(amount)\nfunction minCoinChangeGA(coins, amount) {\n  const result = [];\n  coins.sort((a, b) => a - b);\n\n  for (let i = coins.length - 1; i >= 0; i--) {\n    while (amount >= coins[i]) {\n      result.push(coins[i]);\n      amount -= coins[i];\n    }\n  }\n\n  if (amount) return null;\n  return result;\n}\n\nconsole.log(minCoinChangeGA([10, 25], 85)); // [ 25, 25, 25, 10 ]\nconsole.log(minCoinChangeGA([1, 2, 5, 10, 20, 50, 100], 70)); // [ 50, 20 ]\n\n// greedy algorithm does not always work properly\nconsole.log(minCoinChangeGA([1, 5, 6, 9], 11)); // [ 9, 1, 1 ] - instead of [6, 5]\n",
        "starterCode": {
            "javascript": "// Min Coin Change\n// Dynamic Programming\n\n// Write a function called minCoinChange which accepts two parameters:\n// an array of coins and a amount. The function should return\n// the minimum number of coins needed to make the change.\n// Use Dynamic Programming approach and greedy algorithm.\n\n// Brute Force\n// Time Complexity exponential\nfunction minCoinChangeBF(coins, amount) {\n  if (amount === 0) return 0;\n\n  let result = Infinity;\n\n  for (const coin of coins) {\n    if (coin <= amount) {\n      const currentResult = minCoinChangeBF(coins, amount - coin);\n\n      if (currentResult !== Infinity) result = Math.min(result, currentResult + 1);\n    }\n  }\n\n  return result;\n}\n\nconsole.log(minCoinChangeBF([9, 6, 5, 1], 12)); // 2\nconsole.log(minCoinChangeBF([10, 25], 85)); // 4\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\n// Time Complexity O(amount * coins.length)\n// Space Complexity O(amount * coins.length)\nfunction minCoinChangeTD(coins, amount, memo = {}) {\n  if (amount === 0) return 0;\n\n  if (memo[amount]) return memo[amount];\n\n  let result = Infinity;\n\n  for (const coin of coins) {\n    if (coin <= amount) {\n      const currentResult = minCoinChangeTD(coins, amount - coin, memo);\n\n      if (currentResult !== Infinity) result = Math.min(result, currentResult + 1);\n    }\n  }\n\n  memo[amount] = result;\n\n  return result;\n}\nconsole.log(minCoinChangeTD([9, 6, 5, 1], 20000)); // 2223\nconsole.log(minCoinChangeTD([10, 25], 85)); // 4\n\n// Bottom-up approach - Tabulation\n// Time Complexity O(amount * coins.length)\n// Space Complexity O(amount * coins.length)\nfunction minCoinChangeBU (coins, amount) {\n  const count = Array.from({ length: amount + 1 }).fill(Infinity);\n  const usedCoins = Array.from({ length: amount + 1 }).fill(-1);\n  count[0] = 0;\n\n  for (let i = 0; i < coins.length; i++) {\n    for (let j = coins[i]; j <= amount; j++) {\n      if (count[j] > count[j - coins[i]] + 1) {\n        count[j] = count[j - coins[i]] + 1;\n        usedCoins[j] = coins[i];\n      }\n    }\n  }\n\n  if (count[amount] === Infinity) return { coins: [], minNumberOfCoins: null };\n\n  const coinsResult = [];\n  let currentIndex = amount;\n\n  while (currentIndex > 0 && usedCoins[currentIndex] !== -1) {\n    coinsResult.push(usedCoins[currentIndex]);\n    currentIndex = currentIndex - usedCoins[currentIndex];\n  }\n\n  return { coins: coinsResult, minNumberOfCoins: count[amount] };\n}\n\nconsole.log(minCoinChangeBU([10, 25], 135)); // { coins: [ 25, 25, 25, 25, 25, 10 ], minNumberOfCoins: 6 }\nconsole.log(minCoinChangeBU([1, 5, 6, 9], 11)); // { coins: [ 6, 5 ], minNumberOfCoins: 2 }\n\n// greedy algorithm\n// Time Complexity O(amount)\nfunction minCoinChangeGA(coins, amount) {\n  const result = [];\n  coins.sort((a, b) => a - b);\n\n  for (let i = coins.length - 1; i >= 0; i--) {\n    while (amount >= coins[i]) {\n      result.push(coins[i]);\n      amount -= coins[i];\n    }\n  }\n\n  if (amount) return null;\n  return result;\n}\n\nconsole.log(minCoinChangeGA([10, 25], 85)); // [ 25, 25, 25, 10 ]\nconsole.log(minCoinChangeGA([1, 2, 5, 10, 20, 50, 100], 70)); // [ 50, 20 ]\n\n// greedy algorithm does not always work properly\nconsole.log(minCoinChangeGA([1, 5, 6, 9], 11)); // [ 9, 1, 1 ] - instead of [6, 5]\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 71,
        "likes": 624
    },
    {
        "id": "68",
        "title": "Min Cost Climbing Stairs",
        "slug": "min-cost-climbing-stairs",
        "difficulty": "Medium",
        "topics": [
            "Dynamic Programming"
        ],
        "description": "You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps. You can either start from the step with index 0, or the step with index 1. Return the minimum cost to reach the top of the floor.",
        "examples": [
            {
                "input": "minCostClimbingStairsBF([10, 15, 20])",
                "output": "15",
                "explanation": "Based on code execution"
            },
            {
                "input": "minCostClimbingStairsBF([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])",
                "output": "6",
                "explanation": "Based on code execution"
            },
            {
                "input": "minCostClimbingStairsTD([10, 15, 20])",
                "output": "15",
                "explanation": "Based on code execution"
            },
            {
                "input": "minCostClimbingStairsTD([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])",
                "output": "6",
                "explanation": "Based on code execution"
            },
            {
                "input": "minCostClimbingStairsBU([10, 15, 20])",
                "output": "15",
                "explanation": "Based on code execution"
            },
            {
                "input": "minCostClimbingStairsBU([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])",
                "output": "6",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// You are given an integer array cost where cost[i] is\n// the cost of ith step on a staircase.\n// Once you pay the cost, you can either climb one or two steps.\n// You can either start from the step with index 0, or the step with index 1.\n// Return the minimum cost to reach the top of the floor.\n\n// Brute Force\n// Time Complexity O(2^n)\n// Space Complexity O(n)\nfunction minCostClimbingStairsBF(cost) {\n  function climb(index) {\n    if (index >= cost.length) {\n      return 0;\n    }\n    return Math.min(climb(index + 2), climb(index + 1)) + cost[index];\n  }\n\n  return Math.min(climb(1), climb(0));\n}\n\nconsole.log(minCostClimbingStairsBF([10, 15, 20])); // 15\nconsole.log(minCostClimbingStairsBF([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); // 6\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\n// Time Complexity O(n)\n// Space Complexity O(n)\nfunction minCostClimbingStairsTD(cost) {\n  const memo = {};\n\n  function climb(index) {\n    if (memo[index] !== undefined) {\n      return memo[index];\n    }\n    if (index >= cost.length) {\n      return 0;\n    }\n    memo[index] = Math.min(climb(index + 2), climb(index + 1)) + cost[index];\n    return memo[index];\n  }\n\n  return Math.min(climb(1), climb(0));\n}\n\nconsole.log(minCostClimbingStairsTD([10, 15, 20])); // 15\nconsole.log(minCostClimbingStairsTD([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); // 6\nconsole.log(minCostClimbingStairsTD([841, 462, 566, 398, 243, 248, 238, 650, 989, 576,\n  361, 126, 334, 729, 446, 897, 953, 38, 195, 679, 65, 707, 196, 705, 569, 275, 259, 872, 630,\n  965, 978, 109, 56, 523, 851, 887, 91, 544, 598, 963, 305, 481, 959, 560, 454, 883, 50, 216])); // 10380\n\n// Bottom-up approach - Tabulation\n// Time Complexity O(n)\n// Space Complexity O(n)\nfunction minCostClimbingStairsBU(cost) {\n  const table = Array.from({ length: cost.length }).fill(0);\n  table[0] = cost[0];\n  table[1] = cost[1];\n  for (let i = 2; i < cost.length; i++) {\n    table[i] = Math.min(table[i - 1], table[i - 2]) + cost[i];\n  }\n  return Math.min(table[cost.length - 1], table[cost.length - 2]);\n}\n\nconsole.log(minCostClimbingStairsBU([10, 15, 20])); // 15\nconsole.log(minCostClimbingStairsBU([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); // 6\nconsole.log(minCostClimbingStairsBU([841, 462, 566, 398, 243, 248, 238, 650, 989, 576,\n  361, 126, 334, 729, 446, 897, 953, 38, 195, 679, 65, 707, 196, 705, 569, 275, 259, 872, 630,\n  965, 978, 109, 56, 523, 851, 887, 91, 544, 598, 963, 305, 481, 959, 560, 454, 883, 50, 216])); // 10380\n",
        "starterCode": {
            "javascript": "// Min Cost Climbing Stairs\n// Dynamic Programming\n\n// You are given an integer array cost where cost[i] is\n// the cost of ith step on a staircase.\n// Once you pay the cost, you can either climb one or two steps.\n// You can either start from the step with index 0, or the step with index 1.\n// Return the minimum cost to reach the top of the floor.\n\n// Brute Force\n// Time Complexity O(2^n)\n// Space Complexity O(n)\nfunction minCostClimbingStairsBF(cost) {\n  function climb(index) {\n    if (index >= cost.length) {\n      return 0;\n    }\n    return Math.min(climb(index + 2), climb(index + 1)) + cost[index];\n  }\n\n  return Math.min(climb(1), climb(0));\n}\n\nconsole.log(minCostClimbingStairsBF([10, 15, 20])); // 15\nconsole.log(minCostClimbingStairsBF([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); // 6\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\n// Time Complexity O(n)\n// Space Complexity O(n)\nfunction minCostClimbingStairsTD(cost) {\n  const memo = {};\n\n  function climb(index) {\n    if (memo[index] !== undefined) {\n      return memo[index];\n    }\n    if (index >= cost.length) {\n      return 0;\n    }\n    memo[index] = Math.min(climb(index + 2), climb(index + 1)) + cost[index];\n    return memo[index];\n  }\n\n  return Math.min(climb(1), climb(0));\n}\n\nconsole.log(minCostClimbingStairsTD([10, 15, 20])); // 15\nconsole.log(minCostClimbingStairsTD([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); // 6\nconsole.log(minCostClimbingStairsTD([841, 462, 566, 398, 243, 248, 238, 650, 989, 576,\n  361, 126, 334, 729, 446, 897, 953, 38, 195, 679, 65, 707, 196, 705, 569, 275, 259, 872, 630,\n  965, 978, 109, 56, 523, 851, 887, 91, 544, 598, 963, 305, 481, 959, 560, 454, 883, 50, 216])); // 10380\n\n// Bottom-up approach - Tabulation\n// Time Complexity O(n)\n// Space Complexity O(n)\nfunction minCostClimbingStairsBU(cost) {\n  const table = Array.from({ length: cost.length }).fill(0);\n  table[0] = cost[0];\n  table[1] = cost[1];\n  for (let i = 2; i < cost.length; i++) {\n    table[i] = Math.min(table[i - 1], table[i - 2]) + cost[i];\n  }\n  return Math.min(table[cost.length - 1], table[cost.length - 2]);\n}\n\nconsole.log(minCostClimbingStairsBU([10, 15, 20])); // 15\nconsole.log(minCostClimbingStairsBU([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])); // 6\nconsole.log(minCostClimbingStairsBU([841, 462, 566, 398, 243, 248, 238, 650, 989, 576,\n  361, 126, 334, 729, 446, 897, 953, 38, 195, 679, 65, 707, 196, 705, 569, 275, 259, 872, 630,\n  965, 978, 109, 56, 523, 851, 887, 91, 544, 598, 963, 305, 481, 959, 560, 454, 883, 50, 216])); // 10380\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 56,
        "likes": 332
    },
    {
        "id": "69",
        "title": "Partition Array For Max Sum",
        "slug": "partition-array-for-max-sum",
        "difficulty": "Medium",
        "topics": [
            "Dynamic Programming"
        ],
        "description": "Given an integer array arr, partition the array into (contiguous) sub arrays of length at most k. After partitioning, each subarray has their values changed to become the maximum value of that subarray. Return the largest sum of the given array after partitioning. Constraints: arr[i] >= 0",
        "examples": [
            {
                "input": "maxSumAfterPartitioningBF([1, 15, 7, 9, 2, 5, 10], 3)",
                "output": "84",
                "explanation": "Based on code execution"
            },
            {
                "input": "maxSumAfterPartitioningBF([1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3], 4)",
                "output": "83",
                "explanation": "Based on code execution"
            },
            {
                "input": "maxSumAfterPartitioningTD([1, 15, 7, 9, 2, 5, 10], 3)",
                "output": "84",
                "explanation": "Based on code execution"
            },
            {
                "input": "maxSumAfterPartitioningTD([1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3], 4)",
                "output": "83",
                "explanation": "Based on code execution"
            },
            {
                "input": "maxSumAfterPartitioningBU([1, 15, 7, 9, 2, 5, 10], 3)",
                "output": "84",
                "explanation": "Based on code execution"
            },
            {
                "input": "maxSumAfterPartitioningBU([1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3], 4)",
                "output": "83",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "arr[i] >= 0"
        ],
        "hints": [],
        "solution": "// Given an integer array arr, partition the array\n// into (contiguous) sub arrays of length at most k.\n// After partitioning, each subarray has their values\n// changed to become the maximum value of that subarray.\n// Return the largest sum of the given array after partitioning.\n// Constraints: arr[i] >= 0\n\n// Brute Force\n// Time Complexity O(2^n)\n// Space Complexity O(n)\nfunction maxSumAfterPartitioningBF(arr, k) {\n  function maxSum(index, maxNum, length) {\n    if (index > arr.length - 1) {\n      return 0;\n    }\n    maxNum = Math.max(maxNum, arr[index]);\n    if (length === k) {\n      return maxSum(index + 1, 0, 1) + maxNum * length;\n    }\n    return Math.max(\n      maxSum(index + 1, maxNum, length + 1),\n      maxSum(index + 1, 0, 1) + maxNum * length\n    );\n  }\n\n  return maxSum(0, 0, 1);\n}\n\nconsole.log(maxSumAfterPartitioningBF([1, 15, 7, 9, 2, 5, 10], 3)); // 84\nconsole.log(maxSumAfterPartitioningBF([1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3], 4)); // 83\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\n// Time Complexity O(n)\n// Space Complexity O(n * k)\nfunction maxSumAfterPartitioningTD(arr, k) {\n  const memo = {};\n\n  function maxSum(index, maxNum, length) {\n    if (index > arr.length - 1) {\n      return 0;\n    }\n    const key = `${index}/${length}`;\n    if (memo[key] !== undefined) {\n      return memo[key];\n    }\n    maxNum = Math.max(maxNum, arr[index]);\n    if (length === k) {\n      memo[key] = maxSum(index + 1, 0, 1) + maxNum * length;\n    } else {\n      memo[key] = Math.max(\n        maxSum(index + 1, maxNum, length + 1),\n        maxSum(index + 1, 0, 1) + maxNum * length\n      );\n    }\n    return memo[key];\n  }\n\n  return maxSum(0, 0, 1);\n}\n\nconsole.log(maxSumAfterPartitioningTD([1, 15, 7, 9, 2, 5, 10], 3)); // 84\nconsole.log(maxSumAfterPartitioningTD([1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3], 4)); // 83\nconsole.log(maxSumAfterPartitioningTD([20779, 436849, 274670, 543359, 569973, 280711,\n  252931, 424084, 361618, 430777, 136519, 749292, 933277, 477067, 502755, 695743, 413274,\n  168693, 368216, 677201, 198089, 927218, 633399, 427645, 317246, 403380, 908594, 854847,\n  157024, 719715, 336407, 933488, 599856, 948361, 765131, 335089, 522119, 403981, 866323,\n  519161, 109154, 349141, 764950, 558613, 692211], 26)); // 42389649\n\n// Bottom-up approach - Tabulation\n// Time Complexity O(n)\n// Space Complexity O(n * k)\nfunction maxSumAfterPartitioningBU(arr, k) {\n  const table = Array.from({ length: arr.length + 1 }).fill(0);\n  for (let i = 1; i <= arr.length; i++) {\n    let maxNum = 0;\n    for (let j = 1; j <= k; j++) {\n      if (i >= j) {\n        maxNum = Math.max(maxNum, arr[i - j]);\n        table[i] = Math.max(table[i], table[i - j] + maxNum * j);\n      }\n    }\n  }\n  return table[arr.length];\n}\n\nconsole.log(maxSumAfterPartitioningBU([1, 15, 7, 9, 2, 5, 10], 3)); // 84\nconsole.log(maxSumAfterPartitioningBU([1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3], 4)); // 83\nconsole.log(maxSumAfterPartitioningBU([20779, 436849, 274670, 543359, 569973, 280711,\n  252931, 424084, 361618, 430777, 136519, 749292, 933277, 477067, 502755, 695743, 413274,\n  168693, 368216, 677201, 198089, 927218, 633399, 427645, 317246, 403380, 908594, 854847,\n  157024, 719715, 336407, 933488, 599856, 948361, 765131, 335089, 522119, 403981, 866323,\n  519161, 109154, 349141, 764950, 558613, 692211], 26)); // 42389649\n",
        "starterCode": {
            "javascript": "// Partition Array For Max Sum\n// Dynamic Programming\n\n// Given an integer array arr, partition the array\n// into (contiguous) sub arrays of length at most k.\n// After partitioning, each subarray has their values\n// changed to become the maximum value of that subarray.\n// Return the largest sum of the given array after partitioning.\n// Constraints: arr[i] >= 0\n\n// Brute Force\n// Time Complexity O(2^n)\n// Space Complexity O(n)\nfunction maxSumAfterPartitioningBF(arr, k) {\n  function maxSum(index, maxNum, length) {\n    if (index > arr.length - 1) {\n      return 0;\n    }\n    maxNum = Math.max(maxNum, arr[index]);\n    if (length === k) {\n      return maxSum(index + 1, 0, 1) + maxNum * length;\n    }\n    return Math.max(\n      maxSum(index + 1, maxNum, length + 1),\n      maxSum(index + 1, 0, 1) + maxNum * length\n    );\n  }\n\n  return maxSum(0, 0, 1);\n}\n\nconsole.log(maxSumAfterPartitioningBF([1, 15, 7, 9, 2, 5, 10], 3)); // 84\nconsole.log(maxSumAfterPartitioningBF([1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3], 4)); // 83\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\n// Time Complexity O(n)\n// Space Complexity O(n * k)\nfunction maxSumAfterPartitioningTD(arr, k) {\n  const memo = {};\n\n  function maxSum(index, maxNum, length) {\n    if (index > arr.length - 1) {\n      return 0;\n    }\n    const key = `${index}/${length}`;\n    if (memo[key] !== undefined) {\n      return memo[key];\n    }\n    maxNum = Math.max(maxNum, arr[index]);\n    if (length === k) {\n      memo[key] = maxSum(index + 1, 0, 1) + maxNum * length;\n    } else {\n      memo[key] = Math.max(\n        maxSum(index + 1, maxNum, length + 1),\n        maxSum(index + 1, 0, 1) + maxNum * length\n      );\n    }\n    return memo[key];\n  }\n\n  return maxSum(0, 0, 1);\n}\n\nconsole.log(maxSumAfterPartitioningTD([1, 15, 7, 9, 2, 5, 10], 3)); // 84\nconsole.log(maxSumAfterPartitioningTD([1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3], 4)); // 83\nconsole.log(maxSumAfterPartitioningTD([20779, 436849, 274670, 543359, 569973, 280711,\n  252931, 424084, 361618, 430777, 136519, 749292, 933277, 477067, 502755, 695743, 413274,\n  168693, 368216, 677201, 198089, 927218, 633399, 427645, 317246, 403380, 908594, 854847,\n  157024, 719715, 336407, 933488, 599856, 948361, 765131, 335089, 522119, 403981, 866323,\n  519161, 109154, 349141, 764950, 558613, 692211], 26)); // 42389649\n\n// Bottom-up approach - Tabulation\n// Time Complexity O(n)\n// Space Complexity O(n * k)\nfunction maxSumAfterPartitioningBU(arr, k) {\n  const table = Array.from({ length: arr.length + 1 }).fill(0);\n  for (let i = 1; i <= arr.length; i++) {\n    let maxNum = 0;\n    for (let j = 1; j <= k; j++) {\n      if (i >= j) {\n        maxNum = Math.max(maxNum, arr[i - j]);\n        table[i] = Math.max(table[i], table[i - j] + maxNum * j);\n      }\n    }\n  }\n  return table[arr.length];\n}\n\nconsole.log(maxSumAfterPartitioningBU([1, 15, 7, 9, 2, 5, 10], 3)); // 84\nconsole.log(maxSumAfterPartitioningBU([1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3], 4)); // 83\nconsole.log(maxSumAfterPartitioningBU([20779, 436849, 274670, 543359, 569973, 280711,\n  252931, 424084, 361618, 430777, 136519, 749292, 933277, 477067, 502755, 695743, 413274,\n  168693, 368216, 677201, 198089, 927218, 633399, 427645, 317246, 403380, 908594, 854847,\n  157024, 719715, 336407, 933488, 599856, 948361, 765131, 335089, 522119, 403981, 866323,\n  519161, 109154, 349141, 764950, 558613, 692211], 26)); // 42389649\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 71,
        "likes": 14
    },
    {
        "id": "70",
        "title": "Stairs",
        "slug": "stairs",
        "difficulty": "Medium",
        "topics": [
            "Dynamic Programming"
        ],
        "description": "Write a function called stairs which accepts n number of stairs. Imagine that a person is standing at the bottom of the stairs and wants to reach the top and the person can climb either 1 stair or 2 stairs at a time. Your function should return the number of ways the person can reach the top by only climbing 1 or 2 stairs at a time. Use Dynamic Programming approach.",
        "examples": [
            {
                "input": "stairsBF(7)",
                "output": "21",
                "explanation": "Based on code execution"
            },
            {
                "input": "stairsTD(7)",
                "output": "21",
                "explanation": "Based on code execution"
            },
            {
                "input": "stairsTDFunc(7)",
                "output": "21",
                "explanation": "Based on code execution"
            },
            {
                "input": "stairsBU(7)",
                "output": "21",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Write a function called stairs which accepts n number of stairs.\n// Imagine that a person is standing at the bottom of the stairs and wants\n// to reach the top and the person can climb either 1 stair or 2 stairs at a time.\n// Your function should return the number of ways the person can reach the top\n// by only climbing 1 or 2 stairs at a time.\n// Use Dynamic Programming approach.\n\n// Brute Force\n// Time Complexity O(2^n)\nfunction stairsBF(num) {\n  if (num < 3) return num;\n  return stairsBF(num - 1) + stairsBF(num - 2);\n}\n\nconsole.log(stairsBF(7)); // 21\n\n// Dynamic Programming\n// Time Complexity O(n)\n\n// Top-down approach - Memoization\nfunction stairsTD(num, cache = {}) {\n  if (typeof cache[num] !== 'undefined') return cache[num];\n  if (num < 3) return num;\n\n  cache[num] = stairsTD(num - 1, cache) + stairsTD(num - 2, cache);\n\n  return cache[num];\n}\n\nconsole.log(stairsTD(7)); // 21\n\n// With a memoization function (does memoization between calls)\nfunction memoize(fn) {\n  const cache = {};\n\n  return function(arg) {\n    if (typeof cache[arg] !== 'undefined') return cache[arg];\n\n    cache[arg] = fn.call(this, arg);\n\n    return cache[arg];\n  };\n}\n\nconst memStairs = memoize(stairsTDFunc);\n\nfunction stairsTDFunc(num) {\n  if (num < 3) return num;\n\n  return memStairs(num - 1) + memStairs(num - 2);\n}\n\nconsole.log(stairsTDFunc(7)); // 21\n\n// Bottom-up approach - Tabulation\nfunction stairsBU(num) {\n  if (num < 3) return num;\n\n  let prevNumber = 1;\n  let currentNumber = 1;\n  let temp;\n\n  for (let i = 2; i <= num; i++) {\n    temp = currentNumber;\n    currentNumber += prevNumber;\n    prevNumber = temp;\n  }\n\n  return currentNumber;\n}\n\nconsole.log(stairsBU(7)); // 21\n",
        "starterCode": {
            "javascript": "// Stairs\n// Dynamic Programming\n\n// Write a function called stairs which accepts n number of stairs.\n// Imagine that a person is standing at the bottom of the stairs and wants\n// to reach the top and the person can climb either 1 stair or 2 stairs at a time.\n// Your function should return the number of ways the person can reach the top\n// by only climbing 1 or 2 stairs at a time.\n// Use Dynamic Programming approach.\n\n// Brute Force\n// Time Complexity O(2^n)\nfunction stairsBF(num) {\n  if (num < 3) return num;\n  return stairsBF(num - 1) + stairsBF(num - 2);\n}\n\nconsole.log(stairsBF(7)); // 21\n\n// Dynamic Programming\n// Time Complexity O(n)\n\n// Top-down approach - Memoization\nfunction stairsTD(num, cache = {}) {\n  if (typeof cache[num] !== 'undefined') return cache[num];\n  if (num < 3) return num;\n\n  cache[num] = stairsTD(num - 1, cache) + stairsTD(num - 2, cache);\n\n  return cache[num];\n}\n\nconsole.log(stairsTD(7)); // 21\n\n// With a memoization function (does memoization between calls)\nfunction memoize(fn) {\n  const cache = {};\n\n  return function(arg) {\n    if (typeof cache[arg] !== 'undefined') return cache[arg];\n\n    cache[arg] = fn.call(this, arg);\n\n    return cache[arg];\n  };\n}\n\nconst memStairs = memoize(stairsTDFunc);\n\nfunction stairsTDFunc(num) {\n  if (num < 3) return num;\n\n  return memStairs(num - 1) + memStairs(num - 2);\n}\n\nconsole.log(stairsTDFunc(7)); // 21\n\n// Bottom-up approach - Tabulation\nfunction stairsBU(num) {\n  if (num < 3) return num;\n\n  let prevNumber = 1;\n  let currentNumber = 1;\n  let temp;\n\n  for (let i = 2; i <= num; i++) {\n    temp = currentNumber;\n    currentNumber += prevNumber;\n    prevNumber = temp;\n  }\n\n  return currentNumber;\n}\n\nconsole.log(stairsBU(7)); // 21\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 70,
        "likes": 785
    },
    {
        "id": "71",
        "title": "Word Break",
        "slug": "word-break",
        "difficulty": "Medium",
        "topics": [
            "Dynamic Programming"
        ],
        "description": "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words. Note that the same word in the dictionary may be reused multiple times in the segmentation. Examples: s = \"applepenapple\", wordDict = [\"apple\",\"pen\"] -> apple + pen + apple -> true s = \"cars\", wordDict = [\"car\",\"ca\",\"rs\"] -> ca + rs -> true s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"] -> cats + and + og || cat + sand + og -> false",
        "examples": [
            {
                "input": "wordBreak('applepenapple', ['apple', 'pen'])",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "wordBreak('cars', ['car', 'ca', 'rs'])",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "wordBreakTD('applepenapple', ['apple', 'pen'])",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "wordBreakTD('cars', ['car', 'ca', 'rs'])",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "wordBreakTD('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "wordBreakBU('applepenapple', ['apple', 'pen'])",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "wordBreakBU('cars', ['car', 'ca', 'rs'])",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "wordBreakBU('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])",
                "output": "false",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Given a string s and a dictionary of strings wordDict,\n// return true if s can be segmented into a space-separated sequence\n// of one or more dictionary words.\n// Note that the same word in the dictionary may be reused\n// multiple times in the segmentation.\n// Examples:\n// s = \"applepenapple\", wordDict = [\"apple\",\"pen\"] -> apple + pen + apple -> true\n// s = \"cars\", wordDict = [\"car\",\"ca\",\"rs\"] -> ca + rs -> true\n// s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"] -> cats + and + og || cat + sand + og -> false\n\n// Brute Force\nfunction wordBreak(s, wordDict) {\n  if (!s) {\n    return true;\n  }\n  for (const word of wordDict) {\n    if (s.substring(0, word.length) === word &&\n      wordBreak(s.substring(word.length), wordDict)) {\n      return true;\n    }\n  }\n  return false;\n}\n\nconsole.log(wordBreak('applepenapple', ['apple', 'pen'])); // true\nconsole.log(wordBreak('cars', ['car', 'ca', 'rs'])); // true\nconsole.log(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])); // false\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\nfunction wordBreakTD(s, wordDict, memo = {}) {\n  if (!s) {\n    return true;\n  }\n  if (memo[s] !== undefined) {\n    return memo[s];\n  }\n  for (const word of wordDict) {\n    if (s.substring(0, word.length) === word &&\n      wordBreakTD(s.substring(word.length), wordDict, memo)) {\n      memo[s] = true;\n      return true;\n    }\n  }\n  memo[s] = false;\n  return false;\n}\n\nconsole.log(wordBreakTD('applepenapple', ['apple', 'pen'])); // true\nconsole.log(wordBreakTD('cars', ['car', 'ca', 'rs'])); // true\nconsole.log(wordBreakTD('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])); // false\nconsole.log(wordBreakTD('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab',\n  ['a', 'aa', 'aaa', 'aaaa', 'aaaaa', 'aaaaaa', 'aaaaaaa', 'aaaaaaaa', 'aaaaaaaaa', 'aaaaaaaaaa'])); // false\n\n// Bottom-up approach - Tabulation\nfunction wordBreakBU(s, wordDict) {\n  const table = Array.from({ length: s.length + 1 }).fill(false);\n  table[0] = true;\n  for (let i = 0; i < table.length; i++) {\n    if (table[i]) {\n      for (const word of wordDict) {\n        if (i + word.length <= table.length &&\n          s.substring(i, i + word.length) === word) {\n          table[i + word.length] = true;\n        }\n      }\n    }\n  }\n  return table[s.length];\n}\n\nconsole.log(wordBreakBU('applepenapple', ['apple', 'pen'])); // true\nconsole.log(wordBreakBU('cars', ['car', 'ca', 'rs'])); // true\nconsole.log(wordBreakBU('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])); // false\nconsole.log(wordBreakBU('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab',\n  ['a', 'aa', 'aaa', 'aaaa', 'aaaaa', 'aaaaaa', 'aaaaaaa', 'aaaaaaaa', 'aaaaaaaaa', 'aaaaaaaaaa'])); // false\n",
        "starterCode": {
            "javascript": "// Word Break\n// Dynamic Programming\n\n// Given a string s and a dictionary of strings wordDict,\n// return true if s can be segmented into a space-separated sequence\n// of one or more dictionary words.\n// Note that the same word in the dictionary may be reused\n// multiple times in the segmentation.\n// Examples:\n// s = \"applepenapple\", wordDict = [\"apple\",\"pen\"] -> apple + pen + apple -> true\n// s = \"cars\", wordDict = [\"car\",\"ca\",\"rs\"] -> ca + rs -> true\n// s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"] -> cats + and + og || cat + sand + og -> false\n\n// Brute Force\nfunction wordBreak(s, wordDict) {\n  if (!s) {\n    return true;\n  }\n  for (const word of wordDict) {\n    if (s.substring(0, word.length) === word &&\n      wordBreak(s.substring(word.length), wordDict)) {\n      return true;\n    }\n  }\n  return false;\n}\n\nconsole.log(wordBreak('applepenapple', ['apple', 'pen'])); // true\nconsole.log(wordBreak('cars', ['car', 'ca', 'rs'])); // true\nconsole.log(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])); // false\n\n// Dynamic Programming\n\n// Top-down approach - Memoization\nfunction wordBreakTD(s, wordDict, memo = {}) {\n  if (!s) {\n    return true;\n  }\n  if (memo[s] !== undefined) {\n    return memo[s];\n  }\n  for (const word of wordDict) {\n    if (s.substring(0, word.length) === word &&\n      wordBreakTD(s.substring(word.length), wordDict, memo)) {\n      memo[s] = true;\n      return true;\n    }\n  }\n  memo[s] = false;\n  return false;\n}\n\nconsole.log(wordBreakTD('applepenapple', ['apple', 'pen'])); // true\nconsole.log(wordBreakTD('cars', ['car', 'ca', 'rs'])); // true\nconsole.log(wordBreakTD('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])); // false\nconsole.log(wordBreakTD('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab',\n  ['a', 'aa', 'aaa', 'aaaa', 'aaaaa', 'aaaaaa', 'aaaaaaa', 'aaaaaaaa', 'aaaaaaaaa', 'aaaaaaaaaa'])); // false\n\n// Bottom-up approach - Tabulation\nfunction wordBreakBU(s, wordDict) {\n  const table = Array.from({ length: s.length + 1 }).fill(false);\n  table[0] = true;\n  for (let i = 0; i < table.length; i++) {\n    if (table[i]) {\n      for (const word of wordDict) {\n        if (i + word.length <= table.length &&\n          s.substring(i, i + word.length) === word) {\n          table[i + word.length] = true;\n        }\n      }\n    }\n  }\n  return table[s.length];\n}\n\nconsole.log(wordBreakBU('applepenapple', ['apple', 'pen'])); // true\nconsole.log(wordBreakBU('cars', ['car', 'ca', 'rs'])); // true\nconsole.log(wordBreakBU('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])); // false\nconsole.log(wordBreakBU('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab',\n  ['a', 'aa', 'aaa', 'aaaa', 'aaaaa', 'aaaaaa', 'aaaaaaa', 'aaaaaaaa', 'aaaaaaaaa', 'aaaaaaaaaa'])); // false\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 81,
        "likes": 996
    },
    {
        "id": "72",
        "title": "Anagram",
        "slug": "anagram",
        "difficulty": "Medium",
        "topics": [
            "Hashing"
        ],
        "description": "Frequency Counter - validAnagram Given two strings, write a function to determine if the second string is an anagram of the first. An anagram is a word, phrase, or name formed by rearranging the letters of another, such as cinema, formed from iceman. Note: You may assume the string contains only lowercase alphabets.",
        "examples": [
            {
                "input": "validAnagram('anagram', 'nagaram')",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "validAnagram('rat', 'car')",
                "output": "false",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Frequency Counter - validAnagram\n// Given two strings, write a function to determine if the second string is\n// an anagram of the first. An anagram is a word, phrase, or name formed\n// by rearranging the letters of another, such as cinema, formed from iceman.\n// Note: You may assume the string contains only lowercase alphabets.\n\n// Time Complexity - O(n)\n\nfunction validAnagram(word1, word2) {\n  if (word1.length !== word2.length) return false;\n\n  const obj = {};\n\n  for (const char of word1) {\n    obj[char] = ++obj[char] || 1;\n  }\n\n  for (const char of word2) {\n    if (obj[char]) obj[char]--;\n    else return false;\n  }\n\n  return true;\n}\n\nconsole.log(validAnagram('anagram', 'nagaram')); // true\nconsole.log(validAnagram('rat', 'car')); // false\n",
        "starterCode": {
            "javascript": "// Anagram\n// Hashing\n\n// Frequency Counter - validAnagram\n// Given two strings, write a function to determine if the second string is\n// an anagram of the first. An anagram is a word, phrase, or name formed\n// by rearranging the letters of another, such as cinema, formed from iceman.\n// Note: You may assume the string contains only lowercase alphabets.\n\n// Time Complexity - O(n)\n\nfunction validAnagram(word1, word2) {\n  if (word1.length !== word2.length) return false;\n\n  const obj = {};\n\n  for (const char of word1) {\n    obj[char] = ++obj[char] || 1;\n  }\n\n  for (const char of word2) {\n    if (obj[char]) obj[char]--;\n    else return false;\n  }\n\n  return true;\n}\n\nconsole.log(validAnagram('anagram', 'nagaram')); // true\nconsole.log(validAnagram('rat', 'car')); // false\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 60,
        "likes": 656
    },
    {
        "id": "73",
        "title": "Are There Duplicates",
        "slug": "are-there-duplicates",
        "difficulty": "Medium",
        "topics": [
            "Hashing"
        ],
        "description": "Frequency Counter - areThereDuplicates Implement a function called areThereDuplicates which accepts a variable number of arguments, and checks whether there are any duplicates among the arguments passed in.",
        "examples": [
            {
                "input": "areThereDuplicates(1, 2, 3)",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "areThereDuplicates('a', 'b', 'c', 'a')",
                "output": "true",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Frequency Counter - areThereDuplicates\n// Implement a function called areThereDuplicates which accepts a variable number of arguments,\n// and checks whether there are any duplicates among the arguments passed in.\n\n// Restrictions: Time Complexity - O(n), Space Complexity - O(n)\n\nfunction areThereDuplicates(...args) {\n  if (!args.length) return false;\n\n  const lookup = {};\n\n  for (const item of args) {\n    if (lookup[item]) return true;\n    lookup[item] = 1;\n  }\n\n  return false;\n}\n\nconsole.log(areThereDuplicates(1, 2, 3)); // false\nconsole.log(areThereDuplicates('a', 'b', 'c', 'a')); // true\n",
        "starterCode": {
            "javascript": "// Are There Duplicates\n// Hashing\n\n// Frequency Counter - areThereDuplicates\n// Implement a function called areThereDuplicates which accepts a variable number of arguments,\n// and checks whether there are any duplicates among the arguments passed in.\n\n// Restrictions: Time Complexity - O(n), Space Complexity - O(n)\n\nfunction areThereDuplicates(...args) {\n  if (!args.length) return false;\n\n  const lookup = {};\n\n  for (const item of args) {\n    if (lookup[item]) return true;\n    lookup[item] = 1;\n  }\n\n  return false;\n}\n\nconsole.log(areThereDuplicates(1, 2, 3)); // false\nconsole.log(areThereDuplicates('a', 'b', 'c', 'a')); // true\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 69,
        "likes": 221
    },
    {
        "id": "74",
        "title": "Construct Note",
        "slug": "construct-note",
        "difficulty": "Medium",
        "topics": [
            "Hashing"
        ],
        "description": "Frequency Counter - constructNote Write a function called constructNote, which accepts two strings, a message and some letters. The function should return true if the message can be built with the letters that you are given, or it should return false. Assume that there are only lowercase letters and no space or special characters in both the message and the letters.",
        "examples": [
            {
                "input": "constructNote('aa', 'abc')",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "constructNote('abc', 'dcba')",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "constructNote('aabbcc', 'bcabcaddff')",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "constructNote('aabbcc', 'bc')",
                "output": "false",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "If M is the length of message and N is the length of letters:",
            "Time Complexity: O(M+N)",
            "Space Complexity: O(N)"
        ],
        "hints": [],
        "solution": "// Frequency Counter - constructNote\n// Write a function called constructNote, which accepts two strings, a message and some letters.\n// The function should return true if the message can be built with the letters\n// that you are given, or it should return false.\n// Assume that there are only lowercase letters and no space or\n// special characters in both the message and the letters.\n\n// Bonus Constraints:\n// If M is the length of message and N is the length of letters:\n// Time Complexity: O(M+N)\n// Space Complexity: O(N)\n\nfunction constructNote(message, letters) {\n  const obj = {};\n\n  for (const char of letters) {\n    obj[char] = ++obj[char] || 1;\n  }\n\n  for (const char of message) {\n    if (!obj[char]) return false;\n    obj[char]--;\n  }\n\n  return true;\n}\n\nconsole.log(constructNote('aa', 'abc')); // false\nconsole.log(constructNote('abc', 'dcba')); // true\nconsole.log(constructNote('aabbcc', 'bcabcaddff')); // true\nconsole.log(constructNote('aabbcc', 'bc')); // false\n",
        "starterCode": {
            "javascript": "// Construct Note\n// Hashing\n\n// Frequency Counter - constructNote\n// Write a function called constructNote, which accepts two strings, a message and some letters.\n// The function should return true if the message can be built with the letters\n// that you are given, or it should return false.\n// Assume that there are only lowercase letters and no space or\n// special characters in both the message and the letters.\n\n// Bonus Constraints:\n// If M is the length of message and N is the length of letters:\n// Time Complexity: O(M+N)\n// Space Complexity: O(N)\n\nfunction constructNote(message, letters) {\n  const obj = {};\n\n  for (const char of letters) {\n    obj[char] = ++obj[char] || 1;\n  }\n\n  for (const char of message) {\n    if (!obj[char]) return false;\n    obj[char]--;\n  }\n\n  return true;\n}\n\nconsole.log(constructNote('aa', 'abc')); // false\nconsole.log(constructNote('abc', 'dcba')); // true\nconsole.log(constructNote('aabbcc', 'bcabcaddff')); // true\nconsole.log(constructNote('aabbcc', 'bc')); // false\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 52,
        "likes": 325
    },
    {
        "id": "75",
        "title": "Find All Duplicates",
        "slug": "find-all-duplicates",
        "difficulty": "Medium",
        "topics": [
            "Hashing"
        ],
        "description": "Frequency Counter - findAllDuplicates Given an array of positive integers, some elements appear twice and others appear once. Find all the elements that appear twice in this array. Note that you can return the elements in any order.",
        "examples": [
            {
                "input": "findAllDuplicates([4, 3, 2, 1, 0])",
                "output": "[]",
                "explanation": "Based on code execution"
            },
            {
                "input": "findAllDuplicates([4, 3, 2, 1, 0, 1, 2, 3])",
                "output": "array with 3, 2 and 1",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Frequency Counter - findAllDuplicates\n// Given an array of positive integers, some elements appear twice and others appear once.\n// Find all the elements that appear twice in this array.\n// Note that you can return the elements in any order.\n\n// Time Complexity - O(n)\n\nfunction findAllDuplicates(arr) {\n  const obj = {};\n  const resultArr = [];\n\n  for (const item of arr) {\n    obj[item] = ++obj[item] || 1;\n    if (obj[item] > 1) resultArr.push(item);\n  }\n\n  return resultArr;\n}\n\nconsole.log(findAllDuplicates([4, 3, 2, 1, 0])); // []\nconsole.log(findAllDuplicates([4, 3, 2, 1, 0, 1, 2, 3])); // array with 3, 2 and 1\n",
        "starterCode": {
            "javascript": "// Find All Duplicates\n// Hashing\n\n// Frequency Counter - findAllDuplicates\n// Given an array of positive integers, some elements appear twice and others appear once.\n// Find all the elements that appear twice in this array.\n// Note that you can return the elements in any order.\n\n// Time Complexity - O(n)\n\nfunction findAllDuplicates(arr) {\n  const obj = {};\n  const resultArr = [];\n\n  for (const item of arr) {\n    obj[item] = ++obj[item] || 1;\n    if (obj[item] > 1) resultArr.push(item);\n  }\n\n  return resultArr;\n}\n\nconsole.log(findAllDuplicates([4, 3, 2, 1, 0])); // []\nconsole.log(findAllDuplicates([4, 3, 2, 1, 0, 1, 2, 3])); // array with 3, 2 and 1\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 66,
        "likes": 550
    },
    {
        "id": "76",
        "title": "Find Pair",
        "slug": "find-pair",
        "difficulty": "Medium",
        "topics": [
            "Hashing"
        ],
        "description": "Frequency Counter - findPair Given an unsorted array and a number n, find if there exists a pair of elements in the array whose difference is n. This function should return true if the pair exists or false if it does not.",
        "examples": [
            {
                "input": "findPair([6, 1, 4, 10, 2, 4], 2)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "findPair([8, 6, 2, 4, 1, 0, 2, 5, 13], 1)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "findPair([4, -2, 3, 10], -6)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "findPair([6, 1, 4, 10, 2, 4], 22)",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "findPair([], 0)",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "findPair([5, 5], 0)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "findPair([-4, 4], -8)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "findPair([-4, 4], 8)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "findPair([1, 3, 4, 6], -2)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "findPair([0, 1, 3, 4, 6], -2)",
                "output": "true",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Frequency Counter - findPair\n// Given an unsorted array and a number n, find if there exists a pair of elements\n// in the array whose difference is n. This function should return true\n// if the pair exists or false if it does not.\n\n// Solve this with the following requirements:\n// Time Complexity - O(n)\n// Space Complexity - O(n)\n\nfunction findPair(arr, num) {\n  const obj = {};\n\n  for (const item of arr) {\n    if (obj[item - num] || obj[item + num]) return true;\n    obj[item] = item;\n  }\n\n  return false;\n}\n\nconsole.log(findPair([6, 1, 4, 10, 2, 4], 2)); // true\nconsole.log(findPair([8, 6, 2, 4, 1, 0, 2, 5, 13], 1)); // true\nconsole.log(findPair([4, -2, 3, 10], -6)); // true\nconsole.log(findPair([6, 1, 4, 10, 2, 4], 22)); // false\nconsole.log(findPair([], 0)); // false\nconsole.log(findPair([5, 5], 0)); // true\nconsole.log(findPair([-4, 4], -8)); // true\nconsole.log(findPair([-4, 4], 8)); // true\nconsole.log(findPair([1, 3, 4, 6], -2)); // true\nconsole.log(findPair([0, 1, 3, 4, 6], -2)); // true\n",
        "starterCode": {
            "javascript": "// Find Pair\n// Hashing\n\n// Frequency Counter - findPair\n// Given an unsorted array and a number n, find if there exists a pair of elements\n// in the array whose difference is n. This function should return true\n// if the pair exists or false if it does not.\n\n// Solve this with the following requirements:\n// Time Complexity - O(n)\n// Space Complexity - O(n)\n\nfunction findPair(arr, num) {\n  const obj = {};\n\n  for (const item of arr) {\n    if (obj[item - num] || obj[item + num]) return true;\n    obj[item] = item;\n  }\n\n  return false;\n}\n\nconsole.log(findPair([6, 1, 4, 10, 2, 4], 2)); // true\nconsole.log(findPair([8, 6, 2, 4, 1, 0, 2, 5, 13], 1)); // true\nconsole.log(findPair([4, -2, 3, 10], -6)); // true\nconsole.log(findPair([6, 1, 4, 10, 2, 4], 22)); // false\nconsole.log(findPair([], 0)); // false\nconsole.log(findPair([5, 5], 0)); // true\nconsole.log(findPair([-4, 4], -8)); // true\nconsole.log(findPair([-4, 4], 8)); // true\nconsole.log(findPair([1, 3, 4, 6], -2)); // true\nconsole.log(findPair([0, 1, 3, 4, 6], -2)); // true\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 61,
        "likes": 493
    },
    {
        "id": "77",
        "title": "Same Frequency",
        "slug": "same-frequency",
        "difficulty": "Medium",
        "topics": [
            "Hashing"
        ],
        "description": "Frequency Counter - sameFrequency Write a function called sameFrequency. Given two positive integers, find out if the two numbers have the same frequency of digits.",
        "examples": [
            {
                "input": "sameFrequency(34, 14)",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "sameFrequency(3589578, 5879385)",
                "output": "true",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Frequency Counter - sameFrequency\n// Write a function called sameFrequency. Given two positive integers,\n// find out if the two numbers have the same frequency of digits.\n\n// Your solution MUST have the following complexities: Time: O(N)\n\nfunction sameFrequency(num1, num2) {\n  const str1 = `${num1}`;\n  const str2 = `${num2}`;\n\n  if (str1.length !== str2.length) return false;\n\n  const obj = {};\n\n  for (const char of str1) {\n    obj[char] = ++obj[char] || 1;\n  }\n\n  for (const char of str2) {\n    if (!obj[char]) return false;\n    obj[char]--;\n  }\n\n  return true;\n}\n\nconsole.log(sameFrequency(34, 14)); // false\nconsole.log(sameFrequency(3589578, 5879385)); // true\n",
        "starterCode": {
            "javascript": "// Same Frequency\n// Hashing\n\n// Frequency Counter - sameFrequency\n// Write a function called sameFrequency. Given two positive integers,\n// find out if the two numbers have the same frequency of digits.\n\n// Your solution MUST have the following complexities: Time: O(N)\n\nfunction sameFrequency(num1, num2) {\n  const str1 = `${num1}`;\n  const str2 = `${num2}`;\n\n  if (str1.length !== str2.length) return false;\n\n  const obj = {};\n\n  for (const char of str1) {\n    obj[char] = ++obj[char] || 1;\n  }\n\n  for (const char of str2) {\n    if (!obj[char]) return false;\n    obj[char]--;\n  }\n\n  return true;\n}\n\nconsole.log(sameFrequency(34, 14)); // false\nconsole.log(sameFrequency(3589578, 5879385)); // true\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 58,
        "likes": 395
    },
    {
        "id": "78",
        "title": "Divisible Numbers",
        "slug": "divisible-numbers",
        "difficulty": "Medium",
        "topics": [
            "Math"
        ],
        "description": "Write a program that iterates through integers from 0 to infinity and displays those integers that are divisible without remainder by the number of digits of this number (i.e., those two-digit numbers that are divisible by 2, three-digit numbers by three, etc.). The program should stop when N (specified by the user) of such numbers is output.",
        "examples": [
            {
                "input": "i",
                "output": "See console output"
            },
            {
                "input": "i",
                "output": "See console output"
            },
            {
                "input": "j",
                "output": "See console output"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Write a program that iterates through integers from 0 to infinity and\n// displays those integers that are divisible without remainder by the number\n// of digits of this number (i.e., those two-digit numbers that are divisible by 2,\n// three-digit numbers by three, etc.). The program should stop when N (specified by the user)\n// of such numbers is output.\n\n// Counts digits as the length of a string\nconst findDivisibleNumbersUsingString = n => {\n  if (n < 0) throw new Error('n must be non-negative.');\n  let count = 0;\n  let i = 0;\n  while (count !== n) {\n    if (i < 10 || !(i % `${i}`.length)) {\n      console.log(i);\n      count++;\n    }\n    i++;\n  }\n};\n\nfindDivisibleNumbersUsingString(28);\n// 0 1 2 3 4 5 6 7 8 9 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40 42 44\n\n// Counts digits using math\nconst countDigits = n => {\n  let digits = 0;\n  while (n) {\n    n = Math.floor(n / 10);\n    digits++;\n  }\n  return digits;\n};\n\nconst findDivisibleNumbersUsingMath = n => {\n  if (n < 0) throw new Error('n must be non-negative.');\n  let count = 0;\n  let i = 0;\n  while (count !== n) {\n    if (i < 10 || !(i % countDigits(i))) {\n      console.log(i);\n      count++;\n    }\n    i++;\n  }\n};\n\nfindDivisibleNumbersUsingMath(120);\n// 0 1 2 3 4 5 6 7 8 9 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40 42 44 46 48 50 52 54 56 58 60 62 64 66 68\n// 70 72 74 76 78 80 82 84 86 88 90 92 94 96 98 102 105 108 111 114 117 120 123 126 129 132 135 138 141 144 147\n// 150 153 156 159 162 165 168 171 174 177 180 183 186 189 192 195 198 201 204 207 210 213 216 219 222 225 228 231\n// 234 237 240 243 246 249 252 255 258 261 264 267 270 273 276 279 282 285 288 291 294\n\n// More efficient version\nconst findDivisibleNumbersQuick = n => {\n  if (n < 0) throw new Error('n must be non-negative.');\n  let start = 0;\n  let end = 10;\n  let digits = 1;\n  let count = 0;\n  while (n !== count) {\n    for (let j = start; j < end; j += digits) {\n      console.log(j);\n      count++;\n      if (n === count) return;\n    }\n    digits++;\n    start = end;\n    end = start * 10;\n    while (start % digits) {\n      start++;\n    }\n  }\n};\n\nfindDivisibleNumbersQuick(500);\n// 0 1 2 3 4 5 6 7 8 9 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40 42 44 46 48 50 52 54 56 58 60 62 64 66 68\n// 70 72 74 76 78 80 82 84 86 88 90 92 94 96 98 102 105 108 111 114 117 120 123 126 129 132 135 138 141 144 147\n// 150 153 156 159 162 165 168 171 174 177 180 183 186 189 192 195 198 201 204 207 210 213 216 219 222 225 228 231\n// 234 237 240 243 246 249 252 255 258 261 264 267 270 273 276 279 282 285 288 291 294 297 300 303 306 309 312 315\n// 318 321 324 327 330 333 336 339 342 345 348 351 354 357 360 363 366 369 372 375 378 381 384 387 390 393 396 399\n// 402 405 408 411 414 417 420 423 426 429 432 435 438 441 444 447 450 453 456 459 462 465 468 471 474 477 480 483\n// 486 489 492 495 498 501 504 507 510 513 516 519 522 525 528 531 534 537 540 543 546 549 552 555 558 561 564 567\n// 570 573 576 579 582 585 588 591 594 597 600 603 606 609 612 615 618 621 624 627 630 633 636 639 642 645 648 651\n// 654 657 660 663 666 669 672 675 678 681 684 687 690 693 696 699 702 705 708 711 714 717 720 723 726 729 732 735\n// 738 741 744 747 750 753 756 759 762 765 768 771 774 777 780 783 786 789 792 795 798 801 804 807 810 813 816 819\n// 822 825 828 831 834 837 840 843 846 849 852 855 858 861 864 867 870 873 876 879 882 885 888 891 894 897 900 903\n// 906 909 912 915 918 921 924 927 930 933 936 939 942 945 948 951 954 957 960 963 966 969 972 975 978 981 984 987\n// 990 993 996 999 1000 1004 1008 1012 1016 1020 1024 1028 1032 1036 1040 1044 1048 1052 1056 1060 1064 1068 1072\n// 1076 1080 1084 1088 1092 1096 1100 1104 1108 1112 1116 1120 1124 1128 1132 1136 1140 1144 1148 1152 1156 1160\n// 1164 1168 1172 1176 1180 1184 1188 1192 1196 1200 1204 1208 1212 1216 1220 1224 1228 1232 1236 1240 1244 1248\n// 1252 1256 1260 1264 1268 1272 1276 1280 1284 1288 1292 1296 1300 1304 1308 1312 1316 1320 1324 1328 1332 1336\n// 1340 1344 1348 1352 1356 1360 1364 1368 1372 1376 1380 1384 1388 1392 1396 1400 1404 1408 1412 1416 1420 1424\n// 1428 1432 1436 1440 1444 1448 1452 1456 1460 1464 1468 1472 1476 1480 1484 1488 1492 1496 1500 1504 1508 1512\n// 1516 1520 1524 1528 1532 1536 1540 1544 1548 1552 1556 1560 1564 1568 1572 1576\n",
        "starterCode": {
            "javascript": "// Divisible Numbers\n// Math\n\n// Write a program that iterates through integers from 0 to infinity and\n// displays those integers that are divisible without remainder by the number\n// of digits of this number (i.e., those two-digit numbers that are divisible by 2,\n// three-digit numbers by three, etc.). The program should stop when N (specified by the user)\n// of such numbers is output.\n\n// Counts digits as the length of a string\nconst findDivisibleNumbersUsingString = n => {\n  if (n < 0) throw new Error('n must be non-negative.');\n  let count = 0;\n  let i = 0;\n  while (count !== n) {\n    if (i < 10 || !(i % `${i}`.length)) {\n      console.log(i);\n      count++;\n    }\n    i++;\n  }\n};\n\nfindDivisibleNumbersUsingString(28);\n// 0 1 2 3 4 5 6 7 8 9 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40 42 44\n\n// Counts digits using math\nconst countDigits = n => {\n  let digits = 0;\n  while (n) {\n    n = Math.floor(n / 10);\n    digits++;\n  }\n  return digits;\n};\n\nconst findDivisibleNumbersUsingMath = n => {\n  if (n < 0) throw new Error('n must be non-negative.');\n  let count = 0;\n  let i = 0;\n  while (count !== n) {\n    if (i < 10 || !(i % countDigits(i))) {\n      console.log(i);\n      count++;\n    }\n    i++;\n  }\n};\n\nfindDivisibleNumbersUsingMath(120);\n// 0 1 2 3 4 5 6 7 8 9 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40 42 44 46 48 50 52 54 56 58 60 62 64 66 68\n// 70 72 74 76 78 80 82 84 86 88 90 92 94 96 98 102 105 108 111 114 117 120 123 126 129 132 135 138 141 144 147\n// 150 153 156 159 162 165 168 171 174 177 180 183 186 189 192 195 198 201 204 207 210 213 216 219 222 225 228 231\n// 234 237 240 243 246 249 252 255 258 261 264 267 270 273 276 279 282 285 288 291 294\n\n// More efficient version\nconst findDivisibleNumbersQuick = n => {\n  if (n < 0) throw new Error('n must be non-negative.');\n  let start = 0;\n  let end = 10;\n  let digits = 1;\n  let count = 0;\n  while (n !== count) {\n    for (let j = start; j < end; j += digits) {\n      console.log(j);\n      count++;\n      if (n === count) return;\n    }\n    digits++;\n    start = end;\n    end = start * 10;\n    while (start % digits) {\n      start++;\n    }\n  }\n};\n\nfindDivisibleNumbersQuick(500);\n// 0 1 2 3 4 5 6 7 8 9 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40 42 44 46 48 50 52 54 56 58 60 62 64 66 68\n// 70 72 74 76 78 80 82 84 86 88 90 92 94 96 98 102 105 108 111 114 117 120 123 126 129 132 135 138 141 144 147\n// 150 153 156 159 162 165 168 171 174 177 180 183 186 189 192 195 198 201 204 207 210 213 216 219 222 225 228 231\n// 234 237 240 243 246 249 252 255 258 261 264 267 270 273 276 279 282 285 288 291 294 297 300 303 306 309 312 315\n// 318 321 324 327 330 333 336 339 342 345 348 351 354 357 360 363 366 369 372 375 378 381 384 387 390 393 396 399\n// 402 405 408 411 414 417 420 423 426 429 432 435 438 441 444 447 450 453 456 459 462 465 468 471 474 477 480 483\n// 486 489 492 495 498 501 504 507 510 513 516 519 522 525 528 531 534 537 540 543 546 549 552 555 558 561 564 567\n// 570 573 576 579 582 585 588 591 594 597 600 603 606 609 612 615 618 621 624 627 630 633 636 639 642 645 648 651\n// 654 657 660 663 666 669 672 675 678 681 684 687 690 693 696 699 702 705 708 711 714 717 720 723 726 729 732 735\n// 738 741 744 747 750 753 756 759 762 765 768 771 774 777 780 783 786 789 792 795 798 801 804 807 810 813 816 819\n// 822 825 828 831 834 837 840 843 846 849 852 855 858 861 864 867 870 873 876 879 882 885 888 891 894 897 900 903\n// 906 909 912 915 918 921 924 927 930 933 936 939 942 945 948 951 954 957 960 963 966 969 972 975 978 981 984 987\n// 990 993 996 999 1000 1004 1008 1012 1016 1020 1024 1028 1032 1036 1040 1044 1048 1052 1056 1060 1064 1068 1072\n// 1076 1080 1084 1088 1092 1096 1100 1104 1108 1112 1116 1120 1124 1128 1132 1136 1140 1144 1148 1152 1156 1160\n// 1164 1168 1172 1176 1180 1184 1188 1192 1196 1200 1204 1208 1212 1216 1220 1224 1228 1232 1236 1240 1244 1248\n// 1252 1256 1260 1264 1268 1272 1276 1280 1284 1288 1292 1296 1300 1304 1308 1312 1316 1320 1324 1328 1332 1336\n// 1340 1344 1348 1352 1356 1360 1364 1368 1372 1376 1380 1384 1388 1392 1396 1400 1404 1408 1412 1416 1420 1424\n// 1428 1432 1436 1440 1444 1448 1452 1456 1460 1464 1468 1472 1476 1480 1484 1488 1492 1496 1500 1504 1508 1512\n// 1516 1520 1524 1528 1532 1536 1540 1544 1548 1552 1556 1560 1564 1568 1572 1576\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 52,
        "likes": 997
    },
    {
        "id": "79",
        "title": "Factorial Of Large Number",
        "slug": "factorial-of-large-number",
        "difficulty": "Medium",
        "topics": [
            "Math"
        ],
        "description": "No description provided.",
        "examples": [
            {
                "input": "factorial(10000",
                "output": "See console output"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "function factorial(num) {\n  if (num < 2) return 1;\n\n  const result = num.toString().split('').reverse().map(Number);\n\n  while (--num) {\n    for (let carry = 0, i = 0; i < result.length || carry; i++) {\n      const prod = (result[i] || 0) * num + carry;\n      result[i] = prod % 10;\n      carry = parseInt(prod / 10, 10);\n    }\n  }\n\n  return result.reverse().join('');\n}\n\nconsole.log(factorial(10000));\n",
        "starterCode": {
            "javascript": "// Factorial Of Large Number\n// Math\n\nfunction factorial(num) {\n  if (num < 2) return 1;\n\n  const result = num.toString().split('').reverse().map(Number);\n\n  while (--num) {\n    for (let carry = 0, i = 0; i < result.length || carry; i++) {\n      const prod = (result[i] || 0) * num + carry;\n      result[i] = prod % 10;\n      carry = parseInt(prod / 10, 10);\n    }\n  }\n\n  return result.reverse().join('');\n}\n\nconsole.log(factorial(10000));\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 63,
        "likes": 93
    },
    {
        "id": "80",
        "title": "Capitalize First",
        "slug": "capitalize-first",
        "difficulty": "Medium",
        "topics": [
            "Recursion"
        ],
        "description": "capitalizeFirst Write a recursive function called capitalizeFirst. Given an array of strings, capitalize the first letter of each string in the array.",
        "examples": [
            {
                "input": "capitalizeFirst(['car', 'taco', 'banana'])",
                "output": "['Car','Taco','Banana']",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// capitalizeFirst\n// Write a recursive function called capitalizeFirst.\n// Given an array of strings, capitalize the first letter of each string in the array.\n\nfunction capitalizeFirst(arr) {\n  const result = [];\n\n  if (!arr.length) return result;\n\n  result.push(arr[0][0].toUpperCase() + arr[0].slice(1));\n\n  return result.concat(capitalizeFirst(arr.slice(1)));\n}\n\nconsole.log(capitalizeFirst(['car', 'taco', 'banana'])); // ['Car','Taco','Banana']\n",
        "starterCode": {
            "javascript": "// Capitalize First\n// Recursion\n\n// capitalizeFirst\n// Write a recursive function called capitalizeFirst.\n// Given an array of strings, capitalize the first letter of each string in the array.\n\nfunction capitalizeFirst(arr) {\n  const result = [];\n\n  if (!arr.length) return result;\n\n  result.push(arr[0][0].toUpperCase() + arr[0].slice(1));\n\n  return result.concat(capitalizeFirst(arr.slice(1)));\n}\n\nconsole.log(capitalizeFirst(['car', 'taco', 'banana'])); // ['Car','Taco','Banana']\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 61,
        "likes": 353
    },
    {
        "id": "81",
        "title": "Capitalize Words",
        "slug": "capitalize-words",
        "difficulty": "Medium",
        "topics": [
            "Recursion"
        ],
        "description": "capitalizeWords Write a recursive function called capitalizeWords. Given an array of words, return a new array containing each word capitalized.",
        "examples": [
            {
                "input": "capitalizeWords(words)",
                "output": "['I', 'AM', 'LEARNING', 'RECURSION']",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// capitalizeWords\n// Write a recursive function called capitalizeWords.\n// Given an array of words, return a new array containing each word capitalized.\n\nfunction capitalizeWords(arr) {\n  const result = [];\n\n  if (!arr.length) return result;\n\n  result.push(arr[0].toUpperCase());\n\n  return [...result, ...capitalizeWords(arr.slice(1))];\n}\n\nconst words = ['i', 'am', 'learning', 'recursion'];\nconsole.log(capitalizeWords(words)); // ['I', 'AM', 'LEARNING', 'RECURSION']\n",
        "starterCode": {
            "javascript": "// Capitalize Words\n// Recursion\n\n// capitalizeWords\n// Write a recursive function called capitalizeWords.\n// Given an array of words, return a new array containing each word capitalized.\n\nfunction capitalizeWords(arr) {\n  const result = [];\n\n  if (!arr.length) return result;\n\n  result.push(arr[0].toUpperCase());\n\n  return [...result, ...capitalizeWords(arr.slice(1))];\n}\n\nconst words = ['i', 'am', 'learning', 'recursion'];\nconsole.log(capitalizeWords(words)); // ['I', 'AM', 'LEARNING', 'RECURSION']\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 76,
        "likes": 777
    },
    {
        "id": "82",
        "title": "Collect Strings",
        "slug": "collect-strings",
        "difficulty": "Medium",
        "topics": [
            "Recursion"
        ],
        "description": "collectStrings Write a function called collectStrings which accepts an object and returns an array of all the values in the object that have a typeof string.",
        "examples": [
            {
                "input": "collectStrings(obj)",
                "output": "['foo', 'bar', 'baz'])",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// collectStrings\n// Write a function called collectStrings which accepts an object and\n// returns an array of all the values in the object that have a typeof string.\n\nfunction collectStrings (obj) {\n  let resultArr = [];\n\n  for (const key in obj) {\n    if (Object.prototype.hasOwnProperty.call(obj, key)) {\n      if (typeof obj[key] === 'string') resultArr.push(obj[key]);\n      if (typeof obj[key] === 'object') resultArr = resultArr.concat(collectStrings(obj[key]));\n    }\n  }\n\n  return resultArr;\n}\n\nconst obj = {\n  stuff: 'foo',\n  data: {\n    val: {\n      thing: {\n        info: 'bar',\n        moreInfo: {\n          evenMoreInfo: {\n            weMadeIt: 'baz'\n          }\n        }\n      }\n    }\n  }\n};\n\nconsole.log(collectStrings(obj)); // ['foo', 'bar', 'baz'])\n",
        "starterCode": {
            "javascript": "// Collect Strings\n// Recursion\n\n// collectStrings\n// Write a function called collectStrings which accepts an object and\n// returns an array of all the values in the object that have a typeof string.\n\nfunction collectStrings (obj) {\n  let resultArr = [];\n\n  for (const key in obj) {\n    if (Object.prototype.hasOwnProperty.call(obj, key)) {\n      if (typeof obj[key] === 'string') resultArr.push(obj[key]);\n      if (typeof obj[key] === 'object') resultArr = resultArr.concat(collectStrings(obj[key]));\n    }\n  }\n\n  return resultArr;\n}\n\nconst obj = {\n  stuff: 'foo',\n  data: {\n    val: {\n      thing: {\n        info: 'bar',\n        moreInfo: {\n          evenMoreInfo: {\n            weMadeIt: 'baz'\n          }\n        }\n      }\n    }\n  }\n};\n\nconsole.log(collectStrings(obj)); // ['foo', 'bar', 'baz'])\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 81,
        "likes": 447
    },
    {
        "id": "83",
        "title": "Count Zeroes",
        "slug": "count-zeroes",
        "difficulty": "Medium",
        "topics": [
            "Recursion"
        ],
        "description": "Divide and Conquer - countZeroes Given an array of 1s and 0s which has all 1s first followed by all 0s, write a function called countZeroes, which returns the number of zeroes in the array.",
        "examples": [
            {
                "input": "countZeroes([1, 1, 1, 1, 1, 0])",
                "output": "1",
                "explanation": "Based on code execution"
            },
            {
                "input": "countZeroes([1, 1, 1, 1, 0, 0])",
                "output": "2",
                "explanation": "Based on code execution"
            },
            {
                "input": "countZeroes([1, 1, 1, 0, 0, 0])",
                "output": "3",
                "explanation": "Based on code execution"
            },
            {
                "input": "countZeroes([1, 1, 0, 0, 0, 0])",
                "output": "4",
                "explanation": "Based on code execution"
            },
            {
                "input": "countZeroes([1, 0, 0, 0, 0, 0])",
                "output": "5",
                "explanation": "Based on code execution"
            },
            {
                "input": "countZeroes([0, 0, 0])",
                "output": "3",
                "explanation": "Based on code execution"
            },
            {
                "input": "countZeroes([1, 1, 1, 1])",
                "output": "0",
                "explanation": "Based on code execution"
            },
            {
                "input": "countZeroes([1, 0])",
                "output": "1",
                "explanation": "Based on code execution"
            },
            {
                "input": "countZeroes([0])",
                "output": "1",
                "explanation": "Based on code execution"
            },
            {
                "input": "countZeroes([])",
                "output": "0",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Divide and Conquer - countZeroes\n// Given an array of 1s and 0s which has all 1s first followed by all 0s,\n// write a function called countZeroes, which returns the number of zeroes in the array.\n\n// Time Complexity - O(log n)\n\nfunction countZeroes(arr) {\n  let left = 0;\n  let right = arr.length - 1;\n\n  while (left <= right) {\n    const middle = Math.floor((left + right) / 2);\n\n    if (arr[middle] === 1) left = middle + 1;\n    else right = middle - 1;\n  }\n\n  return arr.length - left;\n}\n\nconsole.log(countZeroes([1, 1, 1, 1, 1, 0])); // 1\nconsole.log(countZeroes([1, 1, 1, 1, 0, 0])); // 2\nconsole.log(countZeroes([1, 1, 1, 0, 0, 0])); // 3\nconsole.log(countZeroes([1, 1, 0, 0, 0, 0])); // 4\nconsole.log(countZeroes([1, 0, 0, 0, 0, 0])); // 5\nconsole.log(countZeroes([0, 0, 0])); // 3\nconsole.log(countZeroes([1, 1, 1, 1])); // 0\nconsole.log(countZeroes([1, 0])); // 1\nconsole.log(countZeroes([0])); // 1\nconsole.log(countZeroes([])); // 0\n",
        "starterCode": {
            "javascript": "// Count Zeroes\n// Recursion\n\n// Divide and Conquer - countZeroes\n// Given an array of 1s and 0s which has all 1s first followed by all 0s,\n// write a function called countZeroes, which returns the number of zeroes in the array.\n\n// Time Complexity - O(log n)\n\nfunction countZeroes(arr) {\n  let left = 0;\n  let right = arr.length - 1;\n\n  while (left <= right) {\n    const middle = Math.floor((left + right) / 2);\n\n    if (arr[middle] === 1) left = middle + 1;\n    else right = middle - 1;\n  }\n\n  return arr.length - left;\n}\n\nconsole.log(countZeroes([1, 1, 1, 1, 1, 0])); // 1\nconsole.log(countZeroes([1, 1, 1, 1, 0, 0])); // 2\nconsole.log(countZeroes([1, 1, 1, 0, 0, 0])); // 3\nconsole.log(countZeroes([1, 1, 0, 0, 0, 0])); // 4\nconsole.log(countZeroes([1, 0, 0, 0, 0, 0])); // 5\nconsole.log(countZeroes([0, 0, 0])); // 3\nconsole.log(countZeroes([1, 1, 1, 1])); // 0\nconsole.log(countZeroes([1, 0])); // 1\nconsole.log(countZeroes([0])); // 1\nconsole.log(countZeroes([])); // 0\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 67,
        "likes": 809
    },
    {
        "id": "84",
        "title": "Factorial",
        "slug": "factorial",
        "difficulty": "Medium",
        "topics": [
            "Recursion"
        ],
        "description": "factorial Write a function factorial which accepts a number and returns the factorial of that number. A factorial is the product of an integer and all the integers below it; e.g., factorial four ( 4! ) is equal to 24, because 4 * 3 * 2 * 1 equals 24. factorial zero (0!) is always 1.",
        "examples": [
            {
                "input": "factorial(1)",
                "output": "1",
                "explanation": "Based on code execution"
            },
            {
                "input": "factorial(2)",
                "output": "2",
                "explanation": "Based on code execution"
            },
            {
                "input": "factorial(4)",
                "output": "24",
                "explanation": "Based on code execution"
            },
            {
                "input": "factorial(7)",
                "output": "5040",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// factorial\n// Write a function factorial which accepts a number and returns the factorial of that number.\n// A factorial is the product of an integer and all the integers below it;\n// e.g., factorial four ( 4! ) is equal to 24, because 4 * 3 * 2 * 1 equals 24.\n// factorial zero (0!) is always 1.\n\nfunction factorial(num) {\n  if (num <= 1) return 1;\n\n  return num * factorial(num - 1);\n}\n\nconsole.log(factorial(1)); // 1\nconsole.log(factorial(2)); // 2\nconsole.log(factorial(4)); // 24\nconsole.log(factorial(7)); // 5040\n",
        "starterCode": {
            "javascript": "// Factorial\n// Recursion\n\n// factorial\n// Write a function factorial which accepts a number and returns the factorial of that number.\n// A factorial is the product of an integer and all the integers below it;\n// e.g., factorial four ( 4! ) is equal to 24, because 4 * 3 * 2 * 1 equals 24.\n// factorial zero (0!) is always 1.\n\nfunction factorial(num) {\n  if (num <= 1) return 1;\n\n  return num * factorial(num - 1);\n}\n\nconsole.log(factorial(1)); // 1\nconsole.log(factorial(2)); // 2\nconsole.log(factorial(4)); // 24\nconsole.log(factorial(7)); // 5040\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 77,
        "likes": 585
    },
    {
        "id": "85",
        "title": "Fibonacci",
        "slug": "fibonacci",
        "difficulty": "Medium",
        "topics": [
            "Recursion"
        ],
        "description": "fib Write a recursive function called fib which accepts a number and returns the nth number in the Fibonacci sequence. Recall that the Fibonacci sequence is the sequence of whole numbers 1, 1, 2, 3, 5, 8, ... which starts with 1 and 1, and where every number thereafter is equal to the sum of the previous two numbers.",
        "examples": [
            {
                "input": "fib(4)",
                "output": "3",
                "explanation": "Based on code execution"
            },
            {
                "input": "fib(10)",
                "output": "55",
                "explanation": "Based on code execution"
            },
            {
                "input": "fib(28)",
                "output": "317811",
                "explanation": "Based on code execution"
            },
            {
                "input": "fib(35)",
                "output": "9227465",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// fib\n// Write a recursive function called fib which accepts a number\n// and returns the nth number in the Fibonacci sequence.\n// Recall that the Fibonacci sequence is the sequence of whole numbers 1, 1, 2, 3, 5, 8, ...\n// which starts with 1 and 1, and where every number thereafter\n// is equal to the sum of the previous two numbers.\n\nfunction fib(num) {\n  if (num < 2) return num;\n\n  return fib(num - 1) + fib(num - 2);\n}\n\nconsole.log(fib(4));// 3\nconsole.log(fib(10)); // 55\nconsole.log(fib(28)); // 317811\nconsole.log(fib(35)); // 9227465\n",
        "starterCode": {
            "javascript": "// Fibonacci\n// Recursion\n\n// fib\n// Write a recursive function called fib which accepts a number\n// and returns the nth number in the Fibonacci sequence.\n// Recall that the Fibonacci sequence is the sequence of whole numbers 1, 1, 2, 3, 5, 8, ...\n// which starts with 1 and 1, and where every number thereafter\n// is equal to the sum of the previous two numbers.\n\nfunction fib(num) {\n  if (num < 2) return num;\n\n  return fib(num - 1) + fib(num - 2);\n}\n\nconsole.log(fib(4));// 3\nconsole.log(fib(10)); // 55\nconsole.log(fib(28)); // 317811\nconsole.log(fib(35)); // 9227465\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 83,
        "likes": 964
    },
    {
        "id": "86",
        "title": "Find Rotated Index",
        "slug": "find-rotated-index",
        "difficulty": "Medium",
        "topics": [
            "Recursion"
        ],
        "description": "Divide and Conquer - findRotatedIndex Write a function called findRotatedIndex which accepts a rotated array of sorted numbers and an integer. The function should return the index of the integer in the array. If the value is not found, return -1.",
        "examples": [
            {
                "input": "findRotatedIndex([3, 4, 1, 2], 4)",
                "output": "1",
                "explanation": "Based on code execution"
            },
            {
                "input": "findRotatedIndex([4, 6, 7, 8, 9, 1, 2, 3, 4], 8)",
                "output": "3",
                "explanation": "Based on code execution"
            },
            {
                "input": "findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3)",
                "output": "6",
                "explanation": "Based on code execution"
            },
            {
                "input": "findRotatedIndex([37, 44, 66, 102, 10, 22], 14)",
                "output": "-1",
                "explanation": "Based on code execution"
            },
            {
                "input": "findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12)",
                "output": "-1",
                "explanation": "Based on code execution"
            },
            {
                "input": "findRotatedIndex([11, 12, 13, 14, 15, 16, 3, 5, 7, 9], 16)",
                "output": "5",
                "explanation": "Based on code execution"
            },
            {
                "input": "findRotatedIndex([11, 12, 13, 17, 39], 17)",
                "output": "3",
                "explanation": "Based on code execution"
            },
            {
                "input": "findRotatedIndex([11], 11)",
                "output": "0",
                "explanation": "Based on code execution"
            },
            {
                "input": "findRotatedIndex([], 11)",
                "output": "-1",
                "explanation": "Based on code execution"
            },
            {
                "input": "findRotatedIndex([4, 4, 4, 4, 4], 5)",
                "output": "-1",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "Time Complexity - O(log n)",
            "Space Complexity - O(1)"
        ],
        "hints": [],
        "solution": "// Divide and Conquer - findRotatedIndex\n// Write a function called findRotatedIndex which accepts a rotated array of sorted\n// numbers and an integer. The function should return the index of the integer in the array.\n// If the value is not found, return -1.\n\n// Constraints:\n// Time Complexity - O(log n)\n// Space Complexity - O(1)\n\nfunction findRotatedIndex(arr, num) {\n  let left = 0;\n  let right = arr.length - 1;\n\n  if (right && arr[left] >= arr[right]) {\n    let middle = Math.floor((left + right) / 2);\n\n    while (arr[middle] <= arr[middle + 1]) {\n      if (arr[left] <= arr[middle]) left = middle + 1;\n      else right = middle - 1;\n\n      middle = Math.floor((left + right) / 2);\n    }\n\n    if (num >= arr[0] && num <= arr[middle]) {\n      left = 0;\n      right = middle;\n    } else {\n      left = middle + 1;\n      right = arr.length - 1;\n    }\n  }\n\n  while (left <= right) {\n    const middle = Math.floor((left + right) / 2);\n\n    if (num === arr[middle]) return middle;\n\n    if (num > arr[middle]) left = middle + 1;\n    else right = middle - 1;\n  }\n\n  return -1;\n}\n\nconsole.log(findRotatedIndex([3, 4, 1, 2], 4)); // 1\nconsole.log(findRotatedIndex([4, 6, 7, 8, 9, 1, 2, 3, 4], 8)); // 3\nconsole.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3)); // 6\nconsole.log(findRotatedIndex([37, 44, 66, 102, 10, 22], 14)); // -1\nconsole.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12)); // -1\nconsole.log(findRotatedIndex([11, 12, 13, 14, 15, 16, 3, 5, 7, 9], 16)); // 5\nconsole.log(findRotatedIndex([11, 12, 13, 17, 39], 17)); // 3\nconsole.log(findRotatedIndex([11], 11)); // 0\nconsole.log(findRotatedIndex([], 11)); // -1\nconsole.log(findRotatedIndex([4, 4, 4, 4, 4], 5)); // -1\n",
        "starterCode": {
            "javascript": "// Find Rotated Index\n// Recursion\n\n// Divide and Conquer - findRotatedIndex\n// Write a function called findRotatedIndex which accepts a rotated array of sorted\n// numbers and an integer. The function should return the index of the integer in the array.\n// If the value is not found, return -1.\n\n// Constraints:\n// Time Complexity - O(log n)\n// Space Complexity - O(1)\n\nfunction findRotatedIndex(arr, num) {\n  let left = 0;\n  let right = arr.length - 1;\n\n  if (right && arr[left] >= arr[right]) {\n    let middle = Math.floor((left + right) / 2);\n\n    while (arr[middle] <= arr[middle + 1]) {\n      if (arr[left] <= arr[middle]) left = middle + 1;\n      else right = middle - 1;\n\n      middle = Math.floor((left + right) / 2);\n    }\n\n    if (num >= arr[0] && num <= arr[middle]) {\n      left = 0;\n      right = middle;\n    } else {\n      left = middle + 1;\n      right = arr.length - 1;\n    }\n  }\n\n  while (left <= right) {\n    const middle = Math.floor((left + right) / 2);\n\n    if (num === arr[middle]) return middle;\n\n    if (num > arr[middle]) left = middle + 1;\n    else right = middle - 1;\n  }\n\n  return -1;\n}\n\nconsole.log(findRotatedIndex([3, 4, 1, 2], 4)); // 1\nconsole.log(findRotatedIndex([4, 6, 7, 8, 9, 1, 2, 3, 4], 8)); // 3\nconsole.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3)); // 6\nconsole.log(findRotatedIndex([37, 44, 66, 102, 10, 22], 14)); // -1\nconsole.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12)); // -1\nconsole.log(findRotatedIndex([11, 12, 13, 14, 15, 16, 3, 5, 7, 9], 16)); // 5\nconsole.log(findRotatedIndex([11, 12, 13, 17, 39], 17)); // 3\nconsole.log(findRotatedIndex([11], 11)); // 0\nconsole.log(findRotatedIndex([], 11)); // -1\nconsole.log(findRotatedIndex([4, 4, 4, 4, 4], 5)); // -1\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 73,
        "likes": 38
    },
    {
        "id": "87",
        "title": "Flatten",
        "slug": "flatten",
        "difficulty": "Medium",
        "topics": [
            "Recursion"
        ],
        "description": "flatten Write a recursive function called flatten which accepts an array of arrays and returns a new array with all values flattened.",
        "examples": [
            {
                "input": "flatten([1, 2, 3, [4, 5]])",
                "output": "[1, 2, 3, 4, 5]",
                "explanation": "Based on code execution"
            },
            {
                "input": "flatten([1, [2, [3, 4], [[5]]]])",
                "output": "[1, 2, 3, 4, 5]",
                "explanation": "Based on code execution"
            },
            {
                "input": "flatten([[1], [2], [3]])",
                "output": "[1, 2, 3]",
                "explanation": "Based on code execution"
            },
            {
                "input": "flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])",
                "output": "[1, 2, 3]",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// flatten\n// Write a recursive function called flatten which accepts an array of arrays\n// and returns a new array with all values flattened.\n\nfunction flatten(arr) {\n  let resultArr = [];\n\n  for (const item of arr) {\n    if (item instanceof Array) resultArr = resultArr.concat(flatten(item));\n    else resultArr.push(item);\n  }\n\n  return resultArr;\n}\n\nconsole.log(flatten([1, 2, 3, [4, 5]])); // [1, 2, 3, 4, 5]\nconsole.log(flatten([1, [2, [3, 4], [[5]]]])); // [1, 2, 3, 4, 5]\nconsole.log(flatten([[1], [2], [3]])); // [1, 2, 3]\nconsole.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])); // [1, 2, 3]\n",
        "starterCode": {
            "javascript": "// Flatten\n// Recursion\n\n// flatten\n// Write a recursive function called flatten which accepts an array of arrays\n// and returns a new array with all values flattened.\n\nfunction flatten(arr) {\n  let resultArr = [];\n\n  for (const item of arr) {\n    if (item instanceof Array) resultArr = resultArr.concat(flatten(item));\n    else resultArr.push(item);\n  }\n\n  return resultArr;\n}\n\nconsole.log(flatten([1, 2, 3, [4, 5]])); // [1, 2, 3, 4, 5]\nconsole.log(flatten([1, [2, [3, 4], [[5]]]])); // [1, 2, 3, 4, 5]\nconsole.log(flatten([[1], [2], [3]])); // [1, 2, 3]\nconsole.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])); // [1, 2, 3]\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 58,
        "likes": 942
    },
    {
        "id": "88",
        "title": "Is Palindrome",
        "slug": "is-palindrome",
        "difficulty": "Medium",
        "topics": [
            "Recursion"
        ],
        "description": "isPalindrome Write a recursive function called isPalindrome which returns true if the string passed to it is a palindrome (reads the same forward and backward). Otherwise it returns false.",
        "examples": [
            {
                "input": "isPalindrome('amanaplanacanalpanama')",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "isPalindrome('amanaplanacanalpandemonium')",
                "output": "false",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// isPalindrome\n// Write a recursive function called isPalindrome which returns true\n// if the string passed to it is a palindrome (reads the same forward and backward).\n// Otherwise it returns false.\n\nfunction isPalindrome(str) {\n  if (!str.length) return true;\n\n  if (str[0] !== str[str.length - 1]) return false;\n\n  return isPalindrome(str.slice(1, -1));\n}\n\nconsole.log(isPalindrome('amanaplanacanalpanama')); // true\nconsole.log(isPalindrome('amanaplanacanalpandemonium')); // false\n",
        "starterCode": {
            "javascript": "// Is Palindrome\n// Recursion\n\n// isPalindrome\n// Write a recursive function called isPalindrome which returns true\n// if the string passed to it is a palindrome (reads the same forward and backward).\n// Otherwise it returns false.\n\nfunction isPalindrome(str) {\n  if (!str.length) return true;\n\n  if (str[0] !== str[str.length - 1]) return false;\n\n  return isPalindrome(str.slice(1, -1));\n}\n\nconsole.log(isPalindrome('amanaplanacanalpanama')); // true\nconsole.log(isPalindrome('amanaplanacanalpandemonium')); // false\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 56,
        "likes": 888
    },
    {
        "id": "89",
        "title": "Maximum Subarray",
        "slug": "maximum-subarray",
        "difficulty": "Medium",
        "topics": [
            "Recursion"
        ],
        "description": "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
        "examples": [
            {
                "input": "maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])",
                "output": "6",
                "explanation": "Based on code execution"
            },
            {
                "input": "maxSubArray([-1, 0, -2])",
                "output": "0",
                "explanation": "Based on code execution"
            },
            {
                "input": "maxSubArray([-1])",
                "output": "-1",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Given an integer array nums, find the contiguous subarray\n// (containing at least one number) which has the largest sum and return its sum.\n\n// Time Complexity O(n * log(n))\nfunction maxSubArray(nums, start = 0, end = nums.length - 1) {\n  if (start > end) return -Infinity;\n\n  const middle = Math.floor((start + end) / 2);\n\n  let maxLeft = 0;\n  let currentSum = 0;\n  for (let i = middle - 1; i >= start; i--) {\n    currentSum += nums[i];\n    maxLeft = Math.max(maxLeft, currentSum);\n  }\n\n  let maxRight = 0;\n  currentSum = 0;\n  for (let i = middle + 1; i <= end; i++) {\n    currentSum += nums[i];\n    maxRight = Math.max(maxRight, currentSum);\n  }\n\n  return Math.max(maxLeft + nums[middle] + maxRight,\n    Math.max(maxSubArray(nums, start, middle - 1), maxSubArray(nums, middle + 1, end)));\n};\n\nconsole.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6\nconsole.log(maxSubArray([-1, 0, -2])); // 0\nconsole.log(maxSubArray([-1])); // -1\n",
        "starterCode": {
            "javascript": "// Maximum Subarray\n// Recursion\n\n// Given an integer array nums, find the contiguous subarray\n// (containing at least one number) which has the largest sum and return its sum.\n\n// Time Complexity O(n * log(n))\nfunction maxSubArray(nums, start = 0, end = nums.length - 1) {\n  if (start > end) return -Infinity;\n\n  const middle = Math.floor((start + end) / 2);\n\n  let maxLeft = 0;\n  let currentSum = 0;\n  for (let i = middle - 1; i >= start; i--) {\n    currentSum += nums[i];\n    maxLeft = Math.max(maxLeft, currentSum);\n  }\n\n  let maxRight = 0;\n  currentSum = 0;\n  for (let i = middle + 1; i <= end; i++) {\n    currentSum += nums[i];\n    maxRight = Math.max(maxRight, currentSum);\n  }\n\n  return Math.max(maxLeft + nums[middle] + maxRight,\n    Math.max(maxSubArray(nums, start, middle - 1), maxSubArray(nums, middle + 1, end)));\n};\n\nconsole.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6\nconsole.log(maxSubArray([-1, 0, -2])); // 0\nconsole.log(maxSubArray([-1])); // -1\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 50,
        "likes": 45
    },
    {
        "id": "90",
        "title": "Nested Even Sum",
        "slug": "nested-even-sum",
        "difficulty": "Medium",
        "topics": [
            "Recursion"
        ],
        "description": "nestedEvenSum Write a recursive function called nestedEvenSum. Return the sum of all even numbers in an object which may contain nested objects.",
        "examples": [
            {
                "input": "nestedEvenSum(obj1)",
                "output": "6",
                "explanation": "Based on code execution"
            },
            {
                "input": "nestedEvenSum(obj2)",
                "output": "10",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// nestedEvenSum\n// Write a recursive function called nestedEvenSum.\n// Return the sum of all even numbers in an object which may contain nested objects.\n\nfunction nestedEvenSum(obj) {\n  let sum = 0;\n\n  for (const key in obj) {\n    if (Object.prototype.hasOwnProperty.call(obj, key)) {\n      if (typeof obj[key] === 'number' && obj[key] % 2 === 0) sum += obj[key];\n      if (typeof obj[key] === 'object') sum += nestedEvenSum(obj[key]);\n    }\n  }\n\n  return sum;\n}\n\nconst obj1 = {\n  outer: 2,\n  obj: {\n    inner: 2,\n    otherObj: {\n      superInner: 2,\n      notANumber: true,\n      alsoNotANumber: 'yup'\n    }\n  }\n};\n\nconst obj2 = {\n  a: 2,\n  b: { b: 2, bb: { b: 3, bb: { b: 2 } } },\n  c: { c: { c: 2 }, cc: 'ball', ccc: 5 },\n  d: 1,\n  e: { e: { e: 2 }, ee: 'car' }\n};\n\nconsole.log(nestedEvenSum(obj1)); // 6\nconsole.log(nestedEvenSum(obj2)); // 10\n",
        "starterCode": {
            "javascript": "// Nested Even Sum\n// Recursion\n\n// nestedEvenSum\n// Write a recursive function called nestedEvenSum.\n// Return the sum of all even numbers in an object which may contain nested objects.\n\nfunction nestedEvenSum(obj) {\n  let sum = 0;\n\n  for (const key in obj) {\n    if (Object.prototype.hasOwnProperty.call(obj, key)) {\n      if (typeof obj[key] === 'number' && obj[key] % 2 === 0) sum += obj[key];\n      if (typeof obj[key] === 'object') sum += nestedEvenSum(obj[key]);\n    }\n  }\n\n  return sum;\n}\n\nconst obj1 = {\n  outer: 2,\n  obj: {\n    inner: 2,\n    otherObj: {\n      superInner: 2,\n      notANumber: true,\n      alsoNotANumber: 'yup'\n    }\n  }\n};\n\nconst obj2 = {\n  a: 2,\n  b: { b: 2, bb: { b: 3, bb: { b: 2 } } },\n  c: { c: { c: 2 }, cc: 'ball', ccc: 5 },\n  d: 1,\n  e: { e: { e: 2 }, ee: 'car' }\n};\n\nconsole.log(nestedEvenSum(obj1)); // 6\nconsole.log(nestedEvenSum(obj2)); // 10\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 78,
        "likes": 463
    },
    {
        "id": "91",
        "title": "Power",
        "slug": "power",
        "difficulty": "Medium",
        "topics": [
            "Recursion"
        ],
        "description": "power Write a function called power which accepts a base and an exponent. The function should return the power of the base to the exponent. This function should mimic the functionality of Math.pow(). Do not worry about negative bases and exponents.",
        "examples": [
            {
                "input": "power(2, 0)",
                "output": "1",
                "explanation": "Based on code execution"
            },
            {
                "input": "power(2, 2)",
                "output": "4",
                "explanation": "Based on code execution"
            },
            {
                "input": "power(2, 4)",
                "output": "16",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// power\n// Write a function called power which accepts a base and an exponent.\n// The function should return the power of the base to the exponent.\n// This function should mimic the functionality of Math.pow().\n// Do not worry about negative bases and exponents.\n\nfunction power(num, pow) {\n  if (pow === 0) return 1;\n\n  return num * power(num, pow - 1);\n}\n\nconsole.log(power(2, 0)); // 1\nconsole.log(power(2, 2)); // 4\nconsole.log(power(2, 4)); // 16\n",
        "starterCode": {
            "javascript": "// Power\n// Recursion\n\n// power\n// Write a function called power which accepts a base and an exponent.\n// The function should return the power of the base to the exponent.\n// This function should mimic the functionality of Math.pow().\n// Do not worry about negative bases and exponents.\n\nfunction power(num, pow) {\n  if (pow === 0) return 1;\n\n  return num * power(num, pow - 1);\n}\n\nconsole.log(power(2, 0)); // 1\nconsole.log(power(2, 2)); // 4\nconsole.log(power(2, 4)); // 16\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 63,
        "likes": 953
    },
    {
        "id": "92",
        "title": "Product Of Array",
        "slug": "product-of-array",
        "difficulty": "Medium",
        "topics": [
            "Recursion"
        ],
        "description": "productOfArray Write a function called productOfArray which takes in an array of numbers and returns the product of them all.",
        "examples": [
            {
                "input": "productOfArray([1, 2, 3])",
                "output": "6",
                "explanation": "Based on code execution"
            },
            {
                "input": "productOfArray([1, 2, 3, 10])",
                "output": "60",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// productOfArray\n// Write a function called productOfArray which takes in an array of numbers\n// and returns the product of them all.\n\nfunction productOfArray(arr) {\n  if (!arr.length) return 1;\n\n  return arr[0] * productOfArray(arr.slice(1));\n}\nconsole.log(productOfArray([1, 2, 3])); // 6\nconsole.log(productOfArray([1, 2, 3, 10])); // 60\n",
        "starterCode": {
            "javascript": "// Product Of Array\n// Recursion\n\n// productOfArray\n// Write a function called productOfArray which takes in an array of numbers\n// and returns the product of them all.\n\nfunction productOfArray(arr) {\n  if (!arr.length) return 1;\n\n  return arr[0] * productOfArray(arr.slice(1));\n}\nconsole.log(productOfArray([1, 2, 3])); // 6\nconsole.log(productOfArray([1, 2, 3, 10])); // 60\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 56,
        "likes": 699
    },
    {
        "id": "93",
        "title": "Recursive Range",
        "slug": "recursive-range",
        "difficulty": "Medium",
        "topics": [
            "Recursion"
        ],
        "description": "recursiveRange Write a function called recursiveRange which accepts a number and adds up all the numbers from 0 to the number passed to the function.",
        "examples": [
            {
                "input": "recursiveRange(6)",
                "output": "21",
                "explanation": "Based on code execution"
            },
            {
                "input": "recursiveRange(10)",
                "output": "55",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// recursiveRange\n// Write a function called recursiveRange which accepts a number\n// and adds up all the numbers from 0 to the number passed to the function.\n\nfunction recursiveRange(num) {\n  if (num <= 0) return 0;\n\n  return num + recursiveRange(num - 1);\n}\n\nconsole.log(recursiveRange(6)); // 21\nconsole.log(recursiveRange(10)); // 55\n",
        "starterCode": {
            "javascript": "// Recursive Range\n// Recursion\n\n// recursiveRange\n// Write a function called recursiveRange which accepts a number\n// and adds up all the numbers from 0 to the number passed to the function.\n\nfunction recursiveRange(num) {\n  if (num <= 0) return 0;\n\n  return num + recursiveRange(num - 1);\n}\n\nconsole.log(recursiveRange(6)); // 21\nconsole.log(recursiveRange(10)); // 55\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 85,
        "likes": 948
    },
    {
        "id": "94",
        "title": "Reverse",
        "slug": "reverse",
        "difficulty": "Medium",
        "topics": [
            "Recursion"
        ],
        "description": "reverse Write a recursive function called reverse which accepts a string and returns a new string in reverse.",
        "examples": [
            {
                "input": "reverse('awesome')",
                "output": "'emosewa'",
                "explanation": "Based on code execution"
            },
            {
                "input": "reverse('rithmschool')",
                "output": "'loohcsmhtir'",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// reverse\n// Write a recursive function called reverse\n// which accepts a string and returns a new string in reverse.\n\nfunction reverse(str) {\n  if (str.length <= 1) return str;\n\n  return str[str.length - 1] + reverse(str.slice(0, str.length - 1));\n}\n\nconsole.log(reverse('awesome')); // 'emosewa'\nconsole.log(reverse('rithmschool')); // 'loohcsmhtir'\n",
        "starterCode": {
            "javascript": "// Reverse\n// Recursion\n\n// reverse\n// Write a recursive function called reverse\n// which accepts a string and returns a new string in reverse.\n\nfunction reverse(str) {\n  if (str.length <= 1) return str;\n\n  return str[str.length - 1] + reverse(str.slice(0, str.length - 1));\n}\n\nconsole.log(reverse('awesome')); // 'emosewa'\nconsole.log(reverse('rithmschool')); // 'loohcsmhtir'\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 80,
        "likes": 519
    },
    {
        "id": "95",
        "title": "Some Recursive",
        "slug": "some-recursive",
        "difficulty": "Medium",
        "topics": [
            "Recursion"
        ],
        "description": "someRecursive Write a recursive function called someRecursive which accepts an array and a callback. The function returns true if a single value in the array returns true when passed to the callback. Otherwise it returns false.",
        "examples": [
            {
                "input": "someRecursive([1, 2, 3, 4], val => val % 2 !== 0)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "someRecursive([4, 6, 8, 9], val => val % 2 !== 0)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "someRecursive([4, 6, 8], val => val % 2 !== 0)",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "someRecursive([4, 6, 8], val => val > 10)",
                "output": "false",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// someRecursive\n// Write a recursive function called someRecursive which accepts an array and a callback.\n// The function returns true if a single value in the array returns true\n// when passed to the callback. Otherwise it returns false.\n\nfunction someRecursive(arr, cb) {\n  if (!arr.length) return false;\n\n  if (!cb(arr[0])) return someRecursive(arr.slice(1), cb);\n\n  return true;\n}\n\nconsole.log(someRecursive([1, 2, 3, 4], val => val % 2 !== 0)); // true\nconsole.log(someRecursive([4, 6, 8, 9], val => val % 2 !== 0)); // true\nconsole.log(someRecursive([4, 6, 8], val => val % 2 !== 0)); // false\nconsole.log(someRecursive([4, 6, 8], val => val > 10)); // false\n",
        "starterCode": {
            "javascript": "// Some Recursive\n// Recursion\n\n// someRecursive\n// Write a recursive function called someRecursive which accepts an array and a callback.\n// The function returns true if a single value in the array returns true\n// when passed to the callback. Otherwise it returns false.\n\nfunction someRecursive(arr, cb) {\n  if (!arr.length) return false;\n\n  if (!cb(arr[0])) return someRecursive(arr.slice(1), cb);\n\n  return true;\n}\n\nconsole.log(someRecursive([1, 2, 3, 4], val => val % 2 !== 0)); // true\nconsole.log(someRecursive([4, 6, 8, 9], val => val % 2 !== 0)); // true\nconsole.log(someRecursive([4, 6, 8], val => val % 2 !== 0)); // false\nconsole.log(someRecursive([4, 6, 8], val => val > 10)); // false\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 68,
        "likes": 19
    },
    {
        "id": "96",
        "title": "Sorted Frequency",
        "slug": "sorted-frequency",
        "difficulty": "Medium",
        "topics": [
            "Recursion"
        ],
        "description": "Divide and Conquer - sortedFrequency Given a sorted array and a number, write a function called sortedFrequency that counts the occurrences of the number in the array",
        "examples": [
            {
                "input": "sortedFrequency([1, 1, 2, 2, 2, 2, 3], 2)",
                "output": "4",
                "explanation": "Based on code execution"
            },
            {
                "input": "sortedFrequency([1, 1, 2, 2, 2, 2, 3], 3)",
                "output": "1",
                "explanation": "Based on code execution"
            },
            {
                "input": "sortedFrequency([1, 1, 2, 2, 2, 2, 3], 4)",
                "output": "-1",
                "explanation": "Based on code execution"
            },
            {
                "input": "sortedFrequency([], 4)",
                "output": "-1",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Divide and Conquer - sortedFrequency\n// Given a sorted array and a number, write a function\n// called sortedFrequency that counts the occurrences of the number in the array\n\n// Time Complexity - O(log n)\n\nfunction sortedFrequency(arr, num) {\n  let left = 0;\n  let right = arr.length - 1;\n\n  while (left <= right) {\n    const middle = Math.floor((left + right) / 2);\n\n    if (arr[middle] === num) {\n      let leftCount = middle;\n      let rightCount = middle;\n\n      while (arr[leftCount] === num && leftCount >= 0) {\n        leftCount--;\n      }\n\n      while (arr[rightCount] === num && rightCount < arr.length) {\n        rightCount++;\n      }\n\n      return rightCount - leftCount - 1;\n    }\n\n    if (arr[middle] < num) left = middle + 1;\n    else right = middle - 1;\n  }\n\n  return -1;\n}\n\nconsole.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 2)); // 4\nconsole.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 3)); // 1\nconsole.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 4)); // -1\nconsole.log(sortedFrequency([], 4)); // -1\n",
        "starterCode": {
            "javascript": "// Sorted Frequency\n// Recursion\n\n// Divide and Conquer - sortedFrequency\n// Given a sorted array and a number, write a function\n// called sortedFrequency that counts the occurrences of the number in the array\n\n// Time Complexity - O(log n)\n\nfunction sortedFrequency(arr, num) {\n  let left = 0;\n  let right = arr.length - 1;\n\n  while (left <= right) {\n    const middle = Math.floor((left + right) / 2);\n\n    if (arr[middle] === num) {\n      let leftCount = middle;\n      let rightCount = middle;\n\n      while (arr[leftCount] === num && leftCount >= 0) {\n        leftCount--;\n      }\n\n      while (arr[rightCount] === num && rightCount < arr.length) {\n        rightCount++;\n      }\n\n      return rightCount - leftCount - 1;\n    }\n\n    if (arr[middle] < num) left = middle + 1;\n    else right = middle - 1;\n  }\n\n  return -1;\n}\n\nconsole.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 2)); // 4\nconsole.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 3)); // 1\nconsole.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 4)); // -1\nconsole.log(sortedFrequency([], 4)); // -1\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 74,
        "likes": 478
    },
    {
        "id": "97",
        "title": "Stringify Numbers",
        "slug": "stringify-numbers",
        "difficulty": "Medium",
        "topics": [
            "Recursion"
        ],
        "description": "stringifyNumbers Write a function called stringifyNumbers which takes in an object and finds all of the values which are numbers and converts them to strings. Recursion would be a great way to solve this!",
        "examples": [
            {
                "input": "stringifyNumbers(obj)",
                "output": "{ num: '1',",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// stringifyNumbers\n// Write a function called stringifyNumbers which takes in an object and\n// finds all of the values which are numbers and converts them to strings.\n// Recursion would be a great way to solve this!\n\nfunction stringifyNumbers(obj) {\n  const newObj = Object.assign({}, obj);\n\n  for (const key in newObj) {\n    if (Object.prototype.hasOwnProperty.call(newObj, key)) {\n      if (typeof newObj[key] === 'number') newObj[key] = newObj[key].toString();\n      if (typeof newObj[key] === 'object') newObj[key] = stringifyNumbers(newObj[key]);\n    }\n  }\n\n  return newObj;\n}\n\nconst obj = {\n  num: 1,\n  test: [],\n  data: {\n    val: 4,\n    info: {\n      isRight: true,\n      random: 66\n    }\n  }\n};\n\nconsole.log(stringifyNumbers(obj));\n// { num: '1',\n//   test: {},\n//   data: { val: '4', info: { isRight: true, random: '66' } } }\n",
        "starterCode": {
            "javascript": "// Stringify Numbers\n// Recursion\n\n// stringifyNumbers\n// Write a function called stringifyNumbers which takes in an object and\n// finds all of the values which are numbers and converts them to strings.\n// Recursion would be a great way to solve this!\n\nfunction stringifyNumbers(obj) {\n  const newObj = Object.assign({}, obj);\n\n  for (const key in newObj) {\n    if (Object.prototype.hasOwnProperty.call(newObj, key)) {\n      if (typeof newObj[key] === 'number') newObj[key] = newObj[key].toString();\n      if (typeof newObj[key] === 'object') newObj[key] = stringifyNumbers(newObj[key]);\n    }\n  }\n\n  return newObj;\n}\n\nconst obj = {\n  num: 1,\n  test: [],\n  data: {\n    val: 4,\n    info: {\n      isRight: true,\n      random: 66\n    }\n  }\n};\n\nconsole.log(stringifyNumbers(obj));\n// { num: '1',\n//   test: {},\n//   data: { val: '4', info: { isRight: true, random: '66' } } }\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 80,
        "likes": 845
    },
    {
        "id": "98",
        "title": "Binary Search",
        "slug": "binary-search",
        "difficulty": "Medium",
        "topics": [
            "Searching"
        ],
        "description": "Binary Search Write a function called binarySearch which accepts a sorted array and a value and returns the index at which the value exists. Otherwise, return -1.",
        "examples": [
            {
                "input": "binarySearch([5, 6, 10, 14, 18, 30, 37, 40, 44, 79, 84, 86, 98, 99], 10)",
                "output": "2",
                "explanation": "Based on code execution"
            },
            {
                "input": "binarySearch([5, 10, 16, 34, 37, 40, 44, 64, 84, 86, 95, 98, 99], 95)",
                "output": "10",
                "explanation": "Based on code execution"
            },
            {
                "input": "binarySearch([5, 6, 13, 14, 18, 64, 79, 84, 86, 95, 96, 98, 99], 100)",
                "output": "-1",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Binary Search\n// Write a function called binarySearch which accepts a sorted array and\n// a value and returns the index at which the value exists. Otherwise, return -1.\n\n// Time Complexity - O(log n)\n\nfunction binarySearch(arr, val) {\n  let left = 0;\n  let right = arr.length - 1;\n\n  while (left <= right) {\n    const middle = Math.floor((left + right) / 2);\n\n    if (arr[middle] === val) return middle;\n\n    if (arr[middle] > val) right = middle - 1;\n    else left = middle + 1;\n  }\n\n  return -1;\n}\n\nconsole.log(binarySearch([5, 6, 10, 14, 18, 30, 37, 40, 44, 79, 84, 86, 98, 99], 10)); // 2\nconsole.log(binarySearch([5, 10, 16, 34, 37, 40, 44, 64, 84, 86, 95, 98, 99], 95)); // 10\nconsole.log(binarySearch([5, 6, 13, 14, 18, 64, 79, 84, 86, 95, 96, 98, 99], 100)); // -1\n",
        "starterCode": {
            "javascript": "// Binary Search\n// Searching\n\n// Binary Search\n// Write a function called binarySearch which accepts a sorted array and\n// a value and returns the index at which the value exists. Otherwise, return -1.\n\n// Time Complexity - O(log n)\n\nfunction binarySearch(arr, val) {\n  let left = 0;\n  let right = arr.length - 1;\n\n  while (left <= right) {\n    const middle = Math.floor((left + right) / 2);\n\n    if (arr[middle] === val) return middle;\n\n    if (arr[middle] > val) right = middle - 1;\n    else left = middle + 1;\n  }\n\n  return -1;\n}\n\nconsole.log(binarySearch([5, 6, 10, 14, 18, 30, 37, 40, 44, 79, 84, 86, 98, 99], 10)); // 2\nconsole.log(binarySearch([5, 10, 16, 34, 37, 40, 44, 64, 84, 86, 95, 98, 99], 95)); // 10\nconsole.log(binarySearch([5, 6, 13, 14, 18, 64, 79, 84, 86, 95, 96, 98, 99], 100)); // -1\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 69,
        "likes": 842
    },
    {
        "id": "99",
        "title": "Knuth Morris Pratt Search",
        "slug": "knuth-morris-pratt-search",
        "difficulty": "Medium",
        "topics": [
            "Searching"
        ],
        "description": "Knuth-Morris-Pratt algorithm Write a function which accepts a string and a pattern, and returns the index at which the value exists. If the pattern does not exist in the string, return -1.",
        "examples": [
            {
                "input": "kmp('dabcdabcyabkglabcdcxabcdabcdabcy', 'abcdabcy')",
                "output": "1",
                "explanation": "Based on code execution"
            },
            {
                "input": "kmp('dabcdabcyabkglabcdcxabcdabcdabcy', 'abcdabcyd')",
                "output": "-1",
                "explanation": "Based on code execution"
            },
            {
                "input": "kmpCounter('dabcdabcyabkglabcdcxabcdabcdabcy', 'abcdabcy')",
                "output": "2",
                "explanation": "Based on code execution"
            },
            {
                "input": "kmpCounter('dabcdabcyabkglabcdcxabcdabcdabcy', 'abcdabcyd')",
                "output": "0",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Knuth-Morris-Pratt algorithm\n// Write a function which accepts a string and a pattern, and returns the index\n// at which the value exists. If the pattern does not exist in the string, return -1.\n\n// Time Complexity - O(n + m)\n// Space complexity - O(n)\n\nfunction buildArrayPattern(pattern) {\n  const arrayPattern = [0];\n  let prefix = 0;\n  let suffix = 1;\n\n  while (arrayPattern.length < pattern.length) {\n    if (pattern[prefix] === pattern[suffix]) {\n      arrayPattern.push(prefix + 1);\n      prefix++;\n      suffix++;\n    } else if (prefix === 0) {\n      arrayPattern.push(0);\n      suffix++;\n    } else {\n      prefix = arrayPattern[prefix - 1];\n    }\n  }\n\n  return arrayPattern;\n}\n\nfunction kmp(text, pattern) {\n  const arrayPattern = buildArrayPattern(pattern);\n  let textIndex = 0;\n  let patternIndex = 0;\n\n  while (textIndex < text.length) {\n    if (text[textIndex] === pattern[patternIndex]) {\n      if (patternIndex === pattern.length - 1) {\n        return textIndex - pattern.length + 1;\n      } else {\n        textIndex++;\n        patternIndex++;\n      }\n    } else if (patternIndex === 0) {\n      textIndex++;\n    } else {\n      patternIndex = arrayPattern[patternIndex - 1];\n    }\n  }\n\n  return -1;\n}\n\nconsole.log(kmp('dabcdabcyabkglabcdcxabcdabcdabcy', 'abcdabcy')); // 1\nconsole.log(kmp('dabcdabcyabkglabcdcxabcdabcdabcy', 'abcdabcyd')); // -1\n\nfunction kmpCounter(text, pattern) {\n  const arrayPattern = buildArrayPattern(pattern);\n  let textIndex = 0;\n  let patternIndex = 0;\n  let counter = 0;\n\n  while (textIndex < text.length) {\n    if (text[textIndex] === pattern[patternIndex]) {\n      if (patternIndex === pattern.length - 1) {\n        textIndex++;\n        patternIndex = 0;\n        counter++;\n      } else {\n        textIndex++;\n        patternIndex++;\n      }\n    } else if (patternIndex === 0) {\n      textIndex++;\n    } else {\n      patternIndex = arrayPattern[patternIndex - 1];\n    }\n  }\n\n  return counter;\n}\n\nconsole.log(kmpCounter('dabcdabcyabkglabcdcxabcdabcdabcy', 'abcdabcy')); // 2\nconsole.log(kmpCounter('dabcdabcyabkglabcdcxabcdabcdabcy', 'abcdabcyd')); // 0\n",
        "starterCode": {
            "javascript": "// Knuth Morris Pratt Search\n// Searching\n\n// Knuth-Morris-Pratt algorithm\n// Write a function which accepts a string and a pattern, and returns the index\n// at which the value exists. If the pattern does not exist in the string, return -1.\n\n// Time Complexity - O(n + m)\n// Space complexity - O(n)\n\nfunction buildArrayPattern(pattern) {\n  const arrayPattern = [0];\n  let prefix = 0;\n  let suffix = 1;\n\n  while (arrayPattern.length < pattern.length) {\n    if (pattern[prefix] === pattern[suffix]) {\n      arrayPattern.push(prefix + 1);\n      prefix++;\n      suffix++;\n    } else if (prefix === 0) {\n      arrayPattern.push(0);\n      suffix++;\n    } else {\n      prefix = arrayPattern[prefix - 1];\n    }\n  }\n\n  return arrayPattern;\n}\n\nfunction kmp(text, pattern) {\n  const arrayPattern = buildArrayPattern(pattern);\n  let textIndex = 0;\n  let patternIndex = 0;\n\n  while (textIndex < text.length) {\n    if (text[textIndex] === pattern[patternIndex]) {\n      if (patternIndex === pattern.length - 1) {\n        return textIndex - pattern.length + 1;\n      } else {\n        textIndex++;\n        patternIndex++;\n      }\n    } else if (patternIndex === 0) {\n      textIndex++;\n    } else {\n      patternIndex = arrayPattern[patternIndex - 1];\n    }\n  }\n\n  return -1;\n}\n\nconsole.log(kmp('dabcdabcyabkglabcdcxabcdabcdabcy', 'abcdabcy')); // 1\nconsole.log(kmp('dabcdabcyabkglabcdcxabcdabcdabcy', 'abcdabcyd')); // -1\n\nfunction kmpCounter(text, pattern) {\n  const arrayPattern = buildArrayPattern(pattern);\n  let textIndex = 0;\n  let patternIndex = 0;\n  let counter = 0;\n\n  while (textIndex < text.length) {\n    if (text[textIndex] === pattern[patternIndex]) {\n      if (patternIndex === pattern.length - 1) {\n        textIndex++;\n        patternIndex = 0;\n        counter++;\n      } else {\n        textIndex++;\n        patternIndex++;\n      }\n    } else if (patternIndex === 0) {\n      textIndex++;\n    } else {\n      patternIndex = arrayPattern[patternIndex - 1];\n    }\n  }\n\n  return counter;\n}\n\nconsole.log(kmpCounter('dabcdabcyabkglabcdcxabcdabcdabcy', 'abcdabcy')); // 2\nconsole.log(kmpCounter('dabcdabcyabkglabcdcxabcdabcdabcy', 'abcdabcyd')); // 0\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 82,
        "likes": 709
    },
    {
        "id": "100",
        "title": "Linear Search",
        "slug": "linear-search",
        "difficulty": "Medium",
        "topics": [
            "Searching"
        ],
        "description": "Linear Search Write a function called linearSearch which accepts an array and a value, and returns the index at which the value exists. If the value does not exist in the array, return -1. Don't use indexOf to implement this function!",
        "examples": [
            {
                "input": "linearSearch([10, 15, 20, 25, 30], 15)",
                "output": "1",
                "explanation": "Based on code execution"
            },
            {
                "input": "linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 4)",
                "output": "5",
                "explanation": "Based on code execution"
            },
            {
                "input": "linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 10)",
                "output": "-1",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Linear Search\n// Write a function called linearSearch which accepts an array and a value,\n// and returns the index at which the value exists.\n// If the value does not exist in the array, return -1.\n// Don't use indexOf to implement this function!\n\n// Time Complexity - O(n)\n\nfunction linearSearch(arr, val) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === val) return i;\n  }\n\n  return -1;\n}\n\nconsole.log(linearSearch([10, 15, 20, 25, 30], 15)); // 1\nconsole.log(linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 4)); // 5\nconsole.log(linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 10)); // -1\n",
        "starterCode": {
            "javascript": "// Linear Search\n// Searching\n\n// Linear Search\n// Write a function called linearSearch which accepts an array and a value,\n// and returns the index at which the value exists.\n// If the value does not exist in the array, return -1.\n// Don't use indexOf to implement this function!\n\n// Time Complexity - O(n)\n\nfunction linearSearch(arr, val) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === val) return i;\n  }\n\n  return -1;\n}\n\nconsole.log(linearSearch([10, 15, 20, 25, 30], 15)); // 1\nconsole.log(linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 4)); // 5\nconsole.log(linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 10)); // -1\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 61,
        "likes": 466
    },
    {
        "id": "101",
        "title": "Naive String Search",
        "slug": "naive-string-search",
        "difficulty": "Medium",
        "topics": [
            "Searching"
        ],
        "description": "naive string search Write a function which accepts a string and a pattern, and counts the number of times the pattern appears in the string.",
        "examples": [
            {
                "input": "stringSearch('hojoklokoklok', 'lok')",
                "output": "2",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// naive string search\n// Write a function which accepts a string and a pattern,\n// and counts the number of times the pattern appears in the string.\n\n// Time Complexity - O(n * m)\n\nfunction stringSearch (str, val) {\n  let count = 0;\n\n  for (let i = 0; i <= str.length - val.length; i++) {\n    for (let j = 0; j < val.length; j++) {\n      if (str[i + j] !== val[j]) break;\n      if (j === val.length - 1) count++;\n    }\n  }\n\n  return count;\n}\n\nconsole.log(stringSearch('hojoklokoklok', 'lok')); // 2\n",
        "starterCode": {
            "javascript": "// Naive String Search\n// Searching\n\n// naive string search\n// Write a function which accepts a string and a pattern,\n// and counts the number of times the pattern appears in the string.\n\n// Time Complexity - O(n * m)\n\nfunction stringSearch (str, val) {\n  let count = 0;\n\n  for (let i = 0; i <= str.length - val.length; i++) {\n    for (let j = 0; j < val.length; j++) {\n      if (str[i + j] !== val[j]) break;\n      if (j === val.length - 1) count++;\n    }\n  }\n\n  return count;\n}\n\nconsole.log(stringSearch('hojoklokoklok', 'lok')); // 2\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 61,
        "likes": 233
    },
    {
        "id": "102",
        "title": "Find Longest Substring",
        "slug": "find-longest-substring",
        "difficulty": "Medium",
        "topics": [
            "Sliding Window"
        ],
        "description": "Sliding Window - findLongestSubstring Write a function called findLongestSubstring, which accepts a string and returns the length of the longest substring with all distinct characters.",
        "examples": [
            {
                "input": "findLongestSubstringVersion1('')",
                "output": "0",
                "explanation": "Based on code execution"
            },
            {
                "input": "findLongestSubstringVersion1('rithmschool')",
                "output": "7",
                "explanation": "Based on code execution"
            },
            {
                "input": "findLongestSubstringVersion1('thisisawesome')",
                "output": "6",
                "explanation": "Based on code execution"
            },
            {
                "input": "findLongestSubstringVersion2('')",
                "output": "0",
                "explanation": "Based on code execution"
            },
            {
                "input": "findLongestSubstringVersion2('rithmschool')",
                "output": "7",
                "explanation": "Based on code execution"
            },
            {
                "input": "findLongestSubstringVersion2('thisisawesome')",
                "output": "6",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Sliding Window - findLongestSubstring\n// Write a function called findLongestSubstring, which accepts a string and\n// returns the length of the longest substring with all distinct characters.\n\n// Time Complexity - O(n^2)\n\nfunction findLongestSubstringVersion1(str) {\n  let obj = {};\n  let i = 0;\n  let maxLen = 0;\n  let tempLen = 0;\n  while (i < str.length) {\n    if (typeof obj[str[i]] !== 'undefined') {\n      tempLen = 0;\n      i = obj[str[i]] + 1;\n      obj = {};\n    } else {\n      obj[str[i]] = i;\n      tempLen++;\n      i++;\n    }\n    maxLen = Math.max(maxLen, tempLen);\n  }\n\n  return maxLen;\n}\n\nconsole.log(findLongestSubstringVersion1('')); // 0\nconsole.log(findLongestSubstringVersion1('rithmschool')); // 7\nconsole.log(findLongestSubstringVersion1('thisisawesome')); // 6\n\n// Time Complexity - O(n)\n\nfunction findLongestSubstringVersion2(str) {\n  const obj = {};\n  let maxLen = 0;\n  let start = 0;\n\n  for (let i = 0; i < str.length; i++) {\n    if (obj[str[i]]) {\n      start = Math.max(start, obj[str[i]]);\n    }\n\n    obj[str[i]] = i + 1;\n    maxLen = Math.max(maxLen, i - start + 1);\n  }\n\n  return maxLen;\n}\n\nconsole.log(findLongestSubstringVersion2('')); // 0\nconsole.log(findLongestSubstringVersion2('rithmschool')); // 7\nconsole.log(findLongestSubstringVersion2('thisisawesome')); // 6\n",
        "starterCode": {
            "javascript": "// Find Longest Substring\n// Sliding Window\n\n// Sliding Window - findLongestSubstring\n// Write a function called findLongestSubstring, which accepts a string and\n// returns the length of the longest substring with all distinct characters.\n\n// Time Complexity - O(n^2)\n\nfunction findLongestSubstringVersion1(str) {\n  let obj = {};\n  let i = 0;\n  let maxLen = 0;\n  let tempLen = 0;\n  while (i < str.length) {\n    if (typeof obj[str[i]] !== 'undefined') {\n      tempLen = 0;\n      i = obj[str[i]] + 1;\n      obj = {};\n    } else {\n      obj[str[i]] = i;\n      tempLen++;\n      i++;\n    }\n    maxLen = Math.max(maxLen, tempLen);\n  }\n\n  return maxLen;\n}\n\nconsole.log(findLongestSubstringVersion1('')); // 0\nconsole.log(findLongestSubstringVersion1('rithmschool')); // 7\nconsole.log(findLongestSubstringVersion1('thisisawesome')); // 6\n\n// Time Complexity - O(n)\n\nfunction findLongestSubstringVersion2(str) {\n  const obj = {};\n  let maxLen = 0;\n  let start = 0;\n\n  for (let i = 0; i < str.length; i++) {\n    if (obj[str[i]]) {\n      start = Math.max(start, obj[str[i]]);\n    }\n\n    obj[str[i]] = i + 1;\n    maxLen = Math.max(maxLen, i - start + 1);\n  }\n\n  return maxLen;\n}\n\nconsole.log(findLongestSubstringVersion2('')); // 0\nconsole.log(findLongestSubstringVersion2('rithmschool')); // 7\nconsole.log(findLongestSubstringVersion2('thisisawesome')); // 6\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 64,
        "likes": 996
    },
    {
        "id": "103",
        "title": "Max Subarray Sum",
        "slug": "max-subarray-sum",
        "difficulty": "Medium",
        "topics": [
            "Sliding Window"
        ],
        "description": "Sliding Window - maxSubarraySum Given an array of integers and a number, write a function called maxSubarraySum, which finds the maximum sum of a subarray with the length of the number passed to the function.",
        "examples": [
            {
                "input": "maxSubarraySum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)",
                "output": "39",
                "explanation": "Based on code execution"
            },
            {
                "input": "maxSubarraySum([3, -2, 7, -4, 1, -1, 4, -2, 1], 2)",
                "output": "5",
                "explanation": "Based on code execution"
            },
            {
                "input": "maxSubarraySum([2, 3], 3)",
                "output": "null",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "Time Complexity - O(N)",
            "Space Complexity - O(1)"
        ],
        "hints": [],
        "solution": "// Sliding Window - maxSubarraySum\n// Given an array of integers and a number, write a function called maxSubarraySum,\n// which finds the maximum sum of a subarray with the length of the number passed to the function.\n\n// Note that a subarray must consist of consecutive elements from the original array.\n// In the first example below, [100, 200, 300] is a subarray of the original array, but [100, 300] is not.\n// maxSubarraySum([100,200,300,400], 2) // 700\n\n// Constraints:\n// Time Complexity - O(N)\n// Space Complexity - O(1)\n\nfunction maxSubarraySum(arr, num) {\n  if (arr.length < num) return null;\n\n  let tempSum = 0;\n\n  for (let i = 0; i < num; i++) {\n    tempSum += arr[i];\n  }\n\n  let maxSum = tempSum;\n\n  for (let i = 0; i < arr.length - num; i++) {\n    tempSum = tempSum - arr[i] + arr[i + num];\n    maxSum = Math.max(maxSum, tempSum);\n  }\n\n  return maxSum;\n}\n\nconsole.log(maxSubarraySum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)); // 39\nconsole.log(maxSubarraySum([3, -2, 7, -4, 1, -1, 4, -2, 1], 2)); // 5\nconsole.log(maxSubarraySum([2, 3], 3)); // null\n",
        "starterCode": {
            "javascript": "// Max Subarray Sum\n// Sliding Window\n\n// Sliding Window - maxSubarraySum\n// Given an array of integers and a number, write a function called maxSubarraySum,\n// which finds the maximum sum of a subarray with the length of the number passed to the function.\n\n// Note that a subarray must consist of consecutive elements from the original array.\n// In the first example below, [100, 200, 300] is a subarray of the original array, but [100, 300] is not.\n// maxSubarraySum([100,200,300,400], 2) // 700\n\n// Constraints:\n// Time Complexity - O(N)\n// Space Complexity - O(1)\n\nfunction maxSubarraySum(arr, num) {\n  if (arr.length < num) return null;\n\n  let tempSum = 0;\n\n  for (let i = 0; i < num; i++) {\n    tempSum += arr[i];\n  }\n\n  let maxSum = tempSum;\n\n  for (let i = 0; i < arr.length - num; i++) {\n    tempSum = tempSum - arr[i] + arr[i + num];\n    maxSum = Math.max(maxSum, tempSum);\n  }\n\n  return maxSum;\n}\n\nconsole.log(maxSubarraySum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)); // 39\nconsole.log(maxSubarraySum([3, -2, 7, -4, 1, -1, 4, -2, 1], 2)); // 5\nconsole.log(maxSubarraySum([2, 3], 3)); // null\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 63,
        "likes": 358
    },
    {
        "id": "104",
        "title": "Min Suarray Length",
        "slug": "min-suarray-length",
        "difficulty": "Medium",
        "topics": [
            "Sliding Window"
        ],
        "description": "Sliding Window - minSubArrayLen Write a function called minSubArrayLen which accepts two parameters - an array of positive integers and a positive integer.",
        "examples": [
            {
                "input": "minSubArrayLen([2, 3, 1, 2, 4, 3], 7)",
                "output": "2 -> because [4,3] is the smallest subarray",
                "explanation": "Based on code execution"
            },
            {
                "input": "minSubArrayLen([2, 1, 6, 5, 4], 9)",
                "output": "2 -> because [5,4] is the smallest subarray",
                "explanation": "Based on code execution"
            },
            {
                "input": "minSubArrayLen([3, 1, 7, 11, 2, 9, 8, 21, 62, 33, 19], 52)",
                "output": "1 -> because [62] is greater than 52",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Sliding Window - minSubArrayLen\n// Write a function called minSubArrayLen which accepts two parameters -\n// an array of positive integers and a positive integer.\n\n// This function should return the minimal length of a contiguous subarray\n// of which the sum is greater than or equal to the integer passed to the function.\n// If there isn't one, return 0 instead.\n\n// Time Complexity - O(n)\n// Space Complexity - O(1)\n\nfunction minSubArrayLen(arr, num) {\n  let tempLen = 0;\n  let sum = 0;\n\n  while (sum < num && tempLen < arr.length) {\n    sum += arr[tempLen];\n    tempLen++;\n  }\n\n  if (sum < num) return 0;\n\n  let minLen = tempLen;\n  let i = 0;\n\n  while (i + tempLen - 1 < arr.length) {\n    if (sum >= num) {\n      minLen = Math.min(minLen, tempLen);\n      sum -= arr[i];\n      i++;\n      tempLen--;\n    } else {\n      sum += arr[i + tempLen];\n      tempLen++;\n    }\n  }\n\n  return minLen;\n}\n\nconsole.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 7)); // 2 -> because [4,3] is the smallest subarray\nconsole.log(minSubArrayLen([2, 1, 6, 5, 4], 9)); // 2 -> because [5,4] is the smallest subarray\nconsole.log(minSubArrayLen([3, 1, 7, 11, 2, 9, 8, 21, 62, 33, 19], 52)); // 1 -> because [62] is greater than 52\n",
        "starterCode": {
            "javascript": "// Min Suarray Length\n// Sliding Window\n\n// Sliding Window - minSubArrayLen\n// Write a function called minSubArrayLen which accepts two parameters -\n// an array of positive integers and a positive integer.\n\n// This function should return the minimal length of a contiguous subarray\n// of which the sum is greater than or equal to the integer passed to the function.\n// If there isn't one, return 0 instead.\n\n// Time Complexity - O(n)\n// Space Complexity - O(1)\n\nfunction minSubArrayLen(arr, num) {\n  let tempLen = 0;\n  let sum = 0;\n\n  while (sum < num && tempLen < arr.length) {\n    sum += arr[tempLen];\n    tempLen++;\n  }\n\n  if (sum < num) return 0;\n\n  let minLen = tempLen;\n  let i = 0;\n\n  while (i + tempLen - 1 < arr.length) {\n    if (sum >= num) {\n      minLen = Math.min(minLen, tempLen);\n      sum -= arr[i];\n      i++;\n      tempLen--;\n    } else {\n      sum += arr[i + tempLen];\n      tempLen++;\n    }\n  }\n\n  return minLen;\n}\n\nconsole.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 7)); // 2 -> because [4,3] is the smallest subarray\nconsole.log(minSubArrayLen([2, 1, 6, 5, 4], 9)); // 2 -> because [5,4] is the smallest subarray\nconsole.log(minSubArrayLen([3, 1, 7, 11, 2, 9, 8, 21, 62, 33, 19], 52)); // 1 -> because [62] is greater than 52\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 56,
        "likes": 361
    },
    {
        "id": "105",
        "title": "Are There Duplicates",
        "slug": "are-there-duplicates",
        "difficulty": "Medium",
        "topics": [
            "Two Pointers"
        ],
        "description": "Multiple Pointers - areThereDuplicates Implement a function called, areThereDuplicates which accepts a variable number of arguments, and checks whether there are any duplicates among the arguments passed in.",
        "examples": [
            {
                "input": "areThereDuplicatesWithTwoPointers(1, 2, 3)",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "areThereDuplicatesWithTwoPointers('a', 'b', 'c', 'a')",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "areThereDuplicatesWithOnePointer(1, 2, 3)",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "areThereDuplicatesWithOnePointer('a', 'b', 'c', 'a')",
                "output": "true",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Multiple Pointers - areThereDuplicates\n// Implement a function called, areThereDuplicates which accepts a variable number of arguments,\n// and checks whether there are any duplicates among the arguments passed in.\n\n// Restrictions:\n// Time Complexity - O(n log n)\n// Space Complexity - O(1)\n\n// Solution with two pointers (two variables)\n\nfunction areThereDuplicatesWithTwoPointers(...args) {\n  if (!args.length) return false;\n\n  args.sort();\n\n  for (let i = 0, j = 1; j < args.length; i++, j++) {\n    if (args[i] === args[j]) return true;\n  }\n\n  return false;\n}\n\nconsole.log(areThereDuplicatesWithTwoPointers(1, 2, 3)); // false\nconsole.log(areThereDuplicatesWithTwoPointers('a', 'b', 'c', 'a')); // true\n\n// Solution with one pointer (one variable)\n\nfunction areThereDuplicatesWithOnePointer(...args) {\n  if (!args.length) return false;\n\n  args.sort();\n\n  for (let i = 0; i < args.length - 1; i++) {\n    if (args[i] === args[i + 1]) return true;\n  }\n\n  return false;\n}\n\nconsole.log(areThereDuplicatesWithOnePointer(1, 2, 3)); // false\nconsole.log(areThereDuplicatesWithOnePointer('a', 'b', 'c', 'a')); // true\n",
        "starterCode": {
            "javascript": "// Are There Duplicates\n// Two Pointers\n\n// Multiple Pointers - areThereDuplicates\n// Implement a function called, areThereDuplicates which accepts a variable number of arguments,\n// and checks whether there are any duplicates among the arguments passed in.\n\n// Restrictions:\n// Time Complexity - O(n log n)\n// Space Complexity - O(1)\n\n// Solution with two pointers (two variables)\n\nfunction areThereDuplicatesWithTwoPointers(...args) {\n  if (!args.length) return false;\n\n  args.sort();\n\n  for (let i = 0, j = 1; j < args.length; i++, j++) {\n    if (args[i] === args[j]) return true;\n  }\n\n  return false;\n}\n\nconsole.log(areThereDuplicatesWithTwoPointers(1, 2, 3)); // false\nconsole.log(areThereDuplicatesWithTwoPointers('a', 'b', 'c', 'a')); // true\n\n// Solution with one pointer (one variable)\n\nfunction areThereDuplicatesWithOnePointer(...args) {\n  if (!args.length) return false;\n\n  args.sort();\n\n  for (let i = 0; i < args.length - 1; i++) {\n    if (args[i] === args[i + 1]) return true;\n  }\n\n  return false;\n}\n\nconsole.log(areThereDuplicatesWithOnePointer(1, 2, 3)); // false\nconsole.log(areThereDuplicatesWithOnePointer('a', 'b', 'c', 'a')); // true\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 68,
        "likes": 449
    },
    {
        "id": "106",
        "title": "Average Pair",
        "slug": "average-pair",
        "difficulty": "Medium",
        "topics": [
            "Two Pointers"
        ],
        "description": "Multiple Pointers - averagePair Write a function called averagePair. Given a sorted array of integers and a target average, determine if there is a pair of values in the array where the average of the pair equals the target average. There may be more than one pair that matches the average target.",
        "examples": [
            {
                "input": "averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "averagePair([-1, 0, 3, 4, 5, 6], 4.1)",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "averagePair([], 4)",
                "output": "false",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "Time Complexity: O(N)",
            "Space Complexity: O(1)"
        ],
        "hints": [],
        "solution": "// Multiple Pointers - averagePair\n// Write a function called averagePair. Given a sorted array of integers\n// and a target average, determine if there is a pair of values in the array\n// where the average of the pair equals the target average.\n// There may be more than one pair that matches the average target.\n\n// Bonus Constraints:\n// Time Complexity: O(N)\n// Space Complexity: O(1)\n\nfunction averagePair(arr, av) {\n  let left = 0;\n  let right = arr.length - 1;\n\n  while (left < right) {\n    const tempAv = (arr[left] + arr[right]) / 2;\n    if (tempAv === av) return true;\n    if (tempAv > av) right--;\n    else left++;\n  }\n\n  return false;\n}\n\nconsole.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)); // true\nconsole.log(averagePair([-1, 0, 3, 4, 5, 6], 4.1)); // false\nconsole.log(averagePair([], 4)); // false\n",
        "starterCode": {
            "javascript": "// Average Pair\n// Two Pointers\n\n// Multiple Pointers - averagePair\n// Write a function called averagePair. Given a sorted array of integers\n// and a target average, determine if there is a pair of values in the array\n// where the average of the pair equals the target average.\n// There may be more than one pair that matches the average target.\n\n// Bonus Constraints:\n// Time Complexity: O(N)\n// Space Complexity: O(1)\n\nfunction averagePair(arr, av) {\n  let left = 0;\n  let right = arr.length - 1;\n\n  while (left < right) {\n    const tempAv = (arr[left] + arr[right]) / 2;\n    if (tempAv === av) return true;\n    if (tempAv > av) right--;\n    else left++;\n  }\n\n  return false;\n}\n\nconsole.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)); // true\nconsole.log(averagePair([-1, 0, 3, 4, 5, 6], 4.1)); // false\nconsole.log(averagePair([], 4)); // false\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 83,
        "likes": 981
    },
    {
        "id": "107",
        "title": "Count Unique Values",
        "slug": "count-unique-values",
        "difficulty": "Medium",
        "topics": [
            "Two Pointers"
        ],
        "description": "Multiple Pointers - countUniqueValues Implement a function called countUniqueValues, which accepts a sorted array, and counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted.",
        "examples": [
            {
                "input": "countUniqueValuesWithTwoPointers([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])",
                "output": "7",
                "explanation": "Based on code execution"
            },
            {
                "input": "countUniqueValuesWithTwoPointers([-2, -1, -1, 0, 1])",
                "output": "4",
                "explanation": "Based on code execution"
            },
            {
                "input": "countUniqueValuesWithOnePointer([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])",
                "output": "7",
                "explanation": "Based on code execution"
            },
            {
                "input": "countUniqueValuesWithOnePointer([-2, -1, -1, 0, 1])",
                "output": "4",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Multiple Pointers - countUniqueValues\n// Implement a function called countUniqueValues, which accepts a sorted array,\n// and counts the unique values in the array.\n// There can be negative numbers in the array, but it will always be sorted.\n\n// Time Complexity - O(n)\n// Space Complexity - O(n)\n\n// Bonus\n// You must do this with constant or O(1) space and O(n) time.\n\n// Solution with two pointers (two variables)\n\nfunction countUniqueValuesWithTwoPointers(arr) {\n  if (!arr.length) return 0;\n  let counter = 1;\n\n  for (let i = 0, j = 1; j < arr.length; j++, i++) {\n    if (arr[i] !== arr[j]) counter++;\n  }\n\n  return counter;\n}\n\nconsole.log(countUniqueValuesWithTwoPointers([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7\nconsole.log(countUniqueValuesWithTwoPointers([-2, -1, -1, 0, 1])); // 4\n\n// Solution with one pointer (one variable)\n\nfunction countUniqueValuesWithOnePointer(arr) {\n  if (!arr.length) return 0;\n  let counter = 1;\n\n  for (let i = 0; i < arr.length - 1; i++) {\n    if (arr[i] !== arr[i + 1]) counter++;\n  }\n\n  return counter;\n}\n\nconsole.log(countUniqueValuesWithOnePointer([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7\nconsole.log(countUniqueValuesWithOnePointer([-2, -1, -1, 0, 1])); // 4\n",
        "starterCode": {
            "javascript": "// Count Unique Values\n// Two Pointers\n\n// Multiple Pointers - countUniqueValues\n// Implement a function called countUniqueValues, which accepts a sorted array,\n// and counts the unique values in the array.\n// There can be negative numbers in the array, but it will always be sorted.\n\n// Time Complexity - O(n)\n// Space Complexity - O(n)\n\n// Bonus\n// You must do this with constant or O(1) space and O(n) time.\n\n// Solution with two pointers (two variables)\n\nfunction countUniqueValuesWithTwoPointers(arr) {\n  if (!arr.length) return 0;\n  let counter = 1;\n\n  for (let i = 0, j = 1; j < arr.length; j++, i++) {\n    if (arr[i] !== arr[j]) counter++;\n  }\n\n  return counter;\n}\n\nconsole.log(countUniqueValuesWithTwoPointers([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7\nconsole.log(countUniqueValuesWithTwoPointers([-2, -1, -1, 0, 1])); // 4\n\n// Solution with one pointer (one variable)\n\nfunction countUniqueValuesWithOnePointer(arr) {\n  if (!arr.length) return 0;\n  let counter = 1;\n\n  for (let i = 0; i < arr.length - 1; i++) {\n    if (arr[i] !== arr[i + 1]) counter++;\n  }\n\n  return counter;\n}\n\nconsole.log(countUniqueValuesWithOnePointer([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7\nconsole.log(countUniqueValuesWithOnePointer([-2, -1, -1, 0, 1])); // 4\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 60,
        "likes": 811
    },
    {
        "id": "108",
        "title": "Find Pair",
        "slug": "find-pair",
        "difficulty": "Medium",
        "topics": [
            "Two Pointers"
        ],
        "description": "Frequency Counter - findPair Given an unsorted array and a number n, find if there exists a pair of elements in the array whose difference is n. This function should return true if the pair exists or false if it does not.",
        "examples": [
            {
                "input": "findPair([6, 1, 4, 10, 2, 4], 2)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "findPair([8, 6, 2, 4, 1, 0, 2, 5, 13], 1)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "findPair([4, -2, 3, 10], -6)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "findPair([6, 1, 4, 10, 2, 4], 22)",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "findPair([], 0)",
                "output": "false",
                "explanation": "Based on code execution"
            },
            {
                "input": "findPair([5, 5], 0)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "findPair([-4, 4], -8)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "findPair([-4, 4], 8)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "findPair([1, 3, 4, 6], -2)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "findPair([0, 1, 3, 4, 6], -2)",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "findPair([-2, 5, 10, 15, 16], 0)",
                "output": "false",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Frequency Counter - findPair\n// Given an unsorted array and a number n, find if there exists a pair of elements\n// in the array whose difference is n. This function should return true\n// if the pair exists or false if it does not.\n\n// Solve this with the following requirements:\n// Time Complexity - O(n log n)\n// Space Complexity - O(1)\n\nfunction findPair(arr, num) {\n  arr.sort((a, b) => a - b);\n\n  const numAbs = Math.abs(num);\n  let i = 0;\n  let j = 1;\n\n  while (j < arr.length) {\n    const diffAbs = Math.abs(arr[i] - arr[j]);\n\n    if (diffAbs === numAbs) return true;\n\n    if (diffAbs > numAbs && i === j - 1) {\n      i++;\n      j++;\n    } else if (diffAbs > numAbs) {\n      i++;\n    } else {\n      j++;\n    }\n  }\n\n  return false;\n}\n\nconsole.log(findPair([6, 1, 4, 10, 2, 4], 2)); // true\nconsole.log(findPair([8, 6, 2, 4, 1, 0, 2, 5, 13], 1)); // true\nconsole.log(findPair([4, -2, 3, 10], -6)); // true\nconsole.log(findPair([6, 1, 4, 10, 2, 4], 22)); // false\nconsole.log(findPair([], 0)); // false\nconsole.log(findPair([5, 5], 0)); // true\nconsole.log(findPair([-4, 4], -8)); // true\nconsole.log(findPair([-4, 4], 8)); // true\nconsole.log(findPair([1, 3, 4, 6], -2)); // true\nconsole.log(findPair([0, 1, 3, 4, 6], -2)); // true\nconsole.log(findPair([-2, 5, 10, 15, 16], 0)); // false\n",
        "starterCode": {
            "javascript": "// Find Pair\n// Two Pointers\n\n// Frequency Counter - findPair\n// Given an unsorted array and a number n, find if there exists a pair of elements\n// in the array whose difference is n. This function should return true\n// if the pair exists or false if it does not.\n\n// Solve this with the following requirements:\n// Time Complexity - O(n log n)\n// Space Complexity - O(1)\n\nfunction findPair(arr, num) {\n  arr.sort((a, b) => a - b);\n\n  const numAbs = Math.abs(num);\n  let i = 0;\n  let j = 1;\n\n  while (j < arr.length) {\n    const diffAbs = Math.abs(arr[i] - arr[j]);\n\n    if (diffAbs === numAbs) return true;\n\n    if (diffAbs > numAbs && i === j - 1) {\n      i++;\n      j++;\n    } else if (diffAbs > numAbs) {\n      i++;\n    } else {\n      j++;\n    }\n  }\n\n  return false;\n}\n\nconsole.log(findPair([6, 1, 4, 10, 2, 4], 2)); // true\nconsole.log(findPair([8, 6, 2, 4, 1, 0, 2, 5, 13], 1)); // true\nconsole.log(findPair([4, -2, 3, 10], -6)); // true\nconsole.log(findPair([6, 1, 4, 10, 2, 4], 22)); // false\nconsole.log(findPair([], 0)); // false\nconsole.log(findPair([5, 5], 0)); // true\nconsole.log(findPair([-4, 4], -8)); // true\nconsole.log(findPair([-4, 4], 8)); // true\nconsole.log(findPair([1, 3, 4, 6], -2)); // true\nconsole.log(findPair([0, 1, 3, 4, 6], -2)); // true\nconsole.log(findPair([-2, 5, 10, 15, 16], 0)); // false\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 71,
        "likes": 482
    },
    {
        "id": "109",
        "title": "Is Subsequence",
        "slug": "is-subsequence",
        "difficulty": "Medium",
        "topics": [
            "Two Pointers"
        ],
        "description": "Multiple Pointers - isSubsequence Write a function called isSubsequence which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string, without their order changing.",
        "examples": [
            {
                "input": "isSubsequence('sing', 'sting')",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "isSubsequence('abc', 'abracadabra')",
                "output": "true",
                "explanation": "Based on code execution"
            },
            {
                "input": "isSubsequence('abc', 'acb')",
                "output": "false (order matters)",
                "explanation": "Based on code execution"
            },
            {
                "input": "isSubsequence('', 'cat')",
                "output": "true",
                "explanation": "Based on code execution"
            }
        ],
        "constraints": [
            "See problem description for constraints."
        ],
        "hints": [],
        "solution": "// Multiple Pointers - isSubsequence\n// Write a function called isSubsequence which takes in two strings and checks\n// whether the characters in the first string form a subsequence of the characters\n// in the second string. In other words, the function should check whether the characters\n// in the first string appear somewhere in the second string, without their order changing.\n\n// Your solution MUST have AT LEAST the following complexities:\n// Time Complexity - O(N + M)\n// Space Complexity - O(1)\n\nfunction isSubsequence(pattern, str) {\n  if (str.length < pattern.length) return false;\n\n  let i = 0;\n  let j = 0;\n\n  while (j < str.length && i < pattern.length) {\n    if (pattern[i] === str[j]) i++;\n    j++;\n  }\n\n  return i === pattern.length;\n}\n\nconsole.log(isSubsequence('sing', 'sting')); // true\nconsole.log(isSubsequence('abc', 'abracadabra')); // true\nconsole.log(isSubsequence('abc', 'acb')); // false (order matters)\nconsole.log(isSubsequence('', 'cat')); // true\n",
        "starterCode": {
            "javascript": "// Is Subsequence\n// Two Pointers\n\n// Multiple Pointers - isSubsequence\n// Write a function called isSubsequence which takes in two strings and checks\n// whether the characters in the first string form a subsequence of the characters\n// in the second string. In other words, the function should check whether the characters\n// in the first string appear somewhere in the second string, without their order changing.\n\n// Your solution MUST have AT LEAST the following complexities:\n// Time Complexity - O(N + M)\n// Space Complexity - O(1)\n\nfunction isSubsequence(pattern, str) {\n  if (str.length < pattern.length) return false;\n\n  let i = 0;\n  let j = 0;\n\n  while (j < str.length && i < pattern.length) {\n    if (pattern[i] === str[j]) i++;\n    j++;\n  }\n\n  return i === pattern.length;\n}\n\nconsole.log(isSubsequence('sing', 'sting')); // true\nconsole.log(isSubsequence('abc', 'abracadabra')); // true\nconsole.log(isSubsequence('abc', 'acb')); // false (order matters)\nconsole.log(isSubsequence('', 'cat')); // true\n",
            "python": "# Python solution not available",
            "java": "// Java solution not available",
            "cpp": "// C++ solution not available"
        },
        "companies": [],
        "acceptance": 83,
        "likes": 695
    }
];

export const getQuestionById = (id: string): Question | undefined => {
    return questions.find(q => q.id === id);
};

export const getQuestionBySlug = (slug: string): Question | undefined => {
    return questions.find(q => q.slug === slug);
};

export const getQuestionsByTopic = (topic: Topic): Question[] => {
    return questions.filter(q => q.topics.includes(topic));
};

export const getQuestionsByDifficulty = (difficulty: Difficulty): Question[] => {
    return questions.filter(q => q.difficulty === difficulty);
};

export const getRandomQuestion = (): Question => {
    return questions[Math.floor(Math.random() * questions.length)];
};

export const getTopicStats = (): Record<Topic, { total: number; easy: number; medium: number; hard: number }> => {
    const stats: Record<string, { total: number; easy: number; medium: number; hard: number }> = {};

    TOPICS.forEach(topic => {
        const topicQuestions = questions.filter(q => q.topics.includes(topic));
        stats[topic] = {
            total: topicQuestions.length,
            easy: topicQuestions.filter(q => q.difficulty === 'Easy').length,
            medium: topicQuestions.filter(q => q.difficulty === 'Medium').length,
            hard: topicQuestions.filter(q => q.difficulty === 'Hard').length,
        };
    });

    return stats as Record<Topic, { total: number; easy: number; medium: number; hard: number }>;
};
