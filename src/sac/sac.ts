export type Financiamento = {
  n: string,
  parcela: string,
  amortizacao: string,
  juros: string,
  devedor: string,
};

export class SAC {
  constructor(readonly financiado: number,
              readonly jurosMensalPerc: number,
              readonly meses: number) {

  }

  amortizacao(): number {
    return (this.financiado / this.meses);
  }

  jurosSobreSaldoDevedor(parcelasPagas: number): number {
    return (this.jurosMensalPerc / 100) *
            (this.financiado - (parcelasPagas * this.amortizacao()));
  }

  valorParcela(n: number): number {
    return this.amortizacao() + this.jurosSobreSaldoDevedor(n);
  }

  tabela(): Financiamento[] {
    const f: Financiamento[] = [];

    for (let i = 0; i < this.meses; i += 1) {
      const num = i + 1;

      f.push({
        n: num.toString(),
        parcela: this.valorParcela(i).toFixed(2),
        amortizacao: this.amortizacao().toFixed(2),
        juros: this.jurosSobreSaldoDevedor(i).toFixed(2),
        devedor: (this.financiado - (num * this.amortizacao())).toFixed(2),
      });
    }

    return f;
  }
}
