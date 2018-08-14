import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Dimension from '../Dimension';

afterEach(cleanup);

const createAmazonDimension = (quantity, unit) => ({ _: quantity, $: { Units: unit } });

describe('<Dimension/>', () => {
  it('displays metric subdimensions correctly', async () => {
    const { container } = render(<Dimension dimension={createAmazonDimension(2, 'centimeters')} />);

    expect(container.textContent).toEqual('0.02m');
  });

  it('displays dimensions with unprefixed units correctly', async () => {
    const { container } = render(<Dimension dimension={createAmazonDimension(3, 'inches')} />);

    expect(container.textContent).toEqual("3'");
  });

  it('displays imperial subdimensions correctly', async () => {
    const { container } = render(<Dimension dimension={createAmazonDimension(2.5, 'Thousandth inches')} />);

    expect(container.textContent).toEqual("0.0025'");
  });
});
