const EntryCardUI = ({ children, className }) => {
	return (
		<button
			className={`flex rounded-xl border-3 border-amber-300 px-6 py-4 text-2xl items-center gap-2 ${className}`}
		>
			{children}
		</button>
	);
};

export default EntryCardUI;
