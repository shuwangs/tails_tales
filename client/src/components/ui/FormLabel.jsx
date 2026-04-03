const FormLabel = ({ children, className }) => {
	return (
		<label
			className={`text-xl items-center text-amber-700 font-bold font-mono  ${className}`}
		>
			{children}
		</label>
	);
};

export default FormLabel;
