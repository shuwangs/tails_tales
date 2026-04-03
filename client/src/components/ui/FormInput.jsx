const FormInput = ({ children, className }) => {
    return (
        <input
            className={`text-lg text-amber-800 py-2 px-2 font-mono ${className}`}
        >

            {children}
        </input>
    );
};

export default FormInput;
