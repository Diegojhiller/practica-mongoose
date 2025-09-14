import { Schema, model } from 'mongoose';

const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Artist = model('Artist', artistSchema);

export default Artist;