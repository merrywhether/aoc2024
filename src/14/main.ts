// { safetyFactor: 224438715, timeToTree: 7603 }
// Elapsed: 341ms

interface Robot {
  x: number;
  y: number;
  vX: number;
  vY: number;
}

type Quadrent = "upperLeft" | "upperRight" | "lowerLeft" | "lowerRight";

type QuadrentData = { [Q in Quadrent]: number };

function getQuadrentForRobot(
  x: number,
  y: number,
  halfWidth: number,
  halfHeight: number,
): Quadrent | undefined {
  if (x < halfWidth) {
    if (y < halfHeight) {
      return "upperLeft";
    } else if (y > halfHeight) {
      return "lowerLeft";
    }
  } else if (x > halfWidth) {
    if (y < halfHeight) {
      return "upperRight";
    } else if (y > halfHeight) {
      return "lowerRight";
    }
  }
}

function getSafetyFactor(quadrents: QuadrentData) {
  return Object.values(quadrents).reduce((agg, quadrent) => agg * quadrent);
}

export async function main(target = "input") {
  const [width, height] = target === "input" ? [101, 103] : [11, 7];
  const halfWidth = (width - 1) / 2;
  const halfHeight = (height - 1) / 2;
  const maxRounds = height * width;
  const targetRounds = 100;

  const dirpath = new URL(".", import.meta.url).pathname;
  const text = await Deno.readTextFile(`${dirpath}${target}.txt`);

  const { robots, ...quadrents } = text.split("\n").reduce((agg, line) => {
    const match = line.match(/^p=(\d+),(\d+) v=(-?\d+),(-?\d+)$/);
    if (match) {
      const [_, iX, iY, vX, vY] = match.map(Number);

      const fX = (((iX + targetRounds * vX) % width) + width) % width;
      const fY = (((iY + targetRounds * vY) % height) + height) % height;
      const quadrent = getQuadrentForRobot(fX, fY, halfWidth, halfHeight);
      if (quadrent) {
        agg[quadrent]++;
      }

      agg.robots.push({
        x: iX,
        y: iY,
        vX,
        vY,
      });
    }
    return agg;
  }, {
    robots: [] as Robot[],
    upperLeft: 0,
    upperRight: 0,
    lowerLeft: 0,
    lowerRight: 0,
  });

  let round = 1;
  let minSafetyFactor = [Infinity, Infinity];
  while (round <= maxRounds) {
    robots.forEach((robot) => {
      robot.x = (((robot.x + robot.vX) % width) + width) % width;
      robot.y = (((robot.y + robot.vY) % height) + height) % height;
    });

    const safetyFactor = getSafetyFactor(robots.reduce((agg, { x, y }) => {
      const quadrent = getQuadrentForRobot(x, y, halfWidth, halfHeight);
      if (quadrent) {
        agg[quadrent]++;
      }
      return agg;
    }, {
      upperLeft: 0,
      upperRight: 0,
      lowerLeft: 0,
      lowerRight: 0,
    }));

    if (safetyFactor < minSafetyFactor[0]) {
      minSafetyFactor = [safetyFactor, round];
    }

    round++;
  }

  return {
    safetyFactor: getSafetyFactor(quadrents),
    timeToTree: minSafetyFactor[1],
  };
}

if (import.meta.main) {
  const startTime = performance.now();
  console.log(await main());
  console.log(`Elapsed: ${Math.round(performance.now() - startTime)}ms`);
}
