type BadgeProps = {
    text: string,
    customClass?: string
};

export default function Badge({text, customClass}:BadgeProps){
    return(
        <span className={`badgeStyle${customClass ? customClass : ""}`}>
            {text}
        </span>
    )
}