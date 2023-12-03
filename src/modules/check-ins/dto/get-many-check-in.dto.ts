export class GetManyCheckInDto {
  id: number;
  time: Date;
  location: {
    id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  user: {
    id: number;
    username: string;
    email: string;
    phoneNumber: string;
    name: string;
  };
}
