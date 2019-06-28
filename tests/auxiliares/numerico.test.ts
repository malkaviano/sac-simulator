import { should } from 'chai';

import { Numerico } from '../../src/auxiliares/numerico';

should();

describe('Numerico', () => {
  describe('.arredondar', () => {
    const fixture = [
      { valor: 1.5, esperado: 1.5 },
      { valor: 12, esperado: 12 },
      { valor: 0.25, esperado: 0.25 },
      { valor: 0.348, esperado: 0.35 },
      { valor: 5.154, esperado: 5.15 },
      // Always round up
      { valor: 5.165, esperado: 5.17 },
    ];

    fixture.forEach((f) => {
      it(`retorna ${f.esperado} para ${f.valor}`, () => {
        const arredondado = Numerico.arredondar(f.valor);

        arredondado.should.be.equal(f.esperado);
      });
    });
  });
});
