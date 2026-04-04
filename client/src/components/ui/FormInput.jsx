const FormInput = ({ className, ...rest }) => {
	return (
		<input
			className={`text-lg text-amber-800 py-2 px-2 font-mono ${className}`}
			{...rest}
		/>
	);
};

export default FormInput;
