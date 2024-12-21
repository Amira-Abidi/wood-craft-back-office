import { Controller, Get, Post, Body, Param, Patch, Delete, UseInterceptors, NestInterceptor, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() product: Partial<Product>) {
    return this.productsService.createProduct(product);
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getAllProducts();
    return products.map(product => ({
      ...product,
      imageUrl: `${product.imageUrl}`,
    }));
  }
  
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() data: Partial<Product>) {
    return this.productsService.updateProduct(id, data);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        // Générer un nom de fichier unique en conservant l'extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
    fileFilter: (req, file, callback) => {
      // Optionnel : Filtrer pour accepter uniquement les fichiers images
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
      }
      callback(null, true);
    },
  }))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = `http://localhost:3000/uploads/${file.filename}`;
    return { message: 'Upload successful', url: imageUrl };
  }

}
