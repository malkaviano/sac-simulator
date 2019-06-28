export class Numerico {
  static arredondar(valor: number, precisao: number = 2): number {
    return Number(valor.toFixed(precisao));
  }
}
