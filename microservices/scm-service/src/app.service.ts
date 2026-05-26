import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async onModuleInit() {
    try {
      // Force clear and reload the expanded set with robust, 100% working Unsplash images
      await this.productRepository.clear();
      
      const defaultProducts = [
        { name: 'MacBook Pro M3 Max 16"', sku: 'MBP-M3', price: 2499.00, inventoryCount: 15, image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=600&q=80' },
        { name: 'Intel Core i9-14900K Processor', sku: 'INT-I9', price: 589.99, inventoryCount: 25, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
        { name: 'NVIDIA GeForce RTX 4090 GPU', sku: 'NV-RTX4090', price: 1599.99, inventoryCount: 5, image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=80' },
        { name: 'ASUS ROG Swift PG32UCDM 32"', sku: 'AS-32UCD', price: 1299.00, inventoryCount: 18, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80' },
        { name: 'Dell PowerEdge Intel Xeon Server', sku: 'SRV-XEON', price: 3499.00, inventoryCount: 8, image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80' },
        { name: 'Samsung 990 Pro 4TB NVMe SSD', sku: 'SSD-4TB', price: 329.99, inventoryCount: 40, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80' },
        { name: 'Cisco Catalyst 48-Port Switch', sku: 'SW-48P', price: 1899.00, inventoryCount: 12, image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80' },
        { name: 'Corsair Dominator 64GB DDR5 RAM', sku: 'RAM-64GB', price: 249.99, inventoryCount: 30, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80' },
        { name: 'Lenovo ThinkPad X1 Carbon Gen 12', sku: 'LAP-TP-X1', price: 1899.99, inventoryCount: 10, image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80' },
        { name: 'ASUS ROG Zephyrus G14 Laptop', sku: 'LAP-ROG-G14', price: 1599.00, inventoryCount: 12, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80' },
        { name: 'AMD Ryzen 9 7950X3D Processor', sku: 'CPU-RYZ9', price: 649.99, inventoryCount: 15, image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=80' },
        { name: 'LG UltraGear OLED 45" Curved', sku: 'MON-LG45', price: 1699.99, inventoryCount: 8, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80' },
        { name: 'HP ProLiant DL380 Gen11 Server', sku: 'SRV-HPDL380', price: 4199.00, inventoryCount: 5, image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80' },
        { name: 'Ubiquiti UniFi Dream Machine SE', sku: 'SW-UDMSE', price: 499.00, inventoryCount: 15, image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80' },
        { name: 'Crucial T700 2TB Gen5 NVMe SSD', sku: 'SSD-T700-2TB', price: 269.99, inventoryCount: 35, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
        { name: 'Noctua NH-D15 CPU Air Cooler', sku: 'COL-NHD15', price: 109.90, inventoryCount: 22, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80' },
        { name: 'Keychron Q1 Pro Keyboard', sku: 'KEY-Q1PRO', price: 199.99, inventoryCount: 25, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80' },
        { name: 'Logitech G Pro X Superlight 2', sku: 'MSE-GPSL2', price: 159.99, inventoryCount: 40, image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80' },
        { name: 'Sony WH-1000XM5 ANC Headset', sku: 'AUD-WHXM5', price: 399.99, inventoryCount: 18, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80' }
      ];
      
      for (const prod of defaultProducts) {
        await this.productRepository.save(this.productRepository.create(prod));
      }
      console.log('[SCM] SCM PostgreSQL Database successfully re-populated with expanded premium products.');
    } catch (err) {
      console.error('[SCM] Error pre-populating products in PostgreSQL:', err);
    }
  }

  async getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }


  async createProduct(data: Partial<Product>): Promise<Product> {
    const newProduct = this.productRepository.create(data);
    return this.productRepository.save(newProduct);
  }

  async processOrderStock(data: { items: { sku: string; quantity: number }[] }): Promise<{ success: boolean; logs: string[]; actions: string[] }> {
    const logs: string[] = [];
    const actions: string[] = [];
    let success = true;

    for (const item of data.items) {
      const product = await this.productRepository.findOne({ where: { sku: item.sku } });
      if (!product) {
        logs.push(`[SCM] ❌ Producto no encontrado para el SKU: ${item.sku}`);
        success = false;
        continue;
      }

      // Convert quantity to integer to prevent type issues
      const reqQuantity = parseInt(item.quantity as any, 10) || 1;
      const currentStock = parseInt(product.inventoryCount as any, 10) || 0;

      if (currentStock >= reqQuantity) {
        product.inventoryCount = currentStock - reqQuantity;
        await this.productRepository.save(product);
        logs.push(`[SCM] ✅ Stock suficiente para "${product.name}" (SKU: ${product.sku}). Existencias: ${currentStock} ➔ Nuevo stock: ${product.inventoryCount} unidades.`);
        actions.push(`[SCM] Generada orden de salida de almacén para ${product.sku}`);
      } else {
        // AUTOMATIZACIÓN DE COMPRAS (RF): Orden de compra automática al proveedor
        const restockAmount = 50;
        const tempStockAfterRestock = currentStock + restockAmount;
        product.inventoryCount = tempStockAfterRestock - reqQuantity;
        await this.productRepository.save(product);

        logs.push(`[SCM] ⚠️ Alerta de stock crítico para "${product.name}" (SKU: ${product.sku}). Existencias actuales: ${currentStock} unidades, requeridas: ${reqQuantity}.`);
        logs.push(`[SCM] 📦 [AUTOMATIZACIÓN] Disparando orden de compra automática al proveedor (TechSupplier Inc) por un lote estándar de 50 unidades.`);
        logs.push(`[SCM] 🚚 Mercadería recibida e integrada. Stock reabastecido a ${tempStockAfterRestock} unidades. Se despachan ${reqQuantity} unidades.`);
        logs.push(`[SCM] ✅ Nuevo stock final disponible en almacén: ${product.inventoryCount} unidades.`);
        actions.push(`[SCM] Compra automática ejecutada (+50 restock) para SKU: ${product.sku}`);
      }
    }

    return { success, logs, actions };
  }
}
