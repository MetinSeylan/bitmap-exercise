import { Color } from './color';

export class Point {
  private _distance: number;
  private _nearWhite: Point;

  constructor(
    private readonly _color: Color,
    private readonly rowIndex: number,
    private readonly columnIndex: number,
  ) {}

  get color() {
    return this._color;
  }
  get row() {
    return this.rowIndex;
  }
  get column() {
    return this.columnIndex;
  }
  get distance() {
    return this._distance;
  }
  public setDistance(distance: number) {
    this._distance = distance;
  }
  public setNearWhitePoint(point: Point) {
    this._nearWhite = point;
  }
}
