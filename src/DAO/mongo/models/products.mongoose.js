import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const schema = new Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true },
  category: { type: String, required: true },
  code: { type: String, required: true }, // Cambiado de Number a String para coincidir con la base de datos
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  owner: { type: String, default: "admin" },
  status: { type: Boolean, default: true }, // Añadido el campo status
});

schema.plugin(mongoosePaginate);
export const ProductsMongoose = model("products", schema);
