import EntryList from "../components/EntriesList.jsx";
import MainLayout from "../layout/MainLayout";
import SearchBar from "../components/SearchBar.jsx";
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
