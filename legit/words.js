// stolen straight from wordle source!
import { readFileSync, existsSync } from "fs";

export const words = JSON.parse(readFileSync("words.txt", "utf-8"));