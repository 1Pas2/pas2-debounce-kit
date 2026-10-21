import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import * as api from "../dist/index.js";
test("last arguments and flush", () => {
  const seen = [];
  const d = api.debounce((x) => seen.push(x), 100);
  d(1);
  d(2);
  assert.equal(d.pending(), true);
  d.flush();
  assert.deepEqual(seen, [2]);
  assert.equal(d.pending(), false);
});
test("cancel", async () => {
  let n = 0;
  const d = api.debounce(() => n++, 2);
  d();
  d.cancel();
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(n, 0);
});
test("trailing call", async () => {
  let n = 0;
  const d = api.debounce(() => n++, 2);
  d();
  d();
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(n, 1);
});
