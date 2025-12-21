const students = [
    { name: 'Павел', age: 20 },
    { name: 'Иван', age: 20 },
    { name: 'Эдем', age: 20 },
    { name: 'Денис', age: 20 },
    { name: 'Виктория', age: 20 },
    { age: 40 },
]

//1
function pickPropArray(arr, prop) {
    let result = []
    for(let obj of arr) {
        if(obj[prop] !== undefined) {
            result.push(obj[prop])
        }
    }
    return result
}

//2
function createCounter() {
    let count = 0
    return function() {
        count = count + 1
        console.log(count)
    }
}

//3
function spinWords(str) {
    let words = str.split(' ')
    for(let i = 0; i < words.length; i++) {
        if(words[i].length >= 5) {
            words[i] = words[i].split('').reverse().join('')
        }
    }
    return words.join(' ')
}

//4
function twoSum(nums, target) {
    for(let i = 0; i < nums.length; i++) {
        for(let j = i + 1; j < nums.length; j++) {
            if(nums[i] + nums[j] == target) {
                return [i, j]
            }
        }
    }
}

//5
function longestCommonPrefix(strs) {
    if(!strs[0]) return ""
    let p = ""
    for(let i = 0; i < 2; i++) {
        let char = strs[0][i]
        for(let str of strs) {
            if(!str[i] || str[i] != char) return ""
        }
        p += char
    }
    return p
}

//Тесты
console.log(pickPropArray(students, 'name'))
const counter1 = createCounter()
counter1() 
counter1()
const counter2 = createCounter()
counter2()
counter2() 
console.log(spinWords("Привет от Legacy"))
console.log(spinWords("This is a test"))
console.log(twoSum([2,7,11,15], 9))
console.log(longestCommonPrefix(["цветок","поток","хлопок"]))
console.log(longestCommonPrefix(["собака","гоночная машина","машина"]))