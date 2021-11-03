interface PhoneNumber {
  countryCode: string;
  phoneNumber: string;
}

interface NewClientForm {
  firstName: string;
  lastName: string;
  ethAddress: string;
  phoneNumber: PhoneNumber;
}

interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  ethAddress: string;
  phoneNumber: PhoneNumber;
  createdAt: Date;
  updatedAt: Date;
}
