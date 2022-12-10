import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    // WRITE SOLUTION FOR TEST 1
    const motions = this.input.trim().split('\n');
    // console.log(motions);
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    const result = new Set<string>();
    motions
      .map((m) => {
        const [dir, count] = m.split(' ');
        return { dir, count: +count };
      })
      .forEach((inst) => {
        for (let index = 0; index < inst.count; index++) {
          if (inst.dir === 'L') {
            x--;
            if (Math.abs(tx - x) > 1) {
              ty = y;
              tx = x + 1;
            }
          } else if (inst.dir === 'R') {
            x++;
            if (Math.abs(tx - x) > 1) {
              ty = y;
              tx = x - 1;
            }
          } else if (inst.dir === 'U') {
            y--;
            if (Math.abs(ty - y) > 1) {
              tx = x;
              ty = y + 1;
            }
          } else if (inst.dir === 'D') {
            y++;
            if (Math.abs(ty - y) > 1) {
              tx = x;
              ty = y - 1;
            }
          }
          // console.log(`inst.dir: ${inst.dir} tx: ${tx} ty: ${ty}`);
          result.add(`${tx},${ty}`);
        }
      });
    // console.log(result);
    return `day 9 solution 1: ${result.size}`;
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 9 solution 1: 5981';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    return 'day 9 solution 2';
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 9 solution 2';
  }
}
