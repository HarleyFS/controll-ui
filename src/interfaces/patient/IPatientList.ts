import type { Gender } from "@/enums/GenderEnum";

export default interface IPatientList {
  id: Number;
  name: String;
  lastName: String;
  cellNumber: String;
  birthDate: String;
  gender: Gender;
  email: String;
}
