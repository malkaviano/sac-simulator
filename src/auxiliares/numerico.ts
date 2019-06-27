export class Numerico {
  static round(value: number, precision: number = 2): number {
    return parseFloat(value.toFixed(precision));
  }
}
