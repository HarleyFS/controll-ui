import type { NotificationTypeEnum } from "@/enums/NotificationTypeEnum";

export default interface INotification {
  id: Number;
  title: String;
  text: String;
  type: NotificationTypeEnum;
}
