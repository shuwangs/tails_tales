const FormLabel = ({ children, className, htmlFor, ...rest }) => {
	return (
		<label
			htmlFor={htmlFor}
			className={`text-xl items-center text-amber-700 font-bold font-mono  ${className}`}
			{...rest}
		>
			{children}
		</label>
	);
};

export default FormLabel;
