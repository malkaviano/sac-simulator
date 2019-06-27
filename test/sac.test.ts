import { should } from 'chai';
import { SAC } from '../src/sac';

should();

describe('SAC', () => {
  describe('#amortizacao', () => {
    const jurosMesPerc = 0.5;

    const fixture: [number, number, string][] = [
      [500000, 200, '2500.00'],
      [300000, 300, '1000.00'],
      [800000, 420, '1904.76'],
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
});
