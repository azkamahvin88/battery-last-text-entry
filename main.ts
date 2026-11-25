// The Battery's Last Text to Its Charger — make.fun entry (program/v1, Node 22+).
// A tiny deterministic program: it writes one fixed line, at most 200
// characters, to $OUTPUT_DIR/entry.txt (default /output). No network, no
// model calls. The scored artifact is the single line of text, nothing else.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a phone battery that waited all day by the outlet, was walked
// past nine times, and takes the Wi-Fi password hostage at 1%.
export const ENTRY_TEXT =
  "I waited by the outlet all day like a dog at the door. You walked past me nine times. Nine. I'm at 1% and I'm taking the Wi-Fi password with me.";

// Scorer limits: the sealed scorer only accepts entries of 1–200 characters.
// Count by code points so a stray multi-byte character cannot slip past.
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

function validateEntry(text: string): void {
  const length = [...text].length;
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new Error(
      `ENTRY_TEXT is ${length} characters; must be ${MIN_LENGTH}–${MAX_LENGTH}.`,
    );
  }
}

function resolveOutputPath(): string {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  return join(outDir, "entry.txt");
}

function main(): void {
  validateEntry(ENTRY_TEXT);

  const outFile = resolveOutputPath();
  mkdirSync(join(outFile, ".."), { recursive: true });
  writeFileSync(outFile, ENTRY_TEXT + "\n", "utf8");

  // Read the file back and confirm it holds exactly the entry plus one
  // trailing newline; a partial or corrupted write must fail loudly.
  const written = readFileSync(outFile, "utf8");
  if (written !== ENTRY_TEXT + "\n") {
    throw new Error(`Verification failed: ${outFile} does not match ENTRY_TEXT.`);
  }

  console.log(`Wrote ${[...ENTRY_TEXT].length} characters to ${outFile}`);
}

main();
