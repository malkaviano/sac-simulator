import { Numerico } from '../auxiliares/numerico';

export class TaxaJuros {
  static norminalParaEfetivo(taxaNominal: number, periodo: number): number {
    return taxaNominal / periodo;
  }

  static anualParaMensal(taxaAnual: number): number {
    const real = taxaAnual / 100;

    const result =  Math.pow(1 + real, 1 / 12) - 1;

    return Numerico.round(result * 100);
  }
}
