import express from 'express';

import Cafe from '../models/cafe.model';
import Dish from '../models/dish.model';

class CafesCtrl {
  async index(_: any, res: express.Response): Promise<void> {
    try {
      const cafes = await Cafe.find({});
      res.status(200).json(cafes);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  }

  async newCafe(req: any, res: express.Response): Promise<void> {
    try {
      const newCafe = new Cafe(req.body);
      await newCafe.save();
      res.status(201).json('New cafe added');
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  }

  async getCafe(req: any, res: express.Response): Promise<void> {
    try {
      const { cafeId } = req.params;
      const cafe = await Cafe.findById(cafeId);
      res.status(200).json(cafe);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  }

  async replaceCafe(req: any, res: express.Response): Promise<void> {
    try {
      const { cafeId } = req.params;
      const newCafe = req.body;
      const result = await Cafe.findByIdAndUpdate(cafeId, newCafe);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  }

  async getCafeDishes(req: any, res: express.Response): Promise<void> {
    try {
      const { cafeId } = req.params;
      const cafe: any = await Cafe.findById(cafeId).populate('dishes');
      res.status(200).json(cafe.dishes);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  }

  async newCafeDish(req: any, res: express.Response): Promise<void> {
    try {
      const { cafeId } = req.params;
      const newDish: any = new Dish(req.body);
      const cafe: any = await Cafe.findById(cafeId);
      //assign dish relevant to cafe
      newDish.cafes.push(cafe);
      await newDish.save();
      //assign cafe relevant to dish
      cafe.dishes.push(newDish);
      await cafe.save();
      res.status(201).json('New dish created');
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  }

  async getDish(req: any, res: express.Response): Promise<void> {
    try {
      const { dishId } = req.params;
      const dish = await Dish.findById(dishId).populate('cafes');
      res.status(200).json(dish);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  }
}

export const CafesController = new CafesCtrl();
