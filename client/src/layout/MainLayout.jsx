const MainLayout = ({ children, className }) => {
	return (
		<div className={`flex flex-col max-w-[1200px] mx-auto pt-20 ${className}`}>
			{children}
		</div>
	);
};

export default MainLayout;
