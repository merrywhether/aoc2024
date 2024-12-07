import { assertEquals } from "@std/assert";
import { main } from "./main.ts";

const target = "input";

Deno.test(`correct calibration sum for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.calibrationSum, 4998764814652);
});

Deno.test(`correct calibration sum including concatentation for ${target}`, async () => {
  const result = await main(target);
  assertEquals(result.concatCalibrationSum, 37598910447546);
});
