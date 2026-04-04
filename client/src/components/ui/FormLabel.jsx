const FormLabel = ({ children, className, ...rest }) => {
	return (
		<label
			className={`text-xl items-center text-amber-700 font-bold font-mono  ${className}`}
			{...rest}
		>
			{children}
		</label>
	);
};

export default FormLabel;
