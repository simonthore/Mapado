import popupStyles from "../assets/css/components/custom-popup.module.css";

interface PopupProps {
  trigger: boolean;
  popupTitle: string;
  setTrigger(trigger: boolean): void;
}

const CustomPopup = (props: PopupProps) => {
  return props.trigger ? (
    <div className={popupStyles.popup}>
      <div className={popupStyles.popupInner}>
        <button
          onClick={() => {
            props.setTrigger(false);
          }}
          className={popupStyles.closeBtn}
        >
          x
        </button>
        <h3>{props.popupTitle}</h3>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CustomPopup;
