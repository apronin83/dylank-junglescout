import React from 'react';
import { Button, Icon, Row, Col, Table } from 'antd';
import { map, pick } from 'lodash';
import Dimension from './Dimension';

export default class Product extends React.Component {
  state = {
    currentImageIndex: 0,
  };

  getProductImages = () => {
    return this.props.product.ImageSets.ImageSet.map(imageSet => imageSet.LargeImage);
  };

  reduceImageIndex = () =>
    this.setState(state => {
      return {
        currentImageIndex:
          (state.currentImageIndex + this.getProductImages().length - 1) % this.getProductImages().length,
      };
    });

  increaseImageIndex = () =>
    this.setState(state => {
      return {
        currentImageIndex:
          (state.currentImageIndex + this.getProductImages().length + 1) % this.getProductImages().length,
      };
    });

  getKeyAttributes = () => {
    const { product: { ItemAttributes, SalesRank } } = this.props;
    const { ItemDimensions, Label, Manufacturer, Feature, ProductGroup } = ItemAttributes;

    return [
      { name: 'Label', value: Label },
      { name: 'Manufacturer', value: Manufacturer },
      {
        name: 'Features',
        value: Feature.map(part => (
          <React.Fragment key={part}>
            {part}
            <br />
          </React.Fragment>
        )),
      },
      {
        name: 'Dimensions',
        value: Object.entries(pick(ItemDimensions, ['Height', 'Length', 'Width']))
          .map(([name, dimension]) => <Dimension key={name} dimension={dimension} />)
          .reduce((prev, curr) => [prev, 'x', curr]),
      },
      {
        name: 'Category',
        value: ProductGroup,
      },
      {
        name: 'Sales Rank in Category',
        value: SalesRank,
      },
    ];
  };

  render() {
    const imageToDisplay = this.getProductImages()[this.state.currentImageIndex];
    return (
      <React.Fragment>
        <h1>{this.props.product.ItemAttributes.Title}</h1>
        <Row>
          <Col span={8} style={{ textAlign: 'center' }}>
            <Button.Group>
              <Button onClick={this.reduceImageIndex} title="Previous Image">
                <Icon type="left" />
              </Button>
              <Button>
                {this.state.currentImageIndex + 1} / {this.getProductImages().length}
              </Button>
              <Button onClick={this.increaseImageIndex} title="Next Image">
                <Icon type="right" />
              </Button>
            </Button.Group>
            <div>
              <img
                alt="Product Images"
                src={imageToDisplay.URL}
                height={imageToDisplay.Height._}
                width={imageToDisplay.Width._}
              />
            </div>
          </Col>
          <Col span={8}>
            <dl>
              {this.getKeyAttributes().map(attribute => (
                <React.Fragment key={attribute.name}>
                  <dt>{attribute.name}</dt>
                  <dd>{attribute.value}</dd>
                </React.Fragment>
              ))}
            </dl>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
