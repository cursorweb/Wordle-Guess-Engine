import { Solver } from "./index.js";
import { words } from "./words.js";
import { popular } from "./popular.js";

const answer = "vivid";
// const answer = words[Math.floor(Math.random() * words.length)];
// const answer = popular[Math.floor(Math.random() * popular.length)];
const solver = new Solver();

let word, res;

word = solver.iterate();
res = checkCorrect(word, answer);
console.log("[1]", formatStr(word, answer));

for (let i = 0; i < 5; i++) {
    word = solver.iterate(res);
    res = checkCorrect(word, answer);
    console.log(`[${i + 2}]`, formatStr(word, answer));
    if (res == null) {
        console.log("Guessed it!"); break;
    }
}

console.log("Word was:", answer);

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

function formatStr(word, answer) {
    let out = "";

    for (let i = 0; i < 5; i++) {
        if (word[i] == answer[i]) {
            out += "\x1b[32m";
        } else if (answer.includes(word[i])) {
            out += "\x1b[33m";
        } else {
            out += "\x1b[90m";
        }
        out += word[i];
    }

    out += `\x1b[0m`;
    return out;
}