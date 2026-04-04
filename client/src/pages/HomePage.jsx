import EntryList from "../components/EntriesList.jsx";
import SearchBar from "../components/SerachBar.jsx";
import MainLayout from "../layout/MainLayout";

const HomePage = () => {
	return (
		<MainLayout>
			<h1>Meow! Welcome to my diary~ 🐾</h1>
			<SearchBar />
			<EntryList />
		</MainLayout>
	);
};

export default HomePage;
