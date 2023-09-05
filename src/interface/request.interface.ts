import { Request } from 'express';
import { Types } from 'mongoose';
import { roleType } from 'src/constants/enums';

export interface IRequest extends Request {
  user: {
    id: Types.ObjectId;
    role: roleType;
  };
}
