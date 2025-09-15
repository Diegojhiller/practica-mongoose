import { Schema, model } from 'mongoose';

const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
},
  { 
    versionKey: false 
  }
);

const Artist = model('Artist', artistSchema);

export default Artist;