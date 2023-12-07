import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const UssersSchema = new Schema(
  {
    usser: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "ussers" },
  {
    strict: "throw",
    versionKey: false,
  }
);

export const usserSchema = model("ussers", UssersSchema);
