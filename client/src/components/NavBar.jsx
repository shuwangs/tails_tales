const NavBar = () => {
	return (
		<nav className="w-full h-20 fixed flex flex-row bg-amber-100/95 border-b-2 border-amber-200">
			<div className="flex flex-row w-full max-w-[1126px] mx-auto items-center justify-between ">
				<h1 className="color-primary-text font-heading">Bobo's Diary</h1>
				<div className="flex flex-row gap-4">
					<a href="/entries">Home</a>
					<a href="/write">Write</a>
				</div>
			</div>

		</nav>
	);
};

export default NavBar;
