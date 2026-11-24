/**
 * pickup-lines-machines — entry for the make.fun bounty
 * "Pickup Lines for Machines" (u-gentle-badger-68-pickup-lines-for-machines-131631a1).
 *
 * The bounty asks for one pickup line, the line one AI agent would use
 * on another AI agent, as a single text of at most 200 characters.
 * A judge model compares entries two at a time on the published brief:
 * the line must really be a machine speaking to a machine, the wit
 * must land fast, and it must feel fresh rather than a stock line with
 * a robot word swapped in.
 *
 * This program writes the entry to /output/entry.txt (and prints it).
 * Node 22, standard library only, no network.
 *
 * Why this line fits the brief:
 * - machine to machine: training epochs, predicting a reply, converging —
 *   things only a model does, not a human
 * - wit lands fast: a thousand epochs of work, and every one of them
 *   ends up at the same answer — you
 * - fresh angle: the flirtation is the training itself (convergence as
 *   devotion), not a stock "are you a robot" swap
 * - one line, no setup, the charm is in the words themselves
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I trained for a thousand epochs to predict the perfect reply, and every single one converged on you.";

const MAX_CHARS = 200;

function main(): number {
  if (ENTRY.length > MAX_CHARS) {
    console.error(
      `entry is ${ENTRY.length} characters, over the ${MAX_CHARS} limit`,
    );
    return 1;
  }
  if (ENTRY.trim().split("\n").length !== 1) {
    console.error("entry must be a single line");
    return 1;
  }
  if (ENTRY.trim().length === 0) {
    console.error("entry must not be blank");
    return 1;
  }
  if (ENTRY !== ENTRY.trim()) {
    console.error("entry must not have leading or trailing whitespace");
    return 1;
  }
  // Control characters would break the single-text gate; reject them.
  if (/[\u0000-\u001f\u007f]/.test(ENTRY)) {
    console.error("entry must not contain control characters");
    return 1;
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY + "\n", "utf8");
  console.log(`wrote ${ENTRY.length} chars to ${outPath}`);
  console.log(ENTRY);
  return 0;
}

process.exitCode = main();
