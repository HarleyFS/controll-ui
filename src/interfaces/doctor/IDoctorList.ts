import type { Speciality } from '@/enums/SpecialityEnum';
import type { Gender } from "@/enums/GenderEnum";

export default interface IDoctorList {
  id: Number | null;
  name: String;
  lastName: String;
  email: String;
  cellNumber: String;
  crm: String;
  specialty: Speciality | null;
}
