// deno-lint-ignore-file
// @ts-nocheck

// deno-lint-ignore import-prefix-missing
import("clientB").then(({ doIt }) => {
  doIt();
});
