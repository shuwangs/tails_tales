import EntryList from "../components/EntriesList";

const HomePage = () => {
	return (
		<div>
			<h1>Welcome to the Home Page</h1>
			<p>Here will display all the diary entries.</p>

			<EntryList />
		</div>
	);
};

export default HomePage;
