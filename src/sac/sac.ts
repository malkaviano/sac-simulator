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
    return Numerico.arredondar((this.financiado / this.meses));
  }

  jurosSobreSaldoDevedor(parcelasPagas: number): number {
    return Numerico.arredondar(
      (this.jurosMensalPerc / 100) *
      (this.financiado - (parcelasPagas * this.amortizacao())));
  }

  valorParcela(n: number): number {
    return Numerico.arredondar(this.amortizacao() + this.jurosSobreSaldoDevedor(n));
  }

  tabela(): Financiamento[] {
    const f: Financiamento[] = [];

    for (let i = 0; i < this.meses; i += 1) {
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
