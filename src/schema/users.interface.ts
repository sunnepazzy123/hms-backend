import { Document, Types } from 'mongoose';
import { genderType, roleType } from 'src/constants/enums';
import { MedicalRecord } from './medical-record.schema';

export interface IUser extends Document {
  readonly _id?: Types.ObjectId;
  readonly firstName: string;
  readonly lastName: string;
  readonly card_no: string;
  readonly username?: string;
  readonly password?: string;
  readonly role: roleType;
  readonly dob: Date;
  readonly gender: genderType;
  readonly address: string;
  readonly phone: number;
  readonly guardian_phone?: number;
  readonly enabled?: boolean;
  readonly created_at?: Date;
  readonly medicalRecords?: MedicalRecord[];
}

export interface IAuthUser {
  id: Types.ObjectId;
  role: roleType;
}
