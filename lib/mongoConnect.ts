import mongoose from "mongoose";

export function MongoConnect() {
  mongoose.connect(process.env.URI!, {
    dbName: "IvoireTech",
  });
}
