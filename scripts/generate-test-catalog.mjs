#!/usr/bin/env node
// Snapshots `playwright test --list` into src/generated/test-catalog.json so the
// admin dashboard can read a static catalog when it can't spawn the Playwright
// CLI at request time (e.g. Vercel serverless functions don't ship node_modules/.bin).
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const playwrightBin = path.join(root, "node_modules", ".bin", "playwright");
const outPath = path.join(root, "src", "generated", "test-catalog.json");

function flattenSuite(suite, describeTitle, out) {
  for (const spec of suite.specs ?? []) {
    out.push({
      id: `${spec.file}:${spec.line}`,
      file: spec.file,
      line: spec.line,
      describeTitle,
      title: spec.title,
    });
  }

  for (const child of suite.suites ?? []) {
    flattenSuite(child, child.title, out);
  }
}

const stdout = execFileSync(playwrightBin, ["test", "--list", "--reporter=json"], {
  cwd: root,
  maxBuffer: 1024 * 1024 * 20,
  encoding: "utf8",
});

const report = JSON.parse(stdout);
const tests = [];
for (const suite of report.suites ?? []) {
  flattenSuite(suite, suite.title, tests);
}
tests.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);

mkdirSync(path.dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(tests, null, 2) + "\n");

console.log(`[generate-test-catalog] wrote ${tests.length} tests to ${path.relative(root, outPath)}`);
