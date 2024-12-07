// { calibrationSum: 4998764814652, concatCalibrationSum: 37598910447546 }
// Elapsed: 207ms

function concatNumbers(a: number, b: number) {
  return Number(`${a}${b}`);
}

function numbersProduceTestValue(
  testValue: number,
  currentTotal: number,
  numbers: number[],
  withConcatenation = false,
): boolean {
  if (currentTotal > testValue) {
    return false;
  }

  if (numbers.length === 1) {
    return currentTotal + numbers[0] === testValue ||
      currentTotal * numbers[0] === testValue ||
      withConcatenation &&
        concatNumbers(currentTotal, numbers[0]) === testValue;
  }

  const [next, ...rest] = numbers;
  return numbersProduceTestValue(
    testValue,
    currentTotal + next,
    rest,
    withConcatenation,
  ) ||
    numbersProduceTestValue(
      testValue,
      currentTotal * next,
      rest,
      withConcatenation,
    ) ||
    withConcatenation &&
      numbersProduceTestValue(
        testValue,
        concatNumbers(currentTotal, next),
        rest,
        true,
      );
}

export async function main(target = "input") {
  const dirpath = new URL(".", import.meta.url).pathname;
  const text = await Deno.readTextFile(`${dirpath}${target}.txt`);

  return text.split("\n").reduce((agg, line) => {
    const match = line.match(/^(\d+): ([\d ]+)$/);
    if (match) {
      const testValue = Number(match[1]);
      const [head, ...tail] = match[2].split(" ").map(Number);

      if (numbersProduceTestValue(testValue, head, tail)) {
        agg.calibrationSum += testValue;
        agg.concatCalibrationSum += testValue;
      } else if (numbersProduceTestValue(testValue, head, tail, true)) {
        agg.concatCalibrationSum += testValue;
      }
    }
    return agg;
  }, { calibrationSum: 0, concatCalibrationSum: 0 });
}

if (import.meta.main) {
  const startTime = performance.now();
  console.log(await main());
  console.log(`Elapsed: ${Math.round(performance.now() - startTime)}ms`);
}
