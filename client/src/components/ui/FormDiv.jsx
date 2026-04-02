
const FormDiv = ({ children, className }) => {
    return (
        <div className={`flex flex-col border-2 border-amber-200 rounded-xl text-amber-700 ${className}`} >
            {children}
        </div >
    )
}

export default FormDiv;