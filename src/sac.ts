export type Financiamento = {};

export class SAC {
  constructor(readonly financiado: number,
              readonly jurosMensalPerc: number,
              readonly meses: number) {

  }

  amortizacao(): number {
    return this.roundTwo((this.financiado / this.meses));
  }

  jurosSobreSaldoDevedor(parcelasPagas: number): number {
    return this.roundTwo(
      (this.jurosMensalPerc / 100) *
      (this.financiado - (parcelasPagas * this.amortizacao())));
  }

  valorParcela(n: number): number {
    return this.roundTwo(this.amortizacao() + this.jurosSobreSaldoDevedor(n));
  }

  tabela(): Financiamento {
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

  private roundTwo(value: number): number { return parseFloat(value.toFixed(2)); }
}
