import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  availability: boolean;

  @Prop()
  color: string;

  @Prop()
  dimension: string;

  @Prop()
  material: string;

  @Prop()
  productType: string;

  @Prop()
  application: string;

  @Prop()
  form: string;

  @Prop()
  imageUrl: string;

  @Prop()
  createdAt: Date;

}

export const ProductSchema = SchemaFactory.createForClass(Product);
