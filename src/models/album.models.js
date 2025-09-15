import { Schema, model } from 'mongoose';

const albumSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  songs: [{
    type: Schema.Types.ObjectId,
    ref: 'Song',
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
},
  { 
    versionKey: false 
  }
);

const Album = model ('Album', albumSchema);

export default Album;