import type { Gender } from "@/enums/GenderEnum";

export default interface ISchedule {
  id: Number;
  name: String;
  lastName: String;
  cellNumber: String;
  birthDate: Date;
  scheduleDate: Date;
  gender: Gender;
}
