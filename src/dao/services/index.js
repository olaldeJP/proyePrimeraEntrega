import mongoose from "mongoose";

export async function conectar() {
  await mongoose.connect(
    "mongodb+srv://olaldejp:kpYKgBF6WyJA5VJN@cluster0.knkx5ka.mongodb.net/ecommerce"
  );
}

export async function desconectar() {
  await mongoose.disconnect();
}

export { productsManagerMongoose as productsMongoose } from "./ProductsMongoose.js";
export { cartsManagerMongoose as cartsMongoose } from "./CartsMongoose.js";
