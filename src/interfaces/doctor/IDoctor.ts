import type Address from "@/interfaces/IAdress";
import type { Gender } from "@/enums/GenderEnum";

export default interface IDoctor {
  id: Number | null;
  fullName: String;
  email: String;
  gender: Gender;
  cellNumber: String;
  crm: String;
  specialty: String;
  address: Address;
}
