import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IMedicalRecord, MedicalRecord } from 'src/schema/medical-record.schema';
import { ICreateMedicalRecord } from './dto/create_medicalRecord.dto';
import  { Model, Types } from 'mongoose';
import { UpdateMedicalRecordDto } from './dto/update_medicalRecord.dto';
import { hoursAgo } from 'src/utils';

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectModel('medicalRecords')
    private medicalRecordModel: Model<MedicalRecord>,
  ) {}

  async create(
    createMedicalRecordtDto: ICreateMedicalRecord,
  ): Promise<MedicalRecord> {
    const newMedicalRecord = await this.medicalRecordModel.create(
      createMedicalRecordtDto,
    );
    return newMedicalRecord;
  }

  async update(
    id: Types.ObjectId,
    body: UpdateMedicalRecordDto,
  ): Promise<MedicalRecord> {
    const medicalRecord = await this.medicalRecordModel.findById(id);
    if (!medicalRecord) {
      throw new NotFoundException('Medical Record not found');
    }

    if (body.staff_id) {    
      medicalRecord.staff_id = new Types.ObjectId(body.staff_id);
    }

    const assignee = new Types.ObjectId(body.assignee);

    assignee && medicalRecord.assignee.push(assignee);
    body.vital && medicalRecord.vitals.push(body.vital);
    body.note && medicalRecord.notes.push({ description: body.note });

    medicalRecord.status = body.status || medicalRecord.status;

    return await medicalRecord.save();
  }

  async findAll(option: Partial<IMedicalRecord>): Promise<MedicalRecord[]> {

    const fiftyHourAgo = hoursAgo(1050); // Calculate the date 50 hours ago
    if (option.status) {
      return this.queryBuilder({status: option.status}, fiftyHourAgo)
    }
    if (option.card_no) {
      return this.queryBuilder({card_no: option.card_no}, fiftyHourAgo)
    }

   return this.queryBuilder({}, fiftyHourAgo)

  }

  async findOne(id: Types.ObjectId): Promise<MedicalRecord> {
    return await this.medicalRecordModel
      .findById(id)
      .populate(['staff_id', 'patient_id'])
      .exec();
  }

  async findOneByCardNumber(card_no: string): Promise<MedicalRecord> {
    return await this.medicalRecordModel
      .findOne({ card_no })
      .sort({ created_at: -1 })
      .exec();
  }

  async findByCardNumber(card_no: string): Promise<MedicalRecord[]> {
    return await this.medicalRecordModel
      .find({ card_no })
      .populate(['staff_id', 'patient_id'])
      .sort({ created_at: -1 })
      .limit(100)
      .exec();
  }

  async findByPatientId(patient_id: Types.ObjectId): Promise<MedicalRecord[]> {
    return await this.medicalRecordModel
      .find({ patient_id: patient_id})
      .populate(['staff_id', 'patient_id'])
      .sort({ created_at: -1 })
      .limit(30)
      .exec();
  }

  private async queryBuilder(model: Partial<IMedicalRecord>, time: Date) {
    const queryOption = {
      ...model,
      created_at: { $gt: time } // Assuming 'created_at' is the field you want to compare
    } as any;
  
    try {
     
       const result =  await this.medicalRecordModel
        .find(queryOption)
        .populate(['staff_id', 'patient_id'])
        .sort({ created_at: 'desc' })
        .limit(100)
        .exec();
      return result
    } catch (error) {
      // Handle any errors here
      console.error('Error in queryBuilder:', error);
      throw error;
    }
  }
  
}
