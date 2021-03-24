// // Input: abc#d#ef#
// // Should give
// // Output: abe

// let input = '#abc#d#ef#';
// input = input.split('');
// let op = [];
// input.forEach((ip, index) => {
//     if (ip == '#') {
//         op.pop()
//     } else {
//         op.push(ip)
//     }
// })
// // console.log(op)

// // ---------------------------------------------------------------------------
// // Count occurence of element in array
// let names = ['alu', 'bob', 'alice', 'truce', 'truce', 'truce', 'truce', 'bob']
// let occurence = {}
// names.map(name => {
//     occurence[name] = occurence[name] ? occurence[name] + 1 : 1
// })
// // console.log('occurence', occurence)

// // ---------------------------------------------------------------------------
// //Reomve duplicate items from array
// let duplicateNames = ['alu', 'bob', 'alice', 'truce', 'truce', 'truce', 'truce', 'bob']
// let result = []
// duplicateNames.map(name => {
//     result.includes(name) ? '' : result.push(name)
// })
// let reduces = [... new Set([...duplicateNames])]
// // console.log('result', result)
// // console.log('console',reduces)

// // ---------------------------------------------------------------------------
// //Distructing array to object
// let distructingNames = ['alu', 'bob', 'alice', 'truce', 'truce', 'truce', 'truce', 'bob']
// let obj = {}
// distructingNames.forEach((ele, i) => {
//     obj[i] = ele;
// })
// // console.log('obj', obj)


// // ---------------------------------------------------------------------------
// // Add only numbers
// // Input =22_k_123_89

// let test = '22_k_123_89'.split('').reduce((acc, number) => {
//     return isNaN(number) ? acc : parseInt(acc) + parseInt(number);
// })
// // console.log('test', test)


// // ---------------------------------------------------------------------------
// //First letter uppercase
// let name = 'nikhil'
// name.charAt(0).toUpperCase();
// const resultOne = name[0].toUpperCase() + name.slice(1)
// const resultTwo = name[0].toUpperCase() + name.substr(1)
// // console.log('resultTwo', resultTwo)
// // console.log('resultOne', resultOne)


// // ---------------------------------------------------------------------------
// // Find some substring from array of strings

// let testString = ['apple', 'banana', 'mango', 'grapes']
// const getSubStr = (arr, search) => {
//     return arr.filter(froot => froot.toLowerCase().includes(search.toLowerCase()))
// }
// // console.log(getSubStr(testString, 'bana'))


// // ---------------------------------------------------------------------------
// // construct random integer in range [1-10]
// const number = Math.floor(Math.random() * 10) + 1
// // console.log('number', number)



// // ---------------------------------------------------------------------------
// // construct random integer in dynamic range 
// randomInt = (min, max) => {
//     return Math.floor(Math.random() * (max - min + 1)) + min
// }
// // console.log('Random int in given series', randomInt(10, 11))

// function fibonacci(num) {
//     if (num == 1) { return 0 }
//     if (num == 2) { return 1 }
//     return fibonacci(num - 1) + fibonacci(num - 2)
// }
// // console.log('fibonacci(12)', fibonacci(12))
// let n1 = 0, n2 = 1, nextTerm;
// let num = 10
// // console.log('Fibonacci Series:');

// for (let i = 1; i <= num; i++) {
//     // console.log(n1);
//     nextTerm = n1 + n2;
//     n1 = n2;
//     n2 = nextTerm;
// }


// // Singleton class in 
// class SingleTon {
//     constructor() {
//         this.data = [];
//         if (!SingleTon.ins) {
//             SingleTon.ins = this;
//         }
//         return SingleTon.ins
//     }
// }
// let insOne = new SingleTon();
// insOne.data.push(1)
// let insTwo = new SingleTon();
// // console.log('instance One', insOne)
// // console.log('instance Two', insTwo)

// let testNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
// let j = testNames.length - 1
// let temp = ''
// for (let i = 0; i < j; i++, j--) {
//     // console.log('i', i)
//     temp = testNames[i];
//     testNames[i] = testNames[j];
//     testNames[j] = temp
// }
// // console.log('testNames', testNames)

// isInt = (num) => {
//     return (num % 1 == 0)
// }
// // console.log('isInt', isInt(12))

// // constructor
// // ngOnChanges
// // ngOnInit
// // ngDoCheck
// // ngAfterContentInit
// // ngAfterContentChecked
// // ngAfterViewInit
// // ngAfterViewChecked
// // ngOnDestroy



// let recipe = { flour: 500, sugar: 200, eggs: 1 }
// let available = { flour: 1600, sugar: 1200, eggs: 5, milk: 200 }

// function cakes(recipe, available) {
//     let obj = []
//     for (let key in recipe) {
//         if (available[key]) {
//             if (available[key] >= recipe[key]) {
//                 obj.push(Math.floor(available[key] / recipe[key]))
//             }
//         } else {
//             obj.push(0)
//         }
//     }
//     return obj.sort((a, b) => a-b)[0]
// }

// // console.log('cakes available', cakes(recipe, available))
 
// 'use strict';
// console.log('Hello');
// console.log('1. I am a ' + name)
// var name = 'Deepak';
// console.log('2. I am a ' + name);
// function whoAmI() {
//     console.log('3. I am a ' + name)
//     var name = 'DK'
//     console.log('4. I am a ' + name)
// }
// whoAmI();


console.log(typeof null)
console.log(typeof undefined)
