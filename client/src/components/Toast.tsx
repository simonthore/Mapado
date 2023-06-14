import { useEffect, useState } from "react";
import toastStyles from "../assets/css/components/Toast.module.css";

interface ToastListProps {
  toast: ToastInterface;
  position: string;
  autoDelete: boolean;
  autoDeleteTime: number;
  visible: boolean;
  setVisible(visible: boolean): void;
}
interface ToastInterface {
  id: number;
  title: string;
  description: string;
  icon: string;
  backgroundColor: string;
}

export default function Toast({
  toast,
  position,
  autoDelete,
  autoDeleteTime,
  visible,
}: ToastListProps) {
  const [list, setList] = useState<ToastInterface[]>([]);

  useEffect(() => {
    console.log("log du toast:", toast);

    if (toast.id) {
      setList([...list, toast]);
    }

    console.log("log de la liste:", list);
  }, [toast]);

  //
  // Si on souhaite activer la fonction autoDelete, juste décommenter le useEffect ici
  //

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && list.length && list.length) {
        deleteToast(list[0].id);
      }
    }, autoDeleteTime);
    return () => {
      clearInterval(interval);
    };
  }, [autoDelete, autoDeleteTime, list]);

  const deleteToast = (id: number) => {
    const index = list.findIndex((e) => e.id === id);
    list.splice(index, 1);
    setList([...list]);
  };

  return visible ? (
    <>
      <div
        className={`${toastStyles.notificationContainer} ${toastStyles[position]}`}
      >
        {list.map((toast, index) => (
          <div
            key={index}
            className={`${toastStyles.notification} ${toastStyles.toast} ${toastStyles[position]}`}
            style={{ backgroundColor: toast?.backgroundColor }}
          >
            <div className={toastStyles.notificationImage}>
              {<img src={toast.icon} alt="" />}
            </div>
            <div className={toastStyles.notificationTextContainer}>
              {<h4 className={toastStyles.notificationTitle}>{toast.title}</h4>}
              <p className={toastStyles.notificationMessage}>
                {toast.description}
              </p>
            </div>
            <button
              className={toastStyles.notificationCloseBtn}
              onClick={() => deleteToast(toast.id)}
            >
              X
            </button>
          </div>
        ))}
        ;
      </div>
    </>
  ) : (
    <></>
  );
}
