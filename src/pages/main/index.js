import React, { Component, Fragment } from 'react';

import Api from '../../services/api';

import { Link } from 'react-router-dom';

import './styles.css';

import { ModalRoute } from "react-router-modal";
import AddProduct from "../addProduct";

export default class Main extends Component {
  state = {
    products: [],
    productInfo: {},
    page: 1,
    addActivate: false,
  }
  
  componentDidMount() {
    this.loadProducts();
  }
  
  loadProducts = async (page = 1) => {
    const response = await Api.get(`products?page=${page}`);

    const { docs, ...productInfo } = response.data;

    this.setState({ products: docs, productInfo, page });
  };
  
  prevPage = () => {
    const { page } = this.state;

    if (page === 1) return;

    const pageNumber = page - 1;

    this.loadProducts(pageNumber);
  }
  
  nextPage = () => {
    const { page, productInfo } = this.state;

    if (page === productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  }

  renderButtonAdd() {
    return (
      <div className="addProduct">
        <Link to={`/products/add`}>Adicionar produto</Link>
      </div>
    );
  }

  render() {
    const { products, page, productInfo } = this.state;
    const { match } = this.props;

    return (
      <Fragment>
        {this.renderButtonAdd()}
          <div className="product-list">
            {products.map(product => (
              <article key={product._id}>
                <strong>{product.title}</strong>
                <p>{product.description}</p>
                <Link to={`/product/${product._id}`}>Acessar</Link>
              </article>
            ))}
            <div className="actions">
              <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
              <button disabled={page === productInfo.pages || productInfo.total === 0} onClick={this.nextPage}>Próximo</button>
            </div>
          </div>  
          <ModalRoute
            path={`/products/add`}
            parentPath={match.url}
            component={AddProduct}
          />
        </Fragment>
    )   
  }
}