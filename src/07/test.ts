import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "sample";

Deno.test(`correct calibration sum for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.calibrationSum, 3749);
});

Deno.test(`correct calibration sum including concatentation for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.concatCalibrationSum, 11387);
});
