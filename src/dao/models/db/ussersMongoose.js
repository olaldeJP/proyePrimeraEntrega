import { strict } from "assert";
import mongoose, { Schema, model } from "mongoose";
import { randomUUID } from "node:crypto";

const UssersManager = new Schema(
  {
    _id: { type: String, default: randomUUID },
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
  },
  {
    strict: "throw",
    versionKey: false,
  }
);

export const ussersModel = mongoose.model("usuarios", UssersManager);
