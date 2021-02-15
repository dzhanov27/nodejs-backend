import express from 'express';

import Order from '../models/order.model';

class OrdersCtrl {
  async index(_: any, res: express.Response): Promise<void> {
    try {
      const orders = await Order.find({});
      res.status(200).json(orders);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  }

  async getOrder(req: any, res: express.Response): Promise<void> {
    try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId);
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  }

  async newOrder(req: any, res: express.Response): Promise<void> {
    try {
      const newOrder = new Order(req.body);
      await newOrder.save();
      res.status(201).json('New order added');
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  }
}

export const OrdersController = new OrdersCtrl();
