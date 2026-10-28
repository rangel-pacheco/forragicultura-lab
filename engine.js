/* Motor didático independente da interface. Modelo sazonal; valores não são recomendações. */
(function (root) {
  'use strict';
  const seasons = ['Verão', 'Outono', 'Inverno', 'Primavera'];
  function number(v, label, max = 1e12) {
    if (v === '' || v === null || v === undefined || typeof v === 'boolean') throw Error(label + ': preencha um número.');
    const n = Number(v);
    if (!Number.isFinite(n) || n < 0 || n > max) throw Error(label + ': valor inválido.');
    return n;
  }
  function calculate(p) {
    const ua = number(p.uaKg, 'Peso da unidade animal');
    if (!ua) throw Error('O peso da unidade animal deve ser maior que zero.');
    const reserve = number(p.reserve, 'Reserva de suporte', 99) / 100;
    const physicalArea = number(p.physicalArea, 'Área física');
    if (!physicalArea) throw Error('Informe uma área física maior que zero.');
    const capacity = [0, 0, 0, 0], usedArea = [0, 0, 0, 0];
    let pastureCost = 0;
    if (!Array.isArray(p.areas) || !p.areas.length) throw Error('Adicione uma área forrageira.');
    p.areas.forEach((a, i) => {
      const ha = number(a.ha, 'Área ' + (i + 1));
      if (!Array.isArray(a.rates) || a.rates.length !== 4) throw Error('Informe quatro coeficientes por área.');
      a.rates.forEach((v, s) => {
        const rate = number(v, 'Suporte ' + (i + 1) + ' / ' + seasons[s], 100);
        capacity[s] += ha * rate;
        // Uma área com coeficiente zero não oferece suporte naquela estação.
        if (rate > 0) usedArea[s] += ha;
      });
      pastureCost += ha * number(a.costHa, 'Custo anual da área ' + (i + 1));
    });
    usedArea.forEach((area, s) => {
      if (area > physicalArea + 1e-8) throw Error(seasons[s] + ': áreas simultâneas superam a área física. Verifique sobreposição de cultivos.');
    });
    if (!Array.isArray(p.herd)) throw Error('Rebanho inválido.');
    const demand = [0, 0, 0, 0], heads = [0, 0, 0, 0];
    p.herd.forEach((h, i) => {
      if (!Array.isArray(h.counts) || h.counts.length !== 4 || !Array.isArray(h.weights) || h.weights.length !== 4) throw Error('Informe quantidade e peso em quatro estações.');
      seasons.forEach((_, s) => {
        const count = number(h.counts[s], 'Quantidade da categoria ' + (i + 1));
        const weight = number(h.weights[s], 'Peso da categoria ' + (i + 1), 3000);
        if (count > 0 && weight === 0) throw Error('Categoria ' + (i + 1) + ': animais presentes exigem peso maior que zero.');
        heads[s] += count;
        demand[s] += count * weight / ua;
      });
    });
    const sumLines = (lines, label) => {
      if (!Array.isArray(lines)) throw Error(label + ': lista inválida.');
      return lines.reduce((sum, row) => sum + number(row.quantity, label + ' / quantidade') * number(row.price, label + ' / preço'), 0);
    };
    const revenue = sumLines(p.revenues, 'Receitas');
    const otherCosts = sumLines(p.costs, 'Despesas');
    const cost = pastureCost + otherCosts, result = revenue - cost;
    const seasonal = seasons.map((name, s) => {
      const safe = capacity[s] * (1 - reserve), balance = safe - demand[s];
      return { name, capacity: capacity[s], safe, demand: demand[s], heads: heads[s], area: usedArea[s],
        kgCapacity: capacity[s] * ua, kgDemand: demand[s] * ua, balance,
        deficitUa: Math.max(0, -balance), stocking: usedArea[s] ? demand[s] / usedArea[s] : null,
        status: demand[s] > capacity[s] ? 'Déficit de suporte' : balance < -1e-8 ? 'Reserva comprometida' : 'Dentro do planejamento' };
    });
    return { seasonal, pastureCost, otherCosts, revenue, cost, result,
      margin: revenue ? result / revenue * 100 : null,
      returnOnCost: cost ? result / cost * 100 : null, resultHa: result / physicalArea };
  }
  function validateProject(p) {
    if (!p || typeof p !== 'object' || Array.isArray(p)) throw Error('Projeto inválido.');
    for (const key of ['name', 'team', 'property', 'notes']) {
      if (typeof p[key] !== 'string' || p[key].length > 10000) throw Error('Texto inválido: ' + key);
    }
    for (const key of ['areas', 'herd', 'costs', 'revenues']) {
      if (!Array.isArray(p[key]) || p[key].length > 100) throw Error('Lista inválida: ' + key);
      p[key].forEach(r => {
        if (!r || typeof r !== 'object' || typeof r.name !== 'string' || r.name.length > 300) throw Error('Linha inválida em ' + key);
      });
    }
    calculate(p);
    return p;
  }
  const api = { seasons, calculate, validateProject };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.ForageEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
