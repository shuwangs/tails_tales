const GeneralContainer = ({ children }) => {
	return (
		<div className="flex flex-col border-3 border-amber-200 rounded-xl">
			{children}
		</div>
	);
};

export default GeneralContainer;
