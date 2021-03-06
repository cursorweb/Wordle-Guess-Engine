import { words } from "./words.js";
import { popular } from "./popular.js";

export class Solver {
    constructor() {
        // this.wordList = new Set(popular);
        // this.popular = new Set(["arise"]);
        this.wordList = new Set(words);
        this.popular = new Set(popular);

        this.word = [
            // 0: ...
            // 1: ...
            // 2: ...
            // 3: ...
            // 4: ...
        ];

        this.gray = new Set(); // wrong
        this.yellow = new Set(); // in word
        this.grayPos = [
            // 0: new Set([...])
        ]; // in word but not here
        /*
        this.gray = new Set();
        this.yellow = new Set();
        this.yellowPos = [
            // 0: new Set([a, b, ...])
        ];
        */
        for (let i = 0; i < 5; i++) {
            this.grayPos[i] = new Set();
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
            this.interpret(info);
            return this.genStart();
        }

        this.interpret(info);

        return this.findWord();
    }

    interpret(info) {
        info.forEach(({ letter, state }, i) => {
            switch (state) {
                case 1: // correct
                    this.word[i] = letter;
                    this.yellow.delete(letter);
                    break;
                
                case 2: // in word
                    this.grayPos[i].add(letter);
                    this.yellow.add(letter);
                    break;
                
                case 3: // wrong
                    this.grayPos[i].add(letter);
                    this.gray.add(letter);
                    break;
            }
        });
    }

    genStart() {
        loop: for (const word of this.popular) {
            // cannot be wrong
            for (const letter of this.gray) {
                if (word.includes(letter)) {
                    this.wordList.delete(word);
                    this.popular.delete(word);
                    continue loop;
                }
            }

            for (let i = 0; i < 5; i++) {
                if (this.grayPos[i].has(word[i])) {
                    this.wordList.delete(word);
                    this.popular.delete(word);
                    continue loop;
                }
            }

            // must include potential
            for (const potential of this.yellow) {
                if (!word.includes(potential)) {
                    this.wordList.delete(word);
                    this.popular.delete(word);
                }
            }
        }

        const wordArr = [...this.popular];
        const word = wordArr[Math.floor(Math.random() * wordArr.length)];
        this.popular.delete(word);
        return word;
    }

    isWrong(info) {
        let wrongs = 0;
        info.forEach(({ state }) => {
            if (state == 3) wrongs++;
        });
        return wrongs == 5;
    }

    findWord() {
        loop: for (const word of this.wordList) {
            // cannot be wrong
            for (const letter of this.gray) {
                if (word.includes(letter)) {
                    this.wordList.delete(word);
                    continue loop;
                }
            }

            for (let i = 0; i < 5; i++) {
                if (this.grayPos[i].has(word[i])) {
                    this.wordList.delete(word);
                    continue loop;
                }
            }

            // must include green
            for (let i = 0; i < 5; i++) {
                if (this.word[i] != null && word[i] != this.word[i]) {
                    this.wordList.delete(word);
                    continue loop;
                }
            }
            
            // must include potential
            for (const potential of this.yellow) {
                if (!word.includes(potential)) {
                    this.wordList.delete(word);
                }
            }
        }

        const outArr = [...this.wordList];
        const out = outArr[Math.floor(Math.random() * outArr.length)];
        this.wordList.delete(out);

        return out;
    }
}
