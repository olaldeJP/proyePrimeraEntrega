import mongoose, { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const CartSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    productos: { type: [], default: [] },
  },
  {
    strict: "throw",
    versionKey: false,
    methods: {},
  }
);

export const cartsManagerMongoose = model("carts", CartSchema);
