import { Product } from "../types/product";


// TODO: Use environment variables for API URL
const API_URL = "http://localhost:3000"; 

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return await res.json();
};

export const createProduct = async (data: Product): Promise<Product> => {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erro ao criar produto");
  }

  return await res.json();
};

export const updateProduct = async (
  id: number,
  data: Partial<Product>
): Promise<Product> => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erro ao atualizar produto");
  }

  return await res.json();
};

export const getProductByName = async (name: string): Promise<Product[]> => {
  const res = await fetch(`${API_URL}/products/search?name=${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error("Erro ao buscar produto por nome");
  return await res.json();
};
