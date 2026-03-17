import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  name: { type: String, required: true },
  series: { type: String, required: true },
  roll: { type: String, required: true },
  comments: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Query = mongoose.models.Query || mongoose.model("Query", querySchema);
