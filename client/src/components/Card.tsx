type CardProps = {
    children: JSX.Element | JSX.Element[],
    customClass?: string
};

export default function Card({children, customClass}:CardProps){
    return(
        <div className={`cardStyle${customClass ? customClass : ""}`}>
            {children}
        </div>
    )
}