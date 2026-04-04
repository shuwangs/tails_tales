const AiDiv = ({ children, className, ...rest }) => {
	return (
		<div
			className={`flex flex-col bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-5 border-2 border-violet-200 ${className}`}
			{...rest}
		>
			{children}
		</div>
	);
};

export default AiDiv;
