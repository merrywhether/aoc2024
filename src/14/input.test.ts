import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "input";

Deno.test(`correct safety factor for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.safetyFactor, 224438715);
});

Deno.test(`correct time to tree for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.timeToTree, 7603);
});
