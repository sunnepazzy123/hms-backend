export enum genderType {
  male = 'male',
  female = 'female',
}

export enum roleType {
  doctor = 'doctor',
  nurse = 'nurse',
  pharmarcist = 'pharmarcist',
  admin = 'admin',
  superAdmin = 'superAdmin',
  patient = 'patient',
}

export enum statusEnumType {
  busy = 'busy',
  open = 'open',
  closed = 'closed',
  proccessed = 'proccessed',
}

export enum billingStatusType {
  confirm = 'confirm',
  unconfirm = 'unconfirm',
}


export type statusType = 'busy' | 'open' | 'closed' |'processed'