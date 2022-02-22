import { words } from "./words.js";
import { popular } from "./popular.js";

export class Solver {
    constructor() {
        this.wordList = new Set(words);

        this.word = [
            // 0: ...
            // 1: ...
            // 2: ...
            // 3: ...
            // 4: ...
        ];

        this.gray = new Set();
        this.yellow = new Set();
        this.yellowPos = [
            // 0: new Set([a, b, ...])
        ];

        for (let i = 0; i < 5; i++) {
            this.yellowPos[i] = new Set();
        }

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
                    this.yellowPos[i].add(letter);
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
        let out = "";
        let yellow = Infinity;
        let green = -Infinity;

        for (const word of this.wordList) {
            let potential = false;
            let wyellow = 0;
            let wgreen = 0;

            for (let i = 0; i < 5; i++) {
                // this word must have a known wrong
                if (
                    this.gray.has(word[i])
                    || this.yellowPos[i].has(word[i])
                ) {
                    this.wordList.delete(word);
                    break; // already 'continue's
                }

                // target greens
                if (this.word[i] && this.word[i] != word[i]) {
                    break;
                }

                if (this.word[i] == word[i]) {
                    potential = true;
                    wgreen++;
                }

                if (this.yellow.has(word[i])) {
                    potential = true;
                    wyellow++;
                }
            }

            if (
                potential &&
                wyellow <= yellow && wgreen >= green
            ) {
                out = word;
                yellow = wyellow;
                green = wgreen;
            }
        }
        
        this.wordList.delete(out);
        return out;
    }

    findWord2() {
        let out = "";

        for (const word of this.wordList) {
            for (let i = 0; i < 5; i++) {
                // this word must have a known wrong
                if (
                    this.gray.has(word[i])
                    || this.yellowPos[i].has(word[i])
                ) {
                    this.wordList.delete(word);
                    break; // already 'continue's
                }

                // target greens
                if (this.word[i] && this.word[i] != word[i]) {
                    break;
                }
            }
        }

        this.wordList.delete(out);
        return out;
    }
}
