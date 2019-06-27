import { SAC, Financiamento } from './sac/sac';

const sac = new SAC(110500, 0.6, 360);

sac.tabela().forEach((e: Financiamento) => {
  console.log(e);
});
