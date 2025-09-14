import { Schema, model } from 'mongoose';

const detailsSchema = new Schema({
  duration: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    default: Date.now,
  },
});

const songSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  details: {
    type: detailsSchema,
    required: true,
  },
  albums: [{
    type: Schema.Types.ObjectId,
    ref: 'Album',
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
},
  { versionKey: false }
);

const Song = model ('Song', songSchema);

export default Song;