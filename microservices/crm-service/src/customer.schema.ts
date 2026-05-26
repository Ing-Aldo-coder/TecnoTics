import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true, enum: ['Lead', 'Cliente'], default: 'Lead' })
  status: string;

  @Prop({ required: false, default: 'Alejandro Ventas' })
  assignedExecutive: string;

  @Prop({ required: false, default: 'Contacto Inicial Realizado' })
  lastInteraction: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

