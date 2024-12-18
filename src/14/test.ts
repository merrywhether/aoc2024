import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "sample";

Deno.test(`correct safety factor for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.safetyFactor, 12);
});
