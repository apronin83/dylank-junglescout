import React from 'react';

const UNITS = {
  inches: `"`,
  feet: `'`,
  meters: 'm',
};

const multipliers = [
  { prefixes: ['hundredth', 'cent'], value: 1 / 100 },
  { prefixes: ['thousandth', 'milli'], value: 1 / 1000 },
];

function getUnitSymbolAndMultiplier(unit) {
  const matchingUnit = Object.keys(UNITS).find(potentialUnit => unit.toLowerCase().includes(potentialUnit));
  const multiplier = multipliers.find(
    multiplier => multiplier.prefixes.find(prefix => unit.toLowerCase().includes(prefix)) != null
  );

  return {
    symbol: UNITS[matchingUnit],
    multiplier: multiplier ? multiplier.value : 1,
  };
}

export default function({ dimension: { _: quantity, $: { Units } } }) {
  const { symbol, multiplier } = getUnitSymbolAndMultiplier(Units);
  return `${quantity * multiplier}${symbol}`;
}
