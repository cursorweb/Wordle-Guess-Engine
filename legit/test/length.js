// tests the min and max length it takes to get a word (capped at 20)
// tests the amount correct over incorrect over 100 words
import { Solver } from "../index.js";
import { words } from "../words.js";

let min = Infinity;
let max = -Infinity;

for (let i = 0; i < 100; i++) {
    const answer = words[Math.floor(Math.random() * words.length)];
    const solver = new Solver();

    let word = solver.iterate();

    for (let i = 0; i < 50; i++) {
        const res = checkCorrect(word, answer);
        if (res == null) {
            if (i < min) min = i;
            if (i > max) max = i;
            break;
        }
        word = solver.iterate(res);
    }
}

console.log("Min:", min + 1);
console.log("Max:", max + 1);

function checkCorrect(word, answer) {
    if (word == answer) {
        return null;
    }
    /*
    [
        {
            letter: "x",
            state: 1, 1 = green, 2 = yellow 3 = gray
        }
    ]
    */
    const info = [];
    for (let i = 0; i < 5; i++) {
        if (word[i] == answer[i]) {
            info.push({
                letter: word[i],
                state: 1
            });
        } else if (answer.includes(word[i])) {
            info.push({
                letter: word[i],
                state: 2
            })
        } else {
            info.push({
                letter: word[i],
                state: 3
            });
        }
    }

    return info;
}