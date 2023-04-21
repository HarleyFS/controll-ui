import type { Gender } from "@/enums/GenderEnum";
import type IDoctor from "@/interfaces/doctor/IDoctorList";

export default interface ISchedule {
  id: Number;
  name: String;
  lastName: String;
  cellNumber: String;
  birthDate: Date;
  scheduleDate: Date;
  gender: Gender;
  doctor: IDoctor;
}
