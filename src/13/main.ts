// { minimumTokens: 36838, minimumBigTokens: 83029436920891 }
// Elapsed: 2ms

// Solving the system of equations:
// a * aX + b * bX = pX
// a * aY + b * bY = pY
//
// a = (pX - b * bX) / aX
//
// (pX - b * bX) / aX * aY + b * bY = pY
// pX * aY - b * bX * aY + b * bY * aX = pY * aX
// - b * bX * aY + b * bY * aX = pY * aX - pX * aY
// b * (bY * aX - bX * aY) = pY * aX - pX * aY
// b = (pY * aX - pX * aY) / (bY * aX - bX * aY)

type ButtonType = "A" | "B";

interface Button<Type extends ButtonType> {
  type: Type;
  x: number;
  y: number;
}

interface ClawMachine {
  A: Button<"A">;
  B: Button<"B">;
  prize: { x: number; y: number };
}

const big = 10000000000000;

export async function main(target = "input") {
  const dirpath = new URL(".", import.meta.url).pathname;
  const text = await Deno.readTextFile(`${dirpath}${target}.txt`);

  const { machines } = text.split("\n").reduce((agg, line) => {
    const matchButton = line.match(/^Button ([AB]): X\+(\d+), Y\+(\d+)$/);
    if (matchButton) {
      const type = matchButton[1] as ButtonType;
      agg.pending[type] = {
        type,
        x: Number(matchButton[2]),
        y: Number(matchButton[3]),
      } as any;
      return agg;
    }

    const matchPrize = line.match(/^Prize: X=(\d+), Y=(\d+)$/);
    if (matchPrize) {
      agg.machines.push({
        ...agg.pending as Pick<ClawMachine, ButtonType>,
        prize: {
          x: Number(matchPrize[1]),
          y: Number(matchPrize[2]),
        },
      });
      agg.pending = {};
      return agg;
    }

    return agg;
  }, {
    pending: {} as Partial<Pick<ClawMachine, ButtonType>>,
    machines: [] as ClawMachine[],
  });

  return machines.reduce(
    (agg, { A, B, prize }) => {
      const b = (prize.y * A.x - prize.x * A.y) / (B.y * A.x - B.x * A.y);
      if (Math.floor(b) === b) {
        const a = (prize.x - b * B.x) / A.x;
        if (Math.floor(a) === a) {
          agg.minimumTokens += a * 3 + b;
        }
      }

      const bigB = ((big + prize.y) * A.x - (big + prize.x) * A.y) /
        (B.y * A.x - B.x * A.y);
      if (Math.floor(bigB) === bigB) {
        const bigA = ((big + prize.x) - bigB * B.x) / A.x;
        if (Math.floor(bigA) === bigA) {
          agg.minimumBigTokens += bigA * 3 + bigB;
        }
      }

      return agg;
    },
    { minimumTokens: 0, minimumBigTokens: 0 },
  );
}

if (import.meta.main) {
  const startTime = performance.now();
  console.log(await main());
  console.log(`Elapsed: ${Math.round(performance.now() - startTime)}ms`);
}
