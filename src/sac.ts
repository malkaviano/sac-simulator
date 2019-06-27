export class SAC {
  constructor(readonly financiado: number,
              readonly jurosMensalPerc: number,
              readonly meses: number) {

  }

  amortizacao(): string {
    return (this.financiado / this.meses).toFixed(2);
  }
}
