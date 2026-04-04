const GeneralContainer = ({ children, className }) => {
	return (
		<div
			className={`flex flex-col border-3 border-amber-200 rounded-xl bg-white/40 ${className}`}
		>
			{children}
		</div>
	);
};

export default GeneralContainer;
