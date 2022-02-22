import { Solver } from "./index.js";

const answer = "sissy";
const solver = new Solver();

let word;

word = solver.iterate();
console.log(word);
word = solver.iterate(checkCorrect(word, answer));
console.log(word);
word = solver.iterate(checkCorrect(word, answer));
console.log(word);
word = solver.iterate(checkCorrect(word, answer));
console.log(word);
word = solver.iterate(checkCorrect(word, answer));
console.log(word);
word = solver.iterate(checkCorrect(word, answer));
console.log(word);

function checkCorrect(word, answer) {
    if (word == answer) {
        throw "Done!";
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