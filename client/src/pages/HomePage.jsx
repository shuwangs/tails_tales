import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import EntryList from "../components/EntriesList.jsx";
import SearchBar from "../components/SearchBar.jsx";
import MainLayout from "../layout/MainLayout";

const HomePage = () => {
	const location = useLocation();

	useEffect(() => {
		if (location.state?.message) {
			toast.success(location.state.message, {
				position: "top-right",
				autoClose: 1500,
			});
		}
	}, [location.state]);
	return (
		<MainLayout>
			<ToastContainer />
			<div className="flex flex-col gap-10">
				<h1>
					{"ฅ•ω•ฅ"} Welcome to my diary {">-;;⁠;⁠;€ᐷ"}
				</h1>
				<SearchBar />
				<EntryList />
			</div>
		</MainLayout>
	);
};

export default HomePage;
