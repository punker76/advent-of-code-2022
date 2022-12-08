import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    // WRITE SOLUTION FOR TEST 1
    const [stacksInput, movesInput] = this.input.split('\n\n');

    const stacks = stacksInput.split('\n');
    const moves = movesInput.trim().split('\n');

    // console.log('Stacks', stacks);
    // console.log('Moves', moves);

    const stackMatrix: string[][] = [];

    [...stacks[stacks.length - 1]].forEach((s, i) => {
      if (+s) {
        // console.log(s, i);
        stackMatrix.push([]);

        for (let index = stacks.length - 2; index >= 0; index--) {
          const element = [...stacks[index]][i];
          if (element != ' ') {
            // console.log('line', index, element);
            stackMatrix[+s - 1].push(element);
          }
        }
      }
    });

    // console.log(stackMatrix);

    moves.forEach((m) => {
      // console.log(m);

      const moveInstruction =
        /move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/g.exec(m);
      const count = +moveInstruction?.groups?.count;
      const from = +moveInstruction?.groups?.from;
      const to = +moveInstruction?.groups?.to;

      // console.log(count, from, to);

      for (let index = 0; index < count; index++) {
        stackMatrix[to - 1].push(stackMatrix[from - 1].pop());
      }
    });

    // console.log(stackMatrix);

    const result = stackMatrix.map((s) => s.pop()).reduce((p, c) => p + c);

    return `day 5 solution 1: ${result}`;
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 5 solution 1: QNNTGTPFN';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    const [stacksInput, movesInput] = this.input.split('\n\n');

    const stacks = stacksInput.split('\n');
    const moves = movesInput.trim().split('\n');

    // console.log('Stacks', stacks);
    // console.log('Moves', moves);

    const stackMatrix: string[][] = [];

    [...stacks[stacks.length - 1]].forEach((s, i) => {
      if (+s) {
        // console.log(s, i);
        stackMatrix.push([]);

        for (let index = stacks.length - 2; index >= 0; index--) {
          const element = [...stacks[index]][i];
          if (element != ' ') {
            // console.log('line', index, element);
            stackMatrix[+s - 1].push(element);
          }
        }
      }
    });

    // console.log(stackMatrix);

    moves.forEach((m) => {
      // console.log(m);

      const moveInstruction =
        /move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/g.exec(m);
      const count = +moveInstruction?.groups?.count;
      const from = +moveInstruction?.groups?.from;
      const to = +moveInstruction?.groups?.to;

      // console.log(count, from, to);

      const crates = stackMatrix[from - 1].splice(
        stackMatrix[from - 1].length - count,
        count
      );

      stackMatrix[to - 1].splice(stackMatrix[to - 1].length, 0, ...crates);
    });

    // console.log(stackMatrix);

    const result = stackMatrix.map((s) => s.pop()).reduce((p, c) => p + c);

    return `day 5 solution 2: ${result}`;
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 5 solution 2: GGNPJBTTR';
  }
}
