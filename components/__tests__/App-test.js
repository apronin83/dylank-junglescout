import React from 'react';
import { render, fireEvent, waitForElement, cleanup } from 'react-testing-library';
import axios from 'axios';
import testProduct from './test-product.json';
import App from '../App';

afterEach(cleanup);

function expectNotToExist(func, msg) {
  try {
    func();
    expect.fail(msg);
  } catch (e) {}
}

describe('<App/>', () => {
  it('displays searched product data', async () => {
    const { getByText, getAllByPlaceholderText } = render(<App />);

    expectNotToExist(() => getByText(testProduct.ItemAttributes.Title));

    axios.get = () => Promise.resolve({ data: { product: testProduct } });

    fireEvent.change(getAllByPlaceholderText('ASIN')[0], {
      target: { value: testProduct.ASIN },
    });

    fireEvent.click(getByText('Search'));

    await waitForElement(() => getByText(testProduct.ItemAttributes.Title));
  });
});
