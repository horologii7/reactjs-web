import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "./styles";
import Api from '../../services/api';

export default class AddProduct extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  state = {
    title: "",
    description: "",
    url: "",
    error: ""
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const response = await Api.get(`/products/${id}`);

    this.setState({ product: response.data });
  }

  handleSubmit = async e => {
    e.preventDefault();

    try {
      const { title, description, url } = this.state;

      if (!title || !description || !url) {
        this.setState({ error: "Preencha todos os campos" });
        return;
      }

      const {data: {_id}} = await Api.post("/products", {
        title,
        description,
        url
      });
      
      this.props.history.push(`/product/${_id}`);
    } catch (err) {
      this.setState({ error: "Ocorreu algum erro ao adicionar o imóvel" });
    }
  };

  handleCancel = e => {
    e.preventDefault();
  
    this.props.history.push("");
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Adicionar produto</h1>
        <hr />
        {this.state.error && <p>{this.state.error}</p>}
        <input
          type="text"
          placeholder="Título"
          onChange={e => this.setState({ title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição"
          onChange={e => this.setState({ description: e.target.value })}
        />
        <input
          type="decimal"
          placeholder="Url"
          onChange={e => this.setState({ url: e.target.value })}
        />
        <div className="actions">
          <button type="submit">Adicionar</button>
          <button onClick={this.handleCancel} className="cancel">
            Cancelar
          </button>
        </div>
      </Form>
    );
  }
}

