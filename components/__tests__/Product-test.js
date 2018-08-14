import React from 'react';
import { render, fireEvent, waitForElement, cleanup } from 'react-testing-library';
import testProduct from './test-product.json';
import Product from '../Product';
import 'jest-dom/extend-expect';

afterEach(cleanup);

describe('<Product/>', () => {
  it('displays product images and allows changing image', async () => {
    const { getByAltText, getByTitle } = render(<Product product={testProduct} />);

    const image = getByAltText('Product Images');

    expect(image).toHaveAttribute('src', testProduct.ImageSets.ImageSet[0].URL);

    const nextButton = getByTitle('Next Image');
    fireEvent.click(nextButton);

    expect(image).toHaveAttribute('src', testProduct.ImageSets.ImageSet[1].URL);

    const previousButton = getByTitle('Previous Image');
    fireEvent.click(previousButton);
    fireEvent.click(previousButton);

    expect(image).toHaveAttribute('src', testProduct.ImageSets.ImageSet[testProduct.ImageSets.ImageSet.length - 1].URL);
  });

  it('displays product dimensions', () => {
    const { getByLabelText } = render(<Product product={testProduct} />);
  });
});
