import type { Gender } from "@/enums/GenderEnum";
import type Doctor from "@/interfaces/doctor/IDoctorList";
export default interface IScheduleRegister {
  id: Number | null;
  fullName: String;
  cellNumber: String;
  birthDate: Date;
  scheduleDate: Date;
  gender: Gender;
  doctor: Doctor | undefined;
}
