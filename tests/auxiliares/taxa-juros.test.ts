import { should } from 'chai';

import { TaxaJuros } from '../../src/auxiliares/taxa-juros';

should();

describe('TaxaJuros', () => {
  describe('.norminalParaEfetivo', () => {
    it('retorna 3% ao mes de uma taxa nominal de 36% ao ano', () => {
      const resultado = TaxaJuros.norminalParaEfetivo(36, 12);

      const esperado = 3;

      resultado.should.be.equal(esperado);
    });
  });

  describe('.anualParaMensal', () => {
    it('retorna 0.72% ao mes de uma taxa anual de 9% ao ano', () => {
      const resultado = TaxaJuros.anualParaMensal(9);

      const esperado = 0.72;

      resultado.should.be.equal(esperado);
    });
  });
});
