type Program = number[];
type Register = "A" | "B" | "C";
type Registers = { [R in Register]: number };

function getComboOperand(operand: number, registers: Registers) {
  switch (operand) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 3;
    case 4:
      return registers.A;
    case 5:
      return registers.B;
    case 6:
      return registers.C;
    default:
      throw new Error(`Invalid combo operand: ${operand}`);
  }
}

function getOutput(
  program: Program,
  registers: Registers,
  matchSelf = false,
): Program | undefined {
  let instructionPointer = 0;
  const output = [];
  while (instructionPointer < program.length) {
    const opcode = program[instructionPointer];
    switch (opcode) {
      // adv
      case 0: {
        registers.A = Math.floor(
          registers.A / 2 **
              getComboOperand(program[instructionPointer + 1], registers),
        );
        break;
      }

      // bxl
      case 1: {
        registers.B ^= program[instructionPointer + 1];
        break;
      }

      // bst
      case 2: {
        registers.B =
          getComboOperand(program[instructionPointer + 1], registers) % 8;
        break;
      }

      // jnz
      case 3: {
        if (registers.A !== 0) {
          instructionPointer = program[instructionPointer + 1];
          continue;
        }
        break;
      }

      // bxc
      case 4: {
        registers.B ^= registers.C;
        break;
      }

      // out
      case 5: {
        const value =
          getComboOperand(program[instructionPointer + 1], registers) % 8;
        if (matchSelf && program[output.length] !== value) {
          return;
        }
        output.push(value);
        break;
      }

      // bdv
      case 6: {
        registers.B = Math.floor(
          registers.A / 2 **
              getComboOperand(program[instructionPointer + 1], registers),
        );

        break;
      }

      // cdv
      case 7: {
        registers.C = Math.floor(
          registers.A / 2 **
              getComboOperand(program[instructionPointer + 1], registers),
        );
        break;
      }
    }

    instructionPointer += 2;
  }

  return output;
}

export async function main(target = "input") {
  const dirpath = new URL(".", import.meta.url).pathname;
  const text = await Deno.readTextFile(`${dirpath}${target}.txt`);

  const { program, registers } = text.split("\n").reduce((agg, line) => {
    const registerMatch = line.match(/^Register ([ABC]): (\d+)$/);
    if (registerMatch) {
      const [, register, value] = registerMatch;
      agg.registers[register as Register] = Number(value);
      return agg;
    }

    const programMatch = line.match(/^Program: ([\d,]+)$/);
    if (programMatch) {
      agg.program = programMatch[1].split(",").map(Number);
      return agg;
    }

    return agg;
  }, { registers: { A: 0, B: 0, C: 0 } as Registers, program: [] as number[] });

  const output = getOutput(program, registers);

  let startingA = 0;
  if (target !== "sample") {
    let searchOutput = getOutput(program, { A: startingA, B: 0, C: 0 }, true);
    while (!searchOutput || searchOutput.length !== program.length) {
      startingA++;
      searchOutput = getOutput(program, { A: startingA, B: 0, C: 0 }, true);
    }
  }

  return { output: output?.join(","), startingA };
}

if (import.meta.main) {
  const startTime = performance.now();
  console.log(await main());
  console.log(`Elapsed: ${Math.round(performance.now() - startTime)}ms`);
}
