import EntryList from "../components/EntriesList";
import MainLayout from "../layout/MainLayout";
const HomePage = () => {
	return (
		<MainLayout>
			<h1>Welcome to the Home Page</h1>
			<p>Here will display all the diary entries.</p>

			<EntryList />
		</MainLayout>
	);
};

export default HomePage;
