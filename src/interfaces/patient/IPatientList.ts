import type { Gender } from "@/enums/GenderEnum";

export default interface IPatientList {
  id: Number;
  fullName: String | null;
  name: String;
  lastName: String;
  cellNumber: String;
  age: number;
  birthDate: Date;
  gender: Gender;
  email: String;
}
