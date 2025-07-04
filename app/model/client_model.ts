import { model, models, Schema } from "mongoose";

const clientshema = new Schema({
  uid: { type: String, required: true, unique: true },
  nom: { type: String, required: true },
  type: { type: String },
});

const Clientmodel = models.Client || model("Client", clientshema);
export default Clientmodel;
