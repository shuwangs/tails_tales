const FormBtn = ({ children, className }) => {
    return (
        <button className={`rounded-xl border-3 border-amber-300 px-6 py-4 text-2xl ${className}`}>
            {children}
        </button >
    )
}

export default FormBtn;