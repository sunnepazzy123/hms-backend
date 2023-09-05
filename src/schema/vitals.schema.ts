import * as mongoose from 'mongoose';

export const VitalsSchema = new mongoose.Schema({
  blood_pressure: {
    type: Number,
    required: true,
  },
  pulse: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  respiration: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export interface IVital extends mongoose.Schema {
  blood_pressure: number;
  pulse: number;
  temperature: number;
  respiration: number;
  height: number;
  weight: number;
  created_at?: Date;
}
