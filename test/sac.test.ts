import { should } from 'chai';
import { SAC, Financiamento } from '../src/sac';

should();

describe('SAC', () => {
  describe('#amortizacao', () => {
    const jurosMesPerc = 0.5;

    const fixture: [number, number, number][] = [
      [500000, 200, 2500.00],
      [300000, 300, 1000.00],
      [800000, 420, 1904.76],
      [110500, 360, 306.94],
    ];

    fixture.forEach(([financiado, meses, amortizacao]) => {
      it(`deve retornar R$${amortizacao}, quando financiamento for` +
         ` R$${financiado} e quantidade de meses for ${meses}`,
         () => {
           const sac = new SAC(financiado, jurosMesPerc, meses);

           sac.amortizacao().should.be.equal(amortizacao);
         });
    });
  });

  describe('#jurosSobreSaldoDevedor', () => {
    const fixture: [number, number, number, number, number][] = [
      [500000, 200, 0.5, 1, 2487.5],
      [300000, 300, 0.72, 0, 2160],
      [800000, 420, 0.4, 4, 3169.52],
      [110500, 360, 0.72, 2, 791.18],
      [110500, 360, 0.72, 140, 486.20],
    ];

    fixture.forEach(([financiado, meses, jurosMesPerc, parcelasPagas, jurosSobreSaldoDevedor]) => {
      it(`deve retornar R$${jurosSobreSaldoDevedor}, quando financiamento for` +
         ` R$${financiado}, a quantidade de meses for ${meses}, o juros ao mês for` +
         ` ${jurosMesPerc} e parcelas já pagas for ${parcelasPagas}`,
         () => {
           const sac = new SAC(financiado, jurosMesPerc, meses);

           sac.jurosSobreSaldoDevedor(parcelasPagas).should.be.equal(jurosSobreSaldoDevedor);
         });
    });
  });

  describe('#valorParcela', () => {
    const fixture: [number, number, number, number, number][] = [
      [500000, 200, 0.5, 1, 4987.5],
      [300000, 300, 0.72, 0, 3160],
      [800000, 420, 0.4, 4, 5074.28],
      [110500, 360, 0.72, 2, 1098.12],
      [110500, 360, 0.72, 140, 793.14],
    ];

    fixture.forEach(([financiado, meses, jurosMesPerc, parcelasPagas, valorParcela]) => {
      it(`deve retornar uma parcela de R$${valorParcela}, quando financiamento for` +
      ` R$${financiado}, a quantidade de meses for ${meses}, o juros ao mês for` +
      ` ${jurosMesPerc} e parcelas já pagas for ${parcelasPagas}`,
         () => {
           const sac = new SAC(financiado, jurosMesPerc, meses);

           sac.valorParcela(parcelasPagas).should.be.equal(valorParcela);
         });
    });
  });

  describe('#tabela', () => {
    it('deve retornar uma tabela com 20 parcelas', () => {
      const sac = new SAC(110500, 0.72, 20);

      const expected: Financiamento = [
        { n:1,	parcela: 6320.60,	amortizacao: 5525.00,	juros: 795.60,	devedor: 104975.00 },
        { n:2,	parcela: 6280.82,	amortizacao: 5525.00,	juros: 755.82,	devedor: 99450.00 },
        { n:3,	parcela: 6241.04,	amortizacao: 5525.00,	juros: 716.04,	devedor: 93925.00 },
        { n:4,	parcela: 6201.26,	amortizacao: 5525.00,	juros: 676.26,	devedor: 88400.00 },
        { n:5,	parcela: 6161.48,	amortizacao: 5525.00,	juros: 636.48,	devedor: 82875.00 },
        { n:6,	parcela: 6121.70,	amortizacao: 5525.00,	juros: 596.70,	devedor: 77350.00 },
        { n:7,	parcela: 6081.92,	amortizacao: 5525.00,	juros: 556.92,	devedor: 71825.00 },
        { n:8,	parcela: 6042.14,	amortizacao: 5525.00,	juros: 517.14,	devedor: 66300.00 },
        { n:9,	parcela: 6002.36,	amortizacao: 5525.00,	juros: 477.36,	devedor: 60775.00 },
        { n:10,	parcela: 5962.58,	amortizacao: 5525.00,	juros: 437.58,	devedor: 55250.00 },
        { n:11,	parcela: 5922.80,	amortizacao: 5525.00,	juros: 397.80,	devedor: 49725.00 },
        { n:12,	parcela: 5883.02,	amortizacao: 5525.00,	juros: 358.02,	devedor: 44200.00 },
        { n:13,	parcela: 5843.24,	amortizacao: 5525.00,	juros: 318.24,	devedor: 38675.00 },
        { n:14,	parcela: 5803.46,	amortizacao: 5525.00,	juros: 278.46,	devedor: 33150.00 },
        { n:15,	parcela: 5763.68,	amortizacao: 5525.00,	juros: 238.68,	devedor: 27625.00 },
        { n:16,	parcela: 5723.90,	amortizacao: 5525.00,	juros: 198.90,	devedor: 22100.00 },
        { n:17,	parcela: 5684.12,	amortizacao: 5525.00,	juros: 159.12,	devedor: 16575.00 },
        { n:18,	parcela: 5644.34,	amortizacao: 5525.00,	juros: 119.34,	devedor: 11050.00 },
        { n:19,	parcela: 5604.56,	amortizacao: 5525.00,	juros: 79.56,	devedor: 5525.00 },
        { n:20,	parcela: 5564.78,	amortizacao: 5525.00,	juros: 39.78,	devedor: 0.00 },
      ];

      sac.tabela().should.be.eql(expected);
    });
  });
});
