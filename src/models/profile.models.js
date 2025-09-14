import { Schema, model } from 'mongoose';

const profileSchema = new Schema({
  bio: {
    type: String,
    trim: true,
  },
  birthDate: {
    type: Date,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
});

const Profile = model('Profile', profileSchema);

export default Profile;