//archivo users.mongoose.js
import { Schema, model } from "mongoose";
import { generateCartId } from "../../../utils/main.js";

const schema = new Schema({
  first_name: { type: String, required: false, max: 100 },
  last_name: { type: String, required: false, max: 100 },
  age: { type: Number, required: false },
  email: { type: String, required: true, max: 100, unique: true },
  password: { type: String, required: false, max: 100 },
  role: { type: String, default: "user" },
  premium: { type: Boolean, default: false },
  cartID: {
    type: String,
    required: true,
    unique: true,
    default: () => generateCartId(),
  },
  purchase_made: {
    type: [String],
    default: [],
  },
  documents: [
    {
      name: { type: String, required: true },
      reference: { type: String, required: true },
    },
  ],
  last_connection: { type: Date, default: null },
});

export const UsersMongoose = model("users", schema);
