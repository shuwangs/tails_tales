const DeleteBtn = ({ children, className }) => {
	return (
		<button
			className={`px-6 py-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-full font-semibold transition-colors flex items-center  gap-2 ${className}`}
		>
			{children}
		</button>
	);
};

export default DeleteBtn;
