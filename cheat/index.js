// cheaty method!
import { wordList } from "./la.js";
import { question as prompt } from "readline-sync";

const epox = new Date(2021, 5, 19, 0, 0, 0, 0);

// generates date (Na)
function makeDate(e, a) {
    let s = new Date(e);
    let t = new Date(a).setHours(0, 0, 0, 0) - s.setHours(0, 0, 0, 0);
    return Math.floor(t / 864e5);
}

// creates answer (Da)
function makeAns(e) {
    let a;
    let s = makeIndex(e);
    a = s % wordList.length;
    return wordList[a - 1];
}

// creates index (Ga)
function makeIndex(e) {
    return makeDate(epox, e);
}

// answer:
// const d = prompt("Date (new Date): ");
console.log(makeAns(new Date));