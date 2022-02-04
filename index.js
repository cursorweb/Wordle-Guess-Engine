import { words } from "./words.js";
import { popular, commonLetters } from "./popular.js";

const word = {
    // 0: ...
    // 1: ...
    // 2: ...
    // 3: ...
    // 4: ...
};

const gray = [];
const yellow = [];

let round = 0;

/*
[
    {
        letter: "x",
        state: 0, 0 = gray 1 = yellow 2 = green
    }
]
*/
function findWord(info = []) {
    // first
    if (round == 0) {
        return popular[Math.floor(Math.random() * popular.length)];
    }

    info.forEach(({ letter, state }, i) => {
        if (state == 2) {
            word[i] = letter;
        }
    });

    round++;
}

console.log(findWord());
console.log(findWord([{
    letter: ""
}]));