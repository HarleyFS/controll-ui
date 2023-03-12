import type { Gender } from "@/enums/GenderEnum";

export default interface IScheduleRegister {
  id: Number;
  fullName: String;
  cellNumber: String;
  birthDate: Date;
  scheduleDate: Date;
  gender: Gender;
}
