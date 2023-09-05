import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/schema/users.interface';
import { CreatePatientDto } from './dto/create_patient.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateStaffDto } from './dto/create_staff.dto';

const scrypt = promisify(_scrypt);
const cardPrefix = 'HMS';

@Injectable()
export class AuthService {
  constructor(@InjectModel('users') private userModel: Model<IUser>) {}

  async register_patient(body: CreatePatientDto) {
    const cardNo = cardPrefix + this.generateCardNo();
    const cardNoFound = await this.userModel.findOne({ card_no: cardNo });

    if (cardNoFound) {
      throw new BadRequestException('Card Number already exist');
    }
    body.card_no = cardNo;
    const patient = await this.userModel.create(body);
    const newPatient = await patient.save();
    return newPatient;
  }

  async register_staff(body: CreateStaffDto) {
    const cardNo = cardPrefix + this.generateCardNo();

    const cardNoFound = await this.userModel.findOne({ card_no: cardNo });

    if (cardNoFound) {
      throw new BadRequestException('Card Number already exist');
    }

    const username = await this.userModel.findOne({ username: body.username });

    if (username) {
      throw new BadRequestException('Username already exist');
    }

    //generate a salt
    const salt = randomBytes(8).toString('hex');

    //generate a hash
    const hash = (await scrypt(body.password, salt, 32)) as Buffer;

    const hashSaltedPassword = salt + '.' + hash.toString('hex');
    body.password = hashSaltedPassword;
    body.card_no = cardNo;
    const staff = await this.userModel.create(body);
    const newStaff = await staff.save();
    return newStaff;
  }

  async login(body: { username: string; password: string }) {
    const user = await this.userModel.findOne({ username: body.username });
    if (!user) {
      throw new NotFoundException('Username not found');
    }

    const [salt, storedHash] = user.password.split('.');
    //generate a hash
    const hash = (await scrypt(body.password, salt, 32)) as Buffer;
    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('Invalid credential');
    }
    // // generate a payload
    const payload = {
      _id: user._id,
      role: user.role,
      email: user.username,
      name: user.lastName,
    };
    return payload;
  }

  private generateCardNo = () => {
    const randomDigit = Math.floor(Date.now() + Math.random() * 99);
    return randomDigit;
  };
}
