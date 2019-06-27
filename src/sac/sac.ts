import { Numerico } from '../auxiliares/numerico';

export type Financiamento = {
  n: number,
  parcela: number,
  amortizacao: number,
  juros: number,
  devedor: number,
};

export class SAC {
  constructor(readonly financiado: number,
              readonly jurosMensalPerc: number,
              readonly meses: number) {

  }

  amortizacao(): number {
    return Numerico.round((this.financiado / this.meses));
  }

  jurosSobreSaldoDevedor(parcelasPagas: number): number {
    return Numerico.round(
      (this.jurosMensalPerc / 100) *
      (this.financiado - (parcelasPagas * this.amortizacao())));
  }

  valorParcela(n: number): number {
    return Numerico.round(this.amortizacao() + this.jurosSobreSaldoDevedor(n));
  }

  tabela(): Financiamento[] {
    const f: Financiamento[] = [];

    for (let i = 0; i < this.meses; ++i) {
      const num = i + 1;

      f.push({
        n: num,
        parcela: this.valorParcela(i),
        amortizacao: this.amortizacao(),
        juros: this.jurosSobreSaldoDevedor(i),
        devedor: this.financiado - (num * this.amortizacao()),
      });
    }

    return f;
  }
}
