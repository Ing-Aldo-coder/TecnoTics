import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './customer.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) {}

  async getCustomers(): Promise<Customer[]> {
    return this.customerModel.find().exec();
  }

  async createCustomer(data: any): Promise<Customer> {
    const existing = await this.customerModel.findOne({ email: data.email }).exec();
    if (existing) {
      existing.name = data.name || existing.name;
      existing.phone = data.phone || existing.phone;
      existing.company = data.company || existing.company;
      existing.status = data.status || existing.status || 'Cliente';
      existing.assignedExecutive = data.assignedExecutive || existing.assignedExecutive;
      existing.lastInteraction = data.lastInteraction || existing.lastInteraction;
      return existing.save();
    }

    const createdCustomer = new this.customerModel({
      status: 'Cliente',
      ...data,
    });
    return createdCustomer.save();
  }
}
