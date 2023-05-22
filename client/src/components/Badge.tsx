import {MouseEventHandler} from "react";
import CloseIcon from '@mui/icons-material/Close';

type BadgeProps = {
    text: string,
    customClass?: string,
    functionOnClick?: MouseEventHandler<HTMLButtonElement> | undefined,
};

export default function Badge({text, customClass, functionOnClick}: BadgeProps) {
    return (
        <div className={`badgeStyle${customClass ? customClass : ""}`}>
            <span>
                {text}
            </span>
            <button className="deletePoiButton" onClick={functionOnClick}>
                <CloseIcon/>
            </button>
        </div>
    )
}