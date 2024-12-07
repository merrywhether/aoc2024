import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "input";

Deno.test(`correct legal update middle page sum for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.legalUpdateMiddlePageSum, 5955);
});

Deno.test(`correct fixed update middle page sum for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.fixedUpdateMiddlePageSum, 4030);
});
