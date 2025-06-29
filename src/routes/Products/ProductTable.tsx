import React, { type FC, useState } from 'react';
import { updateQuantityProduct } from '../../services/product.service';
import type { Product } from '@/types/product';
import './ProductTable.css';

interface ProductTableProps {
  products: Product[];
  onQuantityUpdate: (productId: number, newQuantity: number) => void;
}

const ProductTable: FC<ProductTableProps> = ({ products, onQuantityUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleQuantityUpdate = (productId: number | undefined, event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (isNaN(newQuantity) || newQuantity < 1) {
      alert("Quantidade inválida. Deve ser um número maior que 0.");
      return;
    }
    onQuantityUpdate(productId!, newQuantity);
  }

  const handleQuantityUpdateButton = async (productId: number | undefined, quantity: number) => {
    setIsLoading(true);
    if (productId === undefined) {
      alert("ID do produto não encontrado.");
      setIsLoading(false);
      return;
    }
    try {
      await updateQuantityProduct(productId, quantity);
      alert("Produto atualizado");
    } catch (error) {
      console.log("Erro:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Marca</th>
          <th>Validade</th>
          <th>Quantidade</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.brand}</td>
            <td>{new Date(product.expirationDate).toLocaleDateString()}</td>
            <td>
              <input
                type="number"
                min="1"
                value={product.quantity}
                onChange={(event) => handleQuantityUpdate(product.id, event)}
              />
            </td>
            <td> {isLoading ? (
                <div>Carregando...</div>
              ) : (
                <button onClick={() => handleQuantityUpdateButton(product.id, product.quantity)}>Atualizar</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
