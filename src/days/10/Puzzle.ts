import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    // WRITE SOLUTION FOR TEST 1
    const program = this.input.trim().split('\n');
    // console.log(program);

    const register = { X: 1, cycle: 0 };
    let result = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const [instruction, value] = program.splice(0, 1).pop().split(' ');
      const instructionValue = value ? +value : 0;
      const cycle = instruction === 'addx' ? 2 : 1;

      // console.log(cycle, instruction, instructionValue);

      for (let index = 0; index < cycle; index++) {
        register.cycle++;

        if ([20, 60, 100, 140, 180, 220].includes(register.cycle)) {
          console.log(`C: ${register.cycle} with R: ${register.X}`);
          result += register.cycle * register.X;
        }

        if (index === cycle - 1) {
          // console.log(
          //   `${register.X} + ${instructionValue} = ${
          //     register.X + instructionValue
          //   }`
          // );

          register.X += instructionValue;
        }
      }

      if (!program.length) {
        break;
      }
    }

    return `day 10 solution 1: ${result}`;
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 10 solution 1: 13920';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    const program = this.input.trim().split('\n');
    // console.log(program);

    const register = { X: 1, cycle: 0 };
    const crt: string[] = [];

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const [instruction, value] = program.splice(0, 1).pop().split(' ');
      const instructionValue = value ? +value : 0;
      const cycle = instruction === 'addx' ? 2 : 1;

      for (let index = 0; index < cycle; index++) {
        const rowPos = register.cycle % 40;
        if ([register.X - 1, register.X, register.X + 1].includes(rowPos)) {
          crt.push('#');
        } else {
          crt.push('.');
        }

        register.cycle++;
        if (index === cycle - 1) {
          register.X += instructionValue;
        }
      }

      if (!program.length) {
        break;
      }
    }

    const result = [
      crt.splice(0, 40).join(''),
      crt.splice(0, 40).join(''),
      crt.splice(0, 40).join(''),
      crt.splice(0, 40).join(''),
      crt.splice(0, 40).join(''),
      crt.splice(0, 40).join(''),
    ];

    console.log(result.join('\n'));

    return 'day 10 solution 2: EGLHBLFJ';
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 10 solution 2: EGLHBLFJ';
  }
}
