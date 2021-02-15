import express from 'express';
const router = express.Router();

import { CafesController } from '../controllers/cafes.controller';

/*
for verify token on route use
.get(verify function, controller function)
*/

router.route('/').get(CafesController.index).post(CafesController.newCafe);

router
  .route('/:cafeId')
  .get(CafesController.getCafe)
  .put(CafesController.replaceCafe);

router
  .route('/:cafeId/dishes')
  .get(CafesController.getCafeDishes)
  .post(CafesController.newCafeDish);

router.route('/:cafeId/dishes/:dishId').get(CafesController.getDish);

export default router;
