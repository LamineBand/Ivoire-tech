import { Schema, model, models } from "mongoose";

const cmd_Schema = new Schema({
  ref: { type: String, required: true, unique: true },
  date: { type: String },
  userinfo: {},
  produits: [],
  total: { type: Number },
  statut: { type: String },
});

const cmd_model = models.cmd || model("cmd", cmd_Schema);
export default cmd_model;
