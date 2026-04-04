const FormSelect = ({ children, className, ...rest }) => {
	return (
		<select
			className={`bg-amber-100 px-6 py-2 rounded-xl outline-none font-medium text-xl 
                text-amber-600 items-center font-mono  ${className}`}
			{...rest}
		>
			{children}
		</select>
	);
};

export default FormSelect;
