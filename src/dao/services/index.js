import mongoose from "mongoose";

export async function conectar() {
  await mongoose.connect(
    "mongodb+srv://olaldejp:kpYKgBF6WyJA5VJN@cluster0.knkx5ka.mongodb.net/ecommerce"
  );
  console.log(`base de datos conectada!`);
}

export async function desconectar() {
  await mongoose.disconnect();
  console.log("base de datos Desconectada");
}

export { productsManagerMongoose as productsMongoose } from "./ProductsMongoose.js";
export { cartsManagerMongoose as cartsMongoose } from "./CartsMongoose.js";
