import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  private getMap(): number[][] {
    const mapInput = this.input.trim().split('\n');
    const map: number[][] = new Array(mapInput.length + 2)
      .fill(0)
      .map(() => new Array(mapInput[0].length + 2).fill(0));
    mapInput.forEach((y, yi) => {
      [...y].forEach((x, xi) => {
        map[yi + 1][xi + 1] = +x + 1;
      });
    });
    console.table(map);
    return map;
  }

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

  private getScenicScore(map: number[][], cy: number, cx: number): number {
    const tree = map[cy][cx];

    let visibleFromLeft = map[cy]
      .filter((_v, i) => i < cx)
      .reverse()
      .findIndex((t) => t >= tree);
    visibleFromLeft =
      visibleFromLeft < 0
        ? map[cy].filter((_v, i) => i < cx).length - 1
        : visibleFromLeft + 1;
    let visibleFromRight = map[cy]
      .filter((_v, i) => i > cx)
      .findIndex((t) => t >= tree);
    visibleFromRight =
      visibleFromRight < 0
        ? map[cy].filter((_v, i) => i > cx).length - 1
        : visibleFromRight + 1;

    let visibleFromTop = map
      .map((c) => c[cx])
      .filter((_v, i) => i < cy)
      .reverse()
      .findIndex((t) => t >= tree);
    visibleFromTop =
      visibleFromTop < 0
        ? map.map((c) => c[cx]).filter((_v, i) => i < cy).length - 1
        : visibleFromTop + 1;
    let visibleFromBottom = map
      .map((c) => c[cx])
      .filter((_v, i) => i > cy)
      .findIndex((t) => t >= tree);
    visibleFromBottom =
      visibleFromBottom < 0
        ? map.map((c) => c[cx]).filter((_v, i) => i > cy).length - 1
        : visibleFromBottom + 1;

    // console.log(
    //   'tree score: ',
    //   tree - 1,
    //   visibleFromLeft,
    //   visibleFromRight,
    //   visibleFromTop,
    //   visibleFromBottom,
    //   visibleFromLeft * visibleFromRight * visibleFromTop * visibleFromBottom
    // );

    return (
      visibleFromLeft * visibleFromRight * visibleFromTop * visibleFromBottom
    );
  }

  public solveFirst(): string {
    // WRITE SOLUTION FOR TEST 1
    const map: number[][] = this.getMap();
    const mapResult: number[][] = new Array(map.length)
      .fill(0)
      .map(() => new Array(map[0].length).fill(0));

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
    return 'day 8 solution 1: 1669';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    const map: number[][] = this.getMap();
    const mapResult1: number[][] = new Array(map.length)
      .fill(0)
      .map(() => new Array(map[0].length).fill(0));
    const mapResult2: number[][] = new Array(map.length)
      .fill(0)
      .map(() => new Array(map[0].length).fill(0));

    for (let y = 1; y < map.length - 1; y++) {
      for (let x = 1; x < map[y].length - 1; x++) {
        // console.log(map[y][x]);
        mapResult1[y][x] = +this.treeVisible(map, y, x);
      }
    }

    for (let y = 1; y < map.length - 1; y++) {
      for (let x = 1; x < map[y].length - 1; x++) {
        // console.log(map[y][x]);
        if (mapResult1[y][x] > 0) {
          mapResult2[y][x] = this.getScenicScore(map, y, x);
        }
      }
    }

    console.table(mapResult2);

    const result = mapResult2
      .map((t) => t.reduce((p, c) => Math.max(p, c)))
      .reduce((p, c) => Math.max(p, c));

    return `day 8 solution 2: ${result}`;
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 8 solution 2: 331344';
  }
}
