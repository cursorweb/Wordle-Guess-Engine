import { words } from "./words.js";
import { popular, commonLetters } from "./popular.js";

const word = {
    // 0: ...
    // 1: ...
    // 2: ...
    // 3: ...
    // 4: ...
};

const gray = new Set();
const yellow = new Set();

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
    let r = round;

    round++;

    // first
    if (r == 0) {
        return popular[Math.floor(Math.random() * popular.length)];
    }

    info.forEach(({ letter, state }, i) => {
        switch (state) {
            case 0: // gray
                gray.add(letter);
                break;
            
            case 1: // yellow
                yellow.add(letter);
                break;
            
            case 2: // green
                word[i] = letter;
                break;
        }
    });

    
}

function similarSearch(words) {

}

console.log(findWord());
console.log(findWord([{
    letter: ""
}]));