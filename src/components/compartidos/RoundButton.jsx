
export default function RoundButton({children, onClick, ...props}) {
    return (
        <button {...props} onClick={onClick}>{children}</button>
    )}
