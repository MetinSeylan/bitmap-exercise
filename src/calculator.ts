import { Input, Output } from './models/Input';
import { Color } from './models/color';
import { Point } from './models/point';

export class Calculator {
  private readonly rowDirections = [-1, 1, 0, 0];
  private readonly columnDirections = [0, 0, 1, -1];

  constructor(private readonly input: Input) {}

  /**
   * Scan and calculate nearest white point in matrix
   */
  public getResult(): Output {
    for (let row = 0; row < this.input.rowSize; row++) {
      for (let column = 0; column < this.input.columnSize; column++) {
        this.calculateForPoint(row, column);
      }
    }
    return this.input.toOutput();
  }

  /**
   * Calculates for single point
   * @param startRow
   * @param startColumn
   * @private
   */
  private calculateForPoint(startRow: number, startColumn: number): void {
    const point = this.input.inputList[startRow][startColumn];
    const queue = [point];
    const visitList = Array.from(Array(this.input.rowSize), () =>
      new Array(this.input.columnSize).fill(false),
    );

    while (queue.length > 0) {
      const item = queue[0];
      queue.shift();

      if (Color.WHITE === point.color) {
        point.setDistance(0);
        break;
      }

      const whitePoint = this.scanNeighbor(item, queue, visitList);

      if (whitePoint) {
        point.setNearWhitePoint(whitePoint);
        point.setDistance(this.calculateDistance(point, whitePoint));
        break;
      }
    }
  }

  /**
   * scans point neighbors
   * left, right, up and down
   * @param point
   * @param queue
   * @param visitList
   * @private
   */
  private scanNeighbor(
    point: Point,
    queue: Array<Point>,
    visitList: Array<Array<boolean>>,
  ): Point {
    for (let i = 0; i < 4; i++) {
      const nextRow = point.row + this.rowDirections[i];
      const nextColumn = point.column + this.columnDirections[i];

      // skip out of size
      if (nextRow < 0 || nextColumn < 0) continue;
      if (nextRow >= this.input.rowSize || nextColumn >= this.input.columnSize)
        continue;

      // skip from white point
      if (point.color === Color.WHITE) return point;

      // skip if it's visited before
      if (visitList[nextRow][nextColumn]) continue;

      queue.push(this.input.inputList[nextRow][nextColumn]);

      visitList[point.row][point.column] = true;
    }
  }

  /**
   * calculate distance between 2 point in matrix
   * @param from
   * @param to
   * @private
   */
  private calculateDistance(from: Point, to: Point): number {
    const rowDiff = from.row - to.row;
    const columnDiff = from.column - to.column;

    return Math.abs(rowDiff + columnDiff);
  }
}
