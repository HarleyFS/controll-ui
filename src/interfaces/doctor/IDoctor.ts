import type Address from "@/interfaces/IAdress";
import type { Gender } from "@/enums/GenderEnum";
import type { Speciality } from "@/enums/SpecialityEnum";

export default interface IDoctor {
  id: Number | null;
  name: String;
  lastName: String;
  email: String;
  gender: Gender;
  cellNumber: String;
  crm: String;
  specialty: Speciality | null;
  address: Address;
}
