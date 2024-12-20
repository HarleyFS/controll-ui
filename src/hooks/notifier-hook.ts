import { NotificationTypeEnum } from "@/enums/NotificationTypeEnum";
import { userNotifyStore } from "../stores/notify-store";

type Notifier = {
  notify: (title: string, text: string, type: NotificationTypeEnum) => void;
  notifyError: (text: string) => void;
  notifySuccess: (text: string) => void;
  notifyInfo: (text: string) => void;
};

const notifyStore = userNotifyStore();

export default (): Notifier => {
  const notify = (
    title: string,
    text: string,
    type: NotificationTypeEnum
  ): void => {
    const id = new Date().getTime();
    notifyStore.notify({ id, title, text, type });
  };

  const notifyError = (error: any): void => {
    const type = NotificationTypeEnum.ERROR;
    const title = "ERROR";

    if (error.response.data.errors) {
      for (const e in error.response.data.errors) {
        const text = error.response.data.errors[e];
        notify(title, text, type);
      }
    } else {
      for (const e in error.response.data) {
        const text = error.response.data[e].mensagem;
        notify(title, text, type);
      }
    }
  };

  const notifySuccess = (text: string): void => {
    const type = NotificationTypeEnum.SUCCESS;
    const title = "SUCESSO";
    notify(title, text, type);
  };

  const notifyInfo = (text: string): void => {
    const type = NotificationTypeEnum.INFO;
    const title = "ATENÇÃO";
    notify(title, text, type);
  };

  return {
    notify,
    notifyError,
    notifySuccess,
    notifyInfo,
  };
};
