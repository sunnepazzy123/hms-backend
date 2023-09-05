import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MedicalRecord } from 'src/schema/medical-record.schema';
import { ICreateMedicalRecord } from './dto/create_medicalRecord.dto';
import { Model, Types } from 'mongoose';
import { UpdateMedicalRecordDto } from './dto/update_medicalRecord.dto';
import { statusType } from 'src/constants/enums';
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
      const staff_id = new Types.ObjectId(body.staff_id);
      medicalRecord.staff_id = staff_id;
    }

    const assignee = new Types.ObjectId(body.assignee);

    assignee && medicalRecord.assignee.push(assignee);
    body.vital && medicalRecord.vitals.push(body.vital);
    body.note && medicalRecord.notes.push({ description: body.note });

    medicalRecord.status = body.status || medicalRecord.status;

    return await medicalRecord.save();
  }

  async findAll(
    status?: statusType,
    card_no?: string,
  ): Promise<MedicalRecord[]> {
    // Calculate the date 50 hours ago
    const fiftyHourAgo = hoursAgo(50);
    console.log('findall', fiftyHourAgo)
    if (status) {
      return await this.medicalRecordModel
        .find({ status: status, $gt: fiftyHourAgo })
        .populate(['patient_id', 'staff_id'])
        .sort({ created_at: 'desc' })
        .limit(100)
        .exec();
    }
    if (card_no) {
      const medicalRecords = await this.findByCardNumber(card_no);
      return medicalRecords;
    }

    return await this.medicalRecordModel
      .find({ created_at: { $lt: fiftyHourAgo } })
      .populate(['patient_id', 'staff_id'])
      .sort({ created_at: 'desc' })
      .limit(100)
      .exec();
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
}
