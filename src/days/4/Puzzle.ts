import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    // WRITE SOLUTION FOR TEST 1
    const allPairs = this.input.trim().split('\n');

    const result = allPairs
      .map((p) => {
        const [p1, p2] = p.split(',');
        const [p1From, p1To] = p1.split('-').map((n) => +n);
        const [p2From, p2To] = p2.split('-').map((n) => +n);

        return +(
          (p1From >= p2From && p1To <= p2To) ||
          (p2From >= p1From && p2To <= p1To)
        );
      })
      .reduce((p, c) => p + c);

    return `day 4 solution 1: ${result}`;
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 4 solution 1: 576';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    return 'day 4 solution 2';
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 4 solution 2';
  }
}
