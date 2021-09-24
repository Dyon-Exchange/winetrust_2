interface NewClientForm {
  firstName: string;
  lastName: string;
  phoneNumber: {
    countryCode: string;
    phoneNumber: string;
  };
  ethAddress: string;
}
