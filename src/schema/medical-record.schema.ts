import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { IVital, VitalsSchema } from './vitals.schema';
import { statusType } from 'src/constants/enums';

export type INote = {
  description: string;
  created_at?: Date;
};

export const NoteSchema = new mongoose.Schema<INote>({
  description: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export interface IMedicalRecord extends Document {
  _id?: Types.ObjectId;
  staff_id?: Types.ObjectId;
  patient_id: Types.ObjectId;
  card_no: string;
  diagnosis: string;
  vitals: IVital[];
  notes: INote[];
  assignee: Types.ObjectId[];
  status: statusType;
}

@Schema()
export class MedicalRecord extends Document<IMedicalRecord> {
  @Prop({ type: Types.ObjectId, ref: 'users' })
  staff_id: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'users',
  })
  patient_id: Types.ObjectId;

  @Prop({ required: true, type: String })
  card_no: string;

  @Prop({ required: true, type: String })
  diagnosis: string;

  @Prop({ required: true, type: [VitalsSchema] })
  vitals: IVital[];

  @Prop({ type: [NoteSchema] })
  notes: [INote];

  @Prop({ required: true, type: [Types.ObjectId] })
  assignee: Types.ObjectId[];

  @Prop({
    required: true,
    default: statusType.open,
    enum: statusType,
  })
  status: string;

  @Prop({ required: true, default: Date.now })
  created_at: Date;
}

export const MedicalRecordSchema = SchemaFactory.createForClass(MedicalRecord);
