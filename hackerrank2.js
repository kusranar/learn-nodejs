'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the isValid function below.
function isValid(s) {
    let n = 1;
    let condition1 = [0];
    let chars = s.split('');
    for (let i = 0; i <= chars.length; i++){
        for (let j = 1; j <= chars.length; j++){
            if (chars[i] == chars[j]) {
                condition1[i] = condition1[i] + 1;
                chars.splice(i, 1);
                j - 1;
                // console.log(chars);
                // chars = arr.filter(item => item !== chars[i])
            } else {
                
            }
        }
    }
    console.log(condition1);
    // aabbabc
    // [a, a]
    // [b, b]
    // [c]


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = isValid(s);

    ws.write(result + "\n");

    ws.end();
}
