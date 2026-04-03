const FormSelect = ({ children, className }) => {
    return (
        <select
            className={`bg-amber-100 px-6 py-2 rounded-xl outline-none font-medium text-xl 
                text-amber-600 items-center font-mono  ${className}`}
        >

            {children}
        </select>
    );
};

export default FormSelect;
