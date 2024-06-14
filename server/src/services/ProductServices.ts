import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";

export const getAllProducts = async () => {
  const productRepository = AppDataSource.getRepository(Product);
  return await productRepository.find();
};

export const createProduct = async (productData: Partial<Product>) => {
  const productRepository = AppDataSource.getRepository(Product);
  const newProduct = productRepository.create(productData);
  return await productRepository.save(newProduct);
};
