import type { NotificationTypeEnum } from "@/enums/NotificationTypeEnum";

export interface INotification {
  id: Number;
  title: String;
  text: String;
  type: NotificationTypeEnum;
}
