import React from "react";
import ProductTable from "./ProductTable";
import {
  createProduct,
  getAllProducts,
} from "../../services/product.service";
import "./Products.css";
import type { Product } from "../../types/product";

interface ProductsState {
  products: Product[];
  productName: string;
  productBrand: string;
  productExpiration: string;
  productQuantity: string;
  queryResult: "";
  loading: boolean;
  searchQuery: string;
}

class Products extends React.Component<object, ProductsState> {
  constructor(props: object) {
    super(props);
    this.state = {
      products: [],
      productName: "",
      productBrand: "",
      productExpiration: "",
      productQuantity: "",
      queryResult: "",
      loading: false,
      searchQuery: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
  }

  componentDidMount() {
    // Make API call to get products data
    /* const products = await getAllProducts() */
    getAllProducts()
      .then((data: Product[]) => {
        // Update state with products data
        this.setState({ products: data });
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }

  handleQuery(event: React.ChangeEvent<HTMLInputElement>) {
    // Handle changes to search query.
    const { value } = event.target;
    this.setState({ searchQuery: value });
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // Handle changes to add products form.
    const { name, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Submit new product to server.
    event.preventDefault();
    const name: string = this.state.productName;
    const brand: string = this.state.productBrand;
    const expiration: string = this.state.productExpiration;
    const quantity: number = parseInt(this.state.productQuantity, 10);

    this.setState({ loading: true });

    // Make API call to add new product data
    createProduct({
      name: name,
      brand: brand,
      expirationDate: expiration,
      quantity: quantity,
    })
      .then((data: Product) => {
        // Update state with new product data
        this.setState((prevState) => ({
          products: [...prevState.products, data],
          productName: "",
          productBrand: "",
          productExpiration: "",
          productQuantity: "",
          loading: false,
        }));
      })
      .catch((error) => {
        // Handle error
        console.error("erro: ", error);
        this.setState({ loading: false });
      });
  }
  handleQuantityUpdate = (productId: number, newQuantity: number) => {
    const updatedProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: newQuantity,
        };
      }
      return product;
    });
    this.setState({ products: [...updatedProducts] });
  };

  render() {
    const filteredProducts = this.state.products.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(this.state.searchQuery.toLowerCase()) ||
        product.brand
          .toLowerCase()
          .includes(this.state.searchQuery.toLowerCase())
    );
    return (
      <div className="products">
        {this.state.loading && <p>Loading...</p>}
        <div id="flex-container">
          <div className="search-product">
            <h3>Search products</h3>
            <div className="search-product-form">
              <div className="search-form-group">
                <input
                  name="search-by-name"
                  id="search-by-name"
                  placeholder="Type product name"
                  value={this.state.searchQuery}
                  onChange={this.handleQuery}
                />
              </div>
            </div>
          </div>
          <main className="table">
            <div className="table-header">
              <h3>Products</h3>
            </div>
            <div>
              <ProductTable
                products={filteredProducts}
                onQuantityUpdate={this.handleQuantityUpdate}
              />
            </div>
          </main>
          <div className="add-product">
            <h3>Add products</h3>
            <form onSubmit={this.handleSubmit} className="add-form">
              <div className="product-description">
                <div className="add-product-form">
                  <div className="add-form-group">
                    <label htmlFor="product-name-input">Nome</label>
                    <input
                      type="text"
                      id="productName"
                      name="productName"
                      value={this.state.productName}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="add-form-group">
                    <label htmlFor="product-brand-input">Brand</label>
                    <input
                      type="text"
                      id="productBrand"
                      name="productBrand"
                      value={this.state.productBrand}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="add-form-group">
                    <label htmlFor="product-expiration-date-input">
                      Expiration Date
                    </label>
                    <input
                      type="date"
                      id="productExpiration"
                      name="productExpiration"
                      value={this.state.productExpiration}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="add-form-group">
                    <label htmlFor="product-quantity-input">Quantity</label>
                    <input
                      type="number"
                      id="productQuantity"
                      name="productQuantity"
                      value={this.state.productQuantity}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="add-product-button-wrapper">
                  <button type="submit" disabled={this.state.loading}>
                    {this.state.loading ? "Loading..." : "Add"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
