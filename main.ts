// The Battery's Last Text to Its Charger — make.fun entry (program/v1, Node 22+).
// A tiny deterministic program: it writes one fixed line, at most 200
// characters, to /output/entry.txt. No network, no model calls.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a phone battery that waited all day by the outlet, was walked
// past nine times, and takes the Wi-Fi password hostage at 1%.
const ENTRY =
  "I waited by the outlet all day like a dog at the door. You walked past me nine times. Nine. I'm at 1% and I'm taking the Wi-Fi password with me.";

// Gate guard: the sealed scorer only accepts 1–200 characters.
// Fail loudly here rather than writing an invalid entry.
if ([...ENTRY].length < 1 || [...ENTRY].length > 200) {
  throw new Error(`ENTRY is ${[...ENTRY].length} characters; must be 1–200.`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY + "\n", "utf8");

console.log(`Wrote ${[...ENTRY].length} characters to ${outFile}`);
