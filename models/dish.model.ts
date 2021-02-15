import { Schema, model } from 'mongoose';

const dishSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  cafes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Cafe',
    },
  ],
});

const Dish = model('Dish', dishSchema);

export default Dish;
