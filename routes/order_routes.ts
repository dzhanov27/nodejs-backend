import express from 'express';
const router = express.Router();

// import verify from '../controllers/verifyToken';
import { OrdersController } from '../controllers/orders.controller';
const { index, newOrder, getOrder } = OrdersController;

router.route('/').get(index).post(newOrder);

router.get('/:orderId', getOrder);

export default router;
