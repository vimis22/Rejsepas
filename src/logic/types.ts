export interface Profile {
  firstName: string;
  surname: string;
  dateOfBirth: string;
  cprNumber: string;
  passportNumber: string;
  citizenship: string;
  validFrom: string;
  validUntil: string;
  passportType: string;
  countryCode: string;
  passportStatus: string;
  email?: string;
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Visa {
  id: string;
  country: string;
  flag: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Expired' | 'Pending' | 'VALID' | 'ACTIVE';
  statusColor?: string;
}

export interface Record {
  id: string;
  country: string;
  flag: string;
  airport: string;
  date: string;
  type: 'Arrival' | 'Departure';
  status?: string;
}

export interface UserData extends Profile {
  visas?: Visa[];
  records?: Record[];
}
