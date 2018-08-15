import React from 'react';
import { Button, Input, Spin } from 'antd';
import axios from 'axios';
import Product from './Product';

export default class App extends React.Component {
  state = {
    productAsin: '',
    product: null,
    loading: false,
    error: null,
  };

  updateAsin = ev => this.setState({ productAsin: ev.target.value });

  searchForProduct = async () => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      const productInfo = await axios.get(`/products/${this.state.productAsin}`);
      this.setState({
        product: productInfo.data.product,
        loading: false,
        error: null,
      });
    } catch (e) {
      this.setState({
        product: null,
        error: e.response.data,
        loading: false,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Input value={this.state.productAsin} onChange={this.updateAsin} placeholder="ASIN" style={{ width: 200 }} />
        <Button onClick={this.searchForProduct}>Search {this.state.loading && <Spin />}</Button>
        <span>{this.state.error}</span>
        {this.state.product && <Product product={this.state.product} />}
      </React.Fragment>
    );
  }
}
