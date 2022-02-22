import { words } from "./words.js";
import { popular } from "./popular.js";

export class Solver {
    constructor() {
        this.wordList = new Set(words);

        this.word = {
            // 0: ...
            // 1: ...
            // 2: ...
            // 3: ...
            // 4: ...
        };

        this.gray = new Set();
        this.yellow = new Set();
        this.round = 0;
    }

    /*
    this is ordered too btw, 0 = first word, 4 = last word
    [
        {
            letter: "x",
            state: 1, 1 = green, 2 = yellow 3 = gray
        }
    ]
    */
    iterate(info = []) {
        if (!this.isWrong(info)) this.round++;
        if (this.round == 0) {
            const word = popular[Math.floor(Math.random() * popular.length)];
            this.wordList.delete(word); // exhausted
            return word;
        }

        info.forEach(({ letter, state }, i) => {
            switch (state) {
                case 1: // correct
                    this.word[i] = letter;
                    this.yellow.delete(letter);
                    break;
                
                case 2: // in word
                    this.yellow.add(letter);
                    break;
                
                case 3: // wrong
                    this.gray.add(letter);
                    break;
            }
        });

        return this.findWord();
    }

    isWrong(info) {
        if (info.length == 0) return true;
        
        let wrongs = 0;
        info.forEach(({ state }) => {
            if (state == 3) wrongs++;
        });
        return wrongs == 5;
    }

    findWord() {
        const out = [];

        for (const word of this.wordList) {
            for (let i = 0; i < 5; i++) {
                if (this.gray.has(word[i])) {
                    this.wordList.delete(word);
                    break; // already 'continue's
                }

                if (this.word[i] == word[i] || this.yellow.has(word[i])) {
                    out.push(word);
                    break;
                }
            }
        }
        
        this.wordList.delete(out[0]);
        return out[0];
    }
}
