import { Schema, model, models } from "mongoose";

const vendeurSchema = new Schema({
  uid: { type: String, required: true, unique: true },
  mail: { type: String, require: true, unique: true },
  nom: { type: String, required: true },
  tel: { type: String, unique: true, require: true },
  nomBoutique: { type: String },
  adresse: { type: String },
  ville: { type: String, required: true },
  // telephone: { type: String, required: true },
  type: { type: String, require: true },
});

const Users_Model = models.Users || model("Users", vendeurSchema);

export default Users_Model;
