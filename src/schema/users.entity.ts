import * as mongoose from 'mongoose';
import { genderType, roleType } from 'src/constants/enums';

export const UserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  card_no: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String, // Corrected "Enums" to "String"
    enum: roleType, // Enum validation
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String, // Corrected "Enums" to "String"
    enum: genderType, // Enum validation
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  guardian_phone: {
    type: Number,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  medicalRecords: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'medicalRecords',
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});
