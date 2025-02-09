import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {

  async update(entity: Order): Promise<void> {
    try {
      const sequelize = OrderModel.sequelize;

      await sequelize.transaction(async (t) => {
        await OrderItemModel.destroy({
          where: { order_id: entity.id },
          transaction: t,
        });

        const items = entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id,
        }));

        await OrderItemModel.bulkCreate(items, { transaction: t });

        await OrderModel.update(
          { total: entity.total() },
          { where: { id: entity.id }, transaction: t }
        );
      });
    } catch (error) {
      throw new Error("Cannot update order");
    }
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        include: [{ model: OrderItemModel }],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const items = orderModel.items.map((item) => (new OrderItem(
      item.id,
      item.name,
      item.price,
      item.product_id,
      item.quantity
    )))

    return new Order(id, orderModel.customer_id, items);
  }

  async findAll(): Promise<Order[]> {
    try {
      const orderModels = await OrderModel.findAll({ include: ["items"] });

      if (!orderModels.length) {
        throw new Error("Orders not found");
      }

      const orders = orderModels.map((orderModel) => {
        const items = orderModel.items.map((item) => (new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )))

        return new Order(orderModel.id, orderModel.customer_id, items);
      });

      return orders;
    } catch (error) {
      throw new Error("Orders not found");
    }
  }

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
}
