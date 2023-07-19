import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("NotesSchema", NotesSchema);
