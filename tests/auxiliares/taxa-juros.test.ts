import { should } from 'chai';

import { TaxaJuros } from '../../src/auxiliares/taxa-juros';

should();

describe('TaxaJuros', () => {
  describe('.norminalParaEfetivo', () => {
    it('retorna 3% ao mes de uma taxa nominal de 36% ao ano', () => {
      const result = TaxaJuros.norminalParaEfetivo(36, 12);

      const expected = 3;

      result.should.be.equal(expected);
    });
  });

  describe('.anualParaMensal', () => {
    it('retorna 0.72% ao mes de uma taxa anual de 9% ao ano', () => {
      const result = TaxaJuros.anualParaMensal(9);

      const expected = 0.72;

      result.should.be.equal(expected);
    });
  });
});
