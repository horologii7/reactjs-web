import React, { Component, Fragment } from 'react';
import Api from '../../services/api';

import { Link } from 'react-router-dom';
import './styles.css';

export default class Product extends Component {
  state = {
    product: {},
  };

  async componentDidMount () {
    const { id } = this.props.match.params;

    const response = await Api.get(`/products/${id}`);
    
    this.setState({ product: response.data });
  }

  
  deleteProduct = async () => {
    await Api.delete(`products/${this.props.history.location.pathname.split("/")[2]}`);
    
    this.props.history.push(`/products`);
  }

  render() {
    const {product} = this.state;
    return (
      <Fragment>
        <div className="product-info">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>URL: <a href={product.url} id="link-product">{product.url}</a></p>
        </div>
        
        <div className="product-actions">
          <div className="actions">
            <Link id="back" to={`/`}>Voltar</Link>
            <button onClick={this.deleteProduct}>Excluir</button>
          </div>
        </div>
      </Fragment>
    )
  } 
}