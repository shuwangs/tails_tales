import { useParams } from "react-router-dom";
import DetailCard from "../components/DetailCard.jsx";
import { useEntries } from "../contexts/EntriesContext.jsx";
import MainLayout from "../layout/MainLayout.jsx";

const DetailPage = () => {
	const { id } = useParams();
	const { entries, loading, error } = useEntries();

	const selectedEntry = entries.find((entry) => entry.id === Number(id));

	return (
		<MainLayout>
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p role="alert">{error}</p>
			) : selectedEntry ? (
				<DetailCard entry={selectedEntry} />
			) : (
				<p>Entry not found.</p>
			)}
		</MainLayout>
	);
};

export default DetailPage;
