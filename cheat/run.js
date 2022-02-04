import { makeAns } from "./index.js";

console.log(`Predicted Answer: ${makeAns(new Date)}

Also Try: ${makeAns(new Date, 0)} (tomorrow's?)
Also Try: ${makeAns(new Date, -2)} (yesterday's?)`);