import { Request, Response } from "express";
import { AppDataSource } from "../data-source"; // Adjust the import path as necessary
import { Product } from "../entity/Product"; // Adjust the import path as necessary

export class ProductController {
  static getAll = async (req: Request, res: Response) => {
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.find();
    res.send(products);
  };

  static getOneById = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log("id :>> ", id);
    const productRepository = AppDataSource.getRepository(Product);
    try {
      const product = await productRepository.findOneOrFail({
        where: { id: parseInt(id) },
      });
      res.send(product);
    } catch (error) {
      res.status(404).send("Product not found");
    }
  };

  static save = async (req: Request, res: Response) => {
    const productRepository = AppDataSource.getRepository(Product);
    const product = productRepository.create(req.body);
    await productRepository.save(product);
    res.send(product);
  };

  static update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const productRepository = AppDataSource.getRepository(Product);
    try {
      const product = await productRepository.findOneOrFail({
        where: { id: parseInt(id) },
      });
      productRepository.merge(product, req.body);
      await productRepository.save(product);
      res.send(product);
    } catch (error) {
      res.status(404).send("Product not found");
    }
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const productRepository = AppDataSource.getRepository(Product);
    try {
      await productRepository.findOneOrFail({ where: { id: parseInt(id) } });
      await productRepository.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(404).send("Product not found");
    }
  };
}
