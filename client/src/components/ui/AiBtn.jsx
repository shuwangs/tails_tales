const AiBtn = ({ children, className, ...rest }) => {
	return (
		<button
			className={`rounded-full px-4 py-2 bg-violet-100 hover:bg-violet-200 px-6 py-4 text-violet-700 font-medium ${className}`}
			{...rest}
		>
			{children}
		</button>
	);
};

export default AiBtn;
