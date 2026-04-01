const NavBar = () => {
	return (
		<nav className="fix flex flex-row items-center justify-between p-4 bg-[var(--color-primary-border)]">
			<h1>Bobo's Diary</h1>
			<div className="flex flex-row">
				<a href="/entries">Home</a>
				<a href="/write">Write</a>
			</div>
		</nav>
	);
};

export default NavBar;
