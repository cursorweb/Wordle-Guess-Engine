// tests the amount correct over incorrect over 100 words
import { Solver } from "../index.js";
import { words } from "../words.js";

let correct = 0;
let icorrect = 0;

for (let i = 0; i < 100; i++) {
    let next = false;
    const answer = words[Math.floor(Math.random() * words.length)];
    const solver = new Solver();

    let word = solver.iterate();

    for (let i = 0; i < 5 && next == false; i++) {
        const res = checkCorrect(word, answer);
        if (res == null) {
            next = true;
            correct++;
            break;
        }
        word = solver.iterate(res);
    }

    if (!next) icorrect++;
}

console.log("Ratio:", correct / (icorrect + correct));

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