// { wordCount: 2718, xCount: 2046 }

const wordTarget = "XMAS";

const wordTargets = [
  wordTarget.split(""),
  wordTarget.split("").reverse(),
];

const xTarget = wordTarget.slice(1);

const xTargets = [
  xTarget.split(""),
  xTarget.split("").reverse(),
];

export async function main(target = "input") {
  const dirpath = new URL(".", import.meta.url).pathname;
  const text = await Deno.readTextFile(`${dirpath}${target}.txt`);

  const data = text.split("\n").map((line) =>
    line.split("").filter((l) => l.length > 0)
  );

  return data.reduce((acc, line, lineIdx) => {
    const { wordCount, xCount } = line.reduce((lineAcc, char, charIdx) => {
      wordTargets.forEach((target) => {
        if (char === target[0]) {
          // across
          if (
            data[lineIdx][charIdx + 1] === target[1] &&
            data[lineIdx][charIdx + 2] === target[2] &&
            data[lineIdx][charIdx + 3] === target[3]
          ) {
            lineAcc.wordCount++;
          }

          // down
          if (
            data[lineIdx + 1][charIdx] === target[1] &&
            data[lineIdx + 2][charIdx] === target[2] &&
            data[lineIdx + 3][charIdx] === target[3]
          ) {
            lineAcc.wordCount++;
          }

          // diagonal down right
          if (
            data[lineIdx + 1][charIdx + 1] === target[1] &&
            data[lineIdx + 2][charIdx + 2] === target[2] &&
            data[lineIdx + 3][charIdx + 3] === target[3]
          ) {
            lineAcc.wordCount++;
          }

          // diagonal down left
          if (
            data[lineIdx + 1][charIdx - 1] === target[1] &&
            data[lineIdx + 2][charIdx - 2] === target[2] &&
            data[lineIdx + 3][charIdx - 3] === target[3]
          ) {
            lineAcc.wordCount++;
          }
        }
      });

      xTargets.forEach((target) => {
        if (char === target[0]) {
          // diagonal down right
          if (
            data[lineIdx + 1][charIdx + 1] === target[1] &&
            data[lineIdx + 2][charIdx + 2] === target[2]
          ) {
            // cross-check
            if (
              data[lineIdx][charIdx + 2] === target[0] &&
                data[lineIdx + 2][charIdx] === target[2] ||
              data[lineIdx][charIdx + 2] === target[2] &&
                data[lineIdx + 2][charIdx] === target[0]
            ) {
              lineAcc.xCount++;
            }
          }
        }
      });

      return lineAcc;
    }, { wordCount: 0, xCount: 0 });

    acc.wordCount += wordCount;
    acc.xCount += xCount;
    return acc;
  }, { wordCount: 0, xCount: 0 });
}

if (import.meta.main) {
  console.log(await main());
}
