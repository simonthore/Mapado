import {MouseEventHandler} from "react";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from "@mui/icons-material/Edit";

type BadgeProps = {
    text: string,
    customClass?: string,
    categoryId?: number
    functionOnClick?: MouseEventHandler<HTMLButtonElement> | undefined,
    functionOnClick2?: MouseEventHandler<HTMLButtonElement> | undefined,
};

export default function BadgeEdit({text, customClass, functionOnClick, functionOnClick2, categoryId}: BadgeProps) {
    return (
        <div className={`badgeEditStyle${customClass ? customClass : ""}`}>
            <span>
                {text}
            </span>
            <div className="icons_wrapper">
                <button className="deletePoiButton" onClick={functionOnClick} data-id={categoryId}>
                    <CloseIcon/>
                </button>
                <button className="deletePoiButton" onClick={functionOnClick2} data-id={categoryId}>
                    <EditIcon/>
                </button>
            </div>
        </div>
    )
}