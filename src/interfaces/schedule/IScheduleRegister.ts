import type { Gender } from "@/enums/GenderEnum";
import type IDoctorList from "@/interfaces/doctor/IDoctorList";
import type IPatientList from "@/interfaces/patient/IPatientList";
export default interface IScheduleRegister {
  id: Number | null;
  fullName: String | null;
  name: String | null;
  lastName: String | null;
  cellNumber: String;
  birthDate: Date | null;
  scheduleDateTime: Date;
  gender: Gender;
  doctor: IDoctorList | undefined;
  patient: IPatientList | null;
}
