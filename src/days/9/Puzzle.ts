import Puzzle from '../../types/AbstractPuzzle';

interface Point {
  x: number;
  y: number;
}

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
    const motions = this.input.trim().split('\n');
    // console.log(motions);
    const points: Point[] = [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ];
    const result = new Set<string>();
    motions
      .map((m) => {
        const [dir, count] = m.split(' ');
        return { dir, count: +count };
      })
      .forEach((inst) => {
        for (let index = 0; index < inst.count; index++) {
          if (inst.dir === 'L') {
            points[0].x--;
          } else if (inst.dir === 'R') {
            points[0].x++;
          } else if (inst.dir === 'U') {
            points[0].y--;
          } else if (inst.dir === 'D') {
            points[0].y++;
          }

          points.forEach((p, i, a) => {
            if (i > 0) {
              const diff = {
                x: a[i - 1].x - a[i].x,
                y: a[i - 1].y - a[i].y,
              };

              if (Math.abs(diff.x) > 1 || Math.abs(diff.y) > 1) {
                a[i].x += Math.sign(diff.x);
                a[i].y += Math.sign(diff.y);
              }
            }
          });

          // result.add(`${tx},${ty}`);
          const t = points[points.length - 1];
          // console.log(`inst.dir: ${inst.dir} tx: ${t.x} ty: ${t.y}`);
          // console.log(points);
          result.add(`${t.x},${t.y}`);
        }
      });
    // console.log(result);
    return `day 9 solution 2: ${result.size}`;
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 9 solution 2: 2352';
  }
}
