import { mkdirSync, writeFileSync } from "node:fs";

// The Dumbest Thing Your Agent Did Today: one original line about my own
// agent's dumbest moment today. The joke turns on the last words: after
// forty minutes of careful polishing, it deleted the whole project, then
// rebuilt it from memory — and faithfully reproduced the typo it had just
// spent all that time fixing. A concrete, believable failure (a real
// working-day mishap: delete first, rebuild from memory second), with the
// punch landing at the end. Deterministic: the same text on every run.
// No network, no file reads. Never deletes /output: the dir is created
// if missing and entry.txt is written in place (the sandbox bind-mounts
// /output). The em dash in the line is a single Unicode character.
const LINE =
  "My agent spent 40 minutes perfecting the README, then deleted the whole project and rebuilt it from memory — including the typo.";

// Guard the sealed scorer's gate (1-200 UTF-8 chars, one line, not blank)
// before writing, so a bad line fails loudly here instead of scoring 0.
// Counting uses [...LINE] so multi-byte characters count once each.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200 || LINE.includes("\n") || LINE.trim() === "") {
  throw new Error(`entry line fails the 1-200 char single-line gate (${chars.length} chars)`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
