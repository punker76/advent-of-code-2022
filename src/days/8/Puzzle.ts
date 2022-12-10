import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  private treeVisible(map: number[][], cy: number, cx: number): boolean {
    const tree = map[cy][cx];

    const visibleFromLeft = map[cy]
      .filter((_v, i) => i < cx)
      .every((t) => t < tree);
    const visibleFromRight = map[cy]
      .filter((_v, i) => i > cx)
      .every((t) => t < tree);

    const visibleFromTop = map
      .map((c) => c[cx])
      .filter((_v, i) => i < cy)
      .every((t) => t < tree);
    const visibleFromBottom = map
      .map((c) => c[cx])
      .filter((_v, i) => i > cy)
      .every((t) => t < tree);

    // console.log(
    //   'tree visible: ',
    //   tree - 1,
    //   visibleFromLeft,
    //   visibleFromRight,
    //   visibleFromTop,
    //   visibleFromBottom
    // );

    return (
      visibleFromLeft || visibleFromRight || visibleFromTop || visibleFromBottom
    );
  }

  public solveFirst(): string {
    // WRITE SOLUTION FOR TEST 1
    const mapInput = this.input.trim().split('\n');
    const map: number[][] = new Array(mapInput.length + 2)
      .fill(0)
      .map(() => new Array(mapInput[0].length + 2).fill(0));
    const mapResult: number[][] = new Array(mapInput.length + 2)
      .fill(0)
      .map(() => new Array(mapInput[0].length + 2).fill(0));
    mapInput.forEach((y, yi) => {
      [...y].forEach((x, xi) => {
        map[yi + 1][xi + 1] = +x + 1;
      });
    });
    console.table(map);
    for (let y = 1; y < map.length - 1; y++) {
      for (let x = 1; x < map[y].length - 1; x++) {
        // console.log(map[y][x]);
        mapResult[y][x] = +this.treeVisible(map, y, x);
      }
    }
    console.table(mapResult);
    const result = mapResult
      .map((t) => t.reduce((p, c) => p + c))
      .reduce((p, c) => p + c);
    return `day 8 solution 1: ${result}`;
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 8 solution 1';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    return 'day 8 solution 2';
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 8 solution 2';
  }
}
