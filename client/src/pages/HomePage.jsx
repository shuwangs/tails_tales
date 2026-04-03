import EntryList from "../components/EntriesList.jsx";
import SearchBar from "../components/SearchBar.jsx";
import MainLayout from "../layout/MainLayout";

const HomePage = () => {
	return (
		<MainLayout>
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
