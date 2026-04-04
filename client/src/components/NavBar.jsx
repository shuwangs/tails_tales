import { NavLink } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";

const NavBar = () => {
	return (
		<nav className="w-full h-20 fixed flex flex-row bg-amber-100/95 border-b-2 border-amber-200">
			<div className="flex flex-row w-full max-w-[1126px] mx-auto items-center justify-between ">
				<h1 className="color-primary-text font-heading text-amber-800 ">
					<NavLink to="entries"> Bobo's Diary</NavLink></h1>
				<div className="flex flex-row gap-2">
					<div className='px-6 py-4 rounded-4xl hover:bg-amber-200'>
						<NavLink to="/entries" className="flex items-center gap-1 text-2xl text-amber-700">
							<IoHomeOutline /> Home
						</NavLink>
					</div>

					<div className='px-6 py-4 rounded-4xl hover:bg-amber-200'>
						<NavLink to="/write" className="flex items-center gap-1 text-2xl text-amber-700">
							<IoMdAddCircleOutline /> Write
						</NavLink>
					</div>

				</div>
			</div>

		</nav>
	);
};

export default NavBar;
