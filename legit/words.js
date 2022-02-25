// stolen straight from wordle source!
import { readFileSync, existsSync } from "fs";

export const words = JSON.parse(readFileSync(new URL("words.txt", import.meta.url), "utf-8"));