type Gate = "AND" | "OR" | "XOR";
type Voltage = 1 | 0;

type Wire = {
  voltage: Voltage | undefined;
  gate?: {
    type: Gate;
    wireKey1: string;
    wireKey2: string;
  };
};

type Wiring = Record<string, Wire>;

function solveGate(voltage1: Voltage, voltage2: Voltage, type: Gate): Voltage {
  const voltage = type === "AND"
    ? voltage1 & voltage2
    : type === "OR"
    ? voltage1 | voltage2
    : voltage1 ^ voltage2;

  if (voltage !== 1 && voltage !== 0) {
    throw new Error("Invalid voltage");
  }

  return voltage;
}

function solveWire(wire: Wire, wiring: Wiring): Voltage {
  if (wire.voltage !== undefined) {
    return wire.voltage;
  }

  if (!wire.gate) {
    throw new Error("Wire has no voltage or gate");
  }

  const voltage1 = solveWire(wiring[wire.gate.wireKey1], wiring);
  const voltage2 = solveWire(wiring[wire.gate.wireKey2], wiring);

  wire.voltage = solveGate(voltage1, voltage2, wire.gate.type);

  return wire.voltage;
}

export async function main(target = "input") {
  const dirpath = new URL(".", import.meta.url).pathname;
  const text = await Deno.readTextFile(`${dirpath}${target}.txt`);

  const { wiring, zs } = text.split("\n").reduce((agg, line) => {
    const inputMatch = line.match(/^([xy]\d\d): ([01])$/);
    if (inputMatch) {
      agg.wiring[inputMatch[1]] = { voltage: Number(inputMatch[2]) as 0 | 1 };
    }

    const gateMatch = line.match(
      /^([a-z0-9]{3}) (AND|OR|XOR) ([a-z0-9]{3}) -> ([a-z0-9]{3})$/,
    );
    if (gateMatch) {
      agg.wiring[gateMatch[4]] = {
        voltage: undefined,
        gate: {
          type: gateMatch[2] as "AND" | "OR" | "XOR",
          wireKey1: gateMatch[1],
          wireKey2: gateMatch[3],
        },
      };

      if (gateMatch[4].startsWith("z")) {
        agg.zs.push(gateMatch[4]);
      }
    }
    return agg;
  }, { wiring: {} as Wiring, zs: [] as string[] });

  const output = zs.sort().reverse().map((key) =>
    solveWire(wiring[key], wiring)
  );

  return { decimalOutput: parseInt(output.join(""), 2) };
}

if (import.meta.main) {
  const startTime = performance.now();
  console.log(await main());
  console.log(`Elapsed: ${Math.round(performance.now() - startTime)}ms`);
}
