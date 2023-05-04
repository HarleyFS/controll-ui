import type Address from "@/interfaces/IAdress";
import type { Gender } from "@/enums/GenderEnum";

export default interface IPatient {
  id: number | null;
  fullName: String;
  gender: Gender;
  birthDate: Date;
  cpf: String;
  rg: String;
  healthInsurance: String;
  healthPlanNumber: String;
  email: String;
  phoneNumber: String;
  cellNumber: String;
  address: Address;
}
