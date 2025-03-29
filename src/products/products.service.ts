import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async createProduct(data: Partial<Product>): Promise<Product> {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().sort({ createdAt: -1 }).exec();
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(id, data, { new: true });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async deleteProduct(id: string): Promise<void> {
    return this.productModel.findByIdAndDelete(id);
  }
}
