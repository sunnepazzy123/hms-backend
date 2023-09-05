import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { IUser } from '../schema/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { roleType } from 'src/constants/enums';
import { CreatePatientDto } from 'src/auth/dto/create_patient.dto';

@Injectable()
export class PatientsService {
  constructor(@InjectModel('users') private patientModel: Model<IUser>) {}

  async create(createPatientDto: CreatePatientDto): Promise<IUser> {
    const createdPatient = await this.patientModel.create(createPatientDto);
    return createdPatient.save();
  }

  async findAll(): Promise<IUser[]> {
    return await this.patientModel.find({ role: roleType.patient }).sort({created_at: -1}).exec();
  }

  async findOne(id: Types.ObjectId): Promise<IUser> {
    return await this.patientModel
      .findOne({ _id: id, role: roleType.patient })
      .exec();
  }

  async findOneByCardId(card_no: string): Promise<IUser> {
    return await this.patientModel
      .findOne({ card_no })
      .sort({ created_at: -1 })
      .exec();
  }
}
